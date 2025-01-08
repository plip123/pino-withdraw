import {
  ENTRYPOINT_ADDRESS_V07,
  createSmartAccountClient,
  walletClientToSmartAccountSigner,
} from "permissionless";
import { useCallback, useEffect, useMemo, useState } from "react";
import { http, createPublicClient, Address } from "viem";
import {
  createPimlicoBundlerClient,
  createPimlicoPaymasterClient,
} from "permissionless/clients/pimlico";
import { signerToSafeSmartAccount } from "permissionless/accounts";
import { useAccount, useWalletClient } from "wagmi";
import {
  PAYMASTER_DATA,
  DEFAULT_CHAIN,
  CUSTOM_RPC_BY_CHAIN,
  SUPPORTED_CHAIN_IDS,
} from "@/constants";

const PIMLICO_URI = "https://api.pimlico.io/v2";
const PIMLICO_SAFE_VERSION = "1.4.1";

export const usePimlico = () => {
  const { address, isConnected, chain = DEFAULT_CHAIN } = useAccount();
  const [isLoadingSafeWallet, setisLoadingSafeWallet] = useState(false);
  const [smartAccountAddress, setSmartAccountAddress] = useState<Address>();
  const { data: walletClient } = useWalletClient({
    chainId: chain.id,
  });
  const bundlerUrl = `${PIMLICO_URI}/${chain.id}/rpc?apikey=${
    import.meta.env.VITE_PIMLICO_KEY
  }`;

  const customRPC = useMemo(() => {
    if (!chain) return;
    return CUSTOM_RPC_BY_CHAIN[chain.id as keyof typeof CUSTOM_RPC_BY_CHAIN];
  }, [chain]);

  const publicClient = useMemo(() => {
    if (
      !chain ||
      !Object.values(SUPPORTED_CHAIN_IDS).some(
        (chainId) => chainId === chain.id,
      )
    )
      return undefined;
    return createPublicClient({
      transport: http(customRPC),
      chain,
    });
  }, [chain, customRPC]);

  const bundlerClient = useMemo(() => {
    return createPimlicoBundlerClient({
      transport: http(bundlerUrl),
      entryPoint: ENTRYPOINT_ADDRESS_V07,
    });
  }, [bundlerUrl]);

  const paymasterClient = useMemo(() => {
    return createPimlicoPaymasterClient({
      transport: http(bundlerUrl),
      entryPoint: ENTRYPOINT_ADDRESS_V07,
    });
  }, [bundlerUrl]);

  const calculateFinalGas = useCallback((gas: bigint) => {
    const extraGas = gas / 2n;

    return gas + extraGas;
  }, []);

  const getSmartAccountClient = useCallback(async () => {
    if (!address || !isConnected || !publicClient || !walletClient) return;
    const smartAccountSigner = walletClientToSmartAccountSigner(walletClient);
    const smartAccountSafeSigner = await signerToSafeSmartAccount(
      publicClient,
      {
        signer: smartAccountSigner,
        safeVersion: PIMLICO_SAFE_VERSION,
        entryPoint: ENTRYPOINT_ADDRESS_V07,
        address: smartAccountAddress as Address,
      },
    );

    return createSmartAccountClient({
      account: smartAccountSafeSigner,
      entryPoint: ENTRYPOINT_ADDRESS_V07,
      chain,
      bundlerTransport: http(bundlerUrl, {
        timeout: 60_000,
      }),
      middleware: {
        gasPrice: async () =>
          (await bundlerClient.getUserOperationGasPrice()).fast,

        sponsorUserOperation: async (args) => {
          const userOperation = {
            ...args.userOperation,
            paymasterData: PAYMASTER_DATA as Address,
          };
          const gas = await bundlerClient.estimateUserOperationGas({
            userOperation,
          });

          const userOp = (Object.keys(gas) as (keyof typeof gas)[]).reduce(
            (acc, key) => {
              const value = gas[key];
              return {
                ...acc,
                [key]:
                  typeof value === "bigint" ? calculateFinalGas(value) : value,
              };
            },
            {},
          );

          return await paymasterClient.sponsorUserOperation({
            ...args,
            userOperation: { ...args.userOperation, ...userOp },
          });
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, publicClient, smartAccountAddress, walletClient, address]);

  useEffect(() => {
    (async () => {
      if (!!isLoadingSafeWallet || smartAccountAddress) return;
      setisLoadingSafeWallet(() => true);
      const smartAccountClient = await getSmartAccountClient();
      setSmartAccountAddress(smartAccountClient?.account.address);
      setisLoadingSafeWallet(() => false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSmartAccountClient, smartAccountAddress, address]);

  return {
    getSmartAccountClient,
    smartAccountAddress,
    publicClient,
    isLoadingSafeWallet: !!isLoadingSafeWallet,
    setSmartAccountAddress,
  };
};

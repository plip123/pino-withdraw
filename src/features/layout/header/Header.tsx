import { useMemo } from 'react';
import { zeroAddress } from 'viem';
import { Toolbar } from 'primereact/toolbar';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { AddressCopyWidget, ChainSelector } from '@/components';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';

export const HeaderLayout = () => {
  const { address: userAddress, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect, isPending: isDisconnecting } = useDisconnect();

  const StartContent = useMemo(
    () => (
      <div className='hidden align-items-center gap-2 md:flex'>
        <Image src='/images/logo.png' alt='R2R' width='80'/>
      </div>
    ),
    [],
  );

  const EndContent = useMemo(
    () => isConnected ? (
      <div className='hidden gap-4 md:flex align-items-center'>
        <AddressCopyWidget
          address={userAddress ?? zeroAddress}
          copyIcon
        />
        <ChainSelector />
        <Button label='Disconnect' className='w-full' loading={isDisconnecting && isConnected} onClick={() => disconnect()} />
      </div>
    ) : (
      <Button label={isPending ? 'Connecting' :'Connect'} loading={isPending && !isConnected} onClick={() => connect({ connector: connectors[0] })} />
    ),
    [isConnected, userAddress, isDisconnecting, isPending, connectors, disconnect, connect],
  );

  return (
    <Toolbar
      start={StartContent}
      end={EndContent}
      className='rounded-none border-0 border-b bg-transparent'
    />
  );
};

import { z } from "zod";

/**
 * Specify your server-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars.
 */
const server = z.object({});

/**
 * Specify your client-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars. To expose them to the client, prefix them with `VITE_`.
 */
const client = z.object({
  BASE_URL: z.string().optional().default("localhost:5134"),
  DEV: z.boolean().optional().default(true),
  MODE: z.string().optional().default("development"),
  PROD: z.boolean().optional().default(false),
  SSR: z.boolean().optional().default(false),
  VITE_ALCHEMY_KEY: z.string(),
  VITE_PIMLICO_KEY: z.string(),
  VITE_PROJECT_ID: z.string(),
  VITE_MAGIC_API_KEY: z.string(),
});

/**
 * You can't destruct `import.meta.env` as a regular object in the Next.js edge runtimes (e.g.
 * middlewares) or client-side so we need to destruct manually.
 *
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv: Record<keyof z.infer<typeof server> | keyof z.infer<typeof client> | keyof ImportMetaEnv, string | boolean | undefined> = {
  BASE_URL: import.meta.env.BASE_URL,
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
  SSR: import.meta.env.SSR,
  VITE_ALCHEMY_KEY: import.meta.env.VITE_ALCHEMY_KEY,
  VITE_PIMLICO_KEY: import.meta.env.VITE_PIMLICO_KEY,
  VITE_PROJECT_ID: import.meta.env.VITE_PROJECT_ID,
  VITE_MAGIC_API_KEY: import.meta.env.VITE_MAGIC_API_KEY,
};

// Don't touch the part below
// --------------------------
const merged = server.merge(client);

/**
 * @typedef {z.input<typeof merged>} MergedInput
 * @typedef {z.infer<typeof merged>} MergedOutput
 * @typedef {z.SafeParseReturnType<MergedInput, MergedOutput>} MergedSafeParseReturn
 */

let env = /** @type {MergedOutput} */ (import.meta.env);

if (!!import.meta.env.SKIP_ENV_VALIDATION == false) {
  const isServer = typeof window === "undefined";

  /** @type {MergedSafeParseReturn} */
  const parsed = isServer
    ? merged.safeParse(processEnv) // on server we can validate all env vars
    : client.safeParse(processEnv); // on client we can only validate the ones that are exposed

  if (parsed.success === false) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors,
    );
    throw new Error("Invalid environment variables");
  }

  env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== "string") return undefined;
      /**
       * Throw a descriptive error if a server-side env var is accessed on the client
       * Otherwise it would just be returning `undefined` and be annoying to debug
       */
      if (!isServer && !prop.startsWith("VITE_"))
        throw new Error(
          process.env.NODE_ENV === "production"
            ? "❌ Attempted to access a server-side environment variable on the client"
            : "❌ Attempted to access server-side environment variable '${prop}' on the client",
        );
      return target[prop as keyof typeof target];
    },
  });
}

export { env };

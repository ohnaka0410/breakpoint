/**
 * Client Side Envs
 */
export const gaId =
  process.env["NEXT_PUBLIC_GA_ID"] != null && process.env["NEXT_PUBLIC_GA_ID"] !== ""
    ? process.env["NEXT_PUBLIC_GA_ID"]
    : undefined;

import { createClient } from "microcms-js-sdk";
import { serviceDomain, apiKey } from "~/libs/server/Env";

export type Response<T> = {
  contents: T;
  totalCount: number;
  offset: number;
  limit: number;
};

export const client = createClient({
  serviceDomain: serviceDomain,
  apiKey: apiKey,
});

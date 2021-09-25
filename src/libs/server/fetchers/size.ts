import type { Size } from "~/@types";
import type { Response } from "./client";
import { client } from "./client";

const endpoint = "sizes";

export const fetchSizeList = async (): Promise<Size[]> => {
  return (
    await client.get<Response<Size[]>>({
      endpoint,
      queries: { limit: 100 },
    })
  ).contents;
};

import type { Schema } from "./schema";

export type Device = Schema & {
  name: string;
  type: "iPhone" | "iPad";
};

import type { Device } from "./device";
import type { Schema } from "./schema";

export type Size = Schema & {
  size: string;
  devices: Device[];
  point_width: number;
  point_height: number;
  retina: number;
  device_width: number;
  device_height: number;
};

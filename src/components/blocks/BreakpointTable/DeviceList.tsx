import { List, ListItem } from "@chakra-ui/react";
import type { Device } from "~/@types";

type Props = {
  deviceList: Device[];
};

export const DeviceList: React.VFC<Props> = ({ deviceList }) => {
  return (
    <List>
      {deviceList.map<JSX.Element>((device: Device): JSX.Element => {
        return <ListItem key={device.id}>{device.name}</ListItem>;
      })}
    </List>
  );
};

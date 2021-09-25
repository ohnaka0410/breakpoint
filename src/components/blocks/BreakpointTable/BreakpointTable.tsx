import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import type { Breakpoint, Size } from "~/@types";
import { DeviceList } from "./DeviceList";
import { BreakpointCells } from "./BreakpointCells";

type Props = {
  sizeList: Size[];
  breakpointList: Breakpoint[];
};

export const BreakpointTable: React.VFC<Props> = ({ sizeList, breakpointList }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th rowSpan={2}>Size</Th>
            <Th rowSpan={2}>Device</Th>
            <Th rowSpan={2}>Point</Th>
            <Th rowSpan={2}>Retina</Th>
            <Th colSpan={4}>Breakpoint</Th>
          </Tr>
          <Tr>
            <Th colSpan={2}>Portrait</Th>
            <Th colSpan={2}>Landscape</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sizeList.map<JSX.Element>((size: Size): JSX.Element => {
            return (
              <Tr key={size.id}>
                <Td>{size.size}</Td>
                <Td>
                  <DeviceList deviceList={size.devices} />
                </Td>
                <Td>
                  {size.point_width} × {size.point_height}
                </Td>
                <Td>{size.retina}</Td>
                <BreakpointCells point={size.point_width} breakpointList={breakpointList} />
                <BreakpointCells point={size.point_height} breakpointList={breakpointList} />
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

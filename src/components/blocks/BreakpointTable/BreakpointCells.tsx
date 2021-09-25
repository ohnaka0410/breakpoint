import { Td } from "@chakra-ui/react";
import { useMemo } from "react";
import type { Breakpoint } from "~/@types";

type Props = {
  point: number;
  breakpointList: Breakpoint[];
};

export const BreakpointCells: React.VFC<Props> = ({ point, breakpointList }) => {
  const breakpoint = useMemo((): Breakpoint | undefined => {
    return breakpointList
      .filter((breakpoint: Breakpoint): boolean => {
        return breakpoint.min <= point;
      })
      .pop();
  }, [breakpointList, point]);

  return (
    <>
      <Td>{breakpoint?.label}</Td>
      <Td>{breakpoint !== undefined ? `≥${breakpoint.min}px` : "-"}</Td>
    </>
  );
};

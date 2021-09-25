import { EditIcon } from "@chakra-ui/icons";
import { Box, Flex, Grid, Heading, IconButton } from "@chakra-ui/react";
import type { Breakpoint, Size } from "~/@types";
import { BreakpointTable } from "~/components/blocks/BreakpointTable";

export type Props = {
  sizeList: Size[];
};

const breakpointList: Breakpoint[] = [
  {
    min: 0,
    label: "xs",
  },
  {
    min: 576,
    label: "sm",
  },
  {
    min: 768,
    label: "md",
  },
  {
    min: 992,
    label: "lg",
  },
  {
    min: 1200,
    label: "xl",
  },
  {
    min: 1400,
    label: "xxl",
  },
];

export const Home: React.VFC<Props> = ({ sizeList }) => {
  return (
    <Grid>
      <Flex as="header" padding={6} bg="teal.500" color="white" alignItems="center" position="sticky" top="0">
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          Breakpoint Simulator
        </Heading>
        <IconButton aria-label="Edit" icon={<EditIcon />} marginLeft="auto" color="teal" />
      </Flex>
      <Box padding="4">
        <BreakpointTable sizeList={sizeList} breakpointList={breakpointList} />
      </Box>
    </Grid>
  );
};

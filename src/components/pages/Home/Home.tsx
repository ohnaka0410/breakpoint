import { SettingsIcon } from "@chakra-ui/icons";
import { Box, Flex, Grid, Heading, IconButton, useDisclosure } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import type { Setting, Size } from "~/@types";
import { BreakpointTable } from "~/components/blocks/BreakpointTable";
import { SettingModal } from "~/components/blocks/SettingModal";

export type Props = {
  sizeList: Size[];
};

const defaultSetting: Setting = {
  breakpointList: [
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
  ],
};

export const Home: React.VFC<Props> = ({ sizeList }) => {
  const [setting, setSetting] = useState<Setting>(defaultSetting);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = useCallback(
    (setting: Setting): void => {
      setSetting(setting);
      onClose();
    },
    [onClose]
  );

  return (
    <Grid>
      <Flex as="header" padding={6} bg="teal.500" color="white" alignItems="center" position="sticky" top="0">
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          Breakpoint Simulator
        </Heading>
        <IconButton aria-label="Edit" icon={<SettingsIcon />} marginLeft="auto" color="teal" onClick={onOpen} />
        <SettingModal isOpen={isOpen} onClose={onClose} setting={setting} onSubmit={handleSubmit} />
      </Flex>
      <Box padding="4">
        <BreakpointTable sizeList={sizeList} setting={setting} />
      </Box>
    </Grid>
  );
};

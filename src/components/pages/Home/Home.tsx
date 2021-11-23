import { Box, Flex, Grid, Heading, Icon, IconButton, useDisclosure } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { RiGithubFill, RiSettings5Fill, RiTwitterFill } from "react-icons/ri";
import type { Breakpoint, Setting, Size } from "~/@types";
import { BreakpointTable } from "~/components/blocks/BreakpointTable";
import { SettingModal } from "~/components/blocks/SettingModal";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const [setting, setSetting] = useState<Setting>(defaultSetting);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const query = router.query;
    const bpMin = query["bp.min"];
    const bpLabel = query["bp.label"];

    if (bpMin === undefined) {
      onClose();
      return;
    }

    if (bpLabel === undefined) {
      onClose();
      return;
    }

    const bpMinList = Array.isArray(bpMin) ? bpMin : [bpMin];
    const bpLabelList = Array.isArray(bpLabel) ? bpLabel : [bpLabel];

    if (bpMinList.length === 0 || bpLabelList.length === 0 || bpMinList.length !== bpLabelList.length) {
      onClose();
      return;
    }

    setSetting((prev: Setting): Setting => {
      return {
        ...prev,
        breakpointList: bpMinList.map<Breakpoint>((min: string, index: number): Breakpoint => {
          return {
            min: parseInt(min),
            label: bpLabelList[index] ?? "",
          };
        }),
      };
    });

    onClose();
  }, [onClose, router.query]);

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
          Breakpoint
        </Heading>
        <Grid marginLeft="auto" gap={4} gridTemplateColumns="repeat(3, auto)">
          <IconButton
            aria-label="Twitter"
            as="a"
            icon={<Icon as={RiTwitterFill} w={6} h={6} />}
            colorScheme="teal"
            href="https://twitter.com/yuki0410_"
            target="_blank"
          />
          <IconButton
            aria-label="Github"
            as="a"
            icon={<Icon as={RiGithubFill} w={6} h={6} />}
            colorScheme="teal"
            href="https://github.com/ohnaka0410/breakpoint"
            target="_blank"
          />
          <IconButton
            aria-label="Edit"
            icon={<Icon as={RiSettings5Fill} w={6} h={6} />}
            color="teal"
            onClick={onOpen}
          />
          <SettingModal isOpen={isOpen} onClose={onClose} setting={setting} onSubmit={handleSubmit} />
        </Grid>
      </Flex>
      <Box padding="4">
        <BreakpointTable sizeList={sizeList} setting={setting} />
      </Box>
    </Grid>
  );
};

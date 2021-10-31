import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import type { Breakpoint, Setting } from "~/@types";
import { BreakpointEditForm } from "./BreakpointEditForm";

type Props = {
  isOpen: boolean;
  onClose: VoidFunction;
  setting: Setting;
  onSubmit: (setting: Setting) => void;
};

export const SettingModal: React.VFC<Props> = ({ isOpen, onClose, setting }) => {
  const [value, setValue] = useState<Setting>(setting);
  const router = useRouter();

  const handleChangeBreakpoint = useCallback((callback: (prev: Breakpoint[]) => Breakpoint[]) => {
    setValue((prev: Setting): Setting => {
      return {
        ...prev,
        breakpointList: callback(prev.breakpointList),
      };
    });
  }, []);

  const handleSubmit = useCallback(() => {
    router.push({
      pathname: router.pathname,
      query: {
        ...value.breakpointList.reduce<{ "bp.min": string[]; "bp.label": string[] }>(
          (
            acc: { "bp.min": string[]; "bp.label": string[] },
            { min, label }: Breakpoint
          ): { "bp.min": string[]; "bp.label": string[] } => {
            return {
              ...acc,
              "bp.min": [...acc["bp.min"], String(min)],
              "bp.label": [...acc["bp.label"], label],
            };
          },
          {
            "bp.min": [],
            "bp.label": [],
          }
        ),
      },
    });
  }, [router, value.breakpointList]);

  useEffect(() => {
    if (isOpen !== true) {
      return;
    }
    setValue(setting);
  }, [isOpen, setting]);

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Setting</ModalHeader>
        <ModalBody>
          <BreakpointEditForm value={value.breakpointList} onChange={handleChangeBreakpoint} />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

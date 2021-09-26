import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputRightElement,
  ListItem,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { useCallback } from "react";
import type { Breakpoint } from "~/@types";

type Props = {
  index: number;
  value: Breakpoint;
  min: number;
  onChange: (callback: (prev: Breakpoint) => Breakpoint, index: number) => void;
  onDelete: (index: number) => void;
};

export const BreakpointEditFieldSet: React.VFC<Props> = ({ index, value, min, onChange, onDelete }) => {
  const handleChangeLabel = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      onChange((prev: Breakpoint): Breakpoint => {
        return {
          ...prev,
          label: value,
        };
      }, index);
    },
    [index, onChange]
  );

  const handleChangeMin = useCallback(
    (valueAsString: string, valueAsNumber: number) => {
      onChange((prev: Breakpoint): Breakpoint => {
        return {
          ...prev,
          min: valueAsString !== "" ? valueAsNumber : 0,
        };
      }, index);
    },
    [index, onChange]
  );

  const handleClickDeleteButton = useCallback(() => {
    onDelete(index);
  }, [index, onDelete]);

  return (
    <ListItem display="contents">
      <Box as="fieldset" display="contents">
        <FormControl id={`BreakpointLabel${index}`} isRequired>
          <FormLabel>Label</FormLabel>
          <Input value={value.label} onChange={handleChangeLabel} />
        </FormControl>
        <FormControl id={`BreakpointMin${index}`} isRequired>
          <FormLabel>Min</FormLabel>
          <NumberInput min={min} value={value.min} onChange={handleChangeMin} disabled={index === 0}>
            <NumberInputField />
            <InputRightElement color="gray.300">px</InputRightElement>
          </NumberInput>
        </FormControl>
        <IconButton aria-label="Delete" icon={<CloseIcon />} onClick={handleClickDeleteButton} disabled={index === 0} />
      </Box>
    </ListItem>
  );
};

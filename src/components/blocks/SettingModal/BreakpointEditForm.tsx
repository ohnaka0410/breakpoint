import { FormControl, FormLabel, List, Flex, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useCallback } from "react";
import type { Breakpoint } from "~/@types";
import { BreakpointEditFieldSet } from "./BreakpointEditFieldSet";

type Props = {
  value: Breakpoint[];
  onChange: (callback: (prev: Breakpoint[]) => Breakpoint[]) => void;
};

export const BreakpointEditForm: React.VFC<Props> = ({ value, onChange }) => {
  const handleChange = useCallback(
    (callback: (prev: Breakpoint) => Breakpoint, index: number): void => {
      onChange((prev: Breakpoint[]): Breakpoint[] => {
        const list = [...prev];
        const breakpoint = list[index];
        if (breakpoint == null) {
          return prev;
        }
        list[index] = callback(breakpoint);
        return list;
      });
    },
    [onChange]
  );

  const handleAdd = useCallback((): void => {
    onChange((prev: Breakpoint[]): Breakpoint[] => {
      const last = [...prev].splice(-1)[0];
      return [
        ...prev,
        {
          label: "Label",
          min: (last?.min ?? 0) + 1,
        },
      ];
    });
  }, [onChange]);

  const handleDelete = useCallback(
    (index: number): void => {
      onChange((prev: Breakpoint[]): Breakpoint[] => {
        const list = [...prev];
        list.splice(index, 1);
        return list;
      });
    },
    [onChange]
  );

  return (
    <FormControl as="fieldset">
      <Flex alignItems="center" marginBottom="4">
        <FormLabel as="legend" marginBottom="0">
          Breakpoint
        </FormLabel>
        <IconButton aria-label="Add" icon={<AddIcon />} size="sm" marginLeft="auto" onClick={handleAdd} />
      </Flex>
      <List display="grid" gridTemplateColumns="1fr 1fr auto" gridGap="4" alignItems="end">
        {value.map<JSX.Element>((breakpoint: Breakpoint, index: number, array: Breakpoint[]): JSX.Element => {
          return (
            <BreakpointEditFieldSet
              key={index}
              index={index}
              value={breakpoint}
              min={(array[index - 1]?.min ?? -1) + 1}
              onChange={handleChange}
              onDelete={handleDelete}
            />
          );
        })}
      </List>
    </FormControl>
  );
};

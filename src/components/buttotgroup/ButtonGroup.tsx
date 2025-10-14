import { IconPlus, IconMinus } from '@tabler/icons-react';
import { Group, Text, ActionIcon } from '@mantine/core';

type ButtonGroupProps = {
  quantity: number;
  handleIncrease: () => void;
  handleDecrease: () => void;
};
const ButtonGroup: React.FC<ButtonGroupProps> = ({
  handleIncrease,
  handleDecrease,
  quantity,
}) => {
  return (
    <Group gap="xs" align="center">
      <ActionIcon
        style={{
          marginLeft: '0px',
        }}
        color="gray"
        size="sm"
        variant="light"
        onClick={handleDecrease}
      >
        <IconMinus size={16} />
      </ActionIcon>
      <Text size="sm">{quantity.toString()}</Text>
      <ActionIcon
        color="gray"
        size="sm"
        variant="light"
        onClick={handleIncrease}
      >
        <IconPlus size={16} />
      </ActionIcon>
    </Group>
  );
};
export default ButtonGroup;

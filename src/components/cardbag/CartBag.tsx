import React from 'react';
import {
  Card,
  Text,
  Group,
  ActionIcon,
  Divider,
  Stack,
  Image,
} from '@mantine/core';
import { IconX, IconPlus, IconMinus } from '@tabler/icons-react';
import type { CartItem } from '../../types/SpaceCartMadal';

type CartProps = {
  items: CartItem[];
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  total: number;
};

const CartBag: React.FC<CartProps> = ({
  items,
  updateQuantity,
  removeItem,
  total,
}) => {
  return (
    <Stack justify="space-between">
      <>
        {items.map(item => (
          <Card
            key={item.id}
            withBorder
            style={{
              borderColor: 'white',
              borderBottomColor: '#F3F5FA',
            }}
          >
            <Group align="flex-start">
              <Image
                src={item.image}
                alt={item.name}
                style={{
                  width: 64,
                  height: 64,
                  objectFit: 'cover',
                  borderRadius: 4,
                }}
              />
              <Stack justify="flex-start">
                <Text fw={500}>{item.name}</Text>
                <Group gap="xs" align="center" h={28}>
                  <Text c="dimmed" size="sm" h={28}>
                    $ {item.price}
                  </Text>
                  <ActionIcon
                    style={{
                      marginLeft: '100px',
                    }}
                    size="sm"
                    variant="light"
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                  >
                    <IconMinus size={16} />
                  </ActionIcon>
                  <Text size="sm">{item.quantity}</Text>
                  <ActionIcon
                    size="sm"
                    variant="light"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <IconPlus size={16} />
                  </ActionIcon>
                  <ActionIcon
                    style={{
                      marginLeft: '40px',
                    }}
                    color="red"
                    variant="light"
                    onClick={() => removeItem(item.id)}
                  >
                    <IconX size={16} />
                  </ActionIcon>
                </Group>
              </Stack>
            </Group>
          </Card>
        ))}
        <Divider />
        <Group
          justify="space-between"
          style={{
            marginLeft: '30px',
            width: '90%',
          }}
        >
          <Text fw={700}>Total</Text>
          <Text size="md">$ {total}</Text>
        </Group>
      </>
    </Stack>
  );
};

export default CartBag;

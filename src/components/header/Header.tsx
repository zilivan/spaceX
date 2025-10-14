import React, { useState } from 'react';
import {
  AppShell as MantineHeader,
  Container,
  Group,
  Title,
  Badge,
  Drawer,
  Button,
  Stack,
  Image,
  Text,
} from '@mantine/core';

import emptyCartImage from '../../assets/cart_empty.png';
import CartBag from '../cardbag/CartBag';
import type { CartItem } from '../../types/SpaceCartMadal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

type HeaderProps = {
  cartItems: CartItem[];
  updateCartItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
};

const Header: React.FC<HeaderProps> = ({
  cartItems,
  updateCartItemQuantity,
  removeCartItem,
}) => {
  const [opened, setOpened] = useState(false);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const openDrawer = () => setOpened(true);
  const closeDrawer = () => setOpened(false);

  return (
    <>
      <MantineHeader p="xs" withBorder>
        {' '}
        <Container fluid>
          <Group
            justify="space-between"
            align="center"
            style={{ height: '100%' }}
          >
            <Title order={5}>
              {' '}
              Vegetable &nbsp;&nbsp;
              <Badge color="green">
                <Title order={5}>SHOP </Title>{' '}
              </Badge>
            </Title>

            <Button
              variant="filled"
              radius="cm"
              color="green"
              size="xs"
              onClick={openDrawer}
              style={{ position: 'relative' }}
            >
              {totalItems > 0 && (
                <Badge size="xs" variant="default" color="white">
                  {totalItems}
                </Badge>
              )}
              &nbsp;&nbsp; Card&nbsp;&nbsp;
              <FontAwesomeIcon icon={faCartShopping} />
            </Button>
          </Group>
        </Container>
      </MantineHeader>

      <Drawer
        opened={opened}
        onClose={closeDrawer}
        title=""
        padding="md"
        position="right"
        styles={{
          content: {
            height: 'auto',
            marginTop: '50px',
            marginRight: '20px',
            borderRadius: '16px',
            width: 'auto',
             paddingBottom: '72px',
            
          },
        }}
      >
        {cartItems.length === 0 ? (
          <Stack style={{ height: '226px', margin: '0px' }}>
            {' '}
            <Image
              src={emptyCartImage}
              alt="Корзина пуста"
              height={106}
              width={117}
              fit="contain"
              style={{ marginTop: '-20px' }}
            />
            <Text c="dimmed" ta="center" style={{ marginTop: '24px' }}>
              You cart is empty!
            </Text>
          </Stack>
        ) : (
          <CartBag
            items={cartItems}
            updateQuantity={updateCartItemQuantity}
            removeItem={removeCartItem}
            total={totalCost}
          />
        )}
      </Drawer>
    </>
  );
};

export default Header;

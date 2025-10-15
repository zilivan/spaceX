import React, { useState } from 'react';
import { Card, Image, Text, Group, Button, Stack } from '@mantine/core';
import type { SpaceCard } from '../../types/SpaceCard';

import './productCart.css';
type ProductCardProps = {
  spaceCard: SpaceCard,
  
};

const ProductCard: React.FC<ProductCardProps> = ({ spaceCard }) => {

const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  return (
    <>
    <Card
      className="hoverCart"
      shadow="xs"
      padding="xs"
      withBorder
      style={{ height: 'auto', width: 'auto', borderRadius: '24px',
        display: 'flex',        // Делаем Card флекс-контейнером
    flexDirection: 'column', // Располагаем элементы по вертикали
    alignItems: 'center',   // Центрируем по горизонтали
    justifyContent: 'center', // (опционально) центрируем по вертикали, если нужно 
    }}
    >
      <Card.Section  mt="md" mb="xs" style={{ height: '100px', width: 'auto' }} >
        <Image
          src={spaceCard.links.mission_patch_small}

  style={{ height: '100%', width: '100%' }}
          alt={''}
          fit="cover"
        />
      </Card.Section>

     <Stack mt="md" mb="xs" align="center">
        <Text  fw={500}>{spaceCard.mission_name}</Text>
         <Text fw={500}>{spaceCard.rocket.rocket_name
}</Text>
        
      </Stack>

      <Group justify="space-between" mt="md" mb="md" align="center">
        
        
        <Button
      
          variant="light"
          color="green"
          radius="md"
         fullWidth
          onClick={openModal}
        >
        See more
        </Button>
      </Group>
    </Card>
<LaunchDetailModal
        launch={spaceCard}
        opened={isModalOpen}
        onClose={closeModal}
      />
</>
  );
};

export default ProductCard;

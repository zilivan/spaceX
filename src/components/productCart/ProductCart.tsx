import React, { useState } from 'react';
import { Card, Image, Text, Group, Button, Box } from '@mantine/core';
import type { SpaceCard } from '../../types/SpaceCard';

import './productCart.css';
type ProductCardProps = {
  spaceCard: SpaceCard,
  
};

const ProductCard: React.FC<ProductCardProps> = ({ spaceCard }) => {


const view= () => {
 
}

  return (
    <Card
      className="hoverCart"
      shadow="xs"
      padding="lg"
      withBorder
      style={{ height: 'auto', width: 'auto', borderRadius: '24px' }}
    >
      <Card.Section>
        <Image
          src={spaceCard.links.mission_patch_small}
style={{ height: '100px', width: '100px' }}
  
          alt={''}
          fit="cover"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{spaceCard.mission_name}</Text>
         <Text fw={500}>{spaceCard.rocket.rocket_name
}</Text>
        <Box w={80}>
          
        </Box>
      </Group>

      <Group justify="space-between" mt="md" mb="md" align="center">
        {' '}
        
        <Button
      
          variant="light"
          color="green"
          radius="md"
          onClick={view}
        >
        See more
        </Button>
      </Group>
    </Card>
  );
};

export default ProductCard;

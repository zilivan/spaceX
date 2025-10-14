// src/components/ProductList.tsx (или HomePage.tsx)
import React from 'react';
import { SimpleGrid } from '@mantine/core';
import ProductCard from '../productCart/ProductCart'; // Путь к вашему основному ProductCard
import ProductCartSkeleton from '../productCartSkeleton/ProductCartSkeleton'; // Импортируем новый компонент заглушки
import type { SpaceCard } from '../../types/SpaceCard';

type SpaceCardListProps = {
  spaceCards: SpaceCard[];
  loading: boolean;
 
};

const SpaceCardList: React.FC<SpaceCardListProps> = ({
  spaceCards,
  loading,
}) => {
  const skeletonCount = 8;

  return (
    <SimpleGrid cols={4} spacing="lg" mt="md">
      {loading
        ? Array.from({ length: skeletonCount }).map((_, index) => (
            <ProductCartSkeleton key={`skeleton-${index}`} />
          ))
        : spaceCards.map(space => (
            <ProductCard
              key={space.flight_number}
              spaceCard={space}
             
            />
          ))}
    </SimpleGrid>
  );
};

export default SpaceCardList;

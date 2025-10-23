// src/components/ProductList.tsx (или HomePage.tsx)
import React from 'react';
import { SimpleGrid } from '@mantine/core';
import SpaceCard from '../spaceCard/SpaceCard'; // Путь к вашему основному ProductCard
import SpaceCartSkeleton from '../spaceCartSkeleton/SpaceCartSkeleton'; // Импортируем новый компонент заглушки
import type { SpaceCardType } from '../../types/SpaceCard';

type SpaceCardListProps = {
  spaceCards: SpaceCardType[];
  loading: boolean;
};

const SpaceCardList: React.FC<SpaceCardListProps> = ({
  spaceCards,
  loading,
}) => {
  const skeletonCount = 8;

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg" mt="md">
      {loading
        ? Array.from({ length: skeletonCount }).map((_, index) => (
            <SpaceCartSkeleton key={`skeleton-${index}`} />
          ))
        : spaceCards.map(space => (
            <SpaceCard key={space.flight_number} spaceCard={space} />
          ))}
    </SimpleGrid>
  );
};

export default SpaceCardList;

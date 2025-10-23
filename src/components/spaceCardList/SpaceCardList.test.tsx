// src/components/spaceCardList/SpaceCardList.test.tsx
import { render, screen } from '../../test-utils';
import { describe, it, expect, vi } from 'vitest';
import SpaceCardList from './SpaceCardList';
import type { SpaceCardType } from '../../types/SpaceCard';

// Мокаем дочерние компоненты
vi.mock('../spaceCard/SpaceCard', () => ({
  default: ({ spaceCard }: { spaceCard: SpaceCardType }) => (
    <div data-testid="space-card">{spaceCard.mission_name}</div>
  ),
}));

vi.mock('../spaceCartSkeleton/SpaceCartSkeleton', () => ({
  default: () => <div data-testid="skeleton">Skeleton</div>,
}));

const mockSpaceCards: SpaceCardType[] = [
  {
    flight_number: 1,
    mission_name: 'FalconSat',
    rocket: { rocket_name: 'Falcon 1' },
    details: 'First launch',
    links: { mission_patch_small: 'https://example.com/patch.jpg' },
  },
  {
    flight_number: 2,
    mission_name: 'DemoSat',
    rocket: { rocket_name: 'Falcon 1' },
    details: 'Second launch',
    links: { mission_patch_small: 'https://example.com/patch2.jpg' },
  },
];

describe('SpaceCardList', () => {
  it('рендерит 8 скелетонов, когда loading = true', () => {
    render(<SpaceCardList spaceCards={[]} loading={true} />);

    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons).toHaveLength(8);
  });

  it('рендерит карточки запусков, когда loading = false и данные загружены', () => {
    render(<SpaceCardList spaceCards={mockSpaceCards} loading={false} />);

    const cards = screen.getAllByTestId('space-card');
    expect(cards).toHaveLength(2);
    expect(screen.getByText('FalconSat')).toBeInTheDocument();
    expect(screen.getByText('DemoSat')).toBeInTheDocument();
  });
});

// src/App.test.tsx
import { render, screen, waitFor } from './test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import type { SpaceCardType } from './types/SpaceCard.ts';

declare const global: typeof globalThis;
// Мокаем SpaceCardList — чтобы не тестировать его логику, только App
vi.mock('./components/spaceCardList/SpaceCardList', () => ({
  default: ({
    spaceCards,
    loading,
  }: {
    spaceCards: SpaceCardType[];
    loading: boolean;
  }) => {
    if (loading) {
      return <div data-testid="loading-indicator">Загрузка...</div>;
    }
    return (
      <div data-testid="space-card-list">
        {spaceCards.map(card => (
          <div key={card.flight_number} data-testid="space-card">
            {card.mission_name}
          </div>
        ))}
      </div>
    );
  },
}));
import App from './App.tsx';

// Мокаем fetch глобально
const mockFetch = vi.fn();
global.fetch = mockFetch;

const mockData: SpaceCardType[] = [
  {
    flight_number: 1,
    mission_name: 'FalconSat',
    rocket: { rocket_name: 'Falcon 1' },
    details: 'First test flight',
    links: { mission_patch_small: 'https://example.com/patch1.jpg' },
  },
  {
    flight_number: 2,
    mission_name: 'DemoSat',
    rocket: { rocket_name: 'Falcon 1' },
    details: 'Second test flight',
    links: { mission_patch_small: 'https://example.com/patch2.jpg' },
  },
];

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('показывает индикатор загрузки при первом рендере', async () => {
    // fetch никогда не завершается → остаёмся в состоянии loading
    mockFetch.mockImplementationOnce(() => new Promise(() => {}));

    render(<App />);

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });

  it('рендерит список запусков после успешной загрузки данных', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<App />);

    // Ждём, пока данные загрузятся и компонент обновится
    await waitFor(() => {
      expect(screen.getByTestId('space-card-list')).toBeInTheDocument();
    });

    // Проверяем, что карточки отрендерены
    // expect(screen.getAllByTestId('space-card')).toHaveLength(2);
    expect(screen.getByText('FalconSat')).toBeInTheDocument();
    expect(screen.getByText('DemoSat')).toBeInTheDocument();
  });

  it('показывает сообщение об ошибке, если запрос завершился неудачно', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/ошибка/i)).toBeInTheDocument();
    });

    expect(screen.getByText('Ошибка: Failed to fetch')).toBeInTheDocument();
  });
});

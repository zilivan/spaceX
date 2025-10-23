// src/components/spaceCard/SpaceCard.test.tsx
import { render, screen, fireEvent, waitFor } from '../../test-utils';
import { describe, it, expect, vi } from 'vitest';
import SpaceCard from './SpaceCard.tsx';
import type { SpaceCardType } from '../../types/SpaceCard.ts';

// Мокаем модальное окно
vi.mock('../spaceCartMadal/SpaceCartMadal', () => ({
  SpaceCartMadal: ({
    opened,
    onClose,
  }: {
    opened: boolean;
    onClose: () => void;
  }) =>
    opened ? (
      <div data-testid="modal">
        <button onClick={onClose} data-testid="close-button">
          Close
        </button>
      </div>
    ) : null,
}));

const mockSpaceCard: SpaceCardType = {
  flight_number: 1,
  mission_name: 'FalconSat',
  rocket: { rocket_name: 'Falcon 1' },
  details: 'First launch',
  links: { mission_patch_small: 'https://example.com/patch.jpg' },
};

describe('SpaceCard', () => {
  it('отображает название миссии, название ракеты и изображение', () => {
    render(<SpaceCard spaceCard={mockSpaceCard} />);

    expect(screen.getByText('FalconSat')).toBeInTheDocument();
    expect(screen.getByText('Falcon 1')).toBeInTheDocument();

    const img = screen.getByAltText('') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('patch.jpg');
  });

  it('рендерит кнопку "See more"', () => {
    render(<SpaceCard spaceCard={mockSpaceCard} />);

    expect(
      screen.getByRole('button', { name: /see more/i })
    ).toBeInTheDocument();
  });

  it('открывает модальное окно при клике на кнопку "See more"', async () => {
    render(<SpaceCard spaceCard={mockSpaceCard} />);

    const button = screen.getByRole('button', { name: /see more/i });
    fireEvent.click(button);

    // Модальное окно появляется
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });
  });

  it('закрывает модальное окно при нажатии на кнопку закрытия', async () => {
    render(<SpaceCard spaceCard={mockSpaceCard} />);

    // Открываем модалку
    fireEvent.click(screen.getByRole('button', { name: /see more/i }));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });

    // Закрываем
    fireEvent.click(screen.getByTestId('close-button'));

    // Модалка исчезает
    await waitFor(() => {
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });
});

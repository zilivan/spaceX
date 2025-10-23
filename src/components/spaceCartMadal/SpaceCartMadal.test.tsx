// src/components/spaceCartMadal/SpaceCartMadal.test.tsx
import { render, screen, fireEvent, waitFor } from '../../test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SpaceCartMadal } from './SpaceCartMadal';
import type { SpaceCardType } from '../../types/SpaceCard';

// Создаём контейнер для порталов перед каждым тестом
beforeEach(() => {
  // Очищаем body от предыдущих modal-root
  const existing = document.getElementById('modal-root');
  if (existing) {
    existing.remove();
  }
});

const mockSpaceCard: SpaceCardType = {
  flight_number: 1,
  rocket: { rocket_name: 'Falcon 1' },
  mission_name: 'a',
  details: 'First launch of Falcon 1',
  links: { mission_patch_small: 'https://example.com/patch.jpg' },
};

describe('SpaceCartMadal', () => {
  it('не рендерит модальное окно, если opened = false', () => {
    render(
      <SpaceCartMadal
        spaceCard={mockSpaceCard}
        opened={false}
        onClose={() => {}}
      />
    );

    // Проверяем, что ничего не появилось в body
    expect(document.getElementById('modal-root')).not.toBeInTheDocument();
    expect(screen.queryByText('FalconSat')).not.toBeInTheDocument();
  });

  it('рендерит модальное окно с данными, если opened = true', async () => {
    const onClose = vi.fn();
    render(
      <SpaceCartMadal
        spaceCard={mockSpaceCard}
        opened={true}
        onClose={onClose}
      />
    );

    // Ждём, пока портал отрендерится в DOM
    await waitFor(() => {
      expect(document.body).toHaveTextContent('a');
    });
    expect(screen.getByText('Falcon 1')).toBeInTheDocument();
    expect(screen.getByText(/First launch of Falcon 1/)).toBeInTheDocument();
    const img = screen.getByAltText('') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('patch.jpg');
  });

  it('вызывает onClose при клике на кнопку закрытия ', async () => {
    const onClose = vi.fn();
    render(
      <SpaceCartMadal
        spaceCard={mockSpaceCard}
        opened={true}
        onClose={onClose}
      />
    );

    await waitFor(() => {
      expect(document.body).toHaveTextContent('a');
    });

    // Клик по кнопке закрытия
    const closeButton = screen.getByRole('button', { name: /close modal/i });
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

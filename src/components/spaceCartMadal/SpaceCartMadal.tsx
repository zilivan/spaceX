// LaunchDetailModal.tsx
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button, Stack, Text, Image } from '@mantine/core';

interface LaunchDetailModalProps {
  launch: {
    mission_name: string;
    launch_date_utc: string;
    details: string | null;
    links: {
      mission_patch: string | null;
    };
    rocket: {
      rocket_name: string;
    };
  };
  opened: boolean;
  onClose: () => void;
}

export const LaunchDetailModal = ({
  launch,
  opened,
  onClose,
}: LaunchDetailModalProps) => {
  // Закрытие по нажатию Escape
  useEffect(() => {
    if (!opened) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [opened, onClose]);

  // Если модалка не открыта — ничего не рендерим
  if (!opened) return null;

  // Находим или создаём контейнер для портала
  const modalRoot = document.getElementById('modal-root') || (() => {
    const el = document.createElement('div');
    el.id = 'modal-root';
    document.body.appendChild(el);
    return el;
  })();

  // Обработчик клика по оверлею
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1001,
      }}
      onClick={handleOverlayClick}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '24px',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        }}
      >
        {launch.links.mission_patch && (
          <Image
            src={launch.links.mission_patch}
            alt={launch.mission_name}
            fit="contain"
            style={{ height: 160, marginBottom: '16px' }}
          />
        )}

        <Stack gap="sm">
          <Text size="xl" fw={700}>
            {launch.mission_name}
          </Text>

          <Text>
            <strong>Rocket:</strong> {launch.rocket.rocket_name}
          </Text>

          <Text>
            <strong>Launch date:</strong>{' '}
            {new Date(launch.launch_date_utc).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>

          <Text>
            <strong>Details:</strong>{' '}
            {launch.details || 'No additional information available.'}
          </Text>

          <Button fullWidth mt="md" onClick={onClose}>
            Close
          </Button>
        </Stack>
      </div>
    </div>,
    modalRoot
  );
};
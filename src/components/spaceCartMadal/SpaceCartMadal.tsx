import { createPortal } from 'react-dom';
import { Stack, Text, Image, CloseButton } from '@mantine/core';
import type { SpaceCardType } from '../../types/SpaceCard';

type SpaceCartMadalProps = {
  spaceCard: SpaceCardType;

  opened: boolean;
  onClose: () => void;
};

export const SpaceCartMadal = ({
  spaceCard,
  opened,
  onClose,
}: SpaceCartMadalProps) => {
  if (!opened) return null;

  const modalRoot =
    document.getElementById('modal-root') ||
    (() => {
      const el = document.createElement('div');
      el.id = 'modal-root';
      document.body.appendChild(el);
      return el;
    })();

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
        onClick={e => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: '20px',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '90vh',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CloseButton
          onClick={onClose}
          size="lg"
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 1002,
          }}
          aria-label="Close modal"
        />

        <div
          style={{
            padding: '24px',
            overflowY: 'auto',
            maxHeight: 'calc(90vh - 24px)',
          }}
        >
          <Text size="xl" fw={700}>
            {spaceCard.mission_name}
          </Text>

          <Image
            src={spaceCard.links.mission_patch_small}
            alt={''}
            fit="contain"
            style={{ height: 160, marginBottom: '16px' }}
          />

          <Stack gap="sm">
            <Text size="xl" fw={700}>
              <strong>Mission name:</strong>
            </Text>

            <Text size="xl" fw={700}>
              {spaceCard.mission_name}
            </Text>

            <Text>
              <strong>Rocket name:</strong> {spaceCard.rocket.rocket_name}
            </Text>

            <Text>
              <strong>Details:</strong>{' '}
              {spaceCard.details || 'No additional information available.'}
            </Text>
          </Stack>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

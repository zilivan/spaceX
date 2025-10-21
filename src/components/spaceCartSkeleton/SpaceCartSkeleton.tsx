import React from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Group, Box } from '@mantine/core';

const SpaceCartSkeleton: React.FC = () => {
  return (
    <Card
      shadow="xs"
      padding="lg"
      withBorder
      style={{ height: 'auto', width: 'auto', borderRadius: '24px' }}
    >
      <Card.Section>
        <Box
          style={{
            backgroundColor: '#F3F5FA',
            width: 'auto',
            height: '276px',
            margin: '16px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FontAwesomeIcon
            icon={faBars}
            style={{ color: 'gray', width: '20px', height: '20px' }}
          />
        </Box>
      </Card.Section>

      <Group
        justify="space-between"
        mt="md"
        mb="md"
        align="center"
        h={150}
      ></Group>
    </Card>
  );
};

export default SpaceCartSkeleton;

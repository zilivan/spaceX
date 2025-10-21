import { useReducer, useEffect } from 'react';
import './App.css';
import type { SpaceCardType } from './types/SpaceCard';
import SpaceCardList from './components/spaseCardList/SpaceCardList';
import { AppShell, Title } from '@mantine/core';

interface SpaceCardsState {
  data: SpaceCardType[];
  loading: boolean;
  error: string | null;
}

type SpaceCardsAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: SpaceCardType[] }
  | { type: 'FETCH_ERROR'; payload: string };

const spaceCardsReducer = (
  state: SpaceCardsState,
  action: SpaceCardsAction
): SpaceCardsState => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload, error: null };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(spaceCardsReducer, {
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchSpaceLaunches = async () => {
      dispatch({ type: 'FETCH_START' });

      try {
        const response = await fetch('https://api.spacexdata.com/v3/launches');
        if (!response.ok) {
          throw new Error(`Ошибка сети: ${response.status}`);
        }
        const data: SpaceCardType[] = await response.json();
        const filteredData = data.filter(space => space.flight_number <= 20);

        dispatch({ type: 'FETCH_SUCCESS', payload: filteredData });
        // console.log(filteredData);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Произошла неизвестная ошибка';
        dispatch({ type: 'FETCH_ERROR', payload: errorMessage });
        //console.error('Ошибка при загрузке данных:', err);
      }
    };

    fetchSpaceLaunches();
  }, []);

  if (state.error) {
    return <div>Ошибка: {state.error}</div>;
  }

  return (
    <AppShell header={{ height: 50 }}>
      <AppShell.Header>
        <Title ta="center" order={2}>
          SpaceX Launches 2020
        </Title>
      </AppShell.Header>
      <AppShell.Main className="main">
        <SpaceCardList spaceCards={state.data} loading={state.loading} />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;

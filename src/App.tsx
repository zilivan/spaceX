import { useState, useEffect } from 'react';
import './App.css';

import type { SpaceCartMadal } from './types/SpaceCartMadal';
import type { SpaceCard } from './types/SpaceCard';
import SpaceCardList from './components/productList/SpaceCardList';
import { AppShell, Title } from '@mantine/core';
function App() {
  const [cartItems, setCartItems] = useState<SpaceCartMadal[]>([]);

  const [spaceCards, setSpaceCards] = useState<SpaceCard[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'https://api.spacexdata.com/v3/launches'
        );
        if (!response.ok) {
          throw new Error(`Ошибка сети: ${response.status}`);
        }
        const data: SpaceCard[] = await response.json();

        const spaces = data.filter( space => space.flight_number < 10);
 
        setSpaceCards(spaces);
       console.log(spaces);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Произошла неизвестная ошибка'
        );
        console.error('Ошибка при загрузке продуктов:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

 /* const updateCartItemQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeCartItem(id);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeCartItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const addToCart = (product: Product, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  if (loading) {
    return <div>Загрузка продуктов...</div>;
  }*/

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <>
      <AppShell header={{ height: 50 }}>
        withBorder={false}
        <AppShell.Header>
           <Title order={2}>SpaceX Launches 2020 </Title>
        </AppShell.Header>
        <AppShell.Main className="main">
         

          <SpaceCardList
            spaceCards={spaceCards}
            
            loading={loading}
          />
        </AppShell.Main>
      </AppShell>
    </>
  );
}

export default App;

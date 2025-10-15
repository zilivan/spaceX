// CartBag.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CartBag from './SpaceCartMadal'; // Убедитесь, что путь к файлу CartBag.tsx правильный
import type { CartItem } from '../../types/SpaceCartMadal'; // Убедитесь, что путь к типу правильный
import { MantineProvider } from '@mantine/core';

// Пример фиктивного типа CartItem, если не импортируется из другого места
// type CartItem = {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   quantity: number;
// };

// Фиктивные данные для тестов
const mockCartItem1: CartItem = {
  id: 1,
  name: 'Test Product 1',
  price: 100,
  image: 'https://example.com/test1.jpg',
  quantity: 2,
  category: 'banna',
};

const mockCartItem2: CartItem = {
  id: 2,
  name: 'Test Product 2',
  price: 50,
  image: 'https://example.com/test2.jpg',
  quantity: 1,
  category: 'banna',
};

const mockCartItems: CartItem[] = [mockCartItem1, mockCartItem2];
const mockTotal = 250; // (100 * 2) + (50 * 1) = 250

const renderWithMantine = (ui: React.ReactElement) => {
  return render(
    <MantineProvider>
      {' '}
      {/* Оборачиваем тестируемый компонент в MantineProvider */}
      {ui}
    </MantineProvider>
  );
};

describe('CartBag', () => {
  let mockUpdateQuantity = vi.fn();
  let mockRemoveItem = vi.fn();
  beforeEach(() => {
    // Создаем новые мок-функции перед каждым тестом
    mockUpdateQuantity = vi.fn();
    mockRemoveItem = vi.fn();
    // Очищаем историю вызовов всех моков перед каждым тестом
    vi.clearAllMocks();
  });

  // Вспомогательная функция для рендера компонента с нужными пропсами
  const renderCartBag = (items: CartItem[] = [], total: number = 0) => {
    renderWithMantine(
      <CartBag
        items={items}
        updateQuantity={mockUpdateQuantity}
        removeItem={mockRemoveItem}
        total={total}
      />
    );
  };

  it('renders empty cart message when items array is empty', () => {
    renderCartBag([], 0); // Рендерим с пустым массивом

    // Предположим, что в компоненте есть проверка на пустую корзину, например:
    // if (items.length === 0) return <Text ta="center">Корзина пуста</Text>;
    // В вашем текущем коде такой проверки нет, поэтому тест будет проверять отсутствие карточек.
    // Если добавите проверку, используйте getByText для сообщения.
    expect(screen.queryByText(mockCartItem1.name)).not.toBeInTheDocument(); // Карточки не должны отображаться
    expect(screen.queryByText(mockCartItem2.name)).not.toBeInTheDocument();
    // Здесь можно проверить, что Total равен 0 или что-то еще для пустой корзины, если отображается
    expect(screen.queryByText(`$ ${mockTotal}`)).not.toBeInTheDocument(); // Не ожидаем видеть предыдущий общий итог
    // Если в пустой корзине отображается общий итог 0:
    // expect(screen.getByText('$ 0')).toBeInTheDocument();
  });

  it('renders cart items correctly', () => {
    renderCartBag(mockCartItems, mockTotal);

    // Проверяем, что отображаются карточки для каждого товара
    expect(screen.getByText(mockCartItem1.name)).toBeInTheDocument();
    expect(screen.getByText(mockCartItem2.name)).toBeInTheDocument();

    // Проверяем, что отображаются цены за единицу
    expect(screen.getByText(`$ ${mockCartItem1.price}`)).toBeInTheDocument();
    expect(screen.getByText(`$ ${mockCartItem2.price}`)).toBeInTheDocument();

    // Проверяем, что отображаются количества
    expect(
      screen.getByText(mockCartItem1.quantity.toString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockCartItem2.quantity.toString())
    ).toBeInTheDocument();

    // Проверяем, что отображается общая сумма
    expect(screen.getByText(`$ ${mockTotal}`)).toBeInTheDocument();

    // Проверяем, что изображения присутствуют (проверяем по src или alt)
    expect(screen.getByAltText(mockCartItem1.name)).toBeInTheDocument();
    expect(screen.getByAltText(mockCartItem2.name)).toBeInTheDocument();
  });

  it('calls removeItem when the remove button is clicked', () => {
    renderCartBag(mockCartItems, mockTotal);

    // Находим кнопку удаления для первого товара (например, по иконке IconX или по ID)
    // Поскольку у нас несколько кнопок X, используем getAllByRole
    //const removeButtons = screen.getAllByRole('button', { name: /x/i }); // Ищем кнопки по содержанию иконки X
    // Или, если у ActionIcon нет доступного имени, можно использовать индекс:
    const allButtons = screen.getAllByRole('button');
    const indexOfRemoveButton1 = 2; // Для первого item (0:minus, 1:plus, 2:X)
    const indexOfRemoveButton2 = 5; // Для второго item (3:minus, 4:plus, 5:X)
    expect(allButtons).toHaveLength(6);

    fireEvent.click(allButtons[indexOfRemoveButton1]); // Клик по первой кнопке удаления

    // Проверяем, что mockRemoveItem была вызвана с правильным ID
    expect(mockRemoveItem).toHaveBeenCalledWith(mockCartItem1.id);
    expect(mockRemoveItem).toHaveBeenCalledTimes(1);

    fireEvent.click(allButtons[indexOfRemoveButton2]); // Клик по второй кнопке удаления
    expect(mockRemoveItem).toHaveBeenCalledWith(mockCartItem2.id);
    expect(mockRemoveItem).toHaveBeenCalledTimes(2);
  });

  it('calls updateQuantity with decreased value when minus button is clicked', () => {
    renderCartBag(mockCartItems, mockTotal);
    const allButtons = screen.getAllByRole('button');

    // Находим кнопку минус для первого товара
    const minusButtons = 0;
    expect(allButtons).toHaveLength(6);
    // Или используем индекс: const minusButton = screen.getAllByRole('button')[indexOfMinusButton];

    fireEvent.click(allButtons[minusButtons]); // Клик по кнопке минус первого товара (количество 2 -> 1)

    // Проверяем, что mockUpdateQuantity была вызвана с правильным ID и новым количеством
    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockCartItem1.id, 1); // 2 - 1 = 1
    expect(mockUpdateQuantity).toHaveBeenCalledTimes(1);
  });

  it('calls updateQuantity with increased value when plus button is clicked', () => {
    renderCartBag(mockCartItems, mockTotal);

    // Находим кнопку плюс для второго товара
    const allButtons = screen.getAllByRole('button');

    const plusButtons = 4;
    expect(allButtons).toHaveLength(6);

    // Или используем индекс: const plusButton = screen.getAllByRole('button')[indexOfPlusButton];

    fireEvent.click(allButtons[plusButtons]); // Клик по кнопке плюс второго товара (количество 1 -> 2)
    fireEvent.click(allButtons[plusButtons]);
    // Проверяем, что mockUpdateQuantity была вызвана с правильным ID и новым количеством
    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockCartItem2.id, 2); // 2 + 1 = 3
    expect(mockUpdateQuantity).toHaveBeenCalledTimes(2);
  });

  it('does not call updateQuantity with quantity less than 1 when minus button is clicked on item with quantity 1', () => {
    const itemWithQuantityOne = { ...mockCartItem2, quantity: 1 };
    renderCartBag([itemWithQuantityOne], itemWithQuantityOne.price); // Общий итог = цена одного товара
    const allButtons = screen.getAllByRole('button');

    const minusButtons = 0;
    expect(allButtons).toHaveLength(3);

    fireEvent.click(allButtons[minusButtons]); // Клик по кнопке минус товара с количеством 1

    // Проверяем, что mockUpdateQuantity была вызвана с минимальным количеством 1
    // (в вашем коде updateQuantity(item.id, Math.max(1, item.quantity - 1)))
    expect(mockUpdateQuantity).toHaveBeenCalledWith(itemWithQuantityOne.id, 1); // Math.max(1, 0) = 1
    expect(mockUpdateQuantity).toHaveBeenCalledTimes(1);
  });
});

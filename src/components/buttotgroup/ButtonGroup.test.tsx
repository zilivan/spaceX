// ButtonGroup.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MantineProvider } from '@mantine/core'; // Импортируем MantineProvider
import ButtonGroup from './ButtonGroup'; // Убедитесь, что путь к файлу ButtonGroup.tsx правильный

// Вспомогательная функция для рендера компонента с MantineProvider
// Это упрощает повторное использование в каждом тесте
const renderWithMantine = (ui: React.ReactElement) => {
  return render(
    <MantineProvider>
      {' '}
      {/* Оборачиваем тестируемый компонент в MantineProvider */}
      {ui}
    </MantineProvider>
  );
};

describe('ButtonGroup', () => {
  // beforeEach выполняется перед КАЖДЫМ тестом (it)

  let mockHandleIncrease = vi.fn();
  let mockHandleDecrease = vi.fn();
  beforeEach(() => {
    // Создаем новые мок-функции перед каждым тестом
    mockHandleIncrease = vi.fn();
    mockHandleDecrease = vi.fn();
    // Очищаем все моки (хотя в данном случае они создаются заново, но хорошая практика)
    // vi.clearAllMocks(); // Необязательно, если моки создаются заново
  });

  // Вспомогательная функция для рендера компонента с нужными пропсами и MantineProvider
  const renderButtonGroup = (quantity: number = 1) => {
    renderWithMantine(
      <ButtonGroup
        quantity={quantity}
        handleIncrease={mockHandleIncrease}
        handleDecrease={mockHandleDecrease}
      />
    );
  };

  it('renders the current quantity', () => {
    const testQuantity = 5;
    renderButtonGroup(testQuantity);

    // Находим элемент с текстом, содержащим количество
    const quantityText = screen.getByText(testQuantity.toString());
    expect(quantityText).toBeInTheDocument();
    expect(quantityText).toHaveTextContent(testQuantity.toString());
  });

  it('calls handleDecrease when the minus button is clicked', () => {
    renderButtonGroup(3);

    // Находим кнопку с иконкой минус
    // ActionIcon получает role="button"
    // Так как у нас две кнопки (минус и плюс), ищем первую (минус)
    const buttons = screen.getAllByRole('button');
    const minusButton = buttons[0]; // Первая кнопка - минус

    fireEvent.click(minusButton);

    expect(mockHandleDecrease).toHaveBeenCalledTimes(1);
  });

  it('calls handleIncrease when the plus button is clicked', () => {
    renderButtonGroup(2);

    // Находим кнопку с иконкой плюс
    // ActionIcon получает role="button"
    // Так как у нас две кнопки (минус и плюс), ищем вторую (плюс)
    const buttons = screen.getAllByRole('button');
    const plusButton = buttons[1]; // Вторая кнопка - плюс

    fireEvent.click(plusButton);

    expect(mockHandleIncrease).toHaveBeenCalledTimes(1);
  });

  it('displays correct quantity after increase/decrease calls', () => {
    const initialQuantity = 1;
    renderButtonGroup(initialQuantity);

    // Проверяем начальное количество
    expect(screen.getByText(initialQuantity.toString())).toBeInTheDocument();
    // Имитируем вызов handleIncrease (обычно это происходит в родительском компоненте)
    // Мы тестируем *только* отображение и вызовы функций.
    // Изменение состояния quantity *внутри* ButtonGroup не тестируется напрямую,
    // так как quantity передается как проп.
    // Тест проверяет, что при клике вызывается функция, которая *должна* изменить quantity в родителе.

    // Клик по плюс
    fireEvent.click(screen.getAllByRole('button')[1]); // Вторая кнопка (плюс)
    expect(mockHandleIncrease).toHaveBeenCalledTimes(1);
    // ВАЖНО: В этом тесте мы не перерендериваем компонент с новым quantity,
    // так как quantity - это проп, управляемый извне.
    // Этот тест проверяет *только* вызов функции.
    // Чтобы проверить отображение *нового* quantity, нужно перерендерить компонент с новым значением пропа.
    // Ниже пример такого теста.
    fireEvent.click(screen.getAllByRole('button')[1]); // Вторая кнопка (плюс)
    expect(mockHandleIncrease).toHaveBeenCalledTimes(2);
    // Клик по минус
    fireEvent.click(screen.getAllByRole('button')[0]); // Первая кнопка (минус)
    expect(mockHandleDecrease).toHaveBeenCalledTimes(1);
  });

  // Дополнительный тест: проверка перерендеринга с новым пропом
  it('updates displayed quantity when quantity prop changes', () => {
    const initialQuantity = 1;
    const newQuantity = 10;

    const { rerender } = renderWithMantine(
      <ButtonGroup
        quantity={initialQuantity}
        handleIncrease={mockHandleIncrease}
        handleDecrease={mockHandleDecrease}
      />
    );

    // Проверяем начальное количество
    expect(screen.getByText(initialQuantity.toString())).toBeInTheDocument();

    // Перерендериваем с новым значением quantity
    rerender(
      <MantineProvider>
        <ButtonGroup
          quantity={newQuantity}
          handleIncrease={mockHandleIncrease}
          handleDecrease={mockHandleDecrease}
        />
      </MantineProvider>
    );

    // Проверяем, что отображается новое количество
    expect(screen.getByText(newQuantity.toString())).toBeInTheDocument();
  });
});

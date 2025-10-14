import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
// Имитация window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false, // Или можно определить логику, например, через query
    media: query,
    onchange: null,
    addListener: vi.fn(), // Устаревший метод
    removeListener: vi.fn(), // Устаревший метод
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

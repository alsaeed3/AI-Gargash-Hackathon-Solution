// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock APIs that are not available in Jest environment
global.fetch = jest.fn();

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
    this.elements = new Set();
    this.mockIsIntersecting = true;
  }

  observe(element) {
    this.elements.add(element);
    this.callback([
      {
        isIntersecting: this.mockIsIntersecting,
        target: element,
        intersectionRatio: 1,
      },
    ]);
  }

  disconnect() {
    this.elements = new Set();
  }

  unobserve(element) {
    this.elements.delete(element);
  }

  // Helper for tests
  setMockIsIntersecting(isIntersecting) {
    this.mockIsIntersecting = isIntersecting;
    this.callback(
      [...this.elements].map((element) => ({
        isIntersecting,
        target: element,
        intersectionRatio: isIntersecting ? 1 : 0,
      }))
    );
  }
}

global.IntersectionObserver = MockIntersectionObserver;

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock next/router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    reload: jest.fn(),
    pathname: '/',
    query: {},
  }),
  usePathname: jest.fn().mockReturnValue('/'),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
}));
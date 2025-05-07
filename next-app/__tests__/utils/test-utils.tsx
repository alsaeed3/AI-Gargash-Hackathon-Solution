import React from 'react';
import { render as rtlRender } from '@testing-library/react';

// Function to render components with needed providers for testing
function render(ui: React.ReactElement, options = {}) {
  // You can add providers here if needed (e.g., theme provider, authentication provider, etc.)
  return rtlRender(ui, {
    wrapper: ({ children }) => children,
    ...options,
  });
}

// Re-export everything from React Testing Library
export * from '@testing-library/react';

// Override render method
export { render };
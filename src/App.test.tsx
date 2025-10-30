import { render, screen } from '@testing-library/react';
import React from 'react';

jest.mock('@react-three/fiber', () => ({
  Canvas: () => <canvas data-testid="three-canvas" />
}));

jest.mock('@react-three/drei', () => ({
  OrbitControls: () => null
}));

import App from './App';

describe('App', () => {
  it('renders hero heading and call to action', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /test/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
  });
});

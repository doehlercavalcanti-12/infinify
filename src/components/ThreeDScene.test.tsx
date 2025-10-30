import { render, screen } from '@testing-library/react';
import React from 'react';

jest.mock('@react-three/fiber', () => ({
  Canvas: () => <canvas data-testid="three-canvas" />
}));

jest.mock('@react-three/drei', () => ({
  OrbitControls: () => null
}));

import ThreeDScene from './ThreeDScene';

describe('ThreeDScene', () => {
  it('renders a canvas element', () => {
    render(<ThreeDScene />);

    expect(screen.getByTestId('three-canvas')).toBeInTheDocument();
  });
});

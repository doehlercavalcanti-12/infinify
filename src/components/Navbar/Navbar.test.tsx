import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Navbar from './Navbar';

jest.mock('@react-three/drei', () => ({}));

describe('Navbar', () => {
  it('toggles the mobile navigation when the hamburger is clicked', () => {
    render(<Navbar />);

    const toggleButton = screen.getByRole('button', { name: /open navigation menu/i });
    const menu = screen.getByLabelText('Mobile navigation');

    expect(menu.className).not.toEqual(expect.stringContaining('navListActive'));

    fireEvent.click(toggleButton);
    expect(menu).toHaveAttribute('aria-hidden', 'false');
    expect(menu.className).toEqual(expect.stringContaining('navListActive'));

    fireEvent.click(toggleButton);
    expect(menu).toHaveAttribute('aria-hidden', 'true');
  });
});

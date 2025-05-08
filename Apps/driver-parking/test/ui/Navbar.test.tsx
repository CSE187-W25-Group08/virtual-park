import { it, afterEach, vi, expect } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'

import Navbar from '../../src/components/Navbar'

afterEach(() => {
  cleanup()
})

it('Register Button Exists', async () => {
    render(<Navbar locale='en'/>)
    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton)
})

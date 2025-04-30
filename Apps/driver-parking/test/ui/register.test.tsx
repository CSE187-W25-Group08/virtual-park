import { it, afterEach, vi, expect } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'

import Vehicles from '../../src/app/register/Vehicles'
// import { signup } from '../../src/app/signup/actions'

afterEach(() => {
  cleanup()
})

it('Register Button Exists', async () => {
    render(<Vehicles/>)
    const registerButton = screen.getByText('+ Register Vehicle');
    expect(registerButton).not.toBeNull();
})

it('Click on Register Vehicle and access registration form', async () => {
  render(<Vehicles/>)
  const registerButton = screen.getByText('+ Register Vehicle');
  fireEvent.click(registerButton);

  const formHeading = screen.queryByText('Register Vehicle');
  expect(formHeading).not.toBeNull();
})
import { it, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'

import Login from '../../src/app/Login/View'

afterEach(() => {
  cleanup()
})

it('should render the Login in component', async () => {
  render(<Login />)
  await screen.findByText('Sign in')
})
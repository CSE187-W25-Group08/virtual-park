import { it, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'

import Signup from '../../src/app/signup/Signup'

afterEach(() => {
  cleanup()
})

it('should render the Signup component', async () => {
  render(<Signup />)
  await screen.findByText('Create an Account')
})
import { it, afterEach, vi} from 'vitest'
import { fireEvent, render, screen, cleanup} from '@testing-library/react'

import View from '../../src/app/drivers/[driverId]/View'


it('contains image', async () => {
  render(<View driverId = {'e5fd7cb1-75b0-4d23-a7bc-361e2d0621da'}/>)
  await screen.findByText('Violation')
})

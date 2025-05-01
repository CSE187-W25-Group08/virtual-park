import { it, afterEach, expect } from 'vitest'
import { render, screen, cleanup} from '@testing-library/react'

import TicketList from '../../src/app/ticket/list'
// import { signup } from '../../src/app/signup/actions'

afterEach(() => {
  cleanup()
})

it('Expect ticketlist to contain', async () => {
    render(<TicketList/>)
    const violationTexts = screen.getAllByText('Violation');
    expect(violationTexts).toHaveLength(2);
})

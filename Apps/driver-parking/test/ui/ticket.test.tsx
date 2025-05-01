import { it, afterEach, expect } from 'vitest'
import { render, screen, cleanup} from '@testing-library/react'

import TicketList from '../../src/app/ticket/list'

afterEach(() => {
  cleanup()
})

it('contains Violation Text', async () => {
    render(<TicketList/>)
    const violationTexts = screen.getAllByText('Violation');
    expect(violationTexts).toHaveLength(2);
})

it('contains Paid Text', async () => {
    render(<TicketList/>)
    screen.getByText('Paid');
})

it('contains Unpaid Text', async () => {
    render(<TicketList/>)
    screen.getByText('Unpaid');
})

it('contains ticket deductible', async () => {
    render(<TicketList/>)
    await screen.findByText('$50.24');
})
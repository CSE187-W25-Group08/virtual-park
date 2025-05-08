import { it, afterEach, vi, expect } from 'vitest'
import { render, screen, cleanup, fireEvent} from '@testing-library/react'

import TicketList from '../../src/app/[locale]/ticket/list'
import Page from '../../src/app/[locale]/ticket/page'

import {paidList, unpaidList, appealedList} from '../testData'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})
vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))

vi.mock('../../src/app/[locale]/ticket/actions', () => ({
  listPaid: vi.fn(() => paidList),
  listUnpaid: vi.fn(() => unpaidList),
  listAppealed: vi.fn(() => appealedList),
  getTicketById: vi.fn(() => {}),
  setTicketPaid: vi.fn(() => {})
}))

it('Renders Page', async () => {
  render(<Page/>)
})

it('contains Violation Text', async () => {
  render(<TicketList/>)
  await screen.findByText('🔴 Unpaid Violations');
})

it('contains Paid Text', async () => {
    render(<TicketList/>)
    await screen.findByText('🟢 Paid Violations');
})

it('contains expired meter violation', async () => {
    render(<TicketList/>)
    await screen.findAllByText('Expired meter');
})

it('Clicks on ticket', async () => {
  render(<TicketList/>)
  const ticket = await screen.findByText('Cannot park');
  fireEvent.click(ticket)
})

/*
it('contains expired meter violation', async () => {
    render(<TicketList/>)
    await screen.findByText('4/25/2025');
})

it('contains ticket deductible', async () => {
    render(<TicketList/>)
    await screen.findByText('$50.02');
})
    */
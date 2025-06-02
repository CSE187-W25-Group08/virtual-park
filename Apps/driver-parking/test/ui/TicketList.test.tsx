import { it, afterEach, vi, expect } from 'vitest'
import { render, screen, cleanup, fireEvent} from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { useRouter } from 'next/navigation'

import TicketList from '../../src/app/[locale]/ticket/list'
import Page from '../../src/app/[locale]/ticket/page'
import { ticket as ticketMessages } from '../../messages/en.json'

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

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={{ ticket: ticketMessages }}>
      {component}
    </NextIntlClientProvider>
  )
}

it('Renders Page', async () => {
  renderWithIntl(<Page/>)
})

it('contains Violation Text', async () => {
  renderWithIntl(<TicketList/>)
  await screen.findByText('Unpaid Violations');
})

it('contains Paid Text', async () => {
    renderWithIntl(<TicketList/>)
    await screen.findByText('Paid Violations');
})

it('contains expired meter violation', async () => {
    renderWithIntl(<TicketList/>)
    await screen.findAllByText('Expired meter');
})

it('Clicks on ticket', async () => {
  const mockPush = vi.fn();
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any);
  
  renderWithIntl(<TicketList/>)
  const ticket = await screen.findByText('Cannot park');
  fireEvent.click(ticket)
  expect(mockPush).toHaveBeenCalledWith('ticket/t4');
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
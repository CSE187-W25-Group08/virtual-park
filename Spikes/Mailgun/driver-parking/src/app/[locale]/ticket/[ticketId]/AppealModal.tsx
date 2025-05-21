'use client'

import { ChangeEvent, useState } from 'react'
import { useTranslations } from 'next-intl'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'

type AppealModalProps = {
  open: boolean
  onClose: () => void
  onSubmit: (appealReason: string) => void
}

export default function AppealModal({ open, onClose, onSubmit }: AppealModalProps) {
  const [appealReason, setAppealReason] = useState('')
  const t = useTranslations('ticket_details')
  const t2 = useTranslations('labels')

  const handleAppealReasonChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setAppealReason(ev.target.value)
  }

  const handleSubmit = () => {
    onSubmit(appealReason)
    setAppealReason('')
  }

  const handleClose = () => {
    setAppealReason('')
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '80%', sm: 400 },
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <TextField
          fullWidth
          multiline
          rows={4}
          label={t('appealReason')}
          placeholder={t('appealPlaceholder')}
          value={appealReason}
          onChange={handleAppealReasonChange}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button onClick={() => setAppealReason('')}>
            {t2('clear')}
          </Button>
          <Button variant='contained' onClick={handleSubmit}>
            {t2('submit')}
          </Button>
        </Box>
      </Paper>
    </Modal>
  )
}

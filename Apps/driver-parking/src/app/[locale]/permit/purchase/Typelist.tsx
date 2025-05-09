'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

import { permitTypes } from '../actions'
import PermitCard from './Typecard'
import { Permit } from '../../../../permit'

export default function TypeList() {
  const [permitType, setpermitType] = useState<Permit[]>([])
  const t = useTranslations('purchase_permit')
  // const [purchased, setPurchased] = useState<Permit | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      const fetch = await permitTypes()
      setpermitType(fetch)
    }
    fetchData()
  }, [])

  const purchaseHandler = (permit: Permit) => {
    // setPurchased(permit)
    alert(`${t('purchased')} ${permit.type === 'Student' ? t('student') : permit.type === 'Staff' ? t('staff') : permit.type === 'Disabled' ? t('disabled') : ''} $${permit.price}`)
  }

  return (
    <div style={{ padding: '1rem' }}>
      {permitType.map((permit) => (
        <PermitCard key={permit.type} permit={permit} purchased={purchaseHandler} />
      ))}
    </div>
  )
}

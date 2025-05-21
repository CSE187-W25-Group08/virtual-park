'use client'

import { useState, useEffect } from 'react'
// import { useTranslations } from 'next-intl'

import { permitTypes } from '../actions'
import PermitCard from './Typecard'
import { PermitType } from '../../../../permit'

export default function TypeList() {
  const [permitTypeList, setpermitTypeList] = useState<PermitType[]>([])
  // const t = useTranslations('purchase_permit')
  // const [purchased, setPurchased] = useState<Permit | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const fetch = await permitTypes()
      setpermitTypeList(fetch)
    }
    fetchData()
  }, [])

  return (
    <div style={{ padding: '1rem' }}>
      {permitTypeList.map((permit) => (
        <PermitCard key={permit.type} permit={permit} />
      ))}
    </div> 
  )
}

'use client'

import { useState, useEffect } from 'react'
import { permitTypes } from '../actions'
import PermitCard from './Typecard'
import { Permit } from '../../../../permit'

export default function typeList() {
  const [permitType, setpermitType] = useState<Permit[]>([])
  const [purchased, setPurchased] = useState<Permit | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      const fetch = await permitTypes()
      setpermitType(fetch)
    }
    fetchData()
  }, [])

  const purchaseHandler = (permit: Permit) => {
    setPurchased(permit)
    alert(`Purchased: ${permit.type} ($${permit.price})`)
  }

  return (
    <div style={{ padding: '1rem' }}>
      {permitType.map((permit) => (
        <PermitCard key={permit.type} permit={permit} purchased={purchaseHandler} />
      ))}
    </div>
  )
}

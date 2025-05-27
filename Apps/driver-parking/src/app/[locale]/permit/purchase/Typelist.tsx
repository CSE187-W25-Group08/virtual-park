'use client'

import { useState, useEffect } from 'react'
// import { useTranslations } from 'next-intl'

import { permitTypes, getUserPermits} from '../actions'
import PermitCard from './Typecard'
import { PermitType } from '../../../../permit'

export default function TypeList() {
  const [permitTypeList, setpermitTypeList] = useState<PermitType[]>([])
  // const t = useTranslations('purchase_permit')
  // const [purchased, setPurchased] = useState<Permit | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      // console.log('Stripe Public Key:', process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
      const permits = await permitTypes()
      const alreadyOwnedPermits = await getUserPermits()
      console.log(alreadyOwnedPermits);
      console.log(permits)
      // https://chatgpt.com/c/68224fea-167c-8007-b525-2167c07b5496
      const ownedTypes = new Set(alreadyOwnedPermits.map(p => p.type));
      const updatedPermits = permits.map(p => ({
        ...p,
        purchased: ownedTypes.has(p.type),
      }));
      console.log(updatedPermits)
      setpermitTypeList(updatedPermits);
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

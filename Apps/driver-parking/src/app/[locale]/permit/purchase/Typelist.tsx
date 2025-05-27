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
      try {
      // console.log('Stripe Public Key:', process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
      const permits = await permitTypes()
      const alreadyOwnedPermits = await getUserPermits()
      // https://chatgpt.com/c/68224fea-167c-8007-b525-2167c07b5496
      const now = new Date();
      // Only include permits that are not expired
      const ownedTypes = new Set(
        alreadyOwnedPermits
          .filter(p => new Date(p.expDate) > now)
          .map(p => p.type)
      );
      const updatedPermits = permits.map(p => ({
        ...p,
        purchased: ownedTypes.has(p.type),
      }));
      setpermitTypeList(updatedPermits);}
      catch (e) {
      console.error('Error loading permit types:', e)
      }
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

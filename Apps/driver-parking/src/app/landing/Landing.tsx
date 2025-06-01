'use client'

import {Box, Link, Typography} from '@mui/material'
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import LotList from "./LotList"
import TopNav from './TopNav'
import ParkNow from './ParkNow'
import { useTranslations } from "next-intl";
import { useRouter } from 'next/navigation'

export default function Landing() {
  const router = useRouter()
  const t = useTranslations('landing')

  return (
    <>
      <Box sx={{p:0, m:0}}>
        <TopNav />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 0.5 }}>
          <ParkNow />
          <Box  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1, width: '100vw', p:3, backgroundColor: '#F1F3F4' }}>
            <Typography variant="h5" sx={{mb:4}}>
              Not sure where to park?
            </Typography>
            <Typography variant="body1">
              See all available lots
            </Typography>
            <LotList />
          </Box>
        </Box>
        <Box sx={{backgroundColor:'#045081', width: '100%', height: '8vh', color: 'white', m:0, display: 'flex', alignItems:'center', justifyContent:'center', gap: 1}}> 
          <InfoOutlineIcon />
          <Link href="https://github.com/CSE187-W25-Group08/virtual-park" color='inherit'><Typography>About Virtual Park</Typography></Link>
        </Box>
      </Box>
    </>
  )
}

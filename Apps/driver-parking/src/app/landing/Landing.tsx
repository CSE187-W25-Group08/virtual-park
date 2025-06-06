'use client'

import {Box, Link, Typography} from '@mui/material'
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import LocaleSwitcher from '../languageSwitcher/LocaleSwitcher'
import LotList from "./LotList"
import TopNav from './TopNav'
import ParkNow from './ParkNow'
import { useTranslations } from "next-intl";

export default function Landing() {
  const t = useTranslations('landing')

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      p: 0,
      m: 0,
    }}>
      <TopNav />
      
      <Box sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 0.5,
        width: '100%',
      }}>
        <ParkNow />
        
        <Box sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          p: 3,
          backgroundColor: '#F1F3F4',
        }}>
          <Typography variant="h5" sx={{ mb: 4 }}>
            {t("notSure")}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {t("seeAll")}
          </Typography>
          
          <Box sx={{
            flexGrow: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <LotList />
          </Box>
        </Box>
      </Box>
      
      <Box sx={{
        backgroundColor: '#063E22',
        width: '100%',
        height: '8vh',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection:'row',
        flexShrink: 0,
        p:3
      }}> 
       <Box sx={{ display: 'flex', justifyContent:'center', alignItems:'center', gap:1}}>
          <InfoOutlineIcon />
          <Link 
            href="https://github.com/CSE187-W25-Group08/virtual-park" 
            color='inherit'
            underline="none"
          >
            <Typography>{t("about")}</Typography>
          </Link>
        </Box>
         <LocaleSwitcher bottom />
      </Box>
    </Box>
  )
}
'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'
import { useTranslations } from "next-intl";
import bg from "../../public/img/aerial-bg-photo.png"

export default function ParkNow() {
  const router = useRouter()
  const t = useTranslations('landing')

  // https://chatgpt.com/c/683b7c89-1ce4-8007-a0ea-ef438cd664e9
  return (
    <Box
      sx={{
        position: 'relative',
        width: '88vw',
        maxWidth: 800,
        height: 300,
        margin: '32px auto',
        borderRadius: 5,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${bg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          color: 'white',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
          {t("moto")}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('/permit/purchase')}
          sx={{ mt: 2, width: "50vw", height:"8vh", maxWidth: 500, borderRadius: 2}}
        >
          <Typography sx={{fontSize:'18px'}}>
            {t("parkNow")}
          </Typography>
        </Button>
      </Box>
    </Box>
  )
}

'use client';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import MapIcon from '@mui/icons-material/Map';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Lot } from '@/lot';
import {
  Chip,
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import { useRouter } from 'next/navigation'
type LotDetailsProps = {
  selectedLot: Lot;
};
export default function LotDetails({ selectedLot }: LotDetailsProps) {
  const router = useRouter()
  return (
    <Box mt={4} display="flex" justifyContent="center">
      <Card sx={{ maxWidth: 400, width: '100%', p: 2, borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            <Box display="flex" alignItems="center">
              <LocalParkingIcon fontSize="medium" sx={{ mr: 1 }} />
              {selectedLot.name}
            </Box>
          </Typography>
          <Divider sx={{ mb: 1 }} />

          <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            {selectedLot.address}
          </Typography>

          <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <MapIcon fontSize="small" sx={{ mr: 1 }} />
            <strong>Zone:</strong>&nbsp;{selectedLot.zone}
          </Typography>

          <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{display:'flex', flexDirection:'column'}}>
              <Box sx={{display:'flex', alignItems:'center', mb: 1}}>
                <VerifiedUserIcon fontSize="small" sx={{ mr: 1 }} />
                <strong>Valid Permits:</strong>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {selectedLot.validPermits.map((permit: string) => (
                  <Chip key={permit} label={permit} color="info" variant="outlined" />
                ))}
              </Box>
            </Box>
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={() => router.push('/permit/purchase')}>
            Buy Permit
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

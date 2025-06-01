'use client';

import { useEffect, useState } from 'react';
import { TextField, Autocomplete, ListItemIcon, ListItem, ListItemText, Chip} from '@mui/material';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { getLots } from '../[locale]/lot/action';
import { Lot } from '@/lot';

import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import { useRouter } from 'next/navigation'
export default function LotList() {
  const [lots, setLots] = useState<Lot[]>([]);
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
  const router = useRouter()

  useEffect(() => {
    const setLotData = async () => {
      const list = await getLots();
      if (list) setLots(list);
    };
    setLotData();
  }, []);

  return (
    <Box sx={{ maxWidth: "100%", width: 300, margin: 'auto', mt: 1, p: 1}}>
      <Autocomplete
        options={lots}
        getOptionLabel={(option) => option.name}
        onChange={(_, newValue) => setSelectedLot(newValue)}
        autoHighlight
        renderInput={(params) => (
            <TextField {...params} label="Search by lot name" variant="outlined" />
        )}
        // https://mui.com/material-ui/react-autocomplete/
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <ListItem key={key} {...optionProps}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <LocationOnIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={option.name} />
            </ListItem>
          );
        }}
        noOptionsText="No lots found"
        fullWidth
      />

      {selectedLot && (
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

            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button variant="contained" color="primary" onClick={() => router.push('/permit/purchase')}>
                Buy Permit
              </Button>
            </CardActions>
          </Card>
        </Box>
      )}
    </Box>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { Box, TextField, Autocomplete, ListItemIcon, ListItem, ListItemText} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { getLots } from '../[locale]/lot/action';
import { Lot } from '@/lot';
import LotDetails from './LotDetails';
export default function LotList() {
  const [lots, setLots] = useState<Lot[]>([]);
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);

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
      {selectedLot && (<LotDetails selectedLot={selectedLot} /> )}
    </Box>
  );
}

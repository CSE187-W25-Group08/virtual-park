'use client';
import { useEffect, useState } from 'react';
import { Box, Card, Typography, Button, TextField,
  //  Switch, 
  //  FormControlLabel 
  } from '@mui/material';
import { useTranslations } from 'next-intl';

import {Vehicle,VehicleForm} from '../../../register'
import { getUserVehicles, registerVehicle } from './actions'

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const t = useTranslations('vehicle')

  // fetches user's registered vehicles
  useEffect(() => {
    const fetchData = async () => {
      try {
        setVehicles(await getUserVehicles())
      } catch (e) {
        setError(e+'')
      }
    };
    fetchData()
  }, []);

  const emptyForm = {
    driver: '',
    licensePlate: '',
    make: '',
    model: '',
    color: '',
    isDefault: false,
  };
  const [formData, setFormData] = useState(emptyForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const handleToggle = () => {
  //   setFormData(prev => ({ ...prev, isDefault: !prev.isDefault }));
  // };

  const isFormValid =
  // formData.driver.trim() &&
  formData.licensePlate.trim() &&
  formData.make.trim() &&
  formData.model.trim() &&
  formData.color.trim();


  // register a new vehicle
  const handleSubmit = async () => {
    const newVehicle: VehicleForm = {
      make: formData.make,
      model: formData.model,
      licensePlate: formData.licensePlate,
      color: formData.color
    };

    try {
      const result = await registerVehicle(newVehicle)

      setVehicles(prev => [...prev, result])
      setShowForm(false)
      setFormData(emptyForm)
    } catch (e) {
      setError(e + '')
    }
  };

  return (
    <Card sx={{ p: 2, border: '1px solid #ccc', width: 325 }}>
      {!showForm ? (
        <>
        <Typography variant="h6" sx={{ mb: 2 }}>{t('title')}</Typography>
          {vehicles.map((vehicle, index) => (
            <Box key={index}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  py: 1,
                  borderBottom: index !== vehicles.length - 1 ? '1px dashed #ccc' : 'none',
                }}
              >
                <Typography variant="body2">
                  {vehicle.make}, {vehicle.model} - {vehicle.color} 
                  <br />
                  ({vehicle.licensePlate})
                </Typography>
                {/* <Typography
                  variant="body2"
                  sx={{ color: 'primary.main', cursor: 'pointer' }}
                >
                  {t('edit')}
                </Typography> */}
              </Box>
            </Box>
          ))}

          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 2, textTransform: 'none', fontWeight: 500 }}
            onClick={() => setShowForm(true)}
          >
            {t('register')}
          </Button>
          <div>{error}</div>
        </>
      ) : (
        <>
        <Typography variant="h6" sx={{ mb: 2 }}>{t('addTitle')}</Typography>
          {/* <TextField
            required
            label="Driver"
            name="driver"
            fullWidth
            value={formData.driver}
            onChange={handleChange}
            sx={{ mb: 2 }}
          /> */}
          <TextField
            required
            label={t('licensePlate')}
            name="licensePlate"
            fullWidth
            value={formData.licensePlate}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            required
            label={t('make')}
            name="make"
            fullWidth
            value={formData.make}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            required
            label={t('model')}
            name="model"
            fullWidth
            value={formData.model}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            required
            label={t('color')}
            name="color"
            fullWidth
            value={formData.color}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          {/* <FormControlLabel
            control={<Switch checked={formData.isDefault} onChange={handleToggle} />}
            label={t('default')}
            sx={{ mb: 2 }}
          /> */}

          <Box display="flex" justifyContent="space-between">
            <Button onClick={() => {
                    setShowForm(false);
                    setFormData(emptyForm);
                }}
            >
              {t('cancel')}
            </Button>
            <Button variant="contained" onClick={handleSubmit} disabled={!isFormValid}>{t('save')}</Button>
          </Box>
        </>
      )}
    </Card>
  );
}

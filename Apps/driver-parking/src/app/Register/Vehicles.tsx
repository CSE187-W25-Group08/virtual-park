'use client';
import { useEffect, useState } from 'react';
import { Box, Card, Typography, Button, TextField, MenuItem, Switch, FormControlLabel } from '@mui/material';

import {Vehicle} from '../../register'
import { getUserVehicles } from './actions'

// const initialVehicles = [
//   { id: '123', driver: 'Bob', make: 'Toyota', model: 'Corolla', color: 'silver', license_plate: 'B247KLM' },
//   { id: '456', driver: 'Bill', make: 'Honda', model: 'Accord', color: 'black', license_plate: 'F918WZQ' },
//   { id: '789', driver: 'John', make: 'Toyota', model: 'Prius', color: 'blue', license_plate: 'T304MNE' },
//   { id: '100', driver: 'Pork', make: 'Honda', model: 'Civic', color: 'red', license_plate: 'R682LJD' },
// ];

export default function Vehicles() {
  // const [vehicles, setVehicles] = useState(initialVehicles);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

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

  const handleChange = (e: any) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleToggle = () => {
    setFormData(prev => ({ ...prev, isDefault: !prev.isDefault }));
  };

  const isFormValid =
  formData.driver.trim() &&
  formData.licensePlate.trim() &&
  formData.make.trim() &&
  formData.model.trim() &&
  formData.color.trim();

  const handleSubmit = () => {
    const newVehicle = {
      id: Date.now().toString(),
      driver: formData.driver,
      make: formData.make,
      model: formData.model,
      licensePlate: formData.licensePlate,
      color: formData.color
    };
    setVehicles(prev => [...prev, newVehicle]);
    setShowForm(false);
    setFormData(emptyForm)
  };

  return (
    <Card sx={{ p: 2, border: '1px solid #ccc', width: 325 }}>
      {!showForm ? (
        <>
        <Typography variant="h6" sx={{ mb: 2 }}>Vehicles</Typography>
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
                  {vehicle.make}, {vehicle.model} - {vehicle.color} ({vehicle.licensePlate})
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'primary.main', cursor: 'pointer' }}
                >
                  Edit
                </Typography>
              </Box>
            </Box>
          ))}

          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 2, textTransform: 'none', fontWeight: 500 }}
            onClick={() => setShowForm(true)}
          >
            + Register Vehicle
          </Button>
          <div>{error}</div>
        </>
      ) : (
        <>
        <Typography variant="h6" sx={{ mb: 2 }}>Register Vehicle</Typography>
          <TextField
            required
            label="Driver"
            name="driver"
            fullWidth
            value={formData.driver}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            required
            label="License Plate"
            name="licensePlate"
            fullWidth
            value={formData.licensePlate}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            required
            label="Make"
            name="make"
            fullWidth
            value={formData.make}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            required
            label="Model"
            name="model"
            fullWidth
            value={formData.model}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            required
            label="Color"
            name="color"
            fullWidth
            value={formData.color}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={<Switch checked={formData.isDefault} onChange={handleToggle} />}
            label="Default Vehicle"
            sx={{ mb: 2 }}
          />

          <Box display="flex" justifyContent="space-between">
            <Button onClick={() => {
                    setShowForm(false);
                    setFormData(emptyForm);
                }}
            >
                Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit} disabled={!isFormValid}>Save</Button>
          </Box>
        </>
      )}
    </Card>
  );
}

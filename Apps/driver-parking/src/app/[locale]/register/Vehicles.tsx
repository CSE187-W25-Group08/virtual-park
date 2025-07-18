'use client'
import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Fade,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { useTranslations } from 'next-intl'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import { Vehicle, VehicleForm } from '../../../register'
import {
  getUserVehicles,
  registerVehicle,
  updatePrimaryVehicle,
  editVehicle,
} from './actions'

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [showEditForm, setShowEditForm] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('')
  const [dataFetched, setDataFetched] = useState(false)
  const t = useTranslations('vehicle')
  const theme = useTheme()

  // fetches user's registered vehicles
  useEffect(() => {
    const fetchData = async () => {
      try {
        setVehicles(await getUserVehicles())
      } catch (e) {
        setError(e + '')
      } finally {
        setDataFetched(true)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {}, [setVehicles, vehicles])

  const emptyForm = {
    driver: '',
    licensePlate: '',
    make: '',
    model: '',
    color: '',
    vehicleType: '',
    isDefault: false,
  }

  const [formData, setFormData] = useState(emptyForm)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [selectedIsActive, setSelectedIsActive] = useState(false)

  const handleEdit = (vehicle: Vehicle) => {
    setShowEditForm(true)

    setSelectedVehicle(vehicle)
    setSelectedIsActive(vehicle.active)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleToggle = () => {
    setFormData((prev) => ({ ...prev, isDefault: !prev.isDefault }))
  }

  const isFormValid = (
    licensePlate?: string,
    make?: string,
    model?: string,
    color?: string,
    vehicleType?: string
  ): boolean => {
    return (
      !!licensePlate?.trim() &&
      !!make?.trim() &&
      !!model?.trim() &&
      !!color?.trim() &&
      !!vehicleType?.trim()
    )
  }

  const handleEditSubmit = async () => {
    const result = await editVehicle(selectedVehicle)
    await updatePrimaryVehicle(result)
    setShowEditForm(false)
    setVehicles(await getUserVehicles())
  }

  // register a new vehicle
  const handleSubmit = async () => {
    const newVehicle: VehicleForm = {
      make: formData.make,
      model: formData.model,
      licensePlate: formData.licensePlate,
      color: formData.color,
      vehicleType: formData.vehicleType,
      active: vehicles.length == 0 ? true : formData.isDefault,
    }

    try {
      const addedVehicle = await registerVehicle(newVehicle)
      await updatePrimaryVehicle(addedVehicle)

      // setVehicles(prev => [...prev, result])
      setVehicles(await getUserVehicles())
      setShowForm(false)
      setFormData(emptyForm)
    } catch (e) {
      setError(e + '')
    }
  }

  return (
    <Fade in={true} timeout={500}>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems:'center',
          flexDirection: 'column'
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2, mt:1}}>
          <DirectionsCarIcon fontSize='large'></DirectionsCarIcon>
          <Typography variant="h5">
            {t('title')}
          </Typography>
        </Box>
        <Card
          sx={{
            p: 2,
            border: '1px solid #ccc',
            width: { xs: '100%', sm: '400px', md:'600px', lg:'800px' },
          }}
        >
        {!showEditForm && !showForm ? (
          <>
            {!dataFetched ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                <CircularProgress color="success" size={24} />
              </Box>
            ) : (
              <>
                {vehicles.map((vehicle, index) => (
                  <Box key={index}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          py: 1,
                          borderBottom:
                            index !== vehicles.length - 1
                              ? `1px dashed ${theme.palette.secondary.main}`
                              : 'none',
                        }}
                      >
                        <Typography variant="body1">
                          {vehicle.make} {vehicle.model} - {vehicle.color}
                          <br />({vehicle.licensePlate})
                        </Typography>
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: 1}}
                        >
                          {vehicle.active && (
                            <Typography
                              variant="caption"
                              sx={{
                                backgroundColor: "#FFD700",
                                borderRadius: '8px',
                                px: 1,
                                fontWeight: 500,
                                fontSize: '0.75rem',
                              }}
                            >
                              {t('primary')}
                            </Typography>
                          )}
                          <Typography
                            variant="body1"
                            sx={{ color: 'primary.main', cursor: 'pointer' }}
                            onClick={() => handleEdit(vehicle)}
                          >
                            {t('edit')}
                          </Typography>
                        </Box>
                      </Box>
                  </Box>
                ))}

                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 2, textTransform: 'none', fontWeight: 500 }}
                  onClick={() => setShowForm(true)}
                >
                  <Typography variant='body1'>
                  {t('register')}
                  </Typography>
                </Button>
                <div>{error}</div>
              </>
            )}
          </>
        ) : showEditForm && !showForm ? (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>
              EDIT
            </Typography>
            <TextField
              required
              label={t('licensePlate')}
              name="licensePlate"
              fullWidth
              value={selectedVehicle?.licensePlate}
              onChange={(e) =>
                setSelectedVehicle((prev) => ({
                  ...prev!,
                  licensePlate: e.target.value,
                }))
              }
              sx={{ mb: 2 }}
            />
            <TextField
              required
              label={t('make')}
              name="make"
              fullWidth
              value={selectedVehicle?.make}
              onChange={(e) =>
                setSelectedVehicle((prev) => ({
                  ...prev!,
                  make: e.target.value,
                }))
              }
              sx={{ mb: 2 }}
            />
            <TextField
              required
              label={t('model')}
              name="model"
              fullWidth
              value={selectedVehicle?.model}
              onChange={(e) =>
                setSelectedVehicle((prev) => ({
                  ...prev!,
                  model: e.target.value,
                }))
              }
              sx={{ mb: 2 }}
            />
            <TextField
              required
              label={t('color')}
              name="color"
              fullWidth
              value={selectedVehicle?.color}
              onChange={(e) =>
                setSelectedVehicle((prev) => ({
                  ...prev!,
                  color: e.target.value,
                }))
              }
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth required sx={{ mb: 2 }}>
              <InputLabel>{t('vehicleType')}</InputLabel>
              <Select
                required
                label={t('vehicleType')}
                name="vehicleType"
                fullWidth
                displayEmpty
                value={selectedVehicle?.vehicleType}
                onChange={(e) =>
                  setSelectedVehicle((prev) =>
                    prev
                      ? {
                          ...prev,
                          vehicleType: e.target.value as string,
                        }
                      : null
                  )
                }
                sx={{ mb: 2 }}
              >
                <MenuItem value="Car">{t('car')}</MenuItem>
                <MenuItem value="Motorcycle">{t('motorcycle')}</MenuItem>
              </Select>
            </FormControl>
            {!selectedIsActive && (
              <FormControlLabel
                control={
                  <Switch
                    checked={selectedVehicle?.active}
                    onChange={(e) =>
                      setSelectedVehicle((prev) =>
                        prev ? { ...prev, active: e.target.checked } : prev
                      )
                    }
                  />
                }
                label={t('default')}
                sx={{ mb: 2 }}
              />
            )}

            <Box display="flex" justifyContent="space-between">
              <Button
                onClick={() => {
                  setShowEditForm(false)
                  setFormData(emptyForm)
                }}
              >
                {t('cancel')}
              </Button>
              <Button
                variant="contained"
                onClick={handleEditSubmit}
                disabled={
                  !isFormValid(
                    selectedVehicle?.licensePlate,
                    selectedVehicle?.make,
                    selectedVehicle?.model,
                    selectedVehicle?.color,
                    selectedVehicle?.vehicleType
                  )
                }
              >
                {t('save')}
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {t('addTitle')}
            </Typography>
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
            <FormControl fullWidth required sx={{ mb: 2 }}>
              <InputLabel>{t('vehicleType')}</InputLabel>
              <Select
                required
                label={t('vehicleType')}
                name="vehicleType"
                fullWidth
                displayEmpty
                value={formData.vehicleType}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    vehicleType: e.target.value as string,
                  }))
                }
                sx={{ mb: 2 }}
              >
                <MenuItem value="Car">{t('car')}</MenuItem>
                <MenuItem value="Motorcycle">{t('motorcycle')}</MenuItem>
              </Select>
            </FormControl>
            {vehicles.length != 0 && (
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isDefault}
                    onChange={handleToggle}
                  />
                }
                label={t('default')}
                sx={{ mb: 2 }}
              />
            )}

            <Box display="flex" justifyContent="space-between">
              <Button
                onClick={() => {
                  setShowForm(false)
                  setFormData(emptyForm)
                }}
              >
                {t('cancel')}
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={
                  !isFormValid(
                    formData.licensePlate,
                    formData.make,
                    formData.model,
                    formData.color,
                    formData.vehicleType
                  )
                }
              >
                {t('save')}
              </Button>
            </Box>
          </>
        )}
      </Card>
      </Box>
    </Fade>
  )
}

'use client'

import { Fragment, useState } from 'react';
import { Button, Typography } from '@mui/material';

// import RegisterVehicle from './Register/Register'
import Vehicles from './Register/Vehicles'
import Login from './Login/page'

export default function Home() {
  return (
    <Fragment>
      <Typography>Welcome to Virtual-Park!</Typography>
      <Vehicles/>
      <Login/>
    </Fragment>
  );
}

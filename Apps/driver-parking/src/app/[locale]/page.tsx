'use client'

import { Fragment } from 'react';
import {useMediaQuery} from '@mui/material';
import Landing from '../landing/Landing'
import Marketing from '../landing/Marketing'
// import LocaleSwitcher from '../languageSwitcher/LocaleSwitcher';
// import TypeList from './permit/typePage'

export default function Home() {
  const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <Fragment>
      {/* <LocaleSwitcher/> */}
      {isMobile ? <Landing/> : <Marketing/>}
    </Fragment>
  );
}

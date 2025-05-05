'use client'

import { Fragment } from 'react';

import Landing from '../landing/Landing'
import LocaleSwitcher from '../languageSwitcher/LocaleSwitcher';
// import TypeList from './permit/typePage'

export default function Home() {
  return (
    <Fragment>
      <LocaleSwitcher/>
      <Landing/>
    </Fragment>
  );
}

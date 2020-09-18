import React from 'react';

import { useProfile } from '@dxos/react-client';

import Main from './Main';

export default function App () {
  const profile = useProfile();

  if (!profile) return <p>Register first</p>

  return  <Main />
}

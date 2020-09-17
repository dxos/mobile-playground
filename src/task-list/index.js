import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import leveljs from 'level-js';

import { Client } from '@dxos/client';
import { createStorage } from '@dxos/random-access-multi-storage';
import { Keyring, KeyStore } from '@dxos/credentials';
import { ClientProvider } from '@dxos/react-client';

import App from './App';
import theme from './theme';

const client = new Client({
  storage: createStorage('tasks-db'),
  //TODO: ADD createKeyring('tasks-keys') default store to leveljs
  keyring: new Keyring(new KeyStore(leveljs('tasks-keys'))), 
  swarm: {
    signal: 'wss://signal2.dxos.network/dxos/signal'
  }
});

ReactDOM.render(
  <ClientProvider client={client} config={{ devtools: true }}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </ClientProvider>,
  document.querySelector('#root'),
);

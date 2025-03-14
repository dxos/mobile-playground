import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import leveljs from 'level-js';
import { Client } from '@dxos/client';
import { createStorage } from '@dxos/random-access-multi-storage';
import { Keyring, KeyStore } from '@dxos/credentials';
import { ClientProvider } from '@dxos/react-client';

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
    <App />
  </ClientProvider>,
  document.querySelector('#root'),
);

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React, {useEffect, useState} from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel, IonIcon
} from '@ionic/react';
import { home } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import swarm from '@geut/discovery-swarm-webrtc';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { config } from './video/config';

const App: React.FC = () => {
  const [connections, setConnections] = useState<any>([]);
  const [streams, setStreams] = useState<any>([]);
  const [receivedData, setReceivedData] = useState<any>('');

  useEffect(() => {
    const sw = swarm({
      bootstrap: [config.signalingServer],
    });

    sw.join(Buffer.from('some-topic'));

    sw.on('connection', (peer: any, info: any) => {
      console.log('New connection', peer, info);
      const connectionId = info.id.toString();
      peer.on('data', (data: any) => setReceivedData(data.toString()));

      const newPeer = { peer, connectionId };
      setConnections((peers: any) => [...peers, newPeer]);

      peer.on('stream', (mediaStream) => setStreams(
        (streams: any) => [...streams, { mediaStream, connectionId }]
      ),);
      peer.on('stream', console.log);
    });

    sw.on('connection-closed', (peer: any, info: any) => {
      console.log('Closed connection', peer, info);
      setStreams((streams: any) => {
        return streams.filter(item => item.connectionId !== info.id.toString());
      });
      setConnections((connections: any) => {
        return connections.filter(item => item.connectionId !== info.id.toString());
      });
    });
  }, []);

  const handleSendData = (data) => {
    connections.forEach(connection => connection.peer.send(data));
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route
              path="/"
              component={() => <Home connections={connections} receivedData={receivedData} onReceivedDataRead={() => setReceivedData('')} onSendData={handleSendData}/>}
              exact={true}
            />
            <Redirect to="/" />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="/" href="/">
              <IonIcon icon={home} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;

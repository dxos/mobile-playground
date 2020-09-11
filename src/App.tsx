import React, {useEffect, useState} from 'react';
import { Redirect, Route } from 'react-router-dom';
import swarm from '@geut/discovery-swarm-webrtc';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import { config } from './video/config';

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

const App: React.FC = () => {
  const [selfStream, setSelfStream] = useState<any>(undefined);
  const [connections, setConnections] = useState<any>([]);
  const [streams, setStreams] = useState<any>([]);
  const [arbitraryData, setArbitraryData] = useState<any>('');
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
  
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/connections" component={() => <Tab1 connections={connections} />} exact={true} />
            <Route path="/chat" component={Tab2} exact={true} />
            <Route path="/video" component={Tab3} />
            <Route path="/" render={() => <Redirect to="/connections" />} exact={true} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="connections" href="/connections">
              <IonIcon icon={triangle} />
              <IonLabel>Connections</IonLabel>
            </IonTabButton>
            <IonTabButton tab="chat" href="/chat">
              <IonIcon icon={ellipse} />
              <IonLabel>Chat</IonLabel>
            </IonTabButton>
            <IonTabButton tab="video" href="/video">
              <IonIcon icon={square} />
              <IonLabel>Video</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;

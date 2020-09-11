import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC<any> = ({connections}: any) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Connections</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Connections</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Connections" >
          <p>Connections: {connections.length}</p>
        </ExploreContainer>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

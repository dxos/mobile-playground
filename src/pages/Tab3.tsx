import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC<any> = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Video</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Video</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Video page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;

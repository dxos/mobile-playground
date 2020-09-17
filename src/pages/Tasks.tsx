import React from 'react';
import { 
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItemDivider,
  IonLabel
} from '@ionic/react';

import './Common.css';
import TaskApp from '../task-list/App';

const Redeem: React.FC<any> = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tasks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tasks</IonTitle>
          </IonToolbar>
        </IonHeader>
        <TaskApp />
      </IonContent>
    </IonPage>
  );
};

export default Redeem;

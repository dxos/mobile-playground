import React from 'react';
import { 
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from '@ionic/react';

import { useProfile } from '@dxos/react-client';

import Lists from './Lists';

const TasksPage: React.FC<any> = () => {
  const profile = useProfile();

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
        {profile ? <Lists /> : <p>Register first</p>}
      </IonContent>
    </IonPage>
  );
};

export default TasksPage;

import React from 'react';
import { 
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItemDivider,
  IonLabel,
  IonButton
} from '@ionic/react';

import { useProfile, useClient } from '@dxos/react-client';

import './Common.css';
import RedeemContainer from '../task-list/containers/Redeem';
import SignUp from '../task-list/containers/SignUp';


const Redeem: React.FC<any> = () => {
  const profile = useProfile();
  const client = useClient();
  
  const handleResetStorage = async () => {
    localStorage.clear();
    await client.reset();
    window.location.reload(); // eslint-ignore-line no-restricted-globals
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Redeem & Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Redeem & Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItemDivider class="divider">
          <IonLabel>Redeem Invitation Code</IonLabel>
        </IonItemDivider>
        <RedeemContainer />
        <IonItemDivider class="divider">
          <IonLabel>Profile</IonLabel>
        </IonItemDivider>
        {profile ? (<>
          <p>Registered as {profile.username}</p> 
          <IonButton size="small" onClick={handleResetStorage}>Reset storage</IonButton>
        </>) : <SignUp/>}
      </IonContent>
    </IonPage>
  );
};

export default Redeem;

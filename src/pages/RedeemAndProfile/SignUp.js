import React, { useState } from 'react';
 
import { useClient } from '@dxos/react-client';
import { createKeyPair } from '@dxos/crypto';

import { 
  IonLabel,
  IonItem,
  IonInput,
  IonButton
} from '@ionic/react';

export default function SignUp() {
  const client = useClient();
  const [username, setUsername] = useState('');
  
  const handleSignUp = async (username) => {
    const { publicKey, secretKey } = createKeyPair();
    await client.createProfile({ publicKey, secretKey, username });
  }

  return (
    <div>
      <h5>Register</h5>
      <IonItem>
        <IonLabel position="floating">Username</IonLabel>
        <IonInput value={username} onIonChange={e => setUsername(e.detail.value)}></IonInput>
      </IonItem>
      <IonButton expand="block" disabled={!username} onClick={() => handleSignUp(username)}>Register</IonButton>
    </div>
  );
}

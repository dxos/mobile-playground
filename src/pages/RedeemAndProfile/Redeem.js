import React, { useState } from 'react';

import { 
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
  IonTextarea
} from '@ionic/react';

import { useInvitationRedeemer, useProfile } from '@dxos/react-client';

export default function RedeemContainer () {
  const profile = useProfile();
  const [redeemCode, setPin] = useInvitationRedeemer({ onDone: () => setStep(2), onError: () => setError(true) });
  const [step, setStep] = useState(0);
  const [invitationCode, setInvitationCode] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [error, setError] = useState(false);

  const handleEnterInvitationCode = async () =>  {
    redeemCode(invitationCode);
    setStep(1);
  };

  const handleEnterPinCode = async ()  => {
    setPin(pinCode);
  }

  if (!profile) {
    return <p>Register first</p>
  }

  if (error) {
    return <p>Something went wrong.</p>
  }

  return (
    <div>
      {step === 0 && (
        <>
          <IonItem>
            <IonLabel position="floating">Paste your Invitation Code Below</IonLabel>
          </IonItem>
          <IonItem>
            <IonTextarea value={invitationCode} onIonChange={e => setInvitationCode(e.detail.value)}></IonTextarea>
          </IonItem>
          <IonButton expand="block" disabled={!invitationCode} onClick={handleEnterInvitationCode}>Send</IonButton>
        </>    
      )}

      {step === 1 && setPin && (
        <>
          <IonItem>
            <IonLabel position="floating">Enter the PIN number</IonLabel>
            <IonInput value={pinCode} onIonChange={e => setPinCode(e.detail.value)}></IonInput>
          </IonItem>
          <IonButton expand="block" disabled={!pinCode} onClick={handleEnterPinCode}>Send</IonButton>
        </>
      )}

      {step === 1 && !setPin && (<p>Finishing process. Hold on...</p>)}

      {step === 2 && <p>Done!</p>}
    </div>
  );
}

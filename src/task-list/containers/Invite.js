import React, { useState } from 'react';

import { 
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonLabel,
  IonButton,
  IonBadge,
  IonItemDivider,
  IonToast
} from '@ionic/react';

import { useParty, useInvitation } from '@dxos/react-client';

function PinItemText ({ pin }) {
  return (
    <p>PIN: {pin}</p>
  );
}

function CodeItemText ({ code }) {
  return (<>
    <p>Code: {code}</p>
    <p className="copyable">{code}</p>
  </>);
}

function Invite ({ party }) {
  const [done, setDone] = useState(false);
  const [inviteCode, pin] = useInvitation(party, { onDone: () => { setDone(true) } });
  
  const ItemText = pin ? PinItemText : CodeItemText;
  
  return (
    <li>
      {done ? <p>Redeemed</p>: (
      <>
        <ItemText code={inviteCode} pin={pin} />
      </>
      )}
    </li>
  );
}

export default function InviteDialog ({ partyKey, onClose }) {
  const party = useParty(partyKey);
  const [invitations, setInvitations] = useState([]);

  const handleAddInvitation = () => {
    setInvitations([{ id: Date.now() }, ...invitations]);
  }

  return (
    <div>
      <IonItemDivider class="divider">
        <IonLabel>Create Invite for {party.displayName}</IonLabel>
      </IonItemDivider>
      <IonButton size="small" onClick={onClose}>Cancel</IonButton>
      <ul>
        {invitations
        .sort((a, b) => a.id - b.id)
        .map(({ id }) => (
          <Invite key={id} party={party} />
        ))}
      </ul>

      <IonButton expand="block" onClick={handleAddInvitation}>Add Invitation</IonButton>
    </div>
  );
}

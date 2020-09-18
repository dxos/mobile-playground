import React, { useState } from 'react';

import { useClient, useParties } from '@dxos/react-client';

import { 
  IonItemDivider,
  IonLabel,
  IonButton
} from '@ionic/react';

import Tasks from './Tasks';
import Invite from './Invite';

export default function Lists () {
  const [selected, setSelected] = useState();
  const client = useClient();
  const parties = useParties();
  const [invite, setInvite] = useState('');

  const lists = parties
    .map(({ publicKey, displayName, members }) => ({
       title: displayName,
       publicKey: publicKey.toString('hex'),
       members
    }));

  if (invite) {
    return <Invite partyKey={invite} onClose={() => setInvite('')} />
  }

  const handleCreateList = async () => {
    const party = await client.createParty();
    setSelected(party.publicKey.toString('hex'));
  }

  return (
    <>
      <IonItemDivider class="divider">
        <IonLabel>Task lists</IonLabel>
      </IonItemDivider>
      <IonButton size="small" onClick={handleCreateList}>Create new list</IonButton>
      <ul>
        {lists.map(({title, publicKey, members}) => (
          <li key={publicKey} onClick={() => setSelected(publicKey.toString('hex'))}>
            {selected === publicKey.toString('hex') ? <strong>{title}</strong> : title}
            <IonButton size="small" onClick={() => setInvite(publicKey)}>Invite</IonButton>
          </li>
        ))}
      </ul>

      {/* {lists.length ? children : <p>Add or Select a List.</p>} */}

      <IonItemDivider class="divider">
        <IonLabel>Tasks</IonLabel>
      </IonItemDivider>

      {selected ? <Tasks partyKey={selected} /> : <div>Create a List or select existing</div>}
    </>
  );
}
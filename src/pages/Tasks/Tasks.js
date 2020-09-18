import React, { useState } from 'react';

import { useParty, useModel } from '@dxos/react-client';
import { createId } from '@dxos/crypto';

import { 
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItemDivider,
  IonLabel,
  IonItem,
  IonButton,
  IonInput
} from '@ionic/react';

const TASK_TYPE = 'oh.my.task';

export default function Tasks({ partyKey }) {
  const party = useParty(partyKey);
  const [newTask, setNewTask] = useState('');
  const model = useModel({ options: { topic: partyKey, type: TASK_TYPE } });

  const tasks = model ? model.messages : []

  const handleAdd = (event) => {
    model.appendMessage({
      __type_url: TASK_TYPE,
      itemId: createId(),
      text: newTask,
      topic: partyKey
    });

    setNewTask('');
  };

  // const [checked, setChecked] = useState([1]);

  // const handleToggle = (value) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  // };
  return (
    <div>
      <IonItem>
        <IonLabel position="floating">New Task</IonLabel>
        <IonInput value={newTask} onIonChange={e => setNewTask(e.detail.value)}></IonInput>
      </IonItem>
      <IonButton size="small" disabled={!newTask} onClick={handleAdd}>Add</IonButton>
      <ul>
        {tasks.map(({ text }) => <li key={text}>{text}</li>)}
      </ul>
    </div>
  );
}

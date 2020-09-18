import React, {useEffect, useState} from 'react';
import { 
  IonItem,
  IonInput,
  IonLabel,
  IonButton,
  IonBadge,
  IonItemDivider,
  IonToast
} from '@ionic/react';

import VideoFix from './VideoFix';

const VideoComponent: React.FC<any> = ({connections, onSendData, receivedData, onReceivedDataRead, selfStream, onEnableVideo, streams}) => {
  const [showToast, setShowToast] = useState(false);
  const [arbitraryData, setArbitraryData] = useState<any>('');

  const handleSubmit = () => {
    onSendData(arbitraryData);
    setArbitraryData('');
  }

  useEffect(() => {
    if (!!receivedData) setShowToast(true);
  }, [receivedData])

  return (
    <>
      <IonItem>
        <IonLabel>Connections</IonLabel>
        <IonBadge slot="end">{connections.length}</IonBadge>
      </IonItem>

      <IonItemDivider class="divider">
        <IonLabel>Messaging</IonLabel>
      </IonItemDivider>

      <IonItem>
        <IonLabel position="floating">Your message</IonLabel>
        <IonInput value={arbitraryData} onIonChange={e => setArbitraryData(e.detail.value!)}></IonInput>
      </IonItem>
      <IonButton expand="block" disabled={!arbitraryData} onClick={handleSubmit}>Send</IonButton>

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => {
          setShowToast(false);
          onReceivedDataRead();
        }}
        message={receivedData}
        duration={2000}
      />

      <IonItemDivider class="divider">
        <IonLabel>Your camera</IonLabel>
      </IonItemDivider>

      <IonButton expand="block" disabled={!!selfStream} onClick={onEnableVideo}>Enable camera</IonButton>

      {selfStream && <VideoFix style={{ transform: 'scaleX(-1)', width: '256px px', height: '256px' }} muted={true} autoPlay srcObject={selfStream} />}

      <IonItemDivider class="divider">
        <IonLabel>Incoming video</IonLabel>
        <IonBadge slot="start">{streams.length}</IonBadge>
      </IonItemDivider>

      {streams.map((stream, i) => <VideoFix key={i} autoPlay srcObject={stream.mediaStream} style={{ width: '256px', height: '256px' }}/>)}
    </>
  );
};

export default VideoComponent;

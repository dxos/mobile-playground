import React from 'react';
import { 
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from '@ionic/react';

import VideoContainer from './VideoContainer';

const VideoPage: React.FC<any> = () => {
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
        <VideoContainer />
      </IonContent>
    </IonPage>
  );
};

export default VideoPage;

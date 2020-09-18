import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel, IonIcon
} from '@ionic/react';
import { home, checkbox, gift } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import VideoPage from './Video/VideoPage';
import TasksPage from './Tasks/TasksPage';
import RedeemAndProfilePage from './RedeemAndProfile/RedeemAndProfilePage';

import './Common.css';

const EntryPoint: React.FC = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route
            path="/home"
            component={() => <VideoPage />}
            exact={true}
          />
          <Route
            path="/tasks"
            component={() => <TasksPage/>}
            exact={true}
          />
          <Route
            path="/redeem"
            component={() => <RedeemAndProfilePage/>}
            exact={true}
          />
          <Redirect to="/home" />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tasks" href="/tasks">
            <IonIcon icon={checkbox} />
            <IonLabel>Tasks</IonLabel>
          </IonTabButton>
          <IonTabButton tab="redeem" href="/redeem">
            <IonIcon icon={gift} />
            <IonLabel>Redeem & Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
}

export default EntryPoint;

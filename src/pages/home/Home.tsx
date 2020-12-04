import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router';
import './Home.css';

const Home: React.FC = () => {
  const { push } = useHistory()
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>session</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonButton onClick={() => { push("/login") }}>
          Login
        </IonButton>
        <IonButton onClick={() => { push("/register") }}>
          Register
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;

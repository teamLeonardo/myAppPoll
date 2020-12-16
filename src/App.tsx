import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/home/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import AuthContextProvider from './context/auth';
import SegurityRouter from './pages/segurity/segurityRouter';
import Root from './pages/segurity/root';
import { Login } from './pages/login/login';
import { AppMain } from './pages/app/app';
import { Register } from './pages/register/register';
import { ShareFormulari } from './pages/share/ShareFormulari';

const App: React.FC = () => (
  <AuthContextProvider>
    <Root>
      <IonReactRouter>
        <IonRouterOutlet>
          <SegurityRouter path="/app" component={AppMain} type="private" exact={false} />
          <SegurityRouter path="/share/id" component={ShareFormulari}  exact={true} />
          <SegurityRouter path="/home" component={Home} type="public" exact={true} />
          <SegurityRouter path="/login" component={Login} type="public" exact={true} />
          <SegurityRouter path="/register" component={Register} type="public" exact={true} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </Root>
  </AuthContextProvider>
);

export default App;

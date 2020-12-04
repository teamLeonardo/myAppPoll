import { IonSpinner } from '@ionic/react';
import React from 'react';

import { AuthContext } from '../../context/auth';

class Root extends React.Component {

    render() {

        const {
            children,
        } = this.props;

        const {
            authFirebase,
        } = this.context;

        if (!authFirebase) {

            return <div style={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} >
                <IonSpinner name="crescent" />
            </div>

        }

        return children;

    };

}

Root.contextType = AuthContext;

export default Root;
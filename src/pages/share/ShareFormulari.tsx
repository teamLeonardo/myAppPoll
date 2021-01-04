import { IonContent, IonHeader, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react'
import React, { useContext,  } from 'react'
import { useHistory } from 'react-router'
import { ListPreguntas } from '../../components/share/ListPreguntas'
import ShareFormProvider, { shareFormContex } from '../../context/share/shareFormContex'

const Validar = (props: any) => {

    const { stateApp, errorApp } = useContext(shareFormContex)
    const { push } = useHistory();

    if (errorApp) {
        push("/pageError");
    }
    if (stateApp) {
        return props.children
    } else {
        return <div style={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} >
            <IonSpinner name="crescent" />
        </div>
    }
}

const PageShare: React.FC = () => {
    const { data } = useContext(shareFormContex)
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{data.name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <ListPreguntas />
            </IonContent>
        </IonPage>
    )
}

export const ShareFormulari: React.FC = (props) => {
    return (
        <ShareFormProvider {...props}>
            <Validar>
                <PageShare />
            </Validar>
        </ShareFormProvider>
    )
}

import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonPage, IonRow, IonToolbar } from "@ionic/react"
import React, { useState } from "react"
import { useHistory } from "react-router";
import { newToast } from "../../components/newToast";
import { auth } from "../../services/firebase"



export const Login: React.FC = () => {
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const { push } = useHistory()

    const handleSubmin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setShowLoading(true)
        try {
            let { mail, pass }: any = Object.fromEntries(new FormData(e.currentTarget))
            if (mail && pass) {
                await auth.signInWithEmailAndPassword(mail, pass )
                setShowLoading(false)
            }
            else {
                newToast("null");
                setShowLoading(false)
            }

        } catch (error) {
            newToast(error.message, error.message.length > 89 ? 10000 : 2000);
            setShowLoading(false)
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar >
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">

                <IonLoading
                    isOpen={showLoading}
                    message={'Please wait...'}
                />
                <form onSubmit={handleSubmin}>
                    <IonGrid >
                        <IonRow className="ion-justify-content-center ion-align-items-center" >
                            <IonCol sizeMd="4">
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>
                                            login
                                        </IonCardTitle>
                                        <IonCardContent>
                                            <IonList>
                                                <IonItem>
                                                    <IonLabel position="floating">Email</IonLabel>
                                                    <IonInput name="mail" type="email" />
                                                </IonItem>
                                                <IonItem>
                                                    <IonLabel position="floating">Password</IonLabel>
                                                    <IonInput name="pass" type="password" />
                                                </IonItem>

                                                <IonButton type="submit" expand="block" fill="outline">enter</IonButton>
                                                <IonItem>
                                                    <IonLabel onClick={() => push("/register")} position="stacked">Register?</IonLabel>
                                                </IonItem>
                                            </IonList>
                                        </IonCardContent>
                                    </IonCardHeader>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </form>
            </IonContent>
        </IonPage>
    )

}
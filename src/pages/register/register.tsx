import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonPage, IonRow, IonToolbar } from "@ionic/react"
import React, { useState } from "react"
import { useHistory } from "react-router";
import { newToast } from "../../components/newToast";
import { auth, db } from "../../services/firebase";


export const Register: React.FC = () => {
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const { push } = useHistory()
    const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
         e.preventDefault()
        setShowLoading(true)
        try {
            let values: any = Object.fromEntries(new FormData(e.currentTarget))
            let { mail, pass } = values
            if (mail && pass) {
                await auth.createUserWithEmailAndPassword(mail, pass)
                const { user } = await auth.createUserWithEmailAndPassword(mail, pass)
                if (user) {
                    const { uid } = user
                    await db.collection("user").doc(uid).set({ role: "user", ...values, creationTime: Date.now() })
                }
            }
            else newToast("null");

        } catch (error) {
            newToast(error.message, error.message.length > 89 ? 10000 : 2000);
        }
        setShowLoading(false)
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
                <form onSubmit={HandleSubmit}>
                    <IonGrid >
                        <IonRow className="ion-justify-content-center ion-align-items-center" >
                            <IonCol sizeMd="4">
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>
                                            Register
                                        </IonCardTitle>
                                        <IonCardContent>
                                            <IonList>
                                                <IonItem>
                                                    <IonLabel position="floating">Names</IonLabel>
                                                    <IonInput name="names" type="text" />
                                                </IonItem>
                                                <IonItem>
                                                    <IonLabel position="floating">Last Names</IonLabel>
                                                    <IonInput name="lastName" type="text" />
                                                </IonItem>
                                                <IonItem>
                                                    <IonLabel position="floating">Email</IonLabel>
                                                    <IonInput name="mail" type="email" />
                                                </IonItem>
                                                <IonItem>
                                                    <IonLabel position="floating">Password</IonLabel>
                                                    <IonInput name="pass" type="password" />
                                                </IonItem>
                                                <br />
                                                <IonButton type="submit" expand="block" fill="outline">enter</IonButton>

                                                <IonItem>
                                                    <IonLabel onClick={() => push("/login")} position="stacked">Login?</IonLabel>
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
        </IonPage >
    )

}
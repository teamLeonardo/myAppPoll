import { IonAlert, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonInput, IonItem, IonModal, IonPage, IonSpinner, IonTitle, IonToolbar } from "@ionic/react"
import React, { useContext, useState } from "react"
import { useHistory, useParams } from "react-router"
import { appFormContext } from "../../context/AppForms"
import { ListQuestion } from "../../components/ListQuestion"
import { db } from "../../services/firebase"
import { questionContext } from "../../context/QuestionForms"
import { HeaderModify } from "../../components/HeaderModify"

export const Modify: React.FC = () => {


    const { addQuestion, initial, listQuestion } = useContext(questionContext);

    const { id }: any = useParams();

    const [fetch, setFetch] = useState<boolean>(false)

    const [currentTxt, setCurrentTxt] = useState("")

    const [currentId, setCurrentId] = useState<string>("");

    const [showAlert3, setShowAlert3] = useState(false);

    const [showAlert2, setShowAlert2] = useState(false);



    const HandleAddQuestion = ({ currentTarget }: React.FormEvent<HTMLFormElement>) => {
        setFetch(true)
        let { txtQuestion } = Object.fromEntries(new FormData(currentTarget))
        currentTarget.reset()
        addQuestion({ txtQuestion }).then(() => setFetch(false))

    }



    if (!initial) {
        return (
            <div style={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} >
                <IonSpinner name="crescent" />
            </div>
        )
    }

    return (


        <IonPage >
            <HeaderModify />
            <IonContent className="ion-padding">

                <IonCard >
                    <IonCardHeader>
                        <IonCardTitle>
                            Agrega una pregunta:
                                </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            !fetch && HandleAddQuestion(e)
                        }}>
                            <IonItem>
                                <IonInput
                                    placeholder="nombre?"
                                    required
                                    name="txtQuestion"
                                />
                            </IonItem>
                            <br />
                            <IonButton expand="block"
                                type="submit"
                            >
                                Ingresar
                                    </IonButton>
                        </form>
                    </IonCardContent>
                </IonCard>

                <ListQuestion
                    eliminar={(id: string) => {
                        setCurrentId(id)
                        setShowAlert2(true)
                    }}
                    editar={(id: string) => {
                        setCurrentId(id)
                        let dasd: any[] = listQuestion.filter(({ _id }) => _id == id)
                        if (dasd) {
                            setCurrentTxt(dasd[0].txtQuestion);
                        }
                        setShowAlert3(true)
                    }}
                />

                <IonAlert
                    isOpen={showAlert3}
                    onDidDismiss={() => { setShowAlert3(false); setCurrentId("") }}
                    header={'Editar confirma?'}
                    message={''}
                    buttons={[
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: blah => {
                                console.log('Confirm Cancel: blah');
                            }
                        },
                        {

                            text: 'Okay',
                            role: "ok",
                            handler: (e: any) => {
                                db.collection("question").doc(currentId).update({ txtQuestion: e.txtQuestion })
                            },
                        }
                    ]}

                    inputs={[
                        {
                            type: "text",
                            placeholder: "new valor",
                            value: currentTxt,
                            name: "txtQuestion"

                        }
                    ]}
                />
                <IonAlert
                    isOpen={showAlert2}
                    onDidDismiss={() => { setShowAlert2(false); setCurrentId("") }}
                    header={'elemina Confirm?'}
                    message={'se elimina de forma permanente'}
                    buttons={[
                        "cancel",
                        {
                            text: 'Okay',
                            role: "ok",
                            handler: async () => {
                                await db.collection("question").doc(currentId).delete()
                                let { nQuestion }: any = (await db.collection("form").doc(id).get()).data()
                                await db.collection("form").doc(id).update({ nQuestion: nQuestion - 1 })
                            }
                        }
                    ]}
                />
            </IonContent>
        </IonPage>

    )
}
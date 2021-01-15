import { IonAlert, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonInput, IonItem, IonPage, IonSpinner } from "@ionic/react"
import React, { useContext, useState } from "react"
import { useParams } from "react-router"
import { ListQuestion } from "../../components/ListQuestion"
import { db } from "../../services/firebase"
import { questionContext } from "../../context/QuestionForms"
import { HeaderModify } from "../../components/HeaderModify"
import { PopoverTypeQuestion } from "../../components/PopperTypeQuestion"
import { FormOption } from "../../components/form/FormOption"


export const Modify: React.FC = () => {

    const { addQuestion, initial, listQuestion } = useContext(questionContext);

    const [typeQuestion, setTypeQuestion] = useState("text")

    const { id }: any = useParams();

    const [fetch, setFetch] = useState<boolean>(false)

    const [currentTxt, setCurrentTxt] = useState("")

    const [currentId, setCurrentId] = useState<string>("");

    const [showAlert3, setShowAlert3] = useState(false);

    const [showAlert2, setShowAlert2] = useState(false);


    const HandleAddQuestion = ({ currentTarget }: React.FormEvent<HTMLFormElement>) => {
        setFetch(true)
        let place = Object.fromEntries(new FormData(currentTarget))
        // if () {

        // }
        currentTarget.reset()
        addQuestion(place).then(() => { setFetch(false); setTypeQuestion("text") })

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
                        <PopoverTypeQuestion OnSelect={(respuesta: string) => { setTypeQuestion(respuesta) }} />

                    </IonCardHeader>
                    <IonCardContent>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                !fetch && HandleAddQuestion(e)
                            }}
                        >
                            <input type="hidden" name="type" value={typeQuestion} />
                            {
                                typeQuestion === "text"
                                    ?
                                    <>
                                        <IonItem>
                                            <IonInput
                                                placeholder="question....?"
                                                required
                                                name="txtQuestion"
                                            />
                                        </IonItem>
                                        <br />

                                    </>
                                    :
                                    typeQuestion === "option"
                                        ?
                                        <FormOption />
                                        : null
                            }
                            <IonButton
                                expand="block"
                                type="submit"
                            >
                                Add question
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
        </IonPage >

    )
}
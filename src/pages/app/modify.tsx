import { IonAlert, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { flash } from "ionicons/icons"
import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { appFormContext } from "../../context/AppForms"
import { db } from "../../services/firebase"

class Validacion extends React.Component<{ id: string }> {
    state = {
        va: false
    }
    componentDidMount() {
        const { validate } = this.context
        validate(this.props.id, (respuesta: boolean) => {
            this.setState({ va: respuesta })
        })
    }

    render() {

        if (this.state.va) {
            return this.props.children
        } else {
            return <div >
                ...cargando
            </div>
        }
    }
}
Validacion.contextType = appFormContext;

export const Modify: React.FC = () => {

    const { id } = useParams<{ id: string }>();

    const { listQuestion, getListQuestion, clearQuestion, getList, addQuestion, updateForm } = useContext(appFormContext);

    const [data, setData] = useState<any>(undefined);

    const [fetch, setFetch] = useState<boolean>(false)

    const [text, setText] = useState<string>();

    const [currentId, setCurrentId] = useState<string>("");

    const [showAlert3, setShowAlert3] = useState(false);

    const [showAlert2, setShowAlert2] = useState(false);

    const [modoEdit, setModoEdit] = useState(false)

    const { push } = useHistory()

    const HandleAddQuestion = ({ currentTarget }: React.FormEvent<HTMLFormElement>) => {
        setFetch(true)
        let { txtQuestion } = Object.fromEntries(new FormData(currentTarget))
        currentTarget.reset()
        addQuestion({ id_form: id, txtQuestion }).then(() => setFetch(false))

    }

    const handleModifyText = () => {
        if (data) {
            setModoEdit(false)
            updateForm(id, { name: text })

        }

    }

    useEffect(() => {
        getList(id).then((respu: any) => setData(respu))

        getListQuestion(id)
        return () => {
            clearQuestion()
        }
    }, [id, getListQuestion, clearQuestion, getList])

    return (
        <IonModal isOpen={true} onDidDismiss={() => { push("/app/home") }}>
            <IonPage >
                <IonHeader>
                    <IonToolbar >
                        {
                            !modoEdit ?
                                <IonTitle
                                    onClick={() => setModoEdit(true)}
                                >
                                    {data && data.name}
                                </IonTitle>
                                :
                                <IonInput
                                    type="text"
                                    onIonChange={(e) => {
                                        if (typeof e.detail.value === "string") {
                                            setText(e.detail.value);
                                            setData({ ...data, ...{ name: e.detail.value } })
                                        }
                                    }}
                                    onBlur={() => handleModifyText()}
                                    onKeyUp={(e) => e.keyCode === 13 && handleModifyText()}
                                    value={data && data.name}
                                />
                        }
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/app/home" />
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <Validacion id={id}>
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
                        <IonList>


                            {
                                listQuestion.map((value, index) =>
                                    (

                                        <IonItemSliding key={index}>
                                            <IonItem >
                                                <IonLabel>{value.txtQuestion}</IonLabel>
                                            </IonItem>
                                            <IonItemOptions side="start">
                                                <IonItemOption onClick={() => { setCurrentId(value.id); setShowAlert3(true) }}>Editar</IonItemOption>
                                            </IonItemOptions>
                                            <IonItemOptions side="end">
                                                <IonItemOption onClick={() => { setCurrentId(value.id); setShowAlert2(true) }}>Eliminar</IonItemOption>
                                            </IonItemOptions>
                                        </IonItemSliding>
                                    )
                                )
                            }
                            {
                                listQuestion.length < 1 && (
                                    <IonItem>
                                        <IonLabel>no tiene preguntas</IonLabel>
                                    </IonItem>
                                )
                            }
                        </IonList>
                        <IonAlert
                            isOpen={showAlert3}
                            onDidDismiss={() => setShowAlert3(false)}
                            cssClass='my-custom-class'
                            header={'Confirm!'}
                            message={'Message <strong>text</strong>!!!'}
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
                                    handler: () => {
                                        console.log('Confirm Okay');
                                    }
                                }
                            ]}
                            inputs={[
                                {
                                    type: "text",
                                    placeholder: "new valor"
                                }
                            ]}
                        />
                        <IonAlert
                            isOpen={showAlert2}
                            onDidDismiss={() => setShowAlert2(false)}
                            header={'elemina Confirm?'}
                            message={'se elimina de forma permanente'}
                            buttons={[
                                "cancel",
                                {
                                    text: 'Okay',
                                    role: "cancel",
                                    handler: () => {
                                        db.collection("question").doc(currentId).delete()
                                    }
                                }
                            ]}
                        />
                    </Validacion>
                </IonContent>
            </IonPage>
        </IonModal>
    )
}
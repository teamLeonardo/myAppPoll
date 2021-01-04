import { IonActionSheet, IonAlert, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import React, { useContext, useState } from "react"

import { add, logOut, caretForwardCircle, close, heart, share, trash } from 'ionicons/icons';
import { useHistory } from "react-router";
import { appFormContext } from "../../context/AppForms";
import { newToast } from "../../components/newToast";
import { auth } from "../../services/firebase";

export const Home: React.FC = () => {

    const {
        create,
        list,
        Delete
    } = useContext(appFormContext)

    const [fetch, setFetch] = useState(false);

    const [showActionSheet, setShowActionSheet] = useState(false);

    const [showAlert1, setShowAlert1] = useState(false);

    const [IdCurrent, setIdCurrent] = useState("");

    const { push } = useHistory()

    const HandleCreate = async () => {
        try {
            setFetch(true)
            let respuesta = await create()
            push("/app/modify/" + respuesta);
        } catch (error) {
            newToast(error)
        }
        setFetch(false)
    }

    const HandleUpdate = async () => {
        setTimeout(() => {
            push("/app/modify/" + IdCurrent)
            
        }, 1000);
    }

    const HandleDelete = async () => {

        await Delete(IdCurrent);
        setShowAlert1(false)
        
    }

    const copiarAlPortapapeles = () => {
        try {
            let aux = document.createElement("input");
            let { protocol , hostname , port} = window.location;
            aux.setAttribute("value", `${protocol}://${hostname}:${port}/share/${IdCurrent}` );
            document.body.appendChild(aux);
            aux.select();
            document.execCommand("copy");
            document.body.removeChild(aux);
            newToast("El link fue copiado al portapapeles");
        } catch (error) {
            newToast(error);
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar >
                    <IonTitle>
                        Lista de tus formulario
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding" >

                <IonGrid>
                    <IonRow className="ion-justify-content-space-arrow ion-padding ">
                        {
                            list.map((_, index) => {
                                return (
                                    <IonCol sizeMd="2" sizeXs="12" key={index}>
                                        <IonCard >
                                            <IonCardHeader
                                                onClick={() => {
                                                    setShowActionSheet(true);
                                                    setIdCurrent(_._id);
                                                }}>
                                                <IonCardTitle>{_.name}</IonCardTitle>
                                                <IonCardSubtitle>F.Entregadas {_.nFomsEnds} </IonCardSubtitle>
                                            </IonCardHeader>
                                        </IonCard>
                                    </IonCol>
                                )
                            })
                        }
                    </IonRow>
                </IonGrid>
                <IonAlert
                    isOpen={showAlert1}
                    onDidDismiss={() => setShowAlert1(false)}
                    header="¿Seguro que desea eliminar?"
                    message="los cambios seran permanentes"
                    buttons={[
                        {
                            text: 'Okay',
                            handler: HandleDelete
                        },
                        "cancel"
                    ]}
                />
                <IonActionSheet
                    isOpen={showActionSheet}
                    onDidDismiss={() => setShowActionSheet(false)}
                    cssClass='my-custom-class'
                    buttons={[
                        {
                            text: 'Delete',
                            role: 'destructive',
                            icon: trash,
                            handler: () => {
                                setShowAlert1(true)
                            }
                        },
                        {
                            text: 'Share',
                            icon: share,
                            handler: () => {
                                copiarAlPortapapeles();
                                // push("/share/" + IdCurrent);
                            }
                        },
                        {
                            text: 'Open',
                            icon: caretForwardCircle,
                            handler: HandleUpdate
                        },
                        {
                            text: 'ver estadisticas',
                            icon: heart,
                            handler: () => {
                                push("/app/statistics/"+ IdCurrent)
                            }
                        },
                        {
                            text: 'Cancel',
                            icon: close,
                            role: 'cancel',
                            handler: () => {
                                console.log('Cancel clicked');
                            }
                        }
                    ]}
                >
                </IonActionSheet>
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => { !fetch && HandleCreate() }}>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>
                <IonFab vertical="bottom" horizontal="start" slot="fixed">
                    <IonFabButton onClick={() => {
                        auth.signOut()
                    }}>
                        <IonIcon icon={logOut} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    )
}
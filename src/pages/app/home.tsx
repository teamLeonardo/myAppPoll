import { IonActionSheet, IonAlert, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonIcon, IonPage, IonRow } from "@ionic/react"
import React, { useContext, useEffect, useState } from "react"

import { add, caretForwardCircle, close, flash, heart, share, trash } from 'ionicons/icons';
import { useHistory } from "react-router";
import { appFormContext } from "../../context/AppForms";
import { newToast } from "../../components/newToast";

export const Home: React.FC = () => {

    const {
        getList,
        create,
        list,
        Delete
    } = useContext(appFormContext)

    const [fetch, setFetch] = useState(false);

    const [showActionSheet, setShowActionSheet] = useState(false);

    const [showAlert1, setShowAlert1] = useState(false);

    const [IdCurrent, setIdCurrent] = useState("");

    const { push } = useHistory()

    const HandleCreate = () => {
        setFetch(true)

        create().then((respuesta: string) => {
            setFetch(false)
            push("/app/modify/" + respuesta);
        }).catch((err) => {
            setFetch(false)
            newToast(err)
        })
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

    useEffect(() => {
        getList();
    }, [getList, HandleDelete])

    return (
        <IonPage>
            <IonContent fullscreen className="ion-padding" >
                <IonGrid>
                    <IonRow className="ion-justify-content-space-arrow ion-padding ">
                        {
                            list.map((_, index) => {
                                return (
                                    <IonCol sizeMd="2" key={index}>
                                        <IonCard >
                                            {/* <div ></div> */}
                                            <IonFab vertical="top" horizontal="end" slot="absolute">
                                                <span>8</span>
                                            </IonFab>
                                            <IonCardHeader
                                                onClick={() => {

                                                    setShowActionSheet(true);

                                                    setIdCurrent(_._id);
                                                }}>
                                                <IonCardTitle>{_.name}</IonCardTitle>
                                                <IonCardSubtitle> </IonCardSubtitle>
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
                                console.log('Share clicked');
                            }
                        },
                        {
                            text: 'Open',
                            icon: caretForwardCircle,
                            handler: HandleUpdate
                        },
                        {
                            text: 'Favorite',
                            icon: heart,
                            handler: () => {
                                console.log('Favorite clicked');
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
            </IonContent>
        </IonPage>
    )
}
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ListRespuestas } from '../../../components/estadisticas/ListRespuestas'
import { db } from '../../../services/firebase'

export const PageStatistics = () => {
    const [dataList, setDataList] = useState<any[]>([])
    const { id }: any = useParams();
    useEffect(() => {
        db.collection("respuestas").where("id_form", "==", id).get().
            then((respuesta) => {
                let newdata = respuesta.docs.map((doc) => ({ ...doc.data(), _id: doc.id }))
                setDataList(newdata)
            })
    }, [])
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Lista de respuestas </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <div>
                    {
                        <ListRespuestas data={dataList} />
                    }
                </div>
            </IonContent>
        </IonPage>
    )
}
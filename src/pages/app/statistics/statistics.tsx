import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ListRespuestas } from '../../../components/estadisticas/ListRespuestas'
import { db } from '../../../services/firebase'

export const PageStatistics = () => {
    const [dataList, setDataList] = useState<any[]>([])
    const [num, setNum] = useState(0)
    const { id }: any = useParams();
    useEffect(() => {
        db.collection("form").doc(id).get().then((res) => {
            let { nQuestion }: any = res.data()
            setNum(nQuestion)
        })
        db.collection("respuestas").where("id_form", "==", id).get().
            then((respuesta) => {
                let newdata = respuesta.docs.map((doc) => ({ ...doc.data(), _id: doc.id }))
                setDataList(newdata)
            })
    }, [])
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar >
                    <IonTitle>Lista de respuestas </IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/app/home" />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <div>
                    {
                        <ListRespuestas data={dataList} numQuery={num} />
                    }
                </div>
            </IonContent>
        </IonPage>
    )
}

import { IonBackButton, IonButtons, IonContent, IonHeader, IonLabel, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ChartsView } from '../../../components/estadisticas/ChartsView'
import { ListRespuestas } from '../../../components/estadisticas/ListRespuestas'
import { db } from '../../../services/firebase'

export const PageStatistics = () => {
    const [dataList, setDataList] = useState<any[]>([])
    const [num, setNum] = useState(0)
    const { id }: any = useParams();
    const [view, setView] = useState<any>("listado")
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
                    <IonTitle>Statistics</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/app/home" />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <IonSegment
                    onIonChange={e => setView(e.detail.value)}
                    value={view}
                >
                    <IonSegmentButton value="listado" >
                        <IonLabel>List</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="graficos">
                        <IonLabel>Charts</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
                <div>
                    {
                        view == 'listado' ?
                            <ListRespuestas data={dataList} numQuery={num} />
                            :
                            view == 'graficos' &&
                            <ChartsView  data={dataList} />
                    }
                </div>
            </IonContent>
        </IonPage>
    )
}

import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonRow } from '@ionic/react';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import { shareFormContex } from '../../context/share/shareFormContex'
import { db } from '../../services/firebase';
import { newToast } from '../newToast';
import { ItemQuery } from './ItemQuery'
import { MssSusses } from './MssSusses';

export const ListPreguntas = () => {

    const [susses, setSunset] = useState(false)
    const { dataQuery, data } = useContext(shareFormContex);
    const { id }: any = useParams();

    const HandleSubmint = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            setSunset(true)
            let DataForm: any = Object.fromEntries(new FormData(e.currentTarget))
            await db.collection("respuestas").add({ ...DataForm, id_form: id, time: Date.now() });
            await db.collection("form").doc(id).update({ "nFomsEnds": data.nFomsEnds + 1 })
            newToast("El formulario fue enviado")
        } catch (error) {
            newToast("error: " + error)
        }
    }
    // useEffect(() => {
    //     setTimeout(() => {
    //         if ([...dataQuery].length <= 0) {
    //             push("/app");
    //         }z   
    //     }, 3000);
    // }, [])


    return (
        !susses ?
            <IonGrid style={{ width: "100%" }}>
                <IonRow style={{ width: "100%" }}>
                    {
                        dataQuery.length > 0 &&
                        <form onSubmit={HandleSubmint} style={{ width: "100%" }} >
                            {
                                dataQuery.map((valor: any, index: any) =>
                                    <IonCol key={index} size="12" className="ion-align-self-center">
                                        <IonCard>
                                            <IonCardContent>
                                                <ItemQuery itemQuery={valor}  />
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                )
                            }
                            <div>
                                <IonButton type="submit"> enviar </IonButton>
                            </div>
                        </form>
                    }
                </IonRow>
            </IonGrid>
            :
            <MssSusses />
    )
}

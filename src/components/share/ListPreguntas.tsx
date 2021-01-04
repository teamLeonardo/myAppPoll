import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonRow } from '@ionic/react';
import React, { useContext, useEffect, useRef } from 'react'
import { useHistory, useParams } from 'react-router';
import { shareFormContex } from '../../context/share/shareFormContex'
import { db } from '../../services/firebase';
import { ItemQuery } from './ItemQuery'

export const ListPreguntas = () => {

    const MyRefForm = useRef<any>();
    const { dataQuery, data } = useContext(shareFormContex);
    const { push } = useHistory()
    const { id }: any = useParams();

    const HandleSubmint = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let DataForm: any = Object.fromEntries(new FormData(e.currentTarget))
        await db.collection("respuestas").add(DataForm);
        await db.collection("form").doc(id).update({ "nFomsEnds": data.nFomsEnds + 1 })
        MyRefForm.current.reset();
    }
    // useEffect(() => {
    //     setTimeout(() => {
    //         if ([...dataQuery].length <= 0) {
    //             push("/app");
    //         }z   
    //     }, 3000);
    // }, [])


    return (
        <IonGrid style={{ width: "100%" }}>
            <IonRow style={{ width: "100%" }}>
                {
                    dataQuery.length > 0 &&
                    <form onSubmit={HandleSubmint} style={{ width: "100%" }} ref={MyRefForm}>
                        {
                            dataQuery.map((valor: any, index: any) =>
                                <IonCol key={index} size="12" className="ion-align-self-center">
                                    <IonCard>
                                        <IonCardContent>
                                            <ItemQuery itemQuery={valor} />

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
    )
}

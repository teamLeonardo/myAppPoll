import { IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonRow } from '@ionic/react'
import { closeCircle } from 'ionicons/icons'
import React from 'react'

export const ListRespuestas = ({ data }: { data: any[] }) => {
    return (
        <IonList lines="full">
            {
                data.length > 0 && (
                    <IonItem>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonLabel>
                                        {data[0].pregunta}
                                    </IonLabel>
                                </IonCol>
                                <IonCol>
                                    <IonLabel>
                                        time
                                    </IonLabel>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                )
            }
            {
                data.map((value: any, index) => {
                    let dt: any = new Date(value.time);

                    let dformat = `${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getDate().toString().padStart(2, '0')}/${dt.getFullYear().toString().padStart(4, '0')} ${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt.getSeconds().toString().padStart(2, '0')}`;

                    return <IonItem key={index}>
                        <IonLabel>
                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                        {value.respuesta}
                                    </IonCol>
                                    <IonCol>
                                        {dformat && dformat}
                                    </IonCol>
                                    <IonCol>
                                        <IonIcon icon={closeCircle} slot="end" />
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonLabel>
                    </IonItem>
                })
            }
        </IonList>
    )
}

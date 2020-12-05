import { IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from '@ionic/react';
import React from 'react'

export const ItemQuestion = ({ data, eliminar, editar }: any) => {
    return (
        <IonItemSliding >
            <IonItem >
                <IonLabel>{data.txtQuestion}</IonLabel>
            </IonItem>
            <IonItemOptions side="start">
                <IonItemOption
                    onClick={() => {
                        editar(data._id)
                    }}>
                    Editar
                    </IonItemOption>
            </IonItemOptions>
            <IonItemOptions side="end">
                <IonItemOption
                    onClick={() => {
                        eliminar(data._id)
                    }}>
                    Eliminar
                    </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    )
}

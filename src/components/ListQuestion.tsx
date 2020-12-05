import { IonItem, IonLabel, IonList } from '@ionic/react';
import React, { useContext } from 'react'
import { questionContext } from '../context/QuestionForms';
import { ItemQuestion } from './ItemQuestion';

export const ListQuestion = ({ eliminar, editar }: any) => {

    const { listQuestion } = useContext(questionContext);

    return (
        <IonList>
            {
                listQuestion.map((value, index) =>
                    (
                        <ItemQuestion
                            data={value}
                            key={index}
                            eliminar={(id: string) => eliminar(id)}
                            editar={(id: string) => editar(id)}
                        />
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
    )
}

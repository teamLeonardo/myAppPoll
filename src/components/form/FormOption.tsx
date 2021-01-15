import { IonAlert, IonButton, IonCheckbox, IonInput, IonItem, IonItemDivider, IonLabel, IonList } from '@ionic/react'
import React, { useState } from 'react'

export const FormOption = () => {
    const [checkList, setcheckList] = useState<any>([])
    const [showAlert, setShewAlert] = useState<boolean>(false);

    return (
        <>
            <IonItem>
                <IonInput
                    placeholder="question....?"
                    required
                    name="txtQuestion"
                />
            </IonItem>
            <br />
            <IonList>
                <IonItemDivider>Checkboxes in a List</IonItemDivider>
                {
                    [...checkList].map(({ val }, i) => (
                        <IonItem key={i}>
                            <IonLabel>{val}</IonLabel>
                            <input type="hidden" value={val} name={"option" + i} />
                        </IonItem>
                    ))
                }
            </IonList>
            <IonButton
                expand="block"
                type="button"
                onClick={() => {
                    setShewAlert(true)
                }}
            >
                intro option +
            </IonButton>

            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => { setShewAlert(false) }}
                header={'Agregar Option?'}
                message={''}
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                    },
                    {

                        text: 'Okay',
                        role: "ok",
                        handler: (e: any) => {
                            console.log(e.txtOption)
                            setcheckList([...checkList, { val: e.txtOption, isChecked: false }])
                            setShewAlert(false)
                        },
                    }
                ]}

                inputs={[
                    {
                        type: "text",
                        placeholder: "new option",
                        name: "txtOption",
                    }
                ]}
            />
        </>
    )
}

import { IonBackButton, IonButtons, IonHeader, IonInput, IonTitle, IonToolbar } from '@ionic/react';
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router';
import { appFormContext } from '../context/AppForms';
import { questionContext } from '../context/QuestionForms';

export const HeaderModify = () => {


    const { id } = useParams<{ id: string }>();

    const { updateForm } = useContext(appFormContext);

    const { dataForm } = useContext(questionContext);

    
    const [modoEdit, setModoEdit] = useState(false)
    let newdata = dataForm
    const [data, setData] = useState<any>(newdata);
    const [text, setText] = useState<string>(dataForm.name);

    const handleModifyText = () => {
        if (data) {
            setModoEdit(false)
            updateForm(id, { name: text })
        }
    }
    return (
        <IonHeader>
            <IonToolbar >
                {
                    !modoEdit ?
                        <IonTitle
                            onClick={() => setModoEdit(true)}
                        >
                            {data && data.name }
                        </IonTitle>
                        :
                        <IonInput
                            type="text"
                            onIonChange={(e) => {
                                if (typeof e.detail.value === "string") {
                                    setText(e.detail.value);
                                    setData({ ...data, ...{ name: e.detail.value } })
                                }
                            }}
                            onBlur={() => handleModifyText()}
                            onKeyUp={(e) => e.keyCode === 13 && handleModifyText()}
                            value={data && data.name}
                        />
                }
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/app/home" />
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    )
}

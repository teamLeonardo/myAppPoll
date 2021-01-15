import React, { useState } from 'react';
import { IonPopover, IonButton, IonList, IonItem } from '@ionic/react';

export const PopoverTypeQuestion = (props: { OnSelect: Function } | any) => {
    const [popoverState, setShowPopover] = useState({ showPopover: false, event: undefined });

    return (
        <>
            <IonPopover
                cssClass='my-custom-class'
                event={popoverState.event}
                isOpen={popoverState.showPopover}
                onDidDismiss={() => setShowPopover({ showPopover: false, event: undefined })}
            >
                <IonList>
                    <IonItem onClick={() => { props.OnSelect("text") }}>text</IonItem>
                    <IonItem onClick={() => { props.OnSelect("option") }}>options</IonItem>
                </IonList>
            </IonPopover>
            <IonButton
                onClick={
                    (e: any) => {
                        e.persist();
                        setShowPopover({ showPopover: true, event: e })
                    }}
            >
                change type
            </IonButton>
        </>
    );
};
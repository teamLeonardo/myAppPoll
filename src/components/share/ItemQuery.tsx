import React, { useState } from 'react'
import { IonInput, IonItem, IonLabel, IonList, IonRadio, IonRadioGroup } from '@ionic/react'

export const ItemQuery = ({ itemQuery }: any) => {
    const Optiones = (): any[] => {
        let newArray: any[] = []
        for (const key in itemQuery) {
            if (/^option/i.test(key)) {
                newArray.push(itemQuery[key])
            }
        }
        return newArray
    }
    const [selected, setSelected] = useState<string>("")

    return (
        <div>
            <h2>
                {
                    itemQuery.txtQuestion
                }
            </h2>
            {
                itemQuery.type === "text" ?
                    <>
                        <IonInput
                            type="text"
                            name={"pregunta" + itemQuery.order}
                            value={itemQuery.txtQuestion}
                            style={{ display: "none" }}
                        />
                        <IonInput
                            type="text"
                            name={"respuesta" + itemQuery.order}
                            required
                        />
                    </>
                    :
                    itemQuery.type === "option"
                        ?
                        <IonList>
                            <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>

                                <IonInput
                                    type="text"
                                    name={"pregunta" + itemQuery.order}
                                    value={itemQuery.txtQuestion}
                                    style={{ display: "none" }}
                                />
                                <input
                                    type="hidden"
                                    name={"respuesta" + itemQuery.order}
                                    value={selected}
                                />
                                {
                                    Optiones().map((val, i) => {
                                        return <IonItem key={i}>
                                            <IonLabel>{val}</IonLabel>
                                            <IonRadio slot="start" value={val} />
                                        </IonItem>
                                    })
                                }

                            </IonRadioGroup>
                        </IonList>
                        :
                        null
            }
        </div>

    )
}

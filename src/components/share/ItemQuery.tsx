import { IonInput } from '@ionic/react'
import React from 'react'

export const ItemQuery = ({itemQuery} :any) => {
    return (
        <div>
            <h2>
            {
                itemQuery.txtQuestion
            }
            </h2>
            <IonInput type="text"  name={itemQuery.txtQuestion}/>
        </div>
    )
}

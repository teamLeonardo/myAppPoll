import { IonSpinner } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { appFormContext } from '../../context/AppForms'

const ValideModify = (props: any) => {

    const [va, setVa] = useState(false)
    const { validate } = useContext(appFormContext)
    const { id }: any = useParams()
    const { push } = useHistory()
    useEffect(() => {
        validate(id).then((res) => {
            if (res) {
                setVa(res)
            } else {
                push("/app/home")
            }
        })
    }, [])

    if (va) {
        return props.children
    } else {
        return <div style={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} >
            <IonSpinner name="crescent" />
        </div>
    }
}

export default ValideModify 
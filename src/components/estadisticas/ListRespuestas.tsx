import React, { useEffect, useState } from 'react'
import { IonCard, IonCol, IonGrid, IonItem, IonList, IonListHeader, IonRow } from '@ionic/react'
import DataTable from "react-data-table-component"
const ExpanderItem = (props: any) => {
    const [dataTrans, setDataTrans] = useState<any[]>([])
    useEffect(() => {
        let newDataArray = [];
        for (let index = 1; index <= props.numQuery; index++) {
            const pre = props.data[`pregunta${index}`]
            const res = props.data[`respuesta${index}`]
            newDataArray.push({ pre, res })
        }
        setDataTrans(newDataArray)
    }, [props.data])
    return <div>
        <IonList inset>
            <IonListHeader>
                Preguantas
            </IonListHeader>
            {
                dataTrans.map((value, index) => <IonItem key={index}>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <strong>{value.pre}</strong>
                            </IonCol>
                            <IonCol>
                                {value.res}
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>)
            }
        </IonList>
    </div>
}


export const ListRespuestas = ({ data, numQuery }: { data: any[], numQuery: number }) => {

    const ConvertData = (value: number) => {
        let dt: any = new Date(value);
        return `${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getDate().toString().padStart(2, '0')}/${dt.getFullYear().toString().padStart(4, '0')} ${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt.getSeconds().toString().padStart(2, '0')}`;
    }

    const columns = [
        {
            name: "Name",
            selector: "name",
            sortable: true
        },
        {
            name: "time",
            selector: "time",
            sortable: true
        }

    ];

    return (
        <IonGrid>
            <IonRow>
                <IonCol size="12">
                    <IonCard >
                        <DataTable
                            columns={columns}
                            data={data.map((value) => ({ ...value, time: ConvertData(value.time), name: value.name ? value.name : "anonymous" }), [])}
                            expandableRows
                            noHeader
                            highlightOnHover
                            defaultSortField="name"
                            expandableRowsComponent={<ExpanderItem numQuery={numQuery} />}
                        />
                    </IonCard>
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}

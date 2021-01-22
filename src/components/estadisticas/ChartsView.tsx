import { IonSelect, IonSelectOption } from '@ionic/react'
import React, { useEffect, useRef, useState } from 'react'
import { Chart } from "chart.js"
import { db } from '../../services/firebase';
import { useParams } from 'react-router';
export const ChartsView = ({ data }: any) => {

    const [type, setType] = useState<string>("bar");

    const [orderData, setOrderData] = useState<any[]>([])

    const [selectQ, setSelectQ] = useState<any>(0)
    // const []
    const refCanvas = useRef<any>()

    const { id }: any = useParams();
    const render = async () => {

        let ctx = refCanvas.current

        let respuesta: any[] = (await db.collection("question").where("id_form", '==', id).where("type", "==", "option").get()).docs.map((doc) => ({ ...doc.data(), _id: doc.id }))
        let newarray: any[] = []
        for (let iter in respuesta) {
            let { order, txtQuestion }: any = respuesta[iter]
            let option: any[] = []
            for (const key in respuesta[iter]) {
                if (/^option/i.test(key)) {
                    let contador = 0
                    for (const iterator of data) {
                        for (const key2 in iterator.DataForm) {
                            console.log(respuesta[iter][key], iterator.DataForm[key2]);

                            if (respuesta[iter][key] === iterator.DataForm[key2]) {
                                contador++
                            }
                        }
                    }
                    option.push({ "opt": respuesta[iter][key], "conta": contador })
                }
            }
            newarray.push({ order, txtQuestion, option })
        }

        setOrderData(newarray)
        console.log([...newarray[0].option].map(d => d.opt), newarray);

        new Chart(ctx, {
            type: type,
            data: {
                labels: [...newarray[selectQ].option].map(d => d.opt),
                datasets: [{
                    label: '# of Votes',
                    data: [...newarray[selectQ].option].map(d => d.conta),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })

    }
    useEffect(() => {

        render()
    }, [type, selectQ])
    return (
        <>
            {
                (data && [...data].length) ?
                    <>

                        <br />
                        <IonSelect value={type} placeholder="Select type chart" onIonChange={e => setType(e.detail.value)}>
                            {["bar", "horizontalBar", "pie", "line", "doughnut", "radar", "polarArea"].map((value, index) => <IonSelectOption key={index} value={value}>{value}</IonSelectOption>)}

                        </IonSelect>
                        <br />
                        <IonSelect value={selectQ} placeholder="Select Question" onIonChange={e => setSelectQ(Number(e.detail.value))}>
                            {orderData.map((value, index) => <IonSelectOption key={index} value={index}>{value.txtQuestion}</IonSelectOption>)}

                        </IonSelect>
                        <br />
                        <canvas ref={refCanvas} style={{ width: '100%', maxWidth: "350px", maxHeight: "450px" }} />
                    </> :
                    <div>
                        no hay datos
            </div>
            }
        </>
    )
}

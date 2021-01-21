import { IonSelect, IonSelectOption } from '@ionic/react'
import React, { useEffect, useRef, useState } from 'react'
import { Chart } from "chart.js"
import { db } from '../../services/firebase';
import { useParams } from 'react-router';
export const ChartsView = ({ data }: any) => {

    const [gender, setGender] = useState<string>();
    const [type, setType] = useState<string>();
    const [question, setQuestion] = useState<string>();

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

        console.log([...newarray[0].option].map(d => d.opt), newarray);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [...newarray[0].option].map(d => d.opt),
                datasets: [{
                    data: [...newarray[0].option].map(d => d.conta),
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
    }, [])
    return (
        <>
            <br />
            <IonSelect value={gender} placeholder="Select type chart" onIonChange={e => setGender(e.detail.value)}>
                <IonSelectOption value="female">Female</IonSelectOption>
                <IonSelectOption value="male">Male</IonSelectOption>
            </IonSelect>
            <br />
            <IonSelect value={gender} placeholder="Select Question" onIonChange={e => setGender(e.detail.value)}>
                <IonSelectOption value="female">Female</IonSelectOption>
                <IonSelectOption value="male">Male</IonSelectOption>
            </IonSelect>
            <br />
            <canvas ref={refCanvas} style={{ width: '100%', maxWidth: "350px", maxHeight: "450px" }} />
        </>
    )
}

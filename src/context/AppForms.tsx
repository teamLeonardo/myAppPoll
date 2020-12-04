import React, { Component, createContext } from "react"
import { db } from "../services/firebase"
import { AuthContext } from "./auth"

interface IAppFromContext {
    create(): Promise<string>
    Delete: (id: string) => Promise<boolean>
    list: any[]
    listQuestion: any[]
    getList: Function
    getListQuestion: Function
    addQuestion: Function
    updateForm: Function
    clearQuestion: Function
    validate: Function
}

export const appFormContext = createContext({} as IAppFromContext)

class AppFormProvider extends Component {

    state = {
        list: [],
        listQuestion: []

    }

    getList = async (id_form?: string) => {
        try {

            let dataR: any[] = [];
            let id = this.context.user.idUser;
            if (id_form) {
                return (await db.collection("form").doc(id_form).get()).data()
            }
            (await db.collection("form").where("id_user", "==", id).get())
                .forEach(snap => {
                    const data = snap.data()
                    dataR.push({ _id: snap.id, ...data })
                });
            this.setState({ list: dataR })
        } catch (error) {
            console.log(error);
        }
    }
    getListQuestion = async (id_form: string) => {
        try {
            let dataR: any[] = [];
            (await db.collection("question").where("id_form", "==", id_form).get())
                .forEach(snap => {
                    const data = snap.data()
                    dataR.push({ id: snap.id, ...data })
                });
            this.setState({ listQuestion: dataR })
        } catch (error) {
            console.log(error);
        }
    }
    create = async () => {

        let id_user = this.context.user.idUser;
        let { id } = await db.collection("form").add({ id_user, name: "name form example", nFomsEnds: 0 })
        return id;
    }

    addQuestion = async (payload: any) => {

        let { id } = await db.collection("question").add({ ...payload, time: Date.now() })

        this.setState({ listQuestion: [...this.state.listQuestion, { ...payload, id, time: Date.now() }] })
    }

    updateForm = async (id_form: string, payload: any) => {
        try {
            await db.collection("form").doc(id_form).update(payload)
            return true
        } catch (error) {
            return false
        }
    }

    Delete = async (id_form: string) => {
        try {
            await db.collection("form").doc(id_form).delete()
            return true
        } catch (error) {
            return false
        }
    }

    clearQuestion = () => this.setState({ listQuestion: [] })


    validate = (id_form: string, call: Function) => {

        let id = this.context.user.idUser;

        db.collection("form").where("id_user", "==", id).get().then(docsnap => {

            docsnap.forEach((snap) => {
                if (snap.id === id_form) {
                    call(true)
                }
            })

        })
    }



    render() {
        return (
            <appFormContext.Provider
                value={{
                    ...this.state,
                    getList: this.getList,
                    create: this.create,
                    Delete: this.Delete,
                    updateForm: this.updateForm,
                    addQuestion: this.addQuestion,
                    validate: this.validate,
                    clearQuestion: this.clearQuestion,
                    getListQuestion: this.getListQuestion,
                }}
            >
                {this.props.children}
            </appFormContext.Provider>
        )
    }
}
AppFormProvider.contextType = AuthContext

export default AppFormProvider
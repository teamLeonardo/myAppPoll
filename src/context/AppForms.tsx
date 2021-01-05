import React, { Component, createContext } from "react"
import { db } from "../services/firebase"
import { AuthContext } from "./auth"

interface IAppFromContext {
    create(): Promise<string>
    Delete: (id: string) => Promise<boolean>
    list: any[]
    getList: Function
    updateForm: Function
    validate: (id: string) => Promise<boolean>
}

export const appFormContext = createContext({} as IAppFromContext)

class AppFormProvider extends Component {

    state = {
        list: [],
    }


    async componentDidMount() {

        let id = this.context.user.idUser;
        db.collection("form").where("id_user", "==", id).onSnapshot((snap) => {
            let newArray = snap.docs.map(doc => ({ _id: doc.id, ...doc.data() }))
            this.setState({ list: newArray })
        })
        console.log((await db.collection("form").doc("kXxPsAsYqkmLm8QRAFxt").get()).data());

        // (await db.collection("form").doc(id_form).get()).data()
        // db.collection("form").doc("qri3khAj0hVYjkDexdrb55lzy3i2").

    }



    getList = async (id_form?: string) => {
        try {

            console.log("get list  id_ form " + id_form);
            return (await db.collection("form").doc(id_form).get()).data()
        } catch (error) {
            console.log(error);
        }
    }

    create = async () => {

        let id_user = this.context.user.idUser;
        let { id } = await db.collection("form").add({ id_user, name: "name form example", nFomsEnds: 0, public: true , nQuestion: 0 })
        return id;
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
            db.collection("question").where("id_form", "==", id_form).get().then((snat) => {
                snat.docs.map((doc) => {
                    doc.ref.delete()
                })
            })
            return true
        } catch (error) {
            return false
        }
    }


    validate = async (id_form: string) => {

        let id = this.context.user.idUser;

        let { id_user }: any = (await db.collection("form").doc(id_form).get()).data()

        if (id_user === id) {
            return true
        } else {
            return false
        }

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
                    validate: this.validate,
                }}
            >
                {this.props.children}
            </appFormContext.Provider>
        )
    }
}
AppFormProvider.contextType = AuthContext

export default AppFormProvider
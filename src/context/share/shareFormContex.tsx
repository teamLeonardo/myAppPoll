import React, { Component, createContext } from "react";
import { db } from "../../services/firebase";
import { AuthContext } from "../auth";

export const shareFormContex = createContext({} as any)

class ShareFormProvider extends Component<any> {

    state = {
        errorApp: false,
        stateApp: false,
        data: {},
        dataQuery: []
    }


    async componentDidMount() {


        let { setMessError }: any = this.context;
        try {
            let datos = (await db.collection("form").doc(this.props.match.params.id).get())
            if (datos.exists) {
                let newDatos = { ...datos.data(), ...{ _id: datos.id } }
                this.setState({ data: { ...newDatos, ...{ _id: datos.id } }, stateApp: true });
                if (newDatos._id) {
                    let newArray = [];
                    db.collection("question").where("id_form", "==", newDatos._id).onSnapshot(snap => {
                        newArray = snap.docs.map(doc => ({ _id: doc.id, ...doc.data() }))
                        this.setState({ dataQuery: newArray })
                    })
                }
            } else {
                setMessError("El formulario esta en privado");
                this.setState({ errorApp: true })
            }
        } catch (error) {
            setMessError(String(error))
            this.setState({ errorApp: true })
        }
    }

    componentWillUnmount() {
        this.setState({
            errorApp: false,
            stateApp: false,
            data: {},
            dataQuery: []
        })
    }




    render() {
        return (
            <shareFormContex.Provider
                value={{
                    ...this.state,
                }}
            >
                {this.props.children}
            </shareFormContex.Provider>
        )
    }

}

ShareFormProvider.contextType = AuthContext

export default ShareFormProvider
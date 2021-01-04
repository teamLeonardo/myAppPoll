import React, {  createContext, PureComponent } from "react"
import { withRouter } from "react-router-dom"
import { db } from "../services/firebase"
import { appFormContext } from "./AppForms"

interface IQuestions {
    initial: boolean
    listQuestion: any[]
    dataForm: any
    deleteQuestion: (id: string) => Promise<any>
    updateQuestion: (id: string, payload: any) => Promise<any>
    addQuestion: (payload: any) => Promise<any>
}



export const questionContext = createContext({} as IQuestions)


class QuestionProvider extends PureComponent<any> {
    state = {
        initial: false,
        listQuestion: [],
        dataForm: undefined
    }

    async componentDidMount() {

        try {

            let id_form: string = this.props.match.params.id;
            let newDataForm = (await db.collection("form").doc(id_form).get()).data();
            this.setState({ dataForm: newDataForm, initial: true })
            db.collection("question")
                .where("id_form", "==", id_form)
                .onSnapshot((snap) => {
                    let newArrat = snap.docs.map((doc) => ({
                        _id: doc.id, ...doc.data()
                    }))
                    this.setState({ listQuestion: newArrat })
                })
        } catch (error) {
            this.setState({ initial: false })
        }

    }

    componentWillUnmount() {
        this.setState({ listQuestion: [], dataForm: undefined })
    }

    addQuestion = async (payload: any) => {

        await db.collection("question").add({ id_form: this.props.match.params.id, ...payload, time: Date.now() })

    }


    deleteQuestion = async (id: string) => {

    }

    updateQuestion = async (id: string, payload: any) => {

    }

    render() {
        return (
            <questionContext.Provider
                value={{
                    ...this.state,
                    deleteQuestion: this.deleteQuestion,
                    updateQuestion: this.updateQuestion,
                    addQuestion: this.addQuestion
                }}
            >
                {this.props.children}
            </questionContext.Provider>
        )
    }

}

QuestionProvider.contextType = appFormContext

export default withRouter(QuestionProvider as any)
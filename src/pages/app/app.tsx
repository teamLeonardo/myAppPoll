import React from "react"
import { Redirect, Route, useHistory } from "react-router"
import { Home } from "./home"
import { Modify } from "./modify"
import AppFormProvider from "../../context/AppForms"
import QuestionProvider from "../../context/QuestionForms"
import ValideModify from "../segurity/ValideModify"
import { IonModal } from "@ionic/react"
export const AppMain: React.FC = () => {

    const { push } = useHistory()
    
    return (
        <AppFormProvider>
            <Route
                exact
                path="/app/home"
                component={Home}
            />
            <Route
                exact
                path="/app/modify/:id"
                render={() => (
                    <IonModal isOpen={true} onDidDismiss={() => { push("/app/home") }}>
                        <ValideModify>
                            <QuestionProvider>
                                <Modify />
                            </QuestionProvider>
                        </ValideModify>
                    </IonModal>
                )}
            />
            <Route exact path="/app" render={() => <Redirect to="/app/home" />} />
        </AppFormProvider>
    )

}


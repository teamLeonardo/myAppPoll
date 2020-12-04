import React from "react"
import { Redirect, Route } from "react-router"
import { Home } from "./home"
import { Modify } from "./modify"
import AppFormProvider from "../../context/AppForms"
export const AppMain: React.FC = () => {
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
                    component={Modify}
                />
                <Route exact path="/app" render={() => <Redirect to="/app/home" />} />
        </AppFormProvider>
    )

}


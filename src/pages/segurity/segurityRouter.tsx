import React from "react"
import {
    Route,
    Redirect
} from "react-router-dom";

import { AuthContext } from '../../context/auth';



class SegurityRouter extends React.Component<any> {

    render() {

        let { type, ...rest } = this.props

        let { isLoggedIn } = this.context

        if (type === 'private' && !isLoggedIn) {

            return <Redirect to="/" />;

        } else if (type === 'public' && isLoggedIn) {

            return <Redirect to="/app" />;

        }

        return <Route {...rest} />

    }


}

SegurityRouter.contextType = AuthContext

export default SegurityRouter

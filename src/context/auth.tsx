import React from "react"

import { auth } from "../services/firebase"

function watchUserChange(callback: any) {

    const unsub = auth.onAuthStateChanged((user: any) => {
        if (user && !user.isAnonymous) {
            setTimeout(() => {
                callback({ idUser: user.uid, email: user.email })
            }, 1000);

        } else {
            callback(null)
        }

    })

    return unsub
}
// import { USER } from "../services/api";

export const AuthContext = React.createContext({});

export const AuthContextConsumer = AuthContext.Consumer;

export default class AuthContextProvider extends React.Component {

    state = {
        authFirebase: false,
        isLoggedIn: false,
        user: null,
        pageErrorMess: undefined
    }
    userWatchUnSub: any = undefined;

    componentDidMount() {
        this.userWatchUnSub = watchUserChange((userW: any) => {
            if (userW) {

                this.setState({
                    authFirebase: true,
                    isLoggedIn: true,
                    user: userW
                });


            } else {

                this.setState({
                    authFirebase: true,
                    isLoggedIn: false,
                    user: null,
                });

            }

        });
    }

    setMessError = (newMss: string) => {
        this.setState({ pageErrorMess: newMss })
    }

    componentWillUnmount() {

        if (this.userWatchUnSub) {
            this.userWatchUnSub();
        }

    }

    render() {

        return (

            <AuthContext.Provider
                value={{
                    ...this.state,
                    setMessError:this.setMessError
                }}
            >
                {this.props.children}
            </AuthContext.Provider>

        )

    }

};




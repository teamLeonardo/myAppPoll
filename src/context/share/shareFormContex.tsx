import React, { Component, createContext } from "react";

export const shareFormContex = createContext({} as any)

class ShareFormProvider extends Component {

    state = {
        data: []
    }

    render() {
        return (
            <shareFormContex.Provider
                value={{
                    ...this.state
                }}
            >
                {this.props.children}
            </shareFormContex.Provider>
        )
    }

}

export default ShareFormProvider
import React, { FC, useContext } from 'react'
import { AuthContext } from '../../context/auth'

export const PageError: FC = () => {
    let { pageErrorMess }:any = useContext(AuthContext)
    return (
        <div>
            <h2>Esta Pagina Es Para Los Errores</h2>
            {pageErrorMess}
        </div>
    )
}

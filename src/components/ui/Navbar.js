import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startLogout } from '../../actions/auth';

export const Navbar = () => {

    const dispatch = useDispatch();
    const { name } = useSelector( state => state.auth );

    const handleLogout = () => {
        dispatch( startLogout() );
    }

    return (
        <div className="navbar">

            <img src="https://conexa.ai/wp-content/uploads/2021/03/logo.svg" alt="logo" className="navbar-logo" />

            <div>
                <span className="navbar-user">
                    { name }
                </span>
                
                <button 
                    className="secondary-button logout-button"
                    onClick={ handleLogout }
                >                
                    Salir
                </button>
            </div>

        </div>
    )
}

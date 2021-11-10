import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useForm } from '../hooks/useForm'
import { startRegister } from '../actions/auth';

export const RegisterPage = () => {

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.ui)

    const [ formValues, handleInputChange ] = useForm({
        name:'',
        email:'',
        password:''
    })

    const { name, email, password } = formValues

    const handleSubmit = (e) => {
        e.preventDefault()

        if( name.trim().length === 0 ){
            Swal.fire('Error','Nombre obligatorio','error')
            return
        }

        if( email.trim().length === 0 ){
            Swal.fire('Error','Email obligatorio','error')
            return
        }

        if( password.trim().length < 6 ){
            Swal.fire('Error','Password obligatorio','error')
            return
        }

        dispatch( startRegister( email, password, name ) );
    }

    return (
        <div className="login">
            <div className="form-container">
                <img src="https://conexa.ai/wp-content/uploads/2021/03/logo.svg" alt="logo" className="logo" />

                <form className="form" onSubmit={ handleSubmit }>
                <label htmlFor="email" className="label">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        placeholder="Jose" 
                        className="input input-name"
                        name='name'
                        value={ name }
                        onChange={ handleInputChange }
                    />

                    <label htmlFor="email" className="label">Email address</label>
                    <input 
                        type="text" 
                        id="email" 
                        placeholder="email@example.com" 
                        className="input input-email"
                        name='email'
                        value={ email }
                        onChange={ handleInputChange }
                    />

                    <label htmlFor="password" className="label">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="*********" 
                        className="input input-password"
                        name='password'
                        value={ password }
                        onChange={ handleInputChange }
                    />

                    <input 
                        disabled={ loading }
                        type="submit" 
                        value={ `${ loading ? 'Register...' : 'Register'}` }
                        className="primary-button login-button" />
                </form>

                <Link 
                    to="/auth/login"
                    className="secondary-button signup-button"
                >
                    Login
                </Link>
            </div>
        </div>
    )
}

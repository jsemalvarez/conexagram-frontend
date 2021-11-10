import { fetchSinToken, fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';
import Swal from 'sweetalert2';
import { photosClearLogout, startGetPhotos } from './photo';
import { finishLoading, startLoading } from './ui';



export const startLogin = ( email, password ) => {
    return async( dispatch ) => {

        dispatch( startLoading() )

        try {
            
            const resp = await fetchSinToken( 'auth', { email, password }, 'POST' );
            const body = await resp.json();
    
            if( body.ok ) {
                localStorage.setItem('token', body.token );
    
                dispatch( login({
                    uid: body.uid,
                    name: body.name
                }) )
    
                
                dispatch( startGetPhotos() )
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            Swal.fire('Error', 'Uuuppssss...' , 'error');
        }

        
        dispatch( finishLoading() )
    }
}

export const startRegister = ( email, password, name ) => {
    return async( dispatch ) => {

        dispatch( startLoading() )

        try {
            
            const resp = await fetchSinToken( 'auth/new', { email, password, name }, 'POST' );
            const body = await resp.json();
    
            if( body.ok ) {
                localStorage.setItem('token', body.token );
    
                dispatch( login({
                    uid: body.uid,
                    name: body.name
                }) )
    
                dispatch( finishLoading() )
                dispatch( startGetPhotos() )
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            Swal.fire('Error', 'Uuuppssss...' , 'error');
        }

        dispatch( finishLoading() )

    }
}

export const startChecking = () => {
    return async(dispatch) => {

        dispatch( startLoading() )

        try {
            
            const resp = await fetchConToken( 'auth/renew' );
            const body = await resp.json();
    
            if( body.ok ) {
                localStorage.setItem('token', body.token );
    
                dispatch( login({
                    uid: body.uid,
                    name: body.name
                }) )
            
            } else {
                dispatch( checkingFinish() );
            }

        } catch (error) {
            Swal.fire('Error', 'Uuuppssss...' , 'error');
        }

        dispatch( finishLoading() )


    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish });



const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});


export const startLogout = () => {
    return ( dispatch ) => {

        localStorage.clear();
        dispatch( photosClearLogout() )
        dispatch( logout() );
    }
}

const logout = () => ({ type: types.authLogout })
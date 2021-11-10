import Swal from "sweetalert2";

import { fetchConToken } from "../helpers/fetch";
import { finishLoading, startLoading } from "./ui";
import { types } from "../types/types";


export const startGetPhotos = ( offset = 0 ) => {
    return async( dispatch ) => {

        dispatch( startLoading() )

        try {
            
            const resp = await fetchConToken( `photos?offset=${offset}` );
            const body = await resp.json();
    
            if( body.ok ) {           
                dispatch( getPhotos( body.results, body.count ) )
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            Swal.fire('Error', 'Uuuppssss...' , 'error');
        }

        dispatch( finishLoading() )

    }
}

export const getPhotos = ( photos, count ) => ({
    type: types.photosGet,
    payload: { photos, count }
})

export const photosClearLogout = () => ({ type: types.photosClearLogout })



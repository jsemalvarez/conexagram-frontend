import { types } from "../types/types";

const initialState = {
    currentPage:1,
    photosPerPage: 10,
    photosTotal:0,
    photos:[]
}

export const photoReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.photosGet:
            return{
                ...state,
                photosTotal: action.payload.count, 
                photos: action.payload.photos
            }
            
        case types.photosClearLogout:
            return initialState
            
        default:
            return state;
    }
}
import { combineReducers } from 'redux';

import { uiReducer } from './uiReducer';
import { authReducer } from './authReducer';
import { photoReducer } from './photoReducer';



export const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    photo: photoReducer
})


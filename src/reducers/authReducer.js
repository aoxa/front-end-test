import { USER_LOADED, 
    USER_LOADING, AUTH_ERROR, LOGIN_FAIL, 
    LOGIN_SUCCESS, LOGOUT_SUCCESS, 
    REGISTER_FAIL, REGISTER_SUCCESS  } from "../actions/types";
import jwt from 'jsonwebtoken';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
};

export default function reduce(state= initialState, action) {
    switch(action.type) {
        case USER_LOADING: 
            return {
                ...state,
                isLoading: true
            };        
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            if(action.payload.token)
                localStorage.setItem('token', action.payload.token)
            else {
                localStorage.setItem('token', action.payload.idToken)
                action.payload['token'] = action.payload.idToken;
                const token = jwt.decode(action.payload.idToken);
                action.payload['user'] = {'name': token.sub}
            }
                

            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');

            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        default:
            return state;
    }
}
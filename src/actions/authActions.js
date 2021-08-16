import axios from "axios";
import { AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, 
    USER_LOADING, LOGOUT_SUCCESS, REGISTER_FAIL,
     REGISTER_SUCCESS } from "./types";

import { returnErrors } from "./errorsActions";

const jwt = require("jsonwebtoken");
    
export const loadUser = () => (dispatch, getState) => {
    //user loading
    dispatch({type: USER_LOADING});

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res=>dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch( err => {            
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        });
};

export const loadUserAH = () => (dispatch, getState) => {
    //user loading
    dispatch({type: USER_LOADING});

    let config = tokenConfig(getState);

    if(getState().auth.token) {
        config = {...config, params: {username: jwt.decode(getState().auth.token).sub }}
    }

    axios.get('/services/v2/user/getByUsername.json', config)
        .then(res=>dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch( err => {            
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        });
};

export const loginAH = ({email, password}) => dispatch => {
    const config = {
        headers: {
            'Content-type':'application/json'
        }
    };

    console.log(email+":"+password)
    
    config.headers['Authorization'] = "Basic " + btoa(email+":"+password);
    
    console.log("Autorization addded", config)

    axios.post('/services/v2/auth/token.json', null, config)
        .then(res=>dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err=>{
            console.log(err)
            //dispatch(returnErrors(err.response.data, err.response.status, LOGIN_FAIL));

            dispatch({
                type: LOGIN_FAIL
            })})
}

export const login = ({email, password}) => dispatch => {
    const config = {
        headers: {
            'Content-type':'application/json'
        }
    };
    console.log(email, password)

    const body = JSON.stringify({email, password});
    axios.post('/api/auth', body, config)
        .then(res=>dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err=>{
            dispatch(returnErrors(err.response.data, err.response.status, LOGIN_FAIL));

            dispatch({
                type: LOGIN_FAIL
            })})
}

// Register User
export const register = ({name, email, password}) => dispatch => {
    const config = {
        headers: {
            'Content-type':'application/json'
        }
    };

    const body = JSON.stringify({name, email, password});
    axios.post('/api/users', body, config)
        .then(res=>dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err=>{
            dispatch(returnErrors(err.response.data, err.response.status, REGISTER_FAIL));

            dispatch({
                type: REGISTER_FAIL
            })})
};

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
}

export const tokenConfig = getState => {
    // get token from user storage
    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-type":"application/json"
        }
    }

    if(token) {
        config.headers['x-auth-token'] = token;
        config.headers['Authorization'] = "Bearer " + token;
    }

    return config;
}
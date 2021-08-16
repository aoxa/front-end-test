import axios from 'axios';
import { GET_NODES, NODES_LOADING } from './types';
import { returnErrors } from './errorsActions';
import { tokenConfig } from '../components/auth/tokenConfig';

export const getNodes = () => (dispatch, getState) => {
    dispatch({type: NODES_LOADING});
    const config = tokenConfig(getState());

    axios
        .get('/services/v2/question.json', config)
        .then( res=> 
            dispatch({
                type: GET_NODES,
                payload: res.data
            })).catch( err => {console.log("errr", err); dispatch(returnErrors("", ""))});
}


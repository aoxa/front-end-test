import axios from 'axios';
import { useEffect } from 'react';

export default function useUserInfoEffect(user, config, callback) {
    useEffect(()=>{        
        axios.get(
            `/services/v2/user/${user.id}.json`, config)
        .then( res => callback(res.data) )
        .catch(err=>console.log(err))
    } ,[] );
}

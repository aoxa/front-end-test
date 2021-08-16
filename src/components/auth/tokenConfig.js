export const tokenConfig = state => {
    // get token from user storage
    const token = state.auth.token;

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
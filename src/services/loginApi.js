import axios from './axios';

export const loginApi = (email, password) => {
    return axios.post('api/v1/users/authen/', {email: email, pw_hash: password});
}



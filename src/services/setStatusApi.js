import axios from './axios';

export const setStatus = (status, uuid) => {
    return axios.post('api/v1/products/updatebaseinfo', {status: status, uuid: uuid});
}



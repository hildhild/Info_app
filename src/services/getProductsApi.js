import axios from './axios';

export const getProducts = (page, size, name = '') => {
    return axios.get('api/v1/producttypes/', {
        params: {
          name: name,
          page: page,
          size: size
        }
    });
}


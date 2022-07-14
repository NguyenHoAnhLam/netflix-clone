import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
});

export const get = async (pathUrl) => {
    const response = await instance.get(pathUrl);
    return response.data;
};

export default instance;

import axios from 'axios';
import config from '../config/config';

const httpClient = axios.create({
   baseURL: config.baseURL,
   validateStatus: () => true
});

export default httpClient;

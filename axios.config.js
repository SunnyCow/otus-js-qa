import axios from 'axios';

const httpClient = axios.create({
   baseURL: 'https://bookstore.demoqa.com/Account/v1',
   validateStatus: null
});

export default httpClient;

import axios from 'axios';
import { useAuthStore } from '../stores';

const tesloApi = axios.create({
  baseURL: 'http://localhost:3000/api' 
})

// usamos el interceptor leer el estado de zustand
tesloApi.interceptors.request.use(
  (config) => {
    // el token lo llamamos del store de zustand
    const token = useAuthStore.getState().token;
    //console.log(token)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    


    return config;
  }
)

export {
  tesloApi
}
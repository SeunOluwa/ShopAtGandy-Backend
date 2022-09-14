import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API = axios.create({ baseURL: 'https://api.paystack.co/transaction' });

API.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY}`;
            return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const paystack = () => {
    const initializePayment = async ({ first_name, last_name, email, amount }, callback) => {
        try {
            const response = await API.post('/initialize', { first_name, last_name, email, amount });

            return callback(response);
        } catch (error) {
            console.log(error);
        }
    }

    const verifyPayment = async (ref, callback) => {
        try {
            const response = await API.get(`/verify/${encodeURIComponent(ref)}`);
            
            return callback(response);
        } catch (error) {
            console.log(error);
        }
    }

    return { initializePayment, verifyPayment };
}

export default paystack;

import { useUserStore } from '@/store/user';
import axios from 'axios';

// Function to get token from local storage
export function getAuthToken(): string | null {
    const token = localStorage.getItem('user-storage');

    if(token){
        const parsedToken = JSON.parse(token)
        return parsedToken.state.accessToken
    } else return null
}

// Function to handle token removal and redirection
export function clearAuthToken(): void {
    useUserStore.setState({ accessToken: null })
    // localStorage.removeItem('access_token');
    // window.location.href = '/signin'; // Redirect to sign-in page
}

// Create an Axios instance
const axiosClient = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request Interceptor to attach the token
axiosClient.interceptors.request.use(config => {
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Response Interceptor to handle 401 Unauthorized
axiosClient.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401) {
        clearAuthToken(); // Clear token and redirect if unauthorized
    }
    return Promise.reject(error);
});

export default axiosClient;

export const API_URL = (process.env.NODE_ENV === 'production') ? '/api' : 'http://localhost:8000/api';
export const GOOGLE_URL = (process.env.NODE_ENV === 'production') ? 'https://ardu-rob.herokuapp.com/auth/google/callback' : 'http://localhost:8000/auth/google/callback';


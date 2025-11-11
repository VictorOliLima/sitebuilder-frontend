import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE,
    withCredentials: true,
});

// exemplo de chamada:
export async function getHealth() {
    const { data } = await api.get('/api/health');
    return data;
}

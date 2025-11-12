import axios from 'axios';

const baseURL =
    process.env.NEXT_PUBLIC_API_BASE
    || process.env.API_BASE
    || 'http://127.0.0.1:8080';

if (process.env.NODE_ENV !== 'production') {
    // ajuda a diagnosticar em dev
    console.log('[API baseURL]', baseURL);
}

export const api = axios.create({
    baseURL,
    withCredentials: true,
});

export async function getHealth() {
    const { data } = await api.get('/api/health');
    return data;
}

export async function resolvePage(websiteId: string, path: string) {
    const { data } = await api.get(`/api/v1/websites/${websiteId}/pages/resolve`, { params: { path } });
    return data as { path: string; seo?: string | null; schemaJson: string };
}


export function setAuthToken(token: string | null) {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        if (typeof window !== 'undefined') localStorage.setItem('sb_token', token);
    }
    else {
        delete api.defaults.headers.common['Authorization'];
        if (typeof window !== 'undefined') localStorage.removeItem('sb_token');
    }
}

export function loadAuthTokenFromStorage() {
    if (typeof window !== 'undefined') {
        const t = localStorage.getItem('sb_token');
        if (t) api.defaults.headers.common['Authorization'] = `Bearer ${t}`;
    }
}

export async function register(email: string, password: string) {
    const { data } = await api.post('/api/auth/register', { email, password });
    return data as { token: string };
}
export async function login(email: string, password: string) {
    const { data } = await api.post('/api/auth/login', { email, password });
    return data as { token: string };
}
export async function me() {
    const { data } = await api.get('/api/auth/me');
    return data as { email: string; tenantId: string; plan: string };
}
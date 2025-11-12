'use client';

import * as React from 'react';
import { register, setAuthToken, loadAuthTokenFromStorage, me } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [err, setErr] = React.useState<string | null>(null);
    const router = useRouter();

    React.useEffect(() => { loadAuthTokenFromStorage(); }, []);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true); setErr(null);
        try {
            const { token } = await register(email, password);
            setAuthToken(token);
            // checa o usuário e segue para onboarding
            await me();
            router.push('/app/onboarding');
        } catch (e: any) {
            setErr(e?.response?.data?.error || 'Erro ao registrar');
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-dvh grid place-items-center p-6">
            <form onSubmit={onSubmit} className="w-full max-w-sm space-y-3 border rounded-xl p-5">
                <h1 className="text-xl font-semibold">Criar conta</h1>
                <input className="w-full border rounded px-3 py-2" placeholder="email"
                       value={email} onChange={e=>setEmail(e.target.value)} />
                <input className="w-full border rounded px-3 py-2" placeholder="senha" type="password"
                       value={password} onChange={e=>setPassword(e.target.value)} />
                {err && <p className="text-red-600 text-sm">{err}</p>}
                <button disabled={loading} className="w-full rounded bg-blue-600 text-white py-2">
                    {loading ? 'Enviando...' : 'Registrar'}
                </button>
                <p className="text-sm opacity-70">Já tem conta? <a className="underline" href="/app/login">Entrar</a></p>
            </form>
        </main>
    );
}

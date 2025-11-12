'use client';

import * as React from 'react';
import { resolvePage, upsertPage } from '@/lib/api';

export default function Editor({ params }: { params: { websiteId: string } }) {
    const websiteId = params.websiteId;
    const [path, setPath] = React.useState<string>('/');
    const [schema, setSchema] = React.useState<string>('{\n  "version":"1.0",\n  "sections":[]\n}');
    const [loading, setLoading] = React.useState(false);
    const [msg, setMsg] = React.useState<string | null>(null);

    async function load() {
        setLoading(true); setMsg(null);
        const res = await resolvePage(websiteId, path).catch(() => null);
        if (res?.schemaJson) setSchema(res.schemaJson);
        setLoading(false);
    }
    async function save() {
        try {
            JSON.parse(schema); // valida antes
            await upsertPage(websiteId, { path, schemaJson: schema });
            setMsg('Salvo!');
        } catch (e: any) {
            setMsg('Erro: ' + (e?.message || 'verifique o JSON'));
        }
    }

    React.useEffect(() => { load(); }, []);

    return (
        <main className="p-6 max-w-5xl mx-auto space-y-4">
            <h1 className="text-2xl font-semibold">Editor de Página</h1>

            <div className="flex gap-2">
                <input value={path} onChange={(e)=>setPath(e.target.value)} className="border rounded px-3 py-2 w-64" placeholder="/"/>
                <button onClick={load} disabled={loading} className="px-3 py-2 rounded border">{loading?'Carregando...':'Carregar'}</button>
                <button onClick={save} className="px-3 py-2 rounded bg-blue-600 text-white">Salvar</button>
            </div>

            {msg && <div className="text-sm opacity-80">{msg}</div>}

            <textarea value={schema} onChange={(e)=>setSchema(e.target.value)} className="w-full h-[60vh] border rounded p-3 font-mono text-sm" />
            <p className="opacity-60 text-sm">Dica: edite e salve. Visualize em <code>/(site)/{websiteId}{path}</code>.</p>
        </main>
    );
}

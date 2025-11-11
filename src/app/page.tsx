import { getHealth } from '@/lib/api';

export default async function Home() {
  const health = await getHealth().catch(() => ({ status: 'DOWN' }));

  return (
      <main className="min-h-dvh grid place-items-center p-6">
        <div className="max-w-xl w-full space-y-4">
          <h1 className="text-2xl font-semibold">SiteBuilder — Frontend</h1>
          <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-auto">
          {JSON.stringify(health, null, 2)}
        </pre>
        </div>
      </main>
  );
}

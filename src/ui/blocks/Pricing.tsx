export default function Pricing({ plans = [] as any[] }) {
    return (
        <section className="py-14 grid sm:grid-cols-2 gap-6">
            {plans.map((p, i) => (
                <div key={i} className="rounded-xl border p-6">
                    <h3 className="text-xl font-semibold">{p.name}</h3>
                    <div className="text-3xl my-2">{p.price}</div>
                    <ul className="text-sm opacity-80 list-disc ml-5">
                        {(p.features||[]).map((f:string, idx:number)=><li key={idx}>{f}</li>)}
                    </ul>
                </div>
            ))}
        </section>
    );
}

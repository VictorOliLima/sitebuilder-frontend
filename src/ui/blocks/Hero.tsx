export default function Hero({ title, subtitle, cta }: { title: string; subtitle?: string; cta?: {label:string; href:string} }) {
    return (
        <section className="py-20 text-center">
            <h1 className="text-4xl font-bold mb-2">{title}</h1>
            {subtitle && <p className="text-lg opacity-80 mb-6">{subtitle}</p>}
            {cta && <a className="inline-block px-4 py-2 rounded bg-blue-600 text-white" href={cta.href}>{cta.label}</a>}
        </section>
    );
}

import { resolvePage } from '@/lib/api';
import { ComponentRegistry } from '@/ui/registry';
import type { PageSchema } from '@/types/page-schema';
import { notFound } from 'next/navigation';

export default async function SitePage({
                                           params,
                                       }: {
    params: Promise<{ websiteId: string; slug?: string[] }>;
}) {
    const { websiteId, slug } = await params;
    const path = '/' + (slug?.join('/') ?? '');

    const res = await resolvePage(websiteId, path).catch(() => null);
    if (!res) return notFound(); // 404 real do Next

    let schema: PageSchema;
    try {
        schema = JSON.parse(res.schemaJson);
    } catch {
        return notFound();
    }

    const Header =
        schema.layout?.header &&
        ComponentRegistry[schema.layout.header.component];
    const Footer =
        schema.layout?.footer &&
        ComponentRegistry[schema.layout.footer.component];

    return (
        <main className="min-h-dvh p-6">
            {Header ? <Header {...(schema.layout!.header!.props || {})} /> : null}
            {schema.sections.map((s, i) => {
                const Cmp = ComponentRegistry[s.component];
                return Cmp ? <Cmp key={i} {...(s.props || {})} /> : null;
            })}
            {Footer ? <Footer {...(schema.layout!.footer!.props || {})} /> : null}
        </main>
    );
}

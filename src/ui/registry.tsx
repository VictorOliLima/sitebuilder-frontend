import Hero from './blocks/Hero';
import Pricing from './blocks/Pricing';

export const ComponentRegistry: Record<string, any> = {
    Hero, Pricing,
    Navbar: () => null, SimpleFooter: () => <footer className="py-10 text-center opacity-70">© SiteBuilder</footer>,
};

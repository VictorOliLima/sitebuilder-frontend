export type Section = {
    component: string;
    props?: Record<string, any>;
};
export type PageSchema = {
    version: string;
    layout?: {
        header?: { component: string; props?: Record<string, any> };
        footer?: { component: string; props?: Record<string, any> };
    };
    sections: Section[];
};

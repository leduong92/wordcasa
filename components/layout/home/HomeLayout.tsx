import NavHomeMenu from './NavHomeMenu';

export default function HomeLayout({
    children,
    lang,
    region,
}: {
    children: React.ReactNode;
    lang: string;
    region: string;
}) {
    return (
        <div className=" ">
            <NavHomeMenu region={region} lang={lang} />

            <main className="flex-1">{children}</main>
        </div>
    );
}

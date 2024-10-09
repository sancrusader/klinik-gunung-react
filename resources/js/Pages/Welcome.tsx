import { Link, Head } from "@inertiajs/react";

export default function Welcome() {
    return (
        <>
            <Head title="Klinik Gunung" />
            <div className="flex flex-col min-h-screen">
                <header className="px-4 lg:px-6 h-14 flex items-center">
                    <Link className="mb-4" href="/">
                        Klinik Gunung
                    </Link>
                </header>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
                <Link href="/screening-now">Screening Now</Link>
                <Link href="/product">Product</Link>
                <Link href="/blog">Blog</Link>
            </div>
        </>
    );
}

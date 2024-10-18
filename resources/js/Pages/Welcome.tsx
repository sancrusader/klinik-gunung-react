import { Link, Head } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import Header from "@/Layouts/Header";

export default function Welcome() {
    return (
        <Header>
            <Head title="Home" />
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 border-y">
                    <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
                        <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
                            <div>
                                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                                    Klinik Gunung
                                </h1>
                            </div>
                            <div className="flex flex-col items-start space-y-4">
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                    Beautifully designed components that you can
                                    copy and paste into your apps. Accessible.
                                    Customizable. Open Source.
                                </p>
                                <div className="space-x-4">
                                    <Link
                                        href={route('screening.guest')}
                                        className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                                    >
                                        Screening Now
                                    </Link>
                                    
                                </div>
                            </div>
                        </div>
                        <img
                            src="https://images.theconversation.com/files/379026/original/file-20210115-21-90wsyw.jpg"
                            width="1270"
                            height="300"
                            alt="Hero"
                            className="mx-auto aspect-[3/1] overflow-hidden rounded-xl object-cover"
                        />
                    </div>
                </section>
            </main>
            
        </Header>
    );
}

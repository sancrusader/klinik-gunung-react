import { TypewriterEffectSmooth } from "@/Components/ui/typewriter-effect";
import { Link,Head } from "@inertiajs/react";
export default function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Klinik",
    },
    {
      text: "Gunung",
    },
    {
      text: "apps",
    },
    {
      text: "with",
    },
    {
      text: "Aceternity.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (

    <div className="flex flex-col items-center justify-center h-[40rem]  ">
        <Head title={'Home'}/>
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base">
        The road to freedom starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Link href={route('screening.guest')}>
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Screening Now
        </button>
        </Link>
        <Link href={route('register')}>
        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          Signup
        </button>
        </Link>
      </div>
    </div>
  );
}

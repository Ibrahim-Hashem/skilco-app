import { Icons } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl">Your Feed</h1>
      <div className="grid grid-cols-1 md:grid-col-3 gap-y-4 md:gap-x-4 py-6">
        {/* {feed} */}

        {/* project info */}
        <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
          <div className="bg-purple-100 px-6 py-4">
            <p className="font-semibold py-3 flex items-center gap-1.5">
              <Icons.home className="w-5 h-5" />
              Home
            </p>
          </div>
          <div className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <p className="text-zinc-500">
                Your Skilco homepage. Here you can stay up to date with your
                favourite projects and topics.
              </p>
            </div>
            <Link
              className={buttonVariants({
                className: "w-full mt-4 mb-6",
              })}
              href="/project/create"
            >
              {" "}
              Create Project
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

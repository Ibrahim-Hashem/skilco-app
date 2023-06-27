import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";
import { FC } from "react";
import { cn } from "@/lib/utils";
import SignUp from "@/components/SignUp";
import { Icons } from "@/components/Icons";

const page: FC = () => {
  return (
    <div className=" absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        <Link
          href={"/"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "self-start -mt-20"
          )}
        >
          <Icons.chevronLeft className="w-6 h-6 mr-2" />
          Home
        </Link>
        <SignUp />
      </div>
    </div>
  );
};

export default page;

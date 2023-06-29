"use client";

import { Button } from "./ui/Button";
import { Icons } from "./Icons";
import { useRouter } from "next/navigation";

const CloseModal = ({}) => {
  const router = useRouter();
  return (
    <Button
      variant="subtle"
      className="h-6 w-6 p-0 rounded-md"
      aria-label="close modal"
      onClick={(e) => {
        router.back()
      }}
    >
      <Icons.x className="h-6 w-6" />
    </Button>
  );
};

export default CloseModal;

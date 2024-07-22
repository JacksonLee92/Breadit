"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";



const CloseModal = () => {
  const router = useRouter();

  return (
    <Button variant="subtle" className="w-6 h-6 p-0 rounded-md" onClick={() => router.back()}>
      <X aria-label="close modal" className="w-4 h-4" />
    </Button>
  );
};

export default CloseModal;

import CloseModal from "@/components/CloseModal";
import SignUp from "@/components/SignUp";
import { FC } from "react";

const page: FC = () => {
  return (
    <div className="fixed inset-0 z-10 bg-zinc-900/20 ">
      <div className="container flex items-center h-full max-w-lg mx-auto">
        <div className="relative w-full px-2 py-20 bg-white rounded-lg h-fit">
          <div className="absolute top-4 right-4">
            <CloseModal />
          </div>

          <SignUp />
        </div>
      </div>
    </div>
  );
};

export default page;

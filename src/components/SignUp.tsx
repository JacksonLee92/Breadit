import { Icons } from "@/components/Icons";
import UserAuthForm from "@/components/UserAuthForm";
import Link from "next/link";

const SignUp = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="w-6 h-6 mx-auto" />
        <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
        <p className="max-w-xs mx-auto text-sm">
          By continuing, you are setting up a Breadit account and agree to our User Agreement and
          Privacy Policy.
        </p>
      </div>
      <UserAuthForm />
      <p className="px-8 text-sm text-center text-muted-foreground">
        Already a Breadditor?{" "}
        <Link href="/sign-in" className="text-sm underline hover:text-brand underline-offset-4">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignUp;

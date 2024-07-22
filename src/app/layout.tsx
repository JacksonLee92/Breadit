import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["greek"] });

export const metadata = {
  title: "Breadit",
  description: "A Reddit clone built with Next.js and TypeScript.",
};

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("bg-white text-slate-900 antialiased light", inter.className)}>
      <body className="min-h-screen pt-12 antialiased bg-slate-50">
        
        <Providers>
          {/* @ts-expect-error Server Component */}
          <Navbar />
          {authModal}
          <div className="container h-full pt-12 mx-auto max-w-7xl">{children}</div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

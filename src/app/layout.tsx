import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/Toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Skilco",
  description:
    "Skilco is a platform for sharing skills and and knowledge to collaboration on projects.",
};

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal?: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white text-slate-900 antialiased light",
        inter.className
      )}
    >
      <body className="min-h-screen pt-12 bg-slate-50 antialiased">
        {/* @ts-expect-error Server Component */}
        <Navbar />
        {authModal}
        <div className="container max-w-7xl mx-auto h-full pt-12 ">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}

import { ReactNode } from "react";
import SVGLogo from "@/polymet/components/svg-logo";
import Navbar from "@/polymet/components/navbar";

interface LandingLayoutProps {
  children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="p-6 absolute top-0 right-0 left-0 flex justify-between items-center">
        <div className="w-8 h-8 text-gray-300">
          <SVGLogo />
        </div>

        <div className="text-xs text-gray-400 font-light tracking-wider text-right">
          500k+ partner credits
          <br />
          World Class Advisors
          <br />
          GTM + Engineering
        </div>
      </header>
      <main className="flex-1 flex justify-center items-center">
        {children}
      </main>
      
      <Navbar />
    </div>
  );
}

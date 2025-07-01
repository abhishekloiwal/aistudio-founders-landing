import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import SVGLogo from "@/polymet/components/svg-logo";
import Navbar from "@/polymet/components/navbar";

interface LandingLayoutProps {
  children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  const location = useLocation();
  const isApplyPage = location.pathname === "/apply";

  return (
    <div className={`h-screen bg-black text-white flex flex-col ${isApplyPage ? '' : 'overflow-hidden'}`}>
      <header className="p-6 absolute top-0 right-0 left-0 flex justify-between items-center z-10">
        <div className="w-8 h-8 text-gray-300">
          <SVGLogo />
        </div>

        <div className="text-xs text-gray-400 font-light tracking-wider">
          $1M Uncapped
          <br />
          5% Equity
        </div>
      </header>
      <main className={`flex-1 flex justify-center items-center px-4 ${isApplyPage ? 'overflow-y-auto pt-20 pb-20' : ''}`}>
        {children}
      </main>
      
      <Navbar />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LogIn, Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafbfc] flex flex-col font-sans">
      {/* Header */}
      <header className="w-full p-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-[#1b3b64]">
          {/* Logo Approximation */}
          <div className="relative flex items-center">
             <Image 
               src="https://sit.seekersplus.ai/assets/images/logo.png" 
               alt="SmartSeekers" 
               width={160} 
               height={40} 
               className="h-10 w-auto" 
               onError={(e) => {
                 // Fallback if we can't load the real image
                 e.currentTarget.style.display = 'none';
                 e.currentTarget.nextElementSibling?.classList.remove('hidden');
               }} 
             />
             <div className="hidden flex items-center gap-2">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#89c1ff]">
                  <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
                  <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
                </svg>
                <div className="flex flex-col leading-tight font-bold">
                  <span className="text-[#89a1bf]">Smart</span>
                  <span className="text-[#89a1bf]">Seekers</span>
                </div>
             </div>
          </div>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] w-full max-w-[480px] px-8 pt-10 pb-8">
          <div className="flex flex-col items-center">
            <h1 className="text-[#203a61] text-[22px] font-bold mb-2">Log in to SmartSeekers</h1>
            <LogIn className="text-[#7d9ebf] mb-3" size={28} strokeWidth={1.5} />
            <p className="text-[#6c7b93] text-sm mb-8 text-center px-4">
              Log in to access your account and manage interviews.
            </p>
          </div>

          <form className="w-full flex flex-col gap-5">
            {/* Email Field with explicit error state matching screenshot */}
            <div className="w-full flex flex-col gap-1.5">
              <label className="text-[#203a61] text-sm font-semibold">E-mail</label>
              <input 
                type="email" 
                placeholder="Enter e-mail address" 
                className="w-full px-3.5 py-2.5 text-sm border border-red-500 rounded-lg text-black focus:outline-none focus:ring-1 focus:ring-red-500"
                defaultValue=""
              />
              <span className="text-red-500 text-xs">Please fill in this required field</span>
            </div>

            {/* Password Field with explicit error state */}
            <div className="w-full flex flex-col gap-1.5">
              <label className="text-[#203a61] text-sm font-semibold">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter password" 
                  className="w-full px-3.5 py-2.5 pr-10 text-sm border border-red-500 rounded-lg text-black focus:outline-none focus:ring-1 focus:ring-red-500"
                  defaultValue=""
                />
                <button 
                  type="button" 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} strokeWidth={2} />}
                </button>
              </div>
              <span className="text-red-500 text-xs">Please fill in this required field</span>
            </div>

            {/* Login Button */}
            <button 
              type="submit" 
              className="w-full bg-[#87a1c0] hover:bg-[#7691af] text-white font-medium py-2.5 rounded-lg mt-2 transition-colors"
            >
              Login
            </button>
          </form>

          {/* Links */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <Link href="/forgot-password" className="text-[#203a61] text-sm hover:underline font-medium">
              Forgot your password?
            </Link>
            
            <Link href="/" className="flex items-center gap-2 text-[#6c7b93] text-sm hover:text-[#4b5563] transition-colors mt-2">
              <ArrowLeft size={16} />
              Back to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

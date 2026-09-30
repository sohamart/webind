import React from 'react';
import Header from './Header';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import CommandPalette from '../search/CommandPalette';
import LiquidBackground from '../common/LiquidBackground';
import SmoothScroll from '../common/SmoothScroll';

export const AppShell = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col selection:bg-white selection:text-black overflow-x-hidden antialiased">
      {/* 1. Global Lenis Inertial Smooth Momentum Scrolling */}
      <SmoothScroll />

      {/* 2. Apple Pro Minimalist Dark Background */}
      <LiquidBackground />

      {/* 3. Desktop Floating Liquid Navigation Capsule */}
      <DesktopNav />

      {/* 4. Mobile Top Liquid Header */}
      <Header />

      {/* 5. Global Command Palette (⌘K) */}
      <CommandPalette />

      {/* 6. Main Content Area */}
      <main className="relative z-10 flex-1 w-full pb-24 md:pb-16 md:pt-24">
        {children}
      </main>

      {/* 7. Mobile Native Bottom Navigation Dock */}
      <MobileNav />
    </div>
  );
};

export default AppShell;

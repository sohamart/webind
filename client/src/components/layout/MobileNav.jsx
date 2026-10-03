import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Layers, Compass, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'HOME', to: '/', icon: Home },
  { name: 'BRANDS', to: '/brands', icon: Layers },
  { name: 'ABOUT', to: '/about', icon: Compass },
  { name: 'MORE', to: '/more', icon: MoreHorizontal },
];

export const MobileNav = () => {
  const location = useLocation();

  // Hide mobile nav inside admin routes
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-[100] md:hidden select-none">
      <div className="max-w-md mx-auto px-3 py-2 rounded-full liquid-glass-pill flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.to === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.to);

          return (
            <NavLink
              key={item.name}
              to={item.to}
              className="relative flex flex-col items-center justify-center py-1.5 px-4 rounded-full transition-all duration-200 tap-bounce"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-pill"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-white/[0.12] border border-white/[0.2]"
                />
              )}
              <div className="relative z-10">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'text-white scale-110 stroke-[2.2]' : 'text-zinc-400 stroke-[1.8]'
                  }`}
                />
              </div>
              <span
                className={`relative z-10 text-[9px] font-bold tracking-widest mt-0.5 uppercase ${
                  isActive ? 'text-white' : 'text-zinc-500'
                }`}
              >
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;

import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  FileEdit,
  Image as ImageIcon,
  Activity,
  Settings as SettingsIcon,
  LogOut,
  ExternalLink,
  Plus,
  Search,
  Shield,
  Menu,
  X,
} from 'lucide-react';
import { WebindSymbol } from '../common/WebindLogo';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../common/Toast';
import BrandFormModal from './BrandFormModal';

const navItems = [
  { name: 'Dashboard', to: '/admin', icon: LayoutDashboard, exact: true },
  { name: 'Brand CMS', to: '/admin/brands', icon: Layers },
  { name: 'Homepage CMS', to: '/admin/homepage', icon: FileEdit },
  { name: 'Media Library', to: '/admin/media', icon: ImageIcon },
  { name: 'Activity Log', to: '/admin/activity', icon: Activity },
  { name: 'Settings', to: '/admin/settings', icon: SettingsIcon },
];

export const AdminLayout = ({ children, onBrandCreated }) => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleLogout = async () => {
    await logout();
    addToast({
      type: 'info',
      title: 'Signed Out',
      message: 'You have been safely signed out of Admin OS.',
    });
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row antialiased selection:bg-white selection:text-black">
      {/* ==========================================
          DESKTOP SIDEBAR
          ========================================== */}
      <aside className="hidden md:flex flex-col justify-between w-64 border-r border-white/[0.08] bg-zinc-950 p-4 shrink-0 select-none">
        <div className="space-y-6">
          {/* Admin Header Identity */}
          <div className="flex items-center justify-between px-2 pt-2">
            <Link to="/admin" className="flex items-center space-x-2.5">
              <WebindSymbol className="w-7 h-7" />
              <div>
                <div className="text-xs font-black tracking-widest text-white uppercase">
                  WEBIND OS
                </div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase">
                  Management Core
                </div>
              </div>
            </Link>

            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-900 transition"
              title="Open Live Website"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Quick Create Brand Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition shadow-sm tap-bounce"
          >
            <Plus className="w-4 h-4" />
            <span>Create Brand</span>
          </button>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? location.pathname === item.to
                : location.pathname.startsWith(item.to);

              return (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all ${
                    isActive
                      ? 'bg-zinc-900 text-white font-bold border border-white/[0.08]'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="pt-4 border-t border-white/[0.08] space-y-3">
          <div className="flex items-center space-x-3 px-2">
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-white">
              {admin?.name?.charAt(0) || 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-white truncate">
                {admin?.name || 'Administrator'}
              </div>
              <div className="text-[10px] font-mono text-zinc-500 truncate">
                {admin?.email || 'admin@webindgroup.com'}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-xl text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-rose-400 hover:bg-rose-950/20 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ==========================================
          MOBILE ADMIN TOP BAR & DRAWER
          ========================================== */}
      <div className="md:hidden sticky top-0 z-30 w-full bg-zinc-950 border-b border-white/[0.08] px-4 py-3 pt-safe flex items-center justify-between select-none">
        <Link to="/admin" className="flex items-center space-x-2">
          <WebindSymbol className="w-6 h-6" />
          <span className="text-xs font-black tracking-widest text-white uppercase">
            ADMIN OS
          </span>
        </Link>

        <div className="flex items-center space-x-2">
          <Link
            to="/"
            target="_blank"
            className="p-2 rounded-lg text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800"
            title="Live Preview"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/90 backdrop-blur-xl flex flex-col justify-between p-6 pt-20">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? location.pathname === item.to
                : location.pathname.startsWith(item.to);

              return (
                <NavLink
                  key={item.name}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold ${
                    isActive
                      ? 'bg-zinc-900 text-white border border-white/10'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 text-zinc-400" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>

          <div className="pt-6 border-t border-white/[0.08] space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setShowAddModal(true);
              }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Brand</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-zinc-900 text-rose-400 font-mono text-xs uppercase tracking-wider"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* ==========================================
          MAIN ADMIN WORKSPACE CONTENT
          ========================================== */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 overflow-y-auto">
        {children}
      </main>

      {/* Mobile Floating Action Button (FAB) for Add Brand */}
      <button
        onClick={() => setShowAddModal(true)}
        className="md:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl active:scale-95 transition-transform"
        aria-label="Create Brand"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Add Brand Wizard Modal */}
      {showAddModal && (
        <BrandFormModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            if (onBrandCreated) onBrandCreated();
          }}
        />
      )}
    </div>
  );
};

export default AdminLayout;

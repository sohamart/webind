import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppStateProvider, useAppState } from './context/AppStateContext';
import { ToastProvider } from './components/common/Toast';

// Layout & Onboarding Components
import AppShell from './components/layout/AppShell';
import SplashScreen from './components/onboarding/SplashScreen';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import PageTransition from './components/common/PageTransition';

// Public Pages
import HomePage from './pages/public/HomePage';
import BrandsPage from './pages/public/BrandsPage';
import BrandDetailPage from './pages/public/BrandDetailPage';
import AboutPage from './pages/public/AboutPage';
import MorePage from './pages/public/MorePage';
import NotFoundPage from './pages/public/NotFoundPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminBrandsPage from './pages/admin/AdminBrandsPage';
import AdminHomepagePage from './pages/admin/AdminHomepagePage';
import AdminMediaPage from './pages/admin/AdminMediaPage';
import AdminActivityPage from './pages/admin/AdminActivityPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

// Protected Admin Route Guard
const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-mono text-xs">
        VERIFYING ADMIN CREDENTIALS...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

// Root App Controller with Splash and Onboarding Management
const AppContent = () => {
  const { showSplash, showOnboarding, completeOnboarding } = useAppState();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  // If inside /admin route, skip public splash and onboarding
  if (!isAdmin) {
    if (showSplash) {
      return <SplashScreen isExiting={false} />;
    }

    if (showOnboarding) {
      return <OnboardingFlow onComplete={completeOnboarding} />;
    }
  }

  // Admin CMS Routes
  if (isAdmin) {
    return (
      <Routes location={location} key={location.pathname}>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/brands"
          element={
            <ProtectedAdminRoute>
              <AdminBrandsPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/homepage"
          element={
            <ProtectedAdminRoute>
              <AdminHomepagePage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/media"
          element={
            <ProtectedAdminRoute>
              <AdminMediaPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/activity"
          element={
            <ProtectedAdminRoute>
              <AdminActivityPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedAdminRoute>
              <AdminSettingsPage />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    );
  }

  // Public Routes — Wrapped in Persistent AppShell (60FPS Global Page Transition)
  return (
    <AppShell>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/brands/:slug" element={<BrandDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/more" element={<MorePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  );
};

export const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppStateProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </AppStateProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

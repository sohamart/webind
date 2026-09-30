import React, { createContext, useContext, useState, useEffect } from 'react';
import { brandsApi, settingsApi } from '../services/api';

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [onboardingCompleted, setOnboardingCompleted] = useState(() => {
    return localStorage.getItem('webind_onboarding_completed') === 'true';
  });

  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Global Dynamic Ecosystem Data
  const [settings, setSettings] = useState(null);
  const [brands, setBrands] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Fetch ecosystem data on mount
  const refreshData = async () => {
    try {
      setLoadingData(true);
      const [settingsRes, brandsRes] = await Promise.allSettled([
        settingsApi.getPublicSettings(),
        brandsApi.getPublicBrands(),
      ]);

      if (settingsRes.status === 'fulfilled' && settingsRes.value?.settings) {
        setSettings(settingsRes.value.settings);
      }
      if (brandsRes.status === 'fulfilled' && brandsRes.value?.brands) {
        setBrands(brandsRes.value.brands);
      }
    } catch (err) {
      console.error('Failed to load ecosystem data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Splash duration logic
  useEffect(() => {
    const isFirstTime = !onboardingCompleted;
    const duration = isFirstTime ? 2400 : 1200;

    const timer = setTimeout(() => {
      setShowSplash(false);
      if (isFirstTime) {
        setShowOnboarding(true);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [onboardingCompleted]);

  // Complete Onboarding
  const completeOnboarding = () => {
    localStorage.setItem('webind_onboarding_completed', 'true');
    setOnboardingCompleted(true);
    setShowOnboarding(false);
  };

  // Replay Onboarding from Settings / More
  const replayOnboarding = () => {
    setShowOnboarding(true);
  };

  // Keyboard shortcut listener for Command Palette (CMD/CTRL + K or /)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        setCommandPaletteOpen(true);
      } else if (e.key === 'Escape' && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen]);

  return (
    <AppStateContext.Provider
      value={{
        showSplash,
        setShowSplash,
        showOnboarding,
        completeOnboarding,
        replayOnboarding,
        onboardingCompleted,
        commandPaletteOpen,
        setCommandPaletteOpen,
        settings,
        brands,
        loadingData,
        refreshData,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);

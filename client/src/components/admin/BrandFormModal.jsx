import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Check,
  Upload,
  Plus,
  Trash2,
  Eye,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { adminBrandsApi, adminMediaApi } from '../../services/api';
import { useToast } from '../common/Toast';
import BrandCard from '../brand/BrandCard';

const STEPS = [
  { id: 1, name: 'Identity' },
  { id: 2, name: 'Brand Info' },
  { id: 3, name: 'Media' },
  { id: 4, name: 'Links & Products' },
  { id: 5, name: 'SEO' },
  { id: 6, name: 'Preview' },
  { id: 7, name: 'Publish' },
];

export const BrandFormModal = ({ isOpen, onClose, brandToEdit = null, onSuccess }) => {
  const { addToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [saving, setSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    tagline: '',
    category: 'Technology',
    accentColor: '#FFFFFF',
    shortDescription: '',
    fullDescription: '',
    brandStory: '',
    launchDate: '',
    logo: '',
    heroMedia: '',
    gallery: [],
    websiteUrl: '',
    socialUrls: { twitter: '', linkedin: '', github: '', discord: '' },
    products: [],
    services: [],
    seoTitle: '',
    seoDescription: '',
    ogImage: '',
    status: 'ACTIVE',
    isFeatured: false,
    displayOrder: 1,
  });

  // Populate data if editing
  useEffect(() => {
    if (brandToEdit) {
      setFormData({
        name: brandToEdit.name || '',
        slug: brandToEdit.slug || '',
        tagline: brandToEdit.tagline || '',
        category: brandToEdit.category || 'Technology',
        accentColor: brandToEdit.accentColor || '#FFFFFF',
        shortDescription: brandToEdit.shortDescription || '',
        fullDescription: brandToEdit.fullDescription || '',
        brandStory: brandToEdit.brandStory || '',
        launchDate: brandToEdit.launchDate || '',
        logo: brandToEdit.logo || '',
        heroMedia: brandToEdit.heroMedia || '',
        gallery: brandToEdit.gallery || [],
        websiteUrl: brandToEdit.websiteUrl || '',
        socialUrls: brandToEdit.socialUrls || { twitter: '', linkedin: '', github: '' },
        products: brandToEdit.products || [],
        services: brandToEdit.services || [],
        seoTitle: brandToEdit.seoTitle || '',
        seoDescription: brandToEdit.seoDescription || '',
        ogImage: brandToEdit.ogImage || '',
        status: brandToEdit.status || 'ACTIVE',
        isFeatured: Boolean(brandToEdit.isFeatured),
        displayOrder: brandToEdit.displayOrder || 1,
      });
    }
  }, [brandToEdit]);

  // Auto-slug generator
  const handleNameChange = (val) => {
    const autoSlug = val
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');

    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: prev.slug === '' || !brandToEdit ? autoSlug : prev.slug,
      seoTitle: prev.seoTitle === '' ? `${val} — Webind Ecosystem` : prev.seoTitle,
    }));
  };

  // Add Product Item
  const addProduct = () => {
    setFormData((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        { name: '', description: '', status: 'LIVE', link: '' },
      ],
    }));
  };

  const removeProduct = (idx) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== idx),
    }));
  };

  // Add Service Item
  const addService = () => {
    setFormData((prev) => ({
      ...prev,
      services: [...prev.services, { name: '', description: '' }],
    }));
  };

  const removeService = (idx) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== idx),
    }));
  };

  // Media file upload helper
  const handleFileUpload = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);

    try {
      addToast({ type: 'info', message: 'Uploading asset...' });
      const res = await adminMediaApi.upload(data);
      if (res.success && res.media) {
        if (field === 'gallery') {
          setFormData((prev) => ({
            ...prev,
            gallery: [...prev.gallery, res.media.url],
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            [field]: res.media.url,
          }));
        }
        addToast({ type: 'success', message: 'Asset uploaded successfully.' });
      }
    } catch (err) {
      addToast({
        type: 'error',
        message: err.response?.data?.message || 'Failed to upload asset',
      });
    }
  };

  // Submit Brand to Backend
  const handleSubmit = async (overrideStatus = null) => {
    if (!formData.name.trim()) {
      addToast({ type: 'error', message: 'Brand name is required.' });
      setCurrentStep(1);
      return;
    }

    try {
      setSaving(true);
      const payload = {
        ...formData,
        status: overrideStatus || formData.status,
      };

      if (brandToEdit) {
        await adminBrandsApi.update(brandToEdit._id, payload);
        addToast({
          type: 'success',
          title: 'Brand Updated',
          message: `"${formData.name}" has been updated.`,
        });
      } else {
        await adminBrandsApi.create(payload);
        addToast({
          type: 'success',
          title: 'Brand Created',
          message: `"${formData.name}" added to the ecosystem.`,
        });
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Error Saving Brand',
        message: err.response?.data?.message || 'An unexpected error occurred.',
      });
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-3xl bg-zinc-950 border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-white"
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-zinc-900/60">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
              {brandToEdit ? 'EDIT BRAND' : 'NEW BRAND REGISTRATION'}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {formData.name || 'Untitled Brand'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 7-Step Progress Stepper Bar */}
        <div className="flex items-center px-6 py-3 border-b border-white/[0.06] bg-zinc-950 overflow-x-auto scrollbar-none space-x-1">
          {STEPS.map((s) => {
            const isCurrent = s.id === currentStep;
            const isCompleted = s.id < currentStep;

            return (
              <button
                key={s.id}
                onClick={() => setCurrentStep(s.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono uppercase whitespace-nowrap transition-all ${
                  isCurrent
                    ? 'bg-white text-black font-bold'
                    : isCompleted
                    ? 'text-emerald-400 hover:text-emerald-300'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <span>0{s.id}.</span>
                <span>{s.name}</span>
                {isCompleted && <Check className="w-3 h-3 ml-1" />}
              </button>
            );
          })}
        </div>

        {/* Step Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* STEP 1: IDENTITY */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Brand Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Weblets"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-white/30 text-white text-sm focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. weblets"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-white/30 text-white text-sm focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Digital & Web Platforms, AI & ML"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-white/30 text-white text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Brand Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Modern Web Architectures & Component Systems"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-white/30 text-white text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Accent Color / Hex
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={formData.accentColor}
                    onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={formData.accentColor}
                    onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                    className="w-32 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: BRAND INFORMATION */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Short Description (Card Summary)
                </label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Crisp 1-2 sentence description shown in brand cards..."
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-white/30 text-white text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Full Overview
                </label>
                <textarea
                  rows={3}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="Detailed brand overview..."
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-white/30 text-white text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Brand Story & Origin
                </label>
                <textarea
                  rows={4}
                  value={formData.brandStory}
                  onChange={(e) => setFormData({ ...formData, brandStory: e.target.value })}
                  placeholder="The origin narrative, engineering thesis, and mission of this brand..."
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-white/30 text-white text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Launch Date / Timeframe
                </label>
                <input
                  type="text"
                  value={formData.launchDate}
                  onChange={(e) => setFormData({ ...formData, launchDate: e.target.value })}
                  placeholder="e.g. March 2024 or Q4 2026"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-white/30 text-white text-sm focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 3: MEDIA */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Brand Logo (Image or SVG URL)
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    placeholder="/assets/brands/weblets-logo.svg or https://..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-white/30 text-white text-sm font-mono focus:outline-none"
                  />
                  <label className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold uppercase cursor-pointer transition">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'logo')}
                    />
                  </label>
                </div>
                {formData.logo && (
                  <div className="mt-2 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center space-x-3">
                    <img src={formData.logo} alt="Preview" className="h-8 max-w-[120px] object-contain" />
                    <span className="text-[11px] font-mono text-zinc-400 truncate">{formData.logo}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Hero Media / Banner (URL)
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={formData.heroMedia}
                    onChange={(e) => setFormData({ ...formData, heroMedia: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-white/30 text-white text-sm font-mono focus:outline-none"
                  />
                  <label className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold uppercase cursor-pointer transition">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'heroMedia')}
                    />
                  </label>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase text-zinc-400">
                    Gallery Artifacts ({formData.gallery.length})
                  </label>
                  <label className="text-xs font-mono uppercase text-white hover:underline cursor-pointer">
                    + Upload Artifact
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'gallery')}
                    />
                  </label>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {formData.gallery.map((img, idx) => (
                    <div key={idx} className="relative group h-20 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() =>
                          setFormData({
                            ...formData,
                            gallery: formData.gallery.filter((_, i) => i !== idx),
                          })
                        }
                        className="absolute top-1 right-1 p-1 rounded bg-black/80 text-rose-400 opacity-0 group-hover:opacity-100 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: LINKS & PRODUCTS */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Website URL
                  </label>
                  <input
                    type="url"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    placeholder="https://brand.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Twitter / X
                  </label>
                  <input
                    type="text"
                    value={formData.socialUrls?.twitter || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialUrls: { ...formData.socialUrls, twitter: e.target.value },
                      })
                    }
                    placeholder="https://twitter.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm font-mono focus:outline-none"
                  />
                </div>
              </div>

              {/* Products List Editor */}
              <div className="pt-4 border-t border-white/[0.06]">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-mono uppercase text-zinc-300">
                    Products & Modules ({formData.products.length})
                  </label>
                  <button
                    type="button"
                    onClick={addProduct}
                    className="flex items-center space-x-1 text-xs font-mono text-white bg-zinc-900 border border-zinc-700 px-3 py-1 rounded-lg hover:bg-zinc-800"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Product</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.products.map((prod, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={prod.name}
                          onChange={(e) => {
                            const updated = [...formData.products];
                            updated[idx].name = e.target.value;
                            setFormData({ ...formData, products: updated });
                          }}
                          placeholder="Product Name"
                          className="flex-1 px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs"
                        />
                        <select
                          value={prod.status}
                          onChange={(e) => {
                            const updated = [...formData.products];
                            updated[idx].status = e.target.value;
                            setFormData({ ...formData, products: updated });
                          }}
                          className="px-2 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono"
                        >
                          <option value="LIVE">LIVE</option>
                          <option value="BETA">BETA</option>
                          <option value="IN_DEV">IN_DEV</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => removeProduct(idx)}
                          className="p-1.5 text-zinc-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={prod.description}
                        onChange={(e) => {
                          const updated = [...formData.products];
                          updated[idx].description = e.target.value;
                          setFormData({ ...formData, products: updated });
                        }}
                        placeholder="Short capability description..."
                        className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: SEO */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                  placeholder="e.g. Weblets — Modern Web Architectures"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Meta Description
                </label>
                <textarea
                  rows={3}
                  value={formData.seoDescription}
                  onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                  placeholder="Search engine meta description snippet..."
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  OG Image / Social Share URL
                </label>
                <input
                  type="text"
                  value={formData.ogImage}
                  onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                  placeholder="/assets/brands/weblets-og.png"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm font-mono focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 6: PREVIEW */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase text-zinc-400 block mb-2">
                Live Public Card Preview
              </span>
              <div className="max-w-md mx-auto">
                <BrandCard brand={formData} />
              </div>
            </div>
          )}

          {/* STEP 7: PUBLISH */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                  Brand Status
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: 'ACTIVE', label: 'ACTIVE', desc: 'Public & operational' },
                    { val: 'COMING_SOON', label: 'COMING SOON', desc: 'Research & stealth' },
                    { val: 'ARCHIVED', label: 'ARCHIVED', desc: 'Hidden from public' },
                  ].map((st) => (
                    <div
                      key={st.val}
                      onClick={() => setFormData({ ...formData, status: st.val })}
                      className={`p-4 rounded-xl border cursor-pointer transition ${
                        formData.status === st.val
                          ? 'bg-zinc-900 border-white text-white'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="font-bold text-xs font-mono uppercase">{st.label}</div>
                      <div className="text-[10px] text-zinc-500 mt-1">{st.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <div>
                  <div className="text-xs font-bold text-white uppercase font-mono">Featured Ecosystem Brand</div>
                  <div className="text-[11px] text-zinc-400">Highlight prominently on homepage</div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-5 h-5 rounded cursor-pointer accent-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Display Order Priority
                </label>
                <input
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 1 })}
                  className="w-32 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm font-mono text-white"
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/[0.08] bg-zinc-900/80">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="flex items-center space-x-1 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white bg-zinc-800 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {currentStep < 7 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="flex items-center space-x-1 px-6 py-2.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition tap-bounce shadow-md"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={saving}
                onClick={() => handleSubmit()}
                className="flex items-center space-x-2 px-8 py-2.5 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-zinc-200 transition tap-bounce shadow-xl disabled:opacity-50"
              >
                {saving ? (
                  <span>Saving...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{brandToEdit ? 'Save Changes' : 'Publish Brand'}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BrandFormModal;

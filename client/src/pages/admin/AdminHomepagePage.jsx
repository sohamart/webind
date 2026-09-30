import React, { useState, useEffect } from 'react';
import { FileEdit, Check, Plus, Trash2, Globe, Sparkles } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminSettingsApi } from '../../services/api';
import { useToast } from '../../components/common/Toast';
import { useAppState } from '../../context/AppStateContext';

export const AdminHomepagePage = () => {
  const { addToast } = useToast();
  const { refreshData } = useAppState();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    heroTitle: 'WE BIND IDEAS.',
    heroSubtitle: 'A technology group building brands, products and ventures for what’s next.',
    heroCtaText: 'EXPLORE BRANDS',
    metrics: [],
    aboutHeadline: 'A unified architecture for technology creation.',
    aboutBody: '',
    ecosystemPhilosophy: '',
    announcement: { enabled: false, text: '', link: '' },
    footerText: '',
    copyright: '',
  });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await adminSettingsApi.getSettings();
      if (res.success && res.settings) {
        setForm({
          heroTitle: res.settings.heroTitle || 'WE BIND IDEAS.',
          heroSubtitle: res.settings.heroSubtitle || '',
          heroCtaText: res.settings.heroCtaText || 'EXPLORE BRANDS',
          metrics: res.settings.metrics || [],
          aboutHeadline: res.settings.aboutHeadline || '',
          aboutBody: res.settings.aboutBody || '',
          ecosystemPhilosophy: res.settings.ecosystemPhilosophy || '',
          announcement: res.settings.announcement || { enabled: false, text: '', link: '' },
          footerText: res.settings.footerText || '',
          copyright: res.settings.copyright || '',
        });
      }
    } catch (err) {
      addToast({ type: 'error', message: 'Failed to load homepage settings' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await adminSettingsApi.updateSettings(form);
      if (res.success) {
        addToast({
          type: 'success',
          title: 'Homepage Updated',
          message: 'Public homepage CMS changes are now live.',
        });
        refreshData();
      }
    } catch (err) {
      addToast({
        type: 'error',
        message: err.response?.data?.message || 'Failed to update homepage',
      });
    } finally {
      setSaving(false);
    }
  };

  const addMetric = () => {
    setForm((prev) => ({
      ...prev,
      metrics: [
        ...prev.metrics,
        { label: 'New Metric', value: '10+', description: 'Metric description', icon: 'Globe' },
      ],
    }));
  };

  const removeMetric = (idx) => {
    setForm((prev) => ({
      ...prev,
      metrics: prev.metrics.filter((_, i) => i !== idx),
    }));
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
              CONTENT MANAGEMENT
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1">
              Homepage CMS
            </h1>
          </div>

          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-zinc-200 transition shadow-xl tap-bounce disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            <span>{saving ? 'Publishing...' : 'Publish Changes'}</span>
          </button>
        </div>

        {loading ? (
          <div className="py-24 text-center text-zinc-500 font-mono text-xs">
            Loading homepage configuration...
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-8">
            {/* HERO SECTION CMS */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-white/[0.08] space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block border-b border-white/[0.06] pb-3">
                01. Hero Headline & Identity
              </span>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Hero Title (Huge Display)
                </label>
                <input
                  type="text"
                  value={form.heroTitle}
                  onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
                  placeholder="WE BIND IDEAS."
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-base font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Hero Subtitle
                </label>
                <textarea
                  rows={2}
                  value={form.heroSubtitle}
                  onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Primary Hero CTA Button Text
                </label>
                <input
                  type="text"
                  value={form.heroCtaText}
                  onChange={(e) => setForm({ ...form, heroCtaText: e.target.value })}
                  placeholder="EXPLORE BRANDS"
                  className="w-full sm:w-80 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs font-mono uppercase focus:outline-none"
                />
              </div>
            </div>

            {/* DYNAMIC METRICS CMS */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                  02. Dynamic Company Metrics ({form.metrics.length})
                </span>
                <button
                  type="button"
                  onClick={addMetric}
                  className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono uppercase text-white hover:bg-zinc-800"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Metric</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {form.metrics.map((metric, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={metric.value}
                        onChange={(e) => {
                          const updated = [...form.metrics];
                          updated[idx].value = e.target.value;
                          setForm({ ...form, metrics: updated });
                        }}
                        placeholder="Value (e.g. 4+)"
                        className="w-24 px-2 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-sm font-mono font-bold text-white"
                      />
                      <button
                        type="button"
                        onClick={() => removeMetric(idx)}
                        className="p-1 text-zinc-500 hover:text-rose-400 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={metric.label}
                      onChange={(e) => {
                        const updated = [...form.metrics];
                        updated[idx].label = e.target.value;
                        setForm({ ...form, metrics: updated });
                      }}
                      placeholder="Label (e.g. Active Brands)"
                      className="w-full px-2 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-bold text-zinc-300"
                    />

                    <input
                      type="text"
                      value={metric.description}
                      onChange={(e) => {
                        const updated = [...form.metrics];
                        updated[idx].description = e.target.value;
                        setForm({ ...form, metrics: updated });
                      }}
                      placeholder="Subtitle / Description"
                      className="w-full px-2 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-400"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ABOUT & MANIFESTO CMS */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-white/[0.08] space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block border-b border-white/[0.06] pb-3">
                03. Ecosystem Narrative & Thesis
              </span>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  About Headline
                </label>
                <input
                  type="text"
                  value={form.aboutHeadline}
                  onChange={(e) => setForm({ ...form, aboutHeadline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Manifesto Body
                </label>
                <textarea
                  rows={3}
                  value={form.aboutBody}
                  onChange={(e) => setForm({ ...form, aboutBody: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Ecosystem Philosophy
                </label>
                <textarea
                  rows={2}
                  value={form.ecosystemPhilosophy}
                  onChange={(e) => setForm({ ...form, ecosystemPhilosophy: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* ANNOUNCEMENT BANNER CMS */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                  04. Live Announcement Banner
                </span>
                <label className="flex items-center space-x-2 text-xs font-mono cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.announcement?.enabled}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        announcement: { ...form.announcement, enabled: e.target.checked },
                      })
                    }
                    className="w-4 h-4 accent-white rounded"
                  />
                  <span>Active</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Banner Message
                  </label>
                  <input
                    type="text"
                    value={form.announcement?.text || ''}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        announcement: { ...form.announcement, text: e.target.value },
                      })
                    }
                    placeholder="e.g. Webind 2.0 Ecosystem Architecture is now live."
                    className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Target Route / URL
                  </label>
                  <input
                    type="text"
                    value={form.announcement?.link || ''}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        announcement: { ...form.announcement, link: e.target.value },
                      })
                    }
                    placeholder="/brands or https://..."
                    className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs font-mono focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Floating Save Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center space-x-2 px-8 py-3 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-zinc-200 transition shadow-xl tap-bounce disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                <span>{saving ? 'Publishing...' : 'Save All Changes'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminHomepagePage;

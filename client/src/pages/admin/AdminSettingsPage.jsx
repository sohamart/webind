import React, { useState, useEffect } from 'react';
import { Settings, Check, Globe, Shield, Save } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminSettingsApi } from '../../services/api';
import { useToast } from '../../components/common/Toast';
import { useAppState } from '../../context/AppStateContext';

export const AdminSettingsPage = () => {
  const { addToast } = useToast();
  const { refreshData } = useAppState();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    siteName: 'WEBIND GROUP',
    tagline: 'We bind ideas.',
    defaultTheme: 'dark',
    contact: { email: '', partnerships: '', location: '' },
    socials: { twitter: '', linkedin: '', github: '', discord: '' },
    copyright: '© 2026 WEBIND GROUP. All rights reserved.',
    seo: { title: '', description: '', ogImage: '', robotsText: '' },
  });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await adminSettingsApi.getSettings();
      if (res.success && res.settings) {
        setForm({
          siteName: res.settings.siteName || 'WEBIND GROUP',
          tagline: res.settings.tagline || 'We bind ideas.',
          defaultTheme: res.settings.defaultTheme || 'dark',
          contact: res.settings.contact || { email: '', partnerships: '', location: '' },
          socials: res.settings.socials || { twitter: '', linkedin: '', github: '' },
          copyright: res.settings.copyright || '© 2026 WEBIND GROUP. All rights reserved.',
          seo: res.settings.seo || { title: '', description: '', ogImage: '', robotsText: '' },
        });
      }
    } catch (err) {
      addToast({ type: 'error', message: 'Failed to load system settings' });
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
          title: 'Settings Saved',
          message: 'Global ecosystem configuration updated.',
        });
        refreshData();
      }
    } catch (err) {
      addToast({ type: 'error', message: 'Failed to save settings' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
              SYSTEM CONFIGURATION
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1">
              Global Settings
            </h1>
          </div>

          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-zinc-200 transition shadow-xl tap-bounce disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Configuration'}</span>
          </button>
        </div>

        {loading ? (
          <div className="py-24 text-center text-zinc-500 font-mono text-xs">
            Loading settings...
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            {/* Identity Group */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-white/[0.08] space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block border-b border-white/[0.06] pb-3">
                01. Group Identity & Brand
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Parent Group Name
                  </label>
                  <input
                    type="text"
                    value={form.siteName}
                    onChange={(e) => setForm({ ...form, siteName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Official Tagline
                  </label>
                  <input
                    type="text"
                    value={form.tagline}
                    onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Contact & Socials Group */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-white/[0.08] space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block border-b border-white/[0.06] pb-3">
                02. Communication & Channels
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Primary Contact Email
                  </label>
                  <input
                    type="email"
                    value={form.contact?.email || ''}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        contact: { ...form.contact, email: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Partnerships & Ventures Email
                  </label>
                  <input
                    type="email"
                    value={form.contact?.partnerships || ''}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        contact: { ...form.contact, partnerships: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Twitter / X
                  </label>
                  <input
                    type="text"
                    value={form.socials?.twitter || ''}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        socials: { ...form.socials, twitter: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    value={form.socials?.linkedin || ''}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        socials: { ...form.socials, linkedin: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    GitHub
                  </label>
                  <input
                    type="text"
                    value={form.socials?.github || ''}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        socials: { ...form.socials, github: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* SEO Defaults & Search Engine Indexing */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-white/[0.08] space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block border-b border-white/[0.06] pb-3">
                03. Dynamic SEO & Robots Configuration
              </span>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Default Global Meta Title
                </label>
                <input
                  type="text"
                  value={form.seo?.title || ''}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      seo: { ...form.seo, title: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Default Global Meta Description
                </label>
                <textarea
                  rows={2}
                  value={form.seo?.description || ''}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      seo: { ...form.seo, description: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Robots.txt Content (Served dynamically at /robots.txt)
                </label>
                <textarea
                  rows={3}
                  value={form.seo?.robotsText || ''}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      seo: { ...form.seo, robotsText: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs font-mono focus:outline-none"
                />
              </div>
            </div>

            {/* Footer Copyright */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-white/[0.08] space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block border-b border-white/[0.06] pb-2">
                04. Copyright & Legal
              </span>
              <input
                type="text"
                value={form.copyright}
                onChange={(e) => setForm({ ...form, copyright: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs font-mono focus:outline-none"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center space-x-2 px-8 py-3 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-zinc-200 transition shadow-xl tap-bounce disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Configuration'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;

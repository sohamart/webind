import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Layers,
  Sparkles,
  Archive,
  Star,
  Activity,
  Plus,
  ArrowRight,
  FileEdit,
  Image as ImageIcon,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminSettingsApi } from '../../services/api';
import StatusBadge from '../../components/brand/StatusBadge';

export const AdminDashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await adminSettingsApi.getDashboard();
      if (res.success) {
        setDashboardData(res);
      }
    } catch (err) {
      console.error('Failed to load dashboard statistics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const stats = dashboardData?.stats || {
    totalBrands: 4,
    activeBrands: 2,
    comingSoonBrands: 2,
    archivedBrands: 0,
    featuredBrands: 3,
    totalMedia: 0,
  };

  const statCards = [
    { label: 'Total Brands', value: stats.totalBrands, icon: Layers, link: '/admin/brands' },
    { label: 'Active in Ecosystem', value: stats.activeBrands, icon: CheckCircle2, link: '/admin/brands?status=ACTIVE' },
    { label: 'Coming Soon / Stealth', value: stats.comingSoonBrands, icon: Sparkles, link: '/admin/brands?status=COMING_SOON' },
    { label: 'Featured on Hero', value: stats.featuredBrands, icon: Star, link: '/admin/brands' },
    { label: 'Archived Brands', value: stats.archivedBrands, icon: Archive, link: '/admin/brands?status=ARCHIVED' },
  ];

  return (
    <AdminLayout onBrandCreated={fetchDashboard}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
              EXECUTIVE TELEMETRY
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1">
              Ecosystem Dashboard
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/admin/homepage"
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition"
            >
              <FileEdit className="w-3.5 h-3.5" />
              <span>Homepage CMS</span>
            </Link>
            <Link
              to="/admin/brands"
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-zinc-200 transition shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Manage Brands</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
          {statCards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                to={item.link}
                className="p-5 rounded-2xl bg-zinc-950 border border-white/[0.08] hover:border-white/20 transition flex flex-col justify-between group tap-bounce"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">
                    {item.label}
                  </span>
                  <Icon className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                </div>
                <div className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">
                  {item.value}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Content Showcase: Latest Brands + Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Latest Brands */}
          <div className="p-6 rounded-2xl bg-zinc-950 border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
                <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-zinc-400" />
                  <span>Recent Brands</span>
                </h3>
                <Link
                  to="/admin/brands"
                  className="text-xs font-mono text-zinc-400 hover:text-white uppercase transition"
                >
                  View All →
                </Link>
              </div>

              <div className="space-y-3">
                {dashboardData?.latestBrands?.length === 0 ? (
                  <div className="text-xs text-zinc-500 py-6 text-center">
                    No brands created yet.
                  </div>
                ) : (
                  dashboardData?.latestBrands?.map((b) => (
                    <div
                      key={b._id}
                      onClick={() => navigate(`/admin/brands`)}
                      className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 flex items-center justify-between cursor-pointer transition"
                    >
                      <div>
                        <div className="text-xs font-bold text-white tracking-tight">{b.name}</div>
                        <div className="text-[10px] text-zinc-500 font-mono">{b.category}</div>
                      </div>
                      <StatusBadge status={b.status} size="sm" />
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-white/[0.06]">
              <Link
                to="/admin/brands"
                className="text-xs font-mono uppercase text-zinc-400 hover:text-white flex items-center justify-between"
              >
                <span>Reorder or Edit Brands in Ecosystem</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Recent Audit Activity */}
          <div className="p-6 rounded-2xl bg-zinc-950 border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
                <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-zinc-400" />
                  <span>Live Activity Stream</span>
                </h3>
                <Link
                  to="/admin/activity"
                  className="text-xs font-mono text-zinc-400 hover:text-white uppercase transition"
                >
                  Full Trail →
                </Link>
              </div>

              <div className="space-y-2.5">
                {dashboardData?.recentActivity?.length === 0 ? (
                  <div className="text-xs text-zinc-500 py-6 text-center">
                    No recent activity recorded.
                  </div>
                ) : (
                  dashboardData?.recentActivity?.map((act) => (
                    <div
                      key={act._id}
                      className="p-2.5 rounded-xl bg-zinc-900/40 border border-white/[0.04] text-xs flex items-start justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 mr-2">
                          {act.action?.replace('_', ' ')}
                        </span>
                        <span className="text-zinc-300 font-medium">{act.details || act.resource}</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 shrink-0">
                        {new Date(act.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-white/[0.06]">
              <Link
                to="/admin/activity"
                className="text-xs font-mono uppercase text-zinc-400 hover:text-white flex items-center justify-between"
              >
                <span>View Full Security & Operations Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;

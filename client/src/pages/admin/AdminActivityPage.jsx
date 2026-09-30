import React, { useState, useEffect } from 'react';
import { Activity, Shield, Filter, RefreshCw } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminActivityApi } from '../../services/api';

export const AdminActivityPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState('ALL');

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await adminActivityApi.getAll({ action: actionFilter });
      if (res.success) {
        setLogs(res.logs);
      }
    } catch (err) {
      console.error('Failed to load activity logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [actionFilter]);

  const getActionBadgeColor = (action) => {
    if (action.includes('CREATED') || action.includes('PUBLISHED')) {
      return 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60';
    }
    if (action.includes('DELETED') || action.includes('ARCHIVED')) {
      return 'bg-rose-950/60 text-rose-400 border-rose-800/60';
    }
    if (action.includes('LOGIN')) {
      return 'bg-blue-950/60 text-blue-400 border-blue-800/60';
    }
    return 'bg-zinc-900 text-zinc-400 border-zinc-700';
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
              GOVERNANCE AUDIT TRAIL
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1">
              Activity Stream
            </h1>
          </div>

          <button
            onClick={fetchLogs}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono uppercase text-zinc-300 hover:text-white transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            'ALL',
            'ADMIN_LOGIN',
            'BRAND_CREATED',
            'BRAND_EDITED',
            'BRAND_ORDER_UPDATED',
            'HOMEPAGE_UPDATED',
            'MEDIA_UPLOADED',
          ].map((act) => (
            <button
              key={act}
              onClick={() => setActionFilter(act)}
              className={`px-3 py-1 rounded-lg text-xs font-mono uppercase tracking-wider whitespace-nowrap transition ${
                actionFilter === act
                  ? 'bg-white text-black font-bold'
                  : 'bg-zinc-950 text-zinc-400 border border-white/[0.06] hover:text-white'
              }`}
            >
              {act.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Logs Table */}
        <div className="rounded-2xl bg-zinc-950 border border-white/[0.08] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900/60 border-b border-white/[0.06] text-zinc-400 font-mono uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Target Resource</th>
                  <th className="py-3 px-4">Details</th>
                  <th className="py-3 px-4">Admin Operator</th>
                  <th className="py-3 px-4 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-zinc-500 font-mono">
                      Loading audit logs...
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-zinc-500 font-mono">
                      No activity records found.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log._id} className="hover:bg-zinc-900/40 transition-colors">
                      <td className="py-3 px-4">
                        <span
                          className={`font-mono text-[9px] uppercase px-2 py-0.5 rounded border ${getActionBadgeColor(
                            log.action
                          )}`}
                        >
                          {log.action.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-white tracking-tight">
                        {log.resource || 'System'}
                      </td>
                      <td className="py-3 px-4 text-zinc-300 max-w-sm truncate">
                        {log.details}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-zinc-400">
                        {log.adminEmail}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-[11px] text-zinc-500 whitespace-nowrap">
                        {new Date(log.createdAt).toLocaleString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminActivityPage;

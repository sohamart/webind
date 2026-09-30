import React, { useState, useEffect } from 'react';
import {
  Layers,
  Plus,
  Search,
  Edit,
  Trash2,
  ArrowUp,
  ArrowDown,
  Star,
  Eye,
  Archive,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminBrandsApi } from '../../services/api';
import { useToast } from '../../components/common/Toast';
import StatusBadge from '../../components/brand/StatusBadge';
import BrandFormModal from '../../components/admin/BrandFormModal';

export const AdminBrandsPage = () => {
  const { addToast } = useToast();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brandToEdit, setBrandToEdit] = useState(null);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const res = await adminBrandsApi.getAll({
        search,
        status: statusFilter,
      });
      if (res.success) {
        setBrands(res.brands);
      }
    } catch (err) {
      addToast({
        type: 'error',
        message: 'Failed to fetch brands.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [search, statusFilter]);

  // Handle Edit Brand
  const handleEdit = (brand) => {
    setBrandToEdit(brand);
    setIsModalOpen(true);
  };

  // Handle Create Brand
  const handleCreate = () => {
    setBrandToEdit(null);
    setIsModalOpen(true);
  };

  // Handle Delete Brand
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${name}"?`)) {
      return;
    }
    try {
      await adminBrandsApi.delete(id);
      addToast({
        type: 'success',
        title: 'Brand Deleted',
        message: `"${name}" removed from ecosystem.`,
      });
      fetchBrands();
    } catch (err) {
      addToast({
        type: 'error',
        message: 'Failed to delete brand.',
      });
    }
  };

  // Toggle Featured status
  const handleToggleFeatured = async (id) => {
    try {
      const res = await adminBrandsApi.toggleFeatured(id);
      if (res.success) {
        setBrands((prev) =>
          prev.map((b) => (b._id === id ? { ...b, isFeatured: res.isFeatured } : b))
        );
        addToast({
          type: 'success',
          message: res.message,
        });
      }
    } catch (err) {
      addToast({ type: 'error', message: 'Failed to update featured status' });
    }
  };

  // Quick Status Transition (ACTIVE <-> COMING_SOON <-> ARCHIVED)
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await adminBrandsApi.updateStatus(id, newStatus);
      if (res.success) {
        setBrands((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
        );
        addToast({
          type: 'success',
          message: `Brand status changed to ${newStatus}`,
        });
      }
    } catch (err) {
      addToast({ type: 'error', message: 'Failed to change status' });
    }
  };

  // Move Brand Up / Down (Reordering)
  const moveBrand = async (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= brands.length) return;

    const reordered = [...brands];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);

    // Re-assign displayOrder numbers
    const items = reordered.map((b, idx) => ({
      id: b._id,
      displayOrder: idx + 1,
    }));

    setBrands(
      reordered.map((b, idx) => ({
        ...b,
        displayOrder: idx + 1,
      }))
    );

    try {
      await adminBrandsApi.reorder(items);
      addToast({
        type: 'success',
        title: 'Order Updated',
        message: 'Ecosystem brand ordering saved and applied to live site.',
      });
    } catch (err) {
      addToast({ type: 'error', message: 'Failed to save brand order' });
      fetchBrands();
    }
  };

  return (
    <AdminLayout onBrandCreated={fetchBrands}>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
              PORTFOLIO GOVERNANCE
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1">
              Brand CMS & Ordering
            </h1>
          </div>

          <button
            onClick={handleCreate}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-zinc-200 transition shadow-sm tap-bounce"
          >
            <Plus className="w-4 h-4" />
            <span>Create Brand</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search brands by name or category..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-zinc-600"
            />
          </div>

          <div className="flex items-center space-x-2 self-start sm:self-auto overflow-x-auto">
            {['ALL', 'ACTIVE', 'COMING_SOON', 'ARCHIVED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition ${
                  statusFilter === st
                    ? 'bg-zinc-800 text-white font-bold border border-white/10'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Brands Table & List */}
        <div className="rounded-2xl bg-zinc-950 border border-white/[0.08] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900/60 border-b border-white/[0.06] text-zinc-400 font-mono uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4 w-12 text-center">Order</th>
                  <th className="py-3 px-4">Brand Identity</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Featured</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-zinc-500">
                      Loading ecosystem brands...
                    </td>
                  </tr>
                ) : brands.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-zinc-500">
                      No brands found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  brands.map((brand, idx) => (
                    <tr
                      key={brand._id}
                      className="hover:bg-zinc-900/40 transition-colors group"
                    >
                      {/* Reorder Buttons & Display Order */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex flex-col items-center space-y-1">
                          <button
                            disabled={idx === 0}
                            onClick={() => moveBrand(idx, 'up')}
                            className="p-1 rounded text-zinc-600 hover:text-white disabled:opacity-20 transition"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-[11px] font-bold text-zinc-400">
                            #{brand.displayOrder || idx + 1}
                          </span>
                          <button
                            disabled={idx === brands.length - 1}
                            onClick={() => moveBrand(idx, 'down')}
                            className="p-1 rounded text-zinc-600 hover:text-white disabled:opacity-20 transition"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                      </td>

                      {/* Brand Name & Tagline */}
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          {brand.logo ? (
                            <img
                              src={brand.logo}
                              alt=""
                              className="h-7 w-7 object-contain rounded bg-zinc-900 p-1 border border-zinc-800"
                            />
                          ) : (
                            <div className="h-7 w-7 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-white text-xs">
                              {brand.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-white tracking-tight">
                              {brand.name}
                            </div>
                            <div className="text-[10px] text-zinc-500 truncate max-w-xs">
                              {brand.tagline || brand.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4 font-mono text-[11px] text-zinc-400">
                        {brand.category}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3 px-4">
                        <select
                          value={brand.status}
                          onChange={(e) => handleStatusChange(brand._id, e.target.value)}
                          className="px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] font-mono uppercase text-zinc-300 focus:outline-none cursor-pointer"
                        >
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="COMING_SOON">COMING SOON</option>
                          <option value="ARCHIVED">ARCHIVED</option>
                        </select>
                      </td>

                      {/* Featured Toggle */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleToggleFeatured(brand._id)}
                          className={`p-1.5 rounded-lg transition ${
                            brand.isFeatured
                              ? 'text-amber-400 bg-amber-950/40 border border-amber-800/60'
                              : 'text-zinc-600 hover:text-zinc-400'
                          }`}
                          title="Toggle Featured on Hero"
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <a
                            href={`/brands/${brand.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                            title="Preview Public Page"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={() => handleEdit(brand)}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                            title="Edit Brand"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDelete(brand._id, brand.name)}
                            className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-950/20 transition"
                            title="Delete Brand"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Brand Creation / Editing Wizard */}
      {isModalOpen && (
        <BrandFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          brandToEdit={brandToEdit}
          onSuccess={fetchBrands}
        />
      )}
    </AdminLayout>
  );
};

export default AdminBrandsPage;

import React, { useState, useEffect } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Trash2,
  Copy,
  Check,
  Search,
  ExternalLink,
  Eye,
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminMediaApi } from '../../services/api';
import { useToast } from '../../components/common/Toast';

export const AdminMediaPage = () => {
  const { addToast } = useToast();
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedPreview, setSelectedPreview] = useState(null);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await adminMediaApi.getAll({ search });
      if (res.success) {
        setMedia(res.media);
      }
    } catch (err) {
      addToast({ type: 'error', message: 'Failed to load media assets' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [search]);

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', files[0]);

      const res = await adminMediaApi.upload(formData);
      if (res.success) {
        addToast({
          type: 'success',
          title: 'Asset Uploaded',
          message: `${res.media.originalName} saved successfully.`,
        });
        fetchMedia();
      }
    } catch (err) {
      addToast({
        type: 'error',
        message: err.response?.data?.message || 'Upload failed',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(window.location.origin + url);
    addToast({
      type: 'success',
      title: 'Copied',
      message: 'Asset URL copied to clipboard.',
    });
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete media asset "${name}"?`)) return;

    try {
      await adminMediaApi.delete(id);
      addToast({
        type: 'success',
        title: 'Asset Removed',
        message: `Deleted ${name}`,
      });
      fetchMedia();
    } catch (err) {
      addToast({ type: 'error', message: 'Failed to delete asset' });
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
              ASSET STORAGE
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1">
              Media Library
            </h1>
          </div>

          <label className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-zinc-200 transition shadow-sm cursor-pointer tap-bounce">
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Uploading...' : 'Upload Media'}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search media files by name..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-zinc-600"
          />
        </div>

        {/* Media Grid */}
        {loading ? (
          <div className="py-24 text-center text-zinc-500 font-mono text-xs">
            Loading media library...
          </div>
        ) : media.length === 0 ? (
          <div className="py-24 text-center rounded-3xl bg-zinc-950 border border-white/[0.06] p-8">
            <ImageIcon className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="font-bold text-white uppercase">No Media Assets Found</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-2">
              Upload brand logos, hero banners, and gallery artifacts to display across the ecosystem.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {media.map((item) => (
              <div
                key={item._id}
                className="group relative rounded-2xl bg-zinc-950 border border-white/[0.08] hover:border-white/20 overflow-hidden flex flex-col justify-between transition shadow-md"
              >
                <div
                  onClick={() => setSelectedPreview(item.url)}
                  className="h-32 bg-zinc-900/60 flex items-center justify-center p-3 cursor-pointer overflow-hidden"
                >
                  <img
                    src={item.url}
                    alt={item.originalName}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-3 border-t border-white/[0.06] space-y-1">
                  <div className="text-xs font-bold text-white truncate" title={item.originalName}>
                    {item.originalName}
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <span>{(item.size / 1024).toFixed(0)} KB</span>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleCopyUrl(item.url)}
                        className="p-1 text-zinc-400 hover:text-white"
                        title="Copy URL"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id, item.originalName)}
                        className="p-1 text-zinc-500 hover:text-rose-400"
                        title="Delete Asset"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Preview */}
      {selectedPreview && (
        <div
          onClick={() => setSelectedPreview(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md cursor-pointer"
        >
          <img
            src={selectedPreview}
            alt="Asset Preview"
            className="max-w-3xl max-h-[85vh] object-contain rounded-xl border border-white/10"
          />
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminMediaPage;

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Mail,
  Plus,
  Trash2,
  Edit3,
  Eye,
  CheckCircle2,
  XCircle,
  UploadCloud,
  LogOut,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Search,
  Users,
  Video,
  AlertTriangle,
  X,
  MapPin,
  Calendar,
  Sparkles,
  Inbox
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Authentication & Session
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'ACTIVITIES' | 'MEDIA' | 'INQUIRIES'>('OVERVIEW');

  // Data States
  const [stats, setStats] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [dbHealth, setDbHealth] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [activitySearch, setActivitySearch] = useState('');
  const [activityCategoryFilter, setActivityCategoryFilter] = useState('ALL');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('ALL');

  // Modal States
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState<any>(null);
  const [previewActivity, setPreviewActivity] = useState<any>(null);
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: 'ACTIVITY' | 'MEDIA'; id: string; title: string } | null>(null);

  // Upload States
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  // Activity Form State
  const [activityForm, setActivityForm] = useState({
    title: '',
    categoryId: '',
    summary: '',
    description: '',
    location: 'BKC Centre, Yola',
    date: new Date().toISOString().split('T')[0],
    beneficiariesCount: 0,
    beneficiariesLabel: 'Beneficiaries Reached',
    partnersInvolved: '',
    isPublished: true,
    isFeatured: false,
    coverImage: '',
    images: [] as string[]
  });

  // Verify auth on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('bkc_token');
    const storedUser = localStorage.getItem('bkc_user');

    if (!storedToken) {
      router.push('/admin/login');
      return;
    }

    setToken(storedToken);
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        // Ignored
      }
    }

    loadDashboardData(storedToken);
  }, [router]);

  // Load all dashboard data
  const loadDashboardData = async (authToken: string) => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${authToken}` };

      const [statsRes, actRes, mediaRes, catRes, inqRes, healthRes] = await Promise.all([
        fetch('/api/stats').then((r) => r.json()),
        fetch('/api/activities?all=true').then((r) => r.json()),
        fetch('/api/media').then((r) => r.json()),
        fetch('/api/categories').then((r) => r.json()),
        fetch('/api/inquiries', { headers }).then((r) => r.json()),
        fetch('/api/health').then((r) => r.json()).catch(() => null)
      ]);

      if (statsRes.success) setStats(statsRes.data);
      if (actRes.success) setActivities(actRes.data);
      if (mediaRes.success) setMediaList(mediaRes.data);
      if (healthRes) setDbHealth(healthRes);
      if (catRes.success) {
        setCategories(catRes.data);
        if (!activityForm.categoryId && catRes.data.length > 0) {
          setActivityForm((prev) => ({ ...prev, categoryId: catRes.data[0].id }));
        }
      }
      if (inqRes.success) setInquiries(inqRes.data);
    } catch (err) {
      console.warn('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const handleLogout = () => {
    localStorage.removeItem('bkc_token');
    localStorage.removeItem('bkc_user');
    router.push('/admin/login');
  };

  // Publish / Unpublish Toggle
  const handleTogglePublish = async (id: string) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/activities/${id}/publish`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setActivities((prev) =>
          prev.map((a) => (a.id === id ? { ...a, isPublished: data.data.isPublished } : a))
        );
      }
    } catch (e) {
      console.warn('Publish toggle failed:', e);
    }
  };

  // Delete Action Confirm
  const executeDelete = async () => {
    if (!deleteConfirm || !token) return;

    try {
      if (deleteConfirm.type === 'ACTIVITY') {
        const res = await fetch(`/api/activities/${deleteConfirm.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          setActivities((prev) => prev.filter((a) => a.id !== deleteConfirm.id));
        }
      } else if (deleteConfirm.type === 'MEDIA') {
        const res = await fetch(`/api/media/${deleteConfirm.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          setMediaList((prev) => prev.filter((m) => m.id !== deleteConfirm.id));
        }
      }
    } catch (e) {
      console.warn('Delete failed:', e);
    } finally {
      setDeleteConfirm(null);
    }
  };

  // Open Create/Edit Activity Modal
  const openActivityModal = (act: any = null) => {
    if (act) {
      setEditingActivity(act);
      setActivityForm({
        title: act.title,
        categoryId: act.categoryId || categories[0]?.id || '',
        summary: act.summary || '',
        description: act.description || '',
        location: act.location || 'BKC Centre, Yola',
        date: act.date ? new Date(act.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        beneficiariesCount: act.beneficiariesCount || 0,
        beneficiariesLabel: act.beneficiariesLabel || 'Beneficiaries Reached',
        partnersInvolved: act.partnersInvolved || '',
        isPublished: act.isPublished ?? true,
        isFeatured: act.isFeatured ?? false,
        coverImage: act.coverImage || '',
        images: act.images || []
      });
    } else {
      setEditingActivity(null);
      setActivityForm({
        title: '',
        categoryId: categories[0]?.id || '',
        summary: '',
        description: '',
        location: 'BKC Centre, Yola',
        date: new Date().toISOString().split('T')[0],
        beneficiariesCount: 0,
        beneficiariesLabel: 'Beneficiaries Reached',
        partnersInvolved: '',
        isPublished: true,
        isFeatured: false,
        coverImage: mediaList[0]?.url || '',
        images: []
      });
    }
    setShowActivityModal(true);
  };

  // Save Activity (Create or Update)
  const handleSaveActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const url = editingActivity ? `/api/activities/${editingActivity.id}` : '/api/activities';
      const method = editingActivity ? 'PUT' : 'POST';

      const payload = {
        ...activityForm,
        beneficiariesCount: Number(activityForm.beneficiariesCount),
        date: new Date(activityForm.date).toISOString()
      };

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setShowActivityModal(false);
        if (token) loadDashboardData(token);
      } else {
        alert(data.message || 'Error saving activity');
      }
    } catch (e) {
      alert('Failed to save activity. Check server connection.');
    }
  };

  // Handle File Upload (Image or Video)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !token) return;

    setUploading(true);
    setUploadMessage('Uploading media assets...');

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    formData.append('category', 'Uploaded');

    try {
      const res = await fetch('/api/media/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setUploadMessage('Media uploaded successfully!');
        if (token) loadDashboardData(token);
      } else {
        setUploadMessage(data.message || 'Upload failed');
      }
    } catch (err) {
      setUploadMessage('Network error during upload');
    } finally {
      setUploading(false);
      setTimeout(() => setUploadMessage(''), 4000);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Update Inquiry Status
  const handleUpdateInquiryStatus = async (id: string, status: string) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/inquiries/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((i) => (i.id === id ? { ...i, status } : i))
        );
      }
    } catch (e) {
      console.warn('Status update failed:', e);
    }
  };

  // Delete an inquiry
  const handleDeleteInquiry = async (id: string) => {
    if (!token) return;
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        if (stats) {
          setStats((prev: any) => ({
            ...prev,
            totalInquiries: Math.max(0, (prev.totalInquiries || 1) - 1),
            pendingInquiries: Math.max(0, (prev.pendingInquiries || 1) - 1)
          }));
        }
      }
    } catch (e) {
      alert('Failed to delete inquiry');
    }
  };

  // Clear all inquiries
  const handleClearAllInquiries = async () => {
    if (!token) return;
    if (!confirm('Are you sure you want to clear all inquiries? This will empty the inquiries list.')) return;
    try {
      const res = await fetch('/api/inquiries', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setInquiries([]);
        if (stats) {
          setStats((prev: any) => ({
            ...prev,
            totalInquiries: 0,
            pendingInquiries: 0
          }));
        }
      }
    } catch (e) {
      alert('Failed to clear inquiries');
    }
  };

  // Filtered Activities
  const filteredActivities = activities.filter((a) => {
    if (activityCategoryFilter !== 'ALL' && a.categoryId !== activityCategoryFilter) return false;
    if (activitySearch) {
      const q = activitySearch.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.location?.toLowerCase().includes(q) ||
        a.summary?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filtered Inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    if (inquiryStatusFilter !== 'ALL' && inq.status !== inquiryStatusFilter) return false;
    return true;
  });

  if (loading && !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#061124] text-white">
        Verifying administrative authorization...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#061124] text-slate-100 flex flex-col">
      {/* 1. TOP DASHBOARD NAVIGATION BAR */}
      <header className="bg-[#0B1E3A] border-b border-[rgba(255,255,255,0.08)] px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-xl p-1 shadow border border-[rgba(245,158,11,0.3)] flex items-center justify-center">
            <Image
              src="/uploads/bkc-logo.png"
              alt="BKC Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-white font-['Outfit'] leading-none">
              BKC International <span className="text-[#FBBF24]">Admin Portal</span>
            </h1>
            <span className="text-[11px] text-slate-400 font-medium">
              CAC/IT/NO 56020 • Logged in as: <strong>{currentUser?.name || 'Administrator'}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {dbHealth && (
            <div
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs"
              title={dbHealth.autoSyncStatus || 'Database Status'}
            >
              <span className={`w-2 h-2 rounded-full ${dbHealth.databaseConnection?.isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className="text-[11px] font-semibold text-slate-300">
                {dbHealth.databaseConnection?.isConnected ? 'PostgreSQL: Online' : 'Local Store: Active (Auto-Sync)'}
              </span>
            </div>
          )}

          <Link
            href="/"
            target="_blank"
            className="btn btn-secondary text-xs py-2 px-3 flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Public Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="btn btn-secondary text-xs py-2 px-3 text-red-300 hover:text-red-100 hover:bg-red-950/60 border-red-900/40 flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE WITH SIDEBAR */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 bg-[#09172E] border-r border-[rgba(255,255,255,0.06)] p-4 space-y-2">
          <button
            onClick={() => setActiveTab('OVERVIEW')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'OVERVIEW'
                ? 'bg-[#1E40AF] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            System Overview
          </button>

          <button
            onClick={() => setActiveTab('ACTIVITIES')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'ACTIVITIES'
                ? 'bg-[#1E40AF] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="flex items-center gap-3">
              <FileText className="w-4 h-4" />
              Manage Activities
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 font-bold">
              {activities.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('MEDIA')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'MEDIA'
                ? 'bg-[#1E40AF] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="flex items-center gap-3">
              <ImageIcon className="w-4 h-4" />
              Media Library
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 font-bold">
              {mediaList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('INQUIRIES')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'INQUIRIES'
                ? 'bg-[#1E40AF] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="flex items-center gap-3">
              <Mail className="w-4 h-4" />
              Grant Inquiries
            </span>
            {inquiries.filter((i) => i.status === 'PENDING').length > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#F59E0B] text-slate-900 font-bold">
                {inquiries.filter((i) => i.status === 'PENDING').length} New
              </span>
            )}
          </button>

          <div className="pt-6 mt-6 border-t border-[rgba(255,255,255,0.06)] px-2">
            <div className="text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-[#FBBF24] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Database Engine
              </div>
              <p>PostgreSQL with Prisma ORM / Active Store</p>
            </div>
          </div>
        </aside>

        {/* Workspace Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-8">
          {/* TAB 1: SYSTEM OVERVIEW */}
          {activeTab === 'OVERVIEW' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white font-['Outfit']">
                    Welcome back, {currentUser?.name || 'Administrator'}
                  </h2>
                  <p className="text-xs text-slate-400">
                    Here is the real-time operational status of the BKC platform.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openActivityModal()}
                    className="btn btn-primary text-xs py-2.5 px-4 font-bold"
                  >
                    <Plus className="w-4 h-4" />
                    New Activity Post
                  </button>
                  <label className="btn btn-secondary text-xs py-2.5 px-4 font-bold cursor-pointer">
                    <UploadCloud className="w-4 h-4" />
                    Upload Media
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Status Alert Banner if file uploading */}
              {uploadMessage && (
                <div className="p-3.5 rounded-xl bg-blue-950/60 border border-blue-500/50 text-blue-200 text-xs font-semibold">
                  {uploadMessage}
                </div>
              )}

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bkc-card p-6 border-[rgba(59,130,246,0.3)]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase">Total Activities</span>
                    <FileText className="w-5 h-5 text-[#60A5FA]" />
                  </div>
                  <span className="text-3xl font-extrabold text-white font-['Outfit']">
                    {activities.length}
                  </span>
                  <span className="text-xs text-slate-400 block mt-1">
                    {activities.filter((a) => a.isPublished).length} Published Live
                  </span>
                </div>

                <div className="bkc-card p-6 border-[rgba(245,158,11,0.3)]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase">Total Media Assets</span>
                    <ImageIcon className="w-5 h-5 text-[#FBBF24]" />
                  </div>
                  <span className="text-3xl font-extrabold text-white font-['Outfit']">
                    {mediaList.length}
                  </span>
                  <span className="text-xs text-slate-400 block mt-1">
                    Authentic Photos & Videos
                  </span>
                </div>

                <div className="bkc-card p-6 border-[rgba(16,185,129,0.3)]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase">Direct Beneficiaries</span>
                    <Users className="w-5 h-5 text-[#34D399]" />
                  </div>
                  <span className="text-3xl font-extrabold text-white font-['Outfit']">
                    {stats?.totalBeneficiaries?.toLocaleString() || '6,920'}+
                  </span>
                  <span className="text-xs text-slate-400 block mt-1">
                    Reported across 21 LGAs
                  </span>
                </div>

                <div className="bkc-card p-6 border-[rgba(167,139,250,0.3)]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase">Grant Inquiries</span>
                    <Mail className="w-5 h-5 text-[#A78BFA]" />
                  </div>
                  <span className="text-3xl font-extrabold text-white font-['Outfit']">
                    {inquiries.length}
                  </span>
                  <span className="text-xs text-[#FBBF24] block mt-1 font-semibold">
                    {inquiries.filter((i) => i.status === 'PENDING').length} Pending Review
                  </span>
                </div>
              </div>

              {/* Recent Activity Posts Preview */}
              <div className="bkc-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-white font-['Outfit']">
                    Recent Activity Posts
                  </h3>
                  <button
                    onClick={() => setActiveTab('ACTIVITIES')}
                    className="text-xs text-[#60A5FA] hover:underline"
                  >
                    View All & Manage
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-[#061124] text-slate-400 uppercase text-[11px] border-b border-white/10">
                      <tr>
                        <th className="py-3 px-4">Title</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Beneficiaries</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {activities.slice(0, 5).map((act) => (
                        <tr key={act.id} className="hover:bg-white/5">
                          <td className="py-3 px-4 font-semibold text-white">
                            {act.title}
                          </td>
                          <td className="py-3 px-4">
                            <span className="badge badge-blue text-[10px]">
                              {act.category?.name || 'General'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-[#FBBF24] font-bold">
                            {act.beneficiariesCount ? `${act.beneficiariesCount.toLocaleString()}+` : '—'}
                          </td>
                          <td className="py-3 px-4">
                            {act.isPublished ? (
                              <span className="inline-flex items-center gap-1 text-[#10B981] font-semibold">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Published
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-slate-400">
                                <XCircle className="w-3.5 h-3.5" /> Draft
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => setPreviewActivity(act)}
                              className="p-1.5 rounded hover:bg-white/10 text-slate-300"
                              title="Preview"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => openActivityModal(act)}
                              className="p-1.5 rounded hover:bg-white/10 text-[#60A5FA]"
                              title="Edit"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ACTIVITIES MANAGEMENT CRUD */}
          {activeTab === 'ACTIVITIES' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white font-['Outfit']">
                    Activities & Impact Content Management
                  </h2>
                  <p className="text-xs text-slate-400">
                    Create, edit, publish/unpublish, and organize activity posts.
                  </p>
                </div>

                <button
                  onClick={() => openActivityModal()}
                  className="btn btn-primary text-xs py-2.5 px-4 font-bold flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  Create New Activity Post
                </button>
              </div>

              {/* Search & Category Filter */}
              <div className="bkc-card p-4 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filter activities by title, location, or summary..."
                    value={activitySearch}
                    onChange={(e) => setActivitySearch(e.target.value)}
                    className="input-field pl-9 py-2 text-xs"
                  />
                </div>

                <select
                  value={activityCategoryFilter}
                  onChange={(e) => setActivityCategoryFilter(e.target.value)}
                  className="input-field py-2 text-xs bg-[#061124] sm:w-64"
                >
                  <option value="ALL">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Activities Table */}
              <div className="bkc-card p-0 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-[#061124] text-slate-400 uppercase text-[11px] border-b border-white/10">
                      <tr>
                        <th className="py-3.5 px-4">Activity Title</th>
                        <th className="py-3.5 px-4">Category</th>
                        <th className="py-3.5 px-4">Date & Location</th>
                        <th className="py-3.5 px-4">Beneficiaries</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredActivities.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-400">
                            No activities matching the filter criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredActivities.map((act) => (
                          <tr key={act.id} className="hover:bg-white/5">
                            <td className="py-3.5 px-4 max-w-xs">
                              <span className="font-bold text-white block truncate">
                                {act.title}
                              </span>
                              <span className="text-[11px] text-slate-400 block truncate">
                                {act.summary}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="badge badge-blue text-[10px]">
                                {act.category?.name || 'General'}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="block text-white font-medium">
                                {new Date(act.date).toLocaleDateString()}
                              </span>
                              <span className="text-[11px] text-slate-400 truncate max-w-[150px] block">
                                {act.location}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-bold text-[#FBBF24]">
                              {act.beneficiariesCount ? `${act.beneficiariesCount.toLocaleString()}+` : '—'}
                            </td>
                            <td className="py-3.5 px-4">
                              <button
                                onClick={() => handleTogglePublish(act.id)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1 transition-colors ${
                                  act.isPublished
                                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/60'
                                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                                }`}
                              >
                                {act.isPublished ? (
                                  <>
                                    <CheckCircle2 className="w-3 h-3" /> Published
                                  </>
                                ) : (
                                  <>
                                    <XCircle className="w-3 h-3" /> Unpublish
                                  </>
                                )}
                              </button>
                            </td>
                            <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                              <button
                                onClick={() => setPreviewActivity(act)}
                                className="p-1.5 rounded hover:bg-white/10 text-slate-300"
                                title="Live Preview"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => openActivityModal(act)}
                                className="p-1.5 rounded hover:bg-white/10 text-[#60A5FA]"
                                title="Edit Post"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() =>
                                  setDeleteConfirm({
                                    type: 'ACTIVITY',
                                    id: act.id,
                                    title: act.title
                                  })
                                }
                                className="p-1.5 rounded hover:bg-white/10 text-red-400 hover:text-red-300"
                                title="Delete Post"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MEDIA LIBRARY */}
          {activeTab === 'MEDIA' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white font-['Outfit']">
                    Media Storage & Gallery Management
                  </h2>
                  <p className="text-xs text-slate-400">
                    Upload, preview, organize, and delete photos and videos.
                  </p>
                </div>

                <label className="btn btn-primary text-xs py-2.5 px-4 font-bold cursor-pointer flex items-center gap-1.5 self-start sm:self-auto">
                  <UploadCloud className="w-4 h-4" />
                  {uploading ? 'Uploading...' : 'Upload Image or Video'}
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {uploadMessage && (
                <div className="p-3.5 rounded-xl bg-blue-950/60 border border-blue-500/50 text-blue-200 text-xs font-semibold">
                  {uploadMessage}
                </div>
              )}

              {/* Media Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {mediaList.map((item) => (
                  <div
                    key={item.id}
                    className="bkc-card p-2 border border-white/10 group relative flex flex-col justify-between"
                  >
                    <div className="relative h-40 w-full rounded-lg overflow-hidden bg-slate-900 mb-2">
                      {item.mediaType === 'VIDEO' ? (
                        <video src={item.url} className="w-full h-full object-cover" preload="metadata" />
                      ) : (
                        <Image src={item.url} alt={item.title || 'Media'} fill className="object-cover" />
                      )}
                      <div className="absolute top-2 left-2">
                        <span className="badge badge-gold text-[9px] py-0.5 px-1.5">
                          {item.mediaType}
                        </span>
                      </div>
                    </div>

                    <div className="px-1 space-y-1">
                      <h4 className="font-bold text-white text-xs truncate" title={item.title}>
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 truncate">
                        {(item.fileSize / (1024 * 1024)).toFixed(2)} MB • {item.category || 'General'}
                      </p>
                    </div>

                    <div className="pt-2 mt-2 border-t border-white/10 flex items-center justify-between text-xs px-1">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(item.url);
                          alert('Media URL copied: ' + item.url);
                        }}
                        className="text-[11px] text-[#60A5FA] hover:underline"
                      >
                        Copy URL
                      </button>
                      <button
                        onClick={() =>
                          setDeleteConfirm({
                            type: 'MEDIA',
                            id: item.id,
                            title: item.title || item.filename
                          })
                        }
                        className="text-red-400 hover:text-red-300 p-1"
                        title="Delete Media"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: GRANT INQUIRIES & PROPOSALS */}
          {activeTab === 'INQUIRIES' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white font-['Outfit']">
                    Grant, Sponsorship & Donor Inquiries
                  </h2>
                  <p className="text-xs text-slate-400">
                    Review and update the pipeline of incoming funding proposals and partnership requests.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-[#09172E] p-1 rounded-xl border border-white/10">
                    {['ALL', 'PENDING', 'REVIEWED', 'CONTACTED', 'ARCHIVED'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setInquiryStatusFilter(st)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          inquiryStatusFilter === st
                            ? 'bg-[#F59E0B] text-slate-900 shadow'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  {inquiries.length > 0 && (
                    <button
                      onClick={handleClearAllInquiries}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-red-400 hover:text-red-300 border border-red-500/30 hover:bg-red-950/40 transition-all flex items-center gap-1.5"
                      title="Delete all inquiries from the list"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear All</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Inquiries List */}
              <div className="space-y-4">
                {filteredInquiries.length === 0 ? (
                  <div className="bkc-card text-center py-16 px-6 border-white/10 space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-slate-400 flex items-center justify-center mx-auto">
                      <Inbox className="w-8 h-8 text-[#F59E0B]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-white font-['Outfit']">
                        No Grant Inquiries Yet
                      </h4>
                      <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                        When donors, international foundations, and corporate CSR sponsors submit funding proposals from the website, they will appear here in real-time.
                      </p>
                    </div>
                  </div>
                ) : (
                  filteredInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="bkc-card p-6 border-[rgba(59,130,246,0.25)] space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="badge badge-gold text-[10px]">
                            {inq.type}
                          </span>
                          <h3 className="font-bold text-white text-base font-['Outfit']">
                            {inq.subject}
                          </h3>
                        </div>

                        {/* Status Switcher Dropdown */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">Status:</span>
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                            className="bg-[#061124] border border-white/20 text-xs text-white rounded px-2.5 py-1"
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="REVIEWED">REVIEWED</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="ARCHIVED">ARCHIVED</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
                        <div>
                          <strong className="text-slate-400 block">Contact Person:</strong>
                          <span className="text-white font-medium">{inq.contactName}</span>
                          {inq.organizationName && (
                            <span className="text-slate-400 block">({inq.organizationName})</span>
                          )}
                        </div>
                        <div>
                          <strong className="text-slate-400 block">Email & Phone:</strong>
                          <a href={`mailto:${inq.email}`} className="text-[#60A5FA] hover:underline block">
                            {inq.email}
                          </a>
                          <span className="text-slate-400">{inq.phone || 'No phone provided'}</span>
                        </div>
                        <div>
                          <strong className="text-slate-400 block">Proposed Contribution:</strong>
                          <span className="text-[#FBBF24] font-bold">
                            {inq.proposedFunding || 'To be discussed'}
                          </span>
                        </div>
                      </div>

                      <div className="bg-[#061124] p-4 rounded-xl border border-white/5 text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                        {inq.message}
                      </div>

                      <div className="text-[11px] text-slate-500 flex justify-between items-center pt-1 border-t border-white/5">
                        <span>Submitted on: {new Date(inq.createdAt).toLocaleString()}</span>
                        <div className="flex items-center gap-2">
                          <a
                            href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject)} - BKC International`}
                            className="btn btn-secondary text-[11px] py-1 px-3 font-semibold text-[#60A5FA]"
                          >
                            Reply via Email
                          </a>
                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-500/30 transition-colors"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL 1: CREATE / EDIT ACTIVITY */}
      {showActivityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4">
          <div className="bg-[#081832] border border-white/20 rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-[#0B1E3A] to-[#081832] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-[#FBBF24]">
                  {editingActivity ? <Edit3 className="w-4 h-4" /> : <Sparkles className="w-4 h-4 text-[#F59E0B]" />}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
                    {editingActivity ? 'Edit Activity Post' : 'Add New Community Activity'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Fill out the clear sections below to publish or update an activity on the website.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowActivityModal(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Scroll Area */}
            <form onSubmit={handleSaveActivity} className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
              {/* SECTION 1: BASIC DETAILS */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3.5">
                <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider font-['Outfit'] text-[#FBBF24]">
                  <FileText className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>1. Activity Title & Category</span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-200 block mb-1">
                    Activity Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={activityForm.title}
                    onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })}
                    placeholder="e.g. Free STEM & Electronics Workshop for 500 Pupils"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#061124] border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs font-semibold text-slate-200 block mb-1">
                      Strategic Category *
                    </label>
                    <select
                      value={activityForm.categoryId}
                      onChange={(e) => setActivityForm({ ...activityForm, categoryId: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#061124] border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400 transition-all cursor-pointer"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-200 block mb-1">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={activityForm.date}
                      onChange={(e) => setActivityForm({ ...activityForm, date: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#061124] border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: LOCATION & BENEFICIARIES */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3.5">
                <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider font-['Outfit'] text-[#60A5FA]">
                  <MapPin className="w-3.5 h-3.5 text-[#60A5FA]" />
                  <span>2. Location & Community Impact</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs font-semibold text-slate-200 block mb-1">
                      Venue / Location
                    </label>
                    <input
                      type="text"
                      value={activityForm.location}
                      onChange={(e) => setActivityForm({ ...activityForm, location: e.target.value })}
                      placeholder="e.g. BKC Center, Yola Town"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#061124] border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-200 block mb-1 flex items-center justify-between">
                      <span>People / Students Reached</span>
                      <span className="text-[10px] text-emerald-400 font-normal">Updates homepage counter</span>
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={activityForm.beneficiariesCount}
                      onChange={(e) => setActivityForm({ ...activityForm, beneficiariesCount: Number(e.target.value) })}
                      placeholder="e.g. 500"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#061124] border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-200 block mb-1">
                    Partners / Sponsors Involved (Optional)
                  </label>
                  <input
                    type="text"
                    value={activityForm.partnersInvolved}
                    onChange={(e) => setActivityForm({ ...activityForm, partnersInvolved: e.target.value })}
                    placeholder="e.g. Adamawa SUBEB, UNICEF, Rotary International"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#061124] border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-all"
                  />
                </div>
              </div>

              {/* SECTION 3: STORY & PHOTO */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3.5">
                <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider font-['Outfit'] text-[#34D399]">
                  <ImageIcon className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>3. Story & Cover Image</span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-200 block mb-1">
                    Brief Summary (1–2 sentences shown on card preview) *
                  </label>
                  <input
                    type="text"
                    required
                    value={activityForm.summary}
                    onChange={(e) => setActivityForm({ ...activityForm, summary: e.target.value })}
                    placeholder="Concise overview shown on public activity cards..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#061124] border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-200 block mb-1">
                    Full Description / Activity Story *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={activityForm.description}
                    onChange={(e) => setActivityForm({ ...activityForm, description: e.target.value })}
                    placeholder="Detailed narrative of what was achieved, feedback, and outcomes..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#061124] border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-all leading-relaxed"
                  />
                </div>

                {/* Cover Photo Live Preview & Visual Selector */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-200">
                      Cover Photo
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPhotoPicker(!showPhotoPicker)}
                      className="text-[11px] text-[#60A5FA] hover:underline flex items-center gap-1 font-medium"
                    >
                      <ImageIcon className="w-3 h-3" />
                      <span>{showPhotoPicker ? 'Hide Photo Gallery' : 'Browse Photo Gallery'}</span>
                    </button>
                  </div>

                  {activityForm.coverImage ? (
                    <div className="flex items-center gap-3.5 p-2.5 rounded-xl bg-[#061124] border border-white/15">
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-white/20 bg-slate-950">
                        <img
                          src={activityForm.coverImage}
                          alt="Cover Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-emerald-400 font-bold block">✓ Selected Cover Image</span>
                        <p className="text-xs text-white truncate font-medium">{activityForm.coverImage}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowPhotoPicker(true)}
                        className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] text-white font-medium border border-white/10"
                      >
                        Change
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => setShowPhotoPicker(true)}
                      className="p-4 rounded-xl border border-dashed border-white/25 hover:border-amber-400/50 bg-[#061124]/50 cursor-pointer text-center space-y-1 transition-all"
                    >
                      <ImageIcon className="w-6 h-6 text-slate-400 mx-auto" />
                      <span className="text-xs text-slate-300 font-medium block">Click to choose a photo from the gallery</span>
                    </div>
                  )}

                  {/* Visual Photo Picker Grid */}
                  {showPhotoPicker && (
                    <div className="mt-3 p-3 rounded-xl bg-[#061124] border border-white/15 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Click any photo to select as cover:</span>
                        <button
                          type="button"
                          onClick={() => setShowPhotoPicker(false)}
                          className="text-xs text-slate-400 hover:text-white"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 max-h-44 overflow-y-auto pr-1">
                        {mediaList
                          .filter((m) => m.mediaType === 'IMAGE')
                          .map((m) => (
                            <div
                              key={m.id}
                              onClick={() => {
                                setActivityForm({ ...activityForm, coverImage: m.url });
                                setShowPhotoPicker(false);
                              }}
                              className={`relative h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                                activityForm.coverImage === m.url
                                  ? 'border-emerald-400 ring-2 ring-emerald-400/40 scale-95'
                                  : 'border-transparent hover:border-white/50 opacity-75 hover:opacity-100'
                              }`}
                              title={m.title || m.filename}
                            >
                              <img src={m.url} alt={m.title} className="w-full h-full object-cover" />
                              {activityForm.coverImage === m.url && (
                                <div className="absolute inset-0 bg-emerald-500/30 flex items-center justify-center">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* SECTION 4: PUBLISHING CONTROLS */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="text-white font-bold text-xs uppercase tracking-wider font-['Outfit'] text-slate-300">
                  4. Visibility &amp; Status
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setActivityForm({ ...activityForm, isPublished: true })}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                      activityForm.isPublished
                        ? 'bg-emerald-950/40 border-emerald-500/60 text-white'
                        : 'bg-[#061124] border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="isPublished"
                      checked={activityForm.isPublished}
                      onChange={() => {}}
                      className="mt-0.5 text-emerald-500"
                    />
                    <div>
                      <strong className="block text-xs font-bold text-emerald-300">Publish Immediately</strong>
                      <span className="text-[11px] opacity-80">Visible live to all website visitors</span>
                    </div>
                  </div>

                  <div
                    onClick={() => setActivityForm({ ...activityForm, isPublished: false })}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                      !activityForm.isPublished
                        ? 'bg-amber-950/40 border-amber-500/60 text-white'
                        : 'bg-[#061124] border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="isPublished"
                      checked={!activityForm.isPublished}
                      onChange={() => {}}
                      className="mt-0.5 text-amber-500"
                    />
                    <div>
                      <strong className="block text-xs font-bold text-amber-300">Save as Draft</strong>
                      <span className="text-[11px] opacity-80">Saved privately; not visible to public</span>
                    </div>
                  </div>
                </div>

                <label className="flex items-center gap-2.5 pt-1 text-xs font-medium text-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activityForm.isFeatured}
                    onChange={(e) => setActivityForm({ ...activityForm, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500 bg-[#061124] border-white/20"
                  />
                  <span>⭐ Feature as a Flagship project on the Homepage</span>
                </label>
              </div>

              {/* FOOTER ACTIONS */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3 sticky bottom-0 bg-[#081832] py-2">
                <button
                  type="button"
                  onClick={() => setShowActivityModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary text-xs font-bold py-2.5 px-6 shadow-lg shadow-amber-500/20 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingActivity ? 'Update Activity Post' : 'Save & Publish Activity'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: LIVE PREVIEW MODAL */}
      {previewActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="bg-[#0B1E3A] border border-white/20 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 space-y-4 shadow-2xl animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="badge badge-gold text-xs">Live Content Preview</span>
              <button
                onClick={() => setPreviewActivity(null)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {previewActivity.coverImage && (
              <div className="relative h-56 w-full rounded-xl overflow-hidden bg-slate-900">
                <Image
                  src={previewActivity.coverImage}
                  alt={previewActivity.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <h2 className="text-2xl font-bold text-white font-['Outfit']">
              {previewActivity.title}
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <span>{previewActivity.location}</span>
              <span>•</span>
              <span className="text-[#FBBF24] font-bold">
                {previewActivity.beneficiariesCount} Beneficiaries
              </span>
              <span>•</span>
              <span className={previewActivity.isPublished ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                {previewActivity.isPublished ? 'Published' : 'Draft / Unpublished'}
              </span>
            </div>

            <p className="text-sm text-slate-300 whitespace-pre-line leading-relaxed bg-[#061124] p-4 rounded-xl border border-white/5">
              {previewActivity.description}
            </p>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setPreviewActivity(null)}
                className="btn btn-secondary text-xs"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: DESTRUCTIVE ACTION CONFIRMATION */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0B1E3A] border border-red-500/40 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in fade-in duration-150">
            <div className="w-12 h-12 rounded-xl bg-red-950/60 text-red-400 border border-red-500/30 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white font-['Outfit']">
                Confirm Permanent Deletion
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Are you sure you want to delete &ldquo;<strong>{deleteConfirm.title}</strong>&rdquo;? This action cannot be undone.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="btn btn-secondary text-xs"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                className="btn bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-2 px-4"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

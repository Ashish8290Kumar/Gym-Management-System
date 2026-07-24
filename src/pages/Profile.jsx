import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import { User, Mail, Phone, Calendar, Shield, Save, AlertCircle, CheckCircle } from 'lucide-react';

const Profile = () => {
    const { user, setUser } = useAuth();
    
    // Controlled state matching your database registry columns
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        age: user?.age || '',
        gender: user?.gender || ''
    });

    const [status, setStatus] = useState({ text: '', type: '' });
    const [isSaving, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setStatus({ text: '', type: '' });
        setIsLoading(true);

        try {
            // Secure API call to sync data back to your live database profile endpoints
            const response = await API.put(`/users/profile/${user?.id || ''}`, {
                username: formData.username.trim(),
                email: formData.email.trim(),
                phoneNumber: formData.phoneNumber.trim(),
                age: parseInt(formData.age),
                gender: formData.gender
            });

            // Update central context memory so the sidebar updates instantly too
            if (response.data && typeof setUser === 'function') {
                setUser(response.data);
            }
            
            setStatus({ text: "Profile parameters synchronized successfully!", type: "success" });
        } catch (err) {
            setStatus({ text: err.response?.data?.message || "Error transmitting profile updates down to the database matrix.", type: "error" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 space-y-8 bg-[#0A0C10] min-h-screen text-slate-100 text-left pt-24 md:pt-6 w-full overflow-x-hidden">
            
            {/* Header Title Greeting Row */}
            <div className="border-b border-white/5 pb-4">
                <h2 className="text-2xl font-black uppercase tracking-wide text-white font-sans">Account Profile</h2>
                <p className="text-xs text-slate-400 font-medium mt-1">Manage your active membership system credentials, contact values, and system checkpoint tokens.</p>
            </div>

            {/* SPLIT RESPONSIVE INTERFACE LAYOUT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                
                {/* LEFT UTILITY FRAME: SLICK STATS PROFILE AVATAR CARD */}
                <div className="bg-[#12141C] border border-white/5 p-6 rounded-xl shadow-xl space-y-6 text-center">
                    <div className="mx-auto w-24 h-24 rounded-full bg-linear-to-tr from-[#FF451D] to-red-600 flex items-center justify-center border-2 border-white/5 shadow-lg shadow-[#FF451D]/10">
                        <span className="text-3xl font-black text-white uppercase tracking-tight">
                            {formData.username ? formData.username.substring(0, 2) : 'VP'}
                        </span>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white uppercase tracking-wide">@{formData.username || 'user_handle'}</h3>
                        <span className="px-2.5 py-0.5 mt-1.5 text-[9px] font-black tracking-widest bg-[#FF451D]/10 text-[#FF451D] rounded border border-[#FF451D]/20 uppercase inline-block">
                            {user?.role || 'MEMBER'}
                        </span>
                    </div>
                    <div className="border-t border-white/5 pt-4 space-y-2 text-xs text-slate-400 font-medium">
                        <div className="flex items-center justify-between">
                            <span>Status</span>
                            <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">Verified Active</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Joined System</span>
                            <span className="text-slate-200 font-mono">2026-v2.0</span>
                        </div>
                    </div>
                </div>


                {/* RIGHT UTILITY FRAME: CORE ACCOUNT EDITABLE PROFILE DATA PANEL */}
                <div className="lg:col-span-2 bg-[#12141C] border border-white/5 rounded-xl p-6 sm:p-8 shadow-2xl space-y-6">
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider border-b border-white/5 pb-3">Personal Details Matrix</h4>
                    
                    {/* Dynamic Database Transaction Notification Banners */}
                    {status.text && (
                        <div className={`p-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2.5 ${
                            status.type === 'success' ? 'bg-emerald-500/5 border border-emerald-500/10 text-emerald-400' : 'bg-red-500/5 border border-red-500/10 text-red-400'
                        }`}>
                            {status.type === 'success' ? <CheckCircle size={14} className="shrink-0" /> : <AlertCircle size={14} className="shrink-0" />}
                            <span>{status.text}</span>
                        </div>
                    )}

                    <form onSubmit={handleProfileUpdate} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5 text-left">
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Username</label>
                                <div className="relative">
                                    <User size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input type="text" required name="username" value={formData.username} onChange={handleInputChange} className="w-full bg-[#0A0C10] border border-white/5 text-slate-200 text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#FF451D] font-medium transition-colors" />
                                </div>
                            </div>
                            <div className="space-y-1.5 text-left">
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                                <div className="relative">
                                    <Mail size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input type="email" required name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-[#0A0C10] border border-white/5 text-slate-200 text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#FF451D] font-medium transition-colors" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="sm:col-span-2 space-y-1.5 text-left">
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
                                <div className="relative">
                                    <Phone size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input type="text" required name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="w-full bg-[#0A0C10] border border-white/5 text-slate-200 text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#FF451D] font-medium transition-colors" />
                                </div>
                            </div>
                            <div className="space-y-1.5 text-left">
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Age Metric</label>
                                <div className="relative">
                                    <Calendar size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input type="number" required min="1" name="age" value={formData.age} onChange={handleInputChange} className="w-full bg-[#0A0C10] border border-white/5 text-slate-200 text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#FF451D] font-medium transition-colors" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5 text-left">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gender Value</label>
                            <div className="relative">
                                <Shield size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                <select name="gender" required value={formData.gender} onChange={handleInputChange} className="w-full bg-[#0A0C10] border border-white/5 text-slate-200 text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#FF451D] font-medium transition-colors appearance-none">
                                    <option value="" className="bg-[#12141C]">Select Gender</option>
                                    <option value="Male" className="bg-[#12141C]">Male</option>
                                    <option value="Female" className="bg-[#12141C]">Female</option>
                                    <option value="Other" className="bg-[#12141C]">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-4 text-right">
                            <button type="submit" disabled={isSaving} className="px-6 py-3 bg-[#FF451D] hover:bg-[#e33914] text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#FF451D]/15 flex items-center justify-center space-x-2 ml-auto disabled:opacity-40">
                                <Save size={14} />
                                <span>{isSaving ? 'Synchronizing Data...' : 'Save Profile Settings'}</span>
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Profile;

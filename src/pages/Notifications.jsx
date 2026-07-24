import React, { useState } from 'react';
import { Bell, Info, ShieldAlert, Award, Calendar, Check, Trash2, Radio } from 'lucide-react';

const Notifications = () => {
    const [filter, setFilter] = useState('all');

    // Live tracking notification mock dataset matching database parameters
    const [notifications, setNotifications] = useState([
        { id: 1, type: 'announcement', title: "Gym Timing Extended for Festivities", message: "Great news! Vitality Gym will remain open until 11:30 PM starting this Monday to accommodate peak evening slots.", time: "2 hours ago", read: false },
        { id: 2, type: 'alert', title: "Maintenance Schedule: Sauna & Steam Room", message: "The sauna area will be closed for routine filter updates and deep sanitation cleaning tomorrow from 10:00 AM to 2:00 PM.", time: "1 day ago", read: false },
        { id: 3, type: 'system', title: "Payment Cleared Successfully", message: "Your transaction TXN-984321 for the Gold Membership Plan has been processed. Invoice receipt sent down to your email handle.", time: "3 days ago", read: true },
        { id: 4, type: 'achievement', title: "Consistency Milestone Unlocked!", message: "Congratulations! You have completed 15 check-ins this month. Your attendance track badge has been updated.", time: "1 week ago", read: true }
    ]);

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...prev, read: true })));
    };

    const clearAll = () => {
        setNotifications([]);
    };

    const filteredNotifications = notifications.filter(n => {
        if (filter === 'all') return true;
        if (filter === 'unread') return !n.read;
        return n.type === filter;
    });

    const getIcon = (type) => {
        switch (type) {
            case 'announcement': return <Radio size={16} className="text-[#FF451D]" />;
            case 'alert': return <ShieldAlert size={16} className="text-amber-400" />;
            case 'achievement': return <Trophy size={16} className="text-yellow-400" />;
            default: return <Info size={16} className="text-blue-400" />;
        }
    };

    return (
        <div className="p-6 space-y-8 bg-[#0A0C10] min-h-screen text-slate-100 text-left pt-24 md:pt-6 w-full overflow-x-hidden">
            
            {/* Header Title Greeting Row */}
            <div className="border-b border-white/5 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black uppercase tracking-wide text-white font-sans">Broadcast Alerts</h2>
                    <p className="text-xs text-slate-400 font-medium mt-1">Review live gym announcements, system authorization warnings, updates, and milestones achievements metrics.</p>
                </div>
                
                {/* Action Trigger Panels */}
                <div className="flex items-center space-x-2.5">
                    <button onClick={markAllAsRead} className="px-3 py-1.5 border border-white/10 hover:border-white/20 text-slate-300 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center space-x-1.5 bg-[#12141C]">
                        <Check size={12} /> <span>Mark Read</span>
                    </button>
                    <button onClick={clearAll} className="px-3 py-1.5 border border-rose-500/10 hover:border-rose-500/30 text-rose-400 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center space-x-1.5 bg-rose-950/10">
                        <Trash2 size={12} /> <span>Clear All</span>
                    </button>
                </div>
            </div>

            {/* TAB SELECTION CONSOLE FILTER */}
            <div className="flex items-center space-x-2 border-b border-white/5 pb-1 overflow-x-auto w-full scrollbar-none">
                {[
                    { id: 'all', label: 'All Alerts' },
                    { id: 'unread', label: 'Unread' },
                    { id: 'announcement', label: 'Announcements' },
                    { id: 'alert', label: 'System Alerts' }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setFilter(tab.id)}
                        className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                            filter === tab.id 
                                ? 'border-[#FF451D] text-[#FF451D]' 
                                : 'border-transparent text-slate-400 hover:text-slate-200'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>


            {/* NOTIFICATIONS LAYOUT CONTAINER FEED */}
            <div className="space-y-4 max-w-4xl">
                {filteredNotifications.length === 0 ? (
                    <div className="bg-[#12141C] border border-white/5 rounded-xl p-12 text-center space-y-3">
                        <Bell size={32} className="text-slate-600 mx-auto" />
                        <div>
                            <h5 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Alert Feed Empty</h5>
                            <p className="text-xs text-slate-500 font-medium mt-1">No broadcast logs match your active selection parameter filter indexes right now.</p>
                        </div>
                    </div>
                ) : (
                    filteredNotifications.map((noti) => (
                        <div 
                            key={noti.id} 
                            className={`p-5 rounded-xl border transition-all flex items-start space-x-4 shadow-xl relative group ${
                                noti.read 
                                    ? 'bg-[#12141C]/50 border-white/5 opacity-70' 
                                    : 'bg-[#12141C] border-white/10 hover:border-white/20'
                            }`}
                        >
                            {/* Blue/Orange/Amber Unread Condition Status Indicator Dot */}
                            {!noti.read && (
                                <span className="absolute top-5 right-5 w-2 h-2 rounded-full bg-[#FF451D] shadow-md shadow-[#FF451D]/50"></span>
                            )}

                            {/* Categorized Decorative Floating Circular Asset Icon */}
                            <div className="w-9 h-9 rounded-xl bg-[#0A0C10] border border-white/5 flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
                                {getIcon(noti.type)}
                            </div>

                            {/* Core Text Copy Content Data Strings */}
                            <div className="space-y-1.5 text-left grow pr-6">
                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-3 gap-0.5">
                                    <h4 className="text-sm font-bold text-white uppercase tracking-wide leading-none">{noti.title}</h4>
                                    <span className="text-[10px] text-slate-500 font-mono font-bold shrink-0">{noti.time}</span>
                                </div>
                                <p className="text-slate-400 text-xs leading-relaxed font-medium max-w-2xl">{noti.message}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
};

// Placeholder support for lucide icon dependency fail-safes
const Trophy = ({ size, className }) => (
    <Award size={size} className={className} />
);

export default Notifications;

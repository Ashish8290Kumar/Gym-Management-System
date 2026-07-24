import React from 'react';
import { Users, CreditCard, CalendarCheck, Flame, Dumbbell } from 'lucide-react';

const AdminDashboard = () => {
    const metrics = [
        { title: "Active Members", count: "1,248", change: "+12% this week", icon: Users, color: "text-emerald-400" },
        { title: "Monthly Revenue", count: "₹4,89,500", change: "+8% vs last month", icon: CreditCard, color: "text-[#FF451D]" },
        { title: "Today's Attendance", count: "342", change: "86% check-in rate", icon: CalendarCheck, color: "text-blue-400" },
        { title: "Energy Burned Today", count: "184k kCal", change: "System aggregate total", icon: Flame, color: "text-amber-400" }
    ];

    return (
        <div className="p-6 space-y-8 bg-[#0A0C10] min-h-screen text-slate-100 text-left pt-24 md:pt-6 w-full overflow-x-hidden">
            
            {/* Header Title Greeting Row */}
            <div className="border-b border-white/5 pb-4">
                <h2 className="text-2xl font-black uppercase tracking-wide text-white font-sans">Core Console Workspace</h2>
                <p className="text-xs text-slate-400 font-medium mt-1">Welcome back, Administrator. Live health tracking indicators and system matrices are running normally.</p>
            </div>

            {/* METRICS CARDS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {metrics.map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <div key={i} className="bg-[#12141C] border border-white/5 p-5 rounded-xl shadow-xl space-y-4 hover:border-white/10 transition-colors">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{card.title}</span>
                                <Icon size={18} className={card.color} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black tracking-tight text-white">{card.count}</h3>
                                <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">{card.change}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* PERFORMANCE ANALYSIS ROWS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* LIVE SYSTEM ENTRY TRACKING RECORDS */}
                <div className="lg:col-span-2 bg-[#12141C] border border-white/5 rounded-xl p-6 shadow-2xl space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Live Check-In Logs</h4>
                        <span className="text-[9px] uppercase tracking-widest text-[#FF451D] font-black bg-[#FF451D]/10 px-2 py-0.5 rounded">Realtime</span>
                    </div>
                    <div className="space-y-3">
                        {[
                            { name: "Ashish Kumar", time: "10:14 PM", plan: "GOLD TIER", status: "Active" },
                            { name: "Rohan Sharma", time: "09:45 PM", plan: "PLATINUM ALPHA", status: "Active" },
                            { name: "Priya Patel", time: "08:30 PM", plan: "SILVER TIER", status: "Completed" }
                        ].map((log, idx) => (
                            <div key={idx} className="bg-[#0A0C10] border border-white/5 p-3 rounded-lg flex items-center justify-between text-xs hover:border-white/10 transition-colors">
                                <div className="flex items-center space-x-3">
                                    <div className="w-1 h-7 bg-[#FF451D] rounded-full"></div>
                                    <div>
                                        <p className="font-bold text-slate-200">{log.name}</p>
                                        <span className="text-[10px] text-slate-500 font-bold tracking-wide uppercase">{log.plan}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-slate-300 font-mono">{log.time}</p>
                                    <span className={`text-[9px] uppercase tracking-wider font-bold block mt-0.5 ${log.status === 'Active' ? 'text-emerald-400' : 'text-slate-500'}`}>{log.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ACTION TRIGGER SYSTEM QUICKBOARD */}
                <div className="bg-[#12141C] border border-white/5 rounded-xl p-6 shadow-2xl space-y-4 flex flex-col justify-between">
                    <div className="space-y-4 w-full">
                        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider border-b border-white/5 pb-3">Facility Actions</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Use these core administrative triggers to update account parameters, insert active biometric entry records, or export database spreadsheet matrices.</p>
                    </div>
                    <div className="space-y-2.5 pt-4 w-full">
                        <button className="w-full py-3 bg-[#FF451D] text-white text-xs font-black uppercase tracking-widest rounded-lg hover:bg-[#e33914] transition-colors shadow-md shadow-[#FF451D]/10">
                            Add New Member
                        </button>
                        <button className="w-full py-3 bg-[#161922] border border-white/5 text-slate-300 text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-slate-900 transition-colors">
                            Generate Financial Report
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;

import React, { useState } from 'react';
import { Gift, Copy, Check, Users, IndianRupee, Share2, Award, AwardIcon } from 'lucide-react';

const Referral = () => {
    const [copied, setCopied] = useState(false);
    const referralCode = "VITALITY_ASHISH_500";

    // Summary rewards analytics dashboard matrix
    const milestones = [
        { title: "Total Referred", count: "6 Members", sub: "Joined via link", icon: Users, color: "text-blue-400" },
        { title: "Earned Wallet Cash", count: "₹3,000", sub: "Redeemable points", icon: IndianRupee, color: "text-emerald-400" },
        { title: "Active Bonus Level", count: "Silver Tier", sub: "+5% commission rate", icon: Award, color: "text-[#FF451D]" }
    ];

    const handleCopyCode = () => {
        navigator.clipboard.writeText(referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-6 space-y-8 bg-[#0A0C10] min-h-screen text-slate-100 text-left pt-24 md:pt-6 w-full overflow-x-hidden">
            
            {/* Header Title Greeting Row */}
            <div className="border-b border-white/5 pb-4">
                <h2 className="text-2xl font-black uppercase tracking-wide text-white font-sans">Referral Hub</h2>
                <p className="text-xs text-slate-400 font-medium mt-1">Invite friends to join Vitality Fitness and unlock cash bonuses, fee rewards, and premium gear milestone achievements.</p>
            </div>

            {/* DYNAMIC SHARING & CODE COPY COMPONENT BOX CONTAINER */}
            <div className="bg-linear-to-r from-[#FF451D]/10 to-transparent border border-[#FF451D]/20 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="space-y-2 max-w-xl">
                    <div className="flex items-center space-x-2 text-[#FF451D]">
                        <Gift size={18} />
                        <h4 className="text-xs font-black uppercase tracking-widest">Share the gains!</h4>
                    </div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wide">Get ₹500 for every friend who joins up</h3>
                    <p className="text-slate-400 text-xs leading-relaxed font-medium">Your colleague gets an instant ₹500 deduction on their signup package, and your system wallet balances will be credited with ₹500 right after their first transaction loop clears natively.</p>
                </div>

                {/* Direct Copy Tracking Button Fields Layout */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
                    <div className="bg-[#0A0C10] border border-white/5 px-5 py-3 rounded-lg font-mono font-bold text-slate-200 text-sm w-full sm:w-64 text-center tracking-wider select-all">
                        {referralCode}
                    </div>
                    <button 
                        onClick={handleCopyCode}
                        className={`w-full sm:w-auto px-5 py-3.5 text-xs font-black uppercase tracking-widest rounded-lg flex items-center justify-center space-x-2 transition-all ${
                            copied ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/10' : 'bg-[#FF451D] text-white hover:bg-[#e33914] shadow-lg shadow-[#FF451D]/10'
                        }`}
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copied ? 'Copied!' : 'Copy Invitation Code'}</span>
                    </button>
                </div>
            </div>

            {/* SUMMARY MILESTONES CASH CARDS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {milestones.map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <div key={i} className="bg-[#12141C] border border-white/5 p-5 rounded-xl shadow-xl space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{card.title}</span>
                                <Icon size={16} className={card.color} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black tracking-tight text-white">{card.count}</h3>
                                <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">{card.sub}</span>
                            </div>
                        </div>
                    );
                })}
            </div>


            {/* REFERRAL NETWORK TRACKING HISTORY LIST */}
            <div className="bg-[#12141C] border border-white/5 rounded-xl p-5 sm:p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Referral Networks Settlement Logs</h4>
                    <span className="text-[9px] uppercase tracking-widest text-[#FF451D] font-black bg-[#FF451D]/10 px-2 py-0.5 rounded border border-[#FF451D]/20">Active</span>
                </div>

                {/* SCROLLABLE DATA SHEET */}
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse min-w-137.5">
                        <thead>
                            <tr className="border-b border-white/5 text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-[#0A0C10]/40">
                                <th className="p-3.5">Referred User Handle</th>
                                <th className="p-3.5">Date Authenticated</th>
                                <th className="p-3.5">Acquired Package Tier</th>
                                <th className="p-3.5">Wallet Bonus Reward</th>
                                <th className="p-3.5">Settlement Check</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs divide-y divide-white/5 font-medium">
                            {[
                                { handle: "@rohan_fit7", date: "2026-07-20", plan: "GOLD TIER (3 Months)", cash: "+₹500", status: "Credited" },
                                { handle: "@amit_power", date: "2026-07-11", plan: "SILVER TIER (1 Month)", cash: "+₹500", status: "Credited" },
                                { handle: "@vikas_beast", date: "2026-06-28", plan: "PLATINUM ALPHA (12 Months)", cash: "+₹500", status: "Credited" },
                                { handle: "@sonia_lifestyle", date: "2026-05-14", plan: "GOLD TIER (3 Months)", cash: "+₹500", status: "Credited" }
                            ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-[#0A0C10]/20 transition-colors">
                                    <td className="p-3.5 font-bold text-slate-200">{row.handle}</td>
                                    <td className="p-3.5 font-mono text-slate-400">{row.date}</td>
                                    <td className="p-3.5 text-slate-300 font-bold uppercase text-[11px]">{row.plan}</td>
                                    <td className="p-3.5 text-emerald-400 font-black font-mono">{row.cash}</td>
                                    <td className="p-3.5">
                                        <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default Referral;

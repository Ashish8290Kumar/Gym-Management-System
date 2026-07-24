import React, { useState } from 'react';
import { Ticket, Copy, Check, Percent, Calendar, AlertCircle, ShoppingBag } from 'lucide-react';

const Coupon = () => {
    const [copiedId, setCopiedId] = useState(null);

    // Active facility coupon promotional datasets
    const coupons = [
        { id: "FITURBAN30", discount: "30% OFF", type: "Zumba & Yoga", desc: "Valid on all specialized group masterclasses bundles.", expiry: "2026-08-31", active: true },
        { id: "MONSOON500", discount: "₹500 OFF", type: "Membership Upgrade", desc: "Applicable when moving from Silver Tier to Gold/Platinum tiers.", expiry: "2026-08-15", active: true },
        { id: "ALPHAEXT10", discount: "10% OFF", type: "Personal Training", desc: "Valid on purchasing 12+ private coach sessions.", expiry: "2026-09-30", active: true }
    ];

    const handleCopyCode = (code, id) => {
        navigator.clipboard.writeText(code);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="p-6 space-y-8 bg-[#0A0C10] min-h-screen text-slate-100 text-left pt-24 md:pt-6 w-full overflow-x-hidden">
            
            {/* Header Title Greeting Row */}
            <div className="border-b border-white/5 pb-4">
                <h2 className="text-2xl font-black uppercase tracking-wide text-white font-sans">Offers & Coupons</h2>
                <p className="text-xs text-slate-400 font-medium mt-1">Claim active promotional tokens, copy markdown values, and review transaction invoice deduction rates.</p>
            </div>

            {/* INTRODUCTORY BRAND TEXT */}
            <div className="text-left space-y-1">
                <h4 className="text-xs font-black uppercase tracking-widest text-[#FF451D]">Available Vouchers</h4>
                <h3 className="text-xl font-bold text-white uppercase tracking-wide">Claim Your Promotional Discount</h3>
            </div>

            {/* DYNAMIC ACTIVE COUPON GRID CLUSTERS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {coupons.map((cpn) => (
                    <div 
                        key={cpn.id} 
                        className="bg-[#12141C] border border-white/5 rounded-xl p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#FF451D]/20 transition-all duration-300"
                    >
                        {/* Decorative Left and Right Cutout Holes mimicking a physical ticket */}
                        <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-[#0A0C10] -translate-y-1/2 border-r border-white/5"></div>
                        <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-[#0A0C10] -translate-y-1/2 border-l border-white/5"></div>

                        <div className="space-y-4 px-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-black text-[#FF451D] tracking-tight">{cpn.discount}</span>
                                <span className="px-2 py-0.5 text-[9px] font-bold tracking-wider bg-white/5 text-slate-300 rounded uppercase">
                                    {cpn.type}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wide">{cpn.id}</h5>
                                <p className="text-slate-400 text-[11px] leading-relaxed font-medium">{cpn.desc}</p>
                            </div>
                        </div>

                        {/* Interactive Copy Controls Block */}
                        <div className="pt-6 px-2 flex items-center justify-between border-t border-white/5 mt-4 text-[11px]">
                            <div className="flex items-center space-x-1.5 text-slate-500 font-medium">
                                <Calendar size={12} className="text-slate-600" />
                                <span>Expires: <strong className="text-slate-400 font-mono">{cpn.expiry}</strong></span>
                            </div>
                            <button
                                onClick={() => handleCopyCode(cpn.id, cpn.id)}
                                className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg flex items-center space-x-1 transition-all ${
                                    copiedId === cpn.id 
                                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/10' 
                                        : 'bg-[#FF451D] text-white hover:bg-[#e33914] shadow-md shadow-[#FF451D]/10'
                                    }`}
                            >
                                {copiedId === cpn.id ? <Check size={11} /> : <Copy size={11} />}
                                <span>{copiedId === cpn.id ? 'Copied' : 'Copy'}</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>


            {/* PAST USED VOUCHERS LEDGER MATRIX */}
            <div className="bg-[#12141C] border border-white/5 rounded-xl p-5 sm:p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Coupon Settlement Statements History</h4>
                    <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold bg-white/5 px-2 py-0.5 rounded">Archive</span>
                </div>

                {/* SCROLLABLE TABLE ENGINE WINDOW */}
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse min-w-125">
                        <thead>
                            <tr className="border-b border-white/5 text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-[#0A0C10]/40">
                                <th className="p-3.5">Promo Code</th>
                                <th className="p-3.5">Discount Yield</th>
                                <th className="p-3.5">Settlement Transaction</th>
                                <th className="p-3.5">Redeemed Date</th>
                                <th className="p-3.5">Status Audit</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs divide-y divide-white/5 font-medium">
                            {[
                                { code: "WELCOME10", yield: "10% OFF", txn: "TXN-894211", date: "2026-01-15", status: "Redeemed" },
                                { code: "LAUNCH500", yield: "₹500 OFF", txn: "TXN-764309", date: "2025-12-15", status: "Redeemed" },
                                { code: "NEWYEAR20", yield: "20% OFF", txn: "TXN-654129", date: "2025-12-01", status: "Expired" }
                            ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-[#0A0C10]/20 transition-colors">
                                    <td className="p-3.5 font-mono font-bold text-slate-300">{row.code}</td>
                                    <td className="p-3.5 text-emerald-400 font-bold">{row.yield}</td>
                                    <td className="p-3.5 font-mono text-slate-400">{row.txn}</td>
                                    <td className="p-3.5 text-slate-400 font-mono">{row.date}</td>
                                    <td className="p-3.5">
                                        <span className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded border ${
                                            row.status === 'Redeemed' 
                                                ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400' 
                                                : 'bg-white/5 border-white/5 text-slate-500'
                                        }`}>
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

export default Coupon;

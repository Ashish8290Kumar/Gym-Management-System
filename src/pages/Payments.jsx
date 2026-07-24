import React from 'react';
import { CreditCard, DollarSign, ArrowUpRight, ArrowDownRight, CheckCircle, Clock, AlertTriangle, FileText } from 'lucide-react';

const Payments = () => {
    // Analytics summaries for facility transaction ledgers
    const summaryMetrics = [
        { title: "Total Paid", amount: "₹14,497", status: "All-time cleared", icon: CheckCircle, color: "text-emerald-400" },
        { title: "Pending Invoices", amount: "₹0.00", status: "No dues pending", icon: Clock, color: "text-amber-400" },
        { title: "Current Plan", amount: "₹3,499", status: "Gold Plan Tier", icon: CreditCard, color: "text-[#FF451D]" }
    ];

    // Transaction histories array matrix tracking your database parameters
    const transactions = [
        { id: "TXN-984321", date: "2026-07-15", plan: "Gold Plan - 3 Months Access", amount: "₹3,499", method: "UPI (GPay)", status: "Success" },
        { id: "TXN-953104", date: "2026-04-15", plan: "Gold Plan - 3 Months Access", amount: "₹3,499", method: "UPI (PhonePe)", status: "Success" },
        { id: "TXN-894211", date: "2026-01-15", plan: "Silver Plan - 1 Month Access", amount: "₹1,499", method: "Razorpay Card", status: "Success" },
        { id: "TXN-764309", date: "2025-12-15", plan: "Ultimate Alpha Renewal", amount: "₹5,999", method: "Net Banking", status: "Success" }
    ];

    return (
        <div className="p-6 space-y-8 bg-[#0A0C10] min-h-screen text-slate-100 text-left pt-24 md:pt-6 w-full overflow-x-hidden">
            
            {/* Header Title Greeting Row */}
            <div className="border-b border-white/5 pb-4">
                <h2 className="text-2xl font-black uppercase tracking-wide text-white font-sans">Payments Ledger</h2>
                <p className="text-xs text-slate-400 font-medium mt-1">Review your active payment history tracks, cleared invoice totals, tax records, and membership tier receipts.</p>
            </div>

            {/* QUICK STATS FINANCIAL TRACKING CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {summaryMetrics.map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <div key={i} className="bg-[#12141C] border border-white/5 p-5 rounded-xl shadow-xl space-y-3 hover:border-white/10 transition-colors">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{card.title}</span>
                                <Icon size={16} className={card.color} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black tracking-tight text-white">{card.amount}</h3>
                                <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">{card.status}</span>
                            </div>
                        </div>
                    );
                })}
            </div>


            {/* TRANSACTION HISTORY GRID TABLE DATA SHEET */}
            <div className="bg-[#12141C] border border-white/5 rounded-xl p-5 sm:p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Transaction Statements History</h4>
                    <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-black bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Secure</span>
                </div>

                {/* SCROLLABLE RESPONSIVE MATRIX OVERLAY BOX */}
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse min-w-150">
                        <thead>
                            <tr className="border-b border-white/5 text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-[#0A0C10]/40">
                                <th className="p-3.5">Transaction ID</th>
                                <th className="p-3.5">Settlement Date</th>
                                <th className="p-3.5">Membership Plan Description</th>
                                <th className="p-3.5">Amount Paid</th>
                                <th className="p-3.5">Gateway Method</th>
                                <th className="p-3.5">Status Check</th>
                                <th className="p-3.5 text-center">Receipt</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs divide-y divide-white/5 font-medium">
                            {transactions.map((txn, idx) => (
                                <tr key={idx} className="hover:bg-[#0A0C10]/30 transition-colors">
                                    <td className="p-3.5 text-slate-400 font-mono font-bold">{txn.id}</td>
                                    <td className="p-3.5 text-slate-300 font-mono">{txn.date}</td>
                                    <td className="p-3.5 text-slate-200 font-bold">{txn.plan}</td>
                                    <td className="p-3.5 text-white font-bold">{txn.amount}</td>
                                    <td className="p-3.5 text-slate-400">{txn.method}</td>
                                    <td className="p-3.5">
                                        <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">
                                            {txn.status}
                                        </span>
                                    </td>
                                    <td className="p-3.5 text-center">
                                        <button className="text-slate-500 hover:text-[#FF451D] p-1 transition-colors rounded hover:bg-white/5 inline-flex items-center justify-center">
                                            <FileText size={14} />
                                        </button>
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

export default Payments;

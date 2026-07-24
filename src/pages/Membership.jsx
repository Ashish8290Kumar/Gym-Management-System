import React, { useState } from 'react';
import API from '../services/api';
import { ShieldCheck, Check, AlertCircle, Sparkles } from 'lucide-react';

const Membership = () => {
    const [msg, setMsg] = useState({ text: '', type: '' });
    const [loading, setLoading] = useState(false);

    const packages = [
        { name: "Silver Tier", cost: "1499", duration: "1 Month Access", perks: ["Full Gym Floor Entry", "Standard Locker Room Lockers", "1x General Fitness Evaluation"] },
        { name: "Gold Tier", cost: "3499", duration: "3 Months Access", perks: ["All Silver Tier Entry Perks", "Sauna & Steam Bath Utilities", "Group Yoga & Zumba Classes Access", "2x Personal Training Consults"] },
        { name: "Platinum Alpha", cost: "9999", duration: "12 Months Access", perks: ["Unrestricted 24/7 Access Profiles", "Private VIP Locker Access", "Unlimited Group Fitness Masterclasses", "Dedicated Personal Trainer Allocation", "Custom Specialized Diet Layout Formulations"] }
    ];

    const handlePurchase = async (tierName) => {
        setMsg({ text: '', type: '' });
        setLoading(true);

        try {
            await API.post(`/member/membership/buy?userId=1&plan=${encodeOverride(tierName)}`);
            setMsg({ text: `Procurement registration successful for ${tierName}! Route to payments package checkout next.`, type: 'success' });
        } catch (err) {
            setMsg({ text: 'Procurement transaction allocation error exception.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const encodeOverride = (str) => str.replace(/\s+/g, '');

    return (
        <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-6xl mx-auto">
            <div className="border-b border-gymBorder pb-4 text-center sm:text-left">
                <h2 className="text-xl font-bold text-white tracking-wide uppercase">Membership Tier Registry</h2>
                <p className="text-slate-400 text-xs sm:text-sm font-medium mt-1">Select and procure tier structures to unlock high-performance gym system utilities.</p>
            </div>

            {msg.text && (
                <div className={`p-4 rounded-xl text-xs font-bold uppercase tracking-wide flex items-center space-x-2.5 max-w-xl mx-auto ${
                    msg.type === 'success' ? 'bg-emerald-500/5 border border-emerald-500/10 text-emerald-400' : 'bg-gymCrimson/5 border border-gymCrimson/10 text-gymCrimson'
                }`}>
                    {msg.type === 'success' ? <Sparkles size={14} /> : <AlertCircle size={14} />}
                    <span>{msg.text}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
                {packages.map((pkg, idx) => (
                    <div key={idx} className="bg-gymPanel border border-gymBorder hover:border-gymCrimson/30 rounded-2xl p-5 flex flex-col justify-between transition-all shadow-xl relative overflow-hidden group">
                        <div className="space-y-4">
                            <div className="border-b border-gymDarkest pb-3">
                                <h3 className="text-sm font-bold text-white tracking-wider uppercase group-hover:text-gymCrimson transition-colors">{pkg.name}</h3>
                                <p className="text-[10px] text-slate-500 font-semibold uppercase mt-0.5">{pkg.duration}</p>
                            </div>
                            <div className="py-1">
                                <span className="text-2xl font-bold text-white tracking-tight">₹{pkg.cost}</span>
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider ml-1">/ Plan Rate</span>
                            </div>
                            <ul className="space-y-2 pt-2">
                                {pkg.perks.map((perk, pIdx) => (
                                    <li key={pIdx} className="flex items-start space-x-2 text-[11px] text-slate-400 font-medium leading-tight">
                                        <Check size={12} className="text-gymCrimson mt-0.5 shrink-0" />
                                        <span>{perk}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button onClick={() => handlePurchase(pkg.name)} disabled={loading} className="w-full py-2.5 mt-6 bg-gymCrimson hover:bg-gymCrimsonHover disabled:opacity-40 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl shadow-crimsonGlow transition-colors">
                            Procure Plan Strategy
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Membership;

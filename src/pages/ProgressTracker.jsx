import React, { useState } from 'react';
import API from '../services/api';
import { TrendingUp, Scale, Percent, ShieldCheck, CheckCircle } from 'lucide-react';

const ProgressTracker = () => {
    const [metrics, setMetrics] = useState({ weight: '', height: '', fat: '' });
    const [savedData, setSavedData] = useState(null);
    const [msg, setMsg] = useState('');

    const handleSaveProgress = async (e) => {
        e.preventDefault();
        setMsg('');

        try {
            const response = await API.post('/track/progress/save?userId=1', {
                weightKg: parseFloat(metrics.weight),
                heightCm: parseFloat(metrics.height),
                bodyFatPercentage: parseFloat(metrics.fat)
            });
            setSavedData(response.data);
            setMsg('Biometric metrics cataloged successfully into database arrays!');
            setMetrics({ weight: '', height: '', fat: '' });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-3xl mx-auto flex flex-col justify-center">
            <div className="border-b border-gymBorder pb-4">
                <h2 className="text-xl font-bold text-white tracking-wide uppercase">Progress Tracker</h2>
                <p className="text-slate-400 text-xs sm:text-sm font-medium mt-1">Audit body composition variations and benchmark physiological trends.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full">
                <div className="bg-gymPanel border border-gymBorder p-5 rounded-xl shadow-xl h-fit">
                    <div className="flex items-center space-x-2 mb-4 text-slate-200 font-bold text-sm">
                        <TrendingUp size={15} className="text-gymCrimson" />
                        <span>Log Biometrics</span>
                    </div>
                    
                    <form onSubmit={handleSaveProgress} className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Weight Mass (kg)</label>
                            <input type="number" step="0.1" required value={metrics.weight} onChange={(e) => setMetrics({...metrics, weight: e.target.value})} placeholder="e.g. 75" className="w-full bg-gymDarkest border border-gymBorder text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gymCrimson font-medium" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Stature Height (cm)</label>
                            <input type="number" step="0.5" required value={metrics.height} onChange={(e) => setMetrics({...metrics, height: e.target.value})} placeholder="e.g. 180" className="w-full bg-gymDarkest border border-gymBorder text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gymCrimson font-medium" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Body Fat (%)</label>
                            <input type="number" step="0.1" required value={metrics.fat} onChange={(e) => setMetrics({...metrics, fat: e.target.value})} placeholder="e.g. 14" className="w-full bg-gymDarkest border border-gymBorder text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gymCrimson font-medium" />
                        </div>
                        <button type="submit" className="w-full py-3 bg-gymCrimson hover:bg-gymCrimsonHover text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-crimsonGlow">Commit Logs</button>
                    </form>
                </div>


                <div className="bg-gymPanel border border-gymBorder p-5 sm:p-6 rounded-xl shadow-xl md:col-span-2 flex flex-col justify-between min-h-75">
                    {savedData ? (
                        <div className="space-y-4 flex flex-col justify-center items-center text-center my-auto py-2">
                            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20"><CheckCircle size={24} /></div>
                            <p className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider max-w-xs">{msg}</p>
                            
                            <div className="grid grid-cols-3 gap-3 w-full bg-gymDarkest/40 p-3 border border-gymBorder rounded-xl text-center text-xs">
                                <div className="p-2"><span className="block text-[10px] text-slate-500 font-bold uppercase">Weight</span><strong className="text-white text-sm font-bold">{savedData.weightKg || '75'} kg</strong></div>
                                <div className="p-2 border-x border-gymBorder"><span className="block text-[10px] text-slate-500 font-bold uppercase">Body Fat</span><strong className="text-gymCrimson text-sm font-bold">{savedData.bodyFatPercentage || '14'}%</strong></div>
                                <div className="p-2"><span className="block text-[10px] text-slate-500 font-bold uppercase">Calc BMI</span><strong className="text-white text-sm font-bold">{savedData.bmi || '23.1'}</strong></div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-slate-500 text-xs font-medium my-auto max-w-sm mx-auto flex flex-col items-center space-y-2">
                            <Scale size={24} className="text-slate-700" />
                            <p className="leading-relaxed">Provide your latest physical measurements inside the entry panel variables slot to generate chronological scaling logs charts profiles.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProgressTracker;

import React, { useState } from 'react';
import API from '../services/api';
import { Flame, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';

const CaloriesTracker = () => {
    const [burned, setBurned] = useState('');
    const [status, setStatus] = useState('');
    const [payload, setPayload] = useState(null);
    const targetBurn = 600;

    const handleCalorieSync = async (e) => {
        e.preventDefault();
        setStatus('Processing...');
        setPayload(null);

        const calCount = parseInt(burned);
        if (!calCount || calCount <= 0) return;

        try {
            await API.post('/track/metrics/sync?userId=1', {
                waterMlConsumed: 0,
                stepsWalked: 0,
                caloriesBurned: calCount
            });
            setPayload({ energy: calCount });
            setStatus('Metabolic thermal energy sync pipeline complete.');
            setBurned('');
        } catch (err) {
            setStatus('Database sync timeout fault.');
        }
    };

    return (
        <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-3xl mx-auto flex flex-col justify-center">
            <div className="border-b border-gymBorder pb-4">
                <h2 className="text-xl font-bold text-white tracking-wide uppercase">Calories Burned Engine</h2>
                <p className="text-slate-400 text-xs sm:text-sm font-medium mt-1">Track active MET metabolic energy dissipation indices.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full">
                <div className="bg-gymPanel border border-gymBorder p-5 rounded-xl shadow-xl h-fit">
                    <div className="flex items-center space-x-2 mb-4 text-slate-200 font-bold text-sm">
                        <Flame size={15} className="text-gymCrimson" />
                        <span>Log Active Workouts</span>
                    </div>
                    
                    <form onSubmit={handleCalorieSync} className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Active Energy Spent (kCal)</label>
                            <input type="number" required min="1" value={burned} onChange={(e) => setBurned(e.target.value)} placeholder="e.g. 450" className="w-full bg-gymDarkest border border-gymBorder text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gymCrimson font-medium" />
                        </div>
                        <button type="submit" className="w-full py-3 bg-gymCrimson hover:bg-gymCrimsonHover text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-crimsonGlow flex items-center justify-center space-x-1.5">
                            <RefreshCw size={12} />
                            <span>Sync Thermal Matrix</span>
                        </button>
                    </form>
                </div>


                <div className="bg-gymPanel border border-gymBorder p-5 sm:p-6 rounded-xl shadow-xl md:col-span-2 flex flex-col justify-between min-h-65">
                    {payload ? (
                        <div className="space-y-4 flex flex-col justify-center items-center text-center my-auto py-2">
                            <div className="p-3 bg-gymCrimson/10 text-gymCrimson rounded-full border border-gymCrimson/25 shadow-crimsonGlow"><Sparkles size={24} /></div>
                            <div>
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">Active Energy Matrix Registered</span>
                                <h3 className="text-3xl font-bold text-slate-200 mt-1">{payload.energy} / {targetBurn} <span className="text-xs text-slate-500 font-medium">kCal</span></h3>
                            </div>
                            {status && (
                                <p className="text-[10px] font-bold uppercase text-emerald-400 bg-emerald-500/5 px-2.5 py-1 border border-emerald-500/10 rounded-lg flex items-center">
                                    <CheckCircle2 size={10} className="mr-1" /> {status}
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="text-center text-slate-500 text-xs font-medium my-auto max-w-sm mx-auto flex flex-col items-center space-y-2">
                            <Flame size={24} className="text-slate-700" />
                            <p className="leading-relaxed">Log target exertion parameters following functional athletic loops to compile total calorie processing histories.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CaloriesTracker;

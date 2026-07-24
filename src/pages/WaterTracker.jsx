import React, { useState } from 'react';
import API from '../services/api';
import { Droplet, Plus, RefreshCw, CheckCircle2 } from 'lucide-react';

const WaterTracker = () => {
    const [mlConsumed, setMlConsumed] = useState(0);
    const [status, setStatus] = useState('');
    const targetMl = 3500; // Standard 3.5L corporate fluid baseline target

    const addWater = (amount) => {
        setMlConsumed(prev => Math.min(prev + amount, 10000));
        setStatus('');
    };

    const handleSync = async () => {
        setStatus('Syncing...');
        try {
            await API.post('/track/metrics/sync?userId=1', {
                waterMlConsumed: mlConsumed,
                stepsWalked: 0,
                caloriesBurned: 0
            });
            setStatus('Hydration database synchronized successfully.');
        } catch (err) {
            setStatus('Synchronization execution loop exception.');
        }
    };

    const pct = Math.min((mlConsumed / targetMl) * 100, 100).toFixed(0);

    return (
        <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-3xl mx-auto flex flex-col justify-center">
            <div className="border-b border-gymBorder pb-4">
                <h2 className="text-xl font-bold text-white tracking-wide uppercase">Water Tracker</h2>
                <p className="text-slate-400 text-xs sm:text-sm font-medium mt-1">Monitor dynamic fluid hydration metrics and log daily consumption volumes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full">
                <div className="bg-gymPanel border border-gymBorder p-5 rounded-xl shadow-xl h-fit space-y-4">
                    <div className="flex items-center space-x-2 text-slate-200 font-bold text-sm">
                        <Droplet size={15} className="text-sky-400" />
                        <span>Log Hydration Increment</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => addWater(250)} className="py-2.5 bg-gymDarkest hover:bg-sky-500/10 border border-gymBorder text-slate-200 text-xs font-bold rounded-lg transition-colors">+250 ml</button>
                        <button onClick={() => addWater(500)} className="py-2.5 bg-gymDarkest hover:bg-sky-500/10 border border-gymBorder text-slate-200 text-xs font-bold rounded-lg transition-colors">+500 ml</button>
                        <button onClick={() => addWater(750)} className="py-2.5 bg-gymDarkest hover:bg-sky-500/10 border border-gymBorder text-slate-200 text-xs font-bold rounded-lg transition-colors">+750 ml</button>
                        <button onClick={() => setMlConsumed(0)} className="py-2.5 bg-rose-950/20 hover:bg-rose-900/30 border border-rose-500/10 text-rose-400 text-xs font-bold rounded-lg transition-colors">Reset</button>
                    </div>

                    <button onClick={handleSync} className="w-full py-3 bg-gymCrimson hover:bg-gymCrimsonHover text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-crimsonGlow flex items-center justify-center space-x-1.5">
                        <RefreshCw size={12} />
                        <span>Sync Tracking Array</span>
                    </button>
                </div>



                <div className="bg-gymPanel border border-gymBorder p-5 sm:p-6 rounded-xl shadow-xl md:col-span-2 flex flex-col justify-between min-h-65">
                    <div className="space-y-4 flex flex-col justify-center items-center text-center my-auto py-2">
                        <div className="relative flex items-center justify-center">
                            <div className="w-24 h-24 rounded-full border-4 border-gymBorder flex flex-col items-center justify-center relative overflow-hidden bg-gymDarkest">
                                <div className="absolute bottom-0 left-0 right-0 bg-sky-500/20 transition-all duration-300" style={{ height: `${pct}%` }}></div>
                                <span className="text-2xl font-bold text-white relative z-10">{pct}%</span>
                            </div>
                        </div>
                        <div>
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">Total Liquid Consumed</span>
                            <h3 className="text-3xl font-bold text-slate-200 mt-1">{mlConsumed} / {targetMl} <span className="text-xs text-slate-500 font-medium">ml</span></h3>
                        </div>
                        {status && (
                            <p className="text-[10px] font-bold uppercase text-emerald-400 bg-emerald-500/5 px-3 py-1.5 border border-emerald-500/10 rounded-lg flex items-center">
                                <CheckCircle2 size={12} className="mr-1.5" /> {status}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WaterTracker;

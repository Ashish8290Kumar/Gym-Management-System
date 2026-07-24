import React, { useState } from 'react';
import API from '../services/api';
import { Footprints, RefreshCw, Flame, CheckCircle2 } from 'lucide-react';

const StepCounter = () => {
    const [steps, setSteps] = useState('');
    const [status, setStatus] = useState('');
    const [syncData, setSyncData] = useState(null);
    const targetSteps = 10000;

    const handleStepSync = async (e) => {
        e.preventDefault();
        setStatus('Processing...');
        setSyncData(null);

        const stepCount = parseInt(steps);
        if (!stepCount || stepCount <= 0) return;

        // Met metabolic calculation approximation loop context
        const caloriesBurnedEst = Math.round(stepCount * 0.04);

        try {
            await API.post('/track/metrics/sync?userId=1', {
                waterMlConsumed: 0,
                stepsWalked: stepCount,
                caloriesBurned: caloriesBurnedEst
            });
            setSyncData({ loggedSteps: stepCount, burned: caloriesBurnedEst });
            setStatus('Step synchronization engine processing complete.');
            setSteps('');
        } catch (err) {
            setStatus('Database sync lookup array timeout failure.');
        }
    };

    return (
        <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-3xl mx-auto flex flex-col justify-center">
            <div className="border-b border-gymBorder pb-4">
                <h2 className="text-xl font-bold text-white tracking-wide uppercase">Step Counter Matrix</h2>
                <p className="text-slate-400 text-xs sm:text-sm font-medium mt-1">Audit pedometer data variables and map daily locomotive targets.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full">
                <div className="bg-gymPanel border border-gymBorder p-5 rounded-xl shadow-xl h-fit">
                    <div className="flex items-center space-x-2 mb-4 text-slate-200 font-bold text-sm">
                        <Footprints size={15} className="text-emerald-400" />
                        <span>Input Pedometer Logs</span>
                    </div>
                    
                    <form onSubmit={handleStepSync} className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Total Strides Walked</label>
                            <input type="number" required min="1" value={steps} onChange={(e) => setSteps(e.target.value)} placeholder="e.g. 8500" className="w-full bg-gymDarkest border border-gymBorder text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gymCrimson font-medium" />
                        </div>
                        <button type="submit" className="w-full py-3 bg-gymCrimson hover:bg-gymCrimsonHover text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-crimsonGlow flex items-center justify-center space-x-1.5">
                            <RefreshCw size={12} />
                            <span>Commit Stride Array</span>
                        </button>
                    </form>
                </div>


                <div className="bg-gymPanel border border-gymBorder p-5 sm:p-6 rounded-xl shadow-xl md:col-span-2 flex flex-col justify-between min-h-65">
                    {syncData ? (
                        <div className="space-y-4 flex flex-col justify-center items-center text-center my-auto py-2">
                            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20"><CheckCircle2 size={24} /></div>
                            <div>
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">Total Sync Footprints Logged</span>
                                <h3 className="text-3xl font-bold text-slate-200 mt-1">{syncData.loggedSteps} / {targetSteps} <span className="text-xs text-slate-500 font-medium">Strides</span></h3>
                            </div>
                            <div className="p-2.5 bg-gymDarkest/80 border border-gymBorder rounded-xl flex items-center space-x-2 text-xs font-semibold text-amber-400">
                                <Flame size={14} />
                                <span>Estimated Metabolic Energy Dissipation: {syncData.burned} kCal</span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-slate-500 text-xs font-medium my-auto max-w-sm mx-auto flex flex-col items-center space-y-2">
                            <Footprints size={24} className="text-slate-700" />
                            <p className="leading-relaxed">Connect wearable hardware streams or manually dump pedometer logging packages into the compiler interface to store variables.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StepCounter;

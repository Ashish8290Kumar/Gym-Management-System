import React from 'react';
import { Trophy, Zap, Shield, Target, Flame } from 'lucide-react';

const Achievements = () => {
    // Array matrix configuring gamified rewards states
    const badges = [
        { title: "First Blood Check-In", desc: "Completed initial entry sequence registration log.", icon: Zap, unlocked: true },
        { title: "Iron Core Devotion", desc: "Logged 10 consistent daily attendance presence files.", icon: Shield, unlocked: true },
        { title: "Macro Overlord", desc: "Successfully computed optimal BMI body metrics tracking scales.", icon: Target, unlocked: true },
        { title: "Caloric Incinerator", desc: "Burned over 5,000 tracked MET metabolic calories.", icon: Flame, unlocked: false },
        { title: "Elite Alpha Status", desc: "Unlock Premium or Admin tier clearance permissions variables.", icon: Trophy, unlocked: false },
    ];

    return (
        <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-4xl mx-auto">
            <div className="border-b border-gymBorder pb-4">
                <h2 className="text-xl font-bold text-white tracking-wide uppercase">Achievements & Milestones</h2>
                <p className="text-slate-400 text-xs sm:text-sm font-medium mt-1">Unlock platform tier badges, gamified performance rewards, and training consistency records.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {badges.map((b, idx) => {
                    const Icon = b.icon;
                    return (
                        <div key={idx} className={`border rounded-xl p-4 flex flex-col justify-between transition-all duration-150 relative overflow-hidden group shadow-md ${
                            b.unlocked 
                            ? 'bg-gymPanel border-gymCrimson/20 hover:border-gymCrimson/40 shadow-crimsonGlow/5' 
                            : 'bg-gymPanel/40 border-gymBorder opacity-40 select-none'
                        }`}>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className={`p-2.5 rounded-lg border shadow-inner ${b.unlocked ? 'bg-gymDarkest text-gymCrimson border-gymBorder' : 'bg-gymDarkest text-slate-700 border-gymBorder'}`}>
                                        <Icon size={16} />
                                    </div>
                                    <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${b.unlocked ? 'bg-gymCrimson/10 text-gymCrimson' : 'bg-slate-800 text-slate-500'}`}>
                                        {b.unlocked ? 'Unlocked' : 'Locked'}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-slate-200 group-hover:text-gymCrimson transition-colors">{b.title}</h4>
                                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">{b.desc}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Achievements;

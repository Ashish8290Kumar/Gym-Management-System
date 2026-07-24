import React, { useState } from 'react';
import { Calculator, Info, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';

const BmiCalculator = () => {
    const [stats, setStats] = useState({ weight: '', height: '' });
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const calculateBmi = (e) => {
        e.preventDefault();
        setError('');
        setResult(null);

        const w = parseFloat(stats.weight);
        const h = parseFloat(stats.height) / 100.0; // Converted to meters

        if (!w || !h || w <= 0 || h <= 0) {
            setError("Please enter valid positive numbers for accurate metrics.");
            return;
        }

        const bmiValue = w / (h * h);
        let category = 'Normal Weight';
        let color = 'text-emerald-400 bg-emerald-500/5 border-emerald-500/10';
        let advice = '';
        let targetText = '';

        // Calculate absolute healthy weight limits for this height
        const minHealthyWeight = 18.5 * (h * h);
        const maxHealthyWeight = 24.9 * (h * h);

        if (bmiValue < 18.5) { 
            color = 'text-sky-400 bg-sky-500/5 border-sky-500/10'; 
            category = 'Underweight';
            const shortBy = (minHealthyWeight - w).toFixed(1);
            advice = `You are under your healthy target. You need to gain roughly ${shortBy} kg to reach normal weight bounds.`;
            targetText = `Target Weight Range: ${minHealthyWeight.toFixed(1)} kg - ${maxHealthyWeight.toFixed(1)} kg`;
        } else if (bmiValue >= 18.5 && bmiValue < 25) {
            color = 'text-emerald-400 bg-emerald-500/5 border-emerald-500/10';
            category = 'Normal Weight';
            advice = "Perfect calibration! Your weight is fully optimal for your current height matrix.";
            targetText = `Maintained Range: ${minHealthyWeight.toFixed(1)} kg - ${maxHealthyWeight.toFixed(1)} kg`;
        } else if (bmiValue >= 25 && bmiValue < 29.9) { 
            color = 'text-amber-400 bg-amber-500/5 border-amber-500/10'; 
            category = 'Overweight'; 
            const excess = (w - maxHealthyWeight).toFixed(1);
            advice = `You are carrying roughly ${excess} kg of excess mass. Reduce weight to drop below the 24.9 BMI threshold.`;
            targetText = `Healthy Target Range: ${minHealthyWeight.toFixed(1)} kg - ${maxHealthyWeight.toFixed(1)} kg`;
        } else if (bmiValue >= 29.9) { 
            color = 'text-gymCrimson bg-gymCrimson/5 border-gymCrimson/10'; 
            category = 'Obese'; 
            const excess = (w - maxHealthyWeight).toFixed(1);
            advice = `Critical threshold breach: You are carrying ${excess} kg of excess mass. Active caloric deficits required.`;
            targetText = `Healthy Target Range: ${minHealthyWeight.toFixed(1)} kg - ${maxHealthyWeight.toFixed(1)} kg`;
        }

        setResult({ score: bmiValue.toFixed(1), text: category, style: color, advice: advice, target: targetText });
    };

    return (
        <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-3xl mx-auto flex flex-col justify-center">
            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between border-b border-gymBorder pb-4 gap-2 text-center sm:text-left">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-wide uppercase">BMI Diagnostic Board</h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-medium mt-1">Compute body mass index and trace automated calibration bounds.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full">
                {/* Input Panel Card */}
                <div className="bg-gymPanel border border-gymBorder p-5 rounded-xl shadow-xl h-fit">
                    <div className="flex items-center space-x-2.5 mb-4 text-slate-200 font-bold text-sm">
                        <Calculator size={15} className="text-gymCrimson" />
                        <span>Input Variables</span>
                    </div>
                    {error && <p className="text-gymCrimson text-xs font-semibold mb-4 bg-gymCrimson/5 p-3 border border-gymCrimson/10 rounded-xl">{error}</p>}
                    
                    <form onSubmit={calculateBmi} className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Weight (kg)</label>
                            <input type="number" step="0.1" required value={stats.weight} onChange={(e) => setStats({...stats, weight: e.target.value})} placeholder="e.g. 73" className="w-full bg-gymDarkest border border-gymBorder text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gymCrimson font-medium" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Height (cm)</label>
                            <input type="number" step="0.5" required value={stats.height} onChange={(e) => setStats({...stats, height: e.target.value})} placeholder="e.g. 168" className="w-full bg-gymDarkest border border-gymBorder text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gymCrimson font-medium" />
                        </div>
                        <button type="submit" className="w-full py-3 bg-gymCrimson hover:bg-gymCrimsonHover text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-crimsonGlow">Run Diagnostics</button>
                    </form>
                </div>


                {/* Visual Feedback Display */}
                <div className="bg-gymPanel border border-gymBorder p-5 sm:p-6 rounded-xl shadow-xl md:col-span-2 flex flex-col justify-between min-h-75">
                    {result ? (
                        <div className="space-y-4 flex flex-col justify-center items-center text-center my-auto py-4">
                            <div>
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">Calculated Index</span>
                                <h3 className="text-5xl sm:text-6xl font-bold text-white tracking-tight mt-1">{result.score}</h3>
                            </div>
                            
                            <div className={`px-4 py-1.5 border rounded-full text-[10px] font-bold uppercase tracking-wider ${result.style}`}>
                                Scale status: {result.text}
                            </div>

                            {/* Automated Weight Target Metric Message Banner */}
                            <div className="mt-2 p-3.5 bg-gymDarkest/50 border border-gymBorder rounded-xl max-w-sm text-center">
                                <p className="text-xs text-slate-200 font-medium leading-relaxed">
                                    {result.advice}
                                </p>
                                <span className="block text-[9px] font-bold uppercase tracking-wider text-gymCrimson mt-2">
                                    {result.target}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-slate-500 text-xs sm:text-sm font-medium my-auto max-w-sm mx-auto flex flex-col items-center space-y-2">
                            <Info size={24} className="text-slate-700" />
                            <p className="leading-relaxed">Provide weight mass parameters and stature height inputs to activate biometric tracking evaluations.</p>
                        </div>
                    )}

                    {/* Standard Reference Matrix */}
                    <div className="border-t border-gymDarkest pt-4 mt-4 grid grid-cols-4 gap-2 text-center text-[9px] font-bold uppercase tracking-wider text-slate-500">
                        <div className="p-2 bg-gymDarkest/50 rounded-xl border border-gymBorder"><span className="block text-sky-400">&lt; 18.5</span> Under</div>
                        <div className="p-2 bg-gymDarkest/50 rounded-xl border border-gymBorder"><span className="block text-emerald-400">18.5-24.9</span> Normal</div>
                        <div className="p-2 bg-gymDarkest/50 rounded-xl border border-gymBorder"><span className="block text-amber-400">25-29.9</span> Over</div>
                        <div className="p-2 bg-gymDarkest/50 rounded-xl border border-gymBorder"><span className="block text-gymCrimson">&gt; 30</span> Obese</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BmiCalculator;

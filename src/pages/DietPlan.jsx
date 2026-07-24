import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Apple, PlusCircle, AlertCircle, CheckCircle, Scale } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DietPlan = () => {
    const { user } = useAuth();
    const [diets, setDiets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [assignForm, setAssignForm] = useState({ username: '', mealType: 'Breakfast', foodItems: '', targetCalories: '' });
    const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        if (user?.role === 'MEMBER') {
            fetchMemberDiets();
        } else {
            setLoading(false);
        }
    }, [user]);

    const fetchMemberDiets = async () => {
        try {
            const response = await API.get(`/admin/diet/view?username=${user.username}`);
            setDiets(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error("Error reading diet repository data", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAssignSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage({ text: '', type: '' });

        try {
            await API.post(`/admin/diet/assign?username=${assignForm.username.trim()}`, {
                mealType: assignForm.mealType,
                foodItems: assignForm.foodItems.trim(),
                targetCalories: parseInt(assignForm.targetCalories)
            });
            setStatusMessage({ text: `Macros successfully deployed to @${assignForm.username}!`, type: 'success' });
            setAssignForm({ username: '', mealType: 'Breakfast', foodItems: '', targetCalories: '' });
        } catch (err) {
            setStatusMessage({ text: err.response?.data?.message || 'Database transactional error.', type: 'error' });
        }
    };

    if (loading) return <div className="text-center py-12 text-slate-500 font-bold uppercase tracking-widest text-[10px]">Loading macro metrics...</div>;

    return (
        <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-3xl mx-auto flex flex-col justify-center">
            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between border-b border-gymBorder pb-4 gap-2 text-center sm:text-left">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide uppercase">Diet Plan Interface</h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-medium mt-1">Track caloric thresholds and nutritional consumption logs.</p>
                </div>
                <div className="w-fit mx-auto sm:mx-0 inline-flex px-3 py-1 bg-gymPanel border border-gymBorder rounded-xl text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                    Node Context: <span className="text-gymCrimson ml-1">{user?.role}</span>
                </div>
            </div>


            {/* ADMIN CONSOLE VIEW */}
            {user?.role === 'ADMIN' && (
                <div className="w-full bg-gymPanel border border-gymBorder rounded-2xl p-5 sm:p-6 shadow-xl shadow-black/40">
                    <div className="flex items-center space-x-2.5 mb-4">
                        <PlusCircle className="text-gymCrimson" size={15} />
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Deploy Dietary Targets</h3>
                    </div>

                    {statusMessage.text && (
                        <div className={`mb-4 p-3 rounded-lg text-[10px] font-bold uppercase tracking-wide flex items-center space-x-2 ${
                            statusMessage.type === 'success' ? 'bg-emerald-500/5 border border-emerald-500/10 text-emerald-400' : 'bg-gymCrimson/5 border border-gymCrimson/10 text-gymCrimson'
                        }`}>
                            {statusMessage.type === 'success' ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                            <span>{statusMessage.text}</span>
                        </div>
                    )}

                    <form onSubmit={handleAssignSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Member Username</label>
                                <input type="text" required value={assignForm.username} onChange={(e) => setAssignForm({...assignForm, username: e.target.value})} placeholder="e.g. ashish_fit" className="w-full bg-gymDarkest border border-gymBorder text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-gymCrimson font-medium" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Meal Classification</label>
                                <select value={assignForm.mealType} onChange={(e) => setAssignForm({...assignForm, mealType: e.target.value})} className="w-full bg-gymDarkest border border-gymBorder text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-gymCrimson font-medium">
                                    {['Breakfast','Lunch','Snacks','Dinner','Post-Workout'].map(meal => <option key={meal} value={meal}>{meal}</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Food Composition Items</label>
                            <textarea required rows="3" value={assignForm.foodItems} onChange={(e) => setAssignForm({...assignForm, foodItems: e.target.value})} placeholder="e.g. 200g Grilled Chicken Breast, Brown Rice" className="w-full bg-gymDarkest border border-gymBorder text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-gymCrimson font-medium resize-none" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Caloric Target (kCal)</label>
                            <input type="number" required min="1" value={assignForm.targetCalories} onChange={(e) => setAssignForm({...assignForm, targetCalories: e.target.value})} placeholder="e.g. 600" className="w-full bg-gymDarkest border border-gymBorder text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-gymCrimson font-medium sm:w-1/2" />
                        </div>
                        <button type="submit" className="w-full py-3 bg-gymCrimson hover:bg-gymCrimsonHover text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-crimsonGlow transition-all">Publish Macro Thresholds</button>
                    </form>
                </div>
            )}

            {/* MEMBER LOGS VIEW */}
            {user?.role === 'MEMBER' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {diets.length > 0 ? (
                        diets.map((d, index) => (
                            <div key={d.id || index} className="bg-gymPanel border border-gymBorder rounded-xl p-5 flex flex-col justify-between hover:border-gymCrimson/30 transition-all shadow-md">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="inline-flex p-2 bg-gymDarkest rounded text-gymCrimson border border-gymBorder"><Apple size={14} /></div>
                                        <span className="text-[9px] font-bold tracking-widest px-2.5 py-0.5 bg-gymCrimson/10 text-gymCrimson rounded border border-gymCrimson/20 uppercase">{d.mealType || 'Meal Block'}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Assigned Food Matrix</h4>
                                        <p className="text-slate-200 text-sm font-medium mt-1 leading-relaxed">{d.foodItems}</p>
                                    </div>
                                </div>
                                <div className="mt-6 border-t border-gymDarkest pt-2.5 flex items-center justify-between text-[11px] text-slate-400 bg-gymDarkest/30 -mx-5 -mb-5 p-3 rounded-b-xl">
                                    <span className="flex items-center space-x-1.5"><Scale size={12} className="text-slate-600" /> <span>Caloric Scale:</span></span>
                                    <strong className="text-gymCrimson text-sm font-bold tracking-tight">{d.targetCalories} <span className="text-[10px] text-slate-400 font-medium lowercase">kcal</span></strong>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-gymPanel border border-gymBorder p-4 rounded-xl text-center text-slate-500 text-xs font-bold uppercase tracking-wider max-w-sm mx-auto shadow-inner">No customized meal sheets loaded.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DietPlan;

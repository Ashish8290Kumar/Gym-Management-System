import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Dumbbell, Calendar, PlayCircle, PlusCircle, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const WorkoutPlan = () => {
    const { user } = useAuth();
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [assignForm, setAssignForm] = useState({ username: '', dayOfWeek: 'Monday', exerciseName: '', sets: '', reps: '' });
    const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        if (user?.role === 'MEMBER') {
            fetchMemberWorkouts();
        } else {
            setLoading(false);
        }
    }, [user]);

    const fetchMemberWorkouts = async () => {
        try {
            const response = await API.get(`/admin/workout/view?username=${user.username}`);
            setWorkouts(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error("Error loading workout plans", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAssignSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage({ text: '', type: '' });

        try {
            await API.post(`/admin/workout/assign?username=${assignForm.username.trim()}`, {
                dayOfWeek: assignForm.dayOfWeek,
                exerciseName: assignForm.exerciseName.trim(),
                sets: parseInt(assignForm.sets),
                reps: parseInt(assignForm.reps)
            });
            setStatusMessage({ text: `Workout plan deployed successfully for @${assignForm.username}!`, type: 'success' });
            setAssignForm({ username: '', dayOfWeek: 'Monday', exerciseName: '', sets: '', reps: '' });
        } catch (err) {
            setStatusMessage({ text: err.response?.data?.message || 'Processing input data error.', type: 'error' });
        }
    };

    if (loading) return <div className="text-center py-12 text-slate-400 font-bold text-sm uppercase tracking-wider">Syncing System Nodes...</div>;

    return (
        /* FIXED: Added 'mx-auto flex flex-col items-center justify-center' to perfectly center everything */
        <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-3xl mx-auto flex flex-col justify-center">
            
            {/* Centered Header Layout */}
            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between border-b border-gymBorder pb-4 gap-2 text-center sm:text-left">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide uppercase">Workout Plan Engine</h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-medium mt-1">Configure and analyze high-performance training volume thresholds.</p>
                </div>
                <div className="w-fit mx-auto sm:mx-0 inline-flex px-3 py-1 bg-gymPanel border border-gymBorder rounded-xl text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                    Node Context: <span className="text-gymCrimson ml-1">{user?.role}</span>
                </div>
            </div>


            {/* TRAINER VIEW CONACTIVE FORMS PANEL (Centered) */}
            {user?.role === 'ADMIN' && (
                <div className="w-full bg-gymPanel border border-gymBorder rounded-2xl p-5 sm:p-6 shadow-xl shadow-black/40">
                    <div className="flex items-center space-x-2.5 mb-5">
                        <PlusCircle className="text-gymCrimson" size={18} />
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">Deploy Routine Parameters</h3>
                    </div>

                    {statusMessage.text && (
                        <div className={`mb-4 p-4 rounded-xl text-xs font-bold uppercase tracking-wide flex items-center space-x-2.5 ${
                            statusMessage.type === 'success' ? 'bg-emerald-500/5 border border-emerald-500/10 text-emerald-400' : 'bg-gymCrimson/5 border border-gymCrimson/10 text-gymCrimson'
                        }`}>
                            {statusMessage.type === 'success' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                            <span>{statusMessage.text}</span>
                        </div>
                    )}

                    <form onSubmit={handleAssignSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Member Username</label>
                            <input type="text" required value={assignForm.username} onChange={(e) => setAssignForm({...assignForm, username: e.target.value})} placeholder="Username string token" className="w-full bg-gymDarkest border border-gymBorder text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-gymCrimson font-medium" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Schedule Day</label>
                            <select value={assignForm.dayOfWeek} onChange={(e) => setAssignForm({...assignForm, dayOfWeek: e.target.value})} className="w-full bg-gymDarkest border border-gymBorder text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-gymCrimson font-medium">
                                {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(day => <option key={day} value={day}>{day}</option>)}
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Exercise Routine Label</label>
                            <input type="text" required value={assignForm.exerciseName} onChange={(e) => setAssignForm({...assignForm, exerciseName: e.target.value})} placeholder="e.g. Incline Barbell Bench Press" className="w-full bg-gymDarkest border border-gymBorder text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-gymCrimson font-medium" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Target Volume Sets</label>
                            <input type="number" required min="1" value={assignForm.sets} onChange={(e) => setAssignForm({...assignForm, sets: e.target.value})} placeholder="Sets count" className="w-full bg-gymDarkest border border-gymBorder text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-gymCrimson font-medium" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Repetitions Per Set</label>
                            <input type="number" required min="1" value={assignForm.reps} onChange={(e) => setAssignForm({...assignForm, reps: e.target.value})} placeholder="Reps count" className="w-full bg-gymDarkest border border-gymBorder text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-gymCrimson font-medium" />
                        </div>
                        <button type="submit" className="sm:col-span-2 py-3.5 bg-gymCrimson hover:bg-gymCrimsonHover text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-crimsonGlow transition-all">Publish Operational Routine</button>
                    </form>
                </div>
            )}

            {/* RECIPIENT MEMBER WORKOUT GRIDS */}
            {user?.role === 'MEMBER' && (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {workouts.length > 0 ? (
                        workouts.map((w, index) => (
                            <div key={w.id || index} className="bg-gymPanel border border-gymBorder rounded-2xl p-5 hover:border-gymCrimson/30 transition-all duration-150 flex flex-col justify-between shadow-md">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="inline-flex p-2.5 bg-gymDarkest rounded-xl text-gymCrimson border border-gymBorder"><Dumbbell size={15} /></div>
                                        <span className="text-[9px] font-bold tracking-widest px-2.5 py-1 bg-gymCrimson/10 text-gymCrimson rounded-lg border border-gymCrimson/25 uppercase">{w.dayOfWeek}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-slate-100 truncate">{w.exerciseName}</h4>
                                        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Instructor Track Log</p>
                                    </div>
                                </div>
                                <div className="mt-5 border-t border-gymDarkest pt-3 flex items-center justify-between text-xs text-slate-300 font-medium bg-gymDarkest/30 -mx-5 -mb-5 p-3 rounded-b-2xl">
                                    <div className="flex items-center space-x-1.5">
                                        <Calendar size={13} className="text-slate-500" />
                                        <span>Sets: <strong className="text-white font-bold">{w.sets}</strong></span>
                                    </div>
                                    <div className="flex items-center space-x-1.5">
                                        <PlayCircle size={13} className="text-gymCrimson" />
                                        <span>Reps: <strong className="text-white font-bold">{w.reps}</strong></span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full bg-gymPanel border border-gymBorder p-6 rounded-2xl text-center text-slate-500 text-xs font-bold uppercase tracking-wider max-w-sm mx-auto shadow-inner leading-relaxed">
                            No workout modules loaded into registry dashboard workspace.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default WorkoutPlan;

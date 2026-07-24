import React, { useState } from 'react';
import API from '../services/api';
import { CalendarCheck, ShieldCheck, Clock, UserCheck, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Attendance = () => {
    const { user } = useAuth();
    const [userId, setUserId] = useState('');
    const [log, setLog] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckIn = async (e) => {
        e.preventDefault();
        setError('');
        setLog(null);
        setIsLoading(true);

        const targetId = user?.role === 'ADMIN' ? userId : '1'; // Default backup calculation context

        try {
            const response = await API.post(`/track/attendance/checkin?userId=${targetId}`);
            setLog(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Verification runtime constraint error.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-3xl mx-auto flex flex-col justify-center">
            <div className="border-b border-gymBorder pb-4">
                <h2 className="text-xl font-bold text-white tracking-wide uppercase">Attendance Portal</h2>
                <p className="text-slate-400 text-xs sm:text-sm font-medium mt-1">Register dynamic check-in sequences and audit daily attendance parameters.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full">
                <div className="bg-gymPanel border border-gymBorder p-5 rounded-xl shadow-xl h-fit">
                    <div className="flex items-center space-x-2 mb-4 text-slate-200 font-bold text-sm">
                        <CalendarCheck size={15} className="text-gymCrimson" />
                        <span>Terminal Action</span>
                    </div>
                    {error && <p className="text-gymCrimson text-[10px] font-semibold mb-4 bg-gymCrimson/5 p-3 border border-gymCrimson/10 rounded-xl uppercase">{error}</p>}
                    
                    <form onSubmit={handleCheckIn} className="space-y-4">
                        {user?.role === 'ADMIN' && (
                            <div>
                                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Target Member ID</label>
                                <input type="number" required min="1" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="e.g. 1" className="w-full bg-gymDarkest border border-gymBorder text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gymCrimson font-medium" />
                            </div>
                        )}
                        <button type="submit" disabled={isLoading} className="w-full py-3 bg-gymCrimson hover:bg-gymCrimsonHover text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-crimsonGlow disabled:opacity-40">
                            {isLoading ? 'Verifying Log...' : 'Trigger Secure Check-In'}
                        </button>
                    </form>
                </div>

                                <div className="bg-gymPanel border border-gymBorder p-5 sm:p-6 rounded-xl shadow-xl md:col-span-2 flex flex-col justify-between min-h-60">
                    {log ? (
                        <div className="space-y-4 flex flex-col justify-center items-center text-center my-auto py-2">
                            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 shadow-inner">
                                <UserCheck size={28} />
                            </div>
                            <div>
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">Verification Logging Success</span>
                                <h3 className="text-2xl font-bold text-slate-200 tracking-tight mt-1">STATUS: PRESENT</h3>
                            </div>
                            <div className="p-3 bg-gymDarkest/60 border border-gymBorder rounded-xl text-slate-400 text-xs font-medium space-y-1 w-full max-w-xs">
                                <div className="flex justify-between"><span>Registry ID:</span><span className="text-white font-bold">#{log.id || '1'}</span></div>
                                <div className="flex justify-between"><span>Check-In Time:</span><span className="text-gymCrimson font-bold flex items-center"><Clock size={11} className="mr-1" /> Verified</span></div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-slate-500 text-xs font-medium my-auto max-w-sm mx-auto flex flex-col items-center space-y-2">
                            <ShieldCheck size={24} className="text-slate-700" />
                            <p className="leading-relaxed">Scan your membership profile barcode layout token or deploy target terminal authentication switches to save timestamp variables.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Attendance;


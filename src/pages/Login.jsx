import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import { Dumbbell, Lock, User, AlertCircle } from 'lucide-react';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(false);

        if (!username.trim() || !password.trim()) {
            setError("All authentication signature inputs are required.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await API.post('/auth/login', { 
                username: username.trim(), 
                password: password 
            });
            login(response.data);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Access Denied: Matching identity constraint mismatch.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gymDarkest flex flex-col justify-center items-center px-4 relative overflow-hidden antialiased">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-87.5 h-87.5 bg-gymCrimson/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="w-full max-w-sm bg-gymPanel border border-gymBorder rounded-xl p-5 sm:p-6 shadow-xl relative z-10">
                <div className="text-center mb-6">
                    <div className="inline-flex p-2 bg-gymCrimson/10 text-gymCrimson rounded-lg border border-gymCrimson/20 mb-2.5">
                        <Dumbbell size={20} />
                    </div>
                    <h2 className="text-lg font-black text-white tracking-widest uppercase">SECURE LINK</h2>
                    <p className="text-[10px] text-slate-400 mt-1 font-medium uppercase tracking-wider">Provide platform key parameters</p>
                </div>
                {error && (
                    <div className="mb-4 p-3 bg-gymCrimson/5 border border-gymCrimson/10 text-gymCrimson rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center space-x-2">
                        <AlertCircle size={12} className="shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">User Identity Handle</label>
                        <div className="relative">
                            <User className="absolute left-3.5 top-2.5 text-slate-600" size={14} />
                            <input 
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username handle"
                                className="w-full bg-gymDarkest border border-gymBorder text-slate-200 text-xs rounded-lg pl-10 pr-3 py-2.5 focus:outline-none focus:border-gymCrimson transition-colors font-medium"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Secret Key Matrix</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-2.5 text-slate-600" size={14} />
                            <input 
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-gymDarkest border border-gymBorder text-slate-200 text-xs rounded-lg pl-10 pr-3 py-2.5 focus:outline-none focus:border-gymCrimson transition-colors font-medium"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2.5 mt-2 bg-gymCrimson hover:bg-gymCrimsonHover text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-colors duration-150 disabled:opacity-40"
                    >
                        {isLoading ? 'Decrypting Security Claims...' : 'Establish Secure Connection'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

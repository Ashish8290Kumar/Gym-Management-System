import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard, User, ShieldCheck, CreditCard, CalendarCheck,
    Dumbbell, Apple, Activity, TrendingUp, Trophy, Bell,
    Users, Ticket, Droplet, Flame, Footprints, Clock, Settings, LogOut, Menu, X
} from 'lucide-react';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Profile', path: '/profile', icon: User },
        { name: 'Membership', path: '/membership', icon: ShieldCheck },
        { name: 'Payments', path: '/payments', icon: CreditCard },
        { name: 'Attendance', path: '/attendance', icon: CalendarCheck },
        { name: 'Workout Plan', path: '/workout', icon: Dumbbell },
        { name: 'Diet Plan', path: '/diet', icon: Apple },
        { name: 'BMI Calculator', path: '/bmi', icon: Activity },
        { name: 'Progress Tracker', path: '/progress', icon: TrendingUp },
        { name: 'Achievements', path: '/achievements', icon: Trophy },
        { name: 'Notifications', path: '/notifications', icon: Bell },
        { name: 'Referral', path: '/referral', icon: Users },
        { name: 'Coupon', path: '/coupon', icon: Ticket },
        { name: 'Water Tracker', path: '/water', icon: Droplet },
        { name: 'Calories Tracker', path: '/calories', icon: Flame },
        { name: 'Step Counter', path: '/steps', icon: Footprints },
        { name: 'Booking', path: '/booking', icon: Clock },
        { name: 'Settings', path: '/settings', icon: Settings }
    ];

    return (
        <div className="flex min-h-screen bg-[#0A0C10] text-slate-100 overflow-x-hidden">
            
            {/* FIXED TOP ROW CONTROL LAYER FOR MOBILE MONITORS */}
            <div className="bg-gymPanel text-white flex justify-between items-center p-3.5 md:hidden border-b border-gymBorder fixed top-0 left-0 right-0 z-50">
                <div className="flex items-center space-x-2">
                    <Dumbbell className="text-[#FF451D]" size={16} />
                    <h1 className="text-sm font-bold tracking-wider uppercase">Vitality</h1>
                </div>
                <button onClick={() => setIsOpen(!isOpen)} className="text-[#FF451D] focus:outline-none p-1 hover:bg-gymDarkest rounded transition-colors">
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Drop Drawer Blurred Dark Background Sheet Overlay */}
            {isOpen && (
                <div onClick={() => setIsOpen(false)} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"></div>
            )}


            {/* PRIMARY NAV CONTAINER FRAME - POSITION ADAPTED FOR RESPONSIVE SCALING */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-60 bg-gymPanel border-r border-gymBorder flex flex-col justify-between transform ${isOpen ? 'translate-x-0' : 'translate-x-0'} md:translate-x-0 transition-transform duration-200 ease-in-out`}>
                <div className="flex flex-col overflow-y-auto grow h-full">

                    {/* VITALITY BRAND SYSTEM ENGINE IDENTITY LOGO RE-BRAND */}
                    <div className="p-4.5 border-b border-gymBorder bg-gymDarkest/20 hidden md:flex items-center space-x-2.5 text-left">
                        <Dumbbell className="text-[#FF451D]" size={20} />
                        <div>
                            <h1 className="text-base font-black uppercase text-white tracking-wider leading-none">Vitality</h1>
                            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mt-1">Gym System v2.0</span>
                        </div>
                    </div>

                    {/* Active Administrator Identity Data Tag */}
                    <div className="p-2.5 mx-3.5 my-3 bg-gymDarkest/60 rounded-xl border border-gymBorder flex items-center justify-between">
                        <div className="truncate max-w-30 text-left">
                            <p className="text-xs font-bold text-slate-100 truncate">@{user?.username || 'Guest'}</p>
                        </div>
                        <span className="px-2 py-0.5 text-[9px] font-bold tracking-wider bg-gymCrimson/15 text-gymCrimson rounded border border-gymCrimson/30 uppercase">
                            {user?.role || 'MEMBER'}
                        </span>
                    </div>

                    {/* Navigation Selection Loops */}
                    <nav className="grow px-2.5 space-y-1 pb-4">
                        {menuItems.map((item) => {
                            const IconComponent = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <button
                                    key={item.name}
                                    onClick={() => { navigate(item.path); setIsOpen(false); }}
                                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs uppercase tracking-wide transition-all group text-left ${
                                        isActive
                                            ? 'bg-gymCrimson text-white font-bold shadow-crimsonGlow scale-[1.01]'
                                            : 'text-slate-400 hover:bg-gymDarkest hover:text-slate-100 font-medium'
                                    }`}
                                >
                                    <IconComponent size={15} className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-gymCrimson'}`} />
                                    <span>{item.name}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Sign Out Logic Block Context */}
                <div className="p-3.5 border-t border-gymBorder bg-gymDarkest/20">
                    <button
                        onClick={async () => {
                            try {
                                if (typeof logout === 'function') await logout();
                            } catch (e) {
                                console.log("Cache bypass context logged:", e);
                            } finally {
                                localStorage.clear();
                                sessionStorage.clear();
                                window.location.href = '/';
                            }
                        }}
                        className="w-full flex items-center justify-center space-x-2 py-2 bg-rose-950/30 hover:bg-gymCrimson border border-rose-500/20 hover:border-transparent rounded-xl text-gymCrimson hover:text-white text-xs font-bold uppercase tracking-wider transition-colors duration-150"
                    >
                        <LogOut size={13} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>


            {/* WORKSPACE VIEW SHELL CONTAINER - FORCES SECURE CONTENT AND ADDS PADDING SPACING */}
            <main className="flex-1 md:pl-60 min-h-screen w-full relative z-10 pt-16 md:pt-0">
                <div className="w-full max-w-7xl mx-auto h-full">
                    {/* AUTOMATIC REACT ROUTER PAGE COMPONENT INJECTOR SLOCK */}
                    <Outlet />
                </div>
            </main>

        </div>
    );
};

export default Sidebar;

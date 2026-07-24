import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import WorkoutPlan from './pages/WorkoutPlan';
import DietPlan from './pages/DietPlan';
import BmiCalculator from './pages/BmiCalculator';
import Attendance from './pages/Attendance';
import ProgressTracker from './pages/ProgressTracker';
import Achievements from './pages/Achievements';
import WaterTracker from './pages/WaterTracker';
import StepCounter from './pages/StepCounter';
import CaloriesTracker from './pages/CaloriesTracker';
import Membership from './pages/Membership';
import HomePublic from './pages/HomePublic';
import Dashboard from './pages/AdminDashboard';
import Payments from './pages/Payments';
import Notifications from './pages/Notifications';
import Referral from './pages/Referral';
import Coupon from './pages/Coupon';




// WIRED REAL DATA MODULE FOR PROFILE PATH CHECKS
import Profile from './pages/Profile';

// Higher-order layout wrapper ensuring secure token checkpoint protections
const DashboardLayoutWrapper = ({ children }) => {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" replace />;

    return (
        <div className="min-h-screen bg-gymDarkest text-slate-100 flex flex-col md:flex-row antialiased">
            <Sidebar />
            <main className="grow md:ml-60 px-4 py-6 sm:px-6 md:p-8 w-full min-h-screen overflow-y-auto overflow-x-hidden pb-24 md:pb-8">
                <div className="max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </main>
        </div>
    );
};



// Generic placeholder template for unassigned features
const FeatureMockPage = ({ title }) => (
    <div className="bg-gymPanel border border-gymBorder p-6 sm:p-10 rounded-2xl shadow-xl flex flex-col justify-center min-h-[45vh] text-center max-w-xl mx-auto">
        <h2 className="text-base font-bold text-gymCrimson tracking-wider uppercase">{title} Workspace View</h2>
        <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
            Connected to the Cyberpunk Crimson framework. Content arrays ready for network bindings.
        </p>
    </div>
);
function AppRoutes() {
    const { user } = useAuth();
    return (
        <Routes>
            {/* PUBLIC GATEWAY: Matches your custom landing website design layout */}
            <Route path="/" element={<HomePublic />} />

            {/* AUTHENTICATION CONSOLE */}
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" replace />} />

            {/* SYSTEM CORE OVERVIEW REAL DESHBORD WIRED HERE */}
            <Route path="/dashboard" element={<DashboardLayoutWrapper><Dashboard /></DashboardLayoutWrapper>} />

            {/* SYSTEM CORE ACTIVE MODULES REAL PATH BINDING */}
            <Route path="/profile" element={<DashboardLayoutWrapper><Profile /></DashboardLayoutWrapper>} />

            {/* SYSTEM MODULE PLACEHOLDER SHUNTS */}
            <Route path="/payments" element={<DashboardLayoutWrapper><Payments /></DashboardLayoutWrapper>} />

            <Route path="/notifications" element={<DashboardLayoutWrapper><Notifications /></DashboardLayoutWrapper>} />

           <Route path="/referral" element={<DashboardLayoutWrapper><Referral /></DashboardLayoutWrapper>} />

            <Route path="/coupon" element={<DashboardLayoutWrapper><Coupon /></DashboardLayoutWrapper>} />

            <Route path="/booking" element={<DashboardLayoutWrapper><FeatureMockPage title="Scheduler Session Class Booking Framework" /></DashboardLayoutWrapper>} />
            <Route path="/settings" element={<DashboardLayoutWrapper><FeatureMockPage title="System Global Control Settings" /></DashboardLayoutWrapper>} />

            {/* CASE-INSENSITIVE ROUTE MAPPINGS BINDING ALL YOUR REAL-WORLD WIRED SUB-MODULE SCREENS */}
            <Route path="/attendance" element={<DashboardLayoutWrapper><Attendance /></DashboardLayoutWrapper>} />
            <Route path="/ATTENDANCE" element={<DashboardLayoutWrapper><Attendance /></DashboardLayoutWrapper>} />

            <Route path="/workout" element={<DashboardLayoutWrapper><WorkoutPlan /></DashboardLayoutWrapper>} />
            <Route path="/WORKOUT" element={<DashboardLayoutWrapper><WorkoutPlan /></DashboardLayoutWrapper>} />

            <Route path="/diet" element={<DashboardLayoutWrapper><DietPlan /></DashboardLayoutWrapper>} />
            <Route path="/DIET" element={<DashboardLayoutWrapper><DietPlan /></DashboardLayoutWrapper>} />

            <Route path="/bmi" element={<DashboardLayoutWrapper><BmiCalculator /></DashboardLayoutWrapper>} />
            <Route path="/BMI" element={<DashboardLayoutWrapper><BmiCalculator /></DashboardLayoutWrapper>} />

            <Route path="/progress" element={<DashboardLayoutWrapper><ProgressTracker /></DashboardLayoutWrapper>} />
            <Route path="/PROGRESS" element={<DashboardLayoutWrapper><ProgressTracker /></DashboardLayoutWrapper>} />

            <Route path="/achievements" element={<DashboardLayoutWrapper><Achievements /></DashboardLayoutWrapper>} />
            <Route path="/ACHIEVEMENTS" element={<DashboardLayoutWrapper><Achievements /></DashboardLayoutWrapper>} />

            <Route path="/water" element={<DashboardLayoutWrapper><WaterTracker /></DashboardLayoutWrapper>} />
            <Route path="/WATER TRACKER" element={<DashboardLayoutWrapper><WaterTracker /></DashboardLayoutWrapper>} />

            <Route path="/calories" element={<DashboardLayoutWrapper><CaloriesTracker /></DashboardLayoutWrapper>} />
            <Route path="/CALORIES TRACKER" element={<DashboardLayoutWrapper><CaloriesTracker /></DashboardLayoutWrapper>} />

            <Route path="/steps" element={<DashboardLayoutWrapper><StepCounter /></DashboardLayoutWrapper>} />
            <Route path="/STEP COUNTER" element={<DashboardLayoutWrapper><StepCounter /></DashboardLayoutWrapper>} />

            <Route path="/membership" element={<DashboardLayoutWrapper><Membership /></DashboardLayoutWrapper>} />
            <Route path="/MEMBERSHIP" element={<DashboardLayoutWrapper><Membership /></DashboardLayoutWrapper>} />

            {/* FIXED FALLBACK REDIRECT LOGIC GATEWAY TARGETING THE ROOT LANDING PAGE BY DEFAULT */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
}

export default App;

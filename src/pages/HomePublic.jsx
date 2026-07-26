import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { Dumbbell, Shield, Award, Users, AlertCircle, Check, Phone, Mail, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

// INLINE FORCE-LOADER FOR ROBOTO MEDIUM TYPOGRAPHY
if (typeof document !== 'undefined') {
    const link = document.createElement('link');
    link.href = 'https://googleapis.com';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
}

// STATIC ASSET PATH IMPORTS
import gymBg1 from '../assets/gym-bg.jpg';
import gymBg2 from '../assets/gym-bg2.jpg';
import gymBg3 from '../assets/gym-bg3.jpg';
import gymBg4 from '../assets/gym-bg4.jpg';
import gymBg5 from '../assets/gym-bg5.jpg';
import gymBg6 from '../assets/gym-bg6.jpg';
import gymBg7 from '../assets/gym-bg7.jpg';
import gymBg8 from '../assets/gym-bg8.jpg';
import gymBg9 from '../assets/gym-bg9.jpg';
import gymBg10 from '../assets/gym-bg10.jpg';
import gymBg11 from '../assets/gym-bg11.jpg';

const HomePublic = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('home');
    const [currentSlide, setCurrentSlide] = useState(0);

    // Form management state for public sign-ups
    const [regForm, setRegForm] = useState({ username: '', email: '', password: '', phoneNumber: '', age: '', gender: '', role: 'MEMBER' });
    const [status, setStatus] = useState({ text: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);

    // Array holding your fully verified local images
    const sliderImages = [gymBg1, gymBg2, gymBg3];

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);

    // AUTOMATIC BACKGROUND SLIDER INTERVAL TIMER EFFECT - FIXED LOOP HOOK
    React.useEffect(() => {
        const slideTimer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
        }, 5000);

        return () => clearInterval(slideTimer);
    }, [sliderImages.length]);


    // PART -2

    const scrollToSection = (id, tabName) => {
        setActiveTab(tabName);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setStatus({ text: '', type: '' });
        setIsLoading(true);

        try {
            await API.post('auth/register', {
                username: regForm.username.trim(),
                email: regForm.email.trim(),
                password: regForm.password,
                phoneNumber: regForm.phoneNumber.trim(),
                age: parseInt(regForm.age),
                gender: regForm.gender,
                role: regForm.role
            });
            setStatus({ text: "Registration completed successfully! Proceed to Login.", type: "success" });
            setRegForm({ username: '', email: '', password: '', phoneNumber: '', age: '', gender: '', role: 'MEMBER' });
        } catch (err) {
            setStatus({ text: err.response?.data?.message || "Error validating account creation parameters.", type: "error" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#0A0C10] min-h-screen text-slate-100 antialiased font-sans">

            {/* FIXED HEADER WITH TOP UTILITY INFO BAR */}
            <header className="fixed top-0 left-0 right-0 z-50">
                {/* Micro Top Contact Row */}
                <div className="bg-[#111] text-[11px] text-slate-400 border-b border-white/5 px-6 py-2 hidden sm:flex items-center justify-between font-medium">
                    <div className="flex items-center space-x-6">
                        <span className="flex items-center space-x-1.5"><Phone size={11} className="text-[#FF451D]" /> <span>+163-6589-9654</span></span>
                        <span className="flex items-center space-x-1.5"><Mail size={11} className="text-[#FF451D]" /> <span>info@fitkit.com</span></span>
                        <span className="flex items-center space-x-1.5"><MapPin size={11} className="text-[#FF451D]" /> <span>67GR+XV2, Unnamed Road, Chatmohar</span></span>
                    </div>
                    <div className="flex items-center space-x-4 text-[10px] tracking-wider text-slate-400 font-bold uppercase">
                        <span>FB</span><span>TW</span><span>PT</span><span>IG</span>
                    </div>
                </div>


                {/* PART-3 */}

                {/* Primary Menu Navigation Bar */}
                <div className="bg-black/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-white/5">
                    {/* Brand Identifier Logo */}
                    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setActiveTab('home'); }}>
                        <Dumbbell className="text-[#FF451D]" size={22} />
                        <span className="text-xl font-black uppercase tracking-wider text-white">Vitality</span>
                    </div>

                    {/* REDUCED BOLDNESS AND SIZE-TUNED ROBOTO HEADER BAR */}
                    <nav className="hidden md:flex items-center space-x-6 relative z-50 pointer-events-auto">
                        {[
                            { id: 'home', label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
                            { id: 'about', label: 'About', action: () => scrollToSection('about', 'about') },
                            { id: 'trainers', label: 'Trainers', action: () => scrollToSection('trainers', 'trainers') },
                            { id: 'packages', label: 'Membership', action: () => scrollToSection('packages', 'packages') },
                            { id: 'contact', label: 'Contact', action: () => scrollToSection('contact', 'contact') }
                        ].map((link) => {
                            const isSelected = activeTab === link.id;
                            return (
                                <button
                                    key={link.id}
                                    onClick={() => {
                                        setActiveTab(link.id);
                                        link.action();
                                    }}
                                    className="cursor-pointer uppercase select-none transition-colors duration-150 tracking-wider"
                                    style={{
                                        fontFamily: "'Roboto', sans-serif",
                                        fontWeight: 500,
                                        fontSize: '13px',
                                        color: isSelected ? '#FF451D' : '#E2E8F0',
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        outline: 'none',
                                        padding: '0px 2px'
                                    }}
                                    onMouseEnter={(e) => { if (!isSelected) e.target.style.color = '#FF451D'; }}
                                    onMouseLeave={(e) => { if (!isSelected) e.target.style.color = '#E2E8F0'; }}
                                >
                                    {link.label}
                                </button>
                            );
                        })}
                    </nav>

                    {/* FIXED SIDE-BY-SIDE REGISTER ACTION CONTAINER */}
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-transparent hover:bg-white/5 border border-white/20 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 rounded-sm"
                            style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500, fontSize: '13px' }}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('contact');
                                const el = document.getElementById('contact');
                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                            className="bg-[#FF451D] hover:bg-[#e33914] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 rounded-sm shadow-md"
                            style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 700, fontSize: '13px' }}
                        >
                            Signup
                        </button>
                    </div>
                </div>
            </header>


            {/* PART-4 */}

            {/* HERO SLIDER SECTION FRAME */}
            <section className="relative h-screen bg-black flex items-center px-6 overflow-hidden z-10">

                {/* CYCLING BACKGROUND RENDER LOOKUP INJECTING ONLY LOCAL PICS */}
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center brightness-[0.25] contrast-[1.10] transition-all duration-500 ease-in-out z-0"
                    style={{ backgroundImage: `url(${sliderImages[currentSlide]})` }}
                ></div>

                {/* Graphic Big Dark Orange 'V' Watermark Design Asset Accent */}
                <div className="absolute left-[45%] top-[15%] text-[32rem] font-black text-[#FF451D]/5 leading-none select-none pointer-events-none hidden lg:block z-10">
                    V
                </div>

                {/* Main Hero Content Copy Box Panel */}
                <div className="max-w-5xl mx-auto w-full space-y-6 relative z-30 text-left mt-24">
                    <span className="text-xs font-bold tracking-widest text-[#FF451D] uppercase border-l-2 border-[#FF451D] pl-3 block">
                        GREETINGS FROM VITALITY GYM!
                    </span>

                    <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase max-w-2xl leading-[1.05]">
                        FIT TO <span className="text-[#FF451D]">KEEP</span> YOUR SKIN
                    </h2>

                    <p className="text-slate-400 text-xs sm:text-sm font-medium max-w-xl leading-relaxed">
                        Workouts at a gym are planned physical activities carried out in a fitness center furnished with a range of exercise equipment, free weights, and other amenities.
                    </p>

                    <div className="pt-4 flex flex-wrap items-center gap-6">
                        <button onClick={() => scrollToSection('packages', 'packages')} className="px-6 py-3.5 bg-[#FF451D] hover:bg-[#e33914] text-white text-xs font-bold uppercase tracking-widest transition-all rounded-sm shadow-md">
                            VIEW CLASS SCHEDULE
                        </button>
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl font-black text-[#FF451D]">2K+</span>
                            <span className="text-xs uppercase tracking-wider font-bold text-slate-300">Satisfied Customers</span>
                        </div>
                    </div>
                </div>

                {/* Highly Responsive Slider Control Triggers */}
                <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-black/40 hover:bg-[#FF451D] border border-white/10 hover:border-[#FF451D] text-white rounded-sm flex items-center justify-center transition-all duration-200">
                    <ChevronLeft size={20} />
                </button>
                <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-black/40 hover:bg-[#FF451D] border border-white/10 hover:border-[#FF451D] text-white rounded-sm flex items-center justify-center transition-all duration-200">
                    <ChevronRight size={20} />
                </button>
            </section>


            {/* PART-5 */}

            {/* ABOUT US PREMIUM SECTION ROW */}
            <section id="about" className="py-24 px-6 bg-[#0E1118]/60 scroll-mt-24 relative z-20 border-b border-white/5">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT COLUMN: MULTI-IMAGE COMBINATION GRID USING LOCAL CODES */}
                    <div className="relative grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div className="rounded-xl overflow-hidden bg-slate-900 h-64 border border-white/5 shadow-xl">
                                <img src={gymBg1} alt="Gym Crew" className="w-full h-full object-cover brightness-90 contrast-[1.05]" />
                            </div>
                            {/* Graphic Dumbbell Icon Asset Badge */}
                            <div className="bg-[#FF451D] w-14 h-14 rounded-full flex items-center justify-center text-white font-black shadow-lg shadow-[#FF451D]/20 mx-auto transform translate-y-2">
                                <Dumbbell size={24} />
                            </div>
                        </div>
                        <div className="pt-8">
                            <div className="rounded-xl overflow-hidden bg-slate-900 h-80 border border-white/5 shadow-2xl">
                                <img src={gymBg2} alt="Heavy Lifting" className="w-full h-full object-cover brightness-90 contrast-[1.05]" />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: TEXT LAYOUT & ACCORDION CARDS */}
                    <div className="space-y-6 text-left">
                        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-snug">
                            We Have a <span className="text-[#FF451D]">Great Deal</span> of<br />Experience With <span className="text-[#FF451D]">Fitness</span>
                        </h2>

                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-medium max-w-xl">
                            A lot of people gain from customized exercise regimens created by personal trainers or fitness experts to target particular fitness objectives, such as weight loss, muscle building, or enhanced sports performance.
                        </p>

                        {/* Statically Framed Core Values Matching Image Layout */}
                        <div className="space-y-3 pt-2">
                            {[
                                { num: "01", text: "More than fifteen years of experience" },
                                { num: "02", text: "Authorized Instructors" },
                                { num: "03", text: "Outstanding caliber of work" }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-[#12141C] border border-white/5 p-4 rounded-lg flex items-center justify-between shadow-md">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-xs font-black text-[#FF451D] font-mono">{item.num}</span>
                                        <span className="text-xs uppercase tracking-wider font-bold text-slate-200">{item.text}</span>
                                    </div>
                                    <span className="text-slate-500 font-bold text-xs select-none">+</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* BOTTOM WORK PROCEDURE STEPS SECTION GRID */}
                <div className="max-w-6xl mx-auto pt-28 space-y-12">
                    <div className="text-center space-y-2">
                        <span className="text-[10px] font-black tracking-widest text-[#FF451D] uppercase bg-[#FF451D]/10 px-3 py-1 rounded-full">
                            Work Procedure
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                            Simple Steps To Reach<br />Your <span className="text-[#FF451D]">Objectives.</span>
                        </h3>
                    </div>

                    {/* 3-Column Image Procedure Layout Cards Linked to your Local variables */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "Exercise Movement", desc: "A lot of gyms include resources and tools for tracking success, like integrated gym software, workout records, and fitness applications.", img: gymBg4 },
                            { title: "Fitness Methods", desc: "Gyms are flexible enough to accommodate people of all fitness levels and tastes, from novices to experts.", img: gymBg5 },
                            { title: "Success Thresholds", desc: "Instructor-led group fitness programs provide structured exercises in an inspiring environment that fosters personal growth.", img: gymBg6 }
                        ].map((step, i) => (
                            <div key={i} className="bg-[#12141C] border border-white/5 rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-[#FF451D]/20 transition-all duration-300">
                                <div className="h-48 bg-slate-900 overflow-hidden relative">
                                    <img src={step.img} alt={step.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-90" />
                                </div>
                                <div className="p-6 space-y-3 grow flex flex-col justify-between text-left">
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">{step.title}</h4>
                                        <p className="text-slate-400 text-[11px] leading-relaxed font-medium">{step.desc}</p>
                                    </div>
                                    <div className="pt-2">
                                        <button onClick={() => {
                                            const element = document.getElementById('contact');
                                            if (element) element.scrollIntoView({ behavior: 'smooth' });
                                        }} className="bg-[#FF451D] text-white px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-sm transition-colors hover:bg-[#e33914]">
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* PART-6 */}

            {/* INSTRUCTORS SHOWROOM SECTION */}
            <section id="trainers" className="py-24 bg-[#12141C]/40 border-t border-white/5 px-6 scroll-mt-24 relative z-20">
                <div className="max-w-5xl mx-auto space-y-12">
                    <div className="text-left space-y-1">
                        <h4 className="text-sm font-bold text-[#FF451D] uppercase tracking-wider border-l-2 border-[#FF451D] pl-3">Expert Guidance</h4>
                        <h3 className="text-3xl font-black uppercase text-white tracking-wide">Certified Instructors</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { name: "Vikram Rathore", role: "Head Trainer", spec: "Olympic Power Blocks", img: gymBg9 },
                            { name: "Ananya Sharma", role: "Calisthenics Coach", spec: "Kinematic Bodyweight Movements", img: gymBg11 },
                            { name: "Rajesh Kumar", role: "Endurance Expert", spec: "Cardio Threshold Operations", img: gymBg8 }
                        ].map((trainer, idx) => (
                            <div key={idx} className="bg-[#12141C] border border-white/5 rounded-sm overflow-hidden shadow-lg flex flex-col justify-between group hover:border-[#FF451D]/20 transition-all duration-300">
                                <div className="h-52 bg-slate-950 overflow-hidden relative border-b border-white/5">
                                    <img
                                        src={trainer.img}
                                        alt={trainer.name}
                                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 brightness-95"
                                    />
                                </div>
                                <div className="p-5 space-y-2 text-left">
                                    <div>
                                        <h5 className="text-sm font-bold text-slate-200 uppercase tracking-wide">{trainer.name}</h5>
                                        <span className="text-[10px] text-[#FF451D] font-bold uppercase tracking-wider block mt-0.5">{trainer.role}</span>
                                    </div>
                                    <p className="text-slate-400 text-xs font-medium border-t border-white/5 pt-2">Specialty: <strong className="text-slate-300 font-bold">{trainer.spec}</strong></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MEMBERSHIP PRICING SECTION - EXACT TEXT MATCH */}
            <section id="packages" className="py-24 bg-[#111319] border-t border-white/5 px-6 scroll-mt-24 relative z-20">
                <div className="max-w-6xl mx-auto space-y-12">

                    {/* Centered Structural Section Header */}
                    <div className="text-center space-y-2">
                        <span className="text-[10px] font-bold tracking-widest text-[#FF451D] uppercase">
                            Pricing Model
                        </span>
                        <h3 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
                            Find Your <span className="text-[#FF451D]">Perfect Plan</span>
                        </h3>
                    </div>

                    {/* Grid Layout Container */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-4">
                        {[
                            {
                                name: "SILVER TIER",
                                sub: "1 MONTH ACCESS",
                                fee: "1499",
                                highlighted: false,
                                perks: ["Full Gym Floor Entry", "Standard Locker Room Lockers", "1x General Fitness Evaluation"]
                            },
                            {
                                name: "GOLD TIER",
                                sub: "3 MONTHS ACCESS",
                                fee: "3499",
                                highlighted: true,
                                perks: ["All Silver Tier Entry Perks", "Sauna & Steam Bath Utilities", "Group Yoga & Zumba Classes Access", "2x Personal Training Consults"]
                            },
                            {
                                name: "PLATINUM ALPHA",
                                sub: "12 MONTHS ACCESS",
                                fee: "9999",
                                highlighted: false,
                                perks: ["Unrestricted 24/7 Access Profiles", "Private VIP Locker Access", "Unlimited Group Fitness Masterclasses", "Dedicated Personal Trainer Allocation", "Custom Specialized Diet Layout Formulations"]
                            }
                        ].map((pkg, i) => (
                            <div
                                key={i}
                                className={`relative p-8 flex flex-col justify-between shadow-2xl transition-transform duration-300 hover:-translate-y-1 ${pkg.highlighted
                                    ? 'bg-[#FF451D] text-white rounded-br-[64px] rounded-tl-3xl rounded-tr-sm rounded-bl-sm'
                                    : 'bg-[#161922] border border-white/5 text-slate-100 rounded-br-[64px] rounded-tl-3xl rounded-tr-sm rounded-bl-sm'
                                    }`}
                            >
                                <div className="space-y-4 text-left">
                                    {/* Main Dynamic Text Headers Match */}
                                    <div>
                                        <h5 className={`text-sm font-black uppercase tracking-wider ${pkg.highlighted ? 'text-white' : 'text-slate-200'}`}>
                                            {pkg.name}
                                        </h5>
                                        <span className={`text-[9px] font-bold tracking-wider uppercase block mt-0.5 ${pkg.highlighted ? 'text-white/70' : 'text-slate-500'}`}>
                                            {pkg.sub}
                                        </span>
                                    </div>

                                    {/* Indian Rupees Plan Rate Layout Row */}
                                    <div className="flex items-baseline space-x-1 pt-2">
                                        <span className="text-3xl font-black tracking-tight">₹{pkg.fee}</span>
                                        <span className={`text-[10px] uppercase font-bold tracking-wider ${pkg.highlighted ? 'text-white/70' : 'text-slate-500'}`}>
                                            / PLAN RATE
                                        </span>
                                    </div>

                                    {/* Features Checkmark Content Lists Match */}
                                    <ul className="space-y-2.5 pt-4 border-t border-white/10">
                                        {pkg.perks.map((perk, pi) => (
                                            <li key={pi} className="text-xs font-semibold tracking-wide flex items-start space-x-2.5">
                                                <Check
                                                    size={13}
                                                    className={`mt-0.5 shrink-0 ${pkg.highlighted ? 'text-white' : 'text-[#FF451D]'}`}
                                                />
                                                <span className={pkg.highlighted ? 'text-white/90' : 'text-slate-300'}>
                                                    {perk}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Procure Button Design Elements Match */}
                                <div className="pt-8">
                                    <button
                                        onClick={() => {
                                            const element = document.getElementById('contact');
                                            if (element) element.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className={`w-full py-3 text-xs font-black uppercase tracking-widest transition-all rounded-sm shadow-md ${pkg.highlighted
                                            ? 'bg-white text-black hover:bg-slate-100'
                                            : 'bg-[#FF451D] text-white hover:bg-[#e33914]'
                                            }`}
                                    >
                                        PROCURE PLAN STRATEGY
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PART-7 */}

            {/* BACKEND-READY REGISTRATION PORTAL WITH ROLE SELECTION */}
            <section id="contact" className="py-24 px-6 max-w-xl mx-auto space-y-6 scroll-mt-24 relative z-20">
                <div className="text-center space-y-1">
                    <h4 className="text-sm font-bold text-[#FF451D] uppercase tracking-wider">Registration Hub</h4>
                    <p className="text-xs text-slate-400 font-medium">Create a new membership credential token to sync your profiles instantly.</p>
                </div>

                <div className="bg-[#12141C] border border-white/5 p-6 sm:p-8 rounded-sm shadow-2xl">
                    {status.text && (
                        <div className={`mb-5 p-4 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center space-x-2.5 ${status.type === 'success' ? 'bg-emerald-500/5 border border-emerald-500/10 text-emerald-400' : 'bg-red-500/5 border border-red-500/10 text-red-400'
                            }`}>
                            <AlertCircle size={14} className="shrink-0" />
                            <span>{status.text}</span>
                        </div>
                    )}

                    <form onSubmit={handleRegisterSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="text-left">
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Account Username</label>
                                <input type="text" required value={regForm.username} onChange={(e) => setRegForm({ ...regForm, username: e.target.value })} placeholder="e.g. ashish_fit" className="w-full bg-[#0A0C10] border border-white/5 text-slate-200 text-xs rounded-sm px-4 py-3 focus:outline-none focus:border-[#FF451D] font-medium" />
                            </div>
                            <div className="text-left">
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Email Address</label>
                                <input type="email" required value={regForm.email} onChange={(e) => setRegForm({ ...regForm, email: e.target.value })} placeholder="handle@gym.com" className="w-full bg-[#0A0C10] border border-white/5 text-slate-200 text-xs rounded-sm px-4 py-3 focus:outline-none focus:border-[#FF451D] font-medium" />
                            </div>
                        </div>

                        <div className="text-left">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Secret Password</label>
                            <input type="password" required value={regForm.password} onChange={(e) => setRegForm({ ...regForm, password: e.target.value })} placeholder="••••••••" className="w-full bg-[#0A0C10] border border-white/5 text-slate-200 text-xs rounded-sm px-4 py-3 focus:outline-none focus:border-[#FF451D] font-medium" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="sm:col-span-2 text-left">
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Phone Number</label>
                                <input type="text" required value={regForm.phoneNumber} onChange={(e) => setRegForm({ ...regForm, phoneNumber: e.target.value })} placeholder="9876543210" className="w-full bg-[#0A0C10] border border-white/5 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF451D] font-medium" />
                            </div>
                            <div className="text-left">
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Age</label>
                                <input
                                    type="number"
                                    required
                                    min="1"
                                    value={regForm.age}
                                    /* Badlaav: parseInt lagaya hai jo text ko number bana dega */
                                    onChange={(e) => setRegForm({ ...regForm, age: parseInt(e.target.value) || "" })}
                                    placeholder="24"
                                    className="w-full bg-[#0A0C10] border border-white/5 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF451D] font-medium"
                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="text-left">
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Gender Selection</label>
                                <select value={regForm.gender} required onChange={(e) => setRegForm({ ...regForm, gender: e.target.value })} className="w-full bg-[#0A0C10] border border-white/5 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF451D] font-medium">
                                    <option value="">Select Gender</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>

                            {/* DYNAMIC ACCOUNT ROLE ASSIGNMENT SELECTION DROPDOWN */}
                            <div className="text-left">
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Account Role Type</label>
                                <select value={regForm.role} required onChange={(e) => setRegForm({ ...regForm, role: e.target.value })} className="w-full bg-[#0A0C10] border border-white/5 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF451D] font-medium">
                                    <option value="MEMBER">Member User</option>
                                    <option value="TRAINER">Gym Trainer</option>
                                    <option value="ADMIN">System Admin</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button type="submit" disabled={isLoading} className="w-full py-3.5 mt-2 bg-[#FF451D] hover:bg-[#e33914] text-white text-xs font-bold uppercase tracking-widest rounded-sm shadow-lg disabled:opacity-40">
                                {isLoading ? 'Creating Account Handle...' : 'Commit Membership Signup'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* PUBLIC FOOTER */}
            <footer className="bg-black py-8 border-t border-white/5 text-center px-4 relative z-20">
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">
                    &copy; 2026 VITALITY FITNESS MANAGEMENT. ALL ARCHITECTURAL RIGHTS RETAINED.
                </p>
            </footer>
        </div>
    );
};

export default HomePublic;

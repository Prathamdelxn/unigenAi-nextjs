// app/dashboard/layout.js

'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaCrown, FaChevronRight, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
const subscriptionTypes = {
  
  basic: { 
    name: "Basic", 
    color: "bg-gradient-to-r from-gray-600 to-gray-700",
    textColor: "text-gray-200"
  },
  lite: { 
    name: "Lite", 
    color: "bg-gradient-to-r from-green-600 to-green-700",
    textColor: "text-green-100"
  },
  pro: { 
    name: "Pro", 
    color: "bg-gradient-to-r from-purple-600 to-indigo-700",
    textColor: "text-purple-100"
  },
  advanced: { 
    name: "Advanced", 
    color: "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600",
    textColor: "text-white"
  },
};

export default function DashboardLayout({ children }) {
  const [subscription, setSubscription] = useState("basic");
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.replace('/auth/login') // redirect to login
    }
  }, [])
  useEffect(() => {
    // Simulate fetching user data
    const fetchUser = async () => {
      try {
        // Replace with actual fetch logic
        setTimeout(() => {
          setSubscription("pro"); // Default to pro for demo
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };



    fetchUser();
  }, []);

  const { color, textColor, name } = subscriptionTypes[subscription] || subscriptionTypes.basic;

  const menuItems = [
    { href: "/mainpage/imageGeneration", label: "Image Generation", icon: "🖼️" },
    { href: "/mainpage/videoGeneration", label: "Video Generation", icon: "🎬" },
    { href: "/mainpage/codegeneration", label: "Code Generation", icon: "📊" },
    { href: "/mainpage/audiogeneration", label: "Audio Generation", icon: "🎵" },
    { 
      href: "/dashboard/interview", 
      label: "Interview Preparation", 
      icon: "💼",
      premium: subscription !== "advanced"
    },
  ];

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <div className="w-12 h-12 border-4 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    
    <div className="flex h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
      {/* Mobile sidebar toggle button */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-700/80 backdrop-blur"
        onClick={toggleSidebar}
      >
        {mobileSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Desktop Sidebar */}
      <motion.aside 
        initial={{ width: 250 }}
        animate={{ 
          width: sidebarOpen ? 250 : 0,
          opacity: sidebarOpen ? 1 : 0.8
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="hidden md:flex h-full flex-col border-r border-slate-700/50 bg-slate-900/50 backdrop-blur-lg"
      >
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-bold">Creative Studio</h2>
          <p className="text-sm text-slate-400">Your creative toolkit</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {menuItems.map(({ href, label, icon, premium }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center p-3 rounded-lg transition-all ${
                    premium ? 'opacity-60' : 'hover:bg-slate-800'
                  }`}
                >
                  <span className="mr-3 text-lg">{icon}</span>
                  <span className="flex-1">{label}</span>
                  {premium && (
                    <FaCrown className="text-yellow-400 ml-2" size={14} />
                  )}
                  <FaChevronRight className="ml-2 text-slate-500" size={12} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Membership Card */}
        <div className={`p-4 m-4 rounded-xl ${color}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider font-bold ${textColor}">Current Plan</p>
              <h3 className="font-bold text-white">{name}</h3>
            </div>
            <Link 
              href="/mainpage/manage-subscription"
              className="px-3 py-1 text-xs rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
            >
              Manage
            </Link>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="md:hidden fixed inset-y-0 left-0 z-40 w-64 h-full flex-col border-r border-slate-700/50 bg-slate-900 backdrop-blur-lg"
          >
            <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Creative Studio</h2>
                <p className="text-sm text-slate-400">Your creative toolkit</p>
              </div>
              <button onClick={() => setMobileSidebarOpen(false)}>
                <FaTimes size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-2">
                {menuItems.map(({ href, label, icon, premium }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`flex items-center p-3 rounded-lg transition-all ${
                        premium ? 'opacity-60' : 'hover:bg-slate-800'
                      }`}
                      onClick={() => setMobileSidebarOpen(false)}
                    >
                      <span className="mr-3 text-lg">{icon}</span>
                      <span className="flex-1">{label}</span>
                      {premium && (
                        <FaCrown className="text-yellow-400 ml-2" size={14} />
                      )}
                      <FaChevronRight className="ml-2 text-slate-500" size={12} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Membership Card */}
            <div className={`p-4 m-4 rounded-xl ${color}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider font-bold ${textColor}">Current Plan</p>
                  <h3 className="font-bold text-white">{name}</h3>
                </div>
                <Link 
                  href="/mainpage/account"
                  className="px-3 py-1 text-xs rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  Manage
                </Link>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-800/50 border-b border-slate-700/50 p-4 flex items-center justify-between">
          <button 
            className="hidden md:flex items-center justify-center p-2 rounded-lg hover:bg-slate-700 transition"
            onClick={toggleSidebar}
          >
            {/* {sidebarOpen ? <FaTimes size={18} /> : <FaBars size={18} />} */}
          </button>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/mainpage/account" 
              className="flex items-center space-x-2 group"
            >
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition">Account</span>
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-700 group-hover:bg-slate-600 transition">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${color}`}>
                  <span className="text-xs font-bold">{name.charAt(0)}</span>
                </div>
              </div>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
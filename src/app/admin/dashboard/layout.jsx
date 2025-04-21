'use client';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import { FiMenu, FiX, FiUsers, FiFolder, FiSettings, FiPieChart, FiCalendar, FiBell } from 'react-icons/fi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { BsLightningCharge } from 'react-icons/bs';
import Link from 'next/link';


const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div lang="en" className={darkMode ? 'dark' : ''}>
      <div className={`${inter.className} bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex h-screen overflow-hidden`}>
        {/* Sidebar */}
        <aside className={`bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col border-r border-gray-200 dark:border-gray-700`}>
          <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
            {sidebarOpen ? (
              <div className="flex items-center space-x-2">
                <BsLightningCharge className="text-indigo-500 text-2xl" />
                <span className="font-bold text-xl dark:text-white">Unigen AI</span>
              </div>
            ) : (
              <BsLightningCharge className="text-indigo-500 text-2xl mx-auto" />
            )}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              {sidebarOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            <NavItem icon={<AiOutlineDashboard />} text="Dashboard" href="/admin/dashboard" open={sidebarOpen} />
            <NavItem icon={<FiUsers />} text="Users" href="/admin/dashboard/users" open={sidebarOpen} />
            <NavItem icon={<FiFolder />} text="Tools" href="/admin/dashboard/tools-management" open={sidebarOpen} />
            <NavItem icon={<FiPieChart />} text="Revenue" href="/admin/dashboard/analytics" open={sidebarOpen} />
            <NavItem icon={<FiCalendar />} text="Subscription" href="/admin/dashboard/Subscription-management" open={sidebarOpen} />
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="w-full flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            >
              <span className="text-xl">
                {darkMode ? '☀️' : '🌙'}
              </span>
              {sidebarOpen && <span className="ml-3 font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
            </button>
            <NavItem icon={<FiSettings />} text="Settings" href="/settings" open={sidebarOpen} />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Topbar */}
          <header className="bg-white dark:bg-gray-800 shadow-sm z-10 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between p-4">
              <h1 className="text-xl font-semibold dark:text-white">Dashboard</h1>
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                  <FiBell className="text-gray-600 dark:text-gray-300" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <span className="text-indigo-600 dark:text-indigo-300 font-medium">AD</span>
                  </div>
                  {sidebarOpen && <span className="font-medium dark:text-white">Admin</span>}
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, text, href, open }) {
  return (
    <Link 
      href={href} 
      className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
    >
      <span className="text-xl">{icon}</span>
      {open && <span className="ml-3 font-medium">{text}</span>}
    </Link>
  );
}
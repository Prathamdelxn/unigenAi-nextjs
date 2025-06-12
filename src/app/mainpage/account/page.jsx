// app/dashboard/account/page.jsx
'use client'
import Link from 'next/link';
import { logout } from '@/utils/logout';
import { useAuth } from '@/app/context/AuthContext';
import { FaUser,  FaChevronRight,FaEnvelope, FaCrown, FaHistory, FaCreditCard, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { MdSecurity, MdApi } from 'react-icons/md';
import { RiVipCrownFill } from 'react-icons/ri';
import { useState,useEffect } from 'react';
export default function AccountPage() {

 const {userData}=useAuth();
   const [newuserData, setnewUserData] = useState(null);
const[selectedplan ,setplan]=useState("Basic");
  useEffect(() => {
    console.log("datais",userData)
    if (userData) {
      // If you have all user data in auth context

      // OR fetch fresh data from API
    
      const fetchUserData = async () => {
        try {
          const response = await fetch(`/api/fetch-user-by-email/?email=${userData.email}`);

          const data = await response.json();
          setnewUserData(data.user);
         console.log("this is fetch data",data);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        } finally {
         
        }
      };
      fetchUserData();
     
    }
  }, []);
  // console.log(newuserData.name)
  // Mock user data - replace with your actual data fetching
  const user = {
    name: newuserData?.name || "Loading...",
    email: newuserData?.email || "Loading...",
    subscription: newuserData?.plan || "Loading...",
    imageGenerator:newuserData?.imageGenerator || "0",
    videoGenerator:newuserData?.videoGenerator || "0",
    codeGenerator:newuserData?.codeGenerator || "0",


  
   
  };
  

  const subscriptionPlans = {
    Basic: { name: "Basic", color: "bg-gray-600", features: ["Image Generation", "Basic Support"] },
    ProcessingInstruction: { name: "Pro", color: "bg-gradient-to-r from-purple-600 to-indigo-700", features: ["All Basic features", "Video Generation", "Priority Support", "Higher Resolution"] },
    Lite:{name:"Lite",color:"bg-gradient-to-r from-green-600 to-blue-700",features:["No watermark" ,"Standard Support","High Quality Resolution"]},
    advanced: { name: "Advanced", color: "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600", features: ["All Pro features", "Interview Prep", "API Access", "Highest Priority"] }
  };

  const currentPlan = subscriptionPlans[user?.subscription] || subscriptionPlans.basic;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Card */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-lg">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold">
                  {user.name.charAt(0)}
                </div>
                {user.subscription !== 'basic' && (
                  <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-1">
                    <FaCrown className="text-white text-xs" />
                  </div>
                )}
              </div>
              <h2 className="mt-4 text-xl font-bold">{user.name} </h2>
              <p className="text-slate-400 flex items-center">
                <FaEnvelope className="mr-2" size={14} />
                {user.email}
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-400">Member since</span>
                <span>January 15, 2023</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Status</span>
                <span className='text-green-500'>Online</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-lg">
            <h3 className="font-medium mb-4 flex items-center">
              <FaCog className="mr-2" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link href="/mainpage/account/security">
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/50 transition">
                <span className="flex items-center">
                  <MdSecurity className="mr-2" />
                  Security
                </span>
                <FaChevronRight size={12} />
              </button>
              </Link>
              {/* <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/50 transition">
                <span className="flex items-center">
                  <MdApi className="mr-2" />
                  API Keys
                </span>
                <FaChevronRight size={12} />
              </button> */}
              <Link href="/mainpage/account/history">
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/50 transition">
                <span className="flex items-center">
                  <FaHistory className="mr-2" />
                  Usage History
                </span>
                <FaChevronRight size={12} />
              </button>
              </Link>
              <button onClick={logout} className="w-full flex items-center justify-between p-3 rounded-lg text-red-400 hover:bg-slate-700/50 transition">
                <span className="flex items-center">
                  <FaSignOutAlt className="mr-2" />
                  Sign Out
                </span>
                <FaChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-2/3 space-y-6">
          {/* Subscription Card */}
          <div className={`rounded-2xl overflow-hidden ${currentPlan?.color} text-white`}>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm uppercase tracking-wider font-bold opacity-80">Current Plan</h3>
                  <h2 className="text-2xl font-bold mt-1 flex items-center">
                    {currentPlan?.name}
                    {user.subscription !== 'basic' && (
                      <RiVipCrownFill className="ml-2 text-yellow-300" />
                    )}
                  </h2>
                </div>
                {/* <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition">
                  Manage Subscription
                </button> */}
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentPlan?.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mr-3">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-black/10 px-6 py-3 text-center">
            <Link href="/mainpage/manage-subscription">
              <button className="text-sm font-medium opacity-80 hover:opacity-100 transition">
                View all plan options →
              </button>
              </Link>
            </div>
          </div>

          {/* Usage Statistics */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-lg">
            <h3 className="font-medium mb-6">Usage Statistics</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span>API Usage</span>
                  <span>65% of limit</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${65 > 90 ? 'bg-red-500' : 'bg-indigo-500'}`} 
                    style={{ width: `65%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <div className="text-slate-400 text-sm">Images Generated</div>
                  <div className="text-xl font-bold mt-1">{user.imageGenerator}</div>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <div className="text-slate-400 text-sm">Videos Created</div>
                  <div className="text-xl font-bold mt-1">{user.videoGenerator}</div>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <div className="text-slate-400 text-sm">Code Created</div>
                  <div className="text-xl font-bold mt-1">{user.codeGenerator}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Billing History */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-medium">Billing History</h3>
              {/* <button className="text-sm text-indigo-400 hover:text-indigo-300 transition">
                View All
              </button> */}
            </div>
            
            <div className="space-y-4">
              
              <div className="w-full flex justify-center">
                Not Yet Any Transaction
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
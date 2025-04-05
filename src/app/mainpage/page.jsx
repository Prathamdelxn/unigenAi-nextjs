'use client';

import { FaRocket, FaLightbulb, FaChartLine, FaUsers, FaCrown } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function DashboardIntro() {
  
  const features = [
    {
      icon: <FaRocket className="text-3xl text-purple-400" />,
      title: "Rapid Content Creation",
      description: "Generate high-quality content in seconds with our advanced AI models."
    },
    {
      icon: <FaLightbulb className="text-3xl text-yellow-400" />,
      title: "Creative Inspiration",
      description: "Overcome creative blocks with our intelligent suggestion system."
    },
    {
      icon: <FaChartLine className="text-3xl text-green-400" />,
      title: "Performance Analytics",
      description: "Track your content performance and optimize your strategy."
    },
    {
      icon: <FaUsers className="text-3xl text-blue-400" />,
      title: "Collaboration Tools",
      description: "Share and collaborate with team members seamlessly."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6 md:p-8 shadow-lg"
      >
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome to <span className="text-purple-400">Unigen AI</span> Creative Studio
          </h1>
          <p className="text-lg text-slate-300 mb-6">
            Your all-in-one platform for AI-powered content creation. Generate images, videos, presentations, 
            and more with just a few clicks.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition flex items-center">
              <FaRocket className="mr-2" /> Quick Start
            </button>
            <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition flex items-center">
              Take a Tour
            </button>
          </div>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {features.map((feature, index) => (
          <div 
            key={index}
            className="bg-slate-800/50 hover:bg-slate-800/70 border border-slate-700 rounded-xl p-6 transition cursor-pointer hover:shadow-lg"
          >
            <div className="mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-slate-400">{feature.description}</p>
          </div>
        ))}
      </motion.div>

      {/* Recent Activity */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-slate-800/50 rounded-xl p-6 border border-slate-700"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Recent Activity</h2>
          <button className="text-sm text-purple-400 hover:text-purple-300 transition">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start p-4 bg-slate-800/30 rounded-lg">
            <div className="bg-purple-600/20 p-2 rounded-lg mr-4">
              <FaRocket className="text-purple-400" />
            </div>
            <div>
              <h4 className="font-medium">New project created</h4>
              <p className="text-sm text-slate-400">AI-generated marketing campaign</p>
              <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-start p-4 bg-slate-800/30 rounded-lg">
            <div className="bg-blue-600/20 p-2 rounded-lg mr-4">
              <FaLightbulb className="text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium">Content suggestion</h4>
              <p className="text-sm text-slate-400">5 new ideas for your next video</p>
              <p className="text-xs text-slate-500 mt-1">Yesterday</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Upgrade Banner */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 rounded-xl p-6 border border-purple-800/50"
      >
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center mb-2">
              <FaCrown className="text-yellow-400 mr-2" />
              <span className="font-semibold">PREMIUM FEATURES</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Unlock the Full Potential</h3>
            <p className="text-slate-300 max-w-lg">
              Upgrade to our Advanced plan to access exclusive tools, higher quality outputs, 
              and priority support.
            </p>
          </div>
          <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-slate-900 rounded-lg font-semibold transition flex items-center">
            Upgrade Now
          </button>
        </div>
      </motion.div>
    </div>
  );
}
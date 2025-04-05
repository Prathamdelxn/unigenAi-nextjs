'use client'

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiZap, FiShield, FiCode } from 'react-icons/fi';
import Link from 'next/link';

const Particle = ({ x, y, size, color, rotate }) => {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        x,
        y,
        width: size,
        height: size,
        background: color,
        rotate,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.4, 0],
        y: y - 100,
        transition: { duration: Math.random() * 4 + 3, repeat: Infinity, delay: Math.random() * 3 }
      }}
    />
  );
};

const ParticleBackground = () => {
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100 + 100,
    size: Math.random() * 8 + 4,
    color: `hsla(${Math.random() * 60 + 250}, 80%, 70%, 0.3)`,
    rotate: Math.random() * 360
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: delay * 0.2, type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.03 }}
      className="p-4 rounded-xl backdrop-blur-sm bg-gray-900 bg-opacity-40 border border-gray-700 shadow-lg mb-4"
    >
      <div className="flex items-start">
        <div className="p-2 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
          <p className="mt-1 text-sm text-gray-300">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: FiZap,
      title: "AI-Powered Insights",
      description: "Real-time analytics with advanced neural networks"
    },
    {
      icon: FiShield,
      title: "Enterprise Security",
      description: "Military-grade encryption for your data"
    },
    {
      icon: FiCode,
      title: "Developer Tools",
      description: "Robust API and SDK integration"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log(data);
  
      if (response.ok) {
        // Save token or user data to localStorage or context
        localStorage.setItem('token', data.token);
        
        console.log('Login Success:', data);
  
        // Redirect to dashboard or homepage
        window.location.href = '/mainpage';
      } else {
        // Show error (You can use toast or alert)
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong. Try again!');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex bg-gray-950">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md z-10"
        >
          <div className="mb-10 text-center">
            <motion.h1 
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Welcome Back
            </motion.h1>
            <motion.p 
              className="mt-3 text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Sign in to your Unigen AI dashboard
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-500" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition bg-gray-900 text-gray-100 placeholder-gray-500 shadow-sm"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition bg-gray-900 text-gray-100 placeholder-gray-500 shadow-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="text-gray-400 hover:text-gray-200" />
                  ) : (
                    <FiEye className="text-gray-400 hover:text-gray-200" />
                  )}
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <Link href="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300">
                  Forgot password?
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-3 px-4 rounded-lg shadow-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition ${
                  isLoading ? 'bg-purple-700' : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                }`}
              >
                {isLoading ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="block h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <span className="flex items-center text-gray-100">
                    Sign In <FiArrowRight className="ml-2" />
                  </span>
                )}
              </button>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-400">
              New to Unigen?{' '}
              <Link href="/auth/signup" className="font-medium text-purple-400 hover:text-purple-300">
                Create an account
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* Subtle animated grid pattern */}
        <div className="absolute inset-0 -z-10 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAgMEg0MFY0MEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4xIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')]"></div>
        </div>
      </div>

      {/* Right side - Feature Showcase */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        <ParticleBackground />
        
        <motion.div 
          className="relative z-10 w-full max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <h2 className="text-5xl font-bold text-gray-100 mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Unigen</span> AI
            </h2>
            <motion.p 
              className="text-xl text-gray-300"
              key={currentFeature}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {features[currentFeature].description}
            </motion.p>
          </motion.div>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index}
              />
            ))}
          </div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                animate={{ width: ['0%', '100%'] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Floating animated elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-purple-900 opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-blue-900 opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>
    </div>
  );
}
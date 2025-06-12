'use client';
import { motion } from 'framer-motion';
import { SparklesIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30"></div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated sparkles icon */}
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mx-auto flex items-center justify-center h-16 w-16 mb-6"
            >
              <SparklesIcon className="h-12 w-12 text-cyan-400" />
            </motion.div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="block"
              >
                Transform Ideas into Reality
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-4"
              >
                with Unigen AI
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto"
            >
              The most advanced AI platform for creative professionals. Generate, enhance, and innovate at scale.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative rounded-md bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 transition-all duration-300"
              >
                <span className="absolute inset-0 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <Link href="/mainpage" className="relative flex items-center">
                  Get started
                  <ArrowRightIcon className="ml-2 h-4 w-4 transition-all group-hover:translate-x-1" />
                </Link>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group text-sm font-semibold leading-6 text-white"
              >
                <span className="relative">
                  Learn more
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating AI visualization */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-16 sm:mt-24"
        >
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 opacity-20 blur-lg"></div>
            <div className="relative rounded-2xl bg-gray-900/80 backdrop-blur-md border border-gray-800 overflow-hidden">
              <div className="h-96 w-full flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="relative inline-block">
                    <motion.div
                      animate={{ 
                        rotate: [0, 5, -5, 5, 0],
                        y: [0, -10, 10, -10, 0]
                      }}
                      transition={{ 
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute -inset-4 bg-cyan-500/10 rounded-full blur-md"
                    />
                    <div className="relative z-10 text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      AI · Creativity · Innovation
                    </div>
                  </div>
                  <p className="mt-6 text-gray-400 max-w-lg mx-auto">
                    Experience the future of creative work with our cutting-edge AI technology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
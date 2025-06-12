'use client'

import React from 'react'
import { ShieldCheck, Lock, Mail, Server, CreditCard, Cookie, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Introduction",
      content: "Welcome to Unigen AI. We respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information when you use our AI-powered interview platform."
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "Information We Collect",
      content: "We collect personal information (name, email, resume), interview data, and technical information (IP address, device details). For interviews, we may process camera/microphone data with your consent."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "How We Use Your Data",
      content: "Your information is used to provide interview services, improve our AI, personalize your experience, process payments (for premium users), and ensure platform security. We never sell your data."
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Data Sharing",
      content: "We only share data with trusted service providers and employers (with your consent). We may disclose information when required by law, but we'll always notify you when possible."
    },
    {
      icon: <Cookie className="w-6 h-6" />,
      title: "Cookies & Tracking",
      content: "We use cookies to enhance your experience, analyze traffic, and remember preferences. You can disable cookies in browser settings, but some features may not work properly."
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Your Rights",
      content: "You can access, correct, or delete your data. Opt out of marketing emails anytime. Contact us at privacy@unigen.ai to exercise your privacy rights under GDPR/CCPA."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </motion.p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 p-3 rounded-full bg-gradient-to-br from-blue-900/50 to-purple-900/50 group-hover:from-blue-900/70 group-hover:to-purple-900/70 transition-all">
                    {React.cloneElement(section.icon, {
                      className: "w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors"
                    })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-white mb-3 flex items-center">
                      {section.title}
                      <ChevronRight className="ml-2 w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all" />
                    </h2>
                    <p className="text-gray-400 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact & Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-20 rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-800/50 to-gray-900/70 p-8 text-center backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Your Privacy Matters
              </span>
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
              We implement industry-standard security measures including encryption, secure servers, and regular audits to protect your data.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {[
                { icon: "🔐", text: "End-to-end encryption" },
                { icon: "🚫", text: "No data selling" },
                { icon: "🛡️", text: "GDPR/CCPA compliant" },
                { icon: "🔒", text: "Regular security audits" },
                { icon: "📧", text: "privacy@unigen.ai" },
                { icon: "🔄", text: "Right to data access" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  className="bg-gray-800/50 hover:bg-gray-800/70 rounded-xl p-4 border border-gray-700 transition-all"
                >
                  <span className="text-xl mb-2 inline-block">{item.icon}</span>
                  <p className="text-gray-300">{item.text}</p>
                </motion.div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all"
            >
              Contact Our Privacy Team
              <Mail className="ml-2 w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 text-center text-gray-500 text-sm"
        >
          <p>By using Unigen AI, you acknowledge you've read and agree to this Privacy Policy.</p>
          <p className="mt-2">© {new Date().getFullYear()} Unigen AI. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, UserIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'; // Import icons

export default function Footer() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to a server)
        console.log(formData);
        alert('Feedback submitted! 🎉'); // Add an emoji to the alert
    };

    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-gray-900 py-16 text-center"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-center items-center mb-6">
                    <ChatBubbleLeftRightIcon className="h-8 w-8 text-cyan-400 mr-2" />
                    <h2 className="text-2xl font-semibold text-white">Feedback & Support 💬</h2>
                </div>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-300 mb-2 text-left flex items-center">
                            <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-300 mb-2 text-left flex items-center">
                            <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-gray-300 mb-2 text-left flex items-center">
                            <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-400 mr-2" />
                            Message
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-cyan-500 text-white py-3 rounded-md hover:bg-cyan-600 flex items-center justify-center"
                    >
                        Send Feedback 🚀
                    </button>
                </form>
                <div className="mt-8 text-gray-400">
                    <p>© {new Date().getFullYear()} Your Company. All rights reserved. ✨</p>
                </div>
            </div>
        </motion.footer>
    );
}
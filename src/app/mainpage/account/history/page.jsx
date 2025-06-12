// app/dashboard/account/history/page.jsx
'use client'

import { useAuth } from '@/app/context/AuthContext';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaImage, FaMusic, FaVideo, FaHistory, FaFileAlt } from 'react-icons/fa';

export default function UsageHistoryPage() {
  const { userData } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     console.log("datais",userData)
  
    const fetchUsageHistory = async () => {
      try {
        // In a real app, you would fetch from your API:
         const response = await fetch(`/api/users/fetch-history/${userData.id}`);
         const data = await response.json();
         setHistory(data?.history);

      console.log("Fetched history:", data.history);
        // const data = await response.json();
        
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Sample data - replace with your actual API response
        const sampleData = {
          history: [
            {
              toolType: 'Image Generation',
              details: '512x512 portrait using Stable Diffusion',
              time:"9:00 AM",
              day:"12 MAR 2025",
            },
            // {
            //   toolType: 'Audio',
            //   action: 'Generation',
            //   details: '30s music clip using Jukebox',
            //   timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
            // },
            // {
            //   toolType: 'Video',
            //   action: 'Upscale',
            //   details: '1080p to 4K using Topaz',
            //   timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() // 2 days ago
            // },
            // {
            //   toolType: 'Document',
            //   action: 'Summarization',
            //   details: '10-page PDF summarized using GPT-4',
            //   timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString() // 3 days ago
            // },
            // {
            //   toolType: 'Image',
            //   action: 'Edit',
            //   details: 'Background removal on product photo',
            //   timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString() // 4 days ago
            // },
            // {
            //   toolType: 'Audio',
            //   action: 'Transcription',
            //   details: '5 minute meeting recording',
            //   timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString() // 5 days ago
            // }
          ]
        };
        
        // setHistory(sampleData.history);
      } catch (error) {
        console.error('Failed to fetch usage history:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userData?.email) {
      fetchUsageHistory();
    } else {
      // If no user data, just show sample data after delay
      fetchUsageHistory();
    }
  }, [userData]);

  const getToolIcon = (toolType) => {
    switch (toolType.toLowerCase()) {
      case 'image generation':
        return <FaImage className="text-purple-500" size={18} />;
      case 'video generation':
        return <FaVideo className="text-blue-500" size={18} />;
      case 'audio generation':
        return <FaMusic className="text-green-500" size={18} />;
      case 'code generation':
        return <FaFileAlt className="text-yellow-500" size={18} />;
      default:
        return <FaHistory className="text-gray-500" size={18} />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/mainpage/account" className="mr-4 hover:bg-slate-800/50 p-2 rounded-full transition">
          <FaArrowLeft size={18} />
        </Link>
        <h1 className="text-2xl font-bold">Usage History</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : history.length === 0 ? (
        <div className="text-center py-12">
          <FaHistory className="mx-auto text-4xl text-gray-500 mb-4" />
          <p className="text-xl">No usage history found</p>
          <p className="text-gray-400 mt-2">Your AI tool usage will appear here</p>
        </div>
      ) : (
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700/50">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Tool</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {history.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-700/30 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-slate-700/50">
                          {getToolIcon(item.toolType)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium capitalize">{item.toolType.toLowerCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm capitalize">{item.time.toLowerCase()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-300 max-w-xs truncate">{item.details}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        {item.day}
                        {/* {new Date(item.timestamp).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })} */}
                        {/* <div className="text-xs text-slate-400">
                          {new Date(item.timestamp).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination would go here */}
          <div className="mt-6 flex justify-between items-center text-sm text-slate-400">
            <button className="px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700/70 disabled:opacity-50 disabled:cursor-not-allowed transition" disabled>
              Previous
            </button>
            <span>Page 1 of 1</span>
            <button className="px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700/70 disabled:opacity-50 disabled:cursor-not-allowed transition" disabled>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
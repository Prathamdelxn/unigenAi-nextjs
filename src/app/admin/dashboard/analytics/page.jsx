'use client'
import React, { useState } from 'react';
import { FiBarChart2, FiDollarSign, FiDownload, FiFilter, FiRefreshCw, FiTrendingUp, FiUsers, FiPieChart } from 'react-icons/fi';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function RevenueAnalysis() {
  const [darkMode, setDarkMode] = useState(true);
  const [timeRange, setTimeRange] = useState('monthly');
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data for 4 plans
  const monthlyRevenueData = [
    { name: 'Jan', basic: 4200, lite: 6800, pro: 11500, advanced: 18900, total: 41400 },
    { name: 'Feb', basic: 3800, lite: 7200, pro: 12800, advanced: 21000, total: 44800 },
    { name: 'Mar', basic: 4500, lite: 7500, pro: 13200, advanced: 22500, total: 47700 },
    { name: 'Apr', basic: 5100, lite: 8200, pro: 14500, advanced: 24800, total: 52600 },
    { name: 'May', basic: 4900, lite: 8800, pro: 15800, advanced: 27200, total: 56700 },
    { name: 'Jun', basic: 5300, lite: 9100, pro: 16800, advanced: 29500, total: 60700 },
    { name: 'Jul', basic: 5600, lite: 9500, pro: 17500, advanced: 31200, total: 63800 },
  ];

  const planDistributionData = [
    { name: 'Basic', value: 25, revenue: 5600, color: '#8884d8' },
    { name: 'Lite', value: 30, revenue: 9500, color: '#83a6ed' },
    { name: 'Pro', value: 35, revenue: 17500, color: '#8dd1e1' },
    { name: 'Advanced', value: 10, revenue: 31200, color: '#82ca9d' },
  ];

  const recentTransactions = [
    { id: 1, user: 'John Doe', plan: 'Advanced', amount: 299, date: '2023-07-15', status: 'completed' },
    { id: 2, user: 'Jane Smith', plan: 'Pro', amount: 99, date: '2023-07-14', status: 'completed' },
    { id: 3, user: 'Robert Johnson', plan: 'Lite', amount: 49, date: '2023-07-14', status: 'completed' },
    { id: 4, user: 'Emily Davis', plan: 'Basic', amount: 19, date: '2023-07-13', status: 'refunded' },
    { id: 5, user: 'Michael Brown', plan: 'Pro', amount: 99, date: '2023-07-12', status: 'completed' },
  ];

  // Calculate summary metrics
  const totalRevenue = monthlyRevenueData.reduce((sum, month) => sum + month.total, 0);
  const currentMonth = monthlyRevenueData[monthlyRevenueData.length - 1];
  const prevMonth = monthlyRevenueData[monthlyRevenueData.length - 2];
  const growthRate = ((currentMonth.total - prevMonth.total) / prevMonth.total * 100).toFixed(1);

  // Plan-specific metrics
  const planMetrics = [
    { name: 'Basic', revenue: currentMonth.basic, users: 320, churn: 1.8, color: '#8884d8' },
    { name: 'Lite', revenue: currentMonth.lite, users: 450, churn: 1.2, color: '#83a6ed' },
    { name: 'Pro', revenue: currentMonth.pro, users: 380, churn: 0.8, color: '#8dd1e1' },
    { name: 'Advanced', revenue: currentMonth.advanced, users: 150, churn: 0.5, color: '#82ca9d' },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Subscription Revenue</h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Analytics for Basic, Lite, Pro, and Advanced plans
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
            <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
              <FiDownload className="text-sm" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm mb-6`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <FiFilter />
              <span>Time Range:</span>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className={`px-3 py-1 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border`}
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div className="flex space-x-1">
              <button className={`px-3 py-1 rounded-lg ${timeRange === 'weekly' ? (darkMode ? 'bg-indigo-600' : 'bg-indigo-100 text-indigo-800') : ''}`}>
                1W
              </button>
              <button className={`px-3 py-1 rounded-lg ${timeRange === 'monthly' ? (darkMode ? 'bg-indigo-600' : 'bg-indigo-100 text-indigo-800') : ''}`}>
                1M
              </button>
              <button className={`px-3 py-1 rounded-lg ${timeRange === 'quarterly' ? (darkMode ? 'bg-indigo-600' : 'bg-indigo-100 text-indigo-800') : ''}`}>
                3M
              </button>
              <button className={`px-3 py-1 rounded-lg ${timeRange === 'yearly' ? (darkMode ? 'bg-indigo-600' : 'bg-indigo-100 text-indigo-800') : ''}`}>
                1Y
              </button>
              <button className={`px-3 py-1 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <FiRefreshCw />
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex justify-between">
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Revenue</p>
                <p className="text-2xl font-semibold mt-1">₹{totalRevenue.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  {/* <FiTrendingUp className="text-green-500 mr-1" /> */}
                  {/* <span className="text-sm text-green-600 dark:text-green-400">{growthRate}% growth</span> */}
                </div>
              </div>
              <div className={`h-12 w-12 rounded-lg ${darkMode ? 'bg-green-900' : 'bg-green-100'} flex items-center justify-center`}>
                <FiDollarSign className={`text-xl ${darkMode ? 'text-green-300' : 'text-green-600'}`} />
              </div>
            </div>
          </div>

          {planMetrics.map((plan) => (
            <div key={plan.name} className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="flex justify-between">
                <div>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{plan.name} Plan</p>
                  <p className="text-2xl font-semibold mt-1">₹{plan.revenue.toLocaleString()}</p>
                  <div className="flex justify-between text-xs mt-1">
                    {/* <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{plan.users} users</span> */}
                    {/* <span className="text-red-500">Churn: {plan.churn}%</span> */}
                  </div>
                </div>
                <div className={`h-12 w-12 rounded-lg flex items-center justify-center`} style={{ backgroundColor: darkMode ? `${plan.color}20` : `${plan.color}20` }}>
                  <FiUsers className={`text-xl`} style={{ color: plan.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-4 font-medium ${activeTab === 'overview' ? (darkMode ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-indigo-600 border-b-2 border-indigo-600') : (darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700')}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`py-2 px-4 font-medium ${activeTab === 'plans' ? (darkMode ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-indigo-600 border-b-2 border-indigo-600') : (darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700')}`}
          >
            Plan Analytics
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`py-2 px-4 font-medium ${activeTab === 'transactions' ? (darkMode ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-indigo-600 border-b-2 border-indigo-600') : (darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700')}`}
          >
            Recent Transactions
          </button>
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === 'overview' && (
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <h2 className="text-lg font-semibold mb-4">Revenue by Plan</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyRevenueData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#4B5563' : '#E5E7EB'} />
                    <XAxis dataKey="name" stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
                    <YAxis stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
                    <Tooltip 
                      contentStyle={darkMode ? { backgroundColor: '#1F2937', borderColor: '#374151' } : {}}
                      labelStyle={darkMode ? { color: '#F3F4F6' } : {}}
                    />
                    <Area type="monotone" dataKey="basic" stackId="1" name="Basic" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="lite" stackId="1" name="Lite" stroke="#83a6ed" fill="#83a6ed" />
                    <Area type="monotone" dataKey="pro" stackId="1" name="Pro" stroke="#8dd1e1" fill="#8dd1e1" />
                    <Area type="monotone" dataKey="advanced" stackId="1" name="Advanced" stroke="#82ca9d" fill="#82ca9d" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'plans' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <h2 className="text-lg font-semibold mb-4">User Distribution by Plan</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={planDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {planDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={darkMode ? { backgroundColor: '#1F2937', borderColor: '#374151' } : {}}
                        labelStyle={darkMode ? { color: '#F3F4F6' } : {}}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <h2 className="text-lg font-semibold mb-4">Revenue Distribution by Plan</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={planDistributionData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#4B5563' : '#E5E7EB'} />
                      <XAxis dataKey="name" stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
                      <YAxis stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
                      <Tooltip 
                        contentStyle={darkMode ? { backgroundColor: '#1F2937', borderColor: '#374151' } : {}}
                        labelStyle={darkMode ? { color: '#F3F4F6' } : {}}
                      />
                      <Bar dataKey="revenue" name="Revenue (₹)">
                        {planDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className={`rounded-xl shadow-sm overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Transaction
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Plan
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    {recentTransactions.map((txn) => {
                      const planColor = planDistributionData.find(p => p.name === txn.plan)?.color || '#8884d8';
                      return (
                        <tr key={txn.id} className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">#{txn.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{txn.user}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="inline-flex items-center">
                              <span 
                                className="w-3 h-3 rounded-full mr-2" 
                                style={{ backgroundColor: planColor }}
                              ></span>
                              {txn.plan}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">₹{txn.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{txn.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              txn.status === 'completed' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}>
                              {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
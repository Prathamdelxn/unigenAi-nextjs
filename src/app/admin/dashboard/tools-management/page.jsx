
// 'use client'
// import React, { useEffect, useState } from 'react';
// import { FiActivity, FiCode, FiDatabase, FiEye, FiFilter, FiPlus, FiSearch, FiSettings, FiTrendingUp, FiUsers } from 'react-icons/fi';

// export default function ToolsManagement() {
//   const [darkMode, setDarkMode] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [userCount,setCount]=useState();
//    const [tools, setTools] = useState([]);
// const userscount=async()=>{

//   try{

//     const res = await fetch("/api/user-count");

//     const data= await res.json();
//     console.log("asdf",data);
   
//     setCount(data)
//     setTools([
//     {
//       id: 1,
//       name: 'Image Generator',
//       description: 'Advanced AI text generation with GPT-4 technology',
//       category: 'generative',
//       usageCount: `${userCount?.imageTotal}`,
//       activeUsers: `${userCount?.totalUsers}`,
//       status: 'active',
//       lastUpdated: '2023-11-15'
//     },
//     {
//       id: 2,
//       name: 'Video Creator',
//       description: 'Create stunning images from text prompts using Stable Diffusion',
//       category: 'generative',
//       usageCount: `${userCount?.videoTotal}`,
//       activeUsers: `${userCount?.totalUsers}`,
//       status: 'active',
//       lastUpdated: '2023-11-10'
//     },
//     {
//       id: 3,
//       name: 'Code Assistant',
//       description: 'AI-powered coding companion with multi-language support',
//       category: 'developer',
//       usageCount: `${userCount?.codeTotal}`,
//       activeUsers: `${userCount?.totalUsers}`,
//       status: 'active',
//       lastUpdated: '2023-11-05'
//     },
//     {
//       id: 4,
//       name: 'Audio Generator',
//       description: 'Automated data analysis and visualization tool',
//       category: 'analytics',
//       usageCount: `${userCount?.audioTotal}`,
//       activeUsers: `${userCount?.totalUsers}`,
//       status: 'active',
//       lastUpdated: '2023-10-28'
//     },
//     {
//       id: 5,
//       name: 'Mock Interview',
//       description: 'Natural sounding text-to-speech with multiple voices',
//       category: 'audio',
//       usageCount: `${userCount?.audioTotal}`,
//       activeUsers: `${userCount?.totalUsers}`,
//       status: 'active',
//       lastUpdated: '2023-10-20'
//     },
//   ])

//   }catch(err){
//     console.log("Internal Server error")

//   }

// }
// useEffect(()=>{

//   userscount();


// },[])
//  console.log(userCount)
//   // Sample AI tools data
 

//   // Filter tools based on search and active filter
//   const filteredTools = tools.filter(tool => {
//     const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
//                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesFilter = activeFilter === 'all' || tool.category === activeFilter || tool.status === activeFilter;
//     return matchesSearch && matchesFilter;
//   });

//   // Categories for filtering
//   const categories = [
//     { id: 'all', name: 'All Tools' },
//     { id: 'generative', name: 'Generative AI' },
//     { id: 'developer', name: 'Developer Tools' },
//     { id: 'analytics', name: 'Analytics' },
//     { id: 'audio', name: 'Audio Processing' },
//   ];

//   // Status options
//   const statusOptions = [
//     { id: 'active', name: 'Active' },
//     { id: 'maintenance', name: 'Maintenance' },
//     { id: 'beta', name: 'Beta Testing' },
//   ];

//   // Add new tool (placeholder function)
//   const addNewTool = () => {
//     // In a real app, this would open a modal/form
//     console.log('Add new tool clicked');
//   };

//   return (
//     <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold mb-2">AI Tools Management</h1>
//             <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//               Manage and monitor your Unigen AI tools and their usage
//             </p>
//           </div>
         
//         </div>

//         {/* Stats Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
//             <div className="flex justify-between">
//               <div>
//                 <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Tools</p>
//                 <p className="text-2xl font-semibold mt-1">{tools.length}</p>
//               </div>
//               <div className={`h-12 w-12 rounded-lg ${darkMode ? 'bg-indigo-900' : 'bg-indigo-100'} flex items-center justify-center`}>
//                 <FiCode className={`text-xl ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`} />
//               </div>
//             </div>
//           </div>

//           <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
//             <div className="flex justify-between">
//               <div>
//                 <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Usage</p>
//                 <p className="text-2xl font-semibold mt-1">
//                   {tools.reduce((sum, tool) => sum + tool.usageCount, 0).toLocaleString()}
//                 </p>
//               </div>
//               <div className={`h-12 w-12 rounded-lg ${darkMode ? 'bg-green-900' : 'bg-green-100'} flex items-center justify-center`}>
//                 <FiTrendingUp className={`text-xl ${darkMode ? 'text-green-300' : 'text-green-600'}`} />
//               </div>
//             </div>
//           </div>

//           <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
//             <div className="flex justify-between">
//               <div>
//                 <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Active Users</p>
//                 <p className="text-2xl font-semibold mt-1">
//                   {tools.reduce((sum, tool) => sum + tool.activeUsers, 0).toLocaleString()}
//                 </p>
//               </div>
//               <div className={`h-12 w-12 rounded-lg ${darkMode ? 'bg-blue-900' : 'bg-blue-100'} flex items-center justify-center`}>
//                 <FiUsers className={`text-xl ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
//               </div>
//             </div>
//           </div>

//           <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
//             <div className="flex justify-between">
//               <div>
//                 <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Most Used Tool</p>
//                 <p className="text-xl font-semibold mt-1 truncate">
//                   {tools.reduce((prev, current) => (prev.usageCount > current.usageCount) ? prev : current).name}
//                 </p>
//               </div>
//               <div className={`h-12 w-12 rounded-lg ${darkMode ? 'bg-purple-900' : 'bg-purple-100'} flex items-center justify-center`}>
//                 <FiActivity className={`text-xl ${darkMode ? 'text-purple-300' : 'text-purple-600'}`} />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Controls */}
//         <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm mb-8`}>
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//             <div className={`relative w-full md:w-64 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//               <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2" />
//               <input
//                 type="text"
//                 placeholder="Search tools..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className={`w-full pl-10 pr-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//               />
//             </div>

//             <div className="flex flex-wrap gap-2">
//               <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                 <FiFilter className="mr-2" />
//                 <select
//                   value={activeFilter}
//                   onChange={(e) => setActiveFilter(e.target.value)}
//                   className={`px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                 >
//                   <option value="all">All Categories</option>
//                   {categories.map(cat => (
//                     <option key={cat.id} value={cat.id}>{cat.name}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                 <select
//                   className={`px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                 >
//                   <option value="">All Statuses</option>
//                   {statusOptions.map(status => (
//                     <option key={status.id} value={status.id}>{status.name}</option>
//                   ))}
//                 </select>
//               </div>

//               <button
//                 onClick={addNewTool}
//                 className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
//               >
//                 <FiPlus className="text-sm" />
//                 <span>Add Tool</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Tools Table */}
//         <div className={`rounded-xl shadow-sm overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//               <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                     Tool Name
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                     Description
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                     Usage Count
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                     Active Users
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
//                 {filteredTools.map((tool) => (
//                   <tr key={tool.id} className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className={`flex-shrink-0 h-10 w-10 rounded-lg ${darkMode ? 'bg-indigo-900' : 'bg-indigo-100'} flex items-center justify-center mr-3`}>
//                           <FiCode className={darkMode ? 'text-indigo-300' : 'text-indigo-600'} />
//                         </div>
//                         <div>
//                           <div className="font-medium">{tool.name}</div>
//                           <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{tool.category}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{tool.description}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="font-medium">{tool.usageCount.toLocaleString()}</div>
//                       <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Last updated: {tool.lastUpdated}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="font-medium">{tool.activeUsers.toLocaleString()}</div>
//                       <div className="text-xs text-indigo-600 dark:text-indigo-400">
//                         +{Math.floor(tool.activeUsers / tool.usageCount * 100)}% engagement
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         tool.status === 'active' 
//                           ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
//                           : tool.status === 'maintenance' 
//                             ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
//                             : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
//                       }`}>
//                         {tool.status.charAt(0).toUpperCase() + tool.status.slice(1)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <button className={`mr-3 ${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-900'}`}>
//                         <FiEye />
//                       </button>
//                       <button className={`mr-3 ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}`}>
//                         <FiSettings />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Empty state */}
//         {filteredTools.length === 0 && (
//           <div className={`p-12 text-center rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm mt-6`}>
//             <FiDatabase className={`mx-auto h-12 w-12 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
//             <h3 className={`mt-2 text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>No tools found</h3>
//             <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//               Try adjusting your search or filter to find what you're looking for.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

'use client'
import React, { useEffect, useState } from 'react';
import { FiActivity, FiCode, FiDatabase, FiEye, FiFilter, FiPlus, FiSearch, FiSettings, FiTrendingUp, FiUsers } from 'react-icons/fi';

export default function ToolsManagement() {
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [userCount, setCount] = useState(null);
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  const userscount = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/user-count");
      const data = await res.json();
      console.log("API response:", data);
      setCount(data);
    } catch (err) {
      console.log("Internal Server error", err);
    } finally {
      setLoading(false);
    }
  };

  // Initialize tools when userCount is loaded
  useEffect(() => {
    if (userCount) {
      setTools([
        {
          id: 1,
          name: 'Image Generator',
          description: 'Advanced AI text generation with GPT-4 technology',
          category: 'generative',
          usageCount: userCount.imageTotal || 0,
          activeUsers: userCount.totalUsers || 0,
          status: 'active',
          lastUpdated: '2023-11-15'
        },
        {
          id: 2,
          name: 'Video Creator',
          description: 'Create stunning images from text prompts using Stable Diffusion',
          category: 'generative',
          usageCount: userCount.videoTotal || 0,
          activeUsers: userCount.totalUsers || 0,
          status: 'active',
          lastUpdated: '2023-11-10'
        },
        {
          id: 3,
          name: 'Code Assistant',
          description: 'AI-powered coding companion with multi-language support',
          category: 'developer',
          usageCount: userCount.codeTotal || 0,
          activeUsers: userCount.totalUsers || 0,
          status: 'active',
          lastUpdated: '2023-11-05'
        },
        {
          id: 4,
          name: 'Audio Generator',
          description: 'Automated data analysis and visualization tool',
          category: 'analytics',
          usageCount: userCount.audioTotal || 0,
          activeUsers: userCount.totalUsers || 0,
          status: 'active',
          lastUpdated: '2023-10-28'
        },
        {
          id: 5,
          name: 'Mock Interview',
          description: 'Natural sounding text-to-speech with multiple voices',
          category: 'audio',
          usageCount: userCount.interviewTotal || userCount.audioTotal || 0,
          activeUsers: userCount.totalUsers || 0,
          status: 'active',
          lastUpdated: '2023-10-20'
        },
      ]);
    }
  }, [userCount]);

  useEffect(() => {
    userscount();
  }, []);

  // Filter tools based on search and active filter
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || tool.category === activeFilter || tool.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Tools' },
    { id: 'generative', name: 'Generative AI' },
    { id: 'developer', name: 'Developer Tools' },
    { id: 'analytics', name: 'Analytics' },
    { id: 'audio', name: 'Audio Processing' },
  ];

  // Status options
  const statusOptions = [
    { id: 'active', name: 'Active' },
    { id: 'maintenance', name: 'Maintenance' },
    { id: 'beta', name: 'Beta Testing' },
  ];

  // Add new tool (placeholder function)
  const addNewTool = () => {
    // In a real app, this would open a modal/form
    console.log('Add new tool clicked');
  };

  // Calculate totals safely
  const totalUsage = tools.reduce((sum, tool) => sum + (tool.usageCount || 0), 0);
  const totalActiveUsers = userCount?.totalUsers || 0;
  const mostUsedTool = tools.length > 0 
    ? tools.reduce((prev, current) => ((prev.usageCount || 0) > (current.usageCount || 0)) ? prev : current)
    : null;

  // Loading state
  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading tools data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">AI Tools Management</h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage and monitor your Unigen AI tools and their usage
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex justify-between">
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Tools</p>
                <p className="text-2xl font-semibold mt-1">{tools.length}</p>
              </div>
              <div className={`h-12 w-12 rounded-lg ${darkMode ? 'bg-indigo-900' : 'bg-indigo-100'} flex items-center justify-center`}>
                <FiCode className={`text-xl ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`} />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex justify-between">
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Usage</p>
                <p className="text-2xl font-semibold mt-1">
                  {totalUsage.toLocaleString()}
                </p>
              </div>
              <div className={`h-12 w-12 rounded-lg ${darkMode ? 'bg-green-900' : 'bg-green-100'} flex items-center justify-center`}>
                <FiTrendingUp className={`text-xl ${darkMode ? 'text-green-300' : 'text-green-600'}`} />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex justify-between">
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Active Users</p>
                <p className="text-2xl font-semibold mt-1">
                  {totalActiveUsers.toLocaleString()}
                </p>
              </div>
              <div className={`h-12 w-12 rounded-lg ${darkMode ? 'bg-blue-900' : 'bg-blue-100'} flex items-center justify-center`}>
                <FiUsers className={`text-xl ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex justify-between">
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Most Used Tool</p>
                <p className="text-xl font-semibold mt-1 truncate">
                  {mostUsedTool ? mostUsedTool.name : 'N/A'}
                </p>
              </div>
              <div className={`h-12 w-12 rounded-lg ${darkMode ? 'bg-purple-900' : 'bg-purple-100'} flex items-center justify-center`}>
                <FiActivity className={`text-xl ${darkMode ? 'text-purple-300' : 'text-purple-600'}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm mb-8`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className={`relative w-full md:w-64 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <FiFilter className="mr-2" />
                <select
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                  className={`px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <select
                  className={`px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                >
                  <option value="">All Statuses</option>
                  {statusOptions.map(status => (
                    <option key={status.id} value={status.id}>{status.name}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={addNewTool}
                className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <FiPlus className="text-sm" />
                <span>Add Tool</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tools Table */}
        <div className={`rounded-xl shadow-sm overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Tool Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Usage Count
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Active Users
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                {filteredTools.map((tool) => (
                  <tr key={tool.id} className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-10 w-10 rounded-lg ${darkMode ? 'bg-indigo-900' : 'bg-indigo-100'} flex items-center justify-center mr-3`}>
                          <FiCode className={darkMode ? 'text-indigo-300' : 'text-indigo-600'} />
                        </div>
                        <div>
                          <div className="font-medium">{tool.name}</div>
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{tool.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{tool.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{(tool.usageCount || 0).toLocaleString()}</div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Last updated: {tool.lastUpdated}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{(tool.activeUsers || 0).toLocaleString()}</div>
                      <div className="text-xs text-indigo-600 dark:text-indigo-400">
                        {tool.usageCount > 0 ? `+${Math.floor((tool.activeUsers || 0) / (tool.usageCount || 1) * 100)}% engagement` : 'No data'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        tool.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : tool.status === 'maintenance' 
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {tool.status.charAt(0).toUpperCase() + tool.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className={`mr-3 transition-colors duration-200 ${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-900'}`}>
                        <FiEye />
                      </button>
                      <button className={`mr-3 transition-colors duration-200 ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}`}>
                        <FiSettings />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty state */}
        {filteredTools.length === 0 && !loading && (
          <div className={`p-12 text-center rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm mt-6`}>
            <FiDatabase className={`mx-auto h-12 w-12 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <h3 className={`mt-2 text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>No tools found</h3>
            <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// import { FiMenu, FiX, FiUsers, FiFolder, FiSettings, FiPieChart, FiCalendar, FiBell } from 'react-icons/fi';
// export default function DashboardPage() {
//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard 
//           title="Total Users" 
//           value="1,248" 
//           change="+12.5%" 
//           icon={<FiUsers className="text-indigo-500" />}
//         />
//         <StatCard 
//           title="Active Tools" 
//           value="04" 
//           change="" 
//           icon={<FiFolder className="text-green-500" />}
//         />
//         <StatCard 
//           title="Total Usage" 
//           value="1,024" 
//           change="+28%" 
//           icon={<FiPieChart className="text-blue-500" />}
//         />
//         <StatCard 
//           title="Revenue" 
//           value="$24,800" 
//           change="+18.2%" 
//           icon={<FiPieChart className="text-purple-500" />}
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm lg:col-span-2">
//           <h2 className="text-lg font-semibold mb-4 dark:text-white">Project Timeline</h2>
//           <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
//             <p className="text-gray-500 dark:text-gray-400">Project Timeline Chart</p>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
//           <h2 className="text-lg font-semibold mb-4 dark:text-white">Recent Activity</h2>
//           <div className="space-y-4">
//             {[1, 2, 3, 4].map((item) => (
//               <div key={item} className="flex items-start">
//                 <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
//                   <FiUsers className="text-indigo-500 dark:text-indigo-300" />
//                 </div>
//                 <div>
//                   <p className="font-medium dark:text-gray-200">New user registered</p>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
//         <h2 className="text-lg font-semibold mb-4 dark:text-white">Admin Management</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//             <thead className="bg-gray-50 dark:bg-gray-700">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//               {users.map((user) => (
//                 <tr key={user.id}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">{user.name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.role}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
//                       {user.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }



// const users = [
//   { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
//   { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', status: 'Active' },
//   { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Designer', status: 'Inactive' },
//   { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'Manager', status: 'Active' },
// ];

// function StatCard({ title, value, change, icon }) {
//   return (
//     <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
//       <div className="flex justify-between">
//         <div>
//           <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
//           <p className="text-2xl font-semibold mt-1 dark:text-white">{value}</p>
//           <p className={`text-sm ${change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} mt-1`}>{change}</p>
//         </div>
//         <div className="h-12 w-12 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// }

'use client'

import { useState ,useEffect} from 'react';
import { FiMenu, FiX, FiUsers, FiFolder, FiSettings, FiPieChart, FiCalendar, FiBell, FiPlus, FiDelete } from 'react-icons/fi';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export default function DashboardPage() {
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [usercounts,setCount]=useState();
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'New Users',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(99, 102, 241, 0.6)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly User Registrations',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };


const userscount=async()=>{

  try{

    const res = await fetch("/api/user-count");

    const data= await res.json();
    console.log("asdf",data);
    setCount(data)

  }catch(err){
    console.log("Internal Server error")

  }

}

  // In your useEffect where you fetch admins, also fetch chart data
  useEffect(() => {
    userscount();
    const fetchChartData = async () => {
      // try {
      //   const res = await fetch('/api/admin/user-registrations');
      //   const data = await res.json();
        
      //   if (data.success) {
      //     setChartData({
      //       labels: data.data.months,
      //       datasets: [
      //         {
      //           label: 'New Users',
      //           data: data.data.counts,
      //           backgroundColor: 'rgba(99, 102, 241, 0.6)',
      //           borderColor: 'rgba(99, 102, 241, 1)',
      //           borderWidth: 1,
      //         },
      //       ],
      //     });
      //   }
      // } catch (err) {
      //   console.log('Error fetching chart data:');
      // }
    };

    fetchChartData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend API
    console.log('New admin:', newAdmin);

    try {
      const res = await fetch('/api/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAdmin),
      });

      const data = await res.json();

      if (data.success) {
        alert('Admin added successfully!');
       
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
      console.error(err);
    }
    
    // For demo purposes, we'll just add it to the users array
    const newUser = {
      id: users.length + 1,
      name: newAdmin.name,
      email: newAdmin.email,
      role: 'Admin',
      status: 'Active'
    };
    users.unshift(newUser);
    
    // Reset form and close
    setNewAdmin({ name: '', email: '', password: '' });
    setShowAdminForm(false);
  };


  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await fetch('/api/admin/fetch-admin');
        const data = await res.json();
        console.log(data.data)
        if (data.success) {
          setUsers(data.data); // assuming API response contains { success: true, admins: [...] }
        } else {
          console.error('Failed to fetch admins:', data.message);
        }
      } catch (err) {
        console.error('Error fetching admins:', err);
      }
    };
  
    fetchAdmins();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/admin/delete-by-id/${id}`, {
        method: 'DELETE',
      });
  
      const data = await response.json();
  
      if (data.success) {
        alert('Admin deleted successfully!');
        
        // Remove the deleted admin from the users list locally to reflect the change
        setUsers((prevUsers) => prevUsers.filter(user => user._id !== id));
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
      console.error(err);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Existing stat cards and other components... */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value={usercounts?.totalUsers} 
          change="+12.5%" 
          icon={<FiUsers className="text-indigo-500" />}
        />
        <StatCard 
          title="Active Tools" 
          value="04" 
          change="" 
          icon={<FiFolder className="text-green-500" />}
        />
        <StatCard 
          title="Total Usage" 
          value={usercounts?.grandTotal} 
          change="+28%" 
          icon={<FiPieChart className="text-blue-500" />}
        />
        <StatCard 
          title="Revenue" 
          value="₹ 00" 
          change="+18.2%" 
          icon={<FiPieChart className="text-purple-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">User Registrations</h2>
          <div className="h-80">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                  <FiUsers className="text-indigo-500 dark:text-indigo-300" />
                </div>
                <div>
                  <p className="font-medium dark:text-gray-200">New user registered</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold dark:text-white">Admin Management</h2>
          <button
            onClick={() => setShowAdminForm(true)}
            className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            <FiPlus className="text-sm" />
            <span>Add Admin</span>
          </button>
        </div>

        {/* New Admin Form Modal */}
        {showAdminForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold dark:text-white">Register New Admin</h3>
                <button 
                  onClick={() => setShowAdminForm(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <FiX size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newAdmin.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newAdmin.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={newAdmin.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    required
                    minLength="6"
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAdminForm(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                  >
                    Register Admin
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user,index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200 capitalize">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Admin</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className='px-6 text-red-500 cursor-pointer' onClick={() => handleDelete(user._id)}>delete</td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


function StatCard({ title, value, change, icon }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-semibold mt-1 dark:text-white">{value}</p>
          {/* <p className={`text-sm ${change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} mt-1`}>{change}</p> */}
        </div>
        <div className="h-12 w-12 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}
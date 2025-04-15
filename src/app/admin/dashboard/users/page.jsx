'use client';
import { useEffect, useState } from 'react';
import { FiEdit2, FiTrash2, FiSearch, FiPlus } from 'react-icons/fi';
import { FaUser, FaCrown, FaUserTie, FaUserAlt } from 'react-icons/fa';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/users/fetch-users", {
          method: 'GET'
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Fetched users:", data.data);
        
        // Map the API response data to your users state
        setUsers(data.data || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching users:", error.message);
        setError("Failed to load users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (userId) => {
    console.log("Deleting user with ID:", userId);
  
    try {
      const res = await fetch(`/api/users/delete-user/${userId}`, {
        method: 'DELETE',
      });
  
      const data = await res.json();
  
      if (res.ok) {
       alert("deleted Successfully");
        // Update UI only if delete was successful
        setUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));
        console.log("User deleted:", data.user);
      } else {
        console.error("Failed to delete user:", data.message);
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
      alert("Something went wrong while deleting the user.");
    }
  };
  

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  // const handleSave = async (updatedUser) => {
  //   // Here you would typically make an API call to update the user
  //   // For now, we'll just update the local state

  //   const response = await fetch(`http://localhost:3000/api/users/update-users/${updatedUser._id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       name: updatedUser.name,
  //       email: updatedUser.email,
  //       plan: updatedUser.plan,
  //       imageGenerator: updatedUser.imageGenerator || 0,
  //       videoGenerator: updatedUser.videoGenerator || 0,
  //       audioGenerator: updatedUser.audioGenerator || 0,
  //       codeGenerator: updatedUser.codeGenerator || 0
  //     }),
  //   });

  //   const data = await response.json();
  //   setUsers(users.map(user => 
  //     user._id === updatedUser._id ? updatedUser : user
  //   ));
  //   setIsEditModalOpen(false);
  // };


  const handleSave = async (updatedUser) => {
   console.log(updatedUser);
    try {
      const response = await fetch(`/api/users/update-users/${updatedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: updatedUser.name,
          email: updatedUser.email,
          plan: updatedUser.plan,
          imageGenerator: updatedUser.imageGenerator,
          videoGenerator: updatedUser.videoGenerator,
          audioGenerator: updatedUser.audioGenerator,
          codeGenerator: updatedUser.codeGenerator,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the local state with the updated user
        setUsers(users.map(user => 
          user._id === updatedUser._id ? data.user : user
        ));
        alert("User updated successfully");
        setIsEditModalOpen(false);
      } else {
        console.error("Failed to update user:", data.message);
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Something went wrong while updating the user.");
    } finally {
 
    }
  };


  const getPlanIcon = (plan) => {
    switch(plan) {
      case 'Premium': return <FaCrown className="text-yellow-500" />;
      case 'Pro': return <FaUserTie className="text-blue-500" />;
      default: return <FaUserAlt className="text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold dark:text-white">User Management</h1>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
          <FiPlus /> Add User
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Features</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                          <FaUser className="text-indigo-600 dark:text-indigo-300" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getPlanIcon(user.plan)}
                        <span className="text-sm text-gray-900 dark:text-white capitalize">{user.plan}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${user.imageGenerator > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                          Images: {user.imageGenerator}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${user.videoGenerator > 0 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                          Videos: {user.videoGenerator}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${user.audioGenerator > 0 ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                          Audio: {user.audioGenerator}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${user.codeGenerator > 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                          Code: {user.codeGenerator}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(user)}
                          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 p-1 rounded-full hover:bg-indigo-50 dark:hover:bg-gray-700"
                        >
                          <FiEdit2 />
                        </button>
                        <button 
                          onClick={() => handleDelete(user._id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 p-1 rounded-full hover:bg-red-50 dark:hover:bg-gray-700"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    {searchTerm ? 'No users found matching your search.' : 'No users found. Add a user to get started.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 dark:text-white">Edit User</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={editingUser?.name || ''}
                    onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={editingUser?.email || ''}
                    onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Plan</label>
                  <select
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={editingUser?.plan || ''}
                    onChange={(e) => setEditingUser({...editingUser, plan: e.target.value})}
                  >
                    <option value="Basic">Basic</option>
                    <option value="Pro">Pro</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image Generator</label>
                    <input
                      type="number"
                      min="0"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={editingUser?.imageGenerator || 0}
                      onChange={(e) => setEditingUser({...editingUser, imageGenerator: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Video Generator</label>
                    <input
                      type="number"
                      min="0"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={editingUser?.videoGenerator || 0}
                      onChange={(e) => setEditingUser({...editingUser, videoGenerator: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Audio Generator</label>
                    <input
                      type="number"
                      min="0"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={editingUser?.audioGenerator || 0}
                      onChange={(e) => setEditingUser({...editingUser, audioGenerator: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Code Generator</label>
                    <input
                      type="number"
                      min="0"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={editingUser?.codeGenerator || 0}
                      onChange={(e) => setEditingUser({...editingUser, codeGenerator: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSave(editingUser)}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
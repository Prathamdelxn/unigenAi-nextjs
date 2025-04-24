
'use client'
import React, { useState,useEffect } from 'react';
import { FiCheck, FiEdit2, FiPlus, FiSave, FiTrash2, FiX } from 'react-icons/fi';

export default function AdminSubscriptionManagement() {
    const [darkMode, setDarkMode] = useState(true);
    const [plans, setPlans] = useState([]); // Changed from object to array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  

  
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/subscription/fetch-all-plans');
        
        if (!response.ok) {
          throw new Error('Failed to fetch plans');
        }
        
        const data = await response.json();
        console.log(data.data);
        setPlans(data.data); // Assuming data.data contains your array of plans
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);


  const [editingPlan, setEditingPlan] = useState(null);
  const [newFeature, setNewFeature] = useState('');
  const [showAddPlanModal, setShowAddPlanModal] = useState(false);
  const [newPlan, setNewPlan] = useState({
    id: '',
    name: '',
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: '',
    color: 'bg-gray-500',
    icon: '🔹',
    features: [],
    active: true
  });

  const handleEditPlan = (planId) => {
    setEditingPlan(planId);
  };

  const handleSavePlan = (planId) => {
    setEditingPlan(null);
    // In a real app, you would save to your backend here
  };

  const handlePriceChange = (planId, field, value) => {
    setPlans(prev => ({
      ...prev,
      [planId]: {
        ...prev[planId],
        [field]: Number(value)
      }
    }));
  };

  const handleFeatureChange = (planId, index, value) => {
    const updatedFeatures = [...plans[planId].features];
    updatedFeatures[index] = value;
    setPlans(prev => ({
      ...prev,
      [planId]: {
        ...prev[planId],
        features: updatedFeatures
      }
    }));
  };

  const addFeature = (planId) => {
    if (newFeature.trim()) {
      setPlans(prev => ({
        ...prev,
        [planId]: {
          ...prev[planId],
          features: [...prev[planId].features, newFeature]
        }
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (planId, index) => {
    const updatedFeatures = plans[planId].features.filter((_, i) => i !== index);
    setPlans(prev => ({
      ...prev,
      [planId]: {
        ...prev[planId],
        features: updatedFeatures
      }
    }));
  };

  const togglePlanStatus = (planId) => {
    setPlans(prev => ({
      ...prev,
      [planId]: {
        ...prev[planId],
        active: !prev[planId].active
      }
    }));
  };

  const handleAddPlan = () => {
    if (newPlan.id && newPlan.name) {
      setPlans(prev => ({
        ...prev,
        [newPlan.id]: newPlan
      }));
      setShowAddPlanModal(false);
      setNewPlan({
        id: '',
        name: '',
        monthlyPrice: 0,
        yearlyPrice: 0,
        description: '',
        color: 'bg-gray-500',
        icon: '🔹',
        features: [],
        active: true
      });
    }
  };

  const deletePlan = (planId) => {
    const { [planId]: _, ...remainingPlans } = plans;
    setPlans(remainingPlans);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Subscription Plans Management</h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Configure and manage your subscription plans
            </p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
           
            <button
              onClick={() => setShowAddPlanModal(true)}
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
            >
              <FiPlus />
              <span>Add New Plan</span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <p>Loading plans...</p>
          ) : error ? (
            <p>Error loading plans: {error}</p>
          ) : (
            plans.map((plan) => (
              <div 
                key={plan._id} 
                className={`rounded-xl overflow-hidden shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} ${!plan.active ? 'opacity-70' : ''}`}
              >
                <div className={`h-2 ${plan.color || 'bg-gray-500'}`}></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1 flex items-center">
                        {plan.icon || '⭐'} <span className="ml-2">{plan.name}</span>
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {plan.description}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditPlan(editingPlan === plan._id ? null : plan._id)}
                        className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                      >
                        {editingPlan === plan._id ? <FiX /> : <FiEdit2 />}
                      </button>
                      <button
                        onClick={() => deletePlan(plan._id)}
                        className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>

                  {/* Pricing Section */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Monthly Price:</span>
                      {editingPlan === plan._id ? (
                        <input
                          type="number"
                          value={plan.monthlyPrice}
                          onChange={(e) => handlePriceChange(plan._id, 'monthlyPrice', e.target.value)}
                          className={`w-20 px-2 py-1 rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border`}
                        />
                      ) : (
                        <span className="font-bold">₹{plan.monthlyPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Yearly Price:</span>
                      {editingPlan === plan._id ? (
                        <input
                          type="number"
                          value={plan.yearlyPrice}
                          onChange={(e) => handlePriceChange(plan._id, 'yearlyPrice', e.target.value)}
                          className={`w-20 px-2 py-1 rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border`}
                        />
                      ) : (
                        <span className="font-bold">₹{plan.yearlyPrice}</span>
                      )}
                    </div>
                  </div>

                  {/* Features Section */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="font-medium mb-2">Features:</h4>
                    <ul className="space-y-2 mb-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <FiCheck className="flex-shrink-0 text-green-500 mt-0.5 mr-2" />
                          {editingPlan === plan._id ? (
                            <div className="flex items-center w-full">
                              <input
                                type="text"
                                value={feature}
                                onChange={(e) => handleFeatureChange(plan._id, index, e.target.value)}
                                className={`flex-grow px-2 py-1 rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border`}
                              />
                              <button
                                onClick={() => removeFeature(plan._id, index)}
                                className="ml-2 text-red-500 hover:text-red-700"
                              >
                                <FiTrash2 size={14} />
                              </button>
                            </div>
                          ) : (
                            <span>{feature}</span>
                          )}
                        </li>
                      ))}
                    </ul>

                    {editingPlan === plan._id && (
                      <div className="flex mt-2">
                        <input
                          type="text"
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          placeholder="Add new feature"
                          className={`flex-grow px-2 py-1 rounded-l ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border`}
                        />
                        <button
                          onClick={() => addFeature(plan._id)}
                          className="px-3 py-1 bg-indigo-600 text-white rounded-r hover:bg-indigo-700"
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Status and Save */}
                  <div className="mt-4 flex justify-between items-center">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={plan.active}
                        onChange={() => togglePlanStatus(plan._id)}
                        className="sr-only peer"
                      />
                      <div className={`relative w-11 h-6 rounded-full peer ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600`}></div>
                      <span className="ml-2 text-sm font-medium">
                        {plan.active ? 'Active' : 'Inactive'}
                      </span>
                    </label>

                    {editingPlan === plan._id && (
                      <button
                        onClick={() => handleSavePlan(plan._id)}
                        className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        <FiSave size={14} />
                        <span>Save</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>


        {/* Add Plan Modal */}
        {/* {showAddPlanModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`p-6 rounded-xl shadow-lg w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add New Plan</h3>
                <button 
                  onClick={() => setShowAddPlanModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Plan ID (unique key)</label>
                  <input
                    type="text"
                    value={newPlan.id}
                    onChange={(e) => setNewPlan({...newPlan, id: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border`}
                    placeholder="e.g., enterprise"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Plan Name</label>
                  <input
                    type="text"
                    value={newPlan.name}
                    onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border`}
                    placeholder="e.g., Enterprise Plan"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Monthly Price ($)</label>
                    <input
                      type="number"
                      value={newPlan.monthlyPrice}
                      onChange={(e) => setNewPlan({...newPlan, monthlyPrice: Number(e.target.value)})}
                      className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Yearly Price ($)</label>
                    <input
                      type="number"
                      value={newPlan.yearlyPrice}
                      onChange={(e) => setNewPlan({...newPlan, yearlyPrice: Number(e.target.value)})}
                      className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <input
                    type="text"
                    value={newPlan.description}
                    onChange={(e) => setNewPlan({...newPlan, description: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border`}
                    placeholder="Short description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Icon</label>
                  <input
                    type="text"
                    value={newPlan.icon}
                    onChange={(e) => setNewPlan({...newPlan, icon: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border`}
                    placeholder="Emoji or icon"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Color Class</label>
                  <select
                    value={newPlan.color}
                    onChange={(e) => setNewPlan({...newPlan, color: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border`}
                  >
                    <option value="bg-gray-500">Gray</option>
                    <option value="bg-blue-500">Blue</option>
                    <option value="bg-green-500">Green</option>
                    <option value="bg-yellow-500">Yellow</option>
                    <option value="bg-red-500">Red</option>
                    <option value="bg-purple-500">Purple</option>
                    <option value="bg-pink-500">Pink</option>
                    <option value="bg-indigo-500">Indigo</option>
                    <option value="bg-gradient-to-r from-green-500 to-emerald-600">Green Gradient</option>
                    <option value="bg-gradient-to-r from-purple-500 to-indigo-600">Purple Gradient</option>
                    <option value="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Rainbow Gradient</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Features (one per line)</label>
                  <textarea
                    value={newPlan.features.join('\n')}
                    onChange={(e) => setNewPlan({...newPlan, features: e.target.value.split('\n')})}
                    className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border`}
                    rows={4}
                    placeholder="Feature 1\nFeature 2\nFeature 3"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setShowAddPlanModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 mr-3"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddPlan}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                    disabled={!newPlan.id || !newPlan.name}
                  >
                    Add Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )} */}
    {showAddPlanModal && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className={`p-6 rounded-2xl shadow-xl w-full max-w-4xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
      {/* Modal Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Create New Plan</h3>
        <button 
          onClick={() => setShowAddPlanModal(false)}
          className="p-1 rounded-full hover:bg-gray-700/30 transition-colors"
        >
          <FiX size={20} />
        </button>
      </div>

      {/* Horizontal Form Layout */}
      <div className="grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Plan Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Plan Name*</label>
            <input
              type="text"
              value={newPlan.name}
              onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
              className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-indigo-500' : 'bg-white border-gray-300 focus:ring-indigo-400'} border focus:ring-1 focus:border-indigo-500`}
              placeholder="e.g., Premium Plan"
            />
          </div>

          {/* Pricing in INR */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Pricing (INR)</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-1">Monthly*</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
                  <input
                    type="number"
                    value={newPlan.monthlyPrice}
                    onChange={(e) => setNewPlan({...newPlan, monthlyPrice: e.target.value})}
                    className={`w-full pl-8 pr-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-indigo-500' : 'bg-white border-gray-300 focus:ring-indigo-400'} border focus:ring-1 focus:border-indigo-500`}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs mb-1">Yearly*</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
                  <input
                    type="number"
                    value={newPlan.yearlyPrice}
                    onChange={(e) => setNewPlan({...newPlan, yearlyPrice: e.target.value})}
                    className={`w-full pl-8 pr-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-indigo-500' : 'bg-white border-gray-300 focus:ring-indigo-400'} border focus:ring-1 focus:border-indigo-500`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Visual Styling */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Appearance</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-1">Icon</label>
                <input
                  type="text"
                  value={newPlan.icon}
                  onChange={(e) => setNewPlan({...newPlan, icon: e.target.value})}
                  className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-indigo-500' : 'bg-white border-gray-300 focus:ring-indigo-400'} border focus:ring-1 focus:border-indigo-500`}
                  placeholder="Emoji (e.g., ⭐)"
                  maxLength={2}
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Color</label>
                <select
                  value={newPlan.color}
                  onChange={(e) => setNewPlan({...newPlan, color: e.target.value})}
                  className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-indigo-500' : 'bg-white border-gray-300 focus:ring-indigo-400'} border focus:ring-1 focus:border-indigo-500`}
                >
                  <option value="bg-gray-500">Gray</option>
                  <option value="bg-blue-500">Blue</option>
                  <option value="bg-green-500">Green</option>
                  <option value="bg-purple-500">Purple</option>
                  <option value="bg-gradient-to-r from-green-500 to-emerald-600">Green Gradient</option>
                  <option value="bg-gradient-to-r from-purple-500 to-indigo-600">Purple Gradient</option>
                </select>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center pt-2">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={newPlan.active}
                onChange={(e) => setNewPlan({...newPlan, active: e.target.checked})}
                className="sr-only peer"
              />
              <div className={`relative w-11 h-6 rounded-full peer ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600`}></div>
              <span className="ml-3 text-sm">Active Plan</span>
            </label>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={newPlan.description}
              onChange={(e) => setNewPlan({...newPlan, description: e.target.value})}
              className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-indigo-500' : 'bg-white border-gray-300 focus:ring-indigo-400'} border focus:ring-1 focus:border-indigo-500`}
              rows={3}
              placeholder="Describe the plan benefits"
            />
          </div>

          {/* Features */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium">Features</label>
              <span className="text-xs text-gray-500">{newPlan.features.length} added</span>
            </div>
            <div className={`space-y-2 max-h-48 overflow-y-auto p-2 rounded-lg ${darkMode ? 'bg-gray-700/30' : 'bg-gray-100'}`}>
              {newPlan.features.length > 0 ? (
                newPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center group">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => {
                        const updatedFeatures = [...newPlan.features];
                        updatedFeatures[index] = e.target.value;
                        setNewPlan({...newPlan, features: updatedFeatures});
                      }}
                      className={`flex-grow px-3 py-1.5 rounded-l text-sm ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border`}
                    />
                    <button
                      onClick={() => {
                        const updatedFeatures = newPlan.features.filter((_, i) => i !== index);
                        setNewPlan({...newPlan, features: updatedFeatures});
                      }}
                      className={`px-3 py-1.5 rounded-r ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                ))
              ) : (
                <p className={`text-center py-4 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  No features added yet
                </p>
              )}
            </div>
            <button
              onClick={() => setNewPlan({...newPlan, features: [...newPlan.features, '']})}
              className={`mt-2 flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              <FiPlus size={14} />
              <span>Add Feature</span>
            </button>
          </div>
        </div>
      </div>

      {/* Form Footer */}
      <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-700/50">
        <button
          onClick={() => setShowAddPlanModal(false)}
          className={`px-4 py-2 rounded-lg ${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100'}`}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            // First log the data to console
            console.log("Creating new plan with data:", {
              name: newPlan.name,
              monthlyPrice: newPlan.monthlyPrice,
              yearlyPrice: newPlan.yearlyPrice,
              description: newPlan.description,
              features: newPlan.features,
              icon: newPlan.icon,
              color: newPlan.color,
              active: newPlan.active,
              currency: "INR" // Adding currency explicitly
            });
            
            // Then call the existing handleAddPlan function
            handleAddPlan();
            setShowAddPlanModal(false);
          }}
          disabled={!newPlan.name}
          className={`px-4 py-2 rounded-lg text-white ${!newPlan.name ? (darkMode ? 'bg-indigo-600/30' : 'bg-indigo-400') : (darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600')}`}
        >
          Create Plan
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
}
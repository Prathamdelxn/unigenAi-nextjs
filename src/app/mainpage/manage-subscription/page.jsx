// app/dashboard/subscription/page.jsx
'use client';

import { useState } from 'react';
import { FaCrown, FaCheck, FaArrowRight, FaCreditCard, FaHistory } from 'react-icons/fa';
import { RiVipCrownFill, RiVipLine } from 'react-icons/ri';
import { MdSecurity } from 'react-icons/md';

const SubscriptionPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [paymentMethod, setPaymentMethod] = useState('card_visa');
  const [billingCycle, setBillingCycle] = useState('monthly');

  // Mock user data
  const user = {
    currentPlan: 'pro',
    nextBillingDate: 'June 15, 2023',
    paymentMethod: 'VISA •••• 4242'
  };

  const plans = {
    basic: {
      name: 'Basic',
      price: { monthly: 0, yearly: 90 },
      description: 'Essential AI generation',
      color: 'bg-gray-600',
      icon: '⭐',
      features: [
        '50 images/month',
        '720p resolution',
        'Basic support',
        'Watermarked outputs'
      ]
    },
    lite: {
      name: 'Lite',
      price: { monthly: 119, yearly: 190 },
      description: 'For casual creators',
      color: 'bg-gradient-to-r from-green-500 to-emerald-600',
      icon: '🚀',
      features: [
        '200 images/month',
        '10 videos/month',
        '1080p resolution',
        'Standard support',
        'No watermarks'
      ]
    },
    pro: {
      name: 'Pro',
      price: { monthly: 199, yearly: 490 },
      description: 'For professionals',
      color: 'bg-gradient-to-r from-purple-500 to-indigo-600',
      icon: '✨',
      features: [
        '1000 images/month',
        '50 videos/month',
        '4K resolution',
        'Priority support',
        'Commercial license'
      ]
    },
    advanced: {
      name: 'Advanced',
      price: { monthly: 299, yearly: 990 },
      description: 'For businesses',
      color: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
      icon: '👑',
      features: [
        'Unlimited generations',
        '100 videos/month',
        '4K Ultra HD',
        '24/7 support',
        'API access',
        'Dedicated manager'
      ]
    }
  };

  const paymentMethods = [
    { id: 'card_visa', label: 'VISA •••• 4242', type: 'visa' },
    { id: 'card_master', label: 'Mastercard •••• 5555', type: 'mastercard' },
    { id: 'paypal', label: 'PayPal', type: 'paypal' }
  ];

  const calculateSavings = (plan) => {
    return plans[plan].price.monthly * 12 - plans[plan].price.yearly;
  };

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };

  const handleSubmit = () => {
    // Handle subscription change
    alert(`Changed to ${plans[selectedPlan].name} (${billingCycle})`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Plans Section */}
        <div className="lg:w-full space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Subscription</h1>
            <p className="text-slate-400">
              {user.currentPlan === selectedPlan 
                ? `Currently on ${plans[user.currentPlan].name} plan`
                : `Upgrading to ${plans[selectedPlan].name}`}
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="bg-slate-800 rounded-lg p-1 inline-flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-md ${billingCycle === 'monthly' ? 'bg-indigo-600' : 'hover:bg-slate-700'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-md flex items-center ${billingCycle === 'yearly' ? 'bg-indigo-600' : 'hover:bg-slate-700'}`}
            >
              Yearly
              {billingCycle === 'yearly' && (
                <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                  Save {calculateSavings(selectedPlan)}₹
                </span>
              )}
            </button>
          </div>

          {/* Plan Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(plans).map(([key, plan]) => (
              <div
                key={key}
                onClick={() => handlePlanChange(key)}
                className={`border rounded-xl p-6 cursor-pointer transition-all ${
                  selectedPlan === key 
                    ? `ring-2 ring-indigo-500 ${plan.color}`
                    : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-2xl mb-2">{plan.icon}</div>
                    <h3 className="font-bold text-lg">{plan.name}</h3>
                    <p className="text-sm text-slate-300">{plan.description}</p>
                  </div>
                  {key === user.currentPlan && (
                    <span className="px-2 py-1 text-xs rounded-full bg-indigo-500/20">
                      Current
                    </span>
                  )}
                </div>

                <div className="mb-6">
                  <span className="text-3xl font-bold">
                    ₹{billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                  </span>
                  <span className="text-slate-400 ml-1">
                    /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                  </span>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheck className="text-green-400 mt-1 mr-2 flex-shrink-0" size={12} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-2 rounded-lg font-medium ${
                    selectedPlan === key
                      ? 'bg-white text-slate-900'
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  {selectedPlan === key ? 'Selected' : 'Choose Plan'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        
      </div>
      <div className="lg:w-full m-10 gap-10 space-y-6 flex">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700  ">
            <h3 className="font-medium text-lg mb-6">Order Summary</h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-400">Plan</span>
                <span className="font-medium">
                  {plans[selectedPlan].name} ({billingCycle})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Price</span>
                <span className="font-medium">
                  ₹{billingCycle === 'monthly' 
                    ? plans[selectedPlan].price.monthly 
                    : plans[selectedPlan].price.yearly}
                </span>
              </div>
              {billingCycle === 'yearly' && (
                <div className="flex justify-between text-green-400">
                  <span>Yearly Savings</span>
                  <span>₹{calculateSavings(selectedPlan)}</span>
                </div>
              )}
            </div>

            <div className="border-t border-slate-700 pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>
                  ₹{billingCycle === 'monthly' 
                    ? plans[selectedPlan].price.monthly 
                    : plans[selectedPlan].price.yearly}
                </span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium transition"
            >
              {selectedPlan === user.currentPlan
                ? 'Current Plan'
                : selectedPlan > user.currentPlan
                  ? 'Upgrade Now'
                  : 'Downgrade Plan'}
            </button>

            <p className="text-xs text-slate-400 mt-3 text-center">
              {billingCycle === 'monthly'
                ? 'Recurs monthly. Cancel anytime.'
                : 'Recurs yearly. Cancel anytime.'}
            </p>
          </div>

          {/* Payment Method */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="font-medium mb-4 flex items-center">
              <FaCreditCard className="mr-2" />
              Payment Method
            </h3>
            <select 
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2"
            >
              {paymentMethods.map(method => (
                <option key={method.id} value={method.id}>
                  {method.label}
                </option>
              ))}
            </select>
            <button className="text-indigo-400 hover:text-indigo-300 text-sm mt-3 flex items-center">
              + Add payment method
            </button>
          </div>
        </div>
    </div>
  );
};

export default SubscriptionPage;
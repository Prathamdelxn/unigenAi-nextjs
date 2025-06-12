
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, StarIcon, BoltIcon, RocketLaunchIcon } from '@heroicons/react/20/solid';

// Helper function to get the appropriate icon component
const getIconComponent = (iconName) => {
  switch (iconName) {
    case 'StarIcon':
      return StarIcon;
    case 'BoltIcon':
      return BoltIcon;
    case 'RocketLaunchIcon':
      return RocketLaunchIcon;
    case '⭐':
      return StarIcon;
    case '✨':
      return StarIcon;
    default:
      return CheckIcon;
  }
};

export default function CtaSection() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Purchased,setpruchased]=useState("");
  const [billingInterval, setBillingInterval] = useState('monthly'); 
  
  
  const handlePayment = async (tier) => {
  const price = billingInterval === 'yearly' ? tier.yearlyPrice : tier.monthlyPrice;

  const res = await fetch('/api/create-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount: price }),
  });

  const order = await res.json();

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: 'Your App Name',
    description: `${tier.name} plan subscription`,
    order_id: order.id,
    handler: function (response) {
      alert('Payment Successful: ' + response.razorpay_payment_id);
      // ✅ You can now send `response` to your backend to record the payment
    },
    prefill: {
      name: 'Your User',
      email: 'user@example.com',
    },
    theme: {
      color: '#0ea5e9',
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
// 'monthly' or 'yearly'
 useEffect(() => {
    const user = localStorage.getItem('user')
    const data =JSON.parse(user);
    console.log(data.plan)
    setpruchased(data.plan)
   
  }, [])
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/subscription/fetch-all-plans');
        
        if (!response.ok) {
          throw new Error('Failed to fetch plans');
        }
        
        const data = await response.json();
        setPlans(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return <div className="text-center text-white py-24">Loading plans...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-24">Error: {error}</div>;
  }


  return (
    <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Billing toggle */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative flex items-center">
            <span className={`mr-4 text-sm font-medium ${billingInterval === 'monthly' ? 'text-white' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button
              type="button"
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-800"
              onClick={() => setBillingInterval(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
            >
              <span
                className={`${
                  billingInterval === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-cyan-500 transition`}
              />
            </button>
            <span className={`ml-4 text-sm font-medium ${billingInterval === 'yearly' ? 'text-white' : 'text-gray-400'}`}>
              Yearly <span className="text-xs text-cyan-400">(Save {Math.round((1 - plans.find(p => p.name === 'Pro')?.yearlyPrice / (plans.find(p => p.name === 'Pro'))?.monthlyPrice * 12)) * 100}%)</span>
            </span>
          </div>
          <p className="mt-4 text-sm text-gray-400">The Pro plan is recommended for most users</p>
        </div>

        {/* Pricing Tiers */}
        {plans.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {plans.map((tier) => {
              const IconComponent = getIconComponent(tier.icon);
              const colorClass = tier.color || 'from-gray-400 to-gray-600';
              
              // Use the price based on billing interval
              const price = billingInterval === 'yearly' ? tier.yearlyPrice : tier.monthlyPrice;
              const priceSuffix = billingInterval === 'yearly' ? '/year' : '/month';
              const monthlyEquivalent = billingInterval === 'yearly' 
                ? `₹${Math.round(tier.yearlyPrice / 12)}/mo` 
                : null;

              return (
                <motion.div
                  key={tier._id}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`relative rounded-2xl border ${tier.popular ? 'border-amber-500/30' : 'border-gray-800'} ${
                    tier.name === 'Pro' ? 'ring-2 ring-amber-500/50' : ''
                  } bg-gray-900/50 backdrop-blur-sm p-8 shadow-xl overflow-hidden`}
                >
                  {tier.popular && (
                    <div className="absolute top-0 right-0 bg-amber-500 text-xs font-bold text-white px-3 py-1 rounded-bl-lg">
                      POPULAR
                    </div>
                  )}
                  
                  {tier.name === Purchased  && billingInterval==="monthly" && (
                    <div className="absolute -top-3 -right-3 bg-amber-500 text-white text-xs font-bold px-8 py-1 transform rotate-45 origin-bottom-left">
                      Purchased
                    </div>
                  )}
                  
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${colorClass}`}></div>
                  
                  <div className="mt-6">
                    <div className="flex items-center">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colorClass} text-white`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <h3 className="ml-4 text-lg font-semibold leading-7 text-white">{tier.name}</h3>
                    </div>
                    
                    <div className="mt-6">
                      <p className="text-4xl font-bold tracking-tight text-white">₹{price}
                        <span className="text-base font-normal text-gray-400">{priceSuffix}</span>
                      </p>
                      {billingInterval === 'yearly' && monthlyEquivalent && (
                        <p className="text-sm text-gray-400">
                          {monthlyEquivalent}
                        </p>
                      )}
                      <p className="mt-2 text-sm text-gray-400">{tier.description}</p>
                    </div>
                    
                    <ul className="mt-8 space-y-3">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckIcon className="h-5 w-5 flex-shrink-0 text-cyan-400" />
                          <span className="ml-3 text-sm text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                   <motion.button
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  className="mt-8 w-full rounded-md bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90"
  onClick={() => handlePayment(tier)}
>
  {tier.name === Purchased ? 'Already Selected' : `Get ${tier.name}`}
</motion.button>

                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center text-gray-400 py-16">No plans available</div>
        )}

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400">Need something custom?</p>
          <a
            href="#"
            className="mt-2 inline-flex items-center text-sm font-semibold leading-6 text-cyan-400 hover:text-cyan-300"
          >
            Contact us for enterprise solutions <span aria-hidden="true" className="ml-2">→</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
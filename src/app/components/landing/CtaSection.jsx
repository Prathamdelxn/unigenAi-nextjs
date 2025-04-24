  // 'use client';
  // import { useState,useEffect } from 'react';
  // import { motion } from 'framer-motion';
  // import { CheckIcon, StarIcon, BoltIcon, RocketLaunchIcon } from '@heroicons/react/20/solid';

  // const pricingTiers = [
  //   {
  //     name: 'Basic',
  //     price: '$19',
  //     description: 'Perfect for individuals getting started',
  //     features: ['10 AI generations/day', 'Basic templates', 'Standard support'],
  //     icon: CheckIcon,
  //     color: 'from-blue-400 to-blue-600',
  //     popular: false
  //   },
  //   {
  //     name: 'Lite',
  //     price: '$49',
  //     description: 'For growing professionals and small teams',
  //     features: ['50 AI generations/day', 'Advanced templates', 'Priority support', 'Commercial license'],
  //     icon: BoltIcon,
  //     color: 'from-purple-400 to-purple-600',
  //     popular: false
  //   },
  //   {
  //     name: 'Pro',
  //     price: '$99',
  //     description: 'For professionals and serious creators',
  //     features: ['200 AI generations/day', 'All templates', '24/7 support', 'API access', 'Team collaboration'],
  //     icon: StarIcon,
  //     color: 'from-amber-400 to-amber-600',
  //     popular: true
  //   },
  //   {
  //     name: 'Advanced',
  //     price: '$199',
  //     description: 'For enterprises and power users',
  //     features: ['Unlimited generations', 'All features', 'Dedicated account manager', 'White-label options', 'Custom AI models'],
  //     icon: RocketLaunchIcon,
  //     color: 'from-cyan-400 to-cyan-600',
  //     popular: false
  //   }
  // ];

  
  

  // export default function CtaSection() {

  //   const [plans,setPlans]=useState();
  //   useEffect(() => {
  //       const fetchPlans = async () => {
  //         try {
  //           const response = await fetch('/api/subscription/fetch-all-plans');
            
  //           if (!response.ok) {
  //             throw new Error('Failed to fetch plans');
  //           }
            
  //           const data = await response.json();
  //           console.log(data.data);
  //           setPlans(data.data); // Assuming data.data contains your array of plans
  //         } catch (err) {
  //           setError(err.message);
  //         } finally {
  //           setLoading(false);
  //         }
  //       };
    
  //       fetchPlans();
  //     }, []);
  //     console.log("asdf",plans)
  //   return (
  //     <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 overflow-hidden">
  //       {/* Background elements */}
  //       <div className="absolute inset-0 opacity-20">
  //         <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center"></div>
  //       </div>
        
  //       <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8">
  //         <motion.div
  //           initial={{ opacity: 0, y: 20 }}
  //           whileInView={{ opacity: 1, y: 0 }}
  //           viewport={{ once: true }}
  //           transition={{ duration: 0.5 }}
  //           className="mx-auto max-w-4xl text-center"
  //         >
  //           <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
  //             <span className="block">Ready to unlock your</span>
  //             <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
  //               creative potential?
  //             </span>
  //           </h2>
  //           <p className="mt-6 text-lg leading-8 text-gray-300">
  //             Choose the perfect plan for your needs and join thousands of professionals transforming their workflow
  //           </p>
  //         </motion.div>

  //         {/* Pricing Tiers */}
  //         <motion.div
  //           initial={{ opacity: 0 }}
  //           whileInView={{ opacity: 1 }}
  //           viewport={{ once: true }}
  //           transition={{ duration: 0.5, delay: 0.2 }}
  //           className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
  //         >
  //           {plans.map((tier, index) => (
  //             <motion.div
  //               key={tier._id}
  //               whileHover={{ y: -5 }}
  //               transition={{ type: "spring", stiffness: 300 }}
  //               className={`relative rounded-2xl border ${tier.popular ? 'border-cyan-500/30' : 'border-gray-800'} bg-gray-900/50 backdrop-blur-sm p-8 shadow-xl overflow-hidden`}
  //             >
  //               {tier.popular && (
  //                 <div className="absolute top-0 right-0 bg-amber-500 text-xs font-bold text-white px-3 py-1 rounded-bl-lg">
  //                   POPULAR
  //                 </div>
  //               )}
                
  //               <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${tier.color}`}></div>
                
  //               <div className="mt-6">
  //                 <div className="flex items-center">
  //                   <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r ${tier.color} text-white`}>
  //                     <tier.icon className="h-5 w-5" />
  //                   </div>
  //                   <h3 className="ml-4 text-lg font-semibold leading-7 text-white">{tier.name}</h3>
  //                 </div>
                  
  //                 <div className="mt-6">
  //                   <p className="text-4xl font-bold tracking-tight text-white">{tier.price}
  //                     <span className="text-base font-normal text-gray-400">/month</span>
  //                   </p>
  //                   <p className="mt-2 text-sm text-gray-400">{tier.description}</p>
  //                 </div>
                  
  //                 <ul className="mt-8 space-y-3">
  //                   {tier.features.map((feature) => (
  //                     <li key={feature} className="flex items-start">
  //                       <CheckIcon className="h-5 w-5 flex-shrink-0 text-cyan-400" />
  //                       <span className="ml-3 text-sm text-gray-300">{feature}</span>
  //                     </li>
  //                   ))}
  //                 </ul>
                  
  //                 <motion.button
  //                   whileHover={{ scale: 1.03 }}
  //                   whileTap={{ scale: 0.97 }}
  //                   className={`mt-8 w-full rounded-md bg-gradient-to-r ${tier.color} px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500`}
  //                 >
  //                   Get {tier.name}
  //                 </motion.button>
  //               </div>
  //             </motion.div>
  //           ))}
  //         </motion.div>

  //         {/* Enterprise CTA */}
  //         <motion.div
  //           initial={{ opacity: 0 }}
  //           whileInView={{ opacity: 1 }}
  //           viewport={{ once: true }}
  //           transition={{ delay: 0.4, duration: 0.5 }}
  //           className="mt-16 text-center"
  //         >
  //           <p className="text-gray-400">Need something custom?</p>
  //           <a
  //             href="#"
  //             className="mt-2 inline-flex items-center text-sm font-semibold leading-6 text-cyan-400 hover:text-cyan-300"
  //           >
  //             Contact us for enterprise solutions <span aria-hidden="true" className="ml-2">→</span>
  //           </a>
  //         </motion.div>
  //       </div>
  //     </div>
  //   );
  // }


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
    default:
      return CheckIcon;
  }
};

export default function CtaSection() {
  const [plans, setPlans] = useState([]);
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
      
      <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to unlock your</span>
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              creative potential?
            </span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Choose the perfect plan for your needs and join thousands of professionals transforming their workflow
          </p>
        </motion.div>

        {/* Pricing Tiers */}
        {plans.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {plans.map((tier) => {
              const IconComponent = getIconComponent(tier.icon);
              const colorMap = {
                'Basic': 'from-blue-400 to-blue-600',
                'Lite': 'from-purple-400 to-purple-600',
                'Pro': 'from-amber-400 to-amber-600',
                'Advanced': 'from-cyan-400 to-cyan-600'
              };
              const colorClass = colorMap[tier.name] || 'from-gray-400 to-gray-600';

              return (
                <motion.div
                  key={tier._id}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`relative rounded-2xl border ${tier.popular ? 'border-cyan-500/30' : 'border-gray-800'} bg-gray-900/50 backdrop-blur-sm p-8 shadow-xl overflow-hidden`}
                >
                  {tier.popular && (
                    <div className="absolute top-0 right-0 bg-amber-500 text-xs font-bold text-white px-3 py-1 rounded-bl-lg">
                      POPULAR
                    </div>
                  )}
                  
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${colorClass}`}></div>
                  
                  <div className="mt-6">
                    <div className="flex items-center">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r ${colorClass} text-white`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <h3 className="ml-4 text-lg font-semibold leading-7 text-white">{tier.name}</h3>
                    </div>
                    
                    <div className="mt-6">
                      <p className="text-4xl font-bold tracking-tight text-white">₹{tier.monthlyPrice}
                        <span className="text-base font-normal text-gray-400">/month</span>
                      </p>
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
                      className={`mt-8 w-full rounded-md bg-gradient-to-r ${colorClass} px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500`}
                    >
                      Get {tier.name}
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
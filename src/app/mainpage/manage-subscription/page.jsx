// // // app/dashboard/subscription/page.jsx
// // 'use client';

// // import { useState,useEffect } from 'react';
// // import { FaCrown, FaCheck, FaArrowRight, FaCreditCard, FaHistory } from 'react-icons/fa';
// // import { RiVipCrownFill, RiVipLine } from 'react-icons/ri';
// // import { MdSecurity } from 'react-icons/md';
// // import { useAuth } from '@/app/context/AuthContext';
// // const SubscriptionPage = () => {
// //   const [selectedPlan, setSelectedPlan] = useState('pro');
// //   const [paymentMethod, setPaymentMethod] = useState('card_visa');
// //   const [billingCycle, setBillingCycle] = useState('monthly');
// // const {userData}=useAuth();
// //    const [newuserData, setnewUserData] = useState(null);

// //   useEffect(() => {
// //     console.log("datais",userData)
// //     if (userData) {
// //       // If you have all user data in auth context

// //       // OR fetch fresh data from API
    
// //       const fetchUserData = async () => {
// //         try {
// //           const response = await fetch(`/api/fetch-user-by-email/?email=${userData.email}`);

// //           const data = await response.json();
        
// //          console.log("this is fetch data",data.user.plan);
// //          setSelectedPlan(data.user.plan);
// //         } catch (error) {
// //           console.error('Failed to fetch user data:', error);
// //         } finally {
         
// //         }
// //       };
// //       fetchUserData();
     
// //     }
// //   }, []);
// //   // Mock user data
// //   // const user = {
// //   //   currentPlan: 'pro',
// //   //   nextBillingDate: 'June 15, 2023',
// //   //   paymentMethod: 'VISA •••• 4242'
// //   // };

// //   const plans = {
// //     basic: {
// //       name: 'Basic',
// //       price: { monthly: 0, yearly: 90 },
// //       description: 'Essential AI generation',
// //       color: 'bg-gray-600',
// //       icon: '⭐',
// //       features: [
// //         '50 images/month',
// //         '720p resolution',
// //         'Basic support',
// //         'Watermarked outputs'
// //       ]
// //     },
// //     lite: {
// //       name: 'Lite',
// //       price: { monthly: 119, yearly: 190 },
// //       description: 'For casual creators',
// //       color: 'bg-gradient-to-r from-green-500 to-emerald-600',
// //       icon: '🚀',
// //       features: [
// //         '200 images/month',
// //         '10 videos/month',
// //         '1080p resolution',
// //         'Standard support',
// //         'No watermarks'
// //       ]
// //     },
// //     pro: {
// //       name: 'Pro',
// //       price: { monthly: 199, yearly: 490 },
// //       description: 'For professionals',
// //       color: 'bg-gradient-to-r from-purple-500 to-indigo-600',
// //       icon: '✨',
// //       features: [
// //         '1000 images/month',
// //         '50 videos/month',
// //         '4K resolution',
// //         'Priority support',
// //         'Commercial license'
// //       ]
// //     },
// //     advanced: {
// //       name: 'Advanced',
// //       price: { monthly: 299, yearly: 990 },
// //       description: 'For businesses',
// //       color: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
// //       icon: '👑',
// //       features: [
// //         'Unlimited generations',
// //         '100 videos/month',
// //         '4K Ultra HD',
// //         '24/7 support',
// //         'API access',
// //         'Dedicated manager'
// //       ]
// //     }
// //   };

// //   const paymentMethods = [
// //     { id: 'card_visa', label: 'VISA •••• 4242', type: 'visa' },
// //     { id: 'card_master', label: 'Mastercard •••• 5555', type: 'mastercard' },
// //     { id: 'paypal', label: 'PayPal', type: 'paypal' }
// //   ];

// //   const calculateSavings = (plan) => {
// //     return plans[plan].price.monthly * 12 - plans[plan].price.yearly;
// //   };

// //   const handlePlanChange = (plan) => {
// //     setSelectedPlan(plan);
// //   };

// //   const handleSubmit = () => {
// //     // Handle subscription change
// //     alert(`Changed to ${plans[selectedPlan].name} (${billingCycle})`);
// //   };

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-8">
// //       <div className="flex flex-col lg:flex-row gap-8">
// //         {/* Plans Section */}
// //         <div className="lg:w-full space-y-8">
// //           <div>
// //             <h1 className="text-3xl font-bold mb-2">Your Subscription</h1>
// //             <p className="text-slate-400">
// //   {selectedPlan 
// //     ? `Currently on ${plans[selectedPlan].name} plan`
// //     : 'Loading your plan...'}
// // </p>
// //           </div>

// //           {/* Billing Toggle */}
// //           <div className="bg-slate-800 rounded-lg p-1 inline-flex">
// //             <button
// //               onClick={() => setBillingCycle('monthly')}
// //               className={`px-4 py-2 rounded-md ${billingCycle === 'monthly' ? 'bg-indigo-600' : 'hover:bg-slate-700'}`}
// //             >
// //               Monthly
// //             </button>
// //             <button
// //               onClick={() => setBillingCycle('yearly')}
// //               className={`px-4 py-2 rounded-md flex items-center ${billingCycle === 'yearly' ? 'bg-indigo-600' : 'hover:bg-slate-700'}`}
// //             >
// //               Yearly
// //               {billingCycle === 'yearly' && (
// //                 <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
// //                   Save {calculateSavings(selectedPlan)}₹
// //                 </span>
// //               )}
// //             </button>
// //           </div>

// //           {/* Plan Cards */}
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
// //             {Object.entries(plans).map(([key, plan]) => (
// //               <div
// //                 key={key}
// //                 onClick={() => handlePlanChange(key)}
// //                 className={`border rounded-xl p-6 cursor-pointer transition-all ${
// //                   selectedPlan === key 
// //                     ? `ring-2 ring-indigo-500 ${plan.color}`
// //                     : 'bg-slate-800 border-slate-700 hover:border-slate-600'
// //                 }`}
// //               >
// //                 <div className="flex justify-between items-start mb-4">
// //                   <div>
// //                     <div className="text-2xl mb-2">{plan.icon}</div>
// //                     <h3 className="font-bold text-lg">{plan.name}</h3>
// //                     <p className="text-sm text-slate-300">{plan.description}</p>
// //                   </div>
// //                   {key === selectedPlan && (
// //   <span className="px-2 py-1 text-xs rounded-full bg-indigo-500/20">
// //     Current
// //   </span>
// // )}
// //                 </div>

// //                 <div className="mb-6">
// //                   <span className="text-3xl font-bold">
// //                     ₹{billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
// //                   </span>
// //                   <span className="text-slate-400 ml-1">
// //                     /{billingCycle === 'monthly' ? 'mo' : 'yr'}
// //                   </span>
// //                 </div>

// //                 <ul className="space-y-2 mb-6">
// //                   {plan.features.map((feature, i) => (
// //                     <li key={i} className="flex items-start">
// //                       <FaCheck className="text-green-400 mt-1 mr-2 flex-shrink-0" size={12} />
// //                       <span className="text-sm">{feature}</span>
// //                     </li>
// //                   ))}
// //                 </ul>

// //                 <button
// //                   className={`w-full py-2 rounded-lg font-medium ${
// //                     selectedPlan === key
// //                       ? 'bg-white text-slate-900'
// //                       : 'bg-slate-700 hover:bg-slate-600'
// //                   }`}
// //                 >
// //                   {selectedPlan === key ? 'Selected' : 'Choose Plan'}
// //                 </button>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Order Summary */}
        
// //       </div>
     
// //     </div>
// //   );
// // };

// // export default SubscriptionPage;



// // app/dashboard/subscription/page.jsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { FaCheck, FaArrowRight, FaCreditCard, FaHistory } from 'react-icons/fa';
// import { RiVipCrownFill, RiVipLine } from 'react-icons/ri';
// import { MdSecurity } from 'react-icons/md';
// import { useAuth } from '@/app/context/AuthContext';
// import Script from 'next/script';
// import { useRouter } from 'next/navigation';

// const SubscriptionPage = () => {
//   const [selectedPlan, setSelectedPlan] = useState('basic');
//   const [billingCycle, setBillingCycle] = useState('monthly');
//   const [loading, setLoading] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const { userData } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (userData) {
//       const fetchUserData = async () => {
//         try {
//           const response = await fetch(`/api/fetch-user-by-email/?email=${userData.email}`);
//           const data = await response.json();
//           if (data.user?.plan) {
//             setSelectedPlan(data.user.plan);
//           }
//         } catch (error) {
//           console.error('Failed to fetch user data:', error);
//         }
//       };
//       fetchUserData();
//     }
//   }, [userData]);

// const plans=[
//   {
//     name:"pro",
//     monthlyPrice:199,
//     yearlyPrice:490,
//     description:"For Professionals",

//   }
// ]

//   // const plans = {
//   //   basic: {
//   //     name: 'Basic',
//   //     price: { monthly: 0, yearly: 90 },
//   //     description: 'Essential AI generation',
//   //     color: 'bg-gray-600',
//   //     icon: '⭐',
//   //     features: [
//   //       '50 images/month',
//   //       '720p resolution',
//   //       'Basic support',
//   //       'Watermarked outputs'
//   //     ]
//   //   },
//   //   lite: {
//   //     name: 'Lite',
//   //     price: { monthly: 119, yearly: 190 },
//   //     description: 'For casual creators',
//   //     color: 'bg-gradient-to-r from-green-500 to-emerald-600',
//   //     icon: '🚀',
//   //     features: [
//   //       '200 images/month',
//   //       '10 videos/month',
//   //       '1080p resolution',
//   //       'Standard support',
//   //       'No watermarks'
//   //     ]
//   //   },
//   //   pro: {
//   //     name: 'Pro',
//   //     price: { monthly: 199, yearly: 490 },
//   //     description: 'For professionals',
//   //     color: 'bg-gradient-to-r from-purple-500 to-indigo-600',
//   //     icon: '✨',
//   //     features: [
//   //       '1000 images/month',
//   //       '50 videos/month',
//   //       '4K resolution',
//   //       'Priority support',
//   //       'Commercial license'
//   //     ]
//   //   },
//   //   advanced: {
//   //     name: 'Advanced',
//   //     price: { monthly: 299, yearly: 990 },
//   //     description: 'For businesses',
//   //     color: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
//   //     icon: '👑',
//   //     features: [
//   //       'Unlimited generations',
//   //       '100 videos/month',
//   //       '4K Ultra HD',
//   //       '24/7 support',
//   //       'API access',
//   //       'Dedicated manager'
//   //     ]
//   //   }
//   // };

//   const calculateSavings = (plan) => {
//     return plans[plan]?.price.monthly * 12 - plans[plan]?.price.yearly;
//   };

//   const handlePlanChange = (plan) => {
//     setSelectedPlan(plan);
//     setPaymentSuccess(false);
//   };

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       if (window.Razorpay) {
//         resolve(true);
//         return;
//       }

//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onload = () => {
//         resolve(true);
//       };
//       script.onerror = () => {
//         resolve(false);
//       };
//       document.body.appendChild(script);
//     });
//   };

//   const initiatePayment = async () => {
//     setLoading(true);
    
//     try {
//       // 1. Create order on server
//       const orderResponse = await fetch('/api/create-razorpay-order', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           plan: selectedPlan,
//           cycle: billingCycle,
//           amount: plans[selectedPlan].price[billingCycle] * 100, // in paise
//           email: userData.email
//         }),
//       });

//       const orderData = await orderResponse.json();

//       if (!orderData.success) {
//         throw new Error(orderData.message || 'Failed to create order');
//       }

//       // 2. Load Razorpay script
//       const isScriptLoaded = await loadRazorpayScript();
//       if (!isScriptLoaded) {
//         throw new Error('Razorpay SDK failed to load');
//       }

//       // 3. Initialize Razorpay checkout
//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount: orderData.order.amount,
//         currency: 'INR',
//         name: 'AI Generation Pro',
//         description: `${plans[selectedPlan].name} Plan (${billingCycle})`,
//         image: '/logo.png',
//         order_id: orderData.order.id,
//         handler: async function(response) {
//           try {
//             const verificationResponse = await fetch('/api/verify-payment', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_signature: response.razorpay_signature,
//                 plan: selectedPlan,
//                 cycle: billingCycle,
//                 email: userData.email
//               }),
//             });

//             const verificationData = await verificationResponse.json();

//             if (verificationData.success) {
//               setPaymentSuccess(true);
//               // Refresh user data
//               router.refresh();
//             } else {
//               alert('Payment verification failed: ' + verificationData.message);
//             }
//           } catch (error) {
//             console.error('Payment verification error:', error);
//             alert('Payment verification failed. Please contact support.');
//           }
//         },
//         prefill: {
//           name: userData.name || '',
//           email: userData.email || '',
//           contact: userData.phone || ''
//         },
//         theme: {
//           color: '#6366f1'
//         },
//         modal: {
//           ondismiss: function() {
//             setLoading(false);
//           }
//         }
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error('Payment error:', error);
//       alert('Payment failed: ' + error.message);
//       setLoading(false);
//     }
//   };

//   const updatePlanDirectly = async () => {
//     setLoading(true);
//     try {
//       console.log("done");
//       // const response = await fetch('/api/update-plan', {
//       //   method: 'POST',
//       //   headers: {
//       //     'Content-Type': 'application/json',
//       //   },
//       //   body: JSON.stringify({
//       //     email: userData.email,
//       //     plan: selectedPlan,
//       //     cycle: billingCycle
//       //   }),
//       // });

//       // const data = await response.json();
//       // if (data.success) {
//       //   setPaymentSuccess(true);
//       //   // Refresh user data
//       //   router.refresh();
//       // } else {
//       //   throw new Error(data.message || 'Failed to update plan');
//       // }
//     } catch (error) {
//       console.error('Plan update error:', error);
//       alert('Failed to update plan: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = () => {
//     if (selectedPlan === 'basic' || paymentSuccess) {
//       updatePlanDirectly();
//     } else {
//       initiatePayment();
//     }
//   };
// console.log("asdf",plans)
//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Razorpay script - loaded only when needed */}
//       <Script 
//         src="https://checkout.razorpay.com/v1/checkout.js" 
//         strategy="lazyOnload"
//       />
      
//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Plans Section */}
//         <div className="lg:w-2/3 space-y-8">
//           <div>
//             <h1 className="text-3xl font-bold mb-2">Your Subscription</h1>
//             <p className="text-slate-400">
//               {selectedPlan 
//                 ? `Currently on ${plans[selectedPlan]?.name} plan`
//                 : 'Loading your plan...'}
//             </p>
//           </div>

//           {/* Billing Toggle */}
//           <div className="bg-slate-800 rounded-lg p-1 inline-flex">
//             <button
//               onClick={() => setBillingCycle('monthly')}
//               className={`px-4 py-2 rounded-md ${billingCycle === 'monthly' ? 'bg-indigo-600' : 'hover:bg-slate-700'}`}
//             >
//               Monthly
//             </button>
//             <button
//               onClick={() => setBillingCycle('yearly')}
//               className={`px-4 py-2 rounded-md flex items-center ${billingCycle === 'yearly' ? 'bg-indigo-600' : 'hover:bg-slate-700'}`}
//             >
//               Yearly
//               {billingCycle === 'yearly' && (
//                 <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
//                   Save {calculateSavings(selectedPlan)}₹
//                 </span>
//               )}
//             </button>
//           </div>

//           {/* Success Message */}
//           {paymentSuccess && (
//             <div className="bg-green-500/10 border border-green-500/30 text-green-500 p-4 rounded-lg">
//               <p className="font-medium">Payment successful! Your plan has been updated.</p>
//             </div>
//           )}

//           {/* Plan Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
//             {Object.entries(plans).map(([key, plan]) => (
//               <div
//                 key={key}
//                 onClick={() => handlePlanChange(key)}
//                 className={`border rounded-xl p-6 cursor-pointer transition-all ${
//                   selectedPlan === key 
//                     ? `ring-2 ring-indigo-500 ${plan.color}`
//                     : 'bg-slate-800 border-slate-700 hover:border-slate-600'
//                 }`}
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <div className="text-2xl mb-2">{plan.icon}</div>
//                     <h3 className="font-bold text-lg">{plan.name}</h3>
//                     <p className="text-sm text-slate-300">{plan.description}</p>
//                   </div>
//                   {key === selectedPlan && (
//                     <span className="px-2 py-1 text-xs rounded-full bg-indigo-500/20">
//                       Current
//                     </span>
//                   )}
//                 </div>

//                 <div className="mb-6">
//                   <span className="text-3xl font-bold">
//                     ₹{billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
//                   </span>
//                   <span className="text-slate-400 ml-1">
//                     /{billingCycle === 'monthly' ? 'mo' : 'yr'}
//                   </span>
//                 </div>

//                 <ul className="space-y-2 mb-6">
//                   {plan.features.map((feature, i) => (
//                     <li key={i} className="flex items-start">
//                       <FaCheck className="text-green-400 mt-1 mr-2 flex-shrink-0" size={12} />
//                       <span className="text-sm">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>

//                 <button
//                   className={`w-full py-2 rounded-lg font-medium ${
//                     selectedPlan === key
//                       ? 'bg-white text-slate-900'
//                       : 'bg-slate-700 hover:bg-slate-600'
//                   }`}
//                 >
//                   {selectedPlan === key ? 'Selected' : 'Choose Plan'}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div className="lg:w-1/3">
//           <div className="bg-slate-800 rounded-xl p-6 sticky top-4">
//             <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
//             <div className="space-y-4 mb-6">
//               <div className="flex justify-between">
//                 <span className="text-slate-400">Plan</span>
//                 <span className="font-medium">
//                   {plans[selectedPlan]?.plan} ({billingCycle})
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-slate-400">Price</span>
//                 <span className="font-medium">
//                   ₹{plans[selectedPlan]?.price[billingCycle]}
//                 </span>
//               </div>
//               {billingCycle === 'yearly' && (
//                 <div className="flex justify-between text-green-400">
//                   <span>You save</span>
//                   <span>₹{calculateSavings(selectedPlan)}</span>
//                 </div>
//               )}
//             </div>

//             <div className="border-t border-slate-700 pt-4 mb-6">
//               <div className="flex justify-between font-bold text-lg">
//                 <span>Total</span>
//                 <span>₹{plans[selectedPlan]?.price[billingCycle]}</span>
//               </div>
//             </div>

//             <button
//               onClick={handleSubmit}
//               disabled={loading || (selectedPlan === 'basic' && !paymentSuccess)}
//               className={`w-full py-3 rounded-lg font-medium bg-indigo-600 hover:bg-indigo-700 transition-colors ${
//                 loading ? 'opacity-70 cursor-not-allowed' : ''
//               }`}
//             >
//               {loading ? 'Processing...' : 
//                paymentSuccess ? 'Update Plan' : 
//                selectedPlan === 'basic' ? 'Select Free Plan' : 'Upgrade Plan'}
//             </button>

//             <div className="mt-4 text-xs text-slate-400 flex items-center">
//               <MdSecurity className="mr-2" size={16} />
//               <span>Secure payment powered by Razorpay</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubscriptionPage;
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
  const [billingInterval, setBillingInterval] = useState('monthly'); // 'monthly' or 'yearly'
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
                      className={`mt-8 w-full rounded-md ${
                        tier.name === 'Pro' ? 'bg-gradient-to-r from-amber-400 to-amber-600' : colorClass
                      } px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500`}
                    >
                      {tier.name==Purchased?<> Already Selected </>: <>Get{tier.name}</>  }
                    
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
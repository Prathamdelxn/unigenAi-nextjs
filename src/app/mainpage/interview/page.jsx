// 'use client'

// import React, { useState, useEffect, useRef } from 'react'
// import { useRouter } from 'next/navigation'
// import { ArrowLeft, RefreshCw, Video, VideoOff, AlertCircle } from 'lucide-react'

// export default function Interview() {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(true)
//   const [iframeHeight, setIframeHeight] = useState('100vh')
//   const [hasError, setHasError] = useState(false)
//   const [cameraPermission, setCameraPermission] = useState('prompt') // 'prompt', 'granted', 'denied'
//   const iframeRef = useRef(null)

//   // Check camera permissions
//   useEffect(() => {
//     const checkCameraPermission = async () => {
//       try {
//         const permissionStatus = await navigator.permissions.query({ name: 'camera' })
//         updatePermissionState(permissionStatus.state)
        
//         permissionStatus.onchange = () => {
//           updatePermissionState(permissionStatus.state)
//         }
//       } catch (error) {
//         console.error('Permission API not supported', error)
//       }
//     }

//     const updatePermissionState = (state) => {
//       setCameraPermission(state)
//       if (state === 'granted' && iframeRef.current) {
//         // Reload iframe when permission is granted
//         handleReload()
//       }
//     }

//     checkCameraPermission()
//   }, [])

//   // Update iframe height
//   useEffect(() => {
//     const handleResize = () => {
//       setIframeHeight(`${window.innerHeight - 80}px`)
//     }

//     window.addEventListener('resize', handleResize)
//     handleResize()

//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   const handleReload = () => {
//     setIsLoading(true)
//     setHasError(false)
//     if (iframeRef.current) {
//       iframeRef.current.src = 'http://localhost:3001/dashboard/'
//     }
//   }

//   const handleIframeError = () => {
//     setIsLoading(false)
//     setHasError(true)
//   }

//   const requestCameraAccess = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true })
//       stream.getTracks().forEach(track => track.stop())
//       setCameraPermission('granted')
//       handleReload()
//     } catch (err) {
//       setCameraPermission('denied')
//       console.error('Camera access denied:', err)
//     }
//   }

//   return (
//     <div className="bg-gray-900 text-gray-100 min-h-screen">
//       {/* Header */}
//       <header className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between sticky top-0 z-50">
//         <button 
//           onClick={() => router.back()}
//           className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           <span>Back to Dashboard</span>
//         </button>
        
//         <div className="flex items-center gap-4">
//           <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
//             Interview Dashboard
//           </h1>
//           <button 
//             onClick={handleReload}
//             className="p-2 text-gray-400 hover:text-white transition-colors"
//             title="Refresh"
//           >
//             <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
//           </button>
//         </div>
        
//         <div className="flex items-center gap-3">
//           {cameraPermission === 'denied' && (
//             <span className="flex items-center text-sm text-red-400">
//               <AlertCircle className="w-4 h-4 mr-1" />
//               Camera Blocked
//             </span>
//           )}
//           <button
//             onClick={requestCameraAccess}
//             className={`p-2 rounded-full ${
//               cameraPermission === 'granted' 
//                 ? 'text-green-400 bg-green-900/30' 
//                 : 'text-gray-400 hover:text-white'
//             }`}
//             title={cameraPermission === 'granted' ? 'Camera Access Granted' : 'Request Camera Access'}
//           >
//             {cameraPermission === 'granted' ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
//           </button>
//         </div>
//       </header>

//       {/* Permission denied overlay */}
//       {cameraPermission === 'denied' && (
//         <div className="fixed inset-0 bg-gray-900/90 flex items-center justify-center z-40 pt-20">
//           <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg max-w-md text-center">
//             <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
//             <h2 className="text-xl font-semibold mb-2">Camera Access Required</h2>
//             <p className="text-gray-300 mb-6">
//               The interview dashboard requires camera access to function properly.
//               Please enable camera permissions in your browser settings.
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => router.back()}
//                 className="px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors"
//               >
//                 Go Back
//               </button>
//               <button
//                 onClick={requestCameraAccess}
//                 className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
//               >
//                 <Video className="w-5 h-5" />
//                 Try Again
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Loading overlay */}
//       {isLoading && cameraPermission !== 'denied' && (
//         <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-40 pt-20">
//           <div className="flex flex-col items-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
//             <p className="text-gray-300">
//               {cameraPermission === 'granted' ? 'Loading Dashboard...' : 'Checking Camera Access...'}
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Error state */}
//       {hasError && !isLoading && cameraPermission !== 'denied' && (
//         <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-40 pt-20">
//           <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg max-w-md">
//             <p className="text-red-400 mb-4">Failed to load the dashboard</p>
//             <button
//               onClick={handleReload}
//               className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors flex items-center gap-2"
//             >
//               <RefreshCw className="w-5 h-5" />
//               Try Again
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Embedded content */}
//       {cameraPermission === 'granted' && (
//         <div className="relative" style={{ height: iframeHeight }}>
//           <iframe
//             ref={iframeRef}
//             src="http://localhost:3001/dashboard/"
//             className="w-full h-full border-0"
//             onLoad={() => setIsLoading(false)}
//             onError={handleIframeError}
//             sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-camera"
//             allow="camera; fullscreen"
//             allowFullScreen
//             title="Interview Dashboard"
//           />
//         </div>
//       )}

//       {/* Footer */}
//       <footer className="bg-gray-800 border-t border-gray-700 p-3 text-center text-sm text-gray-400">
//         <p>Embedded content from <span className="text-blue-400">localhost:3001</span></p>
//       </footer>
//     </div>
//   )
// }


'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, RefreshCw, Video, VideoOff, AlertCircle, Zap, Check, X } from 'lucide-react'

export default function Interview() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [iframeHeight, setIframeHeight] = useState('100vh')
  const [hasError, setHasError] = useState(false)
  const [cameraPermission, setCameraPermission] = useState('prompt') // 'prompt', 'granted', 'denied'
  const iframeRef = useRef(null)
  const permissionRef = useRef(null)
const[plan,setPlan]=useState("");


  useEffect(()=>{
    const userdata=localStorage.getItem('user')
    const data=JSON.parse(userdata);
    const plan=data.plan;
    setPlan(plan);
    console.log(plan)
  })

  // Check camera permissions
  useEffect(() => {
    const checkCameraPermission = async () => {
      try {
        // First check using the Permissions API if available
        if (navigator.permissions) {
          permissionRef.current = await navigator.permissions.query({ name: 'camera' })
          updatePermissionState(permissionRef.current.state)
          
          permissionRef.current.onchange = () => {
            updatePermissionState(permissionRef.current.state)
          }
        } else {
          // Fallback for browsers that don't support Permissions API
          // Try to get camera access directly
          await testCameraAccess()
        }
      } catch (error) {
        console.error('Error checking permissions:', error)
        await testCameraAccess()
      }
    }

    const testCameraAccess = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        stream.getTracks().forEach(track => track.stop())
        setCameraPermission('granted')
      } catch (err) {
        console.error('Camera access denied:', err)
        setCameraPermission('denied')
      }
    }

    const updatePermissionState = (state) => {
      setCameraPermission(state)
      if (state === 'granted' && iframeRef.current) {
        // Force a reload with a new URL to ensure camera access
        handleReload(true)
      }
    }

    checkCameraPermission()

    return () => {
      if (permissionRef.current) {
        permissionRef.current.onchange = null
      }
    }
  }, [])

  // Update iframe height
  useEffect(() => {
    const handleResize = () => {
      setIframeHeight(`${window.innerHeight - 80}px`)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleReload = (force = false) => {
    setIsLoading(true)
    setHasError(false)
    if (iframeRef.current) {
      // Add a timestamp to force reload if needed
      const timestamp = force ? `?t=${Date.now()}` : ''
      iframeRef.current.src = `http://localhost:3001/dashboard/${timestamp}`
    }
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  const requestCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      stream.getTracks().forEach(track => track.stop())
      setCameraPermission('granted')
      handleReload(true)
    } catch (err) {
      setCameraPermission('denied')
      console.error('Camera access denied:', err)
    }
  }

  return (
 <div>
    {plan!=="Advanced"?
    (
        <div className="fixed inset-0 bg-gray-900/90 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 max-w-md w-full overflow-hidden">
            <div className="p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-500/20 mb-4">
                <X className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Upgrade Required
              </h3>
              <p className="text-gray-300 mb-6">
                Your current plan doesn't include interview features. Upgrade to Advanced plan to access this functionality.
              </p>
              
              <div className="bg-gray-700/50 rounded-lg p-4 mb-6 text-left">
                <h4 className="font-semibold text-blue-400 mb-3 flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Advanced Plan Features
                </h4>
                <ul className="space-y-2 text-sm text-gray-200">
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Unlimited interview sessions</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Camera-based interview analysis</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Real-time feedback and scoring</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>AI-powered interview coach</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => router.push("/mainpage")}
                  className="px-4 py-2.5 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors flex-1"
                >
                  Go Back
                </button>
                <button
                  onClick={() => router.push('/mainpage/manage-subscription')}
                  className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2 flex-1"
                >
                  <Zap className="w-5 h-5" />
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      ) 
:
 <div className="bg-gray-900 text-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between sticky top-0 z-50">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
        
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Interview Dashboard
          </h1>
          <button 
            onClick={() => handleReload(true)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          {cameraPermission === 'denied' && (
            <span className="flex items-center text-sm text-red-400">
              <AlertCircle className="w-4 h-4 mr-1" />
              Camera Blocked
            </span>
          )}
          <button
            onClick={requestCameraAccess}
            className={`p-2 rounded-full ${
              cameraPermission === 'granted' 
                ? 'text-green-400 bg-green-900/30' 
                : 'text-gray-400 hover:text-white'
            }`}
            title={cameraPermission === 'granted' ? 'Camera Access Granted' : 'Request Camera Access'}
          >
            {cameraPermission === 'granted' ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Permission denied overlay */}
      {cameraPermission === 'denied' && (
        <div className="fixed inset-0 bg-gray-900/90 flex items-center justify-center z-40 pt-20">
          <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg max-w-md text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Camera Access Required</h2>
            <p className="text-gray-300 mb-6">
              The interview dashboard requires camera access to function properly.
              Please enable camera permissions in your browser settings.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={requestCameraAccess}
                className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Video className="w-5 h-5" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading overlay */}
      {isLoading && cameraPermission !== 'denied' && (
        <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-40 pt-20">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-300">
              {cameraPermission === 'granted' ? 'Loading Dashboard...' : 'Checking Camera Access...'}
            </p>
          </div>
        </div>
      )}

      {/* Error state */}
      {hasError && !isLoading && cameraPermission !== 'denied' && (
        <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-40 pt-20">
          <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg max-w-md">
            <p className="text-red-400 mb-4">Failed to load the dashboard</p>
            <button
              onClick={() => handleReload(true)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Embedded content */}
      {cameraPermission === 'granted' && (
        <div className="relative" style={{ height: iframeHeight }}>
          <iframe
            ref={iframeRef}
            src="http://localhost:3001/dashboard/"
            className="w-full h-full border-0"
            onLoad={() => setIsLoading(false)}
            onError={handleIframeError}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-camera"
            allow="camera; fullscreen"
            allowFullScreen
            title="Interview Dashboard"
          />
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 p-3 text-center text-sm text-gray-400">
        <p>Embedded content from <span className="text-blue-400">localhost:3001</span></p>
      </footer>
    </div>}
 </div>
  )
}
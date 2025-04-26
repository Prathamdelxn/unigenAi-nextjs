// // app/dashboard/image-generation/page.jsx
// 'use client';

// import { useState, useRef } from 'react';
// import { FaMagic, FaImage, FaDownload, FaShare, FaHistory, FaPlus, FaMinus } from 'react-icons/fa';
// import { IoSparkles } from 'react-icons/io5';

// export default function ImageGeneration() {
//   const [prompt, setPrompt] = useState('');
//   const [negativePrompt, setNegativePrompt] = useState('');
//   const [selectedStyle, setSelectedStyle] = useState('realistic');
//   const [aspectRatio, setAspectRatio] = useState('1:1');
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [generatedImages, setGeneratedImages] = useState([]);
//   const [seed, setSeed] = useState(Math.floor(Math.random() * 1000000));
//   const [steps, setSteps] = useState(30);
//   const canvasRef = useRef(null);

//   const styles = [
//     { id: 'realistic', name: 'Realistic', icon: <FaImage /> },
//     { id: 'fantasy', name: 'Fantasy', icon: <IoSparkles /> },
//     { id: 'anime', name: 'Anime', icon: <FaMagic /> },
//     { id: 'painting', name: 'Painting', icon: <FaImage /> },
//     { id: 'cyberpunk', name: 'Cyberpunk', icon: <FaMagic /> },
//   ];

//   const ratios = ['1:1', '16:9', '9:16', '4:3', '3:4'];

//   // const generateImage = async () => {
//   //   if (!prompt.trim()) return;
    
//   //   setIsGenerating(true);
    
//   //   // Simulate API call
//   //   try {
//   //     await new Promise(resolve => setTimeout(resolve, 2000));
      
//   //     // Mock generated images
//   //     const newImages = Array(4).fill().map((_, i) => ({
//   //       id: Date.now() + i,
//   //       url: `https://source.unsplash.com/random/300x300/?${encodeURIComponent(prompt)}&seed=${seed+i}`,
//   //       prompt,
//   //       style: selectedStyle,
//   //       ratio: aspectRatio
//   //     }));
      
//   //     setGeneratedImages(prev => [...newImages, ...prev]);
//   //   } catch (error) {
//   //     console.error("Generation failed:", error);
//   //   } finally {
//   //     setIsGenerating(false);
//   //   }
//   // };




//   const API_URL = "https://api.unsplash.com/search/photos";
//   const API_KEY = "o9A5rEHGg83stGivgbYzy7GxuMSj2wT6FtYpRy3_nBY";

//   const fetchImages = async () => {
//     if (!prompt) return;
   
//     try {
//       const response = await fetch(`${API_URL}?query=${prompt}&client_id=${API_KEY}`);
//       const data = await response.json();
//       setGeneratedImages(data.results);
//       console.log(generatedImages[0])
//     } catch (error) {
//       console.error("Error fetching images:", error);
//     }
   
//   };
//   const handleRatioChange = (ratio) => {
//     setAspectRatio(ratio);
//   };

//   const adjustSteps = (amount) => {
//     setSteps(prev => Math.min(50, Math.max(10, prev + amount)));
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Generation Controls */}
//         <div className="lg:w-1/3 space-y-6">
//           <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700/50 backdrop-blur-lg">
//             <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
//               <FaMagic className="text-purple-400" />
//               Image Generation
//             </h2>
            
//             {/* Prompt Input */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium mb-2">Describe your image</label>
//               <textarea
//                 value={prompt}
//                 onChange={(e) => setPrompt(e.target.value)}
//                 placeholder="A majestic lion in the savannah at sunset..."
//                 className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 rows={3}
//               />
//             </div>
            
//             {/* Negative Prompt */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium mb-2">Avoid in image (optional)</label>
//               <input
//                 value={negativePrompt}
//                 onChange={(e) => setNegativePrompt(e.target.value)}
//                 placeholder="blurry, distorted, watermark..."
//                 className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               />
//             </div>
            
//             {/* Style Selection */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium mb-2">Style</label>
//               <div className="flex flex-wrap gap-2">
//                 {styles.map(style => (
//                   <button
//                     key={style.id}
//                     onClick={() => setSelectedStyle(style.id)}
//                     className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${selectedStyle === style.id ? 'bg-purple-600' : 'bg-slate-700 hover:bg-slate-600'}`}
//                   >
//                     {style.icon}
//                     {style.name}
//                   </button>
//                 ))}
//               </div>
//             </div>
            
//             {/* Aspect Ratio */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium mb-2">Aspect Ratio</label>
//               <div className="flex flex-wrap gap-2">
//                 {ratios.map(ratio => (
//                   <button
//                     key={ratio}
//                     onClick={() => handleRatioChange(ratio)}
//                     className={`px-3 py-2 rounded-lg text-sm ${aspectRatio === ratio ? 'bg-purple-600' : 'bg-slate-700 hover:bg-slate-600'}`}
//                   >
//                     {ratio}
//                   </button>
//                 ))}
//               </div>
//             </div>
            
//             {/* Advanced Options */}
//             <div className="mb-6">
//               <div className="flex justify-between items-center mb-2">
//                 <label className="block text-sm font-medium">Generation Steps</label>
//                 <span className="text-sm text-slate-400">{steps}</span>
//               </div>
//               <div className="flex items-center gap-4">
//                 <button 
//                   onClick={() => adjustSteps(-5)} 
//                   disabled={steps <= 10}
//                   className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 disabled:opacity-50"
//                 >
//                   <FaMinus size={12} />
//                 </button>
//                 <div className="flex-1 bg-slate-700 rounded-full h-2">
//                   <div 
//                     className="bg-purple-500 h-2 rounded-full" 
//                     style={{ width: `${((steps - 10) / 40) * 100}%` }}
//                   ></div>
//                 </div>
//                 <button 
//                   onClick={() => adjustSteps(5)} 
//                   disabled={steps >= 50}
//                   className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 disabled:opacity-50"
//                 >
//                   <FaPlus size={12} />
//                 </button>
//               </div>
//               <p className="text-xs text-slate-400 mt-2">
//                 More steps = higher quality (slower generation)
//               </p>
//             </div>
            
//             {/* Generate Button */}
//             <button
//               onClick={fetchImages}
//               disabled={isGenerating || !prompt.trim()}
//               className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${isGenerating || !prompt.trim() ? 'bg-slate-700 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500'}`}
//             >
//               {isGenerating ? (
//                 <>
//                   <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Generating...
//                 </>
//               ) : (
//                 <>
//                   <FaMagic />
//                   Generate Image
//                 </>
//               )}
//             </button>
//           </div>
          
//           {/* Generation History */}
//           <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700/50 backdrop-blur-lg">
//             <h3 className="font-medium mb-4 flex items-center gap-2">
//               <FaHistory />
//               Recent Generations
//             </h3>
//             {generatedImages.length > 0 ? (
//               <div className="grid grid-cols-2 gap-3">
//                 {generatedImages.slice(0, 4).map(img => (
//                   <div key={img.id} className="relative group">
//                     <img 
//                       src={img.urls.raw} 
//                       alt={img.prompt} 
//                       className="w-full h-24 object-cover rounded-lg"
//                     />
//                     <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center gap-2 transition-opacity">
//                       <button className="p-2 bg-slate-700/80 rounded-full hover:bg-slate-600">
//                         <FaDownload size={14} />
//                       </button>
//                       <button className="p-2 bg-slate-700/80 rounded-full hover:bg-slate-600">
//                         <FaShare size={14} />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-sm text-slate-400">Your generated images will appear here</p>
//             )}
//           </div>
//         </div>
        
//         {/* Results Area */}
//         {/* Results Area */}
// <div className="lg:w-2/3">
//   <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700/50 backdrop-blur-lg min-h-[600px]">
//     {generatedImages.length > 0 ? (
//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <h3 className="font-medium">Generated Results</h3>
//           <div className="text-sm text-slate-400">
//             Seed: {seed}
//           </div>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {generatedImages.slice(0, 4).map(img => (
//             <div key={img.id} className="group relative ">
//               <div className="relative pt-[100%]"> {/* This maintains aspect ratio */}
//               <img 
//   src={img.urls.regular} 
//   alt={img.prompt}
//   className="w-full h-full object-cover"
 
// />
//               </div>
//               <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
//                 <p className="text-sm line-clamp-2">{img.prompt}</p>
//               </div>
//               <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 flex gap-2 transition-opacity">
//                 <button className="p-2 bg-slate-700/80 rounded-full hover:bg-slate-600">
//                   <FaDownload size={16} />
//                 </button>
//                 <button className="p-2 bg-slate-700/80 rounded-full hover:bg-slate-600">
//                   <FaShare size={16} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         <div className="flex gap-4">
//           <button 
//             onClick={() => setSeed(Math.floor(Math.random() * 1000000))}
//             className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
//           >
//             New Variations
//           </button>
//           <button 
//             onClick={fetchImages}
//             className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg flex items-center gap-2"
//           >
//             <FaMagic />
//             Generate Again
//           </button>
//         </div>
//       </div>
//     ) : (
//       <div className="flex flex-col items-center justify-center h-full text-center">
//         <div className="w-24 h-24 rounded-full bg-slate-700/50 flex items-center justify-center mb-4">
//           <FaImage size={32} className="text-slate-500" />
//         </div>
//         <h3 className="text-xl font-medium mb-2">No images generated yet</h3>
//         <p className="text-slate-400 max-w-md">
//           Enter a prompt and click "Generate Image" to create your first AI artwork.
//           Describe what you want to see in as much detail as possible.
//         </p>
//       </div>
//     )}
//   </div>
// </div>
//       </div>
//     </div>
//   );
// }


// app/dashboard/image-generation/page.jsx
'use client';

import { useState, useRef } from 'react';
import { FaMagic, FaImage, FaDownload, FaShare, FaHistory, FaPlus, FaMinus } from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';
import { useAuth } from '@/app/context/AuthContext';

export default function ImageGeneration() {
   const {userData}=useAuth();
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('regular');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [seed, setSeed] = useState(Math.floor(Math.random() * 1000000));
  const [steps, setSteps] = useState(30);
  const canvasRef = useRef(null);



  const incrementImage = async () => {
    console.log("datais",userData)
    const email=userData.email;
    const res = await fetch('/api/users/increment-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
  
    const data = await res.json();
    console.log(data);
  };
  

  const imageFormats = [
    { id: 'raw', name: 'Raw', icon: <FaImage /> },
    { id: 'full', name: 'Full', icon: <FaImage /> },
    { id: 'regular', name: 'Regular', icon: <FaImage /> },
    { id: 'small', name: 'Small', icon: <FaImage /> },
    { id: 'thumb', name: 'Thumbnail', icon: <FaImage /> },
  ];

  const ratios = ['1:1', '16:9', '9:16', '4:3', '3:4'];

  const API_URL = "https://api.unsplash.com/search/photos";
  const API_KEY = "o9A5rEHGg83stGivgbYzy7GxuMSj2wT6FtYpRy3_nBY";

  const fetchImages = async () => {
    if (!prompt) return;
    setIsGenerating(true);
   
    try {
      const response = await fetch(`${API_URL}?query=${prompt}&client_id=${API_KEY}`);
      const data = await response.json();
      setGeneratedImages(data.results);
      incrementImage();
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getImageUrl = (image) => {
    switch(selectedFormat) {
      case 'raw':
        return image.urls.raw;
      case 'full':
        return image.urls.full;
      case 'regular':
        return image.urls.regular;
      case 'small':
        return image.urls.small;
      case 'thumb':
        return image.urls.thumb;
      default:
        return image.urls.regular;
    }
  };

  const handleRatioChange = (ratio) => {
    setAspectRatio(ratio);
  };

  const adjustSteps = (amount) => {
    setSteps(prev => Math.min(50, Math.max(10, prev + amount)));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Generation Controls */}
        <div className="lg:w-1/3 space-y-6">
          <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700/50 backdrop-blur-lg">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <FaMagic className="text-purple-400" />
              Image Generation
            </h2>
            
            {/* Prompt Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Describe your image</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A majestic lion in the savannah at sunset..."
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={3}
              />
            </div>
            
            {/* Negative Prompt */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Avoid in image (optional)</label>
              <input
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                placeholder="blurry, distorted, watermark..."
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            {/* Image Format Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Image Quality</label>
              <div className="flex flex-wrap gap-2">
                {imageFormats.map(format => (
                  <button
                    key={format.id}
                    onClick={() => setSelectedFormat(format.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${selectedFormat === format.id ? 'bg-purple-600' : 'bg-slate-700 hover:bg-slate-600'}`}
                  >
                    {format.icon}
                    {format.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Aspect Ratio */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Aspect Ratio</label>
              <div className="flex flex-wrap gap-2">
                {ratios.map(ratio => (
                  <button
                    key={ratio}
                    onClick={() => handleRatioChange(ratio)}
                    className={`px-3 py-2 rounded-lg text-sm ${aspectRatio === ratio ? 'bg-purple-600' : 'bg-slate-700 hover:bg-slate-600'}`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Advanced Options */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">Generation Steps</label>
                <span className="text-sm text-slate-400">{steps}</span>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => adjustSteps(-5)} 
                  disabled={steps <= 10}
                  className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 disabled:opacity-50"
                >
                  <FaMinus size={12} />
                </button>
                <div className="flex-1 bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full" 
                    style={{ width: `${((steps - 10) / 40) * 100}%` }}
                  ></div>
                </div>
                <button 
                  onClick={() => adjustSteps(5)} 
                  disabled={steps >= 50}
                  className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 disabled:opacity-50"
                >
                  <FaPlus size={12} />
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                More steps = higher quality (slower generation)
              </p>
            </div>
            
            {/* Generate Button */}
            <button
              onClick={fetchImages}
              disabled={isGenerating || !prompt.trim()}
              className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${isGenerating || !prompt.trim() ? 'bg-slate-700 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500'}`}
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <FaMagic />
                  Generate Image
                </>
              )}
            </button>
          </div>
          
          {/* Generation History */}
          <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700/50 backdrop-blur-lg">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <FaHistory />
              Recent Generations
            </h3>
            {generatedImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {generatedImages.slice(0, 4).map(img => (
                  <div key={img.id} className="relative group">
                    <img 
                      src={getImageUrl(img)} 
                      alt={img.alt_description || 'Generated image'} 
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center gap-2 transition-opacity">
                      <button className="p-2 bg-slate-700/80 rounded-full hover:bg-slate-600">
                        <FaDownload size={14} />
                      </button>
                      <button className="p-2 bg-slate-700/80 rounded-full hover:bg-slate-600">
                        <FaShare size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">Your generated images will appear here</p>
            )}
          </div>
        </div>
        
        {/* Results Area */}
        <div className="lg:w-2/3">
          <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700/50 backdrop-blur-lg min-h-[600px]">
            {generatedImages.length > 0 ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Generated Results</h3>
                  <div className="text-sm text-slate-400">
                    Seed: {seed}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generatedImages.slice(0, 4).map(img => (
                    <div key={img.id} className="group relative">
                      <div className="relative pt-[100%]">
                        <img 
                          src={getImageUrl(img)} 
                          alt={img.alt_description || 'Generated image'}
                          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                        <p className="text-sm line-clamp-2">{img.alt_description || 'Generated image'}</p>
                      </div>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 flex gap-2 transition-opacity">
                        <button className="p-2 bg-slate-700/80 rounded-full hover:bg-slate-600">
                          <FaDownload size={16} />
                        </button>
                        <button className="p-2 bg-slate-700/80 rounded-full hover:bg-slate-600">
                          <FaShare size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => setSeed(Math.floor(Math.random() * 1000000))}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
                  >
                    New Variations
                  </button>
                  <button 
                    onClick={fetchImages}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg flex items-center gap-2"
                  >
                    <FaMagic />
                    Generate Again
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-24 h-24 rounded-full bg-slate-700/50 flex items-center justify-center mb-4">
                  <FaImage size={32} className="text-slate-500" />
                </div>
                <h3 className="text-xl font-medium mb-2">No images generated yet</h3>
                <p className="text-slate-400 max-w-md">
                  Enter a prompt and click "Generate Image" to create your first AI artwork.
                  Describe what you want to see in as much detail as possible.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
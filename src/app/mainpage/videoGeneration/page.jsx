
'use client'
import { useState, useEffect } from 'react';
import { Search, Film, X, ExternalLink, Clock, History, Play, Sparkles } from 'lucide-react';

const VideoGeneration = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isExpandedSearch, setIsExpandedSearch] = useState(false);
  
  const API_KEY = "HQKCfWd4EhYF8uqqydrbJnJDeoVqkxrdYYv6VCqf7CRyYhIKsHvTlYrU";
  const per_page = 15;

  useEffect(() => {
    const history = localStorage.getItem('videoSearchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  const addToSearchHistory = (term) => {
    const newHistory = [term, ...searchHistory.filter(item => item !== term)].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem('videoSearchHistory', JSON.stringify(newHistory));
  };

  const generateVideos = async (searchTerm = query) => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const url = `https://api.pexels.com/videos/search?query=${encodeURIComponent(searchTerm)}&per_page=${per_page}`;
      const response = await fetch(url, {
        headers: {
          Authorization: API_KEY
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate videos');
      }
      
      const data = await response.json();
      setVideos(data.videos || []);
      addToSearchHistory(searchTerm);
    } catch (err) {
      setError(err.message);
      setVideos([]);
    } finally {
      setLoading(false);
      setIsExpandedSearch(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateVideos();
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Floating header */}
        <div className="sticky top-4 z-10 mb-8 backdrop-blur-sm bg-white/10 rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center">
              <div className="p-3 bg-indigo-600 rounded-lg mr-3">
                <Sparkles className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold text-white">
              <span className="text-indigo-300">Unigen</span>AI
              </h1>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Describe videos you want to generate..."
                  className="w-full px-5 py-3 pr-14 text-white bg-gray-800/80 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition-all"
                  onFocus={() => setIsExpandedSearch(true)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors"
                  disabled={loading}
                >
                  <Sparkles size={20} />
                </button>
              </div>
            </form>
            
            {isExpandedSearch && (
              <button 
                onClick={() => setIsExpandedSearch(false)}
                className="md:hidden text-gray-300 hover:text-white"
              >
                <X size={24} />
              </button>
            )}
          </div>
          
          {isExpandedSearch && searchHistory.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex items-center gap-2 text-gray-300 mb-2">
                <History size={18} className="text-indigo-400" />
                <span className="text-sm">Recent generations</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(term);
                      generateVideos(term);
                    }}
                    className="px-3 py-1 text-sm bg-gray-800 text-gray-200 rounded-full hover:bg-gray-700 transition-colors flex items-center gap-1"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          {error && (
            <div className="p-4 mb-6 text-red-300 bg-red-900/50 rounded-lg flex items-center border border-red-700/50">
              <X className="mr-2" size={20} />
              {error}
            </div>
          )}

          {selectedVideo ? (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 mb-8 animate-fadeIn">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-white">AI Generated: {query}</h2>
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <X size={16} /> Back to results
                  </button>
                </div>
                
                <div className="rounded-xl overflow-hidden shadow-lg mb-6 bg-black aspect-video">
                  <video 
                    controls 
                    autoPlay
                    className="w-full h-full object-cover"
                    src={selectedVideo.video_files[0]?.link || ''}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-indigo-900/50 p-3 rounded-full">
                        <Sparkles className="text-indigo-300" size={20} />
                      </div>
                      <div>
                        <p className="text-gray-300 font-medium">Generation ID</p>
                        <p className="text-white">AI-{selectedVideo.id.toString().slice(0, 8)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-700/50 p-3 rounded-full">
                        <Clock className="text-gray-300" size={20} />
                      </div>
                      <div>
                        <p className="text-gray-300 font-medium">Duration</p>
                        <p className="text-white">{formatDuration(selectedVideo.duration)}</p>
                      </div>
                    </div>
                    
                    <div className="text-gray-400 px-4 py-2 rounded-lg">
                      Powered by Unigen AI
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {loading ? (
                <div className="flex flex-col items-center justify-center my-16 gap-4">
                  <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                  <p className="text-gray-400">Generating AI videos...</p>
                  <p className="text-gray-500 text-sm">This may take a few moments</p>
                </div>
              ) : videos.length > 0 ? (
                <div className="animate-fadeIn">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-semibold text-white">
                      AI Generated: <span className="text-indigo-300">"{query}"</span>
                    </h2>
                    <p className="text-gray-400">
                      {videos.length} videos generated
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {videos.map((video) => (
                      <div 
                        key={video.id} 
                        className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer bg-gray-800/50 backdrop-blur-sm border border-gray-700/30"
                        onClick={() => setSelectedVideo(video)}
                      >
                        <div className="aspect-video bg-gray-900 relative overflow-hidden">
                          <img 
                            src={video.image} 
                            alt={`AI generated video for ${query}`}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                            <div className="self-end bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center">
                              <Clock size={12} className="mr-1" />
                              {formatDuration(video.duration)}
                            </div>
                            <div className="flex justify-center mb-4">
                              <div className="bg-indigo-600/90 text-white p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                                <Play size={16} fill="currentColor" />
                                <span className="font-medium">Play</span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                            AI Generated
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                              <Sparkles size={16} className="text-indigo-400" />
                            </div>
                            <p className="font-medium text-white">
                              Generation #{video.id.toString().slice(0, 6)}
                            </p>
                          </div>
                          <p className="text-sm text-gray-400">
                            Created just now
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : query && !loading && (
                <div className="text-center my-16 p-8 bg-gray-800/50 rounded-2xl border border-gray-700/50">
                  <Sparkles size={72} className="text-indigo-500 mx-auto mb-4" />
                  <p className="text-gray-400 text-xl mb-2">No videos generated for "{query}"</p>
                  <p className="text-gray-500">Try different descriptions or check your input</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoGeneration;
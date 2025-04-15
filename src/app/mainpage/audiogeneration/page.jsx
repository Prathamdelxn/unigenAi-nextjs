// components/VoiceChanger.js
'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiPlay, FiPause, FiVolume2, FiDownload, FiRefreshCw } from 'react-icons/fi';

const VOICE_OPTIONS = [
  { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel', accentColor: 'bg-pink-500' },
  { id: 'AZnzlk1XvdvUeBnXmlld', name: 'Domi', accentColor: 'bg-purple-500' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella', accentColor: 'bg-blue-500' },
  { id: 'ErXwobaYiN019PkySvjV', name: 'Antoni', accentColor: 'bg-amber-500' },
];

export default function VoiceChanger() {
  const [text, setText] = useState('');
  const [voiceId, setVoiceId] = useState(VOICE_OPTIONS[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const audioRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);

  const selectedVoice = VOICE_OPTIONS.find(v => v.id === voiceId);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
      setIsPlaying(!audio.paused);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('play', () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('play', () => setIsPlaying(true));
      audio.removeEventListener('pause', () => setIsPlaying(false));
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, [audioUrl]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/api/generator', {
        text,
        voiceId,
      }, {
        responseType: 'blob'
      });
      
      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(audioBlob);
      
      setAudioUrl(url);
      setIsPlaying(true);
    } catch (err) {
      console.error('Error generating voice:', err);
      setError('Failed to generate voice. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const downloadAudio = () => {
    if (!audioUrl) return;
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = `voice-${selectedVoice.name}-${Date.now()}.mp3`;
    a.click();
  };

  const handleProgressClick = (e) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pos * audioRef.current.duration;
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Voice AI Studio
          </h2>
          <p className="text-gray-400 text-sm">Powered by UnigenAI</p>
        </div>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${selectedVoice.accentColor} text-white shadow-lg`}>
          <FiVolume2 size={24} />
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="text" className="block text-sm font-medium text-gray-300 mb-2">
            Text to Convert
          </label>
          <textarea
            id="text"
            className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-500 transition-all"
            rows="4"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="voice" className="block text-sm font-medium text-gray-300 mb-2">
            Voice Personality
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {VOICE_OPTIONS.map((voice) => (
              <button
                key={voice.id}
                type="button"
                className={`p-3 rounded-lg border transition-all ${voiceId === voice.id ? `${voice.accentColor} text-white border-transparent` : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'}`}
                onClick={() => setVoiceId(voice.id)}
              >
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${voiceId === voice.id ? 'bg-white text-gray-900' : voice.accentColor}`}>
                    <FiVolume2 size={14} />
                  </div>
                  <span className="text-sm">{voice.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <button
          type="submit"
          className={`w-full py-3 px-6 rounded-xl font-medium transition-all flex items-center justify-center space-x-2 ${
            isLoading 
              ? 'bg-blue-400 text-white' 
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg'
          }`}
          disabled={isLoading || !text.trim()}
        >
          {isLoading ? (
            <>
              <FiRefreshCw className="animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <FiPlay />
              <span>Generate Voice</span>
            </>
          )}
        </button>
      </form>
      
      {error && (
        <div className="mb-6 p-3 bg-red-900/50 border border-red-700 text-red-200 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      {audioUrl && (
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <button
                onClick={togglePlayback}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedVoice.accentColor} text-white shadow-md hover:opacity-90 transition-opacity`}
              >
                {isPlaying ? <FiPause /> : <FiPlay />}
              </button>
              <div>
                <h3 className="font-medium text-gray-100">{selectedVoice.name}'s Voice</h3>
                <p className="text-xs text-gray-400">Generated just now</p>
              </div>
            </div>
            <button
              onClick={downloadAudio}
              className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700 transition-colors"
              title="Download audio"
            >
              <FiDownload />
            </button>
          </div>
          
          <div className="mb-2">
            <div 
              className="h-1.5 bg-gray-700 rounded-full cursor-pointer relative"
              onClick={handleProgressClick}
            >
              <div 
                className={`h-full ${selectedVoice.accentColor} rounded-full absolute top-0 left-0`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>
              {audioRef.current ? 
                new Date(audioRef.current.currentTime * 1000).toISOString().substr(14, 5) : 
                '0:00'
              }
            </span>
            <div className="flex items-center space-x-2">
              <FiVolume2 className="text-gray-400" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 accent-blue-500"
              />
            </div>
            <span>
              {audioRef.current ? 
                new Date(audioRef.current.duration * 1000).toISOString().substr(14, 5) : 
                '0:00'
              }
            </span>
          </div>
          
          <audio ref={audioRef} src={audioUrl} className="hidden" />
        </div>
      )}
    </div>
  );
}
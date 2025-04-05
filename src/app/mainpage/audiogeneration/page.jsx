'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [romanText, setRomanText] = useState('');
  const [convertedText, setConvertedText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const loadVoices = () => {
        const allVoices = window.speechSynthesis.getVoices();
        const marathiVoices = allVoices.filter(v => v.lang === 'mr-IN');
        setVoices(marathiVoices);
        if (marathiVoices.length > 0) {
          setSelectedVoice(marathiVoices[0]);
        }
      };

      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
      } else {
        loadVoices();
      }
    }
  }, []);

  const handleTransliterate = async () => {
    try {
      const url = `https://inputtools.google.com/request?text=${romanText}&itc=mr-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`;
      const res = await axios.get(url);
      const devanagari = res.data[1][0][1][0];
      setConvertedText(devanagari);
    } catch (error) {
      console.error('Transliteration failed:', error);
    }
  };

  const handleSpeak = () => {
    if (!convertedText || !selectedVoice) return;

    const utter = new SpeechSynthesisUtterance(convertedText);
    utter.voice = selectedVoice;
    utter.lang = selectedVoice.lang;
    window.speechSynthesis.speak(utter);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-2xl mb-4 font-bold">Roman Marathi to Speech</h1>

      <textarea
        value={romanText}
        onChange={(e) => setRomanText(e.target.value)}
        placeholder="Type in Roman Marathi"
        className="w-full p-2 border rounded"
      />

      <div className="my-4">
        <label className="mr-2">Select Voice:</label>
        <select
          onChange={(e) => {
            const selected = voices.find(v => v.name === e.target.value);
            setSelectedVoice(selected || null);
          }}
          value={selectedVoice?.name || ''}
          className="p-2 border rounded"
        >
          {voices.length === 0 && <option>Loading voices...</option>}
          {voices.map((voice, index) => (
            <option key={index} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleTransliterate}
        className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
      >
        Convert
      </button>

      <button
        onClick={handleSpeak}
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={!convertedText || !selectedVoice}
      >
        Speak
      </button>

      {convertedText && (
        <p className="mt-4 text-xl text-black">
          <strong>Devanagari:</strong> {convertedText}
        </p>
      )}
    </div>
  );
}

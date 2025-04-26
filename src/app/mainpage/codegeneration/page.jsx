"use client";
import { useState, useRef, useEffect } from 'react';
import { FiSend, FiCopy, FiDownload, FiRefreshCw, FiCode, FiSettings } from 'react-icons/fi';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vsDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const [history, setHistory] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    temperature: 0.7,
    maxTokens: 1000,
    model: 'deepseek-coder' // DeepSeek model
  });
  
  const codeRef = useRef(null);
  const promptRef = useRef(null);
  const API_KEY = "sk-8c34227aa00446fd935b0b84c057b6c5"; // Your DeepSeek API key

  const detectLanguage = (code) => {
    if (code.includes('React') || code.includes('jsx')) return 'javascript';
    if (code.includes('def ') || code.includes('import ')) return 'python';
    if (code.includes('function ') || code.includes('=>')) return 'javascript';
    if (code.includes('class ') || code.includes('public ')) return 'java';
    if (code.includes('#include')) return 'cpp';
    return 'javascript';
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!prompt.trim()) return;
    
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${API_KEY}`
  //       },
  //       body: JSON.stringify({
  //         model: settings.model,
  //         messages: [
  //           {
  //             role: "user",
  //             content: `Generate ${language} code for: ${prompt}. Only respond with the code, no explanations.`
  //           }
  //         ],
  //         temperature: settings.temperature,
  //         max_tokens: settings.maxTokens
  //       })
  //     });

  //     if (!response.ok) {
  //       throw new Error(`API request failed with status ${response.status}`);
  //     }

  //     const data = await response.json();
  //     const code = data.choices?.[0]?.message?.content || "// No code generated";
      
  //     setGeneratedCode(code);
  //     const detectedLanguage = detectLanguage(code);
  //     setLanguage(detectedLanguage);
      
  //     // Add to history
  //     setHistory(prev => [{
  //       prompt,
  //       code: code,
  //       language: detectedLanguage,
  //       timestamp: new Date().toISOString()
  //     }, ...prev.slice(0, 4)]);
      
  //   } catch (error) {
  //     console.error("Error generating code:", error);
  //     setGeneratedCode(`// Error generating code: ${error.message}`);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Rest of your existing functions (copyToClipboard, downloadCode, regenerateCode) remain the same
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "deepseek-chat", // Use correct model name
          messages: [
            {
              role: "system",
              content: "You are a helpful coding assistant. Respond only with the code, no explanations."
            },
            {
              role: "user",
              content: `Generate ${language} code for: ${prompt}`
            }
          ],
          temperature: settings.temperature,
          max_tokens: settings.maxTokens,
          stream: false
        })
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || `API request failed with status ${response.status}`);
      }
  
      const code = data.choices?.[0]?.message?.content?.trim() || "// No code generated";
      
      setGeneratedCode(code);
      const detectedLanguage = detectLanguage(code);
      setLanguage(detectedLanguage);
      
      // Add to history
      setHistory(prev => [{
        prompt,
        code: code,
        language: detectedLanguage,
        timestamp: new Date().toISOString()
      }, ...prev.slice(0, 4)]);
      
    } catch (error) {
      console.error("Error generating code:", error);
      setGeneratedCode(`// Error generating code: ${error.message}\n// Check console for details`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const copyToClipboard = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
    }
  };

  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated-code-${new Date().getTime()}.${language}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const regenerateCode = () => {
    if (prompt) handleSubmit({ preventDefault: () => {} });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800/50 border-b border-gray-700 p-4">
        <div className="container mx-auto max-w-7xl flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <FiCode className="text-blue-400" />
            <span>AI <span className="text-blue-400">Code</span> Generator</span>
          </h1>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-lg ${showSettings ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-700 transition-colors`}
          >
            <FiSettings />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - History */}
        <aside className="w-64 bg-gray-800/50 border-r border-gray-700 hidden md:block overflow-y-auto">
          <div className="p-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Recent Generations
            </h2>
            {history.length === 0 ? (
              <p className="text-gray-500 text-sm">Your generation history will appear here</p>
            ) : (
              <div className="space-y-3">
                {history.map((item, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors"
                    onClick={() => {
                      setPrompt(item.prompt);
                      setGeneratedCode(item.code);
                      setLanguage(item.language);
                      promptRef.current?.focus();
                    }}
                  >
                    <p className="text-sm line-clamp-2">{item.prompt}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-400">
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-600 rounded-full">
                        {item.language}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Settings Panel */}
          {showSettings && (
            <div className="bg-gray-800 border-b border-gray-700 p-4">
              <div className="container mx-auto max-w-4xl">
                <h2 className="text-lg font-semibold mb-3">Generation Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Temperature: {settings.temperature}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={settings.temperature}
                      onChange={(e) => setSettings({...settings, temperature: parseFloat(e.target.value)})}
                      className="w-full accent-blue-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Precise</span>
                      <span>Creative</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Max Tokens: {settings.maxTokens}
                    </label>
                    <input
                      type="range"
                      min="100"
                      max="2000"
                      step="100"
                      value={settings.maxTokens}
                      onChange={(e) => setSettings({...settings, maxTokens: parseInt(e.target.value)})}
                      className="w-full accent-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Language
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm"
                    >
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                      <option value="cpp">C++</option>
                      <option value="html">HTML</option>
                      <option value="css">CSS</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Code Display */}
          <div className="flex-1 overflow-auto p-4 bg-gray-900">
            {generatedCode ? (
              <div className="relative h-full">
                <div className="absolute top-2 right-2 flex space-x-2 z-10">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 bg-gray-700/50 hover:bg-gray-700 rounded-md transition-colors"
                    title="Copy to clipboard"
                  >
                    <FiCopy className="text-gray-300" />
                  </button>
                  <button
                    onClick={downloadCode}
                    className="p-2 bg-gray-700/50 hover:bg-gray-700 rounded-md transition-colors"
                    title="Download code"
                  >
                    <FiDownload className="text-gray-300" />
                  </button>
                  <button
                    onClick={regenerateCode}
                    className="p-2 bg-gray-700/50 hover:bg-gray-700 rounded-md transition-colors"
                    title="Regenerate"
                    disabled={isLoading}
                  >
                    <FiRefreshCw className={`text-gray-300 ${isLoading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
                
                <SyntaxHighlighter
                  language={language}
                  style={vsDark}
                  customStyle={{
                    margin: 0,
                    padding: '1.5rem',
                    borderRadius: '0.5rem',
                    height: '100%',
                    fontSize: '0.9rem'
                  }}
                >
                  {generatedCode}
                </SyntaxHighlighter>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <FiCode className="text-5xl text-gray-600 mb-4" />
                <h2 className="text-xl font-medium text-gray-400 mb-2">No code generated yet</h2>
                <p className="text-gray-500 max-w-md">
                  Enter a prompt describing the code you need and let DeepSeek AI generate it for you.
                </p>
              </div>
            )}
          </div>

          {/* Prompt Input */}
          <div className="bg-gray-800/50 border-t border-gray-700 p-4">
            <form onSubmit={handleSubmit} className="container mx-auto max-w-4xl">
              <div className="relative">
                <textarea
                  ref={promptRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the code you want to generate (e.g., 'React component for a login form')"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows="2"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!prompt.trim() || isLoading}
                  className={`absolute right-3 bottom-3 p-2 rounded-lg ${!prompt.trim() || isLoading ? 'bg-gray-600 text-gray-400' : 'bg-blue-600 hover:bg-blue-700 text-white'} transition-colors`}
                >
                  {isLoading ? (
                    <FiRefreshCw className="animate-spin" />
                  ) : (
                    <FiSend />
                  )}
                </button>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="flex space-x-2">
                  <span className="text-xs text-gray-400">
                    {prompt.length}/1000
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  Press Shift+Enter for new line
                </span>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CodeGenerator;
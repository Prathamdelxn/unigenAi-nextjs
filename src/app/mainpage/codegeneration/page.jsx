'use client'
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useAuth } from '@/app/context/AuthContext';
export default function CodeGenerationPage() {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
 const {userData}=useAuth();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  async function generateAnswer(e) {
    e.preventDefault();
    if (!question.trim()) return;
    
    setGeneratingAnswer(true);
    const currentQuestion = question;
    setQuestion("");
    
    setChatHistory(prev => [...prev, { type: 'question', content: currentQuestion }]);
    
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDB0slJ6cQYEKJGUbo44cANf4q_XDglWrs`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: currentQuestion }] }],
        },
      });

      const aiResponse = response["data"]["candidates"][0]["content"]["parts"][0]["text"];
      historyAdd(currentQuestion);
      incrementCode();
      setChatHistory(prev => [...prev, { type: 'answer', content: aiResponse }]);
    } catch (error) {
      console.log(error);
      setChatHistory(prev => [...prev, { 
        type: 'answer', 
        content: "Sorry - Something went wrong. Please try again!" 
      }]);
    }
    setGeneratingAnswer(false);
  }


  const incrementCode = async () => {
    console.log("datais",userData)
    const email=userData.email;
    const res = await fetch('/api/users/increment-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
  
    const data = await res.json();
    console.log(data);
  }; 
 const historyAdd=async(prompt)=>{
    const id=userData.id;
     const now = new Date();
     const time = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const day = now.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
    const historyData = {
    userId: id,
    toolType: "Code Generation",
    details: prompt,
    time: time,
    day: day
  };
     const res = await fetch('/api/users/history-add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(historyData),
    });
  
    const data = await res.json();
    console.log(data);
   }
  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
        <h1 className="text-xl font-bold text-white">Code Generation AI</h1>
        <p className="text-sm text-slate-300">Get help with your coding questions</p>
      </div>

      {/* Chat Container */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto mb-4 rounded-lg bg-slate-800/50 border border-slate-700/50 p-4 space-y-4"
      >
        {chatHistory.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            <div className="bg-slate-800/70 rounded-xl p-8 max-w-2xl border border-slate-700/50">
              <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-4">Code Generation Assistant</h2>
              <p className="text-slate-300 mb-6">
                Ask me anything about programming - from syntax questions to architecture advice.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                {[
                  "Explain React hooks",
                  "How to optimize SQL queries",
                  "Python async/await example",
                  "Fix this JavaScript error"
                ].map((example, i) => (
                  <div 
                    key={i} 
                    className="bg-slate-700/50 p-3 rounded-lg border border-slate-700 hover:border-indigo-400/50 cursor-pointer transition-all"
                    onClick={() => setQuestion(example)}
                  >
                    <p className="text-slate-200 truncate">"{example}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {chatHistory.map((chat, index) => (
              <div key={index} className={`flex ${chat.type === 'question' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl ${
                  chat.type === 'question' 
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-slate-700/70 text-slate-100 rounded-bl-none border border-slate-600/50'
                }`}>
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => <p className="mb-3 last:mb-0" {...props} />,
                      h1: ({ node, ...props }) => <h1 className="text-xl font-bold mt-4 mb-2" {...props} />,
                      h2: ({ node, ...props }) => <h2 className="text-lg font-bold mt-3 mb-2" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-3" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-3" {...props} />,
                      li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                      code: ({ node, inline, className, children, ...props }) => inline ? (
                        <code className="bg-slate-800 text-indigo-300 px-1 py-0.5 rounded text-sm font-mono" {...props}>
                          {children}
                        </code>
                      ) : (
                        <div className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto my-3 border border-slate-700">
                          <code className="font-mono text-sm" {...props}>
                            {children}
                          </code>
                        </div>
                      ),
                      a: ({ node, ...props }) => <a className="text-indigo-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                      blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-slate-500 pl-4 italic text-slate-300 my-3" {...props} />
                    }}
                  >
                    {chat.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </>
        )}
        {generatingAnswer && (
          <div className="flex justify-start">
            <div className="max-w-[85%] p-4 rounded-2xl bg-slate-700/70 text-slate-100 rounded-bl-none border border-slate-600/50">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={generateAnswer} className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-4">
        <div className="flex gap-3">
          <textarea
            required
            className="flex-1 border border-slate-700 rounded-xl p-3 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 resize-none transition-all bg-slate-800 text-white placeholder-slate-500"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a coding question..."
            rows="2"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                generateAnswer(e);
              }
            }}
          ></textarea>
          <button
            type="submit"
            className={`self-end px-5 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl hover:from-indigo-700 hover:to-blue-600 transition-all shadow-md ${
              generatingAnswer ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={generatingAnswer}
          >
            {generatingAnswer ? (
              <svg className="animate-spin h-5 w-5 text-white mx-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-2 text-center">
          AI-generated code may require review and testing before use in production.
        </p>
      </form>
    </div>
  );
}
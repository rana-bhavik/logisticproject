import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, X, Send, User, Sparkles, Cpu, CheckCheck
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: "I'm **Cortex**, your AI Logistics Assistant. How can I help you today? Ask me for a cost estimate or risk classification!",
      time: '10:24 AM'
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setMessage('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ message: userMsg.text }),
      });
      const data = await res.json();
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.reply || 'Sorry, I encountered an error connecting to the neural network.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { 
          id: (Date.now() + 1).toString(), 
          sender: 'ai', 
          text: '**Connection error.** Ensure the backend server is running and you are logged in.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Dynamic Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 p-4 rounded-full z-50 flex items-center justify-center transition-all duration-700 ease-in-out backdrop-blur-2xl border ${
          isOpen 
            ? 'bg-white/80 border-white/50 text-gray-800 rotate-[360deg] scale-90 shadow-xl' 
            : 'bg-gradient-to-tr from-[#3b664d] to-[#63a375] border-white/30 text-white hover:scale-110 hover:shadow-[0_0_40px_rgba(99,163,117,0.6)] shadow-[0_10px_30px_rgba(0,0,0,0.3)]'
        }`}
      >
        {isOpen ? <X size={26} /> : <MessageSquare size={26} />}
        {!isOpen && (
          <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full animate-bounce border-2 border-white shadow-lg">
            1
          </span>
        )}
      </button>

      {/* Mini 3D Glass Chat Widget */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 w-[380px] h-[640px] max-h-[calc(100vh-160px)] z-40 rounded-[40px] flex flex-col p-2.5 origin-bottom-right animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 ease-out overflow-hidden
                     bg-gradient-to-br from-white/20 via-white/5 to-white/10 backdrop-blur-sm
                     border border-white/50 ring-1 ring-white/20
                     shadow-[0_40px_80px_rgba(0,0,0,0.5),inset_0_8px_25px_rgba(255,255,255,0.6),inset_0_-8px_20px_rgba(255,255,255,0.2)]"
        >
          {/* Animated Background Orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#63a375]/30 rounded-full blur-[80px] animate-[spin_10s_linear_infinite] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3b664d]/20 rounded-full blur-[80px] animate-[spin_15s_linear_infinite_reverse] pointer-events-none"></div>

          {/* 3D Thick Refractive Header */}
          <div className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-[2px] rounded-[32px] p-4 flex items-center justify-between shrink-0 shadow-[0_15px_35px_rgba(0,0,0,0.2),inset_0_4px_15px_rgba(255,255,255,0.7)] border-2 border-white/60 relative z-10 overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/glass-texture.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-[20px] bg-gradient-to-br from-white/40 to-white/10 border-2 border-white/50 flex items-center justify-center text-[#2a4d35] shadow-[0_5px_15px_rgba(0,0,0,0.1),inset_0_2px_10px_rgba(255,255,255,1)] backdrop-blur-xl group-hover:scale-110 transition-transform duration-500">
                <Cpu size={24} className="drop-shadow-sm" />
              </div>
              <div>
                <h3 className="text-[#0a1810] text-xl font-black tracking-widest drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]">CORTEX <span className="text-[#3b664d]">AI</span></h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#63a375] shadow-[0_0_12px_#63a375] animate-pulse border border-white"></span>
                  <span className="text-gray-700 text-[11px] font-bold tracking-wider uppercase">System Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-5 p-3 mt-2 scrollbar-none relative z-10">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 shadow-[0_5px_15px_rgba(0,0,0,0.15),inset_0_2px_5px_rgba(255,255,255,0.6)] ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-br from-[#63a375] to-[#3b664d] text-white border-white'
                      : 'bg-gradient-to-br from-white to-gray-200 text-[#2a4d35] border-white'
                  }`}
                >
                  {msg.sender === 'user' ? <User size={16} className="drop-shadow-sm" /> : <Cpu size={16} className="drop-shadow-md" />}
                </div>

                {/* Message Bubble (Ultra Glossy) */}
                <div className="flex flex-col gap-1 max-w-[75%]">
                  <div
                    className={`rounded-[28px] p-4 text-[14px] leading-relaxed border backdrop-blur-xl ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-br from-[#63a375]/90 to-[#4a7254]/90 border-white/30 text-white rounded-tr-sm shadow-[0_15px_25px_rgba(74,114,84,0.3),inset_0_3px_8px_rgba(255,255,255,0.4)]'
                        : 'bg-gradient-to-br from-white/95 to-white/70 border-white text-gray-800 rounded-tl-sm shadow-[0_15px_25px_rgba(0,0,0,0.06),inset_0_3px_10px_rgba(255,255,255,1)]'
                    }`}
                  >
                    {msg.sender === 'ai' ? (
                      <div className="prose prose-sm max-w-none prose-p:my-0.5 prose-ul:my-0.5 prose-li:my-0.5 prose-strong:text-gray-900 prose-code:text-[#3b664d] prose-code:bg-[#3b664d]/10 prose-code:px-1 prose-code:rounded font-medium">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    ) : (
                      <span className="drop-shadow-sm font-semibold">{msg.text}</span>
                    )}
                  </div>
                  <div className={`flex items-center gap-1 text-[10px] text-gray-600 font-bold ${msg.sender === 'user' ? 'justify-end text-gray-200' : 'justify-start ml-2 mt-1'}`}>
                    <span className="opacity-80">{msg.time}</span>
                    {msg.sender === 'user' && <CheckCheck size={12} className="text-white opacity-90 drop-shadow-sm" />}
                  </div>
                </div>
              </div>
            ))}

            {/* Premium AI Thinking Animation */}
            {isLoading && (
              <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-white to-gray-200 border-2 border-white flex items-center justify-center shrink-0 text-[#3b664d] shadow-[0_5px_15px_rgba(0,0,0,0.1),inset_0_2px_5px_rgba(255,255,255,1)]">
                  <Cpu size={16} className="animate-spin-slow drop-shadow-md" />
                </div>
                <div className="bg-gradient-to-br from-white/95 to-white/70 border border-white rounded-[28px] rounded-tl-sm p-5 flex items-center justify-center w-24 shadow-[0_10px_20px_rgba(0,0,0,0.05),inset_0_3px_10px_rgba(255,255,255,1)] backdrop-blur-xl">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 bg-gradient-to-br from-[#63a375] to-[#3b664d] rounded-full animate-bounce shadow-[0_0_8px_rgba(99,163,117,0.6)]"></div>
                    <div className="w-2.5 h-2.5 bg-gradient-to-br from-[#63a375] to-[#3b664d] rounded-full animate-bounce delay-150 shadow-[0_0_8px_rgba(99,163,117,0.6)]"></div>
                    <div className="w-2.5 h-2.5 bg-gradient-to-br from-[#63a375] to-[#3b664d] rounded-full animate-bounce delay-300 shadow-[0_0_8px_rgba(99,163,117,0.6)]"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Premium Glowing Input Area */}
          <div className="mt-auto shrink-0 p-1 relative z-20">
            <form onSubmit={handleSendMessage} className="relative group">
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-[#63a375]/30 blur-2xl rounded-[32px] opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              <div className="relative flex items-center bg-gradient-to-b from-white/95 to-white/80 backdrop-blur-3xl border border-white rounded-[32px] h-[70px] p-1.5 
                              shadow-[0_20px_40px_rgba(0,0,0,0.1),inset_0_4px_12px_rgba(255,255,255,1),inset_0_-4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 group-focus-within:shadow-[0_20px_50px_rgba(99,163,117,0.2),inset_0_4px_12px_rgba(255,255,255,1)]">
                
                <div className="pl-4 text-[#5c8a68] group-focus-within:text-[#3b664d] transition-colors duration-300">
                  <Sparkles size={22} className="drop-shadow-sm animate-pulse" />
                </div>
                
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask Cortex..."
                  className="flex-1 bg-transparent border-none text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-0 px-4 text-[15px] font-bold tracking-wide"
                  disabled={isLoading}
                />
                
                <button
                  type="submit"
                  disabled={!message.trim() || isLoading}
                  className="w-14 h-14 rounded-[26px] flex items-center justify-center bg-gradient-to-br from-[#63a375] to-[#3b664d] text-white hover:to-[#2a4d35] transition-all duration-300
                             shadow-[0_8px_20px_rgba(59,102,77,0.5),inset_0_2px_5px_rgba(255,255,255,0.4)] disabled:opacity-50 disabled:shadow-none shrink-0 group-focus-within:scale-105"
                >
                  <Send size={20} className={!message.trim() ? 'translate-x-0' : 'translate-x-0.5'} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;

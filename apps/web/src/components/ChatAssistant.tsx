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
      text: "I'm **Cortex**, your Logistics Assistant. How can I help you today? Try asking me for a cost estimate or risk classification!",
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
      {/* Floating Action Button (3D Glossy) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 p-4 rounded-full z-50 flex items-center justify-center transition-all duration-500 backdrop-blur-xl border border-white/80 shadow-[0_15px_35px_rgba(0,0,0,0.2),inset_0_4px_10px_rgba(255,255,255,1),inset_0_-4px_10px_rgba(0,0,0,0.1)] ${
          isOpen 
            ? 'bg-gradient-to-br from-white/90 to-white/60 text-gray-800 rotate-90 scale-90' 
            : 'bg-gradient-to-br from-white to-white/70 text-[#3b664d] hover:scale-110 hover:shadow-[0_20px_40px_rgba(0,0,0,0.25),inset_0_4px_10px_rgba(255,255,255,1)]'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 bg-gradient-to-br from-[#5c8a68] to-[#3b664d] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse border-2 border-white shadow-[0_0_10px_rgba(92,138,104,0.8)]">
            1
          </span>
        )}
      </button>

      {/* Mini Crystal Glass Modal */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 w-[380px] h-[600px] z-40 rounded-[35px] flex flex-col p-2 gap-2 origin-bottom-right animate-in zoom-in-95 duration-500
                     bg-gradient-to-br from-white/60 via-white/40 to-white/60 backdrop-blur-[40px]
                     border border-white/80 ring-1 ring-white/40
                     shadow-[0_40px_80px_rgba(0,0,0,0.25),inset_0_4px_10px_rgba(255,255,255,0.9),inset_0_-10px_30px_rgba(255,255,255,0.4),inset_0_30px_60px_rgba(255,255,255,0.6)]"
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-[#102417] via-[#152e1e] to-[#0d1c12] rounded-[28px] p-4 flex items-center justify-between shrink-0 shadow-[0_10px_20px_rgba(0,0,0,0.15),inset_0_2px_5px_rgba(255,255,255,0.15)] border border-white/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-12 h-12 rounded-[16px] bg-gradient-to-br from-white/10 to-transparent border border-white/20 flex items-center justify-center text-[#9bd6ab] shadow-[inset_0_2px_5px_rgba(255,255,255,0.2)] backdrop-blur-md">
                <Cpu size={24} className="drop-shadow-[0_0_10px_rgba(155,214,171,0.5)]" />
              </div>
              <div>
                <h3 className="text-white text-lg font-black tracking-widest drop-shadow-sm">CORTEX <span className="text-[#8fce9f]">AI</span></h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#63a375] shadow-[0_0_8px_#63a375] animate-pulse border border-[#102417]"></span>
                  <span className="text-gray-300 text-xs font-semibold tracking-wide">Always On</span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-6 p-4 scrollbar-thin scrollbar-thumb-black/10 scrollbar-track-transparent">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 shadow-[0_5px_15px_rgba(0,0,0,0.1),inset_0_2px_5px_rgba(255,255,255,0.6)] ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-br from-[#89a990] to-[#6b8e72] text-white border-white'
                      : 'bg-gradient-to-br from-white to-gray-100 text-[#3b664d] border-white'
                  }`}
                >
                  {msg.sender === 'user' ? <User size={16} className="drop-shadow-md" /> : <Cpu size={16} className="drop-shadow-md" />}
                </div>

                {/* Message Bubble (3D Glossy) */}
                <div className="flex flex-col gap-1 max-w-[75%]">
                  <div
                    className={`rounded-[24px] p-4 text-[14px] leading-relaxed border ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-br from-[#7a9e82] to-[#597860] border-white/20 text-white rounded-tr-sm shadow-[0_10px_20px_rgba(90,120,95,0.3),inset_0_2px_5px_rgba(255,255,255,0.3)]'
                        : 'bg-gradient-to-br from-white/95 to-white/70 border-white text-gray-800 rounded-tl-sm backdrop-blur-xl shadow-[0_10px_20px_rgba(0,0,0,0.05),inset_0_2px_6px_rgba(255,255,255,1)]'
                    }`}
                  >
                    {msg.sender === 'ai' ? (
                      <div className="prose prose-sm max-w-none prose-p:my-0.5 prose-ul:my-0.5 prose-li:my-0.5 prose-strong:text-gray-900 prose-code:text-[#3b664d] prose-code:bg-[#3b664d]/10 prose-code:px-1 prose-code:rounded">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    ) : (
                      <span className="drop-shadow-sm font-medium">{msg.text}</span>
                    )}
                  </div>
                  <div className={`flex items-center gap-1 text-[10px] text-gray-500 font-bold ${msg.sender === 'user' ? 'justify-end' : 'justify-start ml-2 mt-1'}`}>
                    <span>{msg.time}</span>
                    {msg.sender === 'user' && <CheckCheck size={12} className="text-[#4da6ff] ml-1 drop-shadow-sm" />}
                  </div>
                </div>
              </div>
            ))}

            {/* AI Thinking Animation */}
            {isLoading && (
              <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-white to-gray-100 border-2 border-white flex items-center justify-center shrink-0 text-[#3b664d] shadow-[0_5px_15px_rgba(0,0,0,0.1),inset_0_2px_5px_rgba(255,255,255,1)]">
                  <Cpu size={16} className="animate-pulse drop-shadow-md" />
                </div>
                <div className="bg-gradient-to-br from-white/95 to-white/70 border border-white rounded-[24px] rounded-tl-sm p-5 flex items-center justify-center w-24 shadow-[0_10px_20px_rgba(0,0,0,0.05),inset_0_2px_6px_rgba(255,255,255,1)] backdrop-blur-xl">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 bg-gradient-to-br from-[#7a9e82] to-[#597860] rounded-full animate-bounce shadow-md"></div>
                    <div className="w-2.5 h-2.5 bg-gradient-to-br from-[#7a9e82] to-[#597860] rounded-full animate-bounce delay-100 shadow-md"></div>
                    <div className="w-2.5 h-2.5 bg-gradient-to-br from-[#7a9e82] to-[#597860] rounded-full animate-bounce delay-200 shadow-md"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 3D Glossy Input Area */}
          <div className="mt-auto shrink-0 p-2">
            <form onSubmit={handleSendMessage} className="relative group">
              <div className="absolute inset-0 bg-white/40 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center bg-gradient-to-b from-white/95 to-white/75 backdrop-blur-2xl border border-white rounded-[28px] h-16 p-1.5 
                              shadow-[0_10px_30px_rgba(0,0,0,0.08),inset_0_3px_8px_rgba(255,255,255,1),inset_0_-3px_8px_rgba(0,0,0,0.05)]">
                <div className="pl-4 text-[#597860]">
                  <Sparkles size={20} className="drop-shadow-sm" />
                </div>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask Cortex..."
                  className="flex-1 bg-transparent border-none text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-0 px-4 text-[14px] font-semibold"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!message.trim() || isLoading}
                  className="w-12 h-12 rounded-[22px] flex items-center justify-center bg-gradient-to-br from-[#6b8e72] to-[#4a7254] text-white hover:to-[#3b664d] transition-all 
                             shadow-[0_5px_15px_rgba(74,114,84,0.4),inset_0_2px_5px_rgba(255,255,255,0.4)] disabled:opacity-50 disabled:shadow-none shrink-0"
                >
                  <Send size={18} className={!message.trim() ? 'translate-x-0' : 'translate-x-0.5'} />
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

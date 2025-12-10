import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'init', role: 'model', text: "Systems Online. I am Nexus, Alex's digital assistant. Ask me about his projects, stack, or experience." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Prepare history for API (converting internal type to API type)
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    try {
      const responseText = await sendMessageToGemini(userMsg.text, history);
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Error connecting to neural network."
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="glass-panel w-80 md:w-96 h-[500px] mb-4 rounded-xl flex flex-col overflow-hidden shadow-2xl shadow-neon-blue/20 border-neon-blue/30 border">
          {/* Header */}
          <div className="bg-neon-panel p-3 border-b border-gray-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-mono text-neon-blue font-bold tracking-wider">NEXUS AI</span>
            </div>
            <button onClick={toggleChat} className="text-gray-400 hover:text-white transition-colors">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 text-sm font-mono leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-neon-blue/20 text-white border border-neon-blue/30'
                      : 'bg-gray-800/80 text-gray-200 border border-gray-700'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800/80 text-neon-blue text-xs p-2 rounded animate-pulse font-mono border border-gray-700">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-neon-panel border-t border-gray-700">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my skills..."
                className="w-full bg-black/50 border border-gray-600 rounded-lg pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:border-neon-blue transition-colors font-mono"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neon-blue hover:text-white transition-colors disabled:opacity-50"
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={toggleChat}
        className={`${
          isOpen ? 'bg-gray-800' : 'bg-neon-blue'
        } text-white w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center group relative border-2 border-white/10`}
      >
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        <i className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-robot'} text-xl ${isOpen ? 'text-white' : 'text-black'}`}></i>
      </button>
    </div>
  );
};

export default AIChatBot;
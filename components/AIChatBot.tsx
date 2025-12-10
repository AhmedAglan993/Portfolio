import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'init', role: 'model', text: "Systems Online. I am Nexus, Ahmed's digital assistant. Ask me about his projects, stack, or experience." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [avatarState, setAvatarState] = useState<'idle' | 'talking'>('idle');

  // Lip Sync Animation Loop
  useEffect(() => {
    let interval: any;
    if (isSpeaking) {
      interval = setInterval(() => {
        setAvatarState(prev => prev === 'idle' ? 'talking' : 'idle');
      }, 150); // Swap every 150ms for talking effect
    } else {
      setAvatarState('idle');
    }
    return () => clearInterval(interval);
  }, [isSpeaking]);


  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null); // Using any because SpeechRecognition types are tricky in React 18

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSend(null, transcript); // Auto-send when voice is detected
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    // Stop any current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    // Try to find a good "tech" voice (usually Google US English or Microsoft Mark)
    const voices = window.speechSynthesis.getVoices();
    const techVoice = voices.find(v => v.name.includes('Google US English')) || voices.find(v => v.name.includes('Microsoft Mark')) || voices[0];

    if (techVoice) utterance.voice = techVoice;
    utterance.pitch = 1; // Slightly lower for AI feel? Maybe 0.9. Default is 1.
    utterance.rate = 1.1; // Slightly faster

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      // Stop speaking if listening starts
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const handleSend = async (e?: React.FormEvent | null, textOverride?: string) => {
    if (e) e.preventDefault();
    const textToSend = textOverride || input;

    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend
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
      speak(responseText); // Auto-speak response
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Error connecting to neural network."
      };
      setMessages(prev => [...prev, errorMsg]);
      speak("Error connecting to neural network.");
    } finally {
      setLoading(false);
    }
  };

  // Add custom styles for the lip-sync animation
  const styles = `
    @keyframes talk {
      0% { transform: scaleY(0.1); }
      20% { transform: scaleY(1); }
      40% { transform: scaleY(0.4); }
      60% { transform: scaleY(0.8); }
      80% { transform: scaleY(0.2); }
      100% { transform: scaleY(0.1); }
    }
    .speaking-mouth {
      animation: talk 0.3s infinite ease-in-out;
    }
    @keyframes scan {
      0% { top: 0%; }
      100% { top: 100%; }
    }
  `;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <style>{styles}</style>
      {/* Chat Window */}
      {isOpen && (
        <div className="glass-panel w-80 md:w-96 h-[600px] mb-4 rounded-xl flex flex-col overflow-hidden shadow-2xl shadow-neon-blue/20 border-neon-blue/30 border">

          {/* Avatar Hologram Header */}
          <div className="relative h-48 bg-black border-b border-neon-blue/30 overflow-hidden shrink-0">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 243, 255, .3) 25%, rgba(0, 243, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 243, 255, .3) 75%, rgba(0, 243, 255, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 243, 255, .3) 25%, rgba(0, 243, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 243, 255, .3) 75%, rgba(0, 243, 255, .3) 76%, transparent 77%, transparent)', backgroundSize: '30px 30px' }}></div>

            {/* Avatar Image Swapper */}
            <div className="absolute inset-x-0 bottom-0 top-4 flex justify-center items-end">
              <div className="relative w-32 h-40">
                <img
                  src={avatarState === 'idle' ? "/avatars/nexus_idle.png" : "/avatars/nexus_talking.png"}
                  alt="Nexus Avatar"
                  className="w-full h-full object-cover rounded-t-xl opacity-90 drop-shadow-[0_0_15px_rgba(0,243,255,0.5)] transition-opacity duration-75"
                />

                {/* Scanline Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-2 w-full animate-[scan_2s_linear_infinite] opacity-30 pointer-events-none"></div>
              </div>
            </div>

            {/* Header Controls Overlay */}
            <div className="absolute top-2 right-2 flex gap-2 z-10">
              {isSpeaking && (
                <button onClick={() => { window.speechSynthesis.cancel(); setIsSpeaking(false); }} className="bg-black/50 p-1 rounded hover:bg-red-500/20 text-white/50 hover:text-white transition-colors">
                  <i className="fa-solid fa-volume-xmark"></i>
                </button>
              )}
              <button onClick={toggleChat} className="bg-black/50 p-1 rounded hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/40 backdrop-blur-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 text-sm font-mono leading-relaxed ${msg.role === 'user'
                    ? 'bg-neon-blue/20 text-white border border-neon-blue/30'
                    : 'bg-gray-800/90 text-gray-200 border border-gray-700'
                    }`}
                >
                  {/* Bot Icon for model messages */}
                  {msg.role === 'model' && <i className="fa-solid fa-robot mr-2 text-neon-blue text-xs"></i>}
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800/80 text-neon-blue text-xs p-2 rounded animate-pulse font-mono border border-gray-700">
                  <i className="fa-solid fa-microchip mr-2 animate-spin"></i> Processing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={(e) => handleSend(e)} className="p-3 bg-neon-panel border-t border-gray-700">
            <div className="relative flex gap-2">
              <button
                type="button"
                onClick={toggleListening}
                className={`w-10 flex items-center justify-center rounded border transition-all ${isListening
                  ? 'bg-red-500/20 border-red-500 text-red-500 animate-pulse'
                  : 'bg-black/50 border-gray-600 text-neon-blue hover:border-neon-blue'
                  }`}
              >
                <i className={`fa-solid ${isListening ? 'fa-microphone-lines' : 'fa-microphone'}`}></i>
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isListening ? "Listening..." : "Ask Nexus..."}
                className="flex-1 bg-black/50 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-blue transition-colors font-mono"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-10 h-full flex items-center justify-center text-neon-blue hover:text-white transition-colors disabled:opacity-50"
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
        className={`${isOpen ? 'bg-gray-800' : 'bg-neon-blue'
          } text-white w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center group relative border-2 border-white/10`}
      >
        {/* Notification Dot */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
        )}
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        <i className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-headset'} text-xl ${isOpen ? 'text-white' : 'text-black'}`}></i>
      </button>
    </div>
  );
};

export default AIChatBot;
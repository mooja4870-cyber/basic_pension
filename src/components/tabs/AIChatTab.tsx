import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Bot } from 'lucide-react';
import { aiService } from '../../services/aiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const AIChatTab: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '안녕하세요! 기초연금 AI 상담원입니다. 궁금하신 점을 물어보세요. (예: 신청 서류가 뭐야?, 소득인정액이 뭐야?)' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const historyBeforeSend: Message[] = [...messages];
    const newMessages: Message[] = [...messages, { role: 'user', text: userMessage }];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await aiService.sendMessage(historyBeforeSend, userMessage);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : "연결 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
      setMessages(prev => [...prev, { role: 'model', text: message }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 flex flex-col h-[calc(100vh-280px)]">
      <div className="flex-1 overflow-y-auto space-y-4 p-2 mb-4 scrollbar-hide">
        {messages.map((msg, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] p-4 rounded-2xl text-lg font-medium shadow-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-800 rounded-tl-none'
            }`}>
              {msg.role === 'model' && <Bot size={18} className="mb-2 text-blue-500" />}
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none flex gap-1">
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-slate-400 rounded-full" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-slate-400 rounded-full" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-slate-400 rounded-full" />
            </div>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 flex gap-2 shadow-lg">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="무엇이든 물어보세요..."
          className="flex-1 bg-transparent p-3 text-lg font-bold outline-none dark:text-white"
        />
        <button 
          onClick={handleSendMessage}
          disabled={!input.trim() || isLoading}
          className="bg-blue-600 dark:bg-blue-500 text-white p-3 rounded-xl active:scale-95 transition-all disabled:opacity-50"
        >
          <Send size={24} />
        </button>
      </div>
    </div>
  );
};

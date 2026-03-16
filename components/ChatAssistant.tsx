'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, RefreshCcw, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
}

const QUICK_REPLIES = [
  'Tell me about yourself',
  'What can you build?',
  'Show me your projects',
  'How can I work with you?',
];

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'bot',
  content:
    "Hey! I'm Shahzaib's AI assistant. I can tell you about his work, skills, projects, or how to get in touch.\n\nWhat would you like to know?",
};

const WEBHOOK_URL = `${process.env.NEXT_PUBLIC_N8N_BASE_URL ?? 'https://n8n.shahzaibai.site'}/webhook/website-message`;

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('chatSessionId');
    const storedHistory = localStorage.getItem('chatHistory');

    if (stored) {
      setSessionId(stored);
    } else {
      const id = 'session-' + crypto.randomUUID();
      localStorage.setItem('chatSessionId', id);
      setSessionId(id);
    }

    if (storedHistory) {
      try {
        setMessages(JSON.parse(storedHistory));
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const sendToWebhook = async (text: string) => {
    const currentSession =
      sessionId || localStorage.getItem('chatSessionId') || 'session-' + Date.now();

    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, chatId: currentSession }),
    });

    const raw = await res.text();
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      data = raw;
    }

    const resolved = Array.isArray(data) ? data[0] : data;
    return typeof resolved === 'string'
      ? resolved
      : resolved?.output ||
          resolved?.message ||
          resolved?.text ||
          resolved?.response ||
          JSON.stringify(data);
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const reply = await sendToWebhook(text);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'bot', content: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          content: 'Sorry, something went wrong. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    const id = 'session-' + crypto.randomUUID();
    localStorage.setItem('chatSessionId', id);
    setSessionId(id);
    setMessages([WELCOME_MESSAGE]);
    localStorage.removeItem('chatHistory');
  };

  return (
    <>
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className={
              isMobile
                ? 'fixed inset-0 z-50 flex flex-col bg-[#FAFAF5]'
                : 'fixed bottom-5 right-5 z-50 w-[380px] max-h-[calc(100vh-40px)] h-[560px] flex flex-col rounded-2xl shadow-2xl border border-[#E5E1D8] bg-[#FAFAF5] overflow-hidden'
            }
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E1D8] bg-white">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full bg-[#D97706]/15 flex items-center justify-center">
                  <MessageCircle className="w-4.5 h-4.5 text-[#D97706]" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1C1C1C]">
                    Shahzaib&apos;s Assistant
                  </p>
                  <p className="text-xs text-[#6B7280]">Usually replies instantly</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleNewChat}
                  className="p-2 rounded-lg text-[#6B7280] hover:text-[#1C1C1C] hover:bg-[#F0ECE3] transition-colors"
                  title="New conversation"
                >
                  <RefreshCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-[#6B7280] hover:text-[#1C1C1C] hover:bg-[#F0ECE3] transition-colors"
                >
                  {isMobile ? <Minimize2 className="w-4 h-4" /> : <X className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[82%] px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#D97706] text-white rounded-2xl rounded-br-md'
                        : 'bg-white border border-[#E5E1D8] text-[#1C1C1C] rounded-2xl rounded-bl-md'
                    }`}
                  >
                    {msg.role === 'bot' ? (
                      <div className="prose-sm break-words">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ children }) => (
                              <p className="mb-2 last:mb-0">{children}</p>
                            ),
                            ul: ({ children }) => (
                              <ul className="list-disc ml-4 mb-2 space-y-1">{children}</ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="list-decimal ml-4 mb-2 space-y-1">{children}</ol>
                            ),
                            a: ({ href, children }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#D97706] underline underline-offset-2"
                              >
                                {children}
                              </a>
                            ),
                            code: ({ children }) => (
                              <code className="bg-[#F0ECE3] text-[#1C1C1C] rounded px-1.5 py-0.5 text-xs font-mono">
                                {children}
                              </code>
                            ),
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}

              {/* Quick replies (only on welcome) */}
              {messages.length === 1 && !isLoading && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {QUICK_REPLIES.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleSend(reply)}
                      className="text-xs px-3 py-1.5 rounded-full border border-[#E5E1D8] text-[#6B7280] hover:border-[#D97706] hover:text-[#D97706] bg-white transition-all"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[#E5E1D8] rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#9CA3AF] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-[#9CA3AF] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-[#9CA3AF] rounded-full animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-[#E5E1D8] bg-white">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2.5 text-sm bg-[#FAFAF5] border border-[#E5E1D8] rounded-full text-[#1C1C1C] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#D97706] transition-colors"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="w-10 h-10 rounded-full bg-[#D97706] hover:bg-[#B45309] text-white flex items-center justify-center shrink-0 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating toggle button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-5 right-5 z-50"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-[#D97706] hover:bg-[#B45309] text-white shadow-lg shadow-[#D97706]/25 flex items-center justify-center transition-all hover:scale-105 group"
            >
              <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

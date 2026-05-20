'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, RefreshCcw, Minimize2, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
}

const QUICK_REPLIES = [
  'Tell me about Shahzaib',
  'What has he built?',
  'What does he teach?',
  'How can I reach him?',
];

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'bot',
  content:
    "Hey. I'm Shahzaib's assistant — ask me about his work, teaching, or how to reach him.",
};

const API_URL = '/api/chat';

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
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

  const sendMessage = async (text: string) => {
    const currentSession =
      sessionId || localStorage.getItem('chatSessionId') || 'session-' + Date.now();

    const history = messages
      .filter((m) => m.id !== 'welcome')
      .map((m) => ({ role: m.role, content: m.content }));

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, chatId: currentSession, history }),
    });

    const data = await res.json();
    return data?.output || data?.message || data?.text || 'Sorry, something went wrong.';
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const reply = await sendMessage(text);
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 18 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={
              isMobile
                ? 'fixed inset-0 z-50 flex flex-col bg-[color:var(--bg)]'
                : 'fixed bottom-5 right-5 z-50 w-[400px] max-h-[calc(100vh-40px)] h-[600px] flex flex-col rounded-3xl glow-rim border border-[color:var(--border)] bg-[color:var(--bg)] overflow-hidden'
            }
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[color:var(--border)] bg-[color:var(--bg-alt)]">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full bg-[color:var(--accent)]/15 grid place-items-center">
                  <Sparkles className="w-4 h-4 text-[color:var(--accent)]" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[color:var(--bg-alt)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[color:var(--text)]">
                    Shahzaib&apos;s assistant
                  </p>
                  <p className="text-[11px] font-mono tracking-wide text-[color:var(--text-muted)]">
                    answers about his work · usually instant
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleNewChat}
                  className="p-2 rounded-lg text-[color:var(--text-muted)] hover:text-[color:var(--text)] hover:bg-[color:var(--bg)] transition-colors"
                  title="New conversation"
                  aria-label="New conversation"
                >
                  <RefreshCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-[color:var(--text-muted)] hover:text-[color:var(--text)] hover:bg-[color:var(--bg)] transition-colors"
                  aria-label="Close"
                >
                  {isMobile ? <Minimize2 className="w-4 h-4" /> : <X className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[82%] px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[color:var(--text)] text-[color:var(--bg)] rounded-2xl rounded-br-md'
                        : 'bg-[color:var(--bg-alt)] border border-[color:var(--border)] text-[color:var(--text)] rounded-2xl rounded-bl-md'
                    }`}
                  >
                    {msg.role === 'bot' ? (
                      <div className="prose-sm break-words">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
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
                                className="text-[color:var(--accent)] underline underline-offset-2"
                              >
                                {children}
                              </a>
                            ),
                            code: ({ children }) => (
                              <code className="bg-[color:var(--bg)] text-[color:var(--text)] rounded px-1.5 py-0.5 text-xs font-mono">
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

              {/* Quick replies on welcome */}
              {messages.length === 1 && !isLoading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK_REPLIES.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleSend(reply)}
                      className="text-xs font-mono px-3 py-1.5 rounded-full border border-[color:var(--border)] text-[color:var(--text-muted)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] bg-[color:var(--bg-alt)] transition-all"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[color:var(--bg-alt)] border border-[color:var(--border)] rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[color:var(--text-faint)] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-[color:var(--text-faint)] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-[color:var(--text-faint)] rounded-full animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-[color:var(--border)] bg-[color:var(--bg-alt)]">
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
                  placeholder="Ask me anything…"
                  className="flex-1 px-4 py-2.5 text-sm bg-[color:var(--bg)] border border-[color:var(--border)] rounded-full text-[color:var(--text)] placeholder:text-[color:var(--text-faint)] focus:outline-none focus:border-[color:var(--accent)] transition-colors"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  aria-label="Send"
                  className="w-10 h-10 rounded-full bg-[color:var(--accent)] hover:bg-[color:var(--accent-hover)] text-white grid place-items-center shrink-0 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating toggle */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-5 right-5 z-50"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-[color:var(--accent)] hover:bg-[color:var(--accent-hover)] text-white shadow-lg shadow-[color:var(--accent)]/25 grid place-items-center transition-all hover:scale-[1.06] group"
              aria-label="Open chat assistant"
            >
              <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

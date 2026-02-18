"use client"

import { useState, useRef, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, X, Send, Loader2, RefreshCcw, Minimize2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "bot"
  content: string
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "bot",
  content: "Hello! I am Shahzaib's AI Assistant. Ask me about his services or pricing.",
}

export default function CustomChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleChat = () => setIsOpen(!isOpen)

  useEffect(() => {
    // Initialize session ID and chat history on mount
    const storedSessionId = localStorage.getItem("chatSessionId")
    const storedHistory = localStorage.getItem("chatHistory")

    if (storedSessionId) {
      setSessionId(storedSessionId)
    } else {
      const newSessionId = "session-" + Math.random().toString(36).substr(2, 9) + "-" + Date.now()
      localStorage.setItem("chatSessionId", newSessionId)
      setSessionId(newSessionId)
    }

    if (storedHistory) {
      try {
        setMessages(JSON.parse(storedHistory))
      } catch (e) {
        console.error("Failed to parse chat history", e)
      }
    }
  }, [])

  // Save messages to local storage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatHistory", JSON.stringify(messages))
    }
  }, [messages])

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isOpen])

  const handleNewChat = () => {
    const newSessionId = "session-" + Math.random().toString(36).substr(2, 9) + "-" + Date.now()
    localStorage.setItem("chatSessionId", newSessionId)
    setSessionId(newSessionId)
    
    setMessages([WELCOME_MESSAGE])
    localStorage.removeItem("chatHistory")
  }

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault()

    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const webhookUrl = "https://n8n.shahzaibai.site/webhook/website-message"
      const currentSessionId = sessionId || localStorage.getItem("chatSessionId") || ("session-" + Date.now())

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message: userMessage.content,
            chatId: currentSessionId
        }),
      })

      const text = await response.text()
      let data
      try {
        data = JSON.parse(text)
      } catch (err) {
        data = text
      }
      
      const responseData = Array.isArray(data) ? data[0] : data          
      const botResponseText = typeof responseData === 'string' 
        ? responseData 
        : (responseData?.output || responseData?.message || responseData?.text || responseData?.response || JSON.stringify(data))

      if (!response.ok && !botResponseText) {
        throw new Error("Network response was not ok")
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: botResponseText,
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: "Sorry, I encountered an error. Please try again later.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed z-50 flex flex-col shadow-2xl border border-zinc-800 bg-[#18181B] text-white overflow-hidden",
              isMobile 
                ? "inset-0 w-full h-full rounded-none" 
                : "bottom-5 right-5 w-[380px] h-[600px] rounded-xl"
            )}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex flex-row items-center justify-between bg-gradient-to-r from-blue-600 to-blue-500">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10 border-2 border-white/20">
                    <AvatarImage src="https://shahzaibbuilds.me/me.png" alt="Bot" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-blue-600"></div>
                </div>
                <div>
                  <h3 className="font-bold text-sm">Shahzaib's Assistant</h3>
                  <p className="text-xs text-blue-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-200 rounded-full animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/20"
                  onClick={handleNewChat}
                  title="Start New Conversation"
                >
                  <RefreshCcw className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/20"
                  onClick={toggleChat}
                >
                  {isMobile ? <Minimize2 className="h-4 w-4" /> : <X className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-hidden bg-[#18181B] relative">
              <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                <div className="flex flex-col gap-6 pb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex w-full",
                        message.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "relative px-4 py-3 text-sm shadow-md max-w-[85%]",
                          message.role === "user"
                            ? "bg-blue-600 text-white rounded-2xl rounded-tr-sm"
                            : "bg-zinc-800 text-zinc-100 rounded-2xl rounded-tl-sm border border-zinc-700/50"
                        )}
                      >
                        {message.role === "bot" ? (
                          <div className="text-sm leading-relaxed break-words min-w-[20px]">
                            <ReactMarkdown 
                              remarkPlugins={[remarkGfm]}
                              components={{
                                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                ul: ({ children }) => <ul className="list-disc ml-4 mb-2 space-y-1">{children}</ul>,
                                ol: ({ children }) => <ol className="list-decimal ml-4 mb-2 space-y-1">{children}</ol>,
                                li: ({ children }) => <li>{children}</li>,
                                code: ({ children, className }) => {
                                  const isInline = !className?.includes('language-')
                                  return (
                                    <code className={cn("bg-black/30 rounded px-1.5 py-0.5 font-mono text-xs border border-white/10", className)}>
                                      {children}
                                    </code>
                                  )
                                },
                                pre: ({ children }) => <pre className="bg-black/30 rounded-lg p-3 overflow-x-auto mb-2 text-xs border border-white/10">{children}</pre>,
                                a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline underline-offset-2 hover:text-blue-300 font-medium">{children}</a>,
                                h1: ({ children }) => <h1 className="text-base font-bold mb-2">{children}</h1>,
                                h2: ({ children }) => <h2 className="text-sm font-bold mb-2">{children}</h2>,
                                h3: ({ children }) => <h3 className="text-sm font-semibold mb-1">{children}</h3>,
                                blockquote: ({ children }) => <blockquote className="border-l-2 border-blue-500/50 pl-3 italic mb-2 text-zinc-400">{children}</blockquote>,
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          message.content
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-zinc-800 rounded-2xl rounded-tl-sm px-4 py-3 border border-zinc-700/50 flex items-center gap-2">
                        <span className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#18181B] border-t border-white/10">
              <form
                onSubmit={handleSendMessage}
                className="flex w-full items-center gap-2"
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-blue-600 focus-visible:border-blue-600 rounded-full pl-4"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={isLoading}
                  className="rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 w-10 h-10 shrink-0"
                >
                  <Send className="h-4 w-4 ml-0.5" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-5 right-5 z-50"
          >
            <Button
              onClick={toggleChat}
              className="h-14 w-14 rounded-full shadow-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center relative group"
            >
              <MessageCircle className="h-7 w-7 transition-transform group-hover:scale-110" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

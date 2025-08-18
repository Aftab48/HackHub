"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Users, Hash, Menu, X } from "lucide-react"

interface Message {
  id: string
  user: string
  avatar: string
  message: string
  timestamp: Date
  type: "message" | "announcement" | "system"
}

interface Channel {
  id: string
  name: string
  type: "general" | "team" | "track"
  unread: number
}

export default function RealTimeChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      user: "Sarah Chen",
      avatar: "/diverse-woman-portrait.png",
      message: "Welcome to the hackathon! Excited to see what everyone builds!",
      timestamp: new Date(Date.now() - 300000),
      type: "message",
    },
    {
      id: "2",
      user: "System",
      avatar: "/futuristic-helper-robot.png",
      message: "Registration is now open for all tracks!",
      timestamp: new Date(Date.now() - 240000),
      type: "announcement",
    },
    {
      id: "3",
      user: "Alex Rodriguez",
      avatar: "/thoughtful-man.png",
      message: "Looking for team members with React/Node.js experience for the Web3 track!",
      timestamp: new Date(Date.now() - 180000),
      type: "message",
    },
  ])

  const [channels] = useState<Channel[]>([
    { id: "1", name: "general", type: "general", unread: 0 },
    { id: "2", name: "web3-track", type: "track", unread: 2 },
    { id: "3", name: "ai-ml-track", type: "track", unread: 0 },
    { id: "4", name: "my-team", type: "team", unread: 1 },
  ])

  const [currentMessage, setCurrentMessage] = useState("")
  const [activeChannel, setActiveChannel] = useState("1")
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!currentMessage.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      user: "You",
      avatar: "/abstract-geometric-shapes.png",
      message: currentMessage,
      timestamp: new Date(),
      type: "message",
    }

    setMessages((prev) => [...prev, newMessage])
    setCurrentMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex h-[calc(100vh-200px)] sm:h-[600px] border rounded-lg overflow-hidden relative">
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileSidebarOpen(false)} />
      )}

      <div
        className={`
        ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:relative absolute left-0 top-0 z-50
        w-64 sm:w-72 md:w-64 bg-muted/30 border-r h-full
        transition-transform duration-300 ease-in-out
      `}
      >
        <div className="p-3 sm:p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
            <Users className="h-4 w-4" />
            Channels
          </h3>
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMobileSidebarOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="h-full">
          <div className="p-2 space-y-1">
            {channels.map((channel) => (
              <Button
                key={channel.id}
                variant={activeChannel === channel.id ? "secondary" : "ghost"}
                className="w-full justify-start gap-2 text-sm"
                onClick={() => {
                  setActiveChannel(channel.id)
                  setIsMobileSidebarOpen(false)
                }}
              >
                <Hash className="h-4 w-4" />
                <span className="truncate">{channel.name}</span>
                {channel.unread > 0 && (
                  <Badge variant="destructive" className="ml-auto h-5 w-5 p-0 text-xs">
                    {channel.unread}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-3 sm:p-4 border-b bg-background flex items-center gap-3">
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMobileSidebarOpen(true)}>
            <Menu className="h-4 w-4" />
          </Button>
          <h3 className="font-semibold text-sm sm:text-base truncate">
            #{channels.find((c) => c.id === activeChannel)?.name}
          </h3>
        </div>

        <ScrollArea className="flex-1 p-2 sm:p-4">
          <div className="space-y-3 sm:space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex gap-2 sm:gap-3">
                <Avatar className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
                  <AvatarImage src={message.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">{message.user[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-medium text-xs sm:text-sm truncate">{message.user}</span>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                    {message.type === "announcement" && (
                      <Badge variant="secondary" className="text-xs">
                        Announcement
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm break-words">{message.message}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-2 sm:p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 text-sm"
            />
            <Button onClick={sendMessage} size="sm" className="flex-shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

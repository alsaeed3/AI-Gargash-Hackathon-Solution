"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import axios from "axios";

// Define the message type
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  recommendations?: Array<{
    _id: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    bodyType: string;
    imageUrl: string;
  }>;
  action?: string;
}

export default function AiAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your Gargash Motors AI Assistant. How can I help you find your perfect vehicle today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Call the AI assistant API
      const response = await axios.post("/api/ai", { message: inputValue });

      const aiResponse = response.data.data;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse.text,
        timestamp: new Date(),
        recommendations: aiResponse.recommendations || undefined,
        action: aiResponse.action || undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Sorry, I encountered an issue processing your request. Please try again.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-neutral-100 p-2 rounded-full">
            <Bot size={24} />
          </div>
          <h1 className="text-3xl font-bold">Gargash Motors AI Assistant</h1>
        </div>

        <Card className="border-2 h-[600px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-neutral-900 text-white"
                      : "bg-neutral-100 text-neutral-900"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.role === "assistant" ? (
                      <Bot size={16} />
                    ) : (
                      <User size={16} />
                    )}
                    <span className="text-xs opacity-70">
                      {message.role === "assistant" ? "AI Assistant" : "You"}
                    </span>
                  </div>
                  <p>{message.content}</p>

                  {/* Display car recommendations if available */}
                  {message.recommendations &&
                    message.recommendations.length > 0 && (
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {message.recommendations.map((car) => (
                          <Link href={`/cars/${car._id}`} key={car._id}>
                            <div className="border rounded-md p-2 bg-white flex hover:bg-neutral-50 transition-colors">
                              <div className="mr-2 w-20 h-20 relative rounded overflow-hidden">
                                <Image
                                  src={car.imageUrl}
                                  alt={`${car.brand} ${car.model}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">
                                  {car.brand} {car.model}
                                </h4>
                                <p className="text-xs text-neutral-500">
                                  {car.year} · {car.bodyType}
                                </p>
                                <p className="text-xs font-medium mt-1">
                                  ${car.price.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}

                  {/* Display action button if specified */}
                  {message.action && (
                    <div className="mt-4">
                      <Link
                        href={
                          message.action === "SCHEDULE_TEST_DRIVE"
                            ? "/test-drive"
                            : message.action === "SHOW_CONTACT_INFO"
                            ? "/contact"
                            : message.action === "SHOW_FINANCING_OPTIONS"
                            ? "/financing"
                            : "/"
                        }
                      >
                        <Button size="sm" className="w-full">
                          {message.action === "SCHEDULE_TEST_DRIVE"
                            ? "Schedule Test Drive"
                            : message.action === "SHOW_CONTACT_INFO"
                            ? "Contact Information"
                            : message.action === "SHOW_FINANCING_OPTIONS"
                            ? "Financing Options"
                            : "Learn More"}
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="max-w-[80%] p-4 rounded-lg bg-neutral-100">
                  <div className="flex items-center gap-2">
                    <Bot size={16} />
                    <div className="flex gap-1">
                      <span className="animate-bounce">•</span>
                      <span
                        className="animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      >
                        •
                      </span>
                      <span
                        className="animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      >
                        •
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <form
            onSubmit={handleSendMessage}
            className="border-t p-4 flex gap-2"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about our vehicles, features, or schedule a test drive..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !inputValue.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

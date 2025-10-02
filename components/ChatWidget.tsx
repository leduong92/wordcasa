// app/components/ChatWidget.tsx
'use client';

import { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (!input.trim()) return;
        setMessages([...messages, { sender: 'user', text: input }]);
        setInput('');

        // fake AI response (call API)
        setTimeout(() => {
            setMessages((prev) => [...prev, { sender: 'bot', text: '' + input }]);
        }, 600);

        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: input }),
        });

        const data = await res.json();
        setMessages((prev) => [...prev, { sender: 'bot', text: data.reply.content }]);
    };

    return (
        <div className="fixed bottom-20 right-5 z-50">
            {/* Open chat */}
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="rounded-full w-12 h-12 shadow-lg bg-blue-500 hover:bg-blue-600 flex items-center justify-center cursor-pointer"
                >
                    <MessageCircle className="text-neutral-50" size={18} />
                </Button>
            )}

            {/* Chatbox */}
            {isOpen && (
                <div className="w-80 h-96 bg-blue-50   rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="bg-blue-500 text-neutral-50 p-3 flex justify-between items-center">
                        <span className="font-semibold">Worldcasa Assistant</span>
                        <X className="cursor-pointer w-5 h-5" onClick={() => setIsOpen(false)} />
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`p-2 rounded-lg max-w-[75%] ${
                                    m.sender === 'user'
                                        ? 'bg-blue-100 ml-auto text-right'
                                        : 'bg-blue-100 mr-auto text-left'
                                }`}
                            >
                                {m.text}
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-2 border-t flex gap-2">
                        <input
                            type="text"
                            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                            placeholder="Enter message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <Button
                            onClick={handleSend}
                            className="bg-blue-500 hover:bg-blue-600 cursor-pointer"
                        >
                            <Send size={8} />
                            Send
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

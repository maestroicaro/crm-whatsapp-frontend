import React, { useEffect, useState, useRef } from 'react';
import { Send, Phone, Video, MoreVertical, Paperclip, Smile } from 'lucide-react';
import io from 'socket.io-client';

const ChatWindow = ({ contactId, contactName }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:3000');

    // Subscribe to messages for this contact
    socketRef.current.on(`messages-${contactId}`, (message) => {
      setMessages(prev => [...prev, message]);
    });

    // Subscribe to typing indicator
    socketRef.current.on(`typing-${contactId}`, (typing) => {
      setIsTyping(typing);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [contactId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        contactId,
        text: newMessage,
        timestamp: new Date(),
        sender: 'user',
        status: 'sent'
      };

      socketRef.current.emit('send-message', message);
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    socketRef.current.emit('typing', { contactId, isTyping: true });
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">{contactName || 'Chat'}</h3>
          {isTyping && <p className="text-sm text-green-100">Digitando...</p>}
        </div>
        <div className="flex gap-3">
          <button className="hover:bg-green-700 p-2 rounded-full transition">
            <Phone className="w-5 h-5" />
          </button>
          <button className="hover:bg-green-700 p-2 rounded-full transition">
            <Video className="w-5 h-5" />
          </button>
          <button className="hover:bg-green-700 p-2 rounded-full transition">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>Nenhuma mensagem ainda</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-green-500 text-white rounded-br-none'
                  : 'bg-gray-300 text-gray-900 rounded-bl-none'
              }`}>
                <p>{msg.text}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender === 'user' ? 'text-green-100' : 'text-gray-600'
                }`}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t p-4 bg-white">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <button type="button" className="text-gray-500 hover:text-green-600 transition">
            <Paperclip className="w-6 h-6" />
          </button>
          <button type="button" className="text-gray-500 hover:text-green-600 transition">
            <Smile className="w-6 h-6" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={handleTyping}
            placeholder="Digite uma mensagem..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-green-600 text-white rounded-full p-2 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;

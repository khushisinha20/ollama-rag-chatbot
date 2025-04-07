import React, { useState } from 'react';

function Chat({ isDocumentUploaded }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isDocumentUploaded) {
            alert('❗ Please upload a document before asking a question.');
            return;
        }

        if (!input.trim())
            return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: input,
            });

            const data = await response.text();
            const assistantMessage = { role: 'assistant', content: data };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            const errorMessage = { role: 'assistant', content: `Error: ${error.message}` };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
          <div className="bg-white rounded-lg shadow">
            <div className="h-[400px] overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-100 ml-auto max-w-[80%]'
                      : 'bg-gray-100 mr-auto max-w-[80%]'
                  }`}
                >
                  {message.content}
                </div>
              ))}
              {isLoading && (
                <div className="text-center text-gray-500">
                  Processing your question...
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="border-t p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question about your documents..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      );
}

export default Chat;
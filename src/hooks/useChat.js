import { useState, useEffect, useCallback } from 'react';

const API_BASE = '/api';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [threadId, setThreadId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedThreadId = localStorage.getItem('chatThreadId');
    const storedMessages = localStorage.getItem('chatMessages');

    if (storedThreadId) {
      setThreadId(storedThreadId);
      if (storedMessages) {
        try {
          setMessages(JSON.parse(storedMessages));
        } catch (e) {
          console.error('Failed to parse stored messages:', e);
        }
      }
    } else {
      createNewThread();
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const createNewThread = async () => {
    try {
      const response = await fetch(`${API_BASE}/threads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to create thread');

      const data = await response.json();
      setThreadId(data.threadId);
      localStorage.setItem('chatThreadId', data.threadId);
      return data.threadId;
    } catch (err) {
      console.error('Error creating thread:', err);
      setError('Verbindungsfehler. Bitte versuche es später erneut.');
      return null;
    }
  };

  const startNewChat = useCallback(async () => {
    localStorage.removeItem('chatThreadId');
    localStorage.removeItem('chatMessages');
    setMessages([]);
    setError(null);
    await createNewThread();
  }, []);

  const sendMessage = useCallback(async (content) => {
    if (!content.trim()) return;

    setIsLoading(true);
    setError(null);

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: content,
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      let currentThreadId = threadId;
      if (!currentThreadId) {
        currentThreadId = await createNewThread();
        if (!currentThreadId) throw new Error('No thread available');
      }

      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          threadId: currentThreadId,
          message: content,
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      const data = await response.json();

      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.message,
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Nachricht konnte nicht gesendet werden. Bitte versuche es erneut.');
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  }, [threadId]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    startNewChat,
  };
}

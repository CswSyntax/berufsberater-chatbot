import { useState, useEffect, useCallback } from 'react';

const API_BASE = '/api';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [threadId, setThreadId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [error, setError] = useState(null);

  // Initialize thread from localStorage or create new one
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

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Create a new thread
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

  // Start a new chat session
  const startNewChat = useCallback(async () => {
    localStorage.removeItem('chatThreadId');
    localStorage.removeItem('chatMessages');
    setMessages([]);
    setError(null);
    await createNewThread();
  }, []);

  // Upload a file
  const uploadFile = useCallback(async (file) => {
    setUploadingFile(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload file');

      const data = await response.json();
      return {
        id: data.fileId,
        name: data.filename,
      };
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Datei konnte nicht hochgeladen werden.');
      return null;
    } finally {
      setUploadingFile(false);
    }
  }, []);

  // Send a message
  const sendMessage = useCallback(async (content, files = []) => {
    if (!content.trim() && files.length === 0) return;

    setIsLoading(true);
    setError(null);

    // Add user message to state immediately
    const userMessage = {
      role: 'user',
      content: content,
      files: files.map(f => ({ name: f.name })),
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      // Ensure we have a thread
      let currentThreadId = threadId;
      if (!currentThreadId) {
        currentThreadId = await createNewThread();
        if (!currentThreadId) throw new Error('No thread available');
      }

      // Send message to API
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          threadId: currentThreadId,
          message: content,
          fileIds: files.map(f => f.id),
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      const data = await response.json();

      // Add assistant message to state
      const assistantMessage = {
        role: 'assistant',
        content: data.message,
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Nachricht konnte nicht gesendet werden. Bitte versuche es erneut.');
      // Remove the user message on error
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  }, [threadId]);

  return {
    messages,
    isLoading,
    uploadingFile,
    error,
    sendMessage,
    uploadFile,
    startNewChat,
  };
}

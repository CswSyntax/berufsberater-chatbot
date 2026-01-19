import { useState, useRef } from 'react';
import { Send, Loader2 } from 'lucide-react';

export default function ChatInput({ onSend, isLoading }) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = () => {
    if (!message.trim() || isLoading) return;
    onSend(message);
    setMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = '48px';
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    const textarea = e.target;
    textarea.style.height = '48px';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const canSubmit = message.trim() && !isLoading;

  return (
    <div className="py-4">
      <div className="flex items-end gap-3 p-3 bg-gray-100 rounded-2xl">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          placeholder="Schreibe eine Nachricht..."
          disabled={isLoading}
          rows={1}
          className="flex-1 px-3 py-2 bg-white rounded-xl resize-none text-[15px] text-gray-800 placeholder-gray-400 border border-gray-200 focus:border-emerald-400 focus:outline-none disabled:opacity-50"
          style={{ minHeight: '48px', maxHeight: '120px' }}
        />
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-xl transition-colors ${
            canSubmit
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-gray-200 text-gray-400'
          }`}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
      <p className="mt-3 text-xs text-gray-400 text-center">
        KI kann Fehler machen. Wichtige Infos bitte prüfen.
      </p>
    </div>
  );
}

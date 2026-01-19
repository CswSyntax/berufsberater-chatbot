import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Paperclip, Send, X, Loader2 } from 'lucide-react';

export default function ChatInput({ onSend, onFileUpload, isLoading, uploadingFile }) {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if ((!message.trim() && files.length === 0) || isLoading) return;

    onSend(message, files);
    setMessage('');
    setFiles([]);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;

    for (const file of selectedFiles) {
      const uploadedFile = await onFileUpload(file);
      if (uploadedFile) {
        setFiles((prev) => [...prev, uploadedFile]);
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const canSubmit = (message.trim() || files.length > 0) && !isLoading;

  return (
    <div className="py-4">
      {/* File Preview */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-3 overflow-hidden"
          >
            <div className="flex flex-wrap gap-2">
              {files.map((file, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 pl-3 pr-2 py-2 bg-emerald-50 text-emerald-700 text-sm rounded-lg border border-emerald-200"
                >
                  <Paperclip className="w-4 h-4" />
                  <span className="max-w-[150px] truncate font-medium">{file.name}</span>
                  <button
                    onClick={() => setFiles((prev) => prev.filter((_, i) => i !== index))}
                    className="p-1 hover:bg-emerald-100 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Progress */}
      <AnimatePresence>
        {uploadingFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-3 flex items-center gap-2 text-sm text-emerald-600"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Wird hochgeladen...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className="flex items-end gap-3">
        {/* File Upload */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
          multiple
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading || uploadingFile}
          className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 border border-gray-200 rounded-xl transition-colors disabled:opacity-50"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Schreibe eine Nachricht..."
            disabled={isLoading}
            rows={1}
            className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl resize-none text-[15px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all disabled:opacity-50"
            style={{ maxHeight: '150px', minHeight: '52px' }}
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl transition-all ${
            canSubmit
              ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-500/30'
              : 'bg-gray-100 text-gray-400 border border-gray-200'
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
        KI kann Fehler machen. Wichtige Infos bitte pruefen.
      </p>
    </div>
  );
}

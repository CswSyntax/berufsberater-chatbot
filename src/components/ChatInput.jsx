import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Paperclip, ArrowUp, X, Loader2 } from 'lucide-react';

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
    <div className="flex-shrink-0 border-t border-gray-100 bg-white">
      <div className="max-w-3xl mx-auto px-4 py-3">
        {/* File Preview */}
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-2 overflow-hidden"
            >
              <div className="flex flex-wrap gap-1.5">
                {files.map((file, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full"
                  >
                    <Paperclip className="w-3 h-3" />
                    <span className="max-w-[100px] truncate">{file.name}</span>
                    <button
                      onClick={() => setFiles((prev) => prev.filter((_, i) => i !== index))}
                      className="p-0.5 hover:bg-emerald-100 rounded-full transition-colors"
                    >
                      <X className="w-3 h-3" />
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
              className="mb-2 flex items-center gap-2 text-xs text-emerald-600"
            >
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Wird hochgeladen...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <div className="relative flex items-end gap-2">
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
            className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50"
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
              placeholder="Nachricht eingeben..."
              disabled={isLoading}
              rows={1}
              className="w-full px-4 py-2.5 pr-12 bg-gray-50 border border-gray-200 rounded-2xl resize-none text-[15px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all disabled:opacity-50"
              style={{ maxHeight: '150px', minHeight: '44px' }}
            />

            {/* Send Button */}
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`absolute right-2 bottom-1.5 p-1.5 rounded-lg transition-all ${
                canSubmit
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                  : 'bg-gray-100 text-gray-300'
              }`}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowUp className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <p className="mt-2 text-[10px] text-gray-400 text-center">
          KI kann Fehler machen. Wichtige Infos bitte pruefen.
        </p>
      </div>
    </div>
  );
}

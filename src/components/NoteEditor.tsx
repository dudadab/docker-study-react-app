import React, { useState } from 'react';
import type { CreateNoteDto, Note } from '../types/note';
import { CheckIcon, CloseIcon } from './Icons';

interface NoteEditorProps {
  note: Note | null; // null if creating a new note
  onClose: () => void;
  onSave: (data: CreateNoteDto) => Promise<void>;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ note, onClose, onSave }) => {
  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) {
      setValidationError('Please enter a note title.');
      return;
    }
    if (!content.trim()) {
      setValidationError('Please enter some content for your note.');
      return;
    }

    setIsSubmitting(true);
    setValidationError('');
    try {
      await onSave({
        title: title.trim(),
        content: content.trim(),
      });
      onClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred while saving.';
      setValidationError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      {/* Backdrop with blur */}
      <div
        className='absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300'
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className='relative flex max-h-[85vh] w-full max-w-2xl scale-100 transform flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl transition-all duration-300 dark:border-gray-800 dark:bg-gray-900'>
        {/* Header */}
        <div className='flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-800/80'>
          <h2 className='flex items-center gap-2 text-xl font-extrabold text-gray-800 dark:text-gray-100'>
            <span className='bg-primary h-2.5 w-2.5 rounded-full' />
            {note ? 'Edit Note' : 'Create New Note'}
          </h2>
          <button
            type='button'
            onClick={onClose}
            className='rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-200'
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className='flex flex-1 flex-col overflow-hidden'>
          <div className='flex-1 space-y-5 overflow-y-auto p-6'>
            {validationError && (
              <div className='rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400'>
                {validationError}
              </div>
            )}

            {/* Title Field */}
            <div className='space-y-1.5'>
              <label
                htmlFor='note-title'
                className='text-xs font-bold tracking-wider text-gray-400 uppercase dark:text-gray-500'
              >
                Title
              </label>
              <input
                id='note-title'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Give your note a title...'
                className='focus:border-primary w-full border-b border-gray-100 bg-transparent pb-2 text-xl font-bold text-gray-800 placeholder-gray-400 transition-colors focus:outline-none dark:border-gray-800 dark:text-gray-100'
                maxLength={100}
                required
                disabled={isSubmitting}
                autoFocus
              />
            </div>

            {/* Content Field */}
            <div className='flex min-h-62.5 flex-1 flex-col space-y-1.5'>
              <label
                htmlFor='note-content'
                className='text-xs font-bold tracking-wider text-gray-400 uppercase dark:text-gray-500'
              >
                Content
              </label>
              <textarea
                id='note-content'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='Start writing thoughts, ideas, tasks...'
                className='min-h-50 w-full flex-1 resize-none bg-transparent leading-relaxed text-gray-700 placeholder-gray-400 focus:outline-none dark:text-gray-200'
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className='flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50/50 px-6 py-4 dark:border-gray-800/80 dark:bg-gray-900/50'>
            <button
              type='button'
              onClick={onClose}
              className='rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className='bg-primary text-primary-foreground shadow-primary/20 dark:shadow-primary/5 inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-bold shadow-md transition-all hover:opacity-95 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'
            >
              {isSubmitting ? (
                <span className='border-primary-foreground h-4 w-4 animate-spin rounded-full border-2 border-t-transparent' />
              ) : (
                <CheckIcon size={16} />
              )}
              <span>{note ? 'Save Changes' : 'Create Note'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

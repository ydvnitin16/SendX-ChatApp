import React from "react";

const TypingIndicator = () => {
    return (
        <div className='flex justify-start mb-3'>
            <div className='px-4 py-2.5 rounded-xl rounded-bl-sm max-w-xs text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm'>
                <div className='flex items-center gap-1.5'>
                    <span className='w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]' />
                    <span className='w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]' />
                    <span className='w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce' />
                </div>
            </div>
        </div>
    );
};

export default TypingIndicator;

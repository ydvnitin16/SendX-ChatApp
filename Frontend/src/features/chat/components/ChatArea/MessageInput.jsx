import React, { useEffect, useRef } from "react";
import { Paperclip, SendHorizonal } from "lucide-react";
import useSendMessages from "../../hooks/useSendMessages.js";
import useTyping from "../../hooks/useTyping.js";
import useChatStore from "@/stores/useChatStore.js";
import useDraft from "../../hooks/useDraft.js";
import useAuthStore from "@/stores/useAuthStore.js";

const MessageInput = () => {
    const { message, setMessage, sendMessage } = useSendMessages();
    const { selectedUserId, conversations } = useChatStore();
    const { handleTyping } = useTyping(selectedUserId);
    const { currentUser } = useAuthStore();
    const conversation = conversations.find(
        (c) =>
            c.participants.includes(currentUser.id) &&
            c.participants.includes(selectedUserId),
    );

    const conversationId = conversation?._id;
    const { handleDraftChange, clearCurrentDraft } = useDraft({
        conversationId,
        setMessage,
    });

    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() !== "") {
            sendMessage();
            clearCurrentDraft();
            if (inputRef.current) inputRef.current.focus();
        }
    };

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    return (
        <form
            onSubmit={handleSubmit}
            className='fixed bottom-5 left-0 right-0 px-3 md:px-0 md:static dark:md:bg-slate-900 z-10'
        >
            <div className='flex items-end gap-3 backdrop-blur-sm bg-white/95 dark:bg-slate-900/95 md:bg-transparent md:dark:bg-transparent border border-slate-200 dark:border-slate-800 md:border-none rounded-xl md:rounded-b-lg px-4 py-3 shadow-lg md:shadow-none'>
                {/* Input */}
                <textarea
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                        }
                    }}
                    ref={inputRef}
                    rows={1}
                    value={message}
                    onChange={(e) => {
                        handleDraftChange(e.target.value);
                        setMessage(e.target.value);
                        handleTyping();

                        const el = e.target;
                        el.style.height = "auto";
                        el.style.height = Math.min(el.scrollHeight, 120) + "px"; // max height
                    }}
                    placeholder='Type a message...'
                    className='flex-1 resize-none overflow-y-auto outline-none text-sm md:text-base text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-0 py-2 max-h-[120px] bg-transparent'
                />
                <Paperclip
                    className={`${message.trim() ? "translate-x-0" : "translate-x-13"} transition-all duration-200 text-slate-600 dark:text-slate-400 cursor-pointer hover:text-slate-800 dark:hover:text-slate-300 flex-shrink-0 rotate-180`}
                    size={20}
                />
                {/* Send Button */}
                {
                    <button
                        type='submit'
                        className={`${message.trim() ? "translate-x-0 opacity-100" : "translate-x-50 opacity-0"} transition-all duration-300 flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500 hover:bg-blue-600 active:bg-blue-700 cursor-pointer flex-shrink-0 shadow-sm`}
                    >
                        <SendHorizonal className='text-white' size={18} />
                    </button>
                }
            </div>
        </form>
    );
};

export default MessageInput;

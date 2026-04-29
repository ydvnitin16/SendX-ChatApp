import useChatStore from "@/stores/useChatStore";
import React, { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatList from "./ChatList";
import MessageInput from "./MessageInput";

const ChatBox = () => {
    const { selectedUserId } = useChatStore();

    // If no chat is selected
    if (!selectedUserId) {
        return (
            <div className='hidden md:flex flex-1 items-center justify-center h-full text-slate-400 bg-white dark:bg-slate-900 rounded-lg shadow-sm dark:shadow-lg dark:shadow-slate-950/30 border border-slate-200/50 dark:border-slate-800/50'>
                <div className='text-center'>
                    <p className='text-lg font-medium'>Select a conversation</p>
                    <p className='text-sm mt-1'>Choose a chat to start messaging</p>
                </div>
            </div>
        );
    }
    return (
        <main className='flex flex-col bg-white dark:bg-slate-900 rounded-lg shadow-sm dark:shadow-lg dark:shadow-slate-950/30 flex-1 z-3 overflow-hidden border border-slate-200/50 dark:border-slate-800/50'>
            <ChatHeader />
            <ChatList />
            <MessageInput />
        </main>
    );
};

export default ChatBox;

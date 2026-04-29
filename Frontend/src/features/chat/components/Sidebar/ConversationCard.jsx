import useAuthStore from "@/stores/useAuthStore";
import { formatDateTime } from "@/utils/utils";
import React, { useMemo } from "react";
import { optimizeUrl } from "@/utils/imageOptimization";

const ConversationCard = ({
    user,
    isSelected,
    onClick,
    lastMessage,
    unreadCount = 0,
    currentUserId,
}) => {
    const formattedTime = useMemo(() => {
        return formatDateTime(lastMessage?.createdAt);
    }, [lastMessage?.createdAt]);

    return (
        <div
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                isSelected 
                    ? "bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-blue-900/40 shadow-sm" 
                    : "hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent"
            }`}
            currentUser
            onClick={() => onClick(user)}
        >
            <div className='relative flex-shrink-0'>
                <img
                    loading='lazy'
                    src={optimizeUrl(user.avatar?.url, "medium")}
                    className='w-12 h-12 rounded-full bg-contain object-cover ring-2 ring-slate-200 dark:ring-slate-700'
                    alt='avatar'
                />
                {user.isOnline && (
                    <span className='absolute right-0 bottom-0 bg-green-500 h-3 w-3 rounded-full border-2 border-white dark:border-slate-900 shadow-sm'></span>
                )}
            </div>

            <div className='flex-1 min-w-0'>
                <div className='flex justify-between items-center text-sm font-semibold text-slate-900 dark:text-slate-100'>
                    <span>{user.name}</span>
                    <div className='flex items-center gap-2 ml-2'>
                        {lastMessage && (
                            <span className='text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap'>
                                {formattedTime}
                            </span>
                        )}
                        {unreadCount > 0 && (
                            <span className='min-w-5 h-5 px-1.5 rounded-full bg-blue-500 text-white text-[10px] font-semibold flex items-center justify-center flex-shrink-0'>
                                {unreadCount > 99 ? "99+" : unreadCount}
                            </span>
                        )}
                    </div>
                </div>

                <p className='text-xs text-slate-600 dark:text-slate-400 truncate w-full mt-0.5'>
                    {lastMessage
                        ? `${lastMessage.sender === currentUserId ? "You: " : ""}${lastMessage.content}`
                        : "Start a new chat"}
                </p>
            </div>
        </div>
    );
};

export default React.memo(ConversationCard);

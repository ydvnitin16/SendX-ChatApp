import React, { useCallback, useRef, useState } from "react";
import useSearchUser from "../../hooks/useSearchUser";
import ConversationCard from "./ConversationCard";
import useChatStore from "@/stores/useChatStore";
import useAuthStore from "@/stores/useAuthStore";
import { Search } from "lucide-react";
import ConversationListSkeleton from "@/components/skeletons/ConversationListSkeleton";

const SearchUsersInput = () => {
    const { searchUsername, setSearchUsername, users, loading, error } =
        useSearchUser();

    const { setSelectedUserId, addConversation, addUser } = useChatStore();
    const { currentUser } = useAuthStore();

    const handleNewConversation = useCallback(
        (user) => {
            const tempId = Date.now();

            addConversation({
                _id: tempId,
                tempId,
                participants: [user._id, currentUser.id],
            });

            addUser(user);
            setSelectedUserId(user._id);
            setSearchUsername("");
        },
        [
            addConversation,
            addUser,
            setSelectedUserId,
            setSearchUsername,
            currentUser.id,
        ],
    );

    return (
        <div className='px-4 py-3 relative'>
            {/* Search input */}
            <div className='flex gap-2 items-center w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 focus:outline-none rounded-lg dark:bg-slate-800 dark:text-slate-100 bg-white transition-all'>
                <Search size={20} className='text-slate-400 dark:text-slate-500 flex-shrink-0' />
                <input
                    type='text'
                    placeholder='Search users...'
                    value={searchUsername}
                    onChange={(e) => setSearchUsername(e.target.value)}
                    className='text-sm w-full focus:outline-none bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400'
                />
            </div>

            {/* Users dropdown */}
            {searchUsername.length > 0 && (
                <div className='absolute top-16 left-4 right-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-lg max-h-60 overflow-y-auto z-50'>
                    {loading && (
                        <div className='p-3 text-slate-400 dark:text-slate-500'>
                            <ConversationListSkeleton />
                        </div>
                    )}

                    {!loading && users?.length === 0 && !error && (
                        <p className='p-4 text-slate-400 dark:text-slate-500 text-center text-sm'>No users found</p>
                    )}

                    {users &&
                        users.map((user) => (
                            <ConversationCard
                                key={user._id}
                                user={user}
                                onClick={handleNewConversation}
                                currentUserId={currentUser.id}
                            />
                        ))}
                </div>
            )}
        </div>
    );
};

export default SearchUsersInput;

import React from "react";
import SearchUsersInput from "./SearchUsersInput";
import SidebarHeader from "./SidebarHeader";
import ConversationList from "./ConversationList";
import useLogout from "@/features/auth/hooks/useLogout";
import useAuthStore from "@/stores/useAuthStore";
import useChatStore from "@/stores/useChatStore";

const Sidebar = () => {
    const { handleLogout } = useLogout();
    const { currentUser } = useAuthStore();
    const { selectedUserId } = useChatStore();

    return (
        <>
            <aside
                className={`md:w-1/3 lg:w-1/4 w-full bg-white dark:bg-slate-900 overflow-y-auto scroll-smooth no-scrollbar rounded-xl md:rounded-lg shadow-sm dark:shadow-lg dark:shadow-slate-950/30 md:block dark:text-slate-100 z-10 border border-slate-200/50 dark:border-slate-800/50 ${
                    selectedUserId ? "hidden md:block" : "block"
                }`}
            >
                {/* Top Bar */}
                <SidebarHeader user={currentUser} handleLogout={handleLogout} />

                {/* Search Bar */}
                <SearchUsersInput />

                {/* Chat List */}
                <ConversationList />
            </aside>
        </>
    );
};

export default Sidebar;

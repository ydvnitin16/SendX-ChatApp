import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import useChatStore from "@/stores/useChatStore";
import { formatDateTime } from "@/utils/utils";
import useCallStore from "@/stores/useCallStore";
import useCall from "@/features/call/hooks/useCall";
import Button from "@/components/ui/Button";
import { UserRound } from "lucide-react";
import { useState } from "react";
import ChatHeaderDropdown from "./ChatHeaderDropdown";
import UserProfileModal from "./UserProfileModal";
import { optimizeUrl } from "@/utils/imageOptimization";

const ChatHeader = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const { selectedUserId, setSelectedUserId, users } = useChatStore();
    let user = users[selectedUserId];

    const { startCall } = useCall();

    return (
        <>
            <div className='fixed w-full top-0 md:static flex items-center justify-between md:rounded-tr-lg px-4 py-3 shadow-sm backdrop-blur-sm dark:bg-slate-900/95 md:dark:bg-slate-900 md:dark:border-slate-800 border-b border-slate-200 dark:border-slate-800 bg-white dark:text-slate-100 z-10'>
                <div className='flex items-center gap-3 min-w-0'>
                    <button
                        onClick={() => setSelectedUserId(null)}
                        className='md:hidden text-lg text-black dark:text-white'
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <img
                        src={optimizeUrl(user?.avatar?.url, "small")}
                        className='w-10 h-10 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700'
                        alt='avatar'
                    />
                    <div className='min-w-0 flex-1'>
                        <p className='font-semibold text-slate-900 dark:text-slate-100 truncate text-sm'>
                            {user.name}
                        </p>
                        <p className='text-xs text-slate-600 dark:text-slate-400'>
                            {user.isOnline
                                ? "Online now"
                                : user.lastSeen
                                  ? `Last seen ${formatDateTime(user.lastSeen)}`
                                  : ""}
                        </p>
                    </div>
                </div>
                <div className='relative text-gray-500 flex items-center dark:text-white'>
                    <Button
                        variant='outline'
                        onClick={() =>
                            startCall({
                                callType: "video",
                                receiverId: selectedUserId,
                            })
                        }
                    >
                        <FontAwesomeIcon icon={faVideo} />
                    </Button>
                    <Button
                        variant='outline'
                        onClick={() =>
                            startCall({
                                callType: "audio",
                                receiverId: selectedUserId,
                            })
                        }
                    >
                        <FontAwesomeIcon icon={faPhone} />
                    </Button>
                    <Button
                        onClick={() => {
                            setShowDropdown((prev) => !prev);
                        }}
                        variant='outline'
                    >
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </Button>
                    {showDropdown && (
                        <ChatHeaderDropdown
                            onClose={() => setShowDropdown(false)}
                            onOpenProfile={() => setIsProfileOpen(true)}
                        />
                    )}
                </div>
            </div>
            <UserProfileModal
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
                user={user}
            />
        </>
    );
};

export default ChatHeader;

// When we click on the video call button we have to update the states in global that we are calling
// in call feature component we trigger the call with the details of global store

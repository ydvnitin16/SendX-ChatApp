import { formatDateTime } from "@/utils/utils";
import {
    BadgeInfo,
    Check,
    CheckCheck,
    Clock3,
    Info,
    RotateCw,
    Timer,
} from "lucide-react";
import React, { useCallback, useMemo } from "react";

const ChatBubble = ({
    user,
    isMine,
    type,
    content,
    time,
    status = "sent",
    isSame,
    resend,
    data,
}) => {
    const renderStatus = () => {
        if (!isMine) return null;
        if (status === "failed")
            return <BadgeInfo size={14} className='text-red-500' />;
        if (status === "pending") return <Clock3 size={14} />;
        if (status === "sent") return <Check size={14} />;
        if (status === "delivered") return <CheckCheck size={14} />;
        if (status === "seen")
            return <CheckCheck size={14} className='text-blue-400' />;
    };

    const formattedTime = useMemo(() => {
        return formatDateTime(time);
    }, [time]);

    const handleResend = useCallback(() => {
        resend(data);
    }, [resend, data]);

    return (
        <div
            className={`flex ${isMine ? "justify-end" : "justify-start"} mb-1`}
        >
            <div
                className={`relative flex flex-col ${isMine ? "items-end" : "items-start"}`}
            >
                {!isSame && (
                    <div
                        className={`absolute  h-0 w-0 border-y-[14px] border-y-transparent   ${isMine ? "text-[#0A84FF] -top-[8px] -right-3 -rotate-30 border-l-[25px]" : "backdrop-blur-md text-white/20 dark:text-zinc-700/30  -top-[8px] -left-3 rotate-30 border-r-[25px]"}`}
                    />
                )}

                {type !== "image" && (
                    <>
                        <div
                            className={`
                            px-4 py-2.5 rounded-xl max-w-xs text-sm
                            shadow-sm transition-all duration-200
                            ${
                                isMine
                                    ? "text-white rounded-xl bg-blue-500 border border-blue-600/30 "
                                    : "px-4 py-2.5 rounded-xl max-w-xs text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
                            }
                        `}
                        >
                            <div className='flex flex-wrap items-end gap-x-2'>
                                <span className={`break-words text-[15px] font-medium ${isMine ? "" : "text-slate-900 dark:text-slate-100"}`}>
                                    {content}
                                </span>

                                <span
                                    className={`
                                    flex items-center gap-1 text-[10px] whitespace-nowrap
                                    ${
                                        isMine
                                            ? "text-blue-100"
                                            : "text-slate-500 dark:text-slate-400"
                                    }
                                `}
                                >
                                    {formattedTime || "23:12"}
                                    {isMine && renderStatus()}
                                </span>
                            </div>
                        </div>
                        {status === "failed" && (
                            <div
                                className='cursor-pointer hover:opacity-70 text-red-500 mt-1'
                                onClick={() => handleResend(data)}
                            >
                                <RotateCw size={14} />
                            </div>
                        )}
                    </>
                )}

                {type === "image" && (
                    <div className='relative max-w-xs rounded-xl overflow-hidden shadow-sm ring-1 ring-slate-200 dark:ring-slate-700'>
                        <img
                            src={content}
                            alt='chat-img'
                            className='rounded-xi object-cover max-h-60 w-full'
                        />

                        <div className='absolute bottom-2 right-2 text-[10px] bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg flex items-center gap-1'>
                            {time || "23:12"}
                            {isMine && renderStatus()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(ChatBubble);

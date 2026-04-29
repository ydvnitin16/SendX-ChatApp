import React, { lazy, Suspense, useState } from "react";
import { LogOut, UserRound } from "lucide-react";
import { optimizeUrl } from "@/utils/imageOptimization.js";
import ModalSkeleton from "@/components/skeletons/ModalSkeleton.jsx";

const ProfileModal = lazy(
    () => import("@/features/auth/pages/ProfileModal.jsx"),
);
const ConfirmModal = lazy(
    () => import("../../../../components/ui/ConfirmModal.jsx"),
);

const SidebarHeader = ({ user, handleLogout }) => {
    const [logoutModal, setLogoutModal] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const [isProfileModalOpen, setIsProfileModalOpen] = useState();

    return (
        <>
            {isProfileModalOpen && (
                <Suspense fallback={<ModalSkeleton />}>
                    <ProfileModal
                        isOpen={isProfileModalOpen}
                        onClose={() => setIsProfileModalOpen(false)}
                        user={user}
                    />
                </Suspense>
            )}
            {logoutModal && (
                <Suspense fallback={<ModalSkeleton />}>
                    <ConfirmModal
                        isOpen={logoutModal}
                        onClose={() => setLogoutModal(false)}
                        onConfirm={handleLogout}
                        title='Confirm Logout'
                        description='Are you sure you want to logout?'
                        actionTitle={"Yes, Logout"}
                    />
                </Suspense>
            )}

            <div className='flex justify-between items-center px-4 pt-4 pb-2 mx-0 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800'>
                <h1 className='flex gap-2 items-center text-xl font-bold text-slate-900 dark:text-slate-100'>
                    <div
                        className='w-8 h-8 bg-slate-900 dark:bg-slate-100'
                        style={{
                            WebkitMaskImage: "url('/sendx-icon-dark.png')",
                            WebkitMaskRepeat: "no-repeat",
                            WebkitMaskSize: "contain",
                            maskImage: "url('/sendx-icon-dark.png')",
                            maskRepeat: "no-repeat",
                            maskSize: "contain",
                        }}
                    />
                    <span>SendX</span>
                </h1>
                <div className='relative'>
                    <img
                        loading='lazy'
                        src={optimizeUrl(
                            user?.avatar?.url || user?.avatar,
                            "small",
                        )}
                        alt={user?.name}
                        className='w-10 h-10 rounded-full cursor-pointer ring-2 ring-slate-200 dark:ring-slate-700 hover:ring-blue-300 dark:hover:ring-blue-900 transition-all'
                        onClick={() => setShowDropdown(!showDropdown)}
                    />
                    {showDropdown && (
                        <div className='absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50'>
                            <ul className='text-sm p-1'>
                                <li
                                    onClick={() => {
                                        setIsProfileModalOpen(true);
                                        setShowDropdown(false);
                                    }}
                                    className='flex gap-2 p-3 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-lg cursor-pointer text-slate-700 dark:text-slate-200 transition-colors'
                                >
                                    <UserRound size={18} /> Go To Profile
                                </li>
                                <li
                                    onClick={() => {
                                        setLogoutModal(true);
                                        setShowDropdown(false);
                                    }}
                                    className='flex gap-2 p-3 hover:bg-red-50 dark:hover:bg-slate-700 rounded-lg cursor-pointer text-red-600 dark:text-red-400 transition-colors'
                                >
                                    <LogOut size={18} /> Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SidebarHeader;

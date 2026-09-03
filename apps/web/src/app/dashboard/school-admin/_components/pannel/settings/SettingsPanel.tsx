"use client";

import React, { useState } from "react";
import {
  DEFAULT_SCHOOL_PROFILE,
  DEFAULT_NOTIFICATIONS,
  DEFAULT_SECURITY_ITEMS,
  DEFAULT_RECENT_ACTIVITIES,
} from "./mockData";
import { NotificationPreference, SecuritySettingItem, SchoolProfileData } from "./types";
import { SchoolProfileCard } from "./SchoolProfileCard";
import { NotificationsCard } from "./NotificationsCard";
import { SecurityCard } from "./SecurityCard";
import { RecentActivityCard } from "./RecentActivityCard";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { TwoFactorModal } from "./TwoFactorModal";
import { LoginHistoryModal } from "./LoginHistoryModal";
import { RecentActivityModal } from "./RecentActivityModal";
import { EditSchoolProfileModal } from "./EditSchoolProfileModal";

export function SettingsPanel() {
  const [profile, setProfile] = useState<SchoolProfileData>(DEFAULT_SCHOOL_PROFILE);
  const [notifications, setNotifications] =
    useState<NotificationPreference[]>(DEFAULT_NOTIFICATIONS);
  const [securityItems, setSecurityItems] =
    useState<SecuritySettingItem[]>(DEFAULT_SECURITY_ITEMS);

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const [isLoginHistoryOpen, setIsLoginHistoryOpen] = useState(false);
  const [isRecentActivityOpen, setIsRecentActivityOpen] = useState(false);

  const is2FAEnabled = securityItems.find((i) => i.id === "2fa")?.statusBadge === "Enabled";

  const handleToggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item))
    );
  };

  const handleSecurityAction = (id: string) => {
    if (id === "password" || id === "sec-1") {
      setIsPasswordModalOpen(true);
    } else if (id === "2fa") {
      setIs2FAModalOpen(true);
    } else if (id === "history" || id === "sessions") {
      setIsLoginHistoryOpen(true);
    }
  };

  const handleToggle2FAState = (enabled: boolean) => {
    setSecurityItems((prev) =>
      prev.map((item) => {
        if (item.id === "2fa") {
          return {
            ...item,
            statusBadge: enabled ? "Enabled" : "Disabled",
            badgeType: enabled ? "emerald" : "blue",
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300 font-sans">
      {/* 3 Equal Width Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <SchoolProfileCard
          profile={profile}
          onEdit={() => setIsEditProfileOpen(true)}
        />

        <NotificationsCard
          notifications={notifications}
          onToggle={handleToggleNotification}
        />

        <SecurityCard
          items={securityItems}
          onOpenItem={handleSecurityAction}
          onReviewTips={() => setIsPasswordModalOpen(true)}
        />
      </div>

      {/* Recent Account Activity Full Width Section */}
      <RecentActivityCard
        activities={DEFAULT_RECENT_ACTIVITIES}
        onViewAll={() => setIsRecentActivityOpen(true)}
      />

      {/* Edit School Profile Modal */}
      <EditSchoolProfileModal
        isOpen={isEditProfileOpen}
        profile={profile}
        onClose={() => setIsEditProfileOpen(false)}
        onSave={(updated) => setProfile(updated)}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />

      {/* Two Factor Auth Enable / Disable Modal */}
      <TwoFactorModal
        isOpen={is2FAModalOpen}
        is2FAEnabled={is2FAEnabled}
        onClose={() => setIs2FAModalOpen(false)}
        onToggle2FA={handleToggle2FAState}
      />

      {/* Login History Modal */}
      <LoginHistoryModal
        isOpen={isLoginHistoryOpen}
        onClose={() => setIsLoginHistoryOpen(false)}
      />

      {/* View All Recent Activity Modal */}
      <RecentActivityModal
        isOpen={isRecentActivityOpen}
        onClose={() => setIsRecentActivityOpen(false)}
        activities={DEFAULT_RECENT_ACTIVITIES}
      />

      {/* Footer copyright */}
      <footer className="pt-4 text-center text-sm font-semibold text-slate-500">
        © 2025 IQ Olympiad. All rights reserved.
      </footer>
    </div>
  );
}

export default SettingsPanel;

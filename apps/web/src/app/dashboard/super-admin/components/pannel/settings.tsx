"use client";

import React from "react";
import SettingsProfileCard from "./settings/SettingsProfileCard";
import SettingsPlatformCard from "./settings/SettingsPlatformCard";
import SettingsOlympiadCard from "./settings/SettingsOlympiadCard";
import SettingsNotificationsCard from "./settings/SettingsNotificationsCard";
import SettingsSecurityCard from "./settings/SettingsSecurityCard";

export default function SettingsPanel() {
  return (
    <div className="space-y-6 pb-8 font-sans">
      {/* Grid: 2 columns on lg, 1 column on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <SettingsProfileCard />
        <SettingsPlatformCard />
        <SettingsOlympiadCard />
        <SettingsNotificationsCard />
      </div>

      {/* Security Card: Full width */}
      <div className="w-full">
        <SettingsSecurityCard />
      </div>
    </div>
  );
}

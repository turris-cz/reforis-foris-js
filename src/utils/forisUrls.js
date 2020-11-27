/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

export const REFORIS_URL_PREFIX = "/reforis";
export const REFORIS_API_URL_PREFIX = `${REFORIS_URL_PREFIX}/api`;

export const ForisURLs = {
    login: `${REFORIS_URL_PREFIX}/login`,
    logout: `${REFORIS_URL_PREFIX}/logout`,

    static: `${REFORIS_URL_PREFIX}/static/reforis`,
    wifi: `${REFORIS_URL_PREFIX}/network-settings/wifi`,

    packageManagement: {
        updateSettings: `${REFORIS_URL_PREFIX}/package-management/update-settings`,
        updates: `${REFORIS_URL_PREFIX}/package-management/updates`,
    },

    storage: `${REFORIS_URL_PREFIX}/storage`,

    // Notifications links are used with <Link/> inside Router, thus url subdir is not required.
    overview: "/overview",
    notifications: "/overview#notifications",
    notificationsSettings: "/administration/notifications-settings",

    approveUpdates: "/package-management/updates",
    languages: "/package-management/languages",
    rebootPage: "/administration/reboot",
    luci: "/cgi-bin/luci",

    // API
    reboot: `${REFORIS_API_URL_PREFIX}/reboot`,
};

/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

export const REFORIS_URL_PREFIX = "/reforis";
export const REFORIS_API_URL_PREFIX = `${REFORIS_URL_PREFIX}/api`;

export const ForisURLs = {
    // turris-auth
    login: `/login?${REFORIS_URL_PREFIX}/`,
    logout: `/logout`,
    extendSession: `/extend-session`,

    static: `${REFORIS_URL_PREFIX}/static/reforis`,
    wifi: `${REFORIS_URL_PREFIX}/network-settings/wifi`,

    packageManagement: {
        updateSettings: `${REFORIS_URL_PREFIX}/package-management/update-settings`,
        updates: `${REFORIS_URL_PREFIX}/package-management/updates`,
        packages: `${REFORIS_URL_PREFIX}/package-management/packages`,
    },

    // Plugins
    storage: `${REFORIS_URL_PREFIX}/storage`,
    sentinelAgreement: `${REFORIS_URL_PREFIX}/sentinel/agreement`,

    // Notifications links are used with <Link/> inside Router, thus url subdir is not required.
    overview: "/overview",
    notifications: "/overview#notifications",
    notificationsSettings: "/administration/notifications-settings",

    approveUpdates: "/package-management/updates",
    languages: "/package-management/languages",
    maintenance: "/administration/maintenance",
    luci: "/cgi-bin/luci",

    // API
    about: `${REFORIS_API_URL_PREFIX}/about`,
    reboot: `${REFORIS_API_URL_PREFIX}/reboot`,
};

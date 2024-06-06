/*
 * Copyright (C) 2020-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

function displayCard({ package_lists: packages }, cardName) {
    const enabledPackagesNames = [];
    packages
        .filter((item) => item.enabled)
        .map((item) => {
            enabledPackagesNames.push(item.name);
            item.options
                .filter((option) => option.enabled)
                .map((option) => {
                    enabledPackagesNames.push(option.name);
                    return null;
                });
            return null;
        });
    return enabledPackagesNames.includes(cardName);
}

export default displayCard;

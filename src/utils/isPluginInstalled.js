/*
 * Copyright (C) 2020-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

const isPluginInstalled = (pluginName) =>
    ForisPlugins.some((plugin) => plugin.name === pluginName);

export default isPluginInstalled;

/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

// Mock babel (gettext)
global._ = (str) => str;
global.ngettext = (str) => str;
global.babel = { format: (str) => str };
global.ForisTranslations = { locale: "en" };

/*
 * Copyright (C) 2019-2026 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import { ENCRYPTIONMODES } from "./constants";

// Both the main and the guest network run on the same radio, so the band
// limits the encryption choices of both of them.
export default function getEncryptionChoices(band, encryption) {
    if (band === "6g") {
        return { WPA3: ENCRYPTIONMODES.WPA3 };
    }
    if (encryption === "custom") {
        return { ...ENCRYPTIONMODES, custom: _("Custom") };
    }
    return ENCRYPTIONMODES;
}

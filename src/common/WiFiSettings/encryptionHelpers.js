/*
 * Copyright (C) 2019-2026 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import { ENCRYPTIONMODES } from "./constants";

// Both the main and the guest network run on the same radio, so the band
// limits the encryption choices of both of them. A custom encryption comes
// from a hand-made configuration, it's offered on any band to keep the form
// from rewriting it.
export default function getEncryptionChoices(band, encryption) {
    const customChoice = encryption === "custom" ? { custom: _("Custom") } : {};
    if (band === "6g") {
        return { WPA3: ENCRYPTIONMODES.WPA3, ...customChoice };
    }
    return { ...ENCRYPTIONMODES, ...customChoice };
}

// Encryption the band actually supports. Filtering the choices only hides the
// unsupported ones from the select, the value itself has to follow the band as
// well, otherwise the select displays its single WPA3 choice while the form
// still holds (and submits) e.g. WPA2/3.
export function getSupportedEncryption(band, encryption) {
    if (band === "6g" && encryption !== "custom") {
        return "WPA3";
    }
    return encryption;
}

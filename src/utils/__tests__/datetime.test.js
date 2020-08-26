/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import { toLocaleDateString } from "../datetime";

describe("toLocaleDateString", () => {
    it("should work with different locale", () => {
        global.ForisTranslations = { locale: "fr" };
        expect(toLocaleDateString("2020-02-20T12:51:36+00:00")).toBe(
            "20 février 2020 12:51"
        );
        global.ForisTranslations = { locale: "en" };
    });

    it("should convert with default format", () => {
        expect(toLocaleDateString("2020-02-20T12:51:36+00:00")).toBe(
            "February 20, 2020 12:51 PM"
        );
    });

    it("should convert with custom input format", () => {
        expect(
            toLocaleDateString("2020-02-20 12:51:36 +0000", {
                inputFormat: "YYYY-MM-DD HH:mm:ss Z",
            })
        ).toBe("February 20, 2020 12:51 PM");
    });

    it("should convert with custom output format", () => {
        expect(
            toLocaleDateString("2020-02-20T12:51:36+00:00", {
                outputFormat: "LL",
            })
        ).toBe("February 20, 2020");
    });

    it("should convert with custom input and output format", () => {
        expect(
            toLocaleDateString("2020-02-20 12:51:36 +0000", {
                inputFormat: "YYYY-MM-DD HH:mm:ss Z",
                outputFormat: "LL",
            })
        ).toBe("February 20, 2020");
    });
});

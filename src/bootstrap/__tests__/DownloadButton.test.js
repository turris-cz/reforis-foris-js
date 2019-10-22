/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { render } from "customTestRender";

import { DownloadButton } from "../DownloadButton";

describe("<DownloadButton />", () => {
    it("should have download attribute", () => {
        const { container } = render(<DownloadButton href="http://example.com">Test Button</DownloadButton>);
        expect(container.firstChild.getAttribute("download")).not.toBeNull();
    });
});

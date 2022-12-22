/*
 * Copyright (C) 2019-2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";

import { useAPIGet } from "../../api/hooks";
import { ForisURLs } from "../../utils/forisUrls";

import { Spinner } from "../../bootstrap/Spinner";

CustomizationContextProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

function CustomizationContextProvider({ children }) {
    const { CustomizationContext } = window;
    const [getCustomizationResponse, getCustomization] = useAPIGet(
        ForisURLs.about
    );

    useEffect(() => {
        getCustomization();
    }, [getCustomization]);

    if (getCustomizationResponse.state !== "success") {
        return <Spinner fullScreen />;
    }

    const deviceDetails = getCustomizationResponse.data || {};

    const isCustomized = !!(
        deviceDetails &&
        deviceDetails.customization !== undefined &&
        deviceDetails.customization === "shield"
    );

    return (
        <CustomizationContext.Provider value={{ deviceDetails, isCustomized }}>
            {children}
        </CustomizationContext.Provider>
    );
}

function useCustomizationContext() {
    const { CustomizationContext } = window;
    return useContext(CustomizationContext);
}

export { CustomizationContextProvider, useCustomizationContext };

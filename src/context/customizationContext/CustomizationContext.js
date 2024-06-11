/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useContext, useEffect, useMemo } from "react";

import PropTypes from "prop-types";

import { useAPIGet } from "../../api/hooks";
import { Spinner } from "../../bootstrap/Spinner";
import { ForisURLs } from "../../utils/forisUrls";

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

    const deviceDetails = useMemo(
        () => getCustomizationResponse.data || {},
        [getCustomizationResponse.data]
    );

    const isCustomized = useMemo(
        () =>
            !!(
                deviceDetails.customization !== undefined &&
                deviceDetails.customization === "shield"
            ),
        [deviceDetails.customization]
    );

    const contextValue = useMemo(
        () => ({ deviceDetails, isCustomized }),
        [deviceDetails, isCustomized]
    );

    if (getCustomizationResponse.state !== "success") {
        return <Spinner fullScreen />;
    }

    return (
        <CustomizationContext.Provider value={contextValue}>
            {children}
        </CustomizationContext.Provider>
    );
}

function useCustomizationContext() {
    const { CustomizationContext } = window;
    return useContext(CustomizationContext);
}

export { CustomizationContextProvider, useCustomizationContext };

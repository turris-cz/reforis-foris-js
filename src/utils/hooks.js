/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import { useState, useEffect, useRef } from "react";
import { Tooltip } from "bootstrap/dist/js/bootstrap.bundle.min";

/** Execute callback when condition is set to true. */
export function useConditionalTimeout(
    { callback, timeout = 125 },
    ...callbackArgs
) {
    const [condition, setCondition] = useState(false);
    useEffect(() => {
        if (condition) {
            const interval = setTimeout(
                () => callback(...callbackArgs),
                timeout
            );
            return () => setTimeout(interval);
        }
    }, [condition, callback, timeout, callbackArgs]);
    return setCondition;
}

/** Execute callback when user clicks outside specified element. */
export function useClickOutside(element, callback) {
    function handleClickOutside(event) {
        if (element.current && !element.current.contains(event.target)) {
            callback(event);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });
}

/** useTooltip hook for Bootstrap tooltips. */
export function useTooltip(description, placement = "top", trigger = "hover") {
    const tooltipRef = useRef();

    useEffect(() => {
        const tooltip = new Tooltip(tooltipRef.current, {
            title: description,
            placement,
            trigger,
        });

        return () => {
            tooltip.dispose();
        };
    });

    return tooltipRef;
}

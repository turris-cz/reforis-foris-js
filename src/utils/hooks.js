/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import { useState, useEffect } from "react";

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

/* Trap focus inside element. */
export function useFocusTrap(elementRef, condition = true) {
    useEffect(() => {
        if (!condition) {
            return;
        }
        const currentElement = elementRef.current;
        const focusableElements = currentElement.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleTab = (event) => {
            if (event.key === "Tab") {
                if (event.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        event.preventDefault();
                    }
                } else if (document.activeElement === lastElement) {
                    firstElement.focus();
                    event.preventDefault();
                }
            }
        };

        currentElement.addEventListener("keydown", handleTab);

        firstElement.focus();

        return () => {
            currentElement.removeEventListener("keydown", handleTab);
        };
    }, [elementRef, condition]);
}

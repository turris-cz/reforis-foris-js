/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import { useCallback, useEffect, useReducer, useState } from "react";

import { ForisURLs } from "../utils/forisUrls";
import {
    API_ACTIONS,
    API_METHODS,
    API_STATE,
    getErrorPayload,
    HEADERS,
    TIMEOUT,
} from "./utils";

const DATA_METHODS = ["POST", "PATCH", "PUT"];

function createAPIHook(method) {
    return (urlRoot, contentType) => {
        const [state, dispatch] = useReducer(APIReducer, {
            state: API_STATE.INIT,
            data: null,
        });

        const sendRequest = useCallback(
            async ({ data, suffix } = {}) => {
                const headers = { ...HEADERS };
                if (contentType) {
                    headers["Content-Type"] = contentType;
                }

                dispatch({ type: API_ACTIONS.INIT });
                try {
                    // Prepare request
                    const request = API_METHODS[method];
                    const config = {
                        timeout: TIMEOUT,
                        headers,
                    };
                    const url = suffix ? `${urlRoot}/${suffix}` : urlRoot;

                    // Make request
                    let result;
                    if (DATA_METHODS.includes(method)) {
                        result = await request(url, data, config);
                    } else {
                        result = await request(url, config);
                    }

                    // Process request result
                    dispatch({
                        type: API_ACTIONS.SUCCESS,
                        payload: result.data,
                    });
                } catch (error) {
                    const errorPayload = getErrorPayload(error);
                    dispatch({
                        type: API_ACTIONS.FAILURE,
                        status: error.response && error.response.status,
                        payload: errorPayload,
                    });
                }
            },
            [urlRoot, contentType]
        );
        return [state, sendRequest];
    };
}

function APIReducer(state, action) {
    switch (action.type) {
        case API_ACTIONS.INIT:
            return {
                ...state,
                state: API_STATE.SENDING,
            };
        case API_ACTIONS.SUCCESS:
            return {
                state: API_STATE.SUCCESS,
                data: action.payload,
            };
        case API_ACTIONS.FAILURE:
            if (action.status === 403) {
                window.location.assign(ForisURLs.login);
            }

            // Not an API error - should be rethrown.
            if (
                action.payload &&
                action.payload.stack &&
                action.payload.message
            ) {
                throw action.payload;
            }

            return {
                state: API_STATE.ERROR,
                data: action.payload,
            };
        default:
            throw new Error();
    }
}

const useAPIGet = createAPIHook("GET");
const useAPIPost = createAPIHook("POST");
const useAPIPatch = createAPIHook("PATCH");
const useAPIPut = createAPIHook("PUT");
const useAPIDelete = createAPIHook("DELETE");

export { useAPIGet, useAPIPost, useAPIPatch, useAPIPut, useAPIDelete };

export function useAPIPolling(endpoint, delay = 1000, until) {
    // delay ms
    const [state, setState] = useState({ state: API_STATE.INIT });
    const [getResponse, get] = useAPIGet(endpoint);

    useEffect(() => {
        if (getResponse.state !== API_STATE.INIT) {
            setState(getResponse);
        }
    }, [getResponse]);

    useEffect(() => {
        if (until) {
            const interval = setInterval(get, delay);
            return () => clearInterval(interval);
        }
    }, [until, delay, get]);

    return [state];
}

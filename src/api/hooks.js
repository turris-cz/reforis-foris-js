/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import { useReducer, useCallback } from "react";

import { ForisURLs } from "forisUrls";
import {
    API_STATE, API_ACTIONS, API_METHODS, TIMEOUT, HEADERS, getErrorMessage,
} from "./utils";

const DATA_METHODS = ["POST", "PATCH", "PUT"];

function createAPIHook(method) {
    return (url, contentType) => {
        const [state, dispatch] = useReducer(APIReducer, {
            state: API_STATE.INIT,
            data: null,
        });

        const sendRequest = useCallback(async (data) => {
            const headers = { ...HEADERS };
            if (contentType) {
                headers["Content-Type"] = contentType;
            }

            dispatch({ type: API_ACTIONS.INIT });
            try {
                const request = API_METHODS[method];
                const config = { timeout: TIMEOUT, headers };
                let result;
                if (DATA_METHODS.includes(method)) {
                    result = await request(url, data, config);
                } else {
                    result = await request(url, config);
                }
                dispatch({ type: API_ACTIONS.SUCCESS, payload: result.data });
            } catch (error) {
                dispatch({
                    type: API_ACTIONS.FAILURE,
                    payload: getErrorMessage(error),
                    status: error.response.status,
                });
            }
        }, [url, contentType]);
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

export {
    useAPIGet, useAPIPost, useAPIPatch, useAPIPut, useAPIDelete,
};

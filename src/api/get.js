/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import { useReducer, useCallback } from "react";
import axios from "axios";

import { ForisURLs } from "forisUrls";
import { API_ACTIONS, TIMEOUT } from "./utils";

const APIGetReducer = (state, action) => {
    switch (action.type) {
    case API_ACTIONS.INIT:
        return {
            ...state,
            isLoading: true,
            isError: false,
        };
    case API_ACTIONS.SUCCESS:
        return {
            ...state,
            isLoading: false,
            isError: false,
            data: action.payload,
        };
    case API_ACTIONS.FAILURE:
        if (action.status === 403) window.location.assign(ForisURLs.login);
        return {
            ...state,
            isLoading: false,
            isError: true,
            data: action.payload,
        };
    default:
        throw new Error();
    }
};

export function useAPIGet(url) {
    const [state, dispatch] = useReducer(APIGetReducer, {
        isLoading: false,
        isError: false,
        data: null,
    });
    const get = useCallback(async () => {
        dispatch({ type: API_ACTIONS.INIT });
        try {
            const result = await axios.get(url, {
                timeout: TIMEOUT,
            });
            dispatch({ type: API_ACTIONS.SUCCESS, payload: result.data });
        } catch (error) {
            dispatch({
                type: API_ACTIONS.FAILURE,
                payload: error.response.data,
                status: error.response.status,
            });
        }
    }, [url]);

    return [state, get];
}

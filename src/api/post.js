/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import { useReducer } from "react";
import axios from "axios";

import {
    API_ACTIONS, TIMEOUT, HEADERS, APIReducer,
} from "./utils";

export function useAPIPost(url) {
    const [state, dispatch] = useReducer(APIReducer, {
        isSending: false,
        isError: false,
        isSuccess: false,
        data: null,
    });

    const post = async (data) => {
        dispatch({ type: API_ACTIONS.INIT });
        try {
            const result = await axios.post(url, data, {
                timeout: TIMEOUT,
                headers: HEADERS,
            });
            dispatch({ type: API_ACTIONS.SUCCESS, payload: result.data });
        } catch (error) {
            dispatch({
                type: API_ACTIONS.FAILURE,
                payload: error.response.data,
                status: error.response.status,
            });
        }
    };
    return [state, post];
}

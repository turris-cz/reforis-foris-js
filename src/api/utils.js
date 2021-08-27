/*
 * Copyright (C) 2019-2021 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import axios from "axios";

export const HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRFToken": getCookie("_csrf_token"),
    "X-Requested-With": "json",
};

export const TIMEOUT = 30500;

export const API_ACTIONS = {
    INIT: 1,
    SUCCESS: 2,
    FAILURE: 3,
};

export const API_STATE = {
    INIT: "init",
    SENDING: "sending",
    SUCCESS: "success",
    ERROR: "error",
};

export const API_METHODS = {
    GET: axios.get,
    POST: axios.post,
    PATCH: axios.patch,
    PUT: axios.put,
    DELETE: axios.delete,
};

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === `${name}=`) {
                cookieValue = decodeURIComponent(
                    cookie.substring(name.length + 1)
                );
                break;
            }
        }
    }
    return cookieValue;
}

export function getErrorPayload(error) {
    if (error.response) {
        if (error.response.status === 401) {
            return _("The session is expired. Please log in again.");
        }
        return getJSONErrorMessage(error);
    }
    if (error.code === "ECONNABORTED") {
        return _("Timeout error occurred.");
    }
    if (error.request) {
        return _("No response received.");
    }
    // Return original error because it's not directly related to API request/response.
    return error;
}

export function getJSONErrorMessage(error) {
    if (error.response.headers["content-type"] === "application/json") {
        return error.response.data;
    }
    return _("An unknown API error occurred.");
}

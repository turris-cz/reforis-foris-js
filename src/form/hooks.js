/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import { useCallback, useEffect, useReducer } from "react";

import update from "immutability-helper";

import { useAPIGet } from "../api/hooks";
import useWSForisModule from "../webSockets/hooks";

const FORM_ACTIONS = {
    updateValue: 1,
    resetData: 2,
};

export function useForm(validator, dataPreprocessor) {
    const [state, dispatch] = useReducer(formReducer, {
        data: null,
        initialData: null,
        errors: {},
    });

    const onFormReload = useCallback(
        (data) => {
            dispatch({
                type: FORM_ACTIONS.resetData,
                data,
                dataPreprocessor,
                validator,
            });
        },
        [dataPreprocessor, validator]
    );

    const onFormChangeHandler = useCallback(
        (updateRule) => (event) => {
            dispatch({
                type: FORM_ACTIONS.updateValue,
                value: getChangedValue(event.target),
                updateRule,
                validator,
            });
        },
        [validator]
    );

    return [state, onFormChangeHandler, onFormReload];
}

function formReducer(state, action) {
    switch (action.type) {
        case FORM_ACTIONS.updateValue: {
            const newData = update(state.data, action.updateRule(action.value));
            const errors = action.validator(newData);
            return {
                ...state,
                data: newData,
                errors,
            };
        }
        case FORM_ACTIONS.resetData: {
            if (!action.data) {
                return { ...state, initialData: state.data };
            }

            const data = action.dataPreprocessor
                ? action.dataPreprocessor(action.data)
                : action.data;
            return {
                data,
                initialData: data,
                errors: action.data ? action.validator(data) : undefined,
            };
        }
        default: {
            throw new Error();
        }
    }
}

function getChangedValue(target) {
    let { value } = target;
    if (target.type === "checkbox") {
        value = target.checked;
    } else if (target.type === "number") {
        const parsedValue = parseInt(value);
        value = Number.isNaN(parsedValue) ? value : parsedValue;
    } else if (target.type === "file") {
        // Return first file (we don't need multiple yet)
        [value] = target.files;
    }
    return value;
}

export function useForisModule(ws, config) {
    const [APIGetState, get] = useAPIGet(config.endpoint);
    const [WSData] = useWSForisModule(ws, config.wsModule, config.wsAction);

    useEffect(() => {
        get();
    }, [WSData, get]);

    return [APIGetState];
}

/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import moment from "moment/moment";
import PropTypes from "prop-types";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import "./DataTimeInput.css";

import Input from "./Input";

DataTimeInput.propTypes = {
    /** Field label. */
    label: PropTypes.string.isRequired,
    /** Error message. */
    error: PropTypes.string,
    /** DataTime or Data or Time value. Can be `moment` or string. */
    value: PropTypes.oneOfType([PropTypes.objectOf(moment), PropTypes.string]),
    /** Help text message. */
    helpText: PropTypes.string,
    /** Content. */
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    isValidDate: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    dateFormat: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    timeFormat: PropTypes.string,
};

const DEFAULT_DATE_FORMAT = "YYYY-MM-DD";
const DEFAULT_TIME_FORMAT = "HH:mm:ss";

function DataTimeInput({
    value,
    onChange,
    isValidDate,
    dateFormat,
    timeFormat,
    children,
    ...props
}) {
    const renderInput = (datetimeProps) => {
        return (
            <Input {...props} {...datetimeProps}>
                {children}
            </Input>
        );
    };

    return (
        <Datetime
            locale={ForisTranslations.locale}
            dateFormat={
                dateFormat !== undefined ? dateFormat : DEFAULT_DATE_FORMAT
            }
            timeFormat={
                timeFormat !== undefined ? timeFormat : DEFAULT_TIME_FORMAT
            }
            value={value}
            onChange={onChange}
            isValidDate={isValidDate}
            renderInput={renderInput}
        />
    );
}

export default DataTimeInput;

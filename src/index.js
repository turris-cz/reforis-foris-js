/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

// API
export {
    useAPIGet, useAPIPost, useAPIPatch, useAPIPut, useAPIDelete,
} from "api/hooks";
export { API_STATE } from "api/utils";

// Bootstrap
export { Alert, ALERT_TYPES } from "bootstrap/Alert";
export { Button } from "bootstrap/Button";
export { CheckBox } from "bootstrap/CheckBox";
export { DownloadButton } from "bootstrap/DownloadButton";
export { DataTimeInput } from "bootstrap/DataTimeInput";
export { EmailInput } from "bootstrap/EmailInput";
export { FileInput } from "bootstrap/FileInput";
export { Input } from "bootstrap/Input";
export { NumberInput } from "bootstrap/NumberInput";
export { PasswordInput } from "bootstrap/PasswordInput";
export { RadioSet } from "bootstrap/RadioSet";
export { Select } from "bootstrap/Select";
export { TextInput } from "bootstrap/TextInput";
export { formFieldsSize } from "bootstrap/constants";

export {
    Spinner,
    SpinnerElement,
} from "bootstrap/Spinner";
export {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "bootstrap/Modal";

// Form
export { ForisForm } from "form/components/ForisForm";
export { SubmitButton, STATES as SUBMIT_BUTTON_STATES } from "form/components/SubmitButton";
export { useForisModule, useForm } from "form/hooks";

// WebSockets
export { useWSForisModule } from "webSockets/hooks";
export { WebSockets } from "webSockets/WebSockets";

// Utils
export { Portal } from "utils/Portal";
export { undefinedIfEmpty, withoutUndefinedKeys, onlySpecifiedKeys } from "utils/objectHelpers";
export {
    withEither, withSpinner, withSending, withSpinnerOnSending, withError, withErrorMessage,
} from "utils/conditionalHOCs";
export { ErrorMessage } from "utils/ErrorMessage";

// Foris URL
export { ForisURLs, REFORIS_URL_PREFIX } from "forisUrls";

// Validation
export {
    validateIPv4Address,
    validateIPv6Address,
    validateIPv6Prefix,
    validateDomain,
    validateDUID,
    validateMAC,
    validateMultipleEmails,
} from "validations";

// Alert context
export { AlertContext, AlertContextProvider, useAlert } from "alertContext/AlertContext";

/*
 * Copyright (C) 2019-2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

// API
export {
    useAPIGet,
    useAPIPost,
    useAPIPatch,
    useAPIPut,
    useAPIDelete,
    useAPIPolling,
} from "./api/hooks";
export { API_STATE } from "./api/utils";

// Bootstrap
export { Alert, ALERT_TYPES } from "./bootstrap/Alert";
export { Button } from "./bootstrap/Button";
export { CheckBox } from "./bootstrap/CheckBox";
export { CopyInput } from "./bootstrap/CopyInput";
export { DownloadButton } from "./bootstrap/DownloadButton";
export { DataTimeInput } from "./bootstrap/DataTimeInput";
export { EmailInput } from "./bootstrap/EmailInput";
export { FileInput } from "./bootstrap/FileInput";
export { Input } from "./bootstrap/Input";
export { NumberInput } from "./bootstrap/NumberInput";
export { PasswordInput } from "./bootstrap/PasswordInput";
export { Radio, RadioSet } from "./bootstrap/RadioSet";
export { Select } from "./bootstrap/Select";
export { TextInput } from "./bootstrap/TextInput";
export { formFieldsSize, buttonFormFieldsSize } from "./bootstrap/constants";
export { Switch } from "./bootstrap/Switch";

export { Spinner, SpinnerElement } from "./bootstrap/Spinner";
export { Modal, ModalBody, ModalFooter, ModalHeader } from "./bootstrap/Modal";

// Common
export { RebootButton } from "./common/RebootButton";
export { WiFiSettings } from "./common/WiFiSettings/WiFiSettings";
export { ResetWiFiSettings } from "./common/WiFiSettings/ResetWiFiSettings";
// Form
export { ForisForm } from "./form/components/ForisForm";
export {
    SubmitButton,
    STATES as SUBMIT_BUTTON_STATES,
} from "./form/components/SubmitButton";
export { useForisModule, useForm } from "./form/hooks";

// WebSockets
export { useWSForisModule } from "./webSockets/hooks";
export { WebSockets } from "./webSockets/WebSockets";

// Utils
export { Portal } from "./utils/Portal";
export {
    undefinedIfEmpty,
    withoutUndefinedKeys,
    onlySpecifiedKeys,
} from "./utils/objectHelpers";
export {
    withEither,
    withSpinner,
    withSending,
    withSpinnerOnSending,
    withError,
    withErrorMessage,
} from "./utils/conditionalHOCs";
export { ErrorMessage } from "./utils/ErrorMessage";
export { useClickOutside } from "./utils/hooks";
export { toLocaleDateString } from "./utils/datetime";
export { displayCard } from "./utils/displayCard";
export { isPluginInstalled } from "./utils/isPluginInstalled";

// Foris URL
export { ForisURLs, REFORIS_URL_PREFIX } from "./utils/forisUrls";

// Validation
export {
    validateIPv4Address,
    validateIPv6Address,
    validateIPv6Prefix,
    validateDomain,
    validateHostname,
    validateDUID,
    validateMAC,
    validateMultipleEmails,
} from "./utils/validations";

// Alert context
export {
    AlertContextProvider,
    useAlert,
} from "./context/alertContext/AlertContext";

// Customization context
export {
    CustomizationContextProvider,
    useCustomizationContext,
} from "./context/customizationContext/CustomizationContext";

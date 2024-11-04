/*
 * Copyright (C) 2019-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
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
export { default as Alert, ALERT_TYPES } from "./bootstrap/Alert";
export { default as Button } from "./bootstrap/Button";
export { default as CheckBox } from "./bootstrap/CheckBox";
export { default as CopyInput } from "./bootstrap/CopyInput";
export { default as DownloadButton } from "./bootstrap/DownloadButton";
export { default as DataTimeInput } from "./bootstrap/DataTimeInput";
export { default as EmailInput } from "./bootstrap/EmailInput";
export { default as FileInput } from "./bootstrap/FileInput";
export { default as Input } from "./bootstrap/Input";
export { default as NumberInput } from "./bootstrap/NumberInput";
export { default as PasswordInput } from "./bootstrap/PasswordInput";
export { default as Radio } from "./bootstrap/Radio";
export { default as RadioSet } from "./bootstrap/RadioSet";
export { default as Select } from "./bootstrap/Select";
export { default as TextInput } from "./bootstrap/TextInput";
export { formFieldsSize, buttonFormFieldsSize } from "./bootstrap/constants";
export { default as Switch } from "./bootstrap/Switch";
export { default as ThreeDotsMenu } from "./bootstrap/ThreeDotsMenu";

export { Spinner, SpinnerElement } from "./bootstrap/Spinner";
export { Modal, ModalBody, ModalFooter, ModalHeader } from "./bootstrap/Modal";

// Common
export { default as RebootButton } from "./common/RebootButton";
export { default as WiFiSettings } from "./common/WiFiSettings/WiFiSettings";
export { default as ResetWiFiSettings } from "./common/WiFiSettings/ResetWiFiSettings";
export { default as RichTable } from "./common/RichTable/RichTable";
// Form
export { default as ForisForm } from "./form/components/ForisForm";
export {
    SubmitButton,
    STATES as SUBMIT_BUTTON_STATES,
} from "./form/components/SubmitButton";
export { useForisModule, useForm } from "./form/hooks";

// WebSockets
export { default as useWSForisModule } from "./webSockets/hooks";
export { default as WebSockets } from "./webSockets/WebSockets";

// Utils
export { default as Portal } from "./utils/Portal";
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
export { default as ErrorMessage } from "./utils/ErrorMessage";
export { useClickOutside } from "./utils/hooks";
export { default as toLocaleDateString } from "./utils/datetime";
export { default as displayCard } from "./utils/displayCard";
export { default as isPluginInstalled } from "./utils/isPluginInstalled";

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

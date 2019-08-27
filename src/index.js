import * as Alert from "bootstrap/Alert";
import * as Button from "bootstrap/Button";
import * as CheckBox from "bootstrap/Checkbox";
import * as formFieldsSize from "bootstrap/constants";
import * as DataTimeInput from "bootstrap/DataTimeInput";
import * as EmailInput from "bootstrap/EmailInput";
import * as Input from "bootstrap/Input";
import * as NumberInput from "bootstrap/NumberInput";
import * as PasswordInput from "bootstrap/PasswordInput";
import * as RadioSet from "bootstrap/RadioSet";
import * as Select from "bootstrap/Select";
import * as TextInput from "bootstrap/TextInput";

import * as useWSForisModule from "webSockets/hooks";
import * as WebSockets from "webSockets/WebSockets";
import * as Portal from "utils/Portal";

import ForisForm from "form/components/ForisForm";

// API
export { useAPIGet, useAPIPost } from "./api/hooks";

// Bootstrap
export {
    Alert,
    Button,
    CheckBox,
    formFieldsSize,
    DataTimeInput,
    EmailInput,
    Input,
    NumberInput,
    PasswordInput,
    RadioSet,
    Select,
    TextInput,
};
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
export { ForisForm };
export { SubmitButton, STATES as SUBMIT_BUTTON_STATES } from "form/components/SubmitButton";
export { useForisModule, useForm } from "form/hooks";


// Test Utils
export { mockedWS } from "testUtils/mockWS";

// WebSockets
export { useWSForisModule, WebSockets };

// Utils
export { Portal };

// Foris URL
export { ForisURLs, REFORIS_URL_PREFIX } from "./forisUrls";

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

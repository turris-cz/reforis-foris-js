RebootButton component is a button that opens a modal dialog to confirm the
reboot of the device.

## Usage

```jsx
import React, { useEffect, createContext } from "react";

import Button from "../../bootstrap/Button";
import { AlertContextProvider } from "../../context/alertContext/AlertContext";
import ActionButtonWithModal from "./ActionButtonWithModal";

window.AlertContext = React.createContext();

const RebootButtonExample = () => {
    const ActionButton = (props) => {
        return <Button {...props}>Action</Button>;
    };

    return (
        <AlertContextProvider>
            <div id="modal-container" />
            <div id="alert-container" />
            <ActionButtonWithModal
                actionTrigger={ActionButton}
                actionUrl="/reforis/api/action"
                modalTitle="Warning!"
                modalMessage="Are you sure you want to perform this action?"
                modalActionText="Confirm action"
                modalActionProps={{ className: "btn-danger" }}
                successMessage="Action request succeeded."
                errorMessage="Action request failed."
            />
        </AlertContextProvider>
    );
};

<RebootButtonExample />;
```

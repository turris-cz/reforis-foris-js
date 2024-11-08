RebootButton component is a button that opens a modal dialog to confirm the
reboot of the device.

## Usage

```jsx
import React, { useEffect, createContext } from "react";
import RebootButton from "./RebootButton";
import { AlertContextProvider } from "../context/alertContext/AlertContext";

window.AlertContext = React.createContext();

const RebootButtonExample = () => {
    return (
        <AlertContextProvider>
            <div id="modal-container" />
            <div id="alert-container" />
            <RebootButton />
        </AlertContextProvider>
    );
};

<RebootButtonExample />;
```

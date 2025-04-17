`<ForisForm/>` is Higher-Order Component which encapsulates entire form logic
and provides with children required props. This component structure provides
comfort API and allows to create typical Foris module forms easily.

## Example of usage of `<ForisForm/>`

You can pass more forms as children.

```jsx static
export default function WAN({ ws }) {
    return (
        <ForisForm
            ws={ws}
            forisConfig={{
                endpoint: API_URLs.wan,
                wsModule: "wan",
            }}
            prepData={prepData}
            prepDataToSubmit={prepDataToSubmit}
            validator={validator}
        >
            <WANForm />
            <WAN6Form />
            <MACForm />
        </ForisForm>
    );
}
```

### Example of children forms `props` usage

```jsx static
export default function MACForm({
    formData,
    formErrors,
    setFormValue,
    ...props
}) {
    const macSettings = formData.mac_settings;
    const errors = (formErrors || {}).mac_settings || {};
    return (
        <>
            <h3>{_("MAC")}</h3>
            <CheckBox
                label={_("Custom MAC address")}
                checked={macSettings.custom_mac_enabled}
                helpText={HELP_TEXTS.custom_mac_enabled}
                onChange={setFormValue((value) => ({
                    mac_settings: { custom_mac_enabled: { $set: value } },
                }))}
                {...props}
            />
            {macSettings.custom_mac_enabled ? (
                <TextInput
                    label={_("MAC address")}
                    value={macSettings.custom_mac || ""}
                    helpText={HELP_TEXTS.custom_mac}
                    error={errors.custom_mac}
                    required
                    onChange={setFormValue((value) => ({
                        mac_settings: { custom_mac: { $set: value } },
                    }))}
                    {...props}
                />
            ) : null}
        </>
    );
}
```

The `<ForisForm/>` passes subsequent `props` to the child components.

| Prop name      | Type   | Description                                                                |
| -------------- | ------ | -------------------------------------------------------------------------- |
| `formData`     | object | Data returned from API.                                                    |
| `formErrors`   | object | Errors returned after validation via validator.                            |
| `setFormValue` | func   | Function for data update. It takes update rule as arg (see example above). |
| `disabled`     | bool   | Flag to disable form elements (during updates or loadings e.t.c.).         |

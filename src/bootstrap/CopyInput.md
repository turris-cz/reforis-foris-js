CopyInput Bootstrap component contains input with a label, predefined sizes, and
structure for use in ForisForm and the "Copy" button (copy to clipboard). It can
be used with `readOnly` and `disabled` parameters, please see an example.

All additional `props` are passed to the `<input type="text">` HTML component.

```js
import React, { useState } from "react";
const [value, setValue] = useState("Text to appear in clipboard.");

<CopyInput
    label="Copy me"
    value={value}
    helpText="Read the small text!"
    readOnly
/>;
```

Bootstrap modal component.

It's required to have an element `<div id={"modal-container"}/>` somewhere on
the page since modals are rendered in portals.

Modals also have three optional sizes, which can be defined through the `size`
prop:

-   small - `sm`
-   large - `lg`
-   extra-large - `xl`

For more details please visit Bootstrap
<a href="https://getbootstrap.com/docs/4.5/components/modal/#optional-sizes" target="_blank">
documentation</a>.

```js
<div id="modal-container" />
```

```js
import { ModalHeader, ModalBody, ModalFooter } from "./Modal";

import { useState } from "react";
const [shown, setShown] = useState(false);

<>
    <Modal setShown={setShown} shown={shown} size="sm">
        <ModalHeader setShown={setShown} title="Warning!" />
        <ModalBody>
            <p>Bla bla bla...</p>
        </ModalBody>
        <ModalFooter>
            <button
                className="btn btn-secondary"
                onClick={() => setShown(false)}
            >
                Skip it
            </button>
        </ModalFooter>
    </Modal>

    <button className="btn btn-secondary" onClick={() => setShown(true)}>
        Show modal
    </button>
</>;
```

ThreeDotsMenu Bootstrap component is a dropdown menu that appears when the user
clicks on three dots. It is used to display a list of actions that can be
performed on a particular item.

```js
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const threeDotsMenuItems = [
    {
        text: "Edit",
        icon: faEdit,
        onClick: () => {
            alert("Edit clicked");
        },
    },
    {
        text: "Delete",
        icon: faTrash,
        onClick: () => {
            alert("Delete clicked");
        },
    },
];

<ThreeDotsMenu>
    {threeDotsMenuItems.map((item, index) => (
        <button key={index} onClick={item.onClick} className="dropdown-item">
            <FontAwesomeIcon
                icon={item.icon}
                className="me-1"
                width="1rem"
                size="sm"
            />
            {item.text}
        </button>
    ))}
</ThreeDotsMenu>;
```

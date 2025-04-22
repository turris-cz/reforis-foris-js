Bootstrap component for file input. Includes label and has predefined sizes and
structure for using in foris forms.

All additional `props` are passed to the `<input type="file">` HTML component.

```jsx
import { useState } from "react";

const [files, setFiles] = useState([]);

// Note that files is not an array but FileList.
const label = files.length === 1 ? files[0].name : "Choose file";

<form className="col">
    <FileInput
        files={files}
        label={label}
        helpText="Will be uploaded"
        onChange={(event) => setFiles(event.target.files)}
    />
</form>;
```

### FileInput with multiple files

```jsx
import { useState } from "react";

const [files, setFiles] = useState([]);

// Note that files is not an array but FileList.
const label =
    files.length > 0
        ? Array.from(files)
              .map((file) => file.name)
              .join(", ")
        : "Choose files";

<form className="col">
    <FileInput
        files={files}
        label={label}
        helpText="Will be uploaded"
        onChange={(event) => setFiles(event.target.files)}
        multiple
    />
</form>;
```

Bootstrap component for file input. Includes label and has predefined sizes and structure for using in foris forms. 

All additional `props` are passed to the `<input type="file">` HTML component.

```js
import {useState} from 'react';
const [files, setFiles] = useState([]);

<FileInput
    files={files}
    label="Some file"
    helpText="Will be uploaded"
    onChange={event =>setFiles(event.target.files)}
/>
```

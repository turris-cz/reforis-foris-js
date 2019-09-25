Bootstrap modal component.

it's required to have an element `<div id={"modal-container"}/>` somewhere on the page since modals are rendered in portals.

```js
    <div id={"modal-container"}/>
```

I have no idea why example doesn't work here but you can investigate HTML code and Foris project.

```js
import {ModalHeader, ModalBody, ModalFooter} from './Modal';

import {useState} from 'react';
const [shown, setShown] = useState(false);

<>
    <Modal setShown={setShown} shown={shown}>
        <ModalHeader setShown={setShown} title='Warning!'/>
        <ModalBody><p>Bla bla bla...</p></ModalBody>
        <ModalFooter>
            <button 
                className='btn btn-secondary' 
                onClick={() => setShown(false)}
            >Skip it</button>
        </ModalFooter>
    </Modal>
    
    <button className='btn btn-secondary' onClick={()=>setShown(true)}>
        Show modal
    </button>
</>
```

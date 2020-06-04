Bootstrap alert component.

```jsx
import {useState} from 'react';

function AlertExample(){
    const [alert, setAlert] = useState(true);
    if (alert)
        return <Alert 
            type='warning' 
            onDismiss={()=>setAlert(false)}
        >
            Some warning out there!        
        </Alert>;
    return <button 
        className='btn btn-secondary' 
        onClick={()=>setAlert(true)}
    >Show alert again</button>;
};
<AlertExample/>
```

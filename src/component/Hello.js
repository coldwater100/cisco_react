import React, { useState } from 'react';
export const Hello = ()=>{
    const [count, setCount] = useState(3);
    return (
        <div>
            hello {count}
        </div>
    );
};

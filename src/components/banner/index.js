import React, {useState, forwardRef, useImperativeHandle} from 'react';
import './index.scss';

const Banner = forwardRef(({message},ref) => {  
    const [ active, setActive ] = useState(false);
    useImperativeHandle(ref,()=>({
        show(){
            setActive(true);
            setTimeout(()=>{
                setActive(false)
            },3000)
        }
    }))

    return (
        <div  className={`NASA-Project__Banner__Container ${active?'-show':'-hide'}`}>        
            <p>{message}</p>
        </div>
    );
});

export default Banner;
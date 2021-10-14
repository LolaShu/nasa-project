import './index.scss';
import {useState} from 'react';
import classNames from 'classnames';

function Button({
    onClick=()=>null,
    children,
    tooltipText,
    id,
    value,    
    ariaLabel,
    preset
}){    
    const [showToolTip, setShowToolTip] = useState(false)

    function handleClick(){ 
        setShowToolTip(false);        
            onClick();
            
        
    }

    function handleMouseOver(){
        setShowToolTip(true)
        console.log(showToolTip)
    }

    function handleMouseOut(){
        setShowToolTip(false)
    }

    return (
        <div className={`NASA-Project__Button__Container-${preset}`} >            
                <button id={id} value={value} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut} onClick={handleClick} aria-label={ariaLabel}>
                    {children}                    
                </button>
                <span className={classNames('tooltiptext',{'show':showToolTip})}>{tooltipText}</span>           
        </div>
        
    )
}

export default Button;
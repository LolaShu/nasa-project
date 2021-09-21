import './index.scss';

function Button({
    onClick=()=>null,
    children,
    tooltipText,
    id,
    value,    
    ariaLabel,
    preset
}){    
    

    return (
        <div className={`NASA-Project__Button__Container-${preset}`} >            
                <button id={id} value={value} onClick={onClick} aria-label={ariaLabel}>
                    {children}                    
                </button>
                <span className='tooltiptext'>{tooltipText}</span>           
        </div>
        
    )
}

export default Button;
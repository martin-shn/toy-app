import React, {useState} from 'react'

NicePopup.defaultProps={
    top:0,
    left:0,
    backgroundColor:'white'
}

var timer;

export function NicePopup(props){
    
    var [isVisible, setIsVisible]= useState(true);

    const style = {
        position:'absolute',
        top: props.top,
        left: props.left,
        transform: 'translate(-50%,-50%)',
        backgroundColor: props.bgc,
        border: '1px solid #333',
        borderRadius: '3px',
        padding: '10px',
        textAlign: 'center',
        fontWeight:'500'
    }
    
    document.body.addEventListener('keyup',(ev)=>{
        if(ev.key==='Escape' && isVisible) closePopup();
    })

    
    if (props.timeout){
        timer = setTimeout(()=>{
            closePopup()
        },props.timeout)
    }
    
    const closePopup=()=>{
        clearTimeout(timer)
        setIsVisible(false)
    }

    return(
        (isVisible && <div className="nice-popup" style={style}>
            <button onClick={()=>{closePopup()}} style={{position:'absolute',right:'10px',backgroundColor:'transparent',border:'0',cursor:'pointer'}}>X</button>
            {props.header && <div className="nice-popup-header" style={{marginBottom:"10px"}}>
                {props.header}
            </div>}
            {props.children && <div className="nice-popup-main">
                {props.children}
            </div>}
            {props.footer && <div className="nice-popup-footer" style={{marginTop:"20px"}}>
                {props.footer}
            </div>}
        </div>)
    )
}


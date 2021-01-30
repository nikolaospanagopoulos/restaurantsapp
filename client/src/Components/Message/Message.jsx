import React from 'react'
import './Message.css'

const Message = ({color,children}) => {
    return(
        <div>
            <h2 className='error-component' style={{color:color}}> {children} </h2>
        </div>
    )
}


Message.defaultProps={
    color:'tomato'
}

export default Message
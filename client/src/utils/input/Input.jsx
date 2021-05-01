import React from 'react'
import './input.css'
const { forwardRef, useImperativeHandle } = React;
const Input = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        HandleClear() {
            props.setValue('');
    }
}))
    return (
        <input onChange={(event)=> props.setValue(event.target.value)}
               value={props.value}
               type={props.type}
               placeholder={props.placeholder}/>
    )
});

export default Input;

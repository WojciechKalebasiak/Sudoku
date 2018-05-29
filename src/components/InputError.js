import React from 'react';
import '../styles/error.css';
const InputError = props =>
    <div className={'error'}>
        <h1>There was error with your board!</h1>
        <button className={'navigation-button'} onClick={()=>props.restartLoading()}>Try to load it again</button>
        <button className={'navigation-button'} onClick={()=>props.home()}>Home</button>
    </div>
export default InputError;
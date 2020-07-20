import React from 'react';
import './ImageLink.css';



const ImageLink = ({ OnTextChange, OnClick, Name, Entries }) => {
    const check = (event) => {
        if(event.charCode === 13)
            OnClick();
    }
    const selectText = () => {
        const text = document.getElementById('inputText');
        text.focus();
        text.select();
    }
    return(
        <div>
            <p className='f2 tc' > Welcome {Name}, your current entries are {Entries} </p>
            <p className='f3 tc'>Type the image url for face detection</p>
            <div className='flex justify-center' >
            <div className='form'>
                <input id='inputText' type='text'className='w-70' onChange={OnTextChange} onKeyPress={check} onClick={selectText} placeholder= 'Eg. https://unsplash.com/photos/eSjmZW97cH8' />
                <button className='w-30 grow  dib white bg-light-purple' onClick={OnClick} >Detect</button>
            </div>
            </div>
        </div>
    );
}

export default ImageLink;
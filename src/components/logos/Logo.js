import React from 'react';
import Brain from './brain.png';
import Tilt from 'react-tilt'


const Logo = () => {
    return(
        <div className='ma4' >
        <Tilt className="Tilt shadow-2" options={{ max : 200 }} style={{ height: 150, width: 150,   background: 'linear-gradient(to right, rgba(255, 94, 223) 20%, #04c8de 100%)'}} >
            <div className='Tilt-inner flex pa3 flex justify-center' ><img style={{paddingTop:'10px',userSelect:'none'}} alt='brain' src={Brain} /></div>        
        </Tilt>
        </div>
    );
}

export default Logo;
import React from 'react';
import './faceRecognition.css';


const FaceRecognisedImage = ({ ImageUrl, Box }) => {
 return(
     <div>
        <div  id='imageDiv' className='tc' ></div>
            <div className='imageFlex' >
                <img id='image' alt='' src={ImageUrl} width='500px' height='auto' />
                <div className='bounding_box' style={{top: Box.topRow, right: Box.rightCol, bottom: Box.bottomRow, left: Box.leftCol}} />
            </div>
        <div>
        </div>
     </div>
 );
}

export default FaceRecognisedImage;
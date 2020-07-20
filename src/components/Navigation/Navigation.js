import React from 'react';

const Navigation = ({ OnClickSignin }) => {
    return (
        <nav className='tr underline f4 pr4 pt3 dim pointer black'>
            <a href='!#' onClick={() => OnClickSignin('Signin')}  >Sign out</a>
        </nav>
    );
}

export default Navigation;
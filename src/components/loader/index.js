import React from 'react';

import './index.scss';

function Loader() {

  return(
    <>
      <div className='NASA-Project-Loader__Container'>
        <div className='blob-center'></div>
        <div className='blob'></div>
        <div className='blob'></div>
        <div className='blob'></div>
        <div className='blob'></div>
        <div className='blob'></div>
        <div className='blob'></div>
      </div>
      <svg xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <defs>
          <filter id='goo'>
            <feGaussianBlur in='SourceGraphic' stdDeviation='10' result='blur' />
            <feColorMatrix in='blur' mode='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7' result='goo' />
            <feBlend in='SourceGraphic' in2='goo' />
          </filter>
        </defs>
      </svg>
    </>
  )

}

export default Loader;
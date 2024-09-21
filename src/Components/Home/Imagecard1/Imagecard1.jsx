
import React from 'react';
import './Imagecard1.css';
import i1 from './i1imag/i1.jpg'
import i2 from './i1imag/i2.jpeg'
import i3 from './i1imag/i3.jpg'


const Imagecard1 = () => {
  return (
    <div className="card-container">
      <div className="card">
      <img src={i1} alt="Card 1" />        
      </div>

      <div className="card">
        <img src={i2} alt="Card 2" />

      </div>

      <div className="card">
        <img src={i3}  alt="Card 3" />
       
      </div>
      
    </div>
  );
};

export default Imagecard1;




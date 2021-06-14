import React, { useState, useContext } from 'react';
import { MainContext }                 from '../../../MainContext';


export default function ScoopOption({ name, imagePath, updateItemCount }){
  const  value                = useContext(MainContext);
  const  scoops               = value.optionCounts.scoops;
  const [isValid, setIsValid] = useState(true); // eslint-disable-line
  const spinnerValue          = scoops[name] || 0;



  const handleChange = (e) => {
    const currentValue      = e.target.value;
    const currentValueFloat = parseFloat(currentValue); // Ensure value is a number and not a string
    const valueIsValid      = (currentValueFloat >= 0) && (currentValueFloat <= 10) && Math.floor(currentValueFloat) === currentValueFloat;
    
    // Constrain the spinner range.
    if      (currentValueFloat < 0){ e.target.value  = '0';  } 
    else if (currentValueFloat > 10){ e.target.value = '10'; } 

    setIsValid(valueIsValid);
    if (valueIsValid){ updateItemCount(name, currentValue); } // Only update context if the value is valid 
  };


  return (
    <div className="mt-5">
      <img 
        className="d-block mx-auto mb-3"
        style={{ width: 100 }}
        src={`http://localhost:3030/${imagePath}`} 
        alt={`${name} scoop`} 
      />

      <div className="text-center">
        <label htmlFor={`${name}-scoop`} className="form-label text-gray" style={{ fontFamily: 'Montserrat' }}>{ name }</label>
        <input 
          id={`${name}-scoop`}
          className={'mx-auto pe-0 form-control text-center'}
          style={{ width: 70 }}
          type="number"
          defaultValue={spinnerValue}
          onChange={handleChange}
          role="spinbutton"
        />
      </div>
    </div>
  );
}
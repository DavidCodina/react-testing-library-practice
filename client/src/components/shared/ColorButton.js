import React, { useState } from 'react';


export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, ' $1');
}


export function ColorButton(props){
  const [ buttonColor, setButtonColor ] = useState('Maroon');
  const [ disabled,    setDisabled ]    = useState(false);
  const newButtonColor                  = buttonColor === 'Maroon' ? 'SkyBlue' : 'Maroon';

  return (
    <div className="text-center">

      <p className="w-90 mx-auto text-secondary text-center">This isn't part of the Sundae App.
      It was more of a warm-up exercise.</p>
      
      <button
        style={{ minWidth: 200, color: '#FFF', backgroundColor: disabled ? 'Gray' : buttonColor }}
        className="btn me-3"
        onClick={() => setButtonColor(newButtonColor)}
        disabled={ disabled }
      >Change to { replaceCamelWithSpaces(newButtonColor) }</button>
  

      <input
        id="disable-button-checkbox"
        className="btn-check"
        
        type="checkbox"
        onChange={(e) => setDisabled(e.target.checked)} 
        defaultChecked={disabled}
        aria-checked={disabled}
      />
      
      <label htmlFor="disable-button-checkbox" className="btn btn-blue" style={{ minWidth: 200 }}>Disable Button</label>
    </div>     
  );
}

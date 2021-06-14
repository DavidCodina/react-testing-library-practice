import React, { useContext } from 'react';
import { MainContext }       from '../../../MainContext';


export default function ToppingOption({ name, imagePath, updateItemCount }){
  const  value        = useContext(MainContext);
  const  toppings     = value.optionCounts.toppings;
  const checkboxValue = toppings[name] || 0;
  const isChecked     = checkboxValue ? true : false; // Could just use checkboxValue direclty, but this is more readable.


  return (
    <div className="mt-5">
      <img 
        className="d-block mx-auto mb-3"
        style={{ width: 100 }}
        src={`http://localhost:3030/${imagePath}`} 
        alt={`${name} topping`} 
      />
      
      <div className="text-center">
        <label 
          htmlFor={`${name}-topping-checkbox`} 
          className="form-label text-gray"
          style={{ fontFamily: 'Montserrat' }}
        >{ name }</label>


        <div>
          <input 
            id={`${name}-topping-checkbox`}      
            className="form-check-input" 
            style={{ transform: 'scale(1.5)' }}
            type="checkbox" 
            value="" 
            checked={isChecked}
            // Nice checkbox trick.
            onChange={(e) => { updateItemCount(name, e.target.checked ? 1 : 0); }}
          />
        </div>
      </div> 
    </div>
  );
}




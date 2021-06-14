import React, { useState } from 'react';
import { useHistory }      from 'react-router-dom';


export function SummaryForm(){
  const history                           = useHistory();
  const [ isChecked,    setIsChecked ]    = useState(false);
  const [ termsVisible, setTermsVisible ] = useState(false);


  const handleSubmit = (e) =>{
    e.preventDefault();
    history.push('/confirmation');
  };

  const handleMouseEnter = () => { setTermsVisible(true);  };
  const handleMouseLeave = () => { setTermsVisible(false); };

  return (
    <div className="mx-auto mb-5" style={{ maxWidth: 600 }}>
      <form className="p-3 bg-light border border-dark rounded-4 shadow-sm" onSubmit={handleSubmit}>
      
        <div className="form-check mb-3">
          <input
            id="terms-and-conditions" 
            className="form-check-input" 
            type="checkbox" 
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />

          <label htmlFor="terms-and-conditions" className="form-check-label">
            I agree to the 
            <button 
              className="m-0 p-0 btn btn-link link-blue" 
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              >Terms & Conditions</button>.
          </label>
        </div>

        <button 
          className="d-block w-100 btn btn-blue align-top" 
          disabled={!isChecked}
        >Confirm Order</button>
      </form>


      { termsVisible && (
        <div 
          id="termsandconditions-popover"
          className="mt-1 text-pink text-center fw-bold"
        >No ice cream will ever be delivered to you!</div>
      )}
    </div>
  );
}


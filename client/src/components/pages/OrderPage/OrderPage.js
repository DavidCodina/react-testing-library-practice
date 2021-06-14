import React   from 'react';
import Options from './Options';


export function OrderPage(props){
  const { value }        = props;
  const { totals }       = value;
  const buttonIsDisabled = totals.scoops === '$0.00';
  const orderSundae      = () => { props.history.push('/summary'); };


  return (
    <React.Fragment>
      <h2 className="my-5 text-white-3d text-center">Order Page</h2>


      <div className="horizontal-ruler">
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
      </div>


      <Options optionType="scoops" />
      <Options optionType="toppings" />


      <h2 
        className="mb-4 text-blue text-center" 
        style={{ fontFamily: 'Montserrat', textShadow: '0px 1px 2px rgba(0,0,0,0.5)' }}
      >Grand total: { totals.grandTotal }</h2>


      <button 
        className={ !buttonIsDisabled ? "d-block mx-auto btn btn-outline-pink" : "d-block mx-auto btn btn-outline-gray" }
        disabled={ buttonIsDisabled } 
        onClick={ orderSundae }
      >Order Sundae!</button>
    </React.Fragment>     
  );
}

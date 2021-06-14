import React, { useEffect, useState } from 'react';
import axios                          from 'axios';


export function ConfirmationPage(props){
  const { value }                       = props;
  const { resetOrder }                  = value;          
  const [ orderNumber, setOrderNumber ] = useState(null);  
  const [ loading, setLoading ]         = useState(false);
  const [ error, setError ]             = useState(null); 


  useEffect(() => {
    setError(null);
    setLoading(true);
    setOrderNumber(null);

    axios.post(`http://localhost:3030/order`)
    .then(res => {
      setLoading(false);
      setOrderNumber(res.data.orderNumber);
    })
    .catch(err => {
      setLoading(false);
      setError(err);
    });
  }, []);


  const createNewOrder = () => {
    resetOrder(); 
    props.history.push('/');
  };


  const renderRequestResults = () => {
    if (error){
      return (
        <div className="alert alert-red p-3 border border-red rounded-4 shadow-sm" role="alert">
          <h4 className="alert-header">Error!</h4>
          <p className="mb-0">Something went wrong!</p>
        </div>
      );
    }

    if (loading){
      return <h3 className="mb-3 text-gray text-center">Loading...</h3>;
    }

    if (orderNumber){
      return (
        <div className="text-center">
          <h2 
            className="mb-5 text-blue text-center" 
            style={{ fontFamily: 'Montserrat', textShadow: '0px 1px 2px rgba(0,0,0,0.5)' }}
          >Thank You!</h2>

          <p className="mb-5 text-gray">Your order number is { orderNumber }</p>

          <button className="btn btn-outline-pink" onClick={createNewOrder}>Create New Order</button>
        </div>
      );
    }

    return null;
  };


  return (
    <React.Fragment>
      <h2 className="my-5 text-white-3d text-center">Confirmation Page</h2>


      <div className="horizontal-ruler">
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
      </div>


      { renderRequestResults() }
    </React.Fragment>     
  );
}




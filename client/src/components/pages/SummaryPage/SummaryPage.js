import React           from 'react';
import { SummaryForm } from './SummaryForm';


export function SummaryPage(props){
  const { value }                = props;
  const { optionCounts, totals } = value;
  const scoopsArray              = Object.keys(optionCounts.scoops).map((key)   => [key, optionCounts.scoops[key]]);
  const toppingsArray            = Object.keys(optionCounts.toppings).map((key) => [key, optionCounts.toppings[key]]);


  const renderScoopsList = () => {
    if (!scoopsArray || scoopsArray.length === 0){ return null; }

    return (
      <React.Fragment>
        <h2 
          className="mb-4 text-blue text-center" 
          style={{ fontFamily: 'Montserrat', textShadow: '0px 1px 2px rgba(0,0,0,0.5)' }}
        >Scoops: { totals.scoops }</h2>


        <div className="d-flex justify-content-center mb-5">
          <ul className="d-inline-block mb-0">
            {
              scoopsArray.map(([key, value]) => {
                return (
                  <li key={key} className="text-pink fw-bold">
                    {value} {key}
                  </li>
                );
              })
            }
          </ul>
        </div>
      </React.Fragment>
    );
  };


  const renderToppingsList = () => {
    if (!toppingsArray || toppingsArray.length === 0){ return null; }

    return (
      <React.Fragment>
        <h2 
          className="mb-4 text-blue text-center" 
          style={{ fontFamily: 'Montserrat', textShadow: '0px 1px 2px rgba(0,0,0,0.5)' }}
        >Toppings: { totals.toppings }</h2>


        <div className="d-flex justify-content-center mb-5">
          <ul className="d-inline-block mb-0">
            {
              toppingsArray.map(([key, value]) => {
                return (
                  <li key={key} className="text-pink fw-bold">
                    {value} {key}
                  </li>
                );
              })
            }
          </ul>
        </div>
      </React.Fragment>
    );
  };


  return (
    <React.Fragment>
      <h2 className="my-5 text-white-3d text-center">Summary Page</h2>


      <div className="horizontal-ruler">
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
      </div>

      { renderScoopsList()   }
      { renderToppingsList() }

      <h2 
        className="mb-5 text-blue text-center" 
        style={{ fontFamily: 'Montserrat', textShadow: '0px 1px 2px rgba(0,0,0,0.5)' }}
      >Grand total: { totals.grandTotal }</h2>

      <SummaryForm />
    </React.Fragment>     
  );
}
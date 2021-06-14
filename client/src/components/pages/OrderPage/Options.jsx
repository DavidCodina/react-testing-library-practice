import React, { useEffect, useState, useContext } from 'react';
import { MainContext }                            from '../../../MainContext';
import axios                                      from 'axios';
import ScoopOption                                from './ScoopOption';
import ToppingOption                              from './ToppingOption';
import { pricePerItem }                           from '../../../constants';
import { formatCurrency }                         from '../../../helpers/format-currency';


export default function Options({ optionType }){ // optionType: 'scoops' | 'toppings'
  const { totals, updateItemCount } = useContext(MainContext);
  const ItemComponent               = optionType === 'scoops' ? ScoopOption : ToppingOption;
  const title                       = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();
  const [ items, setItems ]         = useState([]);
  const [ error, setError ]         = useState(null); 
  const [ loading, setLoading ]     = useState(false);

  useEffect(() => {
    setError(false);
    setLoading(true);

    axios.get(`http://localhost:3030/${optionType}`)
    .then(res => {
      setLoading(false);
      setItems(res.data);
    })
    .catch(err => {
      setLoading(false);
      setError(err);
    });
  }, [optionType]);


  const renderItems = () => {
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


    if (Array.isArray(items) && items.length > 0){
      return (
        <div className="w-90 mx-auto mb-5 p-3 bg-light border border-dark rounded-4" style={{ maxWidth: 800 }}>
          <h2 className="text-blue text-center" style={{ fontFamily: 'Montserrat', textShadow: '0px 1px 2px rgba(0,0,0,0.5)' }}>{ title }</h2>


          <div className="d-flex justify-content-center text-gray" style={{ fontFamily: 'Montserrat' }}>
            <div className="me-3">{ formatCurrency(pricePerItem[optionType]) } each</div>
            <div className="ms-3">{ title } total: { totals[optionType] }</div>
          </div>
          

          {
            <div className="d-flex justify-content-between flex-wrap">
              {
                items.map(item => {
                  return (
                    <ItemComponent
                      key={item.name}
                      name={item.name}
                      imagePath={item.imagePath}
                      updateItemCount={
                        (itemName, newItemCount) => { 
                          return updateItemCount(itemName, newItemCount, optionType); 
                        }
                      }
                    />
                  );
                })
              }
            </div>
          }
        </div>
      ); 
    }

    return null;
  };


  return (
    <div>
      { renderItems() }
    </div>
  );
}
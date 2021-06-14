import React, { 
  useState, 
  createContext, 
  useEffect 
} from 'react';
import { pricePerItem }   from "./constants"; // => const pricePerItem = { scoops: 2, toppings: 1.5 };
import { formatCurrency } from "./helpers/format-currency";


function calculateSubtotal(optionType, optionCounts){
  const optionObject = optionCounts[optionType];
  let optionCount    = 0;
  for (const property in optionObject){
    if (optionObject.hasOwnProperty(property)){
      const n = optionObject[property];
      optionCount += n;
    }
  }
  return optionCount * pricePerItem[optionType];
}


/* =========================================================================
                               Context.js
========================================================================= */

 
export const MainContext  = createContext({});
export const MainConsumer = MainContext.Consumer;


export const MainProvider = (props) => {
  const [ optionCounts, setOptionCounts ] = useState({ scoops: {}, toppings: {} }); 


  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    scoops:     zeroCurrency,
    toppings:   zeroCurrency,
    grandTotal: zeroCurrency
  });

  
  useEffect(() => {
    const scoopsSubtotal   = calculateSubtotal("scoops",   optionCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
    const grandTotal       = scoopsSubtotal + toppingsSubtotal;

    setTotals({
      scoops:     formatCurrency(scoopsSubtotal),
      toppings:   formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal)
    });
  }, [optionCounts]);


  function updateItemCount(itemName, newItemCount, optionType){
    const newOptionCounts  = { ...optionCounts };
    const optionObject     = newOptionCounts[optionType];
    optionObject[itemName] = parseInt(newItemCount);

    if (optionObject[itemName] === 0){ delete optionObject[itemName]; }

    setOptionCounts(newOptionCounts);
  }


  function resetOrder(){
    setOptionCounts({ scoops: {}, toppings: {} });
  }


  return (
    <MainContext.Provider 
      value={{ 
        optionCounts, // No need to expose setOptionCounts -using resetOrder & updateItemCount instead.
        updateItemCount,
        resetOrder,
        totals       // No need to expose setTotals - It's used internally whenever optionCounts changes.
      }}

      {...props} // i.e. props.children
    />
  );
};










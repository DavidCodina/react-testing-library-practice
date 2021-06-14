import React                from 'react';
import { Route, Switch }    from 'react-router-dom';
import { OrderPage  }       from '../pages/OrderPage';
import { SummaryPage }      from '../pages/SummaryPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';
import { NotFoundPage }     from '../pages/NotFoundPage';


const Router = (props) => {
  const { value } = props;


  return (
    <Switch>  
      <Route 
        exact path="/"
        render={(props) => {
          return <OrderPage {...props} value={value}  />;
        }}
      />
      
      <Route 
        exact path="/summary"
        render={(props) => {
          return <SummaryPage {...props} value={value}  />;
        }}
      />

      <Route 
        exact path="/confirmation"
        render={(props) => {
          return <ConfirmationPage {...props} value={value}  />;
        }}
      />

      <Route component={NotFoundPage} />
    </Switch>
  )
};


export default Router;


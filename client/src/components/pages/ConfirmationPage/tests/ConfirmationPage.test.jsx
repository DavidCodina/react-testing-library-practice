import { render, screen }   from '../../../../test-utils';
import { server }           from '../../../../mocks/server';
import { rest }             from 'msw';
import { ConfirmationPage } from '../ConfirmationPage';
import { MainConsumer }     from '../../../../MainContext.js';
import { Route }            from 'react-router-dom';



test('error response from server for submitting order', async () => {
  // Override default msw response for options endpoint with error response

  server.resetHandlers(
    rest.post( 'http://localhost:3030/order', (req, res, ctx) => res(ctx.status(500)) )
  );

  render(
    <MainConsumer>
    {(value) => {
      return (
        <Route 
          exact path="/" //! Gotcha: This should always be '/'
          render={(props) => {
            return <ConfirmationPage {...props} value={value}  />;
          }}
        />
      );
    }}
    </MainConsumer>
  );


  const alert = await screen.findByRole('alert');
  expect(alert).toHaveTextContent('Something went wrong!');
});

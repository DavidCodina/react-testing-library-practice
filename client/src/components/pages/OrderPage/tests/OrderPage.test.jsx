import { render, screen, waitFor, waitForElementToBeRemoved  } from '../../../../test-utils';
import { MainConsumer }            from '../../../../MainContext'; 
import { Route }                   from 'react-router-dom';
import userEvent                   from '@testing-library/user-event'; // eslint-disable-line
import { OrderPage }               from '../OrderPage';
import { rest }                    from 'msw';
import { server }                  from '../../../../mocks/server';


/* =====================================================================

===================================================================== */


test('handles error for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops',   (req, res, ctx) => res(ctx.status(500)) ),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) => res(ctx.status(500)) )
  );

  render(
    <MainConsumer>
    {(value) => {
      return (
        <Route exact path="/" render={(props) => <OrderPage {...props} value={value}  /> } />
      );
    }}
    </MainConsumer>
  );
  

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});


/* =====================================================================

===================================================================== */


test('disable order button if there are no scoops ordered', async () => {
  render(
    <MainConsumer>
    {(value) => {
      return (
        <Route exact path="/" render={(props) => <OrderPage {...props} value={value}  /> } />
      );
    }}
    </MainConsumer>
  );


  //! Not doing this can potentially blow up your tests!
  // https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
  await waitForElementToBeRemoved(() => screen.getAllByText(/Loading/i))


  // order button should be disabled at first, even before options load
  const orderButton = screen.getByRole('button', { name: /order sundae/i });
  expect(orderButton).toBeDisabled();


  // expect button to be enabled after adding scoop
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(orderButton).toBeEnabled();


  // expect button to be disabled again after removing scoop
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '0');
  expect(orderButton).toBeDisabled();
});




import { render, screen } from '@testing-library/react';
import { MainProvider }   from '../MainContext'; 
import App                from '../App';
import userEvent          from '@testing-library/user-event';


/* =====================================================================

===================================================================== */


test('Order phases for happy path', async () => {
  /* ==========================
           Order Page
  ========================== */


  render(<App />, { wrapper: MainProvider });


  //! Wait for items to appear so Testing Library doesn't complain about stuff happening after test is over.
  await screen.findByRole('spinbutton', { name: 'Vanilla'  });
  await screen.findByRole('checkbox',   { name: 'Cherries' });

  
  //Add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');


  const chocolateInput = screen.getByRole('spinbutton', { name: 'Chocolate' });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');


  const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
  userEvent.click(cherriesCheckbox);


  // Find and click order summary button
  const orderSummaryButton = screen.getByRole('button', { name: /order sundae/i });
  userEvent.click(orderSummaryButton);


  /* ==========================
          Summary Page
  ========================== */


  // Check summary subtotals: 
  const summaryHeading = screen.getByRole('heading', { name: 'Summary Page' });
  expect(summaryHeading).toBeInTheDocument();


  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' });
  expect(scoopsHeading).toBeInTheDocument();


  const toppingsHeading = screen.getByRole('heading', { name: 'Toppings: $1.50' });
  expect(toppingsHeading).toBeInTheDocument();


  // Check summary option items
  expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
  expect(screen.getByText('2 Chocolate')).toBeInTheDocument();
  expect(screen.getByText('1 Cherries')).toBeInTheDocument();


  // Accept terms and click button
  const termsAndConditionsCheckBox = screen.getByRole('checkbox', { name: /terms & conditions/i });
  userEvent.click(termsAndConditionsCheckBox);


  const confirmOrderButton = screen.getByRole('button', { name: /confirm order/i });
  userEvent.click(confirmOrderButton);


  /* ==========================
        Confirmation Page
  ========================== */


  //! Wait for items to appear so Testing Library doesn't complain about stuff happening after test is over.
  //! Warning: An update to ConfirmationPage inside a test was not wrapped in act(...).
  //! Warning: Can't perform a React state update on an unmounted component.
  const createNewOrderButton = await screen.findByRole('button', { name: 'Create New Order'  });


  // Check confirmation page text
  const thankYouHeader = screen.getByRole('heading', { name: /thank you/i });
  expect(thankYouHeader).toBeInTheDocument();


  // Expect the order number to be shown.
  const orderNumber = screen.getByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();


  // Find and click "new order" button on confirmation page
  userEvent.click(createNewOrderButton);


  /* ==========================
           Order Page
  ========================== */


  //! Wait for items to appear so Testing Library doesn't complain about stuff happening after test is over.
  await screen.findByRole('spinbutton', { name: 'Vanilla'  });
  await screen.findByRole('checkbox',   { name: 'Cherries' });


  // Check that scoops and toppings have been reset
  const scoopsTotal = screen.getByText('Scoops total: $0.00');
  expect(scoopsTotal).toBeInTheDocument();


  const toppingsTotal = screen.getByText('Toppings total: $0.00');
  expect(toppingsTotal).toBeInTheDocument();
});


/* =====================================================================

===================================================================== */


test('Toppings header is not on summary page if no toppings ordered', async () => {
  /* ==========================
           Order Page
  ========================== */


  render(<App />, { wrapper: MainProvider });

  // Add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });


  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');


  const chocolateInput = screen.getByRole('spinbutton', { name: 'Chocolate' });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');


  // Find and click order summary button
  const orderSummaryButton = screen.getByRole('button', { name: /order sundae/i });
  userEvent.click(orderSummaryButton);


  /* ==========================
          Summary Page
  ========================== */


  const scoopsHeading = await screen.findByRole('heading', { name: 'Scoops: $6.00' });
  expect(scoopsHeading).toBeInTheDocument();

  
  const toppingsHeading = screen.queryByRole('heading', { name: /toppings/i });
  expect(toppingsHeading).not.toBeInTheDocument();
});

import { render, screen, waitForElementToBeRemoved } from '../../../../test-utils';
import userEvent                                     from '@testing-library/user-event';
import { MainProvider, MainConsumer }                from '../../../../MainContext'; // eslint-disable-line
import Options                                       from '../Options';
import { OrderPage }                                 from '../OrderPage';


/* =====================================================================

===================================================================== */


test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />);


  //! Not doing this can also potentially blow up your tests!
  // https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));


  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText('Scoops total:', { exact: false }); // exact: false for partial match of string.
  expect(scoopsSubtotal).toHaveTextContent('0.00');                           // This is not an option for *byRole


  // update vanilla scoops to 1 and check the subtotal
  //! Gotcha: the name relates to the label text, and therefore must be connected
  //! to the input with role="spinbutton" by using id and htmlFor.
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');


  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});


/* =====================================================================

===================================================================== */


test('update toppings subtotal when toppings change', async () => {
  render(<Options optionType="toppings" />);


  //! Not doing this can also potentially blow up your tests!
  // https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/i))


  // Make sure total starts out at $0.00
  const toppingsTotal = screen.getByText('Toppings total:', { exact: false });
  expect(toppingsTotal).toHaveTextContent('0.00');


  // Add cherries and check subtotal
  const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
  userEvent.click(cherriesCheckbox);
  expect(toppingsTotal).toHaveTextContent('1.50');


  // Add hot fudge and check subtotal
  const hotFudgeCheckbox = screen.getByRole('checkbox', { name: 'Hot fudge' });
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent('3.00');


  // Remove hot fudge and check subtotal
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent('1.50');
});


/* =====================================================================

===================================================================== */


describe('grand total', () => {
  test('grand total updates properly if scoop is added first', async () => {
    render(<MainConsumer>{ (value) => <OrderPage value={value} /> }</MainConsumer>);


    //! Not doing this can also potentially blow up your tests!
    // https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
    await waitForElementToBeRemoved(() => screen.getAllByText(/Loading/i))


    const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent('0.00');


    // update vanilla scoops to 2 and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('4.00');


    // add cherries and check grand total
    const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('5.50');
  });


  /* ====================

  ==================== */


  test('grand total updates properly if topping is added first', async () => {
    render(<MainConsumer>{ (value) => <OrderPage value={value} /> }</MainConsumer>);


    //! Not doing this can potentially blow up your tests!
    // https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
    await waitForElementToBeRemoved(() => screen.getAllByText(/Loading/i))


    // Add cherries and check grand total
    const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
    const grandTotal       = screen.getByRole('heading', { name: /Grand total: \$/ });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('1.50');


    // Update vanilla scoops to 2 and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('5.50');
  });


  /* ====================

  ==================== */


  test('grand total updates properly if item is removed', async () => {
    render(<MainConsumer>{ (value) => <OrderPage value={value} /> }</MainConsumer>);

    // Add cherries
    const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
    userEvent.click(cherriesCheckbox); // grand total $1.50


    // Update vanilla scoops to 2; grand total should be $5.50
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');


    // Remove 1 scoop of vanilla and check grand total
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');


    // Check grand total
    const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent('3.50');


    // Remove cherries and check grand total
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('2.00');
  });
});

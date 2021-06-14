import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { SummaryForm }                               from '../SummaryForm';
import userEvent                                     from '@testing-library/user-event';


/* =====================================================================

===================================================================== */


test('Initial conditions', () => {
  render(<SummaryForm />);
  const checkbox      = screen.getByRole('checkbox', { name: /terms & conditions/i }); // name relates to the id.
  const confirmButton = screen.getByRole('button',   { name: /confirm order/i });

  expect(checkbox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
});


/* =====================================================================

===================================================================== */


test('Checkbox enables button on first click and disables on second click', () => {
  render(<SummaryForm />);
  const checkbox      = screen.getByRole('checkbox', { name: /terms & conditions/i });
  const confirmButton = screen.getByRole('button',   { name: /confirm order/i });


  userEvent.click(checkbox); 
  expect(confirmButton).toBeEnabled();


  userEvent.click(checkbox); 
  expect(confirmButton).toBeDisabled();
});


/* =====================================================================

===================================================================== */


test('popover responds to hover', () => {
  render(<SummaryForm />);

  // popover starts out hidden
  const nullPopover = screen.queryByText(/No ice cream will ever be delivered to you!/i);
  expect(nullPopover).not.toBeInTheDocument();


  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms & conditions/i);
  userEvent.hover(termsAndConditions);


  const popover = screen.getByText(/No ice cream will ever be delivered to you!/i);
  expect(popover).toBeInTheDocument();


  // popover disappears onMouseLeave
  userEvent.unhover(termsAndConditions);

  
  waitForElementToBeRemoved(() => screen.queryByText(/No ice cream will ever be delivered to you!/i))
  .then(result => result)
  .catch(err   => err);
});
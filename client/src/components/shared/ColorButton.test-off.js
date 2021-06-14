import { render, screen, fireEvent }           from '@testing-library/react';
import { ColorButton, replaceCamelWithSpaces } from './ColorButton';


/* =====================================================================

===================================================================== */


test('button has correct initial color', () => {
  render(<ColorButton />);
  //////////////////////////////////////////////////////////////////////////
  //
  //  Find an element with a role of button and text of 'Change to Sky Blue'
  //  Not sure what the role is? Try using a nonexistant role like 'btn'.
  //  Testing Library will complain:  
  //
  //  Unable to find an accessible element with the role "btn" and name "Change to Sky Blue"
  //  Here are the accessible roles: ...
  //
  //////////////////////////////////////////////////////////////////////////
  const colorButton = screen.getByRole('button', { name: 'Change to Sky Blue' });

  // Expect the background color to be Maroon
  expect(colorButton).toHaveStyle({ backgroundColor: 'Maroon' });


  // Click button
  fireEvent.click(colorButton);
    
  // Expect the background color to be SkyBlue
  expect(colorButton).toHaveStyle({ backgroundColor: 'Sky Blue' });

  // Expect the button text to be 'Change to Maroon'
  expect(colorButton).toHaveTextContent('Change to Maroon');

  //! Check that ESLint Plugins are working.
  //! expect(colorButton.textContent).toBe('Change to Maroon');
  //! => Use toHaveTextContent instead of asserting on DOM attributes eslint(jest-dom/prefer-to-have-text-content).
  //! Another example would be
  //! expect(colorButton).not.toBeEnabled();
  //! => Use toBeDisabled() instead of not.toBeEnabled() eslint(jest-dom/prefer-enabled-disabled)
});




/* =====================================================================

===================================================================== */


test('initial conditions', () => {
  render(<ColorButton />);

  // check that the button starts out enabled
  const colorButton = screen.getByRole('button', {
    name: 'Change to Sky Blue',
  });

  expect(colorButton).toBeEnabled();
  

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});


/* =====================================================================

===================================================================== */


test('Checkbox disables button on first click and enables on second click', () => {
  render(<ColorButton />);
  const checkbox    = screen.getByRole('checkbox', { name: 'Disable Button' });
  const colorButton = screen.getByRole('button',   { name: 'Change to Sky Blue' });

  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});


/* =====================================================================

===================================================================== */


test('Disabled button has Gray background and reverts to Maroon', () => {
  render(<ColorButton />);
  const checkbox    = screen.getByRole('checkbox', { name: 'Disable Button' });
  const colorButton = screen.getByRole('button',   { name: 'Change to Sky Blue' });

  // disable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: Gray');

  // re-enable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: Maroon');
});


/* =====================================================================

===================================================================== */


test('Clicked disabled button has Gray background and reverts to SkyBlue', () => {
  render(<ColorButton  />);
  const checkbox    = screen.getByRole('checkbox', { name: 'Disable Button'    });
  const colorButton = screen.getByRole('button',   { name: 'Change to Sky Blue' });

  // change button to blue
  fireEvent.click(colorButton);

  // disable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: Gray');

  // re-enable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: SkyBlue');
});


/* =====================================================================

===================================================================== */
// Here we are testing the replaceCamelWithSpaces() helper.
// This is unit testing a function.


describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });

  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });

  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
});





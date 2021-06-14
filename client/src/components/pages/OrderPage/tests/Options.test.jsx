import { render, screen } from '../../../../test-utils.jsx';
import userEvent          from '@testing-library/user-event'; // eslint-disable-line
import Options            from '../Options';
import { MainProvider }   from '../../../../MainContext';


/* =====================================================================

===================================================================== */


test('displays image for each scoop option from server', async () => {
  render(<Options optionType="scoops" />);
  

  // find images: The name option for images is the alt attribute's text.
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);


  // confirm alt text of images
  const altText = scoopImages.map(element => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});


/* =====================================================================

===================================================================== */


test('Displays image for each toppings option from server', async () => {
  // Mock Service Worker will return three toppings from server.
  render(<Options optionType="toppings" />, { wrapper: MainProvider });


  // Find images, expect 3 based on what msw returns.
  const images = await screen.findAllByRole('img', { name: /topping$/i });
  expect(images).toHaveLength(3);


  // Check the actual alt text for the images.
  const imageTitles = images.map((img) => img.alt);
  expect(imageTitles).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ]);
});


/* =====================================================================

===================================================================== */


test("don't update total if scoops input is invalid", async () => {
  render(<Options optionType="scoops" />, { wrapper: MainProvider });


  // expect button to be enabled after adding scoop
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '-1');

  
  // make sure scoops subtotal hasn't updated
  const scoopsSubtotal = screen.getByText('Scoops total: $0.00');
  expect(scoopsSubtotal).toBeInTheDocument();
});

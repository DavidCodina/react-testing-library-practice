import React            from 'react';
import { render }       from '@testing-library/react';
import { MainProvider } from './MainContext';
import { HashRouter }   from 'react-router-dom';


const renderWithProviders = ({ children }) => {
  return (
    <MainProvider>
      <HashRouter>
        { children }
      </HashRouter>
    </MainProvider>
  )
};


const customRender = (ui, options) => {
  return render(ui, { wrapper: renderWithProviders, ...options })
}


export * from '@testing-library/react'; // re-export everything
export { customRender as render };      // override render method

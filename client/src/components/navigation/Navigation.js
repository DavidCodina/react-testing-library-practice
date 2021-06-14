import React             from 'react';
import { NavLink, Link } from 'react-router-dom';
import OffCanvas         from './OffCanvas';


const Navigation = (props) => {
  const headerContent = () => {
    return (
      <Link 
        className="navbar-brand p-0 fs-1 lh-1 link-light" 
        style={{ fontFamily: 'Montserrat' }}
        to="/"
      >Sundaes !!!</Link>
    );   
  } 
  
  
  const BodyContent = () => {
    return (
      <nav id="primary-navigation">
        <div className="container-fluid">
          <NavLink className="nav-link" activeClassName="active-link" exact to="/"       onClick={OffCanvas.hideOffCanvas}>Order Page</NavLink>
          {/* 
          <NavLink className="nav-link" activeClassName="active-link" to="/summary"      onClick={OffCanvas.hideOffCanvas}>Summary Page</NavLink>
          <NavLink className="nav-link" activeClassName="active-link" to="/confirmation" onClick={OffCanvas.hideOffCanvas}>Confirmation Page</NavLink>
          */}
        </div>
      </nav>
    );
  };


  return (
    <OffCanvas 
      title="not used" 
      headerContent={headerContent} 
      bodyContent={BodyContent} 
      backdrop={true} 
      position='start'
      scrollable={false}
      closeButton={true}
      closeButtonTheme='white'
      classes='bg-deep-space'
      style={{ borderRight: '2px solid #000' }}
    />      
  );
};


export default Navigation;

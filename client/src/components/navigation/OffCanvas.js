import React, { useState, useEffect, useRef } from 'react';


function OffCanvas({
  title            = null, 
  headerContent    = null,
  bodyContent      = <div className="p-5 bg-light text-center border rounded-3">Body Content Goes Here...</div>,
  position         = 'start', 
  backdrop         = false,
  closeButton      = true,
  closeButtonTheme = 'default',
  scrollable       = false,
  classes          = '',
  style            = {} }){

  const html                                      = document.getElementsByTagName('html')[0];
  const body                                      = document.getElementsByTagName('body')[0]; 
  const transitionDuration                        = 300; // Mataches Bootstrap CSS transition duration.
  const offCanvasRef                              = useRef();
  const togglerRef                                = useRef();
  const backdropRef                               = useRef();
  const [ offCanvasVisible, setOffCanvasVisible ] = useState(false);
  const [ backdropVisible, setBackdropVisible ]   = useState(false);
  

  
  useEffect(() => {
    const handleBodyClick = (e) => { 
      // Don't do anything when in the menu or when the menu is already not visible.
      if (!e.target.contains(offCanvasRef.current) || !offCanvasVisible){ return; } 
      // Because of the above line, clicking on the toggler will cause handleBodyClick 
      // to return early. We don't have to worry about toggling it open, then indadvertantly
      // triggering the close functionality. However, just to be sure, we can do this:
      if (e.target === togglerRef.current || e.target.parentElement === togglerRef.current){ return; }
      hideOffCanvas(); 
    };
  
    body.addEventListener('click', handleBodyClick);
    return () => { body.removeEventListener('click', handleBodyClick); };
  }, [offCanvasVisible, body]); // eslint-disable-line react-hooks/exhaustive-deps
  // Including offCanvasVisible is necessary because would otherwise use stale data.
  // It also want hideOffCanvas. For now it's better to leave it out. It would require
  // using useCallback.


  const showOffCanvas = () => {
    if (!offCanvasRef.current){ return; }
    const offCanvas = offCanvasRef.current;

    if (!offCanvas.classList.contains('show')){      
      if (backdrop){
        const otherModalBackdrop = document.querySelector('.modal-backdrop.show');
        // Presumably, if there is another .modal-backdrop.show, then you wouldn't be
        // able to open the menu anyways. However, just in case...
        if (!otherModalBackdrop){
          setBackdropVisible(true);
          setTimeout(() => { backdropRef.current && backdropRef.current.classList.add('show') }, 100);
        }
      }

      if (!scrollable){ 
        html.style.overflow = 'hidden';
        body.style.overflow = 'hidden';
      }

      offCanvas.style.visibility = 'visible';
      offCanvas.classList.add('show');
      setOffCanvasVisible(true);
    }
  };
  

  //* Trick for exposing internal functions!!!
  OffCanvas.hideOffCanvas = () => {
    if (!offCanvasRef.current){ return; }
    const offCanvas = offCanvasRef.current;

    if (offCanvas.classList.contains('show')){
      offCanvas.classList.remove('show');
      setOffCanvasVisible(false);

      if (backdrop){
        backdropRef.current && backdropRef.current.classList.remove('show');
      }

      setTimeout(() => {
        offCanvas.style.visibility = 'hidden';
        if (!scrollable){ 
          html.style.overflow = '';
          body.style.overflow = ''; 
        }
      }, transitionDuration); 


      setTimeout(() => {
        if (backdrop){ setBackdropVisible(false); }
      }, 250); // Based on App.css :  .modal-backdrop.fade { transition: opacity 0.25s linear; }
    }
  };
  const { hideOffCanvas } = OffCanvas;


  const toggleOffCanvas = () => {
    if (!offCanvasRef.current){ return; }
    const offCanvas = offCanvasRef.current;
    if  (!offCanvas.classList.contains('show')){ 
      showOffCanvas(); 
    } else if (offCanvas.classList.contains('show')){  
      hideOffCanvas(); 
    }
  }


  return (
    <React.Fragment>
      <div 
        ref={offCanvasRef} 
        className={ classes ? `offcanvas offcanvas-${position} ${classes}` : `offcanvas offcanvas-${position}`} 
        style={style}
        tabIndex="-1"
      >

        { headerContent && (
          <div className="offcanvas-header">
            { (typeof headerContent !== 'function') ? headerContent : headerContent() }
            { 
              closeButton && (
                <button 
                  className={(closeButtonTheme === 'white') ? "btn-close btn-close-white text-reset" : "btn-close text-reset"} 
                  type="button" 
                  onClick={hideOffCanvas}
                ></button>
              )  
            } 
          </div>
        )}


        { !headerContent && title && (
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">{ title }</h5>
            { closeButton && <button className="btn-close text-reset" type="button" onClick={hideOffCanvas}></button> }
          </div>
        )}


        <div className="offcanvas-body">
          { (typeof bodyContent !== 'function') ? bodyContent : bodyContent() }
        </div>
      </div>

      <button 
        ref={togglerRef}
        id="custom-toggler" 
        className="navbar-toggler" 
        type="button" 
        onClick={toggleOffCanvas}
        style={ position === 'end' ? { left: 25, right: 0 } : {} }
      >
        <span className="navbar-toggler-icon"></span>
      </button>


      { backdropVisible && <div ref={backdropRef} className="modal-backdrop fade" onClick={hideOffCanvas}></div> }
    </React.Fragment>     
  );
}


export default OffCanvas;
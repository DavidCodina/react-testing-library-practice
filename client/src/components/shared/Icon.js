import React from 'react'; 
// This component works in conjunction with bootstrap-icons.css,
// and bootstrap-icons.woff2 / woff


export function Icon({ 
  name    = 'question-circle', 
  size    = 'inherit', 
  color   = 'currentColor', 
  classes = '',
  style   = {} 
}){

  return (
    <i 
      className={ classes ? `bi bi-${name} ${classes}` : `bi bi-${name}`} 
      style={{ fontSize: size, color: color, ...style }}
    ></i>   
  );
}
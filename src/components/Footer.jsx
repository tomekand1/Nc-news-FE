import React from 'react';

function Footer({ children }) {
  return (
    <div>
      <div className='footer' />
      <div className='footerChildren'>{children}</div>
    </div>
  );
}

export default Footer;

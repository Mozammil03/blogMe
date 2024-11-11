import React from 'react'

const Logo = ({width = "100%"}) => {
  return (
    <div style={{ width }} alt="logo">
      Blog<span className='text-orange-500'>Me</span>
    </div>
  );
}

export default Logo

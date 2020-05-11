import React from 'react';

const Branch = ({
  name = '',
  children = null,
  clickHandle = () => {},
}) => (
  <div className="branch">
    <div onClick={clickHandle}>{name}</div>
    {children}
  </div>
);

export default Branch;

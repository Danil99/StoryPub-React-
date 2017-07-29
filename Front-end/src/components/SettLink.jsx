import React from 'react';

import { NavLink } from 'react-router-dom';

function SettLink({children, ...rest}) {
  return (
    <NavLink activeClassName="active" {...rest}>{children}</NavLink>
  )
}

export default SettLink;

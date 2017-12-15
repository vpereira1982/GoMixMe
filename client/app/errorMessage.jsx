import React from 'react';
import { Route, Link } from 'react-router-dom';

const errorMessage = () => (
  <div>
    This is not the page you were looking for ... <Link to="/">Go back to GoMixMe</Link>
  </div>
)
export default errorMessage;
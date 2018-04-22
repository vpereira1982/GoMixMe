import React from 'react';
import { Link } from 'react-router-dom';

const ErrorMessage = () => (
  <div>
    This is not the page you were looking for ... <Link to="/">Go back to GoMixMe</Link>
    This is the URL path: {location.pathname}
  </div>
)
export default ErrorMessage;
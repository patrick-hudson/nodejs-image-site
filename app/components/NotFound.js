import React from 'react';
import {Helmet} from "react-helmet";

const NotFound = (props) => {
  return (
    <div className="container text-center">
    <Helmet>
      <title>404 Not Found / fileshr.io / File sharing for the masses</title>
    </Helmet>
      <h1>404</h1>
      <p>Page Not Found</p>
    </div>
  );
};

export default NotFound;

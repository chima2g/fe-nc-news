import React from 'react';
import { Link } from '@reach/router';

const NoMatch = () => {
    return <div>
            <p>This page doesn't exist or some other horrible error has occured.</p>
            <p>Not to worry, you can always head back to the warm embrace of our <Link to={`/`}>homepage</Link></p>
          </div>
  }

export default NoMatch;
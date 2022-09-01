import React, { useEffect } from 'react';
import nprogress from 'nprogress';

function Nprogress() {
  useEffect(() => {
    nprogress.start();
    return () => {
      nprogress.done();
    };
  });
  return <div />;
}

export default Nprogress;

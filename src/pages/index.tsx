import React from 'react';
import { Outlet } from 'react-router-dom';

function Pages() {
  return (
    <div className="dark">
      <Outlet />
    </div>
  );
}

export default Pages;

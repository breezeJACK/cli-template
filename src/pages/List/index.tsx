import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Loading } from '@/components';

function List() {
  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  );
}

export default List;

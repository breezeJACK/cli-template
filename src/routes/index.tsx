import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Welcome from '../pages/Welcome';
import DefaultLayout from '../layout';
import NotFound from '../pages/NotFound';
import ListLayout from '../pages/List';
import Login from '../pages/Login';

import Antd from '../pages/List/Antd';
import AntdDetail from '../pages/List/Antd/detail';

import Demo1 from '../pages/Demo/test1';
import Demo2 from '../pages/Demo/test2';

const PageRoutes = function () {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Welcome />} />
        <Route path="/demo/test1" element={<Demo1 />} />
        <Route path="/demo/test2" element={<Demo2 />} />
        <Route path="/list" element={<ListLayout />}>
          <Route path="antd" element={<Antd />} />
          <Route path="antd/:id" element={<AntdDetail />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default PageRoutes;

import { useState, Suspense } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
// import * as Sentry from '@sentry/browser';
import PageRoutes from './routes';
import { store } from './store';
import env from './utils/env';

function App() {
  if (env.PROD && env.MODE !== 'staging') {
    // Sentry.init({
    //   // dsn: 'https://xx@sentry.ervice.com/xx'
    // });
  }
  return (
    <HashRouter>
      <Provider store={store}>
        <Suspense fallback={<div>loading</div>}>{PageRoutes()}</Suspense>
      </Provider>
    </HashRouter>
  );
}

export default App;

import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './Store/store.ts'
import PageLoader from './Components/PageLoader/index.tsx'
import { BrowserRouter as Router } from 'react-router-dom';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = lazy(() => import('./App.tsx'));


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContainer />
       <Provider store={store}>
       <Suspense fallback={<PageLoader />}>
        <Router>
        <App />
        </Router>
       </Suspense>
       </Provider>
  </React.StrictMode>,
)

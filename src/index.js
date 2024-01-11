import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
// pages
import ProductPages from './pages/ProductPages';
import ErrorPages from './pages/ErrorPages';
import LoginPages from './pages/LoginPages';
import ProfilePage from './pages/ProfilePage';
import ProcuctDetailsPage from './pages/ProcuctDetailsPage';
import CarProductPage from './pages/CarProductPage';
import FavoriteProductPage from './pages/FavoriteProductPage';
import SearchProduktPages from './pages/SearchProduktPages';


const router = createBrowserRouter([
  // main Router
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPages />,
    children: [
      {
        path: '/',
        element: <ProductPages />
      },
      {
        path: '/login',
        element: <LoginPages />
      },
      {
        path: '/profile',
        element: <ProfilePage />
      },
      {
        path: '/productDetails/:id',
        element: <ProcuctDetailsPage />
      },
      {
        path: '/catrProduct',
        element: <CarProductPage />
      },
      {
        path: '/favoriteProducts',
        element: <FavoriteProductPage />
      },
      {
        path:'/search',
        element:<SearchProduktPages/>
      }
    ],

  }

  // deshboard comentar
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);


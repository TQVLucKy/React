import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';

import TodoItemDetail from './components/TodoItemDetail';
import Home from './pages/Home';
import About from './pages/About';
import BookPage from './pages/BookPage';
import ErrorPage from './pages/404Page';
import Thu1 from './pages/Thu1';
import RouterProtect from './pages/RouterProtect';
import { AuthProvider } from './pages/AuthContext';
import Login from './pages/login';
import { Provider } from 'react-redux';
import store from './store';

import 'font-awesome/css/font-awesome.min.css';
import CategoryItem from './components/CategoryItem';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
            </Route>
            <Route path="/thu1" element={<Thu1 />} />
            <Route path="/About" element={<About />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/TodoList" element={<App />} />
            <Route path="/TodoList/:categoryId/:todoId" element={<TodoItemDetail />} />
            <Route path="/TodoList/:categoryId" element={<CategoryItem />} />
            <Route path="/BookPage" element={<RouterProtect element={<BookPage />} />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

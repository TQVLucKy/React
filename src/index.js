import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';

import TodoItemDetail from './components/TodoItemDetail';
import Home from './pages/Home';
import About from './pages/About';
import BookPage from './pages/BookPage';
import ErrorPage from './pages/404Page';
import ImagePage from './pages/ImagePage';
import Thu1 from './pages/Thu1';
import RouterProtect from './pages/RouterProtect';
import { AuthProvider } from './pages/AuthContext';
import Login from './pages/login';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     errorElement: <ErrorPage />,
//     children: [
//       { path: 'BookPage', element: <BookPage /> },
//     ],
//   },
// ]);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <RouterProvider router={router} /> 
//   </React.StrictMode>
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/thu1" element={<Thu1 />} />
          </Route>

          <Route path="/About" element={<About />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/TodoList" element={<App />} />
          <Route path="/TodoList/:id" element={<TodoItemDetail />} />
          <Route path="/BookPage" element={<RouterProtect element={<BookPage />} />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/layout/App";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Designations from './pages/Designations';
import AddDesignation from "./pages/AddDesignation";
import EditDesignation from "./pages/EditDesignation";
import Employees from './pages/Employees';
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";

import "./index.css"
// import "./styles.css";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/designations',
        element: <Designations />
      },
      {
        path: '/designations/add',
        element: <AddDesignation />
      },
      {
        path: '/designations/edit/:designationId',
        element: <EditDesignation />
      },
      {
        path: '/employees',
        element: <Employees />
      },
      {
        path: '/employees/add',
        element: <AddEmployee />
      },
      {
        path: '/employees/edit/:employeeId',
        element: <EditEmployee />
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

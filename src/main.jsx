import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Router } from "react-router-dom";

// componentes:
import App from "./App.jsx";
// css
import "./index.css";
// Contexto:
import Context from "./context/Context.jsx";
import Profile from "./Routes/Profile.jsx";
import Home from "./Routes/Home.jsx";
import Card from "./Routes/Card.jsx";
// Compoentes:

// criação do router:
const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children:[
      {
        path:"/profile",
        element: <Profile/>
      },
      {
      path:"/",
      element:<Home/>
      },
      {
      path:"/card",
      element:<Card/>
      }
    ]
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Context>
      <RouterProvider router={router}>

      </RouterProvider>
    </Context>
  </StrictMode>
);

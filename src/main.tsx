import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

import Home from "./components/Home/Home.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      children: [{ path: "/", element: <Home /> }],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
    },
  }
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./routes/layout.tsx";
import ErrorPage from "./routes/error-page.tsx";
import App from "./App.tsx";
import { loadData } from "./lib/word.ts";
import VocaSet from "./routes/word-set.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
        loader: loadData,
      },
      {
        path: "/set/:id",
        element: <VocaSet />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

import { createBrowserRouter } from "react-router-dom";

import { HomePage, UserPage } from "../pages"

export const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/user/:username",
      element: <UserPage />,
    },
    {
      path: "*",
      element: <HomePage />
    },
]);
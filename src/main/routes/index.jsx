import { createBrowserRouter } from "react-router-dom";

import { HomePage, UserPage, RepositoryPage } from "@/pages"

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
      path: "/repo/:username/:reponame",
      element: <RepositoryPage />
    },
    {
      path: "*",
      element: <HomePage />
    },
]);
import ErrorPage from './pages/error/page';
import {
  createBrowserRouter,
} from "react-router-dom";
import Home from './pages/home/page';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
]);
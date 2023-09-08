import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import { Home } from "./pages/home/Home";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Single } from "./pages/single/Single";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Home />} path="/" errorElement={<div>Error</div>} />
      <Route
        element={<Single />}
        path="/book/:bookId"
        errorElement={<div>Error</div>}
      />
    </>
  )
);
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;

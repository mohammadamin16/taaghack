import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import { Home } from "./pages/home/Home";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Home />
      <ToastContainer />
    </>
  );
}

export default App;

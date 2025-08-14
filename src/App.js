import "./App.css";
import MyForm from "./MyForm";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import About from "./About";
import Sandbox from "./components/Sandbox";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MyForm />} />
      <Route path="/about" element={<About />} />
      <Route path="/sandbox" element={<Sandbox />} />
    </>
  )
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

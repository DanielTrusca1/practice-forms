import "./App.css";
import MyForm from "./MyForm";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import About from "./About";

// Redux imports
import { Provider } from "react-redux";
import { store } from "./redux/store";
import MyReduxForm from "./redux/MyForm";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MyForm />} />
      <Route path="/redux" element={<MyReduxForm />} />
      <Route path="/about" element={<About />} />
    </>
  )
);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;

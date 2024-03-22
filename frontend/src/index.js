import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PictureProvider } from "./components/Dashboard/PictureProvider";
// import redux provider
import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      {/* <Router> */}
      <PictureProvider>
        <App />
      </PictureProvider>
      {/* </Router> */}
    </React.StrictMode>
  </Provider>
);

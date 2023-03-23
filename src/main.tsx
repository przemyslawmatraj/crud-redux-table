import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from "./app/store";
import { Provider as ReactReduxProvider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ReactReduxProvider store={store}>
      <App />
    </ReactReduxProvider>
  </React.StrictMode>
);

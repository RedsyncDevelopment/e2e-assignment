import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from "./app/store";
import Navigation from "./components/navigation/Navigation";

import "./index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <header>
          <Navigation />
        </header>
        <main>
          <App />
        </main>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

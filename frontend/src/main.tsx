import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.ts";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <Provider store={appStore}>
      <App />
    </Provider>
  /* </StrictMode> */
);

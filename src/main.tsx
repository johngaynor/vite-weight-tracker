import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme
      appearance="dark"
      accentColor="iris"
      grayColor="sand"
      panelBackground="solid"
      radius="large"
      scaling="95%"
    >
      <App />
      <ThemePanel />
    </Theme>
  </React.StrictMode>
);

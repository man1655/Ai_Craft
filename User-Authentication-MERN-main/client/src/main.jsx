import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CompanyProvider } from "./context/CompanyContext.jsx";
import { AppContextProvider } from "./context/AppContext.jsx";

// You *must* import your Redux store here:
import { Provider } from "react-redux";
import { resumeStore } from "./store/store";  // <- your store file path

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={resumeStore}>        {/* <-- ADD this */}
      <CompanyProvider>
        <AppContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AppContextProvider>
      </CompanyProvider>
    </Provider>
  </React.StrictMode>
);

import { Provider } from "react-redux";

import { store } from "./store/store";
import { CallsPage } from "../pages/calls-page";

import "./App.css";

/**
 * Главный компонент приложения.
 */
export function App() {
  return (
    <Provider store={store}>
      <div>
        <CallsPage />
      </div>
    </Provider>
  );
}

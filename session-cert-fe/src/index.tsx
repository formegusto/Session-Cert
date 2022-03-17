import ReactDOM from "react-dom";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import ImsiApp from "./ImsiApp";
import RootStore from "./store";
import { Provider } from "mobx-react";

const store = new RootStore();

ReactDOM.render(
  <Provider {...store}>
    <ImsiApp />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

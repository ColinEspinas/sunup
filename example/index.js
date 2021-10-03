import sunup from "../src/sunup.js";
import App from "./components/App.js";

let app = sunup({
  root: "sunup",
  component: App(),
});

export default app;

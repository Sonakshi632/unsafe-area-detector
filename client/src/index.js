import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import Lenis from "@studio-freight/lenis";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


root.render(
  <App />
);
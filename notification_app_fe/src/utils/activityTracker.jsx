import { logInfo, logDebug } from "./Logger";

export function initActivityTracking() {
    // click tracking
  document.addEventListener("click", (e) => {
    const element =
      e.target.innerText ||
      e.target.name ||
      e.target.id ||
      e.target.tagName;

    logInfo(`Clicked: ${element}`, "utils");
  });

  // page load
  window.addEventListener("load", () => {
    logInfo(`Page loaded: ${window.location.pathname}`, "route");
  });

  // submission
  document.addEventListener("submit", (e) => {
    const formName = e.target.id || "unknown-form";
    logInfo(`Form submitted: ${formName}`, "auth");
  });

  // input
  document.addEventListener("focusin", (e) => {
    if (e.target.tagName === "INPUT") {
      logDebug(`Input focused: ${e.target.name || e.target.id}`, "utils");
    }
  });
}
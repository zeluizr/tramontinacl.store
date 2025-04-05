import { canUseDOM } from "vtex.render-runtime";

export function handleEvents(e: PixelMessage) {
  switch (e.data.eventName) {
    case "vtex:pageView": {
      console.log("Page view event received");
      break;
    }

    default: {
      console.log("Unknown event received");
      break;
    }
  }
}

if (canUseDOM) {
  window.addEventListener("message", handleEvents);
}

// Import the entire module under the global identifier `rive`

import { Rive, EventType } from "@rive-app/canvas";
import ubjahresbericht24 from "./assets/rive/ub_jahresbericht_2024.riv";

let r;


r = new Rive({
  src: ubjahresbericht24,
  canvas: document.getElementById("canvas"),
  autoplay: true,
  artboard: "ArtboardMain",
  stateMachines: "State Machine 1",
  //automaticallyHandleEvents: true, 
  onLoad: () => {
    r.resizeDrawingSurfaceToCanvas();
  },
  });

  console.log(r);

  // Define a mapping of event names to handler functions
  const eventHandlers = {
    "KI_Eisbrecher": (data) => {
      // Handle eventName1
      console.log("Handling eventName1:", data);
    },
    "eventName2": (data) => {
      // Handle eventName2
      console.log("Handling eventName2:", data);
    },
    // Add additional events as needed
  };
  
  // Central event handler which dispatches events based on their name
  const riveEventHandler = (event) => {
    const eventName = event.data.name;
    console.log("Received event:", eventName);
  
    const handler = eventHandlers[eventName];
    if (handler) {
      handler(event.data);
    } else {
      console.warn(`No handler defined for event: ${eventName}`);
    }
  };

r.on(EventType.RiveEvent, riveEventHandler);


window.addEventListener("resize", () => {
  r.resizeDrawingSurfaceToCanvas();
});


function hideVid(id) {
  let containerElement = document.getElementById(id);
  containerElement.style.visibility = "hidden";
}
  
function videoStopper(id) {
  let containerElement = document.getElementById(id);
  let iframe_tag = containerElement.querySelector( 'iframe');
  let video_tag = containerElement.querySelector( 'video' );
  if ( iframe_tag) {
      let iframeSrc = iframe_tag.src;
      iframe_tag.src = iframeSrc; 
  }
  if ( video_tag) {
      video_tag.pause();
  }

  
}
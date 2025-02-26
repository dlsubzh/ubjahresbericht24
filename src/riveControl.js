// Import the entire module under the global identifier `rive`

import { Rive, EventType } from "@rive-app/canvas";

let r;


  r = new Rive({
    src: "./assets/rive/ub_jahresbericht_2024.riv",
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
  
    const riveEventHandler = (event) => {
      console.log(event.data.name);

      if (event.data.name === "Ruedi") {
        console.log('it worked');
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
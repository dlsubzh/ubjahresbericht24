// Import the entire module under the global identifier `rive`

import { Rive, EventType,RiveEventType } from "@rive-app/canvas";
import ubjahresbericht24 from "./assets/rive/ub_jahresbericht_2024.riv";

let r;

const canvasEl = document.getElementById("canvas");

const onStateChange = (event) => {
  const stateName = event.data[0];
  console.log(stateName);
  if (stateName.includes('Hover')) {
    const isHovering = stateName.split('_').pop() === 'Hover';

    if (isHovering) {
      // Toggle the cursor style: if it's 'pointer', switch to 'default'; if not, switch to 'pointer'
      if (canvasEl.style.cursor === 'pointer') {
        canvasEl.style.cursor = 'default';
      } else {
        canvasEl.style.cursor = 'pointer';
      }
    } else {
      // When not hovering, ensure the cursor is set to 'default'
      canvasEl.style.cursor = 'default';
    }
    
  }
};


r = new Rive({
  src: ubjahresbericht24,
  canvas: canvasEl,
  autoplay: true,
  artboard: "ArtboardMain",
  stateMachines: "State Machine 1",
  //automaticallyHandleEvents: true, 
  onLoad: () => {
    r.resizeDrawingSurfaceToCanvas();
  },

  onStateChange: onStateChange,

  });
  


  window.addEventListener("resize", () => {
    r.resizeDrawingSurfaceToCanvas();
  });
  

  console.log(r);




  // Define a mapping of event names to handler functions
  const eventHandlers = {
    "KI_Eisbrecher": (data) => {
      handlePopUp(data)
    },

    "KI_Literacy": (data) => {
      handlePopUp(data)
    },

    "KI_GenAI": (data) => {
      handlePopUp(data)
    },

    "KI_Recherche": (data) => {
      handlePopUp(data)
    },

    "Ruedi": (data) => {
      handlePopUp(data)
    },

    "ErstiTag": (data) => {
      handlePopUp(data)
    },


  };
  


// Central event handler which dispatches events based on their name
const riveEventHandler = (event) => {
  const eventName = event.data.name;
  const eventData = event.data;
  const eventProperties = eventData.properties;
  console.log("Received event:", eventName);

  if (eventData.type === RiveEventType.General) {
    
    const handler = eventHandlers[eventName];
    if (handler) {
      handler(eventData);
    } else {
      console.warn(`No handler defined for event: ${eventName}`);
    }
  
  } else if (eventData.type === RiveEventType.OpenUrl) {

  console.log("Open Link for:", eventName);
  window.open(eventData.url);

}

};

r.on(EventType.RiveEvent, riveEventHandler);


////////////////////////////////////////////////
/////////////Fuinctions////////////////////////
/////////////////////////////////////////////////

// Handle Pop Up
function handlePopUp(event) {

  console.log(`Handling ${event.name}:`, event);

  let popUpElement = document.getElementById(event.name);
  console.log("Element:", popUpElement);

  //attach close button handler
  let closeButton = popUpElement.querySelector('.close-button');
  closeButton.addEventListener("click", handleCloseButton);

  //if video set Src
  setVideo(popUpElement)
  
  popUpElement.classList.remove("hidden")

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

}


// Generic close button handler function
function handleCloseButton(event) {
  const btn = event.currentTarget;

  // Find the closest parent with the class "article" and hide it
  const popUpElement = btn.closest('.pop-up-container');
  
  if (popUpElement) {

    stopVideo(popUpElement);

    popUpElement.classList.add('hidden');

    // Concatenate the parent's id with "_Close!" to form the Rive input name
    const articleID = popUpElement.id;
    const articleCloseTrigger = `${articleID}_Close!`; // e.g., "KI_Eisbrecher_Close!"
    console.log(`articleCloseTrigger: ${articleCloseTrigger}`);

    //finding the Close Input
    const inputs = r.stateMachineInputs('State Machine 1');
    // Find the input you want to set a value for, or trigger
    const closeInput = inputs.find(i => i.name === articleCloseTrigger);
    console.log(closeInput);

    // Trigger the Rive input if it exists
    if (closeInput) {
      closeInput.fire();
      console.log(`Triggered Rive input: ${closeInput}`);
    } else {
      console.warn(`Rive input "${closeInput}" not found.`);
    }
  } else {
    console.warn("No parent element with class 'article' found.");
  }
}


function setVideo(popUpElement) {
  const iframe = popUpElement.querySelector('iframe');
  if (iframe) {
    const videoSrc =  iframe.getAttribute('data-video-src');
    iframe.setAttribute('src', videoSrc);
  }
}


// Function to stop a video in a popup container by resetting its src attribute
function stopVideo(popUpElement) {
  const iframe = popUpElement.querySelector('iframe');
  if (iframe) {

    iframe.setAttribute('src', '');

  }
}
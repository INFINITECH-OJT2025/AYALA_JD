self.addEventListener("install", (event) => {
    console.log("Service Worker installing...");
  });
  
  self.addEventListener("activate", (event) => {
    console.log("Service Worker activated!");
  });
  
  self.addEventListener("fetch", (event) => {
    console.log("Service Worker intercepting fetch request:", event.request.url);
  });
  
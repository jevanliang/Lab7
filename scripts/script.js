// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


let count = 1;

let track = document.querySelector('entry-page').entry;

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        //keeping track of entry # with "count"
        newPost.setAttribute('class', count);
        newPost.setAttribute('onclick', "alert('This was clicked')");
        //Adding onclick function to each entry
        newPost.onclick= function(){
          document.querySelector('body').setAttribute('class', "single-entry");
          document.querySelector('entry-page').entry = newPost.entry;
          track = newPost.entry;
          document.querySelector('entry-page').classList.add(newPost.getAttribute('class'));
          setState();
        }
        document.querySelector('main').appendChild(newPost);
       count++;
      });
    });
});

/*Back and Forward arrow movement*/
window.addEventListener('popstate', (event)=>{
  if(document.location == window.location.origin + "/#settings"){
    document.querySelector('body').setAttribute('class', "settings");
    document.querySelector('h1').innerHTML = 'Settings';
  }
  else if(document.location == window.location.origin + "/#home"){
    document.querySelector('body').setAttribute('class', "");
    document.querySelector('h1').innerHTML = "Journal Entries";
  }
  else{
    document.querySelector('entry-page').remove();
    let entry_page = document.createElement('entry-page');
    let ref_script = document.querySelector('script');
    ref_script.parentNode.insertBefore(entry_page, ref_script.nextSibling);
    document.querySelector('body').setAttribute('class', "single-entry");
    document.querySelector('entry-page').entry = track;
  }
});

//run router.setState function
setState();
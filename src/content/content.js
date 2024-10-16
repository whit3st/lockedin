import { renderResetButton, renderCompareButton } from "./ui";
import { debounce } from "./functions";

console.log(
    `
    %c
     _                _            _   _         
    | |              | |          | | | |         
    | |     ___   ___| | _____  __| | | | _____     
    | |    / _ | / __| |/ / _ || _' | | ||  _  |    
    | |___| (_) | (__|   <  __||(_| | | || | | |    
    |____/|___/  |___|_||_|___||__,_| |_||_| |_|    


`,
    "color: #bada55"
);

const handleNavigation = debounce((url) => {
    console.log("Navigation event:", url);
    if (url.includes("currentJobId") || url.includes("jobs/view")) {
        renderCompareButton(url.includes("jobs/view"));
        renderResetButton(url.includes("jobs/view"));

        const existingContainer = document.querySelector("#lockedin-results-container");

        if (existingContainer) {
            existingContainer.remove();
        }
    }
}, 300);

if ("navigation" in window) {
    navigation.addEventListener("navigate", (event) => {
        handleNavigation(event.destination.url);
    });
}

// Also listen for URL changes using MutationObserver
let lastUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        handleNavigation(url);
    }
}).observe(document, { subtree: true, childList: true });

// init
handleNavigation(location.href);

console.log("%c LockedIn loaded.", "background: #222");

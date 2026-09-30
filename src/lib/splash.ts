/** sessionStorage key set once the loading screen has played in this tab. */
export const splashKey = "koura-splash";

/** Runs before first paint, so a returning visitor never sees the cover. */
export const splashScript = `(function(){try{if(sessionStorage.getItem("${splashKey}"))document.documentElement.setAttribute("data-splash","done")}catch(e){}})()`;

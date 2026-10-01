/*
 * The loading screen plays once per browser. When it finishes, KuoraSplash
 * stores INTRO_KEY; on later visits introScript, run in <head> before first
 * paint, marks <html data-intro="seen"> and the splash is hidden at once (see
 * globals.css). Private windows lose the key when they close, so they see it
 * again next time.
 *
 * The page's entrance still plays without the splash: the script also holds
 * the page at data-reveal="pending" from first paint, and KuoraSplash lets it
 * go once React is running. If that never happens, the page is let go after
 * three seconds anyway, so nothing stays hidden.
 */
export const INTRO_KEY = "kuora-intro";

export const introScript = `(function(){try{if(localStorage.getItem("${INTRO_KEY}")){var r=document.documentElement;r.setAttribute("data-intro","seen");r.setAttribute("data-reveal","pending");setTimeout(function(){if(r.getAttribute("data-reveal")==="pending")r.setAttribute("data-reveal","in")},3000)}}catch(e){}})()`;

export function introSeen() {
  return document.documentElement.dataset.intro === "seen";
}

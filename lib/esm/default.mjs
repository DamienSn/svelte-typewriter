const t=async({currentNode:t,text:e},n)=>{t.textContent="",t.classList.add("typing");for(const s of e)t.textContent+=s,await typingInterval(n.interval);null!==t.nextSibling&&1==t.classList.length?t.removeAttribute("class"):t.classList.remove("typing")};export default async({elements:e},n)=>{for(const s of e)t(s,n);const{currentNode:s}=e.reduce((t,e)=>{const n=t.text.length;return e.text.length>n?t=e:t});new MutationObserver(t=>{t.forEach(t=>{const e=!t.target.classList.contains("typing");"attributes"===t.type&&e&&n.dispatch("done")})}).observe(s,{attributes:!0,childList:!0,subtree:!0})};

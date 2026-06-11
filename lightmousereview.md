Voici le resultat de lightmouse, je t'envoie tout et tu vas devoir tout régler pour avoir les perfomances au max de la stat performance :

Metrics
Expand view
First Contentful Paint
3.9 s
Largest Contentful Paint
8.1 s
Total Blocking Time
170 ms
Cumulative Layout Shift
0
Speed Index
19.2 s

Insights
Render-blocking requests Est savings of 1,350 ms
Requests are blocking the page's initial render, which may delay LCP. Deferring or inlining can move these network requests out of the critical path.FCPLCPUnscored
URL
Transfer Size
Duration
Google Fonts cdn 
1.3 KiB	780 ms
/css2?family=…(fonts.googleapis.com)
1.3 KiB
780 ms
localhost 1st party
7.7 KiB	150 ms
/assets/index-DxKjuuYW.css(localhost)
7.7 KiB
150 ms
Forced reflow
A forced reflow occurs when JavaScript queries geometric properties (such as offsetWidth) after styles have been invalidated by a change to the DOM state. This can result in poor performance. Learn more about forced reflows and possible mitigations.Unscored
Top function call
Total reflow time
index-DmaPzoaA.js:3
34 ms
Source
Total reflow time
:4173/assets/Vitrine-BqQ216Tx.js:1
34 ms
LCP breakdown
Each subpart has specific improvement strategies. Ideally, most of the LCP time should be spent on loading the resources, not within delays.LCPUnscored
Subpart
Duration
Time to first byte
0 ms
Element render delay
12,230 ms
SWIPE DOWN
<span class="text-[10px] tracking-widest text-cyan-400 font-syne mb-2">
Network dependency tree
Avoid chaining critical requests by reducing the length of chains, reducing the download size of resources, or deferring the download of unnecessary resources to improve page load.LCPUnscored
Maximum critical path latency: 1,184 ms
Initial Navigation
http://localhost:4173 - 17 ms, 1.05 KiB
/css2?family=…(fonts.googleapis.com) - 70 ms, 1.26 KiB
…v20/xn7gYHE41….woff2(fonts.gstatic.com) - 1,184 ms, 24.03 KiB
…v24/8vIH7w4qz….woff2(fonts.gstatic.com) - 144 ms, 33.78 KiB
/assets/index-DmaPzoaA.js(localhost) - 58 ms, 331.33 KiB
…1.5.5/draco_decoder.wasm(www.gstatic.com) - 214 ms, 86.95 KiB
…1.5.5/draco_wasm_wrapper.js(www.gstatic.com) - 202 ms, 11.74 KiB
/assets/Footer-OMIULvm3.js(localhost) - 193 ms, 0.63 KiB
/assets/VIP-Cdv1lY5v.js(localhost) - 169 ms, 1.82 KiB
/assets/Reseaux-DLvQsjWz.js(localhost) - 156 ms, 1.97 KiB
/assets/Vitrine-BqQ216Tx.js(localhost) - 146 ms, 2.80 KiB
/assets/Chapter2-CdG5L5BB.js(localhost) - 137 ms, 0.96 KiB
/logo1.glb(localhost) - 114 ms, 580.11 KiB
/assets/Reveal-DkGTKiur.js(localhost) - 111 ms, 0.81 KiB
/assets/Chapter1-DMQkP-ig.js(localhost) - 102 ms, 1.15 KiB
/assets/index-DxKjuuYW.css(localhost) - 25 ms, 7.69 KiB
Preconnected origins
preconnect hints help the browser establish a connection earlier in the page load, saving time when the first request for that origin is made. The following are the origins that the page preconnected to.
Origin
Source
https://fonts.googleapis.com/
link
https://fonts.gstatic.com/
link
Preconnect candidates
Add preconnect hints to your most important origins, but try to use no more than 4.
Origin
Est LCP savings
https://www.gstatic.com
160 ms


Diagnostics
Reduce unused JavaScript Est savings of 152 KiB
Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity. Learn how to reduce unused JavaScript.FCPLCPUnscored
URL
Transfer Size
Est Savings
localhost 1st party
331.0 KiB	151.6 KiB
/assets/index-DmaPzoaA.js(localhost)
331.0 KiB
151.6 KiB
Minimize main-thread work 2.1 s
Consider reducing the time spent parsing, compiling and executing JS. You may find delivering smaller JS payloads helps with this. Learn how to minimize main-thread workTBTUnscored
Category
Time Spent
Script Evaluation
962 ms
Other
696 ms
Style & Layout
314 ms
Rendering
78 ms
Script Parsing & Compilation
5 ms
Parse HTML & CSS
4 ms
Garbage Collection
2 ms
Avoid enormous network payloads Total size was 2,757 KiB
Large network payloads cost users real money and are highly correlated with long load times. Learn how to reduce payload sizes.Unscored
URL
Transfer Size
GitHub utility
1,642.3 KiB
…hdri/studio_small_03_1k.hdr(raw.githubusercontent.com)
1,642.3 KiB
localhost 1st party
945.0 KiB
/logo1.glb(localhost)
580.1 KiB
/assets/index-DmaPzoaA.js(localhost)
331.3 KiB
/video-fallback.webp(localhost)
13.0 KiB
/traphouse.png(localhost)
12.9 KiB
/assets/index-DxKjuuYW.css(localhost)
7.7 KiB
Google CDN cdn 
98.7 KiB
…1.5.5/draco_decoder.wasm(www.gstatic.com)
87.0 KiB
…1.5.5/draco_wasm_wrapper.js(www.gstatic.com)
11.7 KiB
Google Fonts cdn 
57.8 KiB
…v24/8vIH7w4qz….woff2(fonts.gstatic.com)
33.8 KiB
…v20/xn7gYHE41….woff2(fonts.gstatic.com)
24.0 KiB



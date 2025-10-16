const k="/";async function C(){try{const r="mapConfig_root",t=localStorage.getItem(r);if(t)return console.log(`Loading configuration from localStorage (${r})`),JSON.parse(t);const o=await(await fetch(`${k}config/map-config.json`)).json();return console.log("Loaded configuration from server:",o),o}catch(r){throw console.error("Error loading configuration:",r),r}}async function $(r){try{const t="mapConfig_root";return localStorage.setItem(t,JSON.stringify(r,null,2)),console.log(`✅ Configuration saved to ${t}`),!0}catch(t){return console.error("Error saving configuration:",t),!1}}const w=/^[A-Za-z]:\//;function f(r=""){return r&&r.replace(/\\/g,"/").replace(w,t=>t.toUpperCase())}const y=/^[/\\]{2}/,E=/^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/,m=/^[A-Za-z]:$/,S=function(r){if(r.length===0)return".";r=f(r);const t=r.match(y),e=g(r),o=r[r.length-1]==="/";return r=L(r,!e),r.length===0?e?"/":o?"./":".":(o&&(r+="/"),m.test(r)&&(r+="/"),t?e?`//${r}`:`//./${r}`:e&&!g(r)?`/${r}`:r)},v=function(...r){let t="";for(const e of r)if(e)if(t.length>0){const o=t[t.length-1]==="/",s=e[0]==="/";o&&s?t+=e.slice(1):t+=o||s?e:`/${e}`}else t+=e;return S(t)};function L(r,t){let e="",o=0,s=-1,i=0,n=null;for(let l=0;l<=r.length;++l){if(l<r.length)n=r[l];else{if(n==="/")break;n="/"}if(n==="/"){if(!(s===l-1||i===1))if(i===2){if(e.length<2||o!==2||e[e.length-1]!=="."||e[e.length-2]!=="."){if(e.length>2){const c=e.lastIndexOf("/");c===-1?(e="",o=0):(e=e.slice(0,c),o=e.length-1-e.lastIndexOf("/")),s=l,i=0;continue}else if(e.length>0){e="",o=0,s=l,i=0;continue}}t&&(e+=e.length>0?"/..":"..",o=2)}else e.length>0?e+=`/${r.slice(s+1,l)}`:e=r.slice(s+1,l),o=l-s-1;s=l,i=0}else n==="."&&i!==-1?++i:i=-1}return e}const g=function(r){return E.test(r)},P=function(r){const t=f(r).replace(/\/$/,"").split("/").slice(0,-1);return t.length===1&&m.test(t[0])&&(t[0]+="/"),t.join("/")||(g(r)?"/":".")},p=function(r,t){const e=f(r).split("/");let o="";for(let s=e.length-1;s>=0;s--){const i=e[s];if(i){o=i;break}}return t&&o.endsWith(t)?o.slice(0,-t.length):o};class T{constructor(t){this.viteBasePath="/",this.currentPath=this.normalizePath(window.location.pathname),this.config=t,this.basePath=this.calculateBasePath(this.config),this.header=null,this.isScrolling=!1,this.scrollThreshold=100,console.log("Vite BASE_URL:",this.viteBasePath),console.log("Current Path:",this.currentPath),console.log("Calculated Base Path:",this.basePath)}normalizePath(t){return t.endsWith("/")?t+"index.html":!t.includes(".")&&!t.endsWith("/")?t+"/index.html":t}calculateBasePath(t){let e=this.currentPath;this.viteBasePath!=="/"&&e.startsWith(this.viteBasePath)&&(e=e.substring(this.viteBasePath.length));const o=P(e);if(o==="/"||o===""||o===".")return this.viteBasePath;const s=o.split("/").filter(n=>n).length;return"../".repeat(s)+this.viteBasePath.replace(/^\//,"")}getRelativePath(t){return this.basePath.startsWith("/")?v(this.basePath,t).replace(/\/+/g,"/"):v(this.basePath,t)}render(){const t=this.createNavElement(),e=[{text:"Home",path:"index.html"},{text:"Mappa",path:"pages/mappa.html"},{text:"Indici",path:"pages/indici.html"},{text:"Percorsi critici",path:"pages/percorsi.html"}],o=this.generateNavHTML(e);return t.innerHTML=o,this.setupEventListeners(),this.setupScrollListener(),console.log("Navigation rendered - Links:",{home:this.getRelativePath("index.html"),mappa:this.getRelativePath("pages/mappa.html")}),t}generateLogoHTML(){var e,o;const t=(o=(e=this.config)==null?void 0:e.project)==null?void 0:o.projectThumbnailURL;if(t&&t.trim()!==""){const s=t.startsWith("imgs/")?this.getRelativePath(t):this.getRelativePath(`imgs/${t}`);return`
                <a href="${this.getRelativePath("index.html")}">
                    <img src="${s}" alt="Logo" class="h-10 object-contain">
                </a>
            `}else return`
                <a href="${this.getRelativePath("index.html")}" class="bg-primary-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg hover:bg-primary-700 transition duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </a>
            `}generateNavHTML(t){const e=t.map(s=>{const i=this.getRelativePath(s.path),l=this.isActivePath(s.path)?"text-primary-900 border-b-2 border-primary-600 pb-1":"text-gray-600 hover:text-primary-600",c=s.section?`data-section="${s.section}"`:"";return`<a href="${i}" class="nav-link ${l} font-medium transition duration-200" ${c}>${s.text}</a>`}).join(""),o=t.map(s=>{const i=this.getRelativePath(s.path),l=this.isActivePath(s.path)?"text-primary-900 bg-primary-50 font-medium":"text-gray-600 hover:text-primary-600 hover:bg-gray-50",c=s.section?`data-section="${s.section}"`:"";return`<a href="${i}" class="block px-4 py-3 ${l} transition duration-200" ${c}>${s.text}</a>`}).join("");return`
            <div class="flex justify-between items-center h-20">
                <div class="flex items-center space-x-4">
                    <div class="flex items-center justify-center">
                        ${this.generateLogoHTML()}
                    </div>
                </div>
                <div class="hidden md:flex items-center space-x-8">
                    ${e}
                </div>
                <div class="md:hidden relative">
                    <input type="checkbox" id="menu-toggle" class="hidden peer">
                    <label for="menu-toggle" class="cursor-pointer text-gray-600 hover:text-primary-600 transition duration-200 peer-checked:text-primary-600">
                        <svg class="h-6 w-6 peer-checked:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg class="h-6 w-6 hidden peer-checked:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </label>
                    <div class="hidden peer-checked:block absolute right-0 top-12 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                        ${o}
                    </div>
                </div>
            </div>
        `}isActivePath(t){const e=p(this.currentPath),o=p(t);return e===o}createNavElement(){let t=document.querySelector("header");t||(t=document.createElement("header"),t.className="bg-white shadow-lg border-b border-primary-100 w-full sticky top-0 z-40 transition-all duration-300",document.body.insertBefore(t,document.body.firstChild)),this.header=t;let e=t.querySelector("nav");return e||(e=document.createElement("nav"),e.className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",t.appendChild(e)),e}setupScrollListener(){let t=!1;const e=()=>{if(!this.header)return;const i=window.scrollY>this.scrollThreshold;i&&!this.isScrolling?(this.isScrolling=!0,this.header.className="bg-white shadow-lg border-b border-primary-100 w-full fixed top-0 z-40 transition-all duration-300",document.body.style.paddingTop=this.header.offsetHeight+"px"):!i&&this.isScrolling&&(this.isScrolling=!1,this.header.className="bg-white shadow-lg border-b border-primary-100 w-full sticky top-0 z-40 transition-all duration-300",document.body.style.paddingTop=""),t=!1},o=()=>{t||(requestAnimationFrame(e),t=!0)};window.addEventListener("scroll",o,{passive:!0}),this.cleanupScrollListener=()=>{window.removeEventListener("scroll",o)}}setupEventListeners(){document.addEventListener("click",t=>{const e=t.target.closest("a[data-section]");if(e&&e.dataset.section){const o=e.dataset.section,s=e.getAttribute("href");if(s&&s.includes("index.html")){t.preventDefault();const i=s.split("#")[0];window.location.href=`${i}#section-${o}`}}}),document.addEventListener("click",t=>{const e=document.getElementById("menu-toggle"),o=t.target.closest(".md\\:hidden");e&&e.checked&&!o&&(e.checked=!1)})}destroy(){this.cleanupScrollListener&&this.cleanupScrollListener(),document.body.style.paddingTop=""}}class A{constructor(t){this.currentPath=window.location.pathname,this.basePath=this.calculateBasePath(),this.config=t,this.isOpen=!1,this.footerElement=null,this.carouselInterval=null,this.currentSlide=0,this.logos=[],this.initLogos()}async initLogos(){var t;try{const e=((t=window.location.pathname.match(/^\/[^\/]+\//))==null?void 0:t[0])||"/",o=`${e}imgs/institutional_logos/manifest.json`,s=await fetch(o);if(!s.ok)throw new Error(`Manifest not found: ${s.status}`);const i=await s.json();this.logos=i.map(n=>({filename:n,path:`${e}imgs/institutional_logos/${n}`})).sort((n,l)=>n.filename.localeCompare(l.filename)),this.footerElement&&this.logos.length>0&&this.updateCarousel()}catch{this.logos=[]}}updateCarousel(){const t=this.footerElement.querySelector(".footer-inner");t&&(t.innerHTML=this.generateCompactFooterHTML(),this.initCarousel())}dirname(t){return t.substring(0,t.lastIndexOf("/"))||"/"}join(...t){return t.map(e=>e.replace(/^\/+|\/+$/g,"")).filter(e=>e.length>0).join("/").replace(/\/+/g,"/")}relative(t,e){const o=t.split("/").filter(a=>a),s=e.split("/").filter(a=>a);let i=0;for(let a=0;a<Math.min(o.length,s.length)&&o[a]===s[a];a++)i++;const n=o.length-i,l=s.slice(i);return"../".repeat(n)+l.join("/")||"./"}normalizePath(t){return t.endsWith("/")?t+"index.html":!t.includes(".")&&!t.endsWith("/")?t+"/index.html":t}calculateBasePath(){var i,n,l;const t=this.dirname(this.currentPath),o="/"+(((l=(n=(i=this.config)==null?void 0:i.project)==null?void 0:n.projectShortTitle)==null?void 0:l.toLowerCase())||"leda"),s=this.relative(t,o);return s===""||s==="."?"./":s||"./"}getRelativePath(t){return this.join(this.basePath,t)}isExternalLink(t){return t.startsWith("http://")||t.startsWith("https://")}render(){return this.footerElement=this.createFooterElement(),this.setupEventListeners(),this.initCarousel(),this.footerElement}createFooterElement(){const t=document.querySelector(".footer-overlay");t&&t.remove();const e=document.createElement("div");return e.className="footer-overlay",e.innerHTML=`
            <div class="footer-trigger">
                <svg class="footer-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
                </svg>
            </div>
            <div class="footer-content">
                <div class="footer-trigger">
                    <svg class="footer-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
                    </svg>
                </div>
                <div class="footer-inner">
                    ${this.generateCompactFooterHTML()}
                </div>
            </div>
        `,document.body.appendChild(e),e}generateCompactFooterHTML(){var i,n,l,c;const t=new Date().getFullYear();(n=(i=this.config)==null?void 0:i.project)!=null&&n.projectTitle;const e=((c=(l=this.config)==null?void 0:l.project)==null?void 0:c.projectShortTitle)||"SASSI",o=this.getNavigationLinks().map(a=>{const h=this.isExternalLink(a.path),d=h?a.path:this.getRelativePath(a.path),u=a.section?`data-section="${a.section}"`:"",x=h?'target="_blank" rel="noopener noreferrer"':"",b=h?`
                <svg class="footer-external-icon" width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
            `:"";return`<li><a href="${d}" ${x} ${u}>${a.text}${b}</a></li>`}).join("");let s="";if(this.logos.length>0){const a=this.logos.map(d=>`
                <div class="footer-logo-slide">
                    <img src="${d.path}" alt="Institutional Logo - ${d.filename}" />
                </div>
            `).join(""),h=this.logos.map((d,u)=>`<span class="footer-carousel-dot ${u===0?"active":""}" data-index="${u}"></span>`).join("");s=`
                <div class="footer-logo-carousel-container">
                    <div class="footer-logo-carousel-title">Partner Istituzionali</div>
                    <div class="footer-logo-carousel">
                        <div class="footer-logo-carousel-track">
                            ${a}
                        </div>
                    </div>
                    <div class="footer-carousel-controls">
                        <button class="footer-carousel-btn footer-carousel-prev" aria-label="Previous logo">
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                            </svg>
                        </button>
                        <div class="footer-carousel-dots">
                            ${h}
                        </div>
                        <button class="footer-carousel-btn footer-carousel-next" aria-label="Next logo">
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `}return`
            <div class="footer-title">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z" clip-rule="evenodd"/>
                </svg>
                ${e}
            </div>
            
            <ul class="footer-nav">
                ${o}
            </ul>
            
            ${s}
            
            <div class="footer-credits">
                <div>© ${t} ${e}. Tutti i diritti riservati.</div>
                <div style="margin-top: 4px;">
                    Sviluppato con <span class="footer-heart">♥</span> per la ricerca storica
                </div>
                <div style="margin-top: 4px;">
                    Powered by OpenStreetMap • GIS Technology
                </div>
            </div>
        `}getNavigationLinks(){return[{text:"Home",path:"index.html"},{text:"Documentazione",path:"https://github.com/valentinapasqual/leda"},{text:"Contatti",path:"https://ledaprin2022pnrr.altervista.org/chi-siamo/"}]}initCarousel(){if(!this.footerElement||this.logos.length===0)return;const t=this.footerElement.querySelector(".footer-logo-carousel-track"),e=this.footerElement.querySelector(".footer-carousel-prev"),o=this.footerElement.querySelector(".footer-carousel-next"),s=this.footerElement.querySelectorAll(".footer-carousel-dot");if(!t)return;this.startCarousel(),e&&e.addEventListener("click",()=>{this.stopCarousel(),this.goToPrevSlide(),this.startCarousel()}),o&&o.addEventListener("click",()=>{this.stopCarousel(),this.goToNextSlide(),this.startCarousel()}),s.forEach(n=>{n.addEventListener("click",()=>{this.stopCarousel();const l=parseInt(n.dataset.index);this.goToSlide(l),this.startCarousel()})});const i=this.footerElement.querySelector(".footer-logo-carousel");i&&(i.addEventListener("mouseenter",()=>this.stopCarousel()),i.addEventListener("mouseleave",()=>this.startCarousel()))}startCarousel(){this.logos.length<=1||(this.stopCarousel(),this.carouselInterval=setInterval(()=>{this.goToNextSlide()},3e3))}stopCarousel(){this.carouselInterval&&(clearInterval(this.carouselInterval),this.carouselInterval=null)}goToSlide(t){var s,i;const e=(s=this.footerElement)==null?void 0:s.querySelector(".footer-logo-carousel-track"),o=(i=this.footerElement)==null?void 0:i.querySelectorAll(".footer-carousel-dot");!e||!o||(this.currentSlide=t,e.style.transform=`translateX(-${t*100}%)`,o.forEach((n,l)=>{n.classList.toggle("active",l===t)}))}goToNextSlide(){const t=(this.currentSlide+1)%this.logos.length;this.goToSlide(t)}goToPrevSlide(){const t=(this.currentSlide-1+this.logos.length)%this.logos.length;this.goToSlide(t)}toggle(){this.isOpen=!this.isOpen,this.footerElement&&(this.footerElement.classList.toggle("open",this.isOpen),this.isOpen&&this.logos.length>0?this.startCarousel():this.stopCarousel())}setupEventListeners(){if(!this.footerElement)return;this.footerElement.querySelectorAll(".footer-trigger").forEach(e=>{e.addEventListener("click",o=>{o.stopPropagation(),this.toggle()})}),this.footerElement.addEventListener("click",e=>{const o=e.target.closest("a[data-section]");if(o&&o.dataset.section){const s=o.dataset.section,i=o.getAttribute("href");if(i&&i.includes("index.html")){e.preventDefault();const n=i.split("#")[0];window.location.href=`${n}#section-${s}`,this.toggle()}}}),document.addEventListener("click",e=>{this.isOpen&&!this.footerElement.contains(e.target)&&this.toggle()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&this.isOpen&&this.toggle()})}destroy(){this.stopCarousel(),this.footerElement&&this.footerElement.remove()}}export{T as U,A as a,C as l,$ as s};

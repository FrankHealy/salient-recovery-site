exports.id=704,exports.ids=[704],exports.modules={98201:(e,t,r)=>{let s={"0567c45d5ede8299e3c52c58f50c785c487e4dae":()=>Promise.resolve().then(r.bind(r,77075)).then(e=>e.revalidateSyncTags),"8f3c88d61be778cdc5e71979dbdce4e27b29f006":()=>Promise.resolve().then(r.bind(r,77075)).then(e=>e.setPerspectiveCookie),"47b41e3981c7d9e7eeb1ceb5ef6ba46202fcce8c":()=>Promise.resolve().then(r.bind(r,82129)).then(e=>e.revalidateRootLayout)};async function i(e,...t){return(await s[e]()).apply(null,t)}e.exports={"0567c45d5ede8299e3c52c58f50c785c487e4dae":i.bind(null,"0567c45d5ede8299e3c52c58f50c785c487e4dae"),"8f3c88d61be778cdc5e71979dbdce4e27b29f006":i.bind(null,"8f3c88d61be778cdc5e71979dbdce4e27b29f006"),"47b41e3981c7d9e7eeb1ceb5ef6ba46202fcce8c":i.bind(null,"47b41e3981c7d9e7eeb1ceb5ef6ba46202fcce8c")}},68513:(e,t,r)=>{Promise.resolve().then(r.bind(r,55443)),Promise.resolve().then(r.bind(r,7689)),Promise.resolve().then(r.bind(r,37897)),Promise.resolve().then(r.t.bind(r,79404,23)),Promise.resolve().then(r.bind(r,78824))},94430:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,12994,23)),Promise.resolve().then(r.t.bind(r,96114,23)),Promise.resolve().then(r.t.bind(r,9727,23)),Promise.resolve().then(r.t.bind(r,79671,23)),Promise.resolve().then(r.t.bind(r,41868,23)),Promise.resolve().then(r.t.bind(r,84759,23))},35303:()=>{},78824:(e,t,r)=>{"use strict";r.d(t,{default:()=>m});var s=r(10326),i=r(17577),a=r(90434),n=r(46226),o=r(35047);let l=["en","ie"];function c(e,t){return e?e[t]??e.en??Object.values(e).find(Boolean)??"":""}function d({currentLocale:e}){let t=(0,o.usePathname)(),r=(0,o.useRouter)(),i=s=>{if(s===e)return;let i=t.split("/");i[1]=s,r.push(i.join("/"))};return s.jsx("div",{className:"flex items-center gap-0.5 border border-surface-border rounded p-0.5 bg-surface-raised",children:l.map(t=>s.jsx("button",{onClick:()=>i(t),className:`
            px-2 py-1 text-xs font-mono rounded transition-colors duration-200
            ${t===e?"bg-primary-700 text-ink-inverse":"text-ink-muted hover:text-ink-primary"}
          `,"aria-current":t===e?"true":void 0,children:t.toUpperCase()},t))})}function m({navItems:e,locale:t,settings:r}){let[l,m]=(0,i.useState)(!1),u=(0,o.usePathname)(),h=c(r?.siteName,t)||"Salient Recovery",p=e=>{let r=`/${t}${e}`;return u===r||u.startsWith(`${r}/`)};return(0,s.jsxs)("header",{className:"border-b border-surface-border bg-surface-base/95 backdrop-blur-sm sticky top-0 z-40",children:[s.jsx("div",{className:"container-site",children:(0,s.jsxs)("div",{className:"flex items-center justify-between h-16",children:[(0,s.jsxs)(a.default,{href:`/${t}`,className:"flex items-center gap-2 group",children:[s.jsx(n.default,{src:"/salient-recovery-logo.svg",alt:h,width:220,height:56,priority:!0,className:"h-10 w-auto sm:h-11"}),s.jsx("span",{className:"sr-only",children:h}),s.jsx("span",{className:"hidden sm:inline-block font-mono text-2xs text-ink-muted uppercase tracking-widest leading-none border border-surface-border rounded px-1 py-0.5 group-hover:border-primary-300 transition-colors duration-200",children:"Platform"})]}),s.jsx("nav",{className:"hidden md:flex items-center gap-1","aria-label":"Main navigation",children:e.map(e=>s.jsx(a.default,{href:`/${t}${e.href}`,className:`
                  px-3 py-1.5 text-sm font-sans font-medium rounded transition-colors duration-200
                  ${p(e.href)?"text-primary-800 bg-primary-50":"text-ink-secondary hover:text-ink-primary hover:bg-surface-raised"}
                `,children:c(e.label,t)},e._id))}),(0,s.jsxs)("div",{className:"flex items-center gap-3",children:[s.jsx(d,{currentLocale:t}),s.jsx(a.default,{href:`/${t}/contact`,className:"hidden sm:inline-flex items-center text-sm font-medium font-sans border border-primary-700 text-primary-700 rounded px-3 py-1.5 hover:bg-primary-700 hover:text-ink-inverse transition-colors duration-200",children:"ie"===t?"D\xe9an Teagmh\xe1il":"Contact"}),s.jsx("button",{onClick:()=>m(!l),className:"md:hidden p-2 text-ink-secondary hover:text-ink-primary","aria-label":"Toggle menu","aria-expanded":l,children:l?s.jsx("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:s.jsx("path",{d:"M4 4l12 12M16 4L4 16"})}):s.jsx("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:s.jsx("path",{d:"M3 5h14M3 10h14M3 15h14"})})})]})]})}),l&&s.jsx("div",{className:"md:hidden border-t border-surface-border bg-surface-base",children:(0,s.jsxs)("div",{className:"container-site py-4 flex flex-col gap-1",children:[e.map(e=>s.jsx(a.default,{href:`/${t}${e.href}`,onClick:()=>m(!1),className:`
                  px-3 py-2.5 text-sm font-medium rounded
                  ${p(e.href)?"text-primary-800 bg-primary-50":"text-ink-secondary hover:text-ink-primary hover:bg-surface-raised"}
                `,children:c(e.label,t)},e._id)),s.jsx("div",{className:"mt-3 pt-3 border-t border-surface-border",children:s.jsx(a.default,{href:`/${t}/contact`,onClick:()=>m(!1),className:"block text-center text-sm font-medium border border-primary-700 text-primary-700 rounded px-3 py-2 hover:bg-primary-700 hover:text-ink-inverse transition-colors duration-200",children:"ie"===t?"D\xe9an Teagmh\xe1il":"Contact"})})]})})]})}},76017:(e,t,r)=>{"use strict";r.d(t,{L:()=>n});var s=r(91194),i=r(49935),a=r.n(i);let n=(0,s.eI)({projectId:"xha69u14",dataset:"production",apiVersion:"2024-01-01",useCdn:!0,token:process.env.SANITY_API_TOKEN});a()(n)},3353:(e,t,r)=>{"use strict";r.d(t,{$:()=>c,Am:()=>l,Lc:()=>i,Nz:()=>d,RP:()=>n,ZU:()=>x,d$:()=>p,gO:()=>u,jd:()=>m,kj:()=>f,x$:()=>o,xX:()=>h,yV:()=>a});var s=r(85137);let i=(0,s.Z)`
  *[_type == "siteSettings"][0] {
    siteName,
    siteTagline,
    contactEmail,
    contactPhone,
    address,
    footerStatement,
    linkedinUrl
  }
`,a=(0,s.Z)`
  *[_type == "navigationItem"] | order(order asc) {
    _id,
    label,
    href,
    order,
    children[] { label, href }
  }
`,n=(0,s.Z)`
  *[_type == "platformFeature"] | order(order asc) {
    _id,
    featureId,
    title,
    shortDescription,
    associatedEntity,
    capabilities[]{ label },
    regulatoryRelevance,
    order
  }
`,o=(0,s.Z)`
  *[_type == "platformFeature" && associatedEntity == $entity] | order(order asc) {
    _id,
    featureId,
    title,
    shortDescription,
    associatedEntity,
    capabilities[]{ label },
    regulatoryRelevance
  }
`;(0,s.Z)`
  *[_type == "workflowStep" && workflowType == $workflowType] | order(stepNumber asc) {
    _id,
    stepNumber,
    workflowType,
    title,
    description,
    actor,
    systemAction
  }
`;let l=(0,s.Z)`
  *[_type == "workflowStep"] | order(workflowType asc, stepNumber asc) {
    _id,
    stepNumber,
    workflowType,
    title,
    description,
    actor,
    systemAction
  }
`,c=(0,s.Z)`
  *[_type == "sectorPage"] | order(order asc) {
    _id,
    "slug": slug.current,
    name,
    summary,
    regulatoryContext,
    applicableFeatures[]->{ _id, featureId, title, shortDescription, associatedEntity },
    order
  }
`;(0,s.Z)`
  *[_type == "sectorPage" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    name,
    summary,
    regulatoryContext,
    applicableFeatures[]->{ _id, featureId, title, shortDescription, associatedEntity, capabilities[]{ label } }
  }
`;let d=(0,s.Z)`
  *[_type == "resourceArticle"] | order(publishedAt desc) {
    _id,
    "slug": slug.current,
    title,
    summary,
    category,
    publishedAt,
    readingTimeMinutes
  }
`,m=(0,s.Z)`
  *[_type == "resourceArticle" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    title,
    summary,
    body,
    category,
    publishedAt,
    readingTimeMinutes
  }
`,u=(0,s.Z)`
  *[_type == "externalSignal" && isReviewed == true] | order(publishedDate desc) {
    _id,
    title,
    summary,
    sourceName,
    sourceUrl,
    publishedDate,
    topic,
    region,
    language,
    relevanceNote
  }
`;(0,s.Z)`
  *[_type == "externalSignal" && isReviewed == true && topic == $topic] | order(publishedDate desc) [0..9] {
    _id,
    title,
    summary,
    sourceName,
    sourceUrl,
    publishedDate,
    topic,
    region,
    relevanceNote
  }
`;let h=(0,s.Z)`
  *[_type == "weeklyDigest" && isPublished == true] | order(weekEnding desc) [0] {
    _id,
    title,
    weekEnding,
    summary,
    signals[]->{ _id, title, sourceName, sourceUrl, publishedDate, topic },
    editorNote
  }
`;(0,s.Z)`
  *[_type == "weeklyDigest" && isPublished == true] | order(weekEnding desc) {
    _id,
    title,
    weekEnding,
    summary
  }
`;let p=(0,s.Z)`
  *[_type == "researchPaperSummary" && isReviewed == true] | order(publishedYear desc) {
    _id,
    "slug": slug.current,
    paperTitle,
    authors,
    journal,
    publishedYear,
    doi,
    summary,
    relevanceNote,
    topics
  }
`,f=(0,s.Z)`
  *[_type == "policyUpdate" && isReviewed == true] | order(effectiveDate desc) {
    _id,
    "slug": slug.current,
    title,
    effectiveDate,
    issuingBody,
    summary,
    sourceUrl,
    impactAssessment,
    affectedSectors[]->{ "slug": slug.current, name }
  }
`;(0,s.Z)`
  *[_type == "faqItem"] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`,(0,s.Z)`
  *[_type == "faqItem" && category == $category] | order(order asc) {
    _id,
    question,
    answer,
    category
  }
`;let x=(0,s.Z)`
  *[_type == "complianceStatement"] | order(order asc) {
    _id,
    framework,
    issuingBody,
    statement,
    lastReviewedDate,
    order
  }
`},13954:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>y,generateMetadata:()=>b,generateStaticParams:()=>x});var s=r(19510),i=r(58585),a=r(62984),n=r(76017),o=r(3353),l=r(68570);let c=(0,l.createProxy)(String.raw`C:\salient-recovery\src\components\layout\Header.tsx`),{__esModule:d,$$typeof:m}=c;c.default;let u=(0,l.createProxy)(String.raw`C:\salient-recovery\src\components\layout\Header.tsx#default`);var h=r(57371);let p=[{labelEn:"Platform",labelIe:"Ard\xe1n",href:"/platform"},{labelEn:"How it Works",labelIe:"Conas a Oibr\xedonn",href:"/how-it-works"},{labelEn:"Sectors",labelIe:"Earn\xe1lacha",href:"/sectors"},{labelEn:"Resources",labelIe:"Acmhainn\xed",href:"/resources"},{labelEn:"About",labelIe:"Faoi",href:"/about"},{labelEn:"Contact",labelIe:"Teagmh\xe1il",href:"/contact"}];function f({settings:e,locale:t}){let r=(0,a.t)(e?.footerStatement,t),i=new Date().getFullYear();return s.jsx("footer",{className:"bg-primary-900 text-ink-inverse/80 mt-auto",children:(0,s.jsxs)("div",{className:"container-site py-12",children:[(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-10",children:[(0,s.jsxs)("div",{className:"col-span-1 md:col-span-1",children:[s.jsx("p",{className:"font-serif text-lg text-ink-inverse mb-3",children:"Salient Recovery"}),e?.contactEmail&&s.jsx("a",{href:`mailto:${e.contactEmail}`,className:"text-sm hover:text-ink-inverse transition-colors",children:e.contactEmail}),e?.address&&(0,s.jsxs)("address",{className:"not-italic text-sm mt-3 space-y-0.5 text-ink-inverse/60",children:[e.address.line1&&s.jsx("p",{children:e.address.line1}),e.address.city&&s.jsx("p",{children:e.address.city}),e.address.country&&s.jsx("p",{children:e.address.country})]})]}),(0,s.jsxs)("div",{className:"col-span-1",children:[s.jsx("p",{className:"font-mono text-2xs uppercase tracking-widest text-ink-inverse/40 mb-4",children:"ie"===t?"Nasclean\xfaint":"Navigation"}),s.jsx("nav",{className:"flex flex-col gap-2",children:p.map(e=>s.jsx(h.default,{href:`/${t}${e.href}`,className:"text-sm hover:text-ink-inverse transition-colors duration-200",children:"ie"===t?e.labelIe:e.labelEn},e.href))})]}),s.jsx("div",{className:"col-span-1",children:r&&(0,s.jsxs)(s.Fragment,{children:[s.jsx("p",{className:"font-mono text-2xs uppercase tracking-widest text-ink-inverse/40 mb-4",children:"ie"===t?"R\xe1iteas Rial\xe1la":"Regulatory Statement"}),s.jsx("p",{className:"text-xs leading-relaxed text-ink-inverse/60",children:r})]})})]}),(0,s.jsxs)("div",{className:"mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3",children:[(0,s.jsxs)("p",{className:"text-xs text-ink-inverse/40 font-mono",children:["\xa9 ",i," Salient Recovery. ","ie"===t?"Gach ceart ar cosaint.":"All rights reserved."]}),(0,s.jsxs)("div",{className:"flex gap-4 text-xs text-ink-inverse/40",children:[s.jsx(h.default,{href:`/${t}/privacy`,className:"hover:text-ink-inverse/70 transition-colors",children:"ie"===t?"Pr\xedobh\xe1ideacht":"Privacy"}),s.jsx(h.default,{href:`/${t}/terms`,className:"hover:text-ink-inverse/70 transition-colors",children:"ie"===t?"T\xe9arma\xed":"Terms"})]})]})]})})}async function x(){return[{locale:"en"},{locale:"ie"}]}async function b({params:e}){let t=await n.L.fetch(o.Lc);return{title:{default:t?.siteName?.en??"Salient Recovery",template:`%s — ${t?.siteName?.en??"Salient Recovery"}`},description:t?.siteTagline?.en??"Clinical operations platform for regulated recovery services.",metadataBase:new URL("https://salientrecovery.ie")}}async function y({children:e,params:t}){let{locale:r}=t;(0,a.ys)(r)||(0,i.notFound)();let[l,c]=await Promise.all([n.L.fetch(o.Lc),n.L.fetch(o.yV)]);return(0,s.jsxs)("html",{lang:r,dir:"ltr",children:[(0,s.jsxs)("head",{children:[s.jsx("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),s.jsx("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"})]}),(0,s.jsxs)("body",{className:"flex flex-col min-h-dvh bg-surface-base text-ink-primary antialiased",children:[s.jsx(u,{navItems:c,locale:r,settings:l}),s.jsx("main",{className:"flex-1",children:e}),s.jsx(f,{settings:l,locale:r})]})]})}r(54315)},32029:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a,metadata:()=>i});var s=r(19510);let i={title:"Salient Recovery",description:"Clinical operations platform for regulated care services.",icons:{icon:"/icon.svg",shortcut:"/icon.svg",apple:"/icon.svg"}};function a({children:e}){return s.jsx("html",{lang:"en",children:s.jsx("body",{children:e})})}},12523:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var s=r(19510);function i(){return s.jsx("html",{lang:"en",children:(0,s.jsxs)("body",{style:{fontFamily:"sans-serif",padding:"4rem",maxWidth:"600px",margin:"0 auto"},children:[s.jsx("p",{style:{fontFamily:"monospace",fontSize:"0.75rem",textTransform:"uppercase",letterSpacing:"0.1em",color:"#6b7280",marginBottom:"1rem"},children:"404"}),s.jsx("h1",{style:{fontSize:"1.5rem",marginBottom:"1rem",color:"#1C1C1C"},children:"Page not found"}),s.jsx("p",{style:{color:"#555",marginBottom:"2rem"},children:"The page you are looking for does not exist or has been moved."}),s.jsx("a",{href:"/en",style:{color:"#1e3c66",textDecoration:"underline"},children:"Return to home"})]})})}},62984:(e,t,r)=>{"use strict";r.d(t,{bS:()=>n,t:()=>a,ys:()=>i});let s=["en","ie"];function i(e){return s.includes(e)}function a(e,t){return e?e[t]??e.en??Object.values(e).find(Boolean)??"":""}function n(e,t){return e?e[t]??e.en??[]:[]}},97026:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var s=r(66621);let i=e=>[{type:"image/svg+xml",sizes:"any",url:(0,s.fillMetadataSegment)(".",e.params,"icon.svg")+"?910323bd215005f8"}]},54315:()=>{}};
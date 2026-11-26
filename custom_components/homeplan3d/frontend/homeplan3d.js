Array.prototype.at||Object.defineProperty(Array.prototype,"at",{configurable:!0,writable:!0,value:function(t){let e=Math.trunc(t)||0;return this[e<0?this.length+e:e]}});typeof globalThis.structuredClone!="function"&&(globalThis.structuredClone=o=>o===void 0?o:JSON.parse(JSON.stringify(o)));var Pa=new URL(import.meta.url),Sa=Pa.searchParams.get("v"),Ma=o=>new URL(`./fonts/${o}${Sa?`?v=${Sa}`:""}`,Pa).href,Ia="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD";function Ta(){if(typeof document>"u"||document.getElementById("fp3d-fonts"))return;let o=document.createElement("style");o.id="fp3d-fonts",o.textContent=`
@font-face{font-family:"Figtree";font-style:normal;font-display:swap;font-weight:300 900;src:url(${Ma("figtree.woff2")}) format("woff2");unicode-range:${Ia}}
@font-face{font-family:"Bricolage Grotesque";font-style:normal;font-display:swap;font-weight:200 800;src:url(${Ma("bricolage-grotesque.woff2")}) format("woff2");unicode-range:${Ia}}`,document.head.append(o)}function Ea(o,t){return t==="metric"||t==="imperial"?t:o?.config?.unit_system?.length==="mi"?"imperial":"metric"}function eh(o,t){return String(Number(o.toFixed(t)))}function Ra(o,t=2){let e=o<0?"-":"",n=Math.round(Math.abs(o)/.0254*(t>=2?10:1))/(t>=2?10:1),i=Math.floor(n/12+1e-9),r=n-i*12,s=eh(r,t>=2?1:0);return i?r<.05?`${e}${i}'`:`${e}${i}' ${s}"`:`${e}${s}"`}function Aa(o,t){let e=o.trim().toLowerCase().replace(/,/g,".").replace(/[′’]/g,"'").replace(/[″”“]/g,'"').replace(/''/g,'"');if(!e)return null;let n=/(-?\d+(?:\.\d+)?|-?\.\d+)\s*(feet|foot|ft|'|inches|inch|in|"|mm|cm|m)?/g,i=0,r=!1,s=!1,a=e;for(let l of e.matchAll(n)){let c=Number(l[1]);if(!Number.isFinite(c))return null;let d=l[2];r=!0,a=a.replace(l[0],""),d==="feet"||d==="foot"||d==="ft"||d==="'"?(i+=c*.3048,s=!0):d==="inches"||d==="inch"||d==="in"||d==='"'?i+=c*.0254:d==="mm"?i+=c/1e3:d==="cm"?i+=c/100:d==="m"?i+=c:i+=t==="imperial"?c*(s?.0254:.3048):c}return!r||/[^\s+]/.test(a)?null:i}function zn(o){let t=o?.locale?.time_format;if(t==="12")return{hourCycle:"h12"};if(t==="24")return{hourCycle:"h23"};if(t==="system")try{let e=new Intl.DateTimeFormat(void 0,{hour:"numeric"}).resolvedOptions().hourCycle;return e?{hourCycle:e==="h11"||e==="h12"?"h12":"h23"}:{}}catch{return{}}return{}}var Io=globalThis,Po=Io.ShadowRoot&&(Io.ShadyCSS===void 0||Io.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Gi=Symbol(),za=new WeakMap,Fn=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==Gi)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Po&&t===void 0){let n=e!==void 0&&e.length===1;n&&(t=za.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&za.set(e,t))}return t}toString(){return this.cssText}},Fa=o=>new Fn(typeof o=="string"?o:o+"",void 0,Gi),ct=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((n,i,r)=>n+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[r+1],o[0]);return new Fn(e,o,Gi)},Ca=(o,t)=>{if(Po)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let n=document.createElement("style"),i=Io.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=e.cssText,o.appendChild(n)}},Yi=Po?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let n of t.cssRules)e+=n.cssText;return Fa(e)})(o):o;var{is:nh,defineProperty:oh,getOwnPropertyDescriptor:ih,getOwnPropertyNames:rh,getOwnPropertySymbols:sh,getPrototypeOf:ah}=Object,To=globalThis,Oa=To.trustedTypes,lh=Oa?Oa.emptyScript:"",ch=To.reactiveElementPolyfillSupport,Cn=(o,t)=>o,Qi={toAttribute(o,t){switch(t){case Boolean:o=o?lh:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},Na=(o,t)=>!nh(o,t),Ha={attribute:!0,type:String,converter:Qi,reflect:!1,useDefault:!1,hasChanged:Na};Symbol.metadata??=Symbol("metadata"),To.litPropertyMetadata??=new WeakMap;var ee=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Ha){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let n=Symbol(),i=this.getPropertyDescriptor(t,n,e);i!==void 0&&oh(this.prototype,t,i)}}static getPropertyDescriptor(t,e,n){let{get:i,set:r}=ih(this.prototype,t)??{get(){return this[e]},set(s){this[e]=s}};return{get:i,set(s){let a=i?.call(this);r?.call(this,s),this.requestUpdate(t,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ha}static _$Ei(){if(this.hasOwnProperty(Cn("elementProperties")))return;let t=ah(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Cn("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Cn("properties"))){let e=this.properties,n=[...rh(e),...sh(e)];for(let i of n)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[n,i]of e)this.elementProperties.set(n,i)}this._$Eh=new Map;for(let[e,n]of this.elementProperties){let i=this._$Eu(e,n);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let n=new Set(t.flat(1/0).reverse());for(let i of n)e.unshift(Yi(i))}else t!==void 0&&e.push(Yi(t));return e}static _$Eu(t,e){let n=e.attribute;return n===!1?void 0:typeof n=="string"?n:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let n of e.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ca(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,n){this._$AK(t,n)}_$ET(t,e){let n=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,n);if(i!==void 0&&n.reflect===!0){let r=(n.converter?.toAttribute!==void 0?n.converter:Qi).toAttribute(e,n.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){let n=this.constructor,i=n._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let r=n.getPropertyOptions(i),s=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:Qi;this._$Em=i;let a=s.fromAttribute(e,r.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(t,e,n,i=!1,r){if(t!==void 0){let s=this.constructor;if(i===!1&&(r=this[t]),n??=s.getPropertyOptions(t),!((n.hasChanged??Na)(r,e)||n.useDefault&&n.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,n))))return;this.C(t,e,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:n,reflect:i,wrapped:r},s){n&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),r!==!0||s!==void 0)||(this._$AL.has(t)||(this.hasUpdated||n||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}let n=this.constructor.elementProperties;if(n.size>0)for(let[i,r]of n){let{wrapped:s}=r,a=this[i];s!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,r,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(e)):this._$EM()}catch(n){throw t=!1,this._$EM(),n}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};ee.elementStyles=[],ee.shadowRootOptions={mode:"open"},ee[Cn("elementProperties")]=new Map,ee[Cn("finalized")]=new Map,ch?.({ReactiveElement:ee}),(To.reactiveElementVersions??=[]).push("2.1.2");var or=globalThis,Da=o=>o,Eo=or.trustedTypes,La=Eo?Eo.createPolicy("lit-html",{createHTML:o=>o}):void 0,qa="$lit$",me=`lit$${Math.random().toFixed(9).slice(2)}$`,Ka="?"+me,dh=`<${Ka}>`,Fe=document,Hn=()=>Fe.createComment(""),Nn=o=>o===null||typeof o!="object"&&typeof o!="function",ir=Array.isArray,uh=o=>ir(o)||typeof o?.[Symbol.iterator]=="function",Ji=`[ 	
\f\r]`,On=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Va=/-->/g,Wa=/>/g,Ae=RegExp(`>|${Ji}(?:([^\\s"'>=/]+)(${Ji}*=${Ji}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ba=/'/g,Ua=/"/g,Ga=/^(?:script|style|textarea|title)$/i,rr=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),g=rr(1),ne=rr(2),_b=rr(3),Ce=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),ja=new WeakMap,ze=Fe.createTreeWalker(Fe,129);function Ya(o,t){if(!ir(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return La!==void 0?La.createHTML(t):t}var ph=(o,t)=>{let e=o.length-1,n=[],i,r=t===2?"<svg>":t===3?"<math>":"",s=On;for(let a=0;a<e;a++){let l=o[a],c,d,u=-1,p=0;for(;p<l.length&&(s.lastIndex=p,d=s.exec(l),d!==null);)p=s.lastIndex,s===On?d[1]==="!--"?s=Va:d[1]!==void 0?s=Wa:d[2]!==void 0?(Ga.test(d[2])&&(i=RegExp("</"+d[2],"g")),s=Ae):d[3]!==void 0&&(s=Ae):s===Ae?d[0]===">"?(s=i??On,u=-1):d[1]===void 0?u=-2:(u=s.lastIndex-d[2].length,c=d[1],s=d[3]===void 0?Ae:d[3]==='"'?Ua:Ba):s===Ua||s===Ba?s=Ae:s===Va||s===Wa?s=On:(s=Ae,i=void 0);let h=s===Ae&&o[a+1].startsWith("/>")?" ":"";r+=s===On?l+dh:u>=0?(n.push(c),l.slice(0,u)+qa+l.slice(u)+me+h):l+me+(u===-2?a:h)}return[Ya(o,r+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Dn=class o{constructor({strings:t,_$litType$:e},n){let i;this.parts=[];let r=0,s=0,a=t.length-1,l=this.parts,[c,d]=ph(t,e);if(this.el=o.createElement(c,n),ze.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=ze.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(let u of i.getAttributeNames())if(u.endsWith(qa)){let p=d[s++],h=i.getAttribute(u).split(me),_=/([.?@])?(.*)/.exec(p);l.push({type:1,index:r,name:_[2],strings:h,ctor:_[1]==="."?Zi:_[1]==="?"?tr:_[1]==="@"?er:on}),i.removeAttribute(u)}else u.startsWith(me)&&(l.push({type:6,index:r}),i.removeAttribute(u));if(Ga.test(i.tagName)){let u=i.textContent.split(me),p=u.length-1;if(p>0){i.textContent=Eo?Eo.emptyScript:"";for(let h=0;h<p;h++)i.append(u[h],Hn()),ze.nextNode(),l.push({type:2,index:++r});i.append(u[p],Hn())}}}else if(i.nodeType===8)if(i.data===Ka)l.push({type:2,index:r});else{let u=-1;for(;(u=i.data.indexOf(me,u+1))!==-1;)l.push({type:7,index:r}),u+=me.length-1}r++}}static createElement(t,e){let n=Fe.createElement("template");return n.innerHTML=t,n}};function nn(o,t,e=o,n){if(t===Ce)return t;let i=n!==void 0?e._$Co?.[n]:e._$Cl,r=Nn(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(o),i._$AT(o,e,n)),n!==void 0?(e._$Co??=[])[n]=i:e._$Cl=i),i!==void 0&&(t=nn(o,i._$AS(o,t.values),i,n)),t}var Xi=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:n}=this._$AD,i=(t?.creationScope??Fe).importNode(e,!0);ze.currentNode=i;let r=ze.nextNode(),s=0,a=0,l=n[0];for(;l!==void 0;){if(s===l.index){let c;l.type===2?c=new Ln(r,r.nextSibling,this,t):l.type===1?c=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(c=new nr(r,this,t)),this._$AV.push(c),l=n[++a]}s!==l?.index&&(r=ze.nextNode(),s++)}return ze.currentNode=Fe,i}p(t){let e=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,e),e+=n.strings.length-2):n._$AI(t[e])),e++}},Ln=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,n,i){this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=nn(this,t,e),Nn(t)?t===y||t==null||t===""?(this._$AH!==y&&this._$AR(),this._$AH=y):t!==this._$AH&&t!==Ce&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):uh(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==y&&Nn(this._$AH)?this._$AA.nextSibling.data=t:this.T(Fe.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:n}=t,i=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Dn.createElement(Ya(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(e);else{let r=new Xi(i,this),s=r.u(this.options);r.p(e),this.T(s),this._$AH=r}}_$AC(t){let e=ja.get(t.strings);return e===void 0&&ja.set(t.strings,e=new Dn(t)),e}k(t){ir(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,n,i=0;for(let r of t)i===e.length?e.push(n=new o(this.O(Hn()),this.O(Hn()),this,this.options)):n=e[i],n._$AI(r),i++;i<e.length&&(this._$AR(n&&n._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let n=Da(t).nextSibling;Da(t).remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},on=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,n,i,r){this.type=1,this._$AH=y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=y}_$AI(t,e=this,n,i){let r=this.strings,s=!1;if(r===void 0)t=nn(this,t,e,0),s=!Nn(t)||t!==this._$AH&&t!==Ce,s&&(this._$AH=t);else{let a=t,l,c;for(t=r[0],l=0;l<r.length-1;l++)c=nn(this,a[n+l],e,l),c===Ce&&(c=this._$AH[l]),s||=!Nn(c)||c!==this._$AH[l],c===y?t=y:t!==y&&(t+=(c??"")+r[l+1]),this._$AH[l]=c}s&&!i&&this.j(t)}j(t){t===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Zi=class extends on{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===y?void 0:t}},tr=class extends on{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==y)}},er=class extends on{constructor(t,e,n,i,r){super(t,e,n,i,r),this.type=5}_$AI(t,e=this){if((t=nn(this,t,e,0)??y)===Ce)return;let n=this._$AH,i=t===y&&n!==y||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,r=t!==y&&(n===y||i);i&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},nr=class{constructor(t,e,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){nn(this,t)}};var hh=or.litHtmlPolyfillSupport;hh?.(Dn,Ln),(or.litHtmlVersions??=[]).push("3.3.3");var Qa=(o,t,e)=>{let n=e?.renderBefore??t,i=n._$litPart$;if(i===void 0){let r=e?.renderBefore??null;n._$litPart$=i=new Ln(t.insertBefore(Hn(),r),r,void 0,e??{})}return i._$AI(o),i};var sr=globalThis,at=class extends ee{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Qa(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Ce}};at._$litElement$=!0,at.finalized=!0,sr.litElementHydrateSupport?.({LitElement:at});var fh=sr.litElementPolyfillSupport;fh?.({LitElement:at});(sr.litElementVersions??=[]).push("4.2.2");var ft="main",ar=o=>o&&o!==ft?{plan:o}:{};async function Ro(o,t){return o.callWS({type:"homeplan3d/building/get",...ar(t)})}async function Vn(o,t,e,n){let i=r=>o.callWS({type:"homeplan3d/building/save",building:t,...ar(e),...r&&n!==void 0&&n>=0?{base_revision:n}:{}});try{return(await i(!0)).revision}catch(r){if(n===void 0||!/extra keys not allowed.*base_revision/i.test(String(r?.message??r)))throw r;return(await i(!1)).revision}}function Ja(o){return!!o&&typeof o=="object"&&o.code==="stale_plan"}function Xa(o,t,e){return o.connection.subscribeMessage(n=>t(n.revision),{type:"homeplan3d/building/subscribe",...ar(e)})}function Za(o,t){return o.connection.subscribeMessage(e=>t(e.plan??ft,e.revision),{type:"homeplan3d/building/subscribe",plan:"*"})}async function tl(o){try{return await o.callWS({type:"homeplan3d/plans/list"})}catch{return{plans:[],trash:[],locate_plan:ft}}}function el(o,t){return o.connection.subscribeMessage(t,{type:"homeplan3d/plans/subscribe"})}function lr(o,t,e,n,i,r){return o.connection.subscribeMessage(s=>{"announce"in s?e?.(s.announce):"reload"in s?n?.(s.reload):"style"in s?i?.(s.style):typeof s.text=="string"&&t(s)},{type:"homeplan3d/voice/subscribe",...e?{announce:!0}:{},...n?{reload:!0}:{},...i?{style:!0}:{},...r?{view:r}:{}})}async function nl(o,t,e,n){return(await o.callWS({type:"homeplan3d/voice/answer",ask_id:t,text:e,answered:n})).taken}async function ol(o,t){return(await o.callWS({type:"homeplan3d/image/get",image_id:t})).data}async function il(o){return(await o.callWS({type:"homeplan3d/packs/list"})).packs}var mh="4.0.2",gh="homeplan3d-diagnostics";var bh="alarm_control_panel|automation|binary_sensor|button|calendar|camera|climate|counter|cover|date|datetime|device_tracker|event|fan|group|humidifier|image|input_boolean|input_button|input_datetime|input_number|input_select|input_text|lawn_mower|light|lock|media_player|notify|number|person|remote|scene|script|select|sensor|siren|sun|switch|text|time|timer|todo|update|vacuum|valve|water_heater|weather|zone",_h=[[/\b(?:https?|wss?|file|blob|data|ftp):[^\s'"<>)\]]*/gi,"<url>"],[/\beyJ[\w-]+\.[\w-]+\.[\w-]+/g,"<token>"],[/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g,"<email>"],[/\b\d{1,3}(?:\.\d{1,3}){3}(?::\d+)?\b/g,"<ip>"],[/\b[0-9a-f]{1,4}(?::[0-9a-f]{0,4}){2,7}\b/gi,"<ip>"],[new RegExp(`\\b(?:${bh})\\.[a-z0-9_]+\\b`,"g"),"<entity>"],[/\b[a-z][a-z0-9_]*\.[a-z0-9]*_[a-z0-9_]*\b/g,"<entity>"],[/\b[0-9a-f]{16,}\b/gi,"<id>"]];function vh(o){let t=String(o??"");for(let[e,n]of _h)t=t.replace(e,n);return t.replace(/\s+/g," ").trim().slice(0,200)}var wh=/(homeplan3d[\w-]*\.js)(?:\?[^:\s)]*)?:(\d+):(\d+)/;function cl(o,t,e,n){let i=wh.exec(o??"");if(i)return`${i[1]}:${i[2]}:${i[3]}`;let r=/(homeplan3d[\w-]*\.js)(?:\?|$)/.exec(t??"");return r?`${r[1]}:${e??0}:${n??0}`:null}function ur(o,t,e){return/iPad|Tablet|Silk|\bKF[A-Z]{2,4}\b/.test(o)||/Macintosh/.test(o)&&e>1?"tablet":/iPhone|iPod|Windows Phone/.test(o)?"phone":/Android/.test(o)?/Mobile/.test(o)&&t<600?"phone":"tablet":e>0&&t>0&&t<500?"phone":"desktop"}function yh(o){let t=[[/Edg(?:e|A|iOS)?\/(\d+)/,"Edge"],[/OPR\/(\d+)/,"Opera"],[/SamsungBrowser\/(\d+)/,"Samsung"],[/Silk\/(\d+)/,"Silk"],[/(?:Firefox|FxiOS)\/(\d+)/,"Firefox"],[/CriOS\/(\d+)/,"Chrome"],[/; wv\).*Chrome\/(\d+)/,"WebView"],[/Chrome\/(\d+)/,"Chrome"],[/Version\/(\d+)[\d.]* (?:Mobile\/\w+ )?Safari/,"Safari"]];for(let[e,n]of t){let i=e.exec(o);if(i)return`${n} ${i[1]}`}return/AppleWebKit/.test(o)&&/iPhone|iPad|Macintosh/.test(o)?"WebKit":"other"}function xh(o,t=0){let e;return(e=/Android (\d+)/.exec(o))?`Android ${e[1]}`:(e=/iPad.*? OS (\d+)/.exec(o))?`iPadOS ${e[1]}`:(e=/(?:iPhone|iPod).*? OS (\d+)/.exec(o))?`iOS ${e[1]}`:/Macintosh/.test(o)?t>1?"iPadOS":"macOS":(e=/Windows NT (\d+)/.exec(o))?`Windows ${e[1]}`:/CrOS/.test(o)?"ChromeOS":/Linux/.test(o)?"Linux":"other"}function kh(o){let t=o??"";return t.trim()?/SwiftShader|llvmpipe|Software|Mali-[4T]|Mali-G(?:31|51|52|57)\b|Adreno[^\d]*[2-5]\d\d\b|PowerVR|Vivante|VideoCore|\bGC\d{3,4}\b|Intel.*\bHD Graphics(?:[2-5]\d{3})?\b/i.test(t)?"low":/RTX|GTX|GeForce|Quadro|Radeon (?:RX|Pro)|Apple (?:M\d|GPU)|Adreno[^\d]*[67]\d\d\b|Mali-G7\d|Iris Xe|Intel.*Arc/i.test(t)?"high":"mid":null}var dl,rl=!1,be=!1,cr,ge={},Ao=0,rn=0,ul=null,pl=null,hl=null,oe=[],dr=new Set;function pr(){return be}function fl(o){return dr.add(o),()=>dr.delete(o)}function ml(o){dl=o,!rl&&(rl=!0,window.addEventListener(gh,t=>{let e=!!t.detail?.enabled;_l(e)}),hr())}function Oe(o){be&&(ge[o]=(ge[o]??0)+1)}function gl(o){if(!be)return;o.fps>0&&(Ao+=o.fps,rn++),ul=o.low;let t=window.devicePixelRatio||1;pl=Math.round(o.pixelRatio/t*100)/100,o.gpu!==void 0&&(hl=kh(o.gpu))}function bl(o,t){if(!t)return;let e=vh(o);if(!e)return;let n=oe.find(i=>i.msg===e&&i.where===t);n?n.count++:oe.length<20&&oe.push({msg:e,where:t,count:1,version:mh})}function sl(o){let t=o.error,e=t?`${t.name}: ${t.message}`:o.message;bl(e,cl(t?.stack,o.filename,o.lineno,o.colno))}function al(o){let t=o.reason;t instanceof Error&&bl(`${t.name}: ${t.message}`,cl(t.stack))}function ll(){hr()}function _l(o){if(o!==be){be=o,o?(window.addEventListener("error",sl),window.addEventListener("unhandledrejection",al),window.addEventListener("pagehide",ll),cr=setInterval(()=>{hr()},6e5)):(window.removeEventListener("error",sl),window.removeEventListener("unhandledrejection",al),window.removeEventListener("pagehide",ll),clearInterval(cr),cr=void 0,ge={},Ao=rn=0,oe=[]);for(let t of dr)t(o)}}function $h(){let o=navigator.userAgent,t=navigator.maxTouchPoints||0,e=Math.min(screen.width||0,screen.height||0);return{device:ur(o,e,t),browser:yh(o),os:xh(o,t),low_end:ul,render_scale:pl,fps:rn?Math.round(Ao/rn*10)/10:null,fps_n:rn,gpu_tier:hl,views:{...ge}}}async function hr(){let o=dl;if(!o)return;let t={type:"homeplan3d/diagnostics/client"};be&&(t.client=$h(),t.errors=oe);let e=ge,n=oe;be&&(ge={},Ao=rn=0,oe=[]);try{let i=await o.callWS(t);_l(!!i?.enabled)}catch{if(be){for(let[i,r]of Object.entries(e))ge[i]=(ge[i]??0)+r;oe=[...n,...oe].slice(0,20)}}}function Sh(o){return o.shape==="cyl"&&(o.axis??"y")==="y"&&o.y>.9&&o.h<.02}function gr(o){let t=vt(o);return!!t&&/(hob|cooker|stove)/.test(o)&&t.parts.filter(Sh).length>=2}function br(o){let t=o?.parts.find(e=>e.spin==="y"||e.spin==="z");return t?t.spin:null}function vl(o=new Date){let t=o.getFullYear(),e=o.getMonth();if(e===0&&o.getDate()<=6)return 4;if(e<10)return 0;let n=new Date(t,e,o.getDate()).getTime(),i=new Date(t,11,24),r=new Date(t,11,24-i.getDay()).getTime(),s=168*3600*1e3,a=0;for(let l=1;l<=4;l++)n>=r-(4-l)*s-3600*1e3&&(a=l);return a}var wl=[],mr=new Map,yl=0;function xl(o){wl=o,mr=new Map(o.flatMap(t=>t.items.map(e=>[Mh(t.id,e.id),e]))),yl++}function sn(){return wl}function an(){return yl}function Mh(o,t){return`pack:${o}:${t}`}function _e(o){return o.startsWith("pack:")}function zo(o){return _e(o)?o.endsWith(":curtain_motor")?"curtain":o.endsWith(":screen_roll")?"screen":null:null}function He(o){return o==="robot_vacuum"||_e(o)&&o.endsWith(":robot_vacuum")}function Ih(o){return o.z>.05}function kl(o){let t=(o?.parts??[]).filter(e=>e.shape==="cyl"&&Ih(e));return t.length?t.reduce((e,n)=>n.w*n.d>e.w*e.d?n:e).z:.227}function $l(o){return _e(o)&&/:(heat_pump_indoor|gas_boiler|buffer_tank|water_heater)$/.test(o)}var Ph={"mastershort.living_basics":"mastershort.living","mastershort.kitchen_basics":"mastershort.kitchen","mastershort.bedroom_basics":"mastershort.bedroom","mastershort.bath_basics":"mastershort.bath"};function Sl(o){return vt(o)?.parts.find(t=>t.screen)}function vt(o){if(!_e(o))return;let t=mr.get(o);if(t)return t;let[,e,...n]=o.split(":"),i=Ph[e];return i?mr.get(`pack:${i}:${n.join(":")}`):void 0}function Ml(o,t){return o.name.en??Object.values(o.name)[0]??o.id}var Th={architecture:"Architecture & Fit-out",balcony:"Balcony & Small Spaces",bath:"Bathroom",cabinet_kit:"Cabinets & Shelves \u2013 Kit",deco:"Decor & Plants",dining_hall:"Dining Room & Hallway",fun_halloween:"Fun Pack: Halloween",fun_winter:"Fun Pack: Winter & Christmas",fun_pets:"Fun Pack: Pets",bedroom:"Bedroom",cinema:"Home Cinema & Hi-Fi",exclusive:"Exclusive: Smart Fridge",fitness:"Fitness",garage:"Garage & Workshop",garden:"Garden & Terrace",kids:"Kids' Room",kitchen:"Kitchen",living:"Living Room",office:"Office & Gaming",pets:"Pets",smarthome:"Smart Home & Tech",stairs:"Stairs & Railings",utility:"Utility & Building Services",vehicles:"Vehicles",starter:"Starter Pack",pro_auto:"Pro: Car Pro",pro_timetravel:"Pro: Time travel",pro_pool:"Pro: Pool Pro",pro_camera:"Pro: Camera Cockpit",pro_energy:"Pro: Energy Pro",pro_screens:"Pro: Live Screens",pro_sound:"Pro: Sound & Cinema",pro_weather:"Pro: Weather Outside",pro_heat:"Pro: Heat Pro",pro_household:"Pro: Household Pro",frames:"Digital Picture Frames",homelab:"Homelab & Workshop",announce:"Module: Announcements",voice_answers:"Module: The house answers",window_watch:"Module: Window watch"};function Il(o,t){let e=o.id.replace(/^mastershort\./,""),n=e.endsWith("_sample"),i=Th[n?e.slice(0,-7):e];return i?n?`${i} \u2013 Sampler`:i:o.name}var Eh=.005;function mt(o,t){let e=vt(t.type);if(t.mount_y!=null)return t.mount_y;let n=El(t,o.height);if(n!==null)return n;if(t.type==="lamp_wall")return Pl;if(Fo.has(t.type))return Math.max(0,o.height-Co(t.type,t.h));if(t.type==="led_strip"){let i=o.rooms.find(s=>s.points.length>=3&&W([t.x,t.z],s.points)),r=typeof i?.ceiling_height=="number"&&i.ceiling_height>0?i.ceiling_height:o.height;return Math.max(0,r-.04-Math.max(.02,t.h))}switch(e?.mount){case"surface":return fr(o,t)+Oo(o,t.x,t.z,t.h);case"wall":return e.wall_y??1;case"ceiling":return Math.max(0,o.height-t.h-Eh);default:return e?fr(o,t):Tl(t)||fr(o,t)}}function fr(o,t){let e=o.rooms.filter(n=>n.points.length>=3);return!e.length||e.some(n=>W([t.x,t.z],n.points))?0:ie(o,t.x,t.z)}var Yt={field:null,size:1,right:0,up:0};var zl=["rain","snow","clouds","lightning","sky"];var wr={lawn:.012,terrace:.12,path:.02,driveway:.02,pool:-.25,bed:.15,wild:.03,hedge:1.2,fence:1,pergola:2.2,balcony:.02};function yr(o){return o==="hedge"||o==="fence"||o==="pergola"}function xr(o){return(o.outdoor??[]).filter(t=>t.area_id&&t.points.length>=3&&!yr(t.type)).map(t=>({id:t.id,name:(t.name??"").trim(),area_id:t.area_id??null,points:t.points,floor_material:"wood",outdoor:!0,panel:t.panel,hidden:t.hidden,no_state:t.no_state}))}function ot(o){return[...o.rooms,...xr(o)]}function Ah(o,t,e){let n=o.slope??0;if(!n||o.type==="pool")return 0;let i=o.slope_dir??"x",r=(c,d)=>i==="x"?c:i==="-x"?-c:i==="z"?d:-d,s=1/0,a=-1/0;for(let[c,d]of o.points){let u=r(c,d);s=Math.min(s,u),a=Math.max(a,u)}if(a-s<1e-6)return 0;let l=Math.min(1,Math.max(0,(r(t,e)-s)/(a-s)));return n*l}function zh(o,t,e,n){return Ho(o,t)+wr[t.type]-Fh(o,t,e,n)}var kr=-.2,vr={set:!1,level:kr};function Fl(o){let t=o?.settings.terrain??null;vr={set:t?.level!=null,level:t?.level??kr}}function Cl(o){return o.elevation>.3?0:vr.set?vr.level-o.elevation:kr}function Ho(o,t){return Cl(o)+(t.offset??0)}function Fh(o,t,e,n){return t.type==="pool"?0:Ah(t,e,n)}function ie(o,t,e){let n=(o.outdoor??[]).filter(r=>!yr(r.type)&&r.type!=="pool"&&W([t,e],r.points)),i=[...n].reverse().find(r=>r.cut)??n[0];return i?zh(o,i,t,e):Cl(o)}function Ol(o,t){return Ho(o,t)+(t.above?Hl(t):Math.min(2,Math.max(-.3,t.rim??.06)))}function Ch(o){return o.depth&&o.depth>=.3?Math.min(5,o.depth):o.above?Hl(o):1.5}function Oh(o,t){return t.above?!1:(o.outdoor??[]).some(e=>e!==t&&e.type!=="pool"&&!yr(e.type)&&!e.cut&&e.points.length>=3&&t.points.every(n=>W(n,e.points)))}function Wn(o,t){return!t.above&&!Oh(o,t)?ln(o,t)-.05:Ol(o,t)-Ch(t)}function ln(o,t){return Ol(o,t)-.15}function Hl(o){return o.height&&o.height>.3?o.height:1.2}var Hh={meter:null,grid:null,grid_invert:!1,solar:null,battery:null,battery_invert:!1,battery_soc:null,consumption:null,tariff:null};var Nl={type:"none",pitch:35,overhang:.4},Nh={wall_exterior:.24,wall_interior:.12,grid:.05,north:0,roof:{...Nl}};var Dl=["pool_pump","pool_filter","pool_heat_pump","pool_dosing","pool_valve"],Ll=.3;var Vl=new Set(["lamp_ceiling","lamp_fan","lamp_downlight","lamp_spot","lamp_panel","lamp_pendant","lamp_floor","lamp_uplight","lamp_table","lamp_wall","led_strip","lamp_bollard","lamp_garden"]),Pl=1.75;function Wl(o){if(["lamp_pendant","lamp_fan","stairwell","parking"].includes(o.type)||$r.has(o.type))return!1;let t=vt(o.type);return!(t?.mount==="ceiling"&&t.light&&t.light!=="panel")}var Fo=new Set(["lamp_downlight","lamp_spot","lamp_ceiling","lamp_panel"]);function Co(o,t){return o==="lamp_spot"?Math.max(.06,t)+.008:o==="lamp_ceiling"||o==="lamp_panel"?Math.max(.02,t)+.005:.02}var $r=new Set(["stairs","stairs_u"]);function Bn(o){return Vl.has(o)||!!vt(o)?.light}var Dh=new Set(["table","table_round","coffee_table","desk","nightstand","sideboard","dresser","kitchen","island","worktop","tv_board","dishwasher","washer","dryer"]);function Tl(o){switch(o.type){case"home_battery":return o.variant==="wall"?.5:0;case"kitchen_wall":return 1.45;case"tv_wall":return Math.max(0,1.3-o.h/2);case"neon_sign":return Math.max(0,1.6-o.h/2);case"radiator":return .12;case"ac_unit":return 2.05;case"awning":return 2.3;case"mailbox":return o.variant==="bank"?.75:o.variant==="pole"||o.variant==="pillar"||o.variant==="parcel"?0:1;case"wall_switch":return 1.05;case"wall_socket":return o.variant==="outdoor"?.5:.3;case"inverter":return 1.1;case"wallbox":return 1;case"meter":return .4;default:return 0}}var Al=.04,Lh=1.2;function Oo(o,t,e,n=0){let i=0;for(let r of o.furniture)!(Dh.has(r.type)||vt(r.type)?.surface)||!W([t,e],Ne(r))||r.type==="worktop"&&n>0&&r.h-Al>=Lh&&n<=r.h-Al-.02||(i=Math.max(i,r.h));return i}var Bl=new Set(["wall_switch","wall_socket"]),Vh=4;function Un(o){let t=(o.gangs??[]).slice(0,Vh);return t.length?t:[{entity:null}]}function No(o){return[...new Set(Un(o).map(t=>t.entity).filter(t=>!!t&&t!=="none"))]}var Ul=new Set(["wifi_ap","water_heater"]);function El(o,t){return o.type==="wifi_ap"?o.variant==="wall"?2.1:Math.max(0,t-o.h):o.type==="water_heater"?o.variant==="wall"?1.1:0:null}var Rh=new Set([...Vl,"radiator","ac_unit","awning","robot_vacuum","inverter","home_battery","wallbox","meter","pool_pump","pool_heat_pump","pool_dosing","tv_board","tv_wall","neon_sign","desk","fridge","fridge_smart","stove","kitchen_tall","dishwasher","washer","dryer","kitchen","island","sink"]),Rl={sofa:[2.2,.9,.82],sofa_l:[2.6,1.8,.82],sofa_u:[3,2.2,.82],armchair:[.85,.85,.8],table:[1.6,.9,.75],chair:[.46,.5,.9],bed:[1.6,2.05,.9],nightstand:[.45,.4,.5],wardrobe:[1.8,.6,2.1],shelf:[.9,.35,1.9],kitchen:[2.4,.62,.92],worktop:[1.2,.62,.91],inverter:[.5,.2,.65],home_battery:[.6,.25,1.1],wallbox:[.3,.15,.42],pool_pump:[.7,.32,.4],pool_filter:[.6,.6,1],pool_heat_pump:[1,.45,.75],pool_dosing:[.4,.2,.5],pool_valve:[.16,.1,.14],meter:[.55,.21,1.1],grid_point:[.4,.22,.6],fridge:[.6,.65,1.8],fridge_smart:[.91,.73,1.78],stairwell:[1,2.6,.02],stove:[.6,.62,.92],sink:[.9,.62,.92],bathtub:[1.7,.75,.58],shower:[.9,.9,2],wc:[.38,.6,.8],washbasin:[.6,.46,.85],desk:[1.4,.7,.75],tv_board:[1.8,.42,.5],plant:[.45,.45,1.1],rug:[2,1.4,.01],stairs:[1,3.2,2.75],stairs_u:[2.1,2.7,2.75],stool:[.55,.55,.42],lamp_ceiling:[.4,.4,.08],lamp_downlight:[.1,.1,.02],lamp_spot:[.1,.1,.14],lamp_panel:[.6,.6,.03],lamp_uplight:[.35,.35,1.8],lamp_bollard:[.16,.16,.8],lamp_garden:[.12,.12,.3],radiator:[1,.1,.6],ac_unit:[.85,.22,.3],awning:[3,2.5,.22],waste_bin:[.58,.73,1.07],mailbox:[.38,.14,.34],neon_sign:[.9,.03,.32],wall_switch:[.085,.012,.085],wall_socket:[.085,.014,.085],wifi_ap:[.2,.2,.04],water_heater:[.56,.56,1.5],robot_vacuum:[.36,.5,.1],parking:[2.6,5.2,.02],lamp_pendant:[.4,.4,.8],lamp_fan:[1.3,1.3,.45],lamp_floor:[.4,.4,1.7],lamp_table:[.28,.28,.45],lamp_wall:[.22,.12,.2],led_strip:[2,.04,.03],coffee_table:[1.1,.6,.42],tv_wall:[1.3,.08,.75],sideboard:[1.6,.45,.8],table_round:[1.1,1.1,.75],bench:[1.4,.45,.85],corner_bench:[2,1.6,.9],bar_stool:[.42,.42,.75],kitchen_wall:[.8,.35,.7],kitchen_tall:[.6,.62,2.1],island:[1.8,.9,.92],dishwasher:[.6,.62,.92],bunk_bed:[1,2.05,1.65],dresser:[1,.5,.9],washer:[.6,.6,.85],dryer:[.6,.6,.85],office_chair:[.65,.65,1.1],tall_cabinet:[.6,.6,2.1],coat_rack:[1,.35,1.9]};var Wh=["interior","front","front_glass","sidelight","sidelights","glass","sliding","passage"],Bh=["standard","bars","glass_wall","slide"];function Uh(o,t){return o.type==="door"?o.style&&Wh.includes(o.style)?o.style:t?"front":"interior":o.style&&Bh.includes(o.style)?o.style:"standard"}function jh(o,t,e,n){if(t!=="sidelight"&&t!=="sidelights")return null;let i=t==="sidelights",r=o-.04,s=Math.min(1.05,Math.max(.6,r-(i?.6:.3))),a=(r-s)/(i?2:1),l=n.sidelight_width??a,c=i?n.sidelight_width2??n.sidelight_width??a:0;l=Math.max(.1,l),c=i?Math.max(.1,c):0;let d=r-.5;if(l+c>d){let p=Math.max(0,d)/(l+c);l*=p,c*=p}return i?{panels:[[.02,.02+l],[o-.02-c,o-.02]],x0:.02+l,x1:o-.02-c}:(e?!!n.sidelight_hinge:!n.sidelight_hinge)?{panels:[[.02,.02+l]],x0:.02+l,x1:o-.02}:{panels:[[o-.02-l,o-.02]],x0:.02,x1:o-.02-l}}function jl(o,t){let e=o.width,n=jh(e,Uh(o,!1),t,o),i=n?.x0??0,r=n?.x1??e;return o.leaves!==2?(i+r)/2:t?i+(r-i)/4:r-(r-i)/4}function jn(o){o.energy={...Hh,...o.energy??{}},o.presence=o.presence??[],o.settings={...Nh,...o.settings,roof:{...Nl,...o.settings?.roof??{}}};for(let t of o.floors){t.outdoor=t.outdoor??[],t.walls=t.walls??[],t.rooms=t.rooms.map(n=>({...n,panel:n.panel??[]})),t.ha_floor=t.ha_floor??null,t.placements=t.placements.map(n=>({...n,mount:n.mount??null,rotation:n.rotation??0})),t.furniture=t.furniture.map(n=>({...n,entity:n.entity??null,power:n.power??null,...n.show_if&&!n.show_if.entity?{show_if:null}:{}}));let e=t.placements.filter(n=>n.entity_id.startsWith("light.")&&!n.pin);if(e.length){let n={ceiling:"lamp_ceiling",floor:"lamp_floor",table:"lamp_table",wall:"lamp_wall"};for(let i of e){let r=n[i.mount??"ceiling"],[s,a,l]=Rl[r];t.furniture.push({id:`lamp_${i.entity_id.slice(6).replace(/[^A-Za-z0-9_\-.]/g,"_")}`.slice(0,64),type:r,x:i.x,z:i.z,rotation:0,w:s,d:a,h:l,variant:null,entity:i.entity_id,power:null})}t.placements=t.placements.filter(i=>!i.entity_id.startsWith("light.")||i.pin)}t.openings=t.openings.map(n=>({...n,hinge:n.hinge??"left",leaves:n.leaves??1,swing:n.swing??"in",style:n.style??null,cover:n.cover??null,contact:n.contact??null,contact2:n.contact2??null,tilt:n.tilt??null}))}return o}function ql(o){return`${o}_${Math.random().toString(36).slice(2,10)}`}function Ht(o){let t=0;for(let e=0;e<o.length;e++){let[n,i]=o[e],[r,s]=o[(e+1)%o.length];t+=n*s-r*i}return t/2}function Sr(o){return Math.abs(Ht(o))}function _r(o,t){let e=1/0;for(let n=0;n<t.length;n++){let i=t[n],r=t[(n+1)%t.length],s=r[0]-i[0],a=r[1]-i[1],l=s*s+a*a,c=l>0?Math.max(0,Math.min(1,((o[0]-i[0])*s+(o[1]-i[1])*a)/l)):0;e=Math.min(e,Math.hypot(o[0]-i[0]-c*s,o[1]-i[1]-c*a))}return e}function Mr(o){let t=Rt(o);if(o.length<3||W(t,o)&&_r(t,o)>=.6)return t;let e=o.map(u=>u[0]),n=o.map(u=>u[1]),[i,r,s,a]=[Math.min(...e),Math.max(...e),Math.min(...n),Math.max(...n)],l=24,c=t,d=W(t,o)?_r(t,o):-1;for(let u=0;u<=l;u++)for(let p=0;p<=l;p++){let h=[i+(r-i)*u/l,s+(a-s)*p/l];if(!W(h,o))continue;let _=_r(h,o);_>d+1e-9&&([c,d]=[h,_])}return c}function Rt(o){let t=Ht(o);if(Math.abs(t)<1e-9){let i=o.length||1;return[o.reduce((r,s)=>r+s[0],0)/i,o.reduce((r,s)=>r+s[1],0)/i]}let e=0,n=0;for(let i=0;i<o.length;i++){let[r,s]=o[i],[a,l]=o[(i+1)%o.length],c=r*l-a*s;e+=(r+a)*c,n+=(s+l)*c}return[e/(6*t),n/(6*t)]}function Ne(o){let t=o.rotation*Math.PI/180,e=Math.cos(t),n=Math.sin(t),i=o.w/2,r=o.d/2;return[[-i,-r],[i,-r],[i,r],[-i,r]].map(([s,a])=>[o.x+s*e-a*n,o.z+s*n+a*e])}function W(o,t){let e=!1;for(let n=0,i=t.length-1;n<t.length;i=n++){let[r,s]=t[n],[a,l]=t[i];s>o[1]!=l>o[1]&&o[0]<(a-r)*(o[1]-s)/(l-s)+r&&(e=!e)}return e}var Kl={lamp_ceiling:"ceiling",lamp_downlight:"downlight",lamp_spot:"spot",lamp_panel:"panel",lamp_uplight:"uplight",lamp_bollard:"bollard",lamp_garden:"garden",lamp_pendant:"pendant",lamp_fan:"fan",lamp_floor:"floor",lamp_table:"table",lamp_wall:"wall",led_strip:"strip"};var qh=700,Gl="homeplan3d.unsaved",ve="4.0.2",Jl="floorplan-3d.unsaved",Ir=o=>o===ft?Gl:`${Gl}.${o}`;function Kh(o){try{let t=localStorage.getItem(Ir(o))??(o===ft?localStorage.getItem(Jl):null);return t?JSON.parse(t):null}catch{return null}}function qn(o,t){try{t?localStorage.setItem(Ir(o),JSON.stringify(t)):(localStorage.removeItem(Ir(o)),o===ft&&localStorage.removeItem(Jl))}catch{}}function Yl(o,t){return o&&t.some(e=>e.id===o)?o:ft}var cn=class{building=null;error=null;saveState="idle";saveError=null;backendVersion=null;draft=null;packs=[];packsLoaded=!1;planId=ft;plans=[];trash=[];locatePlan=ft;plansLoaded=!1;wanted=null;unsubscribePlans=null;host;hass=null;revision=-1;ownRevisions=new Set;unsubscribe=null;saveTimer;pending=null;saving=null;connected=!1;onVisible=()=>{document.visibilityState!=="visible"||!this.hass||this.pending||this.saving||this.reload()};constructor(t){this.host=t,t.addController(this)}setHass(t){let e=this.hass===null;this.hass=t,e&&this.connected&&this.start()}hostConnected(){this.connected=!0,typeof document<"u"&&document.addEventListener("visibilitychange",this.onVisible),this.hass&&this.start()}hostDisconnected(){this.connected=!1,typeof document<"u"&&document.removeEventListener("visibilitychange",this.onVisible),this.flush(),this.unsubscribe?.(),this.unsubscribe=null,this.unsubscribePlans?.(),this.unsubscribePlans=null}async switchPlan(t){if(!this.plansLoaded||!this.hass){this.wanted=t??null;return}let e=Yl(t,this.plans);this.wanted=e,!(e===this.planId&&this.building)&&(await this.flush(),this.unsubscribe?.(),this.unsubscribe=null,this.planId=e,this.building=null,this.revision=-1,this.ownRevisions=new Set,this.draft=null,this.saveState="idle",this.host.requestUpdate(),await this.reload(),await this.follow())}planName(t,e){return this.plans.find(i=>i.id===t)?.name||(t===ft?e:"?")}edit(t){this.building=t,this.pending=t,clearTimeout(this.saveTimer),this.saveTimer=setTimeout(()=>{this.flush()},qh),this.host.requestUpdate()}get frontendVersion(){return ve}get versionGap(){return!this.backendVersion||ve==="dev"||this.backendVersion===ve?null:Gh(this.backendVersion,ve)>0?"frontend":"backend"}get needsRestart(){return this.saveError&&/extra keys not allowed/i.test(this.saveError)?!0:!!this.backendVersion&&ve!=="dev"&&this.backendVersion!==ve}restoreDraft(){let t=this.draft;this.draft=null,t?.conflict&&qn(this.planId,null),t&&this.edit(jn(t.building))}discardDraft(){this.draft=null,qn(this.planId,null),this.host.requestUpdate()}async flush(){clearTimeout(this.saveTimer),this.saving&&await this.saving;let t=this.pending;if(!t||!this.hass)return;this.pending=null;let e=this.planId;for(let n of t.floors)for(let i of n.furniture)i.mount_y!=null&&i.mount_y>10&&(i.mount_y=10);this.saveState="saving",this.host.requestUpdate(),this.saving=(async()=>{try{let n=await Vn(this.hass,t,e,e===this.planId?this.revision:void 0);e===this.planId&&(this.ownRevisions.add(n),this.revision=n),this.saveState=this.pending?"saving":"saved",this.saveError=null,qn(e,null)}catch(n){if(Ja(n)&&e===this.planId){let i={building:t,savedAt:Date.now(),conflict:!0};qn(e,i),this.pending=null,this.saveState="idle",this.saveError=null,await this.reload(),this.draft=i,this.host.requestUpdate();return}this.saveState="error",this.saveError=Ql(n),qn(e,{building:t,savedAt:Date.now()})}this.host.requestUpdate()})(),await this.saving,this.saving=null}async start(){if(this.hass&&(ml(this.hass),await Promise.all([this.reloadPacks(),this.reloadPlans()]),this.planId=Yl(this.wanted??this.planId,this.plans),await this.reload(),await this.follow(),!this.unsubscribePlans&&this.connected))try{this.unsubscribePlans=await el(this.hass,t=>{this.takePlans(t),this.plans.some(e=>e.id===this.planId)||this.switchPlan(ft)})}catch{}}async follow(){if(this.unsubscribe||!this.connected||!this.hass)return;let t=this.planId;try{let e=await Xa(this.hass,n=>{t===this.planId&&(this.ownRevisions.has(n)||n===this.revision||this.pending||this.saving||this.reload())},t);t!==this.planId||this.unsubscribe?e():this.unsubscribe=e}catch{}}async reloadPlans(){this.hass&&this.takePlans(await tl(this.hass))}takePlans(t){this.plans=t.plans,this.trash=t.trash,this.locatePlan=t.locate_plan,this.plansLoaded=!0,this.host.requestUpdate()}packTries=0;packTimer;async reloadPacks(){if(this.hass){try{this.packs=await il(this.hass),this.packTries=0}catch(t){if(t?.code==="unknown_command")this.packs=[];else if(this.packTries<4){let e=[1500,4e3,1e4,3e4][this.packTries++];clearTimeout(this.packTimer),this.packTimer=setTimeout(()=>{this.reloadPacks()},e)}}xl(this.packs),this.packsLoaded=!0,this.host.requestUpdate()}}async reload(){if(!this.hass)return;let t=this.planId;try{let e=await Ro(this.hass,t);if(t!==this.planId)return;this.building=jn(e.building),this.backendVersion=e.version??null,this.draft===null&&!this.pending&&(this.draft=Kh(t)),this.revision=e.revision,this.error=null}catch(e){this.error=Ql(e)}this.host.requestUpdate()}};function Ql(o){return o&&typeof o=="object"&&"message"in o?String(o.message):String(o)}function Gh(o,t){let e=o.split(/[.-]/).map(i=>Number.parseInt(i,10)||0),n=t.split(/[.-]/).map(i=>Number.parseInt(i,10)||0);for(let i=0;i<Math.max(e.length,n.length);i++){let r=(e[i]??0)-(n[i]??0);if(r)return r}return 0}var Yh={view:"3D",editor:"Editor",all_floors:"All floors",no_building:"No floor plan yet.",no_building_admin:"No floor plan yet. Draw your first floor in the editor.",open_editor:"Open editor",phone_hint:"Drawing works best on a PC or tablet \u2013 on a phone you can look around and control your home.",loading:"Loading \u2026",load_error:"Loading failed",saving:"Saving \u2026",saved:"Saved",save_error:"Saving failed",save_failed_detail:"Saving failed: {error}. Your changes are kept in this browser.",needs_restart:"A new version of HomePlan 3D ({frontend}) is installed, but Home Assistant still runs {version}. Please restart Home Assistant \u2013 until then saving may fail.",needs_reload:"This page still shows HomePlan 3D {frontend}, Home Assistant already has {backend}. Please reload the page; in the companion app: Settings \u2192 Companion app \u2192 Reset frontend cache.",reload_page:"Reload",needs_restart_old:"A new version of HomePlan 3D is installed, but Home Assistant still runs an older one. Please restart Home Assistant \u2013 until then saving fails.",draft_found:"Unsaved changes from {time} found.",zoom_style:"When zooming in",zoom_late_early:"early",zoom_scope_all:"All rooms",zoom_scope_room:"Only the room",zoom_scope_hint:"What turns into the style while zooming in: every room, or only the room you zoom into or tap \u2013 the rest of the house keeps the look set",zoom_late_late:"late",zoom_late_hint:"When the style sets in while zooming in: early (already on an opened floor) to late (only close up in a room)",zoom_style_off:"When zooming in: stays",zoom_style_hint:"From afar the house keeps the look set, zooming into a floor or a room blends it into this style \u2013 without reloading. Works when Neon, Blueprint or Day is chosen above.",holo_more:"more",holo_less:"less",draft_conflict:"The plan was saved on another device meanwhile \u2013 this newer plan is shown now. Your change from {time} was made on the older one and is not saved.",draft_restore:"Restore and save",draft_discard:"Discard",walls_auto:"Tall walls",walls_cut:"Cut",plain_off:"With furniture",plain_on:"Floor plan only",plain_hint:"Floor plan only: walls, doors, windows and stairs without furniture \u2013 the devices stay.",reset_view:"Overview",back:"Back",floor:"Floor",floors:"Floors",floor_from_ha:"Floors from Home Assistant:",level:"Level {n}",elevation:"Elevation (m)",height:"Ceiling height (m)",cut_height:"Cut height (m)",show_menu:"Show",tool_menu:"Tool",view_menu:"View",fit:"Whole plan",room:"Room",rooms:"Rooms",room_id:"ID (card option room:)",area:"Area",x:"X (m)",z:"Y (m)",width:"Width (m)",depth:"Depth (m)",points:"Corners",feed_drain:"Bottom drain",hp_side_right:"right",hp_side_left:"left",hp_side_back:"back",wv_cat_base:"Base cabinets & boards",wv_cat_hang:"Hanging",wv_cat_tall:"Tall cabinets",wv_cat_living:"Seating & beds",wv_cat_light:"Lights",wv_cat_pack:"From your packs",wv_cat_energy:"Energy",delete:"Delete",settings:"Settings",furn_extra:"Extra value at the symbol (sensor, e.g. water temperature)",roof_basics:"Roof shape",pendant_shade:"Shade",pendant_globe:"Globe",pendant_cone:"Cone",pendant_drum:"Drum",pkg_kitchen_row:"Kitchen row",pkg_kitchen_row_desc:"Row on the back wall with fridge, oven, sink, dishwasher and stove, wall cabinet, dining table with pendant",pkg_kitchen_l:"L-shaped kitchen",pkg_kitchen_l_desc:"Rows at the back and left, kitchen island with bar stools",pkg_bath:"Bathroom",pkg_bath_desc:"Washbasin, WC, bathtub, washing machine, downlight",pkg_bedroom:"Bedroom",pkg_bedroom_desc:"Double bed with two nightstands, wardrobe, chest of drawers, ceiling light",pkg_living:"Living room",pkg_living_desc:"TV board, sofa, coffee table, rug, armchair, shelf, floor lamp, plant",pkg_dining:"Dining room",pkg_dining_desc:"Table with four chairs, sideboard, pendant",pkg_office:"Office",pkg_office_desc:"Desk with office chair, two shelves, ceiling light",pkg_kids:"Kids' room",pkg_kids_desc:"Single bed, desk, shelf, rug",pkg_hall:"Hall",pkg_hall_desc:"Coat rack, two downlights",cancel:"Cancel",confirm_switch:"Really switch {name}?",grid:"Grid (m)",background_edit_hint:"While the mode is on: dragging the picture moves it, the handle at the bottom right scales it. Fit the picture to the scale first, then turn it.",hint_select:"Tap a room to select \xB7 drag corners \xB7 \u201C+\u201D on an edge inserts a corner \xB7 arrow keys nudge \xB7 Del deletes \xB7 Ctrl+Z",hint_rect:"Drag to draw a rectangle",hint_polygon:"Place corners \xB7 tap the first corner or press Enter to close \xB7 Esc cancels",area_m2:"{a} m\xB2",mat_wood:"Wood",mat_oak:"Oak",mat_tiles:"Tiles",mat_carpet:"Carpet",mat_stone:"Stone",mat_concrete:"Concrete",card_name:"HomePlan 3D",card_description:"Your home in 3D (neon).",stats:"{calls} draw calls \xB7 {tris} triangles",stats_fps:"{fps} fps (slowest frame {ms} ms)",stats_idle:"At rest (0 fps)",stats_busy_camera:"camera",stats_busy_floors:"floors",stats_busy_openings:"doors/windows",stats_busy_flash:"flash",stats_busy_roof:"roof",stats_busy_flow:"power flow",stats_busy_effect:"colour effect",stats_busy_robot:"robot",stats_busy_orbit:"camera turn",stats_busy_tint:"room tint",stats_busy_solar:"solar modules",stats_busy_sound:"music",stats_low:"tablet level, pixel ratio {r}",stats_full:"full level, pixel ratio {r}",floors_apart:"Apart",floors_stacked:"Stacked",roof_keep:"Roof stays",roof_keep_hint:"The roof stays on the house while zooming in instead of lifting and fading out",floor_rooms_one:"1 room",floor_rooms:"{n} rooms",plan_main:"Home",plan_pick:"Choose floor plan",plan_all:"All floor plans",plan_new:"New floor plan",plan_manage:"Manage floor plans",plan_alerts_elsewhere:"{n} warning(s) in another floor plan",card_plan:"Floor plan",plan_lights_on:"Lights on",plan_open_now:"Windows and doors open",plan_open_n:"{n} open",plan_site:"Property",plan_alert:"{plan}: {text}",plan_alert_go:"Show",card_rooms:"Only these rooms",card_rooms_hint:"Tap rooms on the plan: the card then shows only them, with their furniture and devices \u2013 for the kids' tablet or a holiday flat, say. A single room opens with its devices beside it. Empty: the whole house.",card_rooms_leave:"Other rooms may be opened",card_rooms_leave_hint:"Unticked, the tablet stays in these rooms.",quality:"Quality",quality_auto:"Auto",quality_low:"Tablet",quality_high:"High",state_on:"On",state_off:"Off",state_open:"Open",state_closed:"Closed",state_opening:"Opening",state_closing:"Closing",state_playing:"Playing",state_paused:"Paused",state_idle:"Idle",state_locked:"Locked",state_unlocked:"Unlocked",state_detected:"Detected",state_clear:"Clear",state_unavailable:"Unavailable",state_heat:"Heat",state_cool:"Cool",state_auto:"Auto",state_heat_cool:"Heat/cool",state_dry:"Dry",state_fan_only:"Fan",devices:"Devices",panel_lights:"Lights",panel_covers:"Covers",panel_climate:"Heating",panel_media:"Media",panel_switches:"Switches",panel_sensors:"Sensors",panel_scenes:"Scenes & scripts",panel_cameras:"Cameras",camera_live:"Open live view",through_camera:"Look through the camera",through_blend:"Blend",through_back:"Back to the view",through_full:"Full screen",through_full_hint:"The camera picture on the whole screen (Esc or Back ends it). Where the browser cannot do this, Home Assistant's camera view opens \u2013 with sound there too.",camera_mount:"Mount",camera_mount_wall:"Wall (looks along its rotation)",camera_mount_ceiling:"Ceiling (dome, all round)",camera_fov_short:"Angle \xB0",camera_reach_short:"Reach m",camera_tilt_short:"Tilt \xB0",camera_popup_open:"Look through the camera",state_recording:"Recording",state_streaming:"Streaming",room_cleaning:"Cleaning (robot vacuum)",panel_clean:"Vacuum",panel_everything_off:"Everything off ({n})",panel_fold_open:"Show devices",panel_fold_close:"Fold",panel_fold_lights:"\u{1F4A1} {n} on",voice_clean_started:"The robot vacuum is on its way: {room}.",voice_clean_none:"{room} has no cleaning set (editor \u2192 room \u2192 Cleaning).",voice_off_done:"{room}: {n} devices off.",voice_off_nothing:"{room}: everything is off already.",voice_noroom:"Which room? Say e.g. \u201Cvacuum the kitchen\u201D, or set where the tablet hangs.",voice_noroom_open:"Tap into a room first, then \u201Cthere\u201D means it.",panel_all_off:"All off",panel_all_on:"All on",view_options:"View: quality, look, markers, FPS",panel_all_open:"All up",panel_all_close:"All down",central:"Central: all lights, blinds and favourites",central_house:"Whole house",central_lights:"Lights",central_covers:"Blinds",central_on:"On",central_off:"Off",central_open:"Up",central_close:"Down",central_sure:"Sure?",central_favorites:"Favourites",central_no_favorites:'No favourites yet. Set scenes, scripts and switches in the editor under "Favourites".',view_settings:"Settings",view_settings_admin:"Only administrators can change these settings \u2013 they apply to the whole house.",view_settings_look:"Look",glass_size:"Size of the glass cards",glass_size_hint:"Energy, heat pump, car, devices and the other glass cards in the 3D view",view_settings_alerts:"Warnings",view_settings_control:"Controls",view_settings_more:"Every other setting is in the editor under \u2699 Settings.",lines_add:"Add",lines_new:"New entry \u2026",sheet_mic:"Speak",sheet_listening:"Listening \u2026",sheet_mic_failed:"Nothing understood \u2013 the microphone needs HTTPS and a voice pipeline with speech-to-text.",card_central:"Star with the central menu",card_central_hint:"All lights and blinds of the floor or the house and the favourites from the editor.",bg_map_1:"Tap an outer corner of the house in the picture.",bg_map_2:"Now tap the next corner of the same outer wall in the picture.",bg_map_3:"Now tap the same first corner on the map's yellow outline.",bg_map_4:"And the second corner on the outline \u2013 the picture is turned, scaled and moved to fit.",thumbs_fold:"Fold the floor pictures into buttons",thumbs_show:"Show the floor pictures again",media_play_head:"Play",own_action_navigate:"Open a path",own_action_more_info:"Entity details",own_action_service:"Call a service",own_action_fire_dom_event:"fire-dom-event (browser_mod)",own_target_navigate:"Path",own_target_more_info:"Entity",own_target_service:"Service (domain.service)",panel_no_area:"This room is not linked to an area. You can link it in the editor.",panel_empty:"No devices of this room are in the plan. In the editor, place devices or pick them for the room panel with \u2606.",close:"Close",walk_start:"Walk through the house",walk_title:"Walk",walk_end:"End",walk_hint:"Drag: look around \xB7 tap the floor: walk there \xB7 W A S D / arrow keys or the stick: walk \xB7 Esc: end",card_next:"next step \u2026",card_step_hole:"Through a hole",card_step_fit:"Put in",card_step_end:"Or to its end",card_lay:"Lay it",card_hole_out:"outwards",card_hole_in:"inwards",card_to:"Connect to",card_through:"Through (in order, if needed)",card_group_pool:"At the pool",card_group_tech:"Equipment",card_group_joints:"T- and Y-pieces",card_group_holes:"Holes",card_open:"Connections",card_open_other:"Open this part's card",card_port:"Connection",card_via:"through",card_reroute:"Lay anew",card_disconnect:"Disconnect",card_with:"connect to \u2026",card_connect:"Connect",card_connect_with:"Connect to \u2026",card_status:"{a} of {b} connected",card_show_plan:"Show in the plan",card_show_wall:"Show in the wall view",port_suction:"suction side",port_pressure:"pressure side",port_pump:"from the pump",port_return:"return",port_waste:"waste",port_in:"in",port_out:"out",port_out1:"out 1",port_out2:"out 2",port_used:"in use",joint_tee:"T-piece {n}",joint_y:"Y-piece {n}",joint_wall:"Hole {n} (wall)",joint_floor:"Hole {n} (floor)",wall_kit_hole_wall:"Hole in the wall",wall_kit_hole_floor:"Hole in the floor",wall_kit_tee:"T-piece",wall_kit_y:"Y-piece",valve_top6:"Six-way valve on top",valve_side6:"Six-way valve at the side",valve_four:"Four-way valve",conn_add:"Add a pipe",conn_from:"From",conn_via:"Through (in order)",conn_add_via:"+ hole, ball valve, sight glass \u2026",conn_to:"To",conn_and:"And to (a second end, with a T-piece before)",conn_choose:"choose \u2026",conn_create:"Lay it",conn_hint:"The way is laid by itself \u2013 inside from connection to connection, outside at right angles under the ground. Fine-tune it in the wall view and the plan.",brightness:"Brightness",color_temp:"Colour temperature",color:"Colour",position:"Position",cover_open:"Open",cover_stop:"Stop",cover_tilt:"Slats",cover_tilt_open:"Slats open",cover_tilt_close:"Slats closed",cover_close:"Close",target_temp:"Target",current_temp:"Current",temp_down:"Cooler",temp_up:"Warmer",volume:"Volume",play_pause:"Play/pause",previous:"Previous",next:"Next",run:"Run",details:"Details",hold_hint:"Tap toggles \xB7 long press opens details",qm_off:"Off",find:"Search",find_placeholder:"Where is \u2026? Device or room",find_none:"Nothing found",swipe_off:"Off",card_section_view:"View",card_size:"Size",card_size_fixed:"Fixed height",card_size_fill:"Fill the screen",card_fill_hint:"Works best in a dashboard view of the type \u201CPanel (single card)\u201D \u2013 the card then takes all the space.",card_controls:"Switches in the card",card_floor_thumbs:"Floors as miniatures",card_floor_thumbs_hint:"Small pictures of the floors at the side \u2013 tap one to switch",card_floor_thumbs_hint_start:"The chosen floor is then where the card starts \u2013 the pictures at the side switch to the others",card_room_names:"Show room names",card_surroundings:"Show the surroundings from the map",card_surroundings_hint:"Off: this card shows the house without the neighbours' houses, streets and trees \u2013 calmer on a small screen and lighter for weak devices.",card_section_kiosk:"Wall tablet (kiosk)",card_section_features:"Features",card_weather_plan:"as set in the plan",card_pro_hint:"Motion trail and weather can be switched on here.",card_idle_return:"Back to the start view after",card_idle_off:"Never",card_idle_min:"{n} min without a touch",card_idle_hint:"After the wait the card closes the room and shows the start view again.",card_night:"Night dimming",card_night_off:"Off",card_night_sun:"By the sun",card_night_time:"Time range",card_night_range:"Time range (e.g. 22:00-06:00)",card_idle_orbit:"Camera turn as screensaver",card_idle_orbit_hint:"After the return the view turns slowly until someone touches the tablet",card_dashboard:"Button to a dashboard (path)",card_dashboard_label:"Label of the button",card_dashboard_hint:"A button at the top right of the card opens the dashboard or view with this path, e.g. /lovelace/home or /dashboard-house/0. Without a label it shows \u2302.",card_alerts:"Show warnings",card_alerts_hint:"Smoke, gas, CO, water, alarm panel and windows open in the rain: the room pulses, a note appears at the top",card_alert_jump:"Jump to the room of a new warning",card_alert_jump_hint:"The view switches to the floor and room of the warning by itself",director:"Live director",director_motion_off:"Off",director_motion_person:"People only",director_motion_all:"Any motion",voice:"Voice control",aliases:"Further names for the voice",voice_showing:"Showing {name}.",screen_name:"Screen name (for Assist)",screen_name_placeholder:"e.g. Kitchen",screen_name_hint:'Asking Assist ("Show the living room") or an automation calling the service homeplan3d.ask reaches every open NeonPlan view. When the service names a screen, only the view with that name reacts.',card_voice_area:'Room for "here"',card_voice_area_none:"None (the device's setting)",card_voice_area_hint:'When the tablet with this dashboard hangs in a room, sentences without a room name ("Lights on", "Turn off the lights here") apply to this area. Without a choice, the room set on the device itself counts.',voice_button:"Speak",voice_listen:"Listening \u2026",voice_none:"Nothing understood",voice_silent:"The microphone gives only silence. Usually another app holds it \u2013 in Fully Kiosk switch off the acoustic motion detection (Motion Detection \u2192 Acoustic Detection) and reload.",voice_no_pipeline:"No speech to text set up in Assist (Settings \u2192 Voice assistants).",voice_denied:"Microphone not allowed \u2013 only over https and with the permission in the browser or in Fully Kiosk.",voice_error:"Voice control: {msg}",card_voice:"Voice control (microphone button)",card_voice_hint:"\u201CShow the living room\u201D shows the room, other sentences go to Assist. Needs https and an allowed microphone",voice_sentences_distinct:'Only distinct ones ("Show \u2026", "Ask the house \u2026", "NeonPlan, \u2026")',voice_sentences_all:"All questions (also takes sentences Home Assistant answers itself)",voice_sentences_off:"None (default \u2013 no sentence file)",backdrop:"Background",backdrop_look:"The look's sky (default)",backdrop_gradient:"Gradient",backdrop_image:"Picture",card_director:"Live director (Camera Cockpit)",card_director_hint:"The card shows by itself what happens. Which events, you choose in the editor under \u201CLive director\u201D.",card_scenes:"Scene buttons in the room",card_scenes_hint:"Scenes and scripts of the area as buttons under the 3D view while a room is selected",card_motion_trail:"Motion trail",card_camera_wall:'"Cameras" button (camera wall)',card_camera_wall_hint:"A button at the bottom of the card opens the camera wall with every live picture (Pro: camera cockpit).",card_motion_trail_hint:"Where motion was reported in the last 30 minutes, with times (motion, presence and camera sensors)",trail_short:"Trail",cameras_short:"Cameras",camera_wall_title:"Camera wall",camera_wall_hint:"Camera wall: every live picture at once; a tap shows one picture big, a red frame shows motion",camera_wall_all:"All cameras",camera_still:"still, refreshed every {s} s",camera_wall_big:"Show the picture big",detect_person:"Person",detect_car:"Vehicle",detect_pet:"Animal",detect_motion:"Motion",weather_short:"Weather",weather_entity:"Weather entity",rain_warning:"Warning: window open while it rains",sun_patches:"Sunlight through the windows",sun_shadow:"Sun arc and house shadow",tap_in_room:"Switch devices only in the opened room",tap_in_room_hint:"In the house and floor views a tap on a device opens its room instead of switching it \u2013 so a tap meant for the floor does not move a blind by accident. In the opened room nothing changes; a long press opens the menu everywhere.",right_click_back:"Right click goes one step back",right_click_back_hint:"A short right click in the 3D view closes the room or goes from the floor back to the house. Off: a right click works like a click.",sun_shadow_hint:`An arc over the house shows the sun's way today with sunrise and sunset, and the house's shadow lies on the ground and moves with the sun. Needs the north direction; on the "Tablet" level only the arc.`,sky:"Real sky",sky_hint:"A sky behind the house that follows the real sun: sunset colours, stars that move through the night and the moon in its real phase. With \u201CWeather outside\u201D clouds drift with the wind. Off with an own background and in the blueprint look; a still picture on the \u201CTablet\u201D level.",flyin:"Fly in from space",flyin_hint:"When the view opens, a neon globe turns to your home and dives in while the camera comes down onto the house. Once per page load; a tap skips it. Not in the editor and not on the \u201CTablet\u201D level.",sun_arc:"Sun arc around",sun_arc_house:"the house",sun_arc_plot:"the whole plot",sun_arc_hint:"Where the sun arc and the compass ring stand: around the house (default) or around everything drawn \u2013 rooms, outdoor areas, fences and free walls.",window_glow:"Windows glow outside at night",window_glow_hint:"When it is dark outside, the light of lit rooms falls out of the windows as a warm glow onto the lawn and terrace in front \u2013 in the room's light colour, fainter behind lowered blinds.",gpu_safe_note:"In this browser the sun arc, the house shadow and the window glow at night are off: the graphics were lost right after the start. The next NeonPlan version tries again.",weather_effect_rain:"Rain",weather_effect_snow:"Snow",weather_effect_fog:"Fog (greys the scene)",weather_effect_clouds:"Clouds dim the sky and the sun",weather_effect_lightning:"Lightning in storms",weather_effect_sky:"Sun and moon in the sky",weather_hint:"Weather outside: rain, snow, fog and clouds from the weather entity, sun and moon from sun.sun",card_weather:"Weather outside",card_weather_hint:"Rain, snow, fog and clouds from the first weather entity (weather_entity picks another); only the clouds on the tablet level",trail_hint:"Motion trail: where motion was reported in the last 30 minutes, with times",alerts:"Warnings",alert_smoke:"Smoke: {name}",alert_gas:"Gas: {name}",alert_co:"Carbon monoxide: {name}",alert_water:"Water: {name}",alert_alarm:"Alarm triggered",alert_alarm_pending:"Alarm pending",alert_window_rain:"Window open in the rain: {name}",alert_power_outage:"Power outage: {name}",alert_contact_unavailable:"Contact unavailable: {name}",alert_short_contact_unavailable:"Contact unavailable",alert_unavailable:"Warn when a window or door contact is unavailable",alert_unavailable_hint:'When a contact has been "unavailable" for 10 minutes (empty battery, out of radio reach), the window looks shut in 3D although nobody knows. Then a warning shows.',alert_names:"Show device names in warnings",alert_names_hint:'On: "Kitchen \xB7 Smoke: Kitchen smoke detector". Off: just "Kitchen \xB7 Smoke" \u2013 shorter on a wall tablet. Without a room the device name stays.',alert_short_smoke:"Smoke",alert_short_gas:"Gas",alert_short_co:"Carbon monoxide",alert_short_water:"Water",alert_short_alarm:"Alarm triggered",alert_short_alarm_pending:"Alarm about to trigger",alert_short_window_rain:"Window open in the rain",alert_short_power_outage:"Power outage",power_outage:"Power outage",room_names_short:"Room names",floor_stack_short_dim:"Dimmed",floor_stack_short_stacked:"Stacked",floor_stack_short_single:"Alone",size_short_w:"W",size_short_d:"D",size_short_h:"H",card_floor_stack:"Floors below",floor_stack_dim:"Dimmed",floor_stack_stacked:"Stacked (the house up to here)",floor_stack_single:"Hidden (only this floor)",card_control_walls:"Tall walls/cut",card_control_floors:"Floors apart",card_control_temperature:"Temperature",card_control_humidity:"Humidity",card_control_co2:"CO\u2082",card_controls_hint:"Tall walls/cut, floors apart and temperature, humidity, CO\u2082 to switch",controls_hide:"Hide the controls \u2013 only the 3D view remains",nav_wrap:"Wrap the bar: every floor and room on several lines",nav_row:"Bar in one line (scrolls sideways)",controls_show:"Show the controls again",card_controls_hidden:"Start with the controls hidden",card_pets:"Show the pets",card_ghost:"Show the Halloween ghost",card_ghost_hint:"Fun pack Halloween: the ghost floats through this card's house too (e.g. switch it off on the wall tablet)",card_pets_hint:"Fun pack Pets: show the animals set up in this card (e.g. switch them off on the wall tablet)",card_controls_hidden_hint:"Only the 3D view; an eye at the bottom left brings bars, values and switches back",card_controls_hide_after:"Hide the controls after",card_hide_after_s:"{n} s without a touch",card_fullscreen_button:"Full screen button",card_fullscreen_button_hint:"Hides the dashboard around the card (e.g. on a wall tablet)",fullscreen:"Full screen",fullscreen_exit:"Exit full screen",card_section_show:"Show",card_floor:"Floor",card_floor_house:"Whole house (tap a floor to open it)",card_height:"Height (pixels)",card_walls:"Walls",card_quality_hint:"\u201CTablet\u201D is the lightest setting \u2013 ideal for Fire tablets and other wall tablets.",card_flows_switch:"Switch in the card",card_flows_on:"Always on",card_flows_off:"Always off",holos:"Holograms",holos_hint:"Show or hide the holograms of the plant and the devices",card_energy:"Show energy values at the top (Energy Pro)",card_room_panel:"Room details on tap",card_room_panel_hint:"The room's lights, blinds and cameras in a side panel",card_explode:"Pull floors apart in the house view",card_roof:"Show the roof",card_roof_hint:"Off: the house shows without its roof, as if it had none \u2013 the rooms lie open (solar fields on the roof go with it)",card_roof_fade:"Fade the roof out while zooming in",card_roof_fade_hint:"Off: the roof stays on the house even when the camera comes close.",card_templates:"Card templates",card_templates_intro:"Set up a dashboard card here once, e.g. \u201CKitchen Fire tablet\u201D. On the tablet you only pick the template in the card dialog. When you change it here, every tablet with this template follows by itself.",card_templates_empty:"No template yet. Create the first one with \u201C+ New template\u201D.",card_templates_no_editor:"The card editor could not be loaded. Reload the page (Ctrl+F5).",card_template_new:"New template",card_template_new_name:"New template",card_template_copy_name:"{name} (copy)",card_template_delete_ask:"Delete the template \u201C{name}\u201D? Cards using it then carry on with their own settings.",card_template_reloaded:"Reload sent: the open screens reload within the next seconds.",card_template_reload_failed:"Reload failed. Does NeonPlan in Home Assistant run this version yet (restart after an update)?",card_template_reload_all:"Reload all screens",card_template_reload_hint:"Reloads every open NeonPlan view, e.g. after an update. In automations: the action \u201Chomeplan3d.reload_screens\u201D.",card_template_name:"Name",card_template_duplicate:"Duplicate",card_template_preview:"Preview",card_template_preview_off:"Preview off",card_template_preview_on:"Show preview",card_template_where:"Where does the tablet hang?",card_template_where_hint:"The room for \u201Chere\u201D: \u201CTurn on the lights here\u201D then applies to this area, even when the card always shows the ground floor.",card_template_reloading:"Reloading \u2026 (a few seconds)",screen_reloading:"Reloading \u2026",card_template_open:"Edit in the NeonPlan editor",card_template_make:"Create a template in the NeonPlan editor",card_template_screen:"Screen",card_template_screen_tablet:"Tablet 10\u2033 landscape (Fire HD 10)",card_template_screen_small:"Tablet 7\u2033 landscape (Fire 7)",card_template_screen_upright:"Tablet upright",card_template_screen_phone:"Phone",card_tab_for:"General",card_templates_screens:"Screens",card_templates_phones:"Phones",card_templates_none:"None yet",card_template_use_title:"How to use the template on a dashboard",nav_lights:"Lights",nav_climate:"Heating",nav_page:"Page",nav_all_on:"All on",nav_all_off:"All off",nav_dev_on:"On",nav_dev_off:"Off",card_phone_place:"Own place {n}",card_phone_place_none:"None",card_phone_place_lights:"Lights \u2013 all lamps by floor",card_phone_place_climate:"Heating \u2013 all thermostats by floor",card_phone_place_action:"Run a scene or script",card_phone_place_link:"Open a dashboard page",card_phone_place_name:"Name in the bar (empty: automatic)",card_phone_place_icon:"Symbol (an emoji, empty: automatic)",card_phone_place_entity:"Scene or script",card_phone_place_path:"Path inside Home Assistant",card_phone_place_hint:'Up to two places of your own stand in the bar before "More". A place with no matching devices in the house stays away.',card_for:"What is the card for?",card_for_large:"Tablet or large screen",card_for_phone:"Phone",card_for_large_hint:"The house large in the picture, with the switches, room bar and floor pictures you choose \u2013 for a wall tablet, a PC or a TV.",card_for_phone_hint:"The card fills the screen and gets a bar at the bottom for the thumb: Now, Rooms, Blinds, More. The card's own switches, room bar and floor pictures make way. Best on a dashboard view of its own.",card_section_phone:"The bar on the phone",card_phone_rooms:"Rooms",card_phone_rooms_hint:"The rooms by floor as tiles with lights, open windows and music; a tap jumps into the room.",card_phone_covers:"Blinds",card_phone_covers_hint:'All blinds of the house on one page, with "All up" and "All down".',card_phone_favorites:"Favourites on top of the list",card_phone_favorites_hint:`The house's favourites as buttons above "What's going on?".`,card_phone_solo_hint:'A room you jump into stands alone in the picture. Each device can change this for itself under "More".',card_phone_start_now:"Start with the list",card_phone_start_now_hint:`The card opens with "What's going on?" instead of the house.`,card_template_new_large:"For a tablet / large screen",card_template_new_phone:"For a phone",card_template_new_name_phone:"Phone",card_template_preview_look:"Turn, zoom and open rooms as on the card. The preview switches nothing.",card_template_where_other:"Other areas",card_template_voice_off:"The microphone button is off in this template. Without it the tablet does not listen.",card_template_voice_on:"Turn on the microphone button",card_template_own:"This card still has old settings that no longer apply with the template: {list}.",card_template_own_clear:"Tidy up (keep only the template)",card_template_mode:"Changes:",card_template_live:"Straight to the tablets",card_template_manual:"Send with a button",card_template_pending:"Not sent yet: the tablets show the old state, the preview the new one.",card_template_publish:"Send to the tablets",card_template_discard:"Discard",card_template_published:"Sent: the tablets show the new state now.",card_template_preview_big:"Large",card_template_preview_small:"Small",card_template_use:"How to use it: add the NeonPlan card on the tablet and pick the template at the top, or in YAML:",card_template_copy:"Copy",card_template_copied:"Copied.",card_template_reload:"Reload screens with this template",card_template:"Template",card_template_none:"None \u2013 set it up here",card_template_hint:"Card templates are made in the NeonPlan editor under \u2699 Settings \u2192 Card templates. Then you only pick one here.",card_template_on:"This card follows its template. Change it in the NeonPlan editor under \u2699 Settings \u2192 Card templates; every tablet takes it over by itself.",card_template_missing:"The card template \u201C{name}\u201D is no longer in the plan. The card uses its own settings.",card_plain:"Floor plan only (no furniture)",room_bar:"Room bar",room_bar_hint:"A card per room at the bottom: temperature, open windows, what plays and a light switch. A tap flies into the room. The top then keeps only the floors; the eye leaves the bar in place.",room_bar_none:"No room bar",room_bar_rooms:"Room bar",room_bar_all:"+ favourites",room_bar_hide:"Fold the room bar away",room_bar_on:"On",room_bar_off:"Off",room_bar_light:"Light",room_bar_activate:"Activate",room_bar_lights:"{n} on",room_bar_lights_off:"Switch the room's lights off",room_bar_open:"open",room_bar_playing:"playing",card_room_bar:"Room bar at the bottom",card_room_bar_favorites:"Favourites in the room bar",card_room_bar_favorites_hint:"Scenes, scripts and switches from the favourites (Settings \u2192 Favourites) at the front of the bar.",show_if:"Only show while \u2026",card_stats:"Performance display (frames per second)",card_stats_hint:"To check how smoothly the card runs on the device",packs:"Furniture packs",lib_badge_light:"Lamp: links to a light and switches in 3D",lib_badge_electric:"Electric: links to an entity and a power sensor (switching, pictures, consumption)",lib_badge_hint:"Items with a symbol link to entities: lamps switch, screens show pictures, appliances show their consumption.",pro_feature_camera_cockpit:"Camera cockpit: look through the camera, motion trail, camera wall and detection pins (person, vehicle, animal)",pro_name_camera_cockpit:"Camera cockpit",pro_name_weather:"Weather outside",pro_name_screens:"Live screens",ext_tab:"Extensions",pet_kind_cat:"\u{1F431} Cat",pet_kind_dog:"\u{1F436} Dog",pet_kind_rabbit:"\u{1F430} Rabbit",pet_fur_orange:"Ginger",pet_fur_tabby:"Tabby",pet_fur_black:"Black",pet_fur_white:"White",pet_fur_grey:"Grey",pet_fur_brown:"Brown",pet_fur_calico:"Calico",pet_fur_golden:"Golden",pet_fur_cream:"Cream",pet_breed_dachshund:"Dachshund",pet_breed_pug:"Pug",pet_breed_terrier:"Terrier",pet_breed_labrador:"Labrador",pet_breed_shepherd:"Shepherd",pet_floor_auto:"Ground floor",manual:"Manual",pro_feature_weather:"Weather outside: rain, snow, clouds, sun and moon",pro_feature_screens:"Live screens: the media player's app colour and artwork, picture rules, camera live pictures on screens",pro_feature_energy_pro:"Energy Pro: power-flow lines through the house, living solar modules, glass holograms for the plant and for devices, today's gas and water use \u2013 heat follows as an update",pro_name_sound:"Sound & Cinema",pro_feature_sound:"Sound & Cinema: speakers show cover, title and volume as a glass card, sound rings around playing speakers, multiroom groups as lines, a quick menu with play, pause, track change and volume",pro_feature_auto_pro:'Car Pro: the car in its parking spot shows charge, range, charging, lock and climate from its integration \u2013 a light band in the charge colour, a pin with percent and kilometres, a quick menu with lock, climate and charging, "away" with its location',pro_name_time_travel:"Time travel",pro_name_pool:"Pool Pro",pro_feature_pool:"Pool Pro (module): the water glows in the colour of the pool light and moves while the filter pump runs; the glass card shows water temperature, heat pump with target, pH, chlorine/redox and salt with a traffic light; the cover slides over the water; warnings for pH, chlorine, salt and frost; the pool plant sets itself up at a tap and the water flows visibly through the pipes",pool_pump:"Filter pump",pool_ph:"pH value",pool_shape:"Shape",pool_shape_rect:"Rectangular",pool_shape_round:"Round",pool_shape_oval:"Oval",pool_shape_free:"Free",hint_pool:"Choose a shape and draw the pool \xB7 tap a pool to select it",pool_port_skimmer:"Skimmer",pool_port_drain:"Bottom drain",pool_port_inlet:"Inlet",pool_port_waste:"Waste drain",furn_pool_pump:"Filter pump",furn_pool_filter:"Sand filter",furn_pool_heat_pump:"Heat pump",furn_pool_dosing:"Dosing unit",furn_pool_valve:"Ball valve",valve_filter:"Filter",valve_backwash:"Backwash",valve_rinse:"Rinse",valve_waste:"Waste",valve_recirculate:"Recirculate",valve_closed:"Closed",pro_feature_time_travel:"Time travel: a time slider replays up to 7 days in the house \u2013 lights, doors, windows, blinds, motion, heating, weather and the sun, with event markers. View only, nothing is switched",tt_chip:"Time travel",tt_hint:"Replay up to 7 days in the house (view only, nothing is switched)",tt_badge:"TIME TRAVEL",tt_live:"Live",tt_live_hint:"Back to the present",tt_play:"Play",tt_pause:"Pause",tt_prev:"Previous event",tt_next:"Next event",tt_speed:"Speed: 1 hour in {s}",tt_now:"now",tt_ago:"{d} ago",tt_since:"since {time}",tt_loading:"Loading history \u2026",tt_error:"History not loaded: {error}",tt_retry:"Retry",tt_no_recorder:"Without Home Assistant's recorder there is no history.",tt_restart:"Please restart Home Assistant \u2013 only then does it know time travel.",tt_locked:"Time travel is not available right now.",tt_readonly:"Time travel: view only \u2013 nothing is switched",tt_ev_door:"{name} opened",tt_ev_garage:"{name} opened",tt_ev_lock:"{name} unlocked",tt_ev_alarm:"Alarm: {name}",tt_ev_smoke:"Smoke: {name}",tt_ev_outage:"Power outage",tt_ev_camera:"Camera detects motion: {name}",tt_ev_gas:"Gas: {name}",tt_ev_co:"Carbon monoxide: {name}",tt_ev_water:"Water: {name}",tt_ev_rain:"Window open in the rain: {name}",tt_ev_motion:"Motion at night: {name}",tt_ev_washer:"{name} done",tt_ev_robot_start:"{name} starts",tt_ev_robot_done:"{name} done",card_time_travel:'"Time travel" button',card_time_travel_hint:"A button at the bottom of the card replays the last hours and days (Pro: time travel).",card_room:"Start room",card_room_none:"None (floor or house)",card_walk:"Allow the walk",card_walk_hint:"The button for the walk through the house at eye height",card_tt_range:"Time travel starts",card_tt_range_24h:"24 hours ago",card_tt_range_7d:"a week ago",card_tt_speed:"Replay speed",card_tt_speed_day:"1 day in 6 s",car_charging:"Charging (power, state or switch)",car_climate:"Climate / preheating",car_away:"away",car_charging_short:"charging",car_lock_btn:"Lock",car_unlock_btn:"Unlock",car_unlock_confirm:"Really unlock the car?",car_climate_on:"Climate on",car_climate_off:"Climate off",car_charge_start:"Start charging",car_charge_stop:"Stop charging",car_no_controls:"No switchable entities found on the car (lock, climate, charge switch).",holo_media_playing:"playing",holo_media_paused:"paused",pack_missing_item:"Furniture of a removed pack",pack_error_not_a_pack:"This is not a furniture pack file.",pack_error_invalid_content:"The pack contains invalid furniture: {detail}",pack_error_too_large:"The file is too large.",pack_error_needs_update:"This add-on needs a newer version of HomePlan 3D. Please update first (Settings \u203A System \u203A Updates), restart Home Assistant, then install again.",hint_furniture:"Tap a room, then pick an item on the right \xB7 drag items, resize them by their corners",flows:"Power flow",flows_hint:"Show or hide glowing lines from the meter to the consumers",holo_title:"Solar & Energy",holo_live:"live",holo_pv_now:"PV now",holo_today:"Today",holo_peak:"Peak",holo_battery:"Battery",holo_grid:"Grid",holo_house:"House",holo_wallbox:"Wallbox",holo_autarky:"Self-sufficiency now",holo_house_now:"House now",furn_name:"Name (optional)",furn_mirror:"Mirror",furn_mirror_hint:"Swap left and right \u2013 the L-sofa the other way round, the cabinet with its door on the other side, the kitchen run mirrored.",furn_plant_card:"Show the plant card (hologram)",furn_plant_card_hint:"Energy Pro: every plant (an inverter with fields of its own) gets a glass card over its field \u2013 power, day curve, battery. Switch it off for this plant here.",furn_cable_to_grid:"Cable ends at the grid point",furn_cable_to_grid_hint:"Energy Pro: this inverter's cable runs to the grid point instead of the meter \u2013 for instance when the inverter and the grid connection are far from the house board.",flow_on:"on",flow_off:"off",hint_opening:"Tap a wall to add a door or window \u2013 choose its kind on the right afterwards",preset_door:"Door",preset_door_double:"Double door",preset_window:"Window",preset_window_double:"Double window",preset_terrace:"Terrace door",preset_terrace_double:"French doors",preset_garage:"Garage door",preset_front:"Front door",opening_style:"Style",sidelight_hinge:"Sidelight on the hinge side",sidelight_width:"Sidelight width (m)",style_auto:"Automatic ({style})",style_interior:"Room door",style_front:"Front door",style_front_glass:"Front door with glass",style_sidelight:"Front door with sidelight",style_sidelights:"Front door with two sidelights",style_glass:"Glass door",style_sliding:"Sliding door",style_passage:"Opening (no door)",style_standard:"Standard",style_bars:"With glazing bars",style_glass_wall:"Glass wall (fixed)",preset_glass_wall:"Glass wall",style_slide:"Sliding (one pane slides in front of the fixed one)",preset_terrace_slide:"Lift-and-slide door",preset_window_slide:"Sliding window",hint_measure:"Tap the starting point, then type the wall lengths with their direction on the right",dir_up:"Up",dir_down:"Down",dir_left:"Left",dir_right:"Right",hint_outdoor:"Drag to draw an outdoor area (lawn, terrace, pool \u2026)",outdoor_draw_type:"Draw:",outdoor_draw_type_hint:"What you draw next: lawn, terrace, path, pool \u2026 The type can still be changed in the form afterwards.",outdoor:"Outdoor area",out_lawn:"Lawn",out_terrace:"Terrace",out_path:"Path",out_driveway:"Driveway",out_bed:"Flower bed",out_hedge:"Hedge",out_fence:"Fence",out_wild:"Wild patch",out_pergola:"Pergola / frame",out_balcony:"Balcony",gate_kind_swing:"Garden gate (one leaf)",gate_kind_double:"Double gate (two leaves)",gate_kind_slide:"Sliding gate",slope_x:"right (+X)",slope_nx:"left (\u2212X)",slope_z:"down (+Z)",slope_nz:"up (\u2212Z)",roof:"Roof",roof_none:"No roof",roof_flat:"Flat roof",roof_gable:"Gable roof",roof_custom:"Roof sections (custom)",roof_sections:"Roof sections",roof_sections_hint:"Each roof section covers a rectangle of the house, e.g. the house, the barn or an extension \u2013 each with its own shape, ridge direction, eave height and pitch. Drag in the plan to draw a new one; tap selects it, dragging moves it, the corners resize it.",roof_sections_start:"Create roof sections from the rooms",roof_sections_regen:"Create again from the rooms",roof_sections_off:"Back to one roof",roof_regen_confirm:"Replace all roof sections with a new proposal from the rooms?",roof_section:"Roof section",roof_section_hint:"Heights count from the ground. A side with a lower eave reaches further down (catslide); pent roofs rise from the first side.",roof_shape_gable:"Gable",roof_shape_hip:"Hip",roof_shape_pent:"Pent",roof_shape_flat:"Flat",roof_shape_halfhip:"Half-hip",roof_shape_pyramid:"Pyramid",roof_shape_mansard:"Mansard",roof_shape_parapet:"Parapet",roof_shape:"Shape",roof_axis_x:"Ridge \u2194",roof_axis_z:"Ridge \u2195",roof_eave:"Eave (m)",roof_pitch_short:"Pitch (\xB0)",roof_pitch_upper:"Upper roof pitch (\xB0)",roof_height:"Height (m)",roof_base:"Top of walls (m)",roof_on_floor:"Sits on floor",roof_on_floor_hint:"Puts the section on this floor's wall tops; base and eaves move along. In the 3D view the roof belongs to this floor.",roof_base_hint:"Below the ceiling height of the floor underneath, that floor's walls end under the roof: knee walls at the eaves, gables up to the ridge, inner walls cut by the slope. Dashed lines in the plan show where 1.5 m and 2 m of headroom remain.",roof_ridge_height:"Ridge height",roof_side_top:"top",roof_side_bottom:"bottom",roof_side_left:"left",roof_side_right:"right",roof_end:"End",roof_end_auto:"as the shape",roof_end_gable:"Gable",roof_end_hint:"How the ridge ends at this end: a gable (an upright wall), a hip or a half-hip \u2013 a hip at one end only, for example.",roof_swap:"Swap sides",roof_turn:"Turn",roof_turn_hint:"Turns this roof part in the plan (clockwise), e.g. for a wing at an angle. Dormers and cross gables on it turn along. 0\xB0 = as before.",roof_open:"Canopy (posts instead of walls, see-through)",roof_open_short:"Canopy",roof_dormer:"Dormer",roof_dormer_hint:"A dormer on this side of the roof: 2 m wide, its front at the eave wall, eaves 1.4 m above the roof's eave, gable roof. Then move it and change its width and heights like any section; the main slope opens under it and the attic wall rises up to the dormer \u2013 a window fits there.",roof_outline:"Take the floor's outline",roof_outline_hint:"A flat roof as a free shape: takes the outline of the shown floor's rooms (L- or Z-shaped too) as one surface without seams. The corners can be dragged afterwards.",roof_points_hint:"Free shape: drag the corners in the plan. Back to the rectangle drops the shape.",roof_rect:"Back to the rectangle",roof_open_hint:"For a terrace roof or a carport: posts and beams carry the roof instead of walls, and it is see-through. Where the canopy meets the house wall, it rests on the wall.",roof_swap_hint:"Turns the roof round: the two sides swap eave and pitch, a pent roof rises the other way.",roof_pitch:"Roof pitch (\xB0)",roof_overhang:"Roof overhang (m)",roof_overhang_sides:"Overhang per side",roof_overhang_sides_hint:"Set the roof overhang for each side yourself. Off: automatic \u2013 no overhang where the section meets a taller part of the house.",roof_ridge:"Ridge",roof_ridge_long:"Along the long side",roof_ridge_short:"Along the short side (e.g. terraced house)",device:"Device",lamp_mount:"Lamp",lamp_ceiling:"Ceiling light",lamp_floor:"Floor lamp",lamp_table:"Table lamp",lamp_wall:"Wall light",marker_height:"Marker height (m)",height_auto:"Automatic height",panel_more:"More devices of the area ({n})",panel_less:"Show less",fps:"FPS",controls_side:"Where the floor pictures, star, search and eye sit",controls_left:"Controls on the left",controls_right:"Controls on the right",keep_view:"Keep view",angle_lock:"3D lock",angle_lock_hint:"The angle stays fixed: a drag moves the view, zooming still works \u2013 nobody turns the house by accident.",keep_view_hint:"Switching between the house and the floors keeps the camera where it is \u2013 only its height follows.",fps_title:"Performance display (frames per second)",hint_garage:"Tap a wall to add a garage door",opening_garage:"Garage door",hint_door:"Tap a wall to add a door",hint_window:"Tap a wall to add a window",opening_door:"Door",opening_window:"Window",opening_type:"Type",opening_position:"Centre from corner (m)",sill:"Sill height (m)",surround_err_busy:"The map servers are busy right now. Please try again in a few minutes.",surround_err_empty:"The map has no houses or streets for this place yet.",sill_board_auto:"automatic",sill_board_none:"none",sill_board_inside:"inside only",sill_board_outside:"outside only",opening_height:"Height (m)",blind_side:"Blind sits",sensor_kind_contact:"Window contact (open/closed)",sensor_kind_handle:"Handle sensor (open/tilted/closed)",sensor_kind_contact_tilt:"Contact + tilt sensor",handle_main:"Handle sensor main leaf",entity_auto:"Automatic ({name})",opening_hint:`Sensor type: window contact (reports open/closed), handle sensor (reports open, tilted and closed \u2013 e.g. a Homematic window handle) or contact + tilt sensor (a second sensor that only reports tilted). Automatic uses the blinds and contacts of the room's area. Position sensor: an entity reporting the blind's position while it moves (e.g. a Homematic "level", 0\u2013100 % or 0\u20131, open = high) \u2013 the blind then moves live in 3D.`,furniture:"Furniture",lib_room_living:"Living",lib_room_dining:"Dining",lib_room_kitchen:"Kitchen",lib_room_bedroom:"Bedroom",lib_room_kids:"Kids",lib_room_bath:"Bathroom",lib_room_office:"Office",lib_room_hall:"Hall",lib_room_utility:"Utility",lib_room_garage:"Garage",lib_room_garden:"Garden",lib_room_hobby:"Hobby & fitness",lib_kind_sofa:"Sofas",lib_kind_seating:"Seating",lib_kind_table:"Tables",lib_kind_storage:"Cabinets & shelves",lib_kind_bed:"Beds",lib_kind_kitchen:"Kitchen",lib_kind_appliance:"Appliances",lib_kind_bath:"Bathroom",lib_kind_lamp:"Lights",lib_kind_media:"TV & audio",lib_kind_office:"Office",lib_kind_tech:"Tech & smart home",lib_kind_heating:"Heating & climate",lib_kind_energy:"Energy",lib_kind_household:"Household",lib_kind_deco:"Decoration",lib_kind_plant:"Plants",lib_kind_outdoor:"Garden & outdoors",lib_kind_kids:"Kids",lib_kind_sport:"Fitness",lib_kind_pets:"Pets",lib_kind_vehicle:"Vehicles",lib_kind_stairs:"Stairs & railings",lib_kind_architecture:"Architecture",rotation:"Rotation (\xB0)",furn_sofa:"Sofa",furn_sofa_l:"Corner sofa (L-shaped)",furn_sofa_u:"U-shaped sofa",furn_armchair:"Armchair",furn_table:"Table",furn_chair:"Chair",furn_bed:"Bed",furn_nightstand:"Nightstand",furn_wardrobe:"Wardrobe",furn_shelf:"Shelf",furn_kitchen:"Kitchen unit",furn_worktop:"Worktop",furn_fridge:"Fridge",furn_fridge_smart:"Smart fridge (side by side)",furn_door_left:"Door sensor left (freezer side)",furn_door_right:"Door sensor right (fridge side)",furn_stove:"Stove",furn_sink:"Sink",furn_bathtub:"Bathtub",furn_shower:"Shower",furn_wc:"WC",furn_washbasin:"Washbasin",furn_desk:"Desk",furn_tv_board:"TV board",furn_plant:"Plant",furn_rug:"Rug",furn_stairs:"Stairs",furn_stairs_u:"U-stair with landing",furn_stairwell:"Floor opening",hint_wall:"Drag to draw a single wall (partition, half wall) \xB7 Shift keeps it straight \xB7 Alt without snapping",wall_heights:"Wall heights",style_group_custom:"Own styles",style_new:"Make an own style from it",style_own_suffix:"(own)",style_delete:"Delete style",style_name:"Name",style_builtin_hint:"A ready style. To adjust it, \u201CMake an own style from it\u201D \u2013 then every setting is there, and your style is in every style list.",style_show_beside:"Show in \u201C3D beside\u201D",style_natural:"Real materials (wood, tiles, wall colours)",style_dark:"Dark style \u2013 lines glow",style_line:"Lines",style_surface_dark:"Surfaces dark",style_surface_light:"Surfaces light",style_hue:"Share of colour",style_lift:"Base brightness",style_contrast:"Contrast",style_signal:"Active devices in colour",style_sun:"Light by direction",style_ao:"Room corners",style_shadows:"Contact shadows under furniture",style_floors:"Floor structure",style_cut:"Dark cut edges",style_dim:"Evening mood",style_bg_top:"Background top",style_bg_bottom:"Background bottom",style_times:"Times of day (house plan)",wall_exterior_short:"exterior wall",hint_hole:"Drag to draw a floor opening (stairwell, gallery)",hint_roof:"Drag to draw a roof section \xB7 tap selects \xB7 drag moves \xB7 corners resize",hint_energy:"Tap a solar field to select it \xB7 drag to move it, also onto another roof face \xB7 new fields with + Solar field on the right",furn_parking:"Parking spot",furn_group_vehicles:"Parking",furn_lamp_ceiling:"Ceiling light",furn_lamp_downlight:"Downlight",furn_lamp_spot:"Surface spot",furn_lamp_panel:"LED panel",furn_lamp_uplight:"Floor uplight",furn_lamp_bollard:"Path light",furn_lamp_garden:"Garden spot",furn_radiator:"Radiator",furn_robot_vacuum:"Robot vacuum",furn_entity_vacuum:"Robot vacuum",furn_robot_room:"Current room (sensor)",furn_lamp_pendant:"Pendant light",furn_lamp_floor:"Floor lamp",furn_lamp_table:"Table lamp",furn_lamp_wall:"Wall light",furn_led_strip:"LED strip",furn_group_lights:"Lights",furn_entity_light:"Light or switch",furn_color_entity:"Colour and brightness from (optional)",furn_color_entity_hint:"For lights that a relay (Shelly, switch actuator) turns on and off while the bulb itself knows its colour and brightness: on/off comes from the switch above, colour and brightness from this entity.",furn_entity_climate:"Heating (thermostat)",lamp_hint:"Tap the lamp in 3D to switch it, long press for the quick menu. Switches work too (e.g. a relay for the ceiling light) \u2013 the lamp shines while it is on. Table lamps stand on the furniture below them.",lamp_hint_pendant:"Height = drop below the ceiling. Tap in 3D to switch, long press for details.",theme:"Look",version_hint:"Installed version of HomePlan 3D \u2013 the frontend; the integration in Home Assistant reports {backend}",accent:"Accent colour",accent_hint:"An accent colour of your own: lines and glowing edges in the neon look, buttons and pins \u2013 \u21BA brings the neon cyan back",accent_reset:"Back to cyan",theme_neon:"Neon",theme_blueprint:"Blueprint",theme_day:"Day",theme_auto:"Auto (Day/Neon by the sun)",style:"Style",style_neon:"Neon",style_blueprint:"Blueprint",style_day:"Day",style_focus:"Night / Focus",style_synth:"Synthwave",style_cozy:"Homely",style_evening:"Homely evening",style_winter:"Winter evening",style_model:"Architect's model",style_pastel:"Pastel",style_warm:"Warm / Wood & paper",style_house:"House plan (day / evening / night)",style_group_neon:"Neon & classic",style_group_homely:"Homely \u2013 real materials",style_group_designed:"Designed",style_group_auto:"Automatic",style_set:"Style \u201C{name}\u201D is on.",style_reset:"Style back to the setting.",style_none:"\u2013 none \u2013",style_day_label:"By day",style_evening_label:"In the evening",style_night_label:"At night",style_switch:"Switch",style_switch_sun:"by the sun",style_switch_time:"by the clock",style_morning_at:"Day from",style_evening_at:"Evening from",style_night_at:"Night from",style_switch_hint:"By the sun: day while the sun is up, then evening until \u201CNight from\u201D. By the clock: the three times.",style_entity:"Style from a helper entity",style_entity_hint:"An input_select or input_text whose state names a style (e.g. \u201CHomely\u201D). While it names one, that style applies \u2013 automations can switch it.",theme_evening:"Style in the evening",theme_night:"Style at night",theme_schedule_hint:"Empty = the same style all day. It switches as set in the house plan (by the sun or the clock).",persons:"People",locate:"Locating",persons_figure:"Figure",persons_pin:"Pin",persons_off:"off",furnish:"Furnish",mount_height:"Height above the floor (m)",size_w:"Width (m)",size_d:"Depth (m)",size_h:"Height (m)",furnish_hint:"Drag furniture, lamps and devices \xB7 furniture snaps to walls \xB7 tap one to turn it, set its height and mount",done:"Done",heatmap:"Heatmap",heat_off:"Normal",heat_short_temperature:"Temp.",heat_short_humidity:"Humidity",heat_short_co2:"CO\u2082",heat_short_values:"Values",heat_temperature:"Temperature",heat_humidity:"Humidity",heat_co2:"CO\u2082",heat_values:"Values at the room names",heat_none_found:"No matching sensors in the rooms' areas.",markers:"Markers",markers_none:"None",markers_important:"Important",markers_all:"All",markers_room:"In the room",pin_size:"Symbol size",pin_size_small:"Small",pin_size_normal:"Normal",pin_size_large:"Large",furn_stool:"Stool",furn_coffee_table:"Coffee table",furn_tv_wall:"TV (wall)",furn_ac_unit:"Air conditioner (wall)",furn_awning:"Awning",furn_group_outdoor:"Terrace & balcony",bin_out:"Put out (helper)",bin_out_done:"put out \u2713",bin_out_mark:"Mark as put out",bin_next_only:"Label only the next pickup",bin_days:"Show tags only \u2026 days before",hh_service2:"{name}: {what} due",bin_none:"No pickup in sight",hh_title:"Today in the household",heat_sensor:"Heating (sensor)",heat_sensor_hint:'When the thermostat does not say whether it heats (Tuya valves report a "work state"), pick that sensor here: on/opened/heating or an opening above 0 % makes the radiator glow.',door_lock_btn:"Lock",door_unlock_btn:"Unlock",door_lock_confirm:"Really lock {name}?",door_unlock_confirm:"Really unlock {name}?",clock:"Clock",clock_off:"Off",clock_tl:"\u2196 clock",clock_tr:"\u2197 clock",clock_bl:"\u2199 clock",clock_br:"\u2198 clock",hh_left:"{t} left",hh_done:"Done!",hh_finished:"{name} is done",hh_thirsty:"Thirsty",hh_plant:"{name} needs water",hh_service:"{name}: service due",hh_fridge_open:"{name} is open",alert_fridge_door:"Fridge open: {name}",alert_short_fridge_door:"Fridge open",card_household:"Today in the household",card_household_hint:"Household Pro: glass card with bins, post, finished appliances, thirsty plants and service due",furn_waste_bin:"Waste bin",furn_mailbox:"Mailbox",furn_neon_sign:"Neon sign",sign_color:"Colour of the tubes",furn_wifi_ap:"Wi-Fi access point",furn_water_heater:"Water heater",wifi_ap_std:"On the ceiling",wifi_ap_wall:"On the wall",water_heater_std:"Standing tank",water_heater_wall:"Slim tank on the wall",ap_clients:"{n} clients",ap_offline:"Offline",pin_standby:"Standby",furn_lamp_fan:"Ceiling fan with light",furn_wall_switch:"Light switch",furn_wall_socket:"Socket",furn_group_switches:"Home technology",wv_cat_switches:"Switches",furn_group_household:"Household",bin_shape_bin120:"Wheelie bin 120 l",bin_shape_bin240:"Wheelie bin 240 l",bin_shape_bin1100:"Container 1100 l",bin_shape_multi:"Multi-compartment bin",bin_shape_bag:"Bag",bin_shape_caddy:"Caddy / pail",bin_shape_underground:"Underground container",bin_kind:"Waste",bin_kind_rest:"General waste",bin_kind_bio:"Food / organic",bin_kind_paper:"Paper",bin_kind_plastic:"Packaging / plastic",bin_kind_glass:"Glass",bin_kind_garden:"Garden waste",bin_kind_recycling:"Recycling",bin_kind_other:"Other",bin_color:"Colour",bin_lid:"Lid",bin_source:"Waste calendar or sensor",bin_match:"Word in the calendar (empty: by its waste)",bin_today:"Today",bin_tomorrow:"Tomorrow",bin_in_days:"in {n} days",mailbox_shape_wall:"Wall mailbox",mailbox_shape_pole:"Mailbox on a post (with flag)",mailbox_shape_pillar:"Post box with newspaper holder",mailbox_shape_parcel:"Parcel box",mailbox_shape_bank:"Mailbox bank",mailbox_door:"Sensor of the emptying door (optional)",mailbox_post:"Post",pro_feature_household:'Household Pro: bins glow the evening before their pickup (waste calendar or sensor), the mailbox while post is in it, plants when thirsty; washer, dryer and dishwasher show their time left and "Done!"; filters and consumables due glow yellow; open fridge doors warn; glass card "Today in the household"; plus the smart fridge (side-by-side, doors with sensors)',pro_name_frames:"Digital Picture Frames",pro_feature_frames:"Digital Picture Frames: frames on the wall show a slideshow, the calendar, a pin board, lists or a camera picture \u2013 a tap opens it large",curtain_side_both:"both sides",curtain_side_left:"left (seen from the front)",curtain_side_right:"right (seen from the front)",awning_pitch:"Fall (\xB0)",awning_valance:"Valance (fabric edge at the front)",awning_kind_arm:"Folding-arm awning (terrace)",awning_kind_drop:"Drop-arm awning (balcony, window)",awning_kind_vertical:"Vertical screen / ZIP (window, balcony)",awning_kind_pergola:"Pergola / conservatory awning",awning_kind_side:"Side awning (privacy screen)",awning_kind_arm_hint:"The classic over a terrace: folding arms push the fabric out with a slight fall. Depth = projection.",awning_kind_drop_hint:"The arms swing out and down from the wall, the fabric stretches at a slant in front. Depth = arm length, fall = how far the arms go below the horizontal.",awning_kind_vertical_hint:"The fabric runs straight down in side rails to the floor \u2013 in front of a window, a balcony railing or the front of a pergola. Height above the floor = the box's underside.",awning_kind_pergola_hint:"A fixed frame with posts at the front; the fabric runs out on top of its rails. Depth = to the posts, fall = the roof's slope.",awning_kind_side_hint:"A post with the rolled fabric on the left, the fabric pulls out sideways to the right up to the other post. Width = how far it pulls out, height above the floor = the fabric's height.",furn_glow_color:"Fixed colour in 3D",furn_glow_color_hint:"The lamp always glows in this colour in the plan, whatever colour the light reports \u2013 on/off and brightness still come from the light.",furn_only_color:"Glow only while the light shows this colour",furn_only_color_pick:"Colour",furn_only_color_hint:`The lamp only glows while the light shows about this colour \u2013 e.g. yellow for "water" at the washbasin. The same light's other colours stay dark here.`,furn_run_w:"Running from (watts)",furn_run_w_hint:"From how many watts at the power sensor the appliance counts as running and glows (empty: 10 W). For appliances behind a smart plug that draw a few watts on standby, e.g. 100.",furn_sideboard:"Sideboard",furn_table_round:"Round table",furn_bench:"Bench",furn_corner_bench:"Corner bench",furn_bar_stool:"Bar stool",furn_kitchen_wall:"Wall cabinet",furn_kitchen_tall:"Tall unit with oven",furn_island:"Kitchen island",furn_dishwasher:"Dishwasher",furn_bunk_bed:"Bunk bed",furn_dresser:"Chest of drawers",furn_washer:"Washing machine",furn_dryer:"Dryer",furn_office_chair:"Office chair",furn_tall_cabinet:"Tall cabinet",furn_coat_rack:"Coat rack",furn_group_living:"Living",furn_group_dining:"Dining",furn_group_energy:"Energy & solar",wallbox_charging:"charging",wallbox_plugged:"plugged in",furn_soc:"State of charge (%)",furn_export:"Export power (W, separate sensor, optional)",furn_export_hint:"If your meter reports import and export in two sensors (e.g. Growatt, Tibber Pulse), take the import sensor as power above and the export sensor here. A signed sensor does not need this.",furn_charge:"Charging power (W, separate sensor, optional)",furn_charge_hint:"If your battery reports charging and discharging in two sensors (e.g. Anker Solix), take the discharging sensor as power above and the charging sensor here. A signed sensor does not need this.",furn_wallbox_status:"Status (charging, plugged in)",roof_only_note:"\u{1F3E0} Roof: only roof sections and roof windows can be moved here; rooms and furniture are locked.",roof_windows:"Roof windows",roof_window:"Roof window",roof_windows_hint:"Roof windows lie in the roof face, with a blind and contacts like windows. Drag them in the plan, also onto another roof face.",roof_window_tilt:"Tilt contact",roof_window_name:"Name (optional)",roof_window_motor:"Window motor (cover, optional)",roof_window_float:"Show over the room without the roof",roof_window_float_hint:"When the roof fades out as you zoom in on a floor or a room, the window stays where it is over the room \u2013 open, tilted, with its blind. This works over rooms of the floor the roof sits on; where the slope reaches down over a lower floor, the windows stay in the roof. Off: it shows in the roof only.",roof_window_motor_hint:"A window motor (Velux, Roto, Fakro) reports its position as a cover: the sash opens in 3D as far as the motor stands. A contact or tilt contact still works without a motor.",roof_window_hint:"Open, the sash swings out, hinged at the top; tilted, a little; and the frame glows warm; the blind comes down over the glass from the top. In a roof section the window cuts a hole into the slope, so the attic looks out through it.",solar_align_left:"Left",solar_align_center:"Centre",solar_align_right:"Right",compass_n:"north",compass_ne:"north-east",compass_e:"east",compass_se:"south-east",compass_s:"south",compass_sw:"south-west",compass_w:"west",compass_nw:"north-west",furn_meter:"Electricity meter",furn_grid_point:"Grid connection",furn_model:"Model",inverter_std:"Standard (wall unit with display)",inverter_slim:"Slim and tall (light strip)",inverter_hybrid:"Hybrid (round dial, fans)",battery_std:"Tower (stacked modules)",battery_wall:"Wall battery (flat, hanging)",battery_cube:"Compact (balcony battery)",furn_inverter:"Solar inverter",furn_home_battery:"Home battery",furn_wallbox:"Wallbox",furn_group_kitchen:"Kitchen",furn_group_sleeping:"Sleeping",furn_group_bath:"Bath & laundry",furn_group_work:"Work & other",furn_entity:"Device (switch, plug \u2026)",furn_state_entity:"State from (optional)",furn_state_entity2:"Second state (the other half)",furn_state_split:"Halves",furn_state_left_right:"Left / right",furn_state_top_bottom:"Bottom / top (bunk bed)",furn_state_hint:"The item glows while the entity reports on, occupied or home \u2013 a bed with an occupancy mat, an armchair, the sauna. Two entities light the halves: left and right, bottom and top for a bunk bed.",furn_entity_tv:"TV (media player or smart plug)",fix:"Fix",lock_plan:"\u{1F512} Floor plan",start_view:"Start view",start_view_hint:"The 3D view, the card and the kiosk open the house with this view, e.g. from the garden side. Turn, zoom and move the house in the 3D pane on the right until it fits, then remember it.",start_view_card:"If a card should open with a different view, put this line into its YAML configuration.",start_view_set:"Remember the current 3D view as the start",start_view_reset:"Default",start_view_saved:"An own start view is saved.",climate:"Room climate",opening_mark:"Highlight in 3D",opening_mark_open:"When open",opening_mark_closed:"When closed (e.g. WC)",opening_mark_hint:"A highlighted window or door glows warm. \u201CWhen closed\u201D needs a contact; without a sensor nothing is highlighted.",marker_show_always:"Always show",marker_show_active:"Only while active",marker_show_no_power:"Without watts",marker_show_never:"Hide",card_marker_names:"Own names at the markers",card_marker_names_hint:"Every device with an own name shows it small under its marker \u2013 three thermometers in the garden stay apart.",furn_power:"Power sensor (W)",furn_meter_reading:"Meter reading (m\xB3 or litres)",furn_holo:"Hologram over the device (Energy Pro)",furn_holo_hint:"A glass card over the device with its power now, today's consumption and the day curve \u2013 in the house and the floor view. Needs a power sensor.",holo_dev_now:"now",furn_links_hint:"With a power sensor the item shows its watts and gets an energy cable.",furn_links_hint_tv:"The screen glows while the TV is on, in the colour of the app (Netflix, YouTube \u2026); the label shows the app or title.",floor_lights:"{n} lights on",now_title:"What's going on?",now_open_one:"1 window or door open",now_open:"{n} windows and doors open",now_tilted:"tilted",now_unlocked_one:"1 door not locked",now_unlocked:"{n} doors not locked",now_home:"At home",now_away:"Away",now_nobody:"Nobody at home",now_lights_one:"1 light on",now_lights:"{n} lights on",now_battery:"Battery",now_car_away:"away",now_calm:"All is well",now_calm_away:"You are away \u2013 all is well at home",now_calm_detail:"No warning, nothing open, nothing to do.",now_try:"New for phones: \u201CWhat's going on?\u201D \u2013 your home at a glance.",now_try_yes:"Try it",now_try_no:"No thanks",now_lights_off:"All off",now_lock:"Lock",now_check:"House check",now_check_hint:"Before leaving or going to bed: look at everything open or switched on, one after another, and switch it off.",now_next:"Next",now_done:"Done",now_check_done:"House check done",now_check_nothing:"All shut, all off.",now_window_hint:"shut it by hand",now_all_lights_off:"All {n} lights off",nav_now:"Now",nav_rooms:"Rooms",nav_covers:"Blinds",nav_more:"More",nav_whole_floor:"Whole floor",nav_all_up:"All up",nav_all_down:"All down",nav_house:"Whole house",nav_solo:"Room on its own",nav_solo_hint:"A room you jump into stands alone in the picture, without the rest of the house.",nav_off:"Phone view off",now_setting:"Phone view",now_setting_hint:"The house without its header, and a bar at the bottom: Now (what is going on, with \u201CAll off\u201D and the house check), the rooms by floor, the blinds and More.",floor_open:"{n} open",floor_persons:"{n} people",energy_consumption:"Consumption",energy_grid_import:"Grid import",energy_grid_export:"Export",energy_solar:"Solar",energy_battery:"Battery",energy_tariff:"Tariff",energy:"Energy",holo_gas:"Gas",holo_water:"Water",holo_today_short:"today",tool_meter:"Meter",hint_meter:"Tap the spot of the meter",presence:"Presence"},Qh={};function E(o,t,e={}){let i=Yh[t]??Qh[t]??t;for(let[r,s]of Object.entries(e))i=i.replace(`{${r}}`,String(s));return i}function nt(o,t,e=2){return t.toLocaleString(o?.language??void 0,{maximumFractionDigits:e})}var Jh={light:"light",switch:"switch",input_boolean:"switch",fan:"fan",cover:"cover",climate:"climate",media_player:"media",lock:"lock",sensor:"sensor",binary_sensor:"binary",camera:"camera",scene:"scene",script:"script"},Xh=new Set(["temperature","humidity","power","carbon_dioxide","energy","gas","water","volume","volume_storage","volume_flow_rate","illuminance","pressure","atmospheric_pressure","pm1","pm25","pm10","volatile_organic_compounds","volatile_organic_compounds_parts","carbon_monoxide","nitrogen_dioxide","moisture","sound_pressure","ph","conductivity"]),Zh=new Set(["m\xB3","m3","L","l","kWh","Wh","MWh","lx","mV","mg/L","mg/l","ppm","\xB5S/cm","\u03BCS/cm","mS/cm"]),tf=new Set(["door","window","opening","garage_door","motion","occupancy","presence","smoke","moisture","gas","carbon_monoxide"]),Do=["light","cover","climate","media","switch","fan","lock","binary","sensor","camera","scene","script"],sc=new Set(["light","switch","fan"]);function ac(o){return o.slice(0,o.indexOf("."))}function L(o){return Jh[ac(o)]??null}function Xl(o){return o!==null&&o!=="scene"&&o!=="script"}var ef=new Set(["shutter","garage","gate","door","curtain","awning","window","shade"]);function Lo(o){return!o||!(((o.attributes.supported_features??0)|0)&48)?!1:typeof o.attributes.current_tilt_position=="number"||!ef.has(String(o.attributes.device_class??""))}function Tr(o,t){let e=(o?.attributes.supported_features??0)|0;return e!==0&&!(e&3)&&(e&176)!==0?t==="stop"?{service:"stop_cover_tilt",data:{}}:e&(t==="open"?16:32)?{service:t==="open"?"open_cover_tilt":"close_cover_tilt",data:{}}:{service:"set_cover_tilt_position",data:{tilt_position:t==="open"?100:0}}:{service:t==="open"?"open_cover":t==="close"?"close_cover":"stop_cover",data:{}}}function Vo(o,t,e){let n=new Map;for(let i of t){let r=Tr(o.states[i],e),s=`${r.service}|${JSON.stringify(r.data)}`,a=n.get(s)??{...r,ids:[]};a.ids.push(i),n.set(s,a)}return[...n.values()].map(i=>({service:i.service,data:{...i.data,entity_id:i.ids}}))}function nf(o,t){let e=new Set,n=t;for(;n&&!e.has(n);){e.add(n);let i=o.devices?.[n];if(!i)return null;if(i.area_id)return i.area_id;n=i.parent_device_id}return null}function Ct(o,t){let e=o.entities?.[t];return e?e.area_id?e.area_id:nf(o,e.device_id):null}function Wo(o,t){let e=o.entities?.[t];return!!e&&(!!e.hidden||!!e.hidden_by||!!e.disabled_by)}function Zl(o,t){let e=L(t);if(!e)return!1;let n=o.entities?.[t];if(Wo(o,t)||n?.entity_category)return!1;let i=o.states[t];if(!i)return!1;let r=i.attributes.device_class,s=String(i.attributes.unit_of_measurement??"");return e==="sensor"?r?Xh.has(r)||r==="voltage"&&s==="mV":Zh.has(s):e==="binary"?r?tf.has(r):!!n?.area_id:!0}var of=new Set(["battery","signal_strength","timestamp","date","duration","data_rate","data_size","frequency","enum"]);function tc(o,t){if(L(t)!=="sensor")return!1;let e=o.entities?.[t];if(Wo(o,t)||e?.entity_category)return!1;let n=o.states[t];return!n||!n.attributes.unit_of_measurement||of.has(String(n.attributes.device_class??""))?!1:Number.isFinite(Number(n.state))||Q(n)}var Pr=null;function Gn(o){let t=Pr;if(t&&t.entities===o.entities&&t.devices===o.devices&&(t.states===o.states||(t.states=o.states,Object.keys(o.states).length===t.stateCount)))return t;let e=new Map,n=new Map,i=[],r=new Map,s=new Map;for(let l of Object.keys(o.entities??{})){let c=o.entities[l],d=c.device_id;d&&c.area_id&&(s.get(d)??s.set(d,new Set).get(d)).add(c.area_id),d&&Or(o,l)&&(n.get(d)??n.set(d,[]).get(d)).push(l),d&&!Wo(o,l)&&!c.entity_category&&(r.get(d)??r.set(d,new Set).get(d)).add(ac(l));let u=Zl(o,l),p=Ct(o,l);if(!p){(u||tc(o,l))&&Xl(L(l))&&i.push(l);continue}u&&(e.get(p)??e.set(p,[]).get(p)).push(l)}if(o.entities)for(let l of Object.keys(o.states))o.entities[l]||(Zl(o,l)||tc(o,l))&&Xl(L(l))&&i.push(l);i.sort((l,c)=>Do.indexOf(L(l))-Do.indexOf(L(c))||B(o,l).localeCompare(B(o,c)));for(let[l,c]of e){let d=o.areas?.[l]?.name;c.sort((u,p)=>{let h=Do.indexOf(L(u)),_=Do.indexOf(L(p));return h-_||B(o,u,d).localeCompare(B(o,p,d))})}let a=new Set([...s].filter(([,l])=>l.size>1).map(([l])=>l));return Pr={entities:o.entities,devices:o.devices,states:o.states,stateCount:Object.keys(o.states).length,areas:e,power:n,unassigned:i,domains:r,hubs:a},Pr}function wt(o,t){return!t||!o.entities?[]:Gn(o).areas.get(t)??[]}var rf={temperature:"temperature",humidity:"humidity",co2:"carbon_dioxide"},sf=new Set(["climate","water_heater","switch","button","camera","media_player","vacuum","light","fan","lawn_mower"]),af=/(flow|return|nozzle|hotend|extruder|heatbed|(^|[^a-z])bed($|[^a-z])|chamber|cpu|gpu|chip|soc|batter|water|boiler|outdoor|outside|exhaust|sole|brine|compressor|motor|freezer|fridge)/i;function lf(o,t){let e=o.entities?.[t]?.device_id,n=e&&!Gn(o).hubs.has(e)?Gn(o).domains.get(e):void 0;return n&&[...n].some(i=>sf.has(i))?!1:!af.test(`${t} ${o.states[t]?.attributes.friendly_name??""}`)}function Er(o,t,e,n){let i=e.climate?.[n];if(i==="none")return[];if(i)return o.states[i]?[i]:[];let r=rf[n],s=(h,_)=>W([h,_],e.points),a=t?.placements.filter(h=>h.entity_id.startsWith("sensor."))??[],l=a.filter(h=>s(h.x,h.z)).map(h=>h.entity_id),c=new Set(a.filter(h=>!s(h.x,h.z)).map(h=>h.entity_id)),d=[...new Set([...wt(o,e.area_id).filter(h=>!c.has(h)),...l])],u=d.filter(h=>h.startsWith("sensor.")&&o.states[h]?.attributes.device_class===r&&(e.outdoor||lf(o,h)));if(u.length)return u;let p=lc[n];return p?d.filter(h=>h.startsWith("climate.")&&typeof o.states[h]?.attributes[p]=="number"):[]}var lc={temperature:"current_temperature",humidity:"current_humidity"};function cf(o,t,e){let n=o.states[t];if(t.startsWith("climate.")){let r=lc[e],s=r?Number(n?.attributes[r]):Number.NaN;return e==="temperature"?ec(s,Lt(o)):s}let i=Number(n?.state);return e==="temperature"?ec(i,n?.attributes.unit_of_measurement):i}function Lt(o){return o.config?.unit_system?.temperature==="\xB0F"?"\xB0F":"\xB0C"}function ec(o,t){return t==="\xB0F"?(o-32)*5/9:t==="K"?o-273.15:o}function we(o,t){return Lt(o)==="\xB0F"?t*9/5+32:t}function Vt(o,t,e,n){let i=Er(o,t,e,n).map(r=>cf(o,r,n)).filter(r=>Number.isFinite(r));return i.length?i.reduce((r,s)=>r+s,0)/i.length:null}function df(o,t){return!!o.entities&&Gn(o).hubs.has(t)}function uf(o,t){return o.entities?Gn(o).power.get(t)??[]:[]}function B(o,t,e,n=!1){let i=o.states[t],r=o.entities?.[t],s=i?.attributes.friendly_name??r?.name??t;if(n&&r?.name&&r.device_id){let a=o.devices?.[r.device_id],l=(a?.name_by_user||a?.name||"").trim();l&&s.toLowerCase()===`${l} ${r.name}`.toLowerCase()&&(s=r.name)}if(e&&s.length>e.length+1&&s.toLowerCase().startsWith(e.toLowerCase()+" ")){let a=s.slice(e.length+1);return a.charAt(0).toUpperCase()+a.slice(1)}return s}function cc(o,t){if(!t||t==="none")return null;let e=o.states[t];if(!e||Q(e))return null;let n=e.state.toLowerCase();if(["on","open","opened","heating","heat","true","active","running"].includes(n))return!0;if(["off","closed","idle","false","inactive","standby"].includes(n))return!1;let i=Number(n);return Number.isFinite(i)?i>0:null}function dc(o){let t=o.toLowerCase().trim().replace(/[\s-]+/g,"_"),e=/(^|_)(not|no|un|dis)_?(charging|charge|connected|plugged)/.test(t),n=/charger_free|^available$|^idle$|no_car/.test(t),i=!e&&!/ready_to_charge|charger_|complete|finish|charged|full/.test(t)&&/(^|_)(charging|charge)($|_)/.test(t),r=i||!e&&!n&&/connect|plug|ready|insert|wait|paused|suspend|preparing|complete|finish|charged|full/.test(t);return{charging:i,plugged:r}}function Q(o){return!o||o.state==="unavailable"||o.state==="unknown"}var pf=new Set(["run","cooking","running","printing","prepare","preparing","slicing","heating","busy","working","active","washing","rinsing","spinning","drying","cleaning","in_progress","in progress","on"]);function Rr(o){return!!o&&o.entity_id.startsWith("sensor.")&&o.attributes.device_class==="enum"}function Ar(o){return o?o==="cleaning"||/clean|sweep|mop/.test(o.toLowerCase()):!1}function At(o){if(!o)return!1;if(o.entity_id.startsWith("vacuum."))return Ar(o.state)||o.state==="returning";switch(L(o.entity_id)){case"light":case"switch":case"fan":case"binary":return o.state==="on";case"cover":return o.state==="open"||o.state==="opening";case"climate":return o.attributes.hvac_action==="heating"||o.attributes.hvac_action==="cooling";case"media":return o.state==="playing";case"lock":return o.state==="unlocked"||o.state==="open";case"sensor":return Rr(o)&&pf.has(String(o.state).toLowerCase());default:return!1}}function uc(o,t){if(!o||Q(o))return t?1:0;let e=String(o.state).toLowerCase();return t||e==="run"||e==="cooking"||e==="on"?1:e==="ready"||e==="standby"||e==="pause"||e==="paused"?.3:0}function pc(o){if(!o||Q(o))return null;let t=String(o.state).toLowerCase();if(t==="off")return null;let e=String(o.attributes.hvac_action??"").toLowerCase(),n=t==="heat"?[1,.32,.12]:t==="cool"?[.3,.65,1]:t==="dry"?[1,.85,.3]:t==="fan_only"?[.85,.92,1]:[.3,1,.5],i=["heating","cooling","drying","fan"].includes(e);return{color:n,level:i||!e?1:.45}}function hc(o,t){if(!o||!t||!/^#[0-9a-f]{6}$/i.test(t))return o;let e=[1,3,5].map(a=>parseInt(t.slice(a,a+2),16)/255),n=a=>{let l=Math.max(...a),c=Math.min(...a),d=l-c;return l<=0||d/l<.25?[-1,0]:[(l===a[0]?((a[1]-a[2])/d+6)%6:l===a[1]?(a[2]-a[0])/d+2:(a[0]-a[1])/d+4)*60,d/l]},[i]=n(e),[r]=n(o.color);if(i<0||r<0)return i<0&&r<0?o:null;let s=Math.abs(i-r);return Math.min(s,360-s)<=30?o:null}function fc(o,t){if(!o||!t||!/^#[0-9a-f]{6}$/i.test(t))return o;let e=[1,3,5].map(n=>parseInt(t.slice(n,n+2),16)/255);return{...o,color:e}}function re(o,t){if(!o||o.state!=="on")return null;let e=t&&!["unavailable","unknown"].includes(t.state)?t.attributes:o.attributes,n=typeof e.brightness=="number"?.2+.8*Math.sqrt(Math.min(1,Math.max(0,e.brightness/255))):1,i=e.rgb_color,r;return i&&e.color_mode!=="color_temp"&&e.color_mode!=="brightness"&&e.color_mode!=="onoff"?r=[i[0]/255,i[1]/255,i[2]/255]:typeof e.color_temp_kelvin=="number"?r=hf(e.color_temp_kelvin):r=[1,.71,.28],{color:r,level:n}}function mc(o){let t=o.attributes.supported_color_modes;return!Array.isArray(t)||!t.length?!0:t.some(e=>["hs","rgb","rgbw","rgbww","xy"].includes(String(e)))}function hf(o){let t=Math.min(1,Math.max(0,(o-2200)/4300)),e=[1,.66,.26],n=[.78,.9,1];return[e[0]+(n[0]-e[0])*t,e[1]+(n[1]-e[1])*t,e[2]+(n[2]-e[2])*t]}function dn(o,t,e=null){if(o==="camera")return e==="ceiling"?Math.max(.5,t-.05):2.2;if(o==="light"&&e){if(e==="floor")return 1.95;if(e==="table")return 1.25;if(e==="wall")return 1.95}switch(o){case"light":return Math.max(.5,t-.25);case"cover":return Math.min(2,t-.3);case"climate":return .6;case"media":return .9;case"binary":case"sensor":return 1.4;default:return 1.05}}var ff=new Set([void 0,"shutter","blind","awning","shade","curtain","window"]),mf=new Set(["garage","gate"]),gf=new Set(["window","opening"]);function Kn(o,t,e=!1){let n=new Map;return t.length&&o.forEach((i,r)=>{let s=e&&t.length===1?t[0]:t[r];s&&n.set(i.id,s)}),n}function Yn(o,t){let e=new Map,n=(r,s)=>r==="none"?null:r??s??null,i=(r,s,a)=>{let l=n(r.cover,s);return{cover:l,contact:r.sensor==="handle"&&r.contact==null?null:n(r.contact,a),tilt:r.tilt==="none"?null:r.tilt,contact2:r.leaves===2&&r.contact2&&r.contact2!=="none"?r.contact2:null,lock:(r.type==="door"||r.type==="window"&&r.sill<=.01)&&r.lock&&r.lock!=="none"?r.lock:null,tilt2:r.leaves===2&&r.tilt2&&r.tilt2!=="none"?r.tilt2:null,position:l&&L(l)==="cover"&&r.position&&r.position!=="none"?r.position:null,positionInverted:!!r.position_inverted,...r.slat_invert?{slatInvert:!0}:{},tiltAngle:r.tilt_angle&&r.tilt_angle!=="none"?r.tilt_angle:null,tiltMax:r.tilt_max??null,tiltOffset:r.tilt_offset??null,tiltInvert:!!r.tilt_invert,shut:!!r.shut,...r.contact_invert?{contactInvert:!0}:{}}};for(let r of t){for(let s of r.rooms){let a=r.openings.filter(v=>v.room_id===s.id).sort((v,f)=>v.edge-f.edge||v.offset-f.offset);if(!a.length)continue;let l=wt(o,s.area_id),c=v=>o.states[v]?.attributes.device_class,d=l.filter(v=>L(v)==="cover"&&ff.has(c(v))),u=a.filter(v=>v.type==="window"),p=a.filter(v=>v.type==="door"),h=a.filter(v=>v.type==="garage"),_=Kn(u,d,!0),b=Kn(u,l.filter(v=>L(v)==="binary"&&gf.has(c(v)))),m=Kn(p,l.filter(v=>L(v)==="binary"&&c(v)==="door")),w=Kn(h,l.filter(v=>L(v)==="cover"&&mf.has(c(v)??""))),k=Kn(h,l.filter(v=>L(v)==="binary"&&c(v)==="garage_door"));for(let v of a){let f=v.type==="window"?_:v.type==="garage"?w:null,M=v.type==="window"?b:v.type==="garage"?k:m;e.set(v.id,i(v,f?.get(v.id),M.get(v.id)))}}for(let s of r.openings)e.has(s.id)||e.set(s.id,i(s))}return e}var bf=[[/^(tilted|tilt)/i,"tilted"],[/^(open|opened|on)$/i,"open"],[/^(closed|close|off)$/i,"closed"]];function _f(o){if(!o||Q(o))return null;let t=o.attributes.window_state;for(let e of[typeof t=="string"?t:null,o.state]){if(!e)continue;let n=bf.find(([i])=>i.test(e.trim()));if(n)return n[1]}return null}var vf=new Set(["unlocked","unlocking","open","opening"]);function zr(o){return!!o&&/^(switch|button|input_button)\./.test(o)}var wf=.5;function se(o,t,e="window"){t.cover&&zr(t.cover)&&(t={...t,cover:null,position:null});let n=t.lock?o.states[t.lock]:void 0,i=n&&vf.has(n.state)?{unlocked:!0}:{},r=f=>!!f&&o.states[f]?.state==="on",s=f=>!!f&&!!o.states[f]&&!Q(o.states[f]),a=f=>f?_f(o.states[f]):null,l=f=>{let M=a(f);return t.contactInvert&&f&&f!==t.tilt&&f!==t.tilt2&&M!=="tilted"&&M?M==="open"?"closed":"open":M},c=r(t.tilt2)||l(t.tilt2)==="tilted"||l(t.contact2)==="tilted",d=l(t.contact2)==="open"&&!c?1:0,u=r(t.tilt)||l(t.tilt)==="tilted"||l(t.contact)==="tilted",p=u?1:0,h=t.tiltAngle?Number(o.states[t.tiltAngle]?.state):NaN;if(Number.isFinite(h)){let f=(h-(t.tiltOffset??0))*(t.tiltInvert?-1:1);p=Math.min(1,Math.max(0,f/(t.tiltMax||15))),p<.08&&(p=0),u=p>0}let _=l(t.contact)==="open"&&!u?1:0,b=null,m=t.cover?o.states[t.cover]:void 0,w=bc(o,t.position);if(w!==null)b=t.positionInverted?w:1-w;else if(m&&!Q(m)){let f=m.attributes.current_position;typeof f=="number"?b=1-Math.min(100,Math.max(0,f))/100:b=m.state==="closed"?1:m.state==="opening"||m.state==="closing"?.5:0}else t.cover&&(b=0);let k=m&&!Q(m)?un(m,!!t.slatInvert):null,v=k===null?{}:{slats:k/100};if(e==="door"){let f=l(t.contact);return b!==null&&m&&$c.has(String(m.attributes.device_class??""))?{open:f===null?1-b:f==="closed"?0:1,open2:l(t.contact2)==="open"?1:0,tilt:0,tilt2:0,cover:null,sensed:!0,...i}:{open:f===null?t.shut?0:wf:f==="closed"?0:1,open2:l(t.contact2)==="open"?1:0,tilt:0,tilt2:0,cover:b,...v,sensed:f!==null||b!==null,...i}}if(e==="garage"){let f=l(t.contact),M=b!==null||f!==null;return b===null&&(b=f===null||f==="closed"?1:0),{open:0,open2:0,tilt:0,tilt2:0,cover:b,sensed:M}}return{open:_,open2:d,tilt:p,tilt2:c?1:0,cover:b,...v,sensed:s(t.contact)||s(t.tilt)||Number.isFinite(h),...i}}function gc(o,t){return t==="garage"?(o.cover??1)<.98:o.open>.02||o.open2>.02}function un(o,t=!1){let e=o?.attributes.current_tilt_position;if(typeof e!="number"||!Number.isFinite(e))return null;let n=Math.min(100,Math.max(0,e));return t?100-n:n}function Qn(o,t){return!!o?.floors.some(e=>e.openings.some(n=>n.cover===t&&n.slat_invert))}function bc(o,t){let e=t?o.states[t]:void 0;if(!e||Q(e))return null;let n=Number(e.state);if(!Number.isFinite(n))return null;let i=e.attributes.unit_of_measurement==="%"||n>1;return Math.min(1,Math.max(0,i?n/100:n))}function Fr(o,t){let e=new Map,n=[];for(let s of t){let a=L(s)==="camera"?`camera:${s}`:o.entities?.[s]?.device_id??`entity:${s}`,l=e.get(a);l||(e.set(a,l=[]),n.push(a)),l.push(s)}let i=n.map(s=>{let a=e.get(s),l=a.find(c=>!o.entities?.[c]?.name)??a[0];return{primary:l,others:a.filter(c=>c!==l)}}),r=new Map(t.map((s,a)=>[s,a]));return i.sort((s,a)=>r.get(s.primary)-r.get(a.primary))}function Bo(o,t){return Fr(o,t).map(e=>e.primary)}var nc={robot_vacuum:/(vacuum|robo|roomba|roborock|dreame|ecovacs|deebot)/i,tv_board:/\b(tv|television|fire ?tv|apple ?tv|chromecast|shield)/i,tv_wall:/\b(tv|television|fire ?tv|apple ?tv|chromecast|shield)/i,desk:/\b(pc|computer|desktop|monitor|workstation)/i,fridge:/(fridge|freezer)/i,fridge_smart:/(fridge|freezer)/i,stove:/(cooktop|stove|induction)/i,kitchen_tall:/(oven)/i,dishwasher:/(dishwasher)/i,washer:/(washer|washing)/i,dryer:/(dryer)/i,kitchen:/(coffee|kettle)/i,island:/(cooktop|induction)/i,sink:/(dishwasher)/i,radiator:/(radiator|thermostat|climate|trv)/i,ac_unit:/(air ?con|aircon|split|\bac\b|clim)/i,awning:/(awning)/i},_c=new Set(["tv_board","tv_wall"]);function vc(o,t){let e=o.states[t.entity];if(!e)return!1;let n=t.attribute?e.attributes[t.attribute]:e.state;if(n==null)return!1;let i=String(n).toLowerCase(),r=t.state.trim().toLowerCase();return t.state.trim()==="*"||i===r||r.length>=3&&i.includes(r)}function wc(o){return _c.has(o)||!!Sl(o)}function Uo(o){return wc(o)||o==="desk"||o==="fridge_smart"}function pn(o,t){let e=new Set,n=De(o,t),i=t.some(r=>r.openings.some(s=>s.confirm))?Yn(o,t):null;for(let r of t){for(let s of r.placements)s.confirm&&e.add(s.entity_id);for(let s of r.openings){let a=s.confirm?i?.get(s.id)?.cover:null;a&&a!=="none"&&e.add(a)}for(let s of r.furniture){let a=s.confirm?n.get(s.id)?.entity:null;if(a&&a!=="none"&&e.add(a),s.confirm)for(let l of s.gangs??[])l.entity&&l.entity!=="none"&&e.add(l.entity)}}return e}function yc(o,t){let e=new Map;for(let n of t)for(let i of n.furniture){if(i.type!=="awning"&&!zo(i.type))continue;let r=i.entity&&i.entity!=="none"?i.entity:null,s=r?o.states[r]:void 0,a=i.awning_time??20;if(!s||Q(s)){e.set(i.id,{out:0,moving:0,time:a});continue}let l=p=>i.awning_invert?1-p:p,c=bc(o,i.awning_position&&i.awning_position!=="none"?i.awning_position:null),d=s.attributes.current_position,u=s.state==="opening"?i.awning_invert?-1:1:s.state==="closing"?i.awning_invert?1:-1:0;c!==null?e.set(i.id,{out:l(c),moving:0,time:a}):typeof d=="number"&&Number.isFinite(d)?e.set(i.id,{out:l(Math.min(1,Math.max(0,d/100))),moving:0,time:a}):u?e.set(i.id,{out:null,moving:u,time:a}):e.set(i.id,{out:l(s.state==="open"||s.state==="on"?1:0),moving:0,time:a})}for(let n of t)for(let i of n.outdoor??[])if(i.type==="fence")for(let r of i.gates??[])e.set(r.id,yf(o,r));return e}function yf(o,t){let e=t.time??(t.kind==="slide"?15:4),n=a=>a&&a!=="none"?o.states[a]:void 0,i=n(t.contact);if(i&&!Q(i))return{out:null,moving:i.state==="on"||i.state==="open"?1:-1,time:e,settled:!0};let r=n(t.entity);if(!r||Q(r))return{out:null,moving:-1,time:e,settled:!0};let s=r.attributes.current_position;return typeof s=="number"&&Number.isFinite(s)?{out:Math.min(1,Math.max(0,s/100)),moving:0,time:e}:r.state==="opening"?{out:null,moving:1,time:e}:r.state==="closing"?{out:null,moving:-1,time:e}:{out:null,moving:r.state==="open"||r.state==="on"?1:-1,time:e,settled:!0}}function Cr(o,t){let e=i=>{if(!i||i==="none")return!1;let r=o.states[i]?.state;return r==="on"||r==="open"},n=new Map;for(let i of t)for(let r of i.furniture)r.type==="fridge_smart"&&n.set(r.id,{left:e(r.door_left),right:e(r.door_right)});return n}var oc={lamp_ceiling:/(ceiling|main)/i,lamp_downlight:/(spot|downlight)/i,lamp_spot:/(spot)/i,lamp_panel:/(panel|ceiling)/i,lamp_uplight:/(uplight)/i,lamp_bollard:/(garden|path|poller|outdoor)/i,lamp_garden:/(garden|spot|outdoor|tree)/i,lamp_pendant:/(pendant|dining)/i,lamp_fan:/(fan|ceiling)/i,lamp_floor:/(floor)/i,lamp_table:/(table|bedside|reading)/i,lamp_wall:/(wall)/i,led_strip:/(led|strip|band)/i};function Or(o,t){return t.startsWith("sensor.")&&o.states[t]?.attributes.device_class==="power"}function Hr(o,t){if(Or(o,t))return t;if(t.startsWith("binary_sensor."))return null;let e=o.entities?.[t]?.device_id;if(!e)return null;let n=df(o,e),i=Ct(o,t),r=uf(o,e).filter(b=>b!==t);if(!r.length)return null;let s=`sensor.${t.slice(t.indexOf(".")+1)}_power`;if(r.includes(s))return s;let a=b=>String(o.states[b]?.attributes.friendly_name??"").trim().toLowerCase(),l=(b,m)=>{let w=m.slice(m.indexOf(".")+1),k=a(m);return w.length>=4&&b.slice(b.indexOf(".")+1).includes(w)?w.length:k.length>=4&&a(b).includes(k)?k.length:0},c=r.length>1||n?Object.values(o.entities??{}).filter(b=>b.device_id===e&&!b.entity_id.startsWith("sensor.")).map(b=>b.entity_id):[t],d=b=>{let m=null,w=0;for(let k of c){let v=l(b,k);v>w&&([m,w]=[k,v])}return m},u=new Map(r.map(b=>[b,d(b)])),p=r.find(b=>u.get(b)===t);if(p)return p;let h=r.filter(b=>u.get(b)===null),_=h.find(b=>i!==null&&Ct(o,b)===i);return _||n?_??null:h.find(b=>i===null||Ct(o,b)===null||Ct(o,b)===i)??null}function De(o,t){let e=new Map;for(let n of t){let i=new Set([...n.furniture.flatMap(r=>[r.entity,r.power]),...n.placements.map(r=>r.entity_id)].filter(r=>!!r&&r!=="none"));for(let r of n.furniture){let s=r.type in oc,a=s?oc[r.type]:nc[r.type]??(He(r.type)?nc.robot_vacuum:void 0);if(!a&&r.entity==null&&r.power==null)continue;let l=n.rooms.find(h=>h.points.length>=3&&W([r.x,r.z],h.points))??(r.type==="awning"?xr(n).find(h=>W([r.x,r.z],h.points)):void 0),c=l?Bo(o,wt(o,l.area_id)):[],d=h=>`${h} ${B(o,h)}`,u=r.entity==="none"?null:r.entity??null;if(r.entity==null){let h=c.filter(_=>!i.has(_));if(s){let _=h.filter(b=>L(b)==="light");u=_.find(b=>a.test(d(b)))??_[0]??null}else if(He(r.type)){let _=l?.area_id??null;u=Object.keys(o.entities??{}).find(b=>b.startsWith("vacuum.")&&!i.has(b)&&!Wo(o,b)&&Ct(o,b)===_)??null}else if(r.type==="radiator"||r.type==="ac_unit"){let _=h.filter(b=>L(b)==="climate");u=_.find(b=>a.test(d(b)))??_[0]??null}else if(wc(r.type)){let _=h.filter(b=>L(b)==="media");u=_.find(b=>o.states[b]?.attributes.device_class==="tv")??_.find(b=>a?.test(d(b)))??(_c.has(r.type)?_[0]??null:null)}else r.type==="awning"?u=h.find(_=>_.startsWith("cover.")&&(a?.test(d(_))||o.states[_]?.attributes.device_class==="awning"))??null:a&&(u=h.find(_=>["switch","media","fan"].includes(L(_)??"")&&a.test(d(_)))??null);u&&i.add(u)}let p=r.power==="none"?null:r.power??null;r.power==null&&(p=u?Hr(o,u):null,!p&&a&&l&&!s&&(p=wt(o,l.area_id).find(_=>Or(o,_)&&!i.has(_)&&a.test(d(_)))??null),p&&i.add(p)),(u||p)&&e.set(r.id,{entity:u,power:p})}}return e}function Nr(o){if(!o)return null;let t=String(o.state).toLowerCase();return t==="unavailable"?!1:t==="unknown"||t===""?null:!["off","disconnected","offline","not_home","disabled","down","isolated"].includes(t)}function jo(o){if(!o||o.state!=="on")return 0;let t=o.attributes.percentage;return typeof t=="number"&&Number.isFinite(t)?Math.max(0,Math.min(1,t/100)):.6}function Dr(o){if(!o||o.state==="off"||o.state==="standby"||Q(o))return null;let t=o.attributes,e=`${t.app_name??""} ${t.source??""} ${t.app_id??""}`.toLowerCase();return e.includes("netflix")?[.9,.04,.08]:e.includes("youtube")?[1,.1,.15]:e.includes("prime")||e.includes("amazon")?[.1,.6,.95]:e.includes("disney")?[.2,.35,1]:e.includes("spotify")?[.12,.85,.4]:[.22,.88,1]}function hn(o,t,e,n=[]){let i=(u,p)=>W([u,p],e.points),r=De(o,[t]),s=Yn(o,[t]),a=[...t.placements.filter(u=>i(u.x,u.z)).map(u=>u.entity_id),...t.furniture.filter(u=>i(u.x,u.z)).flatMap(u=>[r.get(u.id)?.entity,r.get(u.id)?.power]),...t.openings.filter(u=>u.room_id===e.id).flatMap(u=>{let p=s.get(u.id);return p?[p.cover,p.contact,p.tilt,p.contact2]:[]}),...n.flatMap(u=>[u.window,u.cover,u.contact,u.tilt]),...e.panel??[]].filter(u=>!!u&&!!o.states[u]),l=new Set(e.hidden??[]),c=[...new Set(a)].filter(u=>!l.has(u)),d=new Set(c);return{shown:c,more:wt(o,e.area_id).filter(u=>!d.has(u)&&!l.has(u))}}var ic=/(^|_)(current_room|current_segment|current_area)($|_)/,xf={soc:/(^|_)(soc|state_of_charge|battery_level|battery)($|_)/,range:/(^|_)(range|remaining_range)($|_)/,charging:/(charging|charge_power|charger_power)/,plugged:/(plug|cable|connected)/,lock:/(lock)/,climate:/(climat|preheat|precondition|hvac)/,tracker:/./};function qo(o,t){let e=t.car??{},n=u=>u&&u!=="none"?u:null,i=n(e.device)??n(t.entity),r=i?o.entities?.[i]?.device_id:null,s=r&&o.entities?Object.values(o.entities).filter(u=>u.device_id===r).map(u=>u.entity_id):[],a=u=>`${u} ${o.states[u]?.attributes.friendly_name??""} ${o.entities?.[u]?.translation_key??""}`.toLowerCase().replace(/[\s-]+/g,"_"),l=(u,p,h)=>s.find(_=>p.includes(_.split(".")[0])&&xf[u].test(a(_))&&(!h||h(_)))??null,c=u=>String(o.states[u]?.attributes.unit_of_measurement??""),d=u=>String(o.states[u]?.attributes.device_class??"");return{soc:n(e.soc)??s.find(u=>u.startsWith("sensor.")&&d(u)==="battery")??l("soc",["sensor"],u=>c(u)==="%"),range:n(e.range)??l("range",["sensor"],u=>/km|mi/.test(c(u)))??l("range",["sensor"]),charging:n(e.charging)??l("charging",["sensor"],u=>/^k?W$/.test(c(u)))??l("charging",["binary_sensor","switch"]),plugged:n(e.plugged)??s.find(u=>u.startsWith("binary_sensor.")&&d(u)==="plug")??l("plugged",["binary_sensor"]),lock:n(e.lock)??s.find(u=>u.startsWith("lock."))??l("lock",["binary_sensor"]),climate:n(e.climate)??s.find(u=>u.startsWith("climate."))??l("climate",["switch","binary_sensor"]),tracker:n(e.tracker)??s.find(u=>u.startsWith("device_tracker."))??null}}function kf(o){let t=o.entity_id,e=String(o.state).toLowerCase().trim();return t.startsWith("lock.")?e==="locked":t.startsWith("binary_sensor.")?o.attributes.device_class==="lock"?e==="off":e==="on":t.startsWith("sensor.")?/^(locked|secured|double_locked)$/.test(e)?!0:/^(unlocked|unsecured|selective_locked|partially_locked|open)$/.test(e)?!1:null:e==="on"}function Jn(o,t){let e=qo(o,t),n=m=>m?o.states[m]:void 0,i=m=>{let w=Number(n(m)?.state);return m&&Number.isFinite(w)?w:null},r=i(e.soc),s=i(e.range),a=n(e.charging),l=String(a?.attributes.unit_of_measurement??""),c=a&&/^k?W$/.test(l)?(i(e.charging)??0)*(l==="kW"?1e3:1):null,d=c!==null?c>50:!!a&&["on","charging"].includes(a.state.toLowerCase()),u=n(e.plugged),p=n(e.lock),h=n(e.climate),_=n(e.tracker),b=_?.state.toLowerCase()??"";return{entities:e,soc:r!==null?Math.max(0,Math.min(100,r)):null,range:s,rangeUnit:String(n(e.range)?.attributes.unit_of_measurement??"km"),chargingW:c,charging:d,plugged:u?u.state==="on":null,locked:p?kf(p):null,climateOn:h?h.entity_id.startsWith("climate.")?h.state!=="off"&&h.state!=="unavailable":h.state==="on":null,away:_&&b!=="home"&&!Q(_)?b==="not_home"?"":_.state:null}}function xc(o,t){return t.flatMap(e=>e.furniture.filter(n=>n.type==="parking"&&n.car).flatMap(n=>Object.values(qo(o,n)))).filter(e=>!!e)}function Xn(o,t,e){if(e==="none")return null;if(e)return e;let n=t?o.entities?.[t]?.device_id:null;if(!n||!o.entities)return null;for(let i of Object.values(o.entities))if(!(i.device_id!==n||!i.entity_id.startsWith("sensor."))&&(ic.test(i.translation_key??"")||ic.test(i.entity_id.split(".")[1])))return i.entity_id;return null}function rc(o){return o.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]/g,"")}function Lr(o,t,e,n){if(typeof e!="string"||!e||e==="unknown"||e==="unavailable")return null;let i=rc(e);if(!i)return null;let r=s=>[s.name,s.area_id??"",s.area_id&&o.areas?.[s.area_id]?.name||""].map(rc).filter(Boolean);return(n!=="loose"?t.find(s=>r(s).includes(i)):void 0)??(n!=="exact"?t.find(s=>r(s).some(a=>a.length>=3&&(a.includes(i)||i.includes(a)))):void 0)??null}function kc(o,t,e,n,i,r=new Set){let s=n?o.states[n]?.attributes:void 0,a=[...t.filter(l=>l.id===e),...t.filter(l=>l.id!==e&&!r.has(l.id))];for(let l of[i?o.states[i]?.state:void 0,s?.current_room,s?.room,s?.current_segment])for(let c of["exact","loose"])for(let d of a){let u=Lr(o,d.rooms,l,c);if(u)return{floor:d,room:u}}return null}var $c=new Set(["garage","gate","door"]);function fn(o,t){let e=new Set,n=new Set,i=r=>{if(!r||r==="none"||!o.states[r])return;let s=L(r);s==="light"?e.add(r):s==="cover"&&!$c.has(String(o.states[r].attributes.device_class??""))&&n.add(r)};for(let r of t.rooms){let s=new Set(r.hidden??[]);for(let a of Bo(o,wt(o,r.area_id)))s.has(a)||i(a)}for(let r of t.placements)i(r.entity_id);for(let r of t.furniture)i(r.entity);return{lights:[...e],covers:[...n]}}function Sc(o,t){let e=new Set,n=i=>{i&&i.startsWith("climate.")&&o.states[i]&&e.add(i)};for(let i of t.rooms){let r=new Set(i.hidden??[]);for(let s of wt(o,i.area_id))r.has(s)||n(s)}for(let i of t.placements)n(i.entity_id);for(let i of t.furniture)n(i.entity);return[...e]}function ae(o){let t=o.split(".")[0];return t==="scene"||t==="script"?[t,"turn_on"]:t==="automation"?[t,"trigger"]:t==="button"||t==="input_button"?[t,"press"]:["homeassistant","toggle"]}function Zn(o){o!==location.pathname+location.search&&(history.pushState({from:location.pathname},"",o),window.dispatchEvent(new CustomEvent("location-changed",{bubbles:!0,composed:!0,detail:{replace:!1}})))}function Mc(o,t,e){let n=e.target?.trim()??"";if(e.action==="navigate"&&n)Zn(n);else if(e.action==="more_info"&&n)t.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:n},bubbles:!0,composed:!0}));else if(e.action==="service"&&n.includes(".")){let[i,r]=n.split(".",2);o.callService(i,r,e.data??{})}else e.action==="fire_dom_event"&&t.dispatchEvent(new CustomEvent("ll-custom",{detail:e.data??{},bubbles:!0,composed:!0}))}function $f(o,t,e){let n=o.q[0]-o.p[0],i=o.q[1]-o.p[1],r=n*n+i*i,s=r>0?Math.min(1,Math.max(0,((t-o.p[0])*n+(e-o.p[1])*i)/r)):0;return o.h0+(o.h1-o.h0)*s}var Pt=(o,t)=>[o[0]-t[0],o[1]-t[1]],Qt=(o,t)=>[o[0]+t[0],o[1]+t[1]],Nt=(o,t)=>[o[0]*t,o[1]*t],Br=(o,t)=>o[0]*t[0]+o[1]*t[1],mn=(o,t)=>o[0]*t[1]-o[1]*t[0],to=o=>Math.hypot(o[0],o[1]),le=o=>{let t=to(o)||1;return[o[0]/t,o[1]/t]},Wr=o=>[-o[1],o[0]],Ic=o=>[o[1],-o[0]];function ye(o,t,e=[]){let n=t.eps??.005,i=[],r=e.filter($=>Math.hypot($.b[0]-$.a[0],$.b[1]-$.a[1])>.05),s=[],a=$=>{for(let P=0;P<s.length;P++)if(Math.abs(s[P][0]-$[0])<=n&&Math.abs(s[P][1]-$[1])<=n)return P;return s.push([$[0],$[1]]),s.length-1},l=[];for(let $ of o){let P=$.points;if(P.length<3||Math.abs(Ht(P))<1e-6)continue;let O=Ht(P)>0,H=P.map(a);for(let C=0;C<P.length;C++){let j=H[C],Y=H[(C+1)%P.length];j!==Y&&l.push(O?{u:j,v:Y,room:$.id,edge:C,forward:!0}:{u:Y,v:j,room:$.id,edge:C,forward:!1})}}let c=r.map($=>[a($.a),a($.b)]),d=new Set;for(let $ of o){let P=$.points;P.length<3||($.wall_splits??[]).forEach((O,H)=>{if(!O||H>=P.length)return;let C=P[H],j=Pt(P[(H+1)%P.length],C),Y=to(j);for(let F of O)F>n&&F<Y-n&&d.add(a(Qt(C,Nt(j,F/Y))))})}let u=[];for(let $ of l){let P=s[$.u],O=s[$.v],H=Pt(O,P),C=to(H),j=Nt(H,1/C),Y=[];for(let U=0;U<s.length;U++){if(U===$.u||U===$.v)continue;let D=Pt(s[U],P),Z=Br(D,j);Z<=n||Z>=C-n||Math.abs(mn(j,D))<=n&&Y.push({t:Z,id:U})}Y.sort((U,D)=>U.t-D.t);let F=[{t:0,id:$.u},...Y,{t:C,id:$.v}];for(let U=0;U+1<F.length;U++){let D=F[U],Z=F[U+1],X=$.forward?D.t:C-Z.t,pt=$.forward?Z.t:C-D.t;u.push({u:D.id,v:Z.id,room:$.room,edge:$.edge,t0:X,t1:pt})}}let p=new Map;for(let $ of u){let P=$.u<$.v?`${$.u}-${$.v}`:`${$.v}-${$.u}`,O=p.get(P);O||p.set(P,O=[]),O.push($)}let h=$=>({room_id:$.room,edge:$.edge,t0:$.t0,t1:$.t1}),_=new Map;for(let $ of u){let P=`${$.room}:${$.edge}`;_.set(P,[..._.get(P)??[],$.t0].sort((O,H)=>O-H))}let b=$=>{let P=o.find(H=>H.id===$.room)?.wall_heights?.[$.edge];if(!Array.isArray(P))return P;let O=_.get(`${$.room}:${$.edge}`)??[];return P[O.indexOf($.t0)]??null},m=$=>{let P=$.map(b).filter(H=>typeof H=="number"&&H>0);if(P.length)return Math.min(...P);let O=$.map(H=>o.find(C=>C.id===H.room)?.ceiling_height);return O.every(H=>typeof H=="number"&&H>0)?Math.max(...O):void 0},w=$=>{let P=$.map(O=>o.find(H=>H.id===O.room)?.wall_thickness?.[O.edge]).filter(O=>typeof O=="number"&&O>0);return P.length?Math.max(...P):void 0},k=$=>{for(let P of $){let O=o.find(Y=>Y.id===P.room),H=O?.wall_slopes?.[P.edge];if(!O||!H)continue;let C=O.points[P.edge],j=O.points[(P.edge+1)%O.points.length];return{p:[C[0],C[1]],q:[j[0],j[1]],h0:Math.max(.05,H[0]),h1:Math.max(.05,H[1])}}},v=$=>$.some(P=>b(P)===0),f=$=>{let P=k($);return P?{height:Math.max(P.h0,P.h1),slope:P}:{height:m($)}},M=[],x=[],I=[];for(let $ of p.values()){let P=$[0],O=$.find(H=>H!==P&&H.u===P.v&&H.v===P.u&&H.room!==P.room);for(let H of $)H!==P&&H!==O&&H.room!==P.room&&i.push(`overlap:${P.room}:${H.room}`);if(v(O?[P,O]:[P])){O&&M.push([P.room,O.room]),x.push(O?[h(P),h(O)]:[h(P)]);continue}if(O){let H=w([P,O])??t.interior;I.push({a:P.u,b:P.v,left:H/2,right:H/2,exterior:!1,roomLeft:P.room,roomRight:O.room,sources:[h(P),h(O)],...f([P,O])})}else I.push({a:P.u,b:P.v,left:0,right:w([P])??t.exterior,exterior:!0,roomLeft:P.room,roomRight:null,sources:[h(P)],...f([P])})}let T=$=>le(Pt(s[$.b],s[$.a]));for(let $ of I){if($.exterior||$.free)continue;let P=new Set;for(let H of[$.a,$.b])for(let C of I)!C.exterior||C.free||C.a!==H&&C.b!==H||Math.abs(mn(T($),T(C)))>1e-6||(C.roomLeft===$.roomLeft?P.add("left"):C.roomLeft===$.roomRight&&P.add("right"));if(P.size!==1)continue;let O=$.left+$.right;P.has("left")?($.left=0,$.right=O):($.left=O,$.right=0)}r.forEach(($,P)=>{let[O,H]=c[P];if(O===H)return;let C=[($.a[0]+$.b[0])/2,($.a[1]+$.b[1])/2],j=o.find(Z=>Z.points.length>=3&&W(C,Z.points))?.id??null,Y=($.thickness??t.interior)/2,F=typeof $.height=="number"&&$.height>0?$.height:void 0,U=$.slope,D=U?{p:[$.a[0],$.a[1]],q:[$.b[0],$.b[1]],h0:Math.max(.05,U[0]),h1:Math.max(.05,U[1])}:void 0;I.push({free:$.id,a:O,b:H,left:Y,right:Y,exterior:!1,roomLeft:j,roomRight:j,sources:[],...D?{height:Math.max(D.h0,D.h1),slope:D}:{height:F}})}),I=Mf(I,s,d);let z=Pf(I,s);return{walls:I.map(($,P)=>{let O=s[$.a],H=s[$.b],C=z.get(`${P}:a`),j=z.get(`${P}:b`),Y=Tf([C.right,j.left,H,j.right,C.left,O],1e-6);return{id:Sf(O,H),a:[O[0],O[1]],b:[H[0],H[1]],left:$.left,right:$.right,exterior:$.exterior,roomLeft:$.roomLeft,roomRight:$.roomRight,sources:$.sources,footprint:Y,...$.free?{free:$.free}:{},...$.height!==void 0?{height:$.height}:{},...$.slope?{slope:$.slope}:{}}}),warnings:[...new Set(i)],open:M,noWalls:x}}function Sf(o,t){let e=r=>Math.round(r*100),[n,i]=o[0]<t[0]||o[0]===t[0]&&o[1]<=t[1]?[o,t]:[t,o];return`w_${e(n[0])}_${e(n[1])}_${e(i[0])}_${e(i[1])}`}function Vr(o){return{...o,a:o.b,b:o.a,left:o.right,right:o.left,roomLeft:o.roomRight,roomRight:o.roomLeft}}function Mf(o,t,e=new Set){let n=o.slice(),i=!0;for(;i;){i=!1;let r=new Map;n.forEach((s,a)=>{for(let l of[s.a,s.b]){let c=r.get(l);c||r.set(l,c=[]),c.push(a)}});for(let[s,a]of r){if(a.length!==2||e.has(s))continue;let l=n[a[0]],c=n[a[1]],d=l.b!==s&&c.a!==s;if(l.b!==s&&(l=Vr(l)),c.a!==s&&(c=Vr(c)),l.a===c.b)continue;let u=le(Pt(t[l.b],t[l.a])),p=le(Pt(t[c.b],t[c.a]));if(Math.abs(mn(u,p))>1e-6||Br(u,p)<=0||l.free||c.free||l.height!==c.height||l.slope||c.slope||l.exterior!==c.exterior||l.roomLeft!==c.roomLeft||l.roomRight!==c.roomRight||Math.abs(l.left-c.left)>1e-9||Math.abs(l.right-c.right)>1e-9)continue;let h={...l,b:c.b,sources:If(l.sources,c.sources)},_=d?Vr(h):h,b=n.filter((m,w)=>w!==a[0]&&w!==a[1]);b.push(_),n.length=0,n.push(...b),i=!0;break}}return n}function If(o,t){let e=o.map(n=>({...n}));for(let n of t){let i=e.find(r=>r.room_id===n.room_id&&r.edge===n.edge&&(Math.abs(r.t1-n.t0)<1e-6||Math.abs(n.t1-r.t0)<1e-6));i?(i.t0=Math.min(i.t0,n.t0),i.t1=Math.max(i.t1,n.t1)):e.push({...n})}return e}function Pf(o,t){let e=new Map;o.forEach((i,r)=>{let s=le(Pt(t[i.b],t[i.a])),a=[[i.a,{key:`${r}:a`,d:s,left:i.left,right:i.right,angle:Math.atan2(s[1],s[0])}],[i.b,{key:`${r}:b`,d:Nt(s,-1),left:i.right,right:i.left,angle:Math.atan2(-s[1],-s[0])}]];for(let[l,c]of a){let d=e.get(l);d||e.set(l,d=[]),d.push(c)}});let n=new Map;for(let[i,r]of e){let s=t[i];r.sort((c,d)=>c.angle-d.angle);let a=c=>({left:Qt(s,Nt(Wr(c.d),c.left)),right:Qt(s,Nt(Ic(c.d),c.right))});for(let c of r)n.set(c.key,a(c));if(r.length<2)continue;let l=4*Math.max(...r.map(c=>Math.max(c.left,c.right)))+1e-9;for(let c=0;c<r.length;c++){let d=r[c],u=r[(c+1)%r.length],p=Qt(s,Nt(Wr(d.d),d.left)),h=Qt(s,Nt(Ic(u.d),u.right)),_=mn(d.d,u.d);if(Math.abs(_)<1e-4)continue;let b=mn(Pt(h,p),u.d)/_,m=Qt(p,Nt(d.d,b));to(Pt(m,s))>l||(n.get(d.key).left=m,n.get(u.key).right=m)}}return n}function Tf(o,t){let e=o.filter((i,r)=>to(Pt(i,o[(r+1)%o.length]))>t),n=!0;for(;n&&e.length>3;){n=!1;for(let i=0;i<e.length;i++){let r=e[(i+e.length-1)%e.length],s=e[i],a=e[(i+1)%e.length],l=Pt(s,r),c=Pt(a,s);if(Math.abs(mn(le(l),le(c)))<1e-7&&Br(l,c)>0){e=e.filter((d,u)=>u!==i),n=!0;break}}}return e}function Ko(o,t,e){let n=o.points[t],i=o.points[(t+1)%o.points.length],r=le(Pt(i,n));return Qt(n,Nt(r,e))}function Ef(o,t){let e=Pt(o.b,o.a),n=Wr(le(e)),i=a=>t.some(l=>l.points.length>=3&&W(a,l.points)),r=0,s=0;for(let a of[.2,.5,.8]){let l=Qt(o.a,Nt(e,a));i(Qt(l,Nt(n,o.left+.2)))&&r++,i(Pt(l,Nt(n,o.right+.2)))&&s++}return r>=2&&s===0?!0:s>=2&&r===0?!1:null}function Pc(o,t,e,n){let i=o.wall?e.find(s=>s.id===o.wall):void 0;if(!i||Math.hypot(i.b[0]-i.a[0],i.b[1]-i.a[1])<.05)return!1;let r=(i.thickness??n)/2;return Ef({a:i.a,b:i.b,left:r,right:r},t)===!1}function Tc(o,t,e){if(o.wall){let i=e.find(a=>a.id===o.wall);if(!i||Math.hypot(i.b[0]-i.a[0],i.b[1]-i.a[1])<.05)return null;let r=le(Pt(i.b,i.a));return{room:{id:o.room_id,name:"",area_id:null,points:[i.a,i.b,Qt(i.a,[-r[1],r[0]])]},edge:0}}let n=t.find(i=>i.id===o.room_id);return n&&o.edge<n.points.length?{room:n,edge:o.edge}:null}function Ec(o,t,e,n){let i=t.rotation*Math.PI/180,r=[-Math.sin(i),Math.cos(i)],s=Math.max(.005,t.d),a=null;for(let c of o){let d=Math.hypot(c.b[0]-c.a[0],c.b[1]-c.a[1]);if(d<.05)continue;let u=[(c.b[0]-c.a[0])/d,(c.b[1]-c.a[1])/d],p=(t.x-c.a[0])*u[0]+(t.z-c.a[1])*u[1];if(p<-.02||p>d+.02)continue;let h=[-u[1],u[0]],_=(t.x-c.a[0])*h[0]+(t.z-c.a[1])*h[1],b=r[0]*h[0]+r[1]*h[1]>=0?1:-1;if(Math.abs(r[0]*h[0]+r[1]*h[1])<.5)continue;let m=b>0?c.left:-c.right,w=_>-c.right-1e-4&&_<c.left+1e-4,k=Math.abs(_-(m+b*(s/2)));if(!w&&k>.03||a&&k>=a.off)continue;let v=c.a[0]+u[0]*p,f=c.a[1]+u[1]*p,M=w?m+b*(s/2):_,x=c.slope?$f(c.slope,t.x,t.z):Math.min(e,c.height??e);a={x:v+h[0]*M,z:f+h[1]*M,top:x,off:k}}if(!a)return{x:t.x,z:t.z,y:n};let l=t.mount_y==null?Math.max(.02,Math.min(n,a.top-.1,a.top-t.h-.02)):n;return{x:a.x,z:a.z,y:l}}var ce=Math.PI/180;function gn(o){let t=o.rotation??0;if(!t||o.points&&o.points.length>=3)return null;let e=t*ce;return{p:o.pivot??[(o.x0+o.x1)/2,(o.z0+o.z1)/2],c:Math.cos(e),s:Math.sin(e)}}function Wt(o,t,e=!1){if(!o)return t;let n=t[0]-o.p[0],i=t[1]-o.p[1],r=e?-o.s:o.s;return[o.p[0]+n*o.c-i*r,o.p[1]+n*r+i*o.c]}function de(o){let t=Math.min(o.x0,o.x1),e=Math.max(o.x0,o.x1),n=Math.min(o.z0,o.z1),i=Math.max(o.z0,o.z1),r=gn(o),s=o.axis==="x"?(l,c)=>[l,o.flip?i-c:n+c]:(l,c)=>[o.flip?e-c:t+c,l],a=r?(l,c)=>Wt(r,s(l,c)):s;return o.axis==="x"?{u0:t,u1:e,w:i-n,at:a}:{u0:n,u1:i,w:e-t,at:a}}function Rf(o,t,e,n=1e-6){let[i,r]=Lc(o,t,e),s=de({...o,rotation:0});return i>=s.u0-n&&i<=s.u1+n&&r>=-n&&r<=s.w+n}function bn(o){let t=de(o).w,e=o.eave_a,n=o.eave_b,i=Math.tan(Math.min(80,Math.max(0,o.pitch_a))*ce),r=Math.tan(Math.min(80,Math.max(0,o.pitch_b))*ce);if(o.shape==="flat"||o.shape==="parapet")return{vr:t/2,rh:e,y:()=>e};if(o.shape==="pent")return{vr:t,rh:e+t*i,y:l=>e+l*i};if(o.shape==="mansard"){let l=Nc(t,e,n,i,r,Hc(o));return{vr:l.vr,rh:l.rh,y:l.y}}let s=i+r>1e-6?Math.min(t,Math.max(0,(n-e+t*r)/(i+r))):t/2,a=e+s*i;return{vr:s,rh:a,y:l=>l<=s?e+l*i:n+(t-l)*r}}function Ur(o){let t=o.settings.roof;return t.type===void 0||t.type==="custom"?t.sections??[]:[]}var Ac=.14,Af=.03;function zc(o,t){return!o.open&&Math.min(o.base,o.eave_a,o.eave_b)<t-.05}function jr(o,t){return bn(o).rh-Ac>t+.01}function Fc(o,t,e,n){let i=null,r=[],s=[],a=Math.max(0,o.settings.roof.overhang??0),l=Ur(o);for(let d of l){if(d.open||n!==void 0&&!jr(d,n))continue;let u=d.points&&d.points.length>=3?null:d.overhang_sides??null,p=O=>typeof u?.[O]=="number"?Math.max(0,u[O]):null,[h,_]=Lc(d,t,e),b=de({...d,rotation:0}),m=1e-6,[w,k,v,f]=[b.u0-(p(2)??0),b.u1+(p(3)??0),-(p(0)??0),b.w+(p(1)??0)],M=Math.max(w-h,h-k,v-_,_-f),x=!!d.points&&d.points.length>=3;if(M>(x?m:Af)||x&&!W([t,e],d.points))continue;let I=d.shape==="flat"||d.shape==="parapet",T=Math.max(0,d.overhang??a),[z,R]=[Math.min(k,Math.max(w,h)),Math.min(f,Math.max(v,_))],P=((I?null:Df(Nf(d,{a:p(0)??T,b:p(1)??T,u0:p(2)??T,u1:p(3)??T}),z,R))??bn(d).y(R))-Ac;M>m?r.push({s:d,y:P}):(i=i===null?P:Math.max(i,P),s.push(d))}let c=null;if(i!==null)for(let{s:d,y:u}of r){if(c!==null&&u<=c)continue;let p=Gr(l,d);p&&s.includes(p)||(c=u)}return i!==null&&c!==null&&c>i?c:i}function Cc(o,t){let e=o.length;if(e<3||Math.abs(t)<1e-9)return o.map(r=>[r[0],r[1]]);let n=Sr(o)>=0?1:-1,i=[];for(let r=0;r<e;r++){let s=o[(r+e-1)%e],a=o[r],l=o[(r+1)%e],c=Rc([a[0]-s[0],a[1]-s[1]]),d=Rc([l[0]-a[0],l[1]-a[1]]),u=[c[1]*n,-c[0]*n],p=[d[1]*n,-d[0]*n],h=u[0]+p[0],_=u[1]+p[1],b=Math.hypot(h,_);if(b<1e-6){i.push([a[0]+u[0]*t,a[1]+u[1]*t]);continue}let m=(h*u[0]+_*u[1])/b,w=Math.min(4,1/Math.max(.25,m));i.push([a[0]+h/b*t*w,a[1]+_/b*t*w])}return i}function Rc(o){let t=Math.hypot(o[0],o[1])||1;return[o[0]/t,o[1]/t]}function Oc(o,t){if(o.points&&o.points.length>=3)return Cc(o.points,t);let e=Math.min(o.x0,o.x1)-t,n=Math.max(o.x0,o.x1)+t,i=Math.min(o.z0,o.z1)-t,r=Math.max(o.z0,o.z1)+t,s=gn(o);return[[e,i],[n,i],[n,r],[e,r]].map(a=>Wt(s,a))}function zf(o){let t=o.map(n=>n[0]),e=o.map(n=>n[1]);return{x0:Math.min(...t),z0:Math.min(...e),x1:Math.max(...t),z1:Math.max(...e)}}var Ff=30,Cf=5,Of=60;function Hf(o){let t=o.pitch_upper;return typeof t=="number"&&Number.isFinite(t)?Math.min(Of,Math.max(Cf,t)):Ff}function Hc(o){return Math.tan(Hf(o)*ce)}function Nc(o,t,e,n,i,r){let s=Math.min(o*.3,n>1e-6?2.4/n:o*.3),a=Math.min(o*.3,i>1e-6?2.4/i:o*.3),l=t+s*n,c=e+a*i,d=Math.min(o-a,Math.max(s,(c-l+r*(o-a+s))/(2*r))),u=l+(d-s)*r;return{vla:s,vlb:a,yla:l,ylb:c,vr:d,rh:u,y:h=>h<=s?t+h*n:h<=d?l+(h-s)*r:h<=o-a?c+(o-a-h)*r:e+(o-h)*i}}function Nf(o,t){let e=de(o),n=bn(o),i=e.w,r=Math.max(0,t.a),s=Math.max(0,t.b),a=e.u0-Math.max(0,t.u0),l=e.u1+Math.max(0,t.u1),c=(F,U)=>[F,U,n.y(U)],d=c(a,-r),u=c(l,-r),p=c(l,i+s),h=c(a,i+s),_=Math.tan(Math.min(80,Math.max(0,o.pitch_a))*ce),b=Math.tan(Math.min(80,Math.max(0,o.pitch_b))*ce);if(o.shape==="pent"){let F=[d,u,p,h],U=[[0,n.y(0)],[i,n.y(i)]];return{faces:[F],rim:F,ridges:[[p,h]],gable:U,gables:[U,U]}}if(o.shape==="pyramid"){let F=[(e.u0+e.u1)/2,n.vr,n.rh];return{faces:[[d,u,F],[u,p,F],[p,h,F],[h,d,F]],rim:[d,u,p,h],ridges:[[d,F],[h,F],[u,F],[p,F]],gable:null,gables:[null,null]}}if(o.shape==="mansard"){let F=Nc(i,o.eave_a,o.eave_b,_,b,Hc(o)),U=[[0,n.y(0)],[F.vla,F.yla],[F.vr,F.rh],[i-F.vlb,F.ylb],[i,n.y(i)]],D=[a,F.vla,F.yla],Z=[l,F.vla,F.yla],X=[a,i-F.vlb,F.ylb],pt=[l,i-F.vlb,F.ylb],yt=[a,F.vr,F.rh],Ft=[l,F.vr,F.rh];return{faces:[[d,u,Z,D],[D,Z,Ft,yt],[yt,Ft,pt,X],[X,pt,p,h]],rim:[d,u,Z,Ft,pt,p,h,X,yt,D],ridges:[[yt,Ft],[D,Z],[X,pt]],gable:U,gables:[U,U]}}let[m,w]=qr(o)??["gable","gable"],k=Kr(o,[m,w]),v=m==="gable"?[a,n.vr,n.rh]:[e.u0+k.d0,n.vr,n.rh],f=w==="gable"?[l,n.vr,n.rh]:[e.u1-k.d1,n.vr,n.rh],M=[a,k.vah,k.yh],x=[a,k.vbh,k.yh],I=[l,k.vah,k.yh],T=[l,k.vbh,k.yh],z=m==="halfhip",R=w==="halfhip",$=[[d,u,...R?[I]:[],f,v,...z?[M]:[]],[v,f,...R?[T]:[],p,h,...z?[x]:[]]];m==="hip"&&$.push([h,d,v]),z&&$.push([x,M,v]),w==="hip"&&$.push([u,p,f]),R&&$.push([I,T,f]);let P=[d,u,...w==="gable"?[f]:R?[I,T]:[],p,h,...m==="gable"?[v]:z?[x,M]:[]],O=[[v,f]];m==="hip"&&O.push([d,v],[h,v]),z&&O.push([M,v],[x,v]),w==="hip"&&O.push([u,f],[p,f]),R&&O.push([I,f],[T,f]);let H=[[0,n.y(0)],[n.vr,n.rh],[i,n.y(i)]],C=[[0,n.y(0)],[k.vah,k.yh],[k.vbh,k.yh],[i,n.y(i)]],j=F=>F==="gable"?H:F==="halfhip"?C:null,Y=[j(m),j(w)];return{faces:$,rim:P,ridges:O,gable:Y[0]??Y[1],gables:Y}}function qr(o){if(o.shape!=="gable"&&o.shape!=="hip"&&o.shape!=="halfhip")return null;let t=o.shape,e=n=>n==="gable"||n==="hip"||n==="halfhip"?n:t;return[e(o.end_u0),e(o.end_u1)]}function Kr(o,t){let e=de(o),n=bn(o),i=e.w,r=Math.tan(Math.min(80,Math.max(0,o.pitch_a))*ce),s=Math.tan(Math.min(80,Math.max(0,o.pitch_b))*ce),a=e.u1-e.u0,l=t[0]!=="gable"&&t[1]!=="gable"?a/2:a,c=Math.min(n.y(0),n.y(i)),d=c+(n.rh-c)*.55,u=r>1e-6?Math.min(n.vr,(d-o.eave_a)/r):n.vr,p=s>1e-6?Math.max(n.vr,i-(d-o.eave_b)/s):n.vr,h=Math.min(l,Math.min(n.vr,i-n.vr)||i/2),_=Math.min(l-.1,(n.rh-d)/Math.max(.2,r)),b=m=>m==="hip"?h:m==="halfhip"?_:0;return{d0:b(t[0]),d1:b(t[1]),yh:d,vah:u,vbh:p}}function Df(o,t,e){let n=null;for(let i of o.faces){if(!W([t,e],i.map(k=>[k[0],k[1]])))continue;let[r,s]=i,a=i.slice(2).find(k=>Math.abs((s[0]-r[0])*(k[1]-r[1])-(s[1]-r[1])*(k[0]-r[0]))>1e-9);if(!a)continue;let l=s[0]-r[0],c=s[2]-r[2],d=s[1]-r[1],u=a[0]-r[0],p=a[2]-r[2],h=a[1]-r[1],_=c*h-d*p,b=d*u-l*h,m=l*p-c*u;if(Math.abs(b)<1e-9)continue;let w=r[2]-(_*(t-r[0])+m*(e-r[1]))/b;n=n===null?w:Math.min(n,w)}return n}function Dc(o,t,e){let n=t*ce,i={p:e,c:Math.cos(n),s:Math.sin(n)};if(o.points&&o.points.length>=3)return{...o,points:o.points.map(d=>Wt(i,d)),...zf(o.points.map(d=>Wt(i,d)))};let r=o.pivot??[(o.x0+o.x1)/2,(o.z0+o.z1)/2],s=Wt(i,r),a=s[0]-r[0],l=s[1]-r[1],c=(((o.rotation??0)+t)%360+360)%360;return c>180&&(c-=360),{...o,x0:o.x0+a,x1:o.x1+a,z0:o.z0+l,z1:o.z1+l,pivot:s,rotation:Math.abs(c)<1e-9?0:c}}function Lc(o,t,e){let[n,i]=Wt(gn(o),[t,e],!0),r=Math.min(o.x0,o.x1),s=Math.max(o.x0,o.x1),a=Math.min(o.z0,o.z1),l=Math.max(o.z0,o.z1);return o.axis==="x"?[n,o.flip?l-i:i-a]:[i,o.flip?s-n:n-r]}function Gr(o,t){let[e,n]=Wt(gn(t),[(t.x0+t.x1)/2,(t.z0+t.z1)/2]),i=s=>Math.abs((s.x1-s.x0)*(s.z1-s.z0)),r=null;for(let s of o)s===t||s.dormer||s.open||s.shape==="flat"||s.shape==="parapet"||i(s)<i(t)*1.5||Rf(s,e,n)&&(!r||i(s)<i(r))&&(r=s);return r}function Vc(o,t,e){let n=de(t),i=o.floors.flatMap(b=>b.rooms.filter(m=>m.points.length>=3&&b.elevation+b.height>t.base+.05)),r=o.settings.wall_exterior,s=i.map(b=>Cc(b.points,Math.max(r,...(b.wall_thickness??[]).map(m=>m??0))+.01)),a=.35,l=(b,m)=>{if(i.some(k=>W(b(a),k.points)))return!0;let w=b(-Math.min(.3,m/2));return s.some(k=>!W(w,k)&&[.05,.2,a].some(v=>W(b(v),k)))},c=[.15,.5,.85],d=c.map(b=>n.u0+(n.u1-n.u0)*b),u=c.map(b=>n.w*b),p=b=>b==="a"?d.some(m=>l(w=>n.at(m,-w),n.w)):b==="b"?d.some(m=>l(w=>n.at(m,n.w+w),n.w)):b==="u0"?u.some(m=>l(w=>n.at(n.u0-w,m),n.u1-n.u0)):u.some(m=>l(w=>n.at(n.u1+w,m),n.u1-n.u0)),h=t.overhang_sides??null,_=(b,m)=>{let w=h?.[b];return typeof w=="number"?Math.max(0,w):p(m)?0:e};return{a:_(0,"a"),b:_(1,"b"),u0:_(2,"u0"),u1:_(3,"u1")}}function Wc(o,t){let e=o.floors.filter(i=>i.rooms.length>0).sort((i,r)=>i.elevation-r.elevation),n=[...e].reverse().filter(i=>i.elevation<t.base-.05);if(t.x0!==void 0&&t.z0!==void 0&&t.x1!==void 0&&t.z1!==void 0){let i=Oc({x0:t.x0,z0:t.z0,x1:t.x1,z1:t.z1,points:t.points,rotation:t.rotation,pivot:t.pivot},0),r=i.reduce((u,p)=>u+p[0],0)/i.length,s=i.reduce((u,p)=>u+p[1],0)/i.length,a=[[r,s],...i.map(u=>[r+(u[0]-r)*.6,s+(u[1]-s)*.6])],l=u=>u.rooms.some(p=>p.points.length>=3&&a.some(h=>W(h,p.points))),c=e.find(u=>Math.abs(u.elevation-t.base)<=.05&&l(u));if(c)return c;let d=n.length>1?n.find(l):void 0;if(d)return d}return n[0]??e[0]}function Bc(o,t=e=>`roof_${e+1}`){let e=o.settings.roof?.pitch??35,n=o.settings.wall_exterior,i=o.floors.filter(l=>l.rooms.some(c=>c.points.length>=3)).sort((l,c)=>c.elevation-l.elevation),r=[],s=[],a=l=>Math.round(l*1e3)/1e3;for(let l of i){let c=l.rooms.filter(v=>v.points.length>=3),d=[...new Set(c.flatMap(v=>v.points.map(f=>a(f[0]))))].sort((v,f)=>v-f),u=[...new Set(c.flatMap(v=>v.points.map(f=>a(f[1]))))].sort((v,f)=>v-f),p=d.length-1,h=u.length-1,_=(v,f)=>v.some(M=>W(f,M.points)),b=[];for(let v=0;v<h;v++){b.push([]);for(let f=0;f<p;f++){let M=[(d[f]+d[f+1])/2,(u[v]+u[v+1])/2];b[v].push(_(c,M)&&!_(s,M))}}let m=b.map(v=>v.map(()=>!1)),w=(v,f)=>b[f][v]&&!m[f][v],k=l.elevation+l.height;for(let v=0;v<h;v++)for(let f=0;f<p;f++){if(!w(f,v))continue;let M=f;for(;M+1<p&&w(M+1,v);)M++;let x=v;for(;x+1<h&&Array.from({length:M-f+1},($,P)=>w(f+P,x+1)).every(Boolean);)x++;for(let $=v;$<=x;$++)for(let P=f;P<=M;P++)m[$][P]=!0;let I=d[f]-n,T=d[M+1]+n,z=u[v]-n,R=u[x+1]+n;Math.min(T-I,R-z)<.8||r.push({id:t(r.length),x0:a(I),z0:a(z),x1:a(T),z1:a(R),shape:"gable",axis:T-I>=R-z?"x":"z",eave_a:a(k),eave_b:a(k),pitch_a:e,pitch_b:e,base:a(k),overhang:null})}s.push(...c)}return r}var Yo=Math.PI/180,Lf=1.13,Vf=1.72,Qo=.025,Le=.07,Uc=.25;function no(o,t){let e=[];for(let n of o.floors){if(t&&n.id!==t)continue;let{walls:i}=ye(n.rooms,{exterior:o.settings.wall_exterior,interior:o.settings.wall_interior},n.walls??[]);for(let r of i){if(!r.exterior&&!r.free)continue;let s=r.b[0]-r.a[0],a=r.b[1]-r.a[1],l=Math.hypot(s,a);if(l<.5)continue;let c=a/l,d=-s/l,u=Math.min(n.height,r.height??n.height),p=r.sources.find(b=>b.room_id===r.roomLeft)?.edge??null,h={floorId:n.id,room:r.roomLeft,edge:p,free:!!r.free},_=(b,m,w,k)=>e.push({key:b,section:null,side:"top",flat:!1,o:m,eu:w,es:[0,1,0],n:k,lu:l,ls:u,pitch:90,span:()=>[0,l],facing:[k[0],k[2]],wall:h});_(`wall:${n.id}:${r.id}`,[r.a[0]+c*r.right,n.elevation,r.a[1]+d*r.right],[s/l,0,a/l],[c,0,d]),r.free&&_(`wall:${n.id}:${r.id}:back`,[r.b[0]-c*r.left,n.elevation,r.b[1]-d*r.left],[-s/l,0,-a/l],[-c,0,-d])}}return e}var jc="ground";function Wf(o){let t=[...o.floors.filter(e=>e.rooms.some(n=>n.points.length>=3))].sort((e,n)=>e.elevation-n.elevation);return t.find(e=>e.elevation>-.5)??t[0]??o.floors[0]??null}function Bf(o,t){let e=(t.rotation??0)*Math.PI/180,n=[Math.cos(e),0,Math.sin(e)],i=[-Math.sin(e),0,Math.cos(e)],r=Wf(o),s=n[0]*t.u+i[0]*t.v,a=n[2]*t.u+i[2]*t.v,l=r?r.elevation+(t.base!=null?t.base:ie(r,s,a)):t.base??0;return{key:jc,section:null,side:"top",flat:!0,o:[0,l,0],eu:n,es:i,n:[0,1,0],lu:1e4,ls:1e4,pitch:0,span:()=>[-1e4,1e4],facing:[i[0],i[2]],unbounded:!0}}function We(o,t,e=ke(o)){return t.face===jc?Bf(o,t):t.face.startsWith("wall:")?no(o,t.face.split(":")[1]).find(n=>n.key===t.face)??null:e.find(n=>n.key===t.face)??null}function Yr(o){return o.floors.filter(e=>e.rooms.some(n=>n.points.length>=3)).sort((e,n)=>n.elevation-e.elevation)[0]??null}function Uf(o,t){let e=o.settings.roof?.frame;if(e&&e.length===4&&e.every(r=>Number.isFinite(r)))return e;let n=t.rooms.flatMap(r=>r.points.map(s=>s[0])),i=t.rooms.flatMap(r=>r.points.map(s=>s[1]));return[Math.min(...n),Math.min(...i),Math.max(...n),Math.max(...i)]}function ke(o){let t=o.settings.roof;if(!t||t.type==="none")return[];if(t.type==="custom")return(t.sections??[]).flatMap(f=>jf(f,Vc(o,f,f.overhang??t.overhang)));let e=Yr(o);if(!e)return[];let[n,i,r,s]=Uf(o,e),a=o.settings.wall_exterior+t.overhang,l=n-a,c=r+a,d=i-a,u=s+a,p=e.elevation+e.height;if(t.type==="flat")return[qc("main",null,l,d,c,u,p+Uc)];let h=c-l>=u-d,_=t.ridge==="short"?!h:h,b=(_?u-d:c-l)/2,m=b*Math.tan(t.pitch*Yo),w=(f,M,x)=>_?[f,p+x,(d+u)/2+M]:[(l+c)/2+M,p+x,f],[k,v]=_?[l,c]:[d,u];return[-1,1].map(f=>Go(`main:${f<0?"a":"b"}`,null,f<0?"a":"b",w(k,f*b,0),w(v,f*b,0),w(k,0,m),t.pitch,()=>[0,v-k]))}function jf(o,t){let e=de(o),n=bn(o),i=(v,f,M)=>{let[x,I]=e.at(v,f);return[x,M,I]},r=Math.max(0,t.a),s=Math.max(0,t.b),a=e.u0-Math.max(0,t.u0),l=e.u1+Math.max(0,t.u1),c=l-a;if(o.shape==="flat"||o.shape==="parapet"){let v=de({...o,rotation:0}),f=v.at(a,-r),M=v.at(l,e.w+s),x=qc(o.id,o.id,Math.min(f[0],M[0]),Math.min(f[1],M[1]),Math.max(f[0],M[0]),Math.max(f[1],M[1]),o.eave_a+Uc);return[Kf(x,gn(o))]}if(o.shape==="pent")return[Go(`${o.id}:a`,o.id,"a",i(a,-r,n.y(-r)),i(l,-r,n.y(-r)),i(a,e.w+s,n.y(e.w+s)),o.pitch_a,()=>[0,c])];let d=qr(o),u=d?Kr(o,d):null,p=o.shape==="pyramid"||d?.[0]==="hip",h=o.shape==="pyramid"||d?.[1]==="hip",_=o.shape==="pyramid"?(e.u1-e.u0)/2:p?u.d0:0,b=o.shape==="pyramid"?(e.u1-e.u0)/2:h?u.d1:0,m=p?e.u0+_-a:0,w=h?l-(e.u1-b):0,k=[];if(n.vr>.3){let v=Math.hypot(n.vr+r,n.rh-n.y(-r));k.push(Go(`${o.id}:a`,o.id,"a",i(a,-r,n.y(-r)),i(l,-r,n.y(-r)),i(a,n.vr,n.rh),o.pitch_a,f=>[m*(f/v),c-w*(f/v)]))}if(e.w-n.vr>.3){let v=Math.hypot(e.w+s-n.vr,n.rh-n.y(e.w+s));k.push(Go(`${o.id}:b`,o.id,"b",i(l,e.w+s,n.y(e.w+s)),i(a,e.w+s,n.y(e.w+s)),i(l,n.vr,n.rh),o.pitch_b,f=>[w*(f/v),c-m*(f/v)]))}if(p||h){let v=n.y(-r),f=n.y(e.w+s),M=[];p&&M.push([`${o.id}:c`,"c",i(a,e.w+s,f),i(a,-r,v),i(e.u0+_,n.vr,n.rh)]),h&&M.push([`${o.id}:d`,"d",i(l,-r,v),i(l,e.w+s,f),i(e.u1-b,n.vr,n.rh)]);for(let[x,I,T,z,R]of M){let $=qf(x,o.id,I,T,z,R);$&&k.push($)}}return k}function qf(o,t,e,n,i,r){let s=eo(Ve(i,n));if(s<.3)return null;let a=xe(Ve(i,n)),l=Ve(r,n),c=l[0]*a[0]+l[1]*a[1]+l[2]*a[2],d=[l[0]-a[0]*c,l[1]-a[1]*c,l[2]-a[2]*c],u=eo(d);if(u<.3)return null;let p=xe(d),h=xe(Yc(a,p));h[1]<0&&(h=[-h[0],-h[1],-h[2]]);let _=xe([-p[0],0,-p[2]]),b=Math.atan2(p[1],Math.hypot(p[0],p[2]))/Yo;return{key:o,section:t,side:e,flat:!1,o:n,eu:a,es:p,n:h,lu:s,ls:u,pitch:b,span:w=>{let k=Math.min(1,Math.max(0,w/u));return[c*k,s-(s-c)*k]},facing:[_[0],_[2]]}}function Go(o,t,e,n,i,r,s,a){let l=xe(Ve(i,n)),c=xe(Ve(r,n)),d=xe(Yc(l,c));d[1]<0&&(d=[-d[0],-d[1],-d[2]]);let u=xe([-c[0],0,-c[2]]);return{key:o,section:t,side:e,flat:!1,o:n,eu:l,es:c,n:d,lu:eo(Ve(i,n)),ls:eo(Ve(r,n)),pitch:s,span:a,facing:[u[0],u[2]]}}function Kf(o,t){if(!t)return o;let e=a=>{let[l,c]=Wt({p:[0,0],c:t.c,s:t.s},[a[0],a[2]]);return[l,a[1],c]},[n,i]=Wt(t,[o.o[0],o.o[2]]),[r,s]=Wt({p:[0,0],c:t.c,s:t.s},o.facing);return{...o,o:[n,o.o[1],i],eu:e(o.eu),es:e(o.es),n:e(o.n),facing:[r,s]}}function qc(o,t,e,n,i,r,s){let a=i-e>=r-n,l=a?i-e:r-n,c=a?r-n:i-e;return{key:`${o}:top`,section:t,side:"top",flat:!0,o:[e,s,n],eu:a?[1,0,0]:[0,0,1],es:a?[0,0,1]:[1,0,0],n:[0,1,0],lu:l,ls:c,pitch:0,span:()=>[0,l],facing:a?[0,1]:[1,0]}}function Qr(o){let t=o.module_w||Lf,e=o.module_h||Vf;return o.portrait===!1?[e,t]:[t,e]}function Kc(o){return o.layout?.length?o.layout.map(t=>Math.max(0,Math.min(60,Math.round(t)))):Array.from({length:Math.max(1,o.rows)},()=>Math.max(1,o.cols))}function Jr(o,t){return o.flat?Math.min(45,Math.max(0,t.tilt??15))*Yo:o.wall?Math.min(90,Math.max(0,t.tilt??0))*Yo:0}function Be(o,t){let[e,n]=Qr(t),i=Kc(t),r=Math.max(1,...i),a=(i.length-1)*Gc(o,t)+n*Math.cos(Jr(o,t));return[r*e+(r-1)*Qo,a]}function Gc(o,t){let[,e]=Qr(t),n=Jr(o,t);return o.wall?e*Math.cos(n)+Qo:o.flat?e*Math.cos(n)+Math.max(.3,2*e*Math.sin(n)):e+Qo}function Gf(o,t,e=!1){let[n,i]=Qr(t),r=[],s=Jr(o,t),a=i*Math.cos(s),l=Gc(o,t),c=Kc(t),d=Math.max(1,...c),u=new Set(t.skip??[]),p=!!o.wall&&n>o.lu+1e-6,h=(b,m,w)=>[o.o[0]+o.eu[0]*b+o.es[0]*m+o.n[0]*w,o.o[1]+o.eu[1]*b+o.es[1]*m+o.n[1]*w,o.o[2]+o.eu[2]*b+o.es[2]*m+o.n[2]*w],_=(b,m)=>{if(o.unbounded)return!0;if(m<-1e-6||m>o.ls+1e-6)return!1;let[w,k]=o.span(m);return b>=w-1e-6&&b<=k+1e-6};return c.forEach((b,m)=>{let w=t.align==="right"?d-b:t.align==="center"?(d-b)/2:0;for(let k=0;k<b;k++){let v=`${m}:${k}`,f=u.has(v);if(f&&!e)continue;let M=t.u+(k+w)*(n+Qo),x=t.v+m*l,I=M+n,T=x+(o.flat||o.wall?a:i);if(p){if(!(_((M+I)/2,x)&&_((M+I)/2,T)))continue}else if(![[M,x],[I,x],[I,T],[M,T]].every(([H,C])=>_(H,C)))continue;if(o.wall&&s>.001){let H=Le+i*Math.sin(s),[C,j]=t.flip?[H,Le]:[Le,H],Y=[h(M,x,C),h(I,x,C),h(I,T,j),h(M,T,j)],F=t.flip?x:T,U=[M+.05,I-.05].map(D=>[h(D,F,0),h(D,F,H)]);r.push({corners:Y,posts:U,cell:v,skipped:f});continue}if(!o.flat){r.push({corners:[h(M,x,Le),h(I,x,Le),h(I,T,Le),h(M,T,Le)],posts:[],cell:v,skipped:f});continue}let z=.15,R=z+i*Math.sin(s),[$,P]=t.flip?[T,x]:[x,T],O=[h(M,$,z),h(I,$,z),h(I,P,R),h(M,P,R)];r.push({corners:O,posts:[M+.05,I-.05].flatMap(H=>[[h(H,$,0),h(H,$,z)],[h(H,P,0),h(H,P,R)]]),cell:v,skipped:f})}}),r}function Ve(o,t){return[o[0]-t[0],o[1]-t[1],o[2]-t[2]]}function eo(o){return Math.hypot(o[0],o[1],o[2])}function xe(o){let t=eo(o)||1;return[o[0]/t,o[1]/t,o[2]/t]}function Yc(o,t){return[o[1]*t[2]-o[2]*t[1],o[2]*t[0]-o[0]*t[2],o[0]*t[1]-o[1]*t[0]]}var Yf=.78,Qf=1.18;function Jf(o){return{id:o.id,face:o.face,u:o.u,v:o.v,rows:1,cols:1,portrait:!0,tilt:0,module_w:o.w||Yf,module_h:o.h||Qf}}function Xf(o,t){let e=Gf(o,Jf(t))[0];if(!e)return null;let n=i=>[i[0]-o.n[0]*.05,i[1]-o.n[1]*.05,i[2]-o.n[2]*.05];return[n(e.corners[0]),n(e.corners[1]),n(e.corners[2]),n(e.corners[3])]}function Xr(o,t,e){let n=t?Xf(t,e):null;if(!n)return null;let i=(n[0][0]+n[2][0])/2,r=(n[0][1]+n[2][1])/2,s=(n[0][2]+n[2][2])/2;for(let a of[...o.floors].sort((l,c)=>c.elevation-l.elevation)){if(a.elevation>r)continue;let l=a.rooms.find(c=>W([i,s],c.points));if(l)return{floor:a,roomId:l.id,corners:n}}return null}function Jo(o,t){let e=o.settings.roof?.windows??[];if(!e.length)return[];let n=new Map(ke(o).map(i=>[i.key,i]));return e.filter(i=>Xr(o,n.get(i.face),i)?.roomId===t)}function Qc(o,t){let[e,n]=Be(o,t);return[o.o[0]+o.eu[0]*(t.u+e/2)+o.es[0]*(t.v+n/2),o.o[2]+o.eu[2]*(t.u+e/2)+o.es[2]*(t.v+n/2)]}var Zf=new Set(["window","door","opening","garage_door"]),_n=null;function tm(o,t,e,n){(!_n||_n.entities!==o.entities||_n.building!==t)&&(_n={entities:o.entities,building:t,rooms:new Map});let i=_n.rooms.get(n.id);return i||(i=hn(o,e,n,Jo(t,n.id)).shown,_n.rooms.set(n.id,i)),i}function $e(o,t,e){let n=e?t.floors.filter(r=>r.id===e):[...t.floors].sort((r,s)=>r.elevation-s.elevation),i=[];for(let r of n)for(let[s,a]of ot(r).entries()){if(!a.name?.trim()||a.outdoor&&ot(r).findIndex(m=>m.outdoor&&m.area_id===a.area_id&&m.name===a.name)<s)continue;let l=tm(o,t,r,a),c=l.filter(m=>L(m)==="light"&&o.states[m]),d=c.filter(m=>o.states[m].state==="on"),u=l.filter(m=>{let w=o.states[m];return L(m)==="binary"&&w?.state==="on"&&Zf.has(String(w.attributes.device_class??""))}).length,p=l.some(m=>L(m)==="media"&&o.states[m]?.state==="playing"),h=Vt(o,r,a,"temperature"),_=h===null?null:we(o,h);if(_===null&&a.climate?.temperature!=="none"){let m=l.filter(w=>L(w)==="climate").map(w=>o.states[w]?.attributes.current_temperature).find(w=>typeof w=="number");typeof m=="number"&&(_=m)}let b=Vt(o,r,a,"humidity");i.push({floorId:r.id,roomId:a.id,name:a.name,temp:_,humidity:b,lights:c,lightsOn:d,open:u,playing:p,active:d.length>0||u>0||p})}return i}function Jc(o){return o.lightsOn.length?["turn_off",o.lightsOn]:["turn_on",o.lights]}function Xc(o,t){return(t.settings.favorites??[]).filter(e=>o.states[e]).map(e=>{let[n,i]=ae(e);return{id:e,domain:n,service:i,on:n==="homeassistant"&&o.states[e].state==="on"}})}var vn=(o,t=4)=>(o.length>t?[...o.slice(0,t),"\u2026"]:o).join(", ");function Zc(o){let t=new Set;return o.openings.filter(e=>(e.open||e.tilted)&&!t.has(e.id)&&!!t.add(e.id))}function td(o,t){let e=[];for(let u of o.alerts)e.push({kind:"alert",level:2,title:u.text,detail:"",targets:[u]});let n=Zc(o);if(n.length){let u=n.map(h=>h.tilted?`${h.room} (${t.tilted})`:h.room).filter(Boolean),p=n.map(h=>({entity:h.entity,opening:h.id,floorId:h.floorId,roomId:h.roomId,label:[h.room,h.name,h.tilted?`(${t.tilted})`:""].filter(Boolean).join(" ")}));e.push({kind:"open",level:1,title:t.open(n.length),detail:vn([...new Set(u)]),targets:p})}if(o.unlocked.length&&e.push({kind:"unlocked",level:1,title:t.unlocked(o.unlocked.length),detail:vn(o.unlocked.map(u=>u.name)),targets:o.unlocked.map(u=>({entity:u.entity,floorId:u.floorId,roomId:u.roomId,label:u.name})),action:{kind:"lock",entities:o.unlocked.flatMap(u=>u.entity?[u.entity]:[])}}),o.people.length){let u=o.people.filter(b=>b.home),p=o.people.filter(b=>!b.home),h=u.length?`${t.home}: ${vn(u.map(b=>b.room?`${b.name} (${b.room})`:b.name))}`:t.nobodyHome,_=u.filter(b=>b.roomId).map(b=>({floorId:b.floorId,roomId:b.roomId,label:`${b.name} \xB7 ${b.room}`}));e.push({kind:"people",level:0,title:h,detail:p.length?`${t.away}: ${vn(p.map(b=>b.name))}`:"",targets:_})}let i=o.household.filter(u=>u.hot),r=o.household.filter(u=>!u.hot);for(let u of i)e.push({kind:"household",level:1,title:u.text,detail:"",targets:u.entity?[{entity:u.entity}]:[]});r.length&&e.push({kind:"household",level:0,title:r[0].text,detail:vn(r.slice(1).map(u=>u.text),3),targets:[]});let s=o.lights.filter(u=>u.count>0),a=s.reduce((u,p)=>u+p.count,0);if(a){let u=s.flatMap(p=>p.on??[]);e.push({kind:"lights",level:0,title:t.lights(a),detail:vn(s.map(p=>p.room)),targets:s.map(p=>({floorId:p.floorId,roomId:p.roomId,label:p.count>1?`${p.room} (${p.count})`:p.room})),...u.length?{action:{kind:"lights_off",entities:u}}:{}})}for(let u of o.cars){let p=u.soc!==null?`${Math.round(u.soc)} %`:"",h=u.present?u.charging?t.charging:"":t.carAway;(h||p)&&e.push({kind:"car",level:0,title:u.name,detail:[h,p].filter(Boolean).join(" \xB7 "),targets:[]})}let l=o.energy;if(l&&(l.consumption!==null||l.solar!==null)){let u=[];l.solar!==null&&l.solar>5&&u.push(`${t.energySolar} ${t.watts(l.solar)}`),l.grid!==null&&Math.abs(l.grid)>5&&u.push(`${l.grid<0?t.energyFeed:t.energyGrid} ${t.watts(Math.abs(l.grid))}`),l.soc!==null&&u.push(`${t.battery} ${Math.round(l.soc)} %`),e.push({kind:"energy",level:0,title:l.consumption!==null?`${t.energyUse} ${t.watts(l.consumption)}`:u.shift(),detail:u.join(" \xB7 "),targets:[]})}let c=u=>u.level===2?0:o.away&&u.kind==="people"?1:u.level===1?2:3,d=e.map((u,p)=>({it:u,n:p})).sort((u,p)=>c(u.it)-c(p.it)||u.n-p.n).map(u=>u.it);return d.some(u=>u.level>0)||d.unshift({kind:"calm",level:0,title:t.calm,detail:t.calmDetail,targets:[]}),d}function ed(o){let t=o.filter(r=>r.level===2);if(t.length)return{text:t.length>1?`${t[0].title} (+${t.length-1})`:t[0].title,level:2};let e=o.filter(r=>r.level===1),n=o.find(r=>r.kind==="lights");return e.length?{text:[...e.slice(0,2).map(r=>r.title),...n&&e.length<2?[n.title]:[]].join(" \xB7 "),level:1}:{text:[o.find(r=>r.kind==="calm")?.title??"",n?.title??""].filter(Boolean).join(" \xB7 "),level:0}}function nd(o,t){let e=[];for(let n of Zc(o))e.push({kind:"open",title:[n.room,n.name,n.tilted?`(${t.tilted})`:""].filter(Boolean).join(" \xB7 "),target:{entity:n.entity,opening:n.id,floorId:n.floorId,roomId:n.roomId}});for(let n of o.unlocked)e.push({kind:"unlocked",title:n.name,target:{entity:n.entity,floorId:n.floorId,roomId:n.roomId},...n.entity?{action:{kind:"lock",entities:[n.entity]}}:{}});for(let n of o.lights)n.count<=0||e.push({kind:"lights",title:`${n.room} \xB7 ${t.lights(n.count)}`,target:{floorId:n.floorId,roomId:n.roomId},...n.on?.length?{action:{kind:"lights_off",entities:n.on}}:{}});return e}var em=new Set(["lights","climate","action","link"]);function Zr(o){if(!Array.isArray(o))return[];let t=[];for(let e of o)if(!(!e||typeof e!="object"||!em.has(String(e.kind)))&&!(e.kind==="action"&&!/^[a-z_]+\.[a-z0-9_]+$/.test(String(e.entity??"")))&&!(e.kind==="link"&&!/^\/[^/]/.test(String(e.path??"")))&&(t.push({kind:e.kind,name:typeof e.name=="string"?e.name.slice(0,24):void 0,icon:typeof e.icon=="string"?e.icon.slice(0,4):void 0,entity:e.entity,path:e.path}),t.length===2))break;return t}function od(o,t){return[...o].sort((e,n)=>e.elevation-n.elevation).map(e=>{let n=t.filter(i=>i.floorId===e.id);return{id:e.id,name:e.name,rooms:n,lightsOn:n.reduce((i,r)=>i+r.lightsOn.length,0)}}).filter(e=>e.rooms.length>0)}function id(o,t,e,n,i=[]){let r=o.length===2?o.map(s=>({id:`floor:${s.id}`,label:s.name,badge:s.lightsOn})):o.length?[{id:"rooms",label:"",badge:o.reduce((s,a)=>s+a.lightsOn,0)}]:[];return[{id:"now",label:"",badge:t},...r,...n?[{id:"covers",label:"",badge:e}]:[],...i,{id:"more",label:"",badge:0}]}var nm=5;function rd(o,t=nm){let e=[...o];if(e.length>t){let i=e.filter(r=>r.id.startsWith("floor:"));if(i.length>1){let r=e.indexOf(i[0]);e=e.filter(s=>!s.id.startsWith("floor:")),e.splice(r,0,{id:"rooms",label:"",badge:i.reduce((s,a)=>s+a.badge,0)})}}let n=[];for(;e.length>t;){let i=e.length-2;if(i<1||e[i].id==="rooms"||e[i].id.startsWith("floor:"))break;n.unshift(...e.splice(i,1))}return{bar:e,over:n}}function sd(o,t,e,n){let i=typeof n=="number"&&Number.isFinite(n)?Math.round(n):null;return{entity:o,name:t,position:i,shut:e==="closed"||i===0}}var om={alert:"\u26A0\uFE0F",open:"\u{1FA9F}",unlocked:"\u{1F513}",people:"\u{1F464}",household:"\u{1F9FA}",lights:"\u{1F4A1}",energy:"\u26A1",car:"\u{1F697}",calm:"\u2705"},im={open:"\u{1FA9F}",unlocked:"\u{1F513}",lights:"\u{1F4A1}"},ts=class extends at{static properties={items:{attribute:!1},stops:{attribute:!1},labels:{attribute:!1},favorites:{attribute:!1},summary:{attribute:!1},mode:{reflect:!0},_open:{state:!0},_step:{state:!0},_did:{state:!0}};constructor(){super(),this.items=[],this.stops=[],this.favorites=[],this.summary={text:"",level:0},this.mode="bar",this._open=null,this._step=0,this._did=0}fire(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}willUpdate(t){t.has("mode")&&(this._open=null,this.mode==="check"&&(this._step=0,this._did=0))}updated(t){if(this.mode==="check"&&(t.has("mode")||t.has("_step"))){let e=this.stops[this._step];e&&this.fire("now-go",e.target)}}tapRow(t,e){if(t.targets.length){if(t.targets.length===1)return this.fire("now-go",t.targets[0]);this._open=this._open===e?null:e}}actLabel(t){return t.kind==="lock"?this.labels.lock:this.labels.lightsOff}renderBar(){return g`<button class="bar level${this.summary.level}" @click=${()=>this.fire("now-mode","page")}>
      <span class="dot" aria-hidden="true"></span>
      <span class="sum">${this.summary.text}</span>
      <span class="go" aria-hidden="true">›</span>
    </button>`}renderPage(){return g`<header>
        <b>${this.labels.title}</b>
        <button class="x" aria-label=${this.labels.close} @click=${()=>this.fire("now-mode","bar")}>✕</button>
      </header>
      ${this.favorites.length?g`<div class="favs">${this.favorites.map(t=>g`<button @click=${()=>this.fire("now-fav",t.entity)}>★ ${t.name}</button>`)}</div>`:y}
      <ul>
        ${this.items.map((t,e)=>{let n=t.targets.length>1,i=this._open===e;return g`<li class="level${t.level}">
            <div class="line">
              <button class="row" ?disabled=${!t.targets.length} aria-expanded=${n?i:y} @click=${()=>this.tapRow(t,e)}>
                <span class="icon" aria-hidden="true">${om[t.kind]}</span>
                <span class="text"><b>${t.title}</b>${t.detail?g`<small>${t.detail}</small>`:y}</span>
                ${t.targets.length?g`<span class="go" aria-hidden="true">${n?i?"\u25BE":"\u25B8":"\u203A"}</span>`:y}
              </button>
              ${t.action?g`<button class="act" @click=${()=>this.fire("now-act",t.action)}>${this.actLabel(t.action)}</button>`:y}
            </div>
            ${n&&i?g`<div class="places">
                  ${t.targets.map(r=>g`<button class="place" @click=${()=>this.fire("now-go",r)}>${r.label??""}<span aria-hidden="true">›</span></button>`)}
                </div>`:y}
          </li>`})}
      </ul>
      <footer>
        <button class="check" @click=${()=>this.fire("now-mode","check")}>
          <b>🚪 ${this.labels.check}</b>
          <small>${this.labels.checkHint}</small>
        </button>
      </footer>`}renderCheck(){let t=this.stops[this._step],e=g`<button class="x" aria-label=${this.labels.close} @click=${()=>this.fire("now-mode","bar")}>✕</button>`;if(!t)return g`<div class="card">
        <div class="card-top"><b>✅ ${this.stops.length?this.labels.checkDone:this.labels.checkNothing}</b>${e}</div>
        <div class="card-btns"><button class="primary" @click=${()=>this.fire("now-mode","bar")}>${this.labels.done}</button></div>
      </div>`;let n=()=>this._step+=1,i=this.stops.slice(this._step).filter(s=>s.kind==="lights"&&s.action),r=t.kind==="lights"&&i.length>1?[...new Set(i.flatMap(s=>s.action.entities))]:null;return g`<div class="card">
      <div class="card-top">
        <span class="icon" aria-hidden="true">${im[t.kind]}</span>
        <span class="text"><b>${t.title}</b><small>${this._step+1} / ${this.stops.length}${t.kind==="open"?g` · ${this.labels.windowHint}`:y}</small></span>
        ${e}
      </div>
      <div class="card-btns">
        ${t.action?g`<button
              class="primary"
              @click=${()=>{this.fire("now-act",t.action),this._did+=1,n()}}
            >
              ${this.actLabel(t.action)}
            </button>`:y}
        <button @click=${n}>${this.labels.next}</button>
      </div>
      ${r?g`<div class="card-btns">
            <button
              @click=${()=>{this.fire("now-act",{kind:"lights_off",entities:r}),this._step=this.stops.length}}
            >
              ${this.labels.allLightsOff.replace("{n}",String(r.length))}
            </button>
          </div>`:y}
    </div>`}render(){return this.mode==="page"?this.renderPage():this.mode==="check"?this.renderCheck():this.renderBar()}static styles=ct`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 0;
      color: #e8f0ff;
      font: 14px/1.3 var(--fp3d-font, system-ui, sans-serif);
    }
    button {
      font: inherit;
      color: inherit;
      cursor: pointer;
    }
    /* ---- the line under the house */
    .bar {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      min-height: 44px;
      padding: 8px 14px;
      background: #0e1626;
      border: 1px solid rgba(120, 160, 255, 0.25);
      border-radius: 999px;
      text-align: left;
    }
    .dot {
      flex: none;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #3ddc84;
    }
    .level1 .dot {
      background: #ffb547;
    }
    .level2 .dot {
      background: #ff5a5a;
    }
    .bar.level2 {
      border-color: #ff5a5a;
    }
    .sum {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 600;
    }
    .go {
      flex: none;
      opacity: 0.6;
    }
    /* ---- the page */
    :host([mode="page"]) {
      background: #0b1220;
    }
    header {
      display: flex;
      align-items: center;
      padding: 14px 10px 8px 18px;
    }
    header b {
      flex: 1;
      font-size: 19px;
    }
    .x {
      flex: none;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: none;
      border: 0;
      font-size: 18px;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0 10px;
      overflow-y: auto;
      overscroll-behavior: contain;
      flex: 1;
      min-height: 0;
    }
    li {
      border-radius: 14px;
      margin-bottom: 6px;
      background: #121c30;
    }
    li.level2 {
      background: rgba(255, 70, 70, 0.18);
    }
    .line {
      display: flex;
      align-items: center;
      gap: 6px;
      padding-right: 8px;
    }
    .row {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
      min-width: 0;
      min-height: 56px;
      padding: 10px 6px 10px 12px;
      background: none;
      border: 0;
      text-align: left;
    }
    .row:disabled {
      cursor: default;
    }
    .icon {
      flex: none;
      width: 28px;
      text-align: center;
      font-size: 19px;
    }
    .text {
      flex: 1;
      min-width: 0;
      display: grid;
      gap: 2px;
    }
    .text b {
      font-weight: 600;
      font-size: 15px;
    }
    .text small {
      opacity: 0.75;
      font-size: 13px;
    }
    .level2 .text b {
      color: #ff9a9a;
    }
    .level1 .text b {
      color: #ffc46b;
    }
    .act {
      flex: none;
      min-height: 40px;
      padding: 8px 14px;
      border-radius: 999px;
      border: 1px solid #00e5ff;
      background: rgba(0, 229, 255, 0.12);
      color: #7df3ff;
      font-weight: 600;
    }
    .places {
      display: grid;
      gap: 2px;
      padding: 0 8px 8px 50px;
    }
    .place {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      min-height: 40px;
      align-items: center;
      padding: 6px 10px;
      border-radius: 10px;
      background: rgba(120, 160, 255, 0.1);
      border: 0;
      text-align: left;
    }
    footer {
      padding: 8px 10px calc(10px + env(safe-area-inset-bottom, 0px));
    }
    .check {
      display: grid;
      gap: 2px;
      width: 100%;
      padding: 12px 16px;
      border-radius: 14px;
      border: 1px solid rgba(120, 160, 255, 0.3);
      background: #16233c;
      text-align: left;
    }
    .check b {
      font-size: 15px;
    }
    .check small {
      opacity: 0.75;
    }
    .favs {
      display: flex;
      gap: 8px;
      padding: 0 10px 10px;
      overflow-x: auto;
    }
    .favs button {
      flex: none;
      min-height: 46px;
      padding: 8px 16px;
      border-radius: 14px;
      border: 1px solid rgba(120, 160, 255, 0.3);
      background: #16233c;
      font-weight: 600;
    }
    /* ---- the house check */
    .card {
      background: #0e1626;
      border: 1px solid rgba(120, 160, 255, 0.3);
      border-radius: 16px;
      padding: 8px 8px 10px 12px;
    }
    .card-top {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .card-top > b {
      flex: 1;
      font-size: 15px;
      padding: 6px 0;
    }
    .card-btns {
      display: flex;
      gap: 8px;
      padding: 6px 4px 0 0;
    }
    .card-btns button {
      flex: 1;
      min-height: 44px;
      border-radius: 999px;
      border: 1px solid rgba(120, 160, 255, 0.35);
      background: #16233c;
      font-weight: 600;
    }
    .card-btns .primary {
      border-color: #00e5ff;
      background: #00e5ff;
      color: #06101c;
    }
  `};customElements.get("fp3d-now-list")||customElements.define("fp3d-now-list",ts);var rm={now:"\u25CF",rooms:"\u25A6",covers:"\u25A4",more:"\u22EF"},es=class extends at{static properties={slots:{attribute:!1},floors:{attribute:!1},covers:{attribute:!1},more:{attribute:!1},group:{attribute:!1},labels:{attribute:!1},sheet:{},floorId:{},active:{},level:{type:Number},attention:{},roomId:{}};constructor(){super(),this.slots=[],this.floors=[],this.covers=[],this.more=[],this.group=null,this.sheet=null,this.floorId=null,this.active=null,this.level=0,this.attention="",this.roomId=null}fire(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}slotLabel(t){return t.label||(t.id==="now"?this.labels.now:t.id==="rooms"?this.labels.rooms:t.id==="covers"?this.labels.covers:this.labels.more)}renderRooms(){let t=this.floors.find(e=>e.id===this.floorId)??this.floors[0];return t?g`${this.floors.length>1&&this.slots.some(e=>e.id==="rooms")?g`<div class="tabs">${this.floors.map(e=>g`<button aria-pressed=${e.id===t.id} @click=${()=>this.fire("nav-floor",e.id)}>${e.name}</button>`)}</div>`:y}
      <div class="tiles">
        <button class="tile whole" @click=${()=>this.fire("nav-room",{floorId:t.id,roomId:null})}><b>${this.labels.wholeFloor}</b><small>${t.name}</small></button>
        ${t.rooms.map(e=>g`<button class="tile ${e.active?"on":""}" aria-pressed=${e.roomId===this.roomId} @click=${()=>this.fire("nav-room",{floorId:e.floorId,roomId:e.roomId})}>
            <b>${e.name}</b>
            <small>${e.temp!==null?`${e.temp.toLocaleString(void 0,{maximumFractionDigits:1})}\xB0`:""}</small>
            <span class="marks">
              ${e.lightsOn.length?g`<span class="mark light">💡 ${e.lightsOn.length}</span>`:y} ${e.open?g`<span class="mark open">🪟 ${e.open}</span>`:y}
              ${e.playing?g`<span class="mark">♪</span>`:y}
            </span>
          </button>`)}
      </div>`:y}renderCovers(){let t=(e,n)=>this.fire("nav-cover",{entities:e,service:n});return g`${this.covers.map(e=>g`<section>
        <header>
          <b>${e.name}</b>
          <button @click=${()=>t(e.items.map(n=>n.entity),"open_cover")}>▲ ${this.labels.allUp}</button>
          <button @click=${()=>t(e.items.map(n=>n.entity),"close_cover")}>▼ ${this.labels.allDown}</button>
        </header>
        ${e.items.map(n=>g`<div class="cover">
            <span class="name">${n.name}</span>
            <span class="pos">${n.position!==null?`${n.position} %`:""}</span>
            <button aria-label="▲" @click=${()=>t([n.entity],"open_cover")}>▲</button>
            <button aria-label="■" @click=${()=>t([n.entity],"stop_cover")}>■</button>
            <button aria-label="▼" @click=${()=>t([n.entity],"close_cover")}>▼</button>
          </div>`)}
      </section>`)}`}renderGroup(){let t=this.group;if(!t)return y;let e=(n,i)=>this.fire("nav-group",{entities:n,on:i});return g`${t.floors.map(n=>g`<section>
        <header>
          <b>${n.name}</b>
          ${t.allOn?g`<button @click=${()=>e(n.items.map(i=>i.entity),!0)}>${this.labels.allOn}</button>`:y}
          <button @click=${()=>e(n.items.filter(i=>i.on).map(i=>i.entity),!1)}>${this.labels.allOff}</button>
        </header>
        ${n.items.map(i=>g`<div class="cover">
            <span class="name">${i.name}</span>
            <span class="pos">${i.detail}</span>
            <button class="power" aria-pressed=${i.on} @click=${()=>e([i.entity],!i.on)}>${i.on?this.labels.on:this.labels.off}</button>
          </div>`)}
      </section>`)}`}renderMore(){return g`<div class="more">
      ${this.more.map(t=>g`<button aria-pressed=${t.pressed===void 0?y:t.pressed} @click=${()=>this.fire("nav-more",t.id)}>
          <span class="icon" aria-hidden="true">${t.icon}</span>
          <span class="text"><b>${t.label}</b>${t.hint?g`<small>${t.hint}</small>`:y}</span>
          ${t.pressed===void 0?y:g`<span class="switch" aria-hidden="true"></span>`}
        </button>`)}
    </div>`}render(){let t=this.sheet==="rooms"?"":this.sheet==="covers"?this.labels.covers:this.sheet==="more"?this.labels.more:this.sheet==="group"?this.group?.title??"":"";return g`${this.sheet?g`<div class="veil" @click=${()=>this.fire("nav-close")}></div>
            <div class="sheet" role="dialog">
              ${t?g`<h3>${t}</h3>`:y} ${this.sheet==="rooms"?this.renderRooms():this.sheet==="covers"?this.renderCovers():this.sheet==="group"?this.renderGroup():this.renderMore()}
            </div>`:y}
      ${this.attention&&!this.sheet&&this.active!=="now"?g`<button class="attention level${this.level}" @click=${()=>this.fire("nav-slot","now")}><span class="dot"></span><span class="sum">${this.attention}</span><span aria-hidden="true">›</span></button>`:y}
      <nav>
        ${this.slots.map(e=>g`<button class="slot" aria-pressed=${this.active===e.id} @click=${()=>this.fire("nav-slot",e.id)}>
            <span class="glyph ${e.id==="now"?`dot level${this.level}`:""}" aria-hidden="true">${e.id==="now"?"":e.icon?e.icon:e.id.startsWith("floor:")?"\u25A6":rm[e.id]}</span>
            <span class="label">${this.slotLabel(e)}</span>
            ${e.badge?g`<span class="badge">${e.badge}</span>`:y}
          </button>`)}
      </nav>`}static styles=ct`
    :host {
      display: block;
      color: #e8f0ff;
      font: 14px/1.3 var(--fp3d-font, system-ui, sans-serif);
    }
    button {
      font: inherit;
      color: inherit;
      cursor: pointer;
    }
    nav {
      position: relative;
      z-index: 3;
      display: flex;
      gap: 2px;
      padding: 6px 6px calc(6px + env(safe-area-inset-bottom, 0px));
      background: #0b1220;
      border-top: 1px solid rgba(120, 160, 255, 0.22);
    }
    .slot {
      position: relative;
      flex: 1 1 0;
      min-width: 0;
      min-height: 52px;
      display: grid;
      justify-items: center;
      align-content: center;
      gap: 3px;
      background: none;
      border: 0;
      border-radius: 14px;
      padding: 4px 2px;
    }
    .slot[aria-pressed="true"] {
      background: rgba(0, 229, 255, 0.16);
      color: #7df3ff;
    }
    .glyph {
      font-size: 18px;
      line-height: 20px;
      height: 20px;
    }
    .dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #3ddc84;
      display: inline-block;
    }
    .glyph.dot {
      margin-top: 3px;
      height: 14px;
    }
    .level1.dot,
    .level1 .dot {
      background: #ffb547;
    }
    .level2.dot,
    .level2 .dot {
      background: #ff5a5a;
    }
    .label {
      font-size: 11.5px;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .badge {
      position: absolute;
      top: 2px;
      left: calc(50% + 8px);
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      box-sizing: border-box;
      border-radius: 9px;
      background: #ffb547;
      color: #1a1200;
      font-size: 11px;
      font-weight: 700;
      line-height: 18px;
      text-align: center;
    }
    .attention {
      position: relative;
      z-index: 3;
      display: flex;
      align-items: center;
      gap: 10px;
      width: calc(100% - 16px);
      margin: 0 8px 6px;
      min-height: 40px;
      padding: 6px 14px;
      border-radius: 999px;
      background: #0e1626;
      border: 1px solid rgba(255, 181, 71, 0.6);
      text-align: left;
    }
    .attention.level2 {
      border-color: #ff5a5a;
    }
    .sum {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 600;
    }
    .veil {
      position: fixed;
      inset: 0;
      z-index: 1;
      background: rgba(0, 0, 0, 0.45);
    }
    .sheet {
      position: relative;
      z-index: 2;
      max-height: 62vh;
      overflow-y: auto;
      overscroll-behavior: contain;
      margin: 0 8px 6px;
      padding: 12px;
      border-radius: 18px;
      background: #0e1626;
      border: 1px solid rgba(120, 160, 255, 0.25);
    }
    h3 {
      margin: 0 0 10px 4px;
      font-size: 17px;
    }
    .tabs {
      display: flex;
      gap: 6px;
      margin-bottom: 10px;
      overflow-x: auto;
    }
    .tabs button {
      flex: none;
      min-height: 38px;
      padding: 6px 14px;
      border-radius: 999px;
      border: 1px solid rgba(120, 160, 255, 0.3);
      background: none;
    }
    .tabs button[aria-pressed="true"] {
      background: #00e5ff;
      border-color: #00e5ff;
      color: #06101c;
      font-weight: 600;
    }
    .tiles {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(104px, 1fr));
      gap: 8px;
    }
    .tile {
      position: relative;
      min-height: 76px;
      display: grid;
      align-content: start;
      gap: 2px;
      padding: 10px;
      border-radius: 14px;
      border: 1px solid rgba(120, 160, 255, 0.2);
      background: #121c30;
      text-align: left;
    }
    .tile.on {
      border-color: rgba(255, 196, 107, 0.7);
      background: #1d2334;
    }
    .tile[aria-pressed="true"] {
      border-color: #00e5ff;
    }
    .tile.whole {
      background: #16233c;
    }
    .tile b {
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tile small {
      opacity: 0.75;
      min-height: 16px;
    }
    .marks {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      font-size: 12px;
    }
    .mark.light {
      color: #ffc46b;
    }
    section + section {
      margin-top: 14px;
    }
    section header {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 6px;
    }
    section header b {
      flex: 1;
      font-size: 15px;
    }
    section header button,
    .cover button {
      min-height: 40px;
      min-width: 44px;
      padding: 6px 12px;
      border-radius: 999px;
      border: 1px solid rgba(120, 160, 255, 0.3);
      background: #16233c;
    }
    .cover .power {
      min-width: 60px;
    }
    .cover .power[aria-pressed="true"] {
      background: #ffb02e;
      border-color: #ffb02e;
      color: #1a1205;
      font-weight: 600;
    }
    .cover {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 0;
    }
    .cover .name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .cover .pos {
      opacity: 0.7;
      font-size: 12.5px;
      min-width: 44px;
      text-align: right;
    }
    .more {
      display: grid;
      gap: 6px;
    }
    .more button {
      display: flex;
      align-items: center;
      gap: 12px;
      min-height: 54px;
      padding: 8px 12px;
      border-radius: 14px;
      border: 1px solid rgba(120, 160, 255, 0.2);
      background: #121c30;
      text-align: left;
    }
    .more .icon {
      flex: none;
      width: 28px;
      text-align: center;
      font-size: 19px;
    }
    .more .text {
      flex: 1;
      display: grid;
      gap: 2px;
    }
    .more small {
      opacity: 0.75;
      font-size: 12.5px;
    }
    .switch {
      flex: none;
      width: 38px;
      height: 22px;
      border-radius: 11px;
      background: #33425c;
      position: relative;
    }
    .switch::after {
      content: "";
      position: absolute;
      top: 3px;
      left: 3px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #e8f0ff;
      transition: left 0.15s;
    }
    button[aria-pressed="true"] .switch {
      background: #00e5ff;
    }
    button[aria-pressed="true"] .switch::after {
      left: 19px;
    }
  `};customElements.get("fp3d-phone-nav")||customElements.define("fp3d-phone-nav",es);var ns=class extends at{static properties={hass:{attribute:!1},building:{attribute:!1},view:{attribute:!1},floorId:{attribute:!1},roomId:{attribute:!1},extras:{attribute:!1},solo:{type:Boolean},hide:{attribute:!1},places:{attribute:!1},_own:{state:!0},start:{attribute:!1},watts:{attribute:!1},mode:{reflect:!0},_sheet:{state:!0},_navFloor:{state:!0}};started=!1;stops=[];lastFloors=[];constructor(){super(),this.building=null,this.view=()=>null,this.floorId=null,this.roomId=null,this.extras=[],this.solo=!1,this.hide=[],this.start=void 0,this.places=void 0,this._own=0,this.watts=t=>`${Math.round(t)} W`,this.mode="bar",this._sheet=null,this._navFloor=null}t(t){return E(this.hass,t)}fire(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}words(){let t=(e,n)=>i=>this.t(i===1?e:n).replace("{n}",String(i));return{open:t("now_open_one","now_open"),tilted:this.t("now_tilted"),unlocked:t("now_unlocked_one","now_unlocked"),home:this.t("now_home"),away:this.t("now_away"),nobodyHome:this.t("now_nobody"),lights:t("now_lights_one","now_lights"),energyUse:this.t("energy_consumption"),energySolar:this.t("energy_solar"),energyGrid:this.t("energy_grid_import"),energyFeed:this.t("energy_grid_export"),battery:this.t("now_battery"),charging:this.t("wallbox_charging"),carAway:this.t("now_car_away"),calm:this.t("now_calm"),calmDetail:this.t("now_calm_detail"),watts:this.watts}}setMode(t){if(t==="check"){let e=this.view()?.nowInput();this.stops=e?nd(e,this.words()):[]}this.mode==="check"&&t!=="check"&&this.fire("phone-room",{floorId:this.floorId,roomId:null}),t==="check"!=(this.mode==="check")&&this.view()?.quietCards?.(t==="check"),this._sheet=null,this.mode=t,this.fire("phone-mode",t)}updated(){this.started||!this.hass||!this.building||(this.started=!0,this.start==="now"&&this.mode==="bar"&&this.setMode("page"))}openList(){this.setMode("page")}go(t){this.mode==="page"&&this.setMode("bar"),this.view()?.showNow(t)}act(t){!this.hass||!t.entities.length||(t.kind==="lock"?this.hass.callService("lock","lock",{entity_id:t.entities}):this.hass.callService("homeassistant","turn_off",{entity_id:t.entities}))}fav(t){let[e,n]=ae(t);this.hass?.callService(e,n,{entity_id:t})}groupOf(t){let e=this.hass,n=this.building;if(!e||!n||t.kind!=="lights"&&t.kind!=="climate")return null;let i=t.kind==="lights",r=l=>typeof l=="number"?`${l.toLocaleString(e.language,{maximumFractionDigits:1})}\xB0`:"",s=l=>{let c=e.states[l],d=c?.attributes??{},u=i?c?.state==="on":!!c&&c.state!=="off"&&c.state!=="unavailable"&&c.state!=="unknown",p=i?u&&typeof d.brightness=="number"?`${Math.round(d.brightness/2.55)} %`:"":[r(d.current_temperature),u?r(d.temperature):""].filter(Boolean).join(" \u2192 ");return{entity:l,name:B(e,l),on:u,detail:p}},a=[...n.floors].sort((l,c)=>l.elevation-c.elevation).map(l=>({id:l.id,name:l.name,items:(i?fn(e,l).lights:Sc(e,l)).map(s)})).filter(l=>l.items.length);return{title:t.name||this.t(i?"nav_lights":"nav_climate"),allOn:i,floors:a}}switchGroup(t,e){let n=this.hass;if(!n||!t.length)return;let i=t.filter(s=>s.startsWith("climate.")),r=t.filter(s=>!s.startsWith("climate."));r.length&&n.callService("homeassistant",e?"turn_on":"turn_off",{entity_id:r});for(let s of i){let a=n.states[s]?.attributes.hvac_modes??[],l=e?["heat","auto","heat_cool"].find(c=>a.includes(c))??a.find(c=>c!=="off"):"off";l&&(e||a.includes("off")||!a.length)&&n.callService("climate","set_hvac_mode",{entity_id:s,hvac_mode:l})}}tapSlot(t,e){if(t==="now")return this.setMode(this.mode==="page"?"bar":"page");if(this.mode!=="bar"&&this.setMode("bar"),t.startsWith("own:")){let s=Number(t.slice(4)),a=Zr(this.places)[s];if(!a)return;if(a.kind==="action"&&a.entity){this._sheet=null;let[l,c]=ae(a.entity);this.hass?.callService(l,c==="toggle"?"turn_on":c,{entity_id:a.entity})}else if(a.kind==="link"&&a.path)this._sheet=null,this.fire("phone-link",a.path);else{let l=this._sheet==="group"&&this._own===s;this._own=s,this._sheet=l?null:"group"}return}let n=t.startsWith("floor:")?t.slice(6):null,i=n||t==="rooms"?"rooms":t==="covers"?"covers":"more",r=this._sheet===i&&(!n||n===this._navFloor);this._sheet=r?null:i,i==="rooms"&&(this._navFloor=n??(e.some(s=>s.id===this.floorId)?this.floorId:e[0]?.id??null))}tapMore(t){this._sheet=null,t==="check"?this.setMode("check"):t==="house"?this.fire("phone-room",{floorId:null,roomId:null}):t==="solo"?this.fire("phone-solo",!this.solo):t==="find"?this.view()?.openFind?.():t.startsWith("slot:")?this.tapSlot(t.slice(5),this.lastFloors):this.fire("phone-more",t)}render(){let t=this.hass,e=this.building;if(!t||!e)return y;let n=this.view()?.nowInput()??null,i=this.words();n?.away&&(i.calm=this.t("now_calm_away"));let r=n?td(n,i):[],s=n?ed(r):{text:"",level:0},a=od(e.floors,$e(t,e,null)),l=[...e.floors].sort((x,I)=>x.elevation-I.elevation).map(x=>({id:x.id,name:x.name,items:fn(t,x).covers.map(I=>sd(I,B(t,I),t.states[I]?.state,t.states[I]?.attributes.current_position))})).filter(x=>x.items.length),c=l.reduce((x,I)=>x+I.items.filter(T=>T.shut).length,0),d=new Set(this.hide??[]),u=Zr(this.places),p=u.map(x=>this.groupOf(x)),h={lights:"\u{1F4A1}",climate:"\u{1F321}",action:"\u25B6",link:"\u2197"},_=u.map((x,I)=>({id:`own:${I}`,label:x.name||(x.kind==="lights"?this.t("nav_lights"):x.kind==="climate"?this.t("nav_climate"):x.kind==="action"&&x.entity?B(t,x.entity):this.t("nav_page")),icon:x.icon||h[x.kind],badge:x.kind==="lights"?p[I]?.floors.reduce((T,z)=>T+z.items.filter(R=>R.on).length,0)??0:0})).filter((x,I)=>p[I]?p[I].floors.length>0:u[I].kind==="link"||!!t.states[u[I].entity??""]),{bar:b,over:m}=rd(id(d.has("rooms")?[]:a,r.filter(x=>x.level>0).length,c,l.length>0&&!d.has("covers"),_));this.lastFloors=a;let w=this.mode==="page"?"now":this._sheet==="rooms"?b.some(x=>x.id==="rooms")?"rooms":`floor:${this._navFloor}`:this._sheet==="group"?`own:${this._own}`:this._sheet,k={title:this.t("now_title"),close:this.t("close"),lightsOff:this.t("now_lights_off"),lock:this.t("now_lock"),check:this.t("now_check"),checkHint:this.t("now_check_hint"),next:this.t("now_next"),done:this.t("now_done"),checkDone:this.t("now_check_done"),checkNothing:this.t("now_check_nothing"),windowHint:this.t("now_window_hint"),allLightsOff:this.t("now_all_lights_off")},v={now:this.t("nav_now"),rooms:this.t("nav_rooms"),covers:this.t("nav_covers"),more:this.t("nav_more"),wholeFloor:this.t("nav_whole_floor"),allUp:this.t("nav_all_up"),allDown:this.t("nav_all_down"),allOn:this.t("nav_all_on"),allOff:this.t("nav_all_off"),on:this.t("nav_dev_on"),off:this.t("nav_dev_off"),close:this.t("close")},f=[...m.map(x=>({id:`slot:${x.id}`,icon:x.icon??(x.id==="covers"?"\u25A4":"\u25A6"),label:x.label||this.t(x.id==="covers"?"nav_covers":"nav_rooms"),hint:x.badge?String(x.badge):void 0})),{id:"find",icon:"\u{1F50D}",label:this.t("find")},{id:"check",icon:"\u{1F6AA}",label:this.t("now_check"),hint:this.t("now_check_hint")},{id:"house",icon:"\u{1F3E0}",label:this.t("nav_house")},{id:"solo",icon:"\u{1F50E}",label:this.t("nav_solo"),hint:this.t("nav_solo_hint"),pressed:this.solo},...this.extras],M=d.has("favorites")?[]:(e.settings.favorites??[]).filter(x=>!!t.states[x]).map(x=>({entity:x,name:B(t,x)}));return g`${this.mode!=="bar"?g`<fp3d-now-list
            class="list"
            .items=${r}
            .summary=${s}
            .stops=${this.stops}
            .labels=${k}
            .favorites=${M}
            .mode=${this.mode}
            @now-mode=${x=>this.setMode(x.detail)}
            @now-go=${x=>this.go(x.detail)}
            @now-act=${x=>this.act(x.detail)}
            @now-fav=${x=>this.fav(x.detail)}
          ></fp3d-now-list>`:y}
      ${this.mode!=="check"?g`<fp3d-phone-nav
            class="nav"
            .slots=${b}
            .floors=${a}
            .covers=${l}
            .more=${f}
            .group=${this._sheet==="group"?p[this._own]??null:null}
            .labels=${v}
            .sheet=${this._sheet}
            .floorId=${this._navFloor}
            .roomId=${this.roomId}
            .active=${w}
            .level=${s.level}
            .attention=${s.level>0&&!this.roomId?s.text:""}
            @nav-slot=${x=>this.tapSlot(x.detail,a)}
            @nav-floor=${x=>this._navFloor=x.detail}
            @nav-close=${()=>this._sheet=null}
            @nav-room=${x=>{this._sheet=null,this.fire("phone-room",x.detail)}}
            @nav-cover=${x=>{t.callService("cover",x.detail.service,{entity_id:x.detail.entities})}}
            @nav-group=${x=>this.switchGroup(x.detail.entities,x.detail.on)}
            @nav-more=${x=>this.tapMore(x.detail)}
          ></fp3d-phone-nav>`:y}`}static styles=ct`
    /* over the 3D view, without taking its touches: only the bar, the pages and the card catch them */
    :host {
      position: absolute;
      inset: 0;
      z-index: 9;
      pointer-events: none;
    }
    .nav,
    .list {
      pointer-events: auto;
      position: absolute;
      left: 0;
      right: 0;
    }
    .nav {
      bottom: 0;
      z-index: 2;
    }
    .list[mode="page"] {
      top: 0;
      bottom: calc(64px + env(safe-area-inset-bottom, 0px));
      z-index: 1;
    }
    .list[mode="check"] {
      left: 8px;
      right: 8px;
      bottom: 8px;
    }
  `};customElements.get("fp3d-phone-shell")||customElements.define("fp3d-phone-shell",ns);var ad;function os(){let o=new URL("./homeplan3d-editor.js?v=3afde3b22bf3",new URL(import.meta.url)).href;return ad??=import(o),ad}var sm={"clear-night":{},sunny:{},partlycloudy:{cloud:.45},cloudy:{cloud:.9},fog:{fog:1,cloud:.6},hail:{rain:.8,cloud:1},lightning:{lightning:!0,cloud:.9},"lightning-rainy":{rain:.8,lightning:!0,cloud:1},pouring:{rain:1,cloud:1},rainy:{rain:.55,cloud:.85},snowy:{snow:.8,cloud:.9},"snowy-rainy":{rain:.35,snow:.5,cloud:1},windy:{wind:.8,cloud:.2},"windy-variant":{wind:.8,cloud:.7},exceptional:{cloud:.5}};function ue(o,t){return t&&o.states[t]?t:Object.keys(o.states).filter(e=>e.startsWith("weather.")).sort()[0]??null}function is(o,t){let e=t?o.states[t]:void 0;if(!e||e.state==="unavailable"||e.state==="unknown")return null;if(e.entity_id.startsWith("binary_sensor."))return e.state==="on"?.6:0;let n=Number(e.state);if(!Number.isFinite(n))return null;let r=String(e.attributes.unit_of_measurement??"").startsWith("in")?n*25.4:n;return r<=.1?0:Math.min(1,.3+r/10)}function ld(o,t,e){let n=t?o.states[t]:void 0;if(!n||n.state==="unavailable"||n.state==="unknown")return null;let i=sm[n.state];if(!i)return null;let r=n.attributes,s=i.cloud??0;typeof r.cloud_coverage=="number"&&(s=Math.min(1,Math.max(0,r.cloud_coverage/100)));let a=i.wind??0;if(typeof r.wind_speed=="number"){let c=r.wind_speed_unit==="m/s"?r.wind_speed*3.6:r.wind_speed_unit==="mph"?r.wind_speed*1.609:r.wind_speed;a=Math.max(a,Math.min(1,c/60))}let l=is(o,e);return l!==null&&l>0&&(s=Math.max(s,.85)),{entity:n.entity_id,condition:n.state,rain:l??i.rain??0,snow:i.snow??0,fog:i.fog??0,cloud:s,wind:a,lightning:!!i.lightning}}function cd(o,t){let e=new Set(t??zl);return{...o,rain:e.has("rain")?o.rain:0,snow:e.has("snow")?o.snow:0,fog:e.has("fog")?o.fog:0,cloud:e.has("clouds")?o.cloud:0,lightning:e.has("lightning")&&o.lightning,sky:e.has("sky")}}var dd={mode:"open-source",license:"MIT",features:[{id:"camera_cockpit",enabled:!0},{id:"weather",enabled:!0},{id:"screens",enabled:!0},{id:"energy_pro",enabled:!0},{id:"sound",enabled:!0},{id:"auto_pro",enabled:!0},{id:"time_travel",enabled:!0},{id:"pool",enabled:!0},{id:"household",enabled:!0},{id:"frames",enabled:!0},{id:"fridge_smart",enabled:!0},{id:"fun_pets",enabled:!0},{id:"fun_halloween",enabled:!0},{id:"fun_winter",enabled:!0},{id:"room_bar",enabled:!0},{id:"diagnostics",enabled:!0},{id:"locate",enabled:!0}]};var lm=dd,cm=lm.features.filter(o=>o.enabled).map(o=>o.id);function ud(){try{let o=new URLSearchParams(location.search).get("fp3d_projection");return o==="1"?localStorage.setItem("homeplan3d.projection","1"):o==="0"&&localStorage.removeItem("homeplan3d.projection"),localStorage.getItem("homeplan3d.projection")==="1"}catch{return!1}}function G(o,t){return cm.includes(o)}function pd(o){return!0}var dm=new Set(["ob","on_battery","onbattery","on battery","battery","outage","power_outage","power outage","offline","off_grid","off grid","off-grid","no_grid","no grid"]),um=new Set(["power","plug","connectivity","running"]);function Xo(o){if(!o||o.state==="unavailable"||o.state==="unknown")return!1;let t=o.entity_id.split(".")[0];if(t==="binary_sensor")return um.has(String(o.attributes.device_class))?o.state==="off":o.state==="on";if(t==="input_boolean"||t==="switch")return o.state==="on";let e=Number(o.state);if(o.state!==""&&Number.isFinite(e))return o.attributes.unit_of_measurement==="V"&&e<100;let n=String(o.state).toLowerCase().trim();return dm.has(n)||n.startsWith("ob ")}function as(o){let t=vt(o);if(!t)return!1;if(pm.test([t.id,...t.tags??[],...Object.values(t.name??{})].join(" ")))return!t.light||/plant/i.test(t.id);if(t.light)return!1;let e=t.parts.filter(n=>n.color==="plant").length;return e>0&&e+t.parts.filter(n=>n.color==="pot").length>=t.parts.length/2}var pm=/plant|palm|monstera|ficus|\bfig\b|fig_|bonsai|cactus|yucca|orchid|bamboo|snake_|lily|rubber|olive|\bherb|\bfern\b|\bivy\b|flower|tulip/i;var xt=["#3a3f47","#3a3f47"],Ue=["#23262b","#23262b"],Bt=["#5a3b25","#5a3b25"],bt=["#1f4fa8","#1f4fa8"],Se=["#e3b616","#e3b616"],et=["#2f7d3b","#2f7d3b"],hd={default:{rest:xt,bio:Bt,paper:bt,plastic:Se,glass:et,garden:et,recycling:Se,other:xt},DE:{rest:Ue,bio:Bt,paper:bt,plastic:Se,glass:et,garden:et,recycling:Se},AT:{rest:xt,bio:Bt,paper:[xt[0],"#c0262d"],plastic:Se,glass:et,garden:et},CH:{rest:["#d8d8d8","#d8d8d8"],bio:et,paper:bt,plastic:xt,glass:et,garden:et},NL:{rest:xt,bio:et,paper:bt,plastic:["#3a3f47","#e57a1f"],glass:et,garden:et},BE:{rest:xt,bio:et,paper:bt,plastic:bt,glass:et,garden:et},GB:{rest:Ue,bio:["#3a3f47","#5a3b25"],paper:bt,plastic:bt,glass:Ue,garden:Bt,recycling:bt},US:{rest:Ue,bio:et,paper:bt,plastic:bt,glass:bt,garden:et,recycling:bt},CA:{rest:Ue,bio:et,paper:bt,plastic:bt,glass:bt,garden:et,recycling:bt},AU:{rest:["#2f7d3b","#c0262d"],bio:["#2f7d3b","#55b043"],paper:["#2f7d3b","#e3b616"],plastic:["#2f7d3b","#e3b616"],recycling:["#2f7d3b","#e3b616"],glass:["#2f7d3b","#7a3e9d"],garden:["#2f7d3b","#55b043"]},FR:{rest:xt,bio:Bt,paper:[xt[0],"#e3b616"],plastic:[xt[0],"#e3b616"],recycling:[xt[0],"#e3b616"],glass:et,garden:et},IT:{rest:xt,bio:Bt,paper:bt,plastic:Se,glass:et,garden:et},ES:{rest:xt,bio:Bt,paper:bt,plastic:Se,glass:et,garden:et},PT:{rest:xt,bio:Bt,paper:bt,plastic:Se,glass:et,garden:et},DK:{rest:Ue,bio:et,paper:bt,plastic:xt,glass:et,garden:et},SE:{rest:Ue,bio:Bt,paper:bt,plastic:xt,glass:et,garden:et},NO:{rest:xt,bio:Bt,paper:bt,plastic:xt,glass:et,garden:et},FI:{rest:xt,bio:Bt,paper:bt,plastic:xt,glass:et,garden:et}},bd="DE";function _d(o){bd=o}function vd(o){let t=o?.config?.country;if(t)return t.toUpperCase();let e=(o?.language??"").split("-")[1];return e?e.toUpperCase():"DE"}function hm(o,t){return hd[t]?.[o]??hd.default[o]??xt}function wd(o,t=bd){let e=hm(o.bin_kind??"rest",t),n=o.bin_color||e[0];return[n,o.bin_lid||(o.bin_color?n:e[1])]}var fm={rest:["rest","general","garbage","trash","refuse","landfill","residual","black bin"],bio:["bio","organic","food","compost"],paper:["paper","cardboard","carton"],plastic:["plastic","packaging"],glass:["glass"],garden:["garden","yard","green waste"],recycling:["recycl"]};function ss(o,t,e){let n=` ${o.toLowerCase()} `;return e&&e.trim()?e.toLowerCase().split(/[,;|]/).some(i=>i.trim()&&n.includes(i.trim())):t==="other"?!1:fm[t].some(i=>n.includes(i))}function ls(o){let t=typeof o=="string"?o:o?.date??o?.dateTime;if(!t)return null;let e=/^(\d{4})-(\d{2})-(\d{2})$/.exec(t),n=e?new Date(Number(e[1]),Number(e[2])-1,Number(e[3])):new Date(t);return Number.isNaN(n.getTime())?null:new Date(n.getFullYear(),n.getMonth(),n.getDate())}function mm(o){return o.map(t=>({day:ls(t.start),summary:String(t.summary??"")})).filter(t=>!!t.day).sort((t,e)=>t.day.getTime()-e.day.getTime())}function yd(o){let t=new Set;for(let e of o.flatMap(n=>n.furniture))e.type==="waste_bin"&&typeof e.bin_source=="string"&&e.bin_source.startsWith("calendar.")&&t.add(e.bin_source);return[...t]}async function xd(o,t,e=new Date,n=42){let i=new Map,r=o.callApi;if(!r)return i;let s=new Date(e.getFullYear(),e.getMonth(),e.getDate()),a=ei(s,n);return await Promise.all(t.map(async l=>{try{let c=await r.call(o,"GET",`calendars/${l}?start=${encodeURIComponent(s.toISOString())}&end=${encodeURIComponent(a.toISOString())}`);i.set(l,mm(Array.isArray(c)?c:[]))}catch{}})),i}function fd(o){let t=typeof o=="string"?o:o?.dateTime??o?.date;if(!t)return null;let e=/^(\d{4})-(\d{2})-(\d{2})$/.exec(t),n=e?new Date(Number(e[1]),Number(e[2])-1,Number(e[3])):new Date(t);return Number.isNaN(n.getTime())?null:{at:n,allDay:!!e}}function gm(o,t){return o.map(e=>{let n=fd(e.start),i=fd(e.end);return{summary:String(e.summary??"").trim(),calendar:t,allDay:!!n?.allDay,start:n?.at??null,end:i?.at??null}}).filter(e=>e.summary)}async function kd(o,t,e=new Date){let n=o.callApi;if(!n||!t.length)return[];let i=new Date(e.getFullYear(),e.getMonth(),e.getDate()),r=ei(i,1);return(await Promise.all(t.map(async a=>{try{let l=await n.call(o,"GET",`calendars/${a}?start=${encodeURIComponent(i.toISOString())}&end=${encodeURIComponent(r.toISOString())}`);return gm(Array.isArray(l)?l:[],a)}catch{return[]}}))).flat()}function $d(o,t=new Date,e,n=6){let i=new Date(t.getFullYear(),t.getMonth(),t.getDate()),r=ei(i,1),s=a=>a.toLocaleTimeString(e||void 0,{hour:"2-digit",minute:"2-digit"});return o.filter(a=>a.allDay?(!a.start||a.start<r)&&(!a.end||a.end>i):a.end&&a.end<=t?!1:!a.start||a.start<r).sort((a,l)=>Number(l.allDay)-Number(a.allDay)||(a.start?.getTime()??0)-(l.start?.getTime()??0)).filter((a,l,c)=>c.findIndex(d=>d.summary===a.summary&&d.start?.getTime()===a.start?.getTime())===l).slice(0,n).map(a=>{let l=!a.allDay&&a.start&&a.start>=i,c=!a.allDay&&!!a.start&&a.start.getTime()-t.getTime()<=36e5&&(!a.end||a.end>t);return{icon:"calendar-clock",text:l?`${s(a.start)} ${a.summary}`:a.summary,entity:a.calendar,...c?{hot:!0}:{}}})}var wn=o=>new Date(o.getFullYear(),o.getMonth(),o.getDate()),ei=(o,t)=>new Date(o.getFullYear(),o.getMonth(),o.getDate()+t),Zo=(o,t)=>Math.round((wn(t).getTime()-wn(o).getTime())/864e5);function rs(o,t,e={}){let n=e.from??14,i=e.until??12,r=t.getHours()+t.getMinutes()/60;return o===1&&r>=n||o===0&&r<i}function Sd(o,t,e,n=new Date,i=3){let r=typeof o.bin_source=="string"&&o.bin_source!=="none"?o.bin_source:null;if(!r)return[];if(r.startsWith("calendar.")){let a=wn(n);return(e.get(r)??[]).filter(l=>l.day>=a&&ss(l.summary,o.bin_kind??"rest",o.bin_match)).slice(0,i)}let s=cs(o,t,e,n);return s?[{day:s.day,summary:s.summary}]:[]}function cs(o,t,e,n=new Date,i={}){let r=typeof o.bin_source=="string"&&o.bin_source!=="none"?o.bin_source:null;if(!r)return null;let s=wn(n);if(r.startsWith("calendar.")){let d=(e.get(r)??[]).find(p=>p.day>=s&&ss(p.summary,o.bin_kind??"rest",o.bin_match));if(!d)return null;let u=Zo(s,d.day);if(u===0&&n.getHours()+n.getMinutes()/60>=(i.until??12)){let p=(e.get(r)??[]).find(h=>h.day>s&&ss(h.summary,o.bin_kind??"rest",o.bin_match));if(p)return{days:Zo(s,p.day),day:p.day,summary:p.summary,glow:rs(Zo(s,p.day),n,i)}}return{days:u,day:d.day,summary:d.summary,glow:rs(u,n,i)}}let a=t.states[r];if(!a)return null;let l=vm(a,n);if(l===null||l<0)return null;let c=ei(s,l);return{days:l,day:c,summary:String(a.attributes.friendly_name??""),glow:rs(l,n,i)}}function bm(o,t){let e=typeof o=="string"&&o!=="none"?o:null,n=e?t.states[e]:void 0;return!!n&&Td.has(String(n.state).toLowerCase())}function ds(o,t){return bm(o.bin_out,t)}function Md(o){return typeof o.bin_out=="string"&&/^(input_boolean|switch)\./.test(o.bin_out)}function Id(o,t=.3){let e=o.filter(a=>!a.icon),n=e.map((a,l)=>l),i=a=>n[a]===a?a:n[a]=i(n[a]);for(let a=0;a<e.length;a++)for(let l=a+1;l<e.length;l++){let c=e[a],d=e[l];c.floorId===d.floorId&&Math.hypot(c.x-d.x,c.z-d.z)<=c.r+d.r+t&&(n[i(l)]=i(a))}let r=new Map;e.forEach((a,l)=>r.set(i(l),[...r.get(i(l))??[],a]));let s=[];for(let a of r.values())a.sort((l,c)=>l.days-c.days||l.name.localeCompare(c.name)),s.push({floorId:a[0].floorId,x:a.reduce((l,c)=>l+c.x,0)/a.length,z:a.reduce((l,c)=>l+c.z,0)/a.length,y:Math.max(...a.map(l=>l.y)),lines:a});for(let a of o)a.icon&&s.push({floorId:a.floorId,x:a.x,z:a.z,y:a.y,lines:[a]});return s}function Pd(o,t={}){let e=typeof t.ahead=="number"&&t.ahead>=0?t.ahead:null,n=o.length?Math.min(...o.map(i=>i.days)):0;return new Set(o.filter(i=>(e===null||i.days<=e)&&(!t.nextOnly||i.days===n)).map(i=>i.id))}function _m(o,t=new Date){let e=/(\d{4})-(\d{1,2})-(\d{1,2})/.exec(o),n=/(?:^|[^\d])(\d{1,2})([./])(\d{1,2})\2(\d{4}|\d{2})?(?![\d])/.exec(o)??/(?:^|[^\d])(\d{1,2})(-)(\d{1,2})-(\d{4})(?![\d])/.exec(o),i,r,s;if(e)[i,r,s]=[Number(e[1]),Number(e[2]),Number(e[3])];else if(n){let l=Number(n[1]),c=Number(n[3]);n[2]==="/"&&c>12&&l<=12&&([l,c]=[c,l]),s=l,r=c;let d=n[4];i=d?d.length===2?2e3+Number(d):Number(d):t.getFullYear(),!d&&new Date(i,r-1,s)<wn(t)&&(i+=1)}else return null;if(r<1||r>12||s<1||s>31)return null;let a=new Date(i,r-1,s);return a.getMonth()===r-1?a:null}function vm(o,t=new Date){let e=o.attributes;if(typeof e.daysTo=="number")return e.daysTo;for(let l of["Days_until","days_until"]){let c=e[l];if(typeof c=="number"&&Number.isFinite(c))return Math.round(c);if(typeof c=="string"&&/^-?\d+$/.test(c.trim()))return Number(c.trim())}let n=String(o.state).trim();if(/^-?\d+(\.\d+)?$/.test(n))return Math.round(Number(n));let i=/^\d{4}-\d{2}-\d{2}T/.test(n)?ls(n):_m(n,t);if(i)return Zo(t,i);let r=n.toLowerCase();if(/(^|\s)today/.test(r))return 0;if(/(^|\s)tomorrow/.test(r))return 1;let s=/(\d+)\s*day/.exec(r)??/\bin\s+(\d+)/.exec(r);if(s)return Number(s[1]);let a=r.match(/\d+/g);return a?Number(a[a.length-1]):null}var Td=new Set(["on","open","true","detected","home"]);function md(o){let t=o?.last_changed?Date.parse(o.last_changed):NaN;return Number.isFinite(t)?t:null}function Ed(o,t,e=Date.now()){let n=typeof o.entity=="string"&&o.entity!=="none"?o.entity:null;if(!n)return!1;let i=t.states[n];if(!i||i.state==="unavailable"||i.state==="unknown")return!1;let r=typeof o.mailbox_door=="string"&&o.mailbox_door!=="none"?o.mailbox_door:null;if(!r){let l=Number(i.state);return Td.has(i.state.toLowerCase())||Number.isFinite(l)&&l>0}let s=md(i),a=md(t.states[r]);return s===null||e-s>7*864e5?!1:a===null||s>a+1e3}function Rd(o){return o.type==="waste_bin"?[o.bin_source??null,o.bin_out??null]:o.type==="mailbox"?[o.entity??null,o.mailbox_door??null]:xm(o)}function Ad(o){if(o==="washer"||o==="dryer"||o==="dishwasher")return o;let t=vt(o)?.id;return t?/dishwasher/.test(t)?"dishwasher":/dryer/.test(t)?"dryer":/washer|washing/.test(t)?"washer":/oven|cooker/.test(t)?"oven":null:null}var zd=o=>{let t=o?Number(o.state):NaN;return Number.isFinite(t)?t:null};function us(o,t){let e=typeof o.moisture=="string"&&o.moisture!=="none"?o.moisture:null,n=e?t.states[e]:void 0;if(!e||!n)return!1;if(e.startsWith("plant.")){let r=n.attributes,s=String(r.problem??"").toLowerCase();return String(r.moisture_status??"").toLowerCase()==="low"||n.state==="problem"&&s.includes("moisture")&&!s.includes("high")}let i=zd(n);return i!==null&&i<(o.moisture_min??20)}function ps(o,t=Date.now()){if(!o||o.state==="unavailable"||o.state==="unknown")return null;let e=String(o.state).trim(),n=String(o.attributes.unit_of_measurement??"min").toLowerCase();if(/^-?\d+(\.\d+)?$/.test(e)){let s=Number(e),a=n==="s"?s/60:n==="h"?s*60:s;return Math.max(0,Math.round(a))}let i=/^(\d+):(\d{2})(?::(\d{2}))?$/.exec(e);if(i)return Number(i[1])*60+Number(i[2])+Math.round(Number(i[3]??0)/60);let r=Date.parse(e);return Number.isFinite(r)&&/\d{4}-\d{2}-\d{2}T/.test(e)?Math.max(0,Math.round((r-t)/6e4)):null}var wm=new Set(["finished","end","ended","done","complete","completed","program_finished","programfinished"]);function hs(o){if(!o)return!1;let t=String(o.state).toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/\s+/g,"_");return wm.has(t)}var ym=new Set(["off","idle","standby","stand_by","ready","inactive","sleep","sleeping","power_off","unavailable"]);function fs(o,t,e){let n=o?String(o.state).toLowerCase().replace(/\s+/g,"_"):null;if(n!==null&&ym.has(n))return!0;let i=!!o&&/^(switch|input_boolean|light)\./.test(o.entity_id),r=!!o&&!i&&n!==null&&(n==="on"||/run|wash|dry|rinse|spin|clean/.test(n));return t!==null&&t<=e&&!r}function Fd(o){return o>=60?`${Math.floor(o/60)}:${String(o%60).padStart(2,"0")} h`:`${o} min`}function gd(o,t,e,n){let i=typeof o=="string"&&o!=="none"?o:null,r=i?e.states[i]:void 0;if(!i||!r||r.state==="unavailable"||r.state==="unknown")return!1;if(i.startsWith("binary_sensor.")||i.startsWith("input_boolean."))return r.state==="on";let s=zd(r);if(s!==null)return s<=(t??10);let a=ls(r.state);return!!a&&a.getTime()<=wn(n).getTime()}function Cd(o,t,e=new Date){let n=[];return gd(o.service,o.service_min,t,e)&&n.push(o.service),o.service2!==o.service&&gd(o.service2,o.service2_min,t,e)&&n.push(o.service2),n}var Me=o=>[o.door_left,o.door_right].filter(t=>typeof t=="string"&&t!=="none"),Od=o=>!!o&&(o.state==="on"||o.state==="open");function ni(o,t,e=Date.now()){let n=(o.door_alarm??2)*6e4;for(let i of Me(o)){let r=t.states[i];if(Od(r)&&r?.last_changed&&e-Date.parse(r.last_changed)>=n)return i}return null}function Hd(o,t,e=Date.now()){let n=null;for(let i of o)if(!(i.type!=="fridge"&&i.type!=="fridge_smart"))for(let r of Me(i)){let s=t.states[r];if(!Od(s)||!s?.last_changed)continue;let a=Date.parse(s.last_changed)+(i.door_alarm??2)*6e4-e;a>0&&(n===null||a<n)&&(n=a)}return n}var ti=class{running=new Map;ended=new Map;update(t,e,n,i=Date.now()){let r=this.running.get(t);if(this.running.set(t,e),e)return this.ended.delete(t),!1;r===!0&&this.ended.set(t,i);let s=this.ended.get(t);return s===void 0?!1:i-s>12*36e5||n(s)?(this.ended.delete(t),!1):!0}};function xm(o){return[o.moisture??null,o.remaining??null,o.service??null,o.service2??null]}var km=10*6e4,$m=new Set(["rainy","pouring","lightning-rainy","hail","snowy-rainy"]),Nd={smoke:"smoke",gas:"gas",carbon_monoxide:"co",moisture:"water"};function oo(o,t,e){let n=[];for(let d of t.floors)for(let u of d.rooms){let p=wt(o,u.area_id).filter(h=>h.startsWith("binary_sensor.")&&!!Nd[String(o.states[h]?.attributes.device_class)]);p.length&&n.push({floorId:d.id,roomId:u.id,sensors:p})}let i=Object.keys(o.states),r=t.settings.rain_warning===!1?null:ue(o,e??t.settings.weather_entity),s=t.settings.outage_entity&&o.states[t.settings.outage_entity]?t.settings.outage_entity:null,a=G("household")?t.floors.flatMap(d=>d.furniture.filter(u=>(u.type==="fridge"||u.type==="fridge_smart")&&Me(u).length).map(u=>({floorId:d.id,roomId:d.rooms.find(p=>p.points.length>=3&&W([u.x,u.z],p.points))?.id??null,furnitureId:u.id,ids:Me(u)}))):[],l=t.settings.rain_warning===!1?null:t.settings.rain_entity,c=l&&o.states[l]?l:null;return{rooms:n,alarms:i.filter(d=>d.startsWith("alarm_control_panel.")),weather:r,outage:s,rain:c,fridges:a}}function ms(o){return[...o.rooms.flatMap(t=>t.sensors),...o.alarms,...o.weather?[o.weather]:[],...o.outage?[o.outage]:[],...o.rain?[o.rain]:[],...(o.fridges??[]).flatMap(t=>t.ids)]}function oi(o,t,e,n){let i=[];for(let a of e.rooms)for(let l of a.sensors){let c=o.states[l];c?.state==="on"&&i.push({kind:Nd[String(c.attributes.device_class)],entity:l,roomId:a.roomId,floorId:a.floorId})}let r=e.rain?is(o,e.rain):null;if(r!==null?r>0:!!e.weather&&$m.has(o.states[e.weather]?.state??""))for(let a of t.floors)for(let l of a.openings){if(l.type!=="window"||l.rain_ignore)continue;let c=n.get(l.id);if(!c)continue;let d=se(o,c,"window");d.open<.5&&d.tilt<.5&&d.open2<.5&&d.tilt2<.5||i.push({kind:"window_rain",entity:c.contact??c.tilt??c.contact2??l.id,roomId:l.room_id,floorId:a.id})}if(e.outage&&Xo(o.states[e.outage])&&i.push({kind:"power_outage",entity:e.outage,roomId:null,floorId:null}),t.settings.alert_unavailable){let a=Date.now(),l=new Set;for(let c of t.floors)for(let d of c.openings){let u=n.get(d.id);if(u)for(let p of[u.contact,u.tilt,u.contact2,u.tilt2]){if(!p||l.has(p))continue;let h=o.states[p];if(!h||h.state!=="unavailable"&&h.state!=="unknown")continue;let _=Date.parse(h.last_changed??"");Number.isFinite(_)&&a-_<km||(l.add(p),i.push({kind:"contact_unavailable",entity:p,roomId:d.room_id,floorId:c.id}))}}}for(let a of e.fridges??[]){let l=t.floors.find(d=>d.id===a.floorId)?.furniture.find(d=>d.id===a.furnitureId),c=l?ni(l,o):null;c&&i.push({kind:"fridge_door",entity:c,roomId:a.roomId,floorId:a.floorId})}for(let a of e.alarms){let l=o.states[a]?.state;l==="triggered"?i.push({kind:"alarm",entity:a,roomId:null,floorId:null}):l==="pending"&&i.push({kind:"alarm_pending",entity:a,roomId:null,floorId:null})}return i}function Dd(o){if(o.color)return o.color;switch(o.kind){case"water":return[.2,.6,1];case"window_rain":return[.35,.72,1];case"alarm_pending":return[1,.62,.2];case"power_outage":return[1,.78,.2];case"fridge_door":return[.45,.85,1];case"contact_unavailable":return[.72,.62,1];default:return[1,.2,.25]}}function Ie(o,t,e){let n=e.roomId?t.floors.flatMap(s=>s.rooms).find(s=>s.id===e.roomId):null;if(e.text!==void 0)return n?`${n.name} \xB7 ${e.text}`:e.text;let i=o?B(o,e.entity):e.entity,r=E(o,`alert_${e.kind}`,{name:i});return n?t.settings.alert_names===!1?`${n.name} \xB7 ${E(o,`alert_short_${e.kind}`)}`:`${n.name} \xB7 ${r}`:r}function ii(o,t){let e=$e(o,t,null),n=e.map(r=>r.temp).filter(r=>r!==null),i=oi(o,t,oo(o,t),new Map).filter(r=>r.roomId!==null);return{rooms:e.length,lightsOn:e.reduce((r,s)=>r+s.lightsOn.length,0),open:e.reduce((r,s)=>r+s.open,0),playing:e.filter(r=>r.playing).length,temp:n.length?Math.round(n.reduce((r,s)=>r+s,0)/n.length*10)/10:null,alerts:i}}var Tt=ct`
  :host {
    --fp3d-bg: #070b14;
    --fp3d-bg2: #0d1424;
    --fp3d-chrome: rgba(14, 21, 38, 0.86);
    --fp3d-chrome-solid: #0f1729;
    --fp3d-line: rgba(120, 170, 255, 0.16);
    --fp3d-text: #e6eefc;
    --fp3d-muted: #8a9bb8;
    --fp3d-accent: #37e0ff;
    --fp3d-accent-text: #041018;
    --fp3d-soft: #5b7cff;
    --fp3d-warm: #ffb547;
    --fp3d-danger: #ff6b8b;
    --fp3d-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
    --fp3d-font: "Figtree", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    --fp3d-title-font: "Bricolage Grotesque", "Figtree", system-ui, sans-serif;
    color-scheme: dark;
    font-family: var(--fp3d-font);
    color: var(--fp3d-text);
  }
`,zt=ct`
  .fp3d-seg {
    display: inline-flex;
    padding: 3px;
    gap: 2px;
    border-radius: 999px;
    background: var(--fp3d-chrome);
    box-shadow: var(--fp3d-shadow);
  }
  .fp3d-seg button,
  .fp3d-chip {
    font: inherit;
    font-weight: 500;
    border: none;
    background: none;
    color: var(--fp3d-muted);
    padding: 7px 13px;
    border-radius: 999px;
    cursor: pointer;
    white-space: nowrap;
    min-height: 34px;
  }
  .fp3d-seg button[aria-pressed="true"],
  .fp3d-chip[aria-pressed="true"] {
    background: var(--fp3d-accent);
    color: var(--fp3d-accent-text);
  }
  .fp3d-seg button:disabled {
    opacity: 0.4;
    cursor: default;
  }
  .fp3d-chip {
    background: var(--fp3d-chrome);
    color: var(--fp3d-text);
    box-shadow: var(--fp3d-shadow);
  }
  button:focus-visible,
  input:focus-visible,
  select:focus-visible {
    outline: 2px solid var(--fp3d-accent);
    outline-offset: 2px;
  }
  .fp3d-btn {
    font: inherit;
    font-weight: 600;
    border: 1px solid var(--fp3d-line);
    background: rgba(55, 224, 255, 0.06);
    color: var(--fp3d-text);
    border-radius: 10px;
    padding: 7px 12px;
    cursor: pointer;
    min-height: 34px;
  }
  .fp3d-btn:hover {
    border-color: var(--fp3d-accent);
  }
  .fp3d-btn.fp3d-danger {
    color: var(--fp3d-danger);
  }
  .fp3d-btn.fp3d-primary {
    background: var(--fp3d-accent);
    color: var(--fp3d-accent-text);
    border-color: transparent;
  }
  .fp3d-field {
    display: grid;
    gap: 4px;
    font-size: 12px;
    color: var(--fp3d-muted);
  }
  .fp3d-field input,
  .fp3d-field select {
    font: inherit;
    font-size: 14px;
    color: var(--fp3d-text);
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--fp3d-line);
    border-radius: 8px;
    padding: 7px 9px;
    min-width: 0;
  }
  .fp3d-field input[type="range"] {
    padding: 0;
    accent-color: var(--fp3d-accent);
  }
  /* a colour picker shows its colour as a full swatch, not a line inside the text field's padding */
  .fp3d-field input[type="color"] {
    padding: 3px;
    height: 36px;
    width: 100%;
    cursor: pointer;
  }
  .fp3d-field select option,
  select option {
    /* the opened list keeps the dark look (else light text on the browser's white list) */
    background: var(--fp3d-chrome-solid);
    color: var(--fp3d-text);
  }
  /* the group titles of an opened list (the styles): dark too, else a white bar with light text */
  .fp3d-field select optgroup,
  select optgroup {
    background: var(--fp3d-chrome-solid);
    color: var(--fp3d-accent);
    font-style: normal;
    font-weight: 700;
  }
  /* a list to edit line by line (a module's sentences): ✕ per line, a field to add one */
  .fp3d-lines {
    display: grid;
    gap: 4px;
    font-size: 12px;
    color: var(--fp3d-muted);
  }
  .fp3d-lines-row {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 4px 4px 9px;
    border: 1px solid var(--fp3d-line);
    border-radius: 8px;
    font-size: 14px;
    color: var(--fp3d-text);
  }
  .fp3d-lines-row span {
    flex: 1;
    min-width: 0;
    overflow-wrap: anywhere;
  }
  .fp3d-lines-row button {
    border: 0;
    background: none;
    color: var(--fp3d-muted);
    font: inherit;
    cursor: pointer;
    padding: 2px 8px;
    border-radius: 6px;
  }
  .fp3d-lines-row button:hover:not(:disabled) {
    color: var(--fp3d-danger);
  }
  .fp3d-lines-add {
    display: flex;
    gap: 6px;
  }
  .fp3d-lines-add input {
    flex: 1;
    min-width: 0;
    font: inherit;
    font-size: 14px;
    color: var(--fp3d-text);
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--fp3d-line);
    border-radius: 8px;
    padding: 7px 9px;
  }
  /* fingers need 40 px */
  @media (pointer: coarse) {
    .fp3d-seg button,
    .fp3d-chip,
    .fp3d-btn {
      min-height: 40px;
    }
  }
`;var ri=o=>o?.icon||"\u{1F3E0}";function yn(o,t,e){return t.find(i=>i.id===e)?.name||(e===ft?E(o,"plan_main"):"?")}var gs=class extends at{static properties={hass:{attribute:!1},plans:{attribute:!1},current:{attribute:!1},admin:{type:Boolean},alerts:{attribute:!1},site:{type:Boolean},hasSite:{type:Boolean},_open:{state:!0}};constructor(){super(),this.plans=[],this.current=ft,this.admin=!1,this.alerts=null,this.site=!1,this.hasSite=!1,this._open=!1}t(t,e){return E(this.hass,t,e)}fire(t,e={}){this._open=!1,this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}close=t=>{t.composedPath().includes(this)||(this._open=!1)};connectedCallback(){super.connectedCallback(),document.addEventListener("pointerdown",this.close)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("pointerdown",this.close)}render(){let t=this.plans.find(n=>n.id===this.current),e=[...this.alerts??new Map].filter(([n,i])=>n!==this.current&&i>0).reduce((n,[,i])=>n+i,0);return g`<button
        class="fp3d-pp-btn"
        aria-haspopup="listbox"
        aria-expanded=${this._open}
        title=${this.t("plan_pick")}
        @click=${()=>this._open=!this._open}
      >
        <span class="fp3d-pp-icon">${this.site?"\u{1F3D8}":ri(t)}</span>
        <span class="fp3d-pp-name">${this.site?this.t("plan_site"):yn(this.hass,this.plans,this.current)}</span>
        ${e?g`<span class="fp3d-pp-alert" title=${this.t("plan_alerts_elsewhere",{n:e})}>${e}</span>`:y}
        <span class="fp3d-pp-caret">▾</span>
      </button>
      ${this._open?g`<div class="fp3d-pp-menu" role="listbox">
            ${this.plans.map(n=>g`<button role="option" aria-selected=${!this.site&&n.id===this.current} @click=${()=>this.fire("plan-pick",{plan:n.id})}>
                <span class="fp3d-pp-icon">${ri(n)}</span>
                <span class="fp3d-pp-name">${yn(this.hass,this.plans,n.id)}</span>
                ${this.alerts?.get(n.id)?g`<span class="fp3d-pp-alert">${this.alerts.get(n.id)}</span>`:y}
                <span class="fp3d-pp-size">${this.t(n.rooms===1?"floor_rooms_one":"floor_rooms",{n:n.rooms})}</span>
              </button>`)}
            ${this.hasSite?g`<button role="option" aria-selected=${this.site} @click=${()=>this.fire("plan-site")}>
                  <span class="fp3d-pp-icon">🏘</span><span class="fp3d-pp-name">${this.t("plan_site")}</span>
                </button>`:y}
            ${this.plans.length>1?g`<button class="fp3d-pp-extra" @click=${()=>this.fire("plan-overview")}>▦ ${this.t("plan_all")}</button>`:y}
            ${this.admin?g`<hr />
                  <button class="fp3d-pp-extra" @click=${()=>this.fire("plan-new")}>＋ ${this.t("plan_new")}</button>
                  <button class="fp3d-pp-extra" @click=${()=>this.fire("plan-manage")}>⚙ ${this.t("plan_manage")}</button>`:y}
          </div>`:y}`}static styles=[Tt,zt,ct`
      :host {
        position: relative;
        display: inline-block;
        min-width: 0;
      }
      .fp3d-pp-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        max-width: 260px;
        min-height: 36px;
        padding: 4px 10px;
        border: 1px solid var(--fp3d-line);
        border-radius: 10px;
        background: transparent;
        color: var(--fp3d-text);
        font: inherit;
        font-weight: 600;
        cursor: pointer;
      }
      .fp3d-pp-btn:hover,
      .fp3d-pp-btn[aria-expanded="true"] {
        border-color: var(--fp3d-accent);
      }
      .fp3d-pp-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .fp3d-pp-caret {
        color: var(--fp3d-muted);
        font-size: 11px;
      }
      .fp3d-pp-alert {
        min-width: 18px;
        padding: 0 5px;
        border-radius: 9px;
        background: var(--fp3d-alert, #ff4d6d);
        color: #fff;
        font-size: 11.5px;
        font-weight: 700;
        line-height: 18px;
        text-align: center;
      }
      .fp3d-pp-menu {
        position: absolute;
        z-index: 20;
        top: calc(100% + 6px);
        left: 0;
        display: grid;
        min-width: 240px;
        max-width: min(340px, 90vw);
        max-height: 60vh;
        overflow: auto;
        padding: 6px;
        border: 1px solid var(--fp3d-line);
        border-radius: 12px;
        background: var(--fp3d-chrome-solid);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
      }
      .fp3d-pp-menu button {
        display: flex;
        align-items: center;
        gap: 8px;
        min-height: 40px;
        padding: 6px 10px;
        border: 0;
        border-radius: 8px;
        background: transparent;
        color: var(--fp3d-text);
        font: inherit;
        text-align: left;
        cursor: pointer;
      }
      .fp3d-pp-menu button:hover,
      .fp3d-pp-menu button[aria-selected="true"] {
        background: color-mix(in srgb, var(--fp3d-accent) 16%, transparent);
      }
      .fp3d-pp-menu .fp3d-pp-name {
        flex: 1;
      }
      .fp3d-pp-size {
        color: var(--fp3d-muted);
        font-size: 12px;
        white-space: nowrap;
      }
      .fp3d-pp-extra {
        color: var(--fp3d-muted) !important;
      }
      hr {
        width: 100%;
        margin: 4px 0;
        border: 0;
        border-top: 1px solid var(--fp3d-line);
      }
    `]};customElements.get("fp3d-plan-picker")||customElements.define("fp3d-plan-picker",gs);var bs=class extends at{static properties={hass:{attribute:!1},plans:{attribute:!1},buildings:{attribute:!1},current:{attribute:!1}};t(t,e){return E(this.hass,t,e)}fire(t,e={}){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}render(){let t=String(this.hass?.config?.unit_system?.temperature??"\xB0C");return g`<div class="fp3d-po-veil" @click=${e=>e.target===e.currentTarget&&this.fire("close")}>
      <section class="fp3d-po" role="dialog" aria-label=${this.t("plan_all")}>
        <header>
          <h2>${this.t("plan_all")}</h2>
          <button class="fp3d-btn" aria-label=${this.t("close")} @click=${()=>this.fire("close")}>✕</button>
        </header>
        <div class="fp3d-po-grid">
          ${this.plans.map(e=>{let n=this.buildings.get(e.id),i=n&&this.hass?ii(this.hass,n):null;return g`<button class="fp3d-po-tile ${i?.alerts.length?"fp3d-po-alert":""} ${e.id===this.current?"fp3d-po-current":""}" @click=${()=>this.fire("plan-pick",{plan:e.id})}>
              <span class="fp3d-po-head"><span class="fp3d-po-icon">${ri(e)}</span><strong>${yn(this.hass,this.plans,e.id)}</strong></span>
              ${i?g`<span class="fp3d-po-facts">
                      <span>${this.t(i.rooms===1?"floor_rooms_one":"floor_rooms",{n:i.rooms})}</span>
                      <span title=${this.t("plan_lights_on")}>💡 ${i.lightsOn}</span>
                      ${i.open?g`<span title=${this.t("plan_open_now")}>${this.t("plan_open_n",{n:i.open})}</span>`:y}
                      ${i.playing?g`<span>♪ ${i.playing}</span>`:y}
                      ${i.temp!==null?g`<span>🌡 ${nt(this.hass,i.temp,1)} ${t}</span>`:y}
                    </span>
                    ${i.alerts.slice(0,3).map(r=>g`<span class="fp3d-po-warn">⚠ ${Ie(this.hass,n,r)}</span>`)}`:g`<span class="fp3d-po-facts">…</span>`}
            </button>`})}
        </div>
      </section>
    </div>`}static styles=[Tt,zt,ct`
      .fp3d-po-veil {
        position: fixed;
        inset: 0;
        z-index: 30;
        display: grid;
        place-items: center;
        padding: 16px;
        background: rgba(0, 0, 0, 0.55);
      }
      .fp3d-po {
        width: min(920px, 100%);
        max-height: 90vh;
        overflow: auto;
        padding: 16px;
        border: 1px solid var(--fp3d-line);
        border-radius: 16px;
        background: var(--fp3d-chrome-solid);
      }
      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
      }
      h2 {
        margin: 0;
        font-family: var(--fp3d-title-font);
        font-size: 20px;
      }
      .fp3d-po-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 12px;
      }
      .fp3d-po-tile {
        display: grid;
        align-content: start;
        gap: 8px;
        min-height: 120px;
        padding: 14px;
        border: 1px solid var(--fp3d-line);
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.03);
        color: var(--fp3d-text);
        font: inherit;
        text-align: left;
        cursor: pointer;
      }
      .fp3d-po-tile:hover,
      .fp3d-po-current {
        border-color: var(--fp3d-accent);
        box-shadow: 0 0 18px -6px var(--fp3d-accent);
      }
      .fp3d-po-alert {
        border-color: var(--fp3d-alert, #ff4d6d);
        box-shadow: 0 0 20px -6px var(--fp3d-alert, #ff4d6d);
      }
      .fp3d-po-head {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
      }
      .fp3d-po-icon {
        font-size: 24px;
      }
      .fp3d-po-facts {
        display: flex;
        flex-wrap: wrap;
        gap: 6px 12px;
        color: var(--fp3d-muted);
        font-size: 13px;
      }
      .fp3d-po-warn {
        color: var(--fp3d-alert, #ff4d6d);
        font-size: 13px;
        font-weight: 600;
      }
    `]};customElements.get("fp3d-plan-overview")||customElements.define("fp3d-plan-overview",bs);var _s=":",Sm=.05;function Vd(o,t){let e=o.indexOf(_s);return e>0?{plan:o.slice(0,e),id:o.slice(e+1)}:{plan:t,id:o}}function Mm(o,t){let e=t.rot*Math.PI/180,n=Math.cos(e),i=Math.sin(e),r=s=>Math.round(s*1e3)/1e3;return[r(o[0]*n-o[1]*i+t.x),r(o[0]*i+o[1]*n+t.y)]}function Im(o,t,e){let n=s=>`${t}${_s}${s}`,i=s=>Mm(s,e),r=s=>(((s??0)+e.rot)%360+360)%360;return{...o,id:n(o.id),rooms:o.rooms.map(s=>({...s,id:n(s.id),points:s.points.map(i),start_view:null})),openings:o.openings.map(s=>({...s,id:n(s.id),room_id:n(s.room_id),wall:s.wall?n(s.wall):s.wall})),furniture:o.furniture.map(s=>{let[a,l]=i([s.x,s.z]);return{...s,id:n(s.id),x:a,z:l,rotation:r(s.rotation)}}),placements:o.placements.map(s=>{let[a,l]=i([s.x,s.z]);return{...s,x:a,z:l,rotation:r(s.rotation)}}),outdoor:(o.outdoor??[]).map(s=>({...s,id:n(s.id),points:s.points.map(i)})),walls:(o.walls??[]).map(s=>({...s,id:n(s.id),a:i(s.a),b:i(s.b)})),background:null,start_view:null}}function Ld(o,t=""){let e=o.settings.roof;if(!e||e.type==="none")return[];if(e.type===void 0||e.type==="custom")return e.sections??[];let n=Bc(o,i=>`${t}roof_${i+1}`);return e.type==="flat"?n.map(i=>({...i,shape:"flat"})):n}function Pm(o,t,e){let n=e.rot?Dc(o,e.rot,[0,0]):o,i=r=>[r[0]+e.x,r[1]+e.y];return{...n,id:`${t}${_s}${o.id}`,x0:n.x0+e.x,x1:n.x1+e.x,z0:n.z0+e.y,z1:n.z1+e.y,pivot:n.pivot?i(n.pivot):n.pivot,points:n.points?n.points.map(i):n.points}}function Wd(o,t){let e=o.floors.map(c=>({...c,rooms:[...c.rooms],openings:[...c.openings],furniture:[...c.furniture],placements:[...c.placements],outdoor:[...c.outdoor??[]],walls:[...c.walls??[]]}));for(let c of t)if(c.site?.on)for(let d of c.building.floors){let u=Im(d,c.id,c.site),p=e.find(h=>Math.abs(h.elevation-d.elevation)<Sm);if(!p){e.push(u);continue}p.rooms.push(...u.rooms),p.openings.push(...u.openings),p.furniture.push(...u.furniture),p.placements.push(...u.placements),p.outdoor.push(...u.outdoor),p.walls=[...p.walls??[],...u.walls??[]]}e.sort((c,d)=>c.elevation-d.elevation);let n=c=>c.floors.some(d=>d.rooms.some(u=>u.points.length>=3)),i=n(o)?Ld(o):[],r=o.settings.roof.type!=="custom"&&o.settings.roof.type!==void 0,s=(o.settings.roof.solar??[]).map(c=>r&&i[0]&&c.face.startsWith("main:")?{...c,face:`${i[0].id}:${c.face.slice(5)}`}:c),a=[...i,...t.filter(c=>c.site?.on&&n(c.building)).flatMap(c=>Ld(c.building).map(d=>Pm(d,c.id,c.site)))],l={...o.settings.roof,type:"custom",sections:a,solar:s};return{...o,floors:e,card_templates:[],settings:{...o.settings,start_view:null,roof:l}}}var xn=class{others=new Map;watched="";unsubscribe=null;siteOf=null;host;constructor(t){this.host=t}watch(t,e){let n=e.plans.map(s=>s.id).filter(s=>s!==e.planId),i=`${e.planId}|${n.join(",")}`;if(!t||i===this.watched)return;this.watched=i;let r=s=>Ro(t,s).then(a=>{!e.plans.some(l=>l.id===s)||s===e.planId||(this.others=new Map(this.others).set(s,jn(a.building)),this.host.requestUpdate())},()=>{});this.others=new Map([...this.others].filter(([s])=>n.includes(s)));for(let s of n)r(s);n.length&&!this.unsubscribe&&Za(t,s=>{s!==e.planId&&e.plans.some(a=>a.id===s)&&r(s)}).then(s=>this.unsubscribe=s,()=>{})}stop(){this.unsubscribe?.(),this.unsubscribe=null,this.watched=""}all(t){let e=new Map(this.others);return t.building&&e.set(t.planId,t.building),e}site(t){let e=this.all(t),n=e.get(ft);if(!n)return null;let i=t.plans.filter(a=>a.id!==ft&&a.site?.on).map(a=>({id:a.id,site:a.site,building:e.get(a.id)}));if(i.some(a=>!a.building))return null;let r=[n,...i.flatMap(a=>[a.building,a.site?.x,a.site?.y,a.site?.rot])];if(this.siteOf&&this.siteOf.key.length===r.length&&this.siteOf.key.every((a,l)=>a===r[l]))return this.siteOf.to;let s=Wd(n,i.map(a=>({id:a.id,site:a.site,building:a.building})));return this.siteOf={key:r,to:s},s}};var Bd={light:"M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.1 2.2v.5h5V16c0-.8.4-1.6 1.1-2.2A6 6 0 0 0 12 3z",switch:"M7 4h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zM12 8v8",fan:"M12 12c0-4 1-8 4-8s2 5-4 8zm0 0c4 0 8 1 8 4s-5 2-8-4zm0 0c0 4-1 8-4 8s-2-5 4-8zm0 0c-4 0-8-1-8-4s5-2 8 4z",cover:"M4 4h16v3H4zM5 7v13M19 7v13M7 10h10M7 13h10M7 16h10",climate:"M12 14.5V5a2 2 0 1 0-4 0v9.5a4 4 0 1 0 4 0zM10 11v6M16 6h4M16 10h3",media:"M4 6h16v10H4zM9 20h6M12 16v4M10.5 8.8v4.4l3.8-2.2z",lock:"M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3M12 14.5v2",sensor:"M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2",binary:"M5 21V4h11v17M16 21H4M8 21V7h5v14M12.5 13.5h.01",camera:"M4 7h11v10H4zM15 10.5l5-3v9l-5-3",scene:"M5 19l9-9M14 4l.8 2.2L17 7l-2.2.8L14 10l-.8-2.2L11 7l2.2-.8zM19 11l.5 1.5L21 13l-1.5.5L19 15l-.5-1.5L17 13l1.5-.5z",script:"M8 4h9a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2h9M8 4a2 2 0 0 0-2 2v10M9 9h6M9 12h4"};function kn(o){return Bd[o]}function Jt(o){return`<ha-icon icon="mdi:${o.replace(/^mdi:/,"").replace(/[^a-z0-9-]/gi,"")}" style="--mdc-icon-size:18px"></ha-icon>`}function je(o){return`<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${Bd[o]}"/></svg>`}var Ud="homeplan3d.roombar_min",Tm="M5 4h14v16H5zM12 4v16M5 12h14",jd="M8 5.5v13l10.5-6.5z",si=o=>g`<svg class="fp3d-rb-ico" viewBox="0 0 24 24" aria-hidden="true">${ne`<path d=${o} />`}</svg>`,vs=class extends at{static properties={hass:{attribute:!1},building:{attribute:!1},floorId:{attribute:!1},roomId:{attribute:!1},favorites:{type:Boolean},readOnly:{type:Boolean},_min:{state:!0},_fired:{state:!0}};constructor(){super(),this.building=null,this.floorId=null,this.roomId=null,this.favorites=!1,this.readOnly=!1,this._fired=null;try{this._min=localStorage.getItem(Ud)==="1"}catch{this._min=!1}}t(t,e){return E(this.hass,t,e)}setMin(t){this._min=t;try{localStorage.setItem(Ud,t?"1":"0")}catch{}}toggleLights(t,e){if(t.stopPropagation(),this.readOnly)return;let[n,i]=Jc(e);i.length&&this.hass.callService("light",n,{entity_id:i})}pick(t,e){this.dispatchEvent(new CustomEvent("room-pick",{detail:{floorId:t,roomId:e},bubbles:!0,composed:!0}))}render(){let t=this.building;if(!t||!this.hass)return y;if(this._min)return g`<button class="fp3d-chip fp3d-rb-open" aria-expanded="false" title=${this.t("room_bar")} @click=${()=>this.setMin(!1)}>▴ ${this.t("room_bar_rooms")}</button>`;let e=this.hass,n=$e(e,t,this.floorId),i=this.favorites?Xc(e,t):[],r=!this.floorId&&t.floors.length>1,s=a=>t.floors.find(l=>l.id===a)?.name??"";return g`<div class="fp3d-rb" role="toolbar" aria-label=${this.t("room_bar")}>
      <button class="fp3d-rb-min" aria-expanded="true" title=${this.t("room_bar_hide")} aria-label=${this.t("room_bar_hide")} @click=${()=>this.setMin(!0)}>▾</button>
      ${i.map(a=>{let l=e.states[a.id],c=a.domain!=="homeassistant",d=this.readOnly||Q(l),u=()=>{d||(e.callService(a.domain,a.service,{entity_id:a.id}),this._fired=a.id,setTimeout(()=>this._fired=null,700))};return g`<div class="fp3d-rb-card fp3d-rb-fav ${a.on||this._fired===a.id?"fp3d-rb-on":""} ${d?"fp3d-rb-off":""}">
          <div class="fp3d-rb-top"><b class="fp3d-rb-name">${B(e,a.id)}</b></div>
          <div class="fp3d-rb-row"></div>
          ${c?g`<button class="fp3d-rb-act" ?disabled=${d} @click=${u}>${si(jd)} ${this.t("room_bar_activate")}</button>`:g`<button class="fp3d-rb-switch" role="switch" aria-checked=${a.on} ?disabled=${d} @click=${u}>
                <span>${a.on?this.t("room_bar_on"):this.t("room_bar_off")}</span><i aria-hidden="true"></i>
              </button>`}
        </div>`})}
      ${i.length&&n.length?g`<span class="fp3d-rb-sep" aria-hidden="true"></span>`:y}
      ${n.map(a=>{let l=a.temp===null&&!a.lights.length&&!a.open&&!a.playing,c=a.lightsOn.length>0;return g`<div
          class="fp3d-rb-card ${l?"fp3d-rb-quiet":""} ${a.active?"fp3d-rb-active":""} ${a.roomId===this.roomId?"fp3d-rb-sel":""}"
          role="button"
          tabindex="0"
          title=${r?`${a.name} \xB7 ${s(a.floorId)}`:a.name}
          aria-pressed=${a.roomId===this.roomId}
          @click=${()=>this.pick(a.floorId,a.roomId)}
          @keydown=${d=>d.target===d.currentTarget&&(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),this.pick(a.floorId,a.roomId))}
        >
          <div class="fp3d-rb-top">
            <b class="fp3d-rb-name">${a.name}</b>
            ${a.temp===null?y:g`<span class="fp3d-rb-temp">${nt(e,a.temp,1)}°</span>`}
          </div>
          <div class="fp3d-rb-row">
            ${r?g`<span class="fp3d-rb-floor">${s(a.floorId)}</span>`:y}
            ${a.humidity===null?y:g`<span>${nt(e,a.humidity,0)} %</span>`}
            ${a.open?g`<span class="fp3d-rb-state fp3d-rb-win" title=${this.t("room_bar_open")}>${si(Tm)}${a.open>1?a.open:""}</span>`:y}
            ${a.playing?g`<span class="fp3d-rb-state fp3d-rb-play" title=${this.t("room_bar_playing")}>${si(jd)}</span>`:y}
          </div>
          ${a.lights.length?g`<button
                class="fp3d-rb-switch"
                role="switch"
                aria-checked=${c}
                aria-label=${`${this.t("room_bar_light")} ${a.name}`}
                ?disabled=${this.readOnly}
                @click=${d=>this.toggleLights(d,a)}
                @keydown=${d=>d.stopPropagation()}
              >
                <span>${si(kn("light"))} ${c?`${this.t("room_bar_light")} \xB7 ${this.t("room_bar_lights",{n:a.lightsOn.length})}`:this.t("room_bar_light")}</span><i aria-hidden="true"></i>
              </button>`:g`<div class="fp3d-rb-switch-gap"></div>`}
        </div>`})}
    </div>`}static styles=[Tt,zt,ct`
      :host {
        display: block;
        pointer-events: none;
      }
      .fp3d-rb,
      .fp3d-rb-open {
        pointer-events: auto;
      }
      /* one row of even cards, solid like the room panel, scrolling sideways */
      .fp3d-rb {
        display: flex;
        align-items: stretch;
        gap: 8px;
        padding: 2px;
        overflow-x: auto;
        scrollbar-width: none;
        overscroll-behavior-x: contain;
      }
      .fp3d-rb::-webkit-scrollbar {
        display: none;
      }
      .fp3d-rb-min {
        flex: none;
        width: 26px;
        padding: 0;
        border-radius: 12px;
        border: 1px solid var(--fp3d-line);
        background: var(--fp3d-chrome);
        color: var(--fp3d-muted);
        font: inherit;
        cursor: pointer;
      }
      .fp3d-rb-sep {
        flex: none;
        width: 1px;
        margin: 8px 0;
        background: var(--fp3d-line);
      }
      .fp3d-rb-card {
        flex: none;
        box-sizing: border-box;
        width: 164px;
        height: 96px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 9px 10px 8px 12px;
        border-radius: 14px;
        border: 1px solid var(--fp3d-line);
        background: var(--fp3d-chrome-solid);
        box-shadow: var(--fp3d-shadow);
        color: var(--fp3d-text);
        cursor: pointer;
        user-select: none;
      }
      .fp3d-rb-top {
        display: flex;
        align-items: baseline;
        gap: 6px;
        min-width: 0;
      }
      .fp3d-rb-name {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 13px;
        font-weight: 700;
      }
      .fp3d-rb-temp {
        flex: none;
        color: var(--fp3d-accent);
        font-family: var(--fp3d-title-font);
        font-size: 19px;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
      }
      .fp3d-rb-row {
        display: flex;
        align-items: center;
        gap: 8px;
        min-height: 16px;
        color: var(--fp3d-muted);
        font-size: 11px;
      }
      .fp3d-rb-floor {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .fp3d-rb-ico {
        width: 14px;
        height: 14px;
        flex: none;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.9;
        stroke-linecap: round;
        stroke-linejoin: round;
        vertical-align: -2px;
      }
      .fp3d-rb-state {
        display: inline-flex;
        align-items: center;
        gap: 2px;
      }
      .fp3d-rb-win {
        color: var(--fp3d-danger);
      }
      .fp3d-rb-play {
        color: var(--fp3d-accent);
      }
      /* the switch at the foot of a card: a label and a small toggle */
      .fp3d-rb-switch,
      .fp3d-rb-act {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 6px;
        height: 26px;
        padding: 0 4px 0 9px;
        border-radius: 999px;
        border: 1px solid var(--fp3d-line);
        background: rgba(255, 255, 255, 0.04);
        color: var(--fp3d-muted);
        font: inherit;
        font-size: 11px;
        cursor: pointer;
      }
      .fp3d-rb-switch span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .fp3d-rb-switch i {
        flex: none;
        position: relative;
        width: 28px;
        height: 16px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.14);
        transition: background 0.15s;
      }
      .fp3d-rb-switch i::after {
        content: "";
        position: absolute;
        top: 2px;
        left: 2px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #c9d6ee;
        transition: transform 0.15s;
      }
      .fp3d-rb-switch[aria-checked="true"] {
        color: var(--fp3d-warm);
        border-color: rgba(255, 181, 71, 0.45);
        background: rgba(255, 181, 71, 0.1);
      }
      .fp3d-rb-switch[aria-checked="true"] i {
        background: var(--fp3d-warm);
      }
      .fp3d-rb-switch[aria-checked="true"] i::after {
        transform: translateX(12px);
        background: #1a1200;
      }
      .fp3d-rb-act {
        justify-content: center;
        padding: 0 10px;
        color: var(--fp3d-text);
      }
      .fp3d-rb-switch:disabled,
      .fp3d-rb-act:disabled {
        opacity: 0.45;
        cursor: default;
      }
      .fp3d-rb-switch-gap {
        height: 26px;
      }
      /* something on or open: a warm edge; the open room: the accent */
      .fp3d-rb-active,
      .fp3d-rb-on {
        border-color: rgba(255, 181, 71, 0.65);
        box-shadow: 0 0 14px rgba(255, 181, 71, 0.2), var(--fp3d-shadow);
      }
      .fp3d-rb-sel {
        border-color: var(--fp3d-accent);
        box-shadow: 0 0 0 1px var(--fp3d-accent) inset, var(--fp3d-shadow);
      }
      .fp3d-rb-quiet .fp3d-rb-name {
        color: var(--fp3d-muted);
      }
      .fp3d-rb-fav {
        cursor: default;
      }
      .fp3d-rb-off {
        opacity: 0.55;
      }
      @media (max-width: 600px) {
        .fp3d-rb-card {
          width: 132px;
          height: 86px;
          padding: 7px 8px 6px 10px;
        }
        .fp3d-rb-temp {
          font-size: 16px;
        }
      }
    `]};customElements.get("fp3d-room-bar")||customElements.define("fp3d-room-bar",vs);function ws(o){return o?.settings.person_look??"figure"}function li(o){return ws(o)!=="off"}var qd=["#ff5fd2","#37e0ff","#ffb84d","#7dff8a","#b18cff","#ff7a6b","#4dd2c0","#f5e663"];function ai(o){let t=0;for(let e of o)t=t*31+e.charCodeAt(0)>>>0;return qd[t%qd.length]}var Kd=o=>o.toLowerCase().replace(/[_\-]+/g," ").replace(/\s+/g," ").trim();function Em(o,t,e){let n=Kd(e);if(!n||n==="unknown"||n==="unavailable"||n==="not home"||n==="away")return null;for(let i of t.floors)for(let r of i.rooms)if([r.name,r.area_id??"",r.area_id?o.areas?.[r.area_id]?.name??"":""].filter(Boolean).map(Kd).includes(n))return{floorId:i.id,room:r};return null}function Gd(o){let t=o.trim().split(/\s+/).filter(Boolean);return t.length?(t.length>1?t[0][0]+t[t.length-1][0]:t[0].slice(0,2)).toUpperCase():"?"}function Rm(o,t){return["home","on","unknown","unavailable",""].includes(o)?!1:!(t&&o!=="not_home"&&Am(t,o))}function Am(o,t){let e=o.states["zone.home"]?.attributes;if(!e||typeof e.latitude!="number"||typeof e.longitude!="number")return!1;let n=Math.PI/180;for(let[i,r]of Object.entries(o.states)){if(!i.startsWith("zone.")||i==="zone.home")continue;let s=r.attributes;if(s.friendly_name!==t||typeof s.latitude!="number"||typeof s.longitude!="number")continue;let a=(s.latitude-e.latitude)*n,l=(s.longitude-e.longitude)*n,c=Math.sin(a/2)**2+Math.cos(e.latitude*n)*Math.cos(s.latitude*n)*Math.sin(l/2)**2;if(2*6371e3*Math.asin(Math.sqrt(c))<=(typeof e.radius=="number"?e.radius:100)+(typeof s.radius=="number"?s.radius:0))return!0}return!1}function Yd(o,t){let e=[],n=new Map;for(let i of t.presence){let r=o.states[i.person];if(!r||!i.sensor||r.state!=="home"&&r.state!=="on")continue;let s=o.states[i.sensor];if(!s)continue;let a=Em(o,t,s.state);if(!a)continue;let l=n.get(a.room.id)??0;n.set(a.room.id,l+1);let[c,d]=Mr(a.room.points),u=-Math.PI/2+.9+l*1.15,p=.75,h=r.attributes.friendly_name??i.person;e.push({id:i.person,name:h,initials:Gd(h),picture:r.attributes.entity_picture??null,floorId:a.floorId,roomId:a.room.id,x:c+Math.cos(u)*p,z:d+Math.sin(u)*p})}return e}function ci(o,t,e=new Set,n=Date.now()){let i=[];for(let[u,p]of Object.entries(o.states)){let h=p.attributes;if(!u.startsWith("sensor.")||h.neonplan_locate!==!0||typeof h.room_id!="string")continue;let _=null;for(let w of t.floors){let k=ot(w).find(v=>v.id===h.room_id);k&&(_={floorId:w.id,room:k})}if(!_)continue;let b=typeof h.last_seen=="string"?Date.parse(h.last_seen):NaN,m=typeof h.since=="string"?Date.parse(h.since):NaN;i.push({entityId:u,name:typeof h.device_name=="string"?h.device_name:u,person:typeof h.person=="string"?h.person:null,floorId:_.floorId,room:_.room,seen:Number.isFinite(b)?b:0,since:Number.isFinite(m)?m:0,probability:typeof h.probability=="number"?h.probability:0,worn:h.wearable===!0})}let r=[],s=new Map,a=new Map,l=(u,p)=>{let h=s.get(u.room.id)??0;if(s.set(u.room.id,h+1),!p.thing){let f=a.get(u.room.id);if(!f){try{f=Hm(o,t,u.floorId,u.room)}catch{f=[]}a.set(u.room.id,f)}let M=f.shift();for(;M&&!W(M,u.room.points);)M=f.shift();if(M){r.push({...p,floorId:u.floorId,roomId:u.room.id,x:M[0],z:M[1]});return}}let[_,b]=Mr(u.room.points),m=-Math.PI/2+.9+h*1.15,w=[_+Math.cos(m)*.75,b+Math.sin(m)*.75],[k,v]=W(w,u.room.points)?w:[_,b];r.push({...p,floorId:u.floorId,roomId:u.room.id,x:k,z:v})},c=(u,p)=>l(u,{id:u.entityId,name:u.name,initials:u.name.slice(0,1).toUpperCase(),picture:null,color:p,entity:u.entityId,tag:u.name,thing:!0}),d=new Map;for(let u of i)u.person?d.set(u.person,[...d.get(u.person)??[],u]):c(u,ai(u.entityId));for(let[u,p]of d){if(e.has(u))continue;let h=o.states[u];if(h&&Rm(h.state,o)){for(let f of p)c(f,ai(u));continue}let _=f=>f.reduce((M,x)=>x.seen>M.seen?x:M),b=p.filter(f=>f.worn&&n-f.seen<12e4),m=_(b.length?b:p),w=f=>n-f.seen<3e4&&n-m.seen<3e4&&f.since>=m.since-12e4,k=null;if(m.worn){let f=p.filter(x=>!x.worn&&x.room.id!==m.room.id&&w(x)),M=f.length?f.reduce((x,I)=>I.probability>x.probability?I:x):null;M&&n-m.since>=6e5&&M.since>m.since+12e4?(k=m,m=M):M&&M.probability>m.probability+.15&&(m=M)}let v=h?.attributes.friendly_name??m.name;l(m,{id:u,name:v,initials:Gd(v),picture:h?.attributes.entity_picture??null,color:ai(u),entity:m.entityId,tag:v.split(/\s+/)[0]});for(let f of p)f===m||f.room.id===m.room.id||f!==k&&(f.worn&&n-f.seen<12e4||w(f))||c(f,ai(u))}return r}var zm=[[/sofa|couch|corner|chesterfield|recamiere|chaise|^module_/,["sofa","couch","sectional","corner sofa"]],[/armchair|club_chair|wingback|recliner|lounge_chair|cocktail_chair|rocking_chair|bean_bag/,["armchair","chair","recliner"]],[/bed/,["bed"]],[/^dining/,["dining","table"]],[/^coffee/,["coffee table"]],[/desk/,["desk","office"]]],Fm=["terrace","garden","patio","balcony","outside","yard"];function Cm(o,t){let e=[],[n,i]=Rt(t.points),r=(s,a)=>s.points.some((l,c)=>{let d=s.points[(c+1)%s.points.length],[u,p]=[d[0]-l[0],d[1]-l[1]],h=u*u+p*p||1,_=Math.max(0,Math.min(1,((a[0]-l[0])*u+(a[1]-l[1])*p)/h));return Math.hypot(l[0]+_*u-a[0],l[1]+_*p-a[1])<.3});for(let s of o.openings){if(s.wall||s.type==="window"&&s.sill>.3||s.type==="garage")continue;let a=o.rooms.find(_=>_.id===s.room_id);if(!a)continue;let l=a.points[s.edge],c=a.points[(s.edge+1)%a.points.length];if(!l||!c)continue;let d=Math.hypot(c[0]-l[0],c[1]-l[1])||1,u=[l[0]+(c[0]-l[0])*s.offset/d,l[1]+(c[1]-l[1])*s.offset/d];if(!r(t,u))continue;let p=o.rooms.find(_=>_.id!==t.id&&r(_,u)),h=.6/(Math.hypot(n-u[0],i-u[1])||1);e.push({to:p?$n(p.name):null,spot:[u[0]+(n-u[0])*h,u[1]+(i-u[1])*h]})}return e}var Om=["presence","occupancy","zone","room","rest","sensor","fp2"],$n=o=>o.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").split(/[^a-z0-9]+/).filter(t=>t.length>1);function Hm(o,t,e,n){let i=t.floors.find(c=>c.id===e);if(!i||!n.area_id)return[];let r=i.furniture.filter(c=>W([c.x,c.z],n.points)),s=Cm(i,n),a=[],l=new Set([...$n(n.name),...$n(o.areas?.[n.area_id]?.name??""),...$n(n.area_id),...Om]);for(let[c,d]of Object.entries(o.states)){if(!c.startsWith("binary_sensor.")||d.state!=="on")continue;let u=d.attributes.device_class;if(u!=="occupancy"&&u!=="presence"||Ct(o,c)!==n.area_id)continue;let h=new Set($n(String(d.attributes.friendly_name??c.slice(14))).filter(w=>!l.has(w))),_=r.find(w=>w.name&&$n(w.name).some(k=>h.has(k))||zm.some(([k,v])=>k.test(w.type.split(":").pop()??"")&&v.some(f=>h.has(f)))),b=_?null:s.find(w=>w.to?w.to.some(k=>h.has(k)):[...h].some(k=>Fm.some(v=>k.includes(v)))),m=_?[_.x,_.z]:b?b.spot:null;m&&!a.some(([w,k])=>w===m[0]&&k===m[1])&&a.push(m)}return a}function Qd(o,t,e,n){let i=new Map,r=s=>!!s&&o.states[s]?.state==="on";for(let s of t.floors){let a=new Set;for(let c of s.rooms)for(let d of Bo(o,wt(o,c.area_id)))L(d)==="light"&&a.add(d);for(let c of s.placements)L(c.entity_id)==="light"&&a.add(c.entity_id);let l=s.openings.filter(c=>{let d=e.get(c.id);if(!d)return!1;if(c.type==="garage")return(se(o,d,"garage").cover??1)<.95;if(c.type==="door")return r(d.contact)||r(d.contact2??null);let u=se(o,d,"window");return u.open>.5||u.tilt>.5||u.open2>.5||u.tilt2>.5}).length;i.set(s.id,{rooms:s.rooms.length,lightsOn:[...a].filter(c=>o.states[c]?.state==="on").length,open:l,persons:n.filter(c=>c.floorId===s.id).length})}return i}function Jd(o,t){let e=[t.rooms===1?E(o,"floor_rooms_one"):E(o,"floor_rooms",{n:t.rooms})];return t.lightsOn&&e.push(E(o,"floor_lights",{n:t.lightsOn})),t.open&&e.push(E(o,"floor_open",{n:t.open})),t.persons&&e.push(E(o,"floor_persons",{n:t.persons})),e.join(" \xB7 ")}var Pe=(o,t)=>E(o,t);function _t(o,t){if(!t||Q(t))return Pe(o,"state_unavailable");let e=t.attributes;switch(L(t.entity_id)){case"light":return t.state!=="on"?Pe(o,"state_off"):typeof e.brightness=="number"?`${Math.round(e.brightness/255*100)} %`:Pe(o,"state_on");case"switch":case"fan":return Pe(o,t.state==="on"?"state_on":"state_off");case"cover":return typeof e.current_position=="number"&&t.state!=="opening"&&t.state!=="closing"?`${e.current_position} %`:di(o,t.state);case"climate":{let n=typeof e.current_temperature=="number"?`${nt(o,e.current_temperature,1)} ${o?Lt(o):"\xB0C"}`:null;return t.state==="off"?n?`${n} \xB7 ${Pe(o,"state_off")}`:Pe(o,"state_off"):n??di(o,t.state)}case"media":{let n=t.state==="playing"||t.state==="paused"||t.state==="on"||t.state==="idle",i=[e.app_name,e.media_title,e.source].find(r=>typeof r=="string"&&r);return n&&i?i:di(o,t.state)}case"lock":case"camera":return di(o,t.state);case"binary":return["door","window","opening","garage_door"].includes(e.device_class)?Pe(o,t.state==="on"?"state_open":"state_closed"):Pe(o,t.state==="on"?"state_detected":"state_clear");case"sensor":{let n=Number(t.state),i=e.unit_of_measurement??"",r=o?.entities?.[t.entity_id]?.display_precision??1;return Number.isFinite(n)?`${nt(o,n,r)}${i?` ${i}`:""}`:t.state}default:return""}}function di(o,t){let e=`state_${t}`,n=E(o,e);return n===e?t:n}function Xd(o,t){let e=[],n=new Set(t.floors.flatMap(i=>i.furniture.map(r=>r.look_of).filter(r=>!!r)));for(let i of t.floors)for(let r of i.placements){let s=L(r.entity_id),a=o.states[r.entity_id];if(!s||!a)continue;let l=i.rooms.find(d=>d.points.length>=3&&W([r.x,r.z],d.points))??null,c=l?.area_id?o.areas?.[l.area_id]?.name:void 0;e.push({id:r.entity_id,floorId:i.id,roomId:l?.id??null,x:r.x,z:r.z,y:r.y??dn(s,i.height,r.mount??null),lamp:s==="light"?r.mount??"ceiling":null,model:s==="camera"?r.mount==="ceiling"?"camera_ceiling":"camera_wall":void 0,...s==="camera"&&n.has(r.entity_id)?{ownLook:!0}:{},motion:s==="camera"?Nm(o,r.entity_id):void 0,fov:r.fov??void 0,reach:r.reach??void 0,tilt:r.tilt??void 0,rotation:r.rotation??0,icon:r.icon?Jt(r.icon):je(s),cone:s==="camera"&&r.cone===!1?!1:void 0,name:r.name||B(o,r.entity_id,c),ownName:r.name||void 0,showName:!!r.show_name,text:_t(o,a),active:At(a),unavailable:Q(a),glow:s==="light"?ys(re(a),r.glow_scale):null,show:r.marker??void 0,fixed:!!r.locked})}return e}function io(o,t){let e=`${t} ${String(o.states[t]?.attributes.friendly_name??"")}`.toLowerCase().replace(/[_.-]/g," ");return/person|people|human|pedestrian/.test(e)?"person":/\bcar\b|vehicle|truck|bus|motorcycle|bicycle/.test(e)?"car":/\bdog\b|\bcat\b|\bpet\b|animal|bird/.test(e)?"pet":"motion"}function Nm(o,t){return Ut(o,t).some(e=>o.states[e]?.state==="on")}var Zd=new Map;function tu(o){Zd=new Map(o?.floors.flatMap(t=>t.placements.filter(e=>Array.isArray(e.detect_sensors)).map(e=>[e.entity_id,e.detect_sensors]))??[])}function Ut(o,t){return Zd.get(t)??Dm(o,t)}function Dm(o,t){let e=o.entities?.[t]?.device_id;return e?Object.values(o.entities??{}).filter(n=>n.device_id===e&&n.entity_id.startsWith("binary_sensor.")).map(n=>n.entity_id).filter(n=>["motion","occupancy","presence"].includes(String(o.states[n]?.attributes.device_class))):[]}function eu(o){return o.floors.flatMap(t=>t.placements.map(e=>e.entity_id))}function Mt(o,t){o.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}function ui(o,t){let e=t.slice(0,t.indexOf("."));return o.callService(e,"toggle",{entity_id:t})}function ys(o,t){return!o||t==null||t===1?o:{...o,level:Math.max(.02,Math.min(1.5,o.level*t))}}function pi(o,t,e){let{shown:n,more:i}=hn(o,t,e),r=(_,b)=>W([_,b],e.points),s=new Set(t.furniture.filter(_=>r(_.x,_.z)&&Bn(_.type)&&_.entity?.startsWith("switch.")).map(_=>_.entity)),a=[],l=[],c=[],d=[],u=[];for(let _ of new Set([...n,...i])){let b=o.states[_];if(!b||Q(b))continue;let m=_.split(".")[0];m==="light"&&b.state==="on"?a.push(_):m==="fan"&&b.state==="on"?l.push(_):m==="switch"&&b.state==="on"&&s.has(_)?c.push(_):m==="media_player"&&b.state!=="off"&&b.state!=="standby"&&(b.attributes.device_class==="tv"?d.push(_):b.state==="playing"&&u.push(_))}let p=[],h=(_,b,m)=>m.length&&p.push({domain:_,service:b,data:{entity_id:m}});return h("light","turn_off",a),h("fan","turn_off",l),h("switch","turn_off",c),h("media_player","turn_off",d),h("media_player","media_pause",u),p}function hi(o){return o.reduce((t,e)=>t+e.data.entity_id.length,0)}function fi(o,t){let e=t.cleaning;if(!e||!o.states[e])return null;let[n,i]=ae(e);return{domain:n,service:i,data:{entity_id:e}}}function nu(o,t){if(!t)return null;for(let e of o){let n=e.rooms.find(i=>i.area_id===t);if(n)return{floor:e,room:n}}return null}var Lm=4,Vm=3e3,Wm=8,Bm=[[255,181,71],[255,236,210],[55,224,255],[91,124,255],[255,95,210],[120,255,150]],Um=o=>g`<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d=${kn(o)} />
  </svg>`,mi={previous:"M6 6h2v12H6zM20 6v12l-10-6z",play:"M8 5v14l11-7z",pause:"M7 5h4v14H7zM13 5h4v14h-4z",next:"M16 6h2v12h-2zM4 6v12l10-6z"},xs=o=>g`<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d=${o} /></svg>`,ks=class extends at{static properties={hass:{attribute:!1},room:{attribute:!1},floor:{attribute:!1},building:{attribute:!1},confirmEntities:{attribute:!1},sheets:{attribute:!1},readOnly:{type:Boolean},walk:{type:Boolean},collapsible:{type:Boolean},compact:{type:Boolean,reflect:!0},_showAll:{state:!0},_tick:{state:!0}};cameraTimer;memo=null;hasCameras=!1;constructor(){super(),this.room=null,this.floor=null,this.building=null,this.sheets=null,this.readOnly=!1,this._showAll=!1,this._tick=0}connectedCallback(){super.connectedCallback(),this.cameraTimer=setInterval(()=>{this.hasCameras&&!document.hidden&&this._tick++},Vm)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.cameraTimer)}t(t,e){return E(this.hass,t,e)}call(t,e,n){this.readOnly||this.hass.callService(t,e,n)}renderRoomActions(t){if(this.readOnly)return y;let e=fi(this.hass,t),n=this.floor?pi(this.hass,this.floor,t):[];if(!e&&!n.length)return y;let i=r=>r.forEach(s=>this.call(s.domain,s.service,s.data));return g`<div class="fp3d-rp-sheets">
      ${e?g`<button class="fp3d-rp-sheet" @click=${()=>i([e])}><span aria-hidden="true">🧹</span>${this.t("panel_clean")}</button>`:y}
      ${n.length?g`<button class="fp3d-rp-sheet" @click=${()=>i(n)}><span aria-hidden="true">⏻</span>${this.t("panel_everything_off",{n:hi(n)})}</button>`:y}
    </div>`}get areaName(){return this.room?.area_id?this.hass.areas?.[this.room.area_id]?.name:void 0}name(t){return B(this.hass,t,this.areaName,!0)}nameButton(t){return g`<button class="fp3d-rp-name" title=${this.t("details")} @click=${()=>!this.readOnly&&Mt(this,t)}>${this.name(t)}</button>`}askFor(t){return!this.confirmEntities?.has(t)||confirm(this.t("confirm_switch",{name:this.name(t)}))}toggle(t,e,n){let i=()=>{this.readOnly||this.confirmEntities?.has(t.entity_id)&&!confirm(this.t("confirm_switch",{name:this.name(t.entity_id)}))||n()};return g`<button
      class="fp3d-switch"
      role="switch"
      aria-checked=${e?"true":"false"}
      aria-label=${this.name(t.entity_id)}
      ?disabled=${Q(t)}
      @click=${i}
    ></button>`}renderHere(t){if(!this.building||!pd("locate")||!li(this.building))return y;let e=ci(this.hass,this.building).filter(n=>n.roomId===t.id);return e.length?g`<p class="fp3d-rp-facts fp3d-rp-here">
      ${e.map((n,i)=>g`${i?", ":""}<span style="color:${n.color}">●</span> ${n.name}`)}
    </p>`:y}willUpdate(t){this.collapsible&&(t.has("room")||t.has("collapsible"))&&t.get("room")?.id!==this.room?.id&&(this.compact=!0),!this.collapsible&&this.compact&&(this.compact=!1)}render(){let t=this.room;if(!t||!this.hass)return y;let e=wt(this.hass,t.area_id),n=this.memo,{shown:i,more:r}=n&&n.entities===this.hass.entities&&n.floor===this.floor&&n.building===this.building&&n.room===t?n:this.memo={entities:this.hass.entities,floor:this.floor,building:this.building,room:t,...this.floor?hn(this.hass,this.floor,t,this.building?Jo(this.building,t.id):[]):{shown:e,more:[]}},s=Fr(this.hass,r).map(f=>f.primary),a=s.length,l=this._showAll?[...i,...s]:i,c=f=>l.filter(M=>f.includes(L(M))).map(M=>this.hass.states[M]).filter(M=>!!M),d=c(["light"]),u=c(["cover"]),p=c(["climate"]),h=c(["media"]),_=c(["switch","fan","lock"]),b=c(["sensor","binary"]),m=c(["camera"]);this.hasCameras=m.length>0;let w=c(["scene","script"]),k=this.facts(p),v=d.filter(f=>f.state==="on");return g`<section class="fp3d-rp ${this.readOnly?"fp3d-rp-ro":""}" aria-label=${t.name}>
      <header class="fp3d-rp-head">
        <div>
          <h2>${t.name}</h2>
          ${k.length?g`<p class="fp3d-rp-facts">${k.join(" \xB7 ")}</p>`:y}
          ${this.renderHere(t)}
          ${this.renderRoomActions(t)}
          ${this.readOnly?g`<p class="fp3d-rp-facts fp3d-rp-ro-note">⏪ ${this.t("tt_readonly")}</p>`:y}
          ${this.sheets?.length&&!this.readOnly?g`<div class="fp3d-rp-sheets">
                ${this.sheets.map(f=>g`<button class="fp3d-rp-sheet" @click=${()=>this.dispatchEvent(new CustomEvent("sheet-open",{detail:{id:f.id},bubbles:!0,composed:!0}))}>
                    <span aria-hidden="true">${f.icon}</span>${f.title}
                  </button>`)}
              </div>`:y}
        </div>
        ${this.walk&&!this.readOnly&&t.points.length>=3?g`<button class="fp3d-rp-close fp3d-rp-walk" title=${this.t("walk_start")} aria-label=${this.t("walk_start")} @click=${()=>this.fire("walk-here")}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13" cy="4.5" r="1.8" /><path d="m9 20 2.5-6 2.5 2.5V21M7.5 11l3-3.5 3.5 1.5 2 3.5M11.5 14l1-5" /></svg>
            </button>`:y}
        <button class="fp3d-rp-close" aria-label=${this.t("close")} @click=${()=>this.fire("close")}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </header>
      ${this.collapsible&&t.area_id&&l.length?g`<button class="fp3d-rp-fold" aria-expanded=${!this.compact} @click=${()=>this.compact=!this.compact}>
            <span aria-hidden="true">${this.compact?"\u25B4":"\u25BE"}</span>
            ${this.compact?`${this.t("panel_fold_open")}${v.length?` \xB7 ${this.t("panel_fold_lights",{n:v.length})}`:""}`:this.t("panel_fold_close")}
          </button>`:y}
      <div class="fp3d-rp-body">
        ${t.area_id?l.length?y:g`<p class="fp3d-rp-note">${this.t("panel_empty")}</p>`:g`<p class="fp3d-rp-note">${this.t("panel_no_area")}</p>`}
        ${d.length?this.section("panel_lights",d.map(f=>this.lightRow(f)),g`${v.length<d.length?g`<button class="fp3d-btn fp3d-rp-small" @click=${()=>this.call("light","turn_on",{entity_id:d.filter(f=>!Q(f)).map(f=>f.entity_id)})}>
                    ${this.t("panel_all_on")}
                  </button>`:y}${v.length?g`<button class="fp3d-btn fp3d-rp-small" @click=${()=>this.call("light","turn_off",{entity_id:v.map(f=>f.entity_id)})}>
                    ${this.t("panel_all_off")}
                  </button>`:y}`):y}
        ${u.length?this.section("panel_covers",u.map(f=>this.coverRow(f)),u.length>1?g`<button class="fp3d-btn fp3d-rp-small" @click=${()=>this.covers(u,"open")}>
                      ${this.t("panel_all_open")}</button
                    ><button class="fp3d-btn fp3d-rp-small" @click=${()=>this.covers(u,"close")}>
                      ${this.t("panel_all_close")}
                    </button>`:y):y}
        ${p.length?this.section("panel_climate",p.map(f=>this.climateRow(f))):y}
        ${h.length?this.section("panel_media",h.map(f=>this.mediaRow(f))):y}
        ${_.length?this.section("panel_switches",_.map(f=>this.switchRow(f))):y}
        ${m.length?this.section("panel_cameras",m.map(f=>this.cameraTile(f))):y}
        ${b.length?this.section("panel_sensors",b.map(f=>this.sensorRow(f))):y}
        ${w.length?this.section("panel_scenes",[g`<div class="fp3d-rp-scenes">
                  ${w.map(f=>g`<button
                      class="fp3d-btn"
                      ?disabled=${Q(f)}
                      @click=${()=>this.call(L(f.entity_id)==="scene"?"scene":"script","turn_on",{entity_id:f.entity_id})}
                    >
                      ${this.name(f.entity_id)}
                    </button>`)}
                </div>`]):y}
        ${a?g`<button class="fp3d-btn fp3d-rp-small fp3d-rp-more" @click=${()=>this._showAll=!this._showAll}>
              ${this._showAll?this.t("panel_less"):this.t("panel_more",{n:a})}
            </button>`:y}
      </div>
    </section>`}facts(t){let e=[],n=this.room,i=(l,c)=>{let d=Vt(this.hass,this.floor,n,l);if(d===null)return null;if(l==="temperature")return`${nt(this.hass,we(this.hass,d),1)} ${Lt(this.hass)}`;let u=Er(this.hass,this.floor,n,l)[0],p=this.hass.states[u]?.attributes.unit_of_measurement??c;return`${nt(this.hass,d,1)} ${p}`},r=t.find(l=>typeof l.attributes.current_temperature=="number"),s=i("temperature","\xB0C");s?e.push(s):r&&n.climate?.temperature!=="none"&&e.push(`${nt(this.hass,r.attributes.current_temperature,1)} ${Lt(this.hass)}`);let a=i("humidity","%");return a&&e.push(a),e}section(t,e,n=y){return g`<div class="fp3d-rp-sec">
      <div class="fp3d-rp-sec-head"><h3>${this.t(t)}</h3>${n}</div>
      ${e}
    </div>`}rowIcon(t,e){let n=this.floor,i=n?.furniture.find(s=>s.icon&&(s.entity===e||s.fan===e))?.icon??n?.placements.find(s=>s.icon&&s.entity_id===e)?.icon;if(!i)return Um(t);let r=i.replace(/^mdi:/,"").replace(/[^a-z0-9-]/gi,"");return g`<ha-icon icon=${`mdi:${r}`} style="--mdc-icon-size:18px"></ha-icon>`}lightRow(t){let e=t.attributes,n=t.state==="on",i=e.supported_color_modes??[],r=i.some(p=>p!=="onoff"),s=i.includes("color_temp"),a=i.some(p=>["hs","rgb","rgbw","rgbww","xy"].includes(p)),l=typeof e.brightness=="number"?Math.round(e.brightness/255*100):100,c=e.min_color_temp_kelvin??2200,d=e.max_color_temp_kelvin??6500,u=t.entity_id;return g`<div class="fp3d-rp-row">
      <span class="fp3d-rp-icon ${n?"fp3d-rp-on":""}">${this.rowIcon("light",u)}</span>
      ${this.nameButton(u)}
      <span class="fp3d-rp-state">${this.stateOf(t)}</span>
      ${this.toggle(t,n,()=>this.call("light","toggle",{entity_id:u}))}
      ${n&&r?g`<label class="fp3d-rp-slider"
            ><span>${this.t("brightness")}</span>
            <input
              type="range"
              min="1"
              max="100"
              .value=${String(l)}
              @change=${p=>this.call("light","turn_on",{entity_id:u,brightness_pct:Number(p.target.value)})}
          /></label>`:y}
      ${n&&s?g`<label class="fp3d-rp-slider fp3d-rp-ct"
            ><span>${this.t("color_temp")}</span>
            <input
              type="range"
              min=${c}
              max=${d}
              step="50"
              .value=${String(e.color_temp_kelvin??c)}
              @change=${p=>this.call("light","turn_on",{entity_id:u,color_temp_kelvin:Number(p.target.value)})}
          /></label>`:y}
      ${n&&a?g`<div class="fp3d-rp-swatches" role="group" aria-label=${this.t("color")}>
            ${Bm.map(p=>g`<button
                class="fp3d-rp-swatch"
                style="--c: rgb(${p.join(",")})"
                aria-label="rgb(${p.join(", ")})"
                @click=${()=>this.call("light","turn_on",{entity_id:u,rgb_color:p})}
              ></button>`)}
          </div>`:y}
    </div>`}covers(t,e){let n=t.filter(i=>!Q(i)).map(i=>i.entity_id);for(let i of Vo(this.hass,n,e))this.call("cover",i.service,i.data)}coverRow(t){let e=t.attributes,n=e.supported_features??0,i=t.entity_id,r=Q(t);return g`<div class="fp3d-rp-row">
      <span class="fp3d-rp-icon">${this.rowIcon("cover",t.entity_id)}</span>
      ${this.nameButton(i)}
      <span class="fp3d-rp-state">${this.stateOf(t)}</span>
      <div class="fp3d-rp-buttons">
        <button class="fp3d-btn fp3d-rp-small" ?disabled=${r} @click=${()=>this.askFor(i)&&this.covers([t],"open")}>${this.t("cover_open")}</button>
        ${n&Wm||n&64&&!(n&3)?g`<button class="fp3d-btn fp3d-rp-small" ?disabled=${r} @click=${()=>this.covers([t],"stop")}>${this.t("cover_stop")}</button>`:y}
        <button class="fp3d-btn fp3d-rp-small" ?disabled=${r} @click=${()=>this.askFor(i)&&this.covers([t],"close")}>${this.t("cover_close")}</button>
      </div>
      ${n&Lm&&typeof e.current_position=="number"?g`<label class="fp3d-rp-slider"
            ><span>${this.t("position")}</span>
            <input
              type="range"
              min="0"
              max="100"
              ?disabled=${r}
              .value=${String(e.current_position)}
              @change=${s=>this.call("cover","set_cover_position",{entity_id:i,position:Number(s.target.value)})}
          /></label>`:y}
      ${n&128&&typeof e.current_tilt_position=="number"?g`<label class="fp3d-rp-slider"
            ><span>${this.t("cover_tilt")}</span>
            <input
              type="range"
              min="0"
              max="100"
              ?disabled=${r}
              .value=${String(un(t,Qn(this.building,i))??0)}
              @change=${s=>{let a=Number(s.target.value);this.call("cover","set_cover_tilt_position",{entity_id:i,tilt_position:Qn(this.building,i)?100-a:a})}}
          /></label>`:Lo(this.hass?.states[i])?g`<div class="fp3d-rp-buttons">
              ${n&16?g`<button class="fp3d-btn fp3d-rp-small" ?disabled=${r} @click=${()=>this.call("cover","open_cover_tilt",{entity_id:i})}>${this.t("cover_tilt_open")}</button>`:y}
              ${n&32?g`<button class="fp3d-btn fp3d-rp-small" ?disabled=${r} @click=${()=>this.call("cover","close_cover_tilt",{entity_id:i})}>${this.t("cover_tilt_close")}</button>`:y}
            </div>`:y}
    </div>`}climateRow(t){let e=t.attributes,n=t.entity_id,i=typeof e.temperature=="number"?e.temperature:null,r=e.target_temp_step??.5,s=e.min_temp??5,a=e.max_temp??30,l=e.hvac_modes??[],c=d=>this.call("climate","set_temperature",{entity_id:n,temperature:Math.min(a,Math.max(s,Math.round(d/r)*r))});return g`<div class="fp3d-rp-row">
      <span class="fp3d-rp-icon ${e.hvac_action==="heating"?"fp3d-rp-on":""}">${this.rowIcon("climate",t.entity_id)}</span>
      ${this.nameButton(n)}
      <span class="fp3d-rp-state">${this.stateOf(t)}</span>
      ${i!==null?g`<div class="fp3d-rp-stepper fp3d-rp-wide">
            <button class="fp3d-btn" aria-label=${this.t("temp_down")} @click=${()=>c(i-r)}>−</button>
            <span><small>${this.t("target_temp")}</small> ${nt(this.hass,i,1)} ${Lt(this.hass)}</span>
            <button class="fp3d-btn" aria-label=${this.t("temp_up")} @click=${()=>c(i+r)}>+</button>
          </div>`:y}
      ${l.length>1?g`<div class="fp3d-rp-chips">
            ${l.map(d=>g`<button
                class="fp3d-chip"
                aria-pressed=${t.state===d}
                @click=${()=>this.call("climate","set_hvac_mode",{entity_id:n,hvac_mode:d})}
              >
                ${this.stateLabel(d)}
              </button>`)}
          </div>`:y}
    </div>`}stateOf(t,e=_t(this.hass,t)){if(this.room?.no_state?.includes(t.entity_id))return"";let n=L(t.entity_id);return t.state==="unknown"&&n!=="sensor"&&n!=="binary"?"":e}stateLabel(t){let e=`state_${t}`,n=this.t(e);return n===e?t:n}mediaRow(t){let e=t.attributes,n=t.entity_id,i=Q(t)||t.state==="off",r=[e.media_title,e.media_artist].filter(s=>typeof s=="string"&&s).join(" \xB7 ");return g`<div class="fp3d-rp-row">
      <span class="fp3d-rp-icon ${t.state==="playing"?"fp3d-rp-on":""}">${this.rowIcon("media",t.entity_id)}</span>
      ${this.nameButton(n)}
      <span class="fp3d-rp-state">${this.stateOf(t,this.stateLabel(t.state))}</span>
      ${r?g`<p class="fp3d-rp-media fp3d-rp-wide">${r}</p>`:y}
      <div class="fp3d-rp-buttons fp3d-rp-wide">
        <button class="fp3d-btn fp3d-rp-small" aria-label=${this.t("previous")} ?disabled=${i} @click=${()=>this.call("media_player","media_previous_track",{entity_id:n})}>
          ${xs(mi.previous)}
        </button>
        <button class="fp3d-btn fp3d-rp-small" aria-label=${this.t("play_pause")} ?disabled=${Q(t)} @click=${()=>this.call("media_player",t.state==="playing"?"media_pause":"media_play",{entity_id:n})}>
          ${xs(t.state==="playing"?mi.pause:mi.play)}
        </button>
        <button class="fp3d-btn fp3d-rp-small" aria-label=${this.t("next")} ?disabled=${i} @click=${()=>this.call("media_player","media_next_track",{entity_id:n})}>
          ${xs(mi.next)}
        </button>
      </div>
      ${typeof e.volume_level=="number"?g`<label class="fp3d-rp-slider"
            ><span>${this.t("volume")}</span>
            <input
              type="range"
              min="0"
              max="100"
              .value=${String(Math.round(e.volume_level*100))}
              @change=${s=>this.call("media_player","volume_set",{entity_id:n,volume_level:Number(s.target.value)/100})}
          /></label>`:y}
    </div>`}switchRow(t){let e=t.entity_id,n=L(e),i=e.slice(0,e.indexOf(".")),r=n==="lock"?t.state==="unlocked"||t.state==="open":t.state==="on",s=()=>n==="lock"?this.call("lock",r?"lock":"unlock",{entity_id:e}):this.call(i,"toggle",{entity_id:e});return g`<div class="fp3d-rp-row">
      <span class="fp3d-rp-icon ${r?"fp3d-rp-on":""}">${this.rowIcon(n,e)}</span>
      ${this.nameButton(e)}
      <span class="fp3d-rp-state">${this.stateOf(t)}</span>
      ${this.toggle(t,r,s)}
    </div>`}cameraTile(t){let e=t.attributes.entity_picture,n=e&&!Q(t)?e.startsWith("data:")?e:`${e}${e.includes("?")?"&":"?"}fp3d=${this._tick}`:null,i=this.floor?.placements.some(r=>r.entity_id===t.entity_id);return g`<div class="fp3d-rp-camera-wrap">
      <button class="fp3d-rp-camera" title=${this.t("camera_live")} @click=${()=>!this.readOnly&&Mt(this,t.entity_id)}>
        ${n?g`<img src=${n} alt=${this.name(t.entity_id)} loading="lazy" />`:g`<span class="fp3d-rp-note">${_t(this.hass,t)}</span>`}
        <span class="fp3d-rp-camera-name">${this.name(t.entity_id)}</span>
      </button>
      ${i?g`<button
            class="fp3d-rp-look"
            title=${this.t("through_camera")}
            @click=${()=>this.dispatchEvent(new CustomEvent("camera-look",{detail:{entity:t.entity_id},bubbles:!0,composed:!0}))}
          >
            ${G("camera_cockpit")?"":"\u{1F512} "}${this.t("through_camera")}
          </button>`:y}
    </div>`}sensorRow(t){let e=L(t.entity_id),n=e==="binary"&&t.state==="on";return g`<div class="fp3d-rp-row">
      <span class="fp3d-rp-icon ${n?"fp3d-rp-on":""}">${this.rowIcon(e,t.entity_id)}</span>
      ${this.nameButton(t.entity_id)}
      <span class="fp3d-rp-state">${this.stateOf(t)}</span>
    </div>`}fire(t){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0}))}static styles=[Tt,zt,ct`
      :host {
        display: block;
      }
      .fp3d-rp {
        /* the host may be pointer-events: none so the 3D view stays usable around the panel */
        pointer-events: auto;
        display: flex;
        flex-direction: column;
        max-height: 100%;
        min-height: 0;
        background: var(--fp3d-chrome-solid);
        border: 1px solid var(--fp3d-line);
        border-radius: 18px;
        box-shadow: var(--fp3d-shadow);
        overflow: hidden;
      }
      /* time travel: the controls show the past and take no touches (the list still scrolls) */
      .fp3d-rp-ro .fp3d-rp-body :is(button, input, select) {
        pointer-events: none;
      }
      .fp3d-rp-ro-note {
        color: #ffb020;
      }
      .fp3d-rp-head {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 14px 14px 10px 16px;
        border-bottom: 1px solid var(--fp3d-line);
      }
      .fp3d-rp-head > div {
        flex: 1;
        min-width: 0;
      }
      .fp3d-rp-sheets {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 8px;
      }
      .fp3d-rp-sheet {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        min-height: 32px;
        padding: 0 12px;
        border-radius: 999px;
        border: 1px solid var(--fp3d-line);
        background: color-mix(in srgb, var(--fp3d-accent, #37e0ff) 12%, transparent);
        color: inherit;
        font: inherit;
        font-size: 13px;
        cursor: pointer;
      }
      .fp3d-rp-sheet:hover {
        border-color: var(--fp3d-accent, #37e0ff);
      }
      h2 {
        margin: 0;
        font: 700 21px var(--fp3d-title-font);
        letter-spacing: -0.01em;
      }
      .fp3d-rp-facts {
        margin: 2px 0 0;
        color: var(--fp3d-muted);
        font-size: 13px;
        font-variant-numeric: tabular-nums;
      }
      @media (pointer: coarse) {
        .fp3d-rp-close {
          width: 40px;
          height: 40px;
        }
        .fp3d-rp-swatch {
          width: 36px;
          height: 36px;
        }
        .fp3d-rp-small {
          min-height: 36px;
        }
      }
      .fp3d-rp-close {
        display: grid;
        place-items: center;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        border: none;
        background: rgba(255, 255, 255, 0.06);
        color: var(--fp3d-text);
        cursor: pointer;
      }
      .fp3d-rp-fold {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-height: 40px;
        padding: 6px 14px;
        border: none;
        border-bottom: 1px solid var(--fp3d-line);
        background: rgba(255, 255, 255, 0.04);
        color: var(--fp3d-text);
        font: inherit;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
      }
      :host([compact]) .fp3d-rp-fold {
        border-bottom: none;
      }
      :host([compact]) .fp3d-rp-body {
        display: none;
      }
      .fp3d-rp-walk {
        margin-right: 6px;
        color: #37e0ff;
      }
      .fp3d-rp-body {
        overflow-y: auto;
        padding: 6px 14px 16px 16px;
        display: grid;
        gap: 14px;
        overscroll-behavior: contain;
      }
      .fp3d-rp-note {
        color: var(--fp3d-muted);
        font-size: 13px;
        margin: 8px 0 0;
      }
      .fp3d-rp-sec-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 6px;
      }
      h3 {
        margin: 0;
        font-size: 11.5px;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--fp3d-muted);
      }
      .fp3d-rp-row {
        display: grid;
        grid-template-columns: 28px 1fr auto auto;
        align-items: center;
        gap: 6px 10px;
        padding: 9px 0;
        border-bottom: 1px solid var(--fp3d-line);
      }
      .fp3d-rp-row:last-child {
        border-bottom: none;
      }
      .fp3d-rp-row > :nth-child(n + 5),
      .fp3d-rp-row > .fp3d-rp-wide {
        grid-column: 2 / -1;
      }
      .fp3d-rp-icon {
        display: grid;
        place-items: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        color: var(--fp3d-muted);
        background: rgba(91, 124, 255, 0.12);
      }
      .fp3d-rp-on {
        color: #2a1a00;
        background: var(--fp3d-warm);
        box-shadow: 0 0 14px rgba(255, 181, 71, 0.55);
      }
      .fp3d-rp-name {
        font: inherit;
        font-weight: 500;
        color: var(--fp3d-text);
        background: none;
        border: none;
        padding: 0;
        text-align: left;
        cursor: pointer;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .fp3d-rp-state {
        font-size: 12.5px;
        color: var(--fp3d-muted);
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
        max-width: 110px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .fp3d-rp-row > .fp3d-rp-state:last-child {
        grid-column: 3 / -1;
        justify-self: end;
      }
      .fp3d-switch {
        position: relative;
        width: 44px;
        height: 26px;
        border-radius: 999px;
        border: none;
        background: rgba(255, 255, 255, 0.1);
        cursor: pointer;
      }
      .fp3d-switch::after {
        content: "";
        position: absolute;
        top: 3px;
        left: 3px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #e6eefc;
        transition: transform 0.2s ease;
      }
      .fp3d-switch[aria-checked="true"] {
        background: var(--fp3d-warm);
      }
      .fp3d-switch[aria-checked="true"]::after {
        transform: translateX(18px);
      }
      .fp3d-switch:disabled {
        opacity: 0.4;
        cursor: default;
      }
      .fp3d-rp-slider {
        display: grid;
        grid-template-columns: 110px 1fr;
        align-items: center;
        gap: 10px;
        font-size: 12px;
        color: var(--fp3d-muted);
      }
      .fp3d-rp-slider input {
        width: 100%;
        accent-color: var(--fp3d-accent);
      }
      .fp3d-rp-ct input {
        accent-color: var(--fp3d-warm);
      }
      .fp3d-rp-swatches,
      .fp3d-rp-buttons,
      .fp3d-rp-chips,
      .fp3d-rp-scenes {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .fp3d-rp-swatch {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: var(--c);
        box-shadow: 0 0 10px var(--c);
        cursor: pointer;
      }
      .fp3d-rp-camera {
        position: relative;
        display: block;
        width: 100%;
        aspect-ratio: 16 / 9;
        margin: 6px 0;
        padding: 0;
        border: 1px solid var(--fp3d-line);
        border-radius: 12px;
        overflow: hidden;
        background: #05080f;
        cursor: pointer;
      }
      .fp3d-rp-camera img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .fp3d-rp-camera-wrap {
        position: relative;
      }
      .fp3d-rp-look {
        position: absolute;
        right: 8px;
        bottom: 12px;
        padding: 4px 10px;
        border: 1px solid var(--fp3d-line);
        border-radius: 999px;
        background: rgba(7, 11, 20, 0.8);
        color: var(--fp3d-accent);
        font: inherit;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
      }
      .fp3d-rp-camera-name {
        position: absolute;
        left: 8px;
        bottom: 6px;
        padding: 2px 8px;
        border-radius: 8px;
        background: rgba(7, 11, 20, 0.75);
        color: var(--fp3d-text);
        font-size: 12px;
        font-weight: 600;
      }
      .fp3d-rp-more {
        justify-self: start;
      }
      .fp3d-rp-small {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 5px 10px;
        min-height: 30px;
        font-size: 13px;
      }
      .fp3d-rp-stepper {
        display: flex;
        align-items: center;
        gap: 10px;
        font-variant-numeric: tabular-nums;
        font-weight: 600;
      }
      .fp3d-rp-stepper small {
        color: var(--fp3d-muted);
        font-weight: 500;
        margin-right: 4px;
      }
      .fp3d-rp-stepper .fp3d-btn {
        width: 36px;
        padding: 4px 0;
        font-size: 17px;
      }
      .fp3d-rp-chips .fp3d-chip {
        box-shadow: none;
        border: 1px solid var(--fp3d-line);
        min-height: 30px;
        padding: 4px 11px;
        font-size: 13px;
      }
      .fp3d-rp-media {
        margin: 0;
        font-size: 12.5px;
        color: var(--fp3d-muted);
      }
      button:focus-visible,
      input:focus-visible {
        outline: 2px solid var(--fp3d-accent);
        outline-offset: 2px;
      }
    `]};customElements.get("fp3d-room-panel")||customElements.define("fp3d-room-panel",ks);function ou(o,t,e,n,i=!1){let r=s=>{let a=s?.value.trim();!s||!a||(s.value="",n([...o,a]))};return g`<div class="fp3d-lines ${i?"fp3d-wide":""}" role="group" aria-label=${e.label}>
    ${e.label}
    ${o.map((s,a)=>g`<div class="fp3d-lines-row">
        <span>${s}</span>
        <button type="button" title=${e.remove} aria-label=${`${e.remove}: ${s}`} ?disabled=${t} @click=${()=>n(o.filter((l,c)=>c!==a))}>✕</button>
      </div>`)}
    <div class="fp3d-lines-add">
      <input
        type="text"
        maxlength="160"
        placeholder=${e.placeholder}
        aria-label=${e.placeholder}
        ?disabled=${t}
        @keydown=${s=>{s.key==="Enter"&&(s.preventDefault(),r(s.target))}}
      />
      <button type="button" class="fp3d-btn" ?disabled=${t} @click=${s=>r(s.currentTarget.previousElementSibling)}>
        ${e.add}
      </button>
    </div>
  </div>`}var jm="#ff3fb4";function ru(o){let t=String(o??"").split(/\s*(?:\||\n)\s*/).map(e=>e.trim().slice(0,40)).filter(Boolean).slice(0,2);return t.length?t:["Neon"]}function iu(o){return!o||!/^#[0-9a-f]{6}$/i.test(o)?null:[1,3,5].map(t=>parseInt(o.slice(t,t+2),16)/255)}function su(o,t,e){let n=iu(o.sign_color)??iu(jm);if(!e)return{on:!0,color:n,level:1};if(!t)return{on:!1,color:n,level:0};if(t.entity_id.split(".")[0]==="light"){let s=re(t);if(!s)return{on:!1,color:n,level:0};let a=t.attributes.color_mode;return{on:!0,color:Array.isArray(t.attributes.rgb_color)&&a!=="color_temp"&&a!=="brightness"&&a!=="onoff"&&a!=="white"?s.color:n,level:s.level}}let r=["on","open","home","playing","heat","cool","auto"].includes(t.state);return{on:r,color:n,level:r?1:0}}var ro=new Map;function au(o,t,e,n,i){let r=Math.min(8,Math.max(.25,Number.isFinite(i)&&i>0?i:3)),s=e?Math.round(Math.min(1,Math.max(.2,n))*10)/10:0,a=`${o.join(`
`)}|${t.map(f=>Math.round(f*32)).join(",")}|${s}|${r.toFixed(2)}`,l=ro.get(a);if(l)return l;if(typeof document>"u")return null;let c=r>=1?1024:Math.round(1024*r),d=r>=1?Math.round(1024/r):1024,u=document.createElement("canvas");u.width=c,u.height=d;let p=u.getContext("2d");if(!p)return null;let h="'Dancing Script', 'Segoe Script', 'Brush Script MT', 'Comic Sans MS', cursive";p.font=`600 100px ${h}`;let _=Math.max(...o.map(f=>p.measureText(f).width),1),b=Math.max(12,Math.min(c*.86*100/_,d*.78/(o.length*1.15)));p.font=`600 ${b}px ${h}`,p.textAlign="center",p.textBaseline="middle",p.lineJoin="round";let m=(f,M,x=1)=>`rgba(${f.map(I=>Math.round(Math.min(1,Math.max(0,I*M))*255)).join(",")},${x})`,w=t.map(f=>f+(1-f)*.65),k=d/2-(o.length-1)*b*1.15/2;o.forEach((f,M)=>{let x=k+M*b*1.15;e?(p.shadowColor=m(t,1),p.shadowBlur=b*.45*s,p.strokeStyle=m(t,1,.55*s),p.lineWidth=b*.12,p.strokeText(f,c/2,x),p.shadowBlur=b*.2*s,p.fillStyle=m(w,.55+.45*s),p.fillText(f,c/2,x)):(p.shadowBlur=0,p.fillStyle=m(t.map(I=>.12+I*.22),1),p.fillText(f,c/2,x))});let v=u.toDataURL("image/png");return ro.size>40&&ro.delete(ro.keys().next().value),ro.set(a,v),v}var Ot=.03,gi=o=>o&&o!=="none"?o:null;function Mn(o,t=e=>gi(e.power)){let e={grid:null,gridExport:null,solar:[],battery:[],charge:[],batteries:[],soc:[]};for(let n of o.floors)for(let i of n.furniture){let r=t(i);if(i.type==="meter")e.grid??=r,e.gridExport??=gi(i.export);else if(i.type==="inverter"&&r&&!e.solar.includes(r))e.solar.push(r);else if(i.type==="home_battery"){r&&!e.battery.includes(r)&&e.battery.push(r);let s=gi(i.charge);s&&!e.charge.includes(s)&&e.charge.push(s),(r||s)&&e.batteries.push({power:r,charge:s});let a=gi(i.soc);a&&!e.soc.includes(a)&&e.soc.push(a)}}return e}function Ss(o){if(qm(o))return o.energy.meter;for(let t of o.floors){let e=t.furniture.find(n=>n.type==="meter");if(e)return{floor_id:t.id,x:e.x,z:e.z}}return o.energy.meter}function qm(o){let t=o.energy.meter;return!!o.energy.hub_point&&!!t&&o.floors.some(e=>e.id===t.floor_id)}async function fu(o,t){let e=new Date;e.setHours(0,0,0,0);try{let n=await o.callWS({type:"recorder/statistics_during_period",start_time:e.toISOString(),statistic_ids:t,period:"hour",types:["change"]}),i=new Map;for(let r of t)i.set(r,(n?.[r]??[]).reduce((s,a)=>s+(typeof a.change=="number"?a.change:0),0));return i}catch{return null}}var mu=.07;function dt(o,t=!1){if(!o)return null;let e=Number(o.state);if(!Number.isFinite(e))return null;let n=String(o.attributes.unit_of_measurement??"W"),i=n==="kW"?e*1e3:n==="MW"?e*1e6:e;return t?-i:i}function co(o,t){return Hr(o,t)}function gu(o,t){let e=t.energy,n=new Set([e.grid,e.solar,e.battery].filter(Boolean)),i=[],r=new Set;for(let s of t.floors)for(let a of s.placements){let l=co(o,a.entity_id);!l||n.has(l)||r.has(l)||(r.add(l),i.push({id:a.entity_id,powerEntity:l,floorId:s.id,x:a.x,z:a.z,power:Math.max(0,dt(o.states[l])??0)}))}return i}function vi(o,t,e){let n=(t.settings.roof.strings??[]).filter(i=>(e===void 0||i.inverter===e)&&i.entity&&i.entity!=="none").map(i=>dt(o.states[i.entity])).filter(i=>i!==null);return n.length?n.reduce((i,r)=>i+Math.max(0,r),0):null}function wi(o,t){return t===null?o:o===null||Math.max(0,o)<5&&t>50?t:o}function bu(o,t,e,n=Mn(t)){let i=t.energy,r=i.grid??n.grid,s=r?dt(o.states[r],i.grid_invert):null;if(!i.grid&&n.gridExport){let b=Math.max(0,dt(o.states[n.gridExport])??0);s=Math.max(0,s??0)-b}let a=i.solar?dt(o.states[i.solar]):null;if(!i.solar&&n.solar.length){let b=n.solar.map(m=>dt(o.states[m])).filter(m=>m!==null);a=b.length?b.reduce((m,w)=>m+w,0):null}a=wi(a,vi(o,t));let l=i.battery?dt(o.states[i.battery],i.battery_invert):null;if(!i.battery&&n.batteries.length){let b=n.batteries.map(m=>{if(m.charge){let w=m.power?Math.max(0,dt(o.states[m.power])??0):0,k=Math.max(0,dt(o.states[m.charge])??0);return w-k}return m.power?dt(o.states[m.power],i.battery_invert):null}).filter(m=>m!==null);l=b.length?b.reduce((m,w)=>m+w,0):null}let d=(i.battery_soc?[i.battery_soc]:n.soc).map(b=>Number(o.states[b]?.state)).filter(b=>Number.isFinite(b)),u=d.length?d.reduce((b,m)=>b+m,0)/d.length:NaN,p=i.tariff?o.states[i.tariff]:void 0,h=Number(p?.state),_=i.consumption?dt(o.states[i.consumption]):null;return _!==null?_=Math.max(0,_):s!==null||a!==null||l!==null?_=Math.max(0,(s??0)+Math.max(0,a??0)+(l??0)):e.length&&(_=e.reduce((b,m)=>b+m.power,0)),{grid:s,solar:a===null?null:Math.max(0,a),battery:l,soc:Number.isFinite(u)?u:null,tariff:p&&Number.isFinite(h)?{value:h,unit:String(p.attributes.unit_of_measurement??"")}:null,consumption:_}}function qe(o,t){return o.pos.push(t),o.adj.push([]),o.pos.length-1}function Te(o,t,e){let n=Math.hypot(o.pos[t][0]-o.pos[e][0],o.pos[t][1]-o.pos[e][1]);o.adj[t].push({to:e,w:n}),o.adj[e].push({to:t,w:n})}function Km(o,t){let e=o.length,n=o.map((i,r)=>{let s=o[(r+1)%e],a=s[0]-i[0],l=s[1]-i[1],c=Math.hypot(a,l)||1,d=-l/c,u=a/c;return{p:[i[0]+d*t[r],i[1]+u*t[r]],d:[a/c,l/c],n:[d,u]}});return o.map((i,r)=>{let s=n[(r-1+e)%e],a=n[r],l=s.d[0]*a.d[1]-s.d[1]*a.d[0];if(Math.abs(l)<1e-6)return[i[0]+a.n[0]*t[r],i[1]+a.n[1]*t[r]];let c=((a.p[0]-s.p[0])*a.d[1]-(a.p[1]-s.p[1])*a.d[0])/l;return[s.p[0]+s.d[0]*c,s.p[1]+s.d[1]*c]})}function Gm(o){return Ht(o.points)>=0?{pts:o.points,flipped:!1}:{pts:[...o.points].reverse(),flipped:!0}}function Ms(o,t,e){let n={pos:[],adj:[],rings:new Map},{walls:i}=ye(o.rooms,{exterior:t,interior:e},o.walls??[]);for(let r of o.rooms){if(r.points.length<3)continue;let{pts:s,flipped:a}=Gm(r),l=s.length,c=s.map((p,h)=>{let _=a?(l-2-h+l)%l:h,b=i.some(m=>!m.exterior&&m.sources.some(w=>w.room_id===r.id&&w.edge===_));return mu+(b?e/2:0)}),d=Km(s,c).map(p=>qe(n,p)),u=d.map((p,h)=>[p,d[(h+1)%l]]);for(let[p,h]of u)Te(n,p,h);n.rings.set(r.id,u)}for(let r of i){if(r.exterior||!r.roomLeft||!r.roomRight)continue;let s=[(r.a[0]+r.b[0])/2,(r.a[1]+r.b[1])/2],a=ao(n,r.roomLeft,s),l=ao(n,r.roomRight,s);a!==null&&l!==null&&Te(n,a,l)}return Qm(n),n}var Ym=1;function Qm(o){let t=[...o.rings.entries()];for(;;){let e=new Array(o.pos.length).fill(-1),n=0;for(let s=0;s<o.pos.length;s++){if(e[s]>=0)continue;let a=[s];for(e[s]=n;a.length;)for(let{to:l}of o.adj[a.pop()])e[l]<0&&(a.push(l),e[l]=n);n++}if(n<2)return;let i=null;for(let[,s]of t)for(let a of new Set(s.flat()))for(let[l,c]of t)if(e[c[0][0]]!==e[a])for(let[d,u]of c){let p=o.pos[a],h=o.pos[d],_=o.pos[u],b=_[0]-h[0],m=_[1]-h[1],w=Math.min(1,Math.max(0,((p[0]-h[0])*b+(p[1]-h[1])*m)/(b*b+m*m||1))),k=Math.hypot(p[0]-h[0]-b*w,p[1]-h[1]-m*w);(!i||k<i.d)&&(i={a,room:l,d:k})}if(!i||i.d>Ym+2*mu)return;let r=ao(o,i.room,o.pos[i.a]);if(r===null)return;Te(o,i.a,r)}}function ao(o,t,e){let n=o.rings.get(t);if(!n)return null;let i=null;for(let s of n){let a=o.pos[s[0]],l=o.pos[s[1]],c=l[0]-a[0],d=l[1]-a[1],u=c*c+d*d||1,p=Math.min(1,Math.max(0,((e[0]-a[0])*c+(e[1]-a[1])*d)/u)),h=[a[0]+c*p,a[1]+d*p],_=Math.hypot(e[0]-h[0],e[1]-h[1]);(!i||_<i.d)&&(i={seg:s,q:h,d:_})}if(!i)return null;let r=qe(o,i.q);return Te(o,r,i.seg[0]),Te(o,r,i.seg[1]),r}function bi(o,t,e){let n=o.pos[e],i=ao(o,t.id,n);if(i===null)return!1;let r=o.pos[i],s=o.pos[o.adj[i][0].to],a=o.pos[o.adj[i][1].to],l=Math.hypot(a[0]-s[0],a[1]-s[1])||1,c=[(a[0]-s[0])/l,(a[1]-s[1])/l],d=(n[0]-r[0])*c[0]+(n[1]-r[1])*c[1],u=(n[1]-r[1])*c[0]-(n[0]-r[0])*c[1];if(Math.abs(d)<.01||Math.abs(u)<.01)return Te(o,e,i),!0;let p=[r[0]+c[0]*d,r[1]+c[1]*d],h=[r[0]-c[1]*u,r[1]+c[0]*u],_=qe(o,W(h,t.points)||!W(p,t.points)?h:p);return Te(o,i,_),Te(o,_,e),!0}function lo(o,t){let e=o.rooms.filter(r=>r.points.length>=3),n=e.find(r=>W(t,r.points));if(n)return n;let i=null;for(let r of e)for(let s of r.points){let a=Math.hypot(t[0]-s[0],t[1]-s[1]);(!i||a<i.d)&&(i={room:r,d:a})}return i?.room??null}function _u(o,t){let e=o.pos.map(()=>1/0),n=o.pos.map(()=>-1),i=o.pos.map(()=>!1);for(e[t]=0;;){let r=-1;for(let s=0;s<e.length;s++)!i[s]&&e[s]<1/0&&(r<0||e[s]<e[r])&&(r=s);if(r<0)break;i[r]=!0;for(let{to:s,w:a}of o.adj[r])e[r]+a<e[s]-1e-9&&(e[s]=e[r]+a,n[s]=r)}return{dist:e,prev:n}}function lu(o,t){return o.every(e=>t[e].kind==="battery")?"battery":o.every(e=>t[e].kind==="wallbox")?"wallbox":"consumer"}var cu=new WeakMap;function Jm(o,t){let e=Ss(o),n=o.floors.find(d=>d.id===e.floor_id),i=[],{wall_exterior:r,wall_interior:s}=o.settings,a=new Map,l=new Map;t.forEach((d,u)=>l.set(d.floorId,[...l.get(d.floorId)??[],u]));let c=o.floors.filter(d=>l.has(d.id));for(let d of c){if(d.id===n.id)continue;let u=d.elevation>n.elevation,p=l.get(d.id),h=lu(p,t);i.push({floorId:n.id,a:[e.x,Ot,e.z],b:[e.x,u?n.height:-.2,e.z],dist:0,members:p,kind:h});let _=Math.abs(d.elevation-n.elevation);i.push({floorId:d.id,a:[e.x,u?-.2:d.height,e.z],b:[e.x,Ot,e.z],dist:_,members:p,kind:h}),a.set(d.id,_+.25)}for(let d of c){let u=Ms(d,r,s),p=lo(d,[e.x,e.z]);if(!p)continue;let h=qe(u,[e.x,e.z]);if(!bi(u,p,h))continue;let _=[];for(let v of l.get(d.id)){let f=t[v],M=lo(d,[f.x,f.z]);if(!M)continue;let x=qe(u,[f.x,f.z]);bi(u,M,x)&&_.push({node:x,member:v})}let{dist:b,prev:m}=_u(u,h),w=new Map;for(let v of _)if(Number.isFinite(b[v.node]))for(let f=v.node;m[f]>=0;f=m[f]){let M=m[f],x=`${M}>${f}`,I=w.get(x)??{a:M,b:f,members:[]};I.members.push(v.member),w.set(x,I)}let k=a.get(d.id)??0;for(let{a:v,b:f,members:M}of w.values()){let x=u.pos[v],I=u.pos[f],T=lu(M,t);i.push({floorId:d.id,a:[x[0],Ot,x[1]],b:[I[0],Ot,I[1]],dist:k+b[v],members:M,kind:T})}}return i}function vu({building:o,consumers:t,summary:e,battery:n,fieldPower:i,devicePower:r}){let s=Ss(o);if(!s)return[];let a=o.floors.find(R=>R.id===s.floor_id);if(!a)return[];let l=R=>r?.get(R),c=$s(o,"inverter"),d=$s(o,"home_battery");!d.length&&n&&d.push({id:"battery",type:"home_battery",floorId:n.floorId,x:n.x,z:n.z,h:1.1,variant:null});let u=R=>{let $=null;for(let P of c)P.floorId===R.floorId&&(!$||Math.hypot(P.x-R.x,P.z-R.z)<Math.hypot($.x-R.x,$.z-R.z))&&($=P);return $},p=R=>l(R.id)??(d.length===1?e.battery??0:0),h=new Map;for(let R of d){let $=u(R);$&&h.set(R.id,$)}let _=t.map(R=>({floorId:R.floorId,x:R.x,z:R.z,kind:R.wallbox?"wallbox":"consumer",power:R.power}));for(let R of d)!h.has(R.id)&&e.battery!==null&&_.push({floorId:R.floorId,x:R.x,z:R.z,kind:"battery",power:Math.abs(p(R))});let b=`${s.floor_id}:${s.x},${s.z}|${_.map(R=>`${R.floorId}:${R.x},${R.z}:${R.kind}`).join(";")}`,m=cu.get(o);m||cu.set(o,m=new Map);let w=m.get(b);w||(w=Jm(o,_),m.clear(),m.set(b,w));let k=w.map(R=>({floorId:R.floorId,a:R.a,b:R.b,dist:R.dist,power:R.members.reduce(($,P)=>$+_[P].power,0),kind:R.kind})),v=e.grid!==null?_i(o):null,f=o.settings.roof.cables??[],M=R=>f.find($=>$.id===R),x=(R,$)=>R.map(P=>({...P,key:$}));if(v){let R=e.grid>=0,$=M("grid"),P=$?so(o,$,[v.end[0],a.elevation+Math.max(Ot,v.height),v.end[1]],[s.x,a.elevation+.4+1.1,s.z]):[...v.height>.05?[[v.end[0],v.height,v.end[1]]]:[],[v.end[0],Ot,v.end[1]],[v.wall[0],Ot,v.wall[1]],[s.x,Ot,s.z]],O=$?Sn(o,R?P:[...P].reverse(),Math.abs(e.grid),R?"grid":"export",a):yu(a.id,R?P:[...P].reverse(),Math.abs(e.grid),R?"grid":"export",0);k.push(...x(O,"grid"))}if(e.battery!==null&&e.battery>0)for(let R of k)R.kind==="battery"&&([R.a,R.b]=[R.b,R.a]);let I=o.settings.roof.solar??[],T=o.settings.roof.strings??[],z=new Map;if(i&&I.length){let R=[...ke(o),...no(o)];for(let $ of I){let P=i.get($.id)??0,O=$.string?T.find(Z=>Z.id===$.string)?.inverter:null,H=O?d.find(Z=>Z.id===O)??null:null,C=O&&!H?c.find(Z=>Z.id===O)??null:null;if(H){let Z=h.get(H.id);Z&&z.set(Z.id,(z.get(Z.id)??0)+P);let X=H.variant==="wall"?.5+H.h:.9,pt=M(`solar:${$.id}`),yt=pt?pu(o,$):null,Ft=o.floors.find(he=>he.id===H.floorId);pt&&yt&&Ft?k.push(...x(Sn(o,so(o,pt,yt,[H.x,Ft.elevation+X,H.z]),P,"solar",Ft),`solar:${$.id}`)):k.push(...x(hu(o,$,P,H,X),`solar:${$.id}`));continue}if(!C&&c.length){let Z=We(o,$,R),X=Z?Qc(Z,$):[$.u,$.v];C=c.reduce((pt,yt)=>!pt||Math.hypot(yt.x-X[0],yt.z-X[1])<Math.hypot(pt.x-X[0],pt.z-X[1])?yt:pt,null)}C&&z.set(C.id,(z.get(C.id)??0)+P);let j=C??{floorId:s.floor_id,x:s.x,z:s.z},Y=C?1.1+C.h:1.5,F=M(`solar:${$.id}`),U=F?pu(o,$):null,D=o.floors.find(Z=>Z.id===j.floorId);F&&U&&D?k.push(...x(Sn(o,so(o,F,U,[j.x,D.elevation+Y,j.z]),P,"solar",D),`solar:${$.id}`)):k.push(...x(hu(o,$,P,j,Y),`solar:${$.id}`))}}else e.solar!==null&&!c.length&&k.push({floorId:a.id,a:[s.x+.08,a.height+.6,s.z+.08],b:[s.x+.08,Ot,s.z+.08],dist:0,power:e.solar,kind:"solar"});for(let R of c){let $=1.1+R.h,P=d.filter(C=>h.get(C.id)===R),O=l(R.id);if(O===void 0){O=z.get(R.id)??(c.length===1?e.solar??0:0);for(let C of P)O+=p(C)}let H=o.floors.find(C=>C.id===R.floorId);if(e.solar!==null||e.battery!==null){let C=M(`inv:${R.id}`),j=Xm(o,R.id)?_i(o):null,Y=j?{floorId:j.floorId,x:j.end[0],z:j.end[1],y:Math.max(Ot,j.height)}:{floorId:s.floor_id,x:s.x,z:s.z,y:1.5},F=j?o.floors.find(D=>D.id===j.floorId)??a:a,U=C&&H?Sn(o,so(o,C,[R.x,H.elevation+$,R.z],[Y.x,F.elevation+Y.y,Y.z]),Math.max(0,O),"inverter",H):uu(o,R,$,Y,Y.y,Math.max(0,O),"inverter",0);k.push(...x(U,`inv:${R.id}`))}for(let C of P){let j=p(C);if(e.battery===null&&l(C.id)===void 0)continue;let Y=C.variant==="wall"?.5+C.h:.9,F=M(`bat:${C.id}`),U=F&&H?Sn(o,so(o,F,[R.x,H.elevation+$-.1,R.z],[C.x,H.elevation+Y,C.z]),Math.abs(j),"battery",H):uu(o,R,$-.1,C,Y,Math.abs(j),"battery",0);k.push(...x(j<=0?U:U.map(D=>({...D,a:D.b,b:D.a})).reverse(),`bat:${C.id}`))}}return k}function _i(o){let t=Ss(o),e=t?o.floors.find(h=>h.id===t.floor_id):void 0;if(!t||!e)return null;let{wall_exterior:n,wall_interior:i}=o.settings,{walls:r}=ye(e.rooms,{exterior:n,interior:i},e.walls??[]),s=$s(o,"grid_point")[0],a=r.filter(h=>h.exterior);if(s){let h=null;for(let m of a){let w=m.b[0]-m.a[0],k=m.b[1]-m.a[1],v=s.x-t.x,f=s.z-t.z,M=v*k-f*w;if(Math.abs(M)<1e-9)continue;let x=((m.a[0]-t.x)*k-(m.a[1]-t.z)*w)/M,I=((m.a[0]-t.x)*f-(m.a[1]-t.z)*v)/M;if(x<=0||x>1||I<0||I>1||h&&x>=h.t)continue;let T=Math.hypot(w,k)||1;h={q:[t.x+v*x,t.z+f*x],out:[k/T,-w/T],t:x}}let _=h?[h.q[0]+h.out[0]*(n/2+.05),h.q[1]+h.out[1]*(n/2+.05)]:[t.x,t.z],b=o.floors.flatMap(m=>m.furniture).find(m=>m.id===s.id)?.mount_y??0;return{floorId:e.id,wall:_,end:[s.x,s.z],height:Math.max(0,b)}}let l=null;for(let h of a){let _=h.b[0]-h.a[0],b=h.b[1]-h.a[1],m=_*_+b*b||1,w=Math.min(1,Math.max(0,((t.x-h.a[0])*_+(t.z-h.a[1])*b)/m)),k=[h.a[0]+_*w,h.a[1]+b*w],v=Math.hypot(t.x-k[0],t.z-k[1]),f=Math.sqrt(m);(!l||v<l.d)&&(l={q:k,out:[b/f,-_/f],d:v})}if(!l)return null;let{q:c,out:d}=l,u=0;for(let h of o.floors)for(let _ of h.outdoor??[]){let b=_.points.length;for(let m=0;m<b;m++){let w=_.points[m],k=_.points[(m+1)%b],v=k[0]-w[0],f=k[1]-w[1],M=d[0]*f-d[1]*v;if(Math.abs(M)<1e-9)continue;let x=((w[0]-c[0])*f-(w[1]-c[1])*v)/M,I=((w[0]-c[0])*d[1]-(w[1]-c[1])*d[0])/M;x>0&&I>=0&&I<=1&&(u=Math.max(u,Math.min(15,x)))}}let p=u>n+1?u:n+2.5;return{floorId:e.id,wall:[c[0]+d[0]*(n/2+.05),c[1]+d[1]*(n/2+.05)],end:[c[0]+d[0]*p,c[1]+d[1]*p],height:0}}function Xm(o,t){return o.floors.some(e=>e.furniture.some(n=>n.id===t&&n.type==="inverter"&&n.cable_to==="grid"))}function $s(o,t){let e=[];for(let n of o.floors)for(let i of n.furniture)i.type===t&&e.push({id:i.id,type:i.type,floorId:n.id,x:i.x,z:i.z,h:i.h,variant:i.variant??null});return e}var du=new WeakMap;function wu(o,t,e,n){let i=`${t.id}:${e.join(",")}>${n.join(",")}`,r=du.get(o);r||du.set(o,r=new Map);let s=r.get(i);if(s)return s;let{wall_exterior:a,wall_interior:l}=o.settings,c=Ms(t,a,l),d=[e,n],u=lo(t,e),p=lo(t,n);if(u&&p){let h=qe(c,e),_=qe(c,n);if(bi(c,u,h)&&bi(c,p,_)){let{dist:b,prev:m}=_u(c,h);if(Number.isFinite(b[_])){d.length=0;for(let w=_;w>=0;w=m[w])d.unshift(c.pos[w])}}}return r.set(i,d),d}function uu(o,t,e,n,i,r,s,a){let l=o.floors.find(u=>u.id===t.floorId);if(!l||t.floorId!==n.floorId)return[];let c=wu(o,l,[t.x,t.z],[n.x,n.z]),d=[[t.x,e,t.z],...c.map(u=>[u[0],Ot,u[1]]),[n.x,i,n.z]];return yu(l.id,d,r,s,a)}function yu(o,t,e,n,i){let r=[];for(let s=0;s+1<t.length;s++){let a=t[s],l=t[s+1],c=Math.hypot(l[0]-a[0],l[1]-a[1],l[2]-a[2]);c<1e-4||(r.push({floorId:o,a,b:l,dist:i,power:e,kind:n}),i+=c)}return r}function so(o,t,e,n){let r=(o.floors.find(s=>s.id===t.floor_id)?.elevation??0)+Math.max(Ot,t.height);return[e,...t.points.map(s=>[s[0],r,s[1]]),n]}function pu(o,t){let e=We(o,t,[...ke(o),...no(o)]);if(!e)return null;let[n,i]=Be(e,t),r=t.u+n/2,s=e.unbounded?t.v+i/2:t.v;return[e.o[0]+e.eu[0]*r+e.es[0]*s,e.o[1]+e.eu[1]*r+e.es[1]*s,e.o[2]+e.eu[2]*r+e.es[2]*s]}function Zm(o,t,e){let{wall_exterior:n,wall_interior:i}=o.settings,r=Ms(t,n,i),s=lo(t,e),a=s?ao(r,s.id,e):null;return a===null?e:r.pos[a]}function Sn(o,t,e,n,i){let r=[...o.floors].sort((c,d)=>c.elevation-d.elevation),s=c=>{let d=i;for(let u of r)c>=u.elevation-.01&&(d=u);return d},a=[],l=0;for(let c=0;c+1<t.length;c++){let d=t[c],u=t[c+1];if(Math.hypot(u[0]-d[0],u[1]-d[1],u[2]-d[2])<1e-4)continue;let h=[];if(Math.abs(u[1]-d[1])>.01){let _=Math.min(d[1],u[1]),b=Math.max(d[1],u[1]);for(let m of r)m.elevation>_+.01&&m.elevation<b-.01&&h.push(m.elevation);u[1]<d[1]&&h.reverse()}for(let _ of[...h,u[1]]){let b=(_-d[1])/(u[1]-d[1]||1),m=Math.abs(u[1]-d[1])>.01?[d[0]+(u[0]-d[0])*b,_,d[2]+(u[2]-d[2])*b]:u,w=s((d[1]+m[1])/2),k=Math.hypot(m[0]-d[0],m[1]-d[1],m[2]-d[2]);k>1e-4&&a.push({floorId:w.id,a:[d[0],d[1]-w.elevation,d[2]],b:[m[0],m[1]-w.elevation,m[2]],dist:l,power:e,kind:n}),l+=k,d=m}}return a}function hu(o,t,e,n,i){let r=[...ke(o),...no(o)],s=We(o,t,r),a=o.floors.find(m=>m.id===n.floorId);if(!s||!a)return[];let[l,c]=Be(s,t),d=(m,w)=>[s.o[0]+s.eu[0]*m+s.es[0]*w,s.o[1]+s.eu[1]*m+s.es[1]*w,s.o[2]+s.eu[2]*m+s.es[2]*w],u=t.u+l/2,p=a.elevation+Ot,h=[],_;if(s.unbounded){let m=d(u,t.v+c/2);_=[m[0],p,m[2]],h.push(_)}else if(s.wall){let m=d(u,t.v);_=[m[0],p,m[2]],h.push(m,_)}else{let m=d(u,t.v),w=Yr(o)??a,k=Math.max(a.elevation+.5,Math.min(m[1]-.25,w.elevation+w.height-.12));_=[m[0],k,m[2]],h.push(m)}let b=Zm(o,a,[_[0],_[2]]);h.push([b[0],_[1],b[1]]),Math.abs(_[1]-p)>.05&&h.push([b[0],p,b[1]]);for(let m of wu(o,a,b,[n.x,n.z]).slice(1))h.push([m[0],p,m[1]]);return h.push([n.x,a.elevation+i,n.z]),Sn(o,h,e,"solar",a)}function xu(o,t=new Date){let e=new Date(t);e.setHours(0,0,0,0);let n=Math.max(1,Math.floor((t.getTime()-e.getTime())/3e5)+1),i=new Array(n).fill(0),r=-1;for(let a of Object.values(o))for(let l of a){let c=typeof l.start=="number"?l.start:Date.parse(l.start),d=Math.floor((c-e.getTime())/3e5);d<0||d>=n||typeof l.mean!="number"||(i[d]+=Math.max(0,l.mean),r=Math.max(r,d))}return i.length=Math.max(r+1,n-3,1),{kwh:i.reduce((a,l)=>a+l*5/60/1e3,0),peak:Math.max(0,...i),curve:i}}async function ku(o,t){let e=new Date;e.setHours(0,0,0,0);try{return await o.callWS({type:"recorder/statistics_during_period",start_time:e.toISOString(),statistic_ids:t,period:"5minute",types:["mean"]})??{}}catch{return null}}function Is(o,t){let n=l=>42-(t>0?l/t*36:0),i=o.map((l,c)=>[c/288*220,n(l)]),r=i.map(([l,c],d)=>`${d?"L":"M"}${l.toFixed(1)} ${c.toFixed(1)}`).join(" "),[s,a]=i[i.length-1];return{line:r,area:`${r} L${s.toFixed(1)} 44 L0 44 Z`,endX:s,endY:a}}function $u(o){return Math.max(1,o.rows*o.cols-(o.skip?.length??0))}var tg=400;function Su(o,t){let e=new Map;for(let n of o.settings.roof.solar??[]){let i=Math.min(1,(t.get(n.id)??0)/($u(n)*(n.wp??tg)));e.set(n.id,i>.003?Math.pow(i,.6):0)}return e}function Mu(o,t,e){let n=new Map,i=t.settings.roof.solar??[],r=t.settings.roof.strings??[],s=$u,a=[],l=0,c=new Map;for(let p of i){let h=p.entity&&p.entity!=="none"?dt(o.states[p.entity]):null;if(h!==null){n.set(p.id,Math.max(0,h)),l+=Math.max(0,h);continue}let _=p.string?r.find(m=>m.id===p.string):void 0,b=_?.entity&&_.entity!=="none"?dt(o.states[_.entity]):null;if(_&&b!==null){c.set(_.id,[...c.get(_.id)??[],p]);continue}a.push(p)}for(let[p,h]of c){let _=r.find(w=>w.id===p),b=Math.max(0,dt(o.states[_.entity])??0),m=h.reduce((w,k)=>w+s(k),0);for(let w of h)n.set(w.id,b*s(w)/m);l+=b}let d=Math.max(0,(e??0)-l),u=a.reduce((p,h)=>p+s(h),0);for(let p of a)n.set(p.id,u?d*s(p)/u:0);return n}var jt={solar:[1,.78,.2],battery:[.25,1,.6],wallbox:[.3,.75,1],house:[.6,.72,1],export:[.2,.95,1],import:[1,.3,.65]};function Iu(o,t){if(o==="grid")return jt.import;if(o==="export")return jt.export;if(o==="solar")return jt.solar;if(o==="battery")return jt.battery;if(o==="wallbox")return jt.wallbox;if(o==="inverter")return(t.solar??0)>5?jt.solar:jt.battery;let e=[[Math.max(0,t.grid??0),jt.house],[Math.max(0,(t.solar??0)-Math.max(0,-(t.grid??0))-Math.max(0,-(t.battery??0))),jt.solar],[Math.max(0,t.battery??0),jt.battery]],[n]=e.reduce((i,r)=>r[0]>i[0]?r:i);return n>0?e.find(i=>i[0]===n)[1]:jt.house}var uo={neon:{night:[[11,17,32],[7,11,20]],day:[[26,44,78],[12,20,36]]},blueprint:{night:[[26,70,130],[10,38,78]],day:[[34,86,150],[14,48,96]]},day:{night:[[214,224,238],[176,190,210]],day:[[242,246,251],[205,216,230]]}};var Ps={natural:!0,signal:!0,shadows:!0,floors:1,cutDark:!0,sun:.45,ao:.45},xi=[{id:"neon",base:"neon",group:"neon",aliases:["neon","standard"]},{id:"blueprint",base:"blueprint",group:"neon",aliases:["blueprint"]},{id:"day",base:"day",group:"neon",aliases:["day","light"]},{id:"focus",base:"neon",group:"neon",palette:{line:"#394150",dark:"#07090d",light:"#2c313a",hue:0,lift:.05,contrast:2.5},signal:!0,sun:.2,bg:["#030407","#0b0e14"],aliases:["focus","night","dark"]},{id:"synth",base:"neon",group:"neon",palette:{line:"#ff3fd2",dark:"#12051f",light:"#3a1460",hue:.2,lift:.05,contrast:2.5},signal:!0,sun:.2,bg:["#08010f","#2a0838"],aliases:["synthwave","synth","retro","party"]},{id:"cozy",base:"day",group:"homely",...Ps,palette:null,bg:["#f1efeb","#d9d5ce"],aliases:["cozy","homely","real"]},{id:"evening",base:"neon",group:"homely",...Ps,sun:.4,dim:.75,bg:["#14161c","#272630"],aliases:["evening","cozy evening"]},{id:"winter",base:"neon",group:"homely",...Ps,sun:.4,dim:.8,bg:["#0b1322","#1d2a40"],aliases:["winter","christmas"]},{id:"model",base:"day",group:"designed",palette:{line:"#8a8f98",dark:"#cfcac2",light:"#fbfaf7",hue:.08,lift:.35,contrast:3.2},signal:!0,sun:.3,ao:.3,shadows:!0,bg:["#eeece8","#d6d2cb"],aliases:["model","architect","white"]},{id:"pastel",base:"day",group:"designed",palette:{line:"#3b3f5c",dark:"#b7c4e6",light:"#fff4ea",hue:.55,lift:.3,contrast:3},signal:!0,sun:.25,ao:.2,shadows:!0,bg:["#f4efe8","#e3e7f2"],aliases:["pastel","kids"]},{id:"warm",base:"day",group:"designed",palette:{line:"#5a4632",dark:"#b0906c",light:"#f4ead9",hue:.15,lift:.3,contrast:3},signal:!0,sun:.3,ao:.3,shadows:!0,bg:["#f0e7d7","#d9cbb3"],aliases:["warm","wood","paper"]}],K_=xi.map(o=>o.id),eg=new Map(xi.map(o=>[o.id,o])),ki=[];function In(o){ki=(o??[]).filter(t=>t&&typeof t.id=="string"&&t.id.startsWith("my_")&&typeof t.name=="string").map(t=>({...t,group:"custom",aliases:[t.name]}))}function Ke(){return ki.length?[...xi,...ki]:xi}function Ee(o){return o?eg.get(o)??ki.find(t=>t.id===o):void 0}function Ts(o){let t=/^(\d{1,2}):(\d{2})$/.exec(o?.trim()??"");if(!t)return null;let e=Number(t[1]),n=Number(t[2]);return e<24&&n<60?e*60+n:null}function ng(o,t,e){let n=t.getHours()*60+t.getMinutes(),i=Ts(o?.style_morning_at)??420,r=Ts(o?.style_evening_at)??1080,s=Ts(o?.style_night_at)??1380,a=s>i?n>=s||n<i:n>=s&&n<i;return(o?.style_switch??"sun")==="sun"&&e!==null?e?"day":t.getHours()<12||a?"night":"evening":a?"night":n>=r?"evening":"day"}function yi(o){return o.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"")}function $i(o,t={}){if(!o)return null;let e=yi(o);if(!e)return null;for(let n of Ke())if(yi(n.id)===e||n.aliases.some(i=>yi(i)===e)||(t[n.id]??[]).some(i=>yi(i)===e))return n.id;return null}function Pu(o){let t=c=>Ee(c)?c:null,e=t(o.override);if(e)return e;let n=$i(o.entityState,o.names);if(n)return n;let i=o.choice||"neon";if(i==="auto")return o.sunUp===!1?"neon":o.sunUp===!0?"day":"neon";let r=(c,d,u,p)=>{let h=ng(p,o.now,o.sunUp);return h==="night"?u??d??c??"neon":h==="evening"?d??c??"neon":c??"neon"};if(i==="house"){let c=o.plan;return r(t(c?.style_day),t(c?.style_evening),t(c?.style_night),c)}let s=t(i)??"neon",a=t(o.evening),l=t(o.night);return a||l?r(s,a,l,o.plan):s}var Si={temperature:{deviceClass:"temperature",unit:"\xB0C",stops:[[17,[.24,.48,1]],[20.5,[.2,.9,.7]],[23,[1,.75,.25]],[25.5,[1,.32,.2]]]},humidity:{deviceClass:"humidity",unit:"%",stops:[[30,[1,.6,.2]],[45,[.3,.9,.5]],[60,[.2,.8,1]],[75,[.3,.4,1]]]},co2:{deviceClass:"carbon_dioxide",unit:"ppm",stops:[[450,[.3,.9,.5]],[800,[1,.85,.3]],[1200,[1,.5,.2]],[1600,[1,.25,.25]]]}};function Tu(o,t){let e=Si[o].stops;if(t<=e[0][0])return e[0][1];for(let n=1;n<e.length;n++){let[i,r]=e[n],[s,a]=e[n-1];if(t<=i){let l=(t-s)/(i-s);return[a[0]+(r[0]-a[0])*l,a[1]+(r[1]-a[1])*l,a[2]+(r[2]-a[2])*l]}}return e[e.length-1][1]}function Eu(o,t,e){let n=new Map;for(let i of t.floors)for(let r of i.rooms){let s=Vt(o,i,r,e);s!==null&&n.set(r.id,s)}return n}function Ru(o){let t=Si[o].stops,e=t[0][0],n=t[t.length-1][0];return`linear-gradient(90deg, ${t.map(([i,r])=>`rgb(${r.map(s=>Math.round(s*255)).join(",")}) ${Math.round((i-e)/(n-e)*100)}%`).join(", ")})`}function kt(o,t){if(!_e(t))return E(o,`furn_${t}`);let e=vt(t);return e?Ml(e,o?.language??navigator.language):E(o,"pack_missing_item")}var Es=.06;function zu(o,t,e){let n=e[0]-t[0],i=e[1]-t[1],r=Math.hypot(n,i)||1e-9,s=((o[0]-t[0])*n+(o[1]-t[1])*i)/r;return{off:Math.abs((o[0]-t[0])*i-(o[1]-t[1])*n)/r,at:s,len:r}}function Au(o,t){for(let e=0;e<t.length;e++){let n=zu(o,t[e],t[(e+1)%t.length]);if(n.off<Es&&n.at>-Es&&n.at<n.len+Es)return e}return-1}function og(o,t,e){let n=o.points[t],i=o.points[(t+1)%o.points.length];if(!n||!i)return null;let r=Math.hypot(i[0]-n[0],i[1]-n[1])||1e-9;return[n[0]+(i[0]-n[0])*e/r,n[1]+(i[1]-n[1])*e/r]}function Mi(o,t){if(!o||!t?.length)return[];let e=new Set(o.floors.flatMap(n=>[...n.rooms.map(i=>i.id),...(n.outdoor??[]).map(i=>i.id)]));return t.filter(n=>e.has(n))}function Ii(o,t){o.settings.surroundings&&(o={...o,settings:{...o.settings,surroundings:null}});let e=new Set(t),n=o.settings.wall_interior??.12,i=[];for(let h of o.floors){let _=h.rooms.filter(I=>e.has(I.id)),b=(h.outdoor??[]).filter(I=>e.has(I.id));if(!_.length&&!b.length)continue;let m=[..._.map(I=>I.points),...b.map(I=>I.points)].filter(I=>I.length>=3),w=(I,T)=>m.some(z=>W([I,T],z)),k=h.rooms.filter(I=>!e.has(I.id)&&I.points.length>=3),v=_.map(I=>{let T=I.points.length,z=Array.from({length:T},($,P)=>I.wall_thickness?.[P]??null),R=!1;for(let $=0;$<T;$++){if(z[$]!==null)continue;let P=I.points[$],O=I.points[($+1)%T],H=[(P[0]+O[0])/2,(P[1]+O[1])/2];k.some(C=>Au(H,C.points)>=0)&&(z[$]=n,R=!0)}return R?{...I,wall_thickness:z}:I}),f=(h.walls??[]).filter(I=>w((I.a[0]+I.b[0])/2,(I.a[1]+I.b[1])/2)),M=new Set(f.map(I=>I.id)),x=[];for(let I of h.openings){if(I.wall){M.has(I.wall)&&x.push(I);continue}if(e.has(I.room_id)){x.push(I);continue}let T=h.rooms.find(R=>R.id===I.room_id),z=T?og(T,I.edge,I.offset):null;if(z)for(let R of _){let $=Au(z,R.points);if($<0)continue;let P=zu(z,R.points[$],R.points[($+1)%R.points.length]);x.push({...I,room_id:R.id,edge:$,offset:P.at,hinge:I.hinge==="left"?"right":"left",swing:I.swing==="in"?"out":"in"});break}}i.push({...h,rooms:v,outdoor:b,walls:f,openings:x,furniture:h.furniture.filter(I=>w(I.x,I.z)),placements:h.placements.filter(I=>w(I.x,I.z))})}let r=ig(o),s=o.settings.roof;if(s?.type==="custom"&&s.sections?.length){let h=new Set(i.map(w=>w.id)),_=s.sections,b=new Set(_.filter(w=>h.has(Wc(o,w)?.id??""))),m=_.filter(w=>b.has(w.dormer&&Gr(_,w)||w));return m.length===_.length?{...o,floors:i}:{...o,floors:i,settings:{...o.settings,roof:m.length?{...s,sections:m}:{...s,type:"none"}}}}if(!(!s||s.type==="none"||r===null||i.some(h=>h.id===r)))return{...o,floors:i,settings:{...o.settings,roof:{...s,type:"none"}}};let c=s&&(s.type==="flat"||s.type==="gable")&&r!==null?(o.floors.find(h=>h.id===r)?.rooms??[]).filter(h=>h.points.length>=3):[];if(!c.length)return{...o,floors:i};let d=c.flatMap(h=>h.points.map(_=>_[0])),u=c.flatMap(h=>h.points.map(_=>_[1])),p=[Math.min(...d),Math.min(...u),Math.max(...d),Math.max(...u)];return{...o,floors:i,settings:{...o.settings,roof:{...s,frame:p}}}}function ig(o){return o.floors.filter(e=>e.rooms.some(n=>n.points.length>=3)).sort((e,n)=>n.elevation-e.elevation)[0]?.id??null}function rg(o,t){let e=o?.states[t.entity]?.state;if(e===void 0)return!1;let n=(t.state??"").trim(),i=n.startsWith("!");i&&(n=n.slice(1).trim());let r=n?n.split(",").map(l=>l.trim()).filter(Boolean):["on"],s=Number(e),a=r.some(l=>{let c=/^([<>]=?)\s*(-?\d+(?:[.,]\d+)?)$/.exec(l);if(c){if(!Number.isFinite(s)||e.trim()==="")return!1;let d=Number(c[2].replace(",","."));return c[1]==="<"?s<d:c[1]==="<="?s<=d:c[1]===">"?s>d:s>=d}return e.toLowerCase()===l.toLowerCase()});return i?!a:a}function Rs(o,t){return!t.show_if?.entity||rg(o,t.show_if)}function As(o,t){if(!t)return"";let e="";for(let n of t.floors)for(let i of n.furniture)i.show_if?.entity&&(e+=`${i.id}:${Rs(o,i)?1:0};`);return e}var Ge=o=>o?.settings?.winter??{},sg=o=>vl(o)>0;function Cu(o,t,e=new Date){let n=Ge(t);if(!G("fun_winter")||n.roof_lights===!1)return!1;if(n.roof_entity)return o.states[n.roof_entity]?.state==="on";let i=o.states["sun.sun"],r=i?i.state==="below_horizon":e.getHours()>=16||e.getHours()<7;return sg(e)&&r}var ag=new Set(["snowy","snowy-rainy"]),Fu="homeplan3d.winter_last_snow";function lg(o,t){let e=t?o.states[t]:void 0,n=e?.attributes.temperature;return typeof n!="number"?null:String(e.attributes.temperature_unit??"\xB0C").includes("F")?(n-32)*5/9:n}function Ou(o,t,e,n=Date.now(),i=cg()){if(!G("fun_winter")||Ge(t).snow===!1||!e)return 0;let r=o.states[e]?.state??"";if(ag.has(r)){try{i?.setItem(Fu,String(n))}catch{}return 1}let s=Number(i?.getItem(Fu)??0);if(!s||n-s>72*36e5)return 0;let a=lg(o,e);return a===null||a<=1?1:Math.max(0,1-(n-s)/(6*36e5))}function cg(){try{return typeof localStorage>"u"?null:localStorage}catch{return null}}function Hu(o,t){if(t<=0)return[];let e=[];for(let n of o.floors)for(let i of n.outdoor??[])i.type==="lawn"&&i.points.length>=3&&e.push({floorId:n.id,points:i.points,y:Ho(n,i)+wr[i.type]+.025,color:[.93,.96,1],opacity:.78*t,...i.slope?{follow:{areaId:i.id,lift:.025}}:{}});return e}function Nu(o,t=new Date){if(!G("fun_winter")||Ge(o).firework===!1)return!1;if(typeof location<"u"&&new URLSearchParams(location.search).has("fp3d_firework"))return!0;let e=t.getMonth(),n=t.getDate(),i=t.getHours()*60+t.getMinutes();return e===11&&n===31&&i>=1439||e===0&&n===1&&i<10}var Ti=new Set(["on","home","true","present","occupied","detected","parked","yes","1"]);function Pi(o){return o&&o!=="none"?o:null}function Pn(o,t){if(t.type!=="parking")return null;let e=Pi(t.entity);if(e){let r=o.states[e];if(!r||!Ti.has(r.state.toLowerCase()))return null}let n=t.vehicle??null,i=Pi(t.type_entity);if(i&&t.types?.length){let r=(o.states[i]?.state??"").trim().toLowerCase();if(r){let s=l=>l.trim().toLowerCase(),a=t.types.find(l=>s(l.state)===r)??t.types.find(l=>s(l.state)&&r.includes(s(l.state)));a&&(n=a.vehicle)}}return n&&vt(n)?n:null}function zs(o,t){let e=new Map;for(let n of t.floors)for(let i of n.furniture){let r=Pn(o,i);r&&e.set(i.id,r)}return e}function Du(o){return o.flatMap(t=>t.furniture.filter(e=>e.type==="parking").flatMap(e=>[Pi(e.entity),Pi(e.type_entity)])).filter(t=>!!t)}function Lu(o,t){let e=vt(t);if(!e)return null;let n=o.scale??1;return{id:`${o.id}:vehicle`,type:t,x:o.x,z:o.z,rotation:o.rotation,w:e.size[0]*n,d:e.size[1]*n,h:e.size[2]*n,variant:null,entity:null,power:null}}var po=1800*1e3,dg=new Set(["motion","occupancy","presence"]);function Vu(o,t){return t.startsWith("binary_sensor.")&&dg.has(String(o.states[t]?.attributes.device_class))}function ho(o,t){let e=[],n=new Set,i=(r,s,a,l)=>{n.has(r)||(n.add(r),e.push({entity:r,floorId:s,x:a,z:l}))};for(let r of t.floors)for(let s of r.placements)if(Vu(o,s.entity_id))i(s.entity_id,r.id,s.x,s.z);else if(L(s.entity_id)==="camera")for(let a of Ut(o,s.entity_id))i(a,r.id,s.x,s.z);for(let r of t.floors)for(let s of r.rooms){if(!s.area_id||s.points.length<3)continue;let[a,l]=Rt(s.points);for(let c of wt(o,s.area_id))Vu(o,c)&&i(c,r.id,a,l)}return e}function Wu(o,t,e,n=po){let i=e-n,r=[];for(let[s,a]of Object.entries(o)){let l="";for(let c of a){let d=(c.lc??c.lu)*1e3;c.s==="on"&&l!=="on"&&d>=i&&d<=e&&r.push({entity:s,time:d}),l=c.s}}for(let s of t){let a=s.lastChanged??NaN;s.state!=="on"||!(a>=i&&a<=e)||r.some(l=>l.entity===s.entity&&Math.abs(l.time-a)<2e3)||r.push({entity:s.entity,time:a})}return r.sort((s,a)=>s.time-a.time)}function Bu(o,t,e,n=po){let i=new Map(o.map(s=>[s.entity,s])),r=[];for(let s of t){let a=i.get(s.entity);if(!a)continue;let l=r[r.length-1];l&&l.entity===s.entity&&s.time-l.time<6e4||r.push({...a,time:s.time,age:Math.min(1,Math.max(0,(e-s.time)/n))})}return r.slice(-40)}function Ei(o,t){return new Date(t).toLocaleTimeString(o.language,{hour:"2-digit",minute:"2-digit",...zn(o)})}var Uu='<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M13.5 5.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4M9.8 8.9 7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6z"/></svg>';var Ri=o=>o.toLocaleLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");function Ai(o,t){let e=[],n=De(o,t.floors),i=t.floors.length>1;for(let r of t.floors){let s=(d,u)=>r.rooms.find(p=>p.points.length>=3&&W([d,u],p.points))??null,a=(d,u)=>[s(d,u)?.name,i?r.name:null].filter(Boolean).join(" \xB7 ");for(let d of r.rooms){if(d.points.length<3)continue;let[u,p]=Rt(d.points);e.push({kind:"room",name:d.name,where:i?r.name:"",floorId:r.id,roomId:d.id,entity:null,icon:null,x:u,z:p,y:0})}let l=new Set,c=(d,u,p,h)=>{l.has(d)||!o.states[d]||(l.add(d),e.push({kind:"device",name:B(o,d),where:a(u,p),floorId:r.id,roomId:s(u,p)?.id??null,entity:d,icon:L(d),x:u,z:p,y:h}))};for(let d of r.placements)c(d.entity_id,d.x,d.z,d.y??dn(L(d.entity_id)??"sensor",r.height,d.mount));for(let d of r.furniture){let u=n.get(d.id),p=u?.entity??u?.power;p&&c(p,d.x,d.z,Math.min(r.height-.3,Math.max(.5,d.h)))}}return e}function ju(o,t,e=8){let n=Ri(t).split(/\s+/).filter(Boolean);if(!n.length)return[];let i=o.filter(a=>{let l=Ri(`${a.name} ${a.where} ${a.entity??""}`);return n.every(c=>l.includes(c))}),r=Ri(t.trim()),s=a=>(Ri(a.name).startsWith(r)?0:2)+(a.kind==="room"?0:1);return i.sort((a,l)=>s(a)-s(l)||a.name.localeCompare(l.name)).slice(0,e)}var Xt=new Map,Fs=new Map,qu=new Map;async function ug(o,t){return o.callWS({type:"homeplan3d/modules/code",pack_id:t})}async function pg(o,t){let e=await ug(o,t.id);if(e.api!==1)return null;let n=URL.createObjectURL(new Blob([e.code],{type:"text/javascript"}));try{let r=(await import(n)).default;if(!r||r.api!==1||typeof r.id!="string")return null;let s=qu.get(t.id);s&&URL.revokeObjectURL(s),qu.set(t.id,n);let a={id:t.id,release:e.release,module:r};return Xt.set(t.id,a),a}catch(i){throw URL.revokeObjectURL(n),i}}async function Cs(o,t){let e=new Map(t.filter(n=>n.module&&n.module.api===1&&n.module.approved===!0).map(n=>[n.id,n]));for(let n of[...Xt.keys()])e.has(n)||Xt.delete(n);await Promise.all([...e.values()].map(n=>{let i=Xt.get(n.id);if(i&&i.release===(n.release??1))return Promise.resolve(i);let r=Fs.get(n.id);return r||(r=pg(o,n).catch(s=>(console.warn(`HomePlan 3D: module ${n.id} did not load`,s),null)).finally(()=>Fs.delete(n.id)),Fs.set(n.id,r)),r}))}async function Ku(o,t){for(let e of Xt.values())if(e.module.voice)try{let n=await e.module.voice(o,t);if(n)return n}catch(n){console.warn(`HomePlan 3D: module ${e.id} failed on "${o}"`,n)}return null}function Gu(o){return Qe(t=>t.scene?.(o))}function Yu(o){return[...Xt.values()].flatMap(t=>t.module.popups?.(o)??[])}function Qu(o){return Qe(t=>t.cards?.(o))}function Ju(o){return Qe(t=>t.alerts?.(o))}function Xu(o){return Qe(t=>t.watched?.(o))}function Os(o,t){return Qe(e=>e.roomSheets?.(o,t))}function Hs(o){return Qe(t=>t.menuSheets?.(o))}function Ns(){return[...Xt.values()].filter(o=>!!o.module.settings).map(o=>o.id)}function Zu(o,t){let e=Xt.get(o);if(!e?.module.settings)return[];try{return e.module.settings(t)??[]}catch(n){return console.warn(`HomePlan 3D: module ${e.id} failed`,n),[]}}function tp(o){return Qe(t=>t.pools?.(o))}function Ye(){return Xt.size>0}function Qe(o){let t=[];for(let e of Xt.values())try{t.push(...o(e.module)??[])}catch(n){console.warn(`HomePlan 3D: module ${e.id} failed`,n)}return t}function np(o,t,e){let n=o.filter(l=>Number.isFinite(l));if(n.length<2)return"";let i=Math.min(...n),s=Math.max(...n)-i||1,a=l=>Math.round(l*10)/10;return n.map((l,c)=>`${a(c/(n.length-1)*t)},${a(e-1-(l-i)/s*(e-2))}`).join(" ")}function ep(o,t){if(!o.length)return[.25,.7,1];if(o.length===1)return o[0];let e=Math.min(1,Math.max(0,t))*(o.length-1),n=Math.min(o.length-2,Math.floor(e)),i=e-n,[r,s]=[o[n],o[n+1]];return[r[0]+(s[0]-r[0])*i,r[1]+(s[1]-r[1])*i,r[2]+(s[2]-r[2])*i]}function op(o){let t=[];for(let e of o){let n=e.points;if(n.length<2)continue;let i=[],r=0;for(let l=1;l<n.length;l++){let c=Math.hypot(n[l][0]-n[l-1][0],n[l][1]-n[l-1][1],n[l][2]-n[l-1][2]);i.push(c),r+=c}if(r<.01)continue;let s=e.colors.length===n.length,a=0;for(let l=1;l<n.length;l++){let c=i[l-1];if(c<.005)continue;let d=s?ep([e.colors[l-1],e.colors[l]],.5):ep(e.colors,(a+c/2)/r);t.push({floorId:e.floorId,a:[...n[l-1]],b:[...n[l]],dist:a,power:Math.max(0,e.flow),color:d,...e.width?{width:Math.min(3,Math.max(.5,e.width))}:{},...e.look==="pipe"?{pipe:!0}:{},...e.views==="house"?{house:!0}:e.views==="floor"?{floor:!0}:{}}),a+=c}}return t}function ip(o){return o&&[...o].length<=4&&!/[<>&"'\\\sA-Za-z0-9]/.test(o)?o:null}function rp(o){return o&&o.length<2e3&&/^[MmLlHhVvCcSsQqTtAaZz0-9 .,-]+$/.test(o)?o:null}function zi(o,t){return(o??[]).filter(e=>!t||!e.minor)}var sp="https://www.openstreetmap.org/copyright";var hg=[[255,181,71],[255,236,210],[55,224,255],[91,124,255],[190,90,255],[255,95,210],[255,70,70],[120,255,150]],fg=[2200,2700,3200,4e3,5e3,6500],mg=["hs","rgb","rgbw","rgbww","xy"],gg=4,bg=16,_g=32,vg=128;function Ls(o){let t=o.attributes.supported_color_modes??[],e=t.some(n=>mg.includes(n));return{dim:t.some(n=>n!=="onoff"),color:e,temp:t.includes("color_temp")}}function Vs(o){return((o.attributes.supported_features??0)&gg)!==0&&typeof o.attributes.current_position=="number"}var Ds=class extends at{static properties={hass:{attribute:!1},entity:{attribute:!1},car:{attribute:!1},presets:{attribute:!1},confirmSwitch:{type:Boolean},doorLock:{type:Boolean},pro:{type:Boolean},slatInvert:{type:Boolean},low:{type:Boolean,reflect:!0},_tick:{state:!0}};tickTimer;connectedCallback(){super.connectedCallback(),this._tick=0,this.tickTimer=setInterval(()=>{L(this.entity)==="camera"&&!document.hidden&&this._tick++},3e3)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.tickTimer)}renderCamera(t){let e=t.attributes.entity_picture,n=e?e.startsWith("data:")?e:`${e}${e.includes("?")?"&":"?"}fp3d=${this._tick}`:null;return g`<button class="qm-camera" title=${this.t("camera_live")} @click=${()=>this.details()}>
        ${n?g`<img src=${n} alt=${B(this.hass,this.entity)} />`:g`<span class="qm-note">${_t(this.hass,t)}</span>`}
      </button>
      <button class="qm-details qm-look" @click=${()=>this.dispatchEvent(new CustomEvent("camera-look",{detail:{entity:this.entity},bubbles:!0,composed:!0}))}>
        ${this.pro?"":"\u{1F512} "}${this.t("through_camera")}
      </button>`}t(t,e){return E(this.hass,t,e)}ask(){return!this.confirmSwitch||confirm(this.t("confirm_switch",{name:B(this.hass,this.entity)}))}call(t,e,n={}){this.hass.callService(t,e,{entity_id:this.entity,...n})}cover(t,e){let n=Tr(t,e);this.call("cover",n.service,n.data)}close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}details(){Mt(this,this.entity),this.close()}ring(t){let e=t.length;return t.map((n,i)=>{let r=i/e*Math.PI*2-Math.PI/2;return g`<div class="qm-at" style="left:${50+Math.cos(r)*39}%;top:${50+Math.sin(r)*39}%">${n}</div>`})}renderLight(t){let e=Ls(t),n=t.state==="on",i=n&&typeof t.attributes.brightness=="number"?Math.round(t.attributes.brightness/2.55):n?100:0,r=e.color?hg.map(s=>g`<button class="qm-swatch" style="background:rgb(${s.join(",")})" aria-label=${`RGB ${s.join(", ")}`} @click=${()=>this.call("light","turn_on",{rgb_color:s})}></button>`):e.temp?fg.map(s=>g`<button class="qm-swatch" style="background:${wg(s)}" aria-label=${`${s} K`} @click=${()=>this.call("light","turn_on",{color_temp_kelvin:s})}></button>`):[];return g`<div class="qm-ring ${r.length?"":"qm-ring-small"}">
        ${this.ring(r)}
        <button class="qm-power ${n?"qm-on":""}" aria-pressed=${n} @click=${()=>this.ask()&&this.call("light","toggle")}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3v8M6.3 6.8a8 8 0 1 0 11.4 0" /></svg>
          <b>${n?`${i} %`:this.t("qm_off")}</b>
        </button>
      </div>
      ${e.dim?g`<input
            class="qm-slider"
            type="range"
            min="1"
            max="100"
            .value=${String(Math.max(1,i))}
            aria-label=${this.t("brightness")}
            @change=${s=>this.call("light","turn_on",{brightness_pct:Number(s.target.value)})}
          />`:y}`}renderCover(t){let e=typeof t.attributes.current_position=="number"?t.attributes.current_position:null,n=t.state==="opening"||t.state==="closing",i=Vs(t),r=(d,u,p,h=!1)=>g`<button class="qm-swatch qm-slot ${h?"qm-slot-on":""}" aria-label=${u} @click=${p}>${d}</button>`,s=d=>e!==null&&Math.abs(e-d)<3,a=[r("\u25B2",this.t("cover_open"),()=>this.ask()&&this.cover(t,"open"),s(100)),...i?[75,50].map(d=>r(`${d}`,`${d} %`,()=>this.ask()&&this.call("cover","set_cover_position",{position:d}),s(d))):[],r("\u25BC",this.t("cover_close"),()=>this.ask()&&this.cover(t,"close"),s(0)),...i?[25].map(d=>r(`${d}`,`${d} %`,()=>this.ask()&&this.call("cover","set_cover_position",{position:d}),s(d))):[],r("\u25A0",this.t("cover_stop"),()=>this.cover(t,"stop"),n)],l=un(t,this.slatInvert),c=e!==null?100-e:l!==null?100-l:t.state==="closed"?100:0;return g`<div class="qm-ring">
        ${this.ring(a)}
        <button
          class="qm-power qm-blind ${c<100?"qm-on":""}"
          style="--closed:${c}%"
          aria-label=${n?this.t("cover_stop"):c>50?this.t("cover_open"):this.t("cover_close")}
          @click=${()=>n?this.cover(t,"stop"):this.ask()&&this.cover(t,c>50?"open":"close")}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4h16M5 4v15M19 4v15M7 8h10M7 12h10M7 16h10" /></svg>
          <b>${e!==null?`${e} %`:_t(this.hass,t)}</b>
        </button>
      </div>
      ${i?g`<input
            class="qm-slider"
            type="range"
            min="0"
            max="100"
            .value=${String(e??0)}
            aria-label=${this.t("position")}
            @change=${d=>this.call("cover","set_cover_position",{position:Number(d.target.value)})}
          />`:y}
      ${this.renderTilt(t)}`}renderTilt(t){let e=(t.attributes.supported_features??0)|0,n=un(t,this.slatInvert),i=r=>this.slatInvert?100-r:r;return e&vg&&n!==null?g`<label class="qm-tilt"
        ><span>${this.t("cover_tilt")} · ${n} %</span>
        <input
          class="qm-slider"
          type="range"
          min="0"
          max="100"
          .value=${String(n)}
          aria-label=${this.t("cover_tilt")}
          @change=${r=>this.call("cover","set_cover_tilt_position",{tilt_position:i(Number(r.target.value))})}
      /></label>`:Lo(t)?g`<div class="qm-tilt-buttons">
        ${e&bg?g`<button class="qm-swatch qm-slot" @click=${()=>this.call("cover","open_cover_tilt")}>${this.t("cover_tilt_open")}</button>`:y}
        ${e&_g?g`<button class="qm-swatch qm-slot" @click=${()=>this.call("cover","close_cover_tilt")}>${this.t("cover_tilt_close")}</button>`:y}
      </div>`:y}renderCar(t){let e=t.entities,n=(u,p,h,_={})=>{this.hass.callService(u,p,{entity_id:h,..._})},i=e.lock,r=!!i&&i.startsWith("lock."),s=u=>/^(switch|input_boolean|fan|light)\./.test(u),a=e.climate,l=!!a&&a.startsWith("climate."),c=e.charging&&s(e.charging)?e.charging:null,d=[t.soc!==null?`${Math.round(t.soc)} %`:null,t.range!==null?`${Math.round(t.range)} ${t.rangeUnit}`:null,t.charging?`\u26A1 ${this.t("car_charging_short")}`:t.plugged?"\u{1F50C}":null].filter(Boolean).join(" \xB7 ");return g`<p class="qm-car-line">${d||_t(this.hass,this.hass.states[this.entity])}</p>
      <div class="qm-car">
        ${r||i&&s(i)?g`<button
              class="qm-swatch qm-slot ${t.locked?"qm-slot-on":""}"
              @click=${()=>t.locked?confirm(this.t("car_unlock_confirm"))&&(r?n("lock","unlock",i):n("homeassistant","turn_off",i)):r?n("lock","lock",i):n("homeassistant","turn_on",i)}
            >
              ${t.locked?`\u{1F513} ${this.t("car_unlock_btn")}`:`\u{1F512} ${this.t("car_lock_btn")}`}
            </button>`:y}
        ${a?g`<button class="qm-swatch qm-slot ${t.climateOn?"qm-slot-on":""}" @click=${()=>n(l?"climate":"homeassistant",t.climateOn?"turn_off":"turn_on",a)}>
              ${t.climateOn?`\u2744 ${this.t("car_climate_off")}`:`\u{1F321} ${this.t("car_climate_on")}`}
            </button>`:y}
        ${c?g`<button class="qm-swatch qm-slot ${t.charging?"qm-slot-on":""}" @click=${()=>n("homeassistant",t.charging?"turn_off":"turn_on",c)}>
              ${t.charging?`\u23F9 ${this.t("car_charge_stop")}`:`\u26A1 ${this.t("car_charge_start")}`}
            </button>`:y}
        ${!r&&!a&&!c?g`<p class="qm-note">${this.t("car_no_controls")}</p>`:y}
      </div>`}renderMedia(t){let e=t.attributes,n=t.state==="playing",i=t.state==="off"||t.state==="standby",r=typeof e.volume_level=="number"?Math.round(e.volume_level*100):null,s=[e.media_title,e.media_artist].filter(l=>typeof l=="string"&&l).join(" \xB7 "),a=typeof e.entity_picture=="string"?e.entity_picture:null;return g`<div class="qm-media">
        <button class="qm-swatch qm-slot" aria-label=${this.t("previous")} ?disabled=${i} @click=${()=>this.call("media_player","media_previous_track")}>⏮</button>
        <button class="qm-power qm-media-main ${n?"qm-on":""}" aria-label=${this.t("play_pause")} style=${a?`background-image:url(${a})`:""} @click=${()=>this.call("media_player",i?"turn_on":n?"media_pause":"media_play")}>
          <span>${i?"\u23FB":n?"\u23F8":"\u25B6"}</span>
        </button>
        <button class="qm-swatch qm-slot" aria-label=${this.t("next")} ?disabled=${i} @click=${()=>this.call("media_player","media_next_track")}>⏭</button>
      </div>
      ${s?g`<p class="qm-media-title">${s}</p>`:y}
      ${r!==null?g`<input
            class="qm-slider"
            type="range"
            min="0"
            max="100"
            .value=${String(r)}
            aria-label=${this.t("volume")}
            @change=${l=>this.call("media_player","volume_set",{volume_level:Number(l.target.value)/100})}
          />`:y}
      ${this.renderPlay(t)}`}renderPlay(t){if(!G("sound"))return y;let e=Array.isArray(t.attributes.source_list)?t.attributes.source_list.slice(0,10):[],n=this.presets??[];if(!e.length&&!n.length)return y;let i=t.attributes.source;return g`<p class="qm-play-head">${this.t("media_play_head")}</p>
      <div class="qm-play">
        ${n.map(r=>g`<button class="qm-chip" @click=${()=>this.call("media_player","play_media",{media_content_type:r.type,media_content_id:r.content})}>
            ▶ ${r.label}
          </button>`)}
        ${e.map(r=>g`<button class="qm-chip ${r===i?"qm-chip-on":""}" @click=${()=>this.call("media_player","select_source",{source:r})}>${r}</button>`)}
      </div>`}renderDoorLock(t){let e=t.state==="locked"||t.state==="locking"||t.state==="jammed",n=B(this.hass,this.entity),i=()=>{confirm(this.t(e?"door_unlock_confirm":"door_lock_confirm",{name:n}))&&(this.call("lock",e?"unlock":"lock"),this.close())};return g`<p class="qm-car-line">${_t(this.hass,t)}</p>
      <div class="qm-car">
        <button class="qm-swatch qm-slot ${e?"qm-slot-on":""}" @click=${i}>${e?`\u{1F513} ${this.t("door_unlock_btn")}`:`\u{1F512} ${this.t("door_lock_btn")}`}</button>
      </div>`}renderToggle(t){let e=t.state==="on"||t.state==="unlocked"||t.state==="playing",n=t.entity_id.split(".")[0];return g`<div class="qm-ring qm-ring-small">
      <button
        class="qm-power ${e?"qm-on":""}"
        aria-pressed=${e}
        @click=${()=>this.ask()&&(n==="lock"?this.call("lock",e?"lock":"unlock"):this.call("homeassistant","toggle"))}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3v8M6.3 6.8a8 8 0 1 0 11.4 0" /></svg>
        <b>${_t(this.hass,t)}</b>
      </button>
    </div>`}render(){let t=this.hass?.states[this.entity];if(!t)return y;let e=L(this.entity),n=this.car?this.renderCar(this.car):Q(t)?g`<p class="qm-note">${_t(this.hass,t)}</p>`:this.doorLock&&e==="lock"?this.renderDoorLock(t):e==="light"?this.renderLight(t):e==="cover"?this.renderCover(t):e==="camera"?this.renderCamera(t):e==="media"&&G("sound")?this.renderMedia(t):this.renderToggle(t);return g`<div class="qm" role="dialog" aria-label=${B(this.hass,this.entity)}>
      <div class="qm-title">${B(this.hass,this.entity)}</div>
      ${n}
      <button class="qm-details" @click=${()=>this.details()}>${this.t("details")} …</button>
    </div>`}static styles=[Tt,ct`
    .qm-play-head {
      margin: 10px 0 4px;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      opacity: 0.7;
    }
    .qm-play {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      max-height: 110px;
      overflow-y: auto;
    }
    .qm-chip {
      border: 1px solid rgba(160, 240, 255, 0.35);
      border-radius: 999px;
      padding: 5px 10px;
      background: rgba(8, 16, 34, 0.55);
      color: inherit;
      font: inherit;
      font-size: 12.5px;
      cursor: pointer;
    }
    .qm-chip-on {
      border-color: var(--fp3d-accent, #37e0ff);
      color: var(--fp3d-accent, #37e0ff);
    }
      .qm-camera {
        display: block;
        width: 100%;
        padding: 0;
        margin: 6px 0 8px;
        border: 0;
        border-radius: 12px;
        overflow: hidden;
        background: #000;
        cursor: pointer;
      }
      .qm-camera img {
        display: block;
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
      }
      .qm:has(.qm-camera) {
        width: 300px;
      }
      .qm {
        width: 232px;
        padding: 12px 14px 10px;
        border-radius: 22px;
        background: var(--fp3d-chrome);
        box-shadow: var(--fp3d-shadow), 0 0 0 1px var(--fp3d-line);
        backdrop-filter: blur(10px);
      }
      :host([low]) .qm {
        backdrop-filter: none;
        box-shadow: 0 0 0 1px var(--fp3d-line);
        animation: none;
        color: var(--fp3d-text);
        text-align: center;
        animation: qm-in 140ms ease-out;
      }
      @keyframes qm-in {
        from {
          opacity: 0;
          transform: scale(0.85);
        }
      }
      .qm-title {
        font: 700 14.5px var(--fp3d-title-font);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .qm-ring {
        position: relative;
        width: 196px;
        height: 196px;
        margin: 6px auto 4px;
        display: grid;
        place-items: center;
      }
      .qm-ring-small {
        height: 110px;
      }
      .qm-at {
        position: absolute;
        transform: translate(-50%, -50%);
      }
      .qm-swatch {
        width: 34px;
        height: 34px;
        border: 2px solid rgba(255, 255, 255, 0.25);
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.35);
      }
      .qm-swatch:active {
        transform: scale(0.9);
      }
      .qm-power {
        display: grid;
        place-items: center;
        gap: 2px;
        width: 88px;
        height: 88px;
        border: 0;
        border-radius: 50%;
        background: var(--fp3d-bg2, #16223a);
        color: var(--fp3d-muted);
        box-shadow: inset 0 0 0 2px var(--fp3d-line);
        cursor: pointer;
        font: inherit;
      }
      .qm-power b {
        font: 700 15px var(--fp3d-title-font);
        color: var(--fp3d-text);
      }
      .qm-power small {
        font-size: 11px;
      }
      .qm-on {
        color: #1a1204;
        background: var(--fp3d-warm);
        box-shadow: 0 0 24px rgba(255, 181, 71, 0.55);
      }
      .qm-on b {
        color: #1a1204;
      }
      .qm-slot {
        display: grid;
        place-items: center;
        border-color: var(--fp3d-line);
        background: var(--fp3d-bg2, #16223a);
        color: var(--fp3d-text);
        font: 700 12px var(--fp3d-title-font);
      }
      .qm-slot-on {
        background: var(--fp3d-accent);
        color: var(--fp3d-accent-text);
        border-color: transparent;
        box-shadow: 0 0 14px rgba(55, 224, 255, 0.45);
      }
      /* the blind: its closed part covers the circle from the top, the open part glows like daylight */
      .qm-blind.qm-on {
        background: linear-gradient(to bottom, #1e2c4c var(--closed), #9fd9ff var(--closed));
        box-shadow: 0 0 22px rgba(120, 200, 255, 0.4);
        color: #06101f;
      }
      .qm-blind b {
        text-shadow: 0 0 6px rgba(0, 0, 0, 0.6);
        color: #fff;
      }
      .qm-round {
        width: 46px;
        height: 46px;
        border: 0;
        border-radius: 50%;
        background: var(--fp3d-accent);
        color: var(--fp3d-accent-text);
        font-size: 17px;
        cursor: pointer;
      }
      .qm-car-line {
        margin: 2px 0 8px;
        text-align: center;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
      }
      .qm-car {
        display: grid;
        gap: 6px;
        justify-items: stretch;
      }
      .qm-car .qm-slot {
        width: auto;
        padding: 6px 10px;
        font-size: 13px;
      }
      .qm-media {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        margin: 6px 0;
      }
      .qm-media-main {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
        position: relative;
      }
      .qm-media-main span {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        font-size: 22px;
        text-shadow: 0 0 6px rgba(0, 0, 0, 0.8);
        color: #fff;
      }
      .qm-media .qm-slot {
        width: auto;
        padding: 0 10px;
      }
      .qm-media-title {
        margin: 2px 0 4px;
        text-align: center;
        font-size: 12px;
        opacity: 0.85;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .qm-tilt {
        display: grid;
        gap: 4px;
        margin-top: 8px;
        font-size: 12px;
        color: var(--fp3d-muted);
      }
      .qm-tilt-buttons {
        display: flex;
        gap: 6px;
        justify-content: center;
        margin-top: 8px;
      }
      .qm-tilt-buttons .qm-slot {
        width: auto;
        padding: 0 10px;
        font-size: 12px;
      }
      .qm-slider {
        width: 100%;
        margin: 4px 0 6px;
        accent-color: var(--fp3d-accent);
      }
      .qm-look {
        display: block;
        width: 100%;
        margin-top: -4px;
      }
      .qm-details {
        border: 0;
        background: none;
        color: var(--fp3d-accent);
        font: inherit;
        font-size: 13px;
        padding: 6px;
        cursor: pointer;
      }
      .qm-note {
        color: var(--fp3d-muted);
      }
    `]};function wg(o){let t=Math.min(1,Math.max(0,(o-2200)/4300)),e=(n,i)=>Math.round(n+(i-n)*t);return`rgb(${e(255,200)},${e(170,225)},${e(80,255)})`}customElements.get("fp3d-quick-menu")||customElements.define("fp3d-quick-menu",Ds);var yg=new URL(import.meta.url),xg=new URL("./homeplan3d-3d.js?v=27baca22e851",yg).href,ap;function fo(){return ap??=import(xg),ap}var Ws;function Bs(){let o=new URL("./homeplan3d-fun.js?v=8d4c44bbc5ea",new URL(import.meta.url)).href;return Ws??=import(o).catch(t=>{throw Ws=void 0,t}),Ws}function lp(o,t){let e=o.points,n=e[t],i=e[(t+1)%e.length],r=Math.hypot(i[0]-n[0],i[1]-n[1])||1,s=[(i[0]-n[0])/r,(i[1]-n[1])/r],a=[-s[1],s[0]],l=[(n[0]+i[0])/2,(n[1]+i[1])/2];W([l[0]+a[0]*.02,l[1]+a[1]*.02],e)||(a=[-a[0],-a[1]]);let c=[a[1],-a[0]];return{a:n,b:i,u:s,n:a,length:r,rightward:s[0]*c[0]+s[1]*c[1]>0}}function Fi(o,t){let e=t[0]-o.a[0],n=t[1]-o.a[1];return{s:e*o.u[0]+n*o.u[1],d:e*o.n[0]+n*o.n[1]}}function Us(o,t,e){return[o.a[0]+o.u[0]*t+o.n[0]*e,o.a[1]+o.u[1]*t+o.n[1]*e]}var kg=.45;function cp(o,t){let e=[];for(let n of t.openings){if(n.wall)continue;let i=t.rooms.find(a=>a.id===n.room_id);if(!i||n.edge>=i.points.length)continue;let{s:r,d:s}=Fi(o,Ko(i,n.edge,n.offset));Math.abs(s)>.4||r<-.05||r>o.length+.05||e.push($g(n,r))}return e}function $g(o,t){return{kind:"opening",id:o.id,s0:t-o.width/2,s1:t+o.width/2,y0:o.sill,y1:o.sill+o.height,d:0}}function dp(o,t,e,n=kg){let i=[];for(let r of t.furniture){if(r.type==="stairwell"||r.type==="parking")continue;let s=W([r.x,r.z],e.points),a=Ne(r).map(h=>Fi(o,h)),l=Math.min(...a.map(h=>h.d)),c=Math.min(...a.map(h=>h.s)),d=Math.max(...a.map(h=>h.s)),u=Fi(o,[r.x,r.z]);if(!s&&u.d<=0||u.d<=0||l>n||l<-.3||d<.02||c>o.length-.02)continue;let p=mt(t,r);i.push({kind:"furniture",id:r.id,s0:c,s1:d,y0:p,y1:p+r.h,d:l})}return i}var up=.3;function mo(o,t){let e=o.from?t(o.from):null,n=o.to?t(o.to):null,i=o.height??up,r=[];if(o.heights)e&&r.push([e.x,e.y,e.z]),o.points.forEach(([s,a],l)=>r.push([s,o.heights?.[l]??i,a])),n&&r.push([n.x,n.y,n.z]);else{if(!e||!n)return[];r.push([e.x,e.y,e.z],[e.x,i,e.z]);for(let[s,a]of o.points)r.push([s,i,a]);r.push([n.x,i,n.z],[n.x,n.y,n.z])}return r.filter((s,a)=>a===0||js(s,r[a-1])>.001)}function js(o,t){return Math.hypot(t[0]-o[0],t[1]-o[1],t[2]-o[2])}function Ci(o){let t=0;for(let e=1;e<o.length;e++)t+=js(o[e-1],o[e]);return t}function Oi(o,t){if(o.length<2)return null;let e=Math.max(0,t);for(let n=1;n<o.length;n++){let[i,r]=[o[n-1],o[n]],s=js(i,r);if(!(s<1e-6)){if(e<=s||n===o.length-1){let a=Math.min(1,e/s),l=[(r[0]-i[0])/s,(r[1]-i[1])/s,(r[2]-i[2])/s];return{p:[i[0]+(r[0]-i[0])*a,i[1]+(r[1]-i[1])*a,i[2]+(r[2]-i[2])*a],dir:l,seg:n-1}}e-=s}}return null}function Je(o){let[t="",e="",n]=o.split(":");return{kind:t,id:e,port:n||null}}function Sg(o,t){let{w:e,d:n,h:i}=o;if(o.type==="pool_pump")return t==="suction"?[e*.5,i*.55,0]:t==="pressure"?[e*.05,i*.9,0]:null;if(o.type==="pool_filter"){let r=Math.min(e,n)/2;if(o.variant==="side6"){let l=r+.08;return t==="pump"?[l,i*.6,0]:t==="return"?[l+.06,i*.48,0]:t==="waste"?[l,i*.36,0]:null}let s=i*.89,a=r*.45+.04;return t==="pump"?[-a,s,0]:t==="return"?[a,s,0]:t==="waste"?[0,s,-a]:null}if(o.type==="pool_heat_pump"){let r=o.variant==="left"||o.variant==="back"?o.variant:"right";if(t!=="in"&&t!=="out")return null;let s=t==="in"?i*.25:i*.45;return r==="back"?[t==="in"?-e*.15:e*.15,s,-n/2-.04]:[(r==="left"?-1:1)*(e/2+.04),s,-n*.2]}return null}function pp(o,t){let e=Sg(o,t);if(!e)return null;let n=o.rotation*Math.PI/180,[i,r]=[Math.cos(n),Math.sin(n)];return{x:o.x+e[0]*i-e[2]*r,y:e[1],z:o.z+e[0]*r+e[2]*i}}function go(o,t){if(t==="outside"){if(o.kind==="floor")return{x:o.x,y:o.y-.3,z:o.z};if(o.kind==="wall"){let e=(o.depth??.3)+.05;return{x:o.x-(o.nx??0)*e,y:o.y,z:o.z-(o.nz??0)*e}}}return{x:o.x,y:o.y,z:o.z}}function fp(o){return o.flatMap(t=>(t.outdoor??[]).filter(e=>e.type==="pool"&&e.pool&&e.points.length>=3).map(e=>({floor:t,area:e})))}var qs=[.25,.7,1],Mg=900;function mp(o,t,e,n=i=>i){let i=[];for(let r of o){let s=n(mo(r,e),r);if(s.length<2)continue;let a=t.get(r.id),l=a?.color??qs,c=0;for(let d=1;d<s.length;d++){let[u,p]=[s[d-1],s[d]],h=Math.hypot(p[0]-u[0],p[1]-u[1],p[2]-u[2]);h<.01||(i.push({floorId:r.floor_id,a:u,b:p,dist:c,power:a?.active?Mg:0,color:l}),c+=h)}}return i}function Hi(o,t,e){let n=e.pool??{},i=ln(t,e);return r=>{let{kind:s,id:a,port:l}=Je(r);if(s==="port"){let c=n.ports?.find(u=>u.id===a);if(!c)return null;let d=c.kind==="skimmer"?i-(c.depth??0):c.kind==="drain"?Wn(t,e)+.03:c.kind==="inlet"?i-(c.depth??.3):.02;return{x:c.x,z:c.z,y:d}}if(s==="joint"){let c=n.joints?.find(d=>d.id===a);return c?go(c,l):null}if(s!=="dev")return null;for(let c of o.floors){let d=c.furniture.find(_=>_.id===a);if(!d||!Dl.includes(d.type))continue;let u=l?pp(d,l):null,p=c.elevation-t.elevation;if(u)return{...u,y:u.y+mt(c,d)+p};let h=d.type==="pool_filter"?d.h*.88:d.type==="pool_dosing"?.95:d.type==="pool_valve"?Ll:d.type==="pool_pump"?.2:.3;return{x:d.x,z:d.z,y:h+mt(c,d)+p}}return null}}function Ks(o,t,e,n){let i=d=>{let{kind:u,id:p}=Je(d);return u==="port"?e.pool?.ports?.find(h=>h.id===p)?.kind:void 0},r=d=>i(d)==="drain",s=d=>i(d)==="inlet"||i(d)==="skimmer",a=d=>{if(d.length<2)return d;let u=d[0],p=Gs(e,[u[0],u[2]]);if(!p)return d;let h=[u[0]+p[0]*.35,u[1],u[2]+p[1]*.35],_=1;for(;_<d.length&&Math.hypot(d[_][0]-u[0],d[_][2]-u[2])<.01;)_++;let b=d.slice(_).map(w=>[...w]);for(let w=0;w<b.length-1;w++){let k=(b[w][0]-u[0])*p[0]+(b[w][2]-u[2])*p[1];if(k>=.349999)break;b[w][0]+=p[0]*(.35-k),b[w][2]+=p[1]*(.35-k)}let m=b[0]??d[d.length-1];return[u,h,[h[0],m[1],h[2]],...b]},l=d=>{if(d.length<2)return d;let u=d[0];if(!W([u[0],u[2]],e.points))return d;let p=Wn(n,e)-.15,h=d.findIndex((w,k)=>k>0&&Math.hypot(w[0]-u[0],w[2]-u[2])>.01);if(h<0)return d;let _=d[h],b=[_[0],_[2]];for(let w=0;w<e.points.length;w++){let k=e.points[w],v=e.points[(w+1)%e.points.length],f=Ig([u[0],u[2]],[_[0],_[2]],k,v);f&&(b=f)}let m=Math.hypot(b[0]-u[0],b[1]-u[2])>1e-6?[b[0]+(b[0]-u[0])*.02,b[1]+(b[1]-u[2])*.02]:b;return[u,[u[0],p,u[2]],[m[0],p,m[1]],[m[0],_[1],m[1]],...d.slice(h)]},c=o;return t.from&&r(t.from)&&(c=l(c)),t.to&&r(t.to)&&(c=l([...c].reverse()).reverse()),t.from&&s(t.from)&&(c=a(c)),t.to&&s(t.to)&&(c=a([...c].reverse()).reverse()),c}function Gs(o,t){let e=o.points;if(e.length<3)return null;let n=0;for(let r=0;r<e.length;r++){let s=e[r],a=e[(r+1)%e.length];n+=s[0]*a[1]-a[0]*s[1]}let i=null;for(let r=0;r<e.length;r++){let s=e[r],a=e[(r+1)%e.length],l=a[0]-s[0],c=a[1]-s[1],d=Math.hypot(l,c);if(d<1e-6)continue;let u=Math.max(0,Math.min(1,((t[0]-s[0])*l+(t[1]-s[1])*c)/(d*d))),p=Math.hypot(s[0]+l*u-t[0],s[1]+c*u-t[1]),h=n>0?[c/d+0,-l/d+0]:[-c/d+0,l/d+0];(!i||p<i.d)&&(i={d:p,n:h})}return i?i.n:null}function Ig(o,t,e,n){let i=[t[0]-o[0],t[1]-o[1]],r=[n[0]-e[0],n[1]-e[1]],s=i[0]*r[1]-i[1]*r[0];if(Math.abs(s)<1e-9)return null;let a=((e[0]-o[0])*r[1]-(e[1]-o[1])*r[0])/s,l=((e[0]-o[0])*i[1]-(e[1]-o[1])*i[0])/s;return a>=0&&a<=1&&l>=0&&l<=1?[o[0]+i[0]*a,o[1]+i[1]*a]:null}var St=o=>Math.round(o*1e3)/1e3;var gp=-.3;function bp(o,t,e,n,i){let r=[],s=[],a=m=>t(m),l=[],c=o.from,d=[];for(let m of o.vias){if(m.kind!=="hole"){d.push(m.kind);continue}let w=e.find(x=>x.id===m.joint),k=a(c);if(!w||!k)continue;let v=a(`joint:${w.id}:inside`),f=a(`joint:${w.id}:outside`),M=m.dir?m.dir==="out":Math.hypot(k.x-v.x,k.z-v.z)<=Math.hypot(k.x-f.x,k.z-f.z);l.push({a:c,b:`joint:${w.id}:${M?"inside":"outside"}`,fits:d}),d=[],c=`joint:${w.id}:${M?"outside":"inside"}`}let u=o.to;if(u.length>1){let m=a(c),w=u.map(a).filter(k=>!!k);if(m&&w.length===u.length){let k=w.reduce((T,z)=>T+z.x,0)/w.length,v=w.reduce((T,z)=>T+z.z,0)/w.length,f=Math.hypot(m.x-k,m.z-v)||1,M=Math.min(1,f/2)/f,x=m.y<0||w.some(T=>T.y<0),I={id:i("joint"),kind:"tee",x:St(k+(m.x-k)*M),z:St(v+(m.z-v)*M),y:x?gp:St(m.y)};s.push(I),l.push({a:c,b:`joint:${I.id}:in`,fits:d}),d=[],u.forEach((T,z)=>l.push({a:`joint:${I.id}:out${z+1}`,b:T,fits:[]})),u=[]}}u.length&&l.push({a:c,b:u[0],fits:d});let p=m=>{let{kind:w,id:k,port:v}=Je(m),f=w==="joint"?s.find(M=>M.id===k):void 0;return f?go(f,v):a(m)},h=m=>n(m)==="source",_=m=>n(m)==="sink",b=o.to.some(h)&&!h(o.from)||_(o.from)&&!o.to.some(_);for(let m of l){let w=p(m.a),k=p(m.b);if(!w||!k)continue;let v=Pg(w,k,hp(m.a,e),hp(m.b,e)),f={id:i("pipe"),from:m.a,to:m.b,floor_id:o.floorId,points:v.map(x=>[x[0],x[2]]),heights:v.map(x=>x[1])},M=Ci(mo(f,p));f.fittings=m.fits.map((x,I)=>({id:i("fit"),kind:x,at:St(Math.min(M/2,.4+I*.25)),...x==="valve"?{open:!0}:{}})),b&&(f={...f,from:f.to,to:f.from,points:[...f.points].reverse(),heights:[...f.heights??[]].reverse(),fittings:f.fittings?.map(x=>({...x,at:St(Math.max(0,M-x.at))}))}),r.push(f)}return{pipes:r,joints:s}}function hp(o,t){let{kind:e,id:n,port:i}=Je(o),r=e==="joint"&&i==="outside"?t.find(s=>s.id===n):void 0;return r?.kind==="wall"?[-(r.nx??0),-(r.nz??0)]:null}function Pg(o,t,e=null,n=null){let i=o.y<0||t.y<0?gp:St(Math.max(o.y,t.y)),r=[],[s,a]=[o.x,o.z];e&&([s,a]=[St(s+e[0]*.5),St(a+e[1]*.5)],r.push([s,St(o.y),a]));let[l,c]=[t.x,t.z],d=[];return n&&([l,c]=[St(l+n[0]*.5),St(c+n[1]*.5)],d.push([l,St(t.y),c])),r.push([St(s),i,St(a)]),Math.abs(l-s)>.01&&r.push([St(l),i,St(a)]),Math.abs(c-a)>.01&&r.push([St(l),i,St(c)]),r.push(...d),r.filter((u,p)=>p===0||Math.hypot(u[0]-r[p-1][0],u[1]-r[p-1][1],u[2]-r[p-1][2])>.001)}var Tg=2e3;function _p(o){return Math.max(0,Tg-o)}var vp=120;var wp="homeplan3d.gpu_lost",Ni="4.0.2";function yp(){try{return typeof localStorage>"u"?null:localStorage}catch{return null}}function Ys(o,t=yp()){try{return!!t&&t.getItem(wp)===o}catch{return!1}}function xp(o,t,e,n,i=yp()){if(n||e-t>2e4||e<t||!i)return!1;try{return i.setItem(wp,o),!0}catch{return!1}}function kp(o,t,e,n=12,i=180){let r=Math.max(i,t),s=Math.max(i*.5625,e),a={cols:1,tile:Math.min(r,s*16/9)};for(let l=1;l<=Math.max(1,o);l++){let c=Math.ceil(o/l),d=(r-n*(l-1))/l,u=(s-n*(c-1))/c*16/9,p=Math.min(d,u);(p>a.tile||l===1)&&(a={cols:l,tile:p})}if(a.tile<i){let l=Math.max(1,Math.floor((r+n)/(i+n)));return{cols:Math.min(l,Math.max(1,o)),tile:i}}return{cols:a.cols,tile:Math.floor(a.tile)}}function Qs(o,t,e){let n=[...e.openings.values()].flatMap(T=>[T.cover,T.contact,T.tilt,T.contact2??null,T.tilt2??null,T.position??null,T.tiltAngle??null,T.lock??null]),i=eu(t),r=i.filter(T=>L(T)==="camera").flatMap(T=>Ut(o,T)),s=i.map(T=>co(o,T)),a=t.energy,l=t.presence.flatMap(T=>[T.person,T.sensor]),c=t.floors.flatMap(T=>T.rooms.flatMap(z=>wt(o,z.area_id).filter(R=>L(R)==="light"))),d=[...e.furniture.values()].flatMap(T=>[T.entity,T.power]),u=t.floors.flatMap(T=>T.furniture.flatMap(z=>[z.state_entity??null,z.state_entity2??null,z.color_entity??null])),p=t.floors.flatMap(T=>T.furniture.flatMap(z=>[z.door_left??null,z.door_right??null,z.soc??null,z.status??null,z.charge??null,z.export??null])),h=t.floors.flatMap(T=>T.furniture.flatMap(z=>Object.values(z.binds??{}))),_=(t.settings.roof?.windows??[]).flatMap(T=>[T.cover,T.contact,T.tilt]).filter(T=>!!T&&T!=="none"),b=[...(t.settings.roof?.solar??[]).map(T=>T.entity),...(t.settings.roof?.strings??[]).map(T=>T.entity)].filter(T=>!!T&&T!=="none"),m=t.floors.flatMap(T=>T.furniture.filter(z=>z.type==="robot_vacuum").map(z=>Xn(o,e.furniture.get(z.id)?.entity??null,z.room_sensor))),w=t.floors.flatMap(T=>T.furniture.flatMap(z=>(z.pictures??[]).flatMap(R=>[R.entity,...R.image.startsWith("camera:")?[R.image.slice(7)]:[]]))),k=e.heat?t.floors.flatMap(T=>T.rooms.flatMap(z=>wt(o,z.area_id).filter(R=>R.startsWith("sensor.")))):[],v=[...Du(t.floors),...G("auto_pro")?xc(o,t.floors):[]],f=ho(o,t).map(T=>T.entity),M=G("household")?[...t.floors.flatMap(T=>T.furniture.flatMap(Rd)),t.settings.household?.notes??null].filter(T=>!!T&&T!=="none"):[],x=ue(o,e.weatherEntityId??t.settings.weather_entity),I=[...i,...r,...n,...s,...d,...u,...p,...h,...m,..._,...b,...w,a.grid,a.solar,a.battery,a.battery_soc,a.consumption,a.tariff,...l,...c,...k,...e.warnings,...v,...f,...M,x,"sun.sun"];return[...new Set(I.filter(T=>!!T))]}var $p=/^#[0-9a-f]{3,8}$/i;function Eg(o){let t=(o??"").trim();return!t||/["'()\\\s]/.test(t)?null:/^(https?:\/\/|\/)/i.test(t)||/^data:image\//i.test(t)?t:null}function Sp(o){if(!o||!o.kind)return null;let t=o.color&&$p.test(o.color)?o.color:"#0b1426",e=o.color2&&$p.test(o.color2)?o.color2:"#03060c";if(o.kind==="color")return t;if(o.kind==="gradient")return`linear-gradient(180deg, ${t}, ${e})`;let n=Eg(o.image);if(!n)return null;let i=Math.min(.9,Math.max(0,o.dim??.45));return`linear-gradient(rgba(4, 8, 16, ${i}), rgba(4, 8, 16, ${i})), url("${n}") center / cover no-repeat`}var Js;function pe(){let o=new URL("./homeplan3d-voice.js?v=e3cc074dd1f2",new URL(import.meta.url)).href;return Js??=import(o).catch(t=>{throw Js=void 0,t}),Js}function Di(){try{return/[?&#]fp3d_mic=1\b/.test(location.href)&&sessionStorage.setItem("homeplan3d.mic","1"),sessionStorage.getItem("homeplan3d.mic")==="1"}catch{return!1}}function Xs(){try{return localStorage.getItem("homeplan3d.voice")==="1"}catch{return!1}}function Zs(){try{return localStorage.getItem("homeplan3d.screen")??""}catch{return""}}function Zt(){try{return localStorage.getItem("homeplan3d.voicePipeline")}catch{return null}}function ta(){try{return localStorage.getItem("homeplan3d.voiceArea")}catch{return null}}function Li(){try{sessionStorage.removeItem("homeplan3d.mic")}catch{}}var Rg=[[/KFTRWI|KFTRPWI|KFMAWI|KFSNWI|KFTUWI/,"Fire HD 10"],[/KFONWI|KFRAWI|KFRAPWI|KFTBWI|KFDOWI/,"Fire HD 8"],[/KFQUWI|KFMUWI|KFKAWI|KFGIWI/,"Fire 7"]];function Mp(o=typeof navigator>"u"?"":navigator.userAgent){if(!o)return null;let t=/Fully/i.test(o)?"Fully Kiosk":/Home ?Assistant/i.test(o)?"HA app":/Silk\//.test(o)?"Silk":/Edg\//.test(o)?"Edge":/Firefox\//.test(o)?"Firefox":/Chrome\//.test(o)?"Chrome":/Safari\//.test(o)?"Safari":null,i=[Rg.find(([r])=>r.test(o))?.[1]??(/KF[A-Z]{2,5}WI|Silk\//.test(o)?"Fire tablet":null)??(/iPad/.test(o)?"iPad":/iPhone/.test(o)?"iPhone":/Android/.test(o)?/Android [\d.]+; ([^;)]+?)(?: Build|\))/.exec(o)?.[1]?.trim()??"Android":/Windows/.test(o)?"Windows":/Mac OS X/.test(o)?"Mac":/Linux/.test(o)?"Linux":null),t].filter(Boolean).join(" \xB7 ");return i?i.slice(0,80):null}var Ag=.25,Ip=o=>Math.round(o*1e3)/1e3;function ea(o,t,e,n,i){let r=o.rooms.find(s=>s.points.length>=3&&W([t,e],s.points));return!r||W([n,i],r.points)?[n,i]:W([n,e],r.points)?[n,e]:W([t,i],r.points)?[t,i]:[t,e]}function Pp(o,t,e,n){let i=Math.hypot(n[0]-e[0],n[1]-e[1]);if(i<.01)return!1;let r=[(n[0]-e[0])/i,(n[1]-e[1])/i],s=l=>Math.abs(-(l[0]-e[0])*r[1]+(l[1]-e[1])*r[0]),a=l=>(l[0]-e[0])*r[0]+(l[1]-e[1])*r[1];return o.rooms.some(l=>l.id!==t&&l.points.some((c,d)=>{let u=l.points[(d+1)%l.points.length];return s(c)>.02||s(u)>.02?!1:Math.min(i,Math.max(a(c),a(u)))-Math.max(0,Math.min(a(c),a(u)))>.05}))}function Tp(o,t,e,n=Ag){let i=o.rooms.find(c=>c.points.length>=3&&W([t.x,t.z],c.points));if(!i)return null;let r=i.points,s=Ht(r)>=0?1:-1,a=e/2,l=null;for(let c=0;c<r.length;c++){let d=r[c],u=r[(c+1)%r.length],p=Math.hypot(u[0]-d[0],u[1]-d[1]);if(p<.3)continue;let h=[(u[0]-d[0])/p,(u[1]-d[1])/p],_=[-h[1]*s,h[0]*s],b=(t.x-d[0])*h[0]+(t.z-d[1])*h[1];if(b<0||b>p)continue;let w=o.rooms.some(T=>T.id!==i.id&&T.points.some((z,R)=>{let $=T.points[(R+1)%T.points.length],P=Math.abs((z[0]-d[0])*_[0]+(z[1]-d[1])*_[1]),O=Math.abs(($[0]-d[0])*_[0]+($[1]-d[1])*_[1]);return P<.02&&O<.02}))?a:0,k=(t.x-d[0])*_[0]+(t.z-d[1])*_[1]-w,v=Math.atan2(-_[0],_[1])*180/Math.PI,f=T=>Math.abs((t.rotation-T+540)%360-180),x=[{rotation:v,extent:t.d/2},{rotation:v+90,extent:t.w/2},{rotation:v-90,extent:t.w/2}].reduce((T,z)=>f(z.rotation)<f(T.rotation)?z:T);if(f(x.rotation)>50)continue;let I=k-x.extent;Math.abs(I)>n||l&&Math.abs(I)>=Math.abs(l.gap)||(l={x:Ip(t.x-_[0]*I),z:Ip(t.z-_[1]*I),rotation:(Math.round(x.rotation)%360+360)%360,gap:I})}return l?{x:l.x,z:l.z,rotation:l.rotation}:null}function zg(o){return{a:o.a,b:o.b,u:o.u,n:o.n,length:o.length,rightward:!0}}var na={walls(o,t,e){let n=o.floors.find(r=>r.id===t),i=n?.rooms.find(r=>r.id===e);return!n||!i||i.points.length<3?[]:i.points.map((r,s)=>{let a=lp(i,s),l=Pp(n,i.id,a.a,a.b),c=[...dp(a,n,i).map(d=>[d.s0,d.s1]),...cp(a,n).filter(d=>d.y0<.05).map(d=>[d.s0,d.s1])];return{roomId:i.id,edge:s,a:a.a,b:a.b,u:a.u,n:a.n,length:a.length,shared:l,thickness:l?o.settings.wall_interior:o.settings.wall_exterior,taken:c}})},onWall(o,t,e){return Us(zg(o),t,e)},freeSpot(o,t,e=.1){let n=r=>r>=e&&r+t<=o.length-e&&!o.taken.some(([s,a])=>r<a+.05&&r+t>s-.05),i=o.length/2-t/2;for(let r=0;r<=o.length;r+=.05){if(n(i-r))return Math.round((i-r)*100)/100;if(n(i+r))return Math.round((i+r)*100)/100}return null},nodeAt(o,t,e){let n=o.floors.find(a=>a.id===t),i=n?.outdoor.find(a=>a.id===e);if(!n||!i)return()=>null;let r=Hi(o,n,i),s=i.pool??{};return a=>{let{kind:l,id:c,port:d}=Je(a),u=l==="joint"?(s.joints??[]).find(h=>h.id===c):void 0;if(u)return go(u,d);let p=l==="port"?(s.ports??[]).find(h=>h.id===c):void 0;return p?r(a)??{x:p.x,y:.02,z:p.z}:r(a)}},connect(o,t,e,n,i,r){let s=o.floors.find(l=>l.id===t),a=s?.outdoor.find(l=>l.id===e);return!s||!a?{pipes:[],joints:[]}:bp({...n,floorId:t},na.nodeAt(o,t,e),a.pool?.joints??[],i,r)}};var Vi=30,Fg=10,Cg=600,Ep={alert:3,doorbell:2,trigger:1.5,motion:1,appliance:0},Og={alert:0,doorbell:2e4,trigger:3e4,motion:12e4,appliance:6e4},Hg=2e4,Ng=3*6e4,oa=new Set(["unavailable","unknown",""]),Dg="homeplan3d.director";function ia(){try{return localStorage.getItem(Dg)==="1"}catch{return!1}}function Ap(o){return!!o&&!!(o.doorbell||o.motion&&o.motion!=="off"||o.appliances||o.alerts||(o.triggers??[]).some(t=>t.entity))}var Lg=/(doorbell|klingel|visitor|besucher|\bding\b|deurbel|sonnette|campanello)/;function zp(o,t){return t?o.states[t]?[t]:[]:Object.keys(o.states).filter(e=>{let n=o.states[e];if(e.startsWith("event."))return n.attributes.device_class==="doorbell";if(!e.startsWith("binary_sensor."))return!1;let i=`${e} ${String(n.attributes.friendly_name??"")}`.toLowerCase().replace(/[_.-]/g," ");return Lg.test(i)}).sort()}function ra(o,t,e=Date.now()){if(!o||!t||oa.has(t.state)||o.state===t.state)return!1;if(t.entity_id.startsWith("event.")){let n=Date.parse(t.state);return Number.isFinite(n)&&e-n<3e4}return o.state==="off"&&t.state==="on"}var Rp=new Set(["on","open","opening","unlocked","unlocking","detected","home","playing","triggered"]);function Fp(o,t,e=Date.now()){return!o||!t||oa.has(t.state)||o.state===t.state?!1:t.entity_id.startsWith("event.")?ra(o,t,e):oa.has(o.state)?!1:Rp.has(t.state)&&!Rp.has(o.state)}function Cp(o,t,e,n){if(n)return n;let i=o.entities??{},r=i[t]?.device_id,s=e.filter(d=>d.startsWith("camera.")),a=r?s.find(d=>i[d]?.device_id===r):void 0;if(a)return a;let l=d=>Ct(o,d),c=l(t);return c&&s.find(d=>l(d)===c)||null}var bo=class{seen=new Map;runs=new Map;shown=new Map;touchedAt=-1/0;current=null;edge(t,e,n){let i=this.seen.has(t),r=this.seen.get(t);return this.seen.set(t,e),i&&r!==e&&n(r,e)}stopped(t,e,n){let i=this.runs.get(t);return e?(i?.run||this.runs.set(t,{run:!0,since:n,ran:!0}),!1):!i||i.run?(this.runs.set(t,{run:!1,since:n,ran:!!i?.run}),!1):i.ran&&n-i.since>=Ng?(i.ran=!1,!0):!1}resting(){for(let t of this.runs.values())if(!t.run&&t.ran)return!0;return!1}touch(t){this.touchedAt=t,this.current&&(this.current.touched=!0)}offer(t,e,n=Vi){let i=this.shown.get(t.key);if(i!==void 0&&e-i<Og[t.kind]||!(t.kind==="alert"||t.kind==="doorbell")&&e-this.touchedAt<Hg)return!1;let s=this.current;if(s&&e<s.until&&Ep[s.shot.kind]>Ep[t.kind])return!1;let a=Math.min(Cg,Math.max(Fg,n))*(t.kind==="doorbell"?2:1)*1e3;return this.current={shot:t,since:e,until:e+a,touched:!1},this.shown.set(t.key,e),!0}due(t){let e=this.current;return!e||t<e.until?null:(this.current=null,{shot:e.shot,back:!e.touched})}clear(){this.current=null}};var $t=Math.PI/180,Wi=-.833;function Vg(o,t,e){let n=(o/864e5+24405875e-1-2451545)/36525,i=((280.46646+n*(36000.76983+n*3032e-7))%360+360)%360,r=357.52911+n*(35999.05029-1537e-7*n),s=.016708634-n*(42037e-9+1267e-10*n),a=Math.sin(r*$t)*(1.914602-n*(.004817+14e-6*n))+Math.sin(2*r*$t)*(.019993-101e-6*n)+Math.sin(3*r*$t)*289e-6,l=125.04-1934.136*n,c=i+a-.00569-.00478*Math.sin(l*$t),u=23+(26+(21.448-n*(46.815+n*(59e-5-n*.001813)))/60)/60+.00256*Math.cos(l*$t),p=Math.asin(Math.sin(u*$t)*Math.sin(c*$t)),h=Math.tan(u/2*$t)**2,_=4*(h*Math.sin(2*i*$t)-2*s*Math.sin(r*$t)+4*s*h*Math.sin(r*$t)*Math.cos(2*i*$t)-.5*h*h*Math.sin(4*i*$t)-1.25*s*s*Math.sin(2*r*$t))/$t,b=new Date(o),k=(((b.getUTCHours()*60+b.getUTCMinutes()+b.getUTCSeconds()/60+_+4*e)%1440+1440)%1440/4-180)*$t,v=t*$t,f=Math.sin(v)*Math.sin(p)+Math.cos(v)*Math.cos(p)*Math.cos(k),M=90-Math.acos(Math.min(1,Math.max(-1,f)))/$t;return{azimuth:(Math.atan2(Math.sin(k),Math.cos(k)*Math.sin(v)-Math.tan(p)*Math.cos(v))/$t+180+360)%360,elevation:M}}function Op(o,t,e){let n=new Date(o);n.setHours(0,0,0,0);let i=n.getTime(),r=10*6e4,s=u=>({...Vg(u,t,e),t:u}),a=[],l=null,c=null,d=s(i);for(let u=i+r;u<=i+24*36e5;u+=r){let p=s(u),h=p.elevation>Wi,_=d.elevation>Wi;if(h!==_){let b=d.t,m=p.t;for(let k=0;k<12;k++){let v=(b+m)/2;s(v).elevation>Wi===_?b=v:m=v}let w=s(Math.round((b+m)/2));h?(l??=w,a.push(w)):(c=w,a.push(w))}h&&a.push(p),d=p}return!l&&a.length&&s(i).elevation>Wi&&a.unshift(s(i)),{points:a,rise:l,set:c}}var sa=Math.PI/180;function Hp(o,t,e,n){let i=o*sa,r=(t-n)*sa,s=e*sa;return Math.sin(s)*Math.sin(i)+Math.cos(s)*Math.cos(i)*Math.cos(r)<0?null:[Math.cos(i)*Math.sin(r),Math.cos(s)*Math.sin(i)-Math.sin(s)*Math.cos(i)*Math.cos(r)]}var Np=o=>o<0?0:o>1?1:o<.5?4*o*o*o:1-Math.pow(-2*o+2,3)/2,Wg={turn:1500,dive:1300,fade:600},aa=class extends at{static properties={lat:{type:Number},lon:{type:Number}};raf=0;t0=0;dove=!1;ended=!1;constructor(){super(),this.lat=50,this.lon=10}firstUpdated(){this.t0=performance.now();let t=()=>{this.ended||(this.draw(performance.now()-this.t0),this.raf=requestAnimationFrame(t))};this.raf=requestAnimationFrame(t)}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this.raf)}skip=()=>this.finish(!0);finish(t){this.ended||(this.ended=!0,cancelAnimationFrame(this.raf),this.dove||this.dispatchEvent(new CustomEvent("flyin-dive",{detail:{fast:!0}})),this.dispatchEvent(new CustomEvent("flyin-done",{detail:{skipped:t}})))}draw(t){let e=this.renderRoot.querySelector("canvas"),n=e?.getContext("2d");if(!e||!n)return;let i=1,r=Math.round(e.clientWidth*i),s=Math.round(e.clientHeight*i);(e.width!==r||e.height!==s)&&(e.width=r,e.height=s);let{turn:a,dive:l,fade:c}=Wg;if(t>a+l*.55&&!this.dove&&(this.dove=!0,this.dispatchEvent(new CustomEvent("flyin-dive",{detail:{fast:!1}}))),t>a+l+c)return this.finish(!1);n.clearRect(0,0,r,s);let d=t<a+l?0:(t-a-l)/c;n.globalAlpha=1-d,n.fillStyle="#02040a",n.fillRect(0,0,r,s);let u=Np(t/a),p=this.lon-100*(1-u),h=this.lat*u,_=t<a?0:Np((t-a)/l),m=Math.min(r,s)*.32*Math.pow(14,_),w=Hp(this.lat,this.lon,h,p),k=r/2-(w?w[0]*m*_:0),v=s/2+(w?w[1]*m*_:0);if(m<Math.max(r,s)){let M=n.createRadialGradient(k,v,m*.95,k,v,m*1.25);M.addColorStop(0,"rgba(62,232,255,0.35)"),M.addColorStop(1,"rgba(62,232,255,0)"),n.fillStyle=M;let x=m*1.25,I=Math.max(0,k-x),T=Math.max(0,v-x);n.fillRect(I,T,Math.min(r,k+x)-I,Math.min(s,v+x)-T)}n.fillStyle="#06101f",n.beginPath(),n.arc(k,v,m,0,Math.PI*2),n.fill(),n.strokeStyle=`rgba(62,232,255,${.5*(1-_*.7)})`,n.lineWidth=Math.max(1,i);let f=M=>{let x=!1;n.beginPath();for(let[I,T]of M){let z=Hp(I,T,h,p);if(!z){x=!1;continue}let R=k+z[0]*m,$=v-z[1]*m;x?n.lineTo(R,$):n.moveTo(R,$),x=!0}n.stroke()};if(_<.8){for(let M=-75;M<=75;M+=15)f(Array.from({length:73},(x,I)=>[M,I*5-180]));for(let M=-180;M<180;M+=15)f(Array.from({length:37},(x,I)=>[I*5-90,M]))}if(w){let M=k+w[0]*m,x=v-w[1]*m,I=.5+.5*Math.sin(t/140),T=n.createLinearGradient(M,x,M,x-s*.35);T.addColorStop(0,`rgba(255,95,210,${.8*u})`),T.addColorStop(1,"rgba(255,95,210,0)"),n.fillStyle=T,n.fillRect(M-2*i,x-s*.35,4*i,s*.35),n.fillStyle=`rgba(255,95,210,${.9*u})`,n.beginPath(),n.arc(M,x,(4+3*I)*i,0,Math.PI*2),n.fill(),n.strokeStyle=`rgba(255,95,210,${.6*u*(1-I)})`,n.beginPath(),n.arc(M,x,(8+16*I)*i,0,Math.PI*2),n.stroke()}n.globalAlpha=1}render(){return g`<canvas @pointerdown=${this.skip} aria-hidden="true"></canvas>`}static styles=ct`
    :host {
      position: absolute;
      inset: 0;
      z-index: 30;
      cursor: pointer;
    }
    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
  `};customElements.get("fp3d-flyin")||customElements.define("fp3d-flyin",aa);function Dp(o,t){return String(t&&o.states[t]?.attributes.unit_of_measurement||"m\xB3")}function Ug(o,t){return g`<svg class="fp3d-holo-spark" viewBox="0 0 120 22" preserveAspectRatio="none" aria-hidden="true">${ne`<polyline points=${np(o,120,22)} style=${`stroke:${t}`} />`}</svg>`}function jg(o,t,e){return(e==="m\xB3"||e==="m3")&&t<10?`${nt(o,t*1e3,0)} l`:`${nt(o,t,t<10?2:0)} ${e}`}var qg=12e4,Kg=600*1e3,Lp={person:'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6m-3 7h6a2 2 0 0 1 2 2v6h-2v6H9v-6H7v-6a2 2 0 0 1 2-2"/></svg>',car:'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11a2 2 0 0 1 2 2v5h-2v2h-3v-2H8v2H5v-2H3v-5a2 2 0 0 1 2-2m1.1 0h11.8l-1-3H7.1zM6.5 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"/></svg>',pet:'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M8.3 3.5a2 1.6 0 1 1 0 3.2 2 1.6 0 0 1 0-3.2m7.4 0a2 1.6 0 1 1 0 3.2 2 1.6 0 0 1 0-3.2M4.5 8a1.8 1.5 0 1 1 0 3 1.8 1.5 0 0 1 0-3m15 0a1.8 1.5 0 1 1 0 3 1.8 1.5 0 0 1 0-3M12 10c2.5 0 4.6 1.9 5.3 4.3.6 2 .2 3.7-1.3 4.5-1.4.8-2.6-.2-4-.2s-2.6 1-4 .2c-1.5-.8-1.9-2.5-1.3-4.5C7.4 11.9 9.5 10 12 10"/></svg>',motion:'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M13.5 5.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4M9.8 8.9 7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6z"/></svg>'},Gg='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',Yg='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/><path d="M3 3l18 18"/></svg>';function _o(o,t,e){return o.rooms.find(n=>n.points.length>=3&&W([t,e],n.points))?.id??null}function Qg(o,t){let e=t.action==="more_info"?t.target:t.data?.entity_id;return typeof e=="string"&&At(o.states[e])}function Jg(o){try{return localStorage.getItem(o)==="1"}catch{return!1}}function Xg(o,t){try{localStorage.setItem(o,t?"1":"0")}catch{}}function Vp(o,t){let e=s=>s&&s!=="none"?s:null,n=se(o,{cover:e(t.cover),contact:e(t.contact),tilt:e(t.tilt)},"window"),i=e(t.window)?o.states[e(t.window)]:void 0,r=n.open;if(i&&!Q(i)){let s=i.attributes.current_position;r=typeof s=="number"?Math.min(1,Math.max(0,s/100)):i.state==="open"||i.state==="opening"?1:0}return{open:r,tilt:n.tilt,cover:n.cover??0}}function Zg(o){let{card_templates:t,...e}=o;return JSON.stringify(e)}var Wp=new Set,Bp=new Set;async function tb(){let o=window.AudioContext??window.webkitAudioContext;if(!o)return;let t=new o;try{if(await Promise.race([t.resume(),new Promise(n=>setTimeout(n,300))]),t.state!=="running")return;let e=t.currentTime;for(let[n,i]of[[784,0],[523,.45]]){let r=t.createOscillator(),s=t.createGain();r.frequency.value=n,s.gain.setValueAtTime(1e-4,e+i),s.gain.exponentialRampToValueAtTime(.3,e+i+.02),s.gain.exponentialRampToValueAtTime(1e-4,e+i+.9),r.connect(s).connect(t.destination),r.start(e+i),r.stop(e+i+.95)}await new Promise(n=>setTimeout(n,1300))}finally{t.close().catch(()=>{})}}function eb(o){let t=o?.settings.label_scale;return typeof t=="number"&&Number.isFinite(t)?Math.min(2,Math.max(.5,t)):1}var la=18,da=class extends at{static properties={hass:{attribute:!1},building:{attribute:!1},planId:{attribute:!1},rooms:{attribute:!1,hasChanged:(t,e)=>(t??[]).join(",")!==(e??[]).join(",")},noSave:{attribute:!1},floorId:{attribute:!1},roomId:{attribute:!1},wallMode:{attribute:!1},explode:{type:Boolean},keepRoof:{attribute:!1},surroundings:{attribute:!1},plain:{attribute:!1},markerMode:{attribute:!1},pinSize:{attribute:!1},markerNames:{attribute:!1},heatMode:{attribute:!1},theme:{attribute:!1},themeEvening:{attribute:!1},themeNight:{attribute:!1},styleEntity:{attribute:!1},zoomStyle:{attribute:!1},zoomLate:{attribute:!1},zoomScope:{attribute:!1},_styleOverride:{state:!0},clock:{attribute:!1},_clockTick:{state:!0},accent:{attribute:!1},packs:{attribute:!1},showEnergy:{attribute:!1},flows:{attribute:!1},holograms:{attribute:!1},furnish:{type:Boolean},surfaceGrab:{attribute:!1},furnishTypes:{attribute:!1},trail:{type:Boolean},cameraWall:{attribute:!1},weather:{type:Boolean},sunFx:{attribute:!1},weatherEntityId:{attribute:!1},_flash:{state:!0},selectedFurniture:{attribute:!1},selectedSet:{attribute:!1},selectedDevice:{attribute:!1},_sky:{state:!0},quality:{attribute:!1},showStats:{type:Boolean},_stats:{state:!0},_error:{state:!0},_energy:{state:!0},_holos:{state:!0},_menuFresh:{state:!0},_rows:{state:!0},_meters:{state:!0},_holoOpen:{state:!0},_wallboxW:{state:!0},_plants:{state:!0},_holoOn:{state:!0},_flows:{state:!0},_holoShow:{state:!0},_swipe:{state:!0},_menu:{state:!0},_through:{state:!0},_camPop:{state:!0},_blend:{state:!0},_wallBig:{state:!0},_find:{state:!0},_walk:{state:!0},walkable:{attribute:!1},pivotMark:{attribute:!1},petsOn:{attribute:!1},ghostOn:{attribute:!1},_central:{state:!0},_sheet:{state:!0},_popup:{state:!0},popupValues:{state:!0},_settingsOpen:{state:!0},_note:{state:!0},_thumbsCompact:{state:!0},_armed:{state:!0},central:{attribute:!1},buttons:{attribute:!1},_thumbs:{state:!0},_cardsQuiet:{state:!0},floorThumbs:{attribute:!1},clean:{attribute:!1},cleanButton:{attribute:!1},roomLabels:{attribute:!1},floorStack:{attribute:!1},panelOpen:{attribute:!1},controlsRight:{attribute:!1},keepView:{attribute:!1},angleLock:{attribute:!1},alerts:{attribute:!1},alertJump:{attribute:!1},director:{attribute:!1},hideRoof:{attribute:!1},voice:{attribute:!1},screen:{attribute:!1},template:{attribute:!1},viewKind:{attribute:!1},voiceArea:{attribute:!1},_voice:{state:!0},_announce:{state:!0},scenes:{attribute:!1},dimmed:{attribute:!1},autoOrbit:{attribute:!1},startView:{attribute:!1},_low:{state:!0},_flyIn:{state:!0},_spotHint:{state:!0},_micProbe:{state:!0},_narrowStage:{state:!0},_alerts:{state:!0},_household:{state:!0},_hhFolded:{state:!0},_binInfo:{state:!0},_gangMenu:{state:!0},householdCard:{attribute:!1},_sceneFired:{state:!0},replay:{attribute:!1},_info:{state:!0}};infoTimer;seenSeek=0;seenT=0;replayTicked=!1;seenFocus=0;unlistenReplay=null;unwatchDiag=null;detecting=!1;syncMs=0;morph=0;clockTimer;flashTimer;cloud=0;sunPathKey="";sunPathCache=null;confirmSet=new Set;trailRows={};trailTimer;menuFreshTimer;holoTimer;holoFolded=new Set;mediaFolded=new Set;moduleFull=new Set(rb());cardPing=null;cardPingTimer;mediaGrace=new Map;mediaGraceTimer;mediaVolume=new Map;mediaIntent=new Map;scene=[];volumeSent=0;holoIds="";holoFetched=0;holoRefetch=null;shownStartView;popSeen=new Set;throughWall=!1;live=null;resizeObs=null;unsubAsk=null;voiceTimer;announceTimer;binInfoTimer;alertSrc=null;alertTimer;seenAlerts=new Set;roomFlash=null;findIndex=null;lastConsumers=[];tourToken=0;tourTimer;tintSig="";thumbTimer;thumbSig="";thumbsAt=0;popupTimer;noteTimer;lastPersons=[];armTimer;walker=null;pets=null;petsFor=null;petsLoading=!1;ghost=null;ghostLoading=!1;walkKeys=null;walkRoomPts=null;swipeSent=0;swipeFar=0;swipeTimer;viewer=null;starting=!1;shownStates=new Map;shownPacks=-1;openingLinks=null;linkedRegistry;furnitureLinks=new Map;pickups=new Map;dayEvents=[];pickupKey="";householdTimer;binHolos=[];finished=new ti;appliances=new Map;directing=new bo;directorTimer;restTimer;directorSrc=null;directorBack=null;fridgeTimer;sensorTimer;winterTimer;moduleTimer;lastSync=0;heatValues=new Map;watched=[];pictureUrls=new Map;cameraTick=0;cameraTimer;cameraScreens=0;throughFloor=null;constructor(){super(),this.building=null,this.planId=null,this.rooms=null,this.noSave=!1,this.replay=null,this._info=null,this.floorId=null,this.roomId=null,this.wallMode="auto",this.explode=!0,this.keepRoof=!1,this.surroundings=!0,this.plain=!1,this.markerMode="important",this.pinSize="normal",this.heatMode="none",this.theme="neon",this.clock=null,this._clockTick=0,this.accent=null,this.furnish=!1,this.trail=!1,this.weather=!0,this.sunFx=!0,this.weatherEntityId=null,this._flash=!1,this.showEnergy=!0,this.flows=null,this.selectedFurniture=null,this.selectedSet=[],this.selectedDevice=null,this._sky=0,this.quality="auto",this.showStats=!1,this._stats=null,this._error=null,this._energy=null,this._holos=[],this._menuFresh=!1,this._rows=null,this._holoOpen=!0,this._wallboxW=null,this._plants=[],this._holoOn=!1,this._swipe=null,this._menu=null,this._through=null,this._wallBig=null,this._blend=.6,this._find=null,this._central=!1,this._sheet=null,this._settingsOpen=!1,this._note=null,this._popup=null,this.popupValues={};try{this._thumbsCompact=localStorage.getItem("homeplan3d.thumbs_compact")==="1"}catch{this._thumbsCompact=!1}this._armed=null,this.central=!0,this.walkable=!0,this.pivotMark=!1,this.petsOn=!0,this.ghostOn=!0,this._walk=!1,this.buttons=null,this._thumbs=[],this._cardsQuiet=!1,this.floorThumbs=!0,this.clean=!1,this.cleanButton=!1,this.roomLabels=!0,this.floorStack="dim",this._low=!1,this.panelOpen=!1,this.controlsRight=!1,this.keepView=!1,this.angleLock=!1,this._narrowStage=!1,this.alerts=!0,this.alertJump=!1,this.director=!1,this.hideRoof=!1,this.voice=!1,this.screen=null,this.template=null,this.viewKind="panel",this.voiceArea=null,this._voice=null,this._micProbe=Di(),this._alerts=[],this._household=[],this._hhFolded=Jg("homeplan3d.hhFolded"),this._binInfo=null,this._gangMenu=null,this.householdCard=!0,this.scenes=!0,this._sceneFired=null,this.dimmed=!1,this.autoOrbit=!1,this.startView=null,this.cameraWall=!1,this.holograms=null,this._flyIn=null,this._spotHint=null;try{this._flows=localStorage.getItem("homeplan3d.flows")==="1",this._holoShow=localStorage.getItem("homeplan3d.holos")!=="0"}catch{this._flows=!1,this._holoShow=!0}}connectedCallback(){super.connectedCallback(),this.listenReplay(),this.unwatchDiag=fl(t=>this.viewer?.setStats(this.showStats||t)),this.hasUpdated&&(this.observeStage(),this.viewer||this.start(),this.watchTrail()),document.addEventListener("visibilitychange",this.onVisible);try{let t=JSON.parse(localStorage.getItem(ca)??"null");this._styleOverride=t&&(t.until===null||t.until>Date.now())&&Ee(t.style)?t:null}catch{this._styleOverride=null}this.watchAsk()}watchAsk(){let t=this.hass;this.unsubAsk||!t?.connection||!this.isConnected||(this.unsubAsk=lr(t,e=>{this.onAsk(e)},e=>{this.onAnnounce(e)},e=>this.onReload(e),e=>this.onStyle(e),this.viewInfo()).catch(()=>lr(t,e=>{this.onAsk(e)},e=>{this.onAnnounce(e)},e=>this.onReload(e),void 0,this.viewInfo())).catch(()=>(this.unsubAsk=null,async()=>{})))}viewInfo(){return{kind:this.viewKind,screen:this.screen,template:this.template,device:Mp(),version:ve,...this.planId&&this.planId!==ft?{plan:this.planId}:{}}}unwatchAsk(){let t=this.unsubAsk;this.unsubAsk=null,t?.then(e=>e()).catch(()=>{})}keepTouch=t=>{t.stopPropagation()};onVisible=()=>{document.hidden||this.holoRefetch?.()};disconnectedCallback(){super.disconnectedCallback(),this.watchWinter(!1),document.removeEventListener("visibilitychange",this.onVisible),this.stopWalk(),this.pets?.dispose(),this.pets=null,this.petsFor=null,this.ghost?.dispose(),this.ghost=null,this.unlistenReplay?.(),this.unlistenReplay=null,this.unwatchDiag?.(),this.unwatchDiag=null,this.unwatchAsk(),clearInterval(this.clockTimer),this.clockTimer=void 0,this.resizeObs?.disconnect(),this.resizeObs=null,clearInterval(this.alertTimer),this.alertTimer=void 0,clearInterval(this.cameraTimer),this.cameraTimer=void 0,this.live=null,clearInterval(this.trailTimer),this.trailTimer=void 0,clearInterval(this.holoTimer),this.holoTimer=void 0,clearInterval(this.householdTimer),this.householdTimer=void 0,clearTimeout(this.fridgeTimer),clearTimeout(this.sensorTimer),this.sensorTimer=void 0,clearTimeout(this.directorTimer),clearTimeout(this.restTimer),clearTimeout(this.voiceTimer),this.directing.clear(),this.pickupKey="",this.holoIds="",this.tintSig="",clearTimeout(this.flashTimer),this.flashTimer=void 0,clearTimeout(this.infoTimer),this.viewer?.dispose(),this.viewer=null}firstUpdated(){this.observeStage(),this._micProbe&&pe().catch(()=>this._micProbe=!1);let t=()=>this.directing.touch(Date.now());this.addEventListener("pointerdown",t,{passive:!0}),this.addEventListener("wheel",t,{passive:!0}),this.renderRoot.addEventListener("wheel",e=>{let n=e;if(!n.target?.closest?.(".fp3d-holo"))return;let i=this.renderRoot.querySelector("canvas");i&&(n.preventDefault(),i.dispatchEvent(new WheelEvent("wheel",n)))},{passive:!1}),this.start()}observeStage(){let t=this.renderRoot.querySelector(".fp3d-stage");!t||this.resizeObs||typeof ResizeObserver!="function"||(this.resizeObs=new ResizeObserver(e=>{let n=(e[0]?.contentRect.width??1e3)<700;n!==this._narrowStage&&(this._narrowStage=n,this.scheduleThumbs())}),this.resizeObs.observe(t))}async start(){if(!(this.starting||this.viewer)){this.starting=!0;try{let t=await fo();if(!this.isConnected)return;let e=this.renderRoot.querySelector(".fp3d-stage");e.addEventListener("pointerdown",i=>{this._central&&!i.target?.closest?.(".fp3d-central, .fp3d-central-btn")&&(this._central=!1),this._info&&(this._info=null)});let n=Date.now();this.viewer=t.createViewer(e,{quality:this.quality,explode:this.explode,safeFx:Ys(Ni),onContextLost:()=>xp(Ni,n,Date.now(),document.hidden),onRoomTap:(i,r)=>this.fire("room-tap",{floorId:i,roomId:r}),onFloorTap:i=>this.fire("floor-tap",{floorId:i}),floorInfo:i=>i.rooms.length===1?E(this.hass,"floor_rooms_one"):E(this.hass,"floor_rooms",{n:i.rooms.length}),onBack:()=>this.fire("back",{}),onDeviceTap:(i,r,s)=>this.onDeviceTap(i,r,s),onDeviceHold:(i,r,s)=>this.onDeviceHold(i,r,s),onRoomDoubleTap:(i,r)=>this.onRoomDoubleTap(i,r),onDeviceSwipe:(i,r,s,a,l)=>this.onDeviceSwipe(i,r,s,a,l),onMorph:i=>{this.morph=i;let r=this.renderRoot.querySelector(".fp3d-zoom-bg");r&&(r.style.opacity=String(i))},onFurnitureSelect:i=>this.fire("furniture-select",{id:i}),onFurnitureMove:(i,r,s)=>this.fire("furniture-move",{id:i,x:r,z:s}),onDeviceSelect:i=>this.fire("device-select",{id:i}),onDeviceMove:(i,r,s)=>this.fire("device-move",{id:i,x:r,z:s}),onStats:i=>{this.showStats&&(this._stats=i),gl(i)}}),this.viewer.setWallMode(this.wallMode),this.viewer.setKeepView(this.keepView),this.viewer.setAngleLock(this.angleLock),this.viewer.setStyle(this.effectiveStyle()),this.viewer.setZoomStyle(this.zoomDef()),this.viewer.setZoomLate((this.zoomLate??50)/100),this.viewer.setZoomScope(this.zoomScope==="room"?"room":"all"),this.viewer.setAccent(this.accent??null),this.viewer.setFurnishMode(this.furnish),this.viewer.setSurfaceGrab(this.surfaceGrab??null),this.viewer.setFurnishTypes(this.furnishTypes??null),this.viewer.setAnchorCallback((i,r,s,a,l,c)=>this.placeHolo(i,r,s,a,l,c)),this.viewer.setFloorStack(this.floorStack),this.viewer.setStats(this.showStats||pr()),Oe("3d"),this.viewer.setAutoOrbit(this.autoOrbit?.06:0),this.viewer.setKeepRoof(this.keepRoof),this.viewer.setHideRoof(this.hideRoof),this._low=this.viewer.low,this.viewer.setPacks([...sn()]),this.hass&&Cs(this.hass,sn()).then(()=>this.syncDevices(!0)),this.shownPacks=an(),this.building&&(this.shownStartView=JSON.stringify(this.startViewOf()),this.viewer.setStartView(this.startViewOf()),this.viewer.setBuilding(this.shownBuilding()),this.maybeFlyIn()),this.scheduleThumbs(),this.syncDevices(!0),this.syncPets(),this.syncGhost(),this.viewer.setFloor(this.floorId,!1),this.roomId&&this.viewer.selectRoom(this.roomId)}catch(t){this._error=String(t)}finally{this.starting=!1}}}willUpdate(t){t.has("building")&&(Fl(this.building??null),tu(this.building)),t.has("hass")&&this.hass&&_d(vd(this.hass))}updated(t){if(t.has("hass")&&this.live?.el&&(this.live.el.hass=this.hass),t.has("_menu")&&this._menu&&!t.get("_menu")&&(this._menuFresh=!0,clearTimeout(this.menuFreshTimer),this.menuFreshTimer=setTimeout(()=>this._menuFresh=!1,400)),t.has("_holos")){let l=this._holos.map(c=>c.kind).join(",");if(l!==this.holoShape){this.holoShape=l;for(let c of this.renderRoot.querySelectorAll(".fp3d-holo"))c.hidden=!0;for(let c of this.renderRoot.querySelectorAll(".fp3d-holo-link"))c.toggleAttribute("hidden",!0);this.viewer?.invalidate()}}(t.has("screen")||t.has("template")||t.has("viewKind")||t.has("planId"))&&this.unsubAsk&&this.hasUpdated?(this.unwatchAsk(),this.watchAsk()):t.has("hass")&&this.watchAsk(),this._central&&(t.has("roomId")&&t.get("roomId")!==void 0||t.has("floorId")&&t.get("floorId")!==void 0)&&(this._central=!1);let e=this.viewer;if(!e)return;this._through&&(t.has("roomId")||t.has("floorId"))&&(this.floorId===this.throughFloor?this.throughFloor=null:this._through=null),t.has("_through")&&!this._through&&t.get("_through")&&e.endLook(),this.shownPacks!==an()&&(this.shownPacks=an(),e.setPacks([...sn()]),this.hass&&Cs(this.hass,sn()).then(()=>this.syncDevices(!0)),this.hass&&this.building&&e.setParked(zs(this.hass,this.building)),this.syncDevices(!0));let n=t.has("building")&&this.building?Zg(this.building):this.drawnPlan,i=t.has("building")&&n===this.drawnPlan;if(this.drawnPlan=n,t.has("building")&&this.building&&!i){let l=JSON.stringify(this.startViewOf()),c=this.shownStartView!==void 0&&this.shownStartView!==l;this.shownStartView=l,e.setStartView(this.startViewOf()),e.setBuilding(this.shownBuilding()),c&&this.floorId===null&&e.resetView(),this.maybeFlyIn()}else(t.has("plain")&&t.get("plain")!==void 0||t.has("rooms")&&t.get("rooms")!==void 0||t.has("surroundings")&&t.get("surroundings")!==void 0)&&this.building?(e.setBuilding(this.shownBuilding()),t.has("rooms")&&(this.syncDevices(!0),e.resetView())):t.has("hass")&&this.building&&As(this.hass,this.building)!==this.shownSig&&(e.setBuilding(this.shownBuilding()),this.syncDevices(!0));(t.has("building")||t.has("packs")||t.has("petsOn"))&&this.syncPets(),(t.has("building")||t.has("packs")||t.has("ghostOn"))&&this.syncGhost(),t.has("startView")&&t.get("startView")!==void 0&&(e.setStartView(this.startViewOf()),this.floorId===null&&e.resetView()),(t.has("building")||t.has("theme")||t.has("floorThumbs")||t.has("packs"))&&this.scheduleThumbs();let r=["building","markerMode","heatMode","flows","alerts","dimmed"].some(l=>t.has(l))||this.markerMode==="room"&&t.has("roomId"),s=this.replayTicked&&!!this.replay;this.replayTicked=!1,(r||t.has("hass")||s)&&this.syncDevices(r,s&&(this.trail||this.detecting)),(t.has("hass")||t.has("director"))&&this.direct(),t.has("autoOrbit")&&e.setAutoOrbit(this.autoOrbit?.06:0),(t.has("_thumbs")||t.has("_narrowStage"))&&e.setLabelInset(this._thumbs.length?this.narrowThumbs?136:184:0),(t.has("clean")||t.has("_narrowStage"))&&this.scheduleThumbs(),t.has("floorId")&&e.setFloor(this.floorId),t.has("roomId")&&(this.roomId||t.get("roomId"))&&e.selectRoom(this.roomId),t.has("wallMode")&&e.setWallMode(this.wallMode),t.has("keepView")&&e.setKeepView(this.keepView),t.has("angleLock")&&e.setAngleLock(this.angleLock),t.has("explode")&&e.setExplode(this.explode),t.has("keepRoof")&&e.setKeepRoof(this.keepRoof),t.has("hideRoof")&&e.setHideRoof(this.hideRoof),t.has("floorStack")&&e.setFloorStack(this.floorStack),["theme","themeEvening","themeNight"].some(l=>t.has(l)&&t.get(l)!==void 0)&&this._styleOverride&&this.setStyleOverride("reset",null),(t.has("theme")||t.has("themeEvening")||t.has("themeNight")||t.has("styleEntity")||t.has("_styleOverride")||t.has("building"))&&e.setStyle(this.effectiveStyle()),(t.has("zoomStyle")||t.has("building"))&&e.setZoomStyle(this.zoomDef()),t.has("zoomLate")&&e.setZoomLate((this.zoomLate??50)/100),t.has("zoomScope")&&e.setZoomScope(this.zoomScope==="room"?"room":"all"),t.has("accent")&&e.setAccent(this.accent??null),t.has("surfaceGrab")&&e.setSurfaceGrab(this.surfaceGrab??null),t.has("furnishTypes")&&e.setFurnishTypes(this.furnishTypes??null),t.has("furnish")&&(e.setFurnishMode(this.furnish),this.syncDevices(!0)),t.has("selectedFurniture")&&e.selectFurniture(this.selectedFurniture),t.has("selectedSet")&&e.selectFurnitureSet(this.selectedSet??[]),t.has("selectedDevice")&&e.setSelectedDevice(this.selectedDevice),(t.has("trail")||t.has("replay"))&&this.watchTrail(),t.has("replay")&&(this.listenReplay(),this.replay||(this._info=null)),(t.has("weather")||t.has("weatherEntityId"))&&this.syncDevices(!0),t.has("quality")&&t.get("quality")!==void 0&&(e.setQuality(this.quality),this._low=e.low,this.replay?.setQuality(this.quality,e.low)),t.has("showStats")&&e.setStats(this.showStats||pr()),t.has("building")&&(this.findIndex=null)}watchWinter(t){t&&!this.winterTimer?this.winterTimer=setInterval(()=>this.syncDevices(!1,!0),6e4):!t&&this.winterTimer&&(clearInterval(this.winterTimer),this.winterTimer=void 0)}syncDevices(t,e=!1){let n=this.viewer,i=this.conditioned();if(!n||!i||!this.hass)return;let r=this.hass;if(t||!this.openingLinks||this.linkedRegistry!==r.entities){this.openingLinks=Yn(r,i.floors),this.furnitureLinks=De(r,i.floors),this.linkedRegistry=r.entities,this.findIndex=null,this.alertSrc=this.alerts?oo(r,i,this.weatherEntityId):null,this.watchHousehold(r,i),this.watched=Qs(r,i,{openings:this.openingLinks,furniture:this.furnitureLinks,heat:this.heatMode!=="none"||this.roomLabels,warnings:this.alertSrc?ms(this.alertSrc):[],weatherEntityId:this.weatherEntityId}),Ye()&&(this.watched=[...new Set([...this.watched,...Xu(this.sceneHost(r,i))])]);let S=this.styleEntity||i.settings.style_entity;if(S&&!this.watched.includes(S)&&(this.watched=[...this.watched,S]),G("fun_winter")){let A=[Ge(i).roof_entity,ue(r,this.weatherEntityId??i.settings.weather_entity),"sun.sun"].filter(V=>!!V);this.watched=[...new Set([...this.watched,...A])]}t=!0}let s=t||e,a=!s;if(!s){for(let S of this.watched)if(this.shownStates.get(S)!==r.states[S]&&(s=!0,!S.startsWith("sensor."))){a=!1;break}}let l=!!this.replay&&this.replay.seek!==this.seenSeek;if(this.seenSeek=this.replay?.seek??0,this.seenT=this.replay?.t??0,!s)return;if(!t&&!this.replay&&n.cameraBusy()){this.sensorTimer??=setTimeout(()=>{this.sensorTimer=void 0,this.syncDevices(!1)},vp);return}if(a&&this._low&&!this.replay){let S=_p(performance.now()-this.lastSync);if(S>0){this.sensorTimer??=setTimeout(()=>{this.sensorTimer=void 0,this.syncDevices(!1)},S);return}}this.lastSync=performance.now();let c=this.showStats?performance.now():0;this.shownStates=new Map(this.watched.map(S=>[S,r.states[S]])),this.scene=Ye()?Gu(this.sceneHost(r,i)):[];let d=gu(r,i),u=Xd(r,i),p=this.furnitureMarkers(r,i,new Set(u.map(S=>S.id)),new Set(d.map(S=>S.powerEntity)));d.push(...p.consumers),this.lastConsumers=d;let h=bu(r,i,d,Mn(i,S=>this.furnitureLinks?.get(S.id)?.power??null)),_=new Map(d.filter(S=>S.id!==S.powerEntity).map(S=>[S.id,S.power]));this.confirmSet=pn(r,i.floors);let b=this.trail?this.trailNow(r,i):[],m=G("camera_cockpit")&&!this.dimmed?this.detectionPins(r,u):[];this.detecting=m.length>0;let w=G("energy_pro"),k=new Set(G("auto_pro")?i.floors.flatMap(S=>S.furniture.filter(A=>A.type==="parking"&&A.car&&Pn(r,A)).map(A=>A.id)):[]);n.setDevices([...[...u,...p.markers,...this.lockMarkers(r,i)].map(S=>{let A=S.show==="no_power"||"energyDevice"in S&&S.energyDevice||"standby"in S&&S.standby?null:_.get(S.id)??null,V={...S,power:A,powerText:A===null?void 0:rt(r,A),effect:this.dimmed?!1:S.effect},tt=S.ownName&&(S.showName||this.markerNames)?S.ownName:"",N=this.cardsOn()&&(G("sound")&&this.mediaCardUp(r,S.id)||G("auto_pro")&&!!S.furnitureId&&k.has(S.furnitureId));return{...V,pin:this.showPin(V)&&!N,full:S.show==="always"||S.full===!0,caption:tt}}),...(w&&(this.flows??this._flows)&&!this.dimmed&&h.grid!==null?[this.gridPin(r,i,h.grid)]:[]).filter(S=>!!S),...m,...b.map((S,A)=>({id:`trail:${A}`,floorId:S.floorId,roomId:null,x:S.x,z:S.z,y:.3+.4*b.slice(0,A).filter(V=>V.entity===S.entity).length,icon:Uu,name:B(r,S.entity),text:Ei(r,S.time),active:!1,unavailable:!1,glow:null,pin:!0})),...this.moduleMarkers(i)]);for(let S of this.scene)S.kind==="marker"&&S.card&&S.furnitureId&&!p.targets.has(S.furnitureId)&&p.targets.set(S.furnitureId,`module:${S.id}`);n.setTrail(b,this.replay?this.robotPaths(r,i):[]),n.setPickTargets(p.targets,this.openingTargets()),n.setScreens(p.screens),n.setFridgeDoors(Cr(r,i.floors)),n.setAwnings(yc(r,i.floors)),n.setProjections(this.projectedCameras(r,i)),n.setRobots(this.robotInfos(r,i));let v=new Map;for(let S of i.settings.roof?.windows??[])v.set(S.id,Vp(r,S));n.setRoofWindows(v),n.setParked(zs(r,i));let f=new Map(i.floors.flatMap(S=>S.openings.map(A=>[A.id,A.type]))),M=new Map([...this.openingLinks].map(([S,A])=>[S,se(r,A,f.get(S))]));n.setOpeningStates(M,l);let x=this.alertSrc?oi(r,i,this.alertSrc,this.openingLinks):[],I=this.alerts&&Ye()?Ju(this.sceneHost(r,i)).map(S=>({kind:S.kind,entity:S.entity,roomId:S.roomId,floorId:S.floorId,text:S.text,color:S.color,quiet:!S.roomId})):[];this.setAlerts([...x,...I]),clearTimeout(this.fridgeTimer);let T=G("household")&&!this.replay?Hd(i.floors.flatMap(S=>S.furniture),r):null;T!==null&&(this.fridgeTimer=setTimeout(()=>this.syncDevices(!0),T+500));let z=[...u,...p.markers].map(S=>`${S.id}:${S.glow?`${S.glow.level.toFixed(1)}/${S.glow.color.map(A=>A.toFixed(1)).join("/")}`:0}`).join(";")+"|"+[...M].map(([S,A])=>`${S}:${A.open}:${A.cover===null?"-":A.cover.toFixed(1)}`).join(";");if(z!==this.thumbSig){let S=this.thumbSig==="";this.thumbSig=z,S||this.scheduleThumbs(1500)}let R=i.floors.flatMap(S=>S.furniture.filter(A=>A.type==="home_battery").map(A=>({floorId:S.id,x:A.x,z:A.z})))[0]??(i.energy.battery?i.floors.flatMap(S=>S.placements.filter(A=>A.entity_id===i.energy.battery).map(A=>({floorId:S.id,x:A.x,z:A.z})))[0]:null),$=w?Mu(r,i,h.solar):null,P=i.settings.roof.hologram??Yt,O=[...i.settings.roof.solar??[]].sort((S,A)=>A.rows*A.cols-S.rows*S.cols),H=i.settings.roof.strings??[],C=S=>(S.string?H.find(A=>A.id===S.string)?.inverter:null)??null,j=P.plant_floor?"all":"house",Y=(S,A,V,tt)=>{let N=We(i,S);if(!N)return null;let[J,st]=Be(N,S),lt=S.u+J/2+A,gt=S.v+st/2+V,Kt=[N.o[0]+N.eu[0]*lt+N.es[0]*gt,N.o[1]+N.eu[1]*lt+N.es[1]*gt,N.o[2]+N.eu[2]*lt+N.es[2]*gt],ut=N.wall?.floorId??(N.unbounded?i.floors.find(It=>It.elevation===Math.min(...i.floors.map(en=>en.elevation)))?.id??i.floors[0].id:[...i.floors].sort((It,en)=>en.elevation-It.elevation)[0].id);return{p:[Kt[0]+N.n[0]*.05,Kt[1]+N.n[1]*.05,Kt[2]+N.n[2]*.05],n:[N.n[0],N.n[1],N.n[2]],floorId:ut,size:tt,roof:!0,views:j}},F=[],U=[],D=h.grid!==null||h.battery!==null||h.solar!==null,Z=P.place==="free"&&Number.isFinite(P.x)&&Number.isFinite(P.z),X=w&&h.solar!==null&&!Z?O.find(S=>S.id===P.field)??O[0]:void 0,pt=X?C(X):null,yt=!!X&&!!pt&&!O.some(S=>S.id!==X.id&&C(S)===pt)&&P.right===0&&P.up===0,Ft=(()=>{if(!yt||!X)return 0;let S=We(i,X);return S?Be(S,X)[0]/2+1.2:0})(),he=X?Y(X,P.right+Ft,P.up,P.size):null,En=this.devicePowers(r,i),fe=i.energy.solar?[i.energy.solar]:Mn(i,S=>this.furnitureLinks?.get(S.id)?.power??null).solar,Dt=fe.map(S=>dt(r.states[S])).filter(S=>S!==null),Xe=(i.settings.roof.strings??[]).flatMap(S=>S.entity&&S.entity!=="none"?[S.entity]:[]),vo=wi(Dt.length?Dt.reduce((S,A)=>S+A,0):null,vi(r,i))!==(Dt.length?Dt.reduce((S,A)=>S+A,0):null),Rn=w&&h.solar!==null?vo?Xe:fe:[];if(he)F.push(he),U.push({kind:"main",name:E(r,"holo_title"),w:null,dayIds:Rn,battery:null});else if(w&&D&&Z){let S=0,A=0,V=0,tt=1/0,N=i.floors[0];for(let gt of i.floors){gt.rooms.length&&(tt=Math.min(tt,gt.elevation)),gt.rooms.length&&(!N.rooms.length||gt.elevation+gt.height>N.elevation+N.height)&&(N=gt);for(let Kt of gt.rooms)for(let[ut,It]of Kt.points)S+=ut,A+=It,V++}V&&(S/=V,A/=V);let J=P.x-S,st=P.z-A,lt=Math.hypot(J,st);F.push({p:[P.x,(Number.isFinite(tt)?tt:0)+(P.height??3),P.z],n:lt>.01?[J/lt,0,st/lt]:[1,0,0],floorId:N.id,size:P.size,roof:!0,views:j}),U.push({kind:"main",name:E(r,"holo_title"),w:null,dayIds:Rn,battery:null})}else if(w&&D&&i.floors.some(S=>S.rooms.length)){let S=-1/0,A=1/0,V=-1/0,tt=0,N=i.floors[0];for(let J of i.floors){for(let st of J.rooms)for(let[lt,gt]of st.points)S=Math.max(S,lt),A=Math.min(A,gt),V=Math.max(V,gt);J.rooms.length&&J.elevation+J.height>tt&&(tt=J.elevation+J.height,N=J)}F.push({p:[S+.6,tt+.4,(A+V)/2],n:[1,0,0],floorId:N.id,size:P.size,roof:!0,views:j}),U.push({kind:"main",name:E(r,"holo_title"),w:null,dayIds:Rn,battery:null})}if(w&&h.solar!==null){let S=new Set;for(let A of i.floors)for(let V of A.furniture.filter(tt=>tt.type==="inverter")){if(V.plant_card===!1||S.has(V.id))continue;S.add(V.id);let tt=O.filter(ut=>C(ut)===V.id),N=(X&&V.id===pt?tt.find(ut=>ut.id!==X.id):null)??tt[0],J=this.furnitureLinks?.get(V.id)?.power??null,st=N?Y(N,V.plant_right??0,V.plant_up??0,P.size*.85):null,lt=vi(r,i,V.id);if(!st||!J&&lt===null)continue;let gt=A.furniture.filter(ut=>ut.type==="home_battery").sort((ut,It)=>Math.hypot(ut.x-V.x,ut.z-V.z)-Math.hypot(It.x-V.x,It.z-V.z))[0],Kt=gt?.soc&&gt.soc!=="none"?Number(r.states[gt.soc]?.state):NaN;F.push(st),U.push({kind:"plant",name:V.name||kt(r,V.type),w:Math.max(0,wi(J?dt(r.states[J]):null,lt)??0),dayIds:J?[J]:[],battery:gt?{soc:Number.isFinite(Kt)?Kt:null,w:En.get(gt.id)??null}:null})}}let wo=P.device_house===!1?"floor":"all";if(w)for(let S of i.floors){for(let A of S.furniture){if(!A.holo)continue;let V=this.furnitureLinks?.get(A.id)?.power??null,tt=d.find(J=>J.id===A.id);if(!V&&!tt)continue;let N=S.elevation+mt(S,A)+A.h;F.push({p:[A.x,N+.1,A.z],n:[0,1,0],floorId:S.id,size:P.size*.7,roof:!1,views:wo,room:_o(S,A.x,A.z)}),U.push({kind:"device",name:A.name||kt(r,A.type),w:tt?.power??(V?dt(r.states[V]):null),dayIds:V?[V]:[],battery:null})}for(let A of S.placements){if(!A.holo)continue;let V=co(r,A.entity_id);if(!V)continue;let tt=S.elevation+(A.y??.4)+.2;F.push({p:[A.x,tt,A.z],n:[0,1,0],floorId:S.id,size:P.size*.7,roof:!1,views:wo,room:_o(S,A.x,A.z)}),U.push({kind:"device",name:A.name||B(r,A.entity_id),w:dt(r.states[V]),dayIds:[V],battery:null})}}let Et=[];if(G("sound")){let S=new Set,A=(i.settings.roof.hologram??Yt).size,V=(N,J,st,lt,gt,Kt)=>{let ut=r.states[J];if(!ut||L(J)!=="media")return;if(S.has(J)){let Re=Et.find(Ki=>Ki.id===J);Re&&Et.push({...Re,id:`${J}#${Et.filter(Ki=>Ki.id.startsWith(`${J}#`)).length+2}`,floorId:N.id,x:st,z:lt,members:[J]});return}S.add(J);let It=this.ro?void 0:this.mediaGrace.get(J),en=[ut.attributes.media_title,ut.attributes.app_name,ut.attributes.source].find(Re=>typeof Re=="string"&&!!Re.trim())??"";if(!(!Q(ut)&&(ut.state==="playing"||ut.state==="paused"&&!!en&&this.pausedRecently(ut)||ut.state==="on"&&!!ut.attributes.source))){It&&It.until>Date.now()?(Et.push({...It.source,playing:!1,level:0}),F.push(It.anchor),U.push({...It.card,media:{...It.card.media,playing:!1}}),clearTimeout(this.mediaGraceTimer),this.mediaGraceTimer=setTimeout(()=>this.syncDevices(!0),Math.max(500,It.until-Date.now()+100))):Q(ut)||(this.mediaGrace.delete(J),Et.push({id:J,floorId:N.id,x:st,z:lt,level:0,playing:!1,members:[]}));return}let qi=ut.state==="playing",Gt=ut.attributes,xa=typeof Gt.volume_level=="number"?Math.min(1,Math.max(0,Gt.volume_level)):.5,Zp=Array.isArray(Gt.group_members)?Gt.group_members.filter(Re=>Re!==J):[];Et.push({id:J,floorId:N.id,x:st,z:lt,level:qi?.3+.7*xa:0,playing:qi,members:Zp});let th=en||E(r,"holo_media_playing"),ka={p:[st,N.elevation+gt+.12,lt],n:[0,1,0],floorId:N.id,size:A*.7,roof:!1,views:"all",room:_o(N,st,lt)},$a={kind:"media",name:Kt,w:null,dayIds:[],battery:null,media:{id:J,title:th,artist:typeof Gt.media_artist=="string"?Gt.media_artist:typeof Gt.media_album_name=="string"?Gt.media_album_name:"",picture:typeof Gt.entity_picture=="string"?Gt.entity_picture:null,volume:Math.round(xa*100),playing:qi}};F.push(ka),U.push($a),this.ro||this.mediaGrace.set(J,{until:Date.now()+45e3,card:$a,source:Et[Et.length-1],anchor:ka})},tt=(N,J)=>{for(let st of N.furniture){if((st.entity!=null&&st.entity!=="none")!==J)continue;let lt=this.furnitureLinks?.get(st.id)?.entity;lt&&V(N,lt,st.x,st.z,mt(N,st)+st.h,st.name||kt(r,st.type))}};for(let N of i.floors)tt(N,!0);for(let N of i.floors)for(let J of N.placements)V(N,J.entity_id,J.x,J.z,J.y??1.1,J.name||B(r,J.entity_id));for(let N of i.floors)tt(N,!1)}if(G("auto_pro")){let S=(i.settings.roof.hologram??Yt).size;for(let A of i.floors)for(let V of A.furniture){if(V.type!=="parking"||!V.car)continue;let tt=Pn(r,V);if(!tt)continue;let N=Jn(r,V);if(N.soc===null&&N.range===null&&N.locked===null&&N.climateOn===null)continue;let J=Lu(V,tt),st=mt(A,V)+(J?.h??1.6);F.push({p:[V.x,A.elevation+st+.25,V.z],n:[0,1,0],floorId:A.id,size:S*.7,roof:!1,views:"all"});let lt=N.entities;U.push({kind:"car",name:V.name||kt(r,tt),w:null,dayIds:[],battery:null,car:{spot:V.id,soc:N.soc,range:N.range,rangeUnit:N.rangeUnit,chargingW:N.chargingW,charging:N.charging,locked:N.locked,climateOn:N.climateOn,lock:lt.lock,climate:lt.climate,charge:lt.charging&&/^(switch|input_boolean)\./.test(lt.charging)?lt.charging:null}})}}let q=this.scene.filter(S=>S.kind==="water").map(S=>({...S,level:this.dimmed?S.level*.4:S.level}));if(n.setPools(q),Ye()){let S=(i.settings.roof.hologram??Yt).size;for(let A of Qu(this.sceneHost(r,i))){let V=i.floors.find(N=>N.id===A.anchor.floorId);if(!V)continue;let tt=null;if(A.anchor.areaId){let N=V.outdoor.find(gt=>gt.id===A.anchor.areaId);if(!N||N.points.length<3)continue;let[J,st]=Rt(N.points),lt=N.type==="pool"?ln(V,N):ie(V,J,st);tt=[J,V.elevation+Math.max(lt,0)+(N.above?.6:1.1),st]}else if(A.anchor.furnitureId){let N=V.furniture.find(J=>J.id===A.anchor.furnitureId);if(!N)continue;tt=[N.x,V.elevation+mt(V,N)+N.h+.25,N.z]}tt&&(F.push({p:tt,n:[0,1,0],floorId:V.id,size:S*.7,roof:!1,views:"all"}),U.push({kind:"module",name:A.title,w:null,dayIds:[],battery:null,module:A}))}for(let A of this.scene){if(A.kind!=="tag")continue;let V=i.floors.find(tt=>tt.id===A.floorId);V&&(F.push({p:[A.at[0],V.elevation+A.at[1],A.at[2]],n:[0,1,0],floorId:V.id,size:S*.75,roof:!1,views:A.views??"all"}),U.push({kind:"bin",name:A.sub??"",w:null,dayIds:[],battery:null,bin:{lines:[{color:A.color??"#37e0ff",when:A.text,name:A.sub??"",soon:!0,out:!1}],soon:!0,icon:null},tag:!0}))}}if(G("household")){let S=(i.settings.roof.hologram??Yt).size;for(let A of Id(this.binHolos)){let V=i.floors.find(N=>N.id===A.floorId);if(!V)continue;F.push({p:[A.x,V.elevation+A.y+.04,A.z],n:[0,1,0],floorId:A.floorId,size:S*.75,roof:!1,views:"all",room:_o(V,A.x,A.z)});let tt=A.lines.map(N=>({color:N.color,when:N.when,name:N.name,soon:!!N.soon&&!N.out,out:!!N.out}));U.push({kind:"bin",name:A.lines.map(N=>N.name).join(", "),w:null,dayIds:[],battery:null,bin:{lines:tt,soon:tt.some(N=>N.soon),icon:A.lines.length===1?A.lines[0].icon??null:null}})}}n.setSound(Et);let it=this._walk?this.walkRoomPts:null,ht=F.map(S=>!this._walk||!!it&&W([S.p[0],S.p[2]],it)),qt=U.filter((S,A)=>ht[A]);n.setAnchors(F.filter((S,A)=>ht[A])),JSON.stringify(qt)!==JSON.stringify(this._holos)&&(this._holos=qt),n.setSolarLevels($&&!this.dimmed?Su(i,$):new Map);let te=!w||!(this.flows??this._flows)||this.dimmed?[]:vu({building:i,consumers:d,summary:h,battery:R??null,fieldPower:$,devicePower:this.devicePowers(r,i)}).map(S=>({floorId:S.floorId,a:S.a,b:S.b,dist:S.dist,power:S.power,color:Iu(S.kind,h)})),yo=this.poolPipes(i),xo=this.scene.filter(S=>S.kind==="line"),Ze=G("fun_winter")&&!this.replay;n.setRoofLights(Ze&&Cu(r,i)?Ge(i).roof_color?"color":"warm":"off",Ge(i).roof_outline!==!1);let ko=Ze?Ou(r,i,ue(r,this.weatherEntityId??i.settings.weather_entity)):0;n.setRoofSnow(ko),n.setFirework(Ze&&Nu(i)),this.watchWinter(Ze),n.setFlows(this.dimmed?te:[...te,...yo.flows,...op(xo)]),n.setPipes(yo.tubes),n.setPatches([...this.scene.filter(S=>S.kind==="patch").map(S=>({floorId:S.floorId,points:S.points,y:S.y,color:S.color,opacity:this.dimmed?S.opacity*.4:S.opacity,...S.glow?{glow:!0}:{}})),...Hu(i,ko)]);let tn=[],ji=li(i)?[...tn,...ci(r,i,new Set(tn.map(S=>S.id)))]:tn;n.setPersonLook(ws(i)==="pin"?"pin":"figure"),n.setPersons([...ji,...this.moduleFigures(i)]),this.lastPersons=ji.map(S=>({id:S.id,floorId:S.floorId,roomId:S.roomId}));let Jp=Qd(r,i,this.openingLinks,ji);n.setFloorInfo(new Map([...Jp].map(([S,A])=>[S,this.clean&&this._narrowStage?"":Jd(r,A)]))),this.fire("status-change",{});let $o=r.states["sun.sun"]?.attributes,So=typeof $o?.elevation=="number"?$o.elevation:null;n.setSun(this.sunFx!==!1&&So!==null&&typeof $o?.azimuth=="number"?{elevation:So,azimuth:$o.azimuth}:null);let Mo=S=>E(r,S).charAt(0).toUpperCase();n.setSunPath(this.sunFx===!1?null:this.sunPathToday(r),[Mo("compass_n"),Mo("compass_e"),Mo("compass_s"),Mo("compass_w")],zn(r)),n.setStyle(this.effectiveStyle());let ba=this.weather&&!this.dimmed&&G("weather")?ld(r,ue(r,this.weatherEntityId??i.settings.weather_entity),i.settings.rain_entity):null,An=ba?cd(ba,i.settings.weather_effects):null;this.cloud=An?.cloud??0,this._sky=(So===null?0:Math.min(1,Math.max(0,(So+4)/16)))*(1-.45*this.cloud);let Xp=An?An.sky:(i.settings.weather_effects??["sky"]).includes("sky");n.setWeather(this.weather&&!this.dimmed&&G("weather")?{...An??{rain:0,snow:0,fog:0,cloud:0,wind:0},sky:this.skyColor(),disc:Xp}:null),this.watchLightning(!!An?.lightning),this.applyTint();let _a=h.grid!==null||h.solar!==null||h.battery!==null||h.tariff!==null?h:null;JSON.stringify(_a)!==JSON.stringify(this._energy)&&(this._energy=_a);let va=d.some(S=>S.wallbox)?d.filter(S=>S.wallbox).reduce((S,A)=>S+A.power,0):null,wa=i.floors.flatMap(S=>S.furniture.filter(A=>A.type==="inverter")).map(S=>{let A=this.furnitureLinks?.get(S.id)?.power,V=A?dt(r.states[A]):null;return V===null?null:{name:S.name||kt(r,S.type),w:Math.max(0,V)}}).filter(S=>!!S);JSON.stringify(wa)!==JSON.stringify(this._plants)&&(this._plants=wa),va!==this._wallboxW&&(this._wallboxW=va),this.watchSolarDay([...new Set(U.flatMap(S=>S.dayIds))]);let ya=G("energy_pro");this.watchMeters(ya?i.energy.gas??null:null,ya?i.energy.water??null:null),c&&(this.syncMs=this.syncMs*.8+(performance.now()-c)*.2)}listenReplay(){this.unlistenReplay?.(),this.unlistenReplay=null;let t=this.replay;!t||!this.isConnected||(this.seenT=t.t,this.seenFocus=t.focusSeq,this.unlistenReplay=t.listen(()=>{this.replay===t&&(t.focusSeq!==this.seenFocus&&(this.seenFocus=t.focusSeq,t.focus&&this.showEntity(t.focus)),!(t.t===this.seenT&&t.seek===this.seenSeek)&&(t.pulses.length&&this.viewer?.flashDevices(t.pulses),this.seenT=t.t,!(t.seek===this.seenSeek&&!this.trail&&!this.detecting&&!this._holos.length)&&(this.replayTicked=!0,this.requestUpdate())))}))}nowInput(){let t=this.hass,e=this.building;if(!t||!e||!this.openingLinks)return null;let n=new Map(this.lastPersons.map(a=>[a.id,a])),i=new Map(e.floors.flatMap(a=>ot(a).map(l=>[l.id,l.name]))),r=Object.values(t.states).filter(a=>a.entity_id.startsWith("person.")).map(a=>{let l=n.get(a.entity_id);return{name:B(t,a.entity_id),home:a.state==="home",room:l?i.get(l.roomId)??null:null,floorId:l?.floorId??null,roomId:l?.roomId??null}}),s=Object.values(t.states).find(a=>a.entity_id.startsWith("person.")&&!!t.user?.id&&a.attributes.user_id===t.user.id);return{alerts:this._alerts.map(a=>({text:Ie(t,e,a),entity:a.entity,floorId:a.floorId,roomId:a.roomId})),openings:this.spokenOpenings(t,e),unlocked:this.lockMarkers(t,e).filter(a=>a.active).map(a=>({name:B(t,a.id),entity:a.id,floorId:a.floorId,roomId:a.roomId})),people:r,household:this._household.map(a=>({text:a.text,entity:a.entity,hot:!!a.hot})),lights:$e(t,e,null).map(a=>({room:a.name,count:a.lightsOn.length,on:a.lightsOn,floorId:a.floorId,roomId:a.roomId})),energy:this._energy?{consumption:this._energy.consumption,solar:this._energy.solar,grid:this._energy.grid,soc:this._energy.soc}:null,cars:this.spokenCars(t,e).map(a=>({name:a.name,present:a.present,charging:a.charging,soc:a.soc,floorId:a.floorId})),away:!!s&&s.state!=="home"}}quietCards(t){this._cardsQuiet=t}showNow(t){let e=this.building,n=t.opening&&e?this.openingSpot(e,t.opening):null;if(n){(this.floorId!==n.floorId||this.roomId)&&this.fire("floor-tap",{floorId:n.floorId}),setTimeout(()=>this.viewer?.focus(n.floorId,n.x,n.z,n.y,t.entity??null,{radius:4.6,phi:1,theta:n.theta}),120);return}if(t.entity){let i=this.floorId;if(this.showEntity(t.entity),this.findIndex?.some(r=>r.entity===t.entity)||this.floorId!==i)return}t.floorId&&this.jumpTo({kind:"now",entity:t.entity??"",floorId:t.floorId,roomId:t.roomId??null})}showEntity(t){let e=this.hass,n=this.building;if(!e||!n)return;let i=(this.findIndex??=Ai(e,n)).find(s=>s.entity===t);if(i){this.goTo(i);return}let r=Ct(e,t);for(let s of n.floors){let a=s.openings.find(u=>{let p=this.openingLinks?.get(u.id);return!!p&&[p.contact,p.tilt,p.contact2,p.tilt2,p.cover].includes(t)}),l=s.rooms.find(u=>u.points.length>=3&&(a?u.id===a.room_id:!!r&&u.area_id===r));if(!l)continue;let[c,d]=Rt(l.points);this.goTo({kind:"device",name:l.name,where:"",floorId:s.id,roomId:l.id,entity:t,icon:null,x:c,z:d,y:1});return}}now(){return this.replay?.t??Date.now()}get ro(){return!!this.replay}historyEntities(){let t=this.building,e=this.hass;if(!t||!e)return{entities:[],openings:[],furniture:[],low:this._low};let n=!this.openingLinks||this.linkedRegistry!==e.entities,i=n?Yn(e,t.floors):this.openingLinks,r=n?De(e,t.floors):this.furnitureLinks,s=ms(oo(e,t,this.weatherEntityId)),a=Qs(e,t,{openings:i,furniture:r,heat:!0,warnings:s,weatherEntityId:this.weatherEntityId}),l=G("auto_pro")?t.floors.flatMap(c=>c.furniture.filter(d=>d.type==="parking").flatMap(d=>[typeof d.entity=="string"?d.entity:null,d.car?qo(e,d).tracker:null]).filter(d=>!!d&&d.startsWith("device_tracker."))):[];return{entities:a,openings:[...i],furniture:[...r],low:this._low,cars:l,energy:G("energy_pro"),auto:G("auto_pro")}}showInfo(t,e,n){this._menu=null,this._info={entity:t,x:e,y:n},clearTimeout(this.infoTimer),this.infoTimer=setTimeout(()=>this._info=null,4e3)}renderInfo(){let t=this._info;if(!t||!this.hass)return y;let e=this.hass,n=e.states[t.entity],i=_t(e,n),r=L(t.entity)==="light"&&n?.state==="on"&&i.endsWith("%")?`${E(e,"state_on")} \xB7 ${i}`:i,s=n?.last_changed?E(e,"tt_since",{time:Ei(e,Date.parse(n.last_changed))}):"";return g`<div class="fp3d-swipe fp3d-info" style="left:${t.x}px;top:${t.y}px">
      <span>${B(e,t.entity)}</span>
      <b>${s?`${r} \xB7 ${s}`:r}</b>
    </div>`}devicePowers(t,e){let n=new Map;for(let i of e.floors)for(let r of i.furniture){if(r.type!=="inverter"&&r.type!=="home_battery")continue;let s=this.furnitureLinks?.get(r.id)?.power,a=r.type==="home_battery"&&r.charge&&r.charge!=="none"?dt(t.states[r.charge]):null,l=s?dt(t.states[s],r.type==="home_battery"&&e.energy.battery_invert&&a===null):null;l!==null&&a!==null?l=Math.max(0,l)-Math.max(0,a):l===null&&a!==null&&(l=-Math.max(0,a)),l!==null&&n.set(r.id,l)}return n}detectionPins(t,e){let n=[],i=new Set(this.building?.floors.flatMap(s=>s.placements.filter(a=>a.detect_pins===!1).map(a=>a.entity_id))??[]),r=new Set(this.building?.floors.flatMap(s=>s.placements.filter(a=>a.detect_popup).map(a=>a.entity_id))??[]);for(let s of e){if(r.has(s.id)&&s.model?.startsWith("camera")&&this.popOnDetection(t,s.id),!s.model?.startsWith("camera")||i.has(s.id))continue;let a=this.now(),l=Ut(t,s.id).filter(_=>{let b=t.states[_];return b?b.state==="on"?!0:b.state==="off"&&!!b.last_changed&&a-Date.parse(b.last_changed)<qg:!1}),c=new Map;for(let _ of l){let b=io(t,_);c.has(b)||c.set(b,_)}c.size>1&&c.delete("motion");let d=(s.rotation??0)*Math.PI/180,u=[-Math.sin(d),Math.cos(d)],p=s.model==="camera_ceiling",h=0;for(let[_,b]of c){let m=t.states[b],w=m?.last_changed?Ei(t,Date.parse(m.last_changed)):"";n.push({id:`detect:${b}`,floorId:s.floorId,roomId:s.roomId,x:s.x+(p?0:u[0]*1.1),z:s.z+(p?0:u[1]*1.1),y:1.4+.4*h++,icon:Lp[_]??Lp.motion,name:B(t,b),text:`${E(t,`detect_${_}`)}${w?` \xB7 ${w}`:""}`,active:!0,unavailable:!1,glow:null,pin:!0})}}return n}gridPin(t,e,n){let i=_i(e);if(!i)return null;let r=Math.abs(n)<5,s=e.settings.outage_entity;return s&&Xo(t.states[s])?{id:"grid",floorId:i.floorId,roomId:null,x:i.end[0],z:i.end[1],y:.9+i.height,icon:Yg,name:E(t,"holo_grid"),text:E(t,"power_outage"),active:!0,unavailable:!1,glow:null,pin:!0}:{id:"grid",floorId:i.floorId,roomId:null,x:i.end[0],z:i.end[1],y:.9+i.height,icon:Gg,name:E(t,"holo_grid"),text:r?rt(t,0):`${E(t,n<0?"energy_grid_export":"energy_grid_import")} ${rt(t,Math.abs(n))}`,active:!r,unavailable:!1,glow:null,pin:!0}}meterKey="";meterTimer;watchMeters(t,e){let n=[t,e].filter(s=>!!s),i=this.replay?"":n.join(",");if(i===this.meterKey)return;if(this.meterKey=i,clearInterval(this.meterTimer),this.meterTimer=void 0,!i){this._meters=null;return}let r=async()=>{if(!this.hass||document.hidden)return;let s=await fu(this.hass,n);this.meterKey===i&&s&&(this._meters={gas:t?s.get(t)??null:null,water:e?s.get(e)??null:null})};r(),this.meterTimer=setInterval(()=>{r()},3e5)}poolPipes(t){let e=[],n=[],i=new Map(this.scene.filter(r=>r.kind==="pipeflow").map(r=>[r.areaId,r.flows]));for(let{floor:r,area:s}of fp(t.floors)){let a=s.pool;if(!a.pipes?.length&&!a.joints?.length)continue;let l=a.ports??[],c=new Map(Object.entries(i.get(s.id)??{})),d=Hi(t,r,s),u=(p,h)=>Ks(p,h,s,r);e.push(...mp(a.pipes??[],c,d,u));for(let p of l){if(p.kind!=="inlet")continue;let h=d(`port:${p.id}`),_=h&&Gs(s,[h.x,h.z]);if(!h||!_)continue;let b=(a.pipes??[]).find(w=>w.to===`port:${p.id}`),m=b?c.get(b.id):void 0;n.push({floorId:r.id,points:[[h.x+_[0]*.03,h.y,h.z+_[1]*.03],[h.x-_[0]*.09,h.y,h.z-_[1]*.09]],radius:.035,water:m?.active?m.color:null,fittings:[]})}for(let p of a.joints??[]){if(p.kind!=="wall"&&p.kind!=="floor")continue;let h=d(`joint:${p.id}:inside`),_=d(`joint:${p.id}:outside`),b=p.kind==="floor"?.03:h.y;n.push({floorId:r.id,points:[[h.x,b,h.z],[_.x,_.y,_.z]],radius:.05,water:null,fittings:[]})}for(let p of a.pipes??[]){let h=Ks(mo(p,d),p,s,r);if(h.length<2)continue;let _=c.get(p.id),b=[],m=Ci(h);for(let[w,k]of[[p.from,.04],[p.to,m-.04]]){let v=w.startsWith("dev:")||w.startsWith("joint:")?Oi(h,k):null;v&&b.push({kind:"sleeve",p:v.p,dir:v.dir})}for(let w of p.fittings??[]){let k=Oi(h,w.at);k&&b.push({kind:w.kind,p:k.p,dir:k.dir,open:w.open!==!1})}n.push({floorId:p.floor_id,points:h,radius:.025,water:_?.active?_.color??qs:null,fittings:b})}}return{flows:e,tubes:n}}watchSolarDay(t){let e=this.replay;if(e){clearInterval(this.holoTimer),this.holoTimer=void 0;let r=`tt|${t.join(",")}|${Math.floor(e.t/3e5)}`;if(r===this.holoIds)return;this.holoIds=r,this._rows=t.length?e.stats(t,new Date(e.t).setHours(0,0,0,0),e.t+1):null;return}let n=t.join(",");if(n===this.holoIds)return;if(this.holoIds=n,clearInterval(this.holoTimer),this.holoTimer=void 0,!t.length){this._rows=null;return}let i=async()=>{if(!this.hass||document.hidden)return;this.holoFetched=Date.now();let r=await ku(this.hass,t);this.holoIds===n&&(this._rows=r)};i(),this.holoTimer=setInterval(()=>{i()},3e5),this.holoRefetch=()=>{Date.now()-this.holoFetched>3e5&&i()}}holoShape="";holoBoxes=[];holoSizes=new Map;holoStage={w:0,h:0,at:0};placeHolo(t,e,n,i,r,s){(!this.holoBoxes.length||t<=this.holoBoxes[this.holoBoxes.length-1].i)&&(this.holoBoxes=[]);let a=this.renderRoot.querySelector(`.fp3d-holo[data-holo="${t}"]`),l=this.renderRoot.querySelector(`.fp3d-holo-link[data-holo="${t}"]`),c=this._holos[t]?.kind==="main";if(!a){c&&this._holoOn&&(this._holoOn=!1);return}c&&i!==this._holoOn&&(this._holoOn=i);let d=this._holos[t],u=(this.building?.settings.roof.hologram??Yt).device_min_w??0;d?.kind==="device"&&u>0&&(d.w??0)<u&&(i=!1);let p=!i;if(a.hidden!==p&&(a.hidden=p),l&&l.hasAttribute("hidden")!==p&&l.toggleAttribute("hidden",p),!i)return;if(d?.kind==="bin"){let C=Math.max(.6,r*.8),j=!!d.bin?.icon&&r*.8<.62;a.classList.contains("fp3d-holo-far")!==j&&(a.classList.toggle("fp3d-holo-far",j),this.holoSizes.delete(t)),j&&(C=1);let Y=this.holoSizes.get(t),F=performance.now();(!Y||F-Y.at>2e3)&&(Y={w:a.offsetWidth||90,h:a.offsetHeight||40,at:F},this.holoSizes.set(t,Y));let U=Y.w*C,D=Y.h*C,Z=n;for(let X=0;X<6;X++){let pt=this.holoBoxes.find(yt=>e-U/2<yt.x1+3&&e+U/2>yt.x0-3&&Z-D<yt.y1+3&&Z>yt.y0-3);if(!pt)break;Z=pt.y0-4}this.holoBoxes.push({i:t,x0:e-U/2,x1:e+U/2,y0:Z-D,y1:Z}),a.style.transform=`translate(${e.toFixed(1)}px, ${Z.toFixed(1)}px) scale(${C.toFixed(3)}) translate(-50%, -100%)`,l&&!l.hasAttribute("hidden")&&l.toggleAttribute("hidden",!0);return}let h=r*.8,_=34*h,b=46*h,m=e+(s?_:-_),w=n-b,k=this.holoSizes.get(t),v=performance.now();(!k||v-k.at>2e3)&&(k={w:a.offsetWidth||184,h:a.offsetHeight||90,at:v},this.holoSizes.set(t,k));let f=k.w*h,M=k.h*h;if(v-this.holoStage.at>2e3){let C=a.parentElement;this.holoStage={w:C?.clientWidth||innerWidth,h:C?.clientHeight||innerHeight,at:v}}let x=8,I=this.holoStage.w,T=this.holoStage.h,z=s?m:m-f,R=I>f+2*x?Math.max(0,x-z)-Math.max(0,z+f-(I-x)):0;z+=R,m+=R;let $=z+f;for(let C=0;C<6;C++){let j=this.holoBoxes.find(Y=>z<Y.x1+4&&$>Y.x0-4&&w-M<Y.y1+4&&w>Y.y0-4);if(!j)break;w=j.y0-6}let P=60,O=w-M<P;if(O){w=n+b+M;for(let C=0;C<6;C++){let j=this.holoBoxes.find(Y=>z<Y.x1+4&&$>Y.x0-4&&w-M<Y.y1+4&&w>Y.y0-4);if(!j)break;w=j.y1+6+M}T>M+P+x&&(w=Math.min(w,T-x)),w=Math.max(w,P+M)}this.holoBoxes.push({i:t,x0:z,x1:$,y0:w-M,y1:w});let H=s||(this.building?.settings.roof.hologram??Yt).mirror!==!1;if(a.style.transform=H?`translate(${m.toFixed(1)}px, ${w.toFixed(1)}px) scale(${(s?h:-h).toFixed(3)}, ${h.toFixed(3)}) translate(0, -100%)`:`translate(${z.toFixed(1)}px, ${w.toFixed(1)}px) scale(${h.toFixed(3)}) translate(0, -100%)`,l){let C=l.firstElementChild,j=l.lastElementChild;C?.setAttribute("x1",e.toFixed(1)),C?.setAttribute("y1",n.toFixed(1)),C?.setAttribute("x2",m.toFixed(1)),C?.setAttribute("y2",(O?w-M:w).toFixed(1)),j?.setAttribute("cx",e.toFixed(1)),j?.setAttribute("cy",n.toFixed(1))}}renderHologram(){let t=this._energy,e=()=>this._holos.map((s,a)=>s.kind==="bin"?this.renderBinCard(s,a):y),n=this._holos.some(s=>s.kind==="module"||s.tag);if(!(n||G("energy_pro")||G("sound")||G("auto_pro")||G("pool")||G("household"))||!this.cardsOn())return G("household")||n?e():y;if(this.roomId&&!(this.building?.settings.roof.hologram??Yt).device_room)return this._holos.map((s,a)=>s.kind==="media"?this.renderMediaCard(s,a):s.kind==="bin"?this.renderBinCard(s,a):y);let i=this.floorId===null||(this.building?.floors.length??0)<=1,r=!!t&&(t.solar!==null||t.grid!==null||t.battery!==null)&&i;return this._holos.map((s,a)=>s.kind==="module"?this.renderModuleCard(s,a):s.kind==="bin"?this.renderBinCard(s,a):s.kind==="car"?this.renderCarCard(s,a):s.kind==="media"?this.renderMediaCard(s,a):s.kind==="device"?this.renderDeviceCard(s,a):r?this.renderHoloCard(s,a,t):y)}renderBinCard(t,e){let n=t.bin,i=n.lines.length===1?n.lines[0]:null,r=n.lines.map(s=>`${s.name}: ${s.when}`).join(", ");return g`<div class="fp3d-holo fp3d-holo-bin ${n.soon?"":"fp3d-holo-later"} ${i?.out?"fp3d-holo-out":""} ${i?"":"fp3d-holo-multi"} ${this._low?"fp3d-holo-plain":""}" data-holo=${e} hidden role="note" aria-label=${r} style="--bin:${n.lines[0].color}">
      ${n.icon?g`<span class="fp3d-holo-sym" aria-hidden="true"
            ><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"
              ><path d=${n.icon==="mail"?"M3.5 6.5h17v11h-17z M3.5 7l8.5 6.5L20.5 7":"M12 21v-9 M12 12c0-4.5 3-7 8-7 0 4.5-3 7-8 7z M12 14.5c0-3.5-2.4-6-6.5-6 0 3.5 2.4 6 6.5 6z M8 21h8"} /></svg
          ></span>`:y}
      ${i?g`<div class="fp3d-holo-body"><b>${i.when}</b><span>${i.name}</span></div>`:g`<div class="fp3d-holo-body fp3d-holo-lines">
            ${n.lines.map(s=>g`<div class="fp3d-holo-line ${s.soon?"":"fp3d-holo-line-later"} ${s.out?"fp3d-holo-line-out":""}" style="--bin:${s.color}"><b>${s.when}</b><span>${s.name}</span></div>`)}
          </div>`}
    </div>`}renderCarCard(t,e){let n=this.hass,i=_=>E(n,_),r=t.car,s=!this.mediaFolded.has(r.spot),a=()=>{this.mediaFolded.has(r.spot)?this.mediaFolded.delete(r.spot):this.mediaFolded.add(r.spot),this.requestUpdate()},l=(_,b,m)=>{n.callService(_,b,{entity_id:m})},c=(_,b)=>_.startsWith("climate.")?l("climate",b?"turn_on":"turn_off",_):l("homeassistant",b?"turn_on":"turn_off",_),d=()=>{if(!r.lock)return;let _=r.lock.startsWith("lock.");if(r.locked){if(!confirm(i("car_unlock_confirm")))return;_?l("lock","unlock",r.lock):l("homeassistant","turn_off",r.lock)}else _?l("lock","lock",r.lock):l("homeassistant","turn_on",r.lock)},u=r.soc===null?"#37e0ff":r.soc>=50?"#4dff80":r.soc>=20?"#ffcc40":"#ff4d40",p=!!r.lock&&/^(lock|input_boolean|switch)\./.test(r.lock),h=!!r.climate&&/^(climate|switch|input_boolean)\./.test(r.climate);return g`<svg class="fp3d-holo-link" data-holo=${e} hidden aria-hidden="true"><line x1="0" y1="0" x2="0" y2="0" /><circle cx="0" cy="0" r="3" /></svg>
      <div class="fp3d-holo fp3d-holo-dev fp3d-holo-car ${s?"":"fp3d-holo-min"} ${this._low?"fp3d-holo-plain":""}" data-holo=${e} hidden role="group" aria-label=${t.name}>
        <div class="fp3d-holo-sheen"></div>
        <div class="fp3d-holo-scan"></div>
        <div class="fp3d-holo-body">
          <div class="fp3d-holo-head" role="button" tabindex="0" @click=${a}>
            <span>🚗 ${t.name}</span><span class="fp3d-holo-live">${r.charging?`\u26A1 ${i("car_charging_short")}`:r.locked===null?"":r.locked?"\u{1F512}":"\u{1F513}"}</span>
          </div>
          <div class="fp3d-holo-car-main">
            <b style="color:${u}">${r.soc!==null?`${Math.round(r.soc)} %`:"\u2013"}</b>
            <span>${r.range!==null?`${nt(n,r.range,0)} ${r.rangeUnit}`:""}${r.charging&&r.chargingW?` \xB7 ${rt(n,r.chargingW)}`:""}</span>
          </div>
          ${r.soc!==null?g`<div class="fp3d-holo-car-bar"><i style="width:${Math.max(2,Math.min(100,r.soc))}%;background:${u}"></i></div>`:y}
          ${s&&!this.ro&&(p||h||r.charge)?g`<div class="fp3d-holo-media-controls fp3d-holo-car-controls">
                ${p?g`<button title=${r.locked?i("car_unlock_btn"):i("car_lock_btn")} @click=${d}>${r.locked?"\u{1F512}":"\u{1F513}"}</button>`:y}
                ${h?g`<button class=${r.climateOn?"fp3d-holo-on":""} title=${i("car_climate")} @click=${()=>c(r.climate,!r.climateOn)}>❄</button>`:y}
                ${r.charge?g`<button class=${r.charging?"fp3d-holo-on":""} title=${i("car_charging")} @click=${()=>c(r.charge,!r.charging)}>⚡</button>`:y}
              </div>`:y}
        </div>
      </div>`}renderModuleCard(t,e){let n=t.module,i=!this.mediaFolded.has(n.id),r=()=>{this.mediaFolded.has(n.id)?this.mediaFolded.delete(n.id):this.mediaFolded.add(n.id),this.requestUpdate()},s=m=>m?`color:${m}`:"",a=this._low||this.clientWidth<600,l=a&&!this.moduleFull.has(n.id),c=a&&[...n.rows??[],...n.cells??[],...n.chain?.items??[],...n.spark?[n.spark]:[]].some(m=>m.minor),d=()=>{this.moduleFull.has(n.id)?this.moduleFull.delete(n.id):this.moduleFull.add(n.id);try{localStorage.setItem(jp,JSON.stringify([...this.moduleFull]))}catch{}this.requestUpdate()},u=zi(n.rows,l),p=zi(n.cells,l),h=n.chain?zi(n.chain.items,l):[],_=n.spark&&n.spark.values.length>1&&!(l&&n.spark.minor)?n.spark:null,b=!!(n.chain||n.cells?.length||n.status);return g`<svg class="fp3d-holo-link" data-holo=${e} hidden aria-hidden="true"><line x1="0" y1="0" x2="0" y2="0" /><circle cx="0" cy="0" r="3" /></svg>
      <div class="fp3d-holo fp3d-holo-dev fp3d-holo-mod ${b?"fp3d-holo-mod-wide":""} ${this.cardPing===n.id?"fp3d-holo-ping":""} ${i?"":"fp3d-holo-min"} ${this._low?"fp3d-holo-plain":""}" data-holo=${e} hidden role="group" aria-label=${n.title}>
        <div class="fp3d-holo-sheen"></div>
        <div class="fp3d-holo-scan"></div>
        <div class="fp3d-holo-body">
          <div class="fp3d-holo-head" role="button" tabindex="0" @click=${r}><span>${n.icon} ${n.title}</span><span class="fp3d-holo-live" style=${s(n.liveColor)}>${n.live??""}</span></div>
          ${n.status?g`<div class="fp3d-holo-status" style=${n.status.color?`--st:${n.status.color}`:""}>
                ${n.status.icon?g`<i>${n.status.icon}</i>`:y}<b>${n.status.text}</b>${n.status.since?g`<span>${n.status.since}</span>`:y}
              </div>`:y}
          ${n.main?g`<div class="fp3d-holo-car-main fp3d-holo-mod-main">
                <b style=${s(n.main.color)}>${n.main.text}</b><span>${n.main.sub??""}</span>
                ${n.main.side?g`<em style=${s(n.main.side.color)}><b>${n.main.side.text}</b>${n.main.side.sub?g`<small>${n.main.side.sub}</small>`:y}</em>`:y}
              </div>`:y}
          ${i&&h.length?g`<div class="fp3d-holo-chain">
                  ${h.map((m,w)=>g`${w?g`<s>→</s>`:y}<div><small>${m.label}</small><b style=${s(m.color)}>${m.value}</b></div>`)}
                </div>
                ${n.chain.note?g`<div class="fp3d-holo-chain-note" style=${s(n.chain.noteColor)}>${n.chain.note}</div>`:y}`:y}
          ${i?u.map(m=>g`<div class="fp3d-holo-mrow"><span>${m.label}</span><b style=${s(m.color)}>${m.value}</b>${m.at!==void 0?m.fill?g`<i class="fp3d-holo-mrow-fill"><s style="width:${m.at}%;background:${m.color??"#37e0ff"}"></s></i>`:g`<i><em style="left:${m.at}%;background:${m.color??"#37e0ff"};color:${m.color??"#37e0ff"}"></em></i>`:g`<i class="fp3d-holo-mrow-none"></i>`}</div>`):y}
          ${i&&p.length?g`<div class="fp3d-holo-cells">${p.map(m=>g`<div><small>${m.label}</small><b style=${s(m.color)}>${m.value}</b></div>`)}</div>`:y}
          ${i&&n.hint?g`<div class="fp3d-holo-hint" style=${n.hint.color?`--hint:${n.hint.color}`:""}>${n.hint.text}</div>`:y}
          ${i?(n.lines??[]).map(m=>g`<div class="fp3d-holo-mline">${m}</div>`):y}
          ${i&&_?g`${_.label?g`<div class="fp3d-holo-spark-label">${_.label}</div>`:y}${Ug(_.values,_.color??"#ffb347")}`:y}
          ${i&&n.chips?.length?g`<div class="fp3d-holo-chips">
                ${n.chips.map(m=>g`<div class="fp3d-holo-mline">${m.title}</div>
                    <div class="fp3d-holo-chip-row">${m.items.map(w=>g`<button class=${w.on?"fp3d-holo-on":""} title=${w.title??""} @click=${()=>w.onTap()}>${w.label}</button>`)}</div>`)}
              </div>`:y}
          ${i&&c?g`<button class="fp3d-holo-more" @click=${d}>${E(this.hass,l?"holo_more":"holo_less")}</button>`:y}
          ${i&&!this.ro&&n.buttons?.length?g`<div class="fp3d-holo-media-controls fp3d-holo-car-controls">${n.buttons.map(m=>g`<button class=${m.on?"fp3d-holo-on":""} title=${m.title??""} @click=${()=>m.onTap()}>${m.label}</button>`)}</div>`:y}
        </div>
      </div>`}serviceFailed(t,e){let n=e&&typeof e=="object"&&"message"in e?String(e.message):String(e);this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:`${t}: ${n}`},bubbles:!0,composed:!0}))}renderMediaCard(t,e){let n=this.hass,i=v=>E(n,v),r=t.media,s=!this.mediaFolded.has(r.id),a=()=>{this.mediaFolded.has(r.id)?this.mediaFolded.delete(r.id):this.mediaFolded.add(r.id),this.requestUpdate()},l=(v,f={})=>{Promise.resolve(n.callService("media_player",v,{entity_id:r.id,...f})).catch(M=>this.serviceFailed(`media_player.${v}`,M))},c={down:v=>v.currentTarget.dataset.pressed=String(v.pointerId),up:v=>f=>{let M=f.currentTarget;M.dataset.pressed===String(f.pointerId)&&(delete M.dataset.pressed,f.stopPropagation(),M.dataset.acted=String(Date.now()),v())},key:v=>f=>{let M=f.currentTarget;Date.now()-Number(M.dataset.acted??0)<700||(M.dataset.acted=String(Date.now()),v())}},d=n.states[r.id]?.attributes.supported_features,u=v=>typeof d!="number"||(d&v)!==0,p=this.mediaIntent.get(r.id);p&&(p.playing===r.playing||Date.now()-p.at>3e4)&&this.mediaIntent.delete(r.id);let h=this.mediaIntent.get(r.id)?.playing??r.playing,_=u(16384)||u(1),b=()=>{this.mediaIntent.set(r.id,{playing:!h,at:Date.now()}),this.requestUpdate(),l(h?"media_pause":u(16384)?"media_play":"media_play_pause")},m=this.mediaVolume.get(r.id);m&&(Math.abs(m.v-r.volume)<=2||Date.now()-m.at>3e4)&&this.mediaVolume.delete(r.id);let w=this.mediaVolume.get(r.id)?.v??r.volume,k=(v,f)=>{this.mediaVolume.set(r.id,{v,at:Date.now()}),this.requestUpdate(),(f||Date.now()-this.volumeSent>350)&&(this.volumeSent=Date.now(),l("volume_set",{volume_level:v/100}))};return g`<svg class="fp3d-holo-link" data-holo=${e} hidden aria-hidden="true"><line x1="0" y1="0" x2="0" y2="0" /><circle cx="0" cy="0" r="3" /></svg>
      <div class="fp3d-holo fp3d-holo-dev fp3d-holo-media ${s?"":"fp3d-holo-min"} ${this._low?"fp3d-holo-plain":""}" data-holo=${e} hidden role="group" aria-label=${t.name}>
      <div class="fp3d-holo-sheen"></div>
      <div class="fp3d-holo-scan"></div>
      <div class="fp3d-holo-body">
        <div class="fp3d-holo-head" role="button" tabindex="0" @click=${a}><span>♪ ${t.name}</span><span class="fp3d-holo-live">${h?`\u25CF ${i("holo_media_playing")}`:i("holo_media_paused")}</span></div>
        <div class="fp3d-holo-track">
          ${r.picture?g`<img class="fp3d-holo-cover" src=${r.picture} alt="" />`:g`<span class="fp3d-holo-cover fp3d-holo-cover-none">♪</span>`}
          <div class="fp3d-holo-titles"><b>${r.title}</b>${r.artist?g`<span>${r.artist}</span>`:y}</div>
        </div>
        ${s&&!this.ro?g`<div class="fp3d-holo-media-controls">
                <button aria-label=${i("previous")} ?disabled=${!u(16)} @pointerdown=${c.down} @pointerup=${c.up(()=>l("media_previous_track"))} @click=${c.key(()=>l("media_previous_track"))}>⏮</button>
                <button aria-label=${i("play_pause")} ?disabled=${h?!u(1):!_} @pointerdown=${c.down} @pointerup=${c.up(b)} @click=${c.key(b)}>${h?"\u23F8":"\u25B6"}</button>
                <button aria-label=${i("next")} ?disabled=${!u(32)} @pointerdown=${c.down} @pointerup=${c.up(()=>l("media_next_track"))} @click=${c.key(()=>l("media_next_track"))}>⏭</button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  .value=${String(w)}
                  aria-label=${i("volume")}
                  @input=${v=>k(Number(v.target.value),!1)}
                  @change=${v=>k(Number(v.target.value),!0)}
                />
                <span class="fp3d-holo-vol">${w} %</span>
              </div>`:y}
      </div>
    </div>`}renderDeviceCard(t,e){let n=this.hass,i=c=>E(n,c),r=!this.holoFolded.has(e),s=this.dayOf(t),a=s&&s.curve.length>1?Is(s.curve,s.peak):null,l=()=>{this.holoFolded.has(e)?this.holoFolded.delete(e):this.holoFolded.add(e),this.requestUpdate()};return g`<svg class="fp3d-holo-link" data-holo=${e} hidden aria-hidden="true"><line x1="0" y1="0" x2="0" y2="0" /><circle cx="0" cy="0" r="3" /></svg>
      <div class="fp3d-holo fp3d-holo-dev ${r?"":"fp3d-holo-min"} ${this._low?"fp3d-holo-plain":""}" data-holo=${e} hidden role="button" tabindex="0" aria-label=${t.name} @click=${l}>
      <div class="fp3d-holo-sheen"></div>
      <div class="fp3d-holo-scan"></div>
      <div class="fp3d-holo-body">
        <div class="fp3d-holo-head"><span>⚡ ${t.name}</span><span class="fp3d-holo-live">${this.replay?"\u23EA":`\u25CF ${i("holo_live")}`}</span></div>
        <div class="fp3d-holo-big"><b>${rt(n,t.w??0)}</b><span>${i("holo_dev_now")}</span></div>
        ${r&&s?g`<div class="fp3d-holo-sub">${i("holo_today")} <b>${nt(n,s.kwh,1)} kWh</b> · ${i("holo_peak")} <b>${rt(n,s.peak)}</b></div>`:y}
        ${r&&a?ne`<svg class="fp3d-holo-curve" viewBox="0 0 220 44" width="156" height="30">
              <defs><linearGradient id="fp3dHoloG${e}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#7fe8ff" stop-opacity=".5"/><stop offset="1" stop-color="#7fe8ff" stop-opacity="0"/></linearGradient></defs>
              <path d="${a.area}" fill="url(#fp3dHoloG${e})"/>
              <path d="${a.line}" fill="none" stroke="#a8f0ff" stroke-width="2"/>
              <circle cx="${a.endX}" cy="${a.endY}" r="3.5" fill="#fff" stroke="#7fe8ff" stroke-width="2"/>
              <line x1="0" y1="43.5" x2="220" y2="43.5" stroke="rgba(160,240,255,.35)"/>
            </svg>`:y}
      </div>
    </div>`}dayOf(t){if(!this._rows||!t.dayIds.length)return null;let e=Object.fromEntries(t.dayIds.filter(n=>this._rows[n]).map(n=>[n,this._rows[n]]));return Object.keys(e).length?xu(e,new Date(this.now())):null}renderHoloCard(t,e,n){let i=this.hass,r=m=>E(i,m),s=!this.holoFolded.has(e),a=this.dayOf(t),l=t.kind==="main",c=l&&n.grid!==null&&n.consumption!==null&&n.consumption>0?Math.round(Math.min(100,Math.max(0,(1-Math.max(0,n.grid)/n.consumption)*100))):null,d=a&&a.curve.length>1?Is(a.curve,a.peak):null,u=new Date(this.now()),p=(u.getHours()+u.getMinutes()/60)/24*220,h=()=>{this.holoFolded.has(e)?this.holoFolded.delete(e):this.holoFolded.add(e),this.requestUpdate()},_=l?n.solar??n.consumption??0:t.w??0,b=l?n.battery!==null||n.soc!==null?{soc:n.soc,w:n.battery}:null:t.battery;return g`<svg class="fp3d-holo-link" data-holo=${e} hidden aria-hidden="true"><line x1="0" y1="0" x2="0" y2="0" /><circle cx="0" cy="0" r="3" /></svg>
      <div class="fp3d-holo ${s?"":"fp3d-holo-min"} ${this._low?"fp3d-holo-plain":""}" data-holo=${e} hidden role="button" tabindex="0" aria-label=${t.name} @click=${h}>
      <div class="fp3d-holo-sheen"></div>
      <div class="fp3d-holo-scan"></div>
      <div class="fp3d-holo-body">
        <div class="fp3d-holo-head"><span>☀ ${t.name}</span><span class="fp3d-holo-live">${this.replay?"\u23EA":`\u25CF ${r("holo_live")}`}</span></div>
        <div class="fp3d-holo-big"><b>${rt(i,_)}</b><span>${r(l&&n.solar===null?"holo_house_now":"holo_pv_now")}</span></div>
        ${s?g`${l&&this._plants.length>1?g`<div class="fp3d-holo-plants">${this._plants.map(m=>g`<span>${m.name}</span><b>${rt(i,m.w)}</b>`)}</div>`:y}
              ${a?g`<div class="fp3d-holo-sub">${r("holo_today")} <b>${nt(i,a.kwh,1)} kWh</b> · ${r("holo_peak")} <b>${rt(i,a.peak)}</b></div>`:y}
              ${d?ne`<svg class="fp3d-holo-curve" viewBox="0 0 220 44" width="208" height="38">
                    <defs><linearGradient id="fp3dHoloG${e}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#ffd75a" stop-opacity=".5"/><stop offset="1" stop-color="#ffd75a" stop-opacity="0"/></linearGradient></defs>
                    <path d="${d.area}" fill="url(#fp3dHoloG${e})"/>
                    <path d="${d.line}" fill="none" stroke="#ffe27a" stroke-width="2"/>
                    <circle cx="${d.endX}" cy="${d.endY}" r="3.5" fill="#fff" stroke="#ffd75a" stroke-width="2"/>
                    <line x1="0" y1="43.5" x2="220" y2="43.5" stroke="rgba(160,240,255,.35)"/>
                    <line x1="${p}" y1="2" x2="${p}" y2="43" stroke="rgba(160,240,255,.18)" stroke-dasharray="2 3"/>
                  </svg>`:y}
              <div class="fp3d-holo-grid">
                ${b?g`<div class="fp3d-holo-cell fp3d-holo-bat">
                      ${r("holo_battery")}<br /><b>${b.soc!==null?`${Math.round(b.soc)} %`:rt(i,Math.abs(b.w??0))}</b>
                      ${b.w!==null&&Math.abs(b.w)>=5?g`<span>${b.w<0?"\u25B2":"\u25BC"} ${rt(i,Math.abs(b.w))}</span>`:y}
                    </div>`:y}
                ${l&&n.grid!==null?g`<div class="fp3d-holo-cell ${n.grid<-5?"fp3d-holo-exp":"fp3d-holo-imp"}">
                      ${r("holo_grid")}<br /><b>${rt(i,Math.abs(n.grid))}</b> <span>${Math.abs(n.grid)<5?"":r(n.grid<0?"energy_grid_export":"energy_grid_import")}</span>
                    </div>`:y}
                ${l&&n.consumption!==null?g`<div class="fp3d-holo-cell fp3d-holo-house">${r("holo_house")}<br /><b>${rt(i,n.consumption)}</b></div>`:y}
                ${l&&this._wallboxW!==null?g`<div class="fp3d-holo-cell fp3d-holo-wb">${r("holo_wallbox")}<br /><b>${rt(i,this._wallboxW)}</b></div>`:y}
              </div>
              ${l&&this._meters&&(this._meters.gas!==null||this._meters.water!==null)?g`<div class="fp3d-holo-sub fp3d-holo-meters">
                    ${this._meters.gas!==null?g`<span>🔥 ${r("holo_gas")} <b>${nt(i,this._meters.gas,this._meters.gas<10?2:1)} ${Dp(i,this.building?.energy.gas)}</b></span>`:y}
                    ${this._meters.water!==null?g`<span>💧 ${r("holo_water")} <b>${jg(i,this._meters.water,Dp(i,this.building?.energy.water))}</b></span>`:y}
                    <span>${r("holo_today_short")}</span>
                  </div>`:y}
              ${c!==null?g`<div class="fp3d-holo-bar"><div style="width:${c}%"></div></div>
                    <div class="fp3d-holo-foot"><span>${r("holo_autarky")}</span><b>${c} %</b></div>`:y}`:y}
      </div>
    </div>`}setAlerts(t){let e=t.map(s=>`${s.kind}:${s.entity}`),n=this.ro?[]:t.filter((s,a)=>!this.seenAlerts.has(e[a]));this.ro||(this.seenAlerts=new Set(e)),e.join()!==this._alerts.map(s=>`${s.kind}:${s.entity}`).join()&&(this._alerts=t);let i=t.some(s=>!s.quiet);if(i&&!this.alertTimer&&!this.ro&&(this.alertTimer=setInterval(()=>!document.hidden&&this.applyTint(),this._low?200:100)),(!i||this.ro)&&this.alertTimer&&(clearInterval(this.alertTimer),this.alertTimer=void 0),!n.length)return;let r=this.directorSettings();if(r?.alerts){let s=n[0];if(this.directing.offer({kind:"alert",key:`alert:${s.kind}:${s.entity}`,entity:s.entity},Date.now(),r.hold??Vi)){this.directorShow(()=>this.jumpTo(s));return}}this.alertJump&&this.jumpTo(n[0])}directorSettings(){let t=this.building?.settings.director;return this.director&&!this.ro&&G("camera_cockpit")&&Ap(t)?t:null}direct(){let t=this.directorSettings(),e=this.hass,n=this.building;if(!t||!e||!n){this.directorSrc&&(this.directing=new bo,this.directorSrc=null,clearTimeout(this.directorTimer),clearTimeout(this.restTimer),this.directorBack=null);return}let i=Date.now(),r=t.hold??Vi,s=`${JSON.stringify(t)}|${n.floors.map(c=>c.placements.length).join()}`;if(!this.directorSrc||this.directorSrc.registry!==e.entities||this.directorSrc.building!==n||this.directorSrc.sig!==s){let c=[...new Set(n.floors.flatMap(u=>u.placements.map(p=>p.entity_id)))],d=t.motion??"off";this.directorSrc={registry:e.entities,building:n,sig:s,bells:(t.doorbell?zp(e,t.doorbell_entity):[]).map(u=>({id:u,camera:Cp(e,u,c,t.doorbell_camera)})),motion:d==="off"?[]:c.filter(u=>u.startsWith("camera.")).flatMap(u=>Ut(e,u).filter(p=>d==="all"||io(e,p)==="person").map(p=>({sensor:p,cam:u})))}}let a=[];for(let c of this.directorSrc.bells)this.directing.edge(c.id,e.states[c.id],(d,u)=>ra(d,u,i))&&a.push({kind:"doorbell",key:`bell:${c.id}`,entity:c.id,camera:c.camera});for(let c of t.triggers??[])c.entity&&this.directing.edge(`trigger:${c.entity}`,e.states[c.entity],(d,u)=>Fp(d,u,i))&&a.push({kind:"trigger",key:`trigger:${c.entity}`,entity:c.entity,camera:c.camera});for(let c of this.directorSrc.motion)this.directing.edge(c.sensor,e.states[c.sensor],(d,u)=>d?.state==="off"&&u?.state==="on")&&a.push({kind:"motion",key:`cam:${c.cam}`,entity:c.sensor,camera:c.cam});if(t.appliances){for(let[c,d]of this.appliances)this.directing.stopped(`app:${c}`,d.running,i)&&a.push({kind:"appliance",key:`app:${c}`,entity:c});clearTimeout(this.restTimer),this.directing.resting()&&(this.restTimer=setTimeout(()=>this.direct(),6e4))}let l=["doorbell","trigger","motion","appliance"];a.sort((c,d)=>l.indexOf(c.kind)-l.indexOf(d.kind));for(let c of a)if(this.directing.offer(c,i,r)){this.directorShow(()=>this.directorGo(c));break}}directorShow(t){let e=this.viewer;if(!e)return;this.directorBack||(this.directorBack={floorId:this.floorId,roomId:this.roomId,view:e.getView()}),e.setAutoOrbit(0),t(),clearTimeout(this.directorTimer);let n=this.directing.current;n&&(this.directorTimer=setTimeout(()=>this.directorDue(),Math.max(0,n.until-Date.now())+50))}directorGo(t){let e=this.building;if(e){if(t.camera&&e.floors.some(n=>n.placements.some(i=>i.entity_id===t.camera))){let n=t.camera;this.roomId?(this.fire("room-tap",{floorId:this.floorId,roomId:this.roomId}),setTimeout(()=>this.lookThrough(n),250)):this.lookThrough(n);return}if(t.kind==="appliance"){let n=this.appliances.get(t.key.slice(4));n&&this.goTo({kind:"device",name:"",where:"",floorId:n.floorId,roomId:null,entity:n.entity,icon:null,x:n.x,z:n.z,y:1});return}this.showEntity(t.entity)}}directorDue(){let t=this.directing.due(Date.now()),e=this.directorBack;t&&(this.directorBack=null,!(!t.back||!e)&&(this._through&&(this._through=null),this.floorId!==e.floorId&&this.fire("floor-tap",{floorId:e.floorId}),e.roomId?setTimeout(()=>this.fire("room-tap",{floorId:e.floorId,roomId:e.roomId}),60):this.roomId&&e.floorId&&setTimeout(()=>this.fire("room-tap",{floorId:e.floorId,roomId:null}),60),setTimeout(()=>{this.viewer?.flyTo(e.view),this.viewer?.setAutoOrbit(this.autoOrbit?.06:0)},400)))}jumpTo(t){if(!t.floorId){this.fire("floor-tap",{floorId:null});return}this.floorId!==t.floorId&&this.fire("floor-tap",{floorId:t.floorId}),t.roomId&&setTimeout(()=>this.fire("room-tap",{floorId:t.floorId,roomId:t.roomId}),60)}onRoomDoubleTap(t,e){let n=this.building,i=this.hass,r=n?.floors.find(d=>d.id===t),s=r?ot(r).find(d=>d.id===e):void 0;if(!n||!i||!r||!s||this.ro)return;let a=new Set(wt(i,s.area_id).filter(d=>L(d)==="light"));for(let d of r.placements)L(d.entity_id)==="light"&&W([d.x,d.z],s.points)&&a.add(d.entity_id);for(let d of r.furniture){let u=this.furnitureLinks.get(d.id)?.entity;u&&Bn(d.type)&&W([d.x,d.z],s.points)&&a.add(u)}let l=[...a].filter(d=>!this.confirmSet.has(d));if(!l.length)return;let c=l.some(d=>i.states[d]?.state==="on");i.callService("homeassistant",c?"turn_off":"turn_on",{entity_id:l}),this.roomFlash={roomId:e,until:performance.now()+350},this.applyTint(),setTimeout(()=>{this.roomFlash=null,this.applyTint()},380)}runScene(t){this.ro||(this.hass.callService(t.split(".")[0],"turn_on",{entity_id:t}),this._sceneFired=t,setTimeout(()=>this._sceneFired=null,600))}applyTint(){let t=this.viewer,e=this.building,n=this.hass;if(!t||!e||!n)return;let i=null;if(this.heatMode!=="none"&&this.heatMode!=="values"){let a=this.heatMode,l=Eu(n,e,a);!l.size!=!this.heatValues.size&&this.requestUpdate(),this.heatValues=l,i=new Map([...l].map(([c,d])=>[c,Tu(a,d)]))}let r=new Map;if(this.heatMode==="values")for(let a of e.floors)for(let l of ot(a)){let c=Vt(n,a,l,"temperature"),d=Vt(n,a,l,"humidity"),u=Vt(n,a,l,"co2"),p=[c!==null?`${nt(n,we(n,c),1)} ${Lt(n)}`:null,d!==null?`${nt(n,d,0)} %`:null,u!==null?`${nt(n,u,0)} ppm`:null].filter(h=>!!h);p.length&&r.set(l.id,p.join(" \xB7 "))}if(t.setRoomInfo(r),this._alerts.length){i??=new Map;let a=this.ro?1:.55+.45*Math.sin(performance.now()/160);for(let l of this._alerts){if(l.quiet)continue;let c=Dd(l).map(d=>d*a);if(l.roomId)i.set(l.roomId,c);else for(let d of e.floors)if(!l.floorId||d.id===l.floorId)for(let u of d.rooms)i.set(u.id,c)}}this.roomFlash&&performance.now()<this.roomFlash.until&&(i??=new Map,i.set(this.roomFlash.roomId,[.9,.95,1]));let s=i?[...i].map(([a,l])=>`${a}:${l.map(c=>c.toFixed(2)).join(",")}`).join(";"):"";s!==this.tintSig&&(this.tintSig=s,t.setRoomTint(i))}furnitureMarkers(t,e,n,i){let r=[],s=[],a=new Map,l=new Map,c=new Set(n),d=G("household"),u=[];this.binHolos=[];let p=new Map(this.scene.filter(v=>v.kind==="glow").map(v=>[v.furnitureId,v]));for(let v of e.floors)for(let f of v.furniture){let M=this.furnitureLinks.get(f.id),x=this.stateFaces(t,f);if(x.length&&a.set(f.id,{color:x[0].color,level:x[0].level,faces:x}),Bn(f.type)){let q=this.lampMarker(t,v,f,M?.entity??null);r.push(q);let it=(f.type==="lamp_fan"||br(vt(f.type)))&&f.fan&&f.fan!=="none"?f.fan:null;if(it&&!n.has(it)){n.add(it);let ht=t.states[it],qt=f.rotation*Math.PI/180,te=Math.min(.45,f.w*.3);r.push({id:it,floorId:v.id,roomId:q.roomId,x:f.x+Math.cos(qt)*te,z:f.z+Math.sin(qt)*te,y:q.y,icon:f.icon?Jt(f.icon):je("fan"),name:B(t,it),text:ht&&jo(ht)>0&&typeof ht.attributes.percentage=="number"?`${Math.round(ht.attributes.percentage)} %`:ht?_t(t,ht):"",active:ht?At(ht):!1,unavailable:ht?Q(ht):!1,glow:null,furnitureId:f.id,show:f.marker??"always",fromFurniture:!0})}continue}if(Ul.has(f.type)){let q=this.techItem(t,v,f,a,n);q&&(r.push(q),l.set(f.id,q.id));continue}if(Bl.has(f.type)){let q=this.gangItem(t,v,f,s,a,i);q&&(r.push(q),l.set(f.id,q.id));continue}let I=p.get(f.id);I&&a.set(f.id,{color:I.color,level:I.level});let T=(f.type==="plant"||as(f.type))&&!!f.moisture&&f.moisture!=="none";if(f.type==="waste_bin"||f.type==="mailbox"||T){let q=d?this.householdState(t,v,f):null;q?.screen&&a.set(f.id,q.screen),q?.marker&&r.push(q.marker);let it=f.type==="waste_bin"?f.bin_source:f.type==="mailbox"?f.entity:f.moisture;if(d&&typeof it=="string"&&it!=="none"&&l.set(f.id,`hh:${it}#${f.id}`),q?.item&&u.push(q.item),!T)continue}if(d){let q=Cd(f,t);q.length&&!a.has(f.id)&&a.set(f.id,{color:[1,.8,.2],level:.8,faces:[{part:"top",color:[1,.8,.2],level:.8}]});for(let it of q){let ht=f.name||kt(t,f.type);u.push({icon:"wrench-outline",text:it===f.service?E(t,"hh_service",{name:ht}):E(t,"hh_service2",{name:ht,what:B(t,it)}),entity:it})}(f.type==="fridge"||f.type==="fridge_smart")&&ni(f,t)&&(a.set(f.id,{color:[.45,.85,1],level:1,faces:[{part:"band",color:[.45,.85,1],level:1}]}),u.push({icon:"fridge-alert-outline",text:E(t,"hh_fridge_open",{name:f.name||kt(t,f.type)}),entity:Me(f)[0]??null}))}let R=f.type==="parking"&&G("auto_pro")&&!!f.car?Jn(t,f):null,$=Ad(f.type),P=!!$,O=f.type==="home_battery"?f.soc:f.type==="wallbox"?f.status:f.type==="parking"&&R?f.car?.device??R.entities.soc:d&&P?f.remaining??null:null,H=O&&O!=="none"?O:null,C=f.extra&&f.extra!=="none"&&t.states[f.extra]?f.extra:null,j=C?_t(t,t.states[C]):"",Y=q=>j?q?`${q} \xB7 ${j}`:j:q,F=M??(H||C?{entity:null,power:null}:void 0);if(!F)continue;let U=f.type==="home_battery"?H??F.entity??F.power:F.entity??F.power??H??C;l.set(f.id,U);let D=F.entity?t.states[F.entity]:void 0,Z=f.type==="meter"?e.energy.grid_invert&&!f.export:f.type==="home_battery"?e.energy.battery_invert&&!f.charge:!1,X=F.power?dt(t.states[F.power],Z):null,pt=f.type==="home_battery"&&f.charge&&f.charge!=="none"?f.charge:f.type==="meter"&&f.export&&f.export!=="none"?f.export:null,yt=pt?dt(t.states[pt]):null;yt!==null&&(X=Math.max(0,X??0)-Math.max(0,yt)),F.power&&X!==null&&!i.has(F.power)&&(i.add(F.power),s.push({id:U,powerEntity:F.power,floorId:v.id,x:f.x,z:f.z,power:Math.max(0,X),wallbox:f.type==="wallbox"||void 0}));let Ft=typeof f.run_w=="number"&&f.run_w>0?f.run_w:10,he=typeof f.run_w=="number"&&f.run_w>0&&X!==null&&X<=f.run_w,En=!!F.entity&&/^(switch|input_boolean)\./.test(F.entity)&&X!==null,fe=(X??0)>Ft||!En&&(D?.state==="on"||D?.state==="running"||Rr(D)&&At(D));P&&this.appliances.set(f.id,{floorId:v.id,x:f.x,z:f.z,entity:F.entity??F.power??f.id,running:fe});let Dt=null;if(d&&P){let q=f.remaining&&f.remaining!=="none"?t.states[f.remaining]:void 0,it=ps(q),ht=fe||!F.power&&!F.entity&&(it??0)>0,qt=Me(f),te=Ze=>qt.some(ko=>{let tn=t.states[ko];return!!tn?.last_changed&&Date.parse(tn.last_changed)>Ze}),yo=this.finished.update(f.id,ht,te),xo=f.name||(F.entity?B(t,F.entity):kt(t,f.type));ht?(fe||a.set(f.id,Up($)),it!==null&&!fs(D,F.power?X:null,Ft)&&(Dt=E(t,"hh_left",{t:Fd(it)}),u.push({icon:"timer-outline",text:`${xo}: ${Dt}`,entity:f.remaining??F.entity}))):(hs(D)||hs(q)||yo)&&(Dt=E(t,"hh_done"),a.set(f.id,{color:[.35,1,.55],level:.9,faces:[{part:"top",color:[.35,1,.55],level:.9}]}),u.push({icon:"check-circle-outline",text:E(t,"hh_finished",{name:xo}),entity:F.entity??F.power}))}if(R&&Pn(t,f)){let q=[];if(R.soc!==null){let it=R.soc>=50?[.3,1,.5]:R.soc>=20?[1,.8,.25]:[1,.3,.25];q.push({part:"band",color:it,level:R.charging?1:.6})}if(R.locked===!1&&q.push({part:"lights",color:[1,.42,.02],level:1}),R.climateOn){let it=R.entities.climate?t.states[R.entities.climate]:void 0,ht=!!it&&(it.attributes.hvac_action==="cooling"||it.state==="cool");q.push({part:"cabin",color:ht?[.45,.8,1]:[1,.55,.22],level:.35})}q.length&&a.set(`${f.id}:vehicle`,{color:q[0].color,level:q[0].level,faces:q})}if(f.type==="radiator"&&(D&&L(D.entity_id)==="climate"||f.heat_sensor)){let q=D&&L(D.entity_id)==="climate"?D.attributes:null;if(cc(t,f.heat_sensor)??q?.hvac_action==="heating"){let ht=q&&typeof q.temperature=="number"&&typeof q.current_temperature=="number"?q.temperature-q.current_temperature:1;a.set(f.id,{color:[1,.42,.1],level:Math.min(1,.45+.25*Math.max(0,ht))})}else p.has(f.id)&&a.delete(f.id)}else if(f.type==="ac_unit"&&D&&L(D.entity_id)==="climate"){let q=pc(D);q&&a.set(f.id,q)}else if($&&fe)a.set(f.id,Up($));else if(f.type==="stove"||gr(f.type)){let q=uc(D,fe);q>0&&a.set(f.id,{color:[1,.05,.01],level:q,faces:[{part:"burners",color:[1,.05,.01],level:q}]})}let Xe=vt(f.type),vo=!!Xe&&!Xe.light&&Xe.parts.some(q=>q.glow);if(D&&vo&&G("sound")&&L(D.entity_id)==="media"&&D.state==="playing"&&!Uo(f.type)){let q=typeof D.attributes.volume_level=="number"?D.attributes.volume_level:.5;a.set(f.id,{color:Dr(D)??[.22,.88,1],level:.5+.5*q,ring:!0,plain:!0})}if(D&&Uo(f.type)&&!gr(f.type)&&!(zo(f.type)&&L(D.entity_id)==="cover")){let q=G("screens"),it=L(D.entity_id)==="light"?re(D):null,ht=L(D.entity_id)==="media"&&["playing","on","paused","idle"].includes(D.state),qt=q&&L(D.entity_id)==="media"?Dr(D):it?it.color:At(D)||ht?[.22,.88,1]:null,te=q&&L(D.entity_id)==="media"?D.attributes.entity_picture??null:null;qt&&a.set(f.id,{color:qt,level:D.state==="playing"?1:.6,picture:te,ring:vo&&G("sound")&&D.state==="playing"})}if(D&&!x.length&&Xe?.family==="towel_radiator"&&At(D)&&a.set(f.id,{color:[1,.55,.25],level:.85,faces:[{part:"all",color:[1,.55,.25],level:.85}]}),c.has(U))continue;n.add(U);let Rn=F.entity?L(F.entity):null,wo=v.rooms.find(q=>q.points.length>=3&&W([f.x,f.z],q.points)),Et=D&&$l(f.type)&&D.entity_id.startsWith("water_heater.")?nb(t,D):null;r.push({id:U,floorId:v.id,roomId:wo?.id??null,x:f.x,z:f.z,y:ib(f)+mt(v,f),icon:f.icon?Jt(f.icon):Et?Jt("water-boiler"):je(Rn??"switch"),name:f.name||(F.entity?B(t,F.entity):kt(t,f.type)),ownName:f.name||void 0,showName:!!f.show_name,text:Y(Dt??(R?this.carText(t,R,!!D&&!Ti.has(D.state.toLowerCase())):f.type==="home_battery"?this.batteryText(t,H,X):f.type==="wallbox"?this.wallboxText(t,H,X):f.type==="meter"?this.meterText(t,X):Et?Et.text:D&&!En?_t(t,D):he?E(t,"pin_standby"):X!==null?rt(t,Math.max(0,X)):"")),active:Dt?!0:R?R.charging:Et?Et.on:D&&!En?At(D):(X??0)>(typeof f.run_w=="number"&&f.run_w>0?f.run_w:5),unavailable:D?Q(D):!1,glow:null,furnitureId:f.id,energyDevice:f.type==="inverter"||f.type==="home_battery"||f.type==="wallbox"||f.type==="meter"||!!R||!!C,...he?{standby:he}:{},show:f.marker??(R||Dt?"always":void 0),fromFurniture:!0})}let h=e.settings.household;if(h?.bin_next_only||typeof h?.bin_days=="number"){let v=Pd(this.binHolos.filter(f=>!f.icon),{nextOnly:h.bin_next_only,ahead:h.bin_days});this.binHolos=this.binHolos.filter(f=>f.icon||v.has(f.id))}let _=e.settings.household?.notes,b=_&&_!=="none"?t.states[_]:void 0;if(d&&b&&!Q(b)&&b.state.trim()){let v=b.state.split(/\s*(?:\||\n|;)\s*/).map(f=>f.trim()).filter(Boolean).slice(0,8);u.unshift(...v.map(f=>({icon:"pin-outline",text:f,entity:_})))}if(d&&this.dayEvents.length){let v=u.findIndex(f=>f.icon!=="pin-outline");u.splice(v<0?u.length:v,0,...$d(this.dayEvents,new Date,t.language))}this._household=u.filter((v,f)=>u.findIndex(M=>M.text===v.text)===f),this.cameraScreens=0;let m=Cr(t,e.floors),w=G("screens");for(let v of e.floors)for(let f of v.furniture){if(!w||!f.pictures?.length||!Uo(f.type)||f.type==="fridge_smart"&&m.get(f.id)?.right)continue;let M=f.pictures.find(T=>vc(t,T));if(!M)continue;let x=this.pictureUrl(M.image),I=f.screen_bg==="white"?[.92,.94,1]:[.08,.08,.1];x&&a.set(f.id,{color:I,level:1,picture:x,plain:!0})}for(let v of e.floors)for(let f of v.furniture){if(f.type!=="neon_sign")continue;let M=this.furnitureLinks.get(f.id)?.entity??null,x=su(f,M?t.states[M]:void 0,!!M),I=au(ru(f.sign_text),x.color,x.on,x.level,Math.max(.05,f.w)/Math.max(.05,f.h));a.set(f.id,{color:[.015,.015,.03],level:1,picture:I,plain:!0})}let k=new Map;for(let v of e.floors)for(let f of v.furniture){if(!br(vt(f.type)))continue;let M=f.fan&&f.fan!=="none"?f.fan:this.furnitureLinks.get(f.id)?.entity??null,x=M?t.states[M]:void 0,I=M?.split(".")[0];k.set(f.id,I==="fan"?jo(x):I!=="light"&&x&&At(x)?.6:0)}this.viewer?.setSpinSpeeds(k),this.viewer?.setLiveStates(t.states,v=>this.furnitureLinks.get(v)?.entity??null);for(let v of p.values())v.top?a.set(v.furnitureId,{color:v.color,level:v.level,faces:[{part:"strata",color:v.color,top:v.top,level:v.level}]}):v.plate?a.set(v.furnitureId,{color:v.color,level:v.level,faces:[{part:"plate",color:v.color,level:v.level}]}):v.band&&a.set(v.furnitureId,{color:v.color,level:v.level,faces:[{part:"band",color:v.color,level:v.level}]});for(let v of this.scene)v.kind==="screen"&&(a.set(v.furnitureId,{color:v.color??[.06,.08,.14],level:v.level??1,picture:v.picture,plain:!0}),v.popup&&l.set(v.furnitureId,`popup:${v.popup}`));return this.watchCameras(this.cameraScreens>0||!!this._through||this.cameraWall||this.projecting),{markers:r,consumers:s,screens:a,targets:l}}watchHousehold(t,e){let n=e.floors.flatMap(c=>c.furniture).filter(c=>c.type==="waste_bin"||c.type==="mailbox"),i=(e.settings.household?.calendars??[]).filter(c=>typeof c=="string"&&c.startsWith("calendar.")),r=G("household")&&(n.length>0||i.length>0)&&!this.replay,s=r?yd(e.floors):[],a=`${s.join(",")}|${i.join(",")}`;if(!r){clearInterval(this.householdTimer),this.householdTimer=void 0,this.pickupKey="",this.dayEvents=[];return}let l=async c=>{let[d,u]=await Promise.all([s.length?xd(c,s):null,i.length?kd(c,i):null]);d&&(this.pickups=d),this.dayEvents=u??[],this.syncDevices(!0)};(a!==this.pickupKey||!this.householdTimer)&&(this.pickupKey=a,clearInterval(this.householdTimer),this.householdTimer=setInterval(()=>!document.hidden&&void l(this.hass??t),6e5),s.length||i.length?l(t):this.dayEvents=[])}gangItem(t,e,n,i,r,s){let a=Un(n),l=n.type==="wall_socket",c=[],d=0,u=0,p=null,h=!1;if(a.forEach((f,M)=>{let x=f.entity&&f.entity!=="none"?f.entity:null,I=f.power&&f.power!=="none"?f.power:null;if(!x&&!I)return;u++;let T=x?t.states[x]:void 0,z=I?dt(t.states[I]):null;if(I&&z!==null&&(p=(p??0)+Math.max(0,z),s.has(I)||(s.add(I),i.push({id:x??I,powerEntity:I,floorId:e.id,x:n.x,z:n.z,power:Math.max(0,z)}))),T&&!Q(T)&&(h=!0),!(T?At(T):(z??0)>5))return;d++;let $=T&&L(T.entity_id)==="light"?re(T):null;if(!l){c.push({part:"gang",index:M,of:a.length,color:$?$.color:[.22,.88,1],level:.5,accent:!$});return}let P=$?$.color:[.35,1,.55];c.push({part:"gang",index:M,of:a.length,color:P,level:z!==null?Math.min(1,.55+z/1500):.8})}),c.length&&r.set(n.id,{color:c[0].color,level:c[0].level,faces:c}),!u)return null;let _=No(n),b=_[0]??null,m=b?t.states[b]:void 0,w=e.rooms.find(f=>f.points.length>=3&&W([n.x,n.z],f.points)),k=p,v=Ec(this.floorWalls(e),n,e.height,mt(e,n));return{id:`gangs:${n.id}`,floorId:e.id,roomId:w?.id??null,x:v.x,z:v.z,y:n.h+.2+v.y,icon:Jt(n.icon||(l?"power-socket-de":"light-switch")),name:n.name||(_.length===1&&b?B(t,b):kt(t,n.type)),ownName:n.name||void 0,showName:!!n.show_name,text:u>1?`${d}/${u}${k!==null?` \xB7 ${rt(t,k)}`:""}`:k!==null?rt(t,k):m?_t(t,m):"",active:d>0,unavailable:!!b&&!h,glow:null,power:k??void 0,furnitureId:n.id,show:n.marker??void 0,fromFurniture:!0}}techItem(t,e,n,i,r){let s=x=>typeof x=="string"&&x!=="none"?x:null,a=s(n.entity),l=a?t.states[a]:void 0,c=e.rooms.find(x=>x.points.length>=3&&W([n.x,n.z],x.points)),d={floorId:e.id,roomId:c?.id??null,x:n.x,z:n.z,ownName:n.name||void 0,showName:!!n.show_name,glow:null,furnitureId:n.id,fromFurniture:!0};if(n.type==="wifi_ap"){let x=s(n.clients),I=x?t.states[x]:void 0,T=I&&Number.isFinite(Number(I.state))?Math.round(Number(I.state)):null,z=a?Nr(l):I?Nr(I):null;if(z!==null){let $=z?[.25,.6,1]:[1,.25,.2];i.set(n.id,{color:$,level:.85,faces:[{part:"apring",color:$,level:.85}]})}let R=a??x;return!R||r.has(R)?null:(r.add(R),{...d,id:R,y:mt(e,n)-(n.variant==="wall"?-n.h-.2:.3),icon:Jt(n.icon||"access-point"),name:n.name||B(t,R),text:z===!1?E(t,"ap_offline"):T!==null?E(t,"ap_clients",{n:T}):l?_t(t,l):"",active:z===!0,unavailable:z===!1,show:n.marker??(z===!1?"always":void 0),energyDevice:T!==null})}let u=l?L(l.entity_id):null,p=s(n.power),h=p?dt(t.states[p]):null,_=typeof n.run_w=="number"&&n.run_w>0?n.run_w:30,b=l?.attributes.hvac_action==="heating"||u==="switch"&&l?.state==="on"||(h??0)>_;(b||l&&!["off","unavailable","unknown"].includes(l.state))&&i.set(n.id,{color:[1,.45,.15],level:b?.9:.3,faces:[{part:"band",color:[1,.45,.15],level:b?.9:.3}]});let w=s(n.water_temp),k=w?t.states[w]:void 0,v=k&&Number.isFinite(Number(k.state))?Number(k.state):typeof l?.attributes.current_temperature=="number"?l.attributes.current_temperature:null,f=k?.attributes.unit_of_measurement??"\xB0C",M=a??w??p;return!M||r.has(M)?null:(r.add(M),{...d,id:M,y:mt(e,n)+n.h+.25,icon:Jt(n.icon||"water-boiler"),name:n.name||(a?B(t,a):kt(t,n.type)),text:v!==null?`${nt(t,Math.round(v))} ${f}${b?" \xB7 \u{1F525}":""}`:l?_t(t,l):"",active:b,unavailable:l?Q(l):!1,power:h??void 0,show:n.marker??void 0,energyDevice:v!==null})}floorWalls(t){let e=this.wallCache.get(t);if(!e){let n=this.building?.settings;e=ye(t.rooms,{exterior:n?.wall_exterior??.24,interior:n?.wall_interior??.12},t.walls??[]).walls,this.wallCache.set(t,e)}return e}wallCache=new WeakMap;renderGangMenu(){let t=this._gangMenu,e=this.hass,n=t&&this.building?.floors.flatMap(s=>s.furniture).find(s=>s.id===t.furnitureId);if(!t||!e||!n)return y;let i=n.type==="wall_socket";return g`<div class="fp3d-menu-backdrop" @click=${()=>this._gangMenu=null}></div>
      <div class="fp3d-swipe fp3d-info fp3d-gang-menu" style="left:${t.x}px;top:${t.y}px">
        <span>${n.name||kt(e,n.type)}</span>
        ${Un(n).map((s,a)=>{let l=s.entity&&s.entity!=="none"?s.entity:null,c=l?e.states[l]:void 0,d=s.power&&s.power!=="none"?dt(e.states[s.power]):null,u=`${i?"\u{1F50C}":"\u25AD"} ${a+1} \xB7 ${l?B(e,l):"\u2013"}`;return g`<button class="fp3d-chip ${c&&At(c)?"fp3d-gang-on":""}" ?disabled=${!l||(c?Q(c):!0)}
            @click=${()=>{l&&(this.confirmSet.has(l)&&!confirm(E(e,"confirm_switch",{name:B(e,l)}))||ui(e,l))}}>${u}${c?g` <small>${_t(e,c)}${d!==null?` \xB7 ${rt(e,Math.max(0,d))}`:""}</small>`:y}</button>`})}
      </div>`}householdState(t,e,n){let i=l=>{let c=parseInt(l.slice(1),16);return[(c>>16&255)/255,(c>>8&255)/255,(c&255)/255]};if(n.type==="waste_bin"){let l=typeof n.bin_source=="string"&&n.bin_source!=="none"?n.bin_source:null;if(!l)return null;let c=cs(n,t,this.pickups,new Date,{from:this.building?.settings.household?.bin_from,until:this.building?.settings.household?.bin_until});if(!c)return null;let d=c.days===0?E(t,"bin_today"):c.days===1?E(t,"bin_tomorrow"):E(t,"bin_in_days",{n:c.days}),u=i(wd(n)[1]),p=Math.max(...u),_=p-Math.min(...u)<.12?[.92,.95,1]:u.map(v=>Math.min(1,v/Math.max(.001,p)*1.05)),b=n.name||E(t,`bin_kind_${n.bin_kind??"rest"}`),m=ds(n,t),w=`#${_.map(v=>Math.round(v*255).toString(16).padStart(2,"0")).join("")}`,k=m?E(t,"bin_out_done"):d;return this.binHolos.push({id:n.id,floorId:e.id,x:n.x,z:n.z,y:mt(e,n)+n.h,r:Math.max(n.w,n.d)/2,name:b,color:w,when:k,soon:c.days<=1&&!m,days:c.days,out:m}),{item:c.days<=1?{icon:m?"check-circle-outline":"trash-can-outline",text:`${b}: ${k}`,entity:l,hot:c.glow&&!m}:void 0}}if(n.type!=="mailbox"){let l=us(n,t),c=[1,.55,.12],d=n.name||kt(t,n.type);return l?(this.binHolos.push({id:n.id,floorId:e.id,x:n.x,z:n.z,y:mt(e,n)+n.h,r:Math.max(n.w,n.d)/2,name:d,color:"#ff8c1f",when:E(t,"hh_thirsty"),soon:!0,days:-1,icon:"plant"}),{screen:{color:c,level:.9,faces:[{part:"band",color:c,level:.9}]},item:{icon:"watering-can-outline",text:E(t,"hh_plant",{name:d}),entity:n.moisture??null,hot:!0}}):null}let r=typeof n.entity=="string"&&n.entity!=="none"?n.entity:null;if(!r)return null;let s=Ed(n,t),a=[1,.62,.15];return s&&this.binHolos.push({id:n.id,floorId:e.id,x:n.x,z:n.z,y:mt(e,n)+n.h,r:Math.max(n.w,n.d)/2,name:n.name||kt(t,n.type),color:"#ffb547",when:E(t,"mailbox_post"),soon:!0,days:-1,icon:"mail"}),{screen:s?{color:a,level:1,faces:[{part:"top",color:a,level:1},{part:"band",color:a,level:.8}]}:void 0,item:s?{icon:"email-alert-outline",text:n.name?`${n.name}: ${E(t,"mailbox_post")}`:E(t,"mailbox_post"),entity:r,hot:!0}:void 0}}robotPaths(t,e){let n=this.replay;if(!n)return[];let i=[];for(let r of e.floors){let s=r.rooms.filter(a=>a.points.length>=3);for(let a of r.furniture){if(!He(a.type))continue;let l=this.furnitureLinks?.get(a.id)?.entity??null;if(!l)continue;let c=n.robotRooms(l,Xn(t,l,a.room_sensor)),d=[];for(let u of c){let p=Lr(t,s,u),h=p?Rt(p.points):null,_=d[d.length-1];h&&(!_||_[0]!==h[0]||_[1]!==h[1])&&d.push([h[0],h[1]])}d.length&&i.push({floorId:r.id,points:d})}}return i}trailNow(t,e){let n=this.now(),i=ho(t,e),r=this.replay?this.replay.rows(i.map(a=>a.entity),n-po,n):this.trailRows,s=i.map(a=>{let l=t.states[a.entity];return{entity:a.entity,state:l?.state,lastChanged:l?.last_changed?Date.parse(l.last_changed):void 0}});return Bu(i,Wu(r,s,n),n)}watchTrail(){if(clearInterval(this.trailTimer),this.trailTimer=void 0,!this.trail||this.replay){this.trailRows={},this.syncDevices(!0);return}let t=async()=>{let e=this.hass,n=this.building;if(!e||!n||document.hidden)return;let i=ho(e,n).map(r=>r.entity);if(i.length){try{let r=await e.callWS({type:"history/history_during_period",start_time:new Date(Date.now()-po).toISOString(),entity_ids:i,minimal_response:!0,no_attributes:!0,significant_changes_only:!1});this.trailRows=r??{}}catch{this.trailRows={}}this.syncDevices(!0)}};t(),this.trailTimer=setInterval(()=>{t()},6e4)}projecting=!1;projectedCameras(t,e){let n=[];if(ud()){let i=new Set(e.floors.flatMap(r=>r.placements.map(s=>s.entity_id)).filter(r=>L(r)==="camera"));for(let r of i){let s=t.states[r],a=s?.attributes.entity_picture;!a||Q(s)||n.push({id:r,url:a.startsWith("data:")?a:`${a}${a.includes("?")?"&":"?"}fp3d=${this.cameraTick}`})}}return this.projecting=n.length>0,n}watchCameras(t){t&&!this.cameraTimer?this.cameraTimer=setInterval(()=>{document.hidden||(this.cameraTick++,this.syncDevices(!0),(this._through||this.cameraWall)&&this.requestUpdate())},this._low?1e4:5e3):!t&&this.cameraTimer&&(clearInterval(this.cameraTimer),this.cameraTimer=void 0)}pictureUrl(t){if(/^https?:\/\//.test(t))return t;if(t.startsWith("camera:")){let e=this.hass.states[t.slice(7)],n=e?.attributes.entity_picture;return!n||Q(e)?null:(this.cameraScreens++,n.startsWith("data:")?n:`${n}${n.includes("?")?"&":"?"}fp3d=${this.cameraTick}`)}return this.pictureUrls.has(t)?this.pictureUrls.get(t)??null:(this.pictureUrls.set(t,null),ol(this.hass,t).then(e=>{this.pictureUrls.set(t,e),this.syncDevices(!0)},()=>{}),null)}robotObstacles(t,e){let n=new Set(["rug","worktop","table","table_round","coffee_table","chair","office_chair","stool","bar_stool","bench","desk","robot_vacuum","parking","stairwell","radiator","ac_unit","tv_wall","kitchen_wall","led_strip"]);return t.furniture.filter(i=>{if(n.has(i.type)||i.type.startsWith("lamp_")&&i.type!=="lamp_floor"&&i.type!=="lamp_uplight"||i.h<.04||mt(t,i)>.12)return!1;let r=vt(i.type);return r&&(r.hole||/table|desk|chair|stool|bench|rug|carpet|mat$/.test(i.type))?!1:W([i.x,i.z],e)||Ne(i).some(s=>W(s,e))}).map(i=>Ne(i))}robotInfos(t,e){let n=[];for(let i of e.floors)for(let r of i.furniture){if(!He(r.type))continue;let s=this.furnitureLinks.get(r.id)?.entity??null,a=s?t.states[s]?.state:void 0,l=Ar(a)?"cleaning":a==="returning"?"returning":a==="error"?"error":a==="docked"||!a?"docked":"idle",c=r.rotation*Math.PI/180,d=_e(r.type),u=r.d*(d?kl(vt(r.type)):.14),p=[r.x-Math.sin(c)*u,r.z+Math.cos(c)*u],h=f=>({id:f.id,rooms:f.rooms.filter(M=>M.points.length>=3)}),_=h(i).rooms,b=new Set(e.floors.filter(f=>f!==i&&f.furniture.some(M=>He(M.type)&&(this.furnitureLinks.get(M.id)?.entity??null)===s)).map(f=>f.id)),m=l==="cleaning"&&s?kc(t,e.floors.map(h),i.id,s,Xn(t,s,r.room_sensor),b):null,w=m&&e.floors.find(f=>f.id===m.floor.id)||i,k=m?.room??_.find(f=>W(p,f.points)),v=l==="cleaning"&&k?this.robotObstacles(w,k.points):[];n.push({id:r.id,floorId:w.id,rest:p,restHeading:-c,mode:l,room:k?.points??null,roomId:k?.id??null,obstacles:v,...d?{model:{type:r.type,w:r.w,d:r.d,h:r.h}}:{}})}return n}batteryText(t,e,n){let i=e?Number(t.states[e]?.state):Number.NaN,r=[];return Number.isFinite(i)&&r.push(`${nt(t,i,0)} %`),n!==null&&Math.abs(n)>=10&&r.push(`${n<0?"\u25B2":"\u25BC"} ${rt(t,Math.abs(n))}`),r.join(" \xB7 ")}meterText(t,e){return e===null?"":Math.abs(e)<5?rt(t,0):`${E(t,e<0?"energy_grid_export":"energy_grid_import")} ${rt(t,Math.abs(e))}`}wallboxText(t,e,n){let i=e?t.states[e]:void 0,r=String(i?.state??"").toLowerCase(),s=dc(r),a=(n??0)>50||s.charging,l=i?.entity_id.startsWith("binary_sensor.")?r==="on":s.plugged,c=a?E(t,"wallbox_charging"):l?E(t,"wallbox_plugged"):i&&!Q(i)&&!i.entity_id.startsWith("binary_sensor.")?_t(t,i):"",d=n!==null&&n>50?rt(t,n):"";return[c,d].filter(Boolean).join(" \xB7 ")}stateFaces(t,e){let n=[],i=e.state_entity&&e.state_entity!=="none"&&e.state_entity2&&e.state_entity2!=="none"?[[e.state_entity,e.state_split==="top_bottom"?"bottom":"left"],[e.state_entity2,e.state_split==="top_bottom"?"top":"right"]]:[[e.state_entity,"all"]];for(let[r,s]of i){if(!r||r==="none")continue;let a=t.states[r];if(!a||Q(a)||!(At(a)||a.state==="home"||a.state==="occupied"||a.state==="on"))continue;let c=L(r)==="light"?re(a):null;n.push({part:s,color:c?c.color:[1,.71,.28],level:c?c.level:.85})}return n}carText(t,e,n){let i=s=>E(t,s);if(n||e.away!==null){let s=e.away?` \xB7 ${e.away}`:"";return`${i("car_away")}${s}`}let r=[];return e.soc!==null&&r.push(`${nt(t,e.soc,0)} %`),e.range!==null&&r.push(`${nt(t,e.range,0)} ${e.rangeUnit}`),e.charging?r.push(e.chargingW!==null?`\u26A1 ${rt(t,e.chargingW)}`:`\u26A1 ${i("car_charging_short")}`):e.plugged&&r.push("\u{1F50C}"),e.locked!==null&&r.push(e.locked?"\u{1F512}":"\u{1F513}"),r.join(" \xB7 ")}ceilingAt(t,e,n){let r=t.rooms.find(l=>l.ceiling_height&&l.points.length>=3&&W([e,n],l.points))?.ceiling_height||t.height,s=this.building;if(!s||!Ur(s).some(l=>zc(l,t.elevation+r)&&jr(l,t.elevation)))return r;let a=Fc(s,e,n,t.elevation);return a===null?r:Math.max(.5,Math.min(r,a-t.elevation))}lampMarker(t,e,n,i){let r=i?t.states[i]:void 0,s=vt(n.type),a=Kl[n.type]??s?.light??"floor",l=e.rooms.some(k=>k.points.length>=3&&W([n.x,n.z],k.points)),c=a==="strip"&&!l?ie(e,n.x,n.z)+(n.mount_y??0):n.mount_y!=null&&!s?n.mount_y:s||a==="wall"||a==="strip"?mt(e,n):a==="table"?Oo(e,n.x,n.z,n.h):a==="bollard"||a==="garden"?ie(e,n.x,n.z):0,d=e.rooms.find(k=>k.points.length>=3&&W([n.x,n.z],k.points)),u=this.ceilingAt(e,n.x,n.z),p=(s?s.mount==="ceiling":["ceiling","downlight","spot","panel","pendant","fan"].includes(a))&&n.mount_y==null,h=p?e.height-u:0,_=s&&p?Math.max(0,c-h):c,b=Fo.has(n.type)&&n.mount_y!=null?Math.min(e.height,n.mount_y+Co(n.type,n.h)):Math.abs(h)>.01?u:void 0,m=b??e.height,w=s?s.mount==="ceiling"?Math.max(.5,_-.15):_+n.h+.2:{ceiling:m-.3,downlight:m-.25,spot:m-.35,panel:m-.25,pendant:Math.max(.6,m-n.h-.25),fan:Math.max(.6,m-n.h-.25),floor:_+n.h+.25,uplight:_+n.h+.25,table:_+n.h+.2,wall:_+n.h+.2,strip:n.upright?_+n.w+.15:Math.max(.3,_-.2),bollard:_+n.h+.25,garden:_+n.h+.25}[a];return{id:i??`lamp:${n.id}`,floorId:e.id,roomId:d?.id??null,x:n.x,z:n.z,y:w,icon:n.icon?Jt(n.icon):je("light"),name:n.name||(i?B(t,i):kt(t,n.type)),text:r?_t(t,r):"",active:r?At(r):!1,unavailable:r?Q(r):!1,glow:r?ys(fc(hc(re(r,n.color_entity&&n.color_entity!=="none"?t.states[n.color_entity]:void 0),n.only_color),n.glow_color),n.glow_scale):null,lamp:a,rotation:n.rotation,mirror:!!n.mirror,roll:n.tilt??0,upright:!!n.upright,rise:n.rise??0,fanSpeed:a==="fan"?jo(n.fan&&n.fan!=="none"?t.states[n.fan]:void 0):void 0,size:[n.w,n.d,n.h],base:_,top:b,pickable:!!i,furnitureId:n.id,pack:s?n.type:null,finish:s?n.finish??null:null,lightY:s?s.mount==="ceiling"?_:_+n.h*.85:void 0,effect:!!r&&r.state==="on"&&!n.glow_color&&mc(r)&&typeof r.attributes.effect=="string"&&!/^(none|off|solid|static|normal|white|colou?r|rgb|manual|default|-|)$/i.test(r.attributes.effect.trim()),variant:n.variant,show:n.marker??void 0,fromFurniture:!0}}inOpenRoom(t){if(!this.roomId)return!1;if(t.roomId)return t.roomId===this.roomId;let e=this.building?.floors.find(i=>i.id===t.floorId),n=e?ot(e).find(i=>i.id===this.roomId):void 0;return!!n&&W([t.x,t.z],n.points)}showPin(t){if(t.id.startsWith("lamp:"))return!1;if(this.furnish&&!t.fromFurniture)return!0;if(t.show==="never"||this.markerMode==="none")return!1;if(t.show==="active")return t.active;if(t.show==="always"||this.markerMode==="all")return!0;if(this.markerMode==="room")return this.inOpenRoom(t);if(t.lamp||t.model)return!1;let e=L(t.id);return e==="light"?!1:t.fromFurniture?(t.power??0)>=1||e==="media"&&t.active||!!t.energyDevice&&!!t.text:!0}openingTargets(){let t=new Map;for(let[e,n]of this.openingLinks??[]){if(n.lock&&!n.cover||zr(n.cover)){t.set(e,`opening:${e}`);continue}let i=n.cover??n.contact??n.tilt;i&&t.set(e,i)}return t}scheduleThumbs(t=600){clearTimeout(this.thumbTimer);let e=this.building?.floors.filter(i=>i.rooms.length).length??0;if(!this.floorThumbs||e<2||this.clean&&this._narrowStage){this._thumbs=[];return}let n=Math.max(t,this.thumbsAt+(this._low?8e3:4e3)-Date.now());this.thumbTimer=setTimeout(()=>{if(!(!this.viewer||this.dimmed&&this._thumbs.length)){if(document.hidden){this.scheduleThumbs(3e3);return}this.thumbsAt=Date.now(),this._thumbs=this.viewer.floorThumbnails(this.narrowThumbs?104:150,this.narrowThumbs?78:112)}},n)}get narrowThumbs(){return this._narrowStage}renderThumbs(){if(!this._thumbs.length||!this.building)return y;let t=new Map(this.building.floors.map(r=>[r.id,r.name])),e=[...this._thumbs].sort((r,s)=>(this.building.floors.find(a=>a.id===s.floorId)?.elevation??0)-(this.building.floors.find(a=>a.id===r.floorId)?.elevation??0)),n=this._thumbsCompact,i=()=>{this._thumbsCompact=!n;try{localStorage.setItem("homeplan3d.thumbs_compact",this._thumbsCompact?"1":"0")}catch{}};return g`<nav class="fp3d-thumbs ${this.narrowThumbs?"fp3d-thumbs-small":""} ${n?"fp3d-thumbs-compact":""}" aria-label=${E(this.hass,"floors")}>
      <button class="fp3d-thumbs-fold" title=${E(this.hass,n?"thumbs_show":"thumbs_fold")} aria-label=${E(this.hass,n?"thumbs_show":"thumbs_fold")} @click=${i}>${n?"\u25B8":"\u25C2"}</button>
      <button class="fp3d-thumb fp3d-thumb-house" aria-pressed=${this.floorId===null} @click=${()=>this.fire("floor-tap",{floorId:null})}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M3 11l9-7 9 7M5 10v10h14V10" /></svg>
        <span>${E(this.hass,"all_floors")}</span>
      </button>
      ${e.map(r=>g`<button class="fp3d-thumb" aria-pressed=${this.floorId===r.floorId} @click=${()=>this.fire("floor-tap",{floorId:r.floorId})}>
          ${n?y:g`<img src=${r.url} alt="" />`}
          <span>${t.get(r.floorId)??""}</span>
        </button>`)}
    </nav>`}onDeviceHold(t,e,n){if(t.startsWith("opening:"))return this.onOpeningTap(t.slice(8),e,n,!0);if(/^(module|popup|trail|lamp):/.test(t))return this.onDeviceTap(t,e,n);if(t.startsWith("gangs:")){let r=this.building?.floors.flatMap(a=>a.furniture).find(a=>a.id===t.slice(6)),s=r?No(r):[];s.length===1?this.onDeviceHold(s[0],e,n):this.onDeviceTap(t,e,n);return}if(this.ro){this.onDeviceTap(t,e,n);return}if(G("auto_pro")&&this.hass&&this.building)for(let r of this.building.floors)for(let s of r.furniture){if(s.type!=="parking"||!s.car)continue;let a=Jn(this.hass,s);if([s.entity,s.car.device,...Object.values(a.entities)].filter(c=>!!c&&c!=="none").includes(t)){this._menu={entity:t,x:e,y:n,car:a};return}}let i=L(t);i==="light"||i==="cover"||i==="switch"||i==="fan"||i==="lock"||i==="camera"?this._menu={entity:t,x:e,y:n}:Mt(this,t)}onDeviceSwipe(t,e,n,i,r){let s=this.hass?.states[t];if(this.ro)return!1;if(e==="start"){if(!s||Q(s)||this.confirmSet.has(t))return!1;let l=L(t);if(l==="light"&&Ls(s).dim){let c=s.state==="on"?typeof s.attributes.brightness=="number"?Math.round(s.attributes.brightness/2.55):100:0;return this._swipe={entity:t,kind:"light",start:c,value:c,x:i,y:r},this.swipeFar=0,!0}if(l==="cover"&&Vs(s)){let c=s.attributes.current_position;return this._swipe={entity:t,kind:"cover",start:c,value:c,x:i,y:r},this.swipeFar=0,!0}return!1}let a=this._swipe;if(!a||a.entity!==t)return!1;if(e==="move"){this.swipeFar=Math.max(this.swipeFar,Math.abs(n));let l=Math.abs(n)<=la?0:n-Math.sign(n)*la,c=Math.round(Math.min(100,Math.max(0,a.start-l/220*100)));c!==a.value&&(this._swipe={...a,value:c});let d=performance.now();a.kind==="light"&&c!==a.start&&d-this.swipeSent>350&&(this.swipeSent=d,this.applySwipe())}else{if(clearTimeout(this.swipeTimer),this.swipeFar<=la)return this._swipe=null,this.onDeviceTap(t,i,r),!0;a.value!==a.start&&this.applySwipe(),this.swipeTimer=setTimeout(()=>this._swipe=null,700)}return!0}applySwipe(){let t=this._swipe;!t||!this.hass||(t.kind==="light"?t.value<=0?this.hass.callService("light","turn_off",{entity_id:t.entity}):this.hass.callService("light","turn_on",{entity_id:t.entity,brightness_pct:t.value}):this.hass.callService("cover","set_cover_position",{entity_id:t.entity,position:t.value}))}goTo(t){if(this._find=null,t.kind==="room"){this.fire("room-tap",{floorId:t.floorId,roomId:t.roomId});return}this.floorId!==t.floorId&&this.fire("floor-tap",{floorId:t.floorId}),setTimeout(()=>this.viewer?.focus(t.floorId,t.x,t.z,t.y,t.entity),120)}renderBinInfo(){let t=this._binInfo,e=this.hass,n=t&&this.building?.floors.flatMap(d=>d.furniture).find(d=>d.id===t.furnitureId);if(!t||!e||!n)return y;let i=Sd(n,e,this.pickups),r=new Date;r.setHours(0,0,0,0);let s=d=>{let u=Math.round((d.getTime()-r.getTime())/864e5);return u===0?E(e,"bin_today"):u===1?E(e,"bin_tomorrow"):d.toLocaleDateString(e.language||void 0,{weekday:"short",day:"numeric",month:"numeric"})},a=n.name||E(e,`bin_kind_${n.bin_kind??"rest"}`),l=ds(n,e),c=d=>{d.stopPropagation(),typeof n.bin_out=="string"&&ui(e,n.bin_out),clearTimeout(this.binInfoTimer),this.binInfoTimer=setTimeout(()=>this._binInfo=null,6e3)};return g`<div class="fp3d-swipe fp3d-info fp3d-bin-info" style="left:${t.x}px;top:${t.y}px" @click=${()=>this._binInfo=null}>
      <span>🗑 ${a}</span>
      ${i.length?i.map(d=>g`<b>${s(d.day)}${d.summary&&d.summary!==a?g` <small>· ${d.summary}</small>`:y}</b>`):g`<b>${E(e,"bin_none")}</b>`}
      ${Md(n)&&!this.ro?g`<button class="fp3d-bin-out ${l?"fp3d-bin-out-on":""}" aria-pressed=${l} @click=${c}>${l?E(e,"bin_out_done"):E(e,"bin_out_mark")}</button>`:l?g`<small>${E(e,"bin_out_done")}</small>`:y}
    </div>`}renderHousehold(){if(!this._household.length||!this.householdCard||!G("household")||this.panelOpen)return y;let t=()=>{this._hhFolded=!this._hhFolded,Xg("homeplan3d.hhFolded",this._hhFolded)};return g`<div class="fp3d-hh ${this._hhFolded?"fp3d-hh-folded":""}">
      <button class="fp3d-hh-head" aria-expanded=${!this._hhFolded} @click=${t}>🏠 ${E(this.hass,"hh_title")} <b>${this._household.length}</b></button>
      ${this._hhFolded?y:this._household.map(e=>g`<button class="fp3d-hh-row ${e.hot?"fp3d-hh-hot":""}" ?disabled=${!e.entity} @click=${()=>e.entity&&(this.ro?this.showInfo(e.entity,0,0):Mt(this,e.entity))}>
              <span class="fp3d-hh-icon"><ha-icon icon=${`mdi:${e.icon}`} style="--mdc-icon-size:18px"></ha-icon></span><span>${e.text}</span>
            </button>`)}
    </div>`}renderClock(){let t=this.clock;if(!t||t==="off"||!this.hass)return this.clockTimer&&(clearInterval(this.clockTimer),this.clockTimer=void 0),y;this.clockTimer??=setInterval(()=>this._clockTick=Date.now(),3e4);let e=new Date(this.now()),n=(this.hass.language||"en").replace("_","-"),i=this.hass.config?.time_zone,r=s=>{try{return e.toLocaleString(n,i?{...s,timeZone:i}:s)}catch{return e.toLocaleString(n,s)}};return g`<div class="fp3d-clock fp3d-clock-${t}" aria-hidden="true"><b>${r({hour:"2-digit",minute:"2-digit",...zn(this.hass)})}</b><span>${r({weekday:"short",day:"numeric",month:"short"})}</span></div>`}renderAlerts(){let t=this.building;if(!this._alerts.length||!t)return y;let e=this._alerts.slice(0,3);return g`<div class="fp3d-alert-banner" role="alert">
      ${e.map(n=>g`<button class="fp3d-alert fp3d-alert-${n.kind}" title=${Ie(this.hass,t,n)} @click=${()=>this.jumpTo(n)}>${Ie(this.hass,t,n)}</button>`)}
      ${this._alerts.length>3?g`<span class="fp3d-alert-more">+${this._alerts.length-3}</span>`:y}
    </div>`}renderScenes(){let t=this.building;if(!this.scenes||!this.roomId||this.panelOpen||!t||!this.hass||this.ro)return y;let e=t.floors.flatMap(r=>ot(r)).find(r=>r.id===this.roomId),n=e?wt(this.hass,e.area_id).filter(r=>L(r)==="scene"||L(r)==="script").slice(0,6):[];if(!n.length)return y;let i=e?.area_id?this.hass.areas?.[e.area_id]?.name:void 0;return g`<div class="fp3d-scenes">
      ${n.map(r=>g`<button class="fp3d-chip" aria-pressed=${this._sceneFired===r} @click=${()=>this.runScene(r)}>${B(this.hass,r,i)}</button>`)}
    </div>`}async syncPets(){let t=this.building,e=this.viewer,n=t?.settings.pets?.on!==!1&&this.petsOn!==!1,i=n?t?.settings.pets?.list??[]:[],r=n&&!!t?.floors.some(s=>s.furniture.some(a=>/:aquarium(_large)?$/.test(a.type)));if(!e||!t||!G("fun_pets")||!i.length&&!r){this.pets?.dispose(),this.pets=null,this.petsFor=null;return}if(this.pets){this.petsFor!==t&&(this.petsFor=t,this.pets.update(t,i));return}if(!this.petsLoading){this.petsLoading=!0;try{let[s,a]=await Promise.all([Bs(),fo()]);if(!this.viewer||this.pets)return;this.petsFor=this.building,this.pets=s.startPets({lib:a.funLib,FloorMap:a.FloorMap,viewer:this.viewer,building:this.building,pets:this.building?.settings.pets?.on!==!1&&this.petsOn!==!1?this.building?.settings.pets?.list??[]:[],night:()=>this.hass?.states["sun.sun"]?.state==="below_horizon",base:(l,c)=>mt(l,c),closedDoors:()=>{let l=new Set,c=this.hass?.states??{};for(let d of this.building?.floors??[])for(let u of d.openings)u.type==="door"&&u.contact&&c[u.contact]?.state==="off"&&l.add(u.id);return l}})}catch(s){console.error("HomePlan 3D: the pets failed to load",s)}finally{this.petsLoading=!1}}}async syncGhost(){let t=this.building,e=!!t&&G("fun_halloween")&&t.settings.halloween?.ghost!==!1&&this.ghostOn!==!1;if(!this.viewer||!e){this.ghost?.dispose(),this.ghost=null;return}if(this.ghost){this.ghost.update(t);return}if(!this.ghostLoading){this.ghostLoading=!0;try{let[n,i]=await Promise.all([Bs(),fo()]);if(!this.viewer||this.ghost||!this.building)return;this.ghost=n.startGhost({lib:i.funLib,viewer:this.viewer,building:this.building,night:()=>this.hass?.states["sun.sun"]?.state==="below_horizon"})}catch(n){console.error("HomePlan 3D: the ghost failed to load",n)}finally{this.ghostLoading=!1}}}walkHere(){this.startWalk()}async startWalk(){Oe("walk");let t=this.building,e=this.viewer;if(!t||!e||this._walk)return;let n=this.roomId,i=t.floors.filter(p=>p.rooms.some(h=>h.points.length>=3)),s=(n?i.find(p=>p.rooms.some(h=>h.id===n)):void 0)??i.find(p=>p.id===this.floorId)??[...i].sort((p,h)=>Math.abs(p.elevation)-Math.abs(h.elevation))[0];if(!s)return;let a=await fo();this._walk={room:null,hint:!0},this.walkChanged(!0),await this.updateComplete;let l=this.renderRoot.querySelector(".fp3d-walk-surface");if(!l)return;e.setFloor(s.id,!1),e.setWallMode("auto");let c=new a.FloorMap(t,s),d=n?s.rooms.find(p=>p.id===n):void 0,u;if(d){let p=c.freeNear(Rt(d.points));u={x:p[0],z:p[1],yaw:c.openYaw(p),pitch:-.05}}this.walker=new a.WalkCamera(e,c,l,{start:u,onRoom:p=>{this.walkRoomPts=p?.points??null,this._walk&&(this._walk={...this._walk,room:p?.name??null}),this.syncDevices(!0)}}),this.walkKeys=p=>{p.key==="Escape"&&this.stopWalk()},window.addEventListener("keydown",this.walkKeys),setTimeout(()=>{this._walk&&(this._walk={...this._walk,hint:!1})},9e3)}walkChanged(t){this.dispatchEvent(new CustomEvent("walk-change",{detail:{walking:t},bubbles:!0,composed:!0}))}stopWalk(){if(!this.walker&&!this._walk)return;this.walker?.dispose(),this.walker=null,this.walkKeys&&window.removeEventListener("keydown",this.walkKeys),this.walkKeys=null,this._walk=!1,this.walkRoomPts=null,this.walkChanged(!1);let t=this.viewer;t&&(t.setWallMode(this.wallMode),t.setFloor(this.floorId,!0)),this.syncDevices(!0)}renderWalk(){if(!this.walkable||this.ro||!this.building||!this.hass)return y;let t=r=>E(this.hass,r);if(!this._walk&&this.panelOpen)return y;if(!this._walk)return g`<button class="fp3d-walk-btn" title=${t("walk_start")} aria-label=${t("walk_start")} @click=${()=>{this.startWalk()}}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13" cy="4.5" r="1.8" /><path d="m9 20 2.5-6 2.5 2.5V21M7.5 11l3-3.5 3.5 1.5 2 3.5M11.5 14l1-5" /></svg>
        <span>${t("walk_title")}</span>
      </button>`;let e=this._walk,n=null,i=(r,s)=>{if(!n)return;let a=44,l=r.clientX-n.cx,c=r.clientY-n.cy,d=Math.hypot(l,c);d>a&&([l,c]=[l/d*a,c/d*a]),s.firstElementChild.style.transform=`translate(${l}px, ${c}px)`,this.walker?.setStick({x:l/a,y:c/a})};return g`<div class="fp3d-walk-surface"></div>
      <div class="fp3d-walk-top">
        <span class="fp3d-walk-room">🚶 ${e.room??t("walk_title")}</span>
        <button class="fp3d-walk-exit" @click=${()=>this.stopWalk()}>✕ ${t("walk_end")}</button>
      </div>
      ${e.hint?g`<div class="fp3d-walk-hint">${t("walk_hint")}</div>`:y}
      <div
        class="fp3d-walk-stick"
        @pointerdown=${r=>{let s=r.currentTarget,a=s.getBoundingClientRect();n={id:r.pointerId,cx:a.left+a.width/2,cy:a.top+a.height/2},s.setPointerCapture(r.pointerId),i(r,s)}}
        @pointermove=${r=>i(r,r.currentTarget)}
        @pointerup=${r=>{n=null,r.currentTarget.firstElementChild.style.transform="",this.walker?.setStick(null)}}
        @pointercancel=${r=>{n=null,r.currentTarget.firstElementChild.style.transform="",this.walker?.setStick(null)}}
      >
        <span></span>
      </div>`}openFind(){this._find=""}renderFind(){let t=this.building;if(!t||!this.hass)return y;if(this._find===null)return g`<button class="fp3d-find-btn" title=${E(this.hass,"find")} aria-label=${E(this.hass,"find")} @click=${()=>this._find=""}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></svg>
      </button>`;let e=ju(this.findIndex??=Ai(this.hass,t),this._find);return g`<div class="fp3d-find ${this.clean?"fp3d-find-up":""}">
      <input
        type="search"
        placeholder=${E(this.hass,"find_placeholder")}
        .value=${this._find}
        @input=${n=>this._find=n.target.value}
        @keydown=${n=>{n.key==="Escape"&&(this._find=null),n.key==="Enter"&&e[0]&&this.goTo(e[0])}}
      />
      <button class="fp3d-find-close" aria-label=${E(this.hass,"close")} @click=${()=>this._find=null}>✕</button>
      ${this._find.trim()?g`<div class="fp3d-find-list">
            ${e.length?e.map(n=>g`<button @click=${()=>this.goTo(n)}>
                    <span class="fp3d-find-icon"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d=${n.icon?kn(n.icon):"M4 10l8-6 8 6v10H4z"} /></svg></span>
                    <span><b>${n.name}</b>${n.where?g`<small>${n.where}</small>`:y}</span>
                  </button>`):g`<p>${E(this.hass,"find_none")}</p>`}
          </div>`:y}
    </div>`}renderCentral(){let t=this.building,e=this.hass;if(!t||!e||!this.central||this._find!==null||this.ro)return y;let n=(m,w)=>E(e,m,w),i=g`<button
      class="fp3d-central-btn ${this._central?"fp3d-central-on":""}"
      title=${n("central")}
      aria-label=${n("central")}
      aria-expanded=${this._central}
      @click=${()=>{this._central=!this._central,this._armed=null}}
    >
      <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" /></svg>
    </button>`;if(!this._central)return i;let r=this.floorId?t.floors.find(m=>m.id===this.floorId):void 0,s=r?[r]:t.floors,a=s.flatMap(m=>fn(e,m).lights),l=s.flatMap(m=>fn(e,m).covers),c=a.filter(m=>e.states[m]?.state==="on").length,d=!r,u=(m,w,k,v)=>{if(v.length){if(d&&this._armed!==m){this._armed=m,clearTimeout(this.armTimer),this.armTimer=setTimeout(()=>this._armed=null,3500);return}if(this._armed=null,w==="cover"&&(k==="open_cover"||k==="close_cover")){for(let f of Vo(e,v,k==="open_cover"?"open":"close"))e.callService("cover",f.service,f.data);return}e.callService(w,k,{entity_id:v})}},p=(m,w,k,v,f)=>g`<button class="fp3d-btn ${this._armed===m?"fp3d-central-armed":""}" ?disabled=${!f.length} @click=${()=>u(m,k,v,f)}>
        ${this._armed===m?n("central_sure"):n(w)}
      </button>`,h=(t.settings.favorites??[]).filter(m=>e.states[m]),_=this.buttons??t.settings.buttons??[],b=Ye()?Hs(this.sceneHost(e,t)):[];return g`${i}
      <div class="fp3d-central" role="dialog" aria-label=${n("central")}>
        <div class="fp3d-central-top">
          <b>${r?r.name:n("central_house")}</b>
          <button class="fp3d-btn fp3d-central-gear" title=${n("view_settings")} aria-label=${n("view_settings")} @click=${()=>{this._central=!1,this._settingsOpen=!0}}>⚙ ${n("view_settings")}</button>
        </div>
        ${b.length?g`<div class="fp3d-central-favs">
              ${b.map(m=>g`<button class="fp3d-chip" @click=${()=>{this._central=!1,this._sheet={id:m.id,floorId:null,roomId:null}}}><span aria-hidden="true">${m.icon}</span> ${m.title}</button>`)}
            </div>`:y}
        <div class="fp3d-central-row">
          <span>${n("central_lights")}${a.length?g` <small>${c}/${a.length}</small>`:y}</span>
          ${p("lights_on","central_on","light","turn_on",a.filter(m=>e.states[m]?.state==="off"))}
          ${p("lights_off","central_off","light","turn_off",a.filter(m=>e.states[m]?.state==="on"))}
        </div>
        ${l.length?g`<div class="fp3d-central-row">
              <span>${n("central_covers")} <small>${l.length}</small></span>
              ${p("covers_open","central_open","cover","open_cover",l)}
              ${p("covers_close","central_close","cover","close_cover",l)}
            </div>`:y}
        <b>${n("central_favorites")}</b>
        ${h.length?g`<div class="fp3d-central-favs">
              ${h.map(m=>{let[w,k]=ae(m),v=e.states[m],f=w==="homeassistant"&&v?.state==="on";return g`<button
                  class="fp3d-chip"
                  aria-pressed=${f||this._sceneFired===m}
                  ?disabled=${Q(v)}
                  @click=${()=>{e.callService(w,k,{entity_id:m}),this._sceneFired=m,setTimeout(()=>this._sceneFired=null,600)}}
                >
                  ${B(e,m)}
                </button>`})}
            </div>`:_.length?y:g`<p class="fp3d-central-hint">${n("central_no_favorites")}</p>`}
        ${_.length?g`<div class="fp3d-central-favs">
              ${_.map(m=>g`<button
                  class="fp3d-chip fp3d-own-btn"
                  aria-pressed=${Qg(e,m)}
                  @click=${w=>{Mc(e,w.currentTarget,m),m.action!=="service"&&(this._central=!1)}}
                >
                  ${m.icon?g`<ha-icon .icon=${m.icon.startsWith("mdi:")?m.icon:`mdi:${m.icon}`}></ha-icon>`:y}${m.label}
                </button>`)}
            </div>`:y}
      </div>`}maybeFlyIn(t=!1){let e=this.viewer,n=this.hass?.config?.latitude,i=this.hass?.config?.longitude;!e||!t&&(this.flownIn||!this.building?.settings.flyin)||this.walkable===!1||this.ro||this._low||typeof n!="number"||typeof i!="number"||matchMedia("(prefers-reduced-motion: reduce)").matches||(this.flownIn=!0,e.flyInStart(),this._flyIn={lat:n,lon:i})}flownIn=!1;renderFlyIn(){let t=this._flyIn;return t?g`<fp3d-flyin
      .lat=${t.lat}
      .lon=${t.lon}
      @flyin-dive=${e=>this.viewer?.flyInLand(e.detail.fast)}
      @flyin-done=${()=>this._flyIn=null}
    ></fp3d-flyin>`:y}mediaCardUp(t,e){let n=t.states[e];if(!n||L(e)!=="media")return!1;if(!this.ro&&(this.mediaGrace.get(e)?.until??0)>Date.now()&&Q(n))return!0;let i=[n.attributes.media_title,n.attributes.app_name,n.attributes.source].some(r=>typeof r=="string"&&!!r.trim());return!Q(n)&&(n.state==="playing"||n.state==="paused"&&i&&this.pausedRecently(n))}pausedRecently(t){let e=Date.parse(t.last_changed??"");if(!Number.isFinite(e))return!0;let n=e+Kg-Date.now();if(n<=0)return!1;let i=Date.now()+n+500;return(!this.pausedTimer||i<this.pausedDue)&&(clearTimeout(this.pausedTimer),this.pausedDue=i,this.pausedTimer=setTimeout(()=>{this.pausedTimer=void 0,this.syncDevices(!0)},n+500)),!0}pausedTimer;pausedDue=0;renderEye(){if(!this.cleanButton||!this.hass||this._find!==null&&!this.clean)return y;let t=E(this.hass,this.clean?"controls_show":"controls_hide");return g`<button
      class="fp3d-eye ${this.clean?"fp3d-eye-clean":""}"
      title=${t}
      aria-label=${t}
      aria-pressed=${this.clean}
      @click=${()=>this.dispatchEvent(new CustomEvent("clean-toggle",{bubbles:!0,composed:!0}))}
    >
      ${this.clean?ne`<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 6a9.8 9.8 0 0 1 9 6 9.8 9.8 0 0 1-9 6 9.8 9.8 0 0 1-9-6 9.8 9.8 0 0 1 9-6m0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8m0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4" /></svg>`:ne`<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M2.4 3.8 3.8 2.4l17.8 17.8-1.4 1.4-3.3-3.3A10.5 10.5 0 0 1 12 19a9.8 9.8 0 0 1-9-6 10.3 10.3 0 0 1 3.6-4.3L2.4 3.8M12 7a4 4 0 0 1 4 4c0 .5-.1 1-.3 1.5l-5.2-5.2c.5-.2 1-.3 1.5-.3m-4 4a4 4 0 0 0 5.5 3.7l-5.2-5.2c-.2.5-.3 1-.3 1.5m4-7a9.8 9.8 0 0 1 9 6 10 10 0 0 1-2.6 3.6l-1.4-1.4A8 8 0 0 0 18.8 12 8 8 0 0 0 9.6 7.2L8 5.6A10.3 10.3 0 0 1 12 4" /></svg>`}
    </button>`}renderMic(){let t=this.hass;if(!this.voice||!t||this.ro||this._walk)return y;let e=this._voice,n=e?.phase==="wait"||e?.phase==="listen",i=E(t,"voice_button"),r=this.cleanButton&&!(this._find!==null&&!this.clean)?this.clean?56:100:56;return g`<button class="fp3d-mic ${e?.phase==="listen"?"fp3d-mic-on":""}" style="left:${r}px" title=${i} aria-label=${i} ?disabled=${n} @click=${()=>{this.onMic()}}>
        ${ne`<svg viewBox="0 0 24 24" width="28" height="28"><path fill="currentColor" d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3m7 9c0 3.5-2.6 6.4-6 6.9V21h-2v-3.1c-3.4-.5-6-3.4-6-6.9h2a5 5 0 0 0 10 0h2Z" /></svg>`}
      </button>
      ${e?g`<div class="fp3d-mic-say ${e.phase==="error"?"fp3d-mic-err":""}" style="left:${r}px">${e.text}</div>`:y}`}sayVoice(t,e){this._voice={phase:t,text:e},clearTimeout(this.voiceTimer),(t==="done"||t==="error")&&(this.voiceTimer=setTimeout(()=>this._voice=null,t==="error"?9e3:6e3))}async onAsk(t){let e=this.hass,n=this.building;if(!e||!n)return;let i=(this.screen??"").trim().toLowerCase();if(t.screen&&t.screen.trim().toLowerCase()!==i)return;if(t.show_rooms){(!t.admins_only||e.user?.is_admin)&&this.showRooms(n,t.show_rooms);return}let r=null;try{let s=await pe();r=await this.handleSentence(e,n,s,t.text,t.speak),r===null&&this.sayVoice("error",E(e,"voice_none"))}catch(s){this.sayVoice("error",E(e,"voice_error",{msg:String(s?.message??s)}))}try{await nl(e,t.ask_id,r??"",r!==null)}catch{}}async onAnnounce(t){let e=this.hass;if(!e)return;let n=(this.screen??"").trim().toLowerCase();if(!(t.screens.length&&!t.screens.some(i=>i.trim().toLowerCase()===n))&&!Wp.has(t.id)){Wp.add(t.id),this._announce=t.message,clearTimeout(this.announceTimer),this.announceTimer=setTimeout(()=>this._announce=null,12e3);try{await tb(),await(await pe()).speak(e,t.message,Zt())}catch{}}}onReload(t){t.plan&&t.plan!==(this.planId??ft)||t.templates.length&&!(this.template&&t.templates.includes(this.template))||Bp.has(t.id)||(Bp.add(t.id),!(Date.now()-(window.fp3dReloadSent??0)<15e3)&&(this._announce=E(this.hass,"screen_reloading"),setTimeout(()=>location.reload(),500+Math.random()*4e3)))}openRoom(t){if(!this.roomId)return null;for(let e of t.floors){let n=ot(e).find(i=>i.id===this.roomId);if(n)return{floor:e,room:n}}return null}async roomAction(t,e,n){let i=()=>nu(e.floors,this.voiceArea??ta()),r=d=>{let u=e.floors.find(h=>h.id===d.floorId),p=u&&ot(u).find(h=>h.id===d.roomId);return u&&p?{floor:u,room:p}:null},s=n.room==="there"?this.openRoom(e):n.room==="here"?i():n.room?r(n.room):i()??this.openRoom(e);if(!s)return E(t,n.room==="there"?"voice_noroom_open":"voice_noroom");let a=s.room.name,l=async d=>{await Promise.all(d.map(u=>t.callService(u.domain,u.service,u.data)))};if(n.action==="clean"){let d=fi(t,s.room);return d?(await l([d]),E(t,"voice_clean_started",{room:a})):E(t,"voice_clean_none",{room:a})}let c=pi(t,s.floor,s.room);return c.length?(await l(c),E(t,"voice_off_done",{room:a,n:hi(c)})):E(t,"voice_off_nothing",{room:a})}async onMic(){let t=this.hass,e=this.building;if(!t||!e||this._voice?.phase==="wait"||this._voice?.phase==="listen")return;clearTimeout(this.voiceTimer);let n=(r,s)=>this.sayVoice(r,s);n("wait","\u2026"),this.tourToken++;let i;try{let r=window.AudioContext??window.webkitAudioContext;i=new r,i.resume().catch(()=>{})}catch{i=void 0}try{let r=await pe(),s=await r.listenOnce(t,()=>n("listen",E(t,"voice_listen")),Zt(),i);if(!s){n("error",E(t,"voice_none"));return}if(await this.handleSentence(t,e,r,s,!0)!==null)return;n("wait",`\u201C${s}\u201D \u2026`);let a=this.voiceArea??ta(),l=s,c=this.openRoom(e);c?.room.area_id&&r.saysThere(s,t.language)&&(a=c.room.area_id,l=r.withoutThere(s,t.language));let d=await r.converse(t,l,a);n("done",d?`\u201C${s}\u201D \u2013 ${d}`:`\u201C${s}\u201D`)}catch(r){let s=r,a=s?.message==="no_pipeline"?"voice_no_pipeline":s?.message==="silent"?"voice_silent":s?.name==="NotAllowedError"||s?.name==="SecurityError"||!window.isSecureContext?"voice_denied":null;n("error",a?E(t,a):E(t,"voice_error",{msg:String(s?.message??s?.name??r)}))}}async handleSentence(t,e,n,i,r){let s=(u,p)=>this.sayVoice(u,p),a=this.replay?null:this.styleSentence(i);if(a)return s("done",`\u201C${i}\u201D \u2013 ${a}`),r&&n.speak(t,a,Zt()),a;let{devices:l,items:c}=this.spokenDevices(t,e,n.SYNONYMS),d=this.replay?null:n.roomIntent(i,e,t.language,u=>u.area_id?t.areas?.[u.area_id]?.name:null);if(d){let u=await this.roomAction(t,e,d);return s("done",`\u201C${i}\u201D \u2013 ${u}`),r&&n.speak(t,u,Zt()),u}{let u=n.showTarget(i,e,l,b=>b.area_id?t.areas?.[b.area_id]?.name:null);if(u){let b=u.kind==="house"?E(t,"all_floors"):u.kind==="cameras"?E(t,"camera_wall_title"):u.name;if(s("done",`\u201C${i}\u201D \u2192 ${b}`),this.directing.touch(Date.now()),u.kind==="cameras")this.dispatchEvent(new CustomEvent("camera-wall-open",{bubbles:!0,composed:!0}));else if(u.kind==="device"){let m=c.get(u.id);u.camera&&u.entity&&G("camera_cockpit")?this.lookThrough(u.entity):m&&this.goTo(m)}else u.kind==="house"?this.fire("floor-tap",{floorId:null}):u.kind==="floor"?this.fire("floor-tap",{floorId:u.floorId}):(this.floorId!==u.floorId&&this.fire("floor-tap",{floorId:u.floorId}),setTimeout(()=>this.fire("room-tap",{floorId:u.floorId,roomId:u.roomId}),60));return E(t,"voice_showing",{name:b})}let p=await t.callWS({type:"homeplan3d/locate/ask",text:i,language:t.language}).catch(()=>null);if(p)return s("done",`\u201C${i}\u201D \u2013 ${p.text}`),p.rooms.length&&(!p.admins_only||t.user?.is_admin)&&this.showRooms(e,p.rooms),r&&n.speak(t,p.text,Zt()),p.text;let h=this.moduleHost(t,e,n.SYNONYMS,b=>n.showTarget(b,e,l,m=>m.area_id?t.areas?.[m.area_id]?.name:null)),_=await Ku(i,h);if(_){s("done",_.text?`\u201C${i}\u201D \u2013 ${_.text}`:`\u201C${i}\u201D`),this.directing.touch(Date.now()),_.highlight?.length&&this.viewer?.flashDevices(_.highlight);let b=_.focus,m=_.spoken??_.text??"";if(_.tour?.length){let w=r&&_.speak!==!1?v=>n.speak(t,v,Zt()):null,k=_.spoken??_.text;return k&&w&&await w(k),this.runTour(_.tour,e,c,w),m}if(b?.roomId&&b.floorId)this.floorId!==b.floorId&&this.fire("floor-tap",{floorId:b.floorId}),setTimeout(()=>this.fire("room-tap",{floorId:b.floorId,roomId:b.roomId}),60);else if(b?.floorId&&!b.entity&&!b.furnitureId)this.fire("floor-tap",{floorId:b.floorId});else if(b?.entity||b?.furnitureId){let w=c.get(b.entity??`furniture:${b.furnitureId}`);w&&this.goTo(w)}return _.text&&_.speak!==!1&&r&&n.speak(t,_.text,Zt()),m}}return null}spokenDevices(t,e,n){let i=this.findIndex??=Ai(t,e),r=new Map(e.floors.flatMap(u=>ot(u).map(p=>[p.id,p.name]))),s=[],a=[],l=new Map;for(let u of i)u.kind==="device"&&u.entity&&l.set(u.entity,u);let c=new Set;for(let u of e.floors){let p=ot(u);for(let h of u.furniture){if(ob.has(h.type))continue;let _=this.furnitureLinks.get(h.id),b=_?.entity??_?.power??null,m=b??`furniture:${h.id}`,w=p.find(T=>T.points.length>=3&&W([h.x,h.z],T.points)),k=kt(t,h.type),v=[h.name,...h.aliases??[],k,b?B(t,b):null,...n[h.type]??[]].filter(T=>!!T),f=h.name||(b?B(t,b):k);s.push({id:m,entity:b,name:f,names:v,room:w?.name??"",camera:!!b&&L(b)==="camera"});let M=(h.type==="plant"||as(h.type))&&!!h.moisture&&h.moisture!=="none",x=fs(_?.entity?t.states[_.entity]:void 0,_?.power?dt(t.states[_.power]):null,typeof h.run_w=="number"&&h.run_w>0?h.run_w:10),I=G("household")&&typeof h.remaining=="string"&&h.remaining!=="none"&&!x?ps(t.states[h.remaining]):null;a.push({id:m,entity:b,name:f,names:v,room:w?.name??"",floorId:u.id,roomId:w?.id??null,power:_?.power??null,type:h.type,remaining:I,thirsty:M&&G("household")?us(h,t):null}),b?c.add(b):l.set(m,{kind:"device",name:f,where:"",floorId:u.id,roomId:w?.id??null,entity:null,icon:null,x:h.x,z:h.z,y:Math.min(u.height-.3,Math.max(.5,h.h))})}}let d=new Map(e.floors.flatMap(u=>u.placements.map(p=>[p.entity_id,p])));for(let[u,p]of l){if(c.has(u)||u.startsWith("furniture:"))continue;let h=p.roomId&&r.get(p.roomId)||"",_=d.get(u),b=[_?.name,..._?.aliases??[],p.name].filter(m=>!!m);s.push({id:u,entity:u,name:p.name,names:b,room:h,camera:L(u)==="camera"}),a.push({id:u,entity:u,name:p.name,names:b,room:h,floorId:p.floorId,roomId:p.roomId,power:null,type:"device"})}return{devices:s,items:l,spoken:a}}lockMarkers(t,e){let n=[];for(let i of e.floors)for(let r of i.openings){let s=this.openingLinks?.get(r.id)?.lock;if(!s)continue;let a=this.openingSpot(e,r.id,!0);if(!a)continue;let l=t.states[s];n.push({id:s,floorId:i.id,roomId:r.room_id,x:a.x,z:a.z,y:Math.min(a.y+.35,1.5),icon:je("lock"),name:B(t,s),text:l?_t(t,l):"",active:!!l&&(l.state==="unlocked"||l.state==="open"||l.state==="unlocking"),unavailable:!l||Q(l),glow:null,full:!0,fromFurniture:!1})}return n}openingSpot(t,e,n=!1){for(let i of t.floors){let r=i.openings.find(w=>w.id===e);if(!r)continue;let s=Tc(r,i.rooms,i.walls??[]);if(!s)return null;let a=s.room.points,l=a[s.edge],c=a[(s.edge+1)%a.length],d=Math.hypot(c[0]-l[0],c[1]-l[1])||1,u=[(c[0]-l[0])/d,(c[1]-l[1])/d],h=Ht(a)>0!==Pc(r,i.rooms,i.walls??[],t.settings.wall_interior)?[-u[1],u[0]]:[u[1],-u[0]],_=r.offset;if(n){let w=u[0]*h[1]-u[1]*h[0]>0;_=r.offset-r.width/2+jl(r,r.hinge==="left"===w)}let[b,m]=Ko(s.room,s.edge,_);return{floorId:i.id,x:b+h[0]*.2,z:m+h[1]*.2,y:Math.max(.5,r.sill+r.height/2),theta:Math.atan2(h[0],h[1])}}return null}async showRooms(t,e){let n=e.map(l=>({roomId:l,floorId:t.floors.find(c=>c.rooms.some(d=>d.id===l))?.id})).filter(l=>!!l.floorId).slice(0,8);if(!n.length)return;let i=++this.tourToken;clearTimeout(this.tourTimer),this.directing.touch(Date.now());let r=this.renderRoot.querySelector(".fp3d-stage"),s=()=>{this.tourToken++,clearTimeout(this.tourTimer)};r?.addEventListener("pointerdown",s,{once:!0});let a=l=>new Promise(c=>this.tourTimer=setTimeout(c,l));for(let[l,c]of n.entries()){if(i!==this.tourToken||(this.floorId!==c.floorId&&(this.fire("floor-tap",{floorId:c.floorId}),await a(150)),i!==this.tourToken))break;this.roomId!==c.roomId&&this.fire("room-tap",{floorId:c.floorId,roomId:c.roomId}),this.directing.touch(Date.now()),l<n.length-1&&await a(4e3)}r?.removeEventListener("pointerdown",s)}async runTour(t,e,n,i){let r=++this.tourToken;clearTimeout(this.tourTimer);let s=t.map(d=>{if(d.openingId){let p=this.openingSpot(e,d.openingId);return p?{...p,entity:null,say:d.say,inside:!0}:null}let u=n.get(d.entity??`furniture:${d.furnitureId}`);return u?{floorId:u.floorId,x:u.x,z:u.z,y:u.y,theta:void 0,entity:u.entity,say:d.say,inside:!1}:null}).filter(d=>!!d).slice(0,8);if(!s.length)return;let a=this.renderRoot.querySelector(".fp3d-stage"),l=()=>{this.tourToken++,clearTimeout(this.tourTimer)};a?.addEventListener("pointerdown",l,{once:!0});let c=d=>new Promise(u=>this.tourTimer=setTimeout(u,d));for(let d of s){if(r!==this.tourToken||(this.floorId!==d.floorId&&(this.fire("floor-tap",{floorId:d.floorId}),await c(150)),r!==this.tourToken)||(this.viewer?.focus(d.floorId,d.x,d.z,d.y,d.entity,d.inside?{radius:3.2,phi:1.05,theta:d.theta}:void 0),await c(900),r!==this.tourToken))break;let u=d.say&&i?await i(d.say):!1;if(r!==this.tourToken)break;await c(u?1200:2600)}a?.removeEventListener("pointerdown",l)}spokenOpenings(t,e){let n=[],i=a=>E(t,a);for(let a of e.floors){let l=new Map(ot(a).map(c=>[c.id,c.name]));for(let c of a.openings){let d=this.openingLinks?.get(c.id);if(!d)continue;let u=c.type==="garage"?"garage":c.type==="door"?"door":"window",p=se(t,d,c.type),h=gc(p,c.type),_=!h&&(p.tilt>.02||p.tilt2>.02);for(let b of[d.contact,d.contact2,d.cover,d.tilt,d.tilt2])b&&b!=="none"&&n.push({id:c.id,entity:b,kind:u,name:i(`opening_${c.type}`),room:l.get(c.room_id)??"",floorId:a.id,roomId:c.room_id,open:h,tilted:_})}}let r=e.settings.roof?.windows??[],s=r.length?new Map(ke(e).map(a=>[a.key,a])):null;for(let a of r){let l=Vp(t,a),c=l.open>.02,d=!c&&l.tilt>.02,u=[a.window,a.contact,a.cover,a.tilt].filter(m=>!!m&&m!=="none"),p=u.map(m=>Ct(t,m)).filter(m=>!!m).map(m=>e.floors.flatMap(w=>w.rooms.filter(k=>k.area_id===m).map(k=>({floor:w,room:k})))).find(m=>m.length===1)?.[0],h=p?null:Xr(e,s?.get(a.face),a),_=p?.floor??h?.floor??e.floors[e.floors.length-1],b=p?.room??(h?_?.rooms.find(m=>m.id===h.roomId):void 0);for(let m of u)n.push({id:a.id,entity:m,kind:"roof_window",name:a.name||i("roof_window"),room:b?.name??"",floorId:_?.id??"",roomId:b?.id??null,open:c,tilted:d})}return n}sceneHost(t,e){return this.moduleHost(t,e,{},()=>null)}moduleHost(t,e,n,i){let r=null,s=()=>r??=this.spokenDevices(t,e,n).spoken,a={api:1,stage:2,hass:()=>this.hass,building:()=>this.building,language:()=>t.language||"en",devices:()=>s(),findDevice:l=>{let c=i(l);return c?.kind==="device"&&c.id?s().find(d=>d.id===c.id)??null:null},dimmed:()=>this.dimmed,canEdit:()=>!!this.hass?.user?.is_admin&&!this.ro&&!this.noSave,updateBuilding:l=>{let c=this.building;if(!c||!this.hass||this.ro||this.noSave||!this.hass.user?.is_admin)return;let d=structuredClone(c);l(d),this.building=d,Vn(this.hass,d,this.planId??void 0).catch(u=>this.serviceFailed("homeplan3d/building/save",u))},callService:(l,c,d)=>this.hass?this.hass.callService(l,c,d):Promise.resolve(),newId:l=>ql(l),waterLevel:(l,c)=>{let d=this.building?.floors.find(p=>p.id===l),u=d?.outdoor.find(p=>p.id===c);return!d||!u||u.type!=="pool"?null:{y:ln(d,u),floorY:Wn(d,u)}},groundAt:(l,c,d)=>{let u=this.building?.floors.find(p=>p.id===l);return u?ie(u,c,d):0},openPopup:(l,c)=>this.openModulePopup(l,c),closePopup:()=>this.closeModulePopup(),imageUrl:l=>this.pictureUrl(l),people:()=>this.lastPersons.flatMap(l=>{let c=this.building?.floors.find(d=>d.id===l.floorId)?.rooms.find(d=>d.id===l.roomId);return c?[{id:l.id,floorId:l.floorId,roomId:l.roomId,roomName:c.name}]:[]}),look:()=>this.effectiveTheme()==="day"?"light":"dark",lowPower:()=>this._low,refresh:()=>{this.requestUpdate(),this.moduleTimer??=setTimeout(()=>{this.moduleTimer=void 0,this.syncDevices(!1,!0)},50)},plan:na,openings:()=>this.spokenOpenings(t,e),energy:()=>this._energy?{consumption:this._energy.consumption,solar:this._energy.solar,grid:this._energy.grid,battery:this._energy.battery,soc:this._energy.soc}:null,consumers:()=>[...this.lastConsumers].map(l=>({id:l.id,entity:l.powerEntity,name:s().find(c=>c.entity===l.id||c.power===l.powerEntity)?.name??B(t,l.id),watts:l.power})).sort((l,c)=>c.watts-l.watts),household:()=>this._household.map(l=>({text:l.text,entity:l.entity,hot:!!l.hot})),alerts:()=>this.spokenAlerts(t,e),cars:()=>this.spokenCars(t,e),pools:()=>tp(a),weather:()=>ue(t,this.weatherEntityId??e.settings.weather_entity),listen:async l=>{try{return(await(await pe()).listenOnce(t,l,Zt())).trim()||null}catch{return null}},notify:l=>this.showNote(l),tour:(l,c)=>{let d=this.spokenDevices(t,e,n).items,u=c?p=>pe().then(h=>h.speak(t,p,Zt())):null;this.runTour(l,e,d,u)},occupied:()=>this.occupiedRooms(t,e),speakers:()=>this.planSpeakers(t,e),cameras:()=>this.planCameras(t,e),pickSpot:l=>this.pickSpot(l)};return a}pickSpot(t){return new Promise(e=>{let n=this.viewer;if(!n)return e(null);clearTimeout(this.spotTimer);let i=r=>{clearTimeout(this.spotTimer),this._spotHint=null,e(r)};n.pickSpot(i),this._spotHint=t,this.spotTimer=setTimeout(()=>n.pickSpot(null),6e4)})}spotTimer;planCameras(t,e){return e.floors.flatMap(n=>n.placements.filter(i=>i.entity_id.startsWith("camera.")).map(i=>{let r=i.mount==="ceiling";return{entity:i.entity_id,floorId:n.id,x:i.x,z:i.z,height:r?n.height-.1:i.y??2.2,heading:i.rotation??0,tilt:i.tilt??(r?65:20),fov:i.fov??(r?120:90),reach:i.reach??(r?3:4.5),dome:r,detections:Ut(t,i.entity_id).map(s=>({sensor:s,kind:io(t,s),on:t.states[s]?.state==="on"}))}}))}moduleFigures(t){let e=[];for(let n of this.scene){if(n.kind!=="figure")continue;let i=t.floors.find(s=>s.id===n.floorId);if(!i)continue;let r=n.look==="person";e.push({id:`module:${n.id}`,name:n.name,initials:r?"":n.look==="car"?"\u{1F697}":"\u{1F43E}",picture:null,floorId:n.floorId,roomId:_o(i,n.at[0],n.at[1])??"",x:n.at[0],z:n.at[1],color:n.color??(r?"#ff5fd2":"#3ee8ff"),...n.entity?{entity:n.entity}:{},...r?{}:{thing:!0}})}return e}showNote(t){this._note=t,clearTimeout(this.noteTimer),this.noteTimer=setTimeout(()=>this._note=null,3500)}occupiedRooms(t,e){let n=new Map;for(let i of this.lastPersons)i.roomId&&n.set(i.roomId,i);for(let i of e.floors)for(let r of i.rooms){if(n.has(r.id)||!r.area_id)continue;wt(t,r.area_id).some(a=>{let l=t.states[a];return a.startsWith("binary_sensor.")&&l?.state==="on"&&["presence","occupancy","motion"].includes(String(l.attributes.device_class))})&&n.set(r.id,{floorId:i.id,roomId:r.id})}return[...n.values()]}planSpeakers(t,e){let n=[],i=new Set;for(let r of e.floors){let s=(a,l)=>ot(r).find(c=>c.points.length>=3&&W([a,l],c.points))?.id??null;for(let a of r.placements)!a.entity_id.startsWith("media_player.")||i.has(a.entity_id)||!t.states[a.entity_id]||(i.add(a.entity_id),n.push({entity:a.entity_id,name:B(t,a.entity_id),floorId:r.id,roomId:s(a.x,a.z),at:[a.x,a.z],top:a.y??1.1}));for(let a of r.furniture){let l=a.entity;!l||!l.startsWith("media_player.")||i.has(l)||!t.states[l]||(i.add(l),n.push({entity:l,name:B(t,l),floorId:r.id,roomId:s(a.x,a.z),furnitureId:a.id,at:[a.x,a.z],top:mt(r,a)+a.h}))}}return n}roomSheets(t){let e=this.hass,n=this.building;if(!e||!n||this.ro||!Ye())return[];let i=n.floors.find(r=>ot(r).some(s=>s.id===t));return i?Os(this.sceneHost(e,n),{floorId:i.id,roomId:t}).map(r=>({id:r.id,icon:r.icon,title:r.title})):[]}plainOf=null;drawnPlan="";condOf=null;shownSig="";conditioned(){let t=this.building,e=As(this.hass,t);this.shownSig=e;let n=Mi(t,this.rooms),i=!this.surroundings&&!!t?.settings.surroundings,r=`${e}|${n.join(",")}|${i}`;if(!t||!e&&!n.length&&!i)return t;if(this.condOf?.from===t&&this.condOf.sig===r)return this.condOf.to;let s=e?{...t,floors:t.floors.map(a=>({...a,furniture:a.furniture.filter(l=>Rs(this.hass,l))}))}:t;return n.length&&(s=Ii(s,n)),i&&s.settings.surroundings&&(s={...s,settings:{...s.settings,surroundings:null}}),this.condOf={from:t,sig:r,to:s},s}shownBuilding(){let t=this.conditioned();if(!t||!this.plain)return t;if(this.plainOf?.from===t)return this.plainOf.to;let e=i=>$r.has(i.type)||i.type==="stairwell"||!!vt(i.type)?.hole,n={...t,floors:t.floors.map(i=>({...i,furniture:i.furniture.filter(e)}))};return this.plainOf={from:t,to:n},n}openRoomSheet(t,e){let n=this.building?.floors.find(i=>i.rooms.some(r=>r.id===t));this._sheet={id:e,floorId:n?.id??null,roomId:t}}currentSheet(t,e){let n=this._sheet;if(!n)return null;let i=this.sceneHost(t,e);return(n.roomId&&n.floorId?Os(i,{floorId:n.floorId,roomId:n.roomId}):Hs(i)).find(s=>s.id===n.id)??null}openModulePopup(t,e=6e4){clearTimeout(this.popupTimer),this._popup={id:t},this.popupValues={},this.popupTimer=setTimeout(()=>this._popup=null,e)}closeModulePopup(){clearTimeout(this.popupTimer),this._popup=null,this.popupValues={}}renderModulePopup(){let t=this.hass,e=this.building,n=this._popup;if(!t||!e||!n)return y;let i=Yu(this.sceneHost(t,e)).find(l=>l.id===n.id);if(!i)return y;let r=()=>this.closeModulePopup(),s=l=>E(t,l),a=l=>{switch(l.kind){case"image":{let c=l.live&&G("camera_cockpit")&&e.settings.director?.live?this.liveFor(l.live):null;return c?g`<div class="fp3d-pop-big fp3d-pop-live">${c}</div>`:g`<img class="fp3d-pop-big" src=${l.src} alt="" />`}case"text":return g`<p class=${l.muted?"fp3d-sub":"fp3d-pop-text"}>${l.text}</p>`;case"heading":return g`<h4 class="fp3d-pop-h">${l.text}</h4>`;case"line":return g`<div class="fp3d-pop-line"><span>${l.text}</span>${l.sub?g`<span>${l.sub}</span>`:y}${l.note?g`<em>${l.note}</em>`:y}</div>`;case"groups":return l.groups.length?g`<div class="fp3d-pop-groups">
                ${l.groups.map(c=>g`<section class=${c.strong?"fp3d-pop-strong":""}>
                    <h4 role=${c.onToggle?"button":y} tabindex=${c.onToggle?0:y} @click=${()=>c.onToggle?.()}>${c.title} ${c.onToggle?g`<small>${c.open?"\u25BE":"\u25B8"}</small>`:y}</h4>
                    ${c.rows.map(d=>g`<div class="fp3d-pop-row ${d.leadStrong?"fp3d-pop-rowlive":""}" style=${d.color?`--cal:${d.color}`:""}>
                        <span class="fp3d-pop-lead">${d.lead}</span>
                        <span class="fp3d-pop-sum">${d.text}${d.sub?g`<small> · ${d.sub}</small>`:y}${c.open&&d.detail?g`<em>${d.detail}</em>`:y}</span>
                      </div>`)}
                  </section>`)}
              </div>`:g`<p class="fp3d-sub">${l.empty??""}</p>`;case"checklist":return g`<div class="fp3d-pop-todo">
            ${l.items.length?l.items.map(c=>g`<label class="fp3d-pop-todoitem ${c.done?"fp3d-pop-done":""}">
                    <input type="checkbox" .checked=${c.done} ?disabled=${this.ro} @change=${()=>{c.onToggle()}} />
                    <span>${c.text}</span>
                  </label>`):g`<p class="fp3d-sub">${l.empty??""}</p>`}
          </div>`;case"people":return g`<div class="fp3d-pop-people">
            ${l.items.map(c=>g`<div class="fp3d-pop-personrow ${c.bright?"fp3d-pop-bright":""}">
                ${c.picture?g`<img src=${c.picture} alt="" />`:g`<span class="fp3d-pop-initial">${c.name.slice(0,1)}</span>`}
                <div><b>${c.name}</b><span>${c.sub}</span></div>
              </div>`)}
          </div>`;case"tiles":return g`<div class="fp3d-pop-tiles">${l.items.map(c=>g`<div><small>${c.label}</small><span>${c.symbol}</span><b>${c.main}</b>${c.sub?g`<small>${c.sub}</small>`:y}</div>`)}</div>`;case"media":return g`<div class="fp3d-pop-media">
            ${l.picture?g`<img class="fp3d-pop-cover" src=${l.picture} alt="" />`:y}
            <div class="fp3d-pop-mediatext">
              <b>${l.title}</b>
              ${l.sub?g`<span>${l.sub}</span>`:y}
              ${l.buttons?.length?g`<div class="fp3d-pop-ctl">${l.buttons.map(c=>g`<button class="fp3d-chip" @click=${()=>{c.onTap()}}>${c.label}</button>`)}</div>`:y}
            </div>
          </div>`;case"form":{if(this.ro)return y;if(!l.open)return g`<button class="fp3d-btn fp3d-pop-addbtn" @click=${()=>l.onOpen()}>${l.button}</button>`;let c=u=>this.popupValues[`${l.id}:${u.id}`]??u.value,d=(u,p)=>this.popupValues={...this.popupValues,[`${l.id}:${u.id}`]:p};return g`<form class="fp3d-pop-form" @submit=${u=>{u.preventDefault(),l.onSubmit(Object.fromEntries(l.fields.map(p=>[p.id,c(p)])))}}>
            ${l.fields.map(u=>u.kind==="select"?g`<select class="fp3d-pop-in" @change=${p=>d(u,p.target.value)}>
                    ${(u.options??[]).map(p=>g`<option value=${p.id} ?selected=${p.id===c(u)}>${p.label}</option>`)}
                  </select>`:g`<input class="fp3d-pop-in" type=${u.kind} placeholder=${u.placeholder??""} .value=${c(u)} @input=${p=>d(u,p.target.value)} />`)}
            <div class="fp3d-pop-ctl"><button class="fp3d-btn fp3d-primary" type="submit">${l.submit}</button><button class="fp3d-btn" type="button" @click=${()=>l.onCancel()}>${s("cancel")}</button></div>
          </form>`}case"input":return this.ro?y:g`<form class="fp3d-pop-form" @submit=${c=>{c.preventDefault();let d=c.target.querySelector("input");l.onSubmit(d.value),d.value=""}}>
                <input class="fp3d-pop-in" placeholder=${l.placeholder} />
                <button class="fp3d-btn fp3d-primary" type="submit">${l.button}</button>
              </form>`;default:return y}};return g`<div class="fp3d-sheet-backdrop" @click=${r}></div>
      <div class="fp3d-sheet fp3d-pop ${i.wide?"fp3d-pop-wide":""}" role="dialog" aria-label=${i.title}>
        <header><span>${i.icon?`${i.icon} `:""}${i.title}</span><button class="fp3d-sheet-x" aria-label=${s("close")} @click=${r}>✕</button></header>
        ${i.sections.map(a)}
      </div>`}renderSheet(){let t=this.hass,e=this.building;if(!t||!e||!this._sheet)return y;let n=this.currentSheet(t,e);if(!n)return y;let i=d=>E(t,d),r=this._sheet.roomId?e.floors.flatMap(d=>d.rooms).find(d=>d.id===this._sheet.roomId):void 0,s=()=>this._sheet=null,a=async d=>{s();try{await d()}catch(u){console.warn("HomePlan 3D: module sheet failed",u)}},l=()=>{let u=this.renderRoot.querySelector(".fp3d-sheet-input")?.value.trim();u&&n.input&&a(()=>n.input.onSubmit(u))},c=async()=>{let d=this.renderRoot.querySelector(".fp3d-sheet-input");if(!d)return;d.placeholder=i("sheet_listening");let p=await this.sceneHost(t,e).listen?.(()=>d.placeholder=i("sheet_listening"));d.placeholder=n.input?.placeholder??"",p?d.value=p:this.showNote(i("sheet_mic_failed"))};return g`<div class="fp3d-sheet-backdrop" @click=${s}></div>
      <div class="fp3d-sheet" role="dialog" aria-label=${n.title}>
        <header>
          <b><span aria-hidden="true">${n.icon}</span> ${n.title}${r?` \xB7 ${r.name}`:""}</b>
          <button class="fp3d-sheet-x" aria-label=${i("close")} @click=${s}>✕</button>
        </header>
        ${n.choice?g`<div class="fp3d-sheet-choice">
              ${n.choice.options.map(d=>g`<button class="fp3d-chip" aria-pressed=${d.id===n.choice.value} @click=${()=>{n.choice.set(d.id),this.requestUpdate()}}>${d.label}</button>`)}
            </div>`:y}
        ${n.chips?.length?g`<div class="fp3d-sheet-chips">${n.chips.map(d=>g`<button class="fp3d-sheet-chip" @click=${()=>{a(()=>d.onTap())}}>${d.label}</button>`)}</div>`:y}
        ${n.input?g`<div class="fp3d-sheet-row">
              <input class="fp3d-sheet-input" placeholder=${n.input.placeholder} @keydown=${d=>d.key==="Enter"&&l()} />
              ${n.input.mic?g`<button class="fp3d-btn fp3d-sheet-mic" title=${i("sheet_mic")} aria-label=${i("sheet_mic")} @click=${()=>{c()}}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" /></svg>
                  </button>`:y}
              <button class="fp3d-btn fp3d-primary" @click=${l}>${n.input.button}</button>
            </div>`:y}
        ${n.lines?.length?g`<div class="fp3d-sheet-lines">${n.lines.map(d=>g`<p>${d}</p>`)}</div>`:y}
        ${t.user?.is_admin&&!this.ro&&Ns().length?g`<button class="fp3d-sheet-gear" @click=${()=>{s(),this._settingsOpen=!0,this.updateComplete.then(()=>this.renderRoot.querySelector(".fp3d-set-module")?.scrollIntoView({block:"start"}))}}>⚙ ${i("view_settings")}</button>`:y}
      </div>`}setPlanSettings(t){let e=this.building;if(!e||!this.hass?.user?.is_admin||this.ro||this.noSave)return;let n=structuredClone(e);Object.assign(n.settings,t),this.building=n,Vn(this.hass,n,this.planId??void 0).catch(i=>this.serviceFailed("homeplan3d/building/save",i))}renderSettings(){let t=this.hass,e=this.building;if(!t||!e||!this._settingsOpen)return y;let n=d=>E(t,d),i=!!t.user?.is_admin&&!this.ro&&!this.noSave,r=e.settings,s=(d,u,p,h)=>g`<label class="fp3d-set-check" title=${h?n(h):""}
        ><input type="checkbox" .checked=${u} ?disabled=${!i} @change=${_=>this.setPlanSettings(p(_.target.checked))} /> ${n(d)}</label
      >`,a=this.sceneHost(t,e),l=sn(),c=Ns().map(d=>{let u=Zu(d,a);if(!u.length||u[0].kind==="heading")return u;let p=l.find(_=>_.id===d);return[{kind:"heading",text:p?Il(p,t.language??"en").replace(/^(Modul|Module):\s*/i,""):d},...u]}).filter(d=>d.length);return g`<div class="fp3d-sheet-backdrop" @click=${()=>this._settingsOpen=!1}></div>
      <div class="fp3d-sheet fp3d-settings" role="dialog" aria-label=${n("view_settings")}>
        <header>
          <b>⚙ ${n("view_settings")}</b>
          <button class="fp3d-sheet-x" aria-label=${n("close")} @click=${()=>this._settingsOpen=!1}>✕</button>
        </header>
        ${i?y:g`<p class="fp3d-set-note">${n("view_settings_admin")}</p>`}
        <h4>${n("view_settings_look")}</h4>
        ${s("sky",r.sky!==!1,d=>({sky:d}),"sky_hint")}
        ${s("flyin",!!r.flyin,d=>(d&&setTimeout(()=>this.maybeFlyIn(!0),300),{flyin:d||void 0}),"flyin_hint")}
        ${s("sun_shadow",r.sun_shadow!==!1,d=>({sun_shadow:d}),"sun_shadow_hint")}
        ${r.sun_shadow!==!1?g`<label class="fp3d-set-field" title=${n("sun_arc_hint")}
              >${n("sun_arc")}
              <select ?disabled=${!i} @change=${d=>this.setPlanSettings({sun_arc:d.target.value==="plot"?"plot":null})}>
                <option value="house" ?selected=${r.sun_arc!=="plot"}>${n("sun_arc_house")}</option>
                <option value="plot" ?selected=${r.sun_arc==="plot"}>${n("sun_arc_plot")}</option>
              </select></label
            >`:y}
        ${s("window_glow",r.window_glow!==!1,d=>({window_glow:d}),"window_glow_hint")}
        ${Ys(Ni)?g`<p class="fp3d-set-note">${n("gpu_safe_note")}</p>`:y}
        ${s("sun_patches",r.sun_patches!==!1,d=>({sun_patches:d}))}
        ${this.renderGlassSize(n,i,r)}
        <h4>${n("view_settings_control")}</h4>
        ${s("tap_in_room",!!r.tap_in_room,d=>({tap_in_room:d}),"tap_in_room_hint")}
        ${s("right_click_back",!!r.right_click_back,d=>({right_click_back:d}),"right_click_back_hint")}
        <h4>${n("view_settings_alerts")}</h4>
        ${s("rain_warning",r.rain_warning!==!1,d=>({rain_warning:d}))}
        ${s("alert_unavailable",!!r.alert_unavailable,d=>({alert_unavailable:d}))}
        ${s("alert_names",r.alert_names!==!1,d=>({alert_names:d}))}
        ${c.map(d=>g`<div class="fp3d-set-module">${d.map(u=>this.renderViewField(t,u,i))}</div>`)}
        <p class="fp3d-set-note">${n("view_settings_more")}</p>
      </div>`}renderGlassSize(t,e,n){let i=n.roof.hologram??Yt,r=[.75,1,1.25,1.5,2],s=r.includes(i.size)?r:[...r,i.size].sort((a,l)=>a-l);return g`<label class="fp3d-set-field" title=${t("glass_size_hint")}
      >${t("glass_size")}
      <select ?disabled=${!e} @change=${a=>this.setPlanSettings({roof:{...n.roof,hologram:{...i,size:Number(a.target.value)}}})}>
        ${s.map(a=>g`<option value=${a} ?selected=${a===i.size}>${Math.round(a*100)} %</option>`)}
      </select></label
    >`}renderViewField(t,e,n){switch(e.kind){case"heading":return g`<h4>${e.text}</h4>`;case"text":return g`<p class="fp3d-set-note">${e.text}</p>`;case"check":return g`<label class="fp3d-set-check"><input type="checkbox" .checked=${e.value} ?disabled=${!n} @change=${i=>e.set(i.target.checked)} /> ${e.label}</label>`;case"select":return g`<label class="fp3d-set-field"
          >${e.label}
          <select ?disabled=${!n} @change=${i=>e.set(i.target.value)}>
            ${e.options.map(i=>g`<option value=${i.id} ?selected=${i.id===e.value}>${i.label}</option>`)}
          </select></label
        >`;case"entity":{let i=Object.keys(t.states).filter(r=>e.filter(r)).sort((r,s)=>B(t,r).localeCompare(B(t,s)));return g`<label class="fp3d-set-field"
          >${e.label}
          <select ?disabled=${!n} @change=${r=>{let s=r.target.value;e.set(s===""?null:s)}}>
            <option value="" ?selected=${!e.value}>${e.auto?E(t,"entity_auto",{name:B(t,e.auto)}):"\u2014"}</option>
            ${i.map(r=>g`<option value=${r} ?selected=${r===e.value}>${B(t,r)}</option>`)}
          </select></label
        >`}case"lines":return ou(e.value,!n,{label:e.label,placeholder:e.placeholder??E(t,"lines_new"),add:E(t,"lines_add"),remove:E(t,"delete")},i=>e.set(i));case"button":return g`<button class="fp3d-btn ${e.primary?"fp3d-primary":""}" ?disabled=${!n} title=${e.title??""} @click=${()=>e.onTap()}>${e.label}</button>`}}renderNote(){return this._note?g`<div class="fp3d-note" role="status">${this._note}</div>`:y}spokenAlerts(t,e){let n=new Map(e.floors.flatMap(i=>ot(i).map(r=>[r.id,r.name])));return this._alerts.map(i=>({kind:i.kind,entity:i.entity,name:B(t,i.entity),...i.text?{text:i.text}:{},room:i.roomId?n.get(i.roomId)??null:null,floorId:i.floorId,roomId:i.roomId}))}spokenCars(t,e){if(!G("auto_pro"))return[];let n=[];for(let i of e.floors)for(let r of i.furniture){if(r.type!=="parking"||!r.car)continue;let s=Pn(t,r),a=Jn(t,r),l=a.entities.tracker?t.states[a.entities.tracker]:void 0,c=!!s&&!(l&&!Ti.has(l.state.toLowerCase()));n.push({name:r.name||(s?kt(t,s):kt(t,"car")),spot:r.id,floorId:i.id,present:c,away:a.away,soc:a.soc,range:a.range,rangeUnit:a.rangeUnit,charging:a.charging,chargingW:a.chargingW,plugged:a.plugged,locked:a.locked})}return n}renderSwipe(){let t=this._swipe;if(!t||!this.hass)return y;let e=t.kind==="light"&&t.value<=0;return g`<div class="fp3d-swipe" style="left:${t.x}px;top:${t.y}px">
      <span>${B(this.hass,t.entity)}</span>
      <b>${e?E(this.hass,"swipe_off"):`${t.value} %`}</b>
      <i><em style="height:${t.value}%"></em></i>
    </div>`}lookThrough(t){let e=this.viewer,n=this.building;if(!e||!n||this.ro)return;let i=n.floors.find(s=>s.placements.some(a=>a.entity_id===t))?.id;if(!i)return;this._menu=null,this._through?this._through={...this._through,entity:t,ready:!1}:this._through={entity:t,back:e.getView(),ready:!1},this.watchCameras(!0);let r=this.floorId===i?0:300;r&&(this.throughFloor=i,this.fire("floor-tap",{floorId:i})),setTimeout(()=>{this._through?.entity===t&&!this.viewer?.lookThrough(t)&&(this._through=null)},r),setTimeout(()=>{this._through?.entity===t&&(this._through={...this._through,ready:!0})},r+950)}endThrough(){let t=this._through;t&&(this._through=null,this.live?.id===t.entity&&(this.live=null),this.viewer?.endLook(),this.viewer?.flyTo(t.back),this.throughWall&&(this.throughWall=!1,this.dispatchEvent(new CustomEvent("camera-wall-open",{bubbles:!0,composed:!0}))))}renderCameraWall(){if(!this.cameraWall||!this.hass||!this.building||this.ro)return y;let t=this.hass,e=()=>{this._wallBig=null,this.live=null,this.dispatchEvent(new CustomEvent("camera-wall-close",{bubbles:!0,composed:!0}))},n=[...new Set(this.building.floors.flatMap(d=>d.placements.map(u=>u.entity_id)).filter(d=>L(d)==="camera"))];this.watchCameras(!0);let i=d=>{let u=t.states[d],p=u?.attributes.entity_picture;return p&&u&&!Q(u)?p.startsWith("data:")?p:`${p}${p.includes("?")?"&":"?"}fp3d=${this.cameraTick}`:null},r=d=>{let u=t.states[d];return g`${B(t,d)}${u?.state==="recording"?g` <b>● ${E(t,"state_recording")}</b>`:y}`},s=this._wallBig&&n.includes(this._wallBig)?this._wallBig:null;if(s){let d=i(s),u=this.liveFor(s),p=()=>{this.throughWall=!0,e(),this.lookThrough(s)};return g`<div class="fp3d-wall">
        <div class="fp3d-wall-head">
          <button
            class="fp3d-chip"
            @click=${()=>{this._wallBig=null,this.live=null}}
          >
            ‹ ${E(t,"camera_wall_all")}
          </button>
          <span class="fp3d-wall-title">${r(s)}</span>
          <span class="fp3d-wall-tools"><button class="fp3d-chip" @click=${p}>${E(t,"through_camera")}</button><button class="fp3d-chip" aria-label="✕" @click=${e}>✕</button></span>
        </div>
        <div class="fp3d-wall-big">${u??(d?g`<img src=${d} alt="" />`:g`<div class="fp3d-wall-none">${E(t,"state_unavailable")}</div>`)}</div>
      </div>`}let a=this.renderRoot.querySelector(".fp3d-wall-grid");a||requestAnimationFrame(()=>this.requestUpdate());let{cols:l,tile:c}=kp(n.length,a?.clientWidth??this.clientWidth-48,a?.clientHeight??this.clientHeight-160);return g`<div class="fp3d-wall">
      <div class="fp3d-wall-head">
        <span>${E(t,"camera_wall_title")} · ${n.length} <span class="fp3d-still">${E(t,"camera_still",{s:this._low?10:5})}</span></span>
        <button class="fp3d-chip" aria-label="✕" @click=${e}>✕</button>
      </div>
      <div class="fp3d-wall-grid" style="grid-template-columns: repeat(${l}, ${c}px); grid-auto-rows: ${Math.round(c*9/16)}px">
        ${n.map(d=>{let u=i(d),p=Ut(t,d).some(h=>t.states[h]?.state==="on");return g`<button class="fp3d-wall-cam ${p?"fp3d-wall-seen":""}" title=${E(t,"camera_wall_big")} @click=${()=>this._wallBig=d}>
            ${u?g`<img src=${u} alt="" />`:g`<div class="fp3d-wall-none">${E(t,"state_unavailable")}</div>`}
            <span class="fp3d-wall-name">${r(d)}</span>
          </button>`})}
      </div>
    </div>`}liveFor(t){if(this.live?.id!==t){let e={id:t,el:null,failed:!1};this.live=e;let n=window;n.loadCardHelpers?n.loadCardHelpers().then(i=>{if(this.live!==e)return;let r=i.createCardElement({type:"picture-entity",entity:t,camera_view:"live",show_name:!1,show_state:!1,tap_action:{action:"none"},hold_action:{action:"none"}});r.hass=this.hass,e.el=r,this.requestUpdate()}).catch(()=>{e.failed=!0,this.requestUpdate()}):e.failed=!0}return this.live.el}popOnDetection(t,e){let n=this.now();for(let i of Ut(t,e)){let r=t.states[i];if(r?.state!=="on"||!r.last_changed)continue;let s=Date.parse(r.last_changed),a=`${i}@${r.last_changed}`;if(this.popSeen.has(a)||n-s>3e4)continue;this.popSeen.add(a),this.popSeen.size>200&&(this.popSeen=new Set([...this.popSeen].slice(-50)));let l=t.states[e],c=l?.attributes.entity_picture,d=c&&!Q(l)?c.startsWith("data:")?c:`${c}${c.includes("?")?"&":"?"}fp3d=${Date.now()}`:null;this._camPop={entity:e,text:`${E(t,`detect_${io(t,i)}`)} \xB7 ${B(t,e)}`,until:n+2e4,src:d},clearTimeout(this.camPopTimer),this.camPopTimer=setTimeout(()=>this._camPop=null,2e4);return}}camPopTimer;renderCamPop(){let t=this._camPop;return!t||!this.hass||this._through?y:g`<div class="fp3d-campop" role="status">
      <button class="fp3d-campop-img" title=${E(this.hass,"camera_popup_open")} @click=${()=>(this._camPop=null,this.lookThrough(t.entity))}>
        ${t.src?g`<img src=${t.src} alt="" />`:y}
      </button>
      <div class="fp3d-campop-bar"><span>${t.text}</span><button class="fp3d-chip" aria-label=${E(this.hass,"close")} @click=${()=>this._camPop=null}>✕</button></div>
    </div>`}zoomDef(){return In(this.building?.settings.styles_custom),this.zoomStyle?Ee(this.zoomStyle)??null:null}renderZoomBackground(){let t=this.morph,e=this.zoomDef()?.bg;return e?g`<div class="fp3d-zoom-bg" style="opacity:${t};background:linear-gradient(180deg, ${e[0]}, ${e[1]})"></div>`:y}renderThrough(){let t=this._through;if(!t||!this.hass)return y;let e=this.hass.states[t.entity],n=e?.attributes.entity_picture,i=n&&!Q(e)?n.startsWith("data:")?n:`${n}${n.includes("?")?"&":"?"}fp3d=${this.cameraTick}`:null,r=this.building?.settings.director?.live?this.liveFor(t.entity):null;return g`<div class="fp3d-through" style="--fp3d-blend:${this._blend}">
      ${t.ready?r?g`<div class="fp3d-through-img fp3d-through-live">${r}</div>`:i?g`<img class="fp3d-through-img" src=${i} alt="" />`:y:y}
      <div class="fp3d-through-bar">
        <span class="fp3d-through-name">${B(this.hass,t.entity)}</span>
        <span class="fp3d-still">${r?"\u25CF Live":E(this.hass,"camera_still",{s:this._low?10:5})}</span>
        <input
          type="range"
          min="0"
          max="100"
          .value=${String(Math.round(this._blend*100))}
          aria-label=${E(this.hass,"through_blend")}
          @input=${s=>this._blend=Number(s.target.value)/100}
        />
        <button class="fp3d-chip" title=${E(this.hass,"through_full_hint")} @click=${()=>this.throughFull(t.entity)}>⛶ ${E(this.hass,"through_full")}</button>
        <button class="fp3d-chip" @click=${()=>this.endThrough()}>${E(this.hass,"through_back")}</button>
      </div>
    </div>`}throughFull(t){let e=this.renderRoot.querySelector(".fp3d-through-img");e&&typeof e.requestFullscreen=="function"?e.requestFullscreen().catch(()=>Mt(this,t)):Mt(this,t)}renderMenu(){let t=this._menu;if(!t||!this.hass||this.ro)return y;let e=this.renderRoot.querySelector(".fp3d-stage"),n=e?.clientWidth??800,i=e?.clientHeight??600,r=Math.max(8,Math.min(n-240,t.x-116)),s=Math.max(8,Math.min(i-360,t.y-170));return g`<div class="fp3d-menu-backdrop" @click=${()=>!this._menuFresh&&(this._menu=null)}></div>
      <fp3d-quick-menu
        style="left:${r}px;top:${s}px;${this._menuFresh?"pointer-events:none":""}"
        ?low=${this._low}
        .hass=${this.hass}
        .entity=${t.entity}
        .car=${t.car??null}
        ?doorLock=${!!t.doorLock}
        ?slatInvert=${Qn(this.building,t.entity)}
        .presets=${G("sound")?this.building?.settings.media_presets??[]:[]}
        ?confirmSwitch=${this.confirmSet.has(t.entity)}
        ?pro=${G("camera_cockpit")}
        @close=${()=>this._menu=null}
        @camera-look=${a=>this.lookThrough(a.detail.entity)}
      ></fp3d-quick-menu>`}moduleMarkers(t){let e=[];for(let n of this.scene){if(n.kind!=="marker")continue;let i=t.floors.find(d=>d.id===n.floorId),r=n.furnitureId?i?.furniture.find(d=>d.id===n.furnitureId):void 0;if(!i||!r&&!n.at)continue;let[s,a]=r?[r.x,r.z]:n.at,l=rp(n.path),c=ip(n.emoji);e.push({id:`module:${n.id}`,floorId:i.id,roomId:i.rooms.find(d=>d.points.length>=3&&W([s,a],d.points))?.id??null,x:s,z:a,y:n.y??(r?mt(i,r)+r.h*.6:1.2),icon:c?`<span style="font-size:18px;line-height:1" aria-hidden="true">${c}</span>`:l?`<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${l}"/></svg>`:"",name:n.name,text:n.text??"",active:!!n.active&&!this.dimmed,unavailable:!1,glow:n.color&&n.active&&!this.dimmed?{color:n.color,level:1}:null,pin:!0,full:!0,...r?{furnitureId:r.id}:{}})}return e}openModuleCard(t){let e=this.scene.find(r=>r.kind==="marker"&&r.id===t);if(!e)return;if(e.sheet){this.openRoomSheet(e.sheet.roomId,e.sheet.id);return}e.card&&(this.mediaFolded.delete(e.card),this.cardPing=e.card,clearTimeout(this.cardPingTimer),this.cardPingTimer=setTimeout(()=>{this.cardPing=null,this.requestUpdate()},2600),this.requestUpdate());let n=this.building?.floors.find(r=>r.id===e.floorId),i=n?.furniture.find(r=>r.id===e.furnitureId);n&&i&&this.viewer?.focus(n.id,i.x,i.z,mt(n,i)+i.h*.6,`module:${e.id}`)}onDeviceTap(t,e=0,n=0){if(t.startsWith("trail:")||t.startsWith("lamp:"))return;if(t.startsWith("module:"))return this.openModuleCard(t.slice(7));if(t.startsWith("popup:"))return this.openModulePopup(t.slice(6));if(t.startsWith("opening:"))return this.onOpeningTap(t.slice(8),e,n,!1);if(t.startsWith("gangs:")){let r=t.slice(6),s=this.building?.floors.flatMap(c=>c.furniture).find(c=>c.id===r);if(!s)return;let a=No(s);if(a.length===1)return this.onDeviceTap(a[0],e,n);if(a.length>1){this._gangMenu={furnitureId:r,x:e,y:n};return}let l=Un(s).find(c=>c.power&&c.power!=="none")?.power;l&&(this.ro?this.showInfo(l,e,n):Mt(this,l));return}if(t.startsWith("hh:")){let[r,s]=t.slice(3).split("#");this.building?.floors.flatMap(l=>l.furniture).find(l=>l.id===s&&l.type==="waste_bin")?(this._binInfo={furnitureId:s,x:e,y:n},clearTimeout(this.binInfoTimer),this.binInfoTimer=setTimeout(()=>this._binInfo=null,6e3)):this.ro?this.showInfo(r,e,n):Mt(this,r);return}if(this.ro){let r=this.building,s=r?r.energy.grid??Mn(r,l=>this.furnitureLinks?.get(l.id)?.power??null).grid:null,a=t==="grid"?s:t.startsWith("detect:")?t.slice(7):t;a&&this.showInfo(a,e,n);return}if(t==="grid"){let r=this.building,s=r?r.energy.grid??Mn(r,a=>this.furnitureLinks?.get(a.id)?.power??null).grid:null;s&&Mt(this,s);return}if(t.startsWith("detect:")){Mt(this,t.slice(7));return}let i=L(t);if(i==="cover"||i==="camera"){this._menu={entity:t,x:e,y:n};return}if(i&&sc.has(i)){if(this.confirmSet.has(t)&&!confirm(E(this.hass,"confirm_switch",{name:B(this.hass,t)})))return;ui(this.hass,t)}else Mt(this,t)}onOpeningTap(t,e,n,i){let r=this.openingLinks?.get(t);if(!r||!this.hass)return;if(r.lock&&!r.cover){this.ro?this.showInfo(r.lock,e,n):this._menu={entity:r.lock,x:e,y:n,doorLock:!0};return}let s=r.cover;if(!s)return;if(this.ro){this.showInfo(r.contact??s,e,n);return}if(i){Mt(this,s);return}let a=this.hass.states[s];if(!a||Q(a)){Mt(this,s);return}if(this.confirmSet.has(s)&&!confirm(E(this.hass,"confirm_switch",{name:B(this.hass,s)})))return;let[l]=s.split(".");this.hass.callService(l,l==="switch"?"turn_on":"press",{entity_id:s})}effectiveTheme(){return this.effectiveStyle().base}effectiveStyle(){let t=this.hass,e=this.building?.settings,n=this._styleOverride,i=n&&(n.until===null||n.until>Date.now())?n.style:null,r=this.styleEntity||e?.style_entity||null;In(e?.styles_custom);let s={};for(let c of Ke())s[c.id]=[c.name??E(t,`style_${c.id}`)];let a=t?.states["sun.sun"]?.state,l=Pu({choice:this.theme,evening:this.themeEvening,night:this.themeNight,plan:e,entityState:r?t?.states[r]?.state??null:null,override:i,now:new Date,sunUp:a==="above_horizon"?!0:a==="below_horizon"?!1:null,names:s});return Ee(l)??Ee("neon")}setStyleOverride(t,e){let n=t===""||t==="reset"||t==="auto_reset"?null:Ee(t)?t:$i(t);this._styleOverride=n?{style:n,until:e?Date.now()+e*6e4:null}:null;try{this._styleOverride?localStorage.setItem(ca,JSON.stringify(this._styleOverride)):localStorage.removeItem(ca)}catch{}return this.viewer?.setStyle(this.effectiveStyle()),n}onStyle(t){let e=(this.screen??"").trim().toLowerCase();t.screens.length&&!t.screens.some(n=>n.trim().toLowerCase()===e)||this.setStyleOverride(t.style,t.minutes??null)}styleSentence(t){let e=this.hass,n=t.toLowerCase().trim(),i=/\b(style|look|design)\b/.test(n),r=n.replace(/\b(neon ?plan|house|please|set|switch|change|to|in|the|on|mode|style|look|design)\b/g," ").replace(/\s+/g," ").trim();if(i&&/^(normal|reset|back|default|auto)$/.test(r))return this.setStyleOverride("reset",null),E(e,"style_reset");In(this.building?.settings.styles_custom);let s={};for(let l of Ke())s[l.id]=[l.name??E(e,`style_${l.id}`)];let a=$i(r,s);return a?(this.setStyleOverride(a,null),E(e,"style_set",{name:Ee(a)?.name??E(e,`style_${a}`)})):null}startViewOf(){return this.startView??this.building?.settings.start_view??null}currentView(){return this.viewer?.currentView()??null}resetView(){this._through=null,this.viewer?.resetView()}fire(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}toggleHolos(){this._holoShow=!this._holoShow;try{localStorage.setItem("homeplan3d.holos",this._holoShow?"1":"0")}catch{}}holoVisible(){return this.holograms??this._holoShow}cardsOn(){return(this.showEnergy||!!this.holograms)&&this.holoVisible()&&!this._cardsQuiet}toggleFlows(){this._flows=!this._flows;try{localStorage.setItem("homeplan3d.flows",this._flows?"1":"0")}catch{}this.syncDevices(!0)}renderEnergy(){let t=this._energy;if(!G("energy_pro")||!t||this.roomId||!this.showEnergy)return y;let e=i=>E(this.hass,i),n=[];if(t.consumption!==null&&n.push({cls:"total",label:e("energy_consumption"),value:rt(this.hass,t.consumption)}),t.grid!==null){let i=t.grid<0;n.push({cls:i?"export":"grid",label:e(i?"energy_grid_export":"energy_grid_import"),value:rt(this.hass,Math.abs(t.grid))})}if(t.solar!==null&&n.push({cls:"solar",label:e("energy_solar"),value:rt(this.hass,t.solar)}),t.battery!==null||t.soc!==null){let i=[t.battery!==null?rt(this.hass,Math.abs(t.battery)):null,t.soc!==null?`${Math.round(t.soc)} %`:null].filter(Boolean);n.push({cls:"battery",label:e("energy_battery"),value:i.join(" \xB7 ")})}return t.tariff&&n.push({cls:"tariff",label:e("energy_tariff"),value:`${nt(this.hass,t.tariff.value,3)} ${t.tariff.unit}`.trim()}),g`<div class="fp3d-energy" aria-live="off">
      ${this._holoOn?y:n.map(i=>g`<div class="fp3d-energy-item fp3d-energy-${i.cls}"><span>${i.label}</span><b>${i.value}</b></div>`)}
      ${this.flows!==null?y:g`<button class="fp3d-energy-item fp3d-flow-toggle" aria-pressed=${this._flows} title=${`${e("flows_hint")} (${e(this._flows?"flow_on":"flow_off")})`} aria-label=${e("flows")} @click=${()=>this.toggleFlows()}>
        <span>${e("flows")}</span><b>⚡</b>
      </button>`}
      ${this.holograms!==null||!this._holos.length?y:g`<button class="fp3d-energy-item fp3d-flow-toggle" aria-pressed=${this._holoShow} title=${e("holos_hint")} aria-label=${e("holos")} @click=${()=>this.toggleHolos()}>
        <span>${e("holos")}</span><b>◫</b>
      </button>`}
    </div>`}renderLegend(){if(this.heatMode==="none"||this.heatMode==="values")return y;let t=Si[this.heatMode],e=this.heatMode==="temperature",n=e?we(this.hass,t.stops[0][0]):t.stops[0][0],i=e?we(this.hass,t.stops[t.stops.length-1][0]):t.stops[t.stops.length-1][0],r=e?Lt(this.hass):t.unit,s=a=>E(this.hass,a);return g`<div class="fp3d-legend">
      <b>${s(`heat_${this.heatMode}`)}</b>
      <span class="fp3d-legend-bar" style="background:${Ru(this.heatMode)}"></span>
      <span class="fp3d-legend-range"><span>${nt(this.hass,n,0)} ${r}</span><span>${nt(this.hass,i,0)} ${r}</span></span>
      ${this.heatValues.size?y:g`<span class="fp3d-legend-none">${s("heat_none_found")}</span>`}
    </div>`}sunPathToday(t){let e=t.config?.latitude,n=t.config?.longitude;if(typeof e!="number"||typeof n!="number")return null;let i=`${new Date().toDateString()},${e},${n}`;return this.sunPathKey!==i&&(this.sunPathKey=i,this.sunPathCache=Op(Date.now(),e,n)),this.sunPathCache}skyColor(){let t=uo[this.effectiveTheme()]??uo.neon,e=this._sky;return t.night[0].map((n,i)=>Math.round(n+(t.day[0][i]-n)*e))}watchLightning(t){if(!t){clearTimeout(this.flashTimer),this.flashTimer=void 0;return}if(this.flashTimer)return;let e=()=>{this.flashTimer=setTimeout(()=>{document.hidden||(this._flash=!0,setTimeout(()=>this._flash=!1,140)),e()},5e3+Math.random()*9e3)};e()}render(){let t=this._sky,e=(l,c)=>`rgb(${l.map((d,u)=>Math.round(d+(c[u]-d)*t)).join(",")})`,n=uo[this.effectiveTheme()]??uo.neon,i=this.effectiveStyle().bg,r=Sp(this.building?.settings.backdrop)??(i?`linear-gradient(180deg, ${i[0]}, ${i[1]})`:null),a=`--fp3d-pin-k:${this.pinSize==="small"?.8:this.pinSize==="large"?1.25:1};--fp3d-room-scale:${eb(this.building)};--fp3d-sky:${e(n.night[0],n.day[0])};--fp3d-ground:${e(n.night[1],n.day[1])}${r?`;background:${r}`:""}`;return g`<div
      @touchstart=${this.keepTouch}
      @touchmove=${this.keepTouch}
      @touchend=${this.keepTouch}
      class="fp3d-stage ${this.effectiveTheme()==="day"?"fp3d-bright":""} ${this.roomLabels?"":"fp3d-no-room-names"} ${this._low?"fp3d-low":""} ${this.panelOpen?"fp3d-panel-open":""} ${this.controlsRight?"fp3d-side-right":""} ${this._alerts.length?"fp3d-has-alerts":""} ${this._through?"fp3d-through-on":""} ${this._flash?"fp3d-flash":""} ${this.replay?"fp3d-replay":""} ${this._spotHint?"fp3d-picking":""}"
      style=${a}
    >
      ${this.renderZoomBackground()}
      ${this._error?g`<p class="fp3d-error">${this._error}</p>`:y} ${this.clean?y:this.renderEnergy()} ${this.renderHologram()} ${this.clean?y:this.renderLegend()}
      ${this.clean&&this._find!==null&&!this._walk?this.renderFind():y}
      ${this.renderClock()} ${this.renderAlerts()} ${this.clean||this._walk?y:g`${this.renderHousehold()} ${this.renderThumbs()} ${this.renderScenes()} ${this.renderFind()} ${this.renderCentral()}`} ${this.clean?y:this.renderWalk()} ${this.renderSwipe()} ${this.renderInfo()} ${this.renderBinInfo()} ${this.renderGangMenu()} ${this.renderThrough()} ${this.renderCamPop()} ${this.renderCameraWall()} ${this.renderSheet()} ${this.renderModulePopup()} ${this.renderSettings()} ${this.renderNote()}
      ${this.renderMenu()} ${this.renderEye()} ${this.building?.settings.surroundings?.on&&this.surroundings?g`<a class="fp3d-osm-credit" href=${sp} target="_blank" rel="noopener">© OpenStreetMap</a>`:y}
      ${this.renderMic()} ${this.renderFlyIn()}
      ${this._spotHint?g`<button class="fp3d-spot-hint" @click=${()=>this.viewer?.pickSpot(null)}>📍 ${this._spotHint} <span aria-hidden="true">✕</span></button>`:y}
      ${this._announce?g`<div class="fp3d-announce" role="status" @click=${()=>this._announce=null}>📢 ${this._announce}</div>`:y}
      ${this.pivotMark&&!this._walk?g`<span class="fp3d-pivot" aria-hidden="true"></span>`:y}
      ${this._micProbe&&this.hass?g`<fp3d-mic-probe .hass=${this.hass} .building=${this.building} @close=${()=>(this._micProbe=!1,Li())}></fp3d-mic-probe>`:y}
      ${this.showStats&&this._stats?g`<span class="fp3d-stats"
            ><b>${this._stats.fps?E(this.hass,"stats_fps",{fps:this._stats.fps,ms:this._stats.worstMs}):E(this.hass,"stats_idle")}</b>
            ${this._stats.busy.length?g`(${this._stats.busy.map(l=>E(this.hass,`stats_busy_${l}`)).join(", ")})`:y} ·
            ${E(this.hass,"stats",{calls:this._stats.calls,tris:this._stats.triangles.toLocaleString()})} ·
            ${E(this.hass,this._stats.low?"stats_low":"stats_full",{r:nt(this.hass,this._stats.pixelRatio,2)})}${this.syncMs?` \xB7 sync ${nt(this.hass,this.syncMs,1)} ms`:""}</span
          >`:y}
    </div>`}static styles=[Tt,zt,ct`
      :host {
        display: block;
        position: relative;
        min-height: 200px;
      }
      /* a tag: light text on a solid dark plate, the bin's colour as its edge and a soft glow (coloured text – a
         blue paper bin's – was hard to read) */
      .fp3d-holo.fp3d-holo-bin {
        min-width: 0;
        width: auto;
        padding: 0;
        border-radius: 8px;
        pointer-events: none;
        border: 1.5px solid color-mix(in srgb, var(--bin) 85%, white);
        border-left-width: calc(6px * var(--fp3d-pin-k, 1));
        background: rgba(9, 13, 22, 0.94);
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        box-shadow: 0 0 16px color-mix(in srgb, var(--bin) 50%, transparent), 0 2px 6px rgba(0, 0, 0, 0.5);
        color: #f5f8ff;
        text-shadow: none;
      }
      /* the tags of bins, mailboxes and plants follow the symbol size like the pins' labels (#645) */
      .fp3d-holo-bin .fp3d-holo-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0;
        padding: calc(4px * var(--fp3d-pin-k, 1)) calc(10px * var(--fp3d-pin-k, 1));
        white-space: nowrap;
      }
      .fp3d-holo.fp3d-holo-later {
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
        border-color: color-mix(in srgb, var(--bin) 60%, #3a4252);
      }
      .fp3d-holo-bin b {
        font-size: calc(19px * var(--fp3d-pin-k, 1));
        font-weight: 700;
        line-height: 1.15;
        color: #ffffff;
      }
      .fp3d-holo-later b {
        font-weight: 600;
        color: #dfe5f0;
      }
      .fp3d-holo-bin span {
        font-size: calc(13px * var(--fp3d-pin-k, 1));
        line-height: 1.2;
        color: #cfd7e6;
      }
      /* put out already: a calm green edge, no glow */
      .fp3d-holo.fp3d-holo-out {
        border-color: #4ddf7a;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
      }
      .fp3d-holo-out b,
      .fp3d-holo-line-out b {
        color: #a8ffc2;
      }
      /* bins standing together: one plate, one line each in pickup order with its own colour edge */
      .fp3d-holo.fp3d-holo-bin.fp3d-holo-multi {
        border-color: rgba(190, 205, 230, 0.55);
        border-left-width: 1.5px;
      }
      .fp3d-holo-bin .fp3d-holo-lines {
        align-items: stretch;
        gap: calc(3px * var(--fp3d-pin-k, 1));
        padding: calc(5px * var(--fp3d-pin-k, 1)) calc(9px * var(--fp3d-pin-k, 1)) calc(5px * var(--fp3d-pin-k, 1)) calc(6px * var(--fp3d-pin-k, 1));
      }
      .fp3d-holo-line {
        display: flex;
        align-items: baseline;
        gap: calc(7px * var(--fp3d-pin-k, 1));
        border-left: calc(5px * var(--fp3d-pin-k, 1)) solid var(--bin);
        padding-left: calc(6px * var(--fp3d-pin-k, 1));
      }
      .fp3d-holo-line b {
        font-size: calc(16px * var(--fp3d-pin-k, 1));
      }
      .fp3d-holo-line-later b {
        font-weight: 600;
        color: #dfe5f0;
      }
      .fp3d-holo-line-later {
        border-left-color: color-mix(in srgb, var(--bin) 65%, #3a4252);
      }
      /* a mailbox's or a plant's tag from afar: a round symbol (the text comes back close up) */
      .fp3d-holo-sym {
        display: none;
      }
      .fp3d-holo.fp3d-holo-bin.fp3d-holo-far {
        border-radius: 50%;
        border-width: 2px;
      }
      .fp3d-holo-far .fp3d-holo-body {
        display: none;
      }
      .fp3d-holo-far .fp3d-holo-sym {
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(34px * var(--fp3d-pin-k, 1));
        height: calc(34px * var(--fp3d-pin-k, 1));
        color: #ffffff;
      }
      .fp3d-holo-far .fp3d-holo-sym svg {
        width: 62%;
        height: 62%;
      }
      .fp3d-holo-link[style*="--bin"] line,
      .fp3d-holo-link[style*="--bin"] circle {
        stroke: var(--bin);
      }
      /* two classes, like the bin bubble: the info bubbles' rule (.fp3d-swipe) lets taps through – its buttons must
         take them (#868) */
      .fp3d-swipe.fp3d-gang-menu {
        display: flex;
        flex-direction: column;
        gap: 6px;
        z-index: 6;
        pointer-events: auto;
      }
      .fp3d-gang-menu .fp3d-chip {
        text-align: left;
      }
      .fp3d-gang-menu .fp3d-gang-on {
        border-color: var(--fp3d-accent, #37e0ff);
        box-shadow: 0 0 10px rgba(55, 224, 255, 0.35);
      }
      .fp3d-gang-menu small {
        opacity: 0.7;
      }
      .fp3d-pivot {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 22px;
        height: 22px;
        margin: -11px 0 0 -11px;
        border: 1.5px solid color-mix(in srgb, var(--fp3d-accent, #37e0ff) 75%, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 2;
      }
      .fp3d-pivot::before,
      .fp3d-pivot::after {
        content: "";
        position: absolute;
        background: color-mix(in srgb, var(--fp3d-accent, #37e0ff) 75%, transparent);
      }
      .fp3d-pivot::before {
        left: 50%;
        top: -6px;
        bottom: -6px;
        width: 1.5px;
        margin-left: -0.75px;
      }
      .fp3d-pivot::after {
        top: 50%;
        left: -6px;
        right: -6px;
        height: 1.5px;
        margin-top: -0.75px;
      }
      /* two classes: the info bubbles' own rule (.fp3d-swipe, further down) lets taps through to the house and
         would win over a single class – this bubble has a button (#793) */
      .fp3d-swipe.fp3d-bin-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
        cursor: pointer;
        pointer-events: auto;
      }
      .fp3d-swipe.fp3d-bin-info .fp3d-bin-out {
        pointer-events: auto;
      }
      .fp3d-bin-info small {
        opacity: 0.7;
        font-weight: 400;
      }
      .fp3d-bin-info .fp3d-bin-out {
        margin-top: 6px;
        padding: 7px 12px;
        border-radius: 999px;
        border: 1px solid rgba(190, 205, 230, 0.55);
        background: rgba(255, 255, 255, 0.08);
        color: #f5f8ff;
        font: inherit;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
      }
      .fp3d-bin-info .fp3d-bin-out-on {
        border-color: #4ddf7a;
        background: rgba(77, 223, 122, 0.16);
        color: #a8ffc2;
      }
      .fp3d-hh {
        position: absolute;
        right: 12px;
        top: 58px;
        z-index: 3;
        width: min(250px, calc(100% - 24px));
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 6px;
        border-radius: 14px;
        background: rgba(10, 18, 34, 0.72);
        border: 1px solid rgba(110, 220, 255, 0.28);
        backdrop-filter: blur(8px);
        box-shadow: 0 6px 22px rgba(0, 0, 0, 0.35);
      }
      .fp3d-hh-folded {
        width: auto;
      }
      .fp3d-hh button {
        font: inherit;
        color: inherit;
        background: none;
        border: 0;
        text-align: left;
        cursor: pointer;
        border-radius: 9px;
      }
      .fp3d-hh-head {
        font-size: 12px;
        font-weight: 600;
        padding: 3px 6px;
        opacity: 0.9;
      }
      .fp3d-hh-head b {
        margin-left: 4px;
        color: var(--fp3d-accent, #37e0ff);
      }
      .fp3d-hh-row {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        padding: 5px 6px;
      }
      .fp3d-hh-row:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.06);
      }
      .fp3d-hh-row:disabled {
        cursor: default;
      }
      .fp3d-hh-hot .fp3d-hh-icon {
        color: #ffb547;
      }
      .fp3d-hh-icon {
        flex: none;
        display: inline-flex;
        color: var(--fp3d-accent, #37e0ff);
      }
      .fp3d-alert-banner {
        position: absolute;
        left: 50%;
        top: 10px;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        gap: 6px;
        max-width: calc(100% - 24px);
        z-index: 4;
      }
      .fp3d-alert {
        flex: 0 1 auto;
        min-width: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 7px 14px 7px 12px;
        border: 0;
        border-left: 4px solid #ff3b4f;
        border-radius: 12px;
        background: var(--fp3d-chrome-solid);
        color: var(--fp3d-text);
        font: 600 13.5px var(--fp3d-font);
        box-shadow: 0 0 18px rgba(255, 59, 79, 0.35);
        cursor: pointer;
        animation: fp3d-alert-pulse 1.2s ease-in-out infinite;
      }
      .fp3d-alert-water,
      .fp3d-alert-window_rain {
        border-left-color: #4fb3ff;
        box-shadow: 0 0 18px rgba(79, 179, 255, 0.35);
      }
      .fp3d-alert-alarm_pending {
        border-left-color: #ffb547;
        box-shadow: 0 0 18px rgba(255, 181, 71, 0.35);
      }
      .fp3d-alert-more {
        align-self: center;
        color: var(--fp3d-muted);
        font-size: 13px;
      }
      @keyframes fp3d-alert-pulse {
        50% {
          box-shadow: 0 0 4px transparent;
        }
      }
      .fp3d-has-alerts .fp3d-energy {
        top: 58px;
      }
      .fp3d-scenes {
        position: absolute;
        left: 60px;
        right: 60px;
        bottom: calc(10px + var(--fp3d-bottom-inset, 0px));
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 6px;
        z-index: 2;
        pointer-events: none;
      }
      .fp3d-scenes .fp3d-chip {
        pointer-events: auto;
      }
      @media (prefers-reduced-motion: reduce) {
        .fp3d-alert,
        .fp3d-dev-found {
          animation: none;
        }
      }
      .fp3d-stage {
        position: absolute;
        inset: 0;
        overflow: hidden;
        container-type: size;
        container-name: fp3d;
        background: radial-gradient(ellipse at 50% 35%, var(--fp3d-sky, var(--fp3d-bg2)), var(--fp3d-ground, var(--fp3d-bg)) 72%);
        transition: background 2s ease;
        isolation: isolate;
      }
      /* under everything on the stage, above the stage's own background (the stage isolates its layers) */
      .fp3d-zoom-bg {
        position: absolute;
        inset: 0;
        z-index: -1;
        pointer-events: none;
      }
      /* while a spot is picked, names and pins on the view let the tap through to the plan */
      .fp3d-picking .fp3d-labels,
      .fp3d-picking .fp3d-labels * {
        pointer-events: none !important;
      }
      .fp3d-picking .fp3d-canvas {
        cursor: crosshair;
      }
      /* a module asks for a spot: the hint stands at the top until the tap (a tap on it cancels) */
      .fp3d-spot-hint {
        position: absolute;
        top: calc(12px + env(safe-area-inset-top, 0px));
        left: 50%;
        transform: translateX(-50%);
        z-index: 25;
        padding: 8px 14px;
        border-radius: 999px;
        border: 1px solid rgba(62, 232, 255, 0.6);
        background: rgba(6, 12, 24, 0.85);
        color: #e6ecff;
        font: inherit;
        font-size: 14px;
        cursor: pointer;
        box-shadow: 0 0 18px rgba(62, 232, 255, 0.25);
      }
      /* the real sky (drawn by the 3D view): first on the stage, so the zoom style's background lies over it */
      .fp3d-sky {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        z-index: -1;
        pointer-events: none;
      }
      .fp3d-canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        touch-action: none;
        cursor: grab;
      }
      .fp3d-canvas:active {
        cursor: grabbing;
      }
      .fp3d-labels {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }
      .fp3d-pin-info {
        display: grid;
        gap: 1px;
        text-align: center;
      }
      .fp3d-pin-info small {
        font-size: calc(11px * var(--fp3d-room-scale, 1));
        font-weight: 500;
        opacity: 0.9;
        font-variant-numeric: tabular-nums;
      }
      .fp3d-pin {
        position: absolute;
        left: 0;
        top: 0;
        pointer-events: auto;
        font: 600 12.5px var(--fp3d-title-font);
        color: var(--fp3d-text);
        background: var(--fp3d-chrome);
        border: 1px solid var(--fp3d-line);
        border-radius: 10px;
        padding: 5px 10px;
        cursor: pointer;
        white-space: nowrap;
        backdrop-filter: blur(6px);
        box-shadow: var(--fp3d-shadow);
      }
      /* the house's size of the room names (idea: Banhammer1919) */
      .fp3d-pin[data-room] {
        font-size: calc(12.5px * var(--fp3d-room-scale, 1));
        padding: calc(5px * var(--fp3d-room-scale, 1)) calc(10px * var(--fp3d-room-scale, 1));
        border-radius: calc(10px * var(--fp3d-room-scale, 1));
      }
      .fp3d-pin-floor {
        display: grid;
        justify-items: start;
        gap: 1px;
        padding: 8px 14px;
        border-radius: 12px;
        background: var(--fp3d-accent);
        color: var(--fp3d-accent-text);
        border-color: transparent;
        box-shadow: 0 0 22px rgba(55, 224, 255, 0.28);
      }
      .fp3d-pin-floor b {
        font: 700 15px var(--fp3d-title-font);
        letter-spacing: -0.01em;
      }
      .fp3d-pin-floor span {
        font: 500 12px var(--fp3d-font);
        opacity: 0.78;
      }
      .fp3d-dev {
        position: absolute;
        left: 0;
        top: 0;
        pointer-events: auto;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px;
        border-radius: 999px;
        border: 1px solid var(--fp3d-line);
        background: var(--fp3d-chrome);
        color: var(--fp3d-muted);
        /* the symbol size (small 0.8, normal 1, large 1.25) scales the pin from inside, not its position */
        font: 600 calc(12px * var(--fp3d-pin-k, 1)) var(--fp3d-font);
        cursor: pointer;
        white-space: nowrap;
        backdrop-filter: blur(6px);
        touch-action: manipulation;
        -webkit-user-select: none;
        user-select: none;
        transition: opacity 0.2s ease;
      }
      .fp3d-dev-icon {
        display: grid;
        place-items: center;
        width: calc(24px * var(--fp3d-pin-k, 1));
        height: calc(24px * var(--fp3d-pin-k, 1));
        border-radius: 50%;
        background: rgba(91, 124, 255, 0.14);
      }
      .fp3d-dev-icon svg {
        width: calc(18px * var(--fp3d-pin-k, 1));
        height: calc(18px * var(--fp3d-pin-k, 1));
      }
      .fp3d-dev[data-entity^="trail:"] {
        padding: 2px 4px 2px 2px;
        font-size: 11px;
        border-color: rgba(55, 224, 255, 0.5);
      }
      .fp3d-dev[data-entity^="trail:"] .fp3d-dev-icon {
        color: #37e0ff;
      }
      .fp3d-dev[data-entity^="trail:"] .fp3d-dev-text {
        display: inline;
      }
      .fp3d-dev-text {
        display: none;
        padding-right: 6px;
        color: var(--fp3d-text);
        font-variant-numeric: tabular-nums;
        max-width: 160px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .fp3d-dev-watt:empty {
        display: none;
      }
      .fp3d-dev-watt {
        padding: 1px 6px 1px 0;
        color: #37e0ff;
        font-variant-numeric: tabular-nums;
        font-weight: 700;
      }
      .fp3d-dev-on .fp3d-dev-watt {
        color: #2a1a00;
      }
      .fp3d-person {
        position: absolute;
        left: 0;
        top: 0;
        width: 30px;
        height: 30px;
        pointer-events: auto;
      }
      .fp3d-person-tap {
        cursor: pointer;
      }
      .fp3d-person-face {
        display: grid;
        place-items: center;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
        background: var(--fp3d-pc, #ff5fd2);
        color: #fff;
        font: 700 12px var(--fp3d-font);
        box-shadow:
          0 0 0 2px color-mix(in srgb, var(--fp3d-pc, #ff5fd2) 55%, transparent),
          0 0 18px var(--fp3d-pc, #ff5fd2);
      }
      .fp3d-person img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .fp3d-person-figure {
        width: auto;
        height: auto;
      }
      .fp3d-person-figure .fp3d-person-face {
        display: none;
      }
      .fp3d-person-figure .fp3d-person-tag {
        position: static;
        display: block;
        transform: none;
      }
      .fp3d-person-tag {
        position: absolute;
        left: 50%;
        top: calc(100% + 4px);
        transform: translateX(-50%);
        padding: 1px 7px;
        border-radius: 8px;
        background: rgba(8, 14, 28, 0.82);
        border: 1px solid color-mix(in srgb, var(--fp3d-pc, #ff5fd2) 60%, transparent);
        color: #fff;
        font: 600 11px var(--fp3d-font);
        white-space: nowrap;
      }
      .fp3d-person[hidden] {
        display: none;
      }
      /* room names off: the pins go, but the "values" stay (without the name) */
      .fp3d-no-room-names .fp3d-pin:not(.fp3d-pin-info),
      .fp3d-no-room-names .fp3d-pin-info .fp3d-pin-name {
        display: none !important;
      }
      /* tablet level: blur over the canvas and glowing shadows are expensive on weak GPUs */
      .fp3d-stage.fp3d-low {
        transition: none;
      }
      .fp3d-low .fp3d-pin,
      .fp3d-low .fp3d-dev,
      .fp3d-low .fp3d-dev-on,
      .fp3d-low .fp3d-energy-item,
      .fp3d-low .fp3d-find input,
      .fp3d-low .fp3d-find-list,
      .fp3d-low .fp3d-find-btn,
      .fp3d-low .fp3d-swipe,
      .fp3d-low .fp3d-thumb {
        backdrop-filter: none;
        box-shadow: none;
        transition: none;
      }
      /* a shadow that pulses repaints the warning every frame: it glows steadily on the tablet level */
      .fp3d-low .fp3d-alert {
        animation: none;
      }
      .fp3d-low .fp3d-holo-link line,
      .fp3d-low .fp3d-holo-link circle,
      .fp3d-low .fp3d-holo-curve {
        filter: none;
      }
      .fp3d-thumbs {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: calc(100% - 140px);
        overflow-y: auto;
        scrollbar-width: none;
        z-index: 2;
      }
      .fp3d-thumb {
        position: relative;
        display: grid;
        padding: 0;
        width: 150px;
        border: 1px solid var(--fp3d-line);
        border-radius: 14px;
        background: color-mix(in srgb, var(--fp3d-chrome) 70%, transparent);
        color: var(--fp3d-text);
        cursor: pointer;
        overflow: hidden;
        font: inherit;
        box-shadow: var(--fp3d-shadow);
        opacity: 0.72;
        transition: opacity 0.15s, border-color 0.15s;
      }
      .fp3d-thumb:hover,
      .fp3d-thumb[aria-pressed="true"] {
        opacity: 1;
      }
      .fp3d-thumb[aria-pressed="true"] {
        border-color: var(--fp3d-accent);
        box-shadow: var(--fp3d-shadow), 0 0 0 1px var(--fp3d-accent), 0 0 18px rgba(55, 224, 255, 0.25);
      }
      .fp3d-thumb img {
        display: block;
        width: 100%;
        aspect-ratio: 4 / 3;
      }
      .fp3d-thumb span {
        position: absolute;
        left: 8px;
        bottom: 6px;
        font-size: 12px;
        font-weight: 600;
        text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8);
      }
      .fp3d-thumbs-fold {
        align-self: flex-start;
        width: 26px;
        height: 22px;
        padding: 0;
        border: 1px solid var(--fp3d-line);
        border-radius: 8px;
        background: var(--fp3d-chrome);
        color: var(--fp3d-text);
        font-size: 11px;
        cursor: pointer;
      }
      /* folded: plain floor buttons with their names, no pictures (D177) */
      .fp3d-thumbs-compact .fp3d-thumb {
        padding: 6px 10px;
        min-width: 0;
      }
      .fp3d-thumbs-compact .fp3d-thumb span {
        position: static;
        background: none;
        padding: 0;
      }
      .fp3d-thumb-house {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 10px;
      }
      .fp3d-thumb-house span {
        position: static;
        text-shadow: none;
      }
      .fp3d-thumbs-small .fp3d-thumb {
        width: 104px;
      }
      /* at the top right, clear of the floor pictures and the switch rows (a card moves it beside its own buttons) */
      .fp3d-walk-btn {
        position: absolute;
        z-index: 3;
        top: 12px;
        right: var(--fp3d-walk-right, 12px);
        height: 38px;
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 0 14px 0 10px;
        font: inherit;
        font-weight: 700;
        font-size: 14px;
        border: 1px solid rgba(55, 224, 255, 0.45);
        border-radius: 13px;
        background: var(--fp3d-chrome);
        color: var(--fp3d-text);
        box-shadow: var(--fp3d-shadow);
        cursor: pointer;
      }
      .fp3d-walk-surface {
        position: absolute;
        inset: 0;
        z-index: 4;
        touch-action: none;
        cursor: grab;
      }
      .fp3d-walk-top {
        position: absolute;
        z-index: 5;
        top: 12px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 8px;
        pointer-events: none;
        white-space: nowrap;
      }
      .fp3d-walk-room,
      .fp3d-walk-exit,
      .fp3d-walk-hint {
        padding: 8px 14px;
        border-radius: 14px;
        background: var(--fp3d-chrome);
        color: var(--fp3d-text);
        box-shadow: var(--fp3d-shadow);
        font: inherit;
        font-weight: 700;
      }
      .fp3d-walk-exit {
        border: 0;
        cursor: pointer;
        pointer-events: auto;
      }
      .fp3d-walk-hint {
        position: absolute;
        z-index: 5;
        left: 50%;
        top: 62px;
        transform: translateX(-50%);
        max-width: min(560px, calc(100% - 32px));
        font-weight: 500;
        font-size: 13px;
        text-align: center;
        pointer-events: none;
      }
      .fp3d-walk-stick {
        position: absolute;
        z-index: 5;
        right: 18px;
        bottom: calc(18px + var(--fp3d-bottom-inset, 0px));
        width: 112px;
        height: 112px;
        border-radius: 50%;
        background: rgba(14, 21, 38, 0.55);
        border: 1px solid var(--fp3d-line);
        display: grid;
        place-items: center;
        touch-action: none;
      }
      .fp3d-walk-stick span {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        background: var(--fp3d-accent);
        box-shadow: 0 0 16px rgba(55, 224, 255, 0.5);
        pointer-events: none;
      }
      /* with a mouse the stick is not needed */
      @media (pointer: fine) {
        .fp3d-walk-stick {
          display: none;
        }
      }
      .fp3d-find-btn {
        position: absolute;
        left: 12px;
        bottom: calc(10px + var(--fp3d-bottom-inset, 0px));
        width: 40px;
        height: 40px;
        display: grid;
        place-items: center;
        border: 0;
        border-radius: 13px;
        background: var(--fp3d-chrome);
        color: var(--fp3d-text);
        box-shadow: var(--fp3d-shadow);
        cursor: pointer;
      }
      /* the star sits above the search button, its menu opens above it */
      .fp3d-central-btn {
        position: absolute;
        left: 12px;
        bottom: calc(56px + var(--fp3d-bottom-inset, 0px));
        width: 40px;
        height: 40px;
        display: grid;
        place-items: center;
        border: 0;
        border-radius: 13px;
        background: var(--fp3d-chrome);
        color: var(--fp3d-text);
        box-shadow: var(--fp3d-shadow);
        cursor: pointer;
        z-index: 3;
      }
      .fp3d-central-on {
        color: var(--fp3d-accent);
      }
      .fp3d-central {
        position: absolute;
        left: 12px;
        bottom: calc(104px + var(--fp3d-bottom-inset, 0px));
        width: min(320px, calc(100% - 24px));
        max-height: calc(100% - 140px);
        overflow-y: auto;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 12px 14px;
        border: 1px solid var(--fp3d-line);
        border-radius: 16px;
        background: var(--fp3d-chrome);
        color: var(--fp3d-text);
        box-shadow: var(--fp3d-shadow);
        backdrop-filter: blur(10px);
        z-index: 4;
      }
      .fp3d-central > b {
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        opacity: 0.7;
      }
      .fp3d-central-row {
        display: grid;
        grid-template-columns: 1fr auto auto;
        gap: 6px;
        align-items: center;
      }
      .fp3d-central-row small {
        opacity: 0.6;
      }
      .fp3d-central .fp3d-btn {
        min-width: 64px;
      }
      .fp3d-central-armed {
        background: #ff8a3d !important;
        color: #1a0d00 !important;
      }
      .fp3d-central-favs {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .fp3d-own-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .fp3d-own-btn ha-icon {
        --mdc-icon-size: 18px;
      }
      .fp3d-central-hint {
        margin: 0;
        font-size: 13px;
        opacity: 0.7;
      }
      .fp3d-low .fp3d-central {
        backdrop-filter: none;
      }
      /* the eye sits beside the search button; alone in the corner once the view is clean */
      .fp3d-osm-credit {
        position: absolute;
        right: 8px;
        bottom: 4px;
        z-index: 3;
        font-size: 10px;
        color: var(--fp3d-muted, rgba(200, 210, 230, 0.7));
        opacity: 0.75;
        text-decoration: none;
      }
      .fp3d-eye {
        position: absolute;
        left: 56px;
        bottom: calc(10px + var(--fp3d-bottom-inset, 0px));
        width: 36px;
        height: 36px;
        display: grid;
        place-items: center;
        padding: 0;
        border-radius: 50%;
        border: 1px solid rgba(160, 240, 255, 0.35);
        background: rgba(8, 16, 34, 0.7);
        color: var(--fp3d-text);
        cursor: pointer;
        z-index: 4;
      }
      /* the clock in a corner of the view (view settings / card option clock) */
      .fp3d-clock {
        position: absolute;
        z-index: 4;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 2px;
        padding: 8px 14px;
        border-radius: 14px;
        background: rgba(4, 16, 24, 0.55);
        color: var(--fp3d-text);
        line-height: 1.1;
        pointer-events: none;
        backdrop-filter: blur(6px);
      }
      .fp3d-clock b {
        font-size: 30px;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
        letter-spacing: 0.02em;
      }
      .fp3d-clock span {
        font-size: 13px;
        color: var(--fp3d-muted);
      }
      /* at the top it sits under the energy strip and the walk button */
      .fp3d-clock-tl {
        top: 64px;
        left: 12px;
      }
      .fp3d-clock-tr {
        top: 64px;
        right: 12px;
      }
      .fp3d-clock-bl {
        bottom: calc(66px + var(--fp3d-bottom-inset, 0px));
        left: 12px;
      }
      .fp3d-clock-br {
        bottom: calc(66px + var(--fp3d-bottom-inset, 0px));
        right: 12px;
      }
      .fp3d-mic {
        position: absolute;
        bottom: calc(6px + var(--fp3d-bottom-inset, 0px));
        /* a big target: it is tapped from across the room, often with a thumb */
        width: 52px;
        height: 52px;
        touch-action: manipulation;
        display: grid;
        place-items: center;
        padding: 0;
        border-radius: 50%;
        border: 1px solid rgba(160, 240, 255, 0.35);
        background: rgba(8, 16, 34, 0.7);
        color: var(--fp3d-text);
        cursor: pointer;
        z-index: 4;
      }
      .fp3d-mic-on {
        color: #ff5a6a;
        border-color: #ff5a6a;
        box-shadow: 0 0 12px rgba(255, 90, 106, 0.7);
      }
      .fp3d-mic-say {
        position: absolute;
        bottom: calc(66px + var(--fp3d-bottom-inset, 0px));
        max-width: min(420px, calc(100% - 80px));
        padding: 6px 12px;
        border-radius: 14px;
        background: rgba(8, 16, 34, 0.85);
        border: 1px solid rgba(160, 240, 255, 0.35);
        color: var(--fp3d-text);
        font-size: 14px;
        z-index: 4;
      }
      .fp3d-announce {
        position: absolute;
        left: 50%;
        top: 18%;
        transform: translateX(-50%);
        max-width: min(640px, calc(100% - 32px));
        padding: 16px 26px;
        border-radius: 18px;
        background: rgba(8, 16, 34, 0.9);
        border: 1px solid rgba(160, 240, 255, 0.6);
        box-shadow: 0 0 24px rgba(0, 229, 255, 0.35);
        color: var(--fp3d-text);
        font-size: clamp(20px, 4vw, 34px);
        text-align: center;
        z-index: 6;
      }
      .fp3d-mic-err {
        border-color: rgba(255, 90, 106, 0.7);
      }
      .fp3d-eye-clean {
        left: 12px;
        opacity: 0.55;
      }
      .fp3d-eye:hover,
      .fp3d-eye-clean:hover {
        opacity: 1;
      }
      .fp3d-find {
        position: absolute;
        left: 12px;
        bottom: calc(10px + var(--fp3d-bottom-inset, 0px));
        width: min(340px, calc(100% - 24px));
        display: flex;
        flex-direction: column-reverse;
        gap: 6px;
        z-index: 3;
      }
      /* opened from the phone view's "More": above the line that says what needs a look */
      .fp3d-find-up {
        bottom: calc(66px + var(--fp3d-bottom-inset, 0px));
      }
      .fp3d-find input {
        box-sizing: border-box;
        width: 100%;
        height: 42px;
        padding: 0 42px 0 14px;
        border: 1px solid var(--fp3d-line);
        border-radius: 14px;
        background: var(--fp3d-chrome);
        color: var(--fp3d-text);
        font: inherit;
        font-size: 15px;
        box-shadow: var(--fp3d-shadow);
        backdrop-filter: blur(8px);
      }
      .fp3d-find-close {
        position: absolute;
        right: 6px;
        bottom: 6px;
        width: 30px;
        height: 30px;
        border: 0;
        border-radius: 10px;
        background: none;
        color: var(--fp3d-muted);
        cursor: pointer;
      }
      .fp3d-find-list {
        display: grid;
        padding: 6px;
        border-radius: 14px;
        background: var(--fp3d-chrome);
        box-shadow: var(--fp3d-shadow);
        backdrop-filter: blur(8px);
      }
      .fp3d-find-list button {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
        border: 0;
        border-radius: 10px;
        background: none;
        color: var(--fp3d-text);
        text-align: left;
        font: inherit;
        cursor: pointer;
      }
      .fp3d-find-list button:hover,
      .fp3d-find-list button:focus-visible {
        background: rgba(127, 127, 127, 0.14);
      }
      .fp3d-find-list b {
        display: block;
        font-weight: 600;
      }
      .fp3d-find-list small,
      .fp3d-find-list p {
        color: var(--fp3d-muted);
        font-size: 12px;
        margin: 0;
      }
      .fp3d-find-list p {
        padding: 8px 10px;
      }
      .fp3d-find-icon {
        display: grid;
        place-items: center;
        width: 30px;
        height: 30px;
        border-radius: 10px;
        background: rgba(127, 127, 127, 0.15);
        flex: none;
      }
      .fp3d-find-icon svg {
        width: 16px;
        height: 16px;
      }
      .fp3d-swipe {
        position: absolute;
        transform: translate(-50%, calc(-100% - 28px));
        display: grid;
        grid-template-columns: auto auto;
        align-items: center;
        gap: 2px 12px;
        padding: 8px 12px;
        border-radius: 14px;
        background: var(--fp3d-chrome);
        box-shadow: var(--fp3d-shadow);
        pointer-events: none;
        white-space: nowrap;
        z-index: 4;
      }
      /* time travel: the clock sits at the top centre, the warnings below it */
      .fp3d-replay .fp3d-alert-banner {
        top: 74px;
      }
      /* the time bar takes the bottom: the heat legend moves up under the energy values */
      .fp3d-replay .fp3d-legend,
      .fp3d-replay.fp3d-has-alerts .fp3d-legend {
        bottom: auto;
        top: 62px;
      }
      .fp3d-replay .fp3d-energy {
        max-width: calc(50% - 96px);
        flex-wrap: nowrap;
        overflow-x: auto;
        scrollbar-width: none;
        pointer-events: auto;
      }
      .fp3d-replay .fp3d-energy > * {
        flex: none;
      }
      /* the warnings sit below the clock, so the energy values stay at the top */
      .fp3d-replay.fp3d-has-alerts .fp3d-energy {
        top: 10px;
      }
      @container fp3d (max-width: 700px) {
        .fp3d-replay .fp3d-energy,
        .fp3d-replay.fp3d-has-alerts .fp3d-energy {
          top: 68px;
          max-width: calc(100% - 24px);
        }
        .fp3d-replay .fp3d-alert-banner,
        .fp3d-replay .fp3d-legend {
          top: 116px;
        }
        .fp3d-replay.fp3d-has-alerts .fp3d-legend {
          top: 164px;
        }
      }
      .fp3d-info {
        grid-template-columns: auto;
        z-index: 5;
      }
      .fp3d-swipe.fp3d-info b {
        font-size: 15px;
      }
      .fp3d-swipe span {
        font-size: 12px;
        color: var(--fp3d-muted);
      }
      .fp3d-swipe b {
        grid-row: 2;
        font: 700 22px var(--fp3d-title-font);
      }
      .fp3d-swipe i {
        grid-row: 1 / 3;
        grid-column: 2;
        position: relative;
        width: 10px;
        height: 44px;
        border-radius: 5px;
        background: rgba(127, 127, 127, 0.25);
        overflow: hidden;
      }
      .fp3d-swipe em {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--fp3d-warm);
      }
      .fp3d-menu-backdrop {
        position: absolute;
        inset: 0;
        z-index: 5;
      }
      .fp3d-central-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .fp3d-central-top > b {
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--fp3d-muted);
      }
      .fp3d-central-gear {
        padding: 4px 10px;
        font-size: 12px;
      }
      /* a module's sheet and the ⚙ settings: a glass box in the middle, over a dim backdrop */
      .fp3d-sheet-backdrop {
        position: absolute;
        inset: 0;
        z-index: 7;
        background: rgba(4, 8, 16, 0.35);
      }
      .fp3d-pop {
        width: min(560px, calc(100% - 24px));
      }
      .fp3d-pop.fp3d-pop-wide {
        width: min(960px, calc(100% - 24px));
      }
      .fp3d-pop-big {
        display: block;
        width: 100%;
        max-height: calc(100vh - 160px);
        object-fit: contain;
        border-radius: 12px;
        background: #000;
      }
      .fp3d-pop-groups {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .fp3d-pop-groups h4 {
        margin: 0 0 6px;
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--fp3d-muted, #8fa0c0);
      }
      .fp3d-pop-strong h4 {
        color: var(--fp3d-accent, #37e0ff);
      }
      .fp3d-pop-row {
        display: grid;
        grid-template-columns: 96px 1fr;
        gap: 10px;
        align-items: baseline;
        padding: 6px 0 6px 12px;
        border-left: 3px solid var(--cal, #37e0ff);
        margin-bottom: 4px;
      }
      .fp3d-pop-lead {
        font-variant-numeric: tabular-nums;
        color: var(--fp3d-muted, #8fa0c0);
        font-size: 13px;
      }
      .fp3d-pop-sum {
        font-size: 15px;
      }
      .fp3d-pop-sum small {
        color: var(--fp3d-muted, #8fa0c0);
      }
      .fp3d-pop-media,
      .fp3d-pop-person {
        display: flex;
        gap: 16px;
        align-items: center;
      }
      .fp3d-pop-cover {
        width: 160px;
        height: 160px;
        object-fit: cover;
        border-radius: 12px;
        background: #000;
        flex: none;
      }
      .fp3d-pop-sym {
        font-size: 72px;
        line-height: 1;
        flex: none;
      }
      .fp3d-pop-mediatext {
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-width: 0;
      }
      .fp3d-pop-mediatext b {
        font-size: 18px;
      }
      .fp3d-pop-mediatext span {
        color: var(--fp3d-muted, #8fa0c0);
      }
      .fp3d-pop-ctl {
        display: flex;
        gap: 8px;
        margin-top: 6px;
      }
      .fp3d-pop-rowlive .fp3d-pop-lead {
        color: var(--fp3d-accent, #37e0ff);
        font-weight: 700;
      }
      .fp3d-pop-groups h4 {
        cursor: pointer;
      }
      .fp3d-pop-sum em {
        display: block;
        font-style: normal;
        font-size: 13px;
        color: var(--fp3d-muted, #8fa0c0);
        margin-top: 2px;
      }
      .fp3d-pop-form {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        align-items: center;
        margin-top: 6px;
      }
      .fp3d-pop-in {
        flex: 1 1 140px;
        min-width: 0;
        padding: 8px 10px;
        border-radius: 10px;
        border: 1px solid var(--fp3d-line);
        background: rgba(255, 255, 255, 0.06);
        color: inherit;
        font: inherit;
      }
      .fp3d-pop-addbtn {
        align-self: flex-start;
        margin-top: 4px;
      }
      .fp3d-pop-todo {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .fp3d-pop-todoitem {
        display: flex;
        gap: 12px;
        align-items: center;
        padding: 8px 6px;
        border-radius: 10px;
        font-size: 16px;
        cursor: pointer;
      }
      .fp3d-pop-todoitem:hover {
        background: rgba(255, 255, 255, 0.05);
      }
      .fp3d-pop-todoitem input {
        width: 22px;
        height: 22px;
        accent-color: var(--fp3d-accent, #37e0ff);
      }
      .fp3d-pop-done span {
        text-decoration: line-through;
        color: var(--fp3d-muted, #8fa0c0);
      }
      .fp3d-pop-people {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .fp3d-pop-personrow {
        display: flex;
        gap: 12px;
        align-items: center;
        opacity: 0.6;
      }
      .fp3d-pop-personrow.fp3d-pop-bright {
        opacity: 1;
      }
      .fp3d-pop-personrow img,
      .fp3d-pop-initial {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        object-fit: cover;
        background: rgba(255, 255, 255, 0.1);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        flex: none;
      }
      .fp3d-pop-personrow div {
        display: flex;
        flex-direction: column;
      }
      .fp3d-pop-personrow span {
        color: var(--fp3d-muted, #8fa0c0);
        font-size: 13px;
      }
      .fp3d-pop-h {
        margin: 10px 0 4px;
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--fp3d-muted, #8fa0c0);
      }
      .fp3d-pop-line {
        display: flex;
        flex-wrap: wrap;
        gap: 6px 12px;
        align-items: baseline;
        font-size: 18px;
      }
      .fp3d-pop-line span + span {
        color: var(--fp3d-muted, #8fa0c0);
        font-size: 14px;
      }
      .fp3d-pop-line em,
      .fp3d-pop-mediatext em {
        font-style: normal;
        color: var(--fp3d-accent, #37e0ff);
        font-size: 14px;
      }
      .fp3d-pop-waste {
        margin: 0;
      }
      .fp3d-pop-tiles {
        display: flex;
        gap: 10px;
        margin-top: 12px;
      }
      .fp3d-pop-tiles div {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        padding: 8px 4px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.05);
      }
      .fp3d-pop-tiles span {
        font-size: 26px;
      }
      .fp3d-pop-tiles small {
        color: var(--fp3d-muted, #8fa0c0);
      }
      .fp3d-pop-live {
        aspect-ratio: 16 / 9;
        overflow: hidden;
      }
      .fp3d-sheet {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: min(440px, calc(100% - 24px));
        max-height: calc(100% - 40px);
        overflow-y: auto;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 14px 16px 16px;
        border: 1px solid var(--fp3d-line);
        border-radius: 18px;
        background: var(--fp3d-chrome);
        color: var(--fp3d-text);
        box-shadow: var(--fp3d-shadow);
        backdrop-filter: blur(12px);
        z-index: 8;
      }
      .fp3d-sheet header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        font-size: 16px;
      }
      .fp3d-sheet-x {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 1px solid var(--fp3d-line);
        background: transparent;
        color: inherit;
        cursor: pointer;
      }
      .fp3d-sheet-choice,
      .fp3d-sheet-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .fp3d-sheet-chip {
        min-height: 40px;
        padding: 0 14px;
        border-radius: 12px;
        border: 1px solid var(--fp3d-line);
        background: color-mix(in srgb, var(--fp3d-accent, #37e0ff) 10%, transparent);
        color: inherit;
        font: inherit;
        font-size: 14px;
        cursor: pointer;
      }
      .fp3d-sheet-chip:hover {
        border-color: var(--fp3d-accent, #37e0ff);
      }
      .fp3d-sheet-row {
        display: flex;
        gap: 6px;
      }
      .fp3d-sheet-input {
        flex: 1;
        min-width: 0;
        min-height: 38px;
        padding: 0 10px;
        border-radius: 10px;
        border: 1px solid var(--fp3d-line);
        background: rgba(0, 0, 0, 0.18);
        color: inherit;
        font: inherit;
      }
      .fp3d-sheet-lines p,
      .fp3d-set-note {
        margin: 0;
        color: var(--fp3d-muted);
        font-size: 12px;
      }
      .fp3d-settings h4 {
        margin: 6px 0 0;
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--fp3d-muted);
      }
      .fp3d-set-check {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
      }
      .fp3d-set-field {
        display: grid;
        gap: 4px;
        font-size: 13px;
        color: var(--fp3d-muted);
      }
      .fp3d-set-field select,
      .fp3d-set-field textarea {
        font: inherit;
        font-size: 14px;
        color: var(--fp3d-text);
        background: rgba(0, 0, 0, 0.18);
        border: 1px solid var(--fp3d-line);
        border-radius: 8px;
        padding: 6px 8px;
      }
      .fp3d-sheet-gear {
        align-self: flex-start;
        border: 0;
        background: none;
        color: var(--fp3d-muted);
        font: inherit;
        font-size: 13px;
        padding: 4px 0;
        cursor: pointer;
      }
      .fp3d-sheet-gear:hover {
        color: var(--fp3d-accent);
      }
      .fp3d-set-module {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding-top: 4px;
        border-top: 1px solid var(--fp3d-line);
      }
      .fp3d-note {
        position: absolute;
        left: 50%;
        bottom: calc(80px + var(--fp3d-bottom-inset, 0px));
        transform: translateX(-50%);
        max-width: calc(100% - 32px);
        padding: 8px 14px;
        border-radius: 999px;
        background: var(--fp3d-chrome);
        border: 1px solid var(--fp3d-line);
        color: var(--fp3d-text);
        font-size: 13px;
        box-shadow: var(--fp3d-shadow);
        z-index: 9;
        pointer-events: none;
      }
      /* a camera's new detection as a small picture (#442) */
      .fp3d-campop {
        position: absolute;
        right: 12px;
        bottom: calc(var(--fp3d-bottom-inset, 0px) + 64px);
        z-index: 5;
        width: min(360px, 70vw);
        border-radius: 14px;
        overflow: hidden;
        background: rgba(8, 16, 34, 0.9);
        border: 1px solid rgba(255, 120, 120, 0.6);
        box-shadow: 0 0 26px rgba(255, 80, 80, 0.35);
      }
      .fp3d-campop-img {
        display: block;
        width: 100%;
        aspect-ratio: 16 / 9;
        padding: 0;
        border: 0;
        background: #000;
        cursor: pointer;
      }
      .fp3d-campop-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .fp3d-campop-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 6px 10px;
        font-size: 13px;
        color: #ffd6d6;
      }
      .fp3d-through {
        position: absolute;
        inset: 0;
        z-index: 4;
        pointer-events: none;
      }
      /* the camera wall: a glass sheet over the scene with every camera's picture */
      .fp3d-wall {
        position: absolute;
        inset: 56px 12px calc(var(--fp3d-bottom-inset, 0px) + 12px);
        z-index: 5;
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 10px 12px;
        border-radius: 16px;
        background: rgba(8, 16, 34, 0.86);
        border: 1px solid rgba(160, 240, 255, 0.4);
        box-shadow: 0 0 28px rgba(55, 224, 255, 0.25);
        overflow: auto;
      }
      .fp3d-wall-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 600;
        color: #e6fbff;
      }
      .fp3d-wall-pro {
        margin: 0;
        color: #ffd75a;
      }
      .fp3d-wall-head .fp3d-wall-title {
        flex: 1;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 8px;
      }
      .fp3d-wall-title b {
        color: #ff6b6b;
        font-weight: 600;
      }
      .fp3d-wall-tools {
        display: flex;
        gap: 6px;
      }
      .fp3d-wall-big {
        flex: 1;
        min-height: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        overflow: hidden;
        background: #0a1426;
      }
      .fp3d-wall-big img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      /* the stream player: a bare card, as wide as the sheet allows for a 16:9 picture */
      .fp3d-wall-big > hui-picture-entity-card,
      .fp3d-wall-big > hui-error-card {
        width: min(100%, calc((100vh - 200px) * 16 / 9));
        --ha-card-background: transparent;
        --ha-card-border-width: 0;
        --ha-card-box-shadow: none;
      }
      .fp3d-wall-grid {
        flex: 1;
        display: grid;
        align-content: safe center;
        justify-content: center;
        gap: 12px;
        min-height: 0;
        overflow-y: auto;
      }
      .fp3d-wall-cam {
        position: relative;
        padding: 0;
        border: 1px solid rgba(160, 240, 255, 0.3);
        border-radius: 12px;
        overflow: hidden;
        background: #0a1426;
        cursor: pointer;
        width: 100%;
        height: 100%;
      }
      .fp3d-wall-cam img,
      .fp3d-wall-none {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #8aa;
      }
      .fp3d-wall-seen {
        border-color: rgba(255, 80, 90, 0.9);
        box-shadow: 0 0 14px rgba(255, 60, 70, 0.5);
      }
      .fp3d-wall-name {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 4px 8px;
        font-size: 12px;
        text-align: left;
        color: #e6fbff;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
      }
      .fp3d-wall-name b {
        color: #ff6b6b;
        font-weight: 600;
      }
      .fp3d-flash::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 3;
        background: rgba(225, 238, 255, 0.4);
        pointer-events: none;
      }
      .fp3d-through-img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: var(--fp3d-blend);
      }
      .fp3d-through-live {
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }
      .fp3d-through-live > * {
        width: 100%;
        --ha-card-background: transparent;
        --ha-card-border-width: 0;
        --ha-card-box-shadow: none;
      }
      .fp3d-through-img:fullscreen {
        opacity: 1;
        object-fit: contain;
        background: #000;
      }
      .fp3d-through-bar {
        position: absolute;
        left: 50%;
        bottom: calc(var(--fp3d-bottom-inset, 0px) + 14px);
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: calc(100% - 32px);
        padding: 8px 10px 8px 16px;
        border-radius: 999px;
        background: var(--fp3d-chrome);
        backdrop-filter: blur(12px);
        border: 1px solid var(--fp3d-line);
        pointer-events: auto;
      }
      .fp3d-through-name {
        font-weight: 600;
        white-space: nowrap;
      }
      /* a small note that the picture is a still, so nobody wonders why it does not move */
      .fp3d-still {
        font-size: 11px;
        font-weight: 400;
        opacity: 0.65;
        white-space: nowrap;
        margin-left: 6px;
      }
      .fp3d-through-bar input[type="range"] {
        width: 140px;
        accent-color: var(--fp3d-accent);
      }
      .fp3d-through-on :is(.fp3d-pin, .fp3d-dev, .fp3d-energy, .fp3d-legend, .fp3d-thumbs, .fp3d-scenes, .fp3d-find-btn, .fp3d-stats) {
        display: none;
      }
      fp3d-quick-menu {
        position: absolute;
        z-index: 6;
      }
      .fp3d-dev-found {
        animation: fp3d-found 0.6s ease-in-out 4;
      }
      @keyframes fp3d-found {
        50% {
          scale: 1.35;
          filter: drop-shadow(0 0 12px var(--fp3d-accent));
        }
      }
      .fp3d-legend {
        position: absolute;
        left: 12px;
        /* above the star button */
        bottom: calc(104px + var(--fp3d-bottom-inset, 0px));
        display: grid;
        gap: 4px;
        min-width: 180px;
        padding: 8px 11px;
        border-radius: 12px;
        background: var(--fp3d-chrome);
        box-shadow: var(--fp3d-shadow);
        font-size: 12px;
        pointer-events: none;
      }
      .fp3d-legend-bar {
        height: 8px;
        border-radius: 4px;
      }
      .fp3d-legend-range {
        display: flex;
        justify-content: space-between;
        color: var(--fp3d-muted);
        font-variant-numeric: tabular-nums;
      }
      .fp3d-legend-none {
        color: var(--fp3d-warm);
      }
      /* Energy Pro: the glass hologram beside the house */
      .fp3d-holo {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 4;
        width: 236px;
        padding: 12px 14px 11px;
        border-radius: 16px;
        overflow: hidden;
        cursor: pointer;
        background: linear-gradient(140deg, rgba(150, 235, 255, 0.2) 0%, rgba(70, 140, 230, 0.08) 45%, rgba(20, 60, 140, 0.05) 100%);
        backdrop-filter: blur(7px) saturate(150%);
        -webkit-backdrop-filter: blur(7px) saturate(150%);
        border: 1px solid rgba(160, 240, 255, 0.55);
        box-shadow:
          0 0 28px rgba(55, 224, 255, 0.35),
          0 0 2px rgba(200, 250, 255, 0.9),
          inset 0 1px 0 rgba(255, 255, 255, 0.45),
          inset 0 0 36px rgba(55, 224, 255, 0.14);
        color: #e6fbff;
        font-size: 12px;
        line-height: 1.35;
        text-shadow: 0 0 6px rgba(80, 220, 255, 0.55);
        will-change: transform;
        transform-origin: 0 0;
      }
      .fp3d-holo[hidden],
      .fp3d-holo-link[hidden] {
        display: none;
      }
      /* a device's card: smaller than the plant's */
      /* the now-playing card: cover, titles, transport and volume */
      .fp3d-holo-media .fp3d-holo-head {
        cursor: pointer;
      }
      .fp3d-holo-track {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 6px;
      }
      .fp3d-holo-cover {
        width: 46px;
        height: 46px;
        border-radius: 8px;
        object-fit: cover;
        flex: none;
        box-shadow: 0 0 12px rgba(55, 224, 255, 0.35);
      }
      .fp3d-holo-cover-none {
        display: grid;
        place-items: center;
        font-size: 22px;
        background: rgba(55, 224, 255, 0.15);
        color: #a8f0ff;
      }
      .fp3d-holo-titles {
        display: grid;
        gap: 2px;
        min-width: 0;
      }
      .fp3d-holo-titles b {
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 170px;
      }
      .fp3d-holo-titles span {
        font-size: 12px;
        opacity: 0.8;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 170px;
      }
      .fp3d-holo-media-controls {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-top: 8px;
      }
      .fp3d-holo-media-controls button {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 1px solid rgba(160, 240, 255, 0.4);
        background: rgba(8, 16, 34, 0.6);
        color: var(--fp3d-text);
        cursor: pointer;
        font-size: 12px;
      }
      .fp3d-holo-media-controls button:disabled {
        opacity: 0.3;
        cursor: default;
      }
      .fp3d-holo-media-controls input[type="range"] {
        width: 70px;
        accent-color: var(--fp3d-accent);
      }
      .fp3d-holo-car-main {
        display: flex;
        align-items: baseline;
        gap: 8px;
        margin-top: 4px;
      }
      .fp3d-holo-car-main b {
        font-size: 22px;
        font-variant-numeric: tabular-nums;
      }
      .fp3d-holo-car-main span {
        font-size: 12px;
        opacity: 0.85;
      }
      .fp3d-holo-car-bar {
        height: 5px;
        margin-top: 6px;
        border-radius: 3px;
        background: rgba(160, 240, 255, 0.15);
        overflow: hidden;
      }
      .fp3d-holo-car-bar i {
        display: block;
        height: 100%;
        border-radius: 3px;
        box-shadow: 0 0 8px currentColor;
      }
      .fp3d-holo-meters {
        display: flex;
        flex-wrap: wrap;
        gap: 2px 10px;
      }
      .fp3d-holo-mrow {
        display: grid;
        grid-template-columns: 50px 64px 1fr;
        align-items: center;
        gap: 6px;
        margin-top: 5px;
        font-size: 12px;
      }
      .fp3d-holo-mrow span {
        opacity: 0.8;
      }
      .fp3d-holo-mrow b {
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
      }
      .fp3d-holo-mrow i {
        position: relative;
        height: 4px;
        border-radius: 2px;
        /* red – yellow – green (the ideal range in the middle) – yellow – red */
        background: linear-gradient(90deg, rgba(255, 77, 64, 0.35), rgba(255, 204, 64, 0.35) 25%, rgba(77, 255, 128, 0.45) 40%, rgba(77, 255, 128, 0.45) 60%, rgba(255, 204, 64, 0.35) 75%, rgba(255, 77, 64, 0.35));
      }
      .fp3d-holo-mrow-none {
        visibility: hidden;
      }
      .fp3d-holo-mrow em {
        position: absolute;
        top: -2px;
        width: 8px;
        height: 8px;
        margin-left: -4px;
        border-radius: 50%;
        box-shadow: 0 0 6px currentColor;
      }
      .fp3d-holo-more {
        display: block;
        margin: 6px 0 0 auto;
        padding: 2px 9px;
        border: 1px solid color-mix(in srgb, var(--fp3d-accent, #37e0ff) 45%, transparent);
        border-radius: 9px;
        background: transparent;
        color: var(--fp3d-accent, #37e0ff);
        font: 600 11px var(--fp3d-font);
        cursor: pointer;
        pointer-events: auto;
      }
      .fp3d-holo-mline {
        margin-top: 5px;
        font-size: 12px;
        opacity: 0.85;
      }
      /* a bright style (Day, Homely, Architect's model, Pastel, Wood & paper): the darker glass of the module cards,
         so the light text stays readable over a light house and sky (#1126) */
      .fp3d-bright .fp3d-holo:not(.fp3d-holo-plain) {
        background: linear-gradient(140deg, rgba(40, 80, 130, 0.62) 0%, rgba(12, 28, 58, 0.78) 55%, rgba(8, 18, 40, 0.82) 100%);
      }
      /* a module's richer card: a state line, a second big value, a chain, cells, a hint */
      .fp3d-holo.fp3d-holo-mod-wide {
        width: 236px;
        /* a denser card: darker glass, so its many small values stay readable over a bright room */
        background: linear-gradient(140deg, rgba(40, 80, 130, 0.62) 0%, rgba(12, 28, 58, 0.78) 55%, rgba(8, 18, 40, 0.82) 100%);
      }
      .fp3d-holo-mod-wide .fp3d-holo-mrow {
        grid-template-columns: 74px 78px 1fr;
      }
      .fp3d-holo-ping {
        box-shadow:
          0 0 0 2px var(--fp3d-accent, #37e0ff),
          0 0 26px rgba(55, 224, 255, 0.55);
      }
      .fp3d-holo-status {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-top: 6px;
        padding: 4px 8px;
        border-radius: 9px;
        font-size: 13.5px;
        color: var(--st, #37e0ff);
        background: color-mix(in srgb, var(--st, #37e0ff) 14%, transparent);
        border: 1px solid color-mix(in srgb, var(--st, #37e0ff) 45%, transparent);
      }
      .fp3d-holo-status i {
        font-style: normal;
      }
      .fp3d-holo-status span {
        margin-left: auto;
        font-size: 11px;
        color: inherit;
        opacity: 0.8;
        white-space: nowrap;
      }
      .fp3d-holo-mod-main em {
        margin-left: auto;
        display: grid;
        justify-items: end;
        font-style: normal;
        line-height: 1.1;
      }
      .fp3d-holo-mod-main em b {
        font-size: 18px;
      }
      .fp3d-holo-mod-main em small {
        font-size: 10.5px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .fp3d-holo-chain {
        display: flex;
        align-items: stretch;
        gap: 3px;
        margin-top: 7px;
      }
      .fp3d-holo-chain > div,
      .fp3d-holo-cells > div {
        flex: 1;
        min-width: 0;
        display: grid;
        padding: 3px 5px;
        border-radius: 7px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(160, 240, 255, 0.16);
      }
      .fp3d-holo-chain small,
      .fp3d-holo-cells small {
        font-size: 10px;
        opacity: 0.75;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .fp3d-holo-chain b,
      .fp3d-holo-cells b {
        font-size: 12.5px;
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
      }
      .fp3d-holo-chain s {
        align-self: center;
        text-decoration: none;
        opacity: 0.6;
        font-size: 11px;
      }
      .fp3d-holo-chain-note {
        margin-top: 3px;
        font-size: 11px;
        text-align: right;
        opacity: 0.9;
      }
      .fp3d-holo-cells {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4px;
        margin-top: 7px;
      }
      .fp3d-holo-hint {
        margin-top: 6px;
        padding: 4px 7px;
        border-radius: 7px;
        font-size: 11.5px;
        color: var(--hint, #ffc04d);
        background: color-mix(in srgb, var(--hint, #ffc04d) 13%, transparent);
        border-left: 3px solid var(--hint, #ffc04d);
      }
      .fp3d-holo-mrow-fill {
        background: rgba(160, 240, 255, 0.14) !important;
        overflow: hidden;
      }
      .fp3d-holo-mrow-fill s {
        display: block;
        height: 100%;
        border-radius: 2px;
        box-shadow: 0 0 6px currentColor;
      }
      .fp3d-holo-spark-label {
        margin-top: 6px;
        font-size: 10.5px;
        opacity: 0.7;
      }
      .fp3d-holo-spark-label + .fp3d-holo-spark {
        margin-top: 1px;
      }
      .fp3d-holo-spark {
        display: block;
        width: 100%;
        height: 22px;
        margin-top: 6px;
      }
      .fp3d-holo-spark polyline {
        fill: none;
        stroke-width: 1.6;
        vector-effect: non-scaling-stroke;
        stroke-linejoin: round;
      }
      /* a module's chips (Pool Pro: ball valves and the six-way valve, set by hand) */
      .fp3d-holo-chips {
        display: grid;
        gap: 4px;
        margin-top: 4px;
        max-height: 220px;
        overflow-y: auto;
        pointer-events: auto;
      }
      .fp3d-holo-chip,
      .fp3d-holo-chip-row button {
        font: inherit;
        font-size: 11.5px;
        color: inherit;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(91, 124, 255, 0.35);
        border-radius: 8px;
        padding: 4px 8px;
        cursor: pointer;
        text-align: left;
      }
      .fp3d-holo-chip {
        display: grid;
        grid-template-columns: 14px 1fr auto;
        gap: 6px;
        align-items: center;
      }
      .fp3d-holo-chip i {
        font-style: normal;
        color: #ff6b5a;
      }
      .fp3d-holo-chip.fp3d-holo-on i {
        color: #4dff9a;
      }
      .fp3d-holo-chip small {
        opacity: 0.75;
      }
      .fp3d-holo-valve-pos {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
      }
      .fp3d-holo-on {
        border-color: var(--fp3d-accent) !important;
        color: var(--fp3d-accent) !important;
      }
      .fp3d-holo-vol {
        font-size: 11px;
        opacity: 0.8;
        font-variant-numeric: tabular-nums;
      }
      .fp3d-holo-dev {
        width: 184px;
        padding: 10px 12px 9px;
      }
      /* tablet level: no blur and no sheen, the glass is painted */
      .fp3d-holo-plain {
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        background: rgba(12, 26, 50, 0.9);
      }
      .fp3d-holo-plain .fp3d-holo-sheen,
      .fp3d-holo-plain .fp3d-holo-scan {
        display: none;
      }
      /* the thin line from the solar field up to the card, with a dot on the field */
      .fp3d-holo-link {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 3;
        pointer-events: none;
        overflow: visible;
      }
      .fp3d-holo-link line {
        stroke: rgba(160, 240, 255, 0.75);
        stroke-width: 1.2;
        filter: drop-shadow(0 0 3px rgba(55, 224, 255, 0.8));
      }
      .fp3d-holo-link circle {
        fill: #cffaff;
        stroke: rgba(55, 224, 255, 0.8);
        stroke-width: 2;
        filter: drop-shadow(0 0 4px rgba(55, 224, 255, 0.9));
      }
      .fp3d-holo-min {
        width: 150px;
      }
      .fp3d-holo-sheen {
        position: absolute;
        inset: 0;
        background: linear-gradient(115deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 32%, rgba(255, 255, 255, 0) 68%, rgba(255, 255, 255, 0.07) 100%);
        pointer-events: none;
      }
      .fp3d-holo-scan {
        position: absolute;
        inset: 0;
        background: repeating-linear-gradient(0deg, rgba(160, 240, 255, 0.06) 0 1px, transparent 1px 4px);
        pointer-events: none;
      }
      .fp3d-holo-body {
        position: relative;
      }
      .fp3d-holo-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: #8ff0ff;
        text-transform: uppercase;
      }
      .fp3d-holo-live {
        color: #5dffb0;
      }
      .fp3d-holo-big {
        display: flex;
        align-items: baseline;
        gap: 9px;
        margin: 6px 0 1px;
      }
      .fp3d-holo-big b {
        font-size: 26px;
        color: #ffe27a;
        text-shadow: 0 0 12px rgba(255, 210, 80, 0.85);
        font-variant-numeric: tabular-nums;
      }
      .fp3d-holo-big span,
      .fp3d-holo-sub {
        color: #aee9ff;
      }
      .fp3d-holo-sub {
        margin-bottom: 6px;
      }
      .fp3d-holo-plants {
        display: grid;
        grid-template-columns: auto auto;
        justify-content: space-between;
        column-gap: 10px;
        margin: 0 0 5px;
        font-size: 11px;
        color: #aee9ff;
      }
      .fp3d-holo-plants b {
        color: #ffe27a;
        text-align: right;
        font-variant-numeric: tabular-nums;
      }
      .fp3d-holo-sub b,
      .fp3d-holo-cell b,
      .fp3d-holo-foot b {
        color: #fff;
        font-variant-numeric: tabular-nums;
      }
      .fp3d-holo-curve {
        display: block;
        margin-bottom: 7px;
        filter: drop-shadow(0 0 4px rgba(255, 215, 90, 0.7));
      }
      .fp3d-holo-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 6px;
      }
      .fp3d-holo-cell {
        border-left: 2px solid #aee9ff;
        padding-left: 6px;
      }
      .fp3d-holo-cell span {
        font-size: 11px;
      }
      .fp3d-holo-bat {
        border-left-color: #5dffb0;
      }
      .fp3d-holo-bat span {
        color: #5dffb0;
      }
      .fp3d-holo-exp {
        border-left-color: #4ff6ff;
      }
      .fp3d-holo-exp span {
        color: #4ff6ff;
      }
      .fp3d-holo-imp {
        border-left-color: #ff6fb0;
      }
      .fp3d-holo-imp span {
        color: #ff8fc4;
      }
      .fp3d-holo-house {
        border-left-color: #a9c0ff;
      }
      .fp3d-holo-wb {
        border-left-color: #63c9ff;
      }
      .fp3d-holo-bar {
        margin-top: 8px;
        height: 5px;
        border-radius: 3px;
        background: rgba(160, 240, 255, 0.16);
        overflow: hidden;
      }
      .fp3d-holo-bar div {
        height: 100%;
        background: linear-gradient(90deg, #5dffb0, #4ff6ff);
        box-shadow: 0 0 8px rgba(80, 240, 255, 0.8);
      }
      .fp3d-holo-foot {
        display: flex;
        justify-content: space-between;
        margin-top: 3px;
        font-size: 10px;
        color: #aee9ff;
      }
      .fp3d-energy {
        position: absolute;
        left: 12px;
        top: 10px;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        max-width: calc(100% - 24px);
        pointer-events: none;
      }
      .fp3d-energy-item {
        display: grid;
        padding: 5px 11px 6px;
        border-radius: 12px;
        background: var(--fp3d-chrome);
        border-left: 3px solid var(--fp3d-line);
        box-shadow: var(--fp3d-shadow);
        backdrop-filter: blur(6px);
        font-variant-numeric: tabular-nums;
      }
      .fp3d-energy-item span {
        font-size: 11px;
        color: var(--fp3d-muted);
      }
      .fp3d-energy-item b {
        font: 700 15px var(--fp3d-title-font);
      }
      .fp3d-energy-total {
        border-left-color: #6fd8ff;
      }
      .fp3d-energy-grid {
        border-left-color: #37e0ff;
      }
      .fp3d-energy-export,
      .fp3d-energy-solar {
        border-left-color: #ffc633;
      }
      .fp3d-energy-battery {
        border-left-color: #59ff8c;
      }
      .fp3d-flow-toggle {
        pointer-events: auto;
        cursor: pointer;
        border: 0;
        border-left: 3px solid var(--fp3d-line);
        color: inherit;
        text-align: left;
        font: inherit;
      }
      .fp3d-flow-toggle[aria-pressed="true"] {
        border-left-color: var(--fp3d-accent);
      }
      .fp3d-flow-toggle span {
        display: none;
      }
      .fp3d-flow-toggle b {
        opacity: 0.4;
        filter: grayscale(1);
      }
      .fp3d-flow-toggle[aria-pressed="true"] b {
        opacity: 1;
        filter: none;
      }
      .fp3d-energy-tariff {
        border-left-color: #b98cff;
      }
      /* narrow stages (portrait tablets, phones): the energy values scroll in one row */
      @container fp3d (max-width: 900px) {
        .fp3d-energy {
          flex-wrap: nowrap;
          overflow-x: auto;
          scrollbar-width: none;
          pointer-events: auto;
        }
        .fp3d-legend {
          bottom: auto;
          top: 62px;
        }
        .fp3d-has-alerts .fp3d-legend {
          top: 110px;
        }
      }
      /* the view's own controls on the right (#285); the room panel opens there, so they make way for it */
      .fp3d-side-right :is(.fp3d-thumbs, .fp3d-find-btn, .fp3d-central-btn, .fp3d-central, .fp3d-eye-clean, .fp3d-find, .fp3d-legend) {
        left: auto;
        right: 12px;
      }
      .fp3d-side-right .fp3d-eye {
        left: auto;
        right: 56px;
      }
      .fp3d-side-right.fp3d-panel-open :is(.fp3d-thumbs, .fp3d-find-btn, .fp3d-central-btn, .fp3d-central, .fp3d-eye-clean, .fp3d-find, .fp3d-legend) {
        display: none;
      }
      /* a room sheet covers the lower half: the view's own controls step aside */
      @container fp3d ((max-width: 700px) or ((orientation: portrait) and (max-width: 1000px))) {
        .fp3d-panel-open :is(.fp3d-find-btn, .fp3d-find, .fp3d-thumbs, .fp3d-legend, .fp3d-stats, .fp3d-scenes) {
          display: none;
        }
      }
      @media (pointer: coarse) {
        .fp3d-find-close {
          width: 40px;
          height: 40px;
          right: 1px;
          bottom: 1px;
        }
        .fp3d-dev {
          padding: 6px;
        }
        .fp3d-pin {
          padding: 8px 12px;
        }
      }
      .fp3d-dev-full .fp3d-dev-text {
        display: inline;
      }
      .fp3d-dev-name:empty {
        display: none;
      }
      .fp3d-dev-name {
        position: absolute;
        top: calc(100% + 3px);
        left: 50%;
        transform: translateX(-50%);
        max-width: 140px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 1px 6px;
        border-radius: 6px;
        font-size: 10.5px;
        font-weight: 600;
        line-height: 1.35;
        color: var(--fp3d-text);
        background: rgba(10, 16, 32, 0.72);
        pointer-events: none;
      }
      .fp3d-dev-sel {
        outline: 2px solid var(--fp3d-accent);
        outline-offset: 2px;
      }
      .fp3d-dev-on {
        color: #2a1a00;
        border-color: transparent;
        background: var(--fp3d-glow, var(--fp3d-warm));
        box-shadow: 0 0 16px var(--fp3d-glow, var(--fp3d-warm));
      }
      .fp3d-dev-on .fp3d-dev-icon {
        background: rgba(255, 255, 255, 0.28);
      }
      .fp3d-dev-on .fp3d-dev-text {
        color: #2a1a00;
      }
      .fp3d-dev-na {
        opacity: 0.45;
      }
      .fp3d-dev-dim {
        opacity: 0.35;
      }
      .fp3d-dev[hidden],
      .fp3d-pin[hidden] {
        display: none;
      }
      .fp3d-pin-active {
        background: var(--fp3d-accent);
        color: var(--fp3d-accent-text);
        border-color: transparent;
        box-shadow: 0 0 18px rgba(55, 224, 255, 0.45);
      }
      .fp3d-stats b {
        color: var(--fp3d-accent);
        font-weight: 700;
      }
      .fp3d-stats {
        padding: 4px 9px;
        border-radius: 8px;
        background: var(--fp3d-chrome);
        position: absolute;
        right: 10px;
        bottom: calc(8px + var(--fp3d-bottom-inset, 0px));
        font-size: 11.5px;
        color: var(--fp3d-muted);
        font-variant-numeric: tabular-nums;
        pointer-events: none;
      }
      .fp3d-error {
        position: absolute;
        inset: auto 16px 16px;
        color: var(--fp3d-danger);
      }
    `]};customElements.get("fp3d-view3d")||customElements.define("fp3d-view3d",da);function nb(o,t){let e=t.attributes.current_temperature,n=typeof e=="number"&&Number.isFinite(e)?`${nt(o,Math.round(e))} \xB0C`:"",i=!["off","unavailable","unknown"].includes(t.state);return{text:[_t(o,t),n].filter(Boolean).join(" \xB7 "),on:i}}function rt(o,t){return Math.abs(t)>=1e3?`${nt(o,t/1e3,1)} kW`:`${Math.round(t)} W`}function Up(o){let t=[.3,.85,1];return o==="washer"||o==="dryer"?{color:t,level:.8,faces:[{part:"drum",color:t,level:.8}]}:{color:t,level:.8}}var ob=new Set(["rug","stairwell","grid_point","worktop"]);function ib(o){return o.type==="tv_board"?o.h+.9:o.type==="tv_wall"||o.type==="kitchen_wall"?o.h+.25:o.h+.35}var ca="homeplan3d.style_override",jp="homeplan3d.module_full";function rb(){try{let o=JSON.parse(localStorage.getItem(jp)??"[]");return Array.isArray(o)?o.filter(t=>typeof t=="string"):[]}catch{return[]}}function ua(o,t,e={}){let n=["neon","homely","designed","custom"],i=Ke();return g`${e.none?g`<option value="" ?selected=${!t}>${o("style_none")}</option>`:y}
    ${e.auto||e.house?g`<optgroup label=${o("style_group_auto")}>
          ${e.house?g`<option value="house" ?selected=${t==="house"}>${o("style_house")}</option>`:y}
          ${e.auto?g`<option value="auto" ?selected=${t==="auto"}>${o("theme_auto")}</option>`:y}
        </optgroup>`:y}
    ${n.filter(r=>i.some(s=>s.group===r)).map(r=>g`<optgroup label=${o(`style_group_${r}`)}>
            ${i.filter(s=>s.group===r).map(s=>g`<option value=${s.id} ?selected=${t===s.id}>${s.name??o(`style_${s.id}`)}</option>`)}
          </optgroup>`)}`}function qp(o){return typeof o=="string"&&(o==="auto"||o==="house"||o.startsWith("my_")||Ke().some(t=>t.id===o))}var pa;function sb(){let o=new URL("./homeplan3d-timetravel.js?v=2a9147b84fe7",new URL(import.meta.url)).href;return pa??=import(o).catch(t=>{throw pa=void 0,t}),pa}var Tn=class{session=null;starting=!1;host;constructor(t){this.host=t}get active(){return this.starting||!!this.session}start(t){this.active||(this.starting=!0,this.host.requestUpdate(),sb().then(e=>{this.starting&&(this.starting=!1,this.session=e.startTimeTravel({...t,onChange:()=>this.host.requestUpdate(),onExit:()=>this.stop()}),this.host.requestUpdate())},e=>{this.starting=!1,console.error("HomePlan 3D: time travel failed to load",e),this.host.requestUpdate()}))}stop(){this.active&&(this.starting=!1,this.session?.dispose(),this.session=null,this.host.requestUpdate())}hass(t){return this.session?.hass??t}};var ab={tl:"\u2196",tr:"\u2197",bl:"\u2199",br:"\u2198"},K={get(o){try{return localStorage.getItem(`homeplan3d.${o}`)}catch{return null}},set(o,t){try{localStorage.setItem(`homeplan3d.${o}`,t)}catch{}}},ha=class extends at{static properties={hass:{attribute:!1},narrow:{type:Boolean},route:{attribute:!1},panel:{attribute:!1},_mode:{state:!0},_showOpen:{state:!0},_editorReady:{state:!0},_floorId:{state:!0},_roomId:{state:!0},_walking:{state:!0},_overview:{state:!0},_site:{state:!0},_wallMode:{state:!0},_explode:{state:!0},_keepRoof:{state:!0},_plain:{state:!0},_roomBar:{state:!0},_quality:{state:!0},_stats:{state:!0},_markers:{state:!0},_pinSize:{state:!0},_heat:{state:!0},_theme:{state:!0},_zoomStyle:{state:!0},_zoomLate:{state:!0},_zoomScope:{state:!0},_clock:{state:!0},_furnish:{state:!0},_selFurniture:{state:!0},_selDevice:{state:!0},_floorStack:{state:!0},_roomNames:{state:!0},_controlsRight:{state:!0},_keepView:{state:!0},_angleLock:{state:!0},_trail:{state:!0},_cameraWall:{state:!0},_clean:{state:!0},_phone:{state:!0},_phoneAsk:{state:!0},_nowMode:{state:!0},_solo:{state:!0},_navWrap:{state:!0},_optsOpen:{state:!0},_pinHover:{state:!0},_accent:{state:!0},_weather:{state:!0},_director:{state:!0},_micProbe:{state:!0},_voiceHere:{state:!0},_screen:{state:!0}};watch=new xn(this);otherAlerts={at:0,list:[]};pendingRoom=null;nowLinked=!1;nowLinkOpen=!1;pendingLink=null;data=new cn(this);tt=new Tn(this);ttLinked=!1;constructor(){super(),this.narrow=!1,this._mode="view",this._showOpen=!1,this._editorReady=!!customElements.get("fp3d-editor"),this._floorId=null,this._roomId=null,this._walking=!1,this._overview=!1,this._site=new URLSearchParams(location.search).get("plan")==="site",this.data.switchPlan(new URLSearchParams(location.search).get("plan")??K.get("plan")),this._wallMode=K.get("walls")==="cut"?"cut":"auto",this._explode=K.get("explode")!=="0",this._keepRoof=K.get("roof")==="1",this._plain=K.get("plain")==="1";let t=K.get("roombar");this._roomBar=t==="rooms"||t==="all"?t:"off";let e=K.get("quality");this._quality=e==="low"||e==="high"?e:"auto",this._stats=K.get("stats")==="1"||new URLSearchParams(location.search).has("fp3d_stats");let n=K.get("markers");this._markers=n==="none"||n==="all"||n==="room"?n:"important";let i=K.get("pinSize");this._pinSize=i==="small"||i==="large"?i:"normal";let r=K.get("heat");this._heat=r==="temperature"||r==="humidity"||r==="co2"||r==="values"?r:"none";let s=K.get("theme");this._theme=qp(s)?s:"neon",this._zoomStyle=K.get("zoom_style")??"";let a=Number(K.get("zoom_late"));this._zoomLate=Number.isFinite(a)&&K.get("zoom_late")!==null?Math.min(100,Math.max(0,a)):50,this._zoomScope=K.get("zoom_scope")==="room"?"room":"all";let l=K.get("clock");this._clock=l==="tl"||l==="tr"||l==="bl"||l==="br"?l:"off";let c=K.get("accent");this._accent=c&&/^#[0-9a-f]{6}$/i.test(c)?c:null,this._furnish=!1,this._selFurniture=null,this._selDevice=null;let d=K.get("floor_stack");this._floorStack=d==="stacked"||d==="single"?d:"dim",this._roomNames=K.get("room_names")!=="0",this._controlsRight=K.get("controls")==="right",this._keepView=K.get("keep_view")==="1",this._angleLock=K.get("angle_lock")==="1",this._trail=K.get("trail")==="1",this._cameraWall=!1,this._clean=K.get("clean")==="1",this._phone=K.get("phone")==="1",this._nowMode="bar",this._solo=K.get("phone_solo")==="1";let u=new URLSearchParams(location.search);u.get("view")==="now"&&(this.nowLinked=!0,this.nowLinkOpen=!0),(u.get("room")||u.get("show"))&&(this.pendingLink={room:u.get("room"),show:u.get("show")}),this._phoneAsk=K.get("phone")===null&&ur(navigator.userAgent,Math.min(screen.width,screen.height),navigator.maxTouchPoints)==="phone",this._navWrap=K.get("nav_wrap")==="1",this._optsOpen=!1,this._pinHover=!1,this._weather=K.get("weather")!=="0",this._director=ia(),this._micProbe=!1,this._voiceHere=Xs(),this._screen=Zs()}t(t,e){return E(this.hass,t,e)}willUpdate(t){t.has("hass")&&this.hass&&(this.data.setHass(this.hass),this.tt.session?.setLive(this.hass));let e=this.data.building;e&&this._floorId&&!e.floors.some(n=>n.id===this._floorId)&&(this._floorId=null,this._roomId=null)}get isAdmin(){return this.hass?.user?.is_admin??!1}setMode(t){t!==this._mode&&(this.tt.stop(),t==="view"&&this.data.flush(),this._mode=t,Oe(t))}onRoomTap(t){let{floorId:e,roomId:n}=t.detail;if(this._site){if(!n)return;let i=Vd(n,ft);this.pendingRoom={plan:i.plan,floorId:null,roomId:i.id},this._site=!1,i.plan===this.data.planId?this.requestUpdate():this.pickPlan(i.plan);return}if((this.data.building?.floors.length??0)>1&&e&&this._floorId!==e){this._floorId=e,this._roomId=null;return}n&&(this._roomId=n===this._roomId?null:n)}setWallMode(t){this._wallMode=t,K.set("walls",t)}setRoomBar(t){this._roomBar=t,K.set("roombar",t)}setPlain(t){this._plain=t,K.set("plain",t?"1":"0")}setKeepRoof(t){this._keepRoof=t,K.set("roof",t?"1":"0")}setExplode(t){this._explode=t,K.set("explode",t?"1":"0")}followLink(){let t=this.pendingLink,e=this.data.building;if(!(!t||!e||!this.view3d())){if(this.pendingLink=null,t.room){let n=t.room.trim().toLowerCase();for(let i of e.floors){let r=ot(i).find(s=>s.id===t.room||s.name.trim().toLowerCase()===n);if(r){this._floorId=i.id,this._roomId=r.id;break}}}t.show&&setTimeout(()=>this.view3d()?.showNow({entity:t.show}),1200)}}get phoneOn(){return this._phone||this.nowLinked}phoneShell(){return this.renderRoot.querySelector("fp3d-phone-shell")}phoneExtras(){return[{id:"show",icon:"\u{1F441}",label:this.t("show_menu")},{id:"tt",icon:"\u23EA",label:this.t("tt_chip")},{id:"menu",icon:"\u2630",label:"Home Assistant"},{id:"off",icon:"\u{1F4F1}",label:this.t("nav_off")}]}phoneMore(t){t==="show"?this._showOpen=!0:t==="tt"?this.toggleTimeTravel():t==="menu"?this.dispatchEvent(new CustomEvent("hass-toggle-menu",{bubbles:!0,composed:!0})):t==="off"&&this.setPhone(!1)}setPhone(t){this._phone=t,this._phoneAsk=!1,t||(this.nowLinked=!1),K.set("phone",t?"1":"0")}setQuality(t){this._quality=t,K.set("quality",t)}editFurniture(t,e){let n=this.data.building;if(!n)return;let i=structuredClone(n);for(let r of i.floors){let s=r.furniture.find(a=>a.id===t);s&&e(s,r)}this.data.edit(i)}editDevice(t,e){let n=this.data.building;if(!n)return;let i=structuredClone(n);for(let r of i.floors){let s=r.placements.find(a=>a.entity_id===t);s&&e(s,r)}this.data.edit(i)}moveDevice(t){let{id:e,x:n,z:i}=t.detail;this.editDevice(e,(r,s)=>{let[a,l]=ea(s,r.x,r.z,n,i);Object.assign(r,{x:a,z:l})})}turnStep(){return L(this._selDevice??"")==="camera"?15:45}turnDevice(t){this._selDevice&&this.editDevice(this._selDevice,e=>e.rotation=(((e.rotation??0)+t)%360+360)%360)}deleteDevice(){let t=this._selDevice,e=this.data.building;if(!t||!e)return;let n=structuredClone(e);for(let i of n.floors)i.placements=i.placements.filter(r=>r.entity_id!==t);this.data.edit(n),this._selDevice=null}renderDeviceFields(t){let n=this.data.building?.floors.find(u=>u.placements.some(p=>p.entity_id===t)),i=n?.placements.find(u=>u.entity_id===t);if(!n||!i)return y;let r=L(t),s=r==="light",a=r==="camera",l=i.mount==="ceiling",c=r?dn(r,n.height,s||a?i.mount??(a?"wall":"ceiling"):null):1,d=(u,p,h,_,b,m)=>g`<label class="fp3d-size" title=${u}
        >${u}
        <input
          type="number"
          inputmode="decimal"
          step=${h}
          min=${_}
          max=${b}
          .value=${String(Math.round(p*100)/100)}
          @change=${w=>{let k=parseFloat(w.target.value.replace(",","."));Number.isFinite(k)&&m(Math.min(b,Math.max(_,k)))}}
        />
      </label>`;return g`${s?g`<select class="fp3d-size-select" title=${this.t("lamp_mount")} @change=${u=>this.editDevice(t,p=>Object.assign(p,{mount:u.target.value,y:null}))}>
            ${["ceiling","floor","table","wall"].map(u=>g`<option value=${u} ?selected=${u===(i.mount??"ceiling")}>${this.t(`lamp_${u}`)}</option>`)}
          </select>`:y}
      ${a?g`<select class="fp3d-size-select" title=${this.t("camera_mount")} @change=${u=>this.editDevice(t,p=>Object.assign(p,{mount:u.target.value,y:null}))}>
              <option value="wall" ?selected=${!l}>${this.t("camera_mount_wall")}</option>
              <option value="ceiling" ?selected=${l}>${this.t("camera_mount_ceiling")}</option>
            </select>
            ${d(this.t("camera_fov_short"),i.fov??(l?360:90),5,10,360,u=>this.editDevice(t,p=>p.fov=u))}
            ${d(this.t("camera_reach_short"),i.reach??(l?3:4.5),.5,.5,50,u=>this.editDevice(t,p=>p.reach=u))}
            ${d(this.t("camera_tilt_short"),i.tilt??(l?65:20),5,0,90,u=>this.editDevice(t,p=>p.tilt=u))}`:y}
      <label class="fp3d-size" title=${this.t("marker_height")}
        >${this.t("size_short_h")}
        <input
          type="number"
          inputmode="decimal"
          step="0.05"
          min="0"
          .value=${String(Math.round((i.y??c)*100)/100)}
          @change=${u=>{let p=parseFloat(u.target.value.replace(",","."));Number.isFinite(p)&&p>=0&&this.editDevice(t,h=>h.y=Math.round(p*1e3)/1e3)}}
        />
      </label>
      ${i.y!==null?g`<button class="fp3d-chip" @click=${()=>this.editDevice(t,u=>u.y=null)}>${this.t("height_auto")}</button>`:y}`}furnitureName(t){let e=this.data.building?.floors.flatMap(n=>n.furniture).find(n=>n.id===t);return e?kt(this.hass,e.type):""}moveFurniture(t){let{id:e,x:n,z:i}=t.detail,r=this.data.building?.settings.wall_interior??.12;this.editFurniture(e,(s,a)=>{let[l,c]=ea(a,s.x,s.z,n,i);Object.assign(s,{x:l,z:c});let d=Tp(a,s,r);d&&Object.assign(s,d)})}renderSizeFields(t){let e=this.data.building?.floors.flatMap(l=>l.furniture).find(l=>l.id===t);if(!e)return y;let n=Ea(this.hass,this.data.building?.settings.units)==="imperial",i=l=>n?Ra(l):String(Math.round(l*100)/100),r=l=>n?Aa(l,"imperial"):parseFloat(l.replace(",",".")),s=(l,c)=>g`<label class="fp3d-size" title=${this.t(`size_${l}`)}
      >${c}
      <input
        type=${n?"text":"number"}
        inputmode="decimal"
        step="0.05"
        min="0.05"
        .value=${i(e[l])}
        @change=${d=>{let u=r(d.target.value)??NaN;Number.isFinite(u)&&u>0&&this.editFurniture(t,p=>p[l]=Math.round(u*1e3)/1e3)}}
    /></label>`,a=this.data.building?.floors.find(l=>l.furniture.some(c=>c.id===t));return g`${s("w",this.t("size_short_w"))}${s("d",this.t("size_short_d"))}${s("h",this.t("size_short_h"))}
    ${a&&Wl(e)?g`<label class="fp3d-size" title=${this.t("mount_height")}
            >↕
            <input
              type=${n?"text":"number"}
              inputmode="decimal"
              step="0.05"
              min="0"
              .value=${i(e.mount_y??mt(a,e))}
              @change=${l=>{let c=r(l.target.value)??NaN;Number.isFinite(c)&&c>=0&&this.editFurniture(t,d=>d.mount_y=Math.round(c*1e3)/1e3)}}
          /></label>
          ${e.mount_y!=null?g`<button class="fp3d-chip" @click=${()=>this.editFurniture(t,l=>l.mount_y=null)}>${this.t("height_auto")}</button>`:y}`:y}`}turnFurniture(t){this._selFurniture&&this.editFurniture(this._selFurniture,e=>e.rotation=((e.rotation+t)%360+360)%360)}deleteFurniture(){let t=this._selFurniture,e=this.data.building;if(!t||!e)return;let n=structuredClone(e);for(let i of n.floors)i.furniture=i.furniture.filter(r=>r.id!==t);this.data.edit(n),this._selFurniture=null}rememberStartView(t=!1){let e=this.data.building;if(!e)return;let n=t?null:this.view3d()?.currentView();!t&&!n||this.data.edit({...e,settings:{...e.settings,start_view:n??null}})}openFunSettings(t="fun",e=null){this.setMode("editor");let n=0,i=()=>{let r=this.renderRoot.querySelector("fp3d-editor");r?.openSettings?r.openSettings(t,e):n++<60&&setTimeout(i,100)};this.updateComplete.then(i)}siteBuilding(){return this.watch.site(this.data)}showSite(){this.tt.active&&this.tt.stop(),this._site=!0,this._floorId=null,this._roomId=null,this._mode="view"}planBuildings(){return this.watch.all(this.data)}alertsElsewhere(){if(!this.hass||this.data.plans.length<2)return[];let t=Date.now();if(t-this.otherAlerts.at<2e3)return this.otherAlerts.list;let e=[];for(let[n,i]of this.watch.others)if(n!==this.data.planId)for(let r of ii(this.hass,i).alerts)e.push({plan:n,alert:r});return this.otherAlerts={at:t,list:e},e}alertCounts(){let t=new Map;for(let{plan:e}of this.alertsElsewhere())t.set(e,(t.get(e)??0)+1);return t}pickPlan(t){this._site&&(this._site=!1,this._floorId=null,this._roomId=null),t!==this.data.planId&&(this.tt.active&&this.tt.stop(),K.set("plan",t),this._floorId=null,this._roomId=null,this.data.switchPlan(t))}showElsewhere(t,e){this.pendingRoom={plan:t,floorId:e.floorId,roomId:e.roomId},this.pickPlan(t)}view3d(){return this.renderRoot.querySelector("fp3d-view3d")}toggleTimeTravel(t=null){if(this.tt.active){this.tt.stop();return}let e=this.view3d(),n=this.data.building;!e||!n||!this.hass||(this._furnish=!1,this._cameraWall=!1,this.tt.start({live:this.hass,building:n,spec:e.historyEntities(),quality:this._quality,at:t,t:(i,r)=>E(this.hass,i,r)}))}updated(){this.data.plans.length>1&&this.watch.watch(this.hass,this.data),this.followLink(),this.nowLinkOpen&&this.phoneShell()&&(this.nowLinkOpen=!1,this.phoneShell().openList());let t=this.pendingRoom;if(t&&this.data.planId===t.plan&&this.data.building&&(this.pendingRoom=null,this._floorId=t.floorId??this.data.building.floors.find(n=>ot(n).some(i=>i.id===t.roomId))?.id??null,this._roomId=t.roomId),this.pendingTemplate!==null&&this.hass?.user&&this.data.building){let n=this.pendingTemplate;this.pendingTemplate=null,this.hass.user.is_admin&&this.openFunSettings("cards",n||null)}if(this.ttLinked||!this.data.building||!an()||this._mode!=="view"||!this.view3d())return;this.ttLinked=!0;let e=new URLSearchParams(location.search).get("tt");e!==null&&this.toggleTimeTravel(e)}back(){this._roomId?this._roomId=null:this._floorId&&(this.data.building?.floors.length??0)>1?this._floorId=null:this.view3d()?.resetView()}onKey=t=>{t.key!=="Escape"||this._mode!=="view"||(this.tt.active?this.tt.stop():this.back())};connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.onKey);let t=new URLSearchParams(location.search);t.get("tab")==="extensions"&&(this._mode="extensions"),t.get("settings")==="cards"&&(this.pendingTemplate=t.get("template")??"")}pendingTemplate=null;disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKey),this.tt.stop()}render(){let t=this.data.building;In(t?.settings.styles_custom);let e=this.data.saveState;return g`
      <div class="fp3d-app ${(this._clean||this.phoneOn)&&this._mode==="view"?"fp3d-clean":""}" style=${this._accent?`--fp3d-accent:${this._accent}`:""}>
        ${this._micProbe&&this.hass?g`<fp3d-mic-probe .hass=${this.hass} .building=${t} @close=${()=>(this._micProbe=!1,Li())}></fp3d-mic-probe>`:y}
        ${(this._clean||this.phoneOn)&&this._mode==="view"?y:g`<header class="fp3d-header">
          <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
          <h1>HomePlan 3D</h1>
          ${this.data.plans.length>1||this.isAdmin&&this.data.plans.length>0?g`<fp3d-plan-picker
                .hass=${this.hass}
                .plans=${this.data.plans}
                .current=${this.data.planId}
                ?admin=${this.isAdmin}
                @plan-pick=${n=>this.pickPlan(n.detail.plan)}
                .alerts=${this.alertCounts()}
                @plan-new=${()=>this.openFunSettings("plans")}
                @plan-manage=${()=>this.openFunSettings("plans")}
                @plan-overview=${()=>this._overview=!0}
                @plan-site=${()=>this.showSite()}
                .site=${this._site}
                .hasSite=${this.data.plans.some(n=>n.site?.on)}
              ></fp3d-plan-picker>`:y}
          ${this._overview?g`<fp3d-plan-overview
                .hass=${this.hass}
                .plans=${this.data.plans}
                .buildings=${this.planBuildings()}
                .current=${this.data.planId}
                @plan-pick=${n=>{this._overview=!1,this.pickPlan(n.detail.plan)}}
                @close=${()=>this._overview=!1}
              ></fp3d-plan-overview>`:y}
          ${this.isAdmin?g`<div class="fp3d-seg" role="tablist">
                <button role="tab" aria-pressed=${this._mode==="view"} @click=${()=>this.setMode("view")}>${this.t("view")}</button>
                <button role="tab" aria-pressed=${this._mode==="editor"} @click=${()=>this.setMode("editor")}>${this.t("editor")}</button>
                <button role="tab" class="fp3d-tab-ext" aria-pressed=${this._mode==="extensions"} @click=${()=>this.setMode("extensions")}>
                  ✦ ${this.t("ext_tab")}
                </button>
              </div>`:y}
          <span class="fp3d-grow"></span>
          ${this._mode==="view"&&t?.floors.some(n=>n.rooms.length)?g`<button
                  class="fp3d-opts-btn"
                  aria-expanded=${this._optsOpen}
                  title=${this.t("view_options")}
                  aria-label=${this.t("view_options")}
                  @click=${()=>this._optsOpen=!this._optsOpen}
                >
                  ⚙
                </button>
                <div class="fp3d-view-opts ${this._optsOpen?"fp3d-opts-open":""}">
                <button class="fp3d-chip" aria-pressed=${this._phone} title=${this.t("now_setting_hint")} @click=${()=>this.setPhone(!this._phone)}>📱 ${this.t("now_setting")}</button>
                <div class="fp3d-seg fp3d-quality" role="group" aria-label=${this.t("quality")}>
                ${["auto","low","high"].map(n=>g`<button aria-pressed=${this._quality===n} @click=${()=>this.setQuality(n)}>${this.t(`quality_${n}`)}</button>`)}
              </div>
              <div class="fp3d-seg fp3d-quality" role="group" aria-label=${this.t("style")}>
                <label class="fp3d-style-pick" title=${this.t("style")}>
                  <span aria-hidden="true">🎨</span>
                  <select
                    aria-label=${this.t("style")}
                    @change=${n=>{this._theme=n.target.value,K.set("theme",this._theme)}}
                  >
                    ${ua(n=>this.t(n),this._theme,{auto:!0,house:!0})}
                  </select>
                </label>
                <label class="fp3d-style-pick" title=${this.t("zoom_style_hint")}>
                  <span aria-hidden="true">🔍</span>
                  <select
                    aria-label=${this.t("zoom_style")}
                    @change=${n=>{this._zoomStyle=n.target.value,K.set("zoom_style",this._zoomStyle)}}
                  >
                    <option value="" ?selected=${!this._zoomStyle}>${this.t("zoom_style_off")}</option>
                    ${ua(n=>this.t(n),this._zoomStyle,{})}
                  </select>
                </label>
                ${this._zoomStyle?g`<label class="fp3d-style-pick fp3d-zoom-late" title=${this.t("zoom_late_hint")}>
                      <span>${this.t("zoom_late_early")}</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        aria-label=${this.t("zoom_late_hint")}
                        .value=${String(this._zoomLate)}
                        @input=${n=>{this._zoomLate=Number(n.target.value),K.set("zoom_late",String(this._zoomLate))}}
                      />
                      <span>${this.t("zoom_late_late")}</span>
                    </label>
                    <label class="fp3d-style-pick" title=${this.t("zoom_scope_hint")}>
                      <select
                        aria-label=${this.t("zoom_scope_hint")}
                        @change=${n=>{this._zoomScope=n.target.value,K.set("zoom_scope",this._zoomScope)}}
                      >
                        <option value="all" ?selected=${this._zoomScope!=="room"}>${this.t("zoom_scope_all")}</option>
                        <option value="room" ?selected=${this._zoomScope==="room"}>${this.t("zoom_scope_room")}</option>
                      </select>
                    </label>`:y}
                <label class="fp3d-accent-pick" title=${this.t("accent_hint")}>
                  <input
                    type="color"
                    .value=${this._accent??"#37e0ff"}
                    aria-label=${this.t("accent")}
                    @input=${n=>{this._accent=n.target.value,K.set("accent",this._accent)}}
                  />
                  ${this._accent?g`<button
                        class="fp3d-accent-reset"
                        title=${this.t("accent_reset")}
                        aria-label=${this.t("accent_reset")}
                        @click=${()=>{this._accent=null,K.set("accent","")}}
                      >
                        ↺
                      </button>`:y}
                </label>
              </div>
              <div class="fp3d-seg fp3d-quality" role="group" aria-label=${this.t("clock")} title=${this.t("clock")}>
                <span class="fp3d-seg-label" aria-hidden="true">🕐</span>
                ${["off","tl","tr","bl","br"].map(n=>g`<button aria-pressed=${this._clock===n} title=${this.t(`clock_${n}`)} aria-label=${this.t(`clock_${n}`)} @click=${()=>{this._clock=n,K.set("clock",n)}}>
                      ${n==="off"?this.t("clock_off"):ab[n]}
                    </button>`)}
              </div>
              <div class="fp3d-seg fp3d-quality" role="group" aria-label=${this.t("markers")}>
                ${["none","room","important","all"].map(n=>g`<button
                      aria-pressed=${this._markers===n}
                      title=${this.t("markers")}
                      @click=${()=>{this._markers=n,K.set("markers",n)}}
                    >
                      ${this.t(`markers_${n}`)}
                    </button>`)}
              </div>
              <div class="fp3d-seg fp3d-quality" role="group" aria-label=${this.t("pin_size")} title=${this.t("pin_size")}>
                ${["small","normal","large"].map(n=>g`<button
                      aria-pressed=${this._pinSize===n}
                      @click=${()=>{this._pinSize=n,K.set("pinSize",n)}}
                    >
                      ${this.t(`pin_size_${n}`)}
                    </button>`)}
              </div>
              <div class="fp3d-seg fp3d-quality" role="group" aria-label=${this.t("controls_side")} title=${this.t("controls_side")}>
                ${[!1,!0].map(n=>g`<button
                      aria-pressed=${this._controlsRight===n}
                      title=${this.t(n?"controls_right":"controls_left")}
                      aria-label=${this.t(n?"controls_right":"controls_left")}
                      @click=${()=>{this._controlsRight=n,K.set("controls",n?"right":"left")}}
                    >
                      ${n?"\u25E8":"\u25E7"}
                    </button>`)}
                ${this.isAdmin?g`<button
                        title=${`${this.t("start_view")}: ${this.t("start_view_set")}`}
                        aria-label=${this.t("start_view_set")}
                        @click=${()=>this.rememberStartView()}
                        @mouseenter=${()=>this._pinHover=!0}
                        @mouseleave=${()=>this._pinHover=!1}
                        @focus=${()=>this._pinHover=!0}
                        @blur=${()=>this._pinHover=!1}
                      >
                        📌
                      </button>
                      ${this.data.building?.settings.start_view?g`<button title=${`${this.t("start_view")}: ${this.t("start_view_reset")}`} aria-label=${this.t("start_view_reset")} @click=${()=>this.rememberStartView(!0)}>📌✕</button>`:y}`:y}
                <button
                  aria-pressed=${this._keepView}
                  title=${`${this.t("keep_view")}: ${this.t("keep_view_hint")}`}
                  aria-label=${this.t("keep_view")}
                  @click=${()=>{this._keepView=!this._keepView,K.set("keep_view",this._keepView?"1":"0")}}
                >
                  ⌖
                </button>
                <button
                  aria-pressed=${this._angleLock}
                  title=${`${this.t("angle_lock")}: ${this.t("angle_lock_hint")}`}
                  aria-label=${this.t("angle_lock")}
                  @click=${()=>{this._angleLock=!this._angleLock,K.set("angle_lock",this._angleLock?"1":"0")}}
                >
                  🔒
                </button>
                <button
                  aria-pressed=${this._stats}
                  title=${this.t("fps_title")}
                  @click=${()=>{this._stats=!this._stats,K.set("stats",this._stats?"1":"0")}}
                >
                  ${this.t("fps")}
                </button>
              </div>
              </div>`:y}
          ${this._mode==="editor"&&e!=="idle"?g`<span class="fp3d-save fp3d-save-${e}">${this.t(e==="saving"?"saving":e==="saved"?"saved":"save_error")}</span>`:y}
          <span class="fp3d-version" title=${this.t("version_hint",{backend:this.data.backendVersion??"?"})}>v${this.data.frontendVersion}</span>
        </header>`}
        ${this._clean&&this._mode==="view"?y:this.renderNotices()}
        ${this.data.error&&!t?g`<p class="fp3d-message">${this.t("load_error")}: ${this.data.error}</p>`:y}
        ${!t&&!this.data.error?g`<p class="fp3d-message">${this.t("loading")}</p>`:y}
        ${t?this._mode==="editor"&&this.isAdmin?this.renderEditor(t):this._mode==="extensions"&&this.isAdmin?this.renderExtensions():this.renderView(this._site?this.siteBuilding()??t:t):y}
      </div>
    `}renderNotices(){let t=this.data,e=[];for(let{plan:n,alert:i}of this.alertsElsewhere()){let r=this.watch.others.get(n);r&&e.push(g`<div class="fp3d-notice fp3d-notice-error">
          <span>⚠ ${this.t("plan_alert",{plan:yn(this.hass,t.plans,n),text:Ie(this.hass,r,i)})}</span>
          <button class="fp3d-btn" @click=${()=>this.showElsewhere(n,i)}>${this.t("plan_alert_go")}</button>
        </div>`)}if(t.needsRestart&&(t.versionGap==="frontend"?e.push(g`<div class="fp3d-notice fp3d-notice-warn">
            ${this.t("needs_reload",{frontend:t.frontendVersion,backend:t.backendVersion??"?"})}
            <button class="fp3d-btn" @click=${()=>location.reload()}>${this.t("reload_page")}</button>
          </div>`):e.push(g`<div class="fp3d-notice fp3d-notice-warn">${t.backendVersion?this.t("needs_restart",{version:t.backendVersion,frontend:t.frontendVersion}):this.t("needs_restart_old")}</div>`)),t.saveState==="error"&&t.saveError&&e.push(g`<div class="fp3d-notice fp3d-notice-error">${this.t("save_failed_detail",{error:t.saveError})}</div>`),t.draft&&this.isAdmin){let n=new Date(t.draft.savedAt).toLocaleString(this.hass?.language);e.push(g`<div class="fp3d-notice">
          <span>${this.t(t.draft.conflict?"draft_conflict":"draft_found",{time:n})}</span>
          <button class="fp3d-btn fp3d-primary" @click=${()=>t.restoreDraft()}>${this.t("draft_restore")}</button>
          <button class="fp3d-btn" @click=${()=>t.discardDraft()}>${this.t("draft_discard")}</button>
        </div>`)}return e.length?g`<div class="fp3d-notices">${e}</div>`:y}renderExtensions(){return this._editorReady?g`<fp3d-extensions
      class="fp3d-body"
      .hass=${this.hass}
      .packs=${this.data.packs}
      .building=${this.data.building}
      @building-edit=${t=>this.data.edit(t.detail)}
      @open-fun-settings=${()=>this.openFunSettings()}
      @packs-changed=${()=>{this.data.reloadPacks()}}
    ></fp3d-extensions>`:(os().then(()=>this._editorReady=!0,t=>this.data.error=String(t)),g`<div class="fp3d-empty"><p>${this.t("loading")}</p></div>`)}renderEditor(t){return this._editorReady?g`<fp3d-editor
      class="fp3d-body"
      .hass=${this.hass}
      .building=${t}
      .planId=${this.data.planId}
      .plans=${this.data.plans}
      .trash=${this.data.trash}
      .locatePlan=${this.data.locatePlan}
      @plan-pick=${e=>this.pickPlan(e.detail.plan)}
      @plans-changed=${()=>{this.data.reloadPlans()}}
      .narrow=${this.narrow}
      .packs=${this.data.packs}
      @packs-changed=${()=>{this.data.reloadPacks()}}
      @director-here=${()=>this._director=ia()}
      @voice-here=${()=>{this._voiceHere=Xs(),this._screen=Zs()}}
      @mic-probe=${()=>pe().then(()=>this._micProbe=!0).catch(()=>{})}
      @open-extensions=${()=>this.setMode("extensions")}
      @building-changed=${e=>this.data.edit(e.detail.building)}
    ></fp3d-editor>`:(os().then(()=>this._editorReady=!0,e=>this.data.error=String(e)),g`<div class="fp3d-empty"><p>${this.t("loading")}</p></div>`)}onNavWheel=t=>{if(this._navWrap||!t.deltaY||t.deltaX)return;let e=t.currentTarget;e.scrollWidth<=e.clientWidth||(e.scrollLeft+=t.deltaY,t.preventDefault())};renderView(t){if(!t.floors.length||!t.floors.some(c=>c.rooms.length))return g`<div class="fp3d-empty">
        <p>${this.t(this.isAdmin?"no_building_admin":"no_building")}</p>
        ${this.isAdmin?g`<button class="fp3d-btn fp3d-primary" @click=${()=>this.setMode("editor")}>${this.t("open_editor")}</button>
              <p class="fp3d-phone-only">${this.t("phone_hint")}</p>`:y}
      </div>`;let e=t.floors.find(c=>c.id===this._floorId),n=e?[e]:t.floors,i=this.tt.active,r=this._roomBar,s=r!=="off"&&!i,a=this.phoneOn&&!i&&!this._walking,l=r==="off";return g`
      ${this._clean||this.phoneOn||!l&&t.floors.length<2?y:g`<nav class="fp3d-nav ${this._navWrap?"fp3d-nav-wrap":""}" @wheel=${this.onNavWheel}>
        ${t.floors.length>1?g`<button class="fp3d-chip" aria-pressed=${this._floorId===null} @click=${()=>{this._floorId=null,this._roomId=null}}>
                ${this.t("all_floors")}
              </button>
              ${[...t.floors].reverse().map(c=>g`<button
                  class="fp3d-chip"
                  aria-pressed=${c.id===this._floorId}
                  @click=${()=>{this._floorId=c.id,this._roomId=null}}
                >
                  ${c.name}
                </button>`)}
              ${l?g`<span class="fp3d-sep"></span>`:y}`:y}
        ${(l?n:[]).flatMap(c=>[n.length>1&&ot(c).some(d=>d.name.trim())?g`<span class="fp3d-nav-floor">${c.name}</span>`:y,...ot(c).filter((d,u,p)=>d.name.trim()&&!(d.outdoor&&p.findIndex(h=>h.outdoor&&h.area_id===d.area_id&&h.name===d.name)<u)).map(d=>g`<button
              class="fp3d-chip fp3d-room-chip"
              aria-pressed=${d.id===this._roomId}
              @click=${()=>{t.floors.length>1&&(this._floorId=c.id),this._roomId=d.id===this._roomId?null:d.id}}
            >
              ${d.name}
            </button>`)])}
        <button
          class="fp3d-chip fp3d-nav-toggle"
          title=${this.t(this._navWrap?"nav_row":"nav_wrap")}
          aria-label=${this.t(this._navWrap?"nav_row":"nav_wrap")}
          aria-pressed=${this._navWrap}
          @click=${()=>{this._navWrap=!this._navWrap,K.set("nav_wrap",this._navWrap?"1":"0")}}
        >
          ${this._navWrap?"\u2194":"\u2261"}
        </button>
      </nav>`}
      <div class="fp3d-stage-wrap ${this._roomId?"fp3d-room-open":""} ${this._controlsRight?"fp3d-side-right":""} ${i?"fp3d-tt":""} ${s?"fp3d-has-bar":""} ${a?`fp3d-phone fp3d-now-${this._nowMode}`:""}">
        <fp3d-view3d
          class="fp3d-body"
          @walk-change=${c=>this._walking=c.detail.walking}
          .pivotMark=${this._pinHover}
          .hass=${this.tt.hass(this.hass)}
          .replay=${this.tt.session?.replay??null}
          .building=${t}
          .planId=${this._site?null:this.data.planId}
          .noSave=${this._site}
          .packs=${this.data.packs}
          .floorStack=${this._floorStack}
          .roomLabels=${this._roomNames}
          .controlsRight=${this._controlsRight}
          .keepView=${this._keepView}
          .angleLock=${this._angleLock}
          ?trail=${this._trail}
          .cameraWall=${this._cameraWall&&!i}
          @camera-wall-close=${()=>this._cameraWall=!1}
          @camera-wall-open=${()=>this._cameraWall=!0}
          .clean=${this._clean||this.phoneOn}
          .cleanButton=${!this.phoneOn}
          .rooms=${a&&this._solo&&this._roomId?[this._roomId]:null}
          @clean-toggle=${()=>{this._clean=!this._clean,K.set("clean",this._clean?"1":"0")}}
          .weather=${this._weather}
          .director=${this._director}
          .voice=${this._voiceHere}
          .screen=${this._screen||null}
          .panelOpen=${!!this._roomId}
          .floorId=${t.floors.length>1?this._floorId:t.floors[0]?.id??null}
          .roomId=${this._roomId}
          .wallMode=${this._wallMode}
          .explode=${this._explode}
          .keepRoof=${this._keepRoof}
          .plain=${this._plain}
          .markerMode=${this._markers}
          .pinSize=${this._pinSize}
          .heatMode=${this._heat}
          .theme=${this._theme}
          .zoomStyle=${this._zoomStyle}
          .zoomLate=${this._zoomLate}
          .zoomScope=${this._zoomScope}
          .clock=${this._clock}
          .accent=${this._accent}
          ?furnish=${this._furnish&&!i}
          .selectedFurniture=${this._selFurniture}
          @furniture-select=${c=>this._selFurniture=c.detail.id}
          @furniture-move=${this.moveFurniture}
          @device-select=${c=>this._selDevice=c.detail.id}
          @device-move=${this.moveDevice}
          .quality=${this._quality}
          ?showStats=${this._stats}
          @status-change=${()=>this.phoneOn&&setTimeout(()=>this.phoneShell()?.requestUpdate(),0)}
          @room-tap=${this.onRoomTap}
          @open-extensions=${()=>this.setMode("extensions")}
          @floor-tap=${c=>{this._floorId=c.detail.floorId,this._roomId=null}}
          @back=${()=>this.back()}
        ></fp3d-view3d>
        ${this._roomId&&!this._walking&&!(a&&this._nowMode==="check")?g`<fp3d-room-panel
              ?walk=${!0}
              @walk-here=${()=>this.view3d()?.walkHere()}
              class="fp3d-room-panel"
              ?collapsible=${this.phoneOn}
              @camera-look=${c=>this.view3d()?.lookThrough(c.detail.entity)}
              .hass=${this.tt.hass(this.hass)}
              ?readOnly=${i}
              .room=${t.floors.flatMap(c=>ot(c)).find(c=>c.id===this._roomId)??null}
              .floor=${t.floors.find(c=>ot(c).some(d=>d.id===this._roomId))??null}
              .building=${t}
              .confirmEntities=${pn(this.hass,t.floors)}
              .sheets=${this._roomId?this.view3d()?.roomSheets(this._roomId)??null:null}
              @sheet-open=${c=>this._roomId&&this.view3d()?.openRoomSheet(this._roomId,c.detail.id)}
              @close=${()=>this._roomId=null}
            ></fp3d-room-panel>`:y}
        ${a?g`<fp3d-phone-shell
              .hass=${this.hass}
              .building=${t}
              .view=${()=>this.view3d()}
              .floorId=${this._floorId}
              .roomId=${this._roomId}
              .solo=${this._solo}
              .extras=${this.phoneExtras()}
              .watts=${c=>rt(this.hass,c)}
              @phone-mode=${c=>this._nowMode=c.detail}
              @phone-room=${c=>{this._floorId=t.floors.length>1||c.detail.roomId?c.detail.floorId:null,this._roomId=c.detail.roomId}}
              @phone-solo=${c=>{this._solo=c.detail,K.set("phone_solo",this._solo?"1":"0")}}
              @phone-more=${c=>this.phoneMore(c.detail)}
            ></fp3d-phone-shell>`:y}
        ${this._phoneAsk&&!i?g`<div class="fp3d-now-ask" role="dialog">
              <span>${this.t("now_try")}</span>
              <button class="fp3d-chip" @click=${()=>this.setPhone(!0)}>${this.t("now_try_yes")}</button>
              <button class="fp3d-chip" @click=${()=>this.setPhone(!1)}>${this.t("now_try_no")}</button>
            </div>`:y}
        ${s?g`<fp3d-room-bar
              class="fp3d-room-bar"
              .hass=${this.hass}
              .building=${t}
              .floorId=${t.floors.length>1?this._floorId:t.floors[0]?.id??null}
              .roomId=${this._roomId}
              ?favorites=${r==="all"}
              @room-pick=${c=>{t.floors.length>1&&(this._floorId=c.detail.floorId),this._roomId=c.detail.roomId===this._roomId?null:c.detail.roomId}}
            ></fp3d-room-bar>`:y}
        ${this.tt.session?g`<fp3d-time-bar .session=${this.tt.session}></fp3d-time-bar>`:y}
        ${this._clean||a&&!this._showOpen?y:g`<div class="fp3d-overlay">
          <div class="fp3d-show-wrap">
            <button class="fp3d-chip" aria-haspopup="true" aria-expanded=${this._showOpen} @click=${()=>this._showOpen=!this._showOpen}>${this.t("show_menu")} <span class="fp3d-caret">▾</span></button>
            ${this._showOpen?g`<div class="fp3d-show-veil" @click=${()=>this._showOpen=!1}></div>
                  <div class="fp3d-show-panel">
          <div class="fp3d-seg">
            <button aria-pressed=${this._wallMode==="auto"} @click=${()=>this.setWallMode("auto")}>${this.t("walls_auto")}</button>
            <button aria-pressed=${this._wallMode==="cut"} @click=${()=>this.setWallMode("cut")}>${this.t("walls_cut")}</button>
          </div>
          <div class="fp3d-seg" title=${this.t("plain_hint")}>
            <button aria-pressed=${!this._plain} @click=${()=>this.setPlain(!1)}>${this.t("plain_off")}</button>
            <button aria-pressed=${this._plain} @click=${()=>this.setPlain(!0)}>${this.t("plain_on")}</button>
          </div>
          <div class="fp3d-seg" title=${this.t("room_bar_hint")}>
            <button aria-pressed=${this._roomBar==="off"} @click=${()=>this.setRoomBar("off")}>${this.t("room_bar_none")}</button>
            <button aria-pressed=${this._roomBar==="rooms"} @click=${()=>this.setRoomBar("rooms")}>${this.t("room_bar_rooms")}</button>
            <button aria-pressed=${this._roomBar==="all"} @click=${()=>this.setRoomBar("all")}>${this.t("room_bar_all")}</button>
          </div>
          ${t.floors.length>1&&!this._floorId?g`<div class="fp3d-seg">
                <button aria-pressed=${this._explode} @click=${()=>this.setExplode(!0)}>${this.t("floors_apart")}</button>
                <button aria-pressed=${!this._explode} @click=${()=>this.setExplode(!1)}>${this.t("floors_stacked")}</button>
              </div>`:y}
          ${!this._floorId&&t.settings.roof.type!=="none"?g`<div class="fp3d-seg">
                <button aria-pressed=${this._keepRoof} title=${this.t("roof_keep_hint")} @click=${()=>this.setKeepRoof(!this._keepRoof)}>${this.t("roof_keep")}</button>
              </div>`:y}
          ${t.floors.length>1&&this._floorId?g`<div class="fp3d-seg" role="group" aria-label=${this.t("card_floor_stack")}>
                ${["dim","stacked","single"].map(c=>g`<button
                      aria-pressed=${this._floorStack===c}
                      @click=${()=>{this._floorStack=c,K.set("floor_stack",c)}}
                    >
                      ${this.t(`floor_stack_short_${c}`)}
                    </button>`)}
              </div>`:y}
          <div class="fp3d-seg" role="group" aria-label=${this.t("heatmap")}>
            ${["none","temperature","humidity","co2","values"].map(c=>g`<button
                  aria-pressed=${this._heat===c}
                  @click=${()=>{this._heat=c,K.set("heat",c)}}
                >
                  ${this.t(c==="none"?"heat_off":`heat_short_${c}`)}
                </button>`)}
          </div>
          <button
            class="fp3d-chip"
            aria-pressed=${this._roomNames}
            @click=${()=>{this._roomNames=!this._roomNames,K.set("room_names",this._roomNames?"1":"0")}}
          >
            ${this.t("room_names_short")}
          </button>
          <button
            class="fp3d-chip"
            aria-pressed=${this._trail}
            title=${this.t("trail_hint")}
            @click=${()=>{this._trail=!this._trail,K.set("trail",this._trail?"1":"0")}}
          >
            ${this.t("trail_short")}
          </button>
          <button
            class="fp3d-chip"
            aria-pressed=${this._cameraWall}
            title=${this.t("camera_wall_hint")}
            @click=${()=>this._cameraWall=!this._cameraWall}
          >
            ${this.t("cameras_short")}
          </button>
          <button
            class="fp3d-chip"
            aria-pressed=${this._weather}
            title=${this.t("weather_hint")}
            @click=${()=>{this._weather=!this._weather,K.set("weather",this._weather?"1":"0")}}
          >
            ${this.t("weather_short")}
          </button>
                  </div>`:y}
          </div>
          <button class="fp3d-chip fp3d-tt-chip" aria-pressed=${i} title=${this.t("tt_hint")} @click=${()=>this.toggleTimeTravel()}>
            ⏪ ${this.t("tt_chip")}
          </button>
          ${this._roomId||this._floorId&&t.floors.length>1?g`<button class="fp3d-chip" @click=${()=>this.back()}>${this.t("back")}</button>`:y}
        </div>`}
        ${this._furnish?g`<div class="fp3d-furnish-bar">
              ${this._selFurniture?g`<span>${this.furnitureName(this._selFurniture)}</span>
                    ${this.renderSizeFields(this._selFurniture)}
                    <button class="fp3d-chip" @click=${()=>this.turnFurniture(-45)}>↺ 45°</button>
                    <button class="fp3d-chip" @click=${()=>this.turnFurniture(45)}>↻ 45°</button>
                    <button class="fp3d-chip" title=${this.t("furn_mirror_hint")} @click=${()=>this.editFurniture(this._selFurniture,c=>c.mirror=!c.mirror)}>⇋ ${this.t("furn_mirror")}</button>
                    <button class="fp3d-chip fp3d-danger-chip" @click=${()=>this.deleteFurniture()}>${this.t("delete")}</button>`:this._selDevice?g`<span>${B(this.hass,this._selDevice)}</span>
                      ${this.renderDeviceFields(this._selDevice)}
                      <button class="fp3d-chip" @click=${()=>this.turnDevice(-this.turnStep())}>↺ ${this.turnStep()}°</button>
                      <button class="fp3d-chip" @click=${()=>this.turnDevice(this.turnStep())}>↻ ${this.turnStep()}°</button>
                      <button class="fp3d-chip fp3d-danger-chip" @click=${()=>this.deleteDevice()}>${this.t("delete")}</button>`:g`<span>${this.t("furnish_hint")}</span>`}
              <button class="fp3d-chip fp3d-chip-on" @click=${()=>(this._furnish=!1,this._selFurniture=null,this._selDevice=null)}>${this.t("done")}</button>
            </div>`:y}
      </div>
    `}static styles=[Tt,zt,ct`
      :host {
        display: block;
        /* HA gives the custom panel's parent no explicit height, so 100% collapses. The parent may pad itself by the
           screen's safe areas (notches; some themes set them on every screen): those are taken off, or the panel is
           taller than the window and its bottom is cut off (#529). */
        height: calc(100vh - var(--safe-area-inset-top, 0px) - var(--safe-area-inset-bottom, 0px));
        background: var(--fp3d-bg);
      }
      /* dvh only where the browser knows it: a line with var() is not dropped while it is read, so a WebView without
         dvh (Chrome before 108, the Fire 7) lost the height altogether and the 3D view stayed empty (idea: CasaNeon) */
      @supports (height: 100dvh) {
        :host {
          height: calc(100dvh - var(--safe-area-inset-top, 0px) - var(--safe-area-inset-bottom, 0px));
        }
      }
      .fp3d-app {
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: 0;
      }
      .fp3d-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 6px 14px 6px 4px;
        min-height: 52px;
        border-bottom: 1px solid var(--fp3d-line);
        background: var(--fp3d-chrome-solid);
        flex-wrap: wrap;
        /* the header's menus (the floor plan picker) open over the editor's tool bar and the 3D view below */
        position: relative;
        z-index: 30;
      }
      ha-menu-button {
        color: var(--fp3d-text);
      }
      h1 {
        font-family: var(--fp3d-title-font);
        font-weight: 700;
        font-size: 19px;
        letter-spacing: -0.01em;
        margin: 0 4px 0 8px;
        white-space: nowrap;
      }
      .fp3d-notices {
        display: grid;
        gap: 6px;
        padding: 8px 14px 0;
      }
      .fp3d-notice {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px 12px;
        padding: 9px 12px;
        border-radius: 10px;
        border: 1px solid var(--fp3d-line);
        background: var(--fp3d-chrome-solid);
        font-size: 13.5px;
      }
      .fp3d-notice span {
        flex: 1;
        min-width: 200px;
      }
      .fp3d-notice-warn {
        border-color: rgba(255, 181, 71, 0.6);
        color: var(--fp3d-warm);
      }
      .fp3d-notice-error {
        border-color: rgba(255, 107, 139, 0.6);
        color: var(--fp3d-danger);
        word-break: break-word;
      }
      .fp3d-chip-on {
        background: var(--fp3d-accent);
        color: var(--fp3d-accent-text);
      }
      .fp3d-furnish-bar {
        position: absolute;
        left: 50%;
        bottom: 16px;
        transform: translateX(-50%);
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 8px;
        max-width: calc(100% - 24px);
        padding: 8px 10px 8px 16px;
        border-radius: 999px;
        background: var(--fp3d-chrome);
        box-shadow: var(--fp3d-shadow);
        font-size: 13.5px;
      }
      .fp3d-size-select {
        font: inherit;
        color: var(--fp3d-text);
        background: var(--fp3d-chrome-solid);
        border: 1px solid var(--fp3d-line);
        border-radius: 999px;
        padding: 4px 10px;
      }
      .fp3d-size {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        color: var(--fp3d-muted);
      }
      .fp3d-size input {
        width: 58px;
        padding: 5px 6px;
        border: 1px solid rgba(127, 127, 127, 0.35);
        border-radius: 8px;
        background: transparent;
        color: inherit;
        font: inherit;
        font-size: 13px;
      }
      .fp3d-danger-chip {
        color: var(--fp3d-danger);
      }
      .fp3d-grow {
        flex: 1;
      }
      .fp3d-save {
        font-size: 12.5px;
        color: var(--fp3d-muted);
      }
      /* the view options (quality, look, symbols, side) fold behind ⚙ on every screen: a tidy header */
      .fp3d-opts-btn {
        display: grid;
        place-items: center;
        order: 3;
        width: 36px;
        height: 36px;
        border: 1px solid var(--fp3d-line);
        border-radius: 10px;
        background: transparent;
        color: var(--fp3d-text);
        font-size: 17px;
        cursor: pointer;
      }
      .fp3d-opts-btn[aria-expanded="true"] {
        color: var(--fp3d-accent);
        border-color: var(--fp3d-accent);
      }
      .fp3d-view-opts {
        display: none;
      }
      .fp3d-view-opts.fp3d-opts-open {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        order: 5;
        width: 100%;
      }
      /* phones: version and grow move with it */
      @media (max-width: 700px) {
        .fp3d-version {
          order: 4;
        }
        .fp3d-header .fp3d-grow {
          display: none;
        }
      }
      /* the installed version, at the far right of the header */
      .fp3d-version {
        margin-left: auto;
        font-size: 11.5px;
        color: var(--fp3d-muted);
        white-space: nowrap;
        opacity: 0.8;
      }
      .fp3d-save-error {
        color: var(--fp3d-danger);
      }
      .fp3d-body {
        flex: 1;
        min-height: 0;
      }
      /* the colour well beside the look: a small round swatch, the reset arrow next to it */
      .fp3d-style-pick {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 0 6px;
      }
      .fp3d-zoom-late {
        font-size: 12px;
        color: var(--fp3d-muted, var(--fp3d-text));
      }
      .fp3d-zoom-late input {
        width: 110px;
      }
      .fp3d-style-pick select {
        background: var(--fp3d-chrome-solid);
        color: var(--fp3d-text);
        border: 1px solid var(--fp3d-line);
        border-radius: 10px;
        padding: 6px 8px;
        font: inherit;
        max-width: 230px;
      }
      .fp3d-accent-pick {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        padding: 0 4px;
      }
      .fp3d-accent-pick input[type="color"] {
        width: 22px;
        height: 22px;
        padding: 0;
        border: 1px solid var(--fp3d-line);
        border-radius: 50%;
        background: none;
        cursor: pointer;
      }
      .fp3d-accent-pick input[type="color"]::-webkit-color-swatch-wrapper {
        padding: 2px;
      }
      .fp3d-accent-pick input[type="color"]::-webkit-color-swatch {
        border: none;
        border-radius: 50%;
      }
      .fp3d-accent-reset {
        border: none;
        background: none;
        color: var(--fp3d-muted);
        cursor: pointer;
        font-size: 14px;
        padding: 0 2px;
      }
      .fp3d-nav {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 10px 14px;
        overflow-x: auto;
        scrollbar-width: none;
        flex: none;
      }
      /* a desktop shows a thin scrollbar while the pointer rests on the bar. Its room is kept all the time (an
         invisible thumb), so the bar does not grow on hover and the 3D view below does not jump; the bottom padding
         gives that room back (idea from TRusselo, #1053). Touch screens keep their overlay scrollbars. */
      @media (hover: hover) and (pointer: fine) {
        .fp3d-nav:not(.fp3d-nav-wrap) {
          scrollbar-width: thin;
          scrollbar-color: transparent transparent;
          padding-bottom: 3px;
        }
        .fp3d-nav:not(.fp3d-nav-wrap):hover {
          scrollbar-color: color-mix(in srgb, var(--fp3d-text) 35%, transparent) transparent;
        }
      }
      /* wrapped (several lines, scrolling up and down): the thin scrollbar on hover as before */
      .fp3d-nav-wrap:hover {
        scrollbar-width: thin;
      }
      /* wrapped: several lines, at most about three before the bar itself scrolls */
      .fp3d-nav-wrap {
        flex-wrap: wrap;
        overflow-x: visible;
        overflow-y: auto;
        max-height: 132px;
      }
      .fp3d-nav-floor {
        flex: none;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--fp3d-muted);
        margin-left: 6px;
      }
      .fp3d-nav-toggle {
        flex: none;
        margin-left: auto;
        position: sticky;
        right: 0;
        min-width: 34px;
        padding-left: 8px;
        padding-right: 8px;
      }
      .fp3d-nav .fp3d-chip {
        box-shadow: none;
        border: 1px solid var(--fp3d-line);
      }
      .fp3d-sep {
        flex: none;
        width: 1px;
        margin: 4px 4px;
        background: var(--fp3d-line);
      }
      .fp3d-stage-wrap {
        position: relative;
        flex: 1;
        min-height: 0;
        display: flex;
        container-type: size;
        container-name: fp3d;
      }
      .fp3d-stage-wrap fp3d-view3d {
        flex: 1;
      }
      .fp3d-room-panel {
        position: absolute;
        top: 58px;
        right: 14px;
        bottom: 14px;
        width: min(360px, calc(100% - 28px));
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        pointer-events: none;
      }
      /* the switches sit at the bottom (as in the card), where they never meet the energy values or warnings */
      fp3d-view3d {
        --fp3d-bottom-inset: 52px;
      }
      .fp3d-clean fp3d-view3d {
        --fp3d-bottom-inset: 0px;
      }
      .fp3d-furnish-bar {
        bottom: 68px;
      }
      /* time travel: its bar at the bottom; the switches, the buttons of the view and the room panel above it */
      .fp3d-tt > * {
        --fp3d-tt-h: 64px;
      }
      .fp3d-tt fp3d-view3d {
        --fp3d-bottom-inset: calc(52px + var(--fp3d-tt-h));
      }
      .fp3d-tt .fp3d-overlay {
        bottom: calc(var(--fp3d-tt-h) + 4px);
      }
      .fp3d-tt .fp3d-room-panel {
        bottom: calc(var(--fp3d-tt-h) + 6px);
      }
      .fp3d-tt-chip[aria-pressed="true"] {
        background: #ffb020;
        color: #1a1200;
      }
      /* the room bar: above the switches, beside the view's own buttons (search, eye, microphone) – nothing moves for it;
         beside an open room panel */
      .fp3d-room-bar {
        position: absolute;
        left: 148px;
        right: 12px;
        bottom: 56px;
      }
      .fp3d-side-right .fp3d-room-bar {
        left: 12px;
        right: 148px;
      }
      /* the eye tidied the switches away: the room bar sits at the bottom */
      .fp3d-clean .fp3d-room-bar {
        bottom: 12px;
      }
      .fp3d-room-open .fp3d-room-bar {
        right: calc(14px + min(360px, calc(100% - 28px)) + 10px);
      }
      /* phones and portrait tablets: panel as a sheet at the bottom, the switches step aside */
      @container fp3d ((max-width: 700px) or ((orientation: portrait) and (max-width: 1000px))) {
        .fp3d-room-open .fp3d-room-bar {
          display: none;
        }
        .fp3d-room-panel {
          top: auto;
          left: 8px;
          right: 8px;
          bottom: 8px;
          width: auto;
          height: 55%;
          justify-content: flex-end;
        }
        .fp3d-room-open .fp3d-overlay {
          display: none;
        }
        /* the view's own buttons (search, eye) step up above the sheet */
        .fp3d-room-open fp3d-view3d {
          --fp3d-bottom-inset: calc(55% + 8px);
        }
        /* phones: the time bar takes two rows; the switches make way for it */
        .fp3d-tt > * {
          --fp3d-tt-h: 100px;
        }
        .fp3d-tt .fp3d-overlay {
          display: none;
        }
        .fp3d-tt fp3d-view3d {
          --fp3d-bottom-inset: var(--fp3d-tt-h);
        }
      }
      /* the phone view: a bar at the bottom (Now, the rooms by floor, the blinds, More); the list is a page of its
         own above the bar, the house check a small card – the house and the list never share the screen */
      /* the view's own things step up above the bar; an open room's panel stands on it */
      .fp3d-phone fp3d-view3d {
        --fp3d-bottom-inset: calc(72px + env(safe-area-inset-bottom, 0px));
      }
      .fp3d-phone .fp3d-overlay {
        bottom: calc(76px + env(safe-area-inset-bottom, 0px));
      }
      .fp3d-phone .fp3d-room-panel {
        bottom: calc(70px + env(safe-area-inset-bottom, 0px));
        height: auto;
        max-height: calc(62% - 62px);
      }
      .fp3d-now-check fp3d-view3d {
        --fp3d-bottom-inset: 190px;
      }
      .fp3d-now-ask {
        position: absolute;
        left: 8px;
        right: 8px;
        top: 8px;
        z-index: 6;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        padding: 10px 12px;
        border-radius: 14px;
        background: var(--fp3d-panel-bg, rgba(13, 20, 34, 0.94));
        border: 1px solid var(--fp3d-line, rgba(120, 160, 255, 0.22));
        color: var(--fp3d-text, #e8f0ff);
      }
      .fp3d-now-ask span {
        flex: 1 1 180px;
      }
      /* search and eye on the right (#285): the bar leaves room there instead */
      .fp3d-side-right .fp3d-overlay {
        left: 12px;
        right: 100px;
      }
      /* an open room panel keeps the switches beside it, not over its last rows */
      .fp3d-room-open .fp3d-overlay {
        right: calc(min(360px, 100% - 28px) + 26px);
      }
      .fp3d-overlay {
        position: absolute;
        right: 12px;
        bottom: 12px;
        /* room for the search button and the eye beside it */
        left: 100px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
        align-items: center;
        pointer-events: none;
      }
      .fp3d-overlay > * {
        pointer-events: auto;
      }
      /* the view's switches in one "Show" menu that opens upwards */
      .fp3d-show-wrap {
        position: relative;
        display: inline-flex;
      }
      .fp3d-show-veil {
        position: fixed;
        inset: 0;
        z-index: 29;
      }
      .fp3d-show-panel {
        position: absolute;
        bottom: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
        z-index: 30;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        width: min(470px, 92vw);
        padding: 10px;
        border-radius: 16px;
        background: var(--fp3d-chrome-solid, #0d1628);
        border: 1px solid var(--fp3d-line, rgba(120, 190, 255, 0.22));
        box-shadow: var(--fp3d-shadow);
      }
      .fp3d-show-panel > .fp3d-seg {
        flex-wrap: wrap;
      }
      .fp3d-show-panel > .fp3d-chip {
        box-shadow: none;
      }
      .fp3d-caret {
        font-size: 0.8em;
        opacity: 0.7;
      }
      .fp3d-seg-label {
        display: inline-flex;
        align-items: center;
        padding: 0 4px 0 8px;
        opacity: 0.75;
      }
      .fp3d-quality button {
        padding: 5px 11px;
        min-height: 30px;
        font-size: 13px;
      }
      .fp3d-message,
      .fp3d-empty {
        padding: 32px 20px;
        color: var(--fp3d-muted);
        text-align: center;
      }
      .fp3d-phone-only {
        display: none;
      }
      @media (max-width: 600px) {
        .fp3d-phone-only {
          display: block;
        }
      }
      .fp3d-empty {
        display: grid;
        justify-items: center;
        gap: 12px;
        margin: auto;
      }
    `]};customElements.get("homeplan3d-panel")||customElements.define("homeplan3d-panel",ha);function fa(o){let t=o?.orientation?.type;return typeof t=="string"&&t?t.startsWith("portrait"):(o?.height??0)>(o?.width??0)}function Kp(o,t){return(t?o?.start_view_portrait:void 0)??o?.start_view??null}function Bi(o,t){let e=t?.trim(),n=o?.card_templates;return e?n?.find(i=>i.id===e)??n?.find(i=>i.aliases?.includes(e)):void 0}var lb=["fill","height","fullscreen_button","plan"];function ma(o,t){let e=Bi(t,o.template);if(!e)return o;let n=Object.fromEntries(lb.filter(i=>o[i]!==void 0).map(i=>[i,o[i]]));return{...e.config,...n,screen:e.config.screen||e.name,type:o.type,template:o.template}}function Ui(o,t,e=new Date){if(!o||o==="off")return!1;if(o==="sun")return t?.states["sun.sun"]?.state==="below_horizon";let n=/^(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})$/.exec(o.trim());if(!n)return!1;let i=Number(n[1])*60+Number(n[2]),r=Number(n[3])*60+Number(n[4]),s=e.getHours()*60+e.getMinutes();return i<=r?s>=i&&s<r:s>=i||s<r}var Gp;function Yp(){let o=new URL("./homeplan3d-card-editor.js?v=d3bc22a10f27",new URL(import.meta.url)).href;return Gp??=import(o),Gp}function Qp(){try{let o=localStorage.getItem("homeplan3d.card_walls");return o==="auto"||o==="cut"?o:null}catch{return null}}function cb(o){let t=o;for(let e=0;t&&e<40;e++){if(t.localName==="hui-grid-section")return!0;t=t.parentElement??t.getRootNode().host??null}return!1}var ga=class extends at{static properties={hass:{attribute:!1},_config:{state:!0},_upright:{state:!0},_roomId:{state:!0},_walking:{state:!0},_phoneMode:{state:!0},_solo:{state:!0},_floorId:{state:!0},_walls:{state:!0},_heat:{state:!0},_explode:{state:!0},_fullscreen:{state:!0},_pseudoFull:{state:!0},_vh:{state:!0},_top:{state:!0},_cameraWall:{state:!0},_clean:{state:!0},_night:{state:!0},_orbit:{state:!0},_stretch:{state:!0}};yaml=null;appliedTemplate="";roomApplied=!1;cleanTimer;cellObserver=null;idleTimer;nightTimer;data=new cn(this);watch=new xn(this);yamlPlan=null;tt=new Tn(this);constructor(){super(),this._roomId=null,this._walking=!1,this._phoneMode="bar";let t=localStorage.getItem("homeplan3d.phone_solo");this._solo=t===null?null:t==="1",this._floorId=void 0,this._walls=Qp(),this._heat=null,this._explode=null,this._fullscreen=!1,this._pseudoFull=!1,this._vh=window.innerHeight,this._upright=fa(globalThis.screen),this._top=null,this._cameraWall=!1,this._clean=!1,this._night=!1,this._orbit=!1,this._stretch=!1}touch=()=>{this._orbit&&(this._orbit=!1),this.armIdle(),this.armClean(!0)};armClean(t=!1){clearTimeout(this.cleanTimer);let e=this._config?.controls_hide_after??0;e>0&&(t&&this._clean&&(this._clean=!1),this.cleanTimer=setTimeout(()=>this._clean=!0,e*1e3))}armIdle(){clearTimeout(this.idleTimer);let t=this._config?.idle_return??0;t>0&&(this.idleTimer=setTimeout(()=>this.returnHome(),t*1e3))}view3d(){return this.shadowRoot?.querySelector("fp3d-view3d")}toggleTimeTravel(){if(this.tt.active){this.tt.stop();return}let t=this.view3d(),e=this.data.building;if(!t||!e||!this.hass)return;this._cameraWall=!1;let n=this._config;this.tt.start({live:this.hass,building:e,spec:t.historyEntities(),quality:n?.quality??"auto",speed:n?.time_travel_speed??null,range:n?.time_travel_range??null,t:(i,r)=>E(this.hass,i,r)})}onKey=t=>{t.key==="Escape"&&this.tt.stop(),this.touch()};returnHome(){if(this.tt.session?.playing){this.armIdle();return}this.tt.stop(),this._roomId=this.homeRoom(),this._floorId=void 0,this.view3d()?.resetView(),this._config?.idle_orbit&&(this._orbit=!0)}openDashboard(t){Zn(t)}onFullscreen=()=>{this._fullscreen=!!document.fullscreenElement&&this.shadowRoot?.contains(document.fullscreenElement)===!0,requestAnimationFrame(this.onViewport)};startView(t){return Kp(t,this._upright)}onViewport=()=>{let t=fa(globalThis.screen);t!==this._upright&&(this._upright=t);let e=Math.round(window.visualViewport?.height??window.innerHeight);if(Math.abs(e-this._vh)>1&&(this._vh=e),this._config?.fill&&!this._fullscreen){let n=Math.round(this.getBoundingClientRect().top+window.scrollY);(this._top===null||Math.abs(n-this._top)>1)&&(this._top=n)}};preview=!1;connectedCallback(){super.connectedCallback(),this.preview||Oe("card"),document.addEventListener("fullscreenchange",this.onFullscreen),window.addEventListener("resize",this.onViewport),window.visualViewport?.addEventListener("resize",this.onViewport),globalThis.screen?.orientation?.addEventListener?.("change",this.onViewport),requestAnimationFrame(this.onViewport),setTimeout(this.onViewport,600),this.cellObserver??=new ResizeObserver(()=>{let t=this._config?.height??420,e=!this._config?.fill&&this.clientHeight>t+4&&cb(this);e!==this._stretch&&(this._stretch=e)}),this.cellObserver.observe(this),this.armIdle(),this.nightTimer=setInterval(()=>this._night=Ui(this._config?.night,this.hass),6e4)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("fullscreenchange",this.onFullscreen),window.removeEventListener("resize",this.onViewport),window.visualViewport?.removeEventListener("resize",this.onViewport),globalThis.screen?.orientation?.removeEventListener?.("change",this.onViewport),this.cellObserver?.disconnect(),this.cellObserver=null,this.tt.stop(),clearTimeout(this.cleanTimer),clearTimeout(this.idleTimer),clearInterval(this.nightTimer)}toggleFullscreen(){if(this._pseudoFull){this._pseudoFull=!1,this._fullscreen=!1,requestAnimationFrame(this.onViewport);return}if(document.fullscreenElement){document.exitFullscreen();return}let t=this.shadowRoot?.querySelector("ha-card"),e=()=>{this._pseudoFull=!0,this._fullscreen=!0,requestAnimationFrame(this.onViewport)};t?.requestFullscreen?t.requestFullscreen().catch(e):e()}static async getConfigElement(){return await Yp(),document.createElement("homeplan3d-card-editor")}static getStubConfig(){return{type:"custom:homeplan3d-card"}}setWalls(t){this._walls=t;try{localStorage.setItem("homeplan3d.card_walls",t)}catch{}}setConfig(t){if(t.height!==void 0&&!(t.height>100))throw new Error("height must be a number of pixels above 100");this.yaml=t,t.plan!==this.yamlPlan&&(this.yamlPlan=t.plan,this.roomApplied=!1,this._floorId=void 0,this._roomId=null,this.data.switchPlan(t.plan==="site"?ft:t.plan??null)),this.appliedTemplate=this.templateKey(),this.applyConfig(ma(t,this.data.building))}templateKey(){let t=Bi(this.data.building,this.yaml?.template);return t?JSON.stringify([t.name,t.config]):""}applyConfig(t,e){let n=i=>!e||JSON.stringify(e[i])!==JSON.stringify(t[i]);this._config=t,n("floor")&&(this._floorId=void 0),(n("room")||n("rooms"))&&(this.roomApplied=!1),n("rooms")&&(this._floorId=void 0),n("walls")&&(this._walls=Qp()),n("heatmap")&&(this._heat=null),n("explode")&&(this._explode=null),this._orbit=!1,this._night=Ui(t.night,this.hass),n("controls_hidden")&&(this._clean=t.controls_hidden===!0),(n("controls_hide_after")||n("controls_hidden"))&&this.armClean(),(n("idle_return")||n("idle_orbit"))&&this.armIdle()}getCardSize(){return Math.ceil((this._config?.height??420)/50)}getGridOptions(){return{columns:"full",rows:this._config?.fill?12:Math.ceil((this._config?.height??420)/56),min_rows:4}}willUpdate(t){if(this.yaml?.template){let e=this.templateKey();e!==this.appliedTemplate&&(this.appliedTemplate=e,this.applyConfig(ma(this.yaml,this.data.building),this._config))}if(t.has("hass")&&this.hass){this.data.setHass(this.hass),this.tt.session?.setLive(this.hass);let e=Ui(this._config?.night,this.hass);e!==this._night&&(this._night=e)}}get shownRooms(){return Mi(this.data.building,this._config?.rooms)}get roomsLocked(){return this.shownRooms.length>0&&this._config?.rooms_lock!==!1}get roomFloors(){let t=new Set(this.shownRooms);return(this.data.building?.floors??[]).filter(e=>ot(e).some(n=>t.has(n.id))).map(e=>e.id)}homeRoom(){if(this._config?.room)return this._config.room;let t=this.shownRooms;return t.length===1&&this._config?.room_panel!==!1?t[0]:null}allowed(t){return!t||!this.roomsLocked||this.shownRooms.includes(t)}roomsOf=null;shownBuilding(t){let e=this.shownRooms;if(!e.length)return t;let n=e.join(",");return(this.roomsOf?.from!==t||this.roomsOf.key!==n)&&(this.roomsOf={from:t,key:n,to:Ii(t,e)}),this.roomsOf.to}get canSwitch(){return this.shownRooms.length?this.roomFloors.length>1:!this._config?.floor||this.thumbs}get thumbs(){return this.shownRooms.length?!1:this._config?.floor_thumbs??!this._config?.floor}currentFloor(){let t=this.data.building,e=this._floorId===void 0?this._config?.floor??null:this._floorId,n=this.roomFloors;return this.shownRooms.length?n.length===1?n[0]:e&&n.includes(e)?e:null:t&&t.floors.length===1?t.floors[0].id:t?.floors.some(i=>i.id===e)?e:null}back(){this._roomId?this._roomId=null:this.canSwitch&&(this._floorId=null)}get isSite(){return this._config?.plan==="site"}updated(){this.isSite&&this.data.plans.length>1&&this.watch.watch(this.hass,this.data);let t=this.shadowRoot?.querySelector("fp3d-view3d");if(t){let e=Math.min(...[...this.shadowRoot?.querySelectorAll(".fp3d-card-full")??[]].map(i=>i.offsetLeft),1/0),n=Number.isFinite(e)?Math.max(104,t.clientWidth-e+8):104;t.style.getPropertyValue("--fp3d-walk-right")!==`${n}px`&&t.style.setProperty("--fp3d-walk-right",`${n}px`)}}render(){let t=this.isSite?this.watch.site(this.data)??this.data.building:this.data.building,e=this._config?.height??420,n=this._config,i=t?this.homeRoom():null;!this.roomApplied&&t&&i&&(this.roomApplied=!0,t.floors.some(x=>ot(x).some(I=>I.id===i))&&(this._roomId=i));let r=this.shownRooms,s=r.length===1?t?.floors.flatMap(x=>ot(x)).find(x=>x.id===r[0])?.area_id??null:null,a=this.currentFloor(),l=!!this._roomId&&n?.room_panel===!1||!this.thumbs&&this.canSwitch&&!this._roomId&&!!a&&(t?.floors.length??0)>1,c=x=>n?.controls===!0||Array.isArray(n?.controls)&&n.controls.includes(x),d=["temperature","humidity","co2"].filter(x=>c(x)),u=this._walls??n?.walls??"auto",p=this._heat??n?.heatmap??"none",h=this._explode??n?.explode??!0,_=this._fullscreen?"100%":n?.fill?this._top!==null?`${Math.max(240,this._vh-this._top-2)}px`:"calc(100vh - var(--header-height, 56px) - 2px)":this._stretch?"100%":`${e}px`,b=!!t&&!this._clean&&n?.phone!==!0&&(l||(!!n?.controls||!!n?.time_travel)&&!(this._roomId&&n.room_panel!==!1)),m=this.tt.active,w=!!t&&!!n?.room_bar&&n.phone!==!0&&!m&&!(this._roomId&&n.room_panel!==!1),k=n?.controls_hidden!==void 0||(n?.controls_hide_after??0)>0,v=n?.phone===!0&&!!t&&!m&&!this._walking,f=x=>E(this.hass,x),M=/^#[0-9a-f]{6}$/i.test(n?.accent??"")?n.accent:null;return g`<ha-card class="${this._night?"fp3d-night":""} ${this._pseudoFull?"fp3d-pseudo-full":""}" style=${M?`--fp3d-accent:${M}`:""} @pointerdown=${this.touch} @keydown=${this.onKey} @wheel=${this.touch}>
      <div class="fp3d-card-body ${m?"fp3d-tt":""} ${v?"fp3d-phone":""}" style="height:${_}">
        ${t&&t.floors.some(x=>x.rooms.length)?g`<fp3d-view3d
              .hass=${this.tt.hass(this.hass)}
              .replay=${this.tt.session?.replay??null}
              .building=${t}
              .planId=${this.isSite?null:this.data.planId}
              .noSave=${this.isSite}
              .rooms=${n?.phone===!0&&(this._solo??n.phone_solo===!0)&&this._roomId?[this._roomId]:r.length?r:null}
              .packs=${this.data.packs}
              .floorId=${a}
              .roomId=${this._roomId}
              .wallMode=${u}
              .explode=${h}
              .keepRoof=${n?.roof_fade===!1}
              .plain=${n?.plain===!0}
              .surroundings=${n?.surroundings!==!1}
              .hideRoof=${n?.roof===!1||r.length>0}
              .quality=${this._config?.quality??"auto"}
              ?showStats=${this._config?.stats??!1}
              .markerMode=${this._config?.markers??"important"}
              .pinSize=${this._config?.marker_size??"normal"}
              .markerNames=${this._config?.marker_names===!0}
              .central=${this._config?.central!==!1}
              .walkable=${this._config?.walk!==!1}
              @walk-change=${x=>this._walking=x.detail.walking}
              .petsOn=${this._config?.pets!==!1}
              .ghostOn=${this._config?.ghost!==!1}
              .buttons=${this._config?.buttons?.map((x,I)=>({id:`card_${I}`,...x}))??null}
              .heatMode=${p}
              .theme=${this._config?.theme??"neon"}
              .zoomStyle=${this._config?.zoom_style??null}
              .zoomLate=${this._config?.zoom_late??null}
              .zoomScope=${this._config?.zoom_scope??null}
              .themeEvening=${this._config?.theme_evening??null}
              .themeNight=${this._config?.theme_night??null}
              .styleEntity=${this._config?.style_entity??null}
              .clock=${this._config?.clock??null}
              .accent=${this._config?.accent??null}
              .showEnergy=${this._config?.energy??!0}
              .flows=${this._config?.flows??null}
              .holograms=${this._config?.holograms??null}
              .floorThumbs=${this.thumbs}
              .roomLabels=${n?.room_names!==!1}
              .controlsRight=${n?.controls_side==="right"}
              .keepView=${n?.keep_view===!0}
              .angleLock=${n?.angle_lock===!0}
              .floorStack=${n?.floor_stack??"dim"}
              .panelOpen=${!!this._roomId&&n?.room_panel!==!1}
              .alerts=${n?.alerts!==!1}
              .householdCard=${n?.household_card!==!1}
              .alertJump=${!!n?.alert_jump}
              .director=${!!n?.director}
              .voice=${!!n?.voice}
              .screen=${n?.screen?.trim()||null}
              .template=${n?.template?.trim()||null}
              .viewKind=${this.preview?"preview":"card"}
              .voiceArea=${n?.voice_area?.trim()||s}
              @open-extensions=${()=>this.openDashboard("/homeplan3d?tab=extensions")}
              .scenes=${n?.scenes!==!1}
              ?trail=${!!n?.motion_trail}
              .cameraWall=${this._cameraWall&&!m}
              @camera-wall-close=${()=>this._cameraWall=!1}
              @camera-wall-open=${()=>this._cameraWall=!0}
              .clean=${this._clean||v}
              .cleanButton=${k&&!v}
              @status-change=${()=>v&&setTimeout(()=>this.shadowRoot?.querySelector("fp3d-phone-shell")?.requestUpdate(),0)}
              @clean-toggle=${()=>{this._clean=!this._clean,this._clean?clearTimeout(this.cleanTimer):this.armClean()}}
              .weather=${n?.weather!==!1}
              .weatherEntityId=${n?.weather_entity??null}
              .dimmed=${this._night}
              .autoOrbit=${this._orbit}
              .startView=${this.startView(n)}
              style=${m?`--fp3d-bottom-inset: ${b?"calc(52px + var(--fp3d-tt-h))":"var(--fp3d-tt-h)"}`:b?"--fp3d-bottom-inset: 52px":""}
              @room-tap=${x=>{if(this.allowed(x.detail.roomId)){if(this.canSwitch&&(t?.floors.length??0)>1&&x.detail.floorId&&this.currentFloor()!==x.detail.floorId){if(this.roomsLocked&&!this.roomFloors.includes(x.detail.floorId))return;this._floorId=x.detail.floorId,this._roomId=null;return}x.detail.roomId&&(this._roomId=x.detail.roomId===this._roomId?null:x.detail.roomId)}}}
              @floor-tap=${x=>{this.roomsLocked&&x.detail.floorId&&!this.roomFloors.includes(x.detail.floorId)||(this._floorId=x.detail.floorId,this._roomId=null)}}
              @back=${()=>this.back()}
            ></fp3d-view3d>`:g`<p class="fp3d-card-msg">${this.data.error??(t?E(this.hass,"no_building"):E(this.hass,"loading"))}</p>`}
        ${t&&n?.template&&!Bi(t,n.template)?g`<div class="fp3d-card-tpl-missing">${E(this.hass,"card_template_missing",{name:n.template})}</div>`:y}
        ${w?g`<fp3d-room-bar
              class="fp3d-card-room-bar"
              style="bottom:${b?54:8}px"
              .hass=${this.hass}
              .building=${this.shownBuilding(t)}
              .floorId=${a}
              .roomId=${this._roomId}
              ?favorites=${n?.room_bar_favorites===!0}
              @room-pick=${x=>{if(this.allowed(x.detail.roomId)){if(x.detail.floorId!==this.currentFloor()){if(!this.canSwitch)return;this._floorId=x.detail.floorId}this._roomId=x.detail.roomId===this._roomId?null:x.detail.roomId}}}
            ></fp3d-room-bar>`:y}
        ${this._roomId&&t&&this._config?.room_panel!==!1&&!this._walking&&!(v&&this._phoneMode==="check")?g`<fp3d-room-panel
              ?walk=${this._config?.walk!==!1}
              @walk-here=${()=>this.view3d()?.walkHere()}
              @camera-look=${x=>this.view3d()?.lookThrough(x.detail.entity)}
              class="fp3d-card-panel"
              ?collapsible=${v}
              .hass=${this.tt.hass(this.hass)}
              ?readOnly=${m}
              .room=${t.floors.flatMap(x=>ot(x)).find(x=>x.id===this._roomId)??null}
              .floor=${t.floors.find(x=>ot(x).some(I=>I.id===this._roomId))??null}
              .building=${t}
              .confirmEntities=${pn(this.hass,t.floors)}
              .sheets=${this._roomId?this.view3d()?.roomSheets(this._roomId)??null:null}
              @sheet-open=${x=>this._roomId&&this.view3d()?.openRoomSheet(this._roomId,x.detail.id)}
              @close=${()=>this._roomId=null}
            ></fp3d-room-panel>`:y}
        ${v&&t?g`<fp3d-phone-shell
              .hass=${this.hass}
              .building=${t}
              .view=${()=>this.view3d()}
              .floorId=${this._floorId??null}
              .roomId=${this._roomId}
              .solo=${this._solo??n?.phone_solo===!0}
              .hide=${n?.phone_hide??[]}
              .start=${n?.phone_start}
              .places=${n?.phone_places}
              @phone-link=${x=>Zn(x.detail)}
              .extras=${n?.dashboard?[{id:"dash",icon:"\u2302",label:n.dashboard_label||n.dashboard}]:[]}
              .watts=${x=>rt(this.hass,x)}
              @phone-mode=${x=>this._phoneMode=x.detail}
              @phone-room=${x=>{this.allowed(x.detail.roomId)&&(this._floorId=t.floors.length>1||x.detail.roomId?x.detail.floorId:null,this._roomId=x.detail.roomId)}}
              @phone-solo=${x=>{this._solo=x.detail;try{localStorage.setItem("homeplan3d.phone_solo",this._solo?"1":"0")}catch{}}}
              @phone-more=${x=>x.detail==="dash"&&n?.dashboard&&Zn(n.dashboard)}
            ></fp3d-phone-shell>`:y}
        ${b&&t?g`<div class="fp3d-card-controls">
              ${l?g`<button class="fp3d-chip" @click=${()=>this.back()}>${f("back")}</button>`:y}
              ${n?.time_travel?g`<button class="fp3d-chip fp3d-tt-chip" aria-pressed=${m} title=${f("tt_hint")} @click=${()=>this.toggleTimeTravel()}>
                    ⏪ ${f("tt_chip")}
                  </button>`:y}
              ${n?.camera_wall?g`<button class="fp3d-chip" aria-pressed=${this._cameraWall} title=${f("camera_wall_hint")} @click=${()=>this._cameraWall=!this._cameraWall}>${f("cameras_short")}</button>`:y}
              ${c("walls")?g`<div class="fp3d-seg">
                    <button aria-pressed=${u==="auto"} @click=${()=>this.setWalls("auto")}>${f("walls_auto")}</button>
                    <button aria-pressed=${u==="cut"} @click=${()=>this.setWalls("cut")}>${f("walls_cut")}</button>
                  </div>`:y}
              ${c("floors")&&t.floors.length>1&&!a?g`<div class="fp3d-seg">
                    <button aria-pressed=${h} @click=${()=>this._explode=!0}>${f("floors_apart")}</button>
                    <button aria-pressed=${!h} @click=${()=>this._explode=!1}>${f("floors_stacked")}</button>
                  </div>`:y}
              ${d.length?g`<div class="fp3d-seg" role="group" aria-label=${f("heatmap")}>
                    ${["none",...d].map(x=>g`<button aria-pressed=${p===x} @click=${()=>this._heat=x}>
                          ${f(x==="none"?"heat_off":`heat_short_${x}`)}
                        </button>`)}
                  </div>`:y}
            </div>`:y}
        ${this.tt.session?g`<fp3d-time-bar .session=${this.tt.session}></fp3d-time-bar>`:y}
        ${""}
        ${n?.fullscreen_button&&(!this._clean||this._fullscreen)&&(!v||this._fullscreen)&&!(this._roomId&&n.room_panel!==!1)?g`<button class="fp3d-card-full" title=${f(this._fullscreen?"fullscreen_exit":"fullscreen")} aria-label=${f(this._fullscreen?"fullscreen_exit":"fullscreen")} @click=${()=>this.toggleFullscreen()}>
              ${this._fullscreen?"\u2715":"\u26F6"}
            </button>`:y}
        ${n?.dashboard&&!this._clean&&!v&&!(this._roomId&&n.room_panel!==!1)?g`<button class="fp3d-card-full fp3d-card-dash ${n.fullscreen_button?"fp3d-card-dash-2":""}" title=${n.dashboard_label||n.dashboard} aria-label=${n.dashboard_label||n.dashboard} @click=${()=>this.openDashboard(n.dashboard)}>
              ${n.dashboard_label?g`<span>${n.dashboard_label}</span>`:"\u2302"}
            </button>`:y}
      </div>
    </ha-card>`}static styles=[Tt,zt,ct`
      .fp3d-card-controls {
        position: absolute;
        left: 60px;
        right: 10px;
        bottom: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
        pointer-events: none;
      }
      .fp3d-card-controls > * {
        pointer-events: auto;
      }
      /* time travel: its bar at the bottom, the switches and the room panel above it */
      .fp3d-tt > * {
        --fp3d-tt-h: 64px;
      }
      .fp3d-tt .fp3d-card-controls {
        bottom: calc(var(--fp3d-tt-h) + 2px);
      }
      .fp3d-tt .fp3d-card-panel {
        bottom: calc(var(--fp3d-tt-h) + 4px);
      }
      .fp3d-tt-chip[aria-pressed="true"] {
        background: #ffb020;
        color: #1a1200;
      }
      /* the view's walk button steps aside for the card's own buttons at the top right */
      fp3d-view3d {
        --fp3d-walk-right: 104px;
      }
      .fp3d-card-full {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 38px;
        height: 38px;
        border: 0;
        border-radius: 12px;
        background: var(--fp3d-chrome);
        color: var(--fp3d-text);
        box-shadow: var(--fp3d-shadow);
        font-size: 18px;
        cursor: pointer;
      }
      /* the dashboard button: after the rule above, so its own width wins and, beside the full screen button, it
         steps to the left instead of covering it (D1002) */
      .fp3d-card-full.fp3d-card-dash {
        width: auto;
        min-width: 38px;
        padding: 0 12px;
        font-size: 14px;
        font-weight: 600;
      }
      .fp3d-card-full.fp3d-card-dash-2 {
        right: 56px;
      }
      /* full screen made by the card itself (iPad, the app on iOS): over the whole page */
      ha-card.fp3d-pseudo-full {
        position: fixed;
        inset: 0;
        z-index: 9999;
        height: 100vh !important;
        max-height: none !important;
        border-radius: 0;
      }
      @supports (height: 100dvh) {
        ha-card.fp3d-pseudo-full {
          height: 100dvh !important;
        }
      }
      /* a block, so the dashboard's grid cell gives it its height (and the card can measure it, #926) */
      :host {
        display: block;
      }
      ha-card {
        overflow: hidden;
        background: var(--fp3d-bg);
        height: 100%;
      }
      ha-card:fullscreen {
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: 100vh;
        border-radius: 0;
        border: 0;
      }
      ha-card:fullscreen .fp3d-card-body {
        flex: 1 1 auto;
        min-height: 0;
      }
      /* night (kiosk): the whole card dimmed */
      ha-card.fp3d-night .fp3d-card-body {
        filter: brightness(0.55);
      }
      .fp3d-card-body {
        position: relative;
        display: flex;
        height: 100%;
        container-type: size;
        container-name: fp3d;
      }
      fp3d-view3d {
        flex: 1;
      }
      .fp3d-card-tpl-missing {
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        max-width: calc(100% - 40px);
        padding: 6px 12px;
        border-radius: 10px;
        background: var(--fp3d-chrome-solid, rgba(10, 16, 30, 0.92));
        border: 1px solid rgba(255, 170, 60, 0.6);
        color: var(--fp3d-text, #fff);
        font-size: 13px;
        z-index: 5;
      }
      .fp3d-card-msg {
        margin: auto;
        color: var(--fp3d-muted);
        padding: 16px;
        text-align: center;
      }
      /* beside the view's own buttons (search, eye) at the bottom left: nothing moves for the room bar */
      .fp3d-card-room-bar {
        position: absolute;
        left: 148px;
        right: 10px;
      }
      .fp3d-card-panel {
        position: absolute;
        top: 10px;
        right: 10px;
        bottom: 10px;
        width: min(340px, calc(100% - 20px));
        display: flex;
        flex-direction: column;
        pointer-events: none;
      }
      /* phones and portrait tablets: the room panel becomes a sheet at the bottom */
      @container fp3d ((max-width: 700px) or ((orientation: portrait) and (max-width: 1000px))) {
        .fp3d-card-panel {
          top: auto;
          left: 8px;
          right: 8px;
          bottom: 8px;
          width: auto;
          height: 55%;
          justify-content: flex-end;
        }
        /* the time bar takes two rows here */
        .fp3d-tt > * {
          --fp3d-tt-h: 100px;
        }
      }
      /* the phone view: the view's own things and an open room's panel stand above its bar */
      .fp3d-phone fp3d-view3d {
        --fp3d-bottom-inset: calc(72px + env(safe-area-inset-bottom, 0px));
      }
      /* above the bar, which is taller on a phone with a home indicator */
      .fp3d-phone .fp3d-card-panel {
        bottom: calc(70px + env(safe-area-inset-bottom, 0px));
        height: auto;
        max-height: calc(62% - 62px);
      }
    `]};if(!customElements.get("homeplan3d-card")){customElements.define("homeplan3d-card",ga);let o=window;o.customCards=o.customCards??[],o.customCards.push({type:"homeplan3d-card",name:E(void 0,"card_name"),description:E(void 0,"card_description"),preview:!1})}Ta();Di();

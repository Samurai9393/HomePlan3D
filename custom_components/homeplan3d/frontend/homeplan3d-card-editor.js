var R=globalThis,L=R.ShadowRoot&&(R.ShadyCSS===void 0||R.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,B=Symbol(),re=new WeakMap,C=class{constructor(e,o,t){if(this._$cssResult$=!0,t!==B)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=o}get styleSheet(){let e=this.o,o=this.t;if(L&&e===void 0){let t=o!==void 0&&o.length===1;t&&(e=re.get(o)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&re.set(o,e))}return e}toString(){return this.cssText}},se=r=>new C(typeof r=="string"?r:r+"",void 0,B),I=(r,...e)=>{let o=r.length===1?r[0]:e.reduce((t,n,a)=>t+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+r[a+1],r[0]);return new C(o,r,B)},ie=(r,e)=>{if(L)r.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(let o of e){let t=document.createElement("style"),n=R.litNonce;n!==void 0&&t.setAttribute("nonce",n),t.textContent=o.cssText,r.appendChild(t)}},U=L?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let o="";for(let t of e.cssRules)o+=t.cssText;return se(o)})(r):r;var{is:We,defineProperty:De,getOwnPropertyDescriptor:Oe,getOwnPropertyNames:Re,getOwnPropertySymbols:Le,getPrototypeOf:Me}=Object,M=globalThis,le=M.trustedTypes,Ne=le?le.emptyScript:"",ze=M.reactiveElementPolyfillSupport,P=(r,e)=>r,K={toAttribute(r,e){switch(e){case Boolean:r=r?Ne:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let o=r;switch(e){case Boolean:o=r!==null;break;case Number:o=r===null?null:Number(r);break;case Object:case Array:try{o=JSON.parse(r)}catch{o=null}}return o}},ce=(r,e)=>!We(r,e),he={attribute:!0,type:String,converter:K,reflect:!1,useDefault:!1,hasChanged:ce};Symbol.metadata??=Symbol("metadata"),M.litPropertyMetadata??=new WeakMap;var g=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,o=he){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(e,o),!o.noAccessor){let t=Symbol(),n=this.getPropertyDescriptor(e,t,o);n!==void 0&&De(this.prototype,e,n)}}static getPropertyDescriptor(e,o,t){let{get:n,set:a}=Oe(this.prototype,e)??{get(){return this[o]},set(s){this[o]=s}};return{get:n,set(s){let i=n?.call(this);a?.call(this,s),this.requestUpdate(e,i,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??he}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;let e=Me(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){let o=this.properties,t=[...Re(o),...Le(o)];for(let n of t)this.createProperty(n,o[n])}let e=this[Symbol.metadata];if(e!==null){let o=litPropertyMetadata.get(e);if(o!==void 0)for(let[t,n]of o)this.elementProperties.set(t,n)}this._$Eh=new Map;for(let[o,t]of this.elementProperties){let n=this._$Eu(o,t);n!==void 0&&this._$Eh.set(n,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let o=[];if(Array.isArray(e)){let t=new Set(e.flat(1/0).reverse());for(let n of t)o.unshift(U(n))}else e!==void 0&&o.push(U(e));return o}static _$Eu(e,o){let t=o.attribute;return t===!1?void 0:typeof t=="string"?t:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,o=this.constructor.elementProperties;for(let t of o.keys())this.hasOwnProperty(t)&&(e.set(t,this[t]),delete this[t]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ie(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,o,t){this._$AK(e,t)}_$ET(e,o){let t=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,t);if(n!==void 0&&t.reflect===!0){let a=(t.converter?.toAttribute!==void 0?t.converter:K).toAttribute(o,t.type);this._$Em=e,a==null?this.removeAttribute(n):this.setAttribute(n,a),this._$Em=null}}_$AK(e,o){let t=this.constructor,n=t._$Eh.get(e);if(n!==void 0&&this._$Em!==n){let a=t.getPropertyOptions(n),s=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:K;this._$Em=n;let i=s.fromAttribute(o,a.type);this[n]=i??this._$Ej?.get(n)??i,this._$Em=null}}requestUpdate(e,o,t,n=!1,a){if(e!==void 0){let s=this.constructor;if(n===!1&&(a=this[e]),t??=s.getPropertyOptions(e),!((t.hasChanged??ce)(a,o)||t.useDefault&&t.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,t))))return;this.C(e,o,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,o,{useDefault:t,reflect:n,wrapped:a},s){t&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??o??this[e]),a!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||t||(o=void 0),this._$AL.set(e,o)),n===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,a]of this._$Ep)this[n]=a;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[n,a]of t){let{wrapped:s}=a,i=this[n];s!==!0||this._$AL.has(n)||i===void 0||this.C(n,void 0,a,i)}}let e=!1,o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(o)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(o)}willUpdate(e){}_$AE(e){this._$EO?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(o=>this._$ET(o,this[o])),this._$EM()}updated(e){}firstUpdated(e){}};g.elementStyles=[],g.shadowRootOptions={mode:"open"},g[P("elementProperties")]=new Map,g[P("finalized")]=new Map,ze?.({ReactiveElement:g}),(M.reactiveElementVersions??=[]).push("2.1.2");var Z=globalThis,de=r=>r,N=Z.trustedTypes,_e=N?N.createPolicy("lit-html",{createHTML:r=>r}):void 0,we="$lit$",f=`lit$${Math.random().toFixed(9).slice(2)}$`,be="?"+f,Fe=`<${be}>`,k=document,E=()=>k.createComment(""),H=r=>r===null||typeof r!="object"&&typeof r!="function",X=Array.isArray,Be=r=>X(r)||typeof r?.[Symbol.iterator]=="function",j=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pe=/-->/g,ue=/>/g,y=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),me=/'/g,ge=/"/g,ye=/^(?:script|style|textarea|title)$/i,Q=r=>(e,...o)=>({_$litType$:r,strings:e,values:o}),l=Q(1),ve=Q(2),Xe=Q(3),$=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),fe=new WeakMap,v=k.createTreeWalker(k,129);function ke(r,e){if(!X(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return _e!==void 0?_e.createHTML(e):e}var Ie=(r,e)=>{let o=r.length-1,t=[],n,a=e===2?"<svg>":e===3?"<math>":"",s=T;for(let i=0;i<o;i++){let c=r[i],_,u,h=-1,p=0;for(;p<c.length&&(s.lastIndex=p,u=s.exec(c),u!==null);)p=s.lastIndex,s===T?u[1]==="!--"?s=pe:u[1]!==void 0?s=ue:u[2]!==void 0?(ye.test(u[2])&&(n=RegExp("</"+u[2],"g")),s=y):u[3]!==void 0&&(s=y):s===y?u[0]===">"?(s=n??T,h=-1):u[1]===void 0?h=-2:(h=s.lastIndex-u[2].length,_=u[1],s=u[3]===void 0?y:u[3]==='"'?ge:me):s===ge||s===me?s=y:s===pe||s===ue?s=T:(s=y,n=void 0);let m=s===y&&r[i+1].startsWith("/>")?" ":"";a+=s===T?c+Fe:h>=0?(t.push(_),c.slice(0,h)+we+c.slice(h)+f+m):c+f+(h===-2?i:m)}return[ke(r,a+(r[o]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),t]},W=class r{constructor({strings:e,_$litType$:o},t){let n;this.parts=[];let a=0,s=0,i=e.length-1,c=this.parts,[_,u]=Ie(e,o);if(this.el=r.createElement(_,t),v.currentNode=this.el.content,o===2||o===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(n=v.nextNode())!==null&&c.length<i;){if(n.nodeType===1){if(n.hasAttributes())for(let h of n.getAttributeNames())if(h.endsWith(we)){let p=u[s++],m=n.getAttribute(h).split(f),S=/([.?@])?(.*)/.exec(p);c.push({type:1,index:a,name:S[2],strings:m,ctor:S[1]==="."?G:S[1]==="?"?q:S[1]==="@"?Y:A}),n.removeAttribute(h)}else h.startsWith(f)&&(c.push({type:6,index:a}),n.removeAttribute(h));if(ye.test(n.tagName)){let h=n.textContent.split(f),p=h.length-1;if(p>0){n.textContent=N?N.emptyScript:"";for(let m=0;m<p;m++)n.append(h[m],E()),v.nextNode(),c.push({type:2,index:++a});n.append(h[p],E())}}}else if(n.nodeType===8)if(n.data===be)c.push({type:2,index:a});else{let h=-1;for(;(h=n.data.indexOf(f,h+1))!==-1;)c.push({type:7,index:a}),h+=f.length-1}a++}}static createElement(e,o){let t=k.createElement("template");return t.innerHTML=e,t}};function x(r,e,o=r,t){if(e===$)return e;let n=t!==void 0?o._$Co?.[t]:o._$Cl,a=H(e)?void 0:e._$litDirective$;return n?.constructor!==a&&(n?._$AO?.(!1),a===void 0?n=void 0:(n=new a(r),n._$AT(r,o,t)),t!==void 0?(o._$Co??=[])[t]=n:o._$Cl=n),n!==void 0&&(e=x(r,n._$AS(r,e.values),n,t)),e}var V=class{constructor(e,o){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:o},parts:t}=this._$AD,n=(e?.creationScope??k).importNode(o,!0);v.currentNode=n;let a=v.nextNode(),s=0,i=0,c=t[0];for(;c!==void 0;){if(s===c.index){let _;c.type===2?_=new D(a,a.nextSibling,this,e):c.type===1?_=new c.ctor(a,c.name,c.strings,this,e):c.type===6&&(_=new J(a,this,e)),this._$AV.push(_),c=t[++i]}s!==c?.index&&(a=v.nextNode(),s++)}return v.currentNode=k,n}p(e){let o=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(e,t,o),o+=t.strings.length-2):t._$AI(e[o])),o++}},D=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,o,t,n){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=o,this._$AM=t,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,o=this._$AM;return o!==void 0&&e?.nodeType===11&&(e=o.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,o=this){e=x(this,e,o),H(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==$&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Be(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&H(this._$AH)?this._$AA.nextSibling.data=e:this.T(k.createTextNode(e)),this._$AH=e}$(e){let{values:o,_$litType$:t}=e,n=typeof t=="number"?this._$AC(e):(t.el===void 0&&(t.el=W.createElement(ke(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===n)this._$AH.p(o);else{let a=new V(n,this),s=a.u(this.options);a.p(o),this.T(s),this._$AH=a}}_$AC(e){let o=fe.get(e.strings);return o===void 0&&fe.set(e.strings,o=new W(e)),o}k(e){X(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,t,n=0;for(let a of e)n===o.length?o.push(t=new r(this.O(E()),this.O(E()),this,this.options)):t=o[n],t._$AI(a),n++;n<o.length&&(this._$AR(t&&t._$AB.nextSibling,n),o.length=n)}_$AR(e=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);e!==this._$AB;){let t=de(e).nextSibling;de(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},A=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,o,t,n,a){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=o,this._$AM=n,this.options=a,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=d}_$AI(e,o=this,t,n){let a=this.strings,s=!1;if(a===void 0)e=x(this,e,o,0),s=!H(e)||e!==this._$AH&&e!==$,s&&(this._$AH=e);else{let i=e,c,_;for(e=a[0],c=0;c<a.length-1;c++)_=x(this,i[t+c],o,c),_===$&&(_=this._$AH[c]),s||=!H(_)||_!==this._$AH[c],_===d?e=d:e!==d&&(e+=(_??"")+a[c+1]),this._$AH[c]=_}s&&!n&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},G=class extends A{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}},q=class extends A{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}},Y=class extends A{constructor(e,o,t,n,a){super(e,o,t,n,a),this.type=5}_$AI(e,o=this){if((e=x(this,e,o,0)??d)===$)return;let t=this._$AH,n=e===d&&t!==d||e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive,a=e!==d&&(t===d||n);n&&this.element.removeEventListener(this.name,this,t),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},J=class{constructor(e,o,t){this.element=e,this.type=6,this._$AN=void 0,this._$AM=o,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(e){x(this,e)}};var Ue=Z.litHtmlPolyfillSupport;Ue?.(W,D),(Z.litHtmlVersions??=[]).push("3.3.3");var $e=(r,e,o)=>{let t=o?.renderBefore??e,n=t._$litPart$;if(n===void 0){let a=o?.renderBefore??null;t._$litPart$=n=new D(e.insertBefore(E(),a),a,void 0,o??{})}return n._$AI(r),n};var ee=globalThis,w=class extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=$e(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return $}};w._$litElement$=!0,w.finalized=!0,ee.litElementHydrateSupport?.({LitElement:w});var Ke=ee.litElementPolyfillSupport;Ke?.({LitElement:w});(ee.litElementVersions??=[]).push("4.2.2");var te={natural:!0,signal:!0,shadows:!0,floors:1,cutDark:!0,sun:.45,ao:.45},z=[{id:"neon",base:"neon",group:"neon",aliases:["neon","standard"]},{id:"blueprint",base:"blueprint",group:"neon",aliases:["blueprint"]},{id:"day",base:"day",group:"neon",aliases:["day","light"]},{id:"focus",base:"neon",group:"neon",palette:{line:"#394150",dark:"#07090d",light:"#2c313a",hue:0,lift:.05,contrast:2.5},signal:!0,sun:.2,bg:["#030407","#0b0e14"],aliases:["focus","night","dark"]},{id:"synth",base:"neon",group:"neon",palette:{line:"#ff3fd2",dark:"#12051f",light:"#3a1460",hue:.2,lift:.05,contrast:2.5},signal:!0,sun:.2,bg:["#08010f","#2a0838"],aliases:["synthwave","synth","retro","party"]},{id:"cozy",base:"day",group:"homely",...te,palette:null,bg:["#f1efeb","#d9d5ce"],aliases:["cozy","homely","real"]},{id:"evening",base:"neon",group:"homely",...te,sun:.4,dim:.75,bg:["#14161c","#272630"],aliases:["evening","cozy evening"]},{id:"winter",base:"neon",group:"homely",...te,sun:.4,dim:.8,bg:["#0b1322","#1d2a40"],aliases:["winter","christmas"]},{id:"model",base:"day",group:"designed",palette:{line:"#8a8f98",dark:"#cfcac2",light:"#fbfaf7",hue:.08,lift:.35,contrast:3.2},signal:!0,sun:.3,ao:.3,shadows:!0,bg:["#eeece8","#d6d2cb"],aliases:["model","architect","white"]},{id:"pastel",base:"day",group:"designed",palette:{line:"#3b3f5c",dark:"#b7c4e6",light:"#fff4ea",hue:.55,lift:.3,contrast:3},signal:!0,sun:.25,ao:.2,shadows:!0,bg:["#f4efe8","#e3e7f2"],aliases:["pastel","kids"]},{id:"warm",base:"day",group:"designed",palette:{line:"#5a4632",dark:"#b0906c",light:"#f4ead9",hue:.15,lift:.3,contrast:3},signal:!0,sun:.3,ao:.3,shadows:!0,bg:["#f0e7d7","#d9cbb3"],aliases:["warm","wood","paper"]}],dt=z.map(r=>r.id),_t=new Map(z.map(r=>[r.id,r])),oe=[];function Se(r){oe=(r??[]).filter(e=>e&&typeof e.id=="string"&&e.id.startsWith("my_")&&typeof e.name=="string").map(e=>({...e,group:"custom",aliases:[e.name]}))}function xe(){return oe.length?[...z,...oe]:z}function Ae(r,e,o={}){let t=["neon","homely","designed","custom"],n=xe();return l`${o.none?l`<option value="" ?selected=${!e}>${r("style_none")}</option>`:d}
    ${o.auto||o.house?l`<optgroup label=${r("style_group_auto")}>
          ${o.house?l`<option value="house" ?selected=${e==="house"}>${r("style_house")}</option>`:d}
          ${o.auto?l`<option value="auto" ?selected=${e==="auto"}>${r("theme_auto")}</option>`:d}
        </optgroup>`:d}
    ${t.filter(a=>n.some(s=>s.group===a)).map(a=>l`<optgroup label=${r(`style_group_${a}`)}>
            ${n.filter(s=>s.group===a).map(s=>l`<option value=${s.id} ?selected=${e===s.id}>${s.name??r(`style_${s.id}`)}</option>`)}
          </optgroup>`)}`}var b="main",je=r=>r&&r!==b?{plan:r}:{};async function Ce(r,e){return r.callWS({type:"homeplan3d/building/get",...je(e)})}async function Pe(r){try{return await r.callWS({type:"homeplan3d/plans/list"})}catch{return{plans:[],trash:[],locate_plan:b}}}var O=["walls","floors","temperature","humidity","co2"];function ne(r,e){let o=e?.trim(),t=r?.card_templates;return o?t?.find(n=>n.id===o)??t?.find(n=>n.aliases?.includes(o)):void 0}var F=["fill","height","fullscreen_button","plan"];var Ve={view:"3D",editor:"Editor",all_floors:"All floors",no_building:"No floor plan yet.",no_building_admin:"No floor plan yet. Draw your first floor in the editor.",open_editor:"Open editor",phone_hint:"Drawing works best on a PC or tablet \u2013 on a phone you can look around and control your home.",loading:"Loading \u2026",load_error:"Loading failed",saving:"Saving \u2026",saved:"Saved",save_error:"Saving failed",save_failed_detail:"Saving failed: {error}. Your changes are kept in this browser.",needs_restart:"A new version of HomePlan 3D ({frontend}) is installed, but Home Assistant still runs {version}. Please restart Home Assistant \u2013 until then saving may fail.",needs_reload:"This page still shows HomePlan 3D {frontend}, Home Assistant already has {backend}. Please reload the page; in the companion app: Settings \u2192 Companion app \u2192 Reset frontend cache.",reload_page:"Reload",needs_restart_old:"A new version of HomePlan 3D is installed, but Home Assistant still runs an older one. Please restart Home Assistant \u2013 until then saving fails.",draft_found:"Unsaved changes from {time} found.",zoom_style:"When zooming in",zoom_late_early:"early",zoom_scope_all:"All rooms",zoom_scope_room:"Only the room",zoom_scope_hint:"What turns into the style while zooming in: every room, or only the room you zoom into or tap \u2013 the rest of the house keeps the look set",zoom_late_late:"late",zoom_late_hint:"When the style sets in while zooming in: early (already on an opened floor) to late (only close up in a room)",zoom_style_off:"When zooming in: stays",zoom_style_hint:"From afar the house keeps the look set, zooming into a floor or a room blends it into this style \u2013 without reloading. Works when Neon, Blueprint or Day is chosen above.",holo_more:"more",holo_less:"less",draft_conflict:"The plan was saved on another device meanwhile \u2013 this newer plan is shown now. Your change from {time} was made on the older one and is not saved.",draft_restore:"Restore and save",draft_discard:"Discard",walls_auto:"Tall walls",walls_cut:"Cut",plain_off:"With furniture",plain_on:"Floor plan only",plain_hint:"Floor plan only: walls, doors, windows and stairs without furniture \u2013 the devices stay.",reset_view:"Overview",back:"Back",floor:"Floor",floors:"Floors",floor_from_ha:"Floors from Home Assistant:",level:"Level {n}",elevation:"Elevation (m)",height:"Ceiling height (m)",cut_height:"Cut height (m)",show_menu:"Show",tool_menu:"Tool",view_menu:"View",fit:"Whole plan",room:"Room",rooms:"Rooms",room_id:"ID (card option room:)",area:"Area",x:"X (m)",z:"Y (m)",width:"Width (m)",depth:"Depth (m)",points:"Corners",feed_drain:"Bottom drain",hp_side_right:"right",hp_side_left:"left",hp_side_back:"back",wv_cat_base:"Base cabinets & boards",wv_cat_hang:"Hanging",wv_cat_tall:"Tall cabinets",wv_cat_living:"Seating & beds",wv_cat_light:"Lights",wv_cat_pack:"From your packs",wv_cat_energy:"Energy",delete:"Delete",settings:"Settings",furn_extra:"Extra value at the symbol (sensor, e.g. water temperature)",roof_basics:"Roof shape",pendant_shade:"Shade",pendant_globe:"Globe",pendant_cone:"Cone",pendant_drum:"Drum",pkg_kitchen_row:"Kitchen row",pkg_kitchen_row_desc:"Row on the back wall with fridge, oven, sink, dishwasher and stove, wall cabinet, dining table with pendant",pkg_kitchen_l:"L-shaped kitchen",pkg_kitchen_l_desc:"Rows at the back and left, kitchen island with bar stools",pkg_bath:"Bathroom",pkg_bath_desc:"Washbasin, WC, bathtub, washing machine, downlight",pkg_bedroom:"Bedroom",pkg_bedroom_desc:"Double bed with two nightstands, wardrobe, chest of drawers, ceiling light",pkg_living:"Living room",pkg_living_desc:"TV board, sofa, coffee table, rug, armchair, shelf, floor lamp, plant",pkg_dining:"Dining room",pkg_dining_desc:"Table with four chairs, sideboard, pendant",pkg_office:"Office",pkg_office_desc:"Desk with office chair, two shelves, ceiling light",pkg_kids:"Kids' room",pkg_kids_desc:"Single bed, desk, shelf, rug",pkg_hall:"Hall",pkg_hall_desc:"Coat rack, two downlights",cancel:"Cancel",confirm_switch:"Really switch {name}?",grid:"Grid (m)",background_edit_hint:"While the mode is on: dragging the picture moves it, the handle at the bottom right scales it. Fit the picture to the scale first, then turn it.",hint_select:"Tap a room to select \xB7 drag corners \xB7 \u201C+\u201D on an edge inserts a corner \xB7 arrow keys nudge \xB7 Del deletes \xB7 Ctrl+Z",hint_rect:"Drag to draw a rectangle",hint_polygon:"Place corners \xB7 tap the first corner or press Enter to close \xB7 Esc cancels",area_m2:"{a} m\xB2",mat_wood:"Wood",mat_oak:"Oak",mat_tiles:"Tiles",mat_carpet:"Carpet",mat_stone:"Stone",mat_concrete:"Concrete",card_name:"HomePlan 3D",card_description:"Your home in 3D (neon).",stats:"{calls} draw calls \xB7 {tris} triangles",stats_fps:"{fps} fps (slowest frame {ms} ms)",stats_idle:"At rest (0 fps)",stats_busy_camera:"camera",stats_busy_floors:"floors",stats_busy_openings:"doors/windows",stats_busy_flash:"flash",stats_busy_roof:"roof",stats_busy_flow:"power flow",stats_busy_effect:"colour effect",stats_busy_robot:"robot",stats_busy_orbit:"camera turn",stats_busy_tint:"room tint",stats_busy_solar:"solar modules",stats_busy_sound:"music",stats_low:"tablet level, pixel ratio {r}",stats_full:"full level, pixel ratio {r}",floors_apart:"Apart",floors_stacked:"Stacked",roof_keep:"Roof stays",roof_keep_hint:"The roof stays on the house while zooming in instead of lifting and fading out",floor_rooms_one:"1 room",floor_rooms:"{n} rooms",plan_main:"Home",plan_pick:"Choose floor plan",plan_all:"All floor plans",plan_new:"New floor plan",plan_manage:"Manage floor plans",plan_alerts_elsewhere:"{n} warning(s) in another floor plan",card_plan:"Floor plan",plan_lights_on:"Lights on",plan_open_now:"Windows and doors open",plan_open_n:"{n} open",plan_site:"Property",plan_alert:"{plan}: {text}",plan_alert_go:"Show",card_rooms:"Only these rooms",card_rooms_hint:"Tap rooms on the plan: the card then shows only them, with their furniture and devices \u2013 for the kids' tablet or a holiday flat, say. A single room opens with its devices beside it. Empty: the whole house.",card_rooms_leave:"Other rooms may be opened",card_rooms_leave_hint:"Unticked, the tablet stays in these rooms.",quality:"Quality",quality_auto:"Auto",quality_low:"Tablet",quality_high:"High",state_on:"On",state_off:"Off",state_open:"Open",state_closed:"Closed",state_opening:"Opening",state_closing:"Closing",state_playing:"Playing",state_paused:"Paused",state_idle:"Idle",state_locked:"Locked",state_unlocked:"Unlocked",state_detected:"Detected",state_clear:"Clear",state_unavailable:"Unavailable",state_heat:"Heat",state_cool:"Cool",state_auto:"Auto",state_heat_cool:"Heat/cool",state_dry:"Dry",state_fan_only:"Fan",devices:"Devices",panel_lights:"Lights",panel_covers:"Covers",panel_climate:"Heating",panel_media:"Media",panel_switches:"Switches",panel_sensors:"Sensors",panel_scenes:"Scenes & scripts",panel_cameras:"Cameras",camera_live:"Open live view",through_camera:"Look through the camera",through_blend:"Blend",through_back:"Back to the view",through_full:"Full screen",through_full_hint:"The camera picture on the whole screen (Esc or Back ends it). Where the browser cannot do this, Home Assistant's camera view opens \u2013 with sound there too.",camera_mount:"Mount",camera_mount_wall:"Wall (looks along its rotation)",camera_mount_ceiling:"Ceiling (dome, all round)",camera_fov_short:"Angle \xB0",camera_reach_short:"Reach m",camera_tilt_short:"Tilt \xB0",camera_popup_open:"Look through the camera",state_recording:"Recording",state_streaming:"Streaming",room_cleaning:"Cleaning (robot vacuum)",panel_clean:"Vacuum",panel_everything_off:"Everything off ({n})",panel_fold_open:"Show devices",panel_fold_close:"Fold",panel_fold_lights:"\u{1F4A1} {n} on",voice_clean_started:"The robot vacuum is on its way: {room}.",voice_clean_none:"{room} has no cleaning set (editor \u2192 room \u2192 Cleaning).",voice_off_done:"{room}: {n} devices off.",voice_off_nothing:"{room}: everything is off already.",voice_noroom:"Which room? Say e.g. \u201Cvacuum the kitchen\u201D, or set where the tablet hangs.",voice_noroom_open:"Tap into a room first, then \u201Cthere\u201D means it.",panel_all_off:"All off",panel_all_on:"All on",view_options:"View: quality, look, markers, FPS",panel_all_open:"All up",panel_all_close:"All down",central:"Central: all lights, blinds and favourites",central_house:"Whole house",central_lights:"Lights",central_covers:"Blinds",central_on:"On",central_off:"Off",central_open:"Up",central_close:"Down",central_sure:"Sure?",central_favorites:"Favourites",central_no_favorites:'No favourites yet. Set scenes, scripts and switches in the editor under "Favourites".',view_settings:"Settings",view_settings_admin:"Only administrators can change these settings \u2013 they apply to the whole house.",view_settings_look:"Look",glass_size:"Size of the glass cards",glass_size_hint:"Energy, heat pump, car, devices and the other glass cards in the 3D view",view_settings_alerts:"Warnings",view_settings_control:"Controls",view_settings_more:"Every other setting is in the editor under \u2699 Settings.",lines_add:"Add",lines_new:"New entry \u2026",sheet_mic:"Speak",sheet_listening:"Listening \u2026",sheet_mic_failed:"Nothing understood \u2013 the microphone needs HTTPS and a voice pipeline with speech-to-text.",card_central:"Star with the central menu",card_central_hint:"All lights and blinds of the floor or the house and the favourites from the editor.",bg_map_1:"Tap an outer corner of the house in the picture.",bg_map_2:"Now tap the next corner of the same outer wall in the picture.",bg_map_3:"Now tap the same first corner on the map's yellow outline.",bg_map_4:"And the second corner on the outline \u2013 the picture is turned, scaled and moved to fit.",thumbs_fold:"Fold the floor pictures into buttons",thumbs_show:"Show the floor pictures again",media_play_head:"Play",own_action_navigate:"Open a path",own_action_more_info:"Entity details",own_action_service:"Call a service",own_action_fire_dom_event:"fire-dom-event (browser_mod)",own_target_navigate:"Path",own_target_more_info:"Entity",own_target_service:"Service (domain.service)",panel_no_area:"This room is not linked to an area. You can link it in the editor.",panel_empty:"No devices of this room are in the plan. In the editor, place devices or pick them for the room panel with \u2606.",close:"Close",walk_start:"Walk through the house",walk_title:"Walk",walk_end:"End",walk_hint:"Drag: look around \xB7 tap the floor: walk there \xB7 W A S D / arrow keys or the stick: walk \xB7 Esc: end",card_next:"next step \u2026",card_step_hole:"Through a hole",card_step_fit:"Put in",card_step_end:"Or to its end",card_lay:"Lay it",card_hole_out:"outwards",card_hole_in:"inwards",card_to:"Connect to",card_through:"Through (in order, if needed)",card_group_pool:"At the pool",card_group_tech:"Equipment",card_group_joints:"T- and Y-pieces",card_group_holes:"Holes",card_open:"Connections",card_open_other:"Open this part's card",card_port:"Connection",card_via:"through",card_reroute:"Lay anew",card_disconnect:"Disconnect",card_with:"connect to \u2026",card_connect:"Connect",card_connect_with:"Connect to \u2026",card_status:"{a} of {b} connected",card_show_plan:"Show in the plan",card_show_wall:"Show in the wall view",port_suction:"suction side",port_pressure:"pressure side",port_pump:"from the pump",port_return:"return",port_waste:"waste",port_in:"in",port_out:"out",port_out1:"out 1",port_out2:"out 2",port_used:"in use",joint_tee:"T-piece {n}",joint_y:"Y-piece {n}",joint_wall:"Hole {n} (wall)",joint_floor:"Hole {n} (floor)",wall_kit_hole_wall:"Hole in the wall",wall_kit_hole_floor:"Hole in the floor",wall_kit_tee:"T-piece",wall_kit_y:"Y-piece",valve_top6:"Six-way valve on top",valve_side6:"Six-way valve at the side",valve_four:"Four-way valve",conn_add:"Add a pipe",conn_from:"From",conn_via:"Through (in order)",conn_add_via:"+ hole, ball valve, sight glass \u2026",conn_to:"To",conn_and:"And to (a second end, with a T-piece before)",conn_choose:"choose \u2026",conn_create:"Lay it",conn_hint:"The way is laid by itself \u2013 inside from connection to connection, outside at right angles under the ground. Fine-tune it in the wall view and the plan.",brightness:"Brightness",color_temp:"Colour temperature",color:"Colour",position:"Position",cover_open:"Open",cover_stop:"Stop",cover_tilt:"Slats",cover_tilt_open:"Slats open",cover_tilt_close:"Slats closed",cover_close:"Close",target_temp:"Target",current_temp:"Current",temp_down:"Cooler",temp_up:"Warmer",volume:"Volume",play_pause:"Play/pause",previous:"Previous",next:"Next",run:"Run",details:"Details",hold_hint:"Tap toggles \xB7 long press opens details",qm_off:"Off",find:"Search",find_placeholder:"Where is \u2026? Device or room",find_none:"Nothing found",swipe_off:"Off",card_section_view:"View",card_size:"Size",card_size_fixed:"Fixed height",card_size_fill:"Fill the screen",card_fill_hint:"Works best in a dashboard view of the type \u201CPanel (single card)\u201D \u2013 the card then takes all the space.",card_controls:"Switches in the card",card_floor_thumbs:"Floors as miniatures",card_floor_thumbs_hint:"Small pictures of the floors at the side \u2013 tap one to switch",card_floor_thumbs_hint_start:"The chosen floor is then where the card starts \u2013 the pictures at the side switch to the others",card_room_names:"Show room names",card_surroundings:"Show the surroundings from the map",card_surroundings_hint:"Off: this card shows the house without the neighbours' houses, streets and trees \u2013 calmer on a small screen and lighter for weak devices.",card_section_kiosk:"Wall tablet (kiosk)",card_section_features:"Features",card_weather_plan:"as set in the plan",card_pro_hint:"Motion trail and weather can be switched on here.",card_idle_return:"Back to the start view after",card_idle_off:"Never",card_idle_min:"{n} min without a touch",card_idle_hint:"After the wait the card closes the room and shows the start view again.",card_night:"Night dimming",card_night_off:"Off",card_night_sun:"By the sun",card_night_time:"Time range",card_night_range:"Time range (e.g. 22:00-06:00)",card_idle_orbit:"Camera turn as screensaver",card_idle_orbit_hint:"After the return the view turns slowly until someone touches the tablet",card_dashboard:"Button to a dashboard (path)",card_dashboard_label:"Label of the button",card_dashboard_hint:"A button at the top right of the card opens the dashboard or view with this path, e.g. /lovelace/home or /dashboard-house/0. Without a label it shows \u2302.",card_alerts:"Show warnings",card_alerts_hint:"Smoke, gas, CO, water, alarm panel and windows open in the rain: the room pulses, a note appears at the top",card_alert_jump:"Jump to the room of a new warning",card_alert_jump_hint:"The view switches to the floor and room of the warning by itself",director:"Live director",director_motion_off:"Off",director_motion_person:"People only",director_motion_all:"Any motion",voice:"Voice control",aliases:"Further names for the voice",voice_showing:"Showing {name}.",screen_name:"Screen name (for Assist)",screen_name_placeholder:"e.g. Kitchen",screen_name_hint:'Asking Assist ("Show the living room") or an automation calling the service homeplan3d.ask reaches every open NeonPlan view. When the service names a screen, only the view with that name reacts.',card_voice_area:'Room for "here"',card_voice_area_none:"None (the device's setting)",card_voice_area_hint:'When the tablet with this dashboard hangs in a room, sentences without a room name ("Lights on", "Turn off the lights here") apply to this area. Without a choice, the room set on the device itself counts.',voice_button:"Speak",voice_listen:"Listening \u2026",voice_none:"Nothing understood",voice_silent:"The microphone gives only silence. Usually another app holds it \u2013 in Fully Kiosk switch off the acoustic motion detection (Motion Detection \u2192 Acoustic Detection) and reload.",voice_no_pipeline:"No speech to text set up in Assist (Settings \u2192 Voice assistants).",voice_denied:"Microphone not allowed \u2013 only over https and with the permission in the browser or in Fully Kiosk.",voice_error:"Voice control: {msg}",card_voice:"Voice control (microphone button)",card_voice_hint:"\u201CShow the living room\u201D shows the room, other sentences go to Assist. Needs https and an allowed microphone",voice_sentences_distinct:'Only distinct ones ("Show \u2026", "Ask the house \u2026", "NeonPlan, \u2026")',voice_sentences_all:"All questions (also takes sentences Home Assistant answers itself)",voice_sentences_off:"None (default \u2013 no sentence file)",backdrop:"Background",backdrop_look:"The look's sky (default)",backdrop_gradient:"Gradient",backdrop_image:"Picture",card_director:"Live director (Camera Cockpit)",card_director_hint:"The card shows by itself what happens. Which events, you choose in the editor under \u201CLive director\u201D.",card_scenes:"Scene buttons in the room",card_scenes_hint:"Scenes and scripts of the area as buttons under the 3D view while a room is selected",card_motion_trail:"Motion trail",card_camera_wall:'"Cameras" button (camera wall)',card_camera_wall_hint:"A button at the bottom of the card opens the camera wall with every live picture (Pro: camera cockpit).",card_motion_trail_hint:"Where motion was reported in the last 30 minutes, with times (motion, presence and camera sensors)",trail_short:"Trail",cameras_short:"Cameras",camera_wall_title:"Camera wall",camera_wall_hint:"Camera wall: every live picture at once; a tap shows one picture big, a red frame shows motion",camera_wall_all:"All cameras",camera_still:"still, refreshed every {s} s",camera_wall_big:"Show the picture big",detect_person:"Person",detect_car:"Vehicle",detect_pet:"Animal",detect_motion:"Motion",weather_short:"Weather",weather_entity:"Weather entity",rain_warning:"Warning: window open while it rains",sun_patches:"Sunlight through the windows",sun_shadow:"Sun arc and house shadow",tap_in_room:"Switch devices only in the opened room",tap_in_room_hint:"In the house and floor views a tap on a device opens its room instead of switching it \u2013 so a tap meant for the floor does not move a blind by accident. In the opened room nothing changes; a long press opens the menu everywhere.",right_click_back:"Right click goes one step back",right_click_back_hint:"A short right click in the 3D view closes the room or goes from the floor back to the house. Off: a right click works like a click.",sun_shadow_hint:`An arc over the house shows the sun's way today with sunrise and sunset, and the house's shadow lies on the ground and moves with the sun. Needs the north direction; on the "Tablet" level only the arc.`,sky:"Real sky",sky_hint:"A sky behind the house that follows the real sun: sunset colours, stars that move through the night and the moon in its real phase. With \u201CWeather outside\u201D clouds drift with the wind. Off with an own background and in the blueprint look; a still picture on the \u201CTablet\u201D level.",flyin:"Fly in from space",flyin_hint:"When the view opens, a neon globe turns to your home and dives in while the camera comes down onto the house. Once per page load; a tap skips it. Not in the editor and not on the \u201CTablet\u201D level.",sun_arc:"Sun arc around",sun_arc_house:"the house",sun_arc_plot:"the whole plot",sun_arc_hint:"Where the sun arc and the compass ring stand: around the house (default) or around everything drawn \u2013 rooms, outdoor areas, fences and free walls.",window_glow:"Windows glow outside at night",window_glow_hint:"When it is dark outside, the light of lit rooms falls out of the windows as a warm glow onto the lawn and terrace in front \u2013 in the room's light colour, fainter behind lowered blinds.",gpu_safe_note:"In this browser the sun arc, the house shadow and the window glow at night are off: the graphics were lost right after the start. The next NeonPlan version tries again.",weather_effect_rain:"Rain",weather_effect_snow:"Snow",weather_effect_fog:"Fog (greys the scene)",weather_effect_clouds:"Clouds dim the sky and the sun",weather_effect_lightning:"Lightning in storms",weather_effect_sky:"Sun and moon in the sky",weather_hint:"Weather outside: rain, snow, fog and clouds from the weather entity, sun and moon from sun.sun",card_weather:"Weather outside",card_weather_hint:"Rain, snow, fog and clouds from the first weather entity (weather_entity picks another); only the clouds on the tablet level",trail_hint:"Motion trail: where motion was reported in the last 30 minutes, with times",alerts:"Warnings",alert_smoke:"Smoke: {name}",alert_gas:"Gas: {name}",alert_co:"Carbon monoxide: {name}",alert_water:"Water: {name}",alert_alarm:"Alarm triggered",alert_alarm_pending:"Alarm pending",alert_window_rain:"Window open in the rain: {name}",alert_power_outage:"Power outage: {name}",alert_contact_unavailable:"Contact unavailable: {name}",alert_short_contact_unavailable:"Contact unavailable",alert_unavailable:"Warn when a window or door contact is unavailable",alert_unavailable_hint:'When a contact has been "unavailable" for 10 minutes (empty battery, out of radio reach), the window looks shut in 3D although nobody knows. Then a warning shows.',alert_names:"Show device names in warnings",alert_names_hint:'On: "Kitchen \xB7 Smoke: Kitchen smoke detector". Off: just "Kitchen \xB7 Smoke" \u2013 shorter on a wall tablet. Without a room the device name stays.',alert_short_smoke:"Smoke",alert_short_gas:"Gas",alert_short_co:"Carbon monoxide",alert_short_water:"Water",alert_short_alarm:"Alarm triggered",alert_short_alarm_pending:"Alarm about to trigger",alert_short_window_rain:"Window open in the rain",alert_short_power_outage:"Power outage",power_outage:"Power outage",room_names_short:"Room names",floor_stack_short_dim:"Dimmed",floor_stack_short_stacked:"Stacked",floor_stack_short_single:"Alone",size_short_w:"W",size_short_d:"D",size_short_h:"H",card_floor_stack:"Floors below",floor_stack_dim:"Dimmed",floor_stack_stacked:"Stacked (the house up to here)",floor_stack_single:"Hidden (only this floor)",card_control_walls:"Tall walls/cut",card_control_floors:"Floors apart",card_control_temperature:"Temperature",card_control_humidity:"Humidity",card_control_co2:"CO\u2082",card_controls_hint:"Tall walls/cut, floors apart and temperature, humidity, CO\u2082 to switch",controls_hide:"Hide the controls \u2013 only the 3D view remains",nav_wrap:"Wrap the bar: every floor and room on several lines",nav_row:"Bar in one line (scrolls sideways)",controls_show:"Show the controls again",card_controls_hidden:"Start with the controls hidden",card_pets:"Show the pets",card_ghost:"Show the Halloween ghost",card_ghost_hint:"Fun pack Halloween: the ghost floats through this card's house too (e.g. switch it off on the wall tablet)",card_pets_hint:"Fun pack Pets: show the animals set up in this card (e.g. switch them off on the wall tablet)",card_controls_hidden_hint:"Only the 3D view; an eye at the bottom left brings bars, values and switches back",card_controls_hide_after:"Hide the controls after",card_hide_after_s:"{n} s without a touch",card_fullscreen_button:"Full screen button",card_fullscreen_button_hint:"Hides the dashboard around the card (e.g. on a wall tablet)",fullscreen:"Full screen",fullscreen_exit:"Exit full screen",card_section_show:"Show",card_floor:"Floor",card_floor_house:"Whole house (tap a floor to open it)",card_height:"Height (pixels)",card_walls:"Walls",card_quality_hint:"\u201CTablet\u201D is the lightest setting \u2013 ideal for Fire tablets and other wall tablets.",card_flows_switch:"Switch in the card",card_flows_on:"Always on",card_flows_off:"Always off",holos:"Holograms",holos_hint:"Show or hide the holograms of the plant and the devices",card_energy:"Show energy values at the top (Energy Pro)",card_room_panel:"Room details on tap",card_room_panel_hint:"The room's lights, blinds and cameras in a side panel",card_explode:"Pull floors apart in the house view",card_roof:"Show the roof",card_roof_hint:"Off: the house shows without its roof, as if it had none \u2013 the rooms lie open (solar fields on the roof go with it)",card_roof_fade:"Fade the roof out while zooming in",card_roof_fade_hint:"Off: the roof stays on the house even when the camera comes close.",card_templates:"Card templates",card_templates_intro:"Set up a dashboard card here once, e.g. \u201CKitchen Fire tablet\u201D. On the tablet you only pick the template in the card dialog. When you change it here, every tablet with this template follows by itself.",card_templates_empty:"No template yet. Create the first one with \u201C+ New template\u201D.",card_templates_no_editor:"The card editor could not be loaded. Reload the page (Ctrl+F5).",card_template_new:"New template",card_template_new_name:"New template",card_template_copy_name:"{name} (copy)",card_template_delete_ask:"Delete the template \u201C{name}\u201D? Cards using it then carry on with their own settings.",card_template_reloaded:"Reload sent: the open screens reload within the next seconds.",card_template_reload_failed:"Reload failed. Does NeonPlan in Home Assistant run this version yet (restart after an update)?",card_template_reload_all:"Reload all screens",card_template_reload_hint:"Reloads every open NeonPlan view, e.g. after an update. In automations: the action \u201Chomeplan3d.reload_screens\u201D.",card_template_name:"Name",card_template_duplicate:"Duplicate",card_template_preview:"Preview",card_template_preview_off:"Preview off",card_template_preview_on:"Show preview",card_template_where:"Where does the tablet hang?",card_template_where_hint:"The room for \u201Chere\u201D: \u201CTurn on the lights here\u201D then applies to this area, even when the card always shows the ground floor.",card_template_reloading:"Reloading \u2026 (a few seconds)",screen_reloading:"Reloading \u2026",card_template_open:"Edit in the NeonPlan editor",card_template_make:"Create a template in the NeonPlan editor",card_template_screen:"Screen",card_template_screen_tablet:"Tablet 10\u2033 landscape (Fire HD 10)",card_template_screen_small:"Tablet 7\u2033 landscape (Fire 7)",card_template_screen_upright:"Tablet upright",card_template_screen_phone:"Phone",card_tab_for:"General",card_templates_screens:"Screens",card_templates_phones:"Phones",card_templates_none:"None yet",card_template_use_title:"How to use the template on a dashboard",nav_lights:"Lights",nav_climate:"Heating",nav_page:"Page",nav_all_on:"All on",nav_all_off:"All off",nav_dev_on:"On",nav_dev_off:"Off",card_phone_place:"Own place {n}",card_phone_place_none:"None",card_phone_place_lights:"Lights \u2013 all lamps by floor",card_phone_place_climate:"Heating \u2013 all thermostats by floor",card_phone_place_action:"Run a scene or script",card_phone_place_link:"Open a dashboard page",card_phone_place_name:"Name in the bar (empty: automatic)",card_phone_place_icon:"Symbol (an emoji, empty: automatic)",card_phone_place_entity:"Scene or script",card_phone_place_path:"Path inside Home Assistant",card_phone_place_hint:'Up to two places of your own stand in the bar before "More". A place with no matching devices in the house stays away.',card_for:"What is the card for?",card_for_large:"Tablet or large screen",card_for_phone:"Phone",card_for_large_hint:"The house large in the picture, with the switches, room bar and floor pictures you choose \u2013 for a wall tablet, a PC or a TV.",card_for_phone_hint:"The card fills the screen and gets a bar at the bottom for the thumb: Now, Rooms, Blinds, More. The card's own switches, room bar and floor pictures make way. Best on a dashboard view of its own.",card_section_phone:"The bar on the phone",card_phone_rooms:"Rooms",card_phone_rooms_hint:"The rooms by floor as tiles with lights, open windows and music; a tap jumps into the room.",card_phone_covers:"Blinds",card_phone_covers_hint:'All blinds of the house on one page, with "All up" and "All down".',card_phone_favorites:"Favourites on top of the list",card_phone_favorites_hint:`The house's favourites as buttons above "What's going on?".`,card_phone_solo_hint:'A room you jump into stands alone in the picture. Each device can change this for itself under "More".',card_phone_start_now:"Start with the list",card_phone_start_now_hint:`The card opens with "What's going on?" instead of the house.`,card_template_new_large:"For a tablet / large screen",card_template_new_phone:"For a phone",card_template_new_name_phone:"Phone",card_template_preview_look:"Turn, zoom and open rooms as on the card. The preview switches nothing.",card_template_where_other:"Other areas",card_template_voice_off:"The microphone button is off in this template. Without it the tablet does not listen.",card_template_voice_on:"Turn on the microphone button",card_template_own:"This card still has old settings that no longer apply with the template: {list}.",card_template_own_clear:"Tidy up (keep only the template)",card_template_mode:"Changes:",card_template_live:"Straight to the tablets",card_template_manual:"Send with a button",card_template_pending:"Not sent yet: the tablets show the old state, the preview the new one.",card_template_publish:"Send to the tablets",card_template_discard:"Discard",card_template_published:"Sent: the tablets show the new state now.",card_template_preview_big:"Large",card_template_preview_small:"Small",card_template_use:"How to use it: add the NeonPlan card on the tablet and pick the template at the top, or in YAML:",card_template_copy:"Copy",card_template_copied:"Copied.",card_template_reload:"Reload screens with this template",card_template:"Template",card_template_none:"None \u2013 set it up here",card_template_hint:"Card templates are made in the NeonPlan editor under \u2699 Settings \u2192 Card templates. Then you only pick one here.",card_template_on:"This card follows its template. Change it in the NeonPlan editor under \u2699 Settings \u2192 Card templates; every tablet takes it over by itself.",card_template_missing:"The card template \u201C{name}\u201D is no longer in the plan. The card uses its own settings.",card_plain:"Floor plan only (no furniture)",room_bar:"Room bar",room_bar_hint:"A card per room at the bottom: temperature, open windows, what plays and a light switch. A tap flies into the room. The top then keeps only the floors; the eye leaves the bar in place.",room_bar_none:"No room bar",room_bar_rooms:"Room bar",room_bar_all:"+ favourites",room_bar_hide:"Fold the room bar away",room_bar_on:"On",room_bar_off:"Off",room_bar_light:"Light",room_bar_activate:"Activate",room_bar_lights:"{n} on",room_bar_lights_off:"Switch the room's lights off",room_bar_open:"open",room_bar_playing:"playing",card_room_bar:"Room bar at the bottom",card_room_bar_favorites:"Favourites in the room bar",card_room_bar_favorites_hint:"Scenes, scripts and switches from the favourites (Settings \u2192 Favourites) at the front of the bar.",show_if:"Only show while \u2026",card_stats:"Performance display (frames per second)",card_stats_hint:"To check how smoothly the card runs on the device",packs:"Furniture packs",lib_badge_light:"Lamp: links to a light and switches in 3D",lib_badge_electric:"Electric: links to an entity and a power sensor (switching, pictures, consumption)",lib_badge_hint:"Items with a symbol link to entities: lamps switch, screens show pictures, appliances show their consumption.",pro_feature_camera_cockpit:"Camera cockpit: look through the camera, motion trail, camera wall and detection pins (person, vehicle, animal)",pro_name_camera_cockpit:"Camera cockpit",pro_name_weather:"Weather outside",pro_name_screens:"Live screens",ext_tab:"Extensions",pet_kind_cat:"\u{1F431} Cat",pet_kind_dog:"\u{1F436} Dog",pet_kind_rabbit:"\u{1F430} Rabbit",pet_fur_orange:"Ginger",pet_fur_tabby:"Tabby",pet_fur_black:"Black",pet_fur_white:"White",pet_fur_grey:"Grey",pet_fur_brown:"Brown",pet_fur_calico:"Calico",pet_fur_golden:"Golden",pet_fur_cream:"Cream",pet_breed_dachshund:"Dachshund",pet_breed_pug:"Pug",pet_breed_terrier:"Terrier",pet_breed_labrador:"Labrador",pet_breed_shepherd:"Shepherd",pet_floor_auto:"Ground floor",manual:"Manual",pro_feature_weather:"Weather outside: rain, snow, clouds, sun and moon",pro_feature_screens:"Live screens: the media player's app colour and artwork, picture rules, camera live pictures on screens",pro_feature_energy_pro:"Energy Pro: power-flow lines through the house, living solar modules, glass holograms for the plant and for devices, today's gas and water use \u2013 heat follows as an update",pro_name_sound:"Sound & Cinema",pro_feature_sound:"Sound & Cinema: speakers show cover, title and volume as a glass card, sound rings around playing speakers, multiroom groups as lines, a quick menu with play, pause, track change and volume",pro_feature_auto_pro:'Car Pro: the car in its parking spot shows charge, range, charging, lock and climate from its integration \u2013 a light band in the charge colour, a pin with percent and kilometres, a quick menu with lock, climate and charging, "away" with its location',pro_name_time_travel:"Time travel",pro_name_pool:"Pool Pro",pro_feature_pool:"Pool Pro (module): the water glows in the colour of the pool light and moves while the filter pump runs; the glass card shows water temperature, heat pump with target, pH, chlorine/redox and salt with a traffic light; the cover slides over the water; warnings for pH, chlorine, salt and frost; the pool plant sets itself up at a tap and the water flows visibly through the pipes",pool_pump:"Filter pump",pool_ph:"pH value",pool_shape:"Shape",pool_shape_rect:"Rectangular",pool_shape_round:"Round",pool_shape_oval:"Oval",pool_shape_free:"Free",hint_pool:"Choose a shape and draw the pool \xB7 tap a pool to select it",pool_port_skimmer:"Skimmer",pool_port_drain:"Bottom drain",pool_port_inlet:"Inlet",pool_port_waste:"Waste drain",furn_pool_pump:"Filter pump",furn_pool_filter:"Sand filter",furn_pool_heat_pump:"Heat pump",furn_pool_dosing:"Dosing unit",furn_pool_valve:"Ball valve",valve_filter:"Filter",valve_backwash:"Backwash",valve_rinse:"Rinse",valve_waste:"Waste",valve_recirculate:"Recirculate",valve_closed:"Closed",pro_feature_time_travel:"Time travel: a time slider replays up to 7 days in the house \u2013 lights, doors, windows, blinds, motion, heating, weather and the sun, with event markers. View only, nothing is switched",tt_chip:"Time travel",tt_hint:"Replay up to 7 days in the house (view only, nothing is switched)",tt_badge:"TIME TRAVEL",tt_live:"Live",tt_live_hint:"Back to the present",tt_play:"Play",tt_pause:"Pause",tt_prev:"Previous event",tt_next:"Next event",tt_speed:"Speed: 1 hour in {s}",tt_now:"now",tt_ago:"{d} ago",tt_since:"since {time}",tt_loading:"Loading history \u2026",tt_error:"History not loaded: {error}",tt_retry:"Retry",tt_no_recorder:"Without Home Assistant's recorder there is no history.",tt_restart:"Please restart Home Assistant \u2013 only then does it know time travel.",tt_locked:"Time travel is not available right now.",tt_readonly:"Time travel: view only \u2013 nothing is switched",tt_ev_door:"{name} opened",tt_ev_garage:"{name} opened",tt_ev_lock:"{name} unlocked",tt_ev_alarm:"Alarm: {name}",tt_ev_smoke:"Smoke: {name}",tt_ev_outage:"Power outage",tt_ev_camera:"Camera detects motion: {name}",tt_ev_gas:"Gas: {name}",tt_ev_co:"Carbon monoxide: {name}",tt_ev_water:"Water: {name}",tt_ev_rain:"Window open in the rain: {name}",tt_ev_motion:"Motion at night: {name}",tt_ev_washer:"{name} done",tt_ev_robot_start:"{name} starts",tt_ev_robot_done:"{name} done",card_time_travel:'"Time travel" button',card_time_travel_hint:"A button at the bottom of the card replays the last hours and days (Pro: time travel).",card_room:"Start room",card_room_none:"None (floor or house)",card_walk:"Allow the walk",card_walk_hint:"The button for the walk through the house at eye height",card_tt_range:"Time travel starts",card_tt_range_24h:"24 hours ago",card_tt_range_7d:"a week ago",card_tt_speed:"Replay speed",card_tt_speed_day:"1 day in 6 s",car_charging:"Charging (power, state or switch)",car_climate:"Climate / preheating",car_away:"away",car_charging_short:"charging",car_lock_btn:"Lock",car_unlock_btn:"Unlock",car_unlock_confirm:"Really unlock the car?",car_climate_on:"Climate on",car_climate_off:"Climate off",car_charge_start:"Start charging",car_charge_stop:"Stop charging",car_no_controls:"No switchable entities found on the car (lock, climate, charge switch).",holo_media_playing:"playing",holo_media_paused:"paused",pack_missing_item:"Furniture of a removed pack",pack_error_not_a_pack:"This is not a furniture pack file.",pack_error_invalid_content:"The pack contains invalid furniture: {detail}",pack_error_too_large:"The file is too large.",pack_error_needs_update:"This add-on needs a newer version of HomePlan 3D. Please update first (Settings \u203A System \u203A Updates), restart Home Assistant, then install again.",hint_furniture:"Tap a room, then pick an item on the right \xB7 drag items, resize them by their corners",flows:"Power flow",flows_hint:"Show or hide glowing lines from the meter to the consumers",holo_title:"Solar & Energy",holo_live:"live",holo_pv_now:"PV now",holo_today:"Today",holo_peak:"Peak",holo_battery:"Battery",holo_grid:"Grid",holo_house:"House",holo_wallbox:"Wallbox",holo_autarky:"Self-sufficiency now",holo_house_now:"House now",furn_name:"Name (optional)",furn_mirror:"Mirror",furn_mirror_hint:"Swap left and right \u2013 the L-sofa the other way round, the cabinet with its door on the other side, the kitchen run mirrored.",furn_plant_card:"Show the plant card (hologram)",furn_plant_card_hint:"Energy Pro: every plant (an inverter with fields of its own) gets a glass card over its field \u2013 power, day curve, battery. Switch it off for this plant here.",furn_cable_to_grid:"Cable ends at the grid point",furn_cable_to_grid_hint:"Energy Pro: this inverter's cable runs to the grid point instead of the meter \u2013 for instance when the inverter and the grid connection are far from the house board.",flow_on:"on",flow_off:"off",hint_opening:"Tap a wall to add a door or window \u2013 choose its kind on the right afterwards",preset_door:"Door",preset_door_double:"Double door",preset_window:"Window",preset_window_double:"Double window",preset_terrace:"Terrace door",preset_terrace_double:"French doors",preset_garage:"Garage door",preset_front:"Front door",opening_style:"Style",sidelight_hinge:"Sidelight on the hinge side",sidelight_width:"Sidelight width (m)",style_auto:"Automatic ({style})",style_interior:"Room door",style_front:"Front door",style_front_glass:"Front door with glass",style_sidelight:"Front door with sidelight",style_sidelights:"Front door with two sidelights",style_glass:"Glass door",style_sliding:"Sliding door",style_passage:"Opening (no door)",style_standard:"Standard",style_bars:"With glazing bars",style_glass_wall:"Glass wall (fixed)",preset_glass_wall:"Glass wall",style_slide:"Sliding (one pane slides in front of the fixed one)",preset_terrace_slide:"Lift-and-slide door",preset_window_slide:"Sliding window",hint_measure:"Tap the starting point, then type the wall lengths with their direction on the right",dir_up:"Up",dir_down:"Down",dir_left:"Left",dir_right:"Right",hint_outdoor:"Drag to draw an outdoor area (lawn, terrace, pool \u2026)",outdoor_draw_type:"Draw:",outdoor_draw_type_hint:"What you draw next: lawn, terrace, path, pool \u2026 The type can still be changed in the form afterwards.",outdoor:"Outdoor area",out_lawn:"Lawn",out_terrace:"Terrace",out_path:"Path",out_driveway:"Driveway",out_bed:"Flower bed",out_hedge:"Hedge",out_fence:"Fence",out_wild:"Wild patch",out_pergola:"Pergola / frame",out_balcony:"Balcony",gate_kind_swing:"Garden gate (one leaf)",gate_kind_double:"Double gate (two leaves)",gate_kind_slide:"Sliding gate",slope_x:"right (+X)",slope_nx:"left (\u2212X)",slope_z:"down (+Z)",slope_nz:"up (\u2212Z)",roof:"Roof",roof_none:"No roof",roof_flat:"Flat roof",roof_gable:"Gable roof",roof_custom:"Roof sections (custom)",roof_sections:"Roof sections",roof_sections_hint:"Each roof section covers a rectangle of the house, e.g. the house, the barn or an extension \u2013 each with its own shape, ridge direction, eave height and pitch. Drag in the plan to draw a new one; tap selects it, dragging moves it, the corners resize it.",roof_sections_start:"Create roof sections from the rooms",roof_sections_regen:"Create again from the rooms",roof_sections_off:"Back to one roof",roof_regen_confirm:"Replace all roof sections with a new proposal from the rooms?",roof_section:"Roof section",roof_section_hint:"Heights count from the ground. A side with a lower eave reaches further down (catslide); pent roofs rise from the first side.",roof_shape_gable:"Gable",roof_shape_hip:"Hip",roof_shape_pent:"Pent",roof_shape_flat:"Flat",roof_shape_halfhip:"Half-hip",roof_shape_pyramid:"Pyramid",roof_shape_mansard:"Mansard",roof_shape_parapet:"Parapet",roof_shape:"Shape",roof_axis_x:"Ridge \u2194",roof_axis_z:"Ridge \u2195",roof_eave:"Eave (m)",roof_pitch_short:"Pitch (\xB0)",roof_pitch_upper:"Upper roof pitch (\xB0)",roof_height:"Height (m)",roof_base:"Top of walls (m)",roof_on_floor:"Sits on floor",roof_on_floor_hint:"Puts the section on this floor's wall tops; base and eaves move along. In the 3D view the roof belongs to this floor.",roof_base_hint:"Below the ceiling height of the floor underneath, that floor's walls end under the roof: knee walls at the eaves, gables up to the ridge, inner walls cut by the slope. Dashed lines in the plan show where 1.5 m and 2 m of headroom remain.",roof_ridge_height:"Ridge height",roof_side_top:"top",roof_side_bottom:"bottom",roof_side_left:"left",roof_side_right:"right",roof_end:"End",roof_end_auto:"as the shape",roof_end_gable:"Gable",roof_end_hint:"How the ridge ends at this end: a gable (an upright wall), a hip or a half-hip \u2013 a hip at one end only, for example.",roof_swap:"Swap sides",roof_turn:"Turn",roof_turn_hint:"Turns this roof part in the plan (clockwise), e.g. for a wing at an angle. Dormers and cross gables on it turn along. 0\xB0 = as before.",roof_open:"Canopy (posts instead of walls, see-through)",roof_open_short:"Canopy",roof_dormer:"Dormer",roof_dormer_hint:"A dormer on this side of the roof: 2 m wide, its front at the eave wall, eaves 1.4 m above the roof's eave, gable roof. Then move it and change its width and heights like any section; the main slope opens under it and the attic wall rises up to the dormer \u2013 a window fits there.",roof_outline:"Take the floor's outline",roof_outline_hint:"A flat roof as a free shape: takes the outline of the shown floor's rooms (L- or Z-shaped too) as one surface without seams. The corners can be dragged afterwards.",roof_points_hint:"Free shape: drag the corners in the plan. Back to the rectangle drops the shape.",roof_rect:"Back to the rectangle",roof_open_hint:"For a terrace roof or a carport: posts and beams carry the roof instead of walls, and it is see-through. Where the canopy meets the house wall, it rests on the wall.",roof_swap_hint:"Turns the roof round: the two sides swap eave and pitch, a pent roof rises the other way.",roof_pitch:"Roof pitch (\xB0)",roof_overhang:"Roof overhang (m)",roof_overhang_sides:"Overhang per side",roof_overhang_sides_hint:"Set the roof overhang for each side yourself. Off: automatic \u2013 no overhang where the section meets a taller part of the house.",roof_ridge:"Ridge",roof_ridge_long:"Along the long side",roof_ridge_short:"Along the short side (e.g. terraced house)",device:"Device",lamp_mount:"Lamp",lamp_ceiling:"Ceiling light",lamp_floor:"Floor lamp",lamp_table:"Table lamp",lamp_wall:"Wall light",marker_height:"Marker height (m)",height_auto:"Automatic height",panel_more:"More devices of the area ({n})",panel_less:"Show less",fps:"FPS",controls_side:"Where the floor pictures, star, search and eye sit",controls_left:"Controls on the left",controls_right:"Controls on the right",keep_view:"Keep view",angle_lock:"3D lock",angle_lock_hint:"The angle stays fixed: a drag moves the view, zooming still works \u2013 nobody turns the house by accident.",keep_view_hint:"Switching between the house and the floors keeps the camera where it is \u2013 only its height follows.",fps_title:"Performance display (frames per second)",hint_garage:"Tap a wall to add a garage door",opening_garage:"Garage door",hint_door:"Tap a wall to add a door",hint_window:"Tap a wall to add a window",opening_door:"Door",opening_window:"Window",opening_type:"Type",opening_position:"Centre from corner (m)",sill:"Sill height (m)",surround_err_busy:"The map servers are busy right now. Please try again in a few minutes.",surround_err_empty:"The map has no houses or streets for this place yet.",sill_board_auto:"automatic",sill_board_none:"none",sill_board_inside:"inside only",sill_board_outside:"outside only",opening_height:"Height (m)",blind_side:"Blind sits",sensor_kind_contact:"Window contact (open/closed)",sensor_kind_handle:"Handle sensor (open/tilted/closed)",sensor_kind_contact_tilt:"Contact + tilt sensor",handle_main:"Handle sensor main leaf",entity_auto:"Automatic ({name})",opening_hint:`Sensor type: window contact (reports open/closed), handle sensor (reports open, tilted and closed \u2013 e.g. a Homematic window handle) or contact + tilt sensor (a second sensor that only reports tilted). Automatic uses the blinds and contacts of the room's area. Position sensor: an entity reporting the blind's position while it moves (e.g. a Homematic "level", 0\u2013100 % or 0\u20131, open = high) \u2013 the blind then moves live in 3D.`,furniture:"Furniture",lib_room_living:"Living",lib_room_dining:"Dining",lib_room_kitchen:"Kitchen",lib_room_bedroom:"Bedroom",lib_room_kids:"Kids",lib_room_bath:"Bathroom",lib_room_office:"Office",lib_room_hall:"Hall",lib_room_utility:"Utility",lib_room_garage:"Garage",lib_room_garden:"Garden",lib_room_hobby:"Hobby & fitness",lib_kind_sofa:"Sofas",lib_kind_seating:"Seating",lib_kind_table:"Tables",lib_kind_storage:"Cabinets & shelves",lib_kind_bed:"Beds",lib_kind_kitchen:"Kitchen",lib_kind_appliance:"Appliances",lib_kind_bath:"Bathroom",lib_kind_lamp:"Lights",lib_kind_media:"TV & audio",lib_kind_office:"Office",lib_kind_tech:"Tech & smart home",lib_kind_heating:"Heating & climate",lib_kind_energy:"Energy",lib_kind_household:"Household",lib_kind_deco:"Decoration",lib_kind_plant:"Plants",lib_kind_outdoor:"Garden & outdoors",lib_kind_kids:"Kids",lib_kind_sport:"Fitness",lib_kind_pets:"Pets",lib_kind_vehicle:"Vehicles",lib_kind_stairs:"Stairs & railings",lib_kind_architecture:"Architecture",rotation:"Rotation (\xB0)",furn_sofa:"Sofa",furn_sofa_l:"Corner sofa (L-shaped)",furn_sofa_u:"U-shaped sofa",furn_armchair:"Armchair",furn_table:"Table",furn_chair:"Chair",furn_bed:"Bed",furn_nightstand:"Nightstand",furn_wardrobe:"Wardrobe",furn_shelf:"Shelf",furn_kitchen:"Kitchen unit",furn_worktop:"Worktop",furn_fridge:"Fridge",furn_fridge_smart:"Smart fridge (side by side)",furn_door_left:"Door sensor left (freezer side)",furn_door_right:"Door sensor right (fridge side)",furn_stove:"Stove",furn_sink:"Sink",furn_bathtub:"Bathtub",furn_shower:"Shower",furn_wc:"WC",furn_washbasin:"Washbasin",furn_desk:"Desk",furn_tv_board:"TV board",furn_plant:"Plant",furn_rug:"Rug",furn_stairs:"Stairs",furn_stairs_u:"U-stair with landing",furn_stairwell:"Floor opening",hint_wall:"Drag to draw a single wall (partition, half wall) \xB7 Shift keeps it straight \xB7 Alt without snapping",wall_heights:"Wall heights",style_group_custom:"Own styles",style_new:"Make an own style from it",style_own_suffix:"(own)",style_delete:"Delete style",style_name:"Name",style_builtin_hint:"A ready style. To adjust it, \u201CMake an own style from it\u201D \u2013 then every setting is there, and your style is in every style list.",style_show_beside:"Show in \u201C3D beside\u201D",style_natural:"Real materials (wood, tiles, wall colours)",style_dark:"Dark style \u2013 lines glow",style_line:"Lines",style_surface_dark:"Surfaces dark",style_surface_light:"Surfaces light",style_hue:"Share of colour",style_lift:"Base brightness",style_contrast:"Contrast",style_signal:"Active devices in colour",style_sun:"Light by direction",style_ao:"Room corners",style_shadows:"Contact shadows under furniture",style_floors:"Floor structure",style_cut:"Dark cut edges",style_dim:"Evening mood",style_bg_top:"Background top",style_bg_bottom:"Background bottom",style_times:"Times of day (house plan)",wall_exterior_short:"exterior wall",hint_hole:"Drag to draw a floor opening (stairwell, gallery)",hint_roof:"Drag to draw a roof section \xB7 tap selects \xB7 drag moves \xB7 corners resize",hint_energy:"Tap a solar field to select it \xB7 drag to move it, also onto another roof face \xB7 new fields with + Solar field on the right",furn_parking:"Parking spot",furn_group_vehicles:"Parking",furn_lamp_ceiling:"Ceiling light",furn_lamp_downlight:"Downlight",furn_lamp_spot:"Surface spot",furn_lamp_panel:"LED panel",furn_lamp_uplight:"Floor uplight",furn_lamp_bollard:"Path light",furn_lamp_garden:"Garden spot",furn_radiator:"Radiator",furn_robot_vacuum:"Robot vacuum",furn_entity_vacuum:"Robot vacuum",furn_robot_room:"Current room (sensor)",furn_lamp_pendant:"Pendant light",furn_lamp_floor:"Floor lamp",furn_lamp_table:"Table lamp",furn_lamp_wall:"Wall light",furn_led_strip:"LED strip",furn_group_lights:"Lights",furn_entity_light:"Light or switch",furn_color_entity:"Colour and brightness from (optional)",furn_color_entity_hint:"For lights that a relay (Shelly, switch actuator) turns on and off while the bulb itself knows its colour and brightness: on/off comes from the switch above, colour and brightness from this entity.",furn_entity_climate:"Heating (thermostat)",lamp_hint:"Tap the lamp in 3D to switch it, long press for the quick menu. Switches work too (e.g. a relay for the ceiling light) \u2013 the lamp shines while it is on. Table lamps stand on the furniture below them.",lamp_hint_pendant:"Height = drop below the ceiling. Tap in 3D to switch, long press for details.",theme:"Look",version_hint:"Installed version of HomePlan 3D \u2013 the frontend; the integration in Home Assistant reports {backend}",accent:"Accent colour",accent_hint:"An accent colour of your own: lines and glowing edges in the neon look, buttons and pins \u2013 \u21BA brings the neon cyan back",accent_reset:"Back to cyan",theme_neon:"Neon",theme_blueprint:"Blueprint",theme_day:"Day",theme_auto:"Auto (Day/Neon by the sun)",style:"Style",style_neon:"Neon",style_blueprint:"Blueprint",style_day:"Day",style_focus:"Night / Focus",style_synth:"Synthwave",style_cozy:"Homely",style_evening:"Homely evening",style_winter:"Winter evening",style_model:"Architect's model",style_pastel:"Pastel",style_warm:"Warm / Wood & paper",style_house:"House plan (day / evening / night)",style_group_neon:"Neon & classic",style_group_homely:"Homely \u2013 real materials",style_group_designed:"Designed",style_group_auto:"Automatic",style_set:"Style \u201C{name}\u201D is on.",style_reset:"Style back to the setting.",style_none:"\u2013 none \u2013",style_day_label:"By day",style_evening_label:"In the evening",style_night_label:"At night",style_switch:"Switch",style_switch_sun:"by the sun",style_switch_time:"by the clock",style_morning_at:"Day from",style_evening_at:"Evening from",style_night_at:"Night from",style_switch_hint:"By the sun: day while the sun is up, then evening until \u201CNight from\u201D. By the clock: the three times.",style_entity:"Style from a helper entity",style_entity_hint:"An input_select or input_text whose state names a style (e.g. \u201CHomely\u201D). While it names one, that style applies \u2013 automations can switch it.",theme_evening:"Style in the evening",theme_night:"Style at night",theme_schedule_hint:"Empty = the same style all day. It switches as set in the house plan (by the sun or the clock).",persons:"People",locate:"Locating",persons_figure:"Figure",persons_pin:"Pin",persons_off:"off",furnish:"Furnish",mount_height:"Height above the floor (m)",size_w:"Width (m)",size_d:"Depth (m)",size_h:"Height (m)",furnish_hint:"Drag furniture, lamps and devices \xB7 furniture snaps to walls \xB7 tap one to turn it, set its height and mount",done:"Done",heatmap:"Heatmap",heat_off:"Normal",heat_short_temperature:"Temp.",heat_short_humidity:"Humidity",heat_short_co2:"CO\u2082",heat_short_values:"Values",heat_temperature:"Temperature",heat_humidity:"Humidity",heat_co2:"CO\u2082",heat_values:"Values at the room names",heat_none_found:"No matching sensors in the rooms' areas.",markers:"Markers",markers_none:"None",markers_important:"Important",markers_all:"All",markers_room:"In the room",pin_size:"Symbol size",pin_size_small:"Small",pin_size_normal:"Normal",pin_size_large:"Large",furn_stool:"Stool",furn_coffee_table:"Coffee table",furn_tv_wall:"TV (wall)",furn_ac_unit:"Air conditioner (wall)",furn_awning:"Awning",furn_group_outdoor:"Terrace & balcony",bin_out:"Put out (helper)",bin_out_done:"put out \u2713",bin_out_mark:"Mark as put out",bin_next_only:"Label only the next pickup",bin_days:"Show tags only \u2026 days before",hh_service2:"{name}: {what} due",bin_none:"No pickup in sight",hh_title:"Today in the household",heat_sensor:"Heating (sensor)",heat_sensor_hint:'When the thermostat does not say whether it heats (Tuya valves report a "work state"), pick that sensor here: on/opened/heating or an opening above 0 % makes the radiator glow.',door_lock_btn:"Lock",door_unlock_btn:"Unlock",door_lock_confirm:"Really lock {name}?",door_unlock_confirm:"Really unlock {name}?",clock:"Clock",clock_off:"Off",clock_tl:"\u2196 clock",clock_tr:"\u2197 clock",clock_bl:"\u2199 clock",clock_br:"\u2198 clock",hh_left:"{t} left",hh_done:"Done!",hh_finished:"{name} is done",hh_thirsty:"Thirsty",hh_plant:"{name} needs water",hh_service:"{name}: service due",hh_fridge_open:"{name} is open",alert_fridge_door:"Fridge open: {name}",alert_short_fridge_door:"Fridge open",card_household:"Today in the household",card_household_hint:"Household Pro: glass card with bins, post, finished appliances, thirsty plants and service due",furn_waste_bin:"Waste bin",furn_mailbox:"Mailbox",furn_neon_sign:"Neon sign",sign_color:"Colour of the tubes",furn_wifi_ap:"Wi-Fi access point",furn_water_heater:"Water heater",wifi_ap_std:"On the ceiling",wifi_ap_wall:"On the wall",water_heater_std:"Standing tank",water_heater_wall:"Slim tank on the wall",ap_clients:"{n} clients",ap_offline:"Offline",pin_standby:"Standby",furn_lamp_fan:"Ceiling fan with light",furn_wall_switch:"Light switch",furn_wall_socket:"Socket",furn_group_switches:"Home technology",wv_cat_switches:"Switches",furn_group_household:"Household",bin_shape_bin120:"Wheelie bin 120 l",bin_shape_bin240:"Wheelie bin 240 l",bin_shape_bin1100:"Container 1100 l",bin_shape_multi:"Multi-compartment bin",bin_shape_bag:"Bag",bin_shape_caddy:"Caddy / pail",bin_shape_underground:"Underground container",bin_kind:"Waste",bin_kind_rest:"General waste",bin_kind_bio:"Food / organic",bin_kind_paper:"Paper",bin_kind_plastic:"Packaging / plastic",bin_kind_glass:"Glass",bin_kind_garden:"Garden waste",bin_kind_recycling:"Recycling",bin_kind_other:"Other",bin_color:"Colour",bin_lid:"Lid",bin_source:"Waste calendar or sensor",bin_match:"Word in the calendar (empty: by its waste)",bin_today:"Today",bin_tomorrow:"Tomorrow",bin_in_days:"in {n} days",mailbox_shape_wall:"Wall mailbox",mailbox_shape_pole:"Mailbox on a post (with flag)",mailbox_shape_pillar:"Post box with newspaper holder",mailbox_shape_parcel:"Parcel box",mailbox_shape_bank:"Mailbox bank",mailbox_door:"Sensor of the emptying door (optional)",mailbox_post:"Post",pro_feature_household:'Household Pro: bins glow the evening before their pickup (waste calendar or sensor), the mailbox while post is in it, plants when thirsty; washer, dryer and dishwasher show their time left and "Done!"; filters and consumables due glow yellow; open fridge doors warn; glass card "Today in the household"; plus the smart fridge (side-by-side, doors with sensors)',pro_name_frames:"Digital Picture Frames",pro_feature_frames:"Digital Picture Frames: frames on the wall show a slideshow, the calendar, a pin board, lists or a camera picture \u2013 a tap opens it large",curtain_side_both:"both sides",curtain_side_left:"left (seen from the front)",curtain_side_right:"right (seen from the front)",awning_pitch:"Fall (\xB0)",awning_valance:"Valance (fabric edge at the front)",awning_kind_arm:"Folding-arm awning (terrace)",awning_kind_drop:"Drop-arm awning (balcony, window)",awning_kind_vertical:"Vertical screen / ZIP (window, balcony)",awning_kind_pergola:"Pergola / conservatory awning",awning_kind_side:"Side awning (privacy screen)",awning_kind_arm_hint:"The classic over a terrace: folding arms push the fabric out with a slight fall. Depth = projection.",awning_kind_drop_hint:"The arms swing out and down from the wall, the fabric stretches at a slant in front. Depth = arm length, fall = how far the arms go below the horizontal.",awning_kind_vertical_hint:"The fabric runs straight down in side rails to the floor \u2013 in front of a window, a balcony railing or the front of a pergola. Height above the floor = the box's underside.",awning_kind_pergola_hint:"A fixed frame with posts at the front; the fabric runs out on top of its rails. Depth = to the posts, fall = the roof's slope.",awning_kind_side_hint:"A post with the rolled fabric on the left, the fabric pulls out sideways to the right up to the other post. Width = how far it pulls out, height above the floor = the fabric's height.",furn_glow_color:"Fixed colour in 3D",furn_glow_color_hint:"The lamp always glows in this colour in the plan, whatever colour the light reports \u2013 on/off and brightness still come from the light.",furn_only_color:"Glow only while the light shows this colour",furn_only_color_pick:"Colour",furn_only_color_hint:`The lamp only glows while the light shows about this colour \u2013 e.g. yellow for "water" at the washbasin. The same light's other colours stay dark here.`,furn_run_w:"Running from (watts)",furn_run_w_hint:"From how many watts at the power sensor the appliance counts as running and glows (empty: 10 W). For appliances behind a smart plug that draw a few watts on standby, e.g. 100.",furn_sideboard:"Sideboard",furn_table_round:"Round table",furn_bench:"Bench",furn_corner_bench:"Corner bench",furn_bar_stool:"Bar stool",furn_kitchen_wall:"Wall cabinet",furn_kitchen_tall:"Tall unit with oven",furn_island:"Kitchen island",furn_dishwasher:"Dishwasher",furn_bunk_bed:"Bunk bed",furn_dresser:"Chest of drawers",furn_washer:"Washing machine",furn_dryer:"Dryer",furn_office_chair:"Office chair",furn_tall_cabinet:"Tall cabinet",furn_coat_rack:"Coat rack",furn_group_living:"Living",furn_group_dining:"Dining",furn_group_energy:"Energy & solar",wallbox_charging:"charging",wallbox_plugged:"plugged in",furn_soc:"State of charge (%)",furn_export:"Export power (W, separate sensor, optional)",furn_export_hint:"If your meter reports import and export in two sensors (e.g. Growatt, Tibber Pulse), take the import sensor as power above and the export sensor here. A signed sensor does not need this.",furn_charge:"Charging power (W, separate sensor, optional)",furn_charge_hint:"If your battery reports charging and discharging in two sensors (e.g. Anker Solix), take the discharging sensor as power above and the charging sensor here. A signed sensor does not need this.",furn_wallbox_status:"Status (charging, plugged in)",roof_only_note:"\u{1F3E0} Roof: only roof sections and roof windows can be moved here; rooms and furniture are locked.",roof_windows:"Roof windows",roof_window:"Roof window",roof_windows_hint:"Roof windows lie in the roof face, with a blind and contacts like windows. Drag them in the plan, also onto another roof face.",roof_window_tilt:"Tilt contact",roof_window_name:"Name (optional)",roof_window_motor:"Window motor (cover, optional)",roof_window_float:"Show over the room without the roof",roof_window_float_hint:"When the roof fades out as you zoom in on a floor or a room, the window stays where it is over the room \u2013 open, tilted, with its blind. This works over rooms of the floor the roof sits on; where the slope reaches down over a lower floor, the windows stay in the roof. Off: it shows in the roof only.",roof_window_motor_hint:"A window motor (Velux, Roto, Fakro) reports its position as a cover: the sash opens in 3D as far as the motor stands. A contact or tilt contact still works without a motor.",roof_window_hint:"Open, the sash swings out, hinged at the top; tilted, a little; and the frame glows warm; the blind comes down over the glass from the top. In a roof section the window cuts a hole into the slope, so the attic looks out through it.",solar_align_left:"Left",solar_align_center:"Centre",solar_align_right:"Right",compass_n:"north",compass_ne:"north-east",compass_e:"east",compass_se:"south-east",compass_s:"south",compass_sw:"south-west",compass_w:"west",compass_nw:"north-west",furn_meter:"Electricity meter",furn_grid_point:"Grid connection",furn_model:"Model",inverter_std:"Standard (wall unit with display)",inverter_slim:"Slim and tall (light strip)",inverter_hybrid:"Hybrid (round dial, fans)",battery_std:"Tower (stacked modules)",battery_wall:"Wall battery (flat, hanging)",battery_cube:"Compact (balcony battery)",furn_inverter:"Solar inverter",furn_home_battery:"Home battery",furn_wallbox:"Wallbox",furn_group_kitchen:"Kitchen",furn_group_sleeping:"Sleeping",furn_group_bath:"Bath & laundry",furn_group_work:"Work & other",furn_entity:"Device (switch, plug \u2026)",furn_state_entity:"State from (optional)",furn_state_entity2:"Second state (the other half)",furn_state_split:"Halves",furn_state_left_right:"Left / right",furn_state_top_bottom:"Bottom / top (bunk bed)",furn_state_hint:"The item glows while the entity reports on, occupied or home \u2013 a bed with an occupancy mat, an armchair, the sauna. Two entities light the halves: left and right, bottom and top for a bunk bed.",furn_entity_tv:"TV (media player or smart plug)",fix:"Fix",lock_plan:"\u{1F512} Floor plan",start_view:"Start view",start_view_hint:"The 3D view, the card and the kiosk open the house with this view, e.g. from the garden side. Turn, zoom and move the house in the 3D pane on the right until it fits, then remember it.",start_view_card:"If a card should open with a different view, put this line into its YAML configuration.",start_view_set:"Remember the current 3D view as the start",start_view_reset:"Default",start_view_saved:"An own start view is saved.",climate:"Room climate",opening_mark:"Highlight in 3D",opening_mark_open:"When open",opening_mark_closed:"When closed (e.g. WC)",opening_mark_hint:"A highlighted window or door glows warm. \u201CWhen closed\u201D needs a contact; without a sensor nothing is highlighted.",marker_show_always:"Always show",marker_show_active:"Only while active",marker_show_no_power:"Without watts",marker_show_never:"Hide",card_marker_names:"Own names at the markers",card_marker_names_hint:"Every device with an own name shows it small under its marker \u2013 three thermometers in the garden stay apart.",furn_power:"Power sensor (W)",furn_meter_reading:"Meter reading (m\xB3 or litres)",furn_holo:"Hologram over the device (Energy Pro)",furn_holo_hint:"A glass card over the device with its power now, today's consumption and the day curve \u2013 in the house and the floor view. Needs a power sensor.",holo_dev_now:"now",furn_links_hint:"With a power sensor the item shows its watts and gets an energy cable.",furn_links_hint_tv:"The screen glows while the TV is on, in the colour of the app (Netflix, YouTube \u2026); the label shows the app or title.",floor_lights:"{n} lights on",now_title:"What's going on?",now_open_one:"1 window or door open",now_open:"{n} windows and doors open",now_tilted:"tilted",now_unlocked_one:"1 door not locked",now_unlocked:"{n} doors not locked",now_home:"At home",now_away:"Away",now_nobody:"Nobody at home",now_lights_one:"1 light on",now_lights:"{n} lights on",now_battery:"Battery",now_car_away:"away",now_calm:"All is well",now_calm_away:"You are away \u2013 all is well at home",now_calm_detail:"No warning, nothing open, nothing to do.",now_try:"New for phones: \u201CWhat's going on?\u201D \u2013 your home at a glance.",now_try_yes:"Try it",now_try_no:"No thanks",now_lights_off:"All off",now_lock:"Lock",now_check:"House check",now_check_hint:"Before leaving or going to bed: look at everything open or switched on, one after another, and switch it off.",now_next:"Next",now_done:"Done",now_check_done:"House check done",now_check_nothing:"All shut, all off.",now_window_hint:"shut it by hand",now_all_lights_off:"All {n} lights off",nav_now:"Now",nav_rooms:"Rooms",nav_covers:"Blinds",nav_more:"More",nav_whole_floor:"Whole floor",nav_all_up:"All up",nav_all_down:"All down",nav_house:"Whole house",nav_solo:"Room on its own",nav_solo_hint:"A room you jump into stands alone in the picture, without the rest of the house.",nav_off:"Phone view off",now_setting:"Phone view",now_setting_hint:"The house without its header, and a bar at the bottom: Now (what is going on, with \u201CAll off\u201D and the house check), the rooms by floor, the blinds and More.",floor_open:"{n} open",floor_persons:"{n} people",energy_consumption:"Consumption",energy_grid_import:"Grid import",energy_grid_export:"Export",energy_solar:"Solar",energy_battery:"Battery",energy_tariff:"Tariff",energy:"Energy",holo_gas:"Gas",holo_water:"Water",holo_today_short:"today",tool_meter:"Meter",hint_meter:"Tap the spot of the meter",presence:"Presence"},Ge={};function Te(r,e,o={}){let n=Ve[e]??Ge[e]??e;for(let[a,s]of Object.entries(o))n=n.replace(`{${a}}`,String(s));return n}var Ee={height:420,walls:"auto",explode:!0,roof_fade:!0,roof:!0,plain:!1,room_bar:!1,room_bar_favorites:!1,camera_wall:!1,quality:"auto",stats:!1,markers:"important",heatmap:"none",theme:"neon",energy:!0,room_panel:!0,fill:!1,controls:!1,fullscreen_button:!1,room_names:!0,surroundings:!0,floor_stack:"dim",alerts:!0,alert_jump:!1,director:!1,voice:!1,scenes:!0,motion_trail:!1,time_travel:!1,household_card:!0,weather:!0,idle_return:0,controls_hidden:!1,controls_hide_after:0,marker_names:!1,central:!0,pets:!0,ghost:!0,night:"off",idle_orbit:!1,angle_lock:!1,keep_view:!1,controls_side:"left",walk:!0,time_travel_range:"24h",time_travel_speed:360},ae=class extends w{static properties={hass:{attribute:!1},_config:{state:!0},_floors:{state:!0},_templates:{state:!0},_plans:{state:!0},_mapFloor:{state:!0},_showForm:{state:!0},building:{attribute:!1},embedded:{type:Boolean},_tab:{state:!0}};fetchedPlan=null;plansAsked=!1;loading=!1;constructor(){super(),this._config={type:"custom:homeplan3d-card"},this._floors=[],this._templates=[],this._plans=[],this._mapFloor=null,this._showForm=!1,this.building=null,this.embedded=!1,this._tab="for"}setConfig(e){this._config=e}willUpdate(){if(this.building)this.takePlan(this.building);else if(this.hass&&!this.loading&&(!this._floors.length||this.fetchedPlan!==this.planOfCard)){let e=this.planOfCard;this.loading=!0,this.fetchedPlan=e,Ce(this.hass,e).then(o=>{this.loading=!1,this.takePlan(o.building)},()=>this.loading=!1)}this.hass&&!this.building&&!this.plansAsked&&(this.plansAsked=!0,Pe(this.hass).then(e=>this._plans=e.plans))}plan=null;get planOfCard(){let e=this._config?.plan;return e&&e!=="site"?e:b}takePlan(e){e!==this.plan&&(this.plan=e,this._floors=e.floors.map(o=>({id:o.id,name:o.name,rooms:[...o.rooms.map(t=>({id:t.id,name:t.name??t.id,points:t.points,outdoor:!1})),...(o.outdoor??[]).filter(t=>t.area_id&&t.name).map(t=>({id:t.id,name:t.name??t.id,points:t.points,outdoor:!0}))]})),this._templates=(e.card_templates??[]).map(o=>({id:o.id,name:o.name})))}renderTemplate(){let e=this._config.template,o=ne(this.plan,e),t=o?.id??e,n=this.hass?.user?.is_admin?l`<a class="more" href=${`/homeplan3d?settings=cards${this.planOfCard!==b?`&plan=${encodeURIComponent(this.planOfCard)}`:""}${o?`&template=${encodeURIComponent(o.id)}`:""}`} target="_blank" rel="noopener"
          >${this.t(o?"card_template_open":"card_template_make")} ↗</a
        >`:d;return l`<h3>${this.t("card_template")}</h3>
      <label class="field wide">
        <select @change=${a=>this.pickTemplate(a.target.value||void 0)}>
          <option value="" ?selected=${!e}>${this.t("card_template_none")}</option>
          ${this._templates.map(a=>l`<option value=${a.id} ?selected=${a.id===t}>${a.name}</option>`)}
          ${e&&!o?l`<option value=${e} selected>${e}</option>`:d}
        </select>
      </label>
      <p class="hint">${this.t(e?"card_template_on":"card_template_hint")}</p>
      ${e&&this.ownOptions().length?l`<div class="own">
            ${this.t("card_template_own",{list:this.ownOptions().join(", ")})}
            <button
              class="more"
              @click=${()=>this.emit({type:this._config.type,template:e,...Object.fromEntries(F.filter(a=>this._config[a]!==void 0).map(a=>[a,this._config[a]]))})}
            >
              ${this.t("card_template_own_clear")}
            </button>
          </div>`:d}
      <div class="links">
        ${n}

      </div>`}ownOptions(){return Object.keys(this._config).filter(e=>e!=="type"&&e!=="template"&&!F.includes(e))}pickTemplate(e){this._showForm=!1;let o=Object.fromEntries(F.filter(t=>this._config[t]!==void 0).map(t=>[t,this._config[t]]));this.emit(e?{type:this._config.type,template:e,...o}:{type:this._config.type,...o})}emit(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}get templateOptions(){return this.embedded?{}:ne(this.plan,this._config.template)?.config??{}}t(e,o){return Te(this.hass,e,o)}get value(){return{...Ee,...this.templateOptions,...this._config}}set(e,o){let t={...this._config},n=this.templateOptions,a=e in n?n[e]:Ee[e];o===void 0||o===""||a===o?delete t[e]:t[e]=o,this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}select(e,o,t,n){return l`<label class="field"
      >${this.t(o)}
      <select @change=${a=>this.set(e,a.target.value)}>
        ${t.map(([a,s])=>l`<option value=${a} ?selected=${a===n}>${this.t(s)}</option>`)}
      </select>
    </label>`}styleSelect(e,o,t,n){return Se((this.building??this.plan)?.settings.styles_custom),l`<label class="field"
      >${this.t(o)}
      <select @change=${a=>this.set(e,a.target.value||void 0)}>
        ${Ae(a=>this.t(a),t,n)}
      </select>
    </label>`}toggle(e,o,t){let n=this.value[e];return l`<label class="toggle">
      <input type="checkbox" .checked=${n} @change=${a=>this.set(e,a.target.checked)} />
      <span>${this.t(o)}${t?l`<small>${this.t(t)}</small>`:d}</span>
    </label>`}renderStartRoom(){let e=this.value,o=e.floor?this._floors.filter(n=>n.id===e.floor):this._floors,t=o.flatMap(n=>n.rooms.map(a=>({id:a.id,name:o.length>1?`${n.name} \xB7 ${a.name}`:a.name})));return l`<label class="field wide"
      >${this.t("card_room")}
      <select @change=${n=>this.set("room",n.target.value||void 0)}>
        <option value="" ?selected=${!e.room}>${this.t("card_room_none")}</option>
        ${t.map(n=>l`<option value=${n.id} ?selected=${n.id===e.room}>${n.name}</option>`)}
        ${e.room&&!t.some(n=>n.id===e.room)?l`<option value=${e.room} selected>${e.room}</option>`:d}
      </select>
    </label>`}renderPlan(){if(this._plans.length<2)return d;let e=this._config.plan??b,o=t=>t.name||(t.id===b?this.t("plan_main"):t.id);return l`<label class="field wide"
      >${this.t("card_plan")}
      <select
        @change=${t=>{let n=t.target.value,a={...this._config};delete a.rooms,delete a.room,delete a.floor,delete a.template,n===b?delete a.plan:a.plan=n,this._config=a,this._floors=[],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:a},bubbles:!0,composed:!0}))}}
      >
        ${this._plans.map(t=>l`<option value=${t.id} ?selected=${t.id===e}>${t.icon||"\u{1F3E0}"} ${o(t)}</option>`)}
        ${this._plans.some(t=>t.site?.on)?l`<option value="site" ?selected=${e==="site"}>🏘 ${this.t("plan_site")}</option>`:d}
      </select>
    </label>`}renderRooms(){let e=this.value,o=new Set(this._config.rooms??[]),t=h=>{let p=o.has(h)?[...o].filter(m=>m!==h):[...o,h];this.set("rooms",p.length?p:void 0)},n=this._floors.find(h=>h.id===this._mapFloor)??this._floors.find(h=>h.rooms.some(p=>o.has(p.id)))??this._floors[0],a=n?.rooms.flatMap(h=>h.points)??[],s=a.map(h=>h[0]),i=a.map(h=>h[1]),c=.6,_=a.length?[Math.min(...s)-c,Math.min(...i)-c,Math.max(...s)-Math.min(...s)+2*c,Math.max(...i)-Math.min(...i)+2*c]:[0,0,1,1],u=h=>[h.reduce((p,m)=>p+m[0],0)/h.length,h.reduce((p,m)=>p+m[1],0)/h.length];return l`<div class="field wide rooms">
      <span>${this.t("card_rooms")}</span>
      <small>${this.t("card_rooms_hint")}</small>
      ${this._floors.length>1?l`<div class="tabs">
            ${this._floors.map(h=>l`<button type="button" aria-pressed=${h.id===n?.id} @click=${()=>this._mapFloor=h.id}>${h.name}</button>`)}
          </div>`:d}
      ${n?l`<svg class="map" viewBox=${_.join(" ")} role="group" aria-label=${this.t("card_rooms")}>
            ${n.rooms.filter(h=>h.points.length>=3).map(h=>{let[p,m]=u(h.points),S=o.has(h.id);return ve`<g class=${`room ${S?"on":""} ${h.outdoor?"out":""}`} @click=${()=>t(h.id)}>
                  <polygon points=${h.points.map(He=>He.join(",")).join(" ")}></polygon>
                  <text x=${p} y=${m} font-size=${Math.max(_[2],_[3])/32}>${h.name}</text>
                </g>`})}
          </svg>`:d}
      <div class="checks">
        ${this._floors.flatMap(h=>h.rooms.map(p=>l`<label class="check"
              ><input type="checkbox" .checked=${o.has(p.id)} @change=${()=>t(p.id)} />${this._floors.length>1?`${h.name} \xB7 `:""}${p.name}</label
            >`))}
      </div>
      ${o.size?l`<label class="toggle">
            <input type="checkbox" .checked=${e.rooms_lock===!1} @change=${h=>this.set("rooms_lock",h.target.checked?!1:void 0)} />
            <span>${this.t("card_rooms_leave")}<small>${this.t("card_rooms_leave_hint")}</small></span>
          </label>`:d}
    </div>`}renderTimeTravel(){let e=this.value,o=[[60,this.t("tt_speed",{s:"1 min"})],[360,this.t("tt_speed",{s:"10 s"})],[900,this.t("tt_speed",{s:"4 s"})],[3600,this.t("tt_speed",{s:"1 s"})],...e.time_travel_range==="7d"?[[14400,this.t("card_tt_speed_day")]]:[]];return l`<div class="grid">
      ${this.select("time_travel_range","card_tt_range",[["24h","card_tt_range_24h"],["7d","card_tt_range_7d"]],e.time_travel_range)}
      <label class="field"
        >${this.t("card_tt_speed")}
        <select @change=${t=>this.set("time_travel_speed",Number(t.target.value))}>
          ${o.map(([t,n])=>l`<option value=${t} ?selected=${t===e.time_travel_speed}>${n}</option>`)}
        </select>
      </label>
    </div>`}renderPurpose(){let e=this.value,o=e.phone===!0,t=new Set(this._config.phone_hide??this.templateOptions.phone_hide??[]),n=(a,s,i)=>l`<label class="toggle">
        <input
          type="checkbox"
          .checked=${!t.has(a)}
          @change=${c=>{let _=new Set(t);c.target.checked?_.delete(a):_.add(a),this.set("phone_hide",_.size?["rooms","covers","favorites"].filter(u=>_.has(u)):void 0)}}
        />
        <span>${this.t(s)}<small>${this.t(i)}</small></span>
      </label>`;return l`<h3>${this.t("card_for")}</h3>
      <div class="purpose">
        <button type="button" aria-pressed=${!o} @click=${()=>this.set("phone",void 0)}>🖥 ${this.t("card_for_large")}</button>
        <button
          type="button"
          aria-pressed=${o}
          @click=${()=>{this.set("phone",!0),this.set("fill",!0)}}
        >
          📱 ${this.t("card_for_phone")}
        </button>
      </div>
      <p class="hint">${this.t(o?"card_for_phone_hint":"card_for_large_hint")}</p>
      ${o?l`<h3>${this.t("card_section_phone")}</h3>
            ${n("rooms","card_phone_rooms","card_phone_rooms_hint")} ${n("covers","card_phone_covers","card_phone_covers_hint")}
            ${n("favorites","card_phone_favorites","card_phone_favorites_hint")}
            ${[0,1].map(a=>this.renderPlace(a))}
            <p class="hint">${this.t("card_phone_place_hint")}</p>
            <label class="toggle">
              <input type="checkbox" .checked=${e.phone_solo===!0} @change=${a=>this.set("phone_solo",a.target.checked||void 0)} />
              <span>${this.t("nav_solo")}<small>${this.t("card_phone_solo_hint")}</small></span>
            </label>
            <label class="toggle">
              <input type="checkbox" .checked=${e.phone_start==="now"} @change=${a=>this.set("phone_start",a.target.checked?"now":void 0)} />
              <span>${this.t("card_phone_start_now")}<small>${this.t("card_phone_start_now_hint")}</small></span>
            </label>`:d}`}renderPlace(e){let o=[...this._config.phone_places??this.templateOptions.phone_places??[]],t=o[e];if(e>0&&!o[e-1])return d;let n=s=>{s?o[e]=s:o.splice(e,1),this.set("phone_places",o.length?o:void 0)},a=Object.keys(this.hass?.states??{}).filter(s=>/^(scene|script)\./.test(s)).sort();return l`<div class="grid place">
      <label class="field"
        >${this.t("card_phone_place",{n:e+1})}
        <select
          @change=${s=>{let i=s.target.value;n(i?{kind:i,name:t?.name,icon:t?.icon,...i==="action"?{entity:a[0]}:i==="link"?{path:"/lovelace/0"}:{}}:null)}}
        >
          <option value="" ?selected=${!t}>${this.t("card_phone_place_none")}</option>
          ${["lights","climate","action","link"].map(s=>l`<option value=${s} ?selected=${t?.kind===s}>${this.t(`card_phone_place_${s}`)}</option>`)}
        </select>
      </label>
      ${t?l`<label class="field"
              >${this.t("card_phone_place_name")}
              <input type="text" maxlength="24" .value=${t.name??""} @change=${s=>n({...t,name:s.target.value.trim()||void 0})} />
            </label>
            <label class="field"
              >${this.t("card_phone_place_icon")}
              <input type="text" maxlength="4" placeholder="💡" .value=${t.icon??""} @change=${s=>n({...t,icon:s.target.value.trim()||void 0})} />
            </label>
            ${t.kind==="action"?l`<label class="field"
                  >${this.t("card_phone_place_entity")}
                  <select @change=${s=>n({...t,entity:s.target.value})}>
                    ${t.entity&&!a.includes(t.entity)?l`<option value=${t.entity} selected>${t.entity}</option>`:d}
                    ${a.map(s=>l`<option value=${s} ?selected=${s===t.entity}>${this.hass?.states[s]?.attributes.friendly_name??s}</option>`)}
                  </select>
                </label>`:t.kind==="link"?l`<label class="field"
                    >${this.t("card_phone_place_path")}
                    <input
                      type="text"
                      placeholder="/lovelace/energie"
                      .value=${t.path??""}
                      @change=${s=>{let i=s.target.value.trim();/^\/[^/]/.test(i)&&n({...t,path:i})}}
                    />
                  </label>`:d}`:d}
    </div>`}renderThumbsToggle(){let e=!this._config.floor,o=this._config.floor_thumbs??e;return l`<label class="toggle">
      <input
        type="checkbox"
        .checked=${o}
        @change=${t=>{let n=t.target.checked,a={...this._config};n===e?delete a.floor_thumbs:a.floor_thumbs=n,this._config=a,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:a},bubbles:!0,composed:!0}))}}
      />
      <span>${this.t("card_floor_thumbs")}<small>${this.t(this._config.floor?"card_floor_thumbs_hint_start":"card_floor_thumbs_hint")}</small></span>
    </label>`}renderControls(){let e=this._config.controls,o=!!e&&(e===!0||e.length>0),t=e===!0?[...O]:Array.isArray(e)?e:[],n=i=>this.set("controls",i.length===O.length?!0:i.length?i:void 0),a=this.value,s=[0,10,30,60,120];return l`<label class="toggle">
        <input type="checkbox" .checked=${o} @change=${i=>this.set("controls",i.target.checked?!0:void 0)} />
        <span>${this.t("card_controls")}<small>${this.t("card_controls_hint")}</small></span>
      </label>
      <label class="toggle">
        <input type="checkbox" .checked=${a.central} @change=${i=>this.set("central",i.target.checked?void 0:!1)} />
        <span>${this.t("card_central")}<small>${this.t("card_central_hint")}</small></span>
      </label>
      <label class="toggle">
        <input type="checkbox" .checked=${a.pets} @change=${i=>this.set("pets",i.target.checked?void 0:!1)} />
        <span>${this.t("card_pets")}<small>${this.t("card_pets_hint")}</small></span>
      </label>
      <label class="toggle">
        <input type="checkbox" .checked=${a.ghost} @change=${i=>this.set("ghost",i.target.checked?void 0:!1)} />
        <span>${this.t("card_ghost")}<small>${this.t("card_ghost_hint")}</small></span>
      </label>
      <label class="toggle">
        <input type="checkbox" .checked=${a.marker_names} @change=${i=>this.set("marker_names",i.target.checked?!0:void 0)} />
        <span>${this.t("card_marker_names")}<small>${this.t("card_marker_names_hint")}</small></span>
      </label>
      <label class="toggle">
        <input type="checkbox" .checked=${a.controls_hidden} @change=${i=>this.set("controls_hidden",i.target.checked?!0:void 0)} />
        <span>${this.t("card_controls_hidden")}<small>${this.t("card_controls_hidden_hint")}</small></span>
      </label>
      <label class="field"
        >${this.t("card_controls_hide_after")}
        <select @change=${i=>this.set("controls_hide_after",Number(i.target.value)||void 0)}>
          ${s.map(i=>l`<option value=${i} ?selected=${a.controls_hide_after===i}>${i?this.t("card_hide_after_s",{n:i}):this.t("card_idle_off")}</option>`)}
        </select>
      </label>
      ${o?l`<div class="sub">
            ${O.map(i=>l`<label class="chip">
                <input
                  type="checkbox"
                  .checked=${t.includes(i)}
                  @change=${c=>n(c.target.checked?O.filter(_=>_===i||t.includes(_)):t.filter(_=>_!==i))}
                />
                ${this.t(`card_control_${i}`)}
              </label>`)}
          </div>`:d}`}renderKiosk(){let e=this.value,o=e.night==="off"||e.night==="sun"?e.night:"time",t=[0,1,2,5,10];return l`<h3>${this.t("card_section_kiosk")}</h3>
      <div class="grid">
        <label class="field"
          >${this.t("card_idle_return")}
          <select @change=${n=>this.set("idle_return",Number(n.target.value)||void 0)}>
            ${t.map(n=>l`<option value=${n*60} ?selected=${e.idle_return===n*60}>${n?this.t("card_idle_min",{n}):this.t("card_idle_off")}</option>`)}
          </select>
        </label>
        <label class="field"
          >${this.t("card_night")}
          <select @change=${n=>this.set("night",{off:void 0,sun:"sun",time:"22:00-06:00"}[n.target.value])}>
            <option value="off" ?selected=${o==="off"}>${this.t("card_night_off")}</option>
            <option value="sun" ?selected=${o==="sun"}>${this.t("card_night_sun")}</option>
            <option value="time" ?selected=${o==="time"}>${this.t("card_night_time")}</option>
          </select>
        </label>
        ${o==="time"?l`<label class="field wide"
              >${this.t("card_night_range")}
              <input
                type="text"
                pattern="\\d{1,2}:\\d{2}-\\d{1,2}:\\d{2}"
                placeholder="22:00-06:00"
                .value=${e.night}
                @change=${n=>this.set("night",n.target.value.trim()||void 0)}
              />
            </label>`:d}
      </div>
      <p class="hint">${this.t("card_idle_hint")}</p>
      ${this.toggle("idle_orbit","card_idle_orbit","card_idle_orbit_hint")}
      <div class="grid">
        <label class="field wide"
          >${this.t("card_dashboard")}
          <input type="text" placeholder="/lovelace/home" .value=${e.dashboard??""} @change=${n=>this.set("dashboard",n.target.value.trim()||void 0)} />
        </label>
        <label class="field wide"
          >${this.t("card_dashboard_label")}
          <input type="text" .value=${e.dashboard_label??""} @change=${n=>this.set("dashboard_label",n.target.value.trim()||void 0)} />
        </label>
      </div>
      <p class="hint">${this.t("card_dashboard_hint")}</p>`}renderFeatures(){let e=this.value,o=Object.keys(this.hass?.states??{}).filter(t=>t.startsWith("weather.")).sort();return l`<h3>${this.t("card_section_features")}</h3>
      ${this.toggle("alerts","card_alerts","card_alerts_hint")} ${this.toggle("alert_jump","card_alert_jump","card_alert_jump_hint")}
      ${this.toggle("director","card_director","card_director_hint")}
      ${this.toggle("voice","card_voice","card_voice_hint")}
      <div class="grid">
        <label class="field wide"
          >${this.t("screen_name")}
          <input type="text" placeholder=${this.t("screen_name_placeholder")} .value=${e.screen??""} @change=${t=>this.set("screen",t.target.value.trim()||void 0)} />
        </label>
      </div>
      <p class="hint">${this.t("screen_name_hint")}</p>
      <div class="grid">
        <label class="field wide"
          >${this.t("card_voice_area")}
          <select @change=${t=>this.set("voice_area",t.target.value||void 0)}>
            <option value="" ?selected=${!e.voice_area}>${this.t("card_voice_area_none")}</option>
            ${Object.values(this.hass?.areas??{}).sort((t,n)=>t.name.localeCompare(n.name)).map(t=>l`<option value=${t.area_id} ?selected=${t.area_id===e.voice_area}>${t.name}</option>`)}
            ${e.voice_area&&!this.hass?.areas?.[e.voice_area]?l`<option value=${e.voice_area} selected>${e.voice_area}</option>`:d}
          </select></label
        >
      </div>
      <p class="hint">${this.t("card_voice_area_hint")}</p>
      ${this.toggle("scenes","card_scenes","card_scenes_hint")}
      ${this.toggle("motion_trail","card_motion_trail","card_motion_trail_hint")} ${this.toggle("camera_wall","card_camera_wall","card_camera_wall_hint")}
      ${this.toggle("time_travel","card_time_travel","card_time_travel_hint")}
      ${e.time_travel?this.renderTimeTravel():d}
      ${this.toggle("household_card","card_household","card_household_hint")}
      ${this.toggle("weather","card_weather","card_weather_hint")}
      ${e.weather!==!1?l`<div class="grid">
            <label class="field wide"
              >${this.t("weather_entity")}
              <select @change=${t=>this.set("weather_entity",t.target.value||void 0)}>
                <option value="" ?selected=${!e.weather_entity}>${this.t("card_weather_plan")}</option>
                ${o.map(t=>l`<option value=${t} ?selected=${t===e.weather_entity}>${String(this.hass?.states[t]?.attributes.friendly_name??t)}</option>`)}
              </select>
            </label>
          </div>`:d}
      <p class="hint">${this.t("card_pro_hint")}</p>`}render(){let e=this.value,o=e.flows===void 0?"switch":e.flows?"on":"off",t=e.holograms===void 0?"switch":e.holograms?"on":"off";if(!this.embedded&&e.template)return l`${this.renderPlan()}${this.renderTemplate()}`;let n=[["for","card_tab_for"],["view","card_section_view"],["show","card_section_show"],["features","card_section_features"],["kiosk","card_section_kiosk"]].filter(([i])=>i!=="kiosk"||!e.phone),a=n.some(([i])=>i===this._tab)?this._tab:"for",s=i=>!this.embedded||a===i;return l`
      ${this.embedded?d:l`${this.renderPlan()}${this.renderTemplate()}`}
      ${this.embedded?l`<div class="tabs" role="tablist">
            ${n.map(([i,c])=>l`<button type="button" role="tab" aria-selected=${a===i} @click=${()=>this._tab=i}>${this.t(c)}</button>`)}
          </div>`:d}
      <section ?hidden=${!s("for")}>${this.renderPurpose()}</section>
      <section ?hidden=${!s("view")}>
      <h3>${this.t("card_section_view")}</h3>
      <div class="grid">
        <label class="field wide"
          >${this.t("card_floor")}
          <select @change=${i=>this.set("floor",i.target.value||void 0)}>
            <option value="" ?selected=${!e.floor}>${this.t("card_floor_house")}</option>
            ${this._floors.map(i=>l`<option value=${i.id} ?selected=${i.id===e.floor}>${i.name}</option>`)}
            ${e.floor&&!this._floors.some(i=>i.id===e.floor)?l`<option value=${e.floor} selected>${e.floor}</option>`:d}
          </select>
        </label>
        ${this.renderStartRoom()}
        ${this.renderRooms()}
        <label class="field"
          >${this.t("card_size")}
          <select @change=${i=>this.set("fill",i.target.value==="fill")}>
            <option value="fixed" ?selected=${!e.fill}>${this.t("card_size_fixed")}</option>
            <option value="fill" ?selected=${e.fill}>${this.t("card_size_fill")}</option>
          </select>
        </label>
        <label class="field" ?hidden=${e.fill}
          >${this.t("card_height")}
          <input
            type="number"
            min="150"
            max="2000"
            step="10"
            .value=${String(e.height)}
            @change=${i=>{let c=Math.round(Number(i.target.value));c>100&&this.set("height",c)}}
          />
        </label>
        ${this.styleSelect("theme","style",e.theme??"neon",{auto:!0,house:!0})}
        ${e.theme&&e.theme!=="house"&&e.theme!=="auto"?l`${this.styleSelect("theme_evening","theme_evening",this._config.theme_evening??"",{none:!0})}
              ${this.styleSelect("theme_night","theme_night",this._config.theme_night??"",{none:!0})}
              <p class="hint">${this.t("theme_schedule_hint")}</p>`:d}
        <label class="field"
          >${this.t("style_entity")}
          <input
            type="text"
            placeholder="input_select.neonplan_stil"
            .value=${this._config.style_entity??""}
            @change=${i=>this.set("style_entity",i.target.value.trim()||void 0)}
          />
        </label>
        ${this.styleSelect("zoom_style","zoom_style",this._config.zoom_style??"",{none:!0})}
        ${this._config.zoom_style?l`<label class="field" title=${this.t("zoom_late_hint")}
                >${this.t("zoom_late_early")} … ${this.t("zoom_late_late")}
                <input type="range" min="0" max="100" step="10" .value=${String(this._config.zoom_late??50)}
                  @change=${i=>{let c=Number(i.target.value);this.set("zoom_late",c===50?void 0:c)}} />
              </label>
              <label class="field" title=${this.t("zoom_scope_hint")}
                >${this.t("zoom_scope_all")} / ${this.t("zoom_scope_room")}
                <select @change=${i=>this.set("zoom_scope",i.target.value==="room"?"room":void 0)}>
                  <option value="all" ?selected=${this._config.zoom_scope!=="room"}>${this.t("zoom_scope_all")}</option>
                  <option value="room" ?selected=${this._config.zoom_scope==="room"}>${this.t("zoom_scope_room")}</option>
                </select>
              </label>
              <p class="hint">${this.t("zoom_style_hint")}</p>`:d}
        ${this.select("clock","clock",[["off","clock_off"],["tl","clock_tl"],["tr","clock_tr"],["bl","clock_bl"],["br","clock_br"]],e.clock??"off")}
        <label class="field"
          >${this.t("accent")}
          <input type="color" .value=${this._config.accent??"#37e0ff"} @input=${i=>this.set("accent",i.target.value)} />
          ${this._config.accent?l`<button type="button" class="link" @click=${()=>this.set("accent",void 0)}>${this.t("accent_reset")}</button>`:d}
        </label>
        ${this.select("walls","card_walls",[["auto","walls_auto"],["cut","walls_cut"]],e.walls)}
        ${this.select("quality","quality",[["auto","quality_auto"],["low","quality_low"],["high","quality_high"]],e.quality)}
        ${this.select("floor_stack","card_floor_stack",[["dim","floor_stack_dim"],["stacked","floor_stack_stacked"],["single","floor_stack_single"]],e.floor_stack)}
      </div>
      ${e.fill?l`<p class="hint">${this.t("card_fill_hint")}</p>`:d}
      <p class="hint">${this.t("card_quality_hint")}</p>
      </section>
      <section ?hidden=${!s("show")}>
      <h3>${this.t("card_section_show")}</h3>
      <div class="grid">
        ${this.select("markers","markers",[["none","markers_none"],["room","markers_room"],["important","markers_important"],["all","markers_all"]],e.markers)}
        ${this.select("marker_size","pin_size",[["small","pin_size_small"],["normal","pin_size_normal"],["large","pin_size_large"]],e.marker_size??"normal")}
        ${this.select("heatmap","heatmap",[["none","heat_off"],["temperature","heat_temperature"],["humidity","heat_humidity"],["co2","heat_co2"],["values","heat_values"]],e.heatmap)}
        <label class="field wide"
          >${this.t("flows")}
          <select @change=${i=>{let c=i.target.value;this.set("flows",c==="switch"?void 0:c==="on")}}>
            <option value="switch" ?selected=${o==="switch"}>${this.t("card_flows_switch")}</option>
            <option value="on" ?selected=${o==="on"}>${this.t("card_flows_on")}</option>
            <option value="off" ?selected=${o==="off"}>${this.t("card_flows_off")}</option>
          </select>
        </label>
        <label class="field wide"
          >${this.t("holos")}
          <select @change=${i=>{let c=i.target.value;this.set("holograms",c==="switch"?void 0:c==="on")}}>
            <option value="switch" ?selected=${t==="switch"}>${this.t("card_flows_switch")}</option>
            <option value="on" ?selected=${t==="on"}>${this.t("card_flows_on")}</option>
            <option value="off" ?selected=${t==="off"}>${this.t("card_flows_off")}</option>
          </select>
        </label>
      </div>
      ${e.phone?d:this.renderControls()}
      ${this.toggle("angle_lock","angle_lock","angle_lock_hint")} ${this.toggle("keep_view","keep_view","keep_view_hint")}
      ${e.phone?d:l`${this.toggle("walk","card_walk","card_walk_hint")}
            <div class="grid">${this.select("controls_side","controls_side",[["left","controls_left"],["right","controls_right"]],e.controls_side)}</div>
            ${this.renderThumbsToggle()}`}
      ${this.toggle("room_names","card_room_names")}
      ${(this.building??this.plan)?.settings.surroundings?this.toggle("surroundings","card_surroundings","card_surroundings_hint"):d}
      ${this.toggle("energy","card_energy")} ${this.toggle("room_panel","card_room_panel","card_room_panel_hint")}
      ${this.toggle("fullscreen_button","card_fullscreen_button","card_fullscreen_button_hint")}
      ${this.toggle("explode","card_explode")} ${this.toggle("roof","card_roof","card_roof_hint")} ${this.toggle("roof_fade","card_roof_fade","card_roof_fade_hint")} ${this.toggle("plain","card_plain","plain_hint")}
      ${this.toggle("room_bar","card_room_bar","room_bar_hint")}
      ${this.value.room_bar?this.toggle("room_bar_favorites","card_room_bar_favorites","card_room_bar_favorites_hint"):d} ${this.toggle("stats","card_stats","card_stats_hint")}
      </section>
      <section ?hidden=${!s("features")}>${this.renderFeatures()}</section>
      <section ?hidden=${!s("kiosk")}>${this.renderKiosk()}</section>
    `}static styles=I`
    :host {
      display: block;
      color: var(--primary-text-color);
    }
    h3 {
      margin: 18px 0 8px;
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--secondary-text-color);
    }
    h3:first-child {
      margin-top: 0;
    }
    /* only these rooms: the little map of a floor to tap them on, and the same as a list */
    .rooms {
      display: grid;
      gap: 6px;
    }
    .rooms small {
      color: var(--secondary-text-color);
      font-size: 12px;
    }
    .tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
    .tabs button {
      padding: 4px 10px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.4));
      border-radius: 14px;
      background: transparent;
      color: var(--primary-text-color);
      font: inherit;
      font-size: 13px;
      cursor: pointer;
    }
    .tabs button[aria-pressed="true"] {
      border-color: var(--primary-color);
      color: var(--primary-color);
    }
    .map {
      width: 100%;
      max-height: 260px;
      background: rgba(127, 127, 127, 0.08);
      border-radius: 8px;
    }
    .map .room {
      cursor: pointer;
    }
    .map polygon {
      fill: rgba(127, 127, 127, 0.18);
      stroke: var(--secondary-text-color);
      stroke-width: 0.05;
    }
    .map .out polygon {
      stroke-dasharray: 0.2 0.12;
    }
    .map .on polygon {
      fill: var(--primary-color);
      fill-opacity: 0.45;
      stroke: var(--primary-color);
    }
    .map text {
      fill: var(--primary-text-color);
      text-anchor: middle;
      dominant-baseline: middle;
      pointer-events: none;
    }
    .checks {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 14px;
      font-size: 13px;
    }
    .check {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .own {
      margin: 8px 0 0;
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid rgba(255, 170, 60, 0.6);
      font-size: 13px;
    }
    .links {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    a.more {
      display: inline-block;
      text-decoration: none;
    }
    .more {
      margin: 8px 0 0;
      padding: 8px 12px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.4));
      border-radius: 8px;
      background: transparent;
      color: var(--primary-color);
      font: inherit;
      font-size: 13px;
      cursor: pointer;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px 12px;
    }
    [hidden] {
      display: none;
    }
    .wide {
      grid-column: 1 / -1;
    }
    .field {
      display: grid;
      gap: 4px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    select,
    input[type="number"],
    input[type="text"] {
      box-sizing: border-box;
      width: 100%;
      min-height: 40px;
      padding: 8px 10px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.4));
      border-radius: 8px;
      background: var(--card-background-color, transparent);
      color: var(--primary-text-color);
      font: inherit;
      font-size: 14px;
    }
    select:hover,
    input[type="number"]:hover,
    input[type="text"]:hover {
      border-color: var(--primary-color);
    }
    select:focus,
    input[type="number"]:focus,
    input[type="text"]:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary-color) 30%, transparent);
    }
    /* the open list of a choice in the same colours as the field (else the browser's grey) */
    option,
    optgroup {
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
    }
    /* inside NeonPlan's editor (card templates): neon headings, switches as rows that light up when on */
    :host([embedded]) h3 {
      color: var(--primary-color);
    }
    :host([embedded]) .toggle {
      padding: 8px 10px;
      margin: 2px 0;
      border-radius: 10px;
      border: 1px solid transparent;
    }
    :host([embedded]) .toggle:hover {
      background: var(--fp3d-field-hover, rgba(127, 127, 127, 0.08));
    }
    :host([embedded]) .toggle:has(input:checked) {
      border-color: color-mix(in srgb, var(--primary-color) 45%, transparent);
      background: color-mix(in srgb, var(--primary-color) 8%, transparent);
    }
    .toggle {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 8px 0;
      font-size: 14px;
      cursor: pointer;
    }
    .place {
      margin: 8px 0;
      padding: 10px;
      border: 1px dashed var(--divider-color, #8884);
      border-radius: 10px;
    }
    .tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-bottom: 14px;
      border-bottom: 1px solid var(--divider-color, #8884);
    }
    .tabs button {
      padding: 10px 14px;
      border: none;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
      background: none;
      color: var(--secondary-text-color);
      font: inherit;
      font-size: 14px;
      cursor: pointer;
    }
    .tabs button[aria-selected="true"] {
      color: var(--primary-text-color);
      border-bottom-color: var(--primary-color);
      font-weight: 600;
    }
    :host([embedded]) section > h3:first-child {
      display: none;
    }
    .purpose {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .purpose button {
      flex: 1 1 160px;
      padding: 12px 10px;
      border: 1px solid var(--divider-color, #8884);
      border-radius: 10px;
      background: none;
      color: inherit;
      font: inherit;
      font-size: 14px;
      cursor: pointer;
    }
    .purpose button[aria-pressed="true"] {
      border-color: var(--primary-color);
      box-shadow: inset 0 0 0 1px var(--primary-color);
      font-weight: 600;
    }
    .toggle input {
      flex: none;
      width: 18px;
      height: 18px;
      margin: 1px 0 0;
      accent-color: var(--primary-color);
    }
    .sub {
      display: flex;
      flex-wrap: wrap;
      gap: 6px 14px;
      margin: -2px 0 6px 28px;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      cursor: pointer;
    }
    .chip input {
      width: 16px;
      height: 16px;
      margin: 0;
      accent-color: var(--primary-color);
    }
    .toggle small,
    .hint {
      display: block;
      margin: 2px 0 0;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    @media (max-width: 450px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }
  `};customElements.get("homeplan3d-card-editor")||customElements.define("homeplan3d-card-editor",ae);export{ae as Floorplan3dCardEditor};

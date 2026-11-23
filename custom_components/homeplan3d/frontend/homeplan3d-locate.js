var oe=globalThis,ie=oe.ShadowRoot&&(oe.ShadyCSS===void 0||oe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ce=Symbol(),Ce=new WeakMap,K=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==ce)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(ie&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=Ce.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&Ce.set(t,e))}return e}toString(){return this.cssText}},Le=i=>new K(typeof i=="string"?i:i+"",void 0,ce),ue=(i,...e)=>{let t=i.length===1?i[0]:e.reduce((n,r,o)=>n+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[o+1],i[0]);return new K(t,i,ce)},Te=(i,e)=>{if(ie)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let n=document.createElement("style"),r=oe.litNonce;r!==void 0&&n.setAttribute("nonce",r),n.textContent=t.cssText,i.appendChild(n)}},de=ie?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(let n of e.cssRules)t+=n.cssText;return Le(t)})(i):i;var{is:ct,defineProperty:ut,getOwnPropertyDescriptor:dt,getOwnPropertyNames:pt,getOwnPropertySymbols:mt,getPrototypeOf:ht}=Object,se=globalThis,He=se.trustedTypes,gt=He?He.emptyScript:"",ft=se.reactiveElementPolyfillSupport,q=(i,e)=>i,pe={toAttribute(i,e){switch(e){case Boolean:i=i?gt:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},Fe=(i,e)=>!ct(i,e),Ne={attribute:!0,type:String,converter:pe,reflect:!1,useDefault:!1,hasChanged:Fe};Symbol.metadata??=Symbol("metadata"),se.litPropertyMetadata??=new WeakMap;var L=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Ne){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&ut(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:o}=dt(this.prototype,e)??{get(){return this[t]},set(s){this[t]=s}};return{get:r,set(s){let u=r?.call(this);o?.call(this,s),this.requestUpdate(e,u,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ne}static _$Ei(){if(this.hasOwnProperty(q("elementProperties")))return;let e=ht(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(q("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(q("properties"))){let t=this.properties,n=[...pt(t),...mt(t)];for(let r of n)this.createProperty(r,t[r])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[n,r]of t)this.elementProperties.set(n,r)}this._$Eh=new Map;for(let[t,n]of this.elementProperties){let r=this._$Eu(t,n);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let r of n)t.unshift(de(r))}else e!==void 0&&t.push(de(e));return t}static _$Eu(e,t){let n=t.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Te(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&n.reflect===!0){let o=(n.converter?.toAttribute!==void 0?n.converter:pe).toAttribute(t,n.type);this._$Em=e,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let o=n.getPropertyOptions(r),s=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:pe;this._$Em=r;let u=s.fromAttribute(t,o.type);this[r]=u??this._$Ej?.get(r)??u,this._$Em=null}}requestUpdate(e,t,n,r=!1,o){if(e!==void 0){let s=this.constructor;if(r===!1&&(o=this[e]),n??=s.getPropertyOptions(e),!((n.hasChanged??Fe)(o,t)||n.useDefault&&n.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,n))))return;this.C(e,t,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:o},s){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),o!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}let n=this.constructor.elementProperties;if(n.size>0)for(let[r,o]of n){let{wrapped:s}=o,u=this[r];s!==!0||this._$AL.has(r)||u===void 0||this.C(r,void 0,o,u)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(t)):this._$EM()}catch(n){throw e=!1,this._$EM(),n}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};L.elementStyles=[],L.shadowRootOptions={mode:"open"},L[q("elementProperties")]=new Map,L[q("finalized")]=new Map,ft?.({ReactiveElement:L}),(se.reactiveElementVersions??=[]).push("2.1.2");var ye=globalThis,ze=i=>i,ae=ye.trustedTypes,We=ae?ae.createPolicy("lit-html",{createHTML:i=>i}):void 0,je="$lit$",H=`lit$${Math.random().toFixed(9).slice(2)}$`,Ge="?"+H,bt=`<${Ge}>`,D=document,Z=()=>D.createComment(""),J=i=>i===null||typeof i!="object"&&typeof i!="function",ve=Array.isArray,_t=i=>ve(i)||typeof i?.[Symbol.iterator]=="function",me=`[ 	
\f\r]`,Y=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ie=/-->/g,De=/>/g,W=RegExp(`>|${me}(?:([^\\s"'>=/]+)(${me}*=${me}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ve=/'/g,Be=/"/g,Ke=/^(?:script|style|textarea|title)$/i,we=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),h=we(1),It=we(2),Dt=we(3),V=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),Ue=new WeakMap,I=D.createTreeWalker(D,129);function qe(i,e){if(!ve(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return We!==void 0?We.createHTML(e):e}var yt=(i,e)=>{let t=i.length-1,n=[],r,o=e===2?"<svg>":e===3?"<math>":"",s=Y;for(let u=0;u<t;u++){let a=i[u],l,m,p=-1,y=0;for(;y<a.length&&(s.lastIndex=y,m=s.exec(a),m!==null);)y=s.lastIndex,s===Y?m[1]==="!--"?s=Ie:m[1]!==void 0?s=De:m[2]!==void 0?(Ke.test(m[2])&&(r=RegExp("</"+m[2],"g")),s=W):m[3]!==void 0&&(s=W):s===W?m[0]===">"?(s=r??Y,p=-1):m[1]===void 0?p=-2:(p=s.lastIndex-m[2].length,l=m[1],s=m[3]===void 0?W:m[3]==='"'?Be:Ve):s===Be||s===Ve?s=W:s===Ie||s===De?s=Y:(s=W,r=void 0);let v=s===W&&i[u+1].startsWith("/>")?" ":"";o+=s===Y?a+bt:p>=0?(n.push(l),a.slice(0,p)+je+a.slice(p)+H+v):a+H+(p===-2?u:v)}return[qe(i,o+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},X=class i{constructor({strings:e,_$litType$:t},n){let r;this.parts=[];let o=0,s=0,u=e.length-1,a=this.parts,[l,m]=yt(e,t);if(this.el=i.createElement(l,n),I.currentNode=this.el.content,t===2||t===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(r=I.nextNode())!==null&&a.length<u;){if(r.nodeType===1){if(r.hasAttributes())for(let p of r.getAttributeNames())if(p.endsWith(je)){let y=m[s++],v=r.getAttribute(p).split(H),b=/([.?@])?(.*)/.exec(y);a.push({type:1,index:o,name:b[2],strings:v,ctor:b[1]==="."?ge:b[1]==="?"?fe:b[1]==="@"?be:j}),r.removeAttribute(p)}else p.startsWith(H)&&(a.push({type:6,index:o}),r.removeAttribute(p));if(Ke.test(r.tagName)){let p=r.textContent.split(H),y=p.length-1;if(y>0){r.textContent=ae?ae.emptyScript:"";for(let v=0;v<y;v++)r.append(p[v],Z()),I.nextNode(),a.push({type:2,index:++o});r.append(p[y],Z())}}}else if(r.nodeType===8)if(r.data===Ge)a.push({type:2,index:o});else{let p=-1;for(;(p=r.data.indexOf(H,p+1))!==-1;)a.push({type:7,index:o}),p+=H.length-1}o++}}static createElement(e,t){let n=D.createElement("template");return n.innerHTML=e,n}};function U(i,e,t=i,n){if(e===V)return e;let r=n!==void 0?t._$Co?.[n]:t._$Cl,o=J(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(i),r._$AT(i,t,n)),n!==void 0?(t._$Co??=[])[n]=r:t._$Cl=r),r!==void 0&&(e=U(i,r._$AS(i,e.values),r,n)),e}var he=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??D).importNode(t,!0);I.currentNode=r;let o=I.nextNode(),s=0,u=0,a=n[0];for(;a!==void 0;){if(s===a.index){let l;a.type===2?l=new Q(o,o.nextSibling,this,e):a.type===1?l=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(l=new _e(o,this,e)),this._$AV.push(l),a=n[++u]}s!==a?.index&&(o=I.nextNode(),s++)}return I.currentNode=D,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}},Q=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=U(this,e,t),J(e)?e===_||e==null||e===""?(this._$AH!==_&&this._$AR(),this._$AH=_):e!==this._$AH&&e!==V&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):_t(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==_&&J(this._$AH)?this._$AA.nextSibling.data=e:this.T(D.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=X.createElement(qe(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let o=new he(r,this),s=o.u(this.options);o.p(t),this.T(s),this._$AH=o}}_$AC(e){let t=Ue.get(e.strings);return t===void 0&&Ue.set(e.strings,t=new X(e)),t}k(e){ve(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,n,r=0;for(let o of e)r===t.length?t.push(n=new i(this.O(Z()),this.O(Z()),this,this.options)):n=t[r],n._$AI(o),r++;r<t.length&&(this._$AR(n&&n._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let n=ze(e).nextSibling;ze(e).remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},j=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,o){this.type=1,this._$AH=_,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=_}_$AI(e,t=this,n,r){let o=this.strings,s=!1;if(o===void 0)e=U(this,e,t,0),s=!J(e)||e!==this._$AH&&e!==V,s&&(this._$AH=e);else{let u=e,a,l;for(e=o[0],a=0;a<o.length-1;a++)l=U(this,u[n+a],t,a),l===V&&(l=this._$AH[a]),s||=!J(l)||l!==this._$AH[a],l===_?e=_:e!==_&&(e+=(l??"")+o[a+1]),this._$AH[a]=l}s&&!r&&this.j(e)}j(e){e===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},ge=class extends j{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===_?void 0:e}},fe=class extends j{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==_)}},be=class extends j{constructor(e,t,n,r,o){super(e,t,n,r,o),this.type=5}_$AI(e,t=this){if((e=U(this,e,t,0)??_)===V)return;let n=this._$AH,r=e===_&&n!==_||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==_&&(n===_||r);r&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},_e=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){U(this,e)}};var vt=ye.litHtmlPolyfillSupport;vt?.(X,Q),(ye.litHtmlVersions??=[]).push("3.3.3");var Ye=(i,e,t)=>{let n=t?.renderBefore??e,r=n._$litPart$;if(r===void 0){let o=t?.renderBefore??null;n._$litPart$=r=new Q(e.insertBefore(Z(),o),o,void 0,t??{})}return r._$AI(i),r};var xe=globalThis,N=class extends L{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ye(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}};N._$litElement$=!0,N.finalized=!0,xe.litElementHydrateSupport?.({LitElement:N});var wt=xe.litElementPolyfillSupport;wt?.({LitElement:N});(xe.litElementVersions??=[]).push("4.2.2");function kt(i){return i==="hedge"||i==="fence"||i==="pergola"}function Ze(i){return(i.outdoor??[]).filter(e=>e.area_id&&e.points.length>=3&&!kt(e.type)).map(e=>({id:e.id,name:(e.name??"").trim(),area_id:e.area_id??null,points:e.points,floor_material:"wood",outdoor:!0,panel:e.panel,hidden:e.hidden,no_state:e.no_state}))}function le(i){return[...i.rooms,...Ze(i)]}var St={type:"none",pitch:35,overhang:.4},mn={wall_exterior:.24,wall_interior:.12,grid:.05,north:0,roof:{...St}};var $t=new Set(["lamp_ceiling","lamp_fan","lamp_downlight","lamp_spot","lamp_panel","lamp_pendant","lamp_floor","lamp_uplight","lamp_table","lamp_wall","led_strip","lamp_bollard","lamp_garden"]);var xt=new Set([...$t,"radiator","ac_unit","awning","robot_vacuum","inverter","home_battery","wallbox","meter","pool_pump","pool_heat_pump","pool_dosing","tv_board","tv_wall","neon_sign","desk","fridge","fridge_smart","stove","kitchen_tall","dishwasher","washer","dryer","kitchen","island","sink"]);function ke(i){let e=0;for(let t=0;t<i.length;t++){let[n,r]=i[t],[o,s]=i[(t+1)%i.length];e+=n*s-o*r}return e/2}function B(i,e){let t=!1;for(let n=0,r=e.length-1;n<e.length;r=n++){let[o,s]=e[n],[u,a]=e[r];s>i[1]!=a>i[1]&&i[0]<(u-o)*(i[1]-s)/(a-s)+o&&(t=!t)}return t}function Je(i,e){let t=new Set,n=e;for(;n&&!t.has(n);){t.add(n);let r=i.devices?.[n];if(!r)return null;if(r.area_id)return r.area_id;n=r.parent_device_id}return null}var k=(i,e)=>[i[0]-e[0],i[1]-e[1]],F=(i,e)=>[i[0]+e[0],i[1]+e[1]],T=(i,e)=>[i[0]*e,i[1]*e],te=(i,e)=>i[0]*e[0]+i[1]*e[1],G=(i,e)=>i[0]*e[1]-i[1]*e[0],ee=i=>Math.hypot(i[0],i[1]),R=i=>{let e=ee(i)||1;return[i[0]/e,i[1]/e]},Xe=i=>[-i[1],i[0]],Qe=i=>[i[1],-i[0]];function et(i,e,t=[]){let n=e.eps??.005,r=[],o=t.filter(c=>Math.hypot(c.b[0]-c.a[0],c.b[1]-c.a[1])>.05),s=[],u=c=>{for(let d=0;d<s.length;d++)if(Math.abs(s[d][0]-c[0])<=n&&Math.abs(s[d][1]-c[1])<=n)return d;return s.push([c[0],c[1]]),s.length-1},a=[];for(let c of i){let d=c.points;if(d.length<3||Math.abs(ke(d))<1e-6)continue;let g=ke(d)>0,f=d.map(u);for(let w=0;w<d.length;w++){let x=f[w],S=f[(w+1)%d.length];x!==S&&a.push(g?{u:x,v:S,room:c.id,edge:w,forward:!0}:{u:S,v:x,room:c.id,edge:w,forward:!1})}}let l=o.map(c=>[u(c.a),u(c.b)]),m=new Set;for(let c of i){let d=c.points;d.length<3||(c.wall_splits??[]).forEach((g,f)=>{if(!g||f>=d.length)return;let w=d[f],x=k(d[(f+1)%d.length],w),S=ee(x);for(let C of g)C>n&&C<S-n&&m.add(u(F(w,T(x,C/S))))})}let p=[];for(let c of a){let d=s[c.u],g=s[c.v],f=k(g,d),w=ee(f),x=T(f,1/w),S=[];for(let $=0;$<s.length;$++){if($===c.u||$===c.v)continue;let E=k(s[$],d),M=te(E,x);M<=n||M>=w-n||Math.abs(G(x,E))<=n&&S.push({t:M,id:$})}S.sort(($,E)=>$.t-E.t);let C=[{t:0,id:c.u},...S,{t:w,id:c.v}];for(let $=0;$+1<C.length;$++){let E=C[$],M=C[$+1],at=c.forward?E.t:w-M.t,lt=c.forward?M.t:w-E.t;p.push({u:E.id,v:M.id,room:c.room,edge:c.edge,t0:at,t1:lt})}}let y=new Map;for(let c of p){let d=c.u<c.v?`${c.u}-${c.v}`:`${c.v}-${c.u}`,g=y.get(d);g||y.set(d,g=[]),g.push(c)}let v=c=>({room_id:c.room,edge:c.edge,t0:c.t0,t1:c.t1}),b=new Map;for(let c of p){let d=`${c.room}:${c.edge}`;b.set(d,[...b.get(d)??[],c.t0].sort((g,f)=>g-f))}let A=c=>{let d=i.find(f=>f.id===c.room)?.wall_heights?.[c.edge];if(!Array.isArray(d))return d;let g=b.get(`${c.room}:${c.edge}`)??[];return d[g.indexOf(c.t0)]??null},P=c=>{let d=c.map(A).filter(f=>typeof f=="number"&&f>0);if(d.length)return Math.min(...d);let g=c.map(f=>i.find(w=>w.id===f.room)?.ceiling_height);return g.every(f=>typeof f=="number"&&f>0)?Math.max(...g):void 0},z=c=>{let d=c.map(g=>i.find(f=>f.id===g.room)?.wall_thickness?.[g.edge]).filter(g=>typeof g=="number"&&g>0);return d.length?Math.max(...d):void 0},ne=c=>{for(let d of c){let g=i.find(S=>S.id===d.room),f=g?.wall_slopes?.[d.edge];if(!g||!f)continue;let w=g.points[d.edge],x=g.points[(d.edge+1)%g.points.length];return{p:[w[0],w[1]],q:[x[0],x[1]],h0:Math.max(.05,f[0]),h1:Math.max(.05,f[1])}}},re=c=>c.some(d=>A(d)===0),Ae=c=>{let d=ne(c);return d?{height:Math.max(d.h0,d.h1),slope:d}:{height:P(c)}},Me=[],Re=[],O=[];for(let c of y.values()){let d=c[0],g=c.find(f=>f!==d&&f.u===d.v&&f.v===d.u&&f.room!==d.room);for(let f of c)f!==d&&f!==g&&f.room!==d.room&&r.push(`overlap:${d.room}:${f.room}`);if(re(g?[d,g]:[d])){g&&Me.push([d.room,g.room]),Re.push(g?[v(d),v(g)]:[v(d)]);continue}if(g){let f=z([d,g])??e.interior;O.push({a:d.u,b:d.v,left:f/2,right:f/2,exterior:!1,roomLeft:d.room,roomRight:g.room,sources:[v(d),v(g)],...Ae([d,g])})}else O.push({a:d.u,b:d.v,left:0,right:z([d])??e.exterior,exterior:!0,roomLeft:d.room,roomRight:null,sources:[v(d)],...Ae([d])})}let Pe=c=>R(k(s[c.b],s[c.a]));for(let c of O){if(c.exterior||c.free)continue;let d=new Set;for(let f of[c.a,c.b])for(let w of O)!w.exterior||w.free||w.a!==f&&w.b!==f||Math.abs(G(Pe(c),Pe(w)))>1e-6||(w.roomLeft===c.roomLeft?d.add("left"):w.roomLeft===c.roomRight&&d.add("right"));if(d.size!==1)continue;let g=c.left+c.right;d.has("left")?(c.left=0,c.right=g):(c.left=g,c.right=0)}o.forEach((c,d)=>{let[g,f]=l[d];if(g===f)return;let w=[(c.a[0]+c.b[0])/2,(c.a[1]+c.b[1])/2],x=i.find(M=>M.points.length>=3&&B(w,M.points))?.id??null,S=(c.thickness??e.interior)/2,C=typeof c.height=="number"&&c.height>0?c.height:void 0,$=c.slope,E=$?{p:[c.a[0],c.a[1]],q:[c.b[0],c.b[1]],h0:Math.max(.05,$[0]),h1:Math.max(.05,$[1])}:void 0;O.push({free:c.id,a:g,b:f,left:S,right:S,exterior:!1,roomLeft:x,roomRight:x,sources:[],...E?{height:Math.max(E.h0,E.h1),slope:E}:{height:C}})}),O=At(O,s,m);let Oe=Rt(O,s);return{walls:O.map((c,d)=>{let g=s[c.a],f=s[c.b],w=Oe.get(`${d}:a`),x=Oe.get(`${d}:b`),S=Pt([w.right,x.left,f,x.right,w.left,g],1e-6);return{id:Et(g,f),a:[g[0],g[1]],b:[f[0],f[1]],left:c.left,right:c.right,exterior:c.exterior,roomLeft:c.roomLeft,roomRight:c.roomRight,sources:c.sources,footprint:S,...c.free?{free:c.free}:{},...c.height!==void 0?{height:c.height}:{},...c.slope?{slope:c.slope}:{}}}),warnings:[...new Set(r)],open:Me,noWalls:Re}}function Et(i,e){let t=o=>Math.round(o*100),[n,r]=i[0]<e[0]||i[0]===e[0]&&i[1]<=e[1]?[i,e]:[e,i];return`w_${t(n[0])}_${t(n[1])}_${t(r[0])}_${t(r[1])}`}function Se(i){return{...i,a:i.b,b:i.a,left:i.right,right:i.left,roomLeft:i.roomRight,roomRight:i.roomLeft}}function At(i,e,t=new Set){let n=i.slice(),r=!0;for(;r;){r=!1;let o=new Map;n.forEach((s,u)=>{for(let a of[s.a,s.b]){let l=o.get(a);l||o.set(a,l=[]),l.push(u)}});for(let[s,u]of o){if(u.length!==2||t.has(s))continue;let a=n[u[0]],l=n[u[1]],m=a.b!==s&&l.a!==s;if(a.b!==s&&(a=Se(a)),l.a!==s&&(l=Se(l)),a.a===l.b)continue;let p=R(k(e[a.b],e[a.a])),y=R(k(e[l.b],e[l.a]));if(Math.abs(G(p,y))>1e-6||te(p,y)<=0||a.free||l.free||a.height!==l.height||a.slope||l.slope||a.exterior!==l.exterior||a.roomLeft!==l.roomLeft||a.roomRight!==l.roomRight||Math.abs(a.left-l.left)>1e-9||Math.abs(a.right-l.right)>1e-9)continue;let v={...a,b:l.b,sources:Mt(a.sources,l.sources)},b=m?Se(v):v,A=n.filter((P,z)=>z!==u[0]&&z!==u[1]);A.push(b),n.length=0,n.push(...A),r=!0;break}}return n}function Mt(i,e){let t=i.map(n=>({...n}));for(let n of e){let r=t.find(o=>o.room_id===n.room_id&&o.edge===n.edge&&(Math.abs(o.t1-n.t0)<1e-6||Math.abs(n.t1-o.t0)<1e-6));r?(r.t0=Math.min(r.t0,n.t0),r.t1=Math.max(r.t1,n.t1)):t.push({...n})}return t}function Rt(i,e){let t=new Map;i.forEach((r,o)=>{let s=R(k(e[r.b],e[r.a])),u=[[r.a,{key:`${o}:a`,d:s,left:r.left,right:r.right,angle:Math.atan2(s[1],s[0])}],[r.b,{key:`${o}:b`,d:T(s,-1),left:r.right,right:r.left,angle:Math.atan2(-s[1],-s[0])}]];for(let[a,l]of u){let m=t.get(a);m||t.set(a,m=[]),m.push(l)}});let n=new Map;for(let[r,o]of t){let s=e[r];o.sort((l,m)=>l.angle-m.angle);let u=l=>({left:F(s,T(Xe(l.d),l.left)),right:F(s,T(Qe(l.d),l.right))});for(let l of o)n.set(l.key,u(l));if(o.length<2)continue;let a=4*Math.max(...o.map(l=>Math.max(l.left,l.right)))+1e-9;for(let l=0;l<o.length;l++){let m=o[l],p=o[(l+1)%o.length],y=F(s,T(Xe(m.d),m.left)),v=F(s,T(Qe(p.d),p.right)),b=G(m.d,p.d);if(Math.abs(b)<1e-4)continue;let A=G(k(v,y),p.d)/b,P=F(y,T(m.d,A));ee(k(P,s))>a||(n.get(m.key).left=P,n.get(p.key).right=P)}}return n}function Pt(i,e){let t=i.filter((r,o)=>ee(k(r,i[(o+1)%i.length]))>e),n=!0;for(;n&&t.length>3;){n=!1;for(let r=0;r<t.length;r++){let o=t[(r+t.length-1)%t.length],s=t[r],u=t[(r+1)%t.length],a=k(s,o),l=k(u,s);if(Math.abs(G(R(a),R(l)))<1e-7&&te(a,l)>0){t=t.filter((m,p)=>p!==r),n=!0;break}}}return t}function tt(i,e,t){let n=i.points[e],r=i.points[(e+1)%i.points.length],o=R(k(r,n));return F(n,T(o,t))}function nt(i,e,t){if(i.wall){let r=t.find(u=>u.id===i.wall);if(!r||Math.hypot(r.b[0]-r.a[0],r.b[1]-r.a[1])<.05)return null;let o=R(k(r.b,r.a));return{room:{id:i.room_id,name:"",area_id:null,points:[r.a,r.b,F(r.a,[-o[1],o[0]])]},edge:0}}let n=e.find(r=>r.id===i.room_id);return n&&i.edge<n.points.length?{room:n,edge:i.edge}:null}function rt(i,e,t){if(!e.wall)return Ot(i,t.room,t.edge,e.offset);let n=i.find(o=>o.free===e.wall);if(!n)return null;let r=tt(t.room,0,e.offset);return{wall:n,s:te(k(r,n.a),R(k(n.b,n.a)))}}function Ot(i,e,t,n){for(let r of i){if(!r.sources.find(u=>u.room_id===e.id&&u.edge===t&&n>=u.t0-1e-6&&n<=u.t1+1e-6))continue;let s=tt(e,t,n);return{wall:r,s:te(k(s,r.a),R(k(r.b,r.a)))}}return null}function ot(i){return i.floors.flatMap(e=>le(e).map(t=>({id:t.id,name:t.name,floor:e.name,area_id:t.area_id??null})))}function it(i){let e=[],t=new Set;for(let n of i.floors){let r=et(n.rooms,{exterior:i.settings.wall_exterior,interior:i.settings.wall_interior},n.walls??[]).walls;for(let o of n.openings){if(o.type==="window"&&!(o.sill<.1))continue;let s=nt(o,n.rooms,n.walls??[]),u=s&&rt(r,o,s),a=u?.wall.roomLeft,l=u?.wall.roomRight;if(u&&(!a||!l)){let p=u.wall,y=Math.hypot(p.b[0]-p.a[0],p.b[1]-p.a[1])||1,v=[(p.b[0]-p.a[0])/y,(p.b[1]-p.a[1])/y],b=a?-1:1,A=(b>0?p.left:p.right)+.5,P=u.s,z=[p.a[0]+v[0]*P-v[1]*b*A,p.a[1]+v[1]*P+v[0]*b*A],ne=le(n).find(re=>re.outdoor&&B(z,re.points))?.id;a?l=ne:a=ne}if(!a||!l||a===l)continue;let m=[a,l].sort().join("|");t.has(m)||(t.add(m),e.push([a,l]))}}return e}function $e(i,e,t,n){let r=i.floors.find(o=>o.id===e);return r?le(r).find(o=>B([t,n],o.points))?.id??null:null}var Ct={title:"Set up locating",lab:"Lab",close:"Close",s_scanners:"1 \xB7 Scanners",s_devices:"2 \xB7 Devices",s_walk:"3 \xB7 Learn",s_live:"4 \xB7 Live",no_bt:"Home Assistant has no Bluetooth set up. Shelly (Gen2/3: Bluetooth scanning passive), ESPHome Bluetooth proxies or a USB adapter will do.",scanners_intro:"These are all Bluetooth scanners Home Assistant knows. Tell NeonPlan which room each one is in.",not_placed:"\u2013 pick a room \u2013",hint_room:"Signals say: {room} \u2013 use it",coverage:"Rooms without a scanner of their own \u2013 learning makes them recognisable anyway:",devices_intro:"Which devices should be located? Best what you always carry \u2013 a watch on the wrist is ideal.",known_keys:'iPhone and Apple Watch with a key (from "Private BLE Device" in Home Assistant):',add:"Add",added:"\u2713 added",remove:"Remove",person:"Person",none:"none",voice_hint:'Ask by voice too: "Where is my iPhone?", "Where is Torsten?", "Who is home?", "Ring my iPhone".',look_hint:"In 3D people stand as a figure; in the view's \u2699 menu: People \u2192 figure, pin or off.",ring:"Ring",ring_hint:'The Home Assistant app on this phone \u2013 then "ring my iPhone" works.',near_title:"Find a device nearby",key_title:"Paste a key",key_name:"Name (e.g. Torsten's iPhone)",key_value:"Key (IRK, 32 characters)",key_bad:"That is not a valid key (32 hex characters or Base64).",helper_title:"\u{1F511} Key helper",helper_build:"Set up the key helper",helper_found:"Key helper found: {name}",helper_watch:"For an Apple Watch",helper_phone:"For an iPhone",helper_watch_steps:'On the watch: Settings \u2192 Bluetooth \u2192 under "Health devices" tap "NeonPlan Key" and pair.',helper_phone_steps:'On the phone: Settings \u2192 Bluetooth \u2192 pair "NeonPlan Key" (it shows as a keyboard).',helper_key:"Key read:",helper_wait:"Waiting for the pairing \u2026",helper_after:'Afterwards remove the device "NeonPlan Key" from the Bluetooth settings again.',helper_next:"\u{1F504} Next device",helper_next_hint:"Tap before every further device: the helper gets a new Bluetooth identity, so a device paired before no longer connects in between.",helper_name:"Name for this device",helper_irk:"Key (IRK) read from the device that just paired:",helper_belongs:"Belongs to: {name}",helper_add_as:"Add as \u201C{name}\u201D",helper_added:"\u2713 \u201C{name}\u201D is now in the list above.",pbd_rename:"Tip: rename it in Home Assistant (Devices & services \u2192 Private BLE Device) to see its name here.",carry:"I am carrying:",offline:"not reachable right now",pbd_summary:"Moving from Bermuda? Take over keys from Home Assistant",worn:"worn",worn_hint:"Worn on the body (watch, band): tells where the person is \u2013 a phone may lie somewhere.",look_title:"People in 3D",look_figure:"Figure",look_pin:"Pin",look_off:"Off",near_summary:"Add an Android phone or a key tag",android_label:"Android phone (HA app)",paste_summary:"Paste a key you already have",near_intro:'Hold the device right next to a scanner. Android: switch on "BLE Transmitter" in the Home Assistant app. Key tags: press once.',near_empty:"Nothing strong nearby yet \u2026",walk_intro:"Go into every room, tap it and walk around slowly for 90 seconds \u2013 into the corners too. Carry all devices.",learning:"Learning {room} \u2026 {left} s left",stop:"Cancel",samples:"{n} samples",quality:"Check accuracy",quality_result:"Accuracy: {p}",relearn_all:"Learn everything anew",live_intro:"This is where NeonPlan sees you now. Walk around and check.",enabled:"Locating on",admins_only:"Show people to admins only",not_heard:"not heard",next:"Next",need_device:"Add a device first.",app_title:"Android with the Home Assistant app",app_none:"Android phone? In the Home Assistant app: Settings \u2192 Companion app \u2192 Manage sensors \u2192 turn on \u201CBLE Transmitter\u201D. It then shows up here by itself.",app_off:"Transmitter is off \u2013 turn it on in the app",app_power:"Transmit power too low \u2013 set it to \u201CHigh\u201D in the app",app_mode:"Set the advertise mode to \u201CLow latency\u201D in the app",helper_android:"Don't pair Android phones or tablets here: they don't send this key in the background. For Android use the Home Assistant app's BLE Transmitter (below).",unheard:"\u26A0 not heard",unheard_hint:"No receiver hears this device right now. Is it on and sending? Android: the Home Assistant app's BLE Transmitter.",fly:"Fly into the rooms on \u201CWhere is \u2026?\u201D and \u201CWho is home?\u201D",fly_hint:"The open NeonPlan views fly into the room of the answer, on \u201CWho is home?\u201D into every room in turn. A tap stops it. Not for people while they are shown to admins only."};function st(i){let e=i.trim().replace(/^irk:/i,""),t=e.replace(/[\s:-]/g,"");if(/^[0-9a-f]{32}$/i.test(t))return t.toLowerCase();try{let n=atob(e.replace(/\s/g,""));if(n.length===16)return[...n].map(r=>r.charCodeAt(0).toString(16).padStart(2,"0")).join("")}catch{}return null}var Lt=/^([0-9a-f]{8})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{12})_(\d{1,5})_(\d{1,5})$/i;function Tt(i){let e=[],t=n=>n.toString(16).padStart(4,"0");for(let[n,r]of Object.entries(i.states)){if(!n.startsWith("sensor."))continue;let o=r.attributes??{};if(!("Transmitting power"in o))continue;let s=Lt.exec(String(o.id??""));if(!s)continue;let u=Number(s[6]),a=Number(s[7]);if(u>65535||a>65535)continue;let l=i.entities?.[n]?.device_id??null,m=l?i.devices?.[l]:void 0,p=String(o.friendly_name??n).replace(/\s*BLE[\s_-]*Transmitter\s*$/i,""),y=l&&Object.entries(i.states).find(([v,b])=>v.startsWith("person.")&&(b.attributes?.device_trackers??[]).some(A=>i.entities?.[A]?.device_id===l))?.[0]||null;e.push({entity:n,name:m?.name_by_user||m?.name||p,key:(s.slice(1,6).join("")+t(u)+t(a)).toLowerCase(),state:String(r.state),power:String(o["Transmitting power"]??""),mode:String(o["Advertise mode"]??""),person:y})}return e.sort((n,r)=>n.name.localeCompare(r.name))}var Ee=class extends N{static properties={hass:{attribute:!1},building:{attribute:!1},_step:{state:!0},_cfg:{state:!0},_near:{state:!0},_live:{state:!0},_quality:{state:!0},_error:{state:!0}};constructor(){super(),this._step="scanners",this._cfg=null,this._near=[],this._live=null,this._quality=null,this._error=""}timer=0;hassSource=null;setLook=null;unsub=null;get t(){return Ct}get voiceLanguage(){return/^en/.test(this.hass?.language??"en")}tr(e,t){return e.replace(/\{(\w+)\}/g,(n,r)=>String(t[r]??""))}get rooms(){return ot(this.building).map(e=>e.name||!e.area_id?e:{...e,name:this.hass.areas?.[e.area_id]?.name??e.area_id})}connectedCallback(){super.connectedCallback(),this.load().catch(e=>this._error=`load: ${e?.stack??String(e)}`),this.timer=window.setInterval(()=>{this.tick()},1e3),this.hass.connection.subscribeMessage(e=>this._live=e,{type:"homeplan3d/locate/subscribe"}).then(e=>this.unsub=e).catch(()=>{})}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.timer),this.unsub?.()}async call(e){try{return this._error="",await this.hass.callWS(e)}catch(t){return this._error=t.message??String(t),null}}async load(){let e=await this.call({type:"homeplan3d/locate/config"});if(!e)return;let t={...e.scanner_rooms},n=!1;for(let r of e.scanners){if(t[r.source])continue;let o=this.guessRoom(r)??e.scanner_hints?.[r.source]??null;o&&(t[r.source]=o,n=!0)}this._cfg={...e,scanner_rooms:t},n&&await this.save({scanner_rooms:t})}guessRoom(e){let t=l=>typeof l=="string"&&!!e.device_id&&this.hass.entities?.[l]?.device_id===e.device_id;if(e.device_id)for(let l of this.building.floors){for(let m of l.placements){let p=t(m.entity_id)?$e(this.building,l.id,m.x,m.z):null;if(p)return p}for(let m of l.furniture){if(!Object.values(m).some(t))continue;let p=$e(this.building,l.id,m.x,m.z);if(p)return p}}let n=e.device_id??Object.values(this.hass.devices??{}).find(l=>[l.name_by_user,l.name].some(m=>m&&m.toLowerCase()===e.name.toLowerCase()))?.id??null,r=n?Object.values(this.hass.entities??{}).filter(l=>l.device_id===n&&l.area_id).map(l=>l.area_id):[],o=e.area_id??Je(this.hass,n)??r[0]??null;if(o){let l=this.rooms.find(m=>m.area_id===o);if(l)return l.id}let s=l=>l.toLowerCase().replace(/[^a-z0-9]+/g," "),u=` ${s(e.name)} `,a=this.rooms.filter(l=>s(l.name).trim().length>=3&&u.includes(s(l.name).trim()));return a.sort((l,m)=>s(m.name).length-s(l.name).length),a.length&&a.filter(l=>s(l.name)===s(a[0].name)).length===1?a[0].id:null}async save(e){let t=[];try{t=it(this.building)}catch(r){console.warn("NeonPlan locate: no door graph",r)}let n=await this.call({type:"homeplan3d/locate/configure",rooms:this.rooms,doors:t,...e});n&&(this._cfg={...n,scanner_rooms:{...n.scanner_rooms}})}async tick(){let e=this.hassSource?.();if(e&&e!==this.hass&&(this.hass=e),this._step==="devices"&&this.nearOpen){let t=await this.call({type:"homeplan3d/locate/nearby"});t&&(this._near=t.devices)}if(this._step==="walk"){let t=await this.call({type:"homeplan3d/locate/calibrate",action:"status"});t&&this._cfg&&(this._cfg={...this._cfg,samples:t.samples},this._live={...this._live??{running:!0,devices:[]},calibration:t.calibration})}}render(){let e=this.t,t=this._cfg,n=[["scanners",e.s_scanners],["devices",e.s_devices],["walk",e.s_walk],["live",e.s_live]];return h`<div class="box" role="dialog" aria-label=${e.title}>
      <header>
        <b>📡 ${e.title}</b>
        <button class="x" @click=${()=>this.remove()} aria-label=${e.close}>✕</button>
      </header>
      <nav>${n.map(([r,o])=>h`<button class=${this._step===r?"on":""} @click=${()=>this._step=r}>${o}</button>`)}</nav>
      ${this._error?h`<pre class="err">${this._error}</pre>`:_}
      ${t?t.bluetooth?this.renderStep(t):h`<p>${e.no_bt}</p>`:h`<p>…</p>`}
    </div>`}renderStep(e){switch(this._step){case"scanners":return this.renderScanners(e);case"devices":return this.renderDevices(e);case"walk":return this.renderWalk(e);default:return this.renderLive(e)}}roomSelect(e,t){let n=[...new Set(this.rooms.map(r=>r.floor))];return h`<select @change=${r=>t(r.target.value||null)}>
      <option value="" ?selected=${!e}>${this.t.not_placed}</option>
      ${n.map(r=>h`<optgroup label=${r}>${this.rooms.filter(o=>o.floor===r).map(o=>h`<option value=${o.id} ?selected=${o.id===e}>${o.name}</option>`)}</optgroup>`)}
    </select>`}renderScanners(e){let t=this.t,n=new Set(Object.values(e.scanner_rooms)),r=this.rooms.filter(o=>!n.has(o.id));return h`<p>${t.scanners_intro}</p>
      <ul class="list">
        ${e.scanners.map(o=>h`<li>
            <span><b>${o.name}</b><small>${o.offline?`\u26A0 ${t.offline}`:o.kind==="shelly"?"Shelly":o.kind==="esphome"?"ESPHome":"Bluetooth"}</small></span>
            ${this.roomSelect(e.scanner_rooms[o.source]??null,s=>{let u={...e.scanner_rooms};s?u[o.source]=s:delete u[o.source],this.save({scanner_rooms:u})})}
            ${e.scanner_hints?.[o.source]&&e.scanner_hints[o.source]!==e.scanner_rooms[o.source]?h`<button class="ghost" @click=${()=>{this.save({scanner_rooms:{...e.scanner_rooms,[o.source]:e.scanner_hints[o.source]}})}}>
                  ${this.tr(t.hint_room,{room:this.rooms.find(s=>s.id===e.scanner_hints[o.source])?.name??""})}
                </button>`:_}
          </li>`)}
      </ul>
      ${r.length?h`<p class="hint">${t.coverage} ${r.map(o=>o.name).join(", ")}</p>`:_}
      <p class="end"><button class="primary" @click=${()=>this._step="devices"}>${t.next} →</button></p>`}personSelect(e,t){let n=Object.keys(this.hass.states).filter(r=>r.startsWith("person."));return h`<select @change=${r=>t(r.target.value||null)}>
      <option value="" ?selected=${!e}>${this.t.person}: ${this.t.none}</option>
      ${n.map(r=>h`<option value=${r} ?selected=${r===e}>${this.hass.states[r].attributes.friendly_name??r}</option>`)}
    </select>`}keyHelpers(){let e=[];for(let[t,n]of Object.entries(this.hass.states)){let r=n.attributes.options;if(!t.startsWith("select.")||!Array.isArray(r)||!r.includes("Heart Sensor")||!r.includes("Keyboard"))continue;let o=this.hass.entities?.[t]?.device_id,s=Object.values(this.hass.entities??{}).find(p=>p.device_id===o&&/_irk$/.test(p.entity_id))?.entity_id,u=s?this.hass.states[s]?.state:void 0,a=o?this.hass.devices?.[o]:void 0,l=a?.name_by_user||a?.name||String(n.attributes.friendly_name??t),m=Object.values(this.hass.entities??{}).find(p=>p.device_id===o&&/_refresh_ble_identity$/.test(p.entity_id))?.entity_id??null;e.push({name:l,select:t,option:n.state,irk:u?st(u):null,ours:a?.model==="neonplan_key"||/neonplan[ _]key/i.test(t),refresh:m})}return e.sort((t,n)=>Number(n.ours)-Number(t.ours))}notCarried=new Set;nearOpen=!1;helperId=null;helperName="";helperPerson=null;helperAdded=null;renderKeyHelper(e){let t=this.t,n=this.keyHelpers(),r=n.find(b=>b.select===this.helperId)??n[0],o=h`<div class="helper-head">
        <h4>${t.helper_title}</h4>
      </div>
      <p class="hint">${t.helper_android}</p>`;if(!r)return o;let s=r.option==="Heart Sensor",u=b=>{this.hass.callService("select","select_option",{entity_id:r.select,option:b})},a=b=>b.match(/../g).reverse().join(""),l=b=>!!r.irk&&!!b&&(b.toLowerCase()===r.irk||b.toLowerCase()===a(r.irk)),m=e.devices.find(b=>l(b.key))?.name??null,p=e.private_ble.find(b=>l(b.key))?.title??null,y=this.helperName||(s?"Apple Watch":"iPhone"),v=b=>`${b.slice(0,4)}\u2026${b.slice(-4)}`;return h`${o}
      ${n.length>1?h`<p class="hint">
            <select
              @change=${b=>{this.helperId=b.target.value,this.requestUpdate()}}
            >
              ${n.map(b=>h`<option value=${b.select} ?selected=${b.select===r.select}>${b.name}</option>`)}
            </select>
          </p>`:h`<p class="hint">${this.tr(t.helper_found,{name:r.name})}</p>`}
      <div class="row">
        <button class=${s?"on":""} @click=${()=>u("Heart Sensor")}>⌚ ${t.helper_watch}</button>
        <button class=${s?"":"on"} @click=${()=>u("Keyboard")}>📱 ${t.helper_phone}</button>
      </div>
      <div class="row">
        <input
          placeholder=${t.helper_name}
          title=${t.helper_name}
          .value=${this.helperName}
          @input=${b=>this.helperName=b.target.value}
        />
        ${this.personSelect(this.helperPerson,b=>{this.helperPerson=b,this.requestUpdate()})}
      </div>
      <p class="hint">${s?t.helper_watch_steps:t.helper_phone_steps}</p>
      <ul class="list">
        <li>
          <span>
            <b>${t.helper_irk}</b>
            <small>${r.irk?v(r.irk):t.helper_wait}</small>
            ${m||p?h`<small>${this.tr(t.helper_belongs,{name:m??p??""})}</small>`:_}
          </span>
          ${r.irk&&!m?h`<button
                class="primary"
                @click=${()=>{this.addDevice(e,{name:y,kind:"irk",key:r.irk},this.helperPerson),this.helperAdded=y,this.helperName=""}}
              >
                ${this.tr(t.helper_add_as,{name:y})}
              </button>`:_}
        </li>
      </ul>
      ${this.helperAdded?h`<p class="hint">${this.tr(t.helper_added,{name:this.helperAdded})}</p>`:_}
      <p class="hint">${t.helper_after}</p>
      ${r.refresh?h`<p class="end">
            <small>${t.helper_next_hint}</small>
            <button @click=${()=>{this.hass.callService("button","press",{entity_id:r.refresh})}}>${t.helper_next}</button>
          </p>`:_}`}notifySelect(e,t){let n=this.hass.services,r=Object.keys(n?.notify??{}).filter(o=>o.startsWith("mobile_app_"));return r.length?h`<select title=${this.t.ring_hint} @change=${o=>t(o.target.value||null)}>
      <option value="" ?selected=${!e}>🔔 ${this.t.ring}: ${this.t.none}</option>
      ${r.map(o=>h`<option value=${`notify.${o}`} ?selected=${e===`notify.${o}`}>🔔 ${o.replace(/^mobile_app_/,"").replace(/_/g," ")}</option>`)}
    </select>`:_}unheardBadge(e){let t=this._live;if(!t?.running)return _;let n=t.devices.find(r=>r.id===e);return!n||n.room||n.last_seen&&Date.now()/1e3-n.last_seen<120?_:h`<small class="warn" title=${this.t.unheard_hint}>${this.t.unheard}</small>`}addDevice(e,t,n=null){let r=`${t.kind}_${t.key.replace(/[^a-z0-9]/gi,"").slice(-10).toLowerCase()}`;e.devices.some(o=>o.id===r)||this.save({devices:[...e.devices,{...t,id:r,person:n,icon:null}]})}renderDevices(e){let t=this.t,n=s=>e.devices.some(u=>u.key.toLowerCase()===s.toLowerCase()),r=(s,u)=>{this.save({devices:e.devices.map(a=>a.id===s?{...a,...u}:a)})},o=Tt(this.hass);return h`<p>${t.devices_intro}</p>
      ${e.devices.length?h`<ul class="list">
            ${e.devices.map(s=>h`<li>
                <input .value=${s.name} @change=${u=>r(s.id,{name:u.target.value})} />
                ${this.personSelect(s.person,u=>r(s.id,{person:u}))}
                ${this.notifySelect(s.notify??null,u=>r(s.id,{notify:u}))}
                <label class="row" title=${t.worn_hint}
                  ><input type="checkbox" .checked=${!!s.wearable} @change=${u=>r(s.id,{wearable:u.target.checked})} />⌚
                  ${t.worn}</label
                >
                ${this.unheardBadge(s.id)}
                <button @click=${()=>{this.save({devices:e.devices.filter(u=>u.id!==s.id)})}}>${t.remove}</button>
              </li>`)}
          </ul>`:_}
      ${o.length?h`<h4>📱 ${t.app_title}</h4>
            <ul class="list">
              ${o.map(s=>{let u=[s.state!=="Transmitting"?t.app_off:null,s.power==="ultraLow"||s.power==="low"?t.app_power:null,s.mode==="lowPower"?t.app_mode:null].filter(a=>!!a);return h`<li>
                  <span
                    ><b>${s.name}</b>${u.map(a=>h`<small class="warn">⚠ ${a}</small>`)}</span
                  >
                  ${n(s.key)?h`<small>${t.added}</small>`:h`<button @click=${()=>this.addDevice(e,{name:s.name,kind:"ibeacon",key:s.key},s.person)}>${t.add}</button>`}
                </li>`})}
            </ul>`:_}
      ${this.renderKeyHelper(e)}
      <details
        class="pbd"
        @toggle=${s=>{this.nearOpen=s.target.open}}
      >
        <summary>📱 ${t.near_summary}</summary>
        <p class="hint">${t.near_intro}</p>
        ${o.length?_:h`<p class="hint">${t.app_none}</p>`}
        <ul class="list">
          ${(()=>{let s=new Set,u=this._near.filter(a=>a.ibeacon?a.rssi>=-90:!a.random&&a.rssi>=-68).sort((a,l)=>+!!l.ibeacon-+!!a.ibeacon||l.rssi-a.rssi).filter(a=>!a.ibeacon||!s.has(a.ibeacon)&&!!s.add(a.ibeacon)).slice(0,5);return u.length?u.map(a=>h`<li>
                    <span><b>${a.ibeacon?`\u{1F4F1} ${t.android_label}`:a.name??a.address}</b><small>${a.rssi} dBm</small></span>
                    ${n(a.ibeacon??a.address)?h`<small>${t.added}</small>`:h`<button @click=${()=>this.addDevice(e,a.ibeacon?{name:t.android_label,kind:"ibeacon",key:a.ibeacon}:{name:a.name??a.address,kind:"mac",key:a.address})}>${t.add}</button>`}
                  </li>`):h`<li><small>${t.near_empty}</small></li>`})()}
        </ul>
      </details>
      <details class="pbd">
        <summary>🔑 ${t.paste_summary}</summary>
      <div class="row">
        <input id="keyname" placeholder=${t.key_name} />
        <input id="keyvalue" placeholder=${t.key_value} spellcheck="false" autocomplete="off" />
        <button
          @click=${()=>{let s=this.renderRoot.querySelector("#keyname").value.trim(),u=st(this.renderRoot.querySelector("#keyvalue").value);if(!u){this._error=t.key_bad;return}this._error="",this.addDevice(e,{name:s||"iPhone",kind:"irk",key:u})}}
        >
          ${t.add}
        </button>
      </div>
      </details>
      <p class="end"><button class="primary" ?disabled=${!e.devices.length} @click=${()=>this._step="walk"}>${t.next} →</button></p>`}renderWalk(e){let t=this.t,n=this._live?.calibration??null;if(!e.devices.length)return h`<p>${t.need_device}</p>`;let r=u=>Math.max(0,...e.devices.map(a=>e.samples[a.id]?.[u]??0)),o=[...new Set(this.rooms.map(u=>u.floor))],s=this._quality;return h`<p>${t.walk_intro}</p>
      ${e.devices.length>1?h`<div class="row">
            <b>${t.carry}</b>
            ${e.devices.map(u=>h`<label class="row"
                ><input
                  type="checkbox"
                  .checked=${!this.notCarried.has(u.id)}
                  @change=${a=>{a.target.checked?this.notCarried.delete(u.id):this.notCarried.add(u.id),this.requestUpdate()}}
                />
                ${u.name} ${this.unheardBadge(u.id)}</label
              >`)}
          </div>`:_}
      ${n?h`<div class="learning">
            ${this.tr(t.learning,{room:this.rooms.find(u=>u.id===n.room)?.name??"",left:n.left})}
            <div class="bar"><i style="width:${Math.round((90-n.left)/90*100)}%"></i></div>
            <button @click=${()=>{this.call({type:"homeplan3d/locate/calibrate",action:"stop"})}}>${t.stop}</button>
          </div>`:_}
      ${o.map(u=>h`<h4>${u}</h4>
          <div class="rooms">
            ${this.rooms.filter(a=>a.floor===u).map(a=>{let l=r(a.id),m=s&&l>0?e.devices.map(y=>s[y.id]?.rooms[a.id]).filter(y=>typeof y=="number"):[],p=m.length?Math.min(...m):null;return h`<button
                  class=${n?.room===a.id?"on":l>=30?"done":""}
                  ?disabled=${!!n}
                  @click=${async()=>{let y=e.devices.filter(b=>!this.notCarried.has(b.id)).map(b=>b.id),v=await this.call({type:"homeplan3d/locate/calibrate",action:"start",room:a.id,seconds:90,devices:y});v&&(this._live={...this._live??{running:!0,devices:[]},calibration:v.calibration}),v&&!e.enabled&&await this.save({enabled:!0})}}
                >
                  ${l>=30?"\u2713 ":""}${a.name}<small>${this.tr(t.samples,{n:l})}${p!==null?` \xB7 ${Math.round(p*100)} %`:""}</small>
                </button>`})}
          </div>`)}
      <p class="end">
        <button @click=${async()=>this._quality=await this.call({type:"homeplan3d/locate/quality"})}>${t.quality}</button>
        ${s?h`<b>${this.tr(t.quality_result,{p:e.devices.map(u=>`${u.name} ${s[u.id]?.overall!=null?Math.round(s[u.id].overall*100):"\u2013"} %`).join(" \xB7 ")})}</b>`:_}
        <button class="primary" @click=${()=>this._step="live"}>${t.next} →</button>
      </p>
      <p class="end"><button class="ghost" @click=${()=>{this.call({type:"homeplan3d/locate/calibrate",action:"clear"}).then(()=>this.load())}}>${t.relearn_all}</button></p>`}renderLive(e){let t=this.t,n=this._live,r=o=>this.rooms.find(s=>s.id===o)?.name;return h`<p>${t.live_intro}</p>
      ${this.voiceLanguage?h`<p class="hint">${t.voice_hint}</p>`:_}
      <label class="row"><input type="checkbox" .checked=${e.enabled} @change=${o=>{this.save({enabled:o.target.checked})}} /> ${t.enabled}</label>
      <label class="row"><input type="checkbox" .checked=${e.admins_only} @change=${o=>{this.save({admins_only:o.target.checked})}} /> ${t.admins_only}</label>
      <label class="row" title=${t.fly_hint}
        ><input type="checkbox" .checked=${e.fly!==!1} @change=${o=>{this.save({fly:o.target.checked})}} /> ${t.fly}</label
      >
      ${this.setLook?h`<div class="row">
            <b>${t.look_title}</b>
            ${["figure","pin","off"].map(o=>h`<button
                class=${(this.building.settings.person_look??"figure")===o?"on":""}
                @click=${()=>{this.setLook?.(o),this.building={...this.building,settings:{...this.building.settings,person_look:o==="figure"?null:o}}}}
              >
                ${o==="figure"?t.look_figure:o==="pin"?t.look_pin:t.look_off}
              </button>`)}
          </div>`:_}
      <ul class="list big">
        ${(n?.devices??[]).map(o=>h`<li>
            <span><b>${o.name}</b></span>
            <span>${o.room?h`<b class="room">${r(o.room)}</b> <small>${Math.round((o.probability??0)*100)} %</small>`:h`<small>${t.not_heard}</small>`}</span>
          </li>`)}
      </ul>`}static styles=ue`
    :host {
      position: fixed;
      inset: 0;
      z-index: 10000;
      display: grid;
      place-items: center;
      background: #02060fcc;
      font: 14px/1.4 system-ui, sans-serif;
      color: #e6f7ff;
    }
    .box {
      width: min(640px, calc(100vw - 16px));
      max-height: calc(100vh - 16px);
      overflow: auto;
      background: #0b1120;
      border: 1px solid #37e0ff66;
      border-radius: 14px;
      padding: 14px;
      box-shadow: 0 10px 40px #000a;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    header small {
      font-weight: 400;
      color: #ffb86b;
      margin-left: 6px;
    }
    nav {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin: 10px 0;
    }
    button,
    select,
    input {
      font: inherit;
      color: #e6f7ff;
      background: #16233d;
      border: 1px solid #37e0ff44;
      border-radius: 8px;
      padding: 7px 10px;
    }
    button {
      cursor: pointer;
    }
    button:disabled {
      opacity: 0.5;
      cursor: default;
    }
    button.on,
    button.primary {
      background: #37e0ff;
      color: #04121c;
      font-weight: 700;
    }
    button.done {
      border-color: #5dd39e;
    }
    button.ghost {
      background: transparent;
    }
    .x {
      background: transparent;
      border: none;
      font-size: 18px;
    }
    .list {
      list-style: none;
      padding: 0;
      margin: 8px 0;
      display: grid;
      gap: 6px;
    }
    .list li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      background: #101a2e;
      border-radius: 10px;
      padding: 8px 10px;
    }
    .list li span {
      display: flex;
      flex-direction: column;
    }
    .list.big li {
      font-size: 16px;
    }
    small {
      opacity: 0.75;
      font-size: 12px;
    }
    .rooms {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .rooms button {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      min-width: 120px;
    }
    .learning {
      background: #13233f;
      border: 1px solid #37e0ff;
      border-radius: 10px;
      padding: 10px;
      margin: 8px 0;
      font-weight: 700;
    }
    .bar {
      height: 8px;
      background: #0b1120;
      border-radius: 4px;
      margin: 8px 0;
      overflow: hidden;
    }
    .bar i {
      display: block;
      height: 100%;
      background: #37e0ff;
    }
    .hint {
      opacity: 0.8;
      font-size: 13px;
    }
    .warn {
      display: block;
      color: #ffb74d;
      font-size: 12px;
    }
    .end {
      display: flex;
      gap: 8px;
      align-items: center;
      justify-content: flex-end;
      flex-wrap: wrap;
    }
    .row {
      display: flex;
      gap: 8px;
      align-items: center;
      margin: 6px 0;
    }
    .room {
      color: #37e0ff;
    }
    a {
      color: #37e0ff;
    }
    .helper-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 12px;
    }
    .helper-head h4 {
      margin: 0;
    }
    a.install {
      background: #37e0ff;
      color: #04121c;
      font-weight: 700;
      text-decoration: none;
      border-radius: 10px;
      padding: 8px 14px;
    }
    details.pbd summary {
      cursor: pointer;
      opacity: 0.85;
      margin: 8px 0;
    }
    .err {
      color: #ff8fa3;
      white-space: pre-wrap;
      font-size: 12px;
    }
    h4 {
      margin: 12px 0 4px;
    }
  `};customElements.get("fp3d-locate-setup")||customElements.define("fp3d-locate-setup",Ee);function Ln(i,e,t,n){document.querySelector("fp3d-locate-setup")?.remove();let r=document.createElement("fp3d-locate-setup");r.hass=i,r.hassSource=t??null,r.setLook=n??null,r.building=e,document.body.append(r)}export{Ln as openLocateSetup};

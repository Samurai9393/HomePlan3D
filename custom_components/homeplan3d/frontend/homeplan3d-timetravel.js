var ke=new Map;function Qn(r){return r.startsWith("pack:")}var Yn={"mastershort.living_basics":"mastershort.living","mastershort.kitchen_basics":"mastershort.kitchen","mastershort.bedroom_basics":"mastershort.bedroom","mastershort.bath_basics":"mastershort.bath"};function ht(r){if(!Qn(r))return;let t=ke.get(r);if(t)return t;let[,e,...n]=r.split(":"),o=Yn[e];return o?ke.get(`pack:${o}:${n.join(":")}`):void 0}function Jn(r){return r==="hedge"||r==="fence"||r==="pergola"}function Se(r){return(r.outdoor??[]).filter(t=>t.area_id&&t.points.length>=3&&!Jn(t.type)).map(t=>({id:t.id,name:(t.name??"").trim(),area_id:t.area_id??null,points:t.points,floor_material:"wood",outdoor:!0,panel:t.panel,hidden:t.hidden,no_state:t.no_state}))}function Me(r){return[...r.rooms,...Se(r)]}var to={type:"none",pitch:35,overhang:.4},yr={wall_exterior:.24,wall_interior:.12,grid:.05,north:0,roof:{...to}};var Re=new Set(["lamp_ceiling","lamp_fan","lamp_downlight","lamp_spot","lamp_panel","lamp_pendant","lamp_floor","lamp_uplight","lamp_table","lamp_wall","led_strip","lamp_bollard","lamp_garden"]);function Ee(r){return Re.has(r)||!!ht(r)?.light}var Xn=new Set([...Re,"radiator","ac_unit","awning","robot_vacuum","inverter","home_battery","wallbox","meter","pool_pump","pool_heat_pump","pool_dosing","tv_board","tv_wall","neon_sign","desk","fridge","fridge_smart","stove","kitchen_tall","dishwasher","washer","dryer","kitchen","island","sink"]);function P(r,t){let e=!1;for(let n=0,o=t.length-1;n<t.length;o=n++){let[i,s]=t[n],[a,l]=t[o];s>r[1]!=l>r[1]&&r[0]<(a-i)*(r[1]-s)/(l-s)+i&&(e=!e)}return e}var Rr=Math.PI/180;var Nr=Math.PI/180;function zt(r,t){let e=new Set,n=t;for(;n&&!e.has(n);){e.add(n);let o=r.devices?.[n];if(!o)return null;if(o.area_id)return o.area_id;n=o.parent_device_id}return null}function Ct(r,t){let e=r.entities?.[t];return e?e.area_id?e.area_id:zt(r,e.device_id):null}var pt=r=>r&&r!=="none"?r:null;function Ht(r,t=e=>pt(e.power)){let e={grid:null,gridExport:null,solar:[],battery:[],charge:[],batteries:[],soc:[]};for(let n of r.floors)for(let o of n.furniture){let i=t(o);if(o.type==="meter")e.grid??=i,e.gridExport??=pt(o.export);else if(o.type==="inverter"&&i&&!e.solar.includes(i))e.solar.push(i);else if(o.type==="home_battery"){i&&!e.battery.includes(i)&&e.battery.push(i);let s=pt(o.charge);s&&!e.charge.includes(s)&&e.charge.push(s),(i||s)&&e.batteries.push({power:i,charge:s});let a=pt(o.soc);a&&!e.soc.includes(a)&&e.soc.push(a)}}return e}function F(r,t=!1){if(!r)return null;let e=Number(r.state);if(!Number.isFinite(e))return null;let n=String(r.attributes.unit_of_measurement??"W"),o=n==="kW"?e*1e3:n==="MW"?e*1e6:e;return t?-o:o}function eo(r,t,e){let n=(t.settings.roof.strings??[]).filter(o=>(e===void 0||o.inverter===e)&&o.entity&&o.entity!=="none").map(o=>F(r.states[o.entity])).filter(o=>o!==null);return n.length?n.reduce((o,i)=>o+Math.max(0,i),0):null}function no(r,t){return t===null?r:r===null||Math.max(0,r)<5&&t>50?t:r}function $e(r,t,e,n=Ht(t)){let o=t.energy,i=o.grid??n.grid,s=i?F(r.states[i],o.grid_invert):null;if(!o.grid&&n.gridExport){let h=Math.max(0,F(r.states[n.gridExport])??0);s=Math.max(0,s??0)-h}let a=o.solar?F(r.states[o.solar]):null;if(!o.solar&&n.solar.length){let h=n.solar.map(_=>F(r.states[_])).filter(_=>_!==null);a=h.length?h.reduce((_,w)=>_+w,0):null}a=no(a,eo(r,t));let l=o.battery?F(r.states[o.battery],o.battery_invert):null;if(!o.battery&&n.batteries.length){let h=n.batteries.map(_=>{if(_.charge){let w=_.power?Math.max(0,F(r.states[_.power])??0):0,g=Math.max(0,F(r.states[_.charge])??0);return w-g}return _.power?F(r.states[_.power],o.battery_invert):null}).filter(_=>_!==null);l=h.length?h.reduce((_,w)=>_+w,0):null}let u=(o.battery_soc?[o.battery_soc]:n.soc).map(h=>Number(r.states[h]?.state)).filter(h=>Number.isFinite(h)),p=u.length?u.reduce((h,_)=>h+_,0)/u.length:NaN,d=o.tariff?r.states[o.tariff]:void 0,m=Number(d?.state),f=o.consumption?F(r.states[o.consumption]):null;return f!==null?f=Math.max(0,f):s!==null||a!==null||l!==null?f=Math.max(0,(s??0)+Math.max(0,a??0)+(l??0)):e.length&&(f=e.reduce((h,_)=>h+_.power,0)),{grid:s,solar:a===null?null:Math.max(0,a),battery:l,soc:Number.isFinite(p)?p:null,tariff:d&&Number.isFinite(m)?{value:m,unit:String(d.attributes.unit_of_measurement??"")}:null,consumption:f}}var ft=globalThis,mt=ft.ShadowRoot&&(ft.ShadyCSS===void 0||ft.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Nt=Symbol(),Pe=new WeakMap,et=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==Nt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(mt&&t===void 0){let n=e!==void 0&&e.length===1;n&&(t=Pe.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&Pe.set(e,t))}return t}toString(){return this.cssText}},Fe=r=>new et(typeof r=="string"?r:r+"",void 0,Nt),Vt=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((n,o,i)=>n+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+r[i+1],r[0]);return new et(e,r,Nt)},De=(r,t)=>{if(mt)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let n=document.createElement("style"),o=ft.litNonce;o!==void 0&&n.setAttribute("nonce",o),n.textContent=e.cssText,r.appendChild(n)}},It=mt?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let n of t.cssRules)e+=n.cssText;return Fe(e)})(r):r;var{is:oo,defineProperty:ro,getOwnPropertyDescriptor:io,getOwnPropertyNames:so,getOwnPropertySymbols:ao,getPrototypeOf:lo}=Object,gt=globalThis,Oe=gt.trustedTypes,co=Oe?Oe.emptyScript:"",uo=gt.reactiveElementPolyfillSupport,nt=(r,t)=>r,Wt={toAttribute(r,t){switch(t){case Boolean:r=r?co:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},Ce=(r,t)=>!oo(r,t),ze={attribute:!0,type:String,converter:Wt,reflect:!1,useDefault:!1,hasChanged:Ce};Symbol.metadata??=Symbol("metadata"),gt.litPropertyMetadata??=new WeakMap;var O=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ze){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let n=Symbol(),o=this.getPropertyDescriptor(t,n,e);o!==void 0&&ro(this.prototype,t,o)}}static getPropertyDescriptor(t,e,n){let{get:o,set:i}=io(this.prototype,t)??{get(){return this[e]},set(s){this[e]=s}};return{get:o,set(s){let a=o?.call(this);i?.call(this,s),this.requestUpdate(t,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ze}static _$Ei(){if(this.hasOwnProperty(nt("elementProperties")))return;let t=lo(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(nt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(nt("properties"))){let e=this.properties,n=[...so(e),...ao(e)];for(let o of n)this.createProperty(o,e[o])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[n,o]of e)this.elementProperties.set(n,o)}this._$Eh=new Map;for(let[e,n]of this.elementProperties){let o=this._$Eu(e,n);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let n=new Set(t.flat(1/0).reverse());for(let o of n)e.unshift(It(o))}else t!==void 0&&e.push(It(t));return e}static _$Eu(t,e){let n=e.attribute;return n===!1?void 0:typeof n=="string"?n:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let n of e.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return De(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,n){this._$AK(t,n)}_$ET(t,e){let n=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,n);if(o!==void 0&&n.reflect===!0){let i=(n.converter?.toAttribute!==void 0?n.converter:Wt).toAttribute(e,n.type);this._$Em=t,i==null?this.removeAttribute(o):this.setAttribute(o,i),this._$Em=null}}_$AK(t,e){let n=this.constructor,o=n._$Eh.get(t);if(o!==void 0&&this._$Em!==o){let i=n.getPropertyOptions(o),s=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:Wt;this._$Em=o;let a=s.fromAttribute(e,i.type);this[o]=a??this._$Ej?.get(o)??a,this._$Em=null}}requestUpdate(t,e,n,o=!1,i){if(t!==void 0){let s=this.constructor;if(o===!1&&(i=this[t]),n??=s.getPropertyOptions(t),!((n.hasChanged??Ce)(i,e)||n.useDefault&&n.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,n))))return;this.C(t,e,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:n,reflect:o,wrapped:i},s){n&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),i!==!0||s!==void 0)||(this._$AL.has(t)||(this.hasUpdated||n||(e=void 0),this._$AL.set(t,e)),o===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[o,i]of this._$Ep)this[o]=i;this._$Ep=void 0}let n=this.constructor.elementProperties;if(n.size>0)for(let[o,i]of n){let{wrapped:s}=i,a=this[o];s!==!0||this._$AL.has(o)||a===void 0||this.C(o,void 0,i,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(e)):this._$EM()}catch(n){throw t=!1,this._$EM(),n}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};O.elementStyles=[],O.shadowRootOptions={mode:"open"},O[nt("elementProperties")]=new Map,O[nt("finalized")]=new Map,uo?.({ReactiveElement:O}),(gt.reactiveElementVersions??=[]).push("2.1.2");var qt=globalThis,He=r=>r,_t=qt.trustedTypes,Ne=_t?_t.createPolicy("lit-html",{createHTML:r=>r}):void 0,Ue="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,Ge="?"+C,ho=`<${Ge}>`,L=document,rt=()=>L.createComment(""),it=r=>r===null||typeof r!="object"&&typeof r!="function",Qt=Array.isArray,po=r=>Qt(r)||typeof r?.[Symbol.iterator]=="function",Lt=`[ 	
\f\r]`,ot=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ve=/-->/g,Ie=/>/g,I=RegExp(`>|${Lt}(?:([^\\s"'>=/]+)(${Lt}*=${Lt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),We=/'/g,Le=/"/g,Ke=/^(?:script|style|textarea|title)$/i,Yt=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),x=Yt(1),je=Yt(2),ui=Yt(3),B=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),Be=new WeakMap,W=L.createTreeWalker(L,129);function qe(r,t){if(!Qt(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ne!==void 0?Ne.createHTML(t):t}var fo=(r,t)=>{let e=r.length-1,n=[],o,i=t===2?"<svg>":t===3?"<math>":"",s=ot;for(let a=0;a<e;a++){let l=r[a],c,u,p=-1,d=0;for(;d<l.length&&(s.lastIndex=d,u=s.exec(l),u!==null);)d=s.lastIndex,s===ot?u[1]==="!--"?s=Ve:u[1]!==void 0?s=Ie:u[2]!==void 0?(Ke.test(u[2])&&(o=RegExp("</"+u[2],"g")),s=I):u[3]!==void 0&&(s=I):s===I?u[0]===">"?(s=o??ot,p=-1):u[1]===void 0?p=-2:(p=s.lastIndex-u[2].length,c=u[1],s=u[3]===void 0?I:u[3]==='"'?Le:We):s===Le||s===We?s=I:s===Ve||s===Ie?s=ot:(s=I,o=void 0);let m=s===I&&r[a+1].startsWith("/>")?" ":"";i+=s===ot?l+ho:p>=0?(n.push(c),l.slice(0,p)+Ue+l.slice(p)+C+m):l+C+(p===-2?a:m)}return[qe(r,i+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},st=class r{constructor({strings:t,_$litType$:e},n){let o;this.parts=[];let i=0,s=0,a=t.length-1,l=this.parts,[c,u]=fo(t,e);if(this.el=r.createElement(c,n),W.currentNode=this.el.content,e===2||e===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(o=W.nextNode())!==null&&l.length<a;){if(o.nodeType===1){if(o.hasAttributes())for(let p of o.getAttributeNames())if(p.endsWith(Ue)){let d=u[s++],m=o.getAttribute(p).split(C),f=/([.?@])?(.*)/.exec(d);l.push({type:1,index:i,name:f[2],strings:m,ctor:f[1]==="."?Ut:f[1]==="?"?Gt:f[1]==="@"?Kt:Q}),o.removeAttribute(p)}else p.startsWith(C)&&(l.push({type:6,index:i}),o.removeAttribute(p));if(Ke.test(o.tagName)){let p=o.textContent.split(C),d=p.length-1;if(d>0){o.textContent=_t?_t.emptyScript:"";for(let m=0;m<d;m++)o.append(p[m],rt()),W.nextNode(),l.push({type:2,index:++i});o.append(p[d],rt())}}}else if(o.nodeType===8)if(o.data===Ge)l.push({type:2,index:i});else{let p=-1;for(;(p=o.data.indexOf(C,p+1))!==-1;)l.push({type:7,index:i}),p+=C.length-1}i++}}static createElement(t,e){let n=L.createElement("template");return n.innerHTML=t,n}};function q(r,t,e=r,n){if(t===B)return t;let o=n!==void 0?e._$Co?.[n]:e._$Cl,i=it(t)?void 0:t._$litDirective$;return o?.constructor!==i&&(o?._$AO?.(!1),i===void 0?o=void 0:(o=new i(r),o._$AT(r,e,n)),n!==void 0?(e._$Co??=[])[n]=o:e._$Cl=o),o!==void 0&&(t=q(r,o._$AS(r,t.values),o,n)),t}var Bt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:n}=this._$AD,o=(t?.creationScope??L).importNode(e,!0);W.currentNode=o;let i=W.nextNode(),s=0,a=0,l=n[0];for(;l!==void 0;){if(s===l.index){let c;l.type===2?c=new at(i,i.nextSibling,this,t):l.type===1?c=new l.ctor(i,l.name,l.strings,this,t):l.type===6&&(c=new jt(i,this,t)),this._$AV.push(c),l=n[++a]}s!==l?.index&&(i=W.nextNode(),s++)}return W.currentNode=L,o}p(t){let e=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,e),e+=n.strings.length-2):n._$AI(t[e])),e++}},at=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,n,o){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=n,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=q(this,t,e),it(t)?t===v||t==null||t===""?(this._$AH!==v&&this._$AR(),this._$AH=v):t!==this._$AH&&t!==B&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):po(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==v&&it(this._$AH)?this._$AA.nextSibling.data=t:this.T(L.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:n}=t,o=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=st.createElement(qe(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===o)this._$AH.p(e);else{let i=new Bt(o,this),s=i.u(this.options);i.p(e),this.T(s),this._$AH=i}}_$AC(t){let e=Be.get(t.strings);return e===void 0&&Be.set(t.strings,e=new st(t)),e}k(t){Qt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,n,o=0;for(let i of t)o===e.length?e.push(n=new r(this.O(rt()),this.O(rt()),this,this.options)):n=e[o],n._$AI(i),o++;o<e.length&&(this._$AR(n&&n._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let n=He(t).nextSibling;He(t).remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,n,o,i){this.type=1,this._$AH=v,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=i,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=v}_$AI(t,e=this,n,o){let i=this.strings,s=!1;if(i===void 0)t=q(this,t,e,0),s=!it(t)||t!==this._$AH&&t!==B,s&&(this._$AH=t);else{let a=t,l,c;for(t=i[0],l=0;l<i.length-1;l++)c=q(this,a[n+l],e,l),c===B&&(c=this._$AH[l]),s||=!it(c)||c!==this._$AH[l],c===v?t=v:t!==v&&(t+=(c??"")+i[l+1]),this._$AH[l]=c}s&&!o&&this.j(t)}j(t){t===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ut=class extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===v?void 0:t}},Gt=class extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==v)}},Kt=class extends Q{constructor(t,e,n,o,i){super(t,e,n,o,i),this.type=5}_$AI(t,e=this){if((t=q(this,t,e,0)??v)===B)return;let n=this._$AH,o=t===v&&n!==v||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,i=t!==v&&(n===v||o);o&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},jt=class{constructor(t,e,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){q(this,t)}};var mo=qt.litHtmlPolyfillSupport;mo?.(st,at),(qt.litHtmlVersions??=[]).push("3.3.3");var Qe=(r,t,e)=>{let n=e?.renderBefore??t,o=n._$litPart$;if(o===void 0){let i=e?.renderBefore??null;n._$litPart$=o=new at(t.insertBefore(rt(),i),i,void 0,e??{})}return o._$AI(r),o};var Zt=globalThis,H=class extends O{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Qe(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}};H._$litElement$=!0,H.finalized=!0,Zt.litElementHydrateSupport?.({LitElement:H});var go=Zt.litElementPolyfillSupport;go?.({LitElement:H});(Zt.litElementVersions??=[]).push("4.2.2");var _o=new Set(["ob","on_battery","onbattery","on battery","battery","outage","power_outage","power outage","offline","off_grid","off grid","off-grid","no_grid","no grid"]),bo=new Set(["power","plug","connectivity","running"]);function Ye(r){if(!r||r.state==="unavailable"||r.state==="unknown")return!1;let t=r.entity_id.split(".")[0];if(t==="binary_sensor")return bo.has(String(r.attributes.device_class))?r.state==="off":r.state==="on";if(t==="input_boolean"||t==="switch")return r.state==="on";let e=Number(r.state);if(r.state!==""&&Number.isFinite(e))return r.attributes.unit_of_measurement==="V"&&e<100;let n=String(r.state).toLowerCase().trim();return _o.has(n)||n.startsWith("ob ")}function U(r,t,e=9e5){let n=r.mean.length;if(!n||t<r.start)return NaN;let o=(t-r.start)/r.step-.5,i=Math.floor(o);if(i<0)return r.mean[0];if(i>=n-1){let u=Ze(r,n-1);return u>=0&&t-(r.start+(u+.5)*r.step)<=e?r.mean[u]:NaN}let s=r.mean[i],a=r.mean[i+1],l=o-i;if(!Number.isNaN(s)&&!Number.isNaN(a))return s+(a-s)*l;let c=Ze(r,i);return c>=0&&t-(r.start+(c+.5)*r.step)<=e?r.mean[c]:NaN}function Ze(r,t){for(let e=t;e>=0;e--)if(!Number.isNaN(r.mean[e]))return e;return-1}function Xe(r,t,e=0){if(typeof t=="number"&&t>=0&&t<=6)return 10**-t;switch(typeof r=="string"?r:""){case"\xB0C":case"\xB0F":case"K":case"A":case"bar":case"km/h":case"m/s":return .1;case"%":case"V":case"hPa":case"mbar":case"dB":case"dBm":return 1;case"W":case"VA":case"var":case"ppm":case"lx":case"\xB5g/m\xB3":return Math.abs(e)>=1e3?10:1;case"kW":case"kWh":case"kVA":return .01;default:return Math.abs(e)>=100?1:Math.abs(e)>=10?.1:.01}}function Je(r,t){if(!Number.isFinite(r))return"unknown";let e=t>=1?0:Math.min(6,Math.max(0,Math.round(-Math.log10(t)))),o=(Math.round(r/t)*t).toFixed(e);return/^-0(\.0*)?$/.test(o)?o.slice(1):o}var yo=r=>typeof r=="string"?{s:r,a:null}:{s:String(r[0]),a:r[1]&&typeof r[1]=="object"?r[1]:null},N=r=>`${r.s}\0${r.a?JSON.stringify(r.a):""}`;function en(r){let t=[...r].sort((d,m)=>d.day_start-m.day_start),e=new Map,n=new Map,o=new Set,i=1/0,s=-1/0,a=null,l=!1,c=null;for(let d of t){i=Math.min(i,d.day_start*1e3),s=Math.max(s,d.end*1e3),d.oldest===null?l=!0:a=a===null?d.oldest*1e3:Math.min(a,d.oldest*1e3),c??=d.keep_days;for(let[m,f]of Object.entries(d.entities??{})){let h=e.get(m)??[],_=d.day_start*1e3,w=Math.min(f.t.length,f.v.length);for(let g=0;g<w;g++){let y=f.tab[f.v[g]];if(y===void 0)continue;let b=yo(y),E=N(b),T=h[h.length-1],tt=_+f.t[g]*1e3;T&&(tt<T.t||T.k===E)||h.push({t:tt,v:b,k:E})}e.set(m,h)}for(let[m,f]of Object.entries(d.stats??{})){let h=n.get(m)??[];h.push({start:f.start*1e3,step:f.step*1e3,mean:f.mean}),n.set(m,h)}for(let m of d.missing??[])o.add(m)}let u=new Map;for(let[d,m]of e){if(!m.length)continue;let f=[],h=new Map,_=new Float64Array(m.length),w=new Uint32Array(m.length),g=new Float64Array(m.length);for(let y=0;y<m.length;y++){let b=h.get(m[y].k);b===void 0&&(b=f.length,f.push(m[y].v),h.set(m[y].k,b)),_[y]=m[y].t,w[y]=b,g[y]=y>0&&m[y-1].v.s===m[y].v.s?g[y-1]:m[y].t}u.set(d,{id:d,times:_,vals:w,values:f,since:g}),o.delete(d)}let p=new Map;for(let[d,m]of n){let f=m[0].step;if(!(f>0))continue;let h=Math.min(...m.map(y=>y.start)),_=Math.max(...m.map(y=>y.start+y.mean.length*y.step)),w=Math.max(0,Math.round((_-h)/f));if(!w)continue;let g=new Float32Array(w).fill(NaN);for(let y of m)y.mean.forEach((b,E)=>{let T=Math.round((y.start+E*y.step-h)/f);typeof b=="number"&&Number.isFinite(b)&&T>=0&&T<w&&(g[T]=b)});g.every(y=>Number.isNaN(y))||(p.set(d,{id:d,start:h,step:f,mean:g}),o.delete(d))}return{start:Number.isFinite(i)?i:0,end:Number.isFinite(s)?s:0,oldest:l?null:a,keepDays:c,tracks:u,series:p,missing:o}}function A(r,t){let e=0,n=r.length-1;if(n<0||r[0]>t)return-1;for(;e<n;){let o=e+n+1>>1;r[o]<=t?e=o:n=o-1}return e}var Y=class{tracks;idx;t=-1/0;constructor(t){this.tracks=[...t.tracks.values()],this.idx=new Int32Array(this.tracks.length).fill(-1)}at(t){let e=t>=this.t;for(let n=0;n<this.tracks.length;n++){let o=this.tracks[n].times,i=this.idx[n];if(!e)i=A(o,t);else{let s=0;for(;i+1<o.length&&o[i+1]<=t&&s<8;)i++,s++;i+1<o.length&&o[i+1]<=t&&(i=A(o,t))}this.idx[n]=i}return this.t=t,this.idx}value(t){let e=this.idx[t];return e<0?null:this.tracks[t].values[this.tracks[t].vals[e]]}},wo=new Set(["unavailable","unknown"]);function Xt(r,t=5*6e4,e=.6,n=10*6e4,o=-1/0){let i=new Y(r);if(!i.tracks.length)return[];let s=Math.max(r.oldest??r.start,o),a=[],l=null;for(let c=s;c<=r.end;c+=t){i.at(c);let u=0;for(let d=0;d<i.tracks.length;d++){let m=i.value(d);(!m||wo.has(m.s))&&u++}let p=u/i.tracks.length>=e;p&&l===null&&(l=c),!p&&l!==null&&(c-l>=n&&a.push([l,c]),l=null)}return l!==null&&r.end-l>=n&&a.push([l,r.end]),a}function nn(r){for(let t=0;t<r.times.length;t++)r.since[t]=t>0&&r.values[r.vals[t-1]].s===r.values[r.vals[t]].s?r.since[t-1]:r.times[t]}function vo(r,t){let e=[...r.values],n=new Map(e.map((c,u)=>[N(c),u])),o=t.values.map(c=>{let u=N(c),p=n.get(u);return p===void 0&&(p=e.length,e.push(c),n.set(u,p)),p}),i=t.times.length?t.times[0]:1/0,s=[],a=[];for(let c=0;c<r.times.length&&r.times[c]<i;c++)s.push(r.times[c]),a.push(r.vals[c]);for(let c=0;c<t.times.length;c++){let u=o[t.vals[c]];a.length&&a[a.length-1]===u||(s.push(t.times[c]),a.push(u))}let l={id:r.id,times:Float64Array.from(s),vals:Uint32Array.from(a),values:e,since:new Float64Array(s.length)};return(r.dropped||t.dropped)&&(l.dropped=Float64Array.from([...r.dropped??[],...t.dropped??[]]).sort()),nn(l),l}function xo(r,t){let e=r.step,n=Math.min(r.start,t.start),o=Math.max(r.start+r.mean.length*r.step,t.start+t.mean.length*t.step),i=Math.max(0,Math.round((o-n)/e)),s=new Float32Array(i).fill(NaN);for(let a of[r,t])for(let l=0;l<a.mean.length;l++){let c=Math.round((a.start+l*a.step-n)/e);!Number.isNaN(a.mean[l])&&c>=0&&c<i&&(s[c]=a.mean[l])}return{id:r.id,start:n,step:e,mean:s}}function on(r,t){let[e,n]=r.start<=t.start?[r,t]:[t,r],o=new Map;for(let l of new Set([...e.tracks.keys(),...n.tracks.keys()])){let c=e.tracks.get(l),u=n.tracks.get(l);o.set(l,c&&u?vo(c,u):c??u)}let i=new Map;for(let l of new Set([...e.series.keys(),...n.series.keys()])){let c=e.series.get(l),u=n.series.get(l);i.set(l,c&&u?xo(c,u):c??u)}let s=new Set([...e.missing,...n.missing].filter(l=>!o.has(l)&&!i.has(l))),a=e.oldest===null?null:e.oldest<e.end?e.oldest:n.oldest??n.start;return{start:e.start,end:Math.max(e.end,n.end),oldest:a,keepDays:n.keepDays??e.keepDays,tracks:o,series:i,missing:s}}function rn(r){let t=0;for(let e of r.tracks.values())t+=e.times.length;return t}function sn(r){let t=0;for(let e of r.tracks.values())t+=e.times.length*20+e.values.length*120;for(let e of r.series.values())t+=e.mean.length*4;return t}var an=3e5;function ln(r,t,e=6e4,n=5*6e4){let o=0;for(let i of t){let s=r.tracks.get(i);if(!s||s.times.length<3)continue;let a=s.times.length,l=f=>s.values[s.vals[f]].s,c=[],u=[],p=null;for(let f=0;f<a;f++){let h=c.length?c[c.length-1]:-1;if(h>=0&&p!==null&&l(h)==="off"&&l(f)==="on"&&f+1<a&&l(f+1)==="off"&&s.times[f+1]-s.times[f]<e&&s.times[f]-p<=n){u.push(s.times[f]),f++,o+=2;continue}if(h>=0&&s.vals[h]===s.vals[f]){o++;continue}h>=0&&l(h)==="on"&&l(f)!=="on"&&(p=s.times[f]),c.push(f)}if(c.length===a)continue;let d=Float64Array.from(c,f=>s.times[f]),m=Uint32Array.from(c,f=>s.vals[f]);s.times=d,s.vals=m,s.since=new Float64Array(c.length),u.length&&(s.dropped=Float64Array.from([...s.dropped??[],...u]).sort()),nn(s)}return o}var tn=new WeakMap;function ko(r){let t=tn.get(r);return(!t||t.size!==r.values.length)&&(t=new Map(r.values.map((e,n)=>[N(e),n])),tn.set(r,t)),t}function Jt(r,t){let e=ko(r),n=r.times.length,o=n?r.times[n-1]:-1/0,i=n?r.vals[n-1]:-1,s=[],a=[];for(let d of t){if(d.t<o)continue;let m=N(d.v),f=e.get(m);f!==i&&(f===void 0&&(f=r.values.length,r.values.push(d.v),e.set(m,f)),s.push(d.t),a.push(f),o=d.t,i=f)}if(!s.length)return 0;let l=n+s.length,c=new Float64Array(l);c.set(r.times),c.set(s,n);let u=new Uint32Array(l);u.set(r.vals),u.set(a,n);let p=new Float64Array(l);p.set(r.since);for(let d=n;d<l;d++)p[d]=d>0&&r.values[u[d-1]].s===r.values[u[d]].s?p[d-1]:c[d];return r.times=c,r.vals=u,r.since=p,s.length}function cn(r,t){let e=-1;for(let o of t)Number.isFinite(o.value)&&o.t>=r.start&&(e=Math.max(e,Math.floor((o.t-r.start)/r.step)));if(e<0)return 0;if(e>=r.mean.length){let o=new Float32Array(e+1).fill(NaN);o.set(r.mean),r.mean=o}let n=0;for(let o of t){if(!Number.isFinite(o.value)||o.t<r.start)continue;let i=Math.floor((o.t-r.start)/r.step);Number.isNaN(r.mean[i])&&(r.mean[i]=o.value,n++)}return n}function un(r,t){let e={id:r,times:new Float64Array(0),vals:new Uint32Array(0),values:[],since:new Float64Array(0)};return Jt(e,t)?e:null}function dn(r,t){if(t<=r.start)return r;let e=new Map;for(let[i,s]of r.tracks){let a=Math.max(0,A(s.times,t));if(a===0){e.set(i,s);continue}let l={id:i,times:s.times.slice(a),vals:s.vals.slice(a),values:s.values,since:s.since.slice(a)};s.dropped&&(l.dropped=s.dropped.filter(c=>c>=t)),e.set(i,l)}let n=new Map;for(let[i,s]of r.series){let a=Math.max(0,Math.floor((t-s.start)/s.step));n.set(i,a?{id:i,start:s.start+a*s.step,step:s.step,mean:s.mean.slice(a)}:s)}let o=r.oldest!==null&&r.oldest>t?r.oldest:null;return{...r,start:t,oldest:o,tracks:e,series:n}}function hn(r,t,e,n){let o={};for(let s of t){let a=r.series.get(s),l=r.tracks.get(s);if(!a&&!l)continue;let c=[];for(let u=Math.floor(e/3e5)*3e5;u<n;u+=3e5){let p=NaN;if(a){let d=Math.floor((u+15e4-a.start)/a.step);p=d>=0&&d<a.mean.length?a.mean[d]:NaN}else if(l){let d=A(l.times,u+15e4);p=d<0?NaN:Number(l.values[l.vals[d]].s)}Number.isFinite(p)&&c.push({start:u,mean:p})}c.length&&(o[s]=c)}return o}var G=null;function te(r){let t=r?.locale?.time_zone,e=r?.config?.time_zone;if(t!=="server"||!e)return null;try{return new Intl.DateTimeFormat("en-US",{timeZone:e}),e}catch{return null}}function ee(r){G=r}var pn=new Map;function So(r){let t=pn.get(r);return t||(t=new Intl.DateTimeFormat("en-US",{timeZone:r,hourCycle:"h23",year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"}),pn.set(r,t)),t}function yt(r,t){let e=[0,0,0,0,0,0];for(let n of So(t).formatToParts(r)){let o=Number(n.value);n.type==="year"?e[0]=o:n.type==="month"?e[1]=o-1:n.type==="day"?e[2]=o:n.type==="hour"?e[3]=o%24:n.type==="minute"?e[4]=o:n.type==="second"&&(e[5]=o)}return e}function bt(r,t){let[e,n,o,i,s,a]=yt(r,t),l=r-(r%1e3+1e3)%1e3;return Date.UTC(e,n,o,i,s,a)-l}function Z(r,t=G){return t?yt(r,t)[3]:new Date(r).getHours()}function z(r,t=G){if(!t)return new Date(r).setHours(0,0,0,0);let[e,n,o]=yt(r,t),i=Date.UTC(e,n,o)-bt(r,t);return i=Date.UTC(e,n,o)-bt(i,t),i}function wt(r,t=G){return z(z(r,t)+27*36e5,t)}function vt(r,t=G){if(!t)return new Date(r).setMinutes(0,0,0);let[,,,,e,n]=yt(r,t);return r-(r%1e3+1e3)%1e3-(e*60+n)*1e3}function ne(r,t,e,n=G){if(!n){let s=new Date(r);return s.setHours(t,e,0,0),s.getTime()}let o=z(r,n),i=o+(t*60+e)*6e4;return i-(bt(i,n)-bt(o,n))}function lt(r=G){return r?{timeZone:r}:{}}var xt={alarm:100,smoke:95,gas:95,co:95,water:90,outage:88,rain:70,door:50,lock:45,garage:40,camera:38,motion:35,washer:25,robot_done:20,robot_start:15,window:12,battery_full:10,pv_peak:8},mn=new Set(["window","battery_full","pv_peak"]),kt=new Set(["alarm","smoke","gas","co","water","outage"]),oe={alarm:"safety",smoke:"safety",gas:"safety",co:"safety",water:"safety",outage:"safety",motion:"safety",camera:"safety",door:"openings",lock:"openings",garage:"openings",rain:"openings",window:"openings",washer:"devices",robot_start:"devices",robot_done:"devices",battery_full:"energy",pv_peak:"energy"},Mo=new Set(["rainy","pouring","lightning-rainy","hail","snowy-rainy"]),K=new Set(["on","open","opening","tilted"]);function Ro(r){let t=Z(r);return t>=23||t<5}function*ct(r){let t=null;for(let e=0;e<r.times.length;e++){let n=r.values[r.vals[e]].s;n!==t&&(yield{t:r.times[e],from:t,to:n}),t=n}}function X(r,t,e){let n=[],o=null;for(let i of ct(r)){let s=t.has(i.to);s&&o===null&&(o=i.t),!s&&o!==null&&(n.push([o,i.t]),o=null)}return o!==null&&n.push([o,e]),n}function Eo(r,t){let e=r.tracks.get(t);if(e){let i=[];for(let s=0;s<e.times.length;s++){let a=Number(e.values[e.vals[s]].s);Number.isFinite(a)&&i.push({t:e.times[s],w:a})}return i}let n=r.series.get(t);if(!n)return[];let o=[];for(let i=0;i<n.mean.length;i++){let s=n.start+(i+.5)*n.step,a=U(n,s);Number.isFinite(a)&&o.push({t:s,w:a})}return o}function Ao(r,t=10,e=5,n=20*6e4){let o=[],i=null;for(let s of r)i===null&&s.w>t?i=s.t:i!==null&&s.w<e&&(s.t-i>=n&&o.push(s.t),i=null);return o}function fn(r,t,e,n,o=3e5){let i=Math.max(0,Math.ceil((n-e)/o)),s=new Float64Array(i).fill(NaN),a=r.series.get(t),l=r.tracks.get(t);for(let c=0;c<i;c++){let u=e+(c+.5)*o;if(a)s[c]=U(a,u);else if(l){let p=A(l.times,u);s[c]=p<0?NaN:Number(l.values[l.vals[p]].s)}}return s}function To(r,t){let e=[],o=Math.floor(r.start/3e5)*3e5;for(let i of t.soc){let s=fn(r,i,o,r.end),a=!1;s.forEach((l,c)=>{Number.isNaN(l)||(l<95?a=!0:l>=99&&a&&(a=!1,e.push({t:o+(c+.5)*3e5,kind:"battery_full",entity:i})))})}if(t.solar.length){let i=t.solar.map(u=>fn(r,u,o,r.end)),s=i[0].length,a=-1,l={t:0,w:0},c=()=>{l.w>100&&e.push({t:l.t,kind:"pv_peak",entity:t.solar[0]}),l={t:0,w:0}};for(let u=0;u<s;u++){let p=o+(u+.5)*3e5,d=z(p);d!==a&&(a>=0&&c(),a=d);let m=0;for(let f of i)Number.isNaN(f[u])||(m+=Math.max(0,f[u]));m>l.w&&(l={t:p,w:m})}a>=0&&(r.end>=wt(a)||t.sunDown?.(r.end))&&c()}return e}function gn({timeline:r,roles:t,weather:e,night:n=Ro,energy:o=null,outage:i=null}){let s=[],a=(d,m,f)=>{d>=r.start&&d<=r.end&&s.push({t:d,kind:m,entity:f})},l=e?r.tracks.get(e):void 0,c=l?X(l,Mo,r.end):[];for(let[d,m]of t){if(m==="washer"){for(let h of Ao(Eo(r,d)))a(h,"washer",d);continue}let f=r.tracks.get(d);if(f){if(m==="window"||m==="window_more"){for(let[h,_]of X(f,K,r.end)){m==="window"&&h>r.start&&h>f.times[0]&&a(h,"window",d);for(let[w,g]of c)h<g&&w<_&&a(Math.max(h,w),"rain",d)}continue}for(let h of ct(f))if(h.from!==null)switch(m){case"door":K.has(h.to)&&!K.has(h.from)&&a(h.t,"door",d);break;case"garage":(h.to==="on"||h.to==="open"||h.to==="opening")&&(h.from==="off"||h.from==="closed"||h.from==="closing")&&a(h.t,"garage",d);break;case"lock":(h.to==="unlocked"||h.to==="open")&&(h.from==="locked"||h.from==="locking")&&a(h.t,"lock",d);break;case"alarm":h.to==="triggered"&&a(h.t,"alarm",d);break;case"smoke":case"gas":case"co":case"water":h.to==="on"&&h.from!=="on"&&a(h.t,m,d);break;case"motion":h.to==="on"&&h.from==="off"&&n(h.t)&&a(h.t,"motion",d);break;case"camera":h.to==="on"&&h.from!=="on"&&a(h.t,"camera",d);break;case"robot":h.to==="cleaning"&&h.from!=="cleaning"&&h.from!=="paused"?a(h.t,"robot_start",d):h.to==="docked"&&(h.from==="cleaning"||h.from==="returning"||h.from==="paused")&&a(h.t,"robot_done",d);break}}}if(o)for(let d of To(r,o))a(d.t,d.kind,d.entity);let u=i?r.tracks.get(i.id):void 0;if(i&&u){let d=m=>Ye({entity_id:i.id,state:m,attributes:i.attributes});for(let m of ct(u))m.from!==null&&d(m.to)&&!d(m.from)&&a(m.t,"outage",i.id)}s.sort((d,m)=>d.t-m.t||xt[m.kind]-xt[d.kind]);let p=new Map;return s.filter(d=>{let m=`${d.kind}:${d.entity}`,f=p.get(m),h=d.kind==="motion"?30*6e4:5*6e4;return f!==void 0&&d.t-f<h?!1:(p.set(m,d.t),!0)})}function _n(r,t){let e=[];for(let n=r.length-1;n>=0;n--){let o=r[n];if(!t.has(oe[o.kind]))continue;let i=vt(o.t),s=e[e.length-1];s&&s.hour===i?s.events.unshift(o):e.push({hour:i,events:[o]})}return e}function bn(r,t,e=14){let n=[];for(let o of r){let i=t(o.t),s=n[n.length-1];s&&i-s.x<e?(s.events.push(o),xt[o.kind]>xt[s.top.kind]&&(s.top=o,s.t=o.t)):n.push({x:i,t:o.t,top:o,events:[o]})}return n}var Mt=[60,360,900,3600],re=[60,360,900,3600,14400],yn=360;function wn(r,t){return r==="low"||t?500:r==="high"?167:250}var St=class{start;end;t;playing=!1;speed;speeds;constructor(t,e,n,o=yn,i=Mt){this.start=t,this.end=e,this.speeds=i,this.t=Math.min(e,Math.max(t,n)),this.speed=i.includes(o)?o:yn}setRange(t,e,n=this.speeds){this.start=t,this.end=e,this.speeds=n,n.includes(this.speed)||(this.speed=n.includes(3600)?3600:n[n.length-1]),this.t=Math.min(e,Math.max(t,this.t))}play(){this.t>=this.end&&(this.t=this.start),this.playing=!0}pause(){this.playing=!1}toggle(){this.playing?this.pause():this.play()}seek(t){this.t=Math.min(this.end,Math.max(this.start,t))}advance(t){if(!this.playing||!(t>0))return!1;let e=Math.min(this.end,this.t+t*this.speed),n=e!==this.t;return this.t=e,this.t>=this.end&&(this.playing=!1),n}nextSpeed(){let t=this.speeds.indexOf(this.speed);return this.speed=this.speeds[(t+1)%this.speeds.length],this.speed}};function vn(r,t,e,n=3e4){if(e>0)return r.find(o=>o.t>t+n)??null;for(let o=r.length-1;o>=0;o--)if(r[o].t<t-n)return r[o];return null}function xn(r,t,e){let n=0,o=r.length;for(;n<o;){let s=n+o>>1;r[s].t<t?n=s+1:o=s}let i=n;for(;i<r.length&&r[i].t<=e;)i++;return n===0&&i===r.length?r:r.slice(n,i)}function ie(r,t,e,n){if(!(e>t))return null;let o=0,i=r.length;for(;o<i;){let s=o+i>>1;r[s].t<=t?o=s+1:i=s}for(let s=o;s<r.length&&r[s].t<=e;s++)if(n(r[s]))return r[s];return null}function Rt(r,t){let e=(r??"").trim(),n=/^-(\d+(?:[.,]\d+)?)\s*(h|m|min)$/i.exec(e);if(n)return t-Number(n[1].replace(",","."))*(n[2].toLowerCase()==="h"?36e5:6e4);let o=/^(\d{1,2}):(\d{2})$/.exec(e);if(!o||Number(o[1])>23||Number(o[2])>59)return null;let i=ne(t,Number(o[1]),Number(o[2]));return i>t?ne(i-864e5,Number(o[1]),Number(o[2])):i}function kn(r){let t=r?.locale?.time_format;if(t==="12")return{hourCycle:"h12"};if(t==="24")return{hourCycle:"h23"};if(t==="system")try{let e=new Intl.DateTimeFormat(void 0,{hour:"numeric"}).resolvedOptions().hourCycle;return e?{hourCycle:e==="h11"||e==="h12"?"h12":"h23"}:{}}catch{return{}}return{}}var ut={prev:"M6 6h2v12H6zM20 6v12l-10-6z",play:"M8 5v14l11-7z",pause:"M7 5h4v14H7zM13 5h4v14h-4z",next:"M16 6h2v12h-2zM4 6v12l10-6z",list:"M4 6h16v2H4zM4 11h16v2H4zM4 16h16v2H4z"},Et=r=>je`<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d=${r} /></svg>`,Sn={alarm:"#ff3b4f",smoke:"#ff3b4f",outage:"#ffc83a",gas:"#ff3b4f",co:"#ff3b4f",water:"#3aa0ff",rain:"#6cc8ff",door:"#ffb020",lock:"#ffb020",garage:"#ffb020",window:"#ffd27a",motion:"#b48cff",camera:"#e07aff",washer:"#4dff9a",robot_start:"#4dff9a",robot_done:"#4dff9a",battery_full:"#ffe27a",pv_peak:"#ffe27a"},$o={alarm:"#ff3b4f",door:"#ffb020",window:"#ffd27a",window_open:"#6cc8ff",light_on:"#ffe27a",motion:"#b48cff",appliance:"#4dff9a"},se=class extends H{static properties={session:{attribute:!1},_w:{state:!0},_label:{state:!0},_toast:{state:!0},_sheet:{state:!0},_filters:{state:!0},_awayFrom:{state:!0},_compare:{state:!0}};unlisten=null;listened=null;resize=null;sig="";dragging=!1;scrubAt=0;scrubTimer;holdTimer;held=!1;labelTimer;toastTimer;clusters=[];clusterSig="";awayOffer=null;awayCache=null;constructor(){super(),this.session=null,this._w=0,this._label=null,this._toast=!1,this._sheet=null,this._filters=new Set(["safety","openings","devices","energy"]),this._awayFrom=null,this._compare=!1}onBlocked=()=>{this._toast=!0,clearTimeout(this.toastTimer),this.toastTimer=setTimeout(()=>this._toast=!1,2600)};onKey=t=>{let e=this.session,n=t.composedPath()[0];if(!(!e?.playback||t.ctrlKey||t.metaKey||t.altKey||n&&/^(INPUT|TEXTAREA|SELECT)$/.test(n.tagName)||n?.isContentEditable))if(t.key===" "){if(n?.tagName==="BUTTON")return;t.preventDefault(),e.toggle()}else(t.key==="ArrowLeft"||t.key==="ArrowRight")&&(t.preventDefault(),e.seek(e.playback.t+(t.key==="ArrowLeft"?-1:1)*(t.shiftKey?36e5:3e5)))};onEscape=t=>{t.key!=="Escape"||!this._sheet||(t.stopImmediatePropagation(),this._sheet=null)};connectedCallback(){super.connectedCallback(),window.addEventListener("fp3d-replay-blocked",this.onBlocked),window.addEventListener("keydown",this.onKey),window.addEventListener("keydown",this.onEscape,!0)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("fp3d-replay-blocked",this.onBlocked),window.removeEventListener("keydown",this.onKey),window.removeEventListener("keydown",this.onEscape,!0),this.unlisten?.(),this.unlisten=null,this.listened=null,this.resize?.disconnect(),this.resize=null;for(let t of[this.scrubTimer,this.holdTimer,this.labelTimer,this.toastTimer])clearTimeout(t)}updated(){this.session!==this.listened&&(this.unlisten?.(),this.listened=this.session,this.unlisten=this.session?this.session.listen(()=>this.onTick()):null);let t=this.renderRoot.querySelector(".track");t&&!this.resize&&typeof ResizeObserver=="function"&&(this.resize=new ResizeObserver(e=>{let n=Math.round(e[0]?.contentRect.width??0);n!==this._w&&(this._w=n)}),this.resize.observe(t)),this.onTick()}signature(){let t=this.session,e=t?.playback,n=this._sheet==="day"&&e?z(e.t):0;return`${t?.state}|${t?.error}|${Math.round((t?.progress??0)*20)}|${e?.playing}|${e?.speed}|${t?.events.length}|${t?.allEvents.length}|${t?.range}|${t?.maxDays}|${t?.loadingDay}|${t?.full}|${t?.version}|${t?.atNow}|${t?.follow}|${t?.stopImportant}|${n}`}onTick(){let t=this.signature();t!==this.sig&&(this.sig=t,this.requestUpdate());let e=this.session,n=e?.playback;if(!e||!n)return;let o=this.renderRoot.querySelector(".clock-time"),i=this.renderRoot.querySelector(".clock-ago");o&&(o.textContent=this.clockText(n.t)),i&&(i.textContent=this.agoText(n.t)),this.dragging||this.placeHead(this.xOf(n.t))}placeHead(t){let e=this.renderRoot.querySelector(".head");e&&(e.style.transform=`translateX(${t.toFixed(1)}px)`)}get language(){return this.session?.opts.live.language??navigator.language}xOf(t){let e=this.session;return!e||!this._w?0:(t-e.start)/(e.end-e.start)*this._w}tOf(t){let e=this.session;return e.start+Math.min(this._w,Math.max(0,t))/Math.max(1,this._w)*(e.end-e.start)}weekday(t){return new Date(t).toLocaleDateString(this.language,{weekday:"short",...lt()}).replace(/\.$/,"")}clockText(t){return`${this.weekday(t)} ${this.time(t)}`}agoText(t){let e=this.session,n=Math.round((e.end-t)/6e4);return n<1?e.t("tt_now"):e.t("tt_ago",{d:this.duration(n*6e4)})}duration(t){let e=this.session,n=Math.round(t/6e4),o=Math.floor(n/1440),i=Math.floor(n%1440/60),s=n%60;return o?`${e.t("tt_days",{n:o})}${i?` ${i} h`:""}`:i?`${i} h${s?` ${s} min`:""}`:`${s} min`}name(t){let e=this.session;return e.names.get(t)??e.opts.live.states[t]?.attributes.friendly_name??t}eventText(t){return this.session.t(`tt_ev_${t.kind}`,{name:this.name(t.entity)})}time(t){return new Date(t).toLocaleTimeString(this.language,{hour:"2-digit",minute:"2-digit",...kn(this.session?.opts.live),...lt()})}onDown(t){let e=this.session;!e?.playback||t.target.closest(".mark")||(t.currentTarget.setPointerCapture?.(t.pointerId),this.dragging=!0,this._label=null,e.pause(),this.scrub(t,!0))}onMove(t){this.dragging&&this.scrub(t,!1)}onUp(t){this.dragging&&(this.scrub(t,!0),this.dragging=!1)}scrub(t,e){let n=this.session,o=this.renderRoot.querySelector(".track"),i=t.clientX-o.getBoundingClientRect().left,s=Math.max(n.playback?.start??n.start,this.tOf(i));this.placeHead(this.xOf(s));let a=this.renderRoot.querySelector(".clock-time");a&&(a.textContent=this.clockText(s)),clearTimeout(this.scrubTimer);let l=n.opts.spec.low||n.opts.quality==="low"?160:70,c=performance.now();e||c-this.scrubAt>=l?(this.scrubAt=c,n.seek(s)):this.scrubTimer=setTimeout(()=>{this.scrubAt=performance.now(),n.seek(s)},l)}markDown(t){this.held=!1,clearTimeout(this.holdTimer),this.holdTimer=setTimeout(()=>{this.held=!0,this.showLabel(t)},450)}markUp(){clearTimeout(this.holdTimer)}markClick(t){if(this.held){this.held=!1;return}this.session?.seek(t.t,!0),this.showLabel(t,2500)}showLabel(t,e=4500){this._label={x:t.x,lines:t.events.slice(0,4).map(n=>`${this.time(n.t)} \xB7 ${this.eventText(n)}`).concat(t.events.length>4?[`+${t.events.length-4}`]:[])},clearTimeout(this.labelTimer),this.labelTimer=setTimeout(()=>this._label=null,e)}renderTrack(){let t=this.session,e=this._w;if(!e)return v;let n=t.range==="7d",o=h=>`${((h-t.start)/(t.end-t.start)*100).toFixed(3)}%`,i=(h,_,w,g)=>_>h?x`<i class=${w} style="left:${o(Math.max(h,t.start))};width:calc(${o(Math.min(_,t.end))} - ${o(Math.max(h,t.start))})">${g?x`<span>${g}</span>`:v}</i>`:v,s=t.timeline?.oldest??null,a=t.playback?.start??t.start,l=t.recorderStart,c=v;a>t.start+6e4&&(t.loadingDay!==null?c=i(t.start,a,"loading",t.t("tt_loading_day",{day:this.weekday(t.loadingDay+12*36e5)})):l!==null&&l>t.start?c=i(t.start,a,"nodata",t.t("tt_recorder_days",{n:t.timeline?.keepDays??0})):c=i(t.start,a,"nodata",t.full?t.t("tt_memory_full"):""));let u=n?e/(t.end-t.start)*36e5*3>=12?3:6:1,p=e>=640?3:6,d=[],m=vt(t.start);for(m<t.start&&(m+=36e5);m<=t.end;m+=36e5){let h=Z(m);if(h%u)continue;let _=h===0,w=_?n?`${this.weekday(m)} ${new Date(m).toLocaleDateString(this.language,{day:"numeric",...lt()}).replace(/\.$/,"")}.`:this.weekday(m):!n&&h%p===0?this.time(m):"";d.push(x`<b class="tick ${_?"tick-day":w?"tick-major":""}" style="left:${o(m)}">${w?x`<span>${w}</span>`:v}</b>`)}let f=`${e}|${t.events.length}|${t.start}|${t.end}|${t.version}|${a}`;return f!==this.clusterSig&&(this.clusterSig=f,this.clusters=bn(t.shownEvents(),h=>this.xOf(h),e<500?18:14)),x`${t.nights.map(([h,_])=>i(h,_,"night"))} ${c} ${s!==null&&s>a?i(a,s,"nodata"):v}
      ${t.gaps.map(([h,_])=>i(h,_,"gap"))} ${d}
      ${this.clusters.map(h=>x`<button
          class="mark ${h.events.length>1?"mark-many":""}"
          style="left:${h.x.toFixed(1)}px;--c:${Sn[h.top.kind]}"
          title=${h.events.map(_=>`${this.time(_.t)} ${this.eventText(_)}`).join(`
`)}
          aria-label=${`${this.time(h.t)} ${this.eventText(h.top)}`}
          @pointerdown=${()=>this.markDown(h)}
          @pointerup=${()=>this.markUp()}
          @pointerleave=${()=>this.markUp()}
          @contextmenu=${_=>_.preventDefault()}
          @click=${()=>this.markClick(h)}
        >
          ${h.events.length>1?x`<span>${h.events.length}</span>`:v}
        </button>`)}
      <div class="head" style="transform:translateX(${this.xOf(t.playback?.t??t.end).toFixed(1)}px)"></div>
      ${this._label?x`<div class="label" style="--x:${this._label.x.toFixed(1)}px">${this._label.lines.map(h=>x`<span>${h}</span>`)}</div>`:v}`}toggleSheet(t="events"){this._sheet=this._sheet===t||this._sheet&&t==="events"?null:t}toggleFilter(t){let e=new Set(this._filters);e.has(t)?e.delete(t):e.add(t),this._filters=e}where(t){return this.session.roomOf.get(t)?.name??""}renderEvents(){let t=this.session,e=t.t,n=["safety","openings","devices",...t.energy?["energy"]:[]],o=_n(t.shownEvents(!0).filter(s=>t.energy||oe[s.kind]!=="energy"),this._filters),i=0;return x`<div class="filters">
        ${n.map(s=>x`<button class="fchip" aria-pressed=${this._filters.has(s)} @click=${()=>this.toggleFilter(s)}>${e(`tt_f_${s}`)}</button>`)}
      </div>
      <label class="opt"><input type="checkbox" .checked=${t.follow} @change=${s=>t.setFollow(s.target.checked)} />${e("tt_follow")}</label>
      <label class="opt"><input type="checkbox" .checked=${t.stopImportant} @change=${s=>t.setStopImportant(s.target.checked)} />${e("tt_stop")}</label>
      ${o.length?o.map(s=>i>=300?v:(i+=s.events.length,x`<h4>${this.clockText(s.hour)}</h4>
              ${s.events.map(a=>this.row(Sn[a.kind],this.time(a.t),this.eventText(a),this.where(a.entity),()=>t.goTo(a)))}`)):x`<p class="none">${e("tt_no_events")}</p>`}`}row(t,e,n,o,i){return x`<button class="row" @click=${i}>
      <i style="background:${t}"></i><time>${e}</time><span>${n}${o?x`<small>${o}</small>`:v}</span>
    </button>`}awayText(t){let e=this.session.t,n=this.name(t.entity);switch(t.kind){case"alarm":case"appliance":return this.eventText({kind:t.event??"alarm",entity:t.entity});case"door":case"window":return e("tt_away_door",{name:n,n:t.count});case"motion":return e("tt_away_motion",{name:n,n:t.count});case"light_on":return e("tt_away_light",{name:n,d:this.duration(t.ms)});case"window_open":return e("tt_away_open",{name:n,d:this.duration(t.ms)})}}renderAway(){let t=this.session,e=t.t,n=t.playback;this.awayOffer?.version!==t.version&&(this.awayOffer={version:t.version,offer:t.awayOffer()});let o=this.awayOffer.offer,[i,s]=this._awayFrom??o??[t.lastClosed!==null&&t.lastClosed>=n.start?t.lastClosed:Math.max(n.start,t.end-3*36e5),t.end],a=`${t.version}|${i}|${s}`;this.awayCache?.key!==a&&(this.awayCache={key:a,rows:t.away(i,s)});let l=this.awayCache.rows,c=d=>this._awayFrom=d,u=(d,m)=>`${this.clockText(d)} \u2013 ${m>=t.end-6e4?e("tt_now"):this.clockText(m)}`,p=d=>{let m=Rt(d.target.value,t.end);m!==null&&c([Math.max(n.start,m),t.end])};return x`<p class="since">${e("tt_away_since")}:</p>
      <div class="filters">
        ${t.lastClosed!==null&&t.lastClosed>=n.start?x`<button class="fchip" aria-pressed=${i===t.lastClosed} @click=${()=>c([t.lastClosed,t.end])}>${e("tt_away_last")}</button>`:v}
        ${o?x`<button class="fchip" aria-pressed=${i===o[0]&&s===o[1]} @click=${()=>c(o)}>${e("tt_away_quiet",{from:this.time(o[0]),to:this.time(o[1])})}</button>`:v}
        <input class="when" type="time" aria-label=${e("tt_away_since")} @change=${p} />
      </div>
      <h4>${u(i,s)}</h4>
      ${l.length?l.slice(0,200).map(d=>this.row($o[d.kind],this.time(d.t),this.awayText(d),this.where(d.entity),()=>t.goTo(d))):x`<p class="none">${e("tt_away_none")}</p>`}`}renderDay(){let t=this.session,e=t.t,n=t.playback,o=z(n.t),i=t.daySummary(o),s=z(o-12*36e5),a=this._compare?t.daySummary(s):null;this._compare&&(!a||a.from>s+6e4)&&queueMicrotask(()=>t.ensureLoaded(s));let l=(b,E)=>b&&b.from>E+6e4?e("tt_day_partial",{time:this.time(b.from)}):"",c=(b,E=1)=>b.toLocaleString(this.language,{maximumFractionDigits:E,minimumFractionDigits:E}),u=b=>b>=6e4?`${c(b/36e5)} h`:"\u2013",p=b=>b&&b.tMin!==null&&b.tMax!==null?`${c(b.tMin)}\u2013${c(b.tMax)}\xB0`:"\u2013",d=b=>x`<td>${b?u(b.lightMs):"\u2013"}</td><td>${b?u(b.windowMs):"\u2013"}</td><td>${b?u(b.heatMs):"\u2013"}</td><td>${p(b)}</td>`,m=new Date(o).toLocaleDateString(this.language,{weekday:"short",day:"numeric",month:"numeric",...lt()}),f=b=>b?.energy??null,h=f(i),_=f(a),w=b=>b===void 0?"\u2013":`${c(b)} kWh`,g=b=>b==null?"\u2013":`${Math.round(b*100)} %`,y=this._compare?a?l(a,s):t.loadingDay!==null?e("tt_loading"):"":"";return x`<h4>${e("tt_day_title",{day:m})}</h4>
      ${l(i,o)?x`<p class="since">${l(i,o)}</p>`:v}
      ${y?x`<p class="since">${e("tt_day_before")}: ${y}</p>`:v}
      <div class="filters">
        <button class="fchip" @click=${()=>t.yesterday()}>⟲ ${e("tt_yesterday")}</button>
        <button class="fchip" aria-pressed=${this._compare} @click=${()=>this._compare=!this._compare}>${e("tt_day_compare")}</button>
      </div>
      ${i&&(i.rooms.length||h)?x`${i.rooms.length?x`<table>
                  <thead>
                    <tr><th></th><th>${e("tt_day_light")}</th><th>${e("tt_day_window")}</th><th>${e("tt_day_heat")}</th><th>${e("tt_day_temp")}</th></tr>
                  </thead>
                  <tbody>
                    ${i.rooms.map(b=>x`<tr><th>${b.name}</th>${d(b)}</tr>
                        ${a?x`<tr class="before"><th>${e("tt_day_before")}</th>${d(a.rooms.find(E=>E.roomId===b.roomId))}</tr>`:v}`)}
                  </tbody>
                </table>`:v}
            ${h?x`<div class="energy">
                  ${[["tt_day_pv",w(h.pv),w(_?.pv)],["tt_day_use",w(h.use),w(_?.use)],["tt_day_import",w(h.imp),w(_?.imp)],["tt_day_export",w(h.exp),w(_?.exp)],["tt_day_self",g(h.self),g(_?.self)]].map(([b,E,T])=>x`<span>${e(b)}</span><b>${E}</b>${a?x`<em>${T}</em>`:v}`)}
                </div>`:v}`:x`<p class="none">${e("tt_day_none")}</p>`}`}renderSheet(){let e=this.session.t,n=this._sheet,o=["events","away","day"];return x`<aside class="sheet" role="dialog" aria-label=${e("tt_sheet")}>
      <header>
        ${o.map(i=>x`<button class="tab" aria-pressed=${n===i} title=${i==="away"?e("tt_away_title"):v} @click=${()=>this._sheet=i}>${e(i==="events"?"tt_tab_events":i==="away"?"tt_tab_away":"tt_tab_day")}</button>`)}
        <button class="x" title=${e("tt_close")} aria-label=${e("tt_close")} @click=${()=>this._sheet=null}>×</button>
      </header>
      <div class="body">${n==="events"?this.renderEvents():n==="away"?this.renderAway():this.renderDay()}</div>
    </aside>`}render(){let t=this.session;if(!t)return v;let e=t.t,n=t.playback,o=t.state==="ready"&&!!n,i=t.state==="error"?t.error==="not_unlocked"?e("tt_locked"):t.error==="no_recorder"?e("tt_no_recorder"):t.error==="unknown_command"?e("tt_restart"):e("tt_error",{error:t.error??"?"}):null,s=n?3600/n.speed:10,a=Math.round((t.end-t.start)/6e4);return x`<div class="frame"></div>
      <div class="clock" role="status" aria-live="off">
        <span class="badge">⏪ ${e("tt_badge")}</span>
        ${o?x`<b class="clock-time"></b><span class="clock-ago"></span>`:x`<span class="clock-msg">${i??`${e("tt_loading")} ${Math.round(t.progress*100)} %`}</span>`}
      </div>
      ${this._toast?x`<div class="toast" role="alert">${e("tt_readonly")}</div>`:v}
      ${o&&this._sheet?this.renderSheet():v}
      <div class="bar">
        <button class="btn prev" ?disabled=${!o} title=${e("tt_prev")} aria-label=${e("tt_prev")} @click=${()=>t.step(-1)}>${Et(ut.prev)}</button>
        <button class="btn play" ?disabled=${!o} title=${e(n?.playing?"tt_pause":"tt_play")} aria-label=${e(n?.playing?"tt_pause":"tt_play")} @click=${()=>t.toggle()}>
          ${Et(n?.playing?ut.pause:ut.play)}
        </button>
        <button class="btn next" ?disabled=${!o} title=${e("tt_next")} aria-label=${e("tt_next")} @click=${()=>t.step(1)}>${Et(ut.next)}</button>
        <div
          class="track ${o?"":"track-wait"}"
          role="slider"
          tabindex="0"
          aria-label=${e("tt_chip")}
          aria-valuemin="0"
          aria-valuemax=${a}
          aria-valuenow=${n?Math.round((n.t-t.start)/6e4):a}
          @pointerdown=${l=>this.onDown(l)}
          @pointermove=${l=>this.onMove(l)}
          @pointerup=${l=>this.onUp(l)}
          @pointercancel=${l=>this.onUp(l)}
        >
          ${o?this.renderTrack():i?x`<em class="msg">${i}</em>`:x`<i class="progress" style="width:${Math.round(t.progress*100)}%"></i>`}
        </div>
        ${i&&t.error!=="not_unlocked"?x`<button class="chip" @click=${()=>{t.load()}}>${e("tt_retry")}</button>`:v}
        <button class="chip range" ?disabled=${!o} title=${e("tt_range_hint")} aria-label=${e("tt_range_hint")} @click=${()=>t.setRange(t.range==="7d"?"24h":"7d")}>
          ${t.range==="7d"?e("tt_days",{n:t.maxDays}):"24 h"}
        </button>
        <button class="btn sheet-btn" ?disabled=${!o} aria-pressed=${!!this._sheet} title=${e("tt_sheet")} aria-label=${e("tt_sheet")} @click=${()=>this.toggleSheet()}>${Et(ut.list)}</button>
        <button class="chip speed" ?disabled=${!o} title=${e("tt_speed",{s:s>=60?"1 min":s>=1?`${Math.round(s)} s`:`${s.toFixed(2).replace(/0$/,"")} s`})} @click=${()=>t.nextSpeed()}>
          ${n?.speed??360}×
        </button>
        <button class="chip live ${t.atNow?"live-now":""}" title=${e("tt_live_hint")} @click=${()=>t.exit()}>
          <i></i>${t.atNow?`${e("tt_now_reached")} \xB7 ${e("tt_live")}`:e("tt_live")}
        </button>
      </div>`}static styles=Vt`
    :host {
      position: absolute;
      inset: 0;
      z-index: 3;
      pointer-events: none;
      container-type: size;
      container-name: fp3dtt;
      font-family: var(--fp3d-font, system-ui, sans-serif);
      color: var(--fp3d-text, #e6eefc);
      --tt: #ffb020;
    }
    .frame {
      position: absolute;
      inset: 0;
      box-shadow: inset 0 0 0 3px var(--tt);
      border-radius: inherit;
    }
    .clock {
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      display: grid;
      justify-items: center;
      gap: 1px;
      padding: 6px 16px 7px;
      border-radius: 14px;
      background: var(--fp3d-chrome-solid, #0f1729);
      border: 1px solid rgba(255, 176, 32, 0.55);
      box-shadow: var(--fp3d-shadow, none);
      white-space: nowrap;
      max-width: calc(100% - 260px);
    }
    .badge {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.12em;
      color: var(--tt);
    }
    .clock-time {
      font-family: var(--fp3d-title-font, inherit);
      font-size: 24px;
      line-height: 1.1;
      font-variant-numeric: tabular-nums;
    }
    .clock-ago,
    .clock-msg {
      font-size: 12px;
      color: var(--fp3d-muted, #8a9bb8);
      white-space: normal;
      text-align: center;
    }
    .toast,
    .label {
      position: absolute;
      bottom: calc(var(--fp3d-tt-h, 64px) + 4px);
      z-index: 3;
      padding: 7px 12px;
      border-radius: 10px;
      background: var(--fp3d-chrome-solid, #0f1729);
      border: 1px solid rgba(255, 176, 32, 0.55);
      box-shadow: var(--fp3d-shadow, none);
      font-size: 13px;
    }
    .toast {
      left: 50%;
      transform: translateX(-50%);
      color: var(--tt);
      font-weight: 600;
    }
    .label {
      /* above its marker on the track, kept within the track */
      bottom: calc(100% + 12px);
      left: clamp(0px, calc(var(--x) - 120px), calc(100% - 240px));
      width: 240px;
      box-sizing: border-box;
      display: grid;
      gap: 3px;
      pointer-events: none;
    }
    .bar {
      position: absolute;
      left: 8px;
      right: 8px;
      bottom: 8px;
      height: calc(var(--fp3d-tt-h, 64px) - 16px);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 0 8px;
      border-radius: 14px;
      background: var(--fp3d-chrome-solid, #0f1729);
      border: 1px solid rgba(255, 176, 32, 0.45);
      box-shadow: var(--fp3d-shadow, none);
      pointer-events: auto;
      touch-action: none;
    }
    button {
      font: inherit;
      color: inherit;
      cursor: pointer;
    }
    button:disabled {
      opacity: 0.45;
      cursor: default;
    }
    .btn {
      flex: none;
      width: 36px;
      height: 36px;
      display: grid;
      place-items: center;
      border: 0;
      border-radius: 10px;
      background: transparent;
    }
    .btn:hover:not(:disabled),
    .sheet-btn[aria-pressed="true"] {
      background: rgba(255, 255, 255, 0.07);
    }
    .sheet-btn[aria-pressed="true"] {
      color: var(--tt);
    }
    .play {
      background: var(--tt);
      color: #1a1200;
    }
    .play:hover:not(:disabled) {
      background: var(--tt);
      filter: brightness(1.1);
    }
    .chip {
      flex: none;
      height: 32px;
      padding: 0 11px;
      border-radius: 999px;
      border: 1px solid var(--fp3d-line, rgba(120, 170, 255, 0.16));
      background: transparent;
      font-size: 13px;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .live {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border-color: var(--fp3d-accent, #37e0ff);
    }
    .live i {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ff3b4f;
    }
    .live-now {
      background: var(--fp3d-accent, #37e0ff);
      color: #04121c;
    }
    .track {
      position: relative;
      flex: 1;
      min-width: 0;
      height: 34px;
      margin: 0 4px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.05);
      cursor: pointer;
      outline-offset: 2px;
    }
    .track-wait {
      cursor: default;
      overflow: hidden;
    }
    .track i {
      position: absolute;
      top: 0;
      bottom: 0;
      overflow: hidden;
    }
    .track i span {
      position: absolute;
      left: 4px;
      bottom: 2px;
      font-size: 10px;
      font-style: normal;
      white-space: nowrap;
      color: var(--fp3d-muted, #8a9bb8);
    }
    .night {
      background: rgba(40, 60, 140, 0.35);
    }
    .nodata {
      background: rgba(140, 150, 170, 0.28);
    }
    .loading {
      background: repeating-linear-gradient(135deg, rgba(255, 176, 32, 0.22) 0 6px, transparent 6px 12px);
    }
    .loading span {
      color: var(--tt) !important;
    }
    .gap {
      background: repeating-linear-gradient(135deg, rgba(160, 170, 190, 0.32) 0 4px, transparent 4px 8px);
    }
    .progress {
      left: 0;
      background: rgba(255, 176, 32, 0.4);
      transition: width 0.2s;
    }
    .msg {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      padding: 0 10px;
      font-size: 12px;
      font-style: normal;
      color: var(--fp3d-muted, #8a9bb8);
      overflow: hidden;
    }
    .tick {
      position: absolute;
      top: 0;
      width: 1px;
      height: 5px;
      background: rgba(200, 215, 240, 0.28);
      pointer-events: none;
    }
    .tick-major {
      height: 9px;
      background: rgba(200, 215, 240, 0.5);
    }
    .tick-day {
      height: 100%;
      background: rgba(255, 176, 32, 0.45);
    }
    .tick span {
      position: absolute;
      left: 3px;
      top: 22px;
      font-size: 10px;
      line-height: 11px;
      font-weight: 500;
      color: var(--fp3d-muted, #8a9bb8);
      white-space: nowrap;
    }
    .tick-day span {
      color: var(--tt);
      font-weight: 700;
    }
    .mark {
      position: absolute;
      top: 6px;
      width: 14px;
      height: 14px;
      margin-left: -7px;
      padding: 0;
      border-radius: 50%;
      border: 2px solid var(--fp3d-chrome-solid, #0f1729);
      background: var(--c);
      box-shadow: 0 0 0 1px var(--c);
      z-index: 1;
    }
    .mark-many {
      width: 18px;
      height: 18px;
      margin-left: -9px;
      top: 4px;
    }
    .mark span {
      display: block;
      font-size: 9px;
      font-weight: 800;
      line-height: 14px;
      color: #0a0f1c;
    }
    .head {
      position: absolute;
      left: -1px;
      top: -5px;
      bottom: -5px;
      width: 3px;
      border-radius: 2px;
      background: var(--tt);
      box-shadow: 0 0 6px var(--tt);
      pointer-events: none;
      z-index: 2;
      will-change: transform;
    }
    .head::after {
      content: "";
      position: absolute;
      left: -5px;
      bottom: -6px;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background: var(--tt);
    }
    .sheet {
      position: absolute;
      top: 78px;
      right: 8px;
      bottom: calc(var(--fp3d-tt-h, 64px) + 4px);
      width: min(380px, calc(100% - 16px));
      box-sizing: border-box;
      display: grid;
      grid-template-rows: auto 1fr;
      border-radius: 14px;
      background: var(--fp3d-chrome-solid, #0f1729);
      border: 1px solid rgba(255, 176, 32, 0.45);
      box-shadow: var(--fp3d-shadow, none);
      pointer-events: auto;
      z-index: 2;
      font-size: 13px;
      overflow: hidden;
    }
    .sheet header {
      display: flex;
      gap: 4px;
      padding: 8px 8px 6px;
      border-bottom: 1px solid var(--fp3d-line, rgba(120, 170, 255, 0.16));
    }
    .tab {
      flex: 1 1 auto;
      min-width: 0;
      padding: 6px 8px;
      border: 0;
      border-radius: 8px;
      background: transparent;
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .tab[aria-pressed="true"] {
      background: rgba(255, 176, 32, 0.18);
      color: var(--tt);
    }
    .x {
      flex: none;
      width: 30px;
      border: 0;
      border-radius: 8px;
      background: transparent;
      font-size: 18px;
    }
    .body {
      overflow-y: auto;
      padding: 8px 10px 12px;
      overscroll-behavior: contain;
    }
    .filters {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 6px;
    }
    .fchip {
      padding: 4px 10px;
      border-radius: 999px;
      border: 1px solid var(--fp3d-line, rgba(120, 170, 255, 0.16));
      background: transparent;
      font-size: 12px;
    }
    .fchip[aria-pressed="true"] {
      border-color: var(--tt);
      background: rgba(255, 176, 32, 0.14);
    }
    .when {
      font: inherit;
      font-size: 12px;
      color: inherit;
      background: transparent;
      border: 1px solid var(--fp3d-line, rgba(120, 170, 255, 0.16));
      border-radius: 999px;
      padding: 3px 8px;
      color-scheme: dark;
    }
    .opt {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: var(--fp3d-muted, #8a9bb8);
      margin: 2px 0;
    }
    .since {
      margin: 0 0 4px;
      font-size: 12px;
      color: var(--fp3d-muted, #8a9bb8);
    }
    .sheet h4 {
      margin: 10px 0 4px;
      font-size: 12px;
      font-weight: 700;
      color: var(--tt);
    }
    .row {
      display: grid;
      grid-template-columns: 10px 44px 1fr;
      align-items: start;
      gap: 6px;
      width: 100%;
      padding: 5px 4px;
      border: 0;
      border-radius: 8px;
      background: transparent;
      text-align: left;
      font-size: 13px;
    }
    .row:hover {
      background: rgba(255, 255, 255, 0.06);
    }
    .row i {
      width: 8px;
      height: 8px;
      margin-top: 5px;
      border-radius: 50%;
    }
    .row time {
      font-variant-numeric: tabular-nums;
      color: var(--fp3d-muted, #8a9bb8);
    }
    .row small {
      display: block;
      font-size: 11px;
      color: var(--fp3d-muted, #8a9bb8);
    }
    .none {
      color: var(--fp3d-muted, #8a9bb8);
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
      font-variant-numeric: tabular-nums;
    }
    th,
    td {
      padding: 4px 3px;
      text-align: right;
      white-space: nowrap;
    }
    th:first-child {
      text-align: left;
      max-width: 110px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    thead th {
      font-weight: 600;
      color: var(--fp3d-muted, #8a9bb8);
    }
    tbody tr:not(.before) {
      border-top: 1px solid var(--fp3d-line, rgba(120, 170, 255, 0.16));
    }
    .before {
      color: var(--fp3d-muted, #8a9bb8);
      font-size: 11px;
    }
    .before th {
      font-weight: 400;
      padding-left: 10px;
    }
    .energy {
      display: grid;
      grid-template-columns: 1fr auto auto;
      gap: 4px 12px;
      margin-top: 12px;
      padding-top: 8px;
      border-top: 1px solid var(--fp3d-line, rgba(120, 170, 255, 0.16));
      font-variant-numeric: tabular-nums;
    }
    .energy b {
      text-align: right;
    }
    .energy em {
      font-style: normal;
      text-align: right;
      color: var(--fp3d-muted, #8a9bb8);
    }
    /* phones and narrow cards: the track on a row of its own above the buttons */
    @container fp3dtt ((max-width: 700px) or ((orientation: portrait) and (max-width: 1000px))) {
      .bar {
        flex-wrap: wrap;
        align-content: center;
        row-gap: 6px;
        padding: 6px 8px;
      }
      .track {
        order: -1;
        flex: 1 0 100%;
        margin: 14px 0 0;
      }
      .live {
        margin-left: auto;
      }
      .chip {
        padding: 0 9px;
      }
      .clock {
        top: 8px;
        padding: 4px 12px 5px;
        max-width: calc(100% - 120px);
      }
      .clock-time {
        font-size: 19px;
      }
      .sheet {
        top: 64px;
      }
    }
  `};customElements.get("fp3d-time-bar")||customElements.define("fp3d-time-bar",se);var Po=new Map;function ae(r,t){return Po.get(t)??Fo(r,t)}function Fo(r,t){let e=r.entities?.[t]?.device_id;return e?Object.values(r.entities??{}).filter(n=>n.device_id===e&&n.entity_id.startsWith("binary_sensor.")).map(n=>n.entity_id).filter(n=>["motion","occupancy","presence"].includes(String(r.states[n]?.attributes.device_class))):[]}var M=["#3a3f47","#3a3f47"],j=["#23262b","#23262b"],$=["#5a3b25","#5a3b25"],S=["#1f4fa8","#1f4fa8"],V=["#e3b616","#e3b616"],k=["#2f7d3b","#2f7d3b"],ss={default:{rest:M,bio:$,paper:S,plastic:V,glass:k,garden:k,recycling:V,other:M},DE:{rest:j,bio:$,paper:S,plastic:V,glass:k,garden:k,recycling:V},AT:{rest:M,bio:$,paper:[M[0],"#c0262d"],plastic:V,glass:k,garden:k},CH:{rest:["#d8d8d8","#d8d8d8"],bio:k,paper:S,plastic:M,glass:k,garden:k},NL:{rest:M,bio:k,paper:S,plastic:["#3a3f47","#e57a1f"],glass:k,garden:k},BE:{rest:M,bio:k,paper:S,plastic:S,glass:k,garden:k},GB:{rest:j,bio:["#3a3f47","#5a3b25"],paper:S,plastic:S,glass:j,garden:$,recycling:S},US:{rest:j,bio:k,paper:S,plastic:S,glass:S,garden:k,recycling:S},CA:{rest:j,bio:k,paper:S,plastic:S,glass:S,garden:k,recycling:S},AU:{rest:["#2f7d3b","#c0262d"],bio:["#2f7d3b","#55b043"],paper:["#2f7d3b","#e3b616"],plastic:["#2f7d3b","#e3b616"],recycling:["#2f7d3b","#e3b616"],glass:["#2f7d3b","#7a3e9d"],garden:["#2f7d3b","#55b043"]},FR:{rest:M,bio:$,paper:[M[0],"#e3b616"],plastic:[M[0],"#e3b616"],recycling:[M[0],"#e3b616"],glass:k,garden:k},IT:{rest:M,bio:$,paper:S,plastic:V,glass:k,garden:k},ES:{rest:M,bio:$,paper:S,plastic:V,glass:k,garden:k},PT:{rest:M,bio:$,paper:S,plastic:V,glass:k,garden:k},DK:{rest:j,bio:k,paper:S,plastic:M,glass:k,garden:k},SE:{rest:j,bio:$,paper:S,plastic:M,glass:k,garden:k},NO:{rest:M,bio:$,paper:S,plastic:M,glass:k,garden:k},FI:{rest:M,bio:$,paper:S,plastic:M,glass:k,garden:k}};function Mn(r){if(r==="washer"||r==="dryer"||r==="dishwasher")return r;let t=ht(r)?.id;return t?/dishwasher/.test(t)?"dishwasher":/dryer/.test(t)?"dryer":/washer|washing/.test(t)?"washer":/oven|cooker/.test(t)?"oven":null:null}var Do=new Set(["person","device_tracker","zone","camera","scene","script","button","input_button","update","event","image","tts","stt","notify","conversation","automation","calendar","todo"]),Oo=new Set(["light","cover","switch","fan","lock","climate","media_player","binary_sensor","sensor","vacuum","alarm_control_panel","water_heater","input_boolean","humidifier","valve"]),zo=600,le=r=>r.slice(0,r.indexOf("."));function Co(r,t){let e=r.states[t];return!t.startsWith("sensor.")||!e||e.attributes.state_class!=="measurement"?!1:Number.isFinite(Number(e.state))||e.state==="unavailable"||e.state==="unknown"}var Rn=new Set(["geocoded_location","location"]),Ho=/location|address|geocoded|ssid|bssid|standort|adresse/i;function No(r,t){let e=r.states[t]?.attributes??{},n=r.entities?.[t]?.translation_key??"";return Rn.has(String(e.device_class??""))||Rn.has(n)||"latitude"in e||"longitude"in e?!0:Ho.test(`${t} ${String(e.friendly_name??"")} ${n}`)}function Tn(r){let t=new Set;for(let e of Object.values(r.states))if(e.entity_id.startsWith("person.")&&Array.isArray(e.attributes.device_trackers))for(let n of e.attributes.device_trackers)typeof n=="string"&&t.add(n);return t}function Vo(r,t=Tn(r)){let e=new Set;for(let n of t){let o=r.entities?.[n]?.device_id;o&&e.add(o)}return e}function ce(r,t,e,n=zo){let o=new Set(t.presence.flatMap(g=>[g.person,g.sensor]).filter(g=>!!g)),i=Tn(r);for(let g of i)o.add(g);let s=Vo(r,i),a=new Set((e.cars??[]).filter(g=>g.startsWith("device_tracker.")&&!o.has(g)&&!!r.states[g])),l=new Set(t.floors.flatMap(g=>g.rooms.map(y=>y.area_id)).filter(g=>!!g)),c=[];for(let[g,y]of Object.entries(r.entities??{})){if(!y.area_id&&y.device_id){let b=zt(r,y.device_id);if(!b||!l.has(b))continue}else if(!y.area_id||!l.has(y.area_id))continue;y.hidden||y.entity_category||!Oo.has(le(g))||c.push(g)}let u=Object.keys(r.states).filter(g=>g.startsWith("weather.")),p=t.floors.flatMap(g=>g.placements.filter(y=>y.entity_id.startsWith("camera.")).flatMap(y=>ae(r,y.entity_id))),d=[...new Set([...a,...e.entities,...p,"sun.sun",...t.settings.weather_entity?[t.settings.weather_entity]:[],...t.settings.outage_entity?[t.settings.outage_entity]:[],...u.slice(0,1),...c])],m=[],f=d.filter(g=>{if(!g.includes(".")||!a.has(g)&&Do.has(le(g))||o.has(g)||!r.states[g])return!1;if(a.has(g))return!0;let y=r.entities?.[g]?.device_id;return y&&s.has(y)||No(r,g)?(m.push(g),!1):!0}),h=f.slice(0,n),_=h.filter(g=>Co(r,g)),w=new Set(_);return{entities:h.filter(g=>!w.has(g)),stats:_,overflow:f.slice(n),cars:h.filter(g=>a.has(g)),hidden:m}}var En={smoke:"smoke",gas:"gas",carbon_monoxide:"co",moisture:"water"},Io=new Set(["front","front_glass","sidelight","sidelights"]);function An(r,t){let e=!1;for(let n=0,o=t.length-1;n<t.length;o=n++){let[i,s]=t[n],[a,l]=t[o];s>r[1]!=l>r[1]&&r[0]<(a-i)*(r[1]-s)/(l-s)+i&&(e=!e)}return e}function Wo(r,t){if(t.type!=="door"||t.wall)return!1;if(t.style&&Io.has(t.style))return!0;if(t.style)return!1;let e=r.rooms.find(p=>p.id===t.room_id);if(!e||e.points.length<3)return!1;let n=e.points[t.edge],o=e.points[(t.edge+1)%e.points.length];if(!n||!o)return!1;let i=Math.hypot(o[0]-n[0],o[1]-n[1]);if(i<1e-6)return!1;let s=(o[0]-n[0])/i,a=(o[1]-n[1])/i,l=[n[0]+s*t.offset,n[1]+a*t.offset],c=p=>[l[0]-a*p,l[1]+s*p],u=An(c(.3),e.points)?c(-.4):c(.4);return!r.rooms.some(p=>p.id!==e.id&&p.points.length>=3&&An(u,p.points))}function ue(r,t,e){let n=new Map,o=new Map(e.furniture);for(let i of t.floors)for(let s of i.furniture){if(!Mn(s.type))continue;let a=o.get(s.id)?.power,l=i.placements.find(u=>r.states[u.entity_id]?.attributes.device_class==="power"&&Math.hypot(u.x-s.x,u.z-s.z)<=1.2)?.entity_id,c=a??l;c&&!n.has(c)&&n.set(c,s)}return n}function $n(r,t,e,n){let o=new Map,i=(a,l)=>{a&&n.has(a)&&!o.has(a)&&o.set(a,l)},s=new Map(e.openings);for(let a of t.floors)for(let l of a.openings){let c=s.get(l.id);if(c)if(l.type==="garage")for(let u of[c.contact,c.cover])i(u,"garage");else if(l.type==="door"){if(Wo(a,l))for(let u of[c.contact,c.contact2])i(u,"door")}else[c.contact,c.tilt,c.contact2,c.tilt2].filter(p=>!!p&&n.has(p)).forEach((p,d)=>i(p,d?"window_more":"window"))}for(let a of ue(r,t,e).keys())i(a,"washer");for(let a of t.floors)for(let l of a.placements)if(l.entity_id.startsWith("camera."))for(let c of ae(r,l.entity_id))i(c,"camera");for(let a of n){if(o.has(a))continue;let l=le(a),c=String(r.states[a]?.attributes.device_class??"");l==="lock"?i(a,"lock"):l==="alarm_control_panel"?i(a,"alarm"):l==="vacuum"?i(a,"robot"):l==="weather"?i(a,"weather"):l==="cover"&&(c==="garage"||c==="gate")?i(a,"garage"):l==="binary_sensor"&&(En[c]?i(a,En[c]):c==="garage_door"?i(a,"garage"):c==="motion"&&i(a,"motion"))}return o}var Lo={light:["brightness","color_mode","rgb_color","color_temp_kelvin"],cover:["current_position","current_tilt_position"],climate:["hvac_action","current_temperature","temperature"],media_player:["media_title","media_artist","app_name","source","volume_level"],weather:["cloud_coverage","wind_speed","wind_speed_unit"],vacuum:["current_room"],fan:[],alarm_control_panel:[],lock:[],water_heater:[]};function Bo(r,t){if(r==="rgb_color")return Array.isArray(t)&&t.every(e=>typeof e=="number")?t.map(e=>Math.round(e)):null;if(typeof t!="number"||!Number.isFinite(t))return t;switch(r){case"brightness":return Math.max(0,Math.min(255,Math.round(Math.round(t/255*50)*2*255/100)));case"color_temp_kelvin":return Math.round(t/50)*50;case"current_position":case"current_tilt_position":case"cloud_coverage":return Math.round(t);case"volume_level":return Math.round(Math.round(t*20)*5)/100;case"current_temperature":case"temperature":case"wind_speed":return Math.round(t*10)/10;default:return t}}function Uo(r){return r==="home"||r==="unavailable"||r==="unknown"?r:"not_home"}function de(r){let t=r.entity_id.slice(0,r.entity_id.indexOf("."));if(t==="device_tracker")return{s:Uo(r.state),a:null};let e=Lo[t];if(!e?.length)return{s:r.state,a:null};let n={};for(let o of e){let i=r.attributes[o];if(i==null)continue;let s=Bo(o,i);s!=null&&(n[o]=s)}return{s:r.state,a:Object.keys(n).length?n:null}}var he=3e5,Pn=2e4,Go=[6e4,he,15*6e4,36e5],Ko=(r,t)=>r.startsWith("sensor.")&&t.state!==""&&Number.isFinite(Number(t.state));function jo(r,t){let e=[];for(let n of r){let o=e[e.length-1];o&&Math.floor(o.t/t)===Math.floor(n.t/t)?e[e.length-1]=n:e.push(n);let i=e[e.length-2];i&&i.k===e[e.length-1].k&&e.pop()}return e}var At=class{ids;seen=new Map;lastKey=new Map;startStates;startedAt;seeded=new Set;rows=new Map;count=0;constructor(t,e,n=Date.now()){this.ids=t,this.startStates=e,this.startedAt=n;for(let o of t)this.seen.set(o,e[o]),e[o]&&this.lastKey.set(o,N(de(e[o])))}get pending(){return this.count}record(t,e){for(let n of this.ids){let o=t[n];if(o===this.seen.get(n)||(this.seen.set(n,o),!o))continue;let i=de(o),s=N(i);if(this.lastKey.get(n)===s)continue;let a=this.rows.get(n),l=a?.[a.length-1],c=Date.parse(o.last_updated??o.last_changed??""),u=Math.max(Number.isFinite(c)?Math.min(e,c):e,l?.t??-1/0);if(l&&Ko(n,o)&&Math.floor(l.t/he)===Math.floor(u/he)){a[a.length-1]={t:u,v:i,k:s},this.lastKey.set(n,s);continue}this.lastKey.set(n,s),a?a.push({t:u,v:i,k:s}):this.rows.set(n,[{t:u,v:i,k:s}]),this.count++}this.count>Pn&&this.compact()}compact(){for(let t of Go){let e=0;for(let[n,o]of this.rows){let i=jo(o,t);this.rows.set(n,i),e+=i.length}if(this.count=e,e<=Pn/2)return}}flush(t,e){let n=0,o=0;for(let i of this.ids){if(this.seeded.has(i)||t.tracks.has(i)||t.series.has(i))continue;this.seeded.add(i);let s=this.startStates[i],a=[...s?[{t:this.startedAt,v:de(s)}]:[],...this.rows.get(i)??[]],l=un(i,a);this.rows.delete(i),l&&(t.tracks.set(i,l),t.missing.delete(i),o++,n+=l.times.length)}for(let[i,s]of this.rows){let a=t.tracks.get(i);if(a){n+=Jt(a,s);continue}let l=t.series.get(i);l&&(n+=cn(l,s.map(c=>({t:c.t,value:Number(c.v.s)}))))}return this.rows=new Map,this.count=0,t.end=Math.max(t.end,e),{added:n,created:o}}};function Fn(r,t,e){if(!(t.state==="opening"||t.state==="closing")||t.pos===null||!e||e.pos===null)return t.pos;let o=e.t-t.t;return!(o>0)||o>18e4||r<=t.t?t.pos:r>=e.t?e.pos:Math.round(t.pos+(e.pos-t.pos)*(r-t.t)/o)}var R=Math.PI/180;function Tt(r,t,e){let n=(e/864e5+24405875e-1-2451545)/36525,o=(280.46646+n*(36000.76983+n*3032e-7))%360,i=357.52911+n*(35999.05029-1537e-7*n),s=.016708634-n*(42037e-9+1267e-10*n),a=Math.sin(i*R)*(1.914602-n*(.004817+14e-6*n))+Math.sin(2*i*R)*(.019993-101e-6*n)+Math.sin(3*i*R)*289e-6,l=125.04-1934.136*n,c=o+a-.00569-.00478*Math.sin(l*R),p=23+(26+(21.448-n*(46.815+n*(59e-5-n*.001813)))/60)/60+.00256*Math.cos(l*R),d=Math.asin(Math.sin(p*R)*Math.sin(c*R)),m=Math.tan(p/2*R)**2,f=4/R*(m*Math.sin(2*o*R)-2*s*Math.sin(i*R)+4*s*m*Math.sin(i*R)*Math.cos(2*o*R)-.5*m*m*Math.sin(4*o*R)-1.25*s*s*Math.sin(2*i*R)),_=(((e/6e4%1440+1440)%1440+f+4*t)%1440+1440)%1440,w=(_/4<0?_/4+180:_/4-180)*R,g=r*R,y=Math.min(1,Math.max(-1,Math.sin(g)*Math.sin(d)+Math.cos(g)*Math.cos(d)*Math.cos(w))),b=Math.acos(y),E=90-b/R;E+=qo(E);let T=Math.cos(g)*Math.sin(b),tt=180;if(Math.abs(T)>1e-9){let xe=Math.acos(Math.min(1,Math.max(-1,(Math.sin(g)*Math.cos(b)-Math.sin(d))/T)))/R;tt=w>0?(xe+180)%360:(540-xe)%360}return{elevation:E,azimuth:tt}}function qo(r){if(r>85)return 0;let t=Math.tan(r*R);return(r>5?58.1/t-.07/t**3+86e-6/t**5:r>-.575?1735+r*(-518.2+r*(103.4+r*(-12.79+r*.711))):-20.772/t)/3600}function pe(r,t,e){return Tt(r,t,e).elevation<-.833}function Dn(r,t,e,n,o=5*6e4){let i=[],s=null;for(let a=e;a<=n;a+=o){let l=pe(r,t,a);l&&s===null&&(s=a),!l&&s!==null&&(i.push([s,a]),s=null)}return s!==null&&i.push([s,n]),i}var Ft=class extends Error{constructor(t){super(`Time travel is read-only: ${t}`),this.name="ReplayReadOnly"}},Qo=new Set(["homeplan3d/building/get","homeplan3d/plans/list","homeplan3d/image/get","homeplan3d/packs/list","homeplan3d/timetravel/history","history/history_during_period","recorder/statistics_during_period"]),Yo=new Set(["homeplan3d/building/subscribe","homeplan3d/plans/subscribe"]),fe={light:["brightness","color_mode","rgb_color","color_temp_kelvin","color_temp","hs_color","xy_color","rgbw_color","rgbww_color","effect"],cover:["current_position","current_tilt_position"],climate:["hvac_action","current_temperature","temperature","target_temp_high","target_temp_low","current_humidity","preset_mode","fan_mode"],media_player:["media_title","media_artist","media_album_name","app_name","app_id","source","volume_level","is_volume_muted","entity_picture","media_content_id","media_duration","media_position","media_position_updated_at","media_series_title","media_season","media_episode","media_channel"],weather:["cloud_coverage","wind_speed","wind_speed_unit","temperature","humidity","pressure","wind_bearing","visibility","dew_point","uv_index","apparent_temperature","precipitation"],fan:["percentage","preset_mode","oscillating","direction"],vacuum:["battery_level","status","fan_speed"],water_heater:["current_temperature","temperature","operation_mode"],humidifier:["humidity","current_humidity","mode"],alarm_control_panel:["changed_by"],lock:["changed_by"],device_tracker:["latitude","longitude","gps_accuracy","altitude","course","speed","vertical_accuracy","battery_level","ip","host_name","mac","zone","in_zones"],sun:["elevation","azimuth","rising","next_rising","next_setting","next_dawn","next_dusk","next_noon","next_midnight"]},On=["person.","device_tracker."],me=r=>r.slice(0,r.indexOf("."));function $t(r,t){if(!t?.some(n=>n in r))return r;let e={...r};for(let n of t)delete e[n];return e}function Pt(r){throw typeof window<"u"&&window.dispatchEvent(new CustomEvent("fp3d-replay-blocked",{detail:{what:r}})),new Ft(r)}function Zo(r,t){let e=r,n={...r,states:t};n.callService=(o,i)=>Pt(`${o}.${i}`),n.callWS=o=>Qo.has(String(o.type))?r.callWS(o):Pt(String(o.type)),n.connection={subscribeMessage:(o,i)=>Yo.has(String(i.type))?r.connection.subscribeMessage(o,i):Promise.reject(new Ft(String(i.type)))};for(let o of["callApi","callApiRaw"]){let i=e[o];typeof i=="function"&&(n[o]=(s,...a)=>String(s).toUpperCase()==="GET"?i.call(r,s,...a):Pt(`${s} ${String(a[0])}`))}for(let o of["sendWS","fetchWithAuth"])o in e&&(n[o]=()=>Pt(o));return n}var Xo=new Set(["light","switch","input_boolean","binary_sensor","fan"]),Dt=class{timeline;cursor;requested;trackAt=new Map;location;slots=new Map;steps=new Map;live=null;frozen;base=null;states={};hass=null;pulses=[];constructor(t,e){this.timeline=t,this.cursor=new Y(t),this.cursor.tracks.forEach((o,i)=>this.trackAt.set(o.id,i)),this.location=e.location??null,this.frozen=e.states??null;let n=new Set([...e.allowed??[]].filter(o=>o.startsWith("device_tracker.")));this.requested=[...new Set([...e.requested,...t.tracks.keys(),...t.series.keys()])].filter(o=>n.has(o)||!On.some(i=>o.startsWith(i)))}refresh(){let t=this.cursor.t;this.cursor=new Y(this.timeline),this.trackAt.clear(),this.cursor.tracks.forEach((e,n)=>this.trackAt.set(e.id,n)),Number.isFinite(t)&&this.cursor.at(t)}hassAt(t,e,n=!0){let o=this.frozen??=t.states,i=!1;if(!this.base){this.base={};for(let[l,c]of Object.entries(o))On.some(u=>l.startsWith(u))||(this.base[l]=l.startsWith("camera.")&&c.attributes.entity_picture?{...c,attributes:$t(c.attributes,["entity_picture","access_token"])}:c);i=!0}this.sameContext(t)||(this.live=t,i=!0);let s=!n&&e>this.cursor.t&&Number.isFinite(this.cursor.t)?this.cursor.idx.slice():null;this.cursor.at(e),this.pulses=s?this.findPulses(s):[];let a=[];for(let l of this.requested){let c=this.slots.get(l),u=this.slot(l,e,o[l],c);u!==c&&(this.slots.set(l,u),a.push(l))}if(!i&&!a.length&&this.hass)return this.hass;if(i){this.states={...this.base};for(let l of this.requested){let c=this.slots.get(l);c&&(this.states[l]=c.obj)}}else{this.states={...this.states};for(let l of a)this.states[l]=this.slots.get(l).obj}return this.hass=Zo(this.live,this.states),this.hass}findPulses(t){let e=[],n=this.cursor.idx;for(let o=0;o<n.length;o++){let i=t[o],s=n[o];if(i<0||s-i<2)continue;let a=this.cursor.tracks[o];if(!Xo.has(me(a.id)))continue;let l=a.values[a.vals[i]].s;if(a.values[a.vals[s]].s===l){for(let c=i+1;c<s;c++)if(a.values[a.vals[c]].s!==l){e.push(a.id);break}}}return e}sameContext(t){let e=this.live;if(!e)return!1;if(e===t)return!0;let n=t;for(let o in n)if(o!=="states"&&n[o]!==e[o])return!1;for(let o in e)if(!(o in n))return!1;return!0}slot(t,e,n,o){let i=this.trackAt.get(t),s=this.timeline.series.get(t),a,l;if(t==="sun.sun"&&this.location){let c=Tt(this.location.lat,this.location.lon,e),u=Math.round(c.elevation*2)/2,p=Math.round(c.azimuth*2)/2,d=Tt(this.location.lat,this.location.lon,e+6e5).elevation>c.elevation;a=`${u}|${p}|${d}`,l=()=>({entity_id:t,state:c.elevation>-.833?"above_horizon":"below_horizon",attributes:{...$t(n?.attributes??{},fe.sun),elevation:u,azimuth:p,rising:d}})}else if(i!==void 0&&this.cursor.idx[i]>=0){let c=this.cursor.tracks[i],u=this.cursor.idx[i],p=c.values[c.vals[u]],d=t.startsWith("cover.")?this.coverPos(c,u,e):null;a=d===null?`${u}`:`${u}:${d}`,l=()=>{let m={...$t(n?.attributes??{},fe[me(t)]),...p.a??{}};d!==null&&(m.current_position=d),t==="sun.sun"&&m.elevation===void 0&&Object.assign(m,{elevation:p.s==="above_horizon"?25:-12,azimuth:180});let f=c.since[u];return f>this.timeline.start?{entity_id:t,state:p.s,attributes:m,last_changed:new Date(f).toISOString()}:{entity_id:t,state:p.s,attributes:m}}}else if(s){let c=U(s,e),u=this.stepOf(t,s,n),p=Je(c,u);a=`n${p}`,l=()=>({entity_id:t,state:p,attributes:n?.attributes??{},last_changed:new Date(e).toISOString()})}else a="none",l=()=>({entity_id:t,state:"unknown",attributes:$t(n?.attributes??{},fe[me(t)])});return o&&o.key===a&&o.attrs===n?.attributes?o:{key:a,attrs:n?.attributes,obj:l()}}coverPos(t,e,n){let o=t.values[t.vals[e]];if(o.s!=="opening"&&o.s!=="closing")return null;let i=a=>typeof a.a?.current_position=="number"?a.a.current_position:null,s=e+1<t.times.length?{t:t.times[e+1],pos:i(t.values[t.vals[e+1]])}:null;return Fn(n,{t:t.times[e],state:o.s,pos:i(o)},s)}stepOf(t,e,n){let o=this.steps.get(t);if(o===void 0){let i=e.mean.find(s=>!Number.isNaN(s))??0;o=Xe(n?.attributes.unit_of_measurement,this.live?.entities?.[t]?.display_precision,i),this.steps.set(t,o)}return o}rows(t,e,n){let o={};for(let i of t){let s=this.timeline.tracks.get(i);if(!s)continue;let a=[];for(let l=Math.max(0,A(s.times,e));l<s.times.length&&s.times[l]<=n;l++)a.push({s:s.values[s.vals[l]].s,lu:s.times[l]/1e3});a.length&&(o[i]=a)}return o}};var zn=new Set(["cleaning","paused","returning"]),Jo=new Set(["","unknown","unavailable","none","null"]);function Cn(r,t,e){if(!r)return[];let n=c=>r.values[r.vals[c]].s,o=A(r.times,e);if(o<0||!zn.has(n(o)))return[];let i=o;for(;i>0&&zn.has(n(i-1));)i--;let s=r.times[i],a=[],l=c=>{let u=typeof c=="string"?c.trim():"";!Jo.has(u.toLowerCase())&&a[a.length-1]!==u&&a.push(u)};if(t){let c=Math.max(0,A(t.times,s));for(t.times[c]<s-6e4&&c++;c<t.times.length&&t.times[c]<=e;c++)l(t.values[t.vals[c]].s)}else for(let c=i;c<=o;c++)l(r.values[r.vals[c]].a?.current_room);return a}var ge=r=>r.slice(0,r.indexOf("."));function tr(r,t){return Ct(r,t)}function _e(r,t){let e=new Map(t.furniture),n=r.floors.flatMap(o=>o.furniture.filter(i=>Ee(i.type)).map(i=>e.get(i.id)?.entity));return new Set(n.filter(o=>!!o&&o.startsWith("switch.")))}function Hn(r,t,e){let n=[],o=new Map;for(let l of Object.keys(r.entities??{})){let c=tr(r,l);c&&o.set(c,[...o.get(c)??[],l])}let i=new Map(e.openings),s=new Map(e.furniture),a=_e(t,e);for(let l of t.floors)for(let c of Me(l)){if(c.points.length<3)continue;let u=new Set(c.area_id?o.get(c.area_id)??[]:[]);for(let f of l.placements)P([f.x,f.z],c.points)&&u.add(f.entity_id);for(let f of l.furniture){let h=s.get(f.id);h?.entity&&P([f.x,f.z],c.points)&&u.add(h.entity)}let p=[];for(let f of l.openings){if(f.room_id!==c.id)continue;let h=i.get(f.id),_=h?[h.contact,h.tilt,h.contact2,h.tilt2].filter(w=>!!w):[];for(let w of _)u.add(w);_.length&&f.type!=="door"&&f.type!=="garage"&&p.push(_)}let d=[...u].filter(f=>!!r.states[f]),m=f=>r.states[f]?.attributes.device_class;n.push({floorId:l.id,roomId:c.id,name:c.name,lights:d.filter(f=>ge(f)==="light"||a.has(f)),windows:p,climates:d.filter(f=>ge(f)==="climate"),temps:(()=>{let f=c.climate?.temperature;if(f&&r.states[f])return[f];let h=/dew|frost|humidex|heat_?index|simmer|wind_?chill|apparent|feels|perceived|comfort/i,_=w=>`${w} ${String(r.states[w]?.attributes.friendly_name??"")}`;return d.filter(w=>ge(w)==="sensor"&&m(w)==="temperature"&&!h.test(_(w)))})(),all:d})}return n}function Nn(r){let t=new Map;for(let e of r)for(let n of e.all)t.has(n)||t.set(n,e);return t}var be=36e5;function dt(r,t,e){let n=r.map(([i,s])=>[Math.max(i,t),Math.min(s,e)]).filter(([i,s])=>s>i);n.sort((i,s)=>i[0]-s[0]);let o=[];for(let i of n){let s=o[o.length-1];s&&i[0]<=s[1]?s[1]=Math.max(s[1],i[1]):o.push([i[0],i[1]])}return o}var Ot=r=>r.reduce((t,[e,n])=>t+(n-e),0);function er(r,t,e){let n=[],o=null;for(let i=0;i<r.times.length;i++){let s=t(r.values[r.vals[i]]);s&&o===null&&(o=r.times[i]),!s&&o!==null&&(n.push([o,r.times[i]]),o=null)}return o!==null&&e>o&&n.push([o,e]),n}function In(r,t,e,n,o=2*be){let i=dt(t.flatMap(l=>{let c=r.tracks.get(l);return c?X(c,K,r.end):[]}),e,n);if(!t.some(l=>r.tracks.has(l)))return[];let s=[],a=e;for(let[l,c]of i)l-a>=o&&s.push([a,l]),a=Math.max(a,c);return n-a>=o&&s.push([a,n]),s}function Wn(r){for(let t=r.length-1;t>=0;t--){let[e,n]=r[t],o=0;for(let i=e;i<n;i+=6e5){let s=Z(i);s>=7&&s<22&&(o+=Math.min(6e5,n-i))}if(o>=be)return[e,n]}return null}var Vn=["alarm","door","window","window_open","light_on","motion","appliance"];function Ln(r){let{timeline:t,roles:e,events:n,from:o,to:i}=r,s=[],a=new Map,l=(u,p,d)=>{let m=`${u}:${p}`,f=a.get(m);if(f)f.count++,f.t=Math.min(f.t,d);else{let h={kind:u,entity:p,t:d,count:1,ms:0};a.set(m,h),s.push(h)}};for(let u of n)u.t<o||u.t>i||(kt.has(u.kind)||u.kind==="rain"?s.push({kind:"alarm",entity:u.entity,t:u.t,count:1,ms:0,event:u.kind}):u.kind==="door"||u.kind==="garage"||u.kind==="lock"?l("door",u.entity,u.t):u.kind==="window"?l("window",u.entity,u.t):(u.kind==="washer"||u.kind==="robot_done")&&s.push({kind:"appliance",entity:u.entity,t:u.t,count:1,ms:0,event:u.kind}));for(let u of r.motion){let p=t.tracks.get(u);if(p){for(let d of ct(p))d.from!==null&&d.t>=o&&d.t<=i&&d.to==="on"&&d.from!=="on"&&l("motion",u,d.t);if(p.dropped)for(let d of p.dropped)d>=o&&d<=i&&l("motion",u,d)}}let c=(u,p,d,m)=>{let f=dt(d,o,i),h=Ot(f);(h>=m||f.length&&f[f.length-1][1]>=i&&h>=6e4)&&s.push({kind:u,entity:p,t:f[0][0],count:f.length,ms:h})};for(let u of r.lights){let p=t.tracks.get(u);p&&c("light_on",u,X(p,nr,t.end),15*6e4)}for(let[u,p]of e){if(p!=="window"&&p!=="window_more")continue;let d=t.tracks.get(u);d&&c("window_open",u,X(d,K,t.end),30*6e4)}return s.sort((u,p)=>Vn.indexOf(u.kind)-Vn.indexOf(p.kind)||(u.kind==="light_on"||u.kind==="window_open"?p.ms-u.ms:u.t-p.t))}var nr=new Set(["on"]);function or(r,t,e,n){let o=1/0,i=-1/0,s=r.series.get(t);if(s)for(let a=0;a<s.mean.length;a++){let l=s.start+(a+.5)*s.step,c=s.mean[a];l<e||l>n||Number.isNaN(c)||(o=Math.min(o,c),i=Math.max(i,c))}else{let a=r.tracks.get(t);if(a)for(let l=Math.max(0,A(a.times,e));l<a.times.length&&a.times[l]<=n;l++){let c=Number(a.values[a.vals[l]].s);Number.isFinite(c)&&(o=Math.min(o,c),i=Math.max(i,c))}}return Number.isFinite(o)?[o,i]:null}function Bn(r,t,e,n,o=null){let i=Math.min(n,r.end),s=[],a=(l,c)=>l.flatMap(u=>{let p=r.tracks.get(u);return p?er(p,c,r.end):[]});for(let l of t){let c=Ot(dt(a(l.lights,f=>f.s==="on"),e,i)),u=Ot(dt(a(l.windows.flat(),f=>K.has(f.s)),e,i)),p=Ot(dt(a(l.climates,f=>f.a?.hvac_action==="heating"),e,i)),d=null,m=null;for(let f of l.temps){let h=or(r,f,e,i);h&&(d=d===null?h[0]:Math.min(d,h[0]),m=m===null?h[1]:Math.max(m,h[1]))}(c||u||p||d!==null)&&s.push({roomId:l.roomId,name:l.name,lightMs:c,windowMs:u,heatMs:p,tMin:d,tMax:m})}return{from:e,to:n,rooms:s,energy:o}}function rr(r,t,e){let n=r.series.get(t);if(n){let s=U(n,e);return Number.isFinite(s)?String(s):null}let o=r.tracks.get(t);if(!o)return null;let i=A(o.times,e);return i<0?null:o.values[o.vals[i]].s}function Un(r,t,e,n,o,i){let s={};for(let a of o){let l=rr(r,a,i);l!==null&&(s[a]={entity_id:a,state:l,attributes:t[a]?.attributes??{}})}return $e({states:s},e,[],n)}function Gn(r,t){let e=r.energy;return[...new Set([e.grid,e.solar,e.battery,e.battery_soc,e.consumption,t.grid,t.gridExport,...t.solar,...t.battery,...t.charge,...t.soc].filter(n=>!!n))]}function Kn(r,t,e,n=3e5){let o=0,i=0,s=0,a=0,l=!1,c=n/be/1e3;for(let u=t+n/2;u<e;u+=n){let p=r(u);p.solar===null&&p.grid===null&&p.consumption===null||(l=!0,o+=Math.max(0,p.solar??0)*c,i+=Math.max(0,p.grid??0)*c,s+=Math.max(0,-(p.grid??0))*c,a+=Math.max(0,p.consumption??0)*c)}return l?{pv:o,imp:i,exp:s,use:a,self:a>0?Math.min(1,Math.max(0,1-i/a)):null}:null}var ir={tt_range_hint:"Range: 24 hours or several days",tt_days:"{n} d",tt_loading_day:"loading {day} \u2026",tt_recorder_days:"Recorder: {n} days",tt_memory_full:"Memory limit reached",tt_now_reached:"Present reached",tt_sheet:"Events, summaries",tt_tab_events:"Events",tt_tab_away:"Away",tt_tab_day:"Day",tt_close:"Close",tt_f_safety:"Safety",tt_f_openings:"Doors & windows",tt_f_devices:"Devices",tt_f_energy:"Energy",tt_follow:"Camera follows events",tt_stop:"Stop at important events",tt_no_events:"No events",tt_ev_window:"{name} opened",tt_ev_battery_full:"Battery full: {name}",tt_ev_pv_peak:"Highest solar power of the day",tt_away_title:"While you were away",tt_away_since:"Since",tt_away_last:"since the last time travel",tt_away_quiet:"quiet {from}\u2013{to}",tt_away_none:"Nothing happened \u2013 all quiet.",tt_away_door:"{name}: opened {n}\xD7",tt_away_motion:"Motion {name}: {n}\xD7",tt_away_light:"{name} was on for {d}",tt_away_open:"{name} stood open for {d}",tt_day_title:"Day summary {day}",tt_day_light:"Light",tt_day_window:"Window",tt_day_heat:"Heating",tt_day_temp:"Temp.",tt_day_pv:"Solar",tt_day_import:"Grid import",tt_day_export:"Export",tt_day_use:"Consumption",tt_day_self:"Self-sufficiency",tt_day_compare:"Compare with the day before",tt_day_before:"Day before",tt_day_none:"There are no values for this day yet.",tt_day_partial:"incomplete (from {time})",tt_yesterday:"Yesterday at this time"};function jn(r){return(t,e={})=>{let n=r(t,e);if(n!==t)return n;let o=ir[t]??t;for(let[i,s]of Object.entries(e))o=o.replace(`{${i}}`,String(s));return o}}var D=24*36e5,ye=150,we=250,sr=10*1024*1024,ar=6e4,lr=6e4,qn=1e4;function J(r,t){try{return t!==void 0&&localStorage.setItem(`fp3d-tt-${r}`,t),localStorage.getItem(`fp3d-tt-${r}`)}catch{return null}}var ve=class{hass=null;replay;state="loading";error=null;progress=0;playback=null;timeline=null;events=[];allEvents=[];names=new Map;gaps=[];nights=[];rooms=[];roomOf=new Map;opts;end;range;loadingDay=null;full=!1;version=0;follow=J("follow")==="1";stopImportant=J("stop")!=="0";lastClosed;t;live;startStates;replayer=null;roles=new Map;weather=null;devices=null;energyIds=[];requested=[];cars=[];liveLog=null;quality;low;timer;last=0;followAt=0;eventsAt=0;flushedAt=0;derivePending=!1;gapsTo=0;wanted=null;needFrom=null;olderRunning=!1;disposed=!1;daySummaries=new Map;listeners=new Set;onVisible=()=>{document.hidden||!this.playback?.playing||(this.last=performance.now(),this.schedule())};constructor(t){this.opts=t,this.live=t.live,this.startStates=t.live.states,this.quality=t.quality,this.low=t.spec.low,this.t=jn(t.t),ee(te(t.live)),this.end=Date.now(),this.range=t.range==="7d"?"7d":"24h";let e=Number(J("closed"));this.lastClosed=Number.isFinite(e)&&e>0&&e<this.end?e:null;let n=this;this.replay={t:this.end,seek:0,pulses:[],focus:null,focusSeq:0,rows:(o,i,s)=>n.replayer?.rows(o,i,s)??{},listen:o=>n.listen(o),stats:(o,i,s)=>n.timeline?hn(n.timeline,o,i,s):{},robotRooms:(o,i)=>n.timeline?Cn(n.timeline.tracks.get(o),i?n.timeline.tracks.get(i):void 0,n.replay.t):[],setQuality:(o,i)=>n.setQuality(o,i)},document.addEventListener("visibilitychange",this.onVisible),this.load()}listen(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notify(){for(let t of this.listeners)t()}get playing(){return!!this.playback?.playing}get maxDays(){return(this.quality==="low"||this.low)&&this.opts.range!=="7d"?2:7}get start(){return this.end-(this.range==="7d"?this.maxDays:1)*D}get recorderStart(){let t=this.timeline?.keepDays;return typeof t=="number"&&t>0?this.end-t*D:null}get atNow(){let t=this.playback;return!!t&&!t.playing&&t.t>=t.end-1e3&&Date.now()-t.end<12e4}get location(){let t=this.live.config;return typeof t?.latitude=="number"&&typeof t?.longitude=="number"?{lat:t.latitude,lon:t.longitude}:null}get energy(){return!!this.opts.spec.energy&&this.energyIds.length>0}async fetchWindow(t,e,n){let o=ce(this.live,this.opts.building,this.opts.spec),i=Math.max(1,Math.ceil(o.entities.length/ye),Math.ceil(o.stats.length/we)),s=[];for(let a=0;a<i;a++){let l=o.entities.slice(a*ye,(a+1)*ye),c=o.stats.slice(a*we,(a+1)*we),u={type:"homeplan3d/timetravel/history",start_time:t/1e3,end_time:e/1e3,entity_ids:l,statistic_ids:c},p=o.cars.filter(d=>l.includes(d));if(p.length&&(u.car_trackers=p),s.push(await this.live.callWS(u)),this.disposed)return null;n?.((a+1)/i)}return en(s)}async load(){this.state="loading",this.error=null,this.progress=0,this.notify();let{building:t,spec:e}=this.opts,n=this.live,o=ce(n,t,e),i;try{i=await this.fetchWindow(this.end-D,this.end,c=>{this.progress=c,this.notify()})}catch(c){if(this.disposed)return;let u=c;this.state="error",this.error=u?.code??u?.message??String(c),this.notify();return}if(!i)return;let s=t.presence.flatMap(c=>[c.sensor]).filter(c=>!!c);this.requested=[...o.entities,...o.stats,...o.overflow,...o.hidden,...s],this.cars=o.cars;let a=new Map(e.furniture);this.devices=e.energy?Ht(t,c=>a.get(c.id)?.power??null):null,this.energyIds=this.devices?Gn(t,this.devices):[],this.rooms=Hn(n,t,e),this.roomOf=Nn(this.rooms);for(let[c,u]of ue(n,t,e))this.names.set(c,u.name||this.t(`furn_${u.type}`));this.setTimeline(i);let l=typeof this.opts.at=="number"?this.opts.at:Rt(this.opts.at??null,this.end);this.playback=new St(i.start,this.end,l??this.end-36e5,this.opts.speed??void 0,this.range==="7d"?re:Mt),this.liveLog=new At([...o.entities,...o.stats,...o.overflow],this.startStates,this.end),this.liveLog.record(this.live.states,Date.now()),this.flushedAt=Date.now(),this.state="ready",this.apply(!0),this.range==="7d"&&this.loadOlder()}setTimeline(t){let{building:e,spec:n}=this.opts,o=this.live,i=new Set([...t.tracks.keys(),...t.series.keys()]);this.roles=$n(o,e,n,i),rn(t)>an&&ln(t,this.motion()),this.timeline=t,this.version++,this.daySummaries.clear(),this.replayer=new Dt(t,{requested:this.requested,location:this.location,states:this.startStates,allowed:this.cars}),this.weather??=[e.settings.weather_entity,...Object.keys(o.states).filter(s=>s.startsWith("weather."))].find(s=>!!s&&i.has(s))??null,this.findEvents(),this.gaps=Xt(t),this.gapsTo=t.end,this.updateNights()}findEvents(){let t=this.timeline;if(!t)return;let{building:e,spec:n}=this.opts,o=this.devices,i=o&&n.energy?{solar:e.energy.solar?[e.energy.solar]:o.solar,soc:e.energy.battery_soc?[e.energy.battery_soc]:o.soc,sunDown:l=>this.sunDown(l)}:null,s=e.settings.outage_entity,a=s&&this.live.states[s]?{id:s,attributes:this.live.states[s].attributes}:null;this.allEvents=gn({timeline:t,roles:this.roles,weather:this.weather,energy:i,outage:a}),this.events=this.allEvents.filter(l=>!mn.has(l.kind))}sunDown(t){let e=this.location;if(e)return pe(e.lat,e.lon,t);let n=this.timeline?.tracks.get("sun.sun"),o=n?A(n.times,t):-1;return!!n&&o>=0&&n.values[n.vals[o]].s==="below_horizon"}shownEvents(t=!1){let e=this.playback,n=t?this.allEvents:this.events;return e?xn(n,Math.max(e.start,this.start),this.end):n}motion(){return[...this.roles].filter(([,t])=>t==="motion"||t==="camera").map(([t])=>t)}updateNights(){let t=this.location;this.nights=t?Dn(t.lat,t.lon,this.start,this.end):this.sunNights()}async loadOlder(){if(!this.olderRunning){this.olderRunning=!0;try{for(;!this.disposed&&this.timeline&&!this.full;){let t=this.timeline.start,e=Math.min(this.range==="7d"?this.start:1/0,this.needFrom??1/0);if(t<=e+6e4)break;let n=this.recorderStart;if(n!==null&&t<=n||this.timeline.oldest!==null&&this.timeline.oldest>this.timeline.start)break;this.loadingDay=t-D,this.notify();let o;try{o=await this.fetchWindow(t-D,t)}catch(l){console.warn("HomePlan 3D: time travel could not load an older day",l);break}if(!o||this.disposed||!this.timeline)return;let i=on(o,this.timeline);this.setTimeline(i),sn(i)>sr&&(this.full=!0);let s=this.playback;if(!s)continue;s.setRange(Math.max(i.start,this.start),this.end);let a=!1;this.wanted!==null&&this.wanted>=s.start&&(s.seek(this.wanted),this.wanted=null,a=!0),this.apply(!0,a)}}finally{this.olderRunning=!1,this.disposed||(this.loadingDay=null,this.notify())}}}setRange(t){let e=this.playback;if(t===this.range||!e||!this.timeline)return;this.range=t;let n=e.t;e.setRange(Math.max(this.timeline.start,this.start),this.end,t==="7d"?re:Mt),this.updateNights(),e.t!==n?this.apply(!0):this.notify(),t==="7d"&&this.loadOlder()}sunNights(){let t=this.timeline?.tracks.get("sun.sun");if(!t)return[];let e=[],n=null;for(let o=0;o<t.times.length;o++){let i=t.values[t.vals[o]].s==="below_horizon";i&&n===null&&(n=t.times[o]),!i&&n!==null&&(e.push([n,t.times[o]]),n=null)}return n!==null&&e.push([n,this.end]),e}apply(t,e=t){let n=this.playback;if(!n||!this.replayer||this.disposed)return;this.replay.t=n.t,e&&this.replay.seek++;let o=this.replayer.hassAt(this.live,n.t,t);this.replay.pulses=this.replayer.pulses,(o!==this.hass||t)&&(this.hass=o,this.opts.onChange()),this.notify()}setLive(t){this.live=t,ee(te(t));let e=Date.now();this.liveLog?.record(t.states,e);let n=this.playback,o=!1;if(this.state==="ready"&&n&&this.liveLog&&(this.liveLog.pending&&e-this.flushedAt>=lr||this.derivePending&&e-this.eventsAt>qn)){let i=!n.playing&&n.t>=n.end-1e3;this.edge(e),i&&n.seek(n.end),this.replay.t=n.t,o=!0}this.replayer&&n&&(this.hass=this.replayer.hassAt(t,n.t)),o&&this.notify()}setQuality(t,e){let n=this.maxDays;this.quality=t,this.low=e;let o=this.playback;if(n===this.maxDays||!o||!this.timeline)return;let i=this.end-this.maxDays*D,s=this.timeline.start<i-6e4;if(s)this.setTimeline(dn(this.timeline,i)),this.full=!1,this.needFrom!==null&&this.needFrom<i&&(this.needFrom=null),this.wanted!==null&&this.wanted<i&&(this.wanted=null);else if(this.range!=="7d")return;let a=o.t;o.setRange(Math.max(this.timeline.start,this.start),this.end),this.updateNights(),s||o.t!==a?this.apply(!0,o.t!==a):this.notify(),this.loadOlder()}play(){let t=this.playback;if(!t)return;let e=t.t>=t.end;t.play(),e&&this.apply(!0),this.last=performance.now(),this.schedule(),this.notify()}pause(){this.playback?.pause(),clearTimeout(this.timer),this.timer=void 0,this.derivePending&&this.derive(Date.now()),this.notify()}toggle(){this.playback?.playing?this.pause():this.play()}seek(t,e=!1){this.playback&&(e&&this.pause(),this.wanted=null,this.playback.seek(t),this.last=performance.now(),this.apply(!0))}step(t){let e=this.playback;if(!e)return;let n=vn(this.shownEvents(),e.t,t);this.seek(n?n.t:t>0?e.end:e.start,!0)}goTo(t){this.seek(t.t,!0),this.focusOn(t.entity)}focusOn(t){this.replay.focus=t,this.replay.focusSeq++,this.notify()}yesterday(){let t=this.playback;if(!t)return;let e=t.t-D;e<t.start&&this.range==="24h"&&this.setRange("7d"),this.seek(Math.max(e,t.start),!0),e<t.start&&this.olderRunning&&(this.wanted=e)}setFollow(t){this.follow=t,J("follow",t?"1":"0"),this.notify()}setStopImportant(t){this.stopImportant=t,J("stop",t?"1":"0"),this.notify()}nextSpeed(){this.playback?.nextSpeed(),this.notify()}awayOffer(){let t=this.timeline;return t?Wn(In(t,this.motion(),t.start,this.end)):null}away(t,e){let n=this.timeline;if(!n)return[];let o=_e(this.opts.building,this.opts.spec);return Ln({timeline:n,roles:this.roles,events:this.allEvents,lights:[...n.tracks.keys()].filter(i=>i.startsWith("light.")||o.has(i)),motion:this.motion(),from:t,to:e})}ensureLoaded(t){let e=this.timeline;!e||e.start<=t+6e4||this.needFrom!==null&&this.needFrom<=t||t<this.end-this.maxDays*D-D||(this.needFrom=t,this.loadOlder())}daySummary(t){let e=this.timeline;if(!e||t+D<=e.start||t>e.end)return null;let n=`${t}|${this.version}`,o=this.daySummaries.get(n);if(!o){let i=wt(t),s=Math.max(t,e.start),a=Math.min(i,e.end),l=this.devices,c=this.energy&&l?Kn(u=>Un(e,this.live.states,this.opts.building,l,this.energyIds,u),s,a):null;o=Bn(e,this.rooms,s,a,c),this.daySummaries.set(n,o)}return o}schedule(){clearTimeout(this.timer),this.timer=void 0;let t=this.playback;!t?.playing||this.disposed||document.hidden||(this.timer=setTimeout(()=>{this.timer=void 0;let e=performance.now(),n=Math.min(2e3,e-this.last);this.last=e;let o=t.t;if(t.end-t.t<=ar+n*t.speed&&this.edge(),t.advance(n)){let i=this.stopImportant&&t.speed>=900?ie(this.allEvents,o,t.t,s=>kt.has(s.kind)):null;if(i){t.seek(i.t),t.pause(),this.apply(!0),this.focusOn(i.entity);return}if(this.apply(!1),this.follow&&e-this.followAt>2500){let s=ie(this.events,o,t.t,()=>!0);s&&(this.followAt=e,this.focusOn(s.entity))}}t.playing?this.schedule():(this.derivePending&&this.derive(Date.now()),this.notify())},wn(this.quality,this.low)))}edge(t=Date.now()){let e=this.playback,n=this.timeline;if(!e||!n||!this.liveLog||t-this.end<1e3&&!this.liveLog.pending&&!this.derivePending)return;let{added:o,created:i}=this.liveLog.flush(n,t);this.flushedAt=t,this.end=t,e.setRange(Math.max(n.start,this.start),t),i&&this.replayer?.refresh(),(o||i)&&(this.derivePending=!0),this.derivePending&&(!e.playing||t-this.eventsAt>qn)&&this.derive(t)}derive(t){let e=this.timeline;if(!e)return;this.derivePending=!1,this.eventsAt=t,this.findEvents();let n=Math.max(e.start,this.gapsTo-30*6e4),o=this.gaps.filter(([a])=>a<n).map(([a,l])=>[a,Math.min(l,n)]),i=Xt(e,void 0,void 0,void 0,n),s=o[o.length-1];s&&i.length&&s[1]>=n&&i[0][0]<=n&&(s[1]=i.shift()[1]),this.gaps=[...o,...i],this.gapsTo=e.end,this.updateNights(),this.version++,this.daySummaries.clear()}exit(){this.opts.onExit()}dispose(){!this.disposed&&this.state==="ready"&&J("closed",String(Date.now())),this.disposed=!0,clearTimeout(this.timer),this.timer=void 0,this.listeners.clear(),this.liveLog=null,document.removeEventListener("visibilitychange",this.onVisible)}};function js(r){return new ve(r)}export{sr as MAX_BYTES,ve as Session,js as startTimeTravel};

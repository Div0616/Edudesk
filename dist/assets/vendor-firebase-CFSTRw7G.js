var Ku={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ch=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let i=r.charCodeAt(n);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(i=65536+((i&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Mm=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const i=r[t++];if(i<128)e[n++]=String.fromCharCode(i);else if(i>191&&i<224){const s=r[t++];e[n++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=r[t++],o=r[t++],c=r[t++],u=((i&7)<<18|(s&63)<<12|(o&63)<<6|c&63)-65536;e[n++]=String.fromCharCode(55296+(u>>10)),e[n++]=String.fromCharCode(56320+(u&1023))}else{const s=r[t++],o=r[t++];e[n++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},Dh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let i=0;i<r.length;i+=3){const s=r[i],o=i+1<r.length,c=o?r[i+1]:0,u=i+2<r.length,h=u?r[i+2]:0,f=s>>2,m=(s&3)<<4|c>>4;let I=(c&15)<<2|h>>6,S=h&63;u||(S=64,o||(I=64)),n.push(t[f],t[m],t[I],t[S])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(Ch(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):Mm(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let i=0;i<r.length;){const s=t[r.charAt(i++)],c=i<r.length?t[r.charAt(i)]:0;++i;const h=i<r.length?t[r.charAt(i)]:64;++i;const m=i<r.length?t[r.charAt(i)]:64;if(++i,s==null||c==null||h==null||m==null)throw new Fm;const I=s<<2|c>>4;if(n.push(I),h!==64){const S=c<<4&240|h>>2;if(n.push(S),m!==64){const D=h<<6&192|m;n.push(D)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class Fm extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Um=function(r){const e=Ch(r);return Dh.encodeByteArray(e,!0)},Vh=function(r){return Um(r).replace(/\./g,"")},Nh=function(r){try{return Dh.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bm(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qm=()=>Bm().__FIREBASE_DEFAULTS__,jm=()=>{if(typeof process>"u"||typeof Ku>"u")return;const r=Ku.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},Gm=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&Nh(r[1]);return e&&JSON.parse(e)},Ls=()=>{try{return qm()||jm()||Gm()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},zm=r=>{var e,t;return(t=(e=Ls())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[r]},kh=()=>{var r;return(r=Ls())===null||r===void 0?void 0:r.config},Oh=r=>{var e;return(e=Ls())===null||e===void 0?void 0:e[`_${r}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Km{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ve(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function $m(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ve())}function Wm(){var r;const e=(r=Ls())===null||r===void 0?void 0:r.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Hm(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Qm(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function Jm(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Ym(){const r=ve();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function xh(){return!Wm()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Lh(){try{return typeof indexedDB=="object"}catch{return!1}}function Xm(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(n);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zm="FirebaseError";class vt extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=Zm,Object.setPrototypeOf(this,vt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,pi.prototype.create)}}class pi{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?eg(s,n):"Error",c=`${this.serviceName}: ${o} (${i}).`;return new vt(i,c,n)}}function eg(r,e){return r.replace(tg,(t,n)=>{const i=e[n];return i!=null?String(i):`<${n}?>`})}const tg=/\{\$([^}]+)}/g;function ng(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function Jr(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const i of t){if(!n.includes(i))return!1;const s=r[i],o=e[i];if($u(s)&&$u(o)){if(!Jr(s,o))return!1}else if(s!==o)return!1}for(const i of n)if(!t.includes(i))return!1;return!0}function $u(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nr(r){const e=[];for(const[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function Lr(r){const e={};return r.replace(/^\?/,"").split("&").forEach(n=>{if(n){const[i,s]=n.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function Mr(r){const e=r.indexOf("?");if(!e)return"";const t=r.indexOf("#",e);return r.substring(e,t>0?t:void 0)}function rg(r,e){const t=new ig(r,e);return t.subscribe.bind(t)}class ig{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let i;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");sg(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:n},i.next===void 0&&(i.next=Bo),i.error===void 0&&(i.error=Bo),i.complete===void 0&&(i.complete=Bo);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function sg(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function Bo(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j(r){return r&&r._delegate?r._delegate:r}class ln{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class og{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new Km;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&n.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(cg(e))try{this.getOrInitializeService({instanceIdentifier:Zt})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});n.resolve(s)}catch{}}}}clearInstance(e=Zt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Zt){return this.instances.has(e)}getOptions(e=Zt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[s,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(s);n===c&&o.resolve(i)}return i}onInit(e,t){var n;const i=this.normalizeInstanceIdentifier(t),s=(n=this.onInitCallbacks.get(i))!==null&&n!==void 0?n:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const i of n)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:ag(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=Zt){return this.component?this.component.multipleInstances?e:Zt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ag(r){return r===Zt?void 0:r}function cg(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ug{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new og(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var H;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(H||(H={}));const lg={debug:H.DEBUG,verbose:H.VERBOSE,info:H.INFO,warn:H.WARN,error:H.ERROR,silent:H.SILENT},hg=H.INFO,dg={[H.DEBUG]:"log",[H.VERBOSE]:"log",[H.INFO]:"info",[H.WARN]:"warn",[H.ERROR]:"error"},fg=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),i=dg[e];if(i)console[i](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Va{constructor(e){this.name=e,this._logLevel=hg,this._logHandler=fg,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in H))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?lg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,H.DEBUG,...e),this._logHandler(this,H.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,H.VERBOSE,...e),this._logHandler(this,H.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,H.INFO,...e),this._logHandler(this,H.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,H.WARN,...e),this._logHandler(this,H.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,H.ERROR,...e),this._logHandler(this,H.ERROR,...e)}}const pg=(r,e)=>e.some(t=>r instanceof t);let Wu,Hu;function mg(){return Wu||(Wu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function gg(){return Hu||(Hu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Mh=new WeakMap,na=new WeakMap,Fh=new WeakMap,qo=new WeakMap,Na=new WeakMap;function _g(r){const e=new Promise((t,n)=>{const i=()=>{r.removeEventListener("success",s),r.removeEventListener("error",o)},s=()=>{t(kt(r.result)),i()},o=()=>{n(r.error),i()};r.addEventListener("success",s),r.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Mh.set(t,r)}).catch(()=>{}),Na.set(e,r),e}function yg(r){if(na.has(r))return;const e=new Promise((t,n)=>{const i=()=>{r.removeEventListener("complete",s),r.removeEventListener("error",o),r.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{n(r.error||new DOMException("AbortError","AbortError")),i()};r.addEventListener("complete",s),r.addEventListener("error",o),r.addEventListener("abort",o)});na.set(r,e)}let ra={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return na.get(r);if(e==="objectStoreNames")return r.objectStoreNames||Fh.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return kt(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function Ig(r){ra=r(ra)}function vg(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=r.call(jo(this),e,...t);return Fh.set(n,e.sort?e.sort():[e]),kt(n)}:gg().includes(r)?function(...e){return r.apply(jo(this),e),kt(Mh.get(this))}:function(...e){return kt(r.apply(jo(this),e))}}function Eg(r){return typeof r=="function"?vg(r):(r instanceof IDBTransaction&&yg(r),pg(r,mg())?new Proxy(r,ra):r)}function kt(r){if(r instanceof IDBRequest)return _g(r);if(qo.has(r))return qo.get(r);const e=Eg(r);return e!==r&&(qo.set(r,e),Na.set(e,r)),e}const jo=r=>Na.get(r);function Tg(r,e,{blocked:t,upgrade:n,blocking:i,terminated:s}={}){const o=indexedDB.open(r,e),c=kt(o);return n&&o.addEventListener("upgradeneeded",u=>{n(kt(o.result),u.oldVersion,u.newVersion,kt(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",h=>i(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const wg=["get","getKey","getAll","getAllKeys","count"],Ag=["put","add","delete","clear"],Go=new Map;function Qu(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(Go.get(e))return Go.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,i=Ag.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(i||wg.includes(t)))return;const s=async function(o,...c){const u=this.transaction(o,i?"readwrite":"readonly");let h=u.store;return n&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),i&&u.done]))[0]};return Go.set(e,s),s}Ig(r=>({...r,get:(e,t,n)=>Qu(e,t)||r.get(e,t,n),has:(e,t)=>!!Qu(e,t)||r.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rg{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Sg(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function Sg(r){const e=r.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ia="@firebase/app",Ju="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gt=new Va("@firebase/app"),bg="@firebase/app-compat",Pg="@firebase/analytics-compat",Cg="@firebase/analytics",Dg="@firebase/app-check-compat",Vg="@firebase/app-check",Ng="@firebase/auth",kg="@firebase/auth-compat",Og="@firebase/database",xg="@firebase/data-connect",Lg="@firebase/database-compat",Mg="@firebase/functions",Fg="@firebase/functions-compat",Ug="@firebase/installations",Bg="@firebase/installations-compat",qg="@firebase/messaging",jg="@firebase/messaging-compat",Gg="@firebase/performance",zg="@firebase/performance-compat",Kg="@firebase/remote-config",$g="@firebase/remote-config-compat",Wg="@firebase/storage",Hg="@firebase/storage-compat",Qg="@firebase/firestore",Jg="@firebase/vertexai-preview",Yg="@firebase/firestore-compat",Xg="firebase",Zg="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sa="[DEFAULT]",e_={[ia]:"fire-core",[bg]:"fire-core-compat",[Cg]:"fire-analytics",[Pg]:"fire-analytics-compat",[Vg]:"fire-app-check",[Dg]:"fire-app-check-compat",[Ng]:"fire-auth",[kg]:"fire-auth-compat",[Og]:"fire-rtdb",[xg]:"fire-data-connect",[Lg]:"fire-rtdb-compat",[Mg]:"fire-fn",[Fg]:"fire-fn-compat",[Ug]:"fire-iid",[Bg]:"fire-iid-compat",[qg]:"fire-fcm",[jg]:"fire-fcm-compat",[Gg]:"fire-perf",[zg]:"fire-perf-compat",[Kg]:"fire-rc",[$g]:"fire-rc-compat",[Wg]:"fire-gcs",[Hg]:"fire-gcs-compat",[Qg]:"fire-fst",[Yg]:"fire-fst-compat",[Jg]:"fire-vertex","fire-js":"fire-js",[Xg]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ms=new Map,t_=new Map,oa=new Map;function Yu(r,e){try{r.container.addComponent(e)}catch(t){gt.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function jn(r){const e=r.name;if(oa.has(e))return gt.debug(`There were multiple attempts to register component ${e}.`),!1;oa.set(e,r);for(const t of ms.values())Yu(t,r);for(const t of t_.values())Yu(t,r);return!0}function ka(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function me(r){return r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const n_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ot=new pi("app","Firebase",n_);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r_{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new ln("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ot.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rr=Zg;function i_(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n=Object.assign({name:sa,automaticDataCollectionEnabled:!1},e),i=n.name;if(typeof i!="string"||!i)throw Ot.create("bad-app-name",{appName:String(i)});if(t||(t=kh()),!t)throw Ot.create("no-options");const s=ms.get(i);if(s){if(Jr(t,s.options)&&Jr(n,s.config))return s;throw Ot.create("duplicate-app",{appName:i})}const o=new ug(i);for(const u of oa.values())o.addComponent(u);const c=new r_(t,n,o);return ms.set(i,c),c}function s_(r=sa){const e=ms.get(r);if(!e&&r===sa&&kh())return i_();if(!e)throw Ot.create("no-app",{appName:r});return e}function xt(r,e,t){var n;let i=(n=e_[r])!==null&&n!==void 0?n:r;t&&(i+=`-${t}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const c=[`Unable to register library "${i}" with version "${e}":`];s&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),gt.warn(c.join(" "));return}jn(new ln(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const o_="firebase-heartbeat-database",a_=1,Yr="firebase-heartbeat-store";let zo=null;function Uh(){return zo||(zo=Tg(o_,a_,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(Yr)}catch(t){console.warn(t)}}}}).catch(r=>{throw Ot.create("idb-open",{originalErrorMessage:r.message})})),zo}async function c_(r){try{const t=(await Uh()).transaction(Yr),n=await t.objectStore(Yr).get(Bh(r));return await t.done,n}catch(e){if(e instanceof vt)gt.warn(e.message);else{const t=Ot.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});gt.warn(t.message)}}}async function Xu(r,e){try{const n=(await Uh()).transaction(Yr,"readwrite");await n.objectStore(Yr).put(e,Bh(r)),await n.done}catch(t){if(t instanceof vt)gt.warn(t.message);else{const n=Ot.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});gt.warn(n.message)}}}function Bh(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const u_=1024,l_=30*24*60*60*1e3;class h_{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new f_(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Zu();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const c=new Date(o.date).valueOf();return Date.now()-c<=l_}),this._storage.overwrite(this._heartbeatsCache))}catch(n){gt.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Zu(),{heartbeatsToSend:n,unsentEntries:i}=d_(this._heartbeatsCache.heartbeats),s=Vh(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return gt.warn(t),""}}}function Zu(){return new Date().toISOString().substring(0,10)}function d_(r,e=u_){const t=[];let n=r.slice();for(const i of r){const s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),el(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),el(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class f_{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Lh()?Xm().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await c_(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Xu(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Xu(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function el(r){return Vh(JSON.stringify({version:2,heartbeats:r})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function p_(r){jn(new ln("platform-logger",e=>new Rg(e),"PRIVATE")),jn(new ln("heartbeat",e=>new h_(e),"PRIVATE")),xt(ia,Ju,r),xt(ia,Ju,"esm2017"),xt("fire-js","")}p_("");function Oa(r,e){var t={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&e.indexOf(n)<0&&(t[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,n=Object.getOwnPropertySymbols(r);i<n.length;i++)e.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(r,n[i])&&(t[n[i]]=r[n[i]]);return t}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m_={PHONE:"phone",TOTP:"totp"},g_={FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PASSWORD:"password",PHONE:"phone",TWITTER:"twitter.com"},__={EMAIL_LINK:"emailLink",EMAIL_PASSWORD:"password",FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PHONE:"phone",TWITTER:"twitter.com"},y_={LINK:"link",REAUTHENTICATE:"reauthenticate",SIGN_IN:"signIn"},I_={EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function v_(){return{"admin-restricted-operation":"This operation is restricted to administrators only.","argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.","code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":"Cordova framework is not ready.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.","dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.","dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-change-needs-verification":"Multi-factor users must always have a verified email.","email-already-in-use":"The email address is already in use by another account.","emulator-config-failed":'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',"expired-action-code":"The action code has expired.","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal AuthError has occurred.","invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.","invalid-app-id":"The mobile app identifier is not registered for the current project.","invalid-user-token":"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.","invalid-auth-event":"An internal AuthError has occurred.","invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.","invalid-continue-uri":"The continue URL provided in the request is invalid.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-dynamic-link-domain":"The provided dynamic link domain is not configured or authorized for the current project.","invalid-email":"The email address is badly formatted.","invalid-emulator-scheme":"Emulator URL must start with a valid scheme (http:// or https://).","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-cert-hash":"The SHA-1 certificate hash provided is invalid.","invalid-credential":"The supplied auth credential is incorrect, malformed or has expired.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-multi-factor-session":"The request does not contain a valid proof of first factor successful sign-in.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","invalid-oauth-client-id":"The OAuth client ID provided is either invalid or does not match the specified API key.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","invalid-persistence-type":"The specified persistence type is invalid. It can only be local, session or none.","invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].","invalid-provider-id":"The specified provider ID is invalid.","invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-verification-id":"The verification ID used to create the phone auth credential is invalid.","invalid-tenant-id":"The Auth instance's tenant ID is invalid.","login-blocked":"Login blocked by user-provided method: {$originalMessage}","missing-android-pkg-name":"An Android Package Name must be provided if the Android App is required to be installed.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":"The phone auth credential was created with an empty SMS verification code.","missing-continue-uri":"A continue URL must be provided in the request.","missing-iframe-start":"An internal AuthError has occurred.","missing-ios-bundle-id":"An iOS Bundle ID must be provided if an App Store ID is provided.","missing-or-invalid-nonce":"The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.","missing-password":"A non-empty password must be provided","missing-multi-factor-info":"No second factor identifier is provided.","missing-multi-factor-session":"The request is missing proof of first factor successful sign-in.","missing-phone-number":"To send verification codes, provide a phone number for the recipient.","missing-verification-id":"The phone auth credential was created with an empty verification ID.","app-deleted":"This instance of FirebaseApp has been deleted.","multi-factor-info-not-found":"The user does not have a second factor matching the identifier provided.","multi-factor-auth-required":"Proof of ownership of a second factor is required to complete sign-in.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal AuthError has occurred.","no-such-provider":"User was not linked to an account with the given provider.","null-user":"A null user object was provided as the argument for an operation which requires a non-null user object.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.","quota-exceeded":"The project's quota for this operation has been exceeded.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.","rejected-credential":"The request contains malformed or mismatching credentials.","second-factor-already-in-use":"The second factor is already enrolled on this account.","maximum-second-factor-count-exceeded":"The maximum allowed number of second factors on a user has been exceeded.","tenant-id-mismatch":"The provided tenant ID does not match the Auth instance's tenant ID",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","unauthorized-continue-uri":"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.","unsupported-first-factor":"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.","unsupported-persistence-type":"The current environment does not support the specified persistence type.","unsupported-tenant-operation":"This operation is not supported in a multi-tenant context.","unverified-email":"The operation requires a verified email.","user-cancelled":"The user did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled.","already-initialized":"initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.","missing-recaptcha-token":"The reCAPTCHA token is missing when sending request to the backend.","invalid-recaptcha-token":"The reCAPTCHA token is invalid when sending request to the backend.","invalid-recaptcha-action":"The reCAPTCHA action is invalid when sending request to the backend.","recaptcha-not-enabled":"reCAPTCHA Enterprise integration is not enabled for this project.","missing-client-type":"The reCAPTCHA client type is missing when sending request to the backend.","missing-recaptcha-version":"The reCAPTCHA version is missing when sending request to the backend.","invalid-req-type":"Invalid request parameters.","invalid-recaptcha-version":"The reCAPTCHA version is invalid when sending request to the backend.","unsupported-password-policy-schema-version":"The password policy received from the backend uses a schema version that is not supported by this version of the Firebase SDK.","password-does-not-meet-requirements":"The password does not meet the requirements."}}function qh(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const E_=v_,jh=qh,Gh=new pi("auth","Firebase",qh()),T_={ADMIN_ONLY_OPERATION:"auth/admin-restricted-operation",ARGUMENT_ERROR:"auth/argument-error",APP_NOT_AUTHORIZED:"auth/app-not-authorized",APP_NOT_INSTALLED:"auth/app-not-installed",CAPTCHA_CHECK_FAILED:"auth/captcha-check-failed",CODE_EXPIRED:"auth/code-expired",CORDOVA_NOT_READY:"auth/cordova-not-ready",CORS_UNSUPPORTED:"auth/cors-unsupported",CREDENTIAL_ALREADY_IN_USE:"auth/credential-already-in-use",CREDENTIAL_MISMATCH:"auth/custom-token-mismatch",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"auth/requires-recent-login",DEPENDENT_SDK_INIT_BEFORE_AUTH:"auth/dependent-sdk-initialized-before-auth",DYNAMIC_LINK_NOT_ACTIVATED:"auth/dynamic-link-not-activated",EMAIL_CHANGE_NEEDS_VERIFICATION:"auth/email-change-needs-verification",EMAIL_EXISTS:"auth/email-already-in-use",EMULATOR_CONFIG_FAILED:"auth/emulator-config-failed",EXPIRED_OOB_CODE:"auth/expired-action-code",EXPIRED_POPUP_REQUEST:"auth/cancelled-popup-request",INTERNAL_ERROR:"auth/internal-error",INVALID_API_KEY:"auth/invalid-api-key",INVALID_APP_CREDENTIAL:"auth/invalid-app-credential",INVALID_APP_ID:"auth/invalid-app-id",INVALID_AUTH:"auth/invalid-user-token",INVALID_AUTH_EVENT:"auth/invalid-auth-event",INVALID_CERT_HASH:"auth/invalid-cert-hash",INVALID_CODE:"auth/invalid-verification-code",INVALID_CONTINUE_URI:"auth/invalid-continue-uri",INVALID_CORDOVA_CONFIGURATION:"auth/invalid-cordova-configuration",INVALID_CUSTOM_TOKEN:"auth/invalid-custom-token",INVALID_DYNAMIC_LINK_DOMAIN:"auth/invalid-dynamic-link-domain",INVALID_EMAIL:"auth/invalid-email",INVALID_EMULATOR_SCHEME:"auth/invalid-emulator-scheme",INVALID_IDP_RESPONSE:"auth/invalid-credential",INVALID_LOGIN_CREDENTIALS:"auth/invalid-credential",INVALID_MESSAGE_PAYLOAD:"auth/invalid-message-payload",INVALID_MFA_SESSION:"auth/invalid-multi-factor-session",INVALID_OAUTH_CLIENT_ID:"auth/invalid-oauth-client-id",INVALID_OAUTH_PROVIDER:"auth/invalid-oauth-provider",INVALID_OOB_CODE:"auth/invalid-action-code",INVALID_ORIGIN:"auth/unauthorized-domain",INVALID_PASSWORD:"auth/wrong-password",INVALID_PERSISTENCE:"auth/invalid-persistence-type",INVALID_PHONE_NUMBER:"auth/invalid-phone-number",INVALID_PROVIDER_ID:"auth/invalid-provider-id",INVALID_RECIPIENT_EMAIL:"auth/invalid-recipient-email",INVALID_SENDER:"auth/invalid-sender",INVALID_SESSION_INFO:"auth/invalid-verification-id",INVALID_TENANT_ID:"auth/invalid-tenant-id",MFA_INFO_NOT_FOUND:"auth/multi-factor-info-not-found",MFA_REQUIRED:"auth/multi-factor-auth-required",MISSING_ANDROID_PACKAGE_NAME:"auth/missing-android-pkg-name",MISSING_APP_CREDENTIAL:"auth/missing-app-credential",MISSING_AUTH_DOMAIN:"auth/auth-domain-config-required",MISSING_CODE:"auth/missing-verification-code",MISSING_CONTINUE_URI:"auth/missing-continue-uri",MISSING_IFRAME_START:"auth/missing-iframe-start",MISSING_IOS_BUNDLE_ID:"auth/missing-ios-bundle-id",MISSING_OR_INVALID_NONCE:"auth/missing-or-invalid-nonce",MISSING_MFA_INFO:"auth/missing-multi-factor-info",MISSING_MFA_SESSION:"auth/missing-multi-factor-session",MISSING_PHONE_NUMBER:"auth/missing-phone-number",MISSING_SESSION_INFO:"auth/missing-verification-id",MODULE_DESTROYED:"auth/app-deleted",NEED_CONFIRMATION:"auth/account-exists-with-different-credential",NETWORK_REQUEST_FAILED:"auth/network-request-failed",NULL_USER:"auth/null-user",NO_AUTH_EVENT:"auth/no-auth-event",NO_SUCH_PROVIDER:"auth/no-such-provider",OPERATION_NOT_ALLOWED:"auth/operation-not-allowed",OPERATION_NOT_SUPPORTED:"auth/operation-not-supported-in-this-environment",POPUP_BLOCKED:"auth/popup-blocked",POPUP_CLOSED_BY_USER:"auth/popup-closed-by-user",PROVIDER_ALREADY_LINKED:"auth/provider-already-linked",QUOTA_EXCEEDED:"auth/quota-exceeded",REDIRECT_CANCELLED_BY_USER:"auth/redirect-cancelled-by-user",REDIRECT_OPERATION_PENDING:"auth/redirect-operation-pending",REJECTED_CREDENTIAL:"auth/rejected-credential",SECOND_FACTOR_ALREADY_ENROLLED:"auth/second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"auth/maximum-second-factor-count-exceeded",TENANT_ID_MISMATCH:"auth/tenant-id-mismatch",TIMEOUT:"auth/timeout",TOKEN_EXPIRED:"auth/user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"auth/too-many-requests",UNAUTHORIZED_DOMAIN:"auth/unauthorized-continue-uri",UNSUPPORTED_FIRST_FACTOR:"auth/unsupported-first-factor",UNSUPPORTED_PERSISTENCE:"auth/unsupported-persistence-type",UNSUPPORTED_TENANT_OPERATION:"auth/unsupported-tenant-operation",UNVERIFIED_EMAIL:"auth/unverified-email",USER_CANCELLED:"auth/user-cancelled",USER_DELETED:"auth/user-not-found",USER_DISABLED:"auth/user-disabled",USER_MISMATCH:"auth/user-mismatch",USER_SIGNED_OUT:"auth/user-signed-out",WEAK_PASSWORD:"auth/weak-password",WEB_STORAGE_UNSUPPORTED:"auth/web-storage-unsupported",ALREADY_INITIALIZED:"auth/already-initialized",RECAPTCHA_NOT_ENABLED:"auth/recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"auth/missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"auth/invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"auth/invalid-recaptcha-action",MISSING_CLIENT_TYPE:"auth/missing-client-type",MISSING_RECAPTCHA_VERSION:"auth/missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"auth/invalid-recaptcha-version",INVALID_REQ_TYPE:"auth/invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gs=new Va("@firebase/auth");function w_(r,...e){gs.logLevel<=H.WARN&&gs.warn(`Auth (${rr}): ${r}`,...e)}function ns(r,...e){gs.logLevel<=H.ERROR&&gs.error(`Auth (${rr}): ${r}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ge(r,...e){throw La(r,...e)}function Le(r,...e){return La(r,...e)}function xa(r,e,t){const n=Object.assign(Object.assign({},jh()),{[e]:t});return new pi("auth","Firebase",n).create(e,{appName:r.name})}function we(r){return xa(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function ir(r,e,t){const n=t;if(!(e instanceof n))throw n.name!==e.constructor.name&&Ge(r,"argument-error"),xa(r,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function La(r,...e){if(typeof r!="string"){const t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return Gh.create(r,...e)}function k(r,e,...t){if(!r)throw La(e,...t)}function Ye(r){const e="INTERNAL ASSERTION FAILED: "+r;throw ns(e),new Error(e)}function _t(r,e){r||Ye(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xr(){var r;return typeof self<"u"&&((r=self.location)===null||r===void 0?void 0:r.href)||""}function Ma(){return tl()==="http:"||tl()==="https:"}function tl(){var r;return typeof self<"u"&&((r=self.location)===null||r===void 0?void 0:r.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function A_(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Ma()||Qm()||"connection"in navigator)?navigator.onLine:!0}function R_(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mi{constructor(e,t){this.shortDelay=e,this.longDelay=t,_t(t>e,"Short delay should be less than long delay!"),this.isMobile=$m()||Jm()}get(){return A_()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fa(r,e){_t(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zh{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ye("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ye("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ye("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S_={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b_=new mi(3e4,6e4);function oe(r,e){return r.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:r.tenantId}):e}async function ae(r,e,t,n,i={}){return Kh(r,i,async()=>{let s={},o={};n&&(e==="GET"?o=n:s={body:JSON.stringify(n)});const c=nr(Object.assign({key:r.config.apiKey},o)).slice(1),u=await r._getAdditionalHeaders();u["Content-Type"]="application/json",r.languageCode&&(u["X-Firebase-Locale"]=r.languageCode);const h=Object.assign({method:e,headers:u},s);return Hm()||(h.referrerPolicy="no-referrer"),zh.fetch()($h(r,r.config.apiHost,t,c),h)})}async function Kh(r,e,t){r._canInitEmulator=!1;const n=Object.assign(Object.assign({},S_),e);try{const i=new C_(r),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Fr(r,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const c=s.ok?o.errorMessage:o.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Fr(r,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw Fr(r,"email-already-in-use",o);if(u==="USER_DISABLED")throw Fr(r,"user-disabled",o);const f=n[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw xa(r,f,h);Ge(r,f)}}catch(i){if(i instanceof vt)throw i;Ge(r,"network-request-failed",{message:String(i)})}}async function Et(r,e,t,n,i={}){const s=await ae(r,e,t,n,i);return"mfaPendingCredential"in s&&Ge(r,"multi-factor-auth-required",{_serverResponse:s}),s}function $h(r,e,t,n){const i=`${e}${t}?${n}`;return r.config.emulator?Fa(r.config,i):`${r.config.apiScheme}://${i}`}function P_(r){switch(r){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class C_{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(Le(this.auth,"network-request-failed")),b_.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Fr(r,e,t){const n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);const i=Le(r,e,n);return i.customData._tokenResponse=t,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nl(r){return r!==void 0&&r.getResponse!==void 0}function rl(r){return r!==void 0&&r.enterprise!==void 0}class Wh{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return P_(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function D_(r){return(await ae(r,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function Hh(r,e){return ae(r,"GET","/v2/recaptchaConfig",oe(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function V_(r,e){return ae(r,"POST","/v1/accounts:delete",e)}async function N_(r,e){return ae(r,"POST","/v1/accounts:update",e)}async function Qh(r,e){return ae(r,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gr(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k_(r,e=!1){return j(r).getIdToken(e)}async function Jh(r,e=!1){const t=j(r),n=await t.getIdToken(e),i=Ms(n);k(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:n,authTime:Gr(Ko(i.auth_time)),issuedAtTime:Gr(Ko(i.iat)),expirationTime:Gr(Ko(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Ko(r){return Number(r)*1e3}function Ms(r){const[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return ns("JWT malformed, contained fewer than 3 sections"),null;try{const i=Nh(t);return i?JSON.parse(i):(ns("Failed to decode base64 JWT payload"),null)}catch(i){return ns("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function il(r){const e=Ms(r);return k(e,"internal-error"),k(typeof e.exp<"u","internal-error"),k(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yt(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw n instanceof vt&&O_(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function O_({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x_{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Gr(this.lastLoginAt),this.creationTime=Gr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zr(r){var e;const t=r.auth,n=await r.getIdToken(),i=await yt(r,Qh(t,{idToken:n}));k(i==null?void 0:i.users.length,t,"internal-error");const s=i.users[0];r._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?Xh(s.providerUserInfo):[],c=L_(r.providerData,o),u=r.isAnonymous,h=!(r.email&&s.passwordHash)&&!(c!=null&&c.length),f=u?h:!1,m={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new aa(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(r,m)}async function Yh(r){const e=j(r);await Zr(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function L_(r,e){return[...r.filter(n=>!e.some(i=>i.providerId===n.providerId)),...e]}function Xh(r){return r.map(e=>{var{providerId:t}=e,n=Oa(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function M_(r,e){const t=await Kh(r,{},async()=>{const n=nr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=r.config,o=$h(r,i,"/v1/token",`key=${s}`),c=await r._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",zh.fetch()(o,{method:"POST",headers:c,body:n})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function F_(r,e){return ae(r,"POST","/v2/accounts:revokeToken",oe(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){k(e.idToken,"internal-error"),k(typeof e.idToken<"u","internal-error"),k(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):il(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){k(e.length!==0,"internal-error");const t=il(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(k(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:i,expiresIn:s}=await M_(e,t);this.updateTokensAndExpiration(n,i,Number(s))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:i,expirationTime:s}=t,o=new Mn;return n&&(k(typeof n=="string","internal-error",{appName:e}),o.refreshToken=n),i&&(k(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(k(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Mn,this.toJSON())}_performRefresh(){return Ye("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt(r,e){k(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class ht{constructor(e){var{uid:t,auth:n,stsTokenManager:i}=e,s=Oa(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new x_(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new aa(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await yt(this,this.stsTokenManager.getToken(this.auth,e));return k(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Jh(this,e)}reload(){return Yh(this)}_assign(e){this!==e&&(k(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ht(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){k(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await Zr(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(me(this.auth.app))return Promise.reject(we(this.auth));const e=await this.getIdToken();return await yt(this,V_(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,i,s,o,c,u,h,f;const m=(n=t.displayName)!==null&&n!==void 0?n:void 0,I=(i=t.email)!==null&&i!==void 0?i:void 0,S=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,D=(o=t.photoURL)!==null&&o!==void 0?o:void 0,O=(c=t.tenantId)!==null&&c!==void 0?c:void 0,N=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,K=(h=t.createdAt)!==null&&h!==void 0?h:void 0,G=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:q,emailVerified:J,isAnonymous:ee,providerData:W,stsTokenManager:v}=t;k(q&&v,e,"internal-error");const g=Mn.fromJSON(this.name,v);k(typeof q=="string",e,"internal-error"),Pt(m,e.name),Pt(I,e.name),k(typeof J=="boolean",e,"internal-error"),k(typeof ee=="boolean",e,"internal-error"),Pt(S,e.name),Pt(D,e.name),Pt(O,e.name),Pt(N,e.name),Pt(K,e.name),Pt(G,e.name);const y=new ht({uid:q,auth:e,email:I,emailVerified:J,displayName:m,isAnonymous:ee,photoURL:D,phoneNumber:S,tenantId:O,stsTokenManager:g,createdAt:K,lastLoginAt:G});return W&&Array.isArray(W)&&(y.providerData=W.map(E=>Object.assign({},E))),N&&(y._redirectEventId=N),y}static async _fromIdTokenResponse(e,t,n=!1){const i=new Mn;i.updateFromServerResponse(t);const s=new ht({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:n});return await Zr(s),s}static async _fromGetAccountInfoResponse(e,t,n){const i=t.users[0];k(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?Xh(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),c=new Mn;c.updateFromIdToken(n);const u=new ht({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:o}),h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new aa(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(u,h),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sl=new Map;function dt(r){_t(r instanceof Function,"Expected a class definition");let e=sl.get(r);return e?(_t(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,sl.set(r,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Zh.type="NONE";const ca=Zh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rs(r,e,t){return`firebase:${r}:${e}:${t}`}class Fn{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:i,name:s}=this.auth;this.fullUserKey=rs(this.userKey,i.apiKey,s),this.fullPersistenceKey=rs("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?ht._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new Fn(dt(ca),e,n);const i=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let s=i[0]||dt(ca);const o=rs(n,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(o);if(f){const m=ht._fromJSON(e,f);h!==s&&(c=m),s=h;break}}catch{}const u=i.filter(h=>h._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new Fn(s,e,n):(s=u[0],c&&await s._set(o,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==s)try{await h._remove(o)}catch{}})),new Fn(s,e,n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ol(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(rd(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(ed(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(sd(e))return"Blackberry";if(od(e))return"Webos";if(td(e))return"Safari";if((e.includes("chrome/")||nd(e))&&!e.includes("edge/"))return"Chrome";if(id(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if((n==null?void 0:n.length)===2)return n[1]}return"Other"}function ed(r=ve()){return/firefox\//i.test(r)}function td(r=ve()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function nd(r=ve()){return/crios\//i.test(r)}function rd(r=ve()){return/iemobile/i.test(r)}function id(r=ve()){return/android/i.test(r)}function sd(r=ve()){return/blackberry/i.test(r)}function od(r=ve()){return/webos/i.test(r)}function Ua(r=ve()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function U_(r=ve()){var e;return Ua(r)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function B_(){return Ym()&&document.documentMode===10}function ad(r=ve()){return Ua(r)||id(r)||od(r)||sd(r)||/windows phone/i.test(r)||rd(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cd(r,e=[]){let t;switch(r){case"Browser":t=ol(ve());break;case"Worker":t=`${ol(ve())}-${r}`;break;default:t=r}const n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${rr}/${n}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q_{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=s=>new Promise((o,c)=>{try{const u=e(s);o(u)}catch(u){c(u)}});n.onAbort=t,this.queue.push(n);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n==null?void 0:n.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function j_(r,e={}){return ae(r,"GET","/v2/passwordPolicy",oe(r,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const G_=6;class z_{constructor(e){var t,n,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:G_,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(n=e.allowedNonAlphanumericCharacters)===null||n===void 0?void 0:n.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,n,i,s,o,c;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(n=u.meetsMaxPasswordLength)!==null&&n!==void 0?n:!0),u.isValid&&(u.isValid=(i=u.containsLowercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(s=u.containsUppercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(c=u.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),u}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let i=0;i<e.length;i++)n=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K_{constructor(e,t,n,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new al(this),this.idTokenSubscription=new al(this),this.beforeStateQueue=new q_(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Gh,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=dt(t)),this._initializationPromise=this.queue(async()=>{var n,i;if(!this._deleted&&(this.persistenceManager=await Fn.create(this,e),!this._deleted)){if(!((n=this._popupRedirectResolver)===null||n===void 0)&&n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Qh(this,{idToken:e}),n=await ht._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(me(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let i=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=i==null?void 0:i._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===c)&&(u!=null&&u.user)&&(i=u.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return k(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Zr(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=R_()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(me(this.app))return Promise.reject(we(this));const t=e?j(e):null;return t&&k(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&k(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return me(this.app)?Promise.reject(we(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return me(this.app)?Promise.reject(we(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(dt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await j_(this),t=new z_(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new pi("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await F_(this,n)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&dt(e)||this._popupRedirectResolver;k(t,this,"argument-error"),this.redirectPersistenceManager=await Fn.create(this,[dt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(k(c,this,"internal-error"),c.then(()=>{o||s(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,n,i);return()=>{o=!0,u()}}else{const u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return k(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=cd(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&w_(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function fe(r){return j(r)}class al{constructor(e){this.auth=e,this.observer=null,this.addObserver=rg(t=>this.observer=t)}get next(){return k(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let gi={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function $_(r){gi=r}function Ba(r){return gi.loadJS(r)}function W_(){return gi.recaptchaV2Script}function H_(){return gi.recaptchaEnterpriseScript}function Q_(){return gi.gapiScript}function ud(r){return`__${r}${Math.floor(Math.random()*1e6)}`}const J_="recaptcha-enterprise",Y_="NO_RECAPTCHA";class ld{constructor(e){this.type=J_,this.auth=fe(e)}async verify(e="verify",t=!1){async function n(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,c)=>{Hh(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const h=new Wh(u);return s.tenantId==null?s._agentRecaptchaConfig=h:s._tenantRecaptchaConfigs[s.tenantId]=h,o(h.siteKey)}}).catch(u=>{c(u)})})}function i(s,o,c){const u=window.grecaptcha;rl(u)?u.enterprise.ready(()=>{u.enterprise.execute(s,{action:e}).then(h=>{o(h)}).catch(()=>{o(Y_)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{n(this.auth).then(c=>{if(!t&&rl(window.grecaptcha))i(c,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=H_();u.length!==0&&(u+=c),Ba(u).then(()=>{i(c,s,o)}).catch(h=>{o(h)})}}).catch(c=>{o(c)})})}}async function cl(r,e,t,n=!1){const i=new ld(r);let s;try{s=await i.verify(t)}catch{s=await i.verify(t,!0)}const o=Object.assign({},e);return n?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function ei(r,e,t,n){var i;if(!((i=r._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const s=await cl(r,e,t,t==="getOobCode");return n(r,s)}else return n(r,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await cl(r,e,t,t==="getOobCode");return n(r,o)}else return Promise.reject(s)})}async function X_(r){const e=fe(r),t=await Hh(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),n=new Wh(t);e.tenantId==null?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,n.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")&&new ld(e).verify()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hd(r,e){const t=ka(r,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(Jr(s,e??{}))return i;Ge(i,"already-initialized")}return t.initialize({options:e})}function Z_(r,e){const t=(e==null?void 0:e.persistence)||[],n=(Array.isArray(t)?t:[t]).map(dt);e!=null&&e.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e==null?void 0:e.popupRedirectResolver)}function dd(r,e,t){const n=fe(r);k(n._canInitEmulator,n,"emulator-config-failed"),k(/^https?:\/\//.test(e),n,"invalid-emulator-scheme");const i=!!(t!=null&&t.disableWarnings),s=fd(e),{host:o,port:c}=ey(e),u=c===null?"":`:${c}`;n.config.emulator={url:`${s}//${o}${u}/`},n.settings.appVerificationDisabledForTesting=!0,n.emulatorConfig=Object.freeze({host:o,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||ty()}function fd(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function ey(r){const e=fd(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const n=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(n);if(i){const s=i[1];return{host:s,port:ul(n.substr(s.length+1))}}else{const[s,o]=n.split(":");return{host:s,port:ul(o)}}}function ul(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function ty(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sr{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ye("not implemented")}_getIdTokenResponse(e){return Ye("not implemented")}_linkToIdToken(e,t){return Ye("not implemented")}_getReauthenticationResolver(e){return Ye("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pd(r,e){return ae(r,"POST","/v1/accounts:resetPassword",oe(r,e))}async function ny(r,e){return ae(r,"POST","/v1/accounts:update",e)}async function ry(r,e){return ae(r,"POST","/v1/accounts:signUp",e)}async function iy(r,e){return ae(r,"POST","/v1/accounts:update",oe(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sy(r,e){return Et(r,"POST","/v1/accounts:signInWithPassword",oe(r,e))}async function Fs(r,e){return ae(r,"POST","/v1/accounts:sendOobCode",oe(r,e))}async function oy(r,e){return Fs(r,e)}async function ay(r,e){return Fs(r,e)}async function cy(r,e){return Fs(r,e)}async function uy(r,e){return Fs(r,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ly(r,e){return Et(r,"POST","/v1/accounts:signInWithEmailLink",oe(r,e))}async function hy(r,e){return Et(r,"POST","/v1/accounts:signInWithEmailLink",oe(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn extends sr{constructor(e,t,n,i=null){super("password",n),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new Gn(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new Gn(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ei(e,t,"signInWithPassword",sy);case"emailLink":return ly(e,{email:this._email,oobCode:this._password});default:Ge(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const n={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ei(e,n,"signUpPassword",ry);case"emailLink":return hy(e,{idToken:t,email:this._email,oobCode:this._password});default:Ge(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mt(r,e){return Et(r,"POST","/v1/accounts:signInWithIdp",oe(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dy="http://localhost";class et extends sr{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new et(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Ge("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:i}=t,s=Oa(t,["providerId","signInMethod"]);if(!n||!i)return null;const o=new et(n,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return mt(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,mt(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,mt(e,t)}buildRequest(){const e={requestUri:dy,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=nr(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fy(r,e){return ae(r,"POST","/v1/accounts:sendVerificationCode",oe(r,e))}async function py(r,e){return Et(r,"POST","/v1/accounts:signInWithPhoneNumber",oe(r,e))}async function my(r,e){const t=await Et(r,"POST","/v1/accounts:signInWithPhoneNumber",oe(r,e));if(t.temporaryProof)throw Fr(r,"account-exists-with-different-credential",t);return t}const gy={USER_NOT_FOUND:"user-not-found"};async function _y(r,e){const t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return Et(r,"POST","/v1/accounts:signInWithPhoneNumber",oe(r,t),gy)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt extends sr{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new Lt({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new Lt({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return py(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return my(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return _y(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:n,code:i}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:t,verificationCode:n,phoneNumber:i,temporaryProof:s}=e;return!n&&!t&&!i&&!s?null:new Lt({verificationId:t,verificationCode:n,phoneNumber:i,temporaryProof:s})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yy(r){switch(r){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Iy(r){const e=Lr(Mr(r)).link,t=e?Lr(Mr(e)).deep_link_id:null,n=Lr(Mr(r)).deep_link_id;return(n?Lr(Mr(n)).link:null)||n||t||e||r}class or{constructor(e){var t,n,i,s,o,c;const u=Lr(Mr(e)),h=(t=u.apiKey)!==null&&t!==void 0?t:null,f=(n=u.oobCode)!==null&&n!==void 0?n:null,m=yy((i=u.mode)!==null&&i!==void 0?i:null);k(h&&f&&m,"argument-error"),this.apiKey=h,this.operation=m,this.code=f,this.continueUrl=(s=u.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=u.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(c=u.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=Iy(e);try{return new or(t)}catch{return null}}}function vy(r){return or.parseLink(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(){this.providerId=Gt.PROVIDER_ID}static credential(e,t){return Gn._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=or.parseLink(t);return k(n,"argument-error"),Gn._fromEmailAndCode(e,n.code,n.tenantId)}}Gt.PROVIDER_ID="password";Gt.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Gt.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ar extends Tt{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class zr extends ar{static credentialFromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;return k("providerId"in t&&"signInMethod"in t,"argument-error"),et._fromParams(t)}credential(e){return this._credential(Object.assign(Object.assign({},e),{nonce:e.rawNonce}))}_credential(e){return k(e.idToken||e.accessToken,"argument-error"),et._fromParams(Object.assign(Object.assign({},e),{providerId:this.providerId,signInMethod:this.providerId}))}static credentialFromResult(e){return zr.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return zr.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n,oauthTokenSecret:i,pendingToken:s,nonce:o,providerId:c}=e;if(!n&&!i&&!t&&!s||!c)return null;try{return new zr(c)._credential({idToken:t,accessToken:n,nonce:o,pendingToken:s})}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at extends ar{constructor(){super("facebook.com")}static credential(e){return et._fromParams({providerId:at.PROVIDER_ID,signInMethod:at.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return at.credentialFromTaggedObject(e)}static credentialFromError(e){return at.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return at.credential(e.oauthAccessToken)}catch{return null}}}at.FACEBOOK_SIGN_IN_METHOD="facebook.com";at.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct extends ar{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return et._fromParams({providerId:ct.PROVIDER_ID,signInMethod:ct.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return ct.credentialFromTaggedObject(e)}static credentialFromError(e){return ct.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return ct.credential(t,n)}catch{return null}}}ct.GOOGLE_SIGN_IN_METHOD="google.com";ct.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut extends ar{constructor(){super("github.com")}static credential(e){return et._fromParams({providerId:ut.PROVIDER_ID,signInMethod:ut.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ut.credentialFromTaggedObject(e)}static credentialFromError(e){return ut.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ut.credential(e.oauthAccessToken)}catch{return null}}}ut.GITHUB_SIGN_IN_METHOD="github.com";ut.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ey="http://localhost";class ti extends sr{constructor(e,t){super(e,e),this.pendingToken=t}_getIdTokenResponse(e){const t=this.buildRequest();return mt(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,mt(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,mt(e,t)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:i,pendingToken:s}=t;return!n||!i||!s||n!==i?null:new ti(n,s)}static _create(e,t){return new ti(e,t)}buildRequest(){return{requestUri:Ey,returnSecureToken:!0,pendingToken:this.pendingToken}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ty="saml.";class _s extends Tt{constructor(e){k(e.startsWith(Ty),"argument-error"),super(e)}static credentialFromResult(e){return _s.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return _s.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){const t=ti.fromJSON(e);return k(t,"argument-error"),t}static samlCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{pendingToken:t,providerId:n}=e;if(!t||!n)return null;try{return ti._create(n,t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt extends ar{constructor(){super("twitter.com")}static credential(e,t){return et._fromParams({providerId:lt.PROVIDER_ID,signInMethod:lt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return lt.credentialFromTaggedObject(e)}static credentialFromError(e){return lt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return lt.credential(t,n)}catch{return null}}}lt.TWITTER_SIGN_IN_METHOD="twitter.com";lt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function md(r,e){return Et(r,"POST","/v1/accounts:signUp",oe(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,i=!1){const s=await ht._fromIdTokenResponse(e,n,i),o=ll(n);return new Qe({user:s,providerId:o,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const i=ll(n);return new Qe({user:e,providerId:i,_tokenResponse:n,operationType:t})}}function ll(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wy(r){var e;if(me(r.app))return Promise.reject(we(r));const t=fe(r);if(await t._initializationPromise,!((e=t.currentUser)===null||e===void 0)&&e.isAnonymous)return new Qe({user:t.currentUser,providerId:null,operationType:"signIn"});const n=await md(t,{returnSecureToken:!0}),i=await Qe._fromIdTokenResponse(t,"signIn",n,!0);return await t._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys extends vt{constructor(e,t,n,i){var s;super(t.code,t.message),this.operationType=n,this.user=i,Object.setPrototypeOf(this,ys.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,i){return new ys(e,t,n,i)}}function gd(r,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?ys._fromErrorAndOperation(r,s,e,n):s})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _d(r){return new Set(r.map(({providerId:e})=>e).filter(e=>!!e))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ay(r,e){const t=j(r);await Us(!0,t,e);const{providerUserInfo:n}=await N_(t.auth,{idToken:await t.getIdToken(),deleteProvider:[e]}),i=_d(n||[]);return t.providerData=t.providerData.filter(s=>i.has(s.providerId)),i.has("phone")||(t.phoneNumber=null),await t.auth._persistUserIfCurrent(t),t}async function qa(r,e,t=!1){const n=await yt(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return Qe._forOperation(r,"link",n)}async function Us(r,e,t){await Zr(e);const n=_d(e.providerData),i=r===!1?"provider-already-linked":"no-such-provider";k(n.has(t)===r,e.auth,i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yd(r,e,t=!1){const{auth:n}=r;if(me(n.app))return Promise.reject(we(n));const i="reauthenticate";try{const s=await yt(r,gd(n,i,e,r),t);k(s.idToken,n,"internal-error");const o=Ms(s.idToken);k(o,n,"internal-error");const{sub:c}=o;return k(r.uid===c,n,"user-mismatch"),Qe._forOperation(r,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&Ge(n,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Id(r,e,t=!1){if(me(r.app))return Promise.reject(we(r));const n="signIn",i=await gd(r,n,e),s=await Qe._fromIdTokenResponse(r,n,i);return t||await r._updateCurrentUser(s.user),s}async function Bs(r,e){return Id(fe(r),e)}async function vd(r,e){const t=j(r);return await Us(!1,t,e.providerId),qa(t,e)}async function Ed(r,e){return yd(j(r),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ry(r,e){return Et(r,"POST","/v1/accounts:signInWithCustomToken",oe(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Sy(r,e){if(me(r.app))return Promise.reject(we(r));const t=fe(r),n=await Ry(t,{token:e,returnSecureToken:!0}),i=await Qe._fromIdTokenResponse(t,"signIn",n);return await t._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _i{constructor(e,t){this.factorId=e,this.uid=t.mfaEnrollmentId,this.enrollmentTime=new Date(t.enrolledAt).toUTCString(),this.displayName=t.displayName}static _fromServerResponse(e,t){return"phoneInfo"in t?ja._fromServerResponse(e,t):"totpInfo"in t?Ga._fromServerResponse(e,t):Ge(e,"internal-error")}}class ja extends _i{constructor(e){super("phone",e),this.phoneNumber=e.phoneInfo}static _fromServerResponse(e,t){return new ja(t)}}class Ga extends _i{constructor(e){super("totp",e)}static _fromServerResponse(e,t){return new Ga(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qs(r,e,t){var n;k(((n=t.url)===null||n===void 0?void 0:n.length)>0,r,"invalid-continue-uri"),k(typeof t.dynamicLinkDomain>"u"||t.dynamicLinkDomain.length>0,r,"invalid-dynamic-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(k(t.iOS.bundleId.length>0,r,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(k(t.android.packageName.length>0,r,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function za(r){const e=fe(r);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function by(r,e,t){const n=fe(r),i={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&qs(n,i,t),await ei(n,i,"getOobCode",ay)}async function Py(r,e,t){await pd(j(r),{oobCode:e,newPassword:t}).catch(async n=>{throw n.code==="auth/password-does-not-meet-requirements"&&za(r),n})}async function Cy(r,e){await iy(j(r),{oobCode:e})}async function Td(r,e){const t=j(r),n=await pd(t,{oobCode:e}),i=n.requestType;switch(k(i,t,"internal-error"),i){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":k(n.newEmail,t,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":k(n.mfaInfo,t,"internal-error");default:k(n.email,t,"internal-error")}let s=null;return n.mfaInfo&&(s=_i._fromServerResponse(fe(t),n.mfaInfo)),{data:{email:(n.requestType==="VERIFY_AND_CHANGE_EMAIL"?n.newEmail:n.email)||null,previousEmail:(n.requestType==="VERIFY_AND_CHANGE_EMAIL"?n.email:n.newEmail)||null,multiFactorInfo:s},operation:i}}async function Dy(r,e){const{data:t}=await Td(j(r),e);return t.email}async function Vy(r,e,t){if(me(r.app))return Promise.reject(we(r));const n=fe(r),o=await ei(n,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",md).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&za(r),u}),c=await Qe._fromIdTokenResponse(n,"signIn",o);return await n._updateCurrentUser(c.user),c}function Ny(r,e,t){return me(r.app)?Promise.reject(we(r)):Bs(j(r),Gt.credential(e,t)).catch(async n=>{throw n.code==="auth/password-does-not-meet-requirements"&&za(r),n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ky(r,e,t){const n=fe(r),i={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function s(o,c){k(c.handleCodeInApp,n,"argument-error"),c&&qs(n,o,c)}s(i,t),await ei(n,i,"getOobCode",cy)}function Oy(r,e){const t=or.parseLink(e);return(t==null?void 0:t.operation)==="EMAIL_SIGNIN"}async function xy(r,e,t){if(me(r.app))return Promise.reject(we(r));const n=j(r),i=Gt.credentialWithLink(e,t||Xr());return k(i._tenantId===(n.tenantId||null),n,"tenant-id-mismatch"),Bs(n,i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ly(r,e){return ae(r,"POST","/v1/accounts:createAuthUri",oe(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function My(r,e){const t=Ma()?Xr():"http://localhost",n={identifier:e,continueUri:t},{signinMethods:i}=await Ly(j(r),n);return i||[]}async function Fy(r,e){const t=j(r),i={requestType:"VERIFY_EMAIL",idToken:await r.getIdToken()};e&&qs(t.auth,i,e);const{email:s}=await oy(t.auth,i);s!==r.email&&await r.reload()}async function Uy(r,e,t){const n=j(r),s={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await r.getIdToken(),newEmail:e};t&&qs(n.auth,s,t);const{email:o}=await uy(n.auth,s);o!==r.email&&await r.reload()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function By(r,e){return ae(r,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qy(r,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const n=j(r),s={idToken:await n.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},o=await yt(n,By(n.auth,s));n.displayName=o.displayName||null,n.photoURL=o.photoUrl||null;const c=n.providerData.find(({providerId:u})=>u==="password");c&&(c.displayName=n.displayName,c.photoURL=n.photoURL),await n._updateTokensIfNecessary(o)}function jy(r,e){const t=j(r);return me(t.auth.app)?Promise.reject(we(t.auth)):wd(t,e,null)}function Gy(r,e){return wd(j(r),null,e)}async function wd(r,e,t){const{auth:n}=r,s={idToken:await r.getIdToken(),returnSecureToken:!0};e&&(s.email=e),t&&(s.password=t);const o=await yt(r,ny(n,s));await r._updateTokensIfNecessary(o,!0)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zy(r){var e,t;if(!r)return null;const{providerId:n}=r,i=r.rawUserInfo?JSON.parse(r.rawUserInfo):{},s=r.isNewUser||r.kind==="identitytoolkit#SignupNewUserResponse";if(!n&&(r!=null&&r.idToken)){const o=(t=(e=Ms(r.idToken))===null||e===void 0?void 0:e.firebase)===null||t===void 0?void 0:t.sign_in_provider;if(o){const c=o!=="anonymous"&&o!=="custom"?o:null;return new Un(s,c)}}if(!n)return null;switch(n){case"facebook.com":return new Ky(s,i);case"github.com":return new $y(s,i);case"google.com":return new Wy(s,i);case"twitter.com":return new Hy(s,i,r.screenName||null);case"custom":case"anonymous":return new Un(s,null);default:return new Un(s,n,i)}}class Un{constructor(e,t,n={}){this.isNewUser=e,this.providerId=t,this.profile=n}}class Ad extends Un{constructor(e,t,n,i){super(e,t,n),this.username=i}}class Ky extends Un{constructor(e,t){super(e,"facebook.com",t)}}class $y extends Ad{constructor(e,t){super(e,"github.com",t,typeof(t==null?void 0:t.login)=="string"?t==null?void 0:t.login:null)}}class Wy extends Un{constructor(e,t){super(e,"google.com",t)}}class Hy extends Ad{constructor(e,t,n){super(e,"twitter.com",t,n)}}function Qy(r){const{user:e,_tokenResponse:t}=r;return e.isAnonymous&&!t?{providerId:null,isNewUser:!1,profile:null}:zy(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jy(r,e){return j(r).setPersistence(e)}function Yy(r){return X_(r)}async function Xy(r,e){return fe(r).validatePassword(e)}function Rd(r,e,t,n){return j(r).onIdTokenChanged(e,t,n)}function Sd(r,e,t){return j(r).beforeAuthStateChanged(e,t)}function Zy(r,e,t,n){return j(r).onAuthStateChanged(e,t,n)}function eI(r){j(r).useDeviceLanguage()}function tI(r,e){return j(r).updateCurrentUser(e)}function nI(r){return j(r).signOut()}function rI(r,e){return fe(r).revokeAccessToken(e)}async function iI(r){return j(r).delete()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on{constructor(e,t,n){this.type=e,this.credential=t,this.user=n}static _fromIdtoken(e,t){return new on("enroll",e,t)}static _fromMfaPendingCredential(e){return new on("signin",e)}toJSON(){return{multiFactorSession:{[this.type==="enroll"?"idToken":"pendingCredential"]:this.credential}}}static fromJSON(e){var t,n;if(e!=null&&e.multiFactorSession){if(!((t=e.multiFactorSession)===null||t===void 0)&&t.pendingCredential)return on._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);if(!((n=e.multiFactorSession)===null||n===void 0)&&n.idToken)return on._fromIdtoken(e.multiFactorSession.idToken)}return null}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ka{constructor(e,t,n){this.session=e,this.hints=t,this.signInResolver=n}static _fromError(e,t){const n=fe(e),i=t.customData._serverResponse,s=(i.mfaInfo||[]).map(c=>_i._fromServerResponse(n,c));k(i.mfaPendingCredential,n,"internal-error");const o=on._fromMfaPendingCredential(i.mfaPendingCredential);return new Ka(o,s,async c=>{const u=await c._process(n,o);delete i.mfaInfo,delete i.mfaPendingCredential;const h=Object.assign(Object.assign({},i),{idToken:u.idToken,refreshToken:u.refreshToken});switch(t.operationType){case"signIn":const f=await Qe._fromIdTokenResponse(n,t.operationType,h);return await n._updateCurrentUser(f.user),f;case"reauthenticate":return k(t.user,n,"internal-error"),Qe._forOperation(t.user,t.operationType,h);default:Ge(n,"internal-error")}})}async resolveSignIn(e){const t=e;return this.signInResolver(t)}}function sI(r,e){var t;const n=j(r),i=e;return k(e.customData.operationType,n,"argument-error"),k((t=i.customData._serverResponse)===null||t===void 0?void 0:t.mfaPendingCredential,n,"argument-error"),Ka._fromError(n,i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oI(r,e){return ae(r,"POST","/v2/accounts/mfaEnrollment:start",oe(r,e))}function aI(r,e){return ae(r,"POST","/v2/accounts/mfaEnrollment:finalize",oe(r,e))}function cI(r,e){return ae(r,"POST","/v2/accounts/mfaEnrollment:start",oe(r,e))}function uI(r,e){return ae(r,"POST","/v2/accounts/mfaEnrollment:finalize",oe(r,e))}function lI(r,e){return ae(r,"POST","/v2/accounts/mfaEnrollment:withdraw",oe(r,e))}class $a{constructor(e){this.user=e,this.enrolledFactors=[],e._onReload(t=>{t.mfaInfo&&(this.enrolledFactors=t.mfaInfo.map(n=>_i._fromServerResponse(e.auth,n)))})}static _fromUser(e){return new $a(e)}async getSession(){return on._fromIdtoken(await this.user.getIdToken(),this.user)}async enroll(e,t){const n=e,i=await this.getSession(),s=await yt(this.user,n._process(this.user.auth,i,t));return await this.user._updateTokensIfNecessary(s),this.user.reload()}async unenroll(e){const t=typeof e=="string"?e:e.uid,n=await this.user.getIdToken();try{const i=await yt(this.user,lI(this.user.auth,{idToken:n,mfaEnrollmentId:t}));this.enrolledFactors=this.enrolledFactors.filter(({uid:s})=>s!==t),await this.user._updateTokensIfNecessary(i),await this.user.reload()}catch(i){throw i}}}const $o=new WeakMap;function hI(r){const e=j(r);return $o.has(e)||$o.set(e,$a._fromUser(e)),$o.get(e)}const Is="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bd{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Is,"1"),this.storage.removeItem(Is),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dI=1e3,fI=10;class Pd extends bd{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=ad(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),i=this.localCache[t];n!==i&&e(t,i,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const n=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(n);!t&&this.localCache[n]===o||this.notifyListeners(n,o)},s=this.storage.getItem(n);B_()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,fI):i()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const i of Array.from(n))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},dI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Pd.type="LOCAL";const Cd=Pd;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dd extends bd{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Dd.type="SESSION";const Wa=Dd;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pI(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class js{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const n=new js(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:i});const c=Array.from(o).map(async h=>h(t.origin,s)),u=await pI(c);t.ports[0].postMessage({status:"done",eventId:n,eventType:i,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}js.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gs(r="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return r+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mI{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((c,u)=>{const h=Gs("",20);i.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},n);o={messageChannel:i,onMessage(m){const I=m;if(I.data.eventId===h)switch(I.data.status){case"ack":clearTimeout(f),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(I.data.response);break;default:clearTimeout(f),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ye(){return window}function gI(r){ye().location.href=r}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ha(){return typeof ye().WorkerGlobalScope<"u"&&typeof ye().importScripts=="function"}async function _I(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function yI(){var r;return((r=navigator==null?void 0:navigator.serviceWorker)===null||r===void 0?void 0:r.controller)||null}function II(){return Ha()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vd="firebaseLocalStorageDb",vI=1,vs="firebaseLocalStorage",Nd="fbase_key";class yi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function zs(r,e){return r.transaction([vs],e?"readwrite":"readonly").objectStore(vs)}function EI(){const r=indexedDB.deleteDatabase(Vd);return new yi(r).toPromise()}function ua(){const r=indexedDB.open(Vd,vI);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{const n=r.result;try{n.createObjectStore(vs,{keyPath:Nd})}catch(i){t(i)}}),r.addEventListener("success",async()=>{const n=r.result;n.objectStoreNames.contains(vs)?e(n):(n.close(),await EI(),e(await ua()))})})}async function hl(r,e,t){const n=zs(r,!0).put({[Nd]:e,value:t});return new yi(n).toPromise()}async function TI(r,e){const t=zs(r,!1).get(e),n=await new yi(t).toPromise();return n===void 0?null:n.value}function dl(r,e){const t=zs(r,!0).delete(e);return new yi(t).toPromise()}const wI=800,AI=3;class kd{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ua(),this.db)}async _withRetries(e){let t=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(t++>AI)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Ha()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=js._getInstance(II()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await _I(),!this.activeServiceWorker)return;this.sender=new mI(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&!((e=n[0])===null||e===void 0)&&e.fulfilled&&!((t=n[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||yI()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ua();return await hl(e,Is,"1"),await dl(e,Is),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>hl(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(n=>TI(n,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>dl(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=zs(i,!1).getAll();return new yi(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],n=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)n.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!n.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const i of Array.from(n))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),wI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}kd.type="LOCAL";const Od=kd;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RI(r,e){return ae(r,"POST","/v2/accounts/mfaSignIn:start",oe(r,e))}function SI(r,e){return ae(r,"POST","/v2/accounts/mfaSignIn:finalize",oe(r,e))}function bI(r,e){return ae(r,"POST","/v2/accounts/mfaSignIn:finalize",oe(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PI=500,CI=6e4,Hi=1e12;class DI{constructor(e){this.auth=e,this.counter=Hi,this._widgets=new Map}render(e,t){const n=this.counter;return this._widgets.set(n,new VI(e,this.auth.name,t||{})),this.counter++,n}reset(e){var t;const n=e||Hi;(t=this._widgets.get(n))===null||t===void 0||t.delete(),this._widgets.delete(n)}getResponse(e){var t;const n=e||Hi;return((t=this._widgets.get(n))===null||t===void 0?void 0:t.getResponse())||""}async execute(e){var t;const n=e||Hi;return(t=this._widgets.get(n))===null||t===void 0||t.execute(),""}}class VI{constructor(e,t,n){this.params=n,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const i=typeof e=="string"?document.getElementById(e):e;k(i,"argument-error",{appName:t}),this.container=i,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=NI(50);const{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch{}this.isVisible&&this.execute()},CI)},PI))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function NI(r){const e=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let n=0;n<r;n++)e.push(t.charAt(Math.floor(Math.random()*t.length)));return e.join("")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wo=ud("rcb"),kI=new mi(3e4,6e4);class OI{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!(!((e=ye().grecaptcha)===null||e===void 0)&&e.render)}load(e,t=""){return k(xI(t),e,"argument-error"),this.shouldResolveImmediately(t)&&nl(ye().grecaptcha)?Promise.resolve(ye().grecaptcha):new Promise((n,i)=>{const s=ye().setTimeout(()=>{i(Le(e,"network-request-failed"))},kI.get());ye()[Wo]=()=>{ye().clearTimeout(s),delete ye()[Wo];const c=ye().grecaptcha;if(!c||!nl(c)){i(Le(e,"internal-error"));return}const u=c.render;c.render=(h,f)=>{const m=u(h,f);return this.counter++,m},this.hostLanguage=t,n(c)};const o=`${W_()}?${nr({onload:Wo,render:"explicit",hl:t})}`;Ba(o).catch(()=>{clearTimeout(s),i(Le(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var t;return!!(!((t=ye().grecaptcha)===null||t===void 0)&&t.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function xI(r){return r.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(r)}class LI{async load(e){return new DI(e)}clearedOneInstance(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xd="recaptcha",MI={theme:"light",type:"image"};class FI{constructor(e,t,n=Object.assign({},MI)){this.parameters=n,this.type=xd,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=fe(e),this.isInvisible=this.parameters.size==="invisible",k(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const i=typeof t=="string"?document.getElementById(t):t;k(i,this.auth,"argument-error"),this.container=i,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new LI:new OI,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),t=this.getAssertedRecaptcha(),n=t.getResponse(e);return n||new Promise(i=>{const s=o=>{o&&(this.tokenChangeListeners.delete(s),i(o))};this.tokenChangeListeners.add(s),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){k(!this.parameters.sitekey,this.auth,"argument-error"),k(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),k(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(n=>n(t)),typeof e=="function")e(t);else if(typeof e=="string"){const n=ye()[e];typeof n=="function"&&n(t)}}}assertNotDestroyed(){k(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){k(Ma()&&!Ha(),this.auth,"internal-error"),await UI(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await D_(this.auth);k(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return k(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function UI(){let r=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}r=()=>e(),window.addEventListener("load",r)}).catch(e=>{throw r&&window.removeEventListener("load",r),e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qa{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){const t=Lt._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function BI(r,e,t){if(me(r.app))return Promise.reject(we(r));const n=fe(r),i=await Ks(n,e,j(t));return new Qa(i,s=>Bs(n,s))}async function qI(r,e,t){const n=j(r);await Us(!1,n,"phone");const i=await Ks(n.auth,e,j(t));return new Qa(i,s=>vd(n,s))}async function jI(r,e,t){const n=j(r);if(me(n.auth.app))return Promise.reject(we(n.auth));const i=await Ks(n.auth,e,j(t));return new Qa(i,s=>Ed(n,s))}async function Ks(r,e,t){var n;const i=await t.verify();try{k(typeof i=="string",r,"argument-error"),k(t.type===xd,r,"argument-error");let s;if(typeof e=="string"?s={phoneNumber:e}:s=e,"session"in s){const o=s.session;if("phoneNumber"in s)return k(o.type==="enroll",r,"internal-error"),(await oI(r,{idToken:o.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,recaptchaToken:i}})).phoneSessionInfo.sessionInfo;{k(o.type==="signin",r,"internal-error");const c=((n=s.multiFactorHint)===null||n===void 0?void 0:n.uid)||s.multiFactorUid;return k(c,r,"missing-multi-factor-info"),(await RI(r,{mfaPendingCredential:o.credential,mfaEnrollmentId:c,phoneSignInInfo:{recaptchaToken:i}})).phoneResponseInfo.sessionInfo}}else{const{sessionInfo:o}=await fy(r,{phoneNumber:s.phoneNumber,recaptchaToken:i});return o}}finally{t._reset()}}async function GI(r,e){const t=j(r);if(me(t.auth.app))return Promise.reject(we(t.auth));await qa(t,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an{constructor(e){this.providerId=an.PROVIDER_ID,this.auth=fe(e)}verifyPhoneNumber(e,t){return Ks(this.auth,e,j(t))}static credential(e,t){return Lt._fromVerification(e,t)}static credentialFromResult(e){const t=e;return an.credentialFromTaggedObject(t)}static credentialFromError(e){return an.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:t,temporaryProof:n}=e;return t&&n?Lt._fromTokenResponse(t,n):null}}an.PROVIDER_ID="phone";an.PHONE_SIGN_IN_METHOD="phone";/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function In(r,e){return e?dt(e):(k(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ja extends sr{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return mt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return mt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return mt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function zI(r){return Id(r.auth,new Ja(r),r.bypassAuthState)}function KI(r){const{auth:e,user:t}=r;return k(t,e,"internal-error"),yd(t,new Ja(r),r.bypassAuthState)}async function $I(r){const{auth:e,user:t}=r;return k(t,e,"internal-error"),qa(t,new Ja(r),r.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ld{constructor(e,t,n,i,s=!1){this.auth=e,this.resolver=n,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:i,tenantId:s,error:o,type:c}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:t,sessionId:n,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return zI;case"linkViaPopup":case"linkViaRedirect":return $I;case"reauthViaPopup":case"reauthViaRedirect":return KI;default:Ge(this.auth,"internal-error")}}resolve(e){_t(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){_t(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WI=new mi(2e3,1e4);async function HI(r,e,t){if(me(r.app))return Promise.reject(Le(r,"operation-not-supported-in-this-environment"));const n=fe(r);ir(r,e,Tt);const i=In(n,t);return new ft(n,"signInViaPopup",e,i).executeNotNull()}async function QI(r,e,t){const n=j(r);if(me(n.auth.app))return Promise.reject(Le(n.auth,"operation-not-supported-in-this-environment"));ir(n.auth,e,Tt);const i=In(n.auth,t);return new ft(n.auth,"reauthViaPopup",e,i,n).executeNotNull()}async function JI(r,e,t){const n=j(r);ir(n.auth,e,Tt);const i=In(n.auth,t);return new ft(n.auth,"linkViaPopup",e,i,n).executeNotNull()}class ft extends Ld{constructor(e,t,n,i,s){super(e,t,i,s),this.provider=n,this.authWindow=null,this.pollId=null,ft.currentPopupAction&&ft.currentPopupAction.cancel(),ft.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return k(e,this.auth,"internal-error"),e}async onExecution(){_t(this.filter.length===1,"Popup operations only handle one event");const e=Gs();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Le(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Le(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ft.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;if(!((n=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||n===void 0)&&n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Le(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,WI.get())};e()}}ft.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YI="pendingRedirect",is=new Map;class XI extends Ld{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=is.get(this.auth._key());if(!e){try{const n=await ZI(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}is.set(this.auth._key(),e)}return this.bypassAuthState||is.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function ZI(r,e){const t=Fd(e),n=Md(r);if(!await n._isAvailable())return!1;const i=await n._get(t)==="true";return await n._remove(t),i}async function Ya(r,e){return Md(r)._set(Fd(e),"true")}function ev(r,e){is.set(r._key(),e)}function Md(r){return dt(r._redirectPersistence)}function Fd(r){return rs(YI,r.config.apiKey,r.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tv(r,e,t){return nv(r,e,t)}async function nv(r,e,t){if(me(r.app))return Promise.reject(we(r));const n=fe(r);ir(r,e,Tt),await n._initializationPromise;const i=In(n,t);return await Ya(i,n),i._openRedirect(n,e,"signInViaRedirect")}function rv(r,e,t){return iv(r,e,t)}async function iv(r,e,t){const n=j(r);if(ir(n.auth,e,Tt),me(n.auth.app))return Promise.reject(we(n.auth));await n.auth._initializationPromise;const i=In(n.auth,t);await Ya(i,n.auth);const s=await Bd(n);return i._openRedirect(n.auth,e,"reauthViaRedirect",s)}function sv(r,e,t){return ov(r,e,t)}async function ov(r,e,t){const n=j(r);ir(n.auth,e,Tt),await n.auth._initializationPromise;const i=In(n.auth,t);await Us(!1,n,e.providerId),await Ya(i,n.auth);const s=await Bd(n);return i._openRedirect(n.auth,e,"linkViaRedirect",s)}async function av(r,e){return await fe(r)._initializationPromise,Ud(r,e,!1)}async function Ud(r,e,t=!1){if(me(r.app))return Promise.reject(we(r));const n=fe(r),i=In(n,e),o=await new XI(n,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await n._persistUserIfCurrent(o.user),await n._setRedirectUser(null,e)),o}async function Bd(r){const e=Gs(`${r.uid}:::`);return r._redirectEventId=e,await r.auth._setRedirectUser(r),await r.auth._persistUserIfCurrent(r),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cv=10*60*1e3;class uv{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!lv(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!qd(e)){const i=((n=e.error.code)===null||n===void 0?void 0:n.split("auth/")[1])||"internal-error";t.onError(Le(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=cv&&this.cachedEventUids.clear(),this.cachedEventUids.has(fl(e))}saveEventToCache(e){this.cachedEventUids.add(fl(e)),this.lastProcessedEventTime=Date.now()}}function fl(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function qd({type:r,error:e}){return r==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function lv(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return qd(r);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hv(r,e={}){return ae(r,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dv=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,fv=/^https?/;async function pv(r){if(r.config.emulator)return;const{authorizedDomains:e}=await hv(r);for(const t of e)try{if(mv(t))return}catch{}Ge(r,"unauthorized-domain")}function mv(r){const e=Xr(),{protocol:t,hostname:n}=new URL(e);if(r.startsWith("chrome-extension://")){const o=new URL(r);return o.hostname===""&&n===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===n}if(!fv.test(t))return!1;if(dv.test(r))return n===r;const i=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(n)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gv=new mi(3e4,6e4);function pl(){const r=ye().___jsl;if(r!=null&&r.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function _v(r){return new Promise((e,t)=>{var n,i,s;function o(){pl(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{pl(),t(Le(r,"network-request-failed"))},timeout:gv.get()})}if(!((i=(n=ye().gapi)===null||n===void 0?void 0:n.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=ye().gapi)===null||s===void 0)&&s.load)o();else{const c=ud("iframefcb");return ye()[c]=()=>{gapi.load?o():t(Le(r,"network-request-failed"))},Ba(`${Q_()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw ss=null,e})}let ss=null;function yv(r){return ss=ss||_v(r),ss}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Iv=new mi(5e3,15e3),vv="__/auth/iframe",Ev="emulator/auth/iframe",Tv={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},wv=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Av(r){const e=r.config;k(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?Fa(e,Ev):`https://${r.config.authDomain}/${vv}`,n={apiKey:e.apiKey,appName:r.name,v:rr},i=wv.get(r.config.apiHost);i&&(n.eid=i);const s=r._getFrameworks();return s.length&&(n.fw=s.join(",")),`${t}?${nr(n).slice(1)}`}async function Rv(r){const e=await yv(r),t=ye().gapi;return k(t,r,"internal-error"),e.open({where:document.body,url:Av(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Tv,dontclear:!0},n=>new Promise(async(i,s)=>{await n.restyle({setHideOnLeave:!1});const o=Le(r,"network-request-failed"),c=ye().setTimeout(()=>{s(o)},Iv.get());function u(){ye().clearTimeout(c),i(n)}n.ping(u).then(u,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sv={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},bv=500,Pv=600,Cv="_blank",Dv="http://localhost";class ml{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Vv(r,e,t,n=bv,i=Pv){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-n)/2,0).toString();let c="";const u=Object.assign(Object.assign({},Sv),{width:n.toString(),height:i.toString(),top:s,left:o}),h=ve().toLowerCase();t&&(c=nd(h)?Cv:t),ed(h)&&(e=e||Dv,u.scrollbars="yes");const f=Object.entries(u).reduce((I,[S,D])=>`${I}${S}=${D},`,"");if(U_(h)&&c!=="_self")return Nv(e||"",c),new ml(null);const m=window.open(e||"",c,f);k(m,r,"popup-blocked");try{m.focus()}catch{}return new ml(m)}function Nv(r,e){const t=document.createElement("a");t.href=r,t.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(n)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kv="__/auth/handler",Ov="emulator/auth/handler",xv=encodeURIComponent("fac");async function gl(r,e,t,n,i,s){k(r.config.authDomain,r,"auth-domain-config-required"),k(r.config.apiKey,r,"invalid-api-key");const o={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:n,v:rr,eventId:i};if(e instanceof Tt){e.setDefaultLanguage(r.languageCode),o.providerId=e.providerId||"",ng(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,m]of Object.entries({}))o[f]=m}if(e instanceof ar){const f=e.getScopes().filter(m=>m!=="");f.length>0&&(o.scopes=f.join(","))}r.tenantId&&(o.tid=r.tenantId);const c=o;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await r._getAppCheckToken(),h=u?`#${xv}=${encodeURIComponent(u)}`:"";return`${Lv(r)}?${nr(c).slice(1)}${h}`}function Lv({config:r}){return r.emulator?Fa(r,Ov):`https://${r.authDomain}/${kv}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ho="webStorageSupport";class Mv{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Wa,this._completeRedirectFn=Ud,this._overrideRedirectResult=ev}async _openPopup(e,t,n,i){var s;_t((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await gl(e,t,n,Xr(),i);return Vv(e,o,Gs())}async _openRedirect(e,t,n,i){await this._originValidation(e);const s=await gl(e,t,n,Xr(),i);return gI(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(_t(s,"If manager is not set, promise should be"),s)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await Rv(e),n=new uv(e);return t.register("authEvent",i=>(k(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:n.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ho,{type:Ho},i=>{var s;const o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[Ho];o!==void 0&&t(!!o),Ge(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=pv(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return ad()||td()||Ua()}}const jd=Mv;class Gd{constructor(e){this.factorId=e}_process(e,t,n){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,n);case"signin":return this._finalizeSignIn(e,t.credential);default:return Ye("unexpected MultiFactorSessionType")}}}class Xa extends Gd{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new Xa(e)}_finalizeEnroll(e,t,n){return aI(e,{idToken:t,displayName:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return SI(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class zd{constructor(){}static assertion(e){return Xa._fromCredential(e)}}zd.FACTOR_ID="phone";class Kd{static assertionForEnrollment(e,t){return ni._fromSecret(e,t)}static assertionForSignIn(e,t){return ni._fromEnrollmentId(e,t)}static async generateSecret(e){var t;const n=e;k(typeof((t=n.user)===null||t===void 0?void 0:t.auth)<"u","internal-error");const i=await cI(n.user.auth,{idToken:n.credential,totpEnrollmentInfo:{}});return $s._fromStartTotpMfaEnrollmentResponse(i,n.user.auth)}}Kd.FACTOR_ID="totp";class ni extends Gd{constructor(e,t,n){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=n}static _fromSecret(e,t){return new ni(t,void 0,e)}static _fromEnrollmentId(e,t){return new ni(t,e)}async _finalizeEnroll(e,t,n){return k(typeof this.secret<"u",e,"argument-error"),uI(e,{idToken:t,displayName:n,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){k(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");const n={verificationCode:this.otp};return bI(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:n})}}class $s{constructor(e,t,n,i,s,o,c){this.sessionInfo=o,this.auth=c,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=n,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,t){return new $s(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var n;let i=!1;return(Qi(e)||Qi(t))&&(i=!0),i&&(Qi(e)&&(e=((n=this.auth.currentUser)===null||n===void 0?void 0:n.email)||"unknownuser"),Qi(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}}function Qi(r){return typeof r>"u"||(r==null?void 0:r.length)===0}var _l="@firebase/auth",yl="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fv{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(n=>{e((n==null?void 0:n.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){k(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uv(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Bv(r){jn(new ln("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=n.options;k(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});const u={apiKey:o,authDomain:c,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:cd(r)},h=new K_(n,i,s,u);return Z_(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),jn(new ln("auth-internal",e=>{const t=fe(e.getProvider("auth").getImmediate());return(n=>new Fv(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),xt(_l,yl,Uv(r)),xt(_l,yl,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qv=5*60,jv=Oh("authIdTokenMaxAge")||qv;let Il=null;const Gv=r=>async e=>{const t=e&&await e.getIdTokenResult(),n=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>jv)return;const i=t==null?void 0:t.token;Il!==i&&(Il=i,await fetch(r,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function zv(r=s_()){const e=ka(r,"auth");if(e.isInitialized())return e.getImmediate();const t=hd(r,{popupRedirectResolver:jd,persistence:[Od,Cd,Wa]}),n=Oh("authTokenSyncURL");if(n&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(n,location.origin);if(location.origin===s.origin){const o=Gv(s.toString());Sd(t,o,()=>o(t.currentUser)),Rd(t,c=>o(c))}}const i=zm("auth");return i&&dd(t,`http://${i}`),t}function Kv(){var r,e;return(e=(r=document.getElementsByTagName("head"))===null||r===void 0?void 0:r[0])!==null&&e!==void 0?e:document}$_({loadJS(r){return new Promise((e,t)=>{const n=document.createElement("script");n.setAttribute("src",r),n.onload=e,n.onerror=i=>{const s=Le("internal-error");s.customData=i,t(s)},n.type="text/javascript",n.charset="UTF-8",Kv().appendChild(n)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Bv("Browser");const hA=Object.freeze(Object.defineProperty({__proto__:null,ActionCodeOperation:I_,ActionCodeURL:or,AuthCredential:sr,AuthErrorCodes:T_,EmailAuthCredential:Gn,EmailAuthProvider:Gt,FacebookAuthProvider:at,FactorId:m_,GithubAuthProvider:ut,GoogleAuthProvider:ct,OAuthCredential:et,OAuthProvider:zr,OperationType:y_,PhoneAuthCredential:Lt,PhoneAuthProvider:an,PhoneMultiFactorGenerator:zd,ProviderId:g_,RecaptchaVerifier:FI,SAMLAuthProvider:_s,SignInMethod:__,TotpMultiFactorGenerator:Kd,TotpSecret:$s,TwitterAuthProvider:lt,applyActionCode:Cy,beforeAuthStateChanged:Sd,browserLocalPersistence:Cd,browserPopupRedirectResolver:jd,browserSessionPersistence:Wa,checkActionCode:Td,confirmPasswordReset:Py,connectAuthEmulator:dd,createUserWithEmailAndPassword:Vy,debugErrorMap:E_,deleteUser:iI,fetchSignInMethodsForEmail:My,getAdditionalUserInfo:Qy,getAuth:zv,getIdToken:k_,getIdTokenResult:Jh,getMultiFactorResolver:sI,getRedirectResult:av,inMemoryPersistence:ca,indexedDBLocalPersistence:Od,initializeAuth:hd,initializeRecaptchaConfig:Yy,isSignInWithEmailLink:Oy,linkWithCredential:vd,linkWithPhoneNumber:qI,linkWithPopup:JI,linkWithRedirect:sv,multiFactor:hI,onAuthStateChanged:Zy,onIdTokenChanged:Rd,parseActionCodeURL:vy,prodErrorMap:jh,reauthenticateWithCredential:Ed,reauthenticateWithPhoneNumber:jI,reauthenticateWithPopup:QI,reauthenticateWithRedirect:rv,reload:Yh,revokeAccessToken:rI,sendEmailVerification:Fy,sendPasswordResetEmail:by,sendSignInLinkToEmail:ky,setPersistence:Jy,signInAnonymously:wy,signInWithCredential:Bs,signInWithCustomToken:Sy,signInWithEmailAndPassword:Ny,signInWithEmailLink:xy,signInWithPhoneNumber:BI,signInWithPopup:HI,signInWithRedirect:tv,signOut:nI,unlink:Ay,updateCurrentUser:tI,updateEmail:jy,updatePassword:Gy,updatePhoneNumber:GI,updateProfile:qy,useDeviceLanguage:eI,validatePassword:Xy,verifyBeforeUpdateEmail:Uy,verifyPasswordResetCode:Dy},Symbol.toStringTag,{value:"Module"}));var vl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var cn,$d;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(v,g){function y(){}y.prototype=g.prototype,v.D=g.prototype,v.prototype=new y,v.prototype.constructor=v,v.C=function(E,T,R){for(var _=Array(arguments.length-2),it=2;it<arguments.length;it++)_[it-2]=arguments[it];return g.prototype[T].apply(E,_)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(n,t),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(v,g,y){y||(y=0);var E=Array(16);if(typeof g=="string")for(var T=0;16>T;++T)E[T]=g.charCodeAt(y++)|g.charCodeAt(y++)<<8|g.charCodeAt(y++)<<16|g.charCodeAt(y++)<<24;else for(T=0;16>T;++T)E[T]=g[y++]|g[y++]<<8|g[y++]<<16|g[y++]<<24;g=v.g[0],y=v.g[1],T=v.g[2];var R=v.g[3],_=g+(R^y&(T^R))+E[0]+3614090360&4294967295;g=y+(_<<7&4294967295|_>>>25),_=R+(T^g&(y^T))+E[1]+3905402710&4294967295,R=g+(_<<12&4294967295|_>>>20),_=T+(y^R&(g^y))+E[2]+606105819&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(g^T&(R^g))+E[3]+3250441966&4294967295,y=T+(_<<22&4294967295|_>>>10),_=g+(R^y&(T^R))+E[4]+4118548399&4294967295,g=y+(_<<7&4294967295|_>>>25),_=R+(T^g&(y^T))+E[5]+1200080426&4294967295,R=g+(_<<12&4294967295|_>>>20),_=T+(y^R&(g^y))+E[6]+2821735955&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(g^T&(R^g))+E[7]+4249261313&4294967295,y=T+(_<<22&4294967295|_>>>10),_=g+(R^y&(T^R))+E[8]+1770035416&4294967295,g=y+(_<<7&4294967295|_>>>25),_=R+(T^g&(y^T))+E[9]+2336552879&4294967295,R=g+(_<<12&4294967295|_>>>20),_=T+(y^R&(g^y))+E[10]+4294925233&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(g^T&(R^g))+E[11]+2304563134&4294967295,y=T+(_<<22&4294967295|_>>>10),_=g+(R^y&(T^R))+E[12]+1804603682&4294967295,g=y+(_<<7&4294967295|_>>>25),_=R+(T^g&(y^T))+E[13]+4254626195&4294967295,R=g+(_<<12&4294967295|_>>>20),_=T+(y^R&(g^y))+E[14]+2792965006&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(g^T&(R^g))+E[15]+1236535329&4294967295,y=T+(_<<22&4294967295|_>>>10),_=g+(T^R&(y^T))+E[1]+4129170786&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(g^y))+E[6]+3225465664&4294967295,R=g+(_<<9&4294967295|_>>>23),_=T+(g^y&(R^g))+E[11]+643717713&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(T^R))+E[0]+3921069994&4294967295,y=T+(_<<20&4294967295|_>>>12),_=g+(T^R&(y^T))+E[5]+3593408605&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(g^y))+E[10]+38016083&4294967295,R=g+(_<<9&4294967295|_>>>23),_=T+(g^y&(R^g))+E[15]+3634488961&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(T^R))+E[4]+3889429448&4294967295,y=T+(_<<20&4294967295|_>>>12),_=g+(T^R&(y^T))+E[9]+568446438&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(g^y))+E[14]+3275163606&4294967295,R=g+(_<<9&4294967295|_>>>23),_=T+(g^y&(R^g))+E[3]+4107603335&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(T^R))+E[8]+1163531501&4294967295,y=T+(_<<20&4294967295|_>>>12),_=g+(T^R&(y^T))+E[13]+2850285829&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(g^y))+E[2]+4243563512&4294967295,R=g+(_<<9&4294967295|_>>>23),_=T+(g^y&(R^g))+E[7]+1735328473&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(T^R))+E[12]+2368359562&4294967295,y=T+(_<<20&4294967295|_>>>12),_=g+(y^T^R)+E[5]+4294588738&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^T)+E[8]+2272392833&4294967295,R=g+(_<<11&4294967295|_>>>21),_=T+(R^g^y)+E[11]+1839030562&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^g)+E[14]+4259657740&4294967295,y=T+(_<<23&4294967295|_>>>9),_=g+(y^T^R)+E[1]+2763975236&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^T)+E[4]+1272893353&4294967295,R=g+(_<<11&4294967295|_>>>21),_=T+(R^g^y)+E[7]+4139469664&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^g)+E[10]+3200236656&4294967295,y=T+(_<<23&4294967295|_>>>9),_=g+(y^T^R)+E[13]+681279174&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^T)+E[0]+3936430074&4294967295,R=g+(_<<11&4294967295|_>>>21),_=T+(R^g^y)+E[3]+3572445317&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^g)+E[6]+76029189&4294967295,y=T+(_<<23&4294967295|_>>>9),_=g+(y^T^R)+E[9]+3654602809&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^T)+E[12]+3873151461&4294967295,R=g+(_<<11&4294967295|_>>>21),_=T+(R^g^y)+E[15]+530742520&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^g)+E[2]+3299628645&4294967295,y=T+(_<<23&4294967295|_>>>9),_=g+(T^(y|~R))+E[0]+4096336452&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~T))+E[7]+1126891415&4294967295,R=g+(_<<10&4294967295|_>>>22),_=T+(g^(R|~y))+E[14]+2878612391&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~g))+E[5]+4237533241&4294967295,y=T+(_<<21&4294967295|_>>>11),_=g+(T^(y|~R))+E[12]+1700485571&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~T))+E[3]+2399980690&4294967295,R=g+(_<<10&4294967295|_>>>22),_=T+(g^(R|~y))+E[10]+4293915773&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~g))+E[1]+2240044497&4294967295,y=T+(_<<21&4294967295|_>>>11),_=g+(T^(y|~R))+E[8]+1873313359&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~T))+E[15]+4264355552&4294967295,R=g+(_<<10&4294967295|_>>>22),_=T+(g^(R|~y))+E[6]+2734768916&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~g))+E[13]+1309151649&4294967295,y=T+(_<<21&4294967295|_>>>11),_=g+(T^(y|~R))+E[4]+4149444226&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~T))+E[11]+3174756917&4294967295,R=g+(_<<10&4294967295|_>>>22),_=T+(g^(R|~y))+E[2]+718787259&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~g))+E[9]+3951481745&4294967295,v.g[0]=v.g[0]+g&4294967295,v.g[1]=v.g[1]+(T+(_<<21&4294967295|_>>>11))&4294967295,v.g[2]=v.g[2]+T&4294967295,v.g[3]=v.g[3]+R&4294967295}n.prototype.u=function(v,g){g===void 0&&(g=v.length);for(var y=g-this.blockSize,E=this.B,T=this.h,R=0;R<g;){if(T==0)for(;R<=y;)i(this,v,R),R+=this.blockSize;if(typeof v=="string"){for(;R<g;)if(E[T++]=v.charCodeAt(R++),T==this.blockSize){i(this,E),T=0;break}}else for(;R<g;)if(E[T++]=v[R++],T==this.blockSize){i(this,E),T=0;break}}this.h=T,this.o+=g},n.prototype.v=function(){var v=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);v[0]=128;for(var g=1;g<v.length-8;++g)v[g]=0;var y=8*this.o;for(g=v.length-8;g<v.length;++g)v[g]=y&255,y/=256;for(this.u(v),v=Array(16),g=y=0;4>g;++g)for(var E=0;32>E;E+=8)v[y++]=this.g[g]>>>E&255;return v};function s(v,g){var y=c;return Object.prototype.hasOwnProperty.call(y,v)?y[v]:y[v]=g(v)}function o(v,g){this.h=g;for(var y=[],E=!0,T=v.length-1;0<=T;T--){var R=v[T]|0;E&&R==g||(y[T]=R,E=!1)}this.g=y}var c={};function u(v){return-128<=v&&128>v?s(v,function(g){return new o([g|0],0>g?-1:0)}):new o([v|0],0>v?-1:0)}function h(v){if(isNaN(v)||!isFinite(v))return m;if(0>v)return N(h(-v));for(var g=[],y=1,E=0;v>=y;E++)g[E]=v/y|0,y*=4294967296;return new o(g,0)}function f(v,g){if(v.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(v.charAt(0)=="-")return N(f(v.substring(1),g));if(0<=v.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=h(Math.pow(g,8)),E=m,T=0;T<v.length;T+=8){var R=Math.min(8,v.length-T),_=parseInt(v.substring(T,T+R),g);8>R?(R=h(Math.pow(g,R)),E=E.j(R).add(h(_))):(E=E.j(y),E=E.add(h(_)))}return E}var m=u(0),I=u(1),S=u(16777216);r=o.prototype,r.m=function(){if(O(this))return-N(this).m();for(var v=0,g=1,y=0;y<this.g.length;y++){var E=this.i(y);v+=(0<=E?E:4294967296+E)*g,g*=4294967296}return v},r.toString=function(v){if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(D(this))return"0";if(O(this))return"-"+N(this).toString(v);for(var g=h(Math.pow(v,6)),y=this,E="";;){var T=J(y,g).g;y=K(y,T.j(g));var R=((0<y.g.length?y.g[0]:y.h)>>>0).toString(v);if(y=T,D(y))return R+E;for(;6>R.length;)R="0"+R;E=R+E}},r.i=function(v){return 0>v?0:v<this.g.length?this.g[v]:this.h};function D(v){if(v.h!=0)return!1;for(var g=0;g<v.g.length;g++)if(v.g[g]!=0)return!1;return!0}function O(v){return v.h==-1}r.l=function(v){return v=K(this,v),O(v)?-1:D(v)?0:1};function N(v){for(var g=v.g.length,y=[],E=0;E<g;E++)y[E]=~v.g[E];return new o(y,~v.h).add(I)}r.abs=function(){return O(this)?N(this):this},r.add=function(v){for(var g=Math.max(this.g.length,v.g.length),y=[],E=0,T=0;T<=g;T++){var R=E+(this.i(T)&65535)+(v.i(T)&65535),_=(R>>>16)+(this.i(T)>>>16)+(v.i(T)>>>16);E=_>>>16,R&=65535,_&=65535,y[T]=_<<16|R}return new o(y,y[y.length-1]&-2147483648?-1:0)};function K(v,g){return v.add(N(g))}r.j=function(v){if(D(this)||D(v))return m;if(O(this))return O(v)?N(this).j(N(v)):N(N(this).j(v));if(O(v))return N(this.j(N(v)));if(0>this.l(S)&&0>v.l(S))return h(this.m()*v.m());for(var g=this.g.length+v.g.length,y=[],E=0;E<2*g;E++)y[E]=0;for(E=0;E<this.g.length;E++)for(var T=0;T<v.g.length;T++){var R=this.i(E)>>>16,_=this.i(E)&65535,it=v.i(T)>>>16,pr=v.i(T)&65535;y[2*E+2*T]+=_*pr,G(y,2*E+2*T),y[2*E+2*T+1]+=R*pr,G(y,2*E+2*T+1),y[2*E+2*T+1]+=_*it,G(y,2*E+2*T+1),y[2*E+2*T+2]+=R*it,G(y,2*E+2*T+2)}for(E=0;E<g;E++)y[E]=y[2*E+1]<<16|y[2*E];for(E=g;E<2*g;E++)y[E]=0;return new o(y,0)};function G(v,g){for(;(v[g]&65535)!=v[g];)v[g+1]+=v[g]>>>16,v[g]&=65535,g++}function q(v,g){this.g=v,this.h=g}function J(v,g){if(D(g))throw Error("division by zero");if(D(v))return new q(m,m);if(O(v))return g=J(N(v),g),new q(N(g.g),N(g.h));if(O(g))return g=J(v,N(g)),new q(N(g.g),g.h);if(30<v.g.length){if(O(v)||O(g))throw Error("slowDivide_ only works with positive integers.");for(var y=I,E=g;0>=E.l(v);)y=ee(y),E=ee(E);var T=W(y,1),R=W(E,1);for(E=W(E,2),y=W(y,2);!D(E);){var _=R.add(E);0>=_.l(v)&&(T=T.add(y),R=_),E=W(E,1),y=W(y,1)}return g=K(v,T.j(g)),new q(T,g)}for(T=m;0<=v.l(g);){for(y=Math.max(1,Math.floor(v.m()/g.m())),E=Math.ceil(Math.log(y)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),R=h(y),_=R.j(g);O(_)||0<_.l(v);)y-=E,R=h(y),_=R.j(g);D(R)&&(R=I),T=T.add(R),v=K(v,_)}return new q(T,v)}r.A=function(v){return J(this,v).h},r.and=function(v){for(var g=Math.max(this.g.length,v.g.length),y=[],E=0;E<g;E++)y[E]=this.i(E)&v.i(E);return new o(y,this.h&v.h)},r.or=function(v){for(var g=Math.max(this.g.length,v.g.length),y=[],E=0;E<g;E++)y[E]=this.i(E)|v.i(E);return new o(y,this.h|v.h)},r.xor=function(v){for(var g=Math.max(this.g.length,v.g.length),y=[],E=0;E<g;E++)y[E]=this.i(E)^v.i(E);return new o(y,this.h^v.h)};function ee(v){for(var g=v.g.length+1,y=[],E=0;E<g;E++)y[E]=v.i(E)<<1|v.i(E-1)>>>31;return new o(y,v.h)}function W(v,g){var y=g>>5;g%=32;for(var E=v.g.length-y,T=[],R=0;R<E;R++)T[R]=0<g?v.i(R+y)>>>g|v.i(R+y+1)<<32-g:v.i(R+y);return new o(T,v.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,$d=n,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,cn=o}).apply(typeof vl<"u"?vl:typeof self<"u"?self:typeof window<"u"?window:{});var Ji=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Wd,Ur,Hd,os,la,Qd,Jd,Yd;(function(){var r,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,l,d){return a==Array.prototype||a==Object.prototype||(a[l]=d.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ji=="object"&&Ji];for(var l=0;l<a.length;++l){var d=a[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=t(this);function i(a,l){if(l)e:{var d=n;a=a.split(".");for(var p=0;p<a.length-1;p++){var w=a[p];if(!(w in d))break e;d=d[w]}a=a[a.length-1],p=d[a],l=l(p),l!=p&&l!=null&&e(d,a,{configurable:!0,writable:!0,value:l})}}function s(a,l){a instanceof String&&(a+="");var d=0,p=!1,w={next:function(){if(!p&&d<a.length){var b=d++;return{value:l(b,a[b]),done:!1}}return p=!0,{done:!0,value:void 0}}};return w[Symbol.iterator]=function(){return w},w}i("Array.prototype.values",function(a){return a||function(){return s(this,function(l,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},c=this||self;function u(a){var l=typeof a;return l=l!="object"?l:a?Array.isArray(a)?"array":l:"null",l=="array"||l=="object"&&typeof a.length=="number"}function h(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function f(a,l,d){return a.call.apply(a.bind,arguments)}function m(a,l,d){if(!a)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var w=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(w,p),a.apply(l,w)}}return function(){return a.apply(l,arguments)}}function I(a,l,d){return I=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:m,I.apply(null,arguments)}function S(a,l){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),a.apply(this,p)}}function D(a,l){function d(){}d.prototype=l.prototype,a.aa=l.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(p,w,b){for(var x=Array(arguments.length-2),re=2;re<arguments.length;re++)x[re-2]=arguments[re];return l.prototype[w].apply(p,x)}}function O(a){const l=a.length;if(0<l){const d=Array(l);for(let p=0;p<l;p++)d[p]=a[p];return d}return[]}function N(a,l){for(let d=1;d<arguments.length;d++){const p=arguments[d];if(u(p)){const w=a.length||0,b=p.length||0;a.length=w+b;for(let x=0;x<b;x++)a[w+x]=p[x]}else a.push(p)}}class K{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function G(a){return/^[\s\xa0]*$/.test(a)}function q(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function J(a){return J[" "](a),a}J[" "]=function(){};var ee=q().indexOf("Gecko")!=-1&&!(q().toLowerCase().indexOf("webkit")!=-1&&q().indexOf("Edge")==-1)&&!(q().indexOf("Trident")!=-1||q().indexOf("MSIE")!=-1)&&q().indexOf("Edge")==-1;function W(a,l,d){for(const p in a)l.call(d,a[p],p,a)}function v(a,l){for(const d in a)l.call(void 0,a[d],d,a)}function g(a){const l={};for(const d in a)l[d]=a[d];return l}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(a,l){let d,p;for(let w=1;w<arguments.length;w++){p=arguments[w];for(d in p)a[d]=p[d];for(let b=0;b<y.length;b++)d=y[b],Object.prototype.hasOwnProperty.call(p,d)&&(a[d]=p[d])}}function T(a){var l=1;a=a.split(":");const d=[];for(;0<l&&a.length;)d.push(a.shift()),l--;return a.length&&d.push(a.join(":")),d}function R(a){c.setTimeout(()=>{throw a},0)}function _(){var a=go;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class it{constructor(){this.h=this.g=null}add(l,d){const p=pr.get();p.set(l,d),this.h?this.h.next=p:this.g=p,this.h=p}}var pr=new K(()=>new nm,a=>a.reset());class nm{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let mr,gr=!1,go=new it,Kc=()=>{const a=c.Promise.resolve(void 0);mr=()=>{a.then(rm)}};var rm=()=>{for(var a;a=_();){try{a.h.call(a.g)}catch(d){R(d)}var l=pr;l.j(a),100>l.h&&(l.h++,a.next=l.g,l.g=a)}gr=!1};function At(){this.s=this.s,this.C=this.C}At.prototype.s=!1,At.prototype.ma=function(){this.s||(this.s=!0,this.N())},At.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Se(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}Se.prototype.h=function(){this.defaultPrevented=!0};var im=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};c.addEventListener("test",d,l),c.removeEventListener("test",d,l)}catch{}return a}();function _r(a,l){if(Se.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,p=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget){if(ee){e:{try{J(l.nodeName);var w=!0;break e}catch{}w=!1}w||(l=null)}}else d=="mouseover"?l=a.fromElement:d=="mouseout"&&(l=a.toElement);this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:sm[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&_r.aa.h.call(this)}}D(_r,Se);var sm={2:"touch",3:"pen",4:"mouse"};_r.prototype.h=function(){_r.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Ci="closure_listenable_"+(1e6*Math.random()|0),om=0;function am(a,l,d,p,w){this.listener=a,this.proxy=null,this.src=l,this.type=d,this.capture=!!p,this.ha=w,this.key=++om,this.da=this.fa=!1}function Di(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Vi(a){this.src=a,this.g={},this.h=0}Vi.prototype.add=function(a,l,d,p,w){var b=a.toString();a=this.g[b],a||(a=this.g[b]=[],this.h++);var x=yo(a,l,p,w);return-1<x?(l=a[x],d||(l.fa=!1)):(l=new am(l,this.src,b,!!p,w),l.fa=d,a.push(l)),l};function _o(a,l){var d=l.type;if(d in a.g){var p=a.g[d],w=Array.prototype.indexOf.call(p,l,void 0),b;(b=0<=w)&&Array.prototype.splice.call(p,w,1),b&&(Di(l),a.g[d].length==0&&(delete a.g[d],a.h--))}}function yo(a,l,d,p){for(var w=0;w<a.length;++w){var b=a[w];if(!b.da&&b.listener==l&&b.capture==!!d&&b.ha==p)return w}return-1}var Io="closure_lm_"+(1e6*Math.random()|0),vo={};function $c(a,l,d,p,w){if(Array.isArray(l)){for(var b=0;b<l.length;b++)$c(a,l[b],d,p,w);return null}return d=Qc(d),a&&a[Ci]?a.K(l,d,h(p)?!!p.capture:!1,w):cm(a,l,d,!1,p,w)}function cm(a,l,d,p,w,b){if(!l)throw Error("Invalid event type");var x=h(w)?!!w.capture:!!w,re=To(a);if(re||(a[Io]=re=new Vi(a)),d=re.add(l,d,p,x,b),d.proxy)return d;if(p=um(),d.proxy=p,p.src=a,p.listener=d,a.addEventListener)im||(w=x),w===void 0&&(w=!1),a.addEventListener(l.toString(),p,w);else if(a.attachEvent)a.attachEvent(Hc(l.toString()),p);else if(a.addListener&&a.removeListener)a.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function um(){function a(d){return l.call(a.src,a.listener,d)}const l=lm;return a}function Wc(a,l,d,p,w){if(Array.isArray(l))for(var b=0;b<l.length;b++)Wc(a,l[b],d,p,w);else p=h(p)?!!p.capture:!!p,d=Qc(d),a&&a[Ci]?(a=a.i,l=String(l).toString(),l in a.g&&(b=a.g[l],d=yo(b,d,p,w),-1<d&&(Di(b[d]),Array.prototype.splice.call(b,d,1),b.length==0&&(delete a.g[l],a.h--)))):a&&(a=To(a))&&(l=a.g[l.toString()],a=-1,l&&(a=yo(l,d,p,w)),(d=-1<a?l[a]:null)&&Eo(d))}function Eo(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[Ci])_o(l.i,a);else{var d=a.type,p=a.proxy;l.removeEventListener?l.removeEventListener(d,p,a.capture):l.detachEvent?l.detachEvent(Hc(d),p):l.addListener&&l.removeListener&&l.removeListener(p),(d=To(l))?(_o(d,a),d.h==0&&(d.src=null,l[Io]=null)):Di(a)}}}function Hc(a){return a in vo?vo[a]:vo[a]="on"+a}function lm(a,l){if(a.da)a=!0;else{l=new _r(l,this);var d=a.listener,p=a.ha||a.src;a.fa&&Eo(a),a=d.call(p,l)}return a}function To(a){return a=a[Io],a instanceof Vi?a:null}var wo="__closure_events_fn_"+(1e9*Math.random()>>>0);function Qc(a){return typeof a=="function"?a:(a[wo]||(a[wo]=function(l){return a.handleEvent(l)}),a[wo])}function be(){At.call(this),this.i=new Vi(this),this.M=this,this.F=null}D(be,At),be.prototype[Ci]=!0,be.prototype.removeEventListener=function(a,l,d,p){Wc(this,a,l,d,p)};function Oe(a,l){var d,p=a.F;if(p)for(d=[];p;p=p.F)d.push(p);if(a=a.M,p=l.type||l,typeof l=="string")l=new Se(l,a);else if(l instanceof Se)l.target=l.target||a;else{var w=l;l=new Se(p,a),E(l,w)}if(w=!0,d)for(var b=d.length-1;0<=b;b--){var x=l.g=d[b];w=Ni(x,p,!0,l)&&w}if(x=l.g=a,w=Ni(x,p,!0,l)&&w,w=Ni(x,p,!1,l)&&w,d)for(b=0;b<d.length;b++)x=l.g=d[b],w=Ni(x,p,!1,l)&&w}be.prototype.N=function(){if(be.aa.N.call(this),this.i){var a=this.i,l;for(l in a.g){for(var d=a.g[l],p=0;p<d.length;p++)Di(d[p]);delete a.g[l],a.h--}}this.F=null},be.prototype.K=function(a,l,d,p){return this.i.add(String(a),l,!1,d,p)},be.prototype.L=function(a,l,d,p){return this.i.add(String(a),l,!0,d,p)};function Ni(a,l,d,p){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();for(var w=!0,b=0;b<l.length;++b){var x=l[b];if(x&&!x.da&&x.capture==d){var re=x.listener,Ae=x.ha||x.src;x.fa&&_o(a.i,x),w=re.call(Ae,p)!==!1&&w}}return w&&!p.defaultPrevented}function Jc(a,l,d){if(typeof a=="function")d&&(a=I(a,d));else if(a&&typeof a.handleEvent=="function")a=I(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(a,l||0)}function Yc(a){a.g=Jc(()=>{a.g=null,a.i&&(a.i=!1,Yc(a))},a.l);const l=a.h;a.h=null,a.m.apply(null,l)}class hm extends At{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Yc(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function yr(a){At.call(this),this.h=a,this.g={}}D(yr,At);var Xc=[];function Zc(a){W(a.g,function(l,d){this.g.hasOwnProperty(d)&&Eo(l)},a),a.g={}}yr.prototype.N=function(){yr.aa.N.call(this),Zc(this)},yr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ao=c.JSON.stringify,dm=c.JSON.parse,fm=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function Ro(){}Ro.prototype.h=null;function eu(a){return a.h||(a.h=a.i())}function tu(){}var Ir={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function So(){Se.call(this,"d")}D(So,Se);function bo(){Se.call(this,"c")}D(bo,Se);var Ht={},nu=null;function ki(){return nu=nu||new be}Ht.La="serverreachability";function ru(a){Se.call(this,Ht.La,a)}D(ru,Se);function vr(a){const l=ki();Oe(l,new ru(l))}Ht.STAT_EVENT="statevent";function iu(a,l){Se.call(this,Ht.STAT_EVENT,a),this.stat=l}D(iu,Se);function xe(a){const l=ki();Oe(l,new iu(l,a))}Ht.Ma="timingevent";function su(a,l){Se.call(this,Ht.Ma,a),this.size=l}D(su,Se);function Er(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},l)}function Tr(){this.g=!0}Tr.prototype.xa=function(){this.g=!1};function pm(a,l,d,p,w,b){a.info(function(){if(a.g)if(b)for(var x="",re=b.split("&"),Ae=0;Ae<re.length;Ae++){var X=re[Ae].split("=");if(1<X.length){var Pe=X[0];X=X[1];var Ce=Pe.split("_");x=2<=Ce.length&&Ce[1]=="type"?x+(Pe+"="+X+"&"):x+(Pe+"=redacted&")}}else x=null;else x=b;return"XMLHTTP REQ ("+p+") [attempt "+w+"]: "+l+`
`+d+`
`+x})}function mm(a,l,d,p,w,b,x){a.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+w+"]: "+l+`
`+d+`
`+b+" "+x})}function wn(a,l,d,p){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+_m(a,d)+(p?" "+p:"")})}function gm(a,l){a.info(function(){return"TIMEOUT: "+l})}Tr.prototype.info=function(){};function _m(a,l){if(!a.g)return l;if(!l)return null;try{var d=JSON.parse(l);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var p=d[a];if(!(2>p.length)){var w=p[1];if(Array.isArray(w)&&!(1>w.length)){var b=w[0];if(b!="noop"&&b!="stop"&&b!="close")for(var x=1;x<w.length;x++)w[x]=""}}}}return Ao(d)}catch{return l}}var Oi={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},ou={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Po;function xi(){}D(xi,Ro),xi.prototype.g=function(){return new XMLHttpRequest},xi.prototype.i=function(){return{}},Po=new xi;function Rt(a,l,d,p){this.j=a,this.i=l,this.l=d,this.R=p||1,this.U=new yr(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new au}function au(){this.i=null,this.g="",this.h=!1}var cu={},Co={};function Do(a,l,d){a.L=1,a.v=Ui(st(l)),a.m=d,a.P=!0,uu(a,null)}function uu(a,l){a.F=Date.now(),Li(a),a.A=st(a.v);var d=a.A,p=a.R;Array.isArray(p)||(p=[String(p)]),wu(d.i,"t",p),a.C=0,d=a.j.J,a.h=new au,a.g=qu(a.j,d?l:null,!a.m),0<a.O&&(a.M=new hm(I(a.Y,a,a.g),a.O)),l=a.U,d=a.g,p=a.ca;var w="readystatechange";Array.isArray(w)||(w&&(Xc[0]=w.toString()),w=Xc);for(var b=0;b<w.length;b++){var x=$c(d,w[b],p||l.handleEvent,!1,l.h||l);if(!x)break;l.g[x.key]=x}l=a.H?g(a.H):{},a.m?(a.u||(a.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,l)):(a.u="GET",a.g.ea(a.A,a.u,null,l)),vr(),pm(a.i,a.u,a.A,a.l,a.R,a.m)}Rt.prototype.ca=function(a){a=a.target;const l=this.M;l&&ot(a)==3?l.j():this.Y(a)},Rt.prototype.Y=function(a){try{if(a==this.g)e:{const Ce=ot(this.g);var l=this.g.Ba();const Sn=this.g.Z();if(!(3>Ce)&&(Ce!=3||this.g&&(this.h.h||this.g.oa()||Du(this.g)))){this.J||Ce!=4||l==7||(l==8||0>=Sn?vr(3):vr(2)),Vo(this);var d=this.g.Z();this.X=d;t:if(lu(this)){var p=Du(this.g);a="";var w=p.length,b=ot(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Qt(this),wr(this);var x="";break t}this.h.i=new c.TextDecoder}for(l=0;l<w;l++)this.h.h=!0,a+=this.h.i.decode(p[l],{stream:!(b&&l==w-1)});p.length=0,this.h.g+=a,this.C=0,x=this.h.g}else x=this.g.oa();if(this.o=d==200,mm(this.i,this.u,this.A,this.l,this.R,Ce,d),this.o){if(this.T&&!this.K){t:{if(this.g){var re,Ae=this.g;if((re=Ae.g?Ae.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!G(re)){var X=re;break t}}X=null}if(d=X)wn(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,No(this,d);else{this.o=!1,this.s=3,xe(12),Qt(this),wr(this);break e}}if(this.P){d=!0;let Je;for(;!this.J&&this.C<x.length;)if(Je=ym(this,x),Je==Co){Ce==4&&(this.s=4,xe(14),d=!1),wn(this.i,this.l,null,"[Incomplete Response]");break}else if(Je==cu){this.s=4,xe(15),wn(this.i,this.l,x,"[Invalid Chunk]"),d=!1;break}else wn(this.i,this.l,Je,null),No(this,Je);if(lu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ce!=4||x.length!=0||this.h.h||(this.s=1,xe(16),d=!1),this.o=this.o&&d,!d)wn(this.i,this.l,x,"[Invalid Chunked Response]"),Qt(this),wr(this);else if(0<x.length&&!this.W){this.W=!0;var Pe=this.j;Pe.g==this&&Pe.ba&&!Pe.M&&(Pe.j.info("Great, no buffering proxy detected. Bytes received: "+x.length),Fo(Pe),Pe.M=!0,xe(11))}}else wn(this.i,this.l,x,null),No(this,x);Ce==4&&Qt(this),this.o&&!this.J&&(Ce==4?Mu(this.j,this):(this.o=!1,Li(this)))}else xm(this.g),d==400&&0<x.indexOf("Unknown SID")?(this.s=3,xe(12)):(this.s=0,xe(13)),Qt(this),wr(this)}}}catch{}finally{}};function lu(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function ym(a,l){var d=a.C,p=l.indexOf(`
`,d);return p==-1?Co:(d=Number(l.substring(d,p)),isNaN(d)?cu:(p+=1,p+d>l.length?Co:(l=l.slice(p,p+d),a.C=p+d,l)))}Rt.prototype.cancel=function(){this.J=!0,Qt(this)};function Li(a){a.S=Date.now()+a.I,hu(a,a.I)}function hu(a,l){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Er(I(a.ba,a),l)}function Vo(a){a.B&&(c.clearTimeout(a.B),a.B=null)}Rt.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(gm(this.i,this.A),this.L!=2&&(vr(),xe(17)),Qt(this),this.s=2,wr(this)):hu(this,this.S-a)};function wr(a){a.j.G==0||a.J||Mu(a.j,a)}function Qt(a){Vo(a);var l=a.M;l&&typeof l.ma=="function"&&l.ma(),a.M=null,Zc(a.U),a.g&&(l=a.g,a.g=null,l.abort(),l.ma())}function No(a,l){try{var d=a.j;if(d.G!=0&&(d.g==a||ko(d.h,a))){if(!a.K&&ko(d.h,a)&&d.G==3){try{var p=d.Da.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var w=p;if(w[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)Ki(d),Gi(d);else break e;Mo(d),xe(18)}}else d.za=w[1],0<d.za-d.T&&37500>w[2]&&d.F&&d.v==0&&!d.C&&(d.C=Er(I(d.Za,d),6e3));if(1>=pu(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Yt(d,11)}else if((a.K||d.g==a)&&Ki(d),!G(l))for(w=d.Da.g.parse(l),l=0;l<w.length;l++){let X=w[l];if(d.T=X[0],X=X[1],d.G==2)if(X[0]=="c"){d.K=X[1],d.ia=X[2];const Pe=X[3];Pe!=null&&(d.la=Pe,d.j.info("VER="+d.la));const Ce=X[4];Ce!=null&&(d.Aa=Ce,d.j.info("SVER="+d.Aa));const Sn=X[5];Sn!=null&&typeof Sn=="number"&&0<Sn&&(p=1.5*Sn,d.L=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const Je=a.g;if(Je){const Wi=Je.g?Je.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Wi){var b=p.h;b.g||Wi.indexOf("spdy")==-1&&Wi.indexOf("quic")==-1&&Wi.indexOf("h2")==-1||(b.j=b.l,b.g=new Set,b.h&&(Oo(b,b.h),b.h=null))}if(p.D){const Uo=Je.g?Je.g.getResponseHeader("X-HTTP-Session-Id"):null;Uo&&(p.ya=Uo,se(p.I,p.D,Uo))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),p=d;var x=a;if(p.qa=Bu(p,p.J?p.ia:null,p.W),x.K){mu(p.h,x);var re=x,Ae=p.L;Ae&&(re.I=Ae),re.B&&(Vo(re),Li(re)),p.g=x}else xu(p);0<d.i.length&&zi(d)}else X[0]!="stop"&&X[0]!="close"||Yt(d,7);else d.G==3&&(X[0]=="stop"||X[0]=="close"?X[0]=="stop"?Yt(d,7):Lo(d):X[0]!="noop"&&d.l&&d.l.ta(X),d.v=0)}}vr(4)}catch{}}var Im=class{constructor(a,l){this.g=a,this.map=l}};function du(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function fu(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function pu(a){return a.h?1:a.g?a.g.size:0}function ko(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function Oo(a,l){a.g?a.g.add(l):a.h=l}function mu(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}du.prototype.cancel=function(){if(this.i=gu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function gu(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let l=a.i;for(const d of a.g.values())l=l.concat(d.D);return l}return O(a.i)}function vm(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var l=[],d=a.length,p=0;p<d;p++)l.push(a[p]);return l}l=[],d=0;for(p in a)l[d++]=a[p];return l}function Em(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(u(a)||typeof a=="string"){var l=[];a=a.length;for(var d=0;d<a;d++)l.push(d);return l}l=[],d=0;for(const p in a)l[d++]=p;return l}}}function _u(a,l){if(a.forEach&&typeof a.forEach=="function")a.forEach(l,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,l,void 0);else for(var d=Em(a),p=vm(a),w=p.length,b=0;b<w;b++)l.call(void 0,p[b],d&&d[b],a)}var yu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Tm(a,l){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var p=a[d].indexOf("="),w=null;if(0<=p){var b=a[d].substring(0,p);w=a[d].substring(p+1)}else b=a[d];l(b,w?decodeURIComponent(w.replace(/\+/g," ")):"")}}}function Jt(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof Jt){this.h=a.h,Mi(this,a.j),this.o=a.o,this.g=a.g,Fi(this,a.s),this.l=a.l;var l=a.i,d=new Sr;d.i=l.i,l.g&&(d.g=new Map(l.g),d.h=l.h),Iu(this,d),this.m=a.m}else a&&(l=String(a).match(yu))?(this.h=!1,Mi(this,l[1]||"",!0),this.o=Ar(l[2]||""),this.g=Ar(l[3]||"",!0),Fi(this,l[4]),this.l=Ar(l[5]||"",!0),Iu(this,l[6]||"",!0),this.m=Ar(l[7]||"")):(this.h=!1,this.i=new Sr(null,this.h))}Jt.prototype.toString=function(){var a=[],l=this.j;l&&a.push(Rr(l,vu,!0),":");var d=this.g;return(d||l=="file")&&(a.push("//"),(l=this.o)&&a.push(Rr(l,vu,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(Rr(d,d.charAt(0)=="/"?Rm:Am,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",Rr(d,bm)),a.join("")};function st(a){return new Jt(a)}function Mi(a,l,d){a.j=d?Ar(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function Fi(a,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);a.s=l}else a.s=null}function Iu(a,l,d){l instanceof Sr?(a.i=l,Pm(a.i,a.h)):(d||(l=Rr(l,Sm)),a.i=new Sr(l,a.h))}function se(a,l,d){a.i.set(l,d)}function Ui(a){return se(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Ar(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Rr(a,l,d){return typeof a=="string"?(a=encodeURI(a).replace(l,wm),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function wm(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var vu=/[#\/\?@]/g,Am=/[#\?:]/g,Rm=/[#\?]/g,Sm=/[#\?@]/g,bm=/#/g;function Sr(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function St(a){a.g||(a.g=new Map,a.h=0,a.i&&Tm(a.i,function(l,d){a.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}r=Sr.prototype,r.add=function(a,l){St(this),this.i=null,a=An(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(l),this.h+=1,this};function Eu(a,l){St(a),l=An(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function Tu(a,l){return St(a),l=An(a,l),a.g.has(l)}r.forEach=function(a,l){St(this),this.g.forEach(function(d,p){d.forEach(function(w){a.call(l,w,p,this)},this)},this)},r.na=function(){St(this);const a=Array.from(this.g.values()),l=Array.from(this.g.keys()),d=[];for(let p=0;p<l.length;p++){const w=a[p];for(let b=0;b<w.length;b++)d.push(l[p])}return d},r.V=function(a){St(this);let l=[];if(typeof a=="string")Tu(this,a)&&(l=l.concat(this.g.get(An(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)l=l.concat(a[d])}return l},r.set=function(a,l){return St(this),this.i=null,a=An(this,a),Tu(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},r.get=function(a,l){return a?(a=this.V(a),0<a.length?String(a[0]):l):l};function wu(a,l,d){Eu(a,l),0<d.length&&(a.i=null,a.g.set(An(a,l),O(d)),a.h+=d.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],l=Array.from(this.g.keys());for(var d=0;d<l.length;d++){var p=l[d];const b=encodeURIComponent(String(p)),x=this.V(p);for(p=0;p<x.length;p++){var w=b;x[p]!==""&&(w+="="+encodeURIComponent(String(x[p]))),a.push(w)}}return this.i=a.join("&")};function An(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function Pm(a,l){l&&!a.j&&(St(a),a.i=null,a.g.forEach(function(d,p){var w=p.toLowerCase();p!=w&&(Eu(this,p),wu(this,w,d))},a)),a.j=l}function Cm(a,l){const d=new Tr;if(c.Image){const p=new Image;p.onload=S(bt,d,"TestLoadImage: loaded",!0,l,p),p.onerror=S(bt,d,"TestLoadImage: error",!1,l,p),p.onabort=S(bt,d,"TestLoadImage: abort",!1,l,p),p.ontimeout=S(bt,d,"TestLoadImage: timeout",!1,l,p),c.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=a}else l(!1)}function Dm(a,l){const d=new Tr,p=new AbortController,w=setTimeout(()=>{p.abort(),bt(d,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:p.signal}).then(b=>{clearTimeout(w),b.ok?bt(d,"TestPingServer: ok",!0,l):bt(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(w),bt(d,"TestPingServer: error",!1,l)})}function bt(a,l,d,p,w){try{w&&(w.onload=null,w.onerror=null,w.onabort=null,w.ontimeout=null),p(d)}catch{}}function Vm(){this.g=new fm}function Nm(a,l,d){const p=d||"";try{_u(a,function(w,b){let x=w;h(w)&&(x=Ao(w)),l.push(p+b+"="+encodeURIComponent(x))})}catch(w){throw l.push(p+"type="+encodeURIComponent("_badmap")),w}}function Bi(a){this.l=a.Ub||null,this.j=a.eb||!1}D(Bi,Ro),Bi.prototype.g=function(){return new qi(this.l,this.j)},Bi.prototype.i=function(a){return function(){return a}}({});function qi(a,l){be.call(this),this.D=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}D(qi,be),r=qi.prototype,r.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=l,this.readyState=1,Pr(this)},r.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(l.body=a),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,br(this)),this.readyState=0},r.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Pr(this)),this.g&&(this.readyState=3,Pr(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Au(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Au(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}r.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?br(this):Pr(this),this.readyState==3&&Au(this)}},r.Ra=function(a){this.g&&(this.response=this.responseText=a,br(this))},r.Qa=function(a){this.g&&(this.response=a,br(this))},r.ga=function(){this.g&&br(this)};function br(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Pr(a)}r.setRequestHeader=function(a,l){this.u.append(a,l)},r.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=l.next();return a.join(`\r
`)};function Pr(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(qi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Ru(a){let l="";return W(a,function(d,p){l+=p,l+=":",l+=d,l+=`\r
`}),l}function xo(a,l,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=Ru(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):se(a,l,d))}function he(a){be.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}D(he,be);var km=/^https?$/i,Om=["POST","PUT"];r=he.prototype,r.Ha=function(a){this.J=a},r.ea=function(a,l,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Po.g(),this.v=this.o?eu(this.o):eu(Po),this.g.onreadystatechange=I(this.Ea,this);try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(b){Su(this,b);return}if(a=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var w in p)d.set(w,p[w]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const b of p.keys())d.set(b,p.get(b));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(b=>b.toLowerCase()=="content-type"),w=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Om,l,void 0))||p||w||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[b,x]of d)this.g.setRequestHeader(b,x);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Cu(this),this.u=!0,this.g.send(a),this.u=!1}catch(b){Su(this,b)}};function Su(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.m=5,bu(a),ji(a)}function bu(a){a.A||(a.A=!0,Oe(a,"complete"),Oe(a,"error"))}r.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Oe(this,"complete"),Oe(this,"abort"),ji(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ji(this,!0)),he.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?Pu(this):this.bb())},r.bb=function(){Pu(this)};function Pu(a){if(a.h&&typeof o<"u"&&(!a.v[1]||ot(a)!=4||a.Z()!=2)){if(a.u&&ot(a)==4)Jc(a.Ea,0,a);else if(Oe(a,"readystatechange"),ot(a)==4){a.h=!1;try{const x=a.Z();e:switch(x){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var p;if(p=x===0){var w=String(a.D).match(yu)[1]||null;!w&&c.self&&c.self.location&&(w=c.self.location.protocol.slice(0,-1)),p=!km.test(w?w.toLowerCase():"")}d=p}if(d)Oe(a,"complete"),Oe(a,"success");else{a.m=6;try{var b=2<ot(a)?a.g.statusText:""}catch{b=""}a.l=b+" ["+a.Z()+"]",bu(a)}}finally{ji(a)}}}}function ji(a,l){if(a.g){Cu(a);const d=a.g,p=a.v[0]?()=>{}:null;a.g=null,a.v=null,l||Oe(a,"ready");try{d.onreadystatechange=p}catch{}}}function Cu(a){a.I&&(c.clearTimeout(a.I),a.I=null)}r.isActive=function(){return!!this.g};function ot(a){return a.g?a.g.readyState:0}r.Z=function(){try{return 2<ot(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),dm(l)}};function Du(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function xm(a){const l={};a=(a.g&&2<=ot(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<a.length;p++){if(G(a[p]))continue;var d=T(a[p]);const w=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const b=l[w]||[];l[w]=b,b.push(d)}v(l,function(p){return p.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Cr(a,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||l}function Vu(a){this.Aa=0,this.i=[],this.j=new Tr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Cr("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Cr("baseRetryDelayMs",5e3,a),this.cb=Cr("retryDelaySeedMs",1e4,a),this.Wa=Cr("forwardChannelMaxRetries",2,a),this.wa=Cr("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new du(a&&a.concurrentRequestLimit),this.Da=new Vm,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=Vu.prototype,r.la=8,r.G=1,r.connect=function(a,l,d,p){xe(0),this.W=a,this.H=l||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.I=Bu(this,null,this.W),zi(this)};function Lo(a){if(Nu(a),a.G==3){var l=a.U++,d=st(a.I);if(se(d,"SID",a.K),se(d,"RID",l),se(d,"TYPE","terminate"),Dr(a,d),l=new Rt(a,a.j,l),l.L=2,l.v=Ui(st(d)),d=!1,c.navigator&&c.navigator.sendBeacon)try{d=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!d&&c.Image&&(new Image().src=l.v,d=!0),d||(l.g=qu(l.j,null),l.g.ea(l.v)),l.F=Date.now(),Li(l)}Uu(a)}function Gi(a){a.g&&(Fo(a),a.g.cancel(),a.g=null)}function Nu(a){Gi(a),a.u&&(c.clearTimeout(a.u),a.u=null),Ki(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function zi(a){if(!fu(a.h)&&!a.s){a.s=!0;var l=a.Ga;mr||Kc(),gr||(mr(),gr=!0),go.add(l,a),a.B=0}}function Lm(a,l){return pu(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=l.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Er(I(a.Ga,a,l),Fu(a,a.B)),a.B++,!0)}r.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const w=new Rt(this,this.j,a);let b=this.o;if(this.S&&(b?(b=g(b),E(b,this.S)):b=this.S),this.m!==null||this.O||(w.H=b,b=null),this.P)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,4096<l){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=Ou(this,w,l),d=st(this.I),se(d,"RID",a),se(d,"CVER",22),this.D&&se(d,"X-HTTP-Session-Id",this.D),Dr(this,d),b&&(this.O?l="headers="+encodeURIComponent(String(Ru(b)))+"&"+l:this.m&&xo(d,this.m,b)),Oo(this.h,w),this.Ua&&se(d,"TYPE","init"),this.P?(se(d,"$req",l),se(d,"SID","null"),w.T=!0,Do(w,d,null)):Do(w,d,l),this.G=2}}else this.G==3&&(a?ku(this,a):this.i.length==0||fu(this.h)||ku(this))};function ku(a,l){var d;l?d=l.l:d=a.U++;const p=st(a.I);se(p,"SID",a.K),se(p,"RID",d),se(p,"AID",a.T),Dr(a,p),a.m&&a.o&&xo(p,a.m,a.o),d=new Rt(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),l&&(a.i=l.D.concat(a.i)),l=Ou(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),Oo(a.h,d),Do(d,p,l)}function Dr(a,l){a.H&&W(a.H,function(d,p){se(l,p,d)}),a.l&&_u({},function(d,p){se(l,p,d)})}function Ou(a,l,d){d=Math.min(a.i.length,d);var p=a.l?I(a.l.Na,a.l,a):null;e:{var w=a.i;let b=-1;for(;;){const x=["count="+d];b==-1?0<d?(b=w[0].g,x.push("ofs="+b)):b=0:x.push("ofs="+b);let re=!0;for(let Ae=0;Ae<d;Ae++){let X=w[Ae].g;const Pe=w[Ae].map;if(X-=b,0>X)b=Math.max(0,w[Ae].g-100),re=!1;else try{Nm(Pe,x,"req"+X+"_")}catch{p&&p(Pe)}}if(re){p=x.join("&");break e}}}return a=a.i.splice(0,d),l.D=a,p}function xu(a){if(!a.g&&!a.u){a.Y=1;var l=a.Fa;mr||Kc(),gr||(mr(),gr=!0),go.add(l,a),a.v=0}}function Mo(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Er(I(a.Fa,a),Fu(a,a.v)),a.v++,!0)}r.Fa=function(){if(this.u=null,Lu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Er(I(this.ab,this),a)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,xe(10),Gi(this),Lu(this))};function Fo(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function Lu(a){a.g=new Rt(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var l=st(a.qa);se(l,"RID","rpc"),se(l,"SID",a.K),se(l,"AID",a.T),se(l,"CI",a.F?"0":"1"),!a.F&&a.ja&&se(l,"TO",a.ja),se(l,"TYPE","xmlhttp"),Dr(a,l),a.m&&a.o&&xo(l,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=Ui(st(l)),d.m=null,d.P=!0,uu(d,a)}r.Za=function(){this.C!=null&&(this.C=null,Gi(this),Mo(this),xe(19))};function Ki(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function Mu(a,l){var d=null;if(a.g==l){Ki(a),Fo(a),a.g=null;var p=2}else if(ko(a.h,l))d=l.D,mu(a.h,l),p=1;else return;if(a.G!=0){if(l.o)if(p==1){d=l.m?l.m.length:0,l=Date.now()-l.F;var w=a.B;p=ki(),Oe(p,new su(p,d)),zi(a)}else xu(a);else if(w=l.s,w==3||w==0&&0<l.X||!(p==1&&Lm(a,l)||p==2&&Mo(a)))switch(d&&0<d.length&&(l=a.h,l.i=l.i.concat(d)),w){case 1:Yt(a,5);break;case 4:Yt(a,10);break;case 3:Yt(a,6);break;default:Yt(a,2)}}}function Fu(a,l){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*l}function Yt(a,l){if(a.j.info("Error code "+l),l==2){var d=I(a.fb,a),p=a.Xa;const w=!p;p=new Jt(p||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Mi(p,"https"),Ui(p),w?Cm(p.toString(),d):Dm(p.toString(),d)}else xe(2);a.G=0,a.l&&a.l.sa(l),Uu(a),Nu(a)}r.fb=function(a){a?(this.j.info("Successfully pinged google.com"),xe(2)):(this.j.info("Failed to ping google.com"),xe(1))};function Uu(a){if(a.G=0,a.ka=[],a.l){const l=gu(a.h);(l.length!=0||a.i.length!=0)&&(N(a.ka,l),N(a.ka,a.i),a.h.i.length=0,O(a.i),a.i.length=0),a.l.ra()}}function Bu(a,l,d){var p=d instanceof Jt?st(d):new Jt(d);if(p.g!="")l&&(p.g=l+"."+p.g),Fi(p,p.s);else{var w=c.location;p=w.protocol,l=l?l+"."+w.hostname:w.hostname,w=+w.port;var b=new Jt(null);p&&Mi(b,p),l&&(b.g=l),w&&Fi(b,w),d&&(b.l=d),p=b}return d=a.D,l=a.ya,d&&l&&se(p,d,l),se(p,"VER",a.la),Dr(a,p),p}function qu(a,l,d){if(l&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Ca&&!a.pa?new he(new Bi({eb:d})):new he(a.pa),l.Ha(a.J),l}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function ju(){}r=ju.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function $i(){}$i.prototype.g=function(a,l){return new ze(a,l)};function ze(a,l){be.call(this),this.g=new Vu(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(a?a["X-WebChannel-Client-Profile"]=l.va:a={"X-WebChannel-Client-Profile":l.va}),this.g.S=a,(a=l&&l.Sb)&&!G(a)&&(this.g.m=a),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!G(l)&&(this.g.D=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new Rn(this)}D(ze,be),ze.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ze.prototype.close=function(){Lo(this.g)},ze.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=Ao(a),a=d);l.i.push(new Im(l.Ya++,a)),l.G==3&&zi(l)},ze.prototype.N=function(){this.g.l=null,delete this.j,Lo(this.g),delete this.g,ze.aa.N.call(this)};function Gu(a){So.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){e:{for(const d in l){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}D(Gu,So);function zu(){bo.call(this),this.status=1}D(zu,bo);function Rn(a){this.g=a}D(Rn,ju),Rn.prototype.ua=function(){Oe(this.g,"a")},Rn.prototype.ta=function(a){Oe(this.g,new Gu(a))},Rn.prototype.sa=function(a){Oe(this.g,new zu)},Rn.prototype.ra=function(){Oe(this.g,"b")},$i.prototype.createWebChannel=$i.prototype.g,ze.prototype.send=ze.prototype.o,ze.prototype.open=ze.prototype.m,ze.prototype.close=ze.prototype.close,Yd=function(){return new $i},Jd=function(){return ki()},Qd=Ht,la={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Oi.NO_ERROR=0,Oi.TIMEOUT=8,Oi.HTTP_ERROR=6,os=Oi,ou.COMPLETE="complete",Hd=ou,tu.EventType=Ir,Ir.OPEN="a",Ir.CLOSE="b",Ir.ERROR="c",Ir.MESSAGE="d",be.prototype.listen=be.prototype.K,Ur=tu,he.prototype.listenOnce=he.prototype.L,he.prototype.getLastError=he.prototype.Ka,he.prototype.getLastErrorCode=he.prototype.Ba,he.prototype.getStatus=he.prototype.Z,he.prototype.getResponseJson=he.prototype.Oa,he.prototype.getResponseText=he.prototype.oa,he.prototype.send=he.prototype.ea,he.prototype.setWithCredentials=he.prototype.Ha,Wd=he}).apply(typeof Ji<"u"?Ji:typeof self<"u"?self:typeof window<"u"?window:{});const El="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ve.UNAUTHENTICATED=new Ve(null),Ve.GOOGLE_CREDENTIALS=new Ve("google-credentials-uid"),Ve.FIRST_PARTY=new Ve("first-party-uid"),Ve.MOCK_USER=new Ve("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let cr="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hn=new Va("@firebase/firestore");function Vn(){return hn.logLevel}function C(r,...e){if(hn.logLevel<=H.DEBUG){const t=e.map(Za);hn.debug(`Firestore (${cr}): ${r}`,...t)}}function pe(r,...e){if(hn.logLevel<=H.ERROR){const t=e.map(Za);hn.error(`Firestore (${cr}): ${r}`,...t)}}function ri(r,...e){if(hn.logLevel<=H.WARN){const t=e.map(Za);hn.warn(`Firestore (${cr}): ${r}`,...t)}}function Za(r){if(typeof r=="string")return r;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(r="Unexpected state"){const e=`FIRESTORE (${cr}) INTERNAL ASSERTION FAILED: `+r;throw pe(e),new Error(e)}function U(r,e){r||M()}function F(r,e){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class V extends vt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $v{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Wv{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Ve.UNAUTHENTICATED))}shutdown(){}}class Hv{constructor(e){this.t=e,this.currentUser=Ve.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){U(this.o===void 0);let n=this.i;const i=u=>this.i!==n?(n=this.i,t(u)):Promise.resolve();let s=new He;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new He,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const u=s;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},c=u=>{C("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(C("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new He)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(n=>this.i!==e?(C("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(U(typeof n.accessToken=="string"),new $v(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return U(e===null||typeof e=="string"),new Ve(e)}}class Qv{constructor(e,t,n){this.l=e,this.h=t,this.P=n,this.type="FirstParty",this.user=Ve.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class Jv{constructor(e,t,n){this.l=e,this.h=t,this.P=n}getToken(){return Promise.resolve(new Qv(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(Ve.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Yv{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Xv{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){U(this.o===void 0);const n=s=>{s.error!=null&&C("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.R;return this.R=s.token,C("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>n(s))};const i=s=>{C("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):C("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(U(typeof t.token=="string"),this.R=t.token,new Yv(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zv(r){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<r;n++)t[n]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xd{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let n="";for(;n.length<20;){const i=Zv(40);for(let s=0;s<i.length;++s)n.length<20&&i[s]<t&&(n+=e.charAt(i[s]%e.length))}return n}}function z(r,e){return r<e?-1:r>e?1:0}function zn(r,e,t){return r.length===e.length&&r.every((n,i)=>t(n,e[i]))}function Zd(r){return r+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new V(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new V(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new V(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return le.fromMillis(Date.now())}static fromDate(e){return le.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor(1e6*(e-1e3*t));return new le(t,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?z(this.nanoseconds,e.nanoseconds):z(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B{constructor(e){this.timestamp=e}static fromTimestamp(e){return new B(e)}static min(){return new B(new le(0,0))}static max(){return new B(new le(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii{constructor(e,t,n){t===void 0?t=0:t>e.length&&M(),n===void 0?n=e.length-t:n>e.length-t&&M(),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return ii.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof ii?e.forEach(n=>{t.push(n)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let i=0;i<n;i++){const s=e.get(i),o=t.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class Z extends ii{construct(e,t,n){return new Z(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new V(P.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(i=>i.length>0))}return new Z(t)}static emptyPath(){return new Z([])}}const eE=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ue extends ii{construct(e,t,n){return new ue(e,t,n)}static isValidIdentifier(e){return eE.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ue.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new ue(["__name__"])}static fromServerFormat(e){const t=[];let n="",i=0;const s=()=>{if(n.length===0)throw new V(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let o=!1;for(;i<e.length;){const c=e[i];if(c==="\\"){if(i+1===e.length)throw new V(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new V(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=u,i+=2}else c==="`"?(o=!o,i++):c!=="."||o?(n+=c,i++):(s(),i++)}if(s(),o)throw new V(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ue(t)}static emptyPath(){return new ue([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e){this.path=e}static fromPath(e){return new L(Z.fromString(e))}static fromName(e){return new L(Z.fromString(e).popFirst(5))}static empty(){return new L(Z.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Z.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Z.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new L(new Z(e.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Es{constructor(e,t,n,i){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=i}}function ha(r){return r.fields.find(e=>e.kind===2)}function en(r){return r.fields.filter(e=>e.kind!==2)}Es.UNKNOWN_ID=-1;class as{constructor(e,t){this.fieldPath=e,this.kind=t}}class si{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new si(0,We.min())}}function ef(r,e){const t=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,i=B.fromTimestamp(n===1e9?new le(t+1,0):new le(t,n));return new We(i,L.empty(),e)}function tf(r){return new We(r.readTime,r.key,-1)}class We{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new We(B.min(),L.empty(),-1)}static max(){return new We(B.max(),L.empty(),-1)}}function ec(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=L.comparator(r.documentKey,e.documentKey),t!==0?t:z(r.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nf="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class rf{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zt(r){if(r.code!==P.FAILED_PRECONDITION||r.message!==nf)throw r;C("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&M(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new A((n,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(n,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(n,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof A?t:A.resolve(t)}catch(t){return A.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):A.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):A.reject(t)}static resolve(e){return new A((t,n)=>{t(e)})}static reject(e){return new A((t,n)=>{n(e)})}static waitFor(e){return new A((t,n)=>{let i=0,s=0,o=!1;e.forEach(c=>{++i,c.next(()=>{++s,o&&s===i&&t()},u=>n(u))}),o=!0,s===i&&t()})}static or(e){let t=A.resolve(!1);for(const n of e)t=t.next(i=>i?A.resolve(i):n());return t}static forEach(e,t){const n=[];return e.forEach((i,s)=>{n.push(t.call(this,i,s))}),this.waitFor(n)}static mapArray(e,t){return new A((n,i)=>{const s=e.length,o=new Array(s);let c=0;for(let u=0;u<s;u++){const h=u;t(e[h]).next(f=>{o[h]=f,++c,c===s&&n(o)},f=>i(f))}})}static doWhile(e,t){return new A((n,i)=>{const s=()=>{e()===!0?t().next(()=>{s()},i):n()};s()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ws{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.V=new He,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{t.error?this.V.reject(new Kr(e,t.error)):this.V.resolve()},this.transaction.onerror=n=>{const i=tc(n.target.error);this.V.reject(new Kr(e,i))}}static open(e,t,n,i){try{return new Ws(t,e.transaction(i,n))}catch(s){throw new Kr(t,s)}}get m(){return this.V.promise}abort(e){e&&this.V.reject(e),this.aborted||(C("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new nE(t)}}class Mt{constructor(e,t,n){this.name=e,this.version=t,this.p=n,Mt.S(ve())===12.2&&pe("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return C("SimpleDb","Removing database:",e),tn(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!Lh())return!1;if(Mt.v())return!0;const e=ve(),t=Mt.S(e),n=0<t&&t<10,i=sf(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||s)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.C)==="YES"}static F(e,t){return e.store(t)}static S(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}async M(e){return this.db||(C("SimpleDb","Opening database:",this.name),this.db=await new Promise((t,n)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{const o=s.target.result;t(o)},i.onblocked=()=>{n(new Kr(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{const o=s.target.error;o.name==="VersionError"?n(new V(P.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?n(new V(P.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):n(new Kr(e,o))},i.onupgradeneeded=s=>{C("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);const o=s.target.result;this.p.O(o,i.transaction,s.oldVersion,this.version).next(()=>{C("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.N&&(this.db.onversionchange=t=>this.N(t)),this.db}L(e){this.N=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,i){const s=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.M(e);const c=Ws.open(this.db,e,s?"readonly":"readwrite",n),u=i(c).next(h=>(c.g(),h)).catch(h=>(c.abort(h),A.reject(h))).toPromise();return u.catch(()=>{}),await c.m,u}catch(c){const u=c,h=u.name!=="FirebaseError"&&o<3;if(C("SimpleDb","Transaction failed with error:",u.message,"Retrying:",h),this.close(),!h)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function sf(r){const e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class tE{constructor(e){this.B=e,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(e){this.B=e}done(){this.k=!0}$(e){this.q=e}delete(){return tn(this.B.delete())}}class Kr extends V{constructor(e,t){super(P.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Kt(r){return r.name==="IndexedDbTransactionError"}class nE{constructor(e){this.store=e}put(e,t){let n;return t!==void 0?(C("SimpleDb","PUT",this.store.name,e,t),n=this.store.put(t,e)):(C("SimpleDb","PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),tn(n)}add(e){return C("SimpleDb","ADD",this.store.name,e,e),tn(this.store.add(e))}get(e){return tn(this.store.get(e)).next(t=>(t===void 0&&(t=null),C("SimpleDb","GET",this.store.name,e,t),t))}delete(e){return C("SimpleDb","DELETE",this.store.name,e),tn(this.store.delete(e))}count(){return C("SimpleDb","COUNT",this.store.name),tn(this.store.count())}U(e,t){const n=this.options(e,t),i=n.index?this.store.index(n.index):this.store;if(typeof i.getAll=="function"){const s=i.getAll(n.range);return new A((o,c)=>{s.onerror=u=>{c(u.target.error)},s.onsuccess=u=>{o(u.target.result)}})}{const s=this.cursor(n),o=[];return this.W(s,(c,u)=>{o.push(u)}).next(()=>o)}}G(e,t){const n=this.store.getAll(e,t===null?void 0:t);return new A((i,s)=>{n.onerror=o=>{s(o.target.error)},n.onsuccess=o=>{i(o.target.result)}})}j(e,t){C("SimpleDb","DELETE ALL",this.store.name);const n=this.options(e,t);n.H=!1;const i=this.cursor(n);return this.W(i,(s,o,c)=>c.delete())}J(e,t){let n;t?n=e:(n={},t=e);const i=this.cursor(n);return this.W(i,t)}Y(e){const t=this.cursor({});return new A((n,i)=>{t.onerror=s=>{const o=tc(s.target.error);i(o)},t.onsuccess=s=>{const o=s.target.result;o?e(o.primaryKey,o.value).next(c=>{c?o.continue():n()}):n()}})}W(e,t){const n=[];return new A((i,s)=>{e.onerror=o=>{s(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void i();const u=new tE(c),h=t(c.primaryKey,c.value,u);if(h instanceof A){const f=h.catch(m=>(u.done(),A.reject(m)));n.push(f)}u.isDone?i():u.K===null?c.continue():c.continue(u.K)}}).next(()=>A.waitFor(n))}options(e,t){let n;return e!==void 0&&(typeof e=="string"?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.H?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function tn(r){return new A((e,t)=>{r.onsuccess=n=>{const i=n.target.result;e(i)},r.onerror=n=>{const i=tc(n.target.error);t(i)}})}let Tl=!1;function tc(r){const e=Mt.S(ve());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(t)>=0){const n=new V("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Tl||(Tl=!0,setTimeout(()=>{throw n},0)),n}}return r}class rE{constructor(e,t){this.asyncQueue=e,this.Z=t,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}X(e){C("IndexBackfiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{C("IndexBackfiller",`Documents written: ${await this.Z.ee()}`)}catch(t){Kt(t)?C("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",t):await zt(t)}await this.X(6e4)})}}class iE{constructor(e,t){this.localStore=e,this.persistence=t}async ee(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.te(t,e))}te(e,t){const n=new Set;let i=t,s=!0;return A.doWhile(()=>s===!0&&i>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!n.has(o))return C("IndexBackfiller",`Processing collection: ${o}`),this.ne(e,o,i).next(c=>{i-=c,n.add(o)});s=!1})).next(()=>t-i)}ne(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(i=>this.localStore.localDocuments.getNextDocuments(e,t,i,n).next(s=>{const o=s.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.re(i,s)).next(c=>(C("IndexBackfiller",`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c))).next(()=>o.size)}))}re(e,t){let n=e;return t.changes.forEach((i,s)=>{const o=tf(s);ec(o,n)>0&&(n=o)}),new We(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.ie(n),this.se=n=>t.writeSequenceNumber(n))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}qe.oe=-1;function Hs(r){return r==null}function oi(r){return r===0&&1/r==-1/0}function of(r){return typeof r=="number"&&Number.isInteger(r)&&!oi(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Me(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=wl(e)),e=sE(r.get(t),e);return wl(e)}function sE(r,e){let t=e;const n=r.length;for(let i=0;i<n;i++){const s=r.charAt(i);switch(s){case"\0":t+="";break;case"":t+="";break;default:t+=s}}return t}function wl(r){return r+""}function Xe(r){const e=r.length;if(U(e>=2),e===2)return U(r.charAt(0)===""&&r.charAt(1)===""),Z.emptyPath();const t=e-2,n=[];let i="";for(let s=0;s<e;){const o=r.indexOf("",s);switch((o<0||o>t)&&M(),r.charAt(o+1)){case"":const c=r.substring(s,o);let u;i.length===0?u=c:(i+=c,u=i,i=""),n.push(u);break;case"":i+=r.substring(s,o),i+="\0";break;case"":i+=r.substring(s,o+1);break;default:M()}s=o+2}return new Z(n)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Al=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cs(r,e){return[r,Me(e)]}function af(r,e,t){return[r,Me(e),t]}const oE={},aE=["prefixPath","collectionGroup","readTime","documentId"],cE=["prefixPath","collectionGroup","documentId"],uE=["collectionGroup","readTime","prefixPath","documentId"],lE=["canonicalId","targetId"],hE=["targetId","path"],dE=["path","targetId"],fE=["collectionId","parent"],pE=["indexId","uid"],mE=["uid","sequenceNumber"],gE=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],_E=["indexId","uid","orderedDocumentKey"],yE=["userId","collectionPath","documentId"],IE=["userId","collectionPath","largestBatchId"],vE=["userId","collectionGroup","largestBatchId"],cf=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],EE=[...cf,"documentOverlays"],uf=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],lf=uf,nc=[...lf,"indexConfiguration","indexState","indexEntries"],TE=nc,wE=[...nc,"globals"];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class da extends rf{constructor(e,t){super(),this._e=e,this.currentSequenceNumber=t}}function Ee(r,e){const t=F(r);return Mt.F(t._e,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rl(r){let e=0;for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function vn(r,e){for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function hf(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{constructor(e,t){this.comparator=e,this.root=t||Re.EMPTY}insert(e,t){return new ie(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Re.BLACK,null,null))}remove(e){return new ie(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Re.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const i=this.comparator(e,n.key);if(i===0)return t+n.left.size;i<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Yi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Yi(this.root,e,this.comparator,!1)}getReverseIterator(){return new Yi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Yi(this.root,e,this.comparator,!0)}}class Yi{constructor(e,t,n,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?n(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Re{constructor(e,t,n,i,s){this.key=e,this.value=t,this.color=n??Re.RED,this.left=i??Re.EMPTY,this.right=s??Re.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,i,s){return new Re(e??this.key,t??this.value,n??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let i=this;const s=n(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,n),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,n)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Re.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return Re.EMPTY;n=i.right.min(),i=i.copy(n.key,n.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Re.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Re.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw M();const e=this.left.check();if(e!==this.right.check())throw M();return e+(this.isRed()?0:1)}}Re.EMPTY=null,Re.RED=!0,Re.BLACK=!1;Re.EMPTY=new class{constructor(){this.size=0}get key(){throw M()}get value(){throw M()}get color(){throw M()}get left(){throw M()}get right(){throw M()}copy(e,t,n,i,s){return this}insert(e,t,n){return new Re(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ne{constructor(e){this.comparator=e,this.data=new ie(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const i=n.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Sl(this.data.getIterator())}getIteratorFrom(e){return new Sl(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(n=>{t=t.add(n)}),t}isEqual(e){if(!(e instanceof ne)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=n.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ne(this.comparator);return t.data=e,t}}class Sl{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function bn(r){return r.hasNext()?r.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(e){this.fields=e,e.sort(ue.comparator)}static empty(){return new je([])}unionWith(e){let t=new ne(ue.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new je(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return zn(this.fields,e.fields,(t,n)=>t.isEqual(n))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class df extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new df("Invalid base64 string: "+s):s}}(e);return new ge(t)}static fromUint8Array(e){const t=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new ge(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const n=new Uint8Array(t.length);for(let i=0;i<t.length;i++)n[i]=t.charCodeAt(i);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return z(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ge.EMPTY_BYTE_STRING=new ge("");const AE=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function It(r){if(U(!!r),typeof r=="string"){let e=0;const t=AE.exec(r);if(U(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:ce(r.seconds),nanos:ce(r.nanos)}}function ce(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function Ut(r){return typeof r=="string"?ge.fromBase64String(r):ge.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qs(r){var e,t;return((t=(((e=r==null?void 0:r.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function rc(r){const e=r.mapValue.fields.__previous_value__;return Qs(e)?rc(e):e}function ai(r){const e=It(r.mapValue.fields.__local_write_time__.timestampValue);return new le(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RE{constructor(e,t,n,i,s,o,c,u,h){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=h}}class dn{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new dn("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof dn&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nt={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},us={nullValue:"NULL_VALUE"};function fn(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Qs(r)?4:ff(r)?9007199254740991:Js(r)?10:11:M()}function tt(r,e){if(r===e)return!0;const t=fn(r);if(t!==fn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return ai(r).isEqual(ai(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=It(i.timestampValue),c=It(s.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(r,e);case 5:return r.stringValue===e.stringValue;case 6:return function(i,s){return Ut(i.bytesValue).isEqual(Ut(s.bytesValue))}(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return function(i,s){return ce(i.geoPointValue.latitude)===ce(s.geoPointValue.latitude)&&ce(i.geoPointValue.longitude)===ce(s.geoPointValue.longitude)}(r,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return ce(i.integerValue)===ce(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=ce(i.doubleValue),c=ce(s.doubleValue);return o===c?oi(o)===oi(c):isNaN(o)&&isNaN(c)}return!1}(r,e);case 9:return zn(r.arrayValue.values||[],e.arrayValue.values||[],tt);case 10:case 11:return function(i,s){const o=i.mapValue.fields||{},c=s.mapValue.fields||{};if(Rl(o)!==Rl(c))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!tt(o[u],c[u])))return!1;return!0}(r,e);default:return M()}}function ci(r,e){return(r.values||[]).find(t=>tt(t,e))!==void 0}function Bt(r,e){if(r===e)return 0;const t=fn(r),n=fn(e);if(t!==n)return z(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return z(r.booleanValue,e.booleanValue);case 2:return function(s,o){const c=ce(s.integerValue||s.doubleValue),u=ce(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(r,e);case 3:return bl(r.timestampValue,e.timestampValue);case 4:return bl(ai(r),ai(e));case 5:return z(r.stringValue,e.stringValue);case 6:return function(s,o){const c=Ut(s),u=Ut(o);return c.compareTo(u)}(r.bytesValue,e.bytesValue);case 7:return function(s,o){const c=s.split("/"),u=o.split("/");for(let h=0;h<c.length&&h<u.length;h++){const f=z(c[h],u[h]);if(f!==0)return f}return z(c.length,u.length)}(r.referenceValue,e.referenceValue);case 8:return function(s,o){const c=z(ce(s.latitude),ce(o.latitude));return c!==0?c:z(ce(s.longitude),ce(o.longitude))}(r.geoPointValue,e.geoPointValue);case 9:return Pl(r.arrayValue,e.arrayValue);case 10:return function(s,o){var c,u,h,f;const m=s.fields||{},I=o.fields||{},S=(c=m.value)===null||c===void 0?void 0:c.arrayValue,D=(u=I.value)===null||u===void 0?void 0:u.arrayValue,O=z(((h=S==null?void 0:S.values)===null||h===void 0?void 0:h.length)||0,((f=D==null?void 0:D.values)===null||f===void 0?void 0:f.length)||0);return O!==0?O:Pl(S,D)}(r.mapValue,e.mapValue);case 11:return function(s,o){if(s===Nt.mapValue&&o===Nt.mapValue)return 0;if(s===Nt.mapValue)return 1;if(o===Nt.mapValue)return-1;const c=s.fields||{},u=Object.keys(c),h=o.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let m=0;m<u.length&&m<f.length;++m){const I=z(u[m],f[m]);if(I!==0)return I;const S=Bt(c[u[m]],h[f[m]]);if(S!==0)return S}return z(u.length,f.length)}(r.mapValue,e.mapValue);default:throw M()}}function bl(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return z(r,e);const t=It(r),n=It(e),i=z(t.seconds,n.seconds);return i!==0?i:z(t.nanos,n.nanos)}function Pl(r,e){const t=r.values||[],n=e.values||[];for(let i=0;i<t.length&&i<n.length;++i){const s=Bt(t[i],n[i]);if(s)return s}return z(t.length,n.length)}function Kn(r){return fa(r)}function fa(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(t){const n=It(t);return`time(${n.seconds},${n.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(t){return Ut(t).toBase64()}(r.bytesValue):"referenceValue"in r?function(t){return L.fromName(t).toString()}(r.referenceValue):"geoPointValue"in r?function(t){return`geo(${t.latitude},${t.longitude})`}(r.geoPointValue):"arrayValue"in r?function(t){let n="[",i=!0;for(const s of t.values||[])i?i=!1:n+=",",n+=fa(s);return n+"]"}(r.arrayValue):"mapValue"in r?function(t){const n=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const o of n)s?s=!1:i+=",",i+=`${o}:${fa(t.fields[o])}`;return i+"}"}(r.mapValue):M()}function pn(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function pa(r){return!!r&&"integerValue"in r}function ui(r){return!!r&&"arrayValue"in r}function Cl(r){return!!r&&"nullValue"in r}function Dl(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function ls(r){return!!r&&"mapValue"in r}function Js(r){var e,t;return((t=(((e=r==null?void 0:r.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function $r(r){if(r.geoPointValue)return{geoPointValue:Object.assign({},r.geoPointValue)};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:Object.assign({},r.timestampValue)};if(r.mapValue){const e={mapValue:{fields:{}}};return vn(r.mapValue.fields,(t,n)=>e.mapValue.fields[t]=$r(n)),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=$r(r.arrayValue.values[t]);return e}return Object.assign({},r)}function ff(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}const pf={mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{}}}}};function SE(r){return"nullValue"in r?us:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?pn(dn.empty(),L.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?Js(r)?pf:{mapValue:{}}:M()}function bE(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?pn(dn.empty(),L.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?pf:"mapValue"in r?Js(r)?{mapValue:{}}:Nt:M()}function Vl(r,e){const t=Bt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?-1:!r.inclusive&&e.inclusive?1:0}function Nl(r,e){const t=Bt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?1:!r.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne{constructor(e){this.value=e}static empty(){return new Ne({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!ls(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=$r(t)}setAll(e){let t=ue.emptyPath(),n={},i=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,n,i),n={},i=[],t=c.popLast()}o?n[c.lastSegment()]=$r(o):i.push(c.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,n,i)}delete(e){const t=this.field(e.popLast());ls(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return tt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let i=t.mapValue.fields[e.get(n)];ls(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,n){vn(t,(i,s)=>e[i]=s);for(const i of n)delete e[i]}clone(){return new Ne($r(this.value))}}function mf(r){const e=[];return vn(r.fields,(t,n)=>{const i=new ue([t]);if(ls(n)){const s=mf(n.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new je(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(e,t,n,i,s,o,c){this.key=e,this.documentType=t,this.version=n,this.readTime=i,this.createTime=s,this.data=o,this.documentState=c}static newInvalidDocument(e){return new de(e,0,B.min(),B.min(),B.min(),Ne.empty(),0)}static newFoundDocument(e,t,n,i){return new de(e,1,t,B.min(),n,i,0)}static newNoDocument(e,t){return new de(e,2,t,B.min(),B.min(),Ne.empty(),0)}static newUnknownDocument(e,t){return new de(e,3,t,B.min(),B.min(),Ne.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(B.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ne.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ne.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=B.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof de&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new de(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(e,t){this.position=e,this.inclusive=t}}function kl(r,e,t){let n=0;for(let i=0;i<r.position.length;i++){const s=e[i],o=r.position[i];if(s.field.isKeyField()?n=L.comparator(L.fromName(o.referenceValue),t.key):n=Bt(o,t.data.field(s.field)),s.dir==="desc"&&(n*=-1),n!==0)break}return n}function Ol(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!tt(r.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class li{constructor(e,t="asc"){this.field=e,this.dir=t}}function PE(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gf{}class Q extends gf{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new CE(e,t,n):t==="array-contains"?new NE(e,n):t==="in"?new Tf(e,n):t==="not-in"?new kE(e,n):t==="array-contains-any"?new OE(e,n):new Q(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new DE(e,n):new VE(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Bt(t,this.value)):t!==null&&fn(this.value)===fn(t)&&this.matchesComparison(Bt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return M()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class te extends gf{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new te(e,t)}matches(e){return $n(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function $n(r){return r.op==="and"}function ma(r){return r.op==="or"}function ic(r){return _f(r)&&$n(r)}function _f(r){for(const e of r.filters)if(e instanceof te)return!1;return!0}function ga(r){if(r instanceof Q)return r.field.canonicalString()+r.op.toString()+Kn(r.value);if(ic(r))return r.filters.map(e=>ga(e)).join(",");{const e=r.filters.map(t=>ga(t)).join(",");return`${r.op}(${e})`}}function yf(r,e){return r instanceof Q?function(n,i){return i instanceof Q&&n.op===i.op&&n.field.isEqual(i.field)&&tt(n.value,i.value)}(r,e):r instanceof te?function(n,i){return i instanceof te&&n.op===i.op&&n.filters.length===i.filters.length?n.filters.reduce((s,o,c)=>s&&yf(o,i.filters[c]),!0):!1}(r,e):void M()}function If(r,e){const t=r.filters.concat(e);return te.create(t,r.op)}function vf(r){return r instanceof Q?function(t){return`${t.field.canonicalString()} ${t.op} ${Kn(t.value)}`}(r):r instanceof te?function(t){return t.op.toString()+" {"+t.getFilters().map(vf).join(" ,")+"}"}(r):"Filter"}class CE extends Q{constructor(e,t,n){super(e,t,n),this.key=L.fromName(n.referenceValue)}matches(e){const t=L.comparator(e.key,this.key);return this.matchesComparison(t)}}class DE extends Q{constructor(e,t){super(e,"in",t),this.keys=Ef("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class VE extends Q{constructor(e,t){super(e,"not-in",t),this.keys=Ef("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Ef(r,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(n=>L.fromName(n.referenceValue))}class NE extends Q{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return ui(t)&&ci(t.arrayValue,this.value)}}class Tf extends Q{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&ci(this.value.arrayValue,t)}}class kE extends Q{constructor(e,t){super(e,"not-in",t)}matches(e){if(ci(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!ci(this.value.arrayValue,t)}}class OE extends Q{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!ui(t)||!t.arrayValue.values)&&t.arrayValue.values.some(n=>ci(this.value.arrayValue,n))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xE{constructor(e,t=null,n=[],i=[],s=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=i,this.limit=s,this.startAt=o,this.endAt=c,this.ue=null}}function _a(r,e=null,t=[],n=[],i=null,s=null,o=null){return new xE(r,e,t,n,i,s,o)}function mn(r){const e=F(r);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(n=>ga(n)).join(","),t+="|ob:",t+=e.orderBy.map(n=>function(s){return s.field.canonicalString()+s.dir}(n)).join(","),Hs(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(n=>Kn(n)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(n=>Kn(n)).join(",")),e.ue=t}return e.ue}function Ii(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!PE(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!yf(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!Ol(r.startAt,e.startAt)&&Ol(r.endAt,e.endAt)}function Ts(r){return L.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function ws(r,e){return r.filters.filter(t=>t instanceof Q&&t.field.isEqual(e))}function xl(r,e,t){let n=us,i=!0;for(const s of ws(r,e)){let o=us,c=!0;switch(s.op){case"<":case"<=":o=SE(s.value);break;case"==":case"in":case">=":o=s.value;break;case">":o=s.value,c=!1;break;case"!=":case"not-in":o=us}Vl({value:n,inclusive:i},{value:o,inclusive:c})<0&&(n=o,i=c)}if(t!==null){for(let s=0;s<r.orderBy.length;++s)if(r.orderBy[s].field.isEqual(e)){const o=t.position[s];Vl({value:n,inclusive:i},{value:o,inclusive:t.inclusive})<0&&(n=o,i=t.inclusive);break}}return{value:n,inclusive:i}}function Ll(r,e,t){let n=Nt,i=!0;for(const s of ws(r,e)){let o=Nt,c=!0;switch(s.op){case">=":case">":o=bE(s.value),c=!1;break;case"==":case"in":case"<=":o=s.value;break;case"<":o=s.value,c=!1;break;case"!=":case"not-in":o=Nt}Nl({value:n,inclusive:i},{value:o,inclusive:c})>0&&(n=o,i=c)}if(t!==null){for(let s=0;s<r.orderBy.length;++s)if(r.orderBy[s].field.isEqual(e)){const o=t.position[s];Nl({value:n,inclusive:i},{value:o,inclusive:t.inclusive})>0&&(n=o,i=t.inclusive);break}}return{value:n,inclusive:i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En{constructor(e,t=null,n=[],i=[],s=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=i,this.limit=s,this.limitType=o,this.startAt=c,this.endAt=u,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function wf(r,e,t,n,i,s,o,c){return new En(r,e,t,n,i,s,o,c)}function Ys(r){return new En(r)}function Ml(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function sc(r){return r.collectionGroup!==null}function Bn(r){const e=F(r);if(e.ce===null){e.ce=[];const t=new Set;for(const s of e.explicitOrderBy)e.ce.push(s),t.add(s.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new ne(ue.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(h=>{h.isInequality()&&(c=c.add(h.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.ce.push(new li(s,n))}),t.has(ue.keyField().canonicalString())||e.ce.push(new li(ue.keyField(),n))}return e.ce}function $e(r){const e=F(r);return e.le||(e.le=LE(e,Bn(r))),e.le}function LE(r,e){if(r.limitType==="F")return _a(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new li(i.field,s)});const t=r.endAt?new qt(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new qt(r.startAt.position,r.startAt.inclusive):null;return _a(r.path,r.collectionGroup,e,r.filters,r.limit,t,n)}}function ya(r,e){const t=r.filters.concat([e]);return new En(r.path,r.collectionGroup,r.explicitOrderBy.slice(),t,r.limit,r.limitType,r.startAt,r.endAt)}function As(r,e,t){return new En(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function Xs(r,e){return Ii($e(r),$e(e))&&r.limitType===e.limitType}function Af(r){return`${mn($e(r))}|lt:${r.limitType}`}function Nn(r){return`Query(target=${function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map(i=>vf(i)).join(", ")}]`),Hs(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map(i=>Kn(i)).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map(i=>Kn(i)).join(",")),`Target(${n})`}($e(r))}; limitType=${r.limitType})`}function vi(r,e){return e.isFoundDocument()&&function(n,i){const s=i.key.path;return n.collectionGroup!==null?i.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(s):L.isDocumentKey(n.path)?n.path.isEqual(s):n.path.isImmediateParentOf(s)}(r,e)&&function(n,i){for(const s of Bn(n))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(r,e)&&function(n,i){for(const s of n.filters)if(!s.matches(i))return!1;return!0}(r,e)&&function(n,i){return!(n.startAt&&!function(o,c,u){const h=kl(o,c,u);return o.inclusive?h<=0:h<0}(n.startAt,Bn(n),i)||n.endAt&&!function(o,c,u){const h=kl(o,c,u);return o.inclusive?h>=0:h>0}(n.endAt,Bn(n),i))}(r,e)}function Rf(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Sf(r){return(e,t)=>{let n=!1;for(const i of Bn(r)){const s=ME(i,e,t);if(s!==0)return s;n=n||i.field.isKeyField()}return 0}}function ME(r,e,t){const n=r.field.isKeyField()?L.comparator(e.key,t.key):function(s,o,c){const u=o.data.field(s),h=c.data.field(s);return u!==null&&h!==null?Bt(u,h):M()}(r.field,e,t);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return M()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[i,s]of n)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),i=this.inner[n];if(i===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let i=0;i<n.length;i++)if(this.equalsFn(n[i][0],e))return n.length===1?delete this.inner[t]:n.splice(i,1),this.innerSize--,!0;return!1}forEach(e){vn(this.inner,(t,n)=>{for(const[i,s]of n)e(i,s)})}isEmpty(){return hf(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FE=new ie(L.comparator);function Ke(){return FE}const bf=new ie(L.comparator);function Br(...r){let e=bf;for(const t of r)e=e.insert(t.key,t);return e}function Pf(r){let e=bf;return r.forEach((t,n)=>e=e.insert(t,n.overlayedDocument)),e}function Ze(){return Wr()}function Cf(){return Wr()}function Wr(){return new $t(r=>r.toString(),(r,e)=>r.isEqual(e))}const UE=new ie(L.comparator),BE=new ne(L.comparator);function $(...r){let e=BE;for(const t of r)e=e.add(t);return e}const qE=new ne(z);function oc(){return qE}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ac(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:oi(e)?"-0":e}}function Df(r){return{integerValue:""+r}}function jE(r,e){return of(e)?Df(e):ac(r,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zs{constructor(){this._=void 0}}function GE(r,e,t){return r instanceof Wn?function(i,s){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Qs(s)&&(s=rc(s)),s&&(o.fields.__previous_value__=s),{mapValue:o}}(t,e):r instanceof Hn?Nf(r,e):r instanceof Qn?kf(r,e):function(i,s){const o=Vf(i,s),c=Fl(o)+Fl(i.Pe);return pa(o)&&pa(i.Pe)?Df(c):ac(i.serializer,c)}(r,e)}function zE(r,e,t){return r instanceof Hn?Nf(r,e):r instanceof Qn?kf(r,e):t}function Vf(r,e){return r instanceof hi?function(n){return pa(n)||function(s){return!!s&&"doubleValue"in s}(n)}(e)?e:{integerValue:0}:null}class Wn extends Zs{}class Hn extends Zs{constructor(e){super(),this.elements=e}}function Nf(r,e){const t=Of(e);for(const n of r.elements)t.some(i=>tt(i,n))||t.push(n);return{arrayValue:{values:t}}}class Qn extends Zs{constructor(e){super(),this.elements=e}}function kf(r,e){let t=Of(e);for(const n of r.elements)t=t.filter(i=>!tt(i,n));return{arrayValue:{values:t}}}class hi extends Zs{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function Fl(r){return ce(r.integerValue||r.doubleValue)}function Of(r){return ui(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xf{constructor(e,t){this.field=e,this.transform=t}}function KE(r,e){return r.field.isEqual(e.field)&&function(n,i){return n instanceof Hn&&i instanceof Hn||n instanceof Qn&&i instanceof Qn?zn(n.elements,i.elements,tt):n instanceof hi&&i instanceof hi?tt(n.Pe,i.Pe):n instanceof Wn&&i instanceof Wn}(r.transform,e.transform)}class $E{constructor(e,t){this.version=e,this.transformResults=t}}class Ie{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ie}static exists(e){return new Ie(void 0,e)}static updateTime(e){return new Ie(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function hs(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}class eo{}function Lf(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new Ei(r.key,Ie.none()):new ur(r.key,r.data,Ie.none());{const t=r.data,n=Ne.empty();let i=new ne(ue.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?n.delete(s):n.set(s,o),i=i.add(s)}return new wt(r.key,n,new je(i.toArray()),Ie.none())}}function WE(r,e,t){r instanceof ur?function(i,s,o){const c=i.value.clone(),u=Bl(i.fieldTransforms,s,o.transformResults);c.setAll(u),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(r,e,t):r instanceof wt?function(i,s,o){if(!hs(i.precondition,s))return void s.convertToUnknownDocument(o.version);const c=Bl(i.fieldTransforms,s,o.transformResults),u=s.data;u.setAll(Mf(i)),u.setAll(c),s.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(r,e,t):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function Hr(r,e,t,n){return r instanceof ur?function(s,o,c,u){if(!hs(s.precondition,o))return c;const h=s.value.clone(),f=ql(s.fieldTransforms,u,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(r,e,t,n):r instanceof wt?function(s,o,c,u){if(!hs(s.precondition,o))return c;const h=ql(s.fieldTransforms,u,o),f=o.data;return f.setAll(Mf(s)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(m=>m.field))}(r,e,t,n):function(s,o,c){return hs(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(r,e,t)}function HE(r,e){let t=null;for(const n of r.fieldTransforms){const i=e.data.field(n.field),s=Vf(n.transform,i||null);s!=null&&(t===null&&(t=Ne.empty()),t.set(n.field,s))}return t||null}function Ul(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!function(n,i){return n===void 0&&i===void 0||!(!n||!i)&&zn(n,i,(s,o)=>KE(s,o))}(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}class ur extends eo{constructor(e,t,n,i=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class wt extends eo{constructor(e,t,n,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function Mf(r){const e=new Map;return r.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const n=r.data.field(t);e.set(t,n)}}),e}function Bl(r,e,t){const n=new Map;U(r.length===t.length);for(let i=0;i<t.length;i++){const s=r[i],o=s.transform,c=e.data.field(s.field);n.set(s.field,zE(o,c,t[i]))}return n}function ql(r,e,t){const n=new Map;for(const i of r){const s=i.transform,o=t.data.field(i.field);n.set(i.field,GE(s,o,e))}return n}class Ei extends eo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Ff extends eo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cc{constructor(e,t,n,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=i}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&WE(s,e,n[i])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=Hr(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=Hr(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=Cf();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let c=this.applyToLocalView(o,s.mutatedFields);c=t.has(i.key)?null:c;const u=Lf(o,c);u!==null&&n.set(i.key,u),o.isValidDocument()||o.convertToNoDocument(B.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),$())}isEqual(e){return this.batchId===e.batchId&&zn(this.mutations,e.mutations,(t,n)=>Ul(t,n))&&zn(this.baseMutations,e.baseMutations,(t,n)=>Ul(t,n))}}class uc{constructor(e,t,n,i){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=i}static from(e,t,n){U(e.mutations.length===n.length);let i=function(){return UE}();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,n[o].version);return new uc(e,t,n,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lc{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QE{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var _e,Y;function JE(r){switch(r){default:return M();case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0}}function Uf(r){if(r===void 0)return pe("GRPC error has no .code"),P.UNKNOWN;switch(r){case _e.OK:return P.OK;case _e.CANCELLED:return P.CANCELLED;case _e.UNKNOWN:return P.UNKNOWN;case _e.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case _e.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case _e.INTERNAL:return P.INTERNAL;case _e.UNAVAILABLE:return P.UNAVAILABLE;case _e.UNAUTHENTICATED:return P.UNAUTHENTICATED;case _e.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case _e.NOT_FOUND:return P.NOT_FOUND;case _e.ALREADY_EXISTS:return P.ALREADY_EXISTS;case _e.PERMISSION_DENIED:return P.PERMISSION_DENIED;case _e.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case _e.ABORTED:return P.ABORTED;case _e.OUT_OF_RANGE:return P.OUT_OF_RANGE;case _e.UNIMPLEMENTED:return P.UNIMPLEMENTED;case _e.DATA_LOSS:return P.DATA_LOSS;default:return M()}}(Y=_e||(_e={}))[Y.OK=0]="OK",Y[Y.CANCELLED=1]="CANCELLED",Y[Y.UNKNOWN=2]="UNKNOWN",Y[Y.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Y[Y.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Y[Y.NOT_FOUND=5]="NOT_FOUND",Y[Y.ALREADY_EXISTS=6]="ALREADY_EXISTS",Y[Y.PERMISSION_DENIED=7]="PERMISSION_DENIED",Y[Y.UNAUTHENTICATED=16]="UNAUTHENTICATED",Y[Y.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Y[Y.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Y[Y.ABORTED=10]="ABORTED",Y[Y.OUT_OF_RANGE=11]="OUT_OF_RANGE",Y[Y.UNIMPLEMENTED=12]="UNIMPLEMENTED",Y[Y.INTERNAL=13]="INTERNAL",Y[Y.UNAVAILABLE=14]="UNAVAILABLE",Y[Y.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function YE(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XE=new cn([4294967295,4294967295],0);function jl(r){const e=YE().encode(r),t=new $d;return t.update(e),new Uint8Array(t.digest())}function Gl(r){const e=new DataView(r.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new cn([t,n],0),new cn([i,s],0)]}class hc{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new qr(`Invalid padding: ${t}`);if(n<0)throw new qr(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new qr(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new qr(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=cn.fromNumber(this.Ie)}Ee(e,t,n){let i=e.add(t.multiply(cn.fromNumber(n)));return i.compare(XE)===1&&(i=new cn([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=jl(e),[n,i]=Gl(t);for(let s=0;s<this.hashCount;s++){const o=this.Ee(n,i,s);if(!this.de(o))return!1}return!0}static create(e,t,n){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new hc(s,i,t);return n.forEach(c=>o.insert(c)),o}insert(e){if(this.Ie===0)return;const t=jl(e),[n,i]=Gl(t);for(let s=0;s<this.hashCount;s++){const o=this.Ee(n,i,s);this.Ae(o)}}Ae(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class qr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti{constructor(e,t,n,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const i=new Map;return i.set(e,wi.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new Ti(B.min(),i,new ie(z),Ke(),$())}}class wi{constructor(e,t,n,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new wi(n,t,$(),$(),$())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ds{constructor(e,t,n,i){this.Re=e,this.removedTargetIds=t,this.key=n,this.Ve=i}}class Bf{constructor(e,t){this.targetId=e,this.me=t}}class qf{constructor(e,t,n=ge.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=i}}class zl{constructor(){this.fe=0,this.ge=$l(),this.pe=ge.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=$(),t=$(),n=$();return this.ge.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:n=n.add(i);break;default:M()}}),new wi(this.pe,this.ye,e,t,n)}Ce(){this.we=!1,this.ge=$l()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,U(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class ZE{constructor(e){this.Le=e,this.Be=new Map,this.ke=Ke(),this.qe=Kl(),this.Qe=new ie(z)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{const n=this.Ge(t);switch(e.state){case 0:this.ze(t)&&n.De(e.resumeToken);break;case 1:n.Oe(),n.Se||n.Ce(),n.De(e.resumeToken);break;case 2:n.Oe(),n.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(n.Ne(),n.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),n.De(e.resumeToken));break;default:M()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((n,i)=>{this.ze(i)&&t(i)})}He(e){const t=e.targetId,n=e.me.count,i=this.Je(t);if(i){const s=i.target;if(Ts(s))if(n===0){const o=new L(s.path);this.Ue(t,o,de.newNoDocument(o,B.min()))}else U(n===1);else{const o=this.Ye(t);if(o!==n){const c=this.Ze(e),u=c?this.Xe(c,e,o):1;if(u!==0){this.je(t);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,h)}}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:i=0},hashCount:s=0}=t;let o,c;try{o=Ut(n).toUint8Array()}catch(u){if(u instanceof df)return ri("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new hc(o,i,s)}catch(u){return ri(u instanceof qr?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.Ie===0?null:c}Xe(e,t,n){return t.me.count===n-this.nt(e,t.targetId)?0:2}nt(e,t){const n=this.Le.getRemoteKeysForTarget(t);let i=0;return n.forEach(s=>{const o=this.Le.tt(),c=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.Ue(t,s,null),i++)}),i}rt(e){const t=new Map;this.Be.forEach((s,o)=>{const c=this.Je(o);if(c){if(s.current&&Ts(c.target)){const u=new L(c.target.path);this.ke.get(u)!==null||this.it(o,u)||this.Ue(o,u,de.newNoDocument(u,e))}s.be&&(t.set(o,s.ve()),s.Ce())}});let n=$();this.qe.forEach((s,o)=>{let c=!0;o.forEachWhile(u=>{const h=this.Je(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(n=n.add(s))}),this.ke.forEach((s,o)=>o.setReadTime(e));const i=new Ti(e,t,this.Qe,this.ke,n);return this.ke=Ke(),this.qe=Kl(),this.Qe=new ie(z),i}$e(e,t){if(!this.ze(e))return;const n=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,n),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,n){if(!this.ze(e))return;const i=this.Ge(e);this.it(e,t)?i.Fe(t,1):i.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),n&&(this.ke=this.ke.insert(t,n))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new zl,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new ne(z),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||C("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new zl),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function Kl(){return new ie(L.comparator)}function $l(){return new ie(L.comparator)}const eT={asc:"ASCENDING",desc:"DESCENDING"},tT={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},nT={and:"AND",or:"OR"};class rT{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Ia(r,e){return r.useProto3Json||Hs(e)?e:{value:e}}function Jn(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function jf(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function iT(r,e){return Jn(r,e.toTimestamp())}function Fe(r){return U(!!r),B.fromTimestamp(function(t){const n=It(t);return new le(n.seconds,n.nanos)}(r))}function dc(r,e){return va(r,e).canonicalString()}function va(r,e){const t=function(i){return new Z(["projects",i.projectId,"databases",i.database])}(r).child("documents");return e===void 0?t:t.child(e)}function Gf(r){const e=Z.fromString(r);return U(Xf(e)),e}function Rs(r,e){return dc(r.databaseId,e.path)}function un(r,e){const t=Gf(e);if(t.get(1)!==r.databaseId.projectId)throw new V(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new V(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new L($f(t))}function zf(r,e){return dc(r.databaseId,e)}function Kf(r){const e=Gf(r);return e.length===4?Z.emptyPath():$f(e)}function Ea(r){return new Z(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function $f(r){return U(r.length>4&&r.get(4)==="documents"),r.popFirst(5)}function Wl(r,e,t){return{name:Rs(r,e),fields:t.value.mapValue.fields}}function sT(r,e,t){const n=un(r,e.name),i=Fe(e.updateTime),s=e.createTime?Fe(e.createTime):B.min(),o=new Ne({mapValue:{fields:e.fields}}),c=de.newFoundDocument(n,i,s,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function oT(r,e){let t;if("targetChange"in e){e.targetChange;const n=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:M()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(h,f){return h.useProto3Json?(U(f===void 0||typeof f=="string"),ge.fromBase64String(f||"")):(U(f===void 0||f instanceof Buffer||f instanceof Uint8Array),ge.fromUint8Array(f||new Uint8Array))}(r,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(h){const f=h.code===void 0?P.UNKNOWN:Uf(h.code);return new V(f,h.message||"")}(o);t=new qf(n,i,s,c||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const i=un(r,n.document.name),s=Fe(n.document.updateTime),o=n.document.createTime?Fe(n.document.createTime):B.min(),c=new Ne({mapValue:{fields:n.document.fields}}),u=de.newFoundDocument(i,s,o,c),h=n.targetIds||[],f=n.removedTargetIds||[];t=new ds(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const i=un(r,n.document),s=n.readTime?Fe(n.readTime):B.min(),o=de.newNoDocument(i,s),c=n.removedTargetIds||[];t=new ds([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const i=un(r,n.document),s=n.removedTargetIds||[];t=new ds([],s,i,null)}else{if(!("filter"in e))return M();{e.filter;const n=e.filter;n.targetId;const{count:i=0,unchangedNames:s}=n,o=new QE(i,s),c=n.targetId;t=new Bf(c,o)}}return t}function Ss(r,e){let t;if(e instanceof ur)t={update:Wl(r,e.key,e.value)};else if(e instanceof Ei)t={delete:Rs(r,e.key)};else if(e instanceof wt)t={update:Wl(r,e.key,e.data),updateMask:dT(e.fieldMask)};else{if(!(e instanceof Ff))return M();t={verify:Rs(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(n=>function(s,o){const c=o.transform;if(c instanceof Wn)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Hn)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Qn)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof hi)return{fieldPath:o.field.canonicalString(),increment:c.Pe};throw M()}(0,n))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:iT(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:M()}(r,e.precondition)),t}function Ta(r,e){const t=e.currentDocument?function(s){return s.updateTime!==void 0?Ie.updateTime(Fe(s.updateTime)):s.exists!==void 0?Ie.exists(s.exists):Ie.none()}(e.currentDocument):Ie.none(),n=e.updateTransforms?e.updateTransforms.map(i=>function(o,c){let u=null;if("setToServerValue"in c)U(c.setToServerValue==="REQUEST_TIME"),u=new Wn;else if("appendMissingElements"in c){const f=c.appendMissingElements.values||[];u=new Hn(f)}else if("removeAllFromArray"in c){const f=c.removeAllFromArray.values||[];u=new Qn(f)}else"increment"in c?u=new hi(o,c.increment):M();const h=ue.fromServerFormat(c.fieldPath);return new xf(h,u)}(r,i)):[];if(e.update){e.update.name;const i=un(r,e.update.name),s=new Ne({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(u){const h=u.fieldPaths||[];return new je(h.map(f=>ue.fromServerFormat(f)))}(e.updateMask);return new wt(i,s,o,t,n)}return new ur(i,s,t,n)}if(e.delete){const i=un(r,e.delete);return new Ei(i,t)}if(e.verify){const i=un(r,e.verify);return new Ff(i,t)}return M()}function aT(r,e){return r&&r.length>0?(U(e!==void 0),r.map(t=>function(i,s){let o=i.updateTime?Fe(i.updateTime):Fe(s);return o.isEqual(B.min())&&(o=Fe(s)),new $E(o,i.transformResults||[])}(t,e))):[]}function Wf(r,e){return{documents:[zf(r,e.path)]}}function Hf(r,e){const t={structuredQuery:{}},n=e.path;let i;e.collectionGroup!==null?(i=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=zf(r,i);const s=function(h){if(h.length!==0)return Yf(te.create(h,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const o=function(h){if(h.length!==0)return h.map(f=>function(I){return{field:kn(I.field),direction:uT(I.dir)}}(f))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=Ia(r,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{_t:t,parent:i}}function Qf(r){let e=Kf(r.parent);const t=r.structuredQuery,n=t.from?t.from.length:0;let i=null;if(n>0){U(n===1);const f=t.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];t.where&&(s=function(m){const I=Jf(m);return I instanceof te&&ic(I)?I.getFilters():[I]}(t.where));let o=[];t.orderBy&&(o=function(m){return m.map(I=>function(D){return new li(On(D.field),function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(D.direction))}(I))}(t.orderBy));let c=null;t.limit&&(c=function(m){let I;return I=typeof m=="object"?m.value:m,Hs(I)?null:I}(t.limit));let u=null;t.startAt&&(u=function(m){const I=!!m.before,S=m.values||[];return new qt(S,I)}(t.startAt));let h=null;return t.endAt&&(h=function(m){const I=!m.before,S=m.values||[];return new qt(S,I)}(t.endAt)),wf(e,i,o,s,c,"F",u,h)}function cT(r,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Jf(r){return r.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=On(t.unaryFilter.field);return Q.create(n,"==",{doubleValue:NaN});case"IS_NULL":const i=On(t.unaryFilter.field);return Q.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=On(t.unaryFilter.field);return Q.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=On(t.unaryFilter.field);return Q.create(o,"!=",{nullValue:"NULL_VALUE"});default:return M()}}(r):r.fieldFilter!==void 0?function(t){return Q.create(On(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return M()}}(t.fieldFilter.op),t.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(t){return te.create(t.compositeFilter.filters.map(n=>Jf(n)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return M()}}(t.compositeFilter.op))}(r):M()}function uT(r){return eT[r]}function lT(r){return tT[r]}function hT(r){return nT[r]}function kn(r){return{fieldPath:r.canonicalString()}}function On(r){return ue.fromServerFormat(r.fieldPath)}function Yf(r){return r instanceof Q?function(t){if(t.op==="=="){if(Dl(t.value))return{unaryFilter:{field:kn(t.field),op:"IS_NAN"}};if(Cl(t.value))return{unaryFilter:{field:kn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Dl(t.value))return{unaryFilter:{field:kn(t.field),op:"IS_NOT_NAN"}};if(Cl(t.value))return{unaryFilter:{field:kn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:kn(t.field),op:lT(t.op),value:t.value}}}(r):r instanceof te?function(t){const n=t.getFilters().map(i=>Yf(i));return n.length===1?n[0]:{compositeFilter:{op:hT(t.op),filters:n}}}(r):M()}function dT(r){const e=[];return r.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Xf(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{constructor(e,t,n,i,s=B.min(),o=B.min(),c=ge.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new pt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new pt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new pt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new pt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zf{constructor(e){this.ct=e}}function fT(r,e){let t;if(e.document)t=sT(r.ct,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const n=L.fromSegments(e.noDocument.path),i=_n(e.noDocument.readTime);t=de.newNoDocument(n,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return M();{const n=L.fromSegments(e.unknownDocument.path),i=_n(e.unknownDocument.version);t=de.newUnknownDocument(n,i)}}return e.readTime&&t.setReadTime(function(i){const s=new le(i[0],i[1]);return B.fromTimestamp(s)}(e.readTime)),t}function Hl(r,e){const t=e.key,n={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:bs(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())n.document=function(s,o){return{name:Rs(s,o.key),fields:o.data.value.mapValue.fields,updateTime:Jn(s,o.version.toTimestamp()),createTime:Jn(s,o.createTime.toTimestamp())}}(r.ct,e);else if(e.isNoDocument())n.noDocument={path:t.path.toArray(),readTime:gn(e.version)};else{if(!e.isUnknownDocument())return M();n.unknownDocument={path:t.path.toArray(),version:gn(e.version)}}return n}function bs(r){const e=r.toTimestamp();return[e.seconds,e.nanoseconds]}function gn(r){const e=r.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function _n(r){const e=new le(r.seconds,r.nanoseconds);return B.fromTimestamp(e)}function nn(r,e){const t=(e.baseMutations||[]).map(s=>Ta(r.ct,s));for(let s=0;s<e.mutations.length-1;++s){const o=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){const c=e.mutations[s+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}const n=e.mutations.map(s=>Ta(r.ct,s)),i=le.fromMillis(e.localWriteTimeMs);return new cc(e.batchId,i,t,n)}function jr(r){const e=_n(r.readTime),t=r.lastLimboFreeSnapshotVersion!==void 0?_n(r.lastLimboFreeSnapshotVersion):B.min();let n;return n=function(s){return s.documents!==void 0}(r.query)?function(s){return U(s.documents.length===1),$e(Ys(Kf(s.documents[0])))}(r.query):function(s){return $e(Qf(s))}(r.query),new pt(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,e,t,ge.fromBase64String(r.resumeToken))}function ep(r,e){const t=gn(e.snapshotVersion),n=gn(e.lastLimboFreeSnapshotVersion);let i;i=Ts(e.target)?Wf(r.ct,e.target):Hf(r.ct,e.target)._t;const s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:mn(e.target),readTime:t,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:i}}function tp(r){const e=Qf({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?As(e,e.limit,"L"):e}function Qo(r,e){return new lc(e.largestBatchId,Ta(r.ct,e.overlayMutation))}function Ql(r,e){const t=e.path.lastSegment();return[r,Me(e.path.popLast()),t]}function Jl(r,e,t,n){return{indexId:r,uid:e,sequenceNumber:t,readTime:gn(n.readTime),documentKey:Me(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pT{getBundleMetadata(e,t){return Yl(e).get(t).next(n=>{if(n)return function(s){return{id:s.bundleId,createTime:_n(s.createTime),version:s.version}}(n)})}saveBundleMetadata(e,t){return Yl(e).put(function(i){return{bundleId:i.id,createTime:gn(Fe(i.createTime)),version:i.version}}(t))}getNamedQuery(e,t){return Xl(e).get(t).next(n=>{if(n)return function(s){return{name:s.name,query:tp(s.bundledQuery),readTime:_n(s.readTime)}}(n)})}saveNamedQuery(e,t){return Xl(e).put(function(i){return{name:i.name,readTime:gn(Fe(i.readTime)),bundledQuery:i.bundledQuery}}(t))}}function Yl(r){return Ee(r,"bundles")}function Xl(r){return Ee(r,"namedQueries")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class to{constructor(e,t){this.serializer=e,this.userId=t}static lt(e,t){const n=t.uid||"";return new to(e,n)}getOverlay(e,t){return Vr(e).get(Ql(this.userId,t)).next(n=>n?Qo(this.serializer,n):null)}getOverlays(e,t){const n=Ze();return A.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&n.set(i,s)})).next(()=>n)}saveOverlays(e,t,n){const i=[];return n.forEach((s,o)=>{const c=new lc(t,o);i.push(this.ht(e,c))}),A.waitFor(i)}removeOverlaysForBatchId(e,t,n){const i=new Set;t.forEach(o=>i.add(Me(o.getCollectionPath())));const s=[];return i.forEach(o=>{const c=IDBKeyRange.bound([this.userId,o,n],[this.userId,o,n+1],!1,!0);s.push(Vr(e).j("collectionPathOverlayIndex",c))}),A.waitFor(s)}getOverlaysForCollection(e,t,n){const i=Ze(),s=Me(t),o=IDBKeyRange.bound([this.userId,s,n],[this.userId,s,Number.POSITIVE_INFINITY],!0);return Vr(e).U("collectionPathOverlayIndex",o).next(c=>{for(const u of c){const h=Qo(this.serializer,u);i.set(h.getKey(),h)}return i})}getOverlaysForCollectionGroup(e,t,n,i){const s=Ze();let o;const c=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Vr(e).J({index:"collectionGroupOverlayIndex",range:c},(u,h,f)=>{const m=Qo(this.serializer,h);s.size()<i||m.largestBatchId===o?(s.set(m.getKey(),m),o=m.largestBatchId):f.done()}).next(()=>s)}ht(e,t){return Vr(e).put(function(i,s,o){const[c,u,h]=Ql(s,o.mutation.key);return{userId:s,collectionPath:u,documentId:h,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:Ss(i.ct,o.mutation)}}(this.serializer,this.userId,t))}}function Vr(r){return Ee(r,"documentOverlays")}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mT{Pt(e){return Ee(e,"globals")}getSessionToken(e){return this.Pt(e).get("sessionToken").next(t=>{const n=t==null?void 0:t.value;return n?ge.fromUint8Array(n):ge.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.Pt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(){}It(e,t){this.Tt(e,t),t.Et()}Tt(e,t){if("nullValue"in e)this.dt(t,5);else if("booleanValue"in e)this.dt(t,10),t.At(e.booleanValue?1:0);else if("integerValue"in e)this.dt(t,15),t.At(ce(e.integerValue));else if("doubleValue"in e){const n=ce(e.doubleValue);isNaN(n)?this.dt(t,13):(this.dt(t,15),oi(n)?t.At(0):t.At(n))}else if("timestampValue"in e){let n=e.timestampValue;this.dt(t,20),typeof n=="string"&&(n=It(n)),t.Rt(`${n.seconds||""}`),t.At(n.nanos||0)}else if("stringValue"in e)this.Vt(e.stringValue,t),this.ft(t);else if("bytesValue"in e)this.dt(t,30),t.gt(Ut(e.bytesValue)),this.ft(t);else if("referenceValue"in e)this.yt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.dt(t,45),t.At(n.latitude||0),t.At(n.longitude||0)}else"mapValue"in e?ff(e)?this.dt(t,Number.MAX_SAFE_INTEGER):Js(e)?this.wt(e.mapValue,t):(this.St(e.mapValue,t),this.ft(t)):"arrayValue"in e?(this.bt(e.arrayValue,t),this.ft(t)):M()}Vt(e,t){this.dt(t,25),this.Dt(e,t)}Dt(e,t){t.Rt(e)}St(e,t){const n=e.fields||{};this.dt(t,55);for(const i of Object.keys(n))this.Vt(i,t),this.Tt(n[i],t)}wt(e,t){var n,i;const s=e.fields||{};this.dt(t,53);const o="value",c=((i=(n=s[o].arrayValue)===null||n===void 0?void 0:n.values)===null||i===void 0?void 0:i.length)||0;this.dt(t,15),t.At(ce(c)),this.Vt(o,t),this.Tt(s[o],t)}bt(e,t){const n=e.values||[];this.dt(t,50);for(const i of n)this.Tt(i,t)}yt(e,t){this.dt(t,37),L.fromName(e).path.forEach(n=>{this.dt(t,60),this.Dt(n,t)})}dt(e,t){e.At(t)}ft(e){e.At(2)}}rn.vt=new rn;function gT(r){if(r===0)return 8;let e=0;return!(r>>4)&&(e+=4,r<<=4),!(r>>6)&&(e+=2,r<<=2),!(r>>7)&&(e+=1),e}function Zl(r){const e=64-function(n){let i=0;for(let s=0;s<8;++s){const o=gT(255&n[s]);if(i+=o,o!==8)break}return i}(r);return Math.ceil(e/8)}class _T{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ct(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ft(n.value),n=t.next();this.Mt()}xt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ot(n.value),n=t.next();this.Nt()}Lt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Ft(n);else if(n<2048)this.Ft(960|n>>>6),this.Ft(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Ft(480|n>>>12),this.Ft(128|63&n>>>6),this.Ft(128|63&n);else{const i=t.codePointAt(0);this.Ft(240|i>>>18),this.Ft(128|63&i>>>12),this.Ft(128|63&i>>>6),this.Ft(128|63&i)}}this.Mt()}Bt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Ot(n);else if(n<2048)this.Ot(960|n>>>6),this.Ot(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Ot(480|n>>>12),this.Ot(128|63&n>>>6),this.Ot(128|63&n);else{const i=t.codePointAt(0);this.Ot(240|i>>>18),this.Ot(128|63&i>>>12),this.Ot(128|63&i>>>6),this.Ot(128|63&i)}}this.Nt()}kt(e){const t=this.qt(e),n=Zl(t);this.Qt(1+n),this.buffer[this.position++]=255&n;for(let i=t.length-n;i<t.length;++i)this.buffer[this.position++]=255&t[i]}Kt(e){const t=this.qt(e),n=Zl(t);this.Qt(1+n),this.buffer[this.position++]=~(255&n);for(let i=t.length-n;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}$t(){this.Ut(255),this.Ut(255)}Wt(){this.Gt(255),this.Gt(255)}reset(){this.position=0}seed(e){this.Qt(e.length),this.buffer.set(e,this.position),this.position+=e.length}zt(){return this.buffer.slice(0,this.position)}qt(e){const t=function(s){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,s,!1),new Uint8Array(o.buffer)}(e),n=(128&t[0])!=0;t[0]^=n?255:128;for(let i=1;i<t.length;++i)t[i]^=n?255:0;return t}Ft(e){const t=255&e;t===0?(this.Ut(0),this.Ut(255)):t===255?(this.Ut(255),this.Ut(0)):this.Ut(t)}Ot(e){const t=255&e;t===0?(this.Gt(0),this.Gt(255)):t===255?(this.Gt(255),this.Gt(0)):this.Gt(e)}Mt(){this.Ut(0),this.Ut(1)}Nt(){this.Gt(0),this.Gt(1)}Ut(e){this.Qt(1),this.buffer[this.position++]=e}Gt(e){this.Qt(1),this.buffer[this.position++]=~e}Qt(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const i=new Uint8Array(n);i.set(this.buffer),this.buffer=i}}class yT{constructor(e){this.jt=e}gt(e){this.jt.Ct(e)}Rt(e){this.jt.Lt(e)}At(e){this.jt.kt(e)}Et(){this.jt.$t()}}class IT{constructor(e){this.jt=e}gt(e){this.jt.xt(e)}Rt(e){this.jt.Bt(e)}At(e){this.jt.Kt(e)}Et(){this.jt.Wt()}}class Nr{constructor(){this.jt=new _T,this.Ht=new yT(this.jt),this.Jt=new IT(this.jt)}seed(e){this.jt.seed(e)}Yt(e){return e===0?this.Ht:this.Jt}zt(){return this.jt.zt()}reset(){this.jt.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(e,t,n,i){this.indexId=e,this.documentKey=t,this.arrayValue=n,this.directionalValue=i}Zt(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,n=new Uint8Array(t);return n.set(this.directionalValue,0),t!==e?n.set([0],this.directionalValue.length):++n[n.length-1],new sn(this.indexId,this.documentKey,this.arrayValue,n)}}function Ct(r,e){let t=r.indexId-e.indexId;return t!==0?t:(t=eh(r.arrayValue,e.arrayValue),t!==0?t:(t=eh(r.directionalValue,e.directionalValue),t!==0?t:L.comparator(r.documentKey,e.documentKey)))}function eh(r,e){for(let t=0;t<r.length&&t<e.length;++t){const n=r[t]-e[t];if(n!==0)return n}return r.length-e.length}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class th{constructor(e){this.Xt=new ne((t,n)=>ue.comparator(t.field,n.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.en=e.orderBy,this.tn=[];for(const t of e.filters){const n=t;n.isInequality()?this.Xt=this.Xt.add(n):this.tn.push(n)}}get nn(){return this.Xt.size>1}rn(e){if(U(e.collectionGroup===this.collectionId),this.nn)return!1;const t=ha(e);if(t!==void 0&&!this.sn(t))return!1;const n=en(e);let i=new Set,s=0,o=0;for(;s<n.length&&this.sn(n[s]);++s)i=i.add(n[s].fieldPath.canonicalString());if(s===n.length)return!0;if(this.Xt.size>0){const c=this.Xt.getIterator().getNext();if(!i.has(c.field.canonicalString())){const u=n[s];if(!this.on(c,u)||!this._n(this.en[o++],u))return!1}++s}for(;s<n.length;++s){const c=n[s];if(o>=this.en.length||!this._n(this.en[o++],c))return!1}return!0}an(){if(this.nn)return null;let e=new ne(ue.comparator);const t=[];for(const n of this.tn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")t.push(new as(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new as(n.field,0))}for(const n of this.en)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new as(n.field,n.dir==="asc"?0:1)));return new Es(Es.UNKNOWN_ID,this.collectionId,t,si.empty())}sn(e){for(const t of this.tn)if(this.on(t,e))return!0;return!1}on(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const n=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===n}_n(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function np(r){var e,t;if(U(r instanceof Q||r instanceof te),r instanceof Q){if(r instanceof Tf){const i=((t=(e=r.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(s=>Q.create(r.field,"==",s)))||[];return te.create(i,"or")}return r}const n=r.filters.map(i=>np(i));return te.create(n,r.op)}function vT(r){if(r.getFilters().length===0)return[];const e=Ra(np(r));return U(rp(e)),wa(e)||Aa(e)?[e]:e.getFilters()}function wa(r){return r instanceof Q}function Aa(r){return r instanceof te&&ic(r)}function rp(r){return wa(r)||Aa(r)||function(t){if(t instanceof te&&ma(t)){for(const n of t.getFilters())if(!wa(n)&&!Aa(n))return!1;return!0}return!1}(r)}function Ra(r){if(U(r instanceof Q||r instanceof te),r instanceof Q)return r;if(r.filters.length===1)return Ra(r.filters[0]);const e=r.filters.map(n=>Ra(n));let t=te.create(e,r.op);return t=Ps(t),rp(t)?t:(U(t instanceof te),U($n(t)),U(t.filters.length>1),t.filters.reduce((n,i)=>fc(n,i)))}function fc(r,e){let t;return U(r instanceof Q||r instanceof te),U(e instanceof Q||e instanceof te),t=r instanceof Q?e instanceof Q?function(i,s){return te.create([i,s],"and")}(r,e):nh(r,e):e instanceof Q?nh(e,r):function(i,s){if(U(i.filters.length>0&&s.filters.length>0),$n(i)&&$n(s))return If(i,s.getFilters());const o=ma(i)?i:s,c=ma(i)?s:i,u=o.filters.map(h=>fc(h,c));return te.create(u,"or")}(r,e),Ps(t)}function nh(r,e){if($n(e))return If(e,r.getFilters());{const t=e.filters.map(n=>fc(r,n));return te.create(t,"or")}}function Ps(r){if(U(r instanceof Q||r instanceof te),r instanceof Q)return r;const e=r.getFilters();if(e.length===1)return Ps(e[0]);if(_f(r))return r;const t=e.map(i=>Ps(i)),n=[];return t.forEach(i=>{i instanceof Q?n.push(i):i instanceof te&&(i.op===r.op?n.push(...i.filters):n.push(i))}),n.length===1?n[0]:te.create(n,r.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ET{constructor(){this.un=new pc}addToCollectionParentIndex(e,t){return this.un.add(t),A.resolve()}getCollectionParents(e,t){return A.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return A.resolve()}deleteFieldIndex(e,t){return A.resolve()}deleteAllFieldIndexes(e){return A.resolve()}createTargetIndexes(e,t){return A.resolve()}getDocumentsMatchingTarget(e,t){return A.resolve(null)}getIndexType(e,t){return A.resolve(0)}getFieldIndexes(e,t){return A.resolve([])}getNextCollectionGroupToUpdate(e){return A.resolve(null)}getMinOffset(e,t){return A.resolve(We.min())}getMinOffsetFromCollectionGroup(e,t){return A.resolve(We.min())}updateCollectionGroup(e,t,n){return A.resolve()}updateIndexEntries(e,t){return A.resolve()}}class pc{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),i=this.index[t]||new ne(Z.comparator),s=!i.has(n);return this.index[t]=i.add(n),s}has(e){const t=e.lastSegment(),n=e.popLast(),i=this.index[t];return i&&i.has(n)}getEntries(e){return(this.index[e]||new ne(Z.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xi=new Uint8Array(0);class TT{constructor(e,t){this.databaseId=t,this.cn=new pc,this.ln=new $t(n=>mn(n),(n,i)=>Ii(n,i)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.cn.has(t)){const n=t.lastSegment(),i=t.popLast();e.addOnCommittedListener(()=>{this.cn.add(t)});const s={collectionId:n,parent:Me(i)};return rh(e).put(s)}return A.resolve()}getCollectionParents(e,t){const n=[],i=IDBKeyRange.bound([t,""],[Zd(t),""],!1,!0);return rh(e).U(i).next(s=>{for(const o of s){if(o.collectionId!==t)break;n.push(Xe(o.parent))}return n})}addFieldIndex(e,t){const n=kr(e),i=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(u=>[u.fieldPath.canonicalString(),u.kind])}}(t);delete i.indexId;const s=n.add(i);if(t.indexState){const o=Cn(e);return s.next(c=>{o.put(Jl(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return s.next()}deleteFieldIndex(e,t){const n=kr(e),i=Cn(e),s=Pn(e);return n.delete(t.indexId).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=kr(e),n=Pn(e),i=Cn(e);return t.j().next(()=>n.j()).next(()=>i.j())}createTargetIndexes(e,t){return A.forEach(this.hn(t),n=>this.getIndexType(e,n).next(i=>{if(i===0||i===1){const s=new th(n).an();if(s!=null)return this.addFieldIndex(e,s)}}))}getDocumentsMatchingTarget(e,t){const n=Pn(e);let i=!0;const s=new Map;return A.forEach(this.hn(t),o=>this.Pn(e,o).next(c=>{i&&(i=!!c),s.set(o,c)})).next(()=>{if(i){let o=$();const c=[];return A.forEach(s,(u,h)=>{C("IndexedDbIndexManager",`Using index ${function(q){return`id=${q.indexId}|cg=${q.collectionGroup}|f=${q.fields.map(J=>`${J.fieldPath}:${J.kind}`).join(",")}`}(u)} to execute ${mn(t)}`);const f=function(q,J){const ee=ha(J);if(ee===void 0)return null;for(const W of ws(q,ee.fieldPath))switch(W.op){case"array-contains-any":return W.value.arrayValue.values||[];case"array-contains":return[W.value]}return null}(h,u),m=function(q,J){const ee=new Map;for(const W of en(J))for(const v of ws(q,W.fieldPath))switch(v.op){case"==":case"in":ee.set(W.fieldPath.canonicalString(),v.value);break;case"not-in":case"!=":return ee.set(W.fieldPath.canonicalString(),v.value),Array.from(ee.values())}return null}(h,u),I=function(q,J){const ee=[];let W=!0;for(const v of en(J)){const g=v.kind===0?xl(q,v.fieldPath,q.startAt):Ll(q,v.fieldPath,q.startAt);ee.push(g.value),W&&(W=g.inclusive)}return new qt(ee,W)}(h,u),S=function(q,J){const ee=[];let W=!0;for(const v of en(J)){const g=v.kind===0?Ll(q,v.fieldPath,q.endAt):xl(q,v.fieldPath,q.endAt);ee.push(g.value),W&&(W=g.inclusive)}return new qt(ee,W)}(h,u),D=this.In(u,h,I),O=this.In(u,h,S),N=this.Tn(u,h,m),K=this.En(u.indexId,f,D,I.inclusive,O,S.inclusive,N);return A.forEach(K,G=>n.G(G,t.limit).next(q=>{q.forEach(J=>{const ee=L.fromSegments(J.documentKey);o.has(ee)||(o=o.add(ee),c.push(ee))})}))}).next(()=>c)}return A.resolve(null)})}hn(e){let t=this.ln.get(e);return t||(e.filters.length===0?t=[e]:t=vT(te.create(e.filters,"and")).map(n=>_a(e.path,e.collectionGroup,e.orderBy,n.getFilters(),e.limit,e.startAt,e.endAt)),this.ln.set(e,t),t)}En(e,t,n,i,s,o,c){const u=(t!=null?t.length:1)*Math.max(n.length,s.length),h=u/(t!=null?t.length:1),f=[];for(let m=0;m<u;++m){const I=t?this.dn(t[m/h]):Xi,S=this.An(e,I,n[m%h],i),D=this.Rn(e,I,s[m%h],o),O=c.map(N=>this.An(e,I,N,!0));f.push(...this.createRange(S,D,O))}return f}An(e,t,n,i){const s=new sn(e,L.empty(),t,n);return i?s:s.Zt()}Rn(e,t,n,i){const s=new sn(e,L.empty(),t,n);return i?s.Zt():s}Pn(e,t){const n=new th(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next(s=>{let o=null;for(const c of s)n.rn(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o})}getIndexType(e,t){let n=2;const i=this.hn(t);return A.forEach(i,s=>this.Pn(e,s).next(o=>{o?n!==0&&o.fields.length<function(u){let h=new ne(ue.comparator),f=!1;for(const m of u.filters)for(const I of m.getFlattenedFilters())I.field.isKeyField()||(I.op==="array-contains"||I.op==="array-contains-any"?f=!0:h=h.add(I.field));for(const m of u.orderBy)m.field.isKeyField()||(h=h.add(m.field));return h.size+(f?1:0)}(s)&&(n=1):n=0})).next(()=>function(o){return o.limit!==null}(t)&&i.length>1&&n===2?1:n)}Vn(e,t){const n=new Nr;for(const i of en(e)){const s=t.data.field(i.fieldPath);if(s==null)return null;const o=n.Yt(i.kind);rn.vt.It(s,o)}return n.zt()}dn(e){const t=new Nr;return rn.vt.It(e,t.Yt(0)),t.zt()}mn(e,t){const n=new Nr;return rn.vt.It(pn(this.databaseId,t),n.Yt(function(s){const o=en(s);return o.length===0?0:o[o.length-1].kind}(e))),n.zt()}Tn(e,t,n){if(n===null)return[];let i=[];i.push(new Nr);let s=0;for(const o of en(e)){const c=n[s++];for(const u of i)if(this.fn(t,o.fieldPath)&&ui(c))i=this.gn(i,o,c);else{const h=u.Yt(o.kind);rn.vt.It(c,h)}}return this.pn(i)}In(e,t,n){return this.Tn(e,t,n.position)}pn(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].zt();return t}gn(e,t,n){const i=[...e],s=[];for(const o of n.arrayValue.values||[])for(const c of i){const u=new Nr;u.seed(c.zt()),rn.vt.It(o,u.Yt(t.kind)),s.push(u)}return s}fn(e,t){return!!e.filters.find(n=>n instanceof Q&&n.field.isEqual(t)&&(n.op==="in"||n.op==="not-in"))}getFieldIndexes(e,t){const n=kr(e),i=Cn(e);return(t?n.U("collectionGroupIndex",IDBKeyRange.bound(t,t)):n.U()).next(s=>{const o=[];return A.forEach(s,c=>i.get([c.indexId,this.uid]).next(u=>{o.push(function(f,m){const I=m?new si(m.sequenceNumber,new We(_n(m.readTime),new L(Xe(m.documentKey)),m.largestBatchId)):si.empty(),S=f.fields.map(([D,O])=>new as(ue.fromServerFormat(D),O));return new Es(f.indexId,f.collectionGroup,S,I)}(c,u))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((n,i)=>{const s=n.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:z(n.collectionGroup,i.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,n){const i=kr(e),s=Cn(e);return this.yn(e).next(o=>i.U("collectionGroupIndex",IDBKeyRange.bound(t,t)).next(c=>A.forEach(c,u=>s.put(Jl(u.indexId,this.uid,o,n)))))}updateIndexEntries(e,t){const n=new Map;return A.forEach(t,(i,s)=>{const o=n.get(i.collectionGroup);return(o?A.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next(c=>(n.set(i.collectionGroup,c),A.forEach(c,u=>this.wn(e,i,u).next(h=>{const f=this.Sn(s,u);return h.isEqual(f)?A.resolve():this.bn(e,s,u,h,f)}))))})}Dn(e,t,n,i){return Pn(e).put({indexId:i.indexId,uid:this.uid,arrayValue:i.arrayValue,directionalValue:i.directionalValue,orderedDocumentKey:this.mn(n,t.key),documentKey:t.key.path.toArray()})}vn(e,t,n,i){return Pn(e).delete([i.indexId,this.uid,i.arrayValue,i.directionalValue,this.mn(n,t.key),t.key.path.toArray()])}wn(e,t,n){const i=Pn(e);let s=new ne(Ct);return i.J({index:"documentKeyIndex",range:IDBKeyRange.only([n.indexId,this.uid,this.mn(n,t)])},(o,c)=>{s=s.add(new sn(n.indexId,t,c.arrayValue,c.directionalValue))}).next(()=>s)}Sn(e,t){let n=new ne(Ct);const i=this.Vn(t,e);if(i==null)return n;const s=ha(t);if(s!=null){const o=e.data.field(s.fieldPath);if(ui(o))for(const c of o.arrayValue.values||[])n=n.add(new sn(t.indexId,e.key,this.dn(c),i))}else n=n.add(new sn(t.indexId,e.key,Xi,i));return n}bn(e,t,n,i,s){C("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);const o=[];return function(u,h,f,m,I){const S=u.getIterator(),D=h.getIterator();let O=bn(S),N=bn(D);for(;O||N;){let K=!1,G=!1;if(O&&N){const q=f(O,N);q<0?G=!0:q>0&&(K=!0)}else O!=null?G=!0:K=!0;K?(m(N),N=bn(D)):G?(I(O),O=bn(S)):(O=bn(S),N=bn(D))}}(i,s,Ct,c=>{o.push(this.Dn(e,t,n,c))},c=>{o.push(this.vn(e,t,n,c))}),A.waitFor(o)}yn(e){let t=1;return Cn(e).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(n,i,s)=>{s.done(),t=i.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((o,c)=>Ct(o,c)).filter((o,c,u)=>!c||Ct(o,u[c-1])!==0);const i=[];i.push(e);for(const o of n){const c=Ct(o,e),u=Ct(o,t);if(c===0)i[0]=e.Zt();else if(c>0&&u<0)i.push(o),i.push(o.Zt());else if(u>0)break}i.push(t);const s=[];for(let o=0;o<i.length;o+=2){if(this.Cn(i[o],i[o+1]))return[];const c=[i[o].indexId,this.uid,i[o].arrayValue,i[o].directionalValue,Xi,[]],u=[i[o+1].indexId,this.uid,i[o+1].arrayValue,i[o+1].directionalValue,Xi,[]];s.push(IDBKeyRange.bound(c,u))}return s}Cn(e,t){return Ct(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(ih)}getMinOffset(e,t){return A.mapArray(this.hn(t),n=>this.Pn(e,n).next(i=>i||M())).next(ih)}}function rh(r){return Ee(r,"collectionParents")}function Pn(r){return Ee(r,"indexEntries")}function kr(r){return Ee(r,"indexConfiguration")}function Cn(r){return Ee(r,"indexState")}function ih(r){U(r.length!==0);let e=r[0].indexState.offset,t=e.largestBatchId;for(let n=1;n<r.length;n++){const i=r[n].indexState.offset;ec(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new We(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sh={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class Be{constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}static withCacheSize(e){return new Be(e,Be.DEFAULT_COLLECTION_PERCENTILE,Be.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ip(r,e,t){const n=r.store("mutations"),i=r.store("documentMutations"),s=[],o=IDBKeyRange.only(t.batchId);let c=0;const u=n.J({range:o},(f,m,I)=>(c++,I.delete()));s.push(u.next(()=>{U(c===1)}));const h=[];for(const f of t.mutations){const m=af(e,f.key.path,t.batchId);s.push(i.delete(m)),h.push(f.key)}return A.waitFor(s).next(()=>h)}function Cs(r){if(!r)return 0;let e;if(r.document)e=r.document;else if(r.unknownDocument)e=r.unknownDocument;else{if(!r.noDocument)throw M();e=r.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Be.DEFAULT_COLLECTION_PERCENTILE=10,Be.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Be.DEFAULT=new Be(41943040,Be.DEFAULT_COLLECTION_PERCENTILE,Be.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Be.DISABLED=new Be(-1,0,0);class no{constructor(e,t,n,i){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=i,this.Fn={}}static lt(e,t,n,i){U(e.uid!=="");const s=e.isAuthenticated()?e.uid:"";return new no(s,t,n,i)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Dt(e).J({index:"userMutationsIndex",range:n},(i,s,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,n,i){const s=xn(e),o=Dt(e);return o.add({}).next(c=>{U(typeof c=="number");const u=new cc(c,t,n,i),h=function(S,D,O){const N=O.baseMutations.map(G=>Ss(S.ct,G)),K=O.mutations.map(G=>Ss(S.ct,G));return{userId:D,batchId:O.batchId,localWriteTimeMs:O.localWriteTime.toMillis(),baseMutations:N,mutations:K}}(this.serializer,this.userId,u),f=[];let m=new ne((I,S)=>z(I.canonicalString(),S.canonicalString()));for(const I of i){const S=af(this.userId,I.key.path,c);m=m.add(I.key.path.popLast()),f.push(o.put(h)),f.push(s.put(S,oE))}return m.forEach(I=>{f.push(this.indexManager.addToCollectionParentIndex(e,I))}),e.addOnCommittedListener(()=>{this.Fn[c]=u.keys()}),A.waitFor(f).next(()=>u)})}lookupMutationBatch(e,t){return Dt(e).get(t).next(n=>n?(U(n.userId===this.userId),nn(this.serializer,n)):null)}Mn(e,t){return this.Fn[t]?A.resolve(this.Fn[t]):this.lookupMutationBatch(e,t).next(n=>{if(n){const i=n.keys();return this.Fn[t]=i,i}return null})}getNextMutationBatchAfterBatchId(e,t){const n=t+1,i=IDBKeyRange.lowerBound([this.userId,n]);let s=null;return Dt(e).J({index:"userMutationsIndex",range:i},(o,c,u)=>{c.userId===this.userId&&(U(c.batchId>=n),s=nn(this.serializer,c)),u.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=-1;return Dt(e).J({index:"userMutationsIndex",range:t,reverse:!0},(i,s,o)=>{n=s.batchId,o.done()}).next(()=>n)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return Dt(e).U("userMutationsIndex",t).next(n=>n.map(i=>nn(this.serializer,i)))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=cs(this.userId,t.path),i=IDBKeyRange.lowerBound(n),s=[];return xn(e).J({range:i},(o,c,u)=>{const[h,f,m]=o,I=Xe(f);if(h===this.userId&&t.path.isEqual(I))return Dt(e).get(m).next(S=>{if(!S)throw M();U(S.userId===this.userId),s.push(nn(this.serializer,S))});u.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new ne(z);const i=[];return t.forEach(s=>{const o=cs(this.userId,s.path),c=IDBKeyRange.lowerBound(o),u=xn(e).J({range:c},(h,f,m)=>{const[I,S,D]=h,O=Xe(S);I===this.userId&&s.path.isEqual(O)?n=n.add(D):m.done()});i.push(u)}),A.waitFor(i).next(()=>this.xn(e,n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,i=n.length+1,s=cs(this.userId,n),o=IDBKeyRange.lowerBound(s);let c=new ne(z);return xn(e).J({range:o},(u,h,f)=>{const[m,I,S]=u,D=Xe(I);m===this.userId&&n.isPrefixOf(D)?D.length===i&&(c=c.add(S)):f.done()}).next(()=>this.xn(e,c))}xn(e,t){const n=[],i=[];return t.forEach(s=>{i.push(Dt(e).get(s).next(o=>{if(o===null)throw M();U(o.userId===this.userId),n.push(nn(this.serializer,o))}))}),A.waitFor(i).next(()=>n)}removeMutationBatch(e,t){return ip(e._e,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.On(t.batchId)}),A.forEach(n,i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))}On(e){delete this.Fn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return A.resolve();const n=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),i=[];return xn(e).J({range:n},(s,o,c)=>{if(s[0]===this.userId){const u=Xe(s[1]);i.push(u)}else c.done()}).next(()=>{U(i.length===0)})})}containsKey(e,t){return sp(e,this.userId,t)}Nn(e){return op(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}}function sp(r,e,t){const n=cs(e,t.path),i=n[1],s=IDBKeyRange.lowerBound(n);let o=!1;return xn(r).J({range:s,H:!0},(c,u,h)=>{const[f,m,I]=c;f===e&&m===i&&(o=!0),h.done()}).next(()=>o)}function Dt(r){return Ee(r,"mutations")}function xn(r){return Ee(r,"documentMutations")}function op(r){return Ee(r,"mutationQueues")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new yn(0)}static kn(){return new yn(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wT{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.qn(e).next(t=>{const n=new yn(t.highestTargetId);return t.highestTargetId=n.next(),this.Qn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.qn(e).next(t=>B.fromTimestamp(new le(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.qn(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.qn(e).next(i=>(i.highestListenSequenceNumber=t,n&&(i.lastRemoteSnapshotVersion=n.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.Qn(e,i)))}addTargetData(e,t){return this.Kn(e,t).next(()=>this.qn(e).next(n=>(n.targetCount+=1,this.$n(t,n),this.Qn(e,n))))}updateTargetData(e,t){return this.Kn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Dn(e).delete(t.targetId)).next(()=>this.qn(e)).next(n=>(U(n.targetCount>0),n.targetCount-=1,this.Qn(e,n)))}removeTargets(e,t,n){let i=0;const s=[];return Dn(e).J((o,c)=>{const u=jr(c);u.sequenceNumber<=t&&n.get(u.targetId)===null&&(i++,s.push(this.removeTargetData(e,u)))}).next(()=>A.waitFor(s)).next(()=>i)}forEachTarget(e,t){return Dn(e).J((n,i)=>{const s=jr(i);t(s)})}qn(e){return oh(e).get("targetGlobalKey").next(t=>(U(t!==null),t))}Qn(e,t){return oh(e).put("targetGlobalKey",t)}Kn(e,t){return Dn(e).put(ep(this.serializer,t))}$n(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.qn(e).next(t=>t.targetCount)}getTargetData(e,t){const n=mn(t),i=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let s=null;return Dn(e).J({range:i,index:"queryTargetsIndex"},(o,c,u)=>{const h=jr(c);Ii(t,h.target)&&(s=h,u.done())}).next(()=>s)}addMatchingKeys(e,t,n){const i=[],s=Vt(e);return t.forEach(o=>{const c=Me(o.path);i.push(s.put({targetId:n,path:c})),i.push(this.referenceDelegate.addReference(e,n,o))}),A.waitFor(i)}removeMatchingKeys(e,t,n){const i=Vt(e);return A.forEach(t,s=>{const o=Me(s.path);return A.waitFor([i.delete([n,o]),this.referenceDelegate.removeReference(e,n,s)])})}removeMatchingKeysForTargetId(e,t){const n=Vt(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(i)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),i=Vt(e);let s=$();return i.J({range:n,H:!0},(o,c,u)=>{const h=Xe(o[1]),f=new L(h);s=s.add(f)}).next(()=>s)}containsKey(e,t){const n=Me(t.path),i=IDBKeyRange.bound([n],[Zd(n)],!1,!0);let s=0;return Vt(e).J({index:"documentTargetsIndex",H:!0,range:i},([o,c],u,h)=>{o!==0&&(s++,h.done())}).next(()=>s>0)}ot(e,t){return Dn(e).get(t).next(n=>n?jr(n):null)}}function Dn(r){return Ee(r,"targets")}function oh(r){return Ee(r,"targetGlobal")}function Vt(r){return Ee(r,"targetDocuments")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ah([r,e],[t,n]){const i=z(r,t);return i===0?z(e,n):i}class AT{constructor(e){this.Un=e,this.buffer=new ne(ah),this.Wn=0}Gn(){return++this.Wn}zn(e){const t=[e,this.Gn()];if(this.buffer.size<this.Un)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();ah(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class RT{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Hn(6e4)}stop(){this.jn&&(this.jn.cancel(),this.jn=null)}get started(){return this.jn!==null}Hn(e){C("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Kt(t)?C("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await zt(t)}await this.Hn(3e5)})}}class ST{constructor(e,t){this.Jn=e,this.params=t}calculateTargetCount(e,t){return this.Jn.Yn(e).next(n=>Math.floor(t/100*n))}nthSequenceNumber(e,t){if(t===0)return A.resolve(qe.oe);const n=new AT(t);return this.Jn.forEachTarget(e,i=>n.zn(i.sequenceNumber)).next(()=>this.Jn.Zn(e,i=>n.zn(i))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.Jn.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Jn.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(C("LruGarbageCollector","Garbage collection skipped; disabled"),A.resolve(sh)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(C("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),sh):this.Xn(e,t))}getCacheSize(e){return this.Jn.getCacheSize(e)}Xn(e,t){let n,i,s,o,c,u,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?(C("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),i=this.params.maximumSequenceNumbersToCollect):i=m,o=Date.now(),this.nthSequenceNumber(e,i))).next(m=>(n=m,c=Date.now(),this.removeTargets(e,n,t))).next(m=>(s=m,u=Date.now(),this.removeOrphanedDocuments(e,n))).next(m=>(h=Date.now(),Vn()<=H.DEBUG&&C("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${i} in `+(c-o)+`ms
	Removed ${s} targets in `+(u-c)+`ms
	Removed ${m} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),A.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:m})))}}function bT(r,e){return new ST(r,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PT{constructor(e,t){this.db=e,this.garbageCollector=bT(this,t)}Yn(e){const t=this.er(e);return this.db.getTargetCache().getTargetCount(e).next(n=>t.next(i=>n+i))}er(e){let t=0;return this.Zn(e,n=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Zn(e,t){return this.tr(e,(n,i)=>t(i))}addReference(e,t,n){return Zi(e,n)}removeReference(e,t,n){return Zi(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return Zi(e,t)}nr(e,t){return function(i,s){let o=!1;return op(i).Y(c=>sp(i,c,s).next(u=>(u&&(o=!0),A.resolve(!u)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let s=0;return this.tr(e,(o,c)=>{if(c<=t){const u=this.nr(e,o).next(h=>{if(!h)return s++,n.getEntry(e,o).next(()=>(n.removeEntry(o,B.min()),Vt(e).delete(function(m){return[0,Me(m.path)]}(o))))});i.push(u)}}).next(()=>A.waitFor(i)).next(()=>n.apply(e)).next(()=>s)}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return Zi(e,t)}tr(e,t){const n=Vt(e);let i,s=qe.oe;return n.J({index:"documentTargetsIndex"},([o,c],{path:u,sequenceNumber:h})=>{o===0?(s!==qe.oe&&t(new L(Xe(i)),s),s=h,i=u):s=qe.oe}).next(()=>{s!==qe.oe&&t(new L(Xe(i)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Zi(r,e){return Vt(r).put(function(n,i){return{targetId:0,path:Me(n.path),sequenceNumber:i}}(e,r.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ap{constructor(){this.changes=new $t(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,de.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?A.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CT{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return Xt(e).put(n)}removeEntry(e,t,n){return Xt(e).delete(function(s,o){const c=s.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],bs(o),c[c.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.rr(e,n)))}getEntry(e,t){let n=de.newInvalidDocument(t);return Xt(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Or(t))},(i,s)=>{n=this.ir(t,s)}).next(()=>n)}sr(e,t){let n={size:0,document:de.newInvalidDocument(t)};return Xt(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Or(t))},(i,s)=>{n={document:this.ir(t,s),size:Cs(s)}}).next(()=>n)}getEntries(e,t){let n=Ke();return this._r(e,t,(i,s)=>{const o=this.ir(i,s);n=n.insert(i,o)}).next(()=>n)}ar(e,t){let n=Ke(),i=new ie(L.comparator);return this._r(e,t,(s,o)=>{const c=this.ir(s,o);n=n.insert(s,c),i=i.insert(s,Cs(o))}).next(()=>({documents:n,ur:i}))}_r(e,t,n){if(t.isEmpty())return A.resolve();let i=new ne(lh);t.forEach(u=>i=i.add(u));const s=IDBKeyRange.bound(Or(i.first()),Or(i.last())),o=i.getIterator();let c=o.getNext();return Xt(e).J({index:"documentKeyIndex",range:s},(u,h,f)=>{const m=L.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;c&&lh(c,m)<0;)n(c,null),c=o.getNext();c&&c.isEqual(m)&&(n(c,h),c=o.hasNext()?o.getNext():null),c?f.$(Or(c)):f.done()}).next(()=>{for(;c;)n(c,null),c=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,n,i,s){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),bs(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],u=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Xt(e).U(IDBKeyRange.bound(c,u,!0)).next(h=>{s==null||s.incrementDocumentReadCount(h.length);let f=Ke();for(const m of h){const I=this.ir(L.fromSegments(m.prefixPath.concat(m.collectionGroup,m.documentId)),m);I.isFoundDocument()&&(vi(t,I)||i.has(I.key))&&(f=f.insert(I.key,I))}return f})}getAllFromCollectionGroup(e,t,n,i){let s=Ke();const o=uh(t,n),c=uh(t,We.max());return Xt(e).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(o,c,!0)},(u,h,f)=>{const m=this.ir(L.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);s=s.insert(m.key,m),s.size===i&&f.done()}).next(()=>s)}newChangeBuffer(e){return new DT(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return ch(e).get("remoteDocumentGlobalKey").next(t=>(U(!!t),t))}rr(e,t){return ch(e).put("remoteDocumentGlobalKey",t)}ir(e,t){if(t){const n=fT(this.serializer,t);if(!(n.isNoDocument()&&n.version.isEqual(B.min())))return n}return de.newInvalidDocument(e)}}function cp(r){return new CT(r)}class DT extends ap{constructor(e,t){super(),this.cr=e,this.trackRemovals=t,this.lr=new $t(n=>n.toString(),(n,i)=>n.isEqual(i))}applyChanges(e){const t=[];let n=0,i=new ne((s,o)=>z(s.canonicalString(),o.canonicalString()));return this.changes.forEach((s,o)=>{const c=this.lr.get(s);if(t.push(this.cr.removeEntry(e,s,c.readTime)),o.isValidDocument()){const u=Hl(this.cr.serializer,o);i=i.add(s.path.popLast());const h=Cs(u);n+=h-c.size,t.push(this.cr.addEntry(e,s,u))}else if(n-=c.size,this.trackRemovals){const u=Hl(this.cr.serializer,o.convertToNoDocument(B.min()));t.push(this.cr.addEntry(e,s,u))}}),i.forEach(s=>{t.push(this.cr.indexManager.addToCollectionParentIndex(e,s))}),t.push(this.cr.updateMetadata(e,n)),A.waitFor(t)}getFromCache(e,t){return this.cr.sr(e,t).next(n=>(this.lr.set(t,{size:n.size,readTime:n.document.readTime}),n.document))}getAllFromCache(e,t){return this.cr.ar(e,t).next(({documents:n,ur:i})=>(i.forEach((s,o)=>{this.lr.set(s,{size:o,readTime:n.get(s).readTime})}),n))}}function ch(r){return Ee(r,"remoteDocumentGlobal")}function Xt(r){return Ee(r,"remoteDocumentsV14")}function Or(r){const e=r.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function uh(r,e){const t=e.documentKey.path.toArray();return[r,bs(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function lh(r,e){const t=r.path.toArray(),n=e.path.toArray();let i=0;for(let s=0;s<t.length-2&&s<n.length-2;++s)if(i=z(t[s],n[s]),i)return i;return i=z(t.length,n.length),i||(i=z(t[t.length-2],n[n.length-2]),i||z(t[t.length-1],n[n.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VT{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class up{constructor(e,t,n,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=i}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(n=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(n!==null&&Hr(n.mutation,i,je.empty(),le.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.getLocalViewOfDocuments(e,n,$()).next(()=>n))}getLocalViewOfDocuments(e,t,n=$()){const i=Ze();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,n).next(s=>{let o=Br();return s.forEach((c,u)=>{o=o.insert(c,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const n=Ze();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,$()))}populateOverlays(e,t,n){const i=[];return n.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,n,i){let s=Ke();const o=Wr(),c=function(){return Wr()}();return t.forEach((u,h)=>{const f=n.get(h.key);i.has(h.key)&&(f===void 0||f.mutation instanceof wt)?s=s.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),Hr(f.mutation,h,f.mutation.getFieldMask(),le.now())):o.set(h.key,je.empty())}),this.recalculateAndSaveOverlays(e,s).next(u=>(u.forEach((h,f)=>o.set(h,f)),t.forEach((h,f)=>{var m;return c.set(h,new VT(f,(m=o.get(h))!==null&&m!==void 0?m:null))}),c))}recalculateAndSaveOverlays(e,t){const n=Wr();let i=new ie((o,c)=>o-c),s=$();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const c of o)c.keys().forEach(u=>{const h=t.get(u);if(h===null)return;let f=n.get(u)||je.empty();f=c.applyToLocalView(h,f),n.set(u,f);const m=(i.get(c.batchId)||$()).add(u);i=i.insert(c.batchId,m)})}).next(()=>{const o=[],c=i.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),h=u.key,f=u.value,m=Cf();f.forEach(I=>{if(!s.has(I)){const S=Lf(t.get(I),n.get(I));S!==null&&m.set(I,S),s=s.add(I)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,m))}return A.waitFor(o)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.recalculateAndSaveOverlays(e,n))}getDocumentsMatchingQuery(e,t,n,i){return function(o){return L.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):sc(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,i):this.getDocumentsMatchingCollectionQuery(e,t,n,i)}getNextDocuments(e,t,n,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,i-s.size):A.resolve(Ze());let c=-1,u=s;return o.next(h=>A.forEach(h,(f,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),s.get(f)?A.resolve():this.remoteDocumentCache.getEntry(e,f).next(I=>{u=u.insert(f,I)}))).next(()=>this.populateOverlays(e,h,s)).next(()=>this.computeViews(e,u,h,$())).next(f=>({batchId:c,changes:Pf(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new L(t)).next(n=>{let i=Br();return n.isFoundDocument()&&(i=i.insert(n.key,n)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,n,i){const s=t.collectionGroup;let o=Br();return this.indexManager.getCollectionParents(e,s).next(c=>A.forEach(c,u=>{const h=function(m,I){return new En(I,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(t,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,h,n,i).next(f=>{f.forEach((m,I)=>{o=o.insert(m,I)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,n,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,s,i))).next(o=>{s.forEach((u,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,de.newInvalidDocument(f)))});let c=Br();return o.forEach((u,h)=>{const f=s.get(u);f!==void 0&&Hr(f.mutation,h,je.empty(),le.now()),vi(t,h)&&(c=c.insert(u,h))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NT{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return A.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:Fe(i.createTime)}}(t)),A.resolve()}getNamedQuery(e,t){return A.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(i){return{name:i.name,query:tp(i.bundledQuery),readTime:Fe(i.readTime)}}(t)),A.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kT{constructor(){this.overlays=new ie(L.comparator),this.Ir=new Map}getOverlay(e,t){return A.resolve(this.overlays.get(t))}getOverlays(e,t){const n=Ze();return A.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&n.set(i,s)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((i,s)=>{this.ht(e,t,s)}),A.resolve()}removeOverlaysForBatchId(e,t,n){const i=this.Ir.get(n);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Ir.delete(n)),A.resolve()}getOverlaysForCollection(e,t,n){const i=Ze(),s=t.length+1,o=new L(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===s&&u.largestBatchId>n&&i.set(u.getKey(),u)}return A.resolve(i)}getOverlaysForCollectionGroup(e,t,n,i){let s=new ie((h,f)=>h-f);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>n){let f=s.get(h.largestBatchId);f===null&&(f=Ze(),s=s.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=Ze(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((h,f)=>c.set(h,f)),!(c.size()>=i)););return A.resolve(c)}ht(e,t,n){const i=this.overlays.get(n.key);if(i!==null){const o=this.Ir.get(i.largestBatchId).delete(n.key);this.Ir.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(n.key,new lc(t,n));let s=this.Ir.get(t);s===void 0&&(s=$(),this.Ir.set(t,s)),this.Ir.set(t,s.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OT{constructor(){this.sessionToken=ge.EMPTY_BYTE_STRING}getSessionToken(e){return A.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,A.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mc{constructor(){this.Tr=new ne(Te.Er),this.dr=new ne(Te.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const n=new Te(e,t);this.Tr=this.Tr.add(n),this.dr=this.dr.add(n)}Rr(e,t){e.forEach(n=>this.addReference(n,t))}removeReference(e,t){this.Vr(new Te(e,t))}mr(e,t){e.forEach(n=>this.removeReference(n,t))}gr(e){const t=new L(new Z([])),n=new Te(t,e),i=new Te(t,e+1),s=[];return this.dr.forEachInRange([n,i],o=>{this.Vr(o),s.push(o.key)}),s}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new L(new Z([])),n=new Te(t,e),i=new Te(t,e+1);let s=$();return this.dr.forEachInRange([n,i],o=>{s=s.add(o.key)}),s}containsKey(e){const t=new Te(e,0),n=this.Tr.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class Te{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return L.comparator(e.key,t.key)||z(e.wr,t.wr)}static Ar(e,t){return z(e.wr,t.wr)||L.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xT{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new ne(Te.Er)}checkEmpty(e){return A.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,i){const s=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new cc(s,t,n,i);this.mutationQueue.push(o);for(const c of i)this.br=this.br.add(new Te(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return A.resolve(o)}lookupMutationBatch(e,t){return A.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,i=this.vr(n),s=i<0?0:i;return A.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return A.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return A.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new Te(t,0),i=new Te(t,Number.POSITIVE_INFINITY),s=[];return this.br.forEachInRange([n,i],o=>{const c=this.Dr(o.wr);s.push(c)}),A.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new ne(z);return t.forEach(i=>{const s=new Te(i,0),o=new Te(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([s,o],c=>{n=n.add(c.wr)})}),A.resolve(this.Cr(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,i=n.length+1;let s=n;L.isDocumentKey(s)||(s=s.child(""));const o=new Te(new L(s),0);let c=new ne(z);return this.br.forEachWhile(u=>{const h=u.key.path;return!!n.isPrefixOf(h)&&(h.length===i&&(c=c.add(u.wr)),!0)},o),A.resolve(this.Cr(c))}Cr(e){const t=[];return e.forEach(n=>{const i=this.Dr(n);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){U(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let n=this.br;return A.forEach(t.mutations,i=>{const s=new Te(i.key,t.batchId);return n=n.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.br=n})}On(e){}containsKey(e,t){const n=new Te(t,0),i=this.br.firstAfterOrEqual(n);return A.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,A.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LT{constructor(e){this.Mr=e,this.docs=function(){return new ie(L.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,i=this.docs.get(n),s=i?i.size:0,o=this.Mr(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return A.resolve(n?n.document.mutableCopy():de.newInvalidDocument(t))}getEntries(e,t){let n=Ke();return t.forEach(i=>{const s=this.docs.get(i);n=n.insert(i,s?s.document.mutableCopy():de.newInvalidDocument(i))}),A.resolve(n)}getDocumentsMatchingQuery(e,t,n,i){let s=Ke();const o=t.path,c=new L(o.child("")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||ec(tf(f),n)<=0||(i.has(f.key)||vi(t,f))&&(s=s.insert(f.key,f.mutableCopy()))}return A.resolve(s)}getAllFromCollectionGroup(e,t,n,i){M()}Or(e,t){return A.forEach(this.docs,n=>t(n))}newChangeBuffer(e){return new MT(this)}getSize(e){return A.resolve(this.size)}}class MT extends ap{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((n,i)=>{i.isValidDocument()?t.push(this.cr.addEntry(e,i)):this.cr.removeEntry(n)}),A.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FT{constructor(e){this.persistence=e,this.Nr=new $t(t=>mn(t),Ii),this.lastRemoteSnapshotVersion=B.min(),this.highestTargetId=0,this.Lr=0,this.Br=new mc,this.targetCount=0,this.kr=yn.Bn()}forEachTarget(e,t){return this.Nr.forEach((n,i)=>t(i)),A.resolve()}getLastRemoteSnapshotVersion(e){return A.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return A.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),A.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.Lr&&(this.Lr=t),A.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new yn(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,A.resolve()}updateTargetData(e,t){return this.Kn(t),A.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,A.resolve()}removeTargets(e,t,n){let i=0;const s=[];return this.Nr.forEach((o,c)=>{c.sequenceNumber<=t&&n.get(c.targetId)===null&&(this.Nr.delete(o),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),A.waitFor(s).next(()=>i)}getTargetCount(e){return A.resolve(this.targetCount)}getTargetData(e,t){const n=this.Nr.get(t)||null;return A.resolve(n)}addMatchingKeys(e,t,n){return this.Br.Rr(t,n),A.resolve()}removeMatchingKeys(e,t,n){this.Br.mr(t,n);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),A.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),A.resolve()}getMatchingKeysForTargetId(e,t){const n=this.Br.yr(t);return A.resolve(n)}containsKey(e,t){return A.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lp{constructor(e,t){this.qr={},this.overlays={},this.Qr=new qe(0),this.Kr=!1,this.Kr=!0,this.$r=new OT,this.referenceDelegate=e(this),this.Ur=new FT(this),this.indexManager=new ET,this.remoteDocumentCache=function(i){return new LT(i)}(n=>this.referenceDelegate.Wr(n)),this.serializer=new Zf(t),this.Gr=new NT(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new kT,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.qr[e.toKey()];return n||(n=new xT(t,this.referenceDelegate),this.qr[e.toKey()]=n),n}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,n){C("MemoryPersistence","Starting transaction:",e);const i=new UT(this.Qr.next());return this.referenceDelegate.zr(),n(i).next(s=>this.referenceDelegate.jr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Hr(e,t){return A.or(Object.values(this.qr).map(n=>()=>n.containsKey(e,t)))}}class UT extends rf{constructor(e){super(),this.currentSequenceNumber=e}}class ro{constructor(e){this.persistence=e,this.Jr=new mc,this.Yr=null}static Zr(e){return new ro(e)}get Xr(){if(this.Yr)return this.Yr;throw M()}addReference(e,t,n){return this.Jr.addReference(n,t),this.Xr.delete(n.toString()),A.resolve()}removeReference(e,t,n){return this.Jr.removeReference(n,t),this.Xr.add(n.toString()),A.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),A.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(i=>this.Xr.add(i.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.Xr.add(s.toString()))}).next(()=>n.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return A.forEach(this.Xr,n=>{const i=L.fromPath(n);return this.ei(e,i).next(s=>{s||t.removeEntry(i,B.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(n=>{n?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return A.or([()=>A.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BT{constructor(e){this.serializer=e}O(e,t,n,i){const s=new Ws("createOrUpgrade",t);n<1&&i>=1&&(function(u){u.createObjectStore("owner")}(e),function(u){u.createObjectStore("mutationQueues",{keyPath:"userId"}),u.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Al,{unique:!0}),u.createObjectStore("documentMutations")}(e),hh(e),function(u){u.createObjectStore("remoteDocuments")}(e));let o=A.resolve();return n<3&&i>=3&&(n!==0&&(function(u){u.deleteObjectStore("targetDocuments"),u.deleteObjectStore("targets"),u.deleteObjectStore("targetGlobal")}(e),hh(e)),o=o.next(()=>function(u){const h=u.store("targetGlobal"),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:B.min().toTimestamp(),targetCount:0};return h.put("targetGlobalKey",f)}(s))),n<4&&i>=4&&(n!==0&&(o=o.next(()=>function(u,h){return h.store("mutations").U().next(f=>{u.deleteObjectStore("mutations"),u.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Al,{unique:!0});const m=h.store("mutations"),I=f.map(S=>m.put(S));return A.waitFor(I)})}(e,s))),o=o.next(()=>{(function(u){u.createObjectStore("clientMetadata",{keyPath:"clientId"})})(e)})),n<5&&i>=5&&(o=o.next(()=>this.ni(s))),n<6&&i>=6&&(o=o.next(()=>(function(u){u.createObjectStore("remoteDocumentGlobal")}(e),this.ri(s)))),n<7&&i>=7&&(o=o.next(()=>this.ii(s))),n<8&&i>=8&&(o=o.next(()=>this.si(e,s))),n<9&&i>=9&&(o=o.next(()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)})),n<10&&i>=10&&(o=o.next(()=>this.oi(s))),n<11&&i>=11&&(o=o.next(()=>{(function(u){u.createObjectStore("bundles",{keyPath:"bundleId"})})(e),function(u){u.createObjectStore("namedQueries",{keyPath:"name"})}(e)})),n<12&&i>=12&&(o=o.next(()=>{(function(u){const h=u.createObjectStore("documentOverlays",{keyPath:yE});h.createIndex("collectionPathOverlayIndex",IE,{unique:!1}),h.createIndex("collectionGroupOverlayIndex",vE,{unique:!1})})(e)})),n<13&&i>=13&&(o=o.next(()=>function(u){const h=u.createObjectStore("remoteDocumentsV14",{keyPath:aE});h.createIndex("documentKeyIndex",cE),h.createIndex("collectionGroupIndex",uE)}(e)).next(()=>this._i(e,s)).next(()=>e.deleteObjectStore("remoteDocuments"))),n<14&&i>=14&&(o=o.next(()=>this.ai(e,s))),n<15&&i>=15&&(o=o.next(()=>function(u){u.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),u.createObjectStore("indexState",{keyPath:pE}).createIndex("sequenceNumberIndex",mE,{unique:!1}),u.createObjectStore("indexEntries",{keyPath:gE}).createIndex("documentKeyIndex",_E,{unique:!1})}(e))),n<16&&i>=16&&(o=o.next(()=>{t.objectStore("indexState").clear()}).next(()=>{t.objectStore("indexEntries").clear()})),n<17&&i>=17&&(o=o.next(()=>{(function(u){u.createObjectStore("globals",{keyPath:"name"})})(e)})),o}ri(e){let t=0;return e.store("remoteDocuments").J((n,i)=>{t+=Cs(i)}).next(()=>{const n={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",n)})}ni(e){const t=e.store("mutationQueues"),n=e.store("mutations");return t.U().next(i=>A.forEach(i,s=>{const o=IDBKeyRange.bound([s.userId,-1],[s.userId,s.lastAcknowledgedBatchId]);return n.U("userMutationsIndex",o).next(c=>A.forEach(c,u=>{U(u.userId===s.userId);const h=nn(this.serializer,u);return ip(e,s.userId,h).next(()=>{})}))}))}ii(e){const t=e.store("targetDocuments"),n=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next(i=>{const s=[];return n.J((o,c)=>{const u=new Z(o),h=function(m){return[0,Me(m)]}(u);s.push(t.get(h).next(f=>f?A.resolve():(m=>t.put({targetId:0,path:Me(m),sequenceNumber:i.highestListenSequenceNumber}))(u)))}).next(()=>A.waitFor(s))})}si(e,t){e.createObjectStore("collectionParents",{keyPath:fE});const n=t.store("collectionParents"),i=new pc,s=o=>{if(i.add(o)){const c=o.lastSegment(),u=o.popLast();return n.put({collectionId:c,parent:Me(u)})}};return t.store("remoteDocuments").J({H:!0},(o,c)=>{const u=new Z(o);return s(u.popLast())}).next(()=>t.store("documentMutations").J({H:!0},([o,c,u],h)=>{const f=Xe(c);return s(f.popLast())}))}oi(e){const t=e.store("targets");return t.J((n,i)=>{const s=jr(i),o=ep(this.serializer,s);return t.put(o)})}_i(e,t){const n=t.store("remoteDocuments"),i=[];return n.J((s,o)=>{const c=t.store("remoteDocumentsV14"),u=function(m){return m.document?new L(Z.fromString(m.document.name).popFirst(5)):m.noDocument?L.fromSegments(m.noDocument.path):m.unknownDocument?L.fromSegments(m.unknownDocument.path):M()}(o).path.toArray(),h={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(c.put(h))}).next(()=>A.waitFor(i))}ai(e,t){const n=t.store("mutations"),i=cp(this.serializer),s=new lp(ro.Zr,this.serializer.ct);return n.U().next(o=>{const c=new Map;return o.forEach(u=>{var h;let f=(h=c.get(u.userId))!==null&&h!==void 0?h:$();nn(this.serializer,u).keys().forEach(m=>f=f.add(m)),c.set(u.userId,f)}),A.forEach(c,(u,h)=>{const f=new Ve(h),m=to.lt(this.serializer,f),I=s.getIndexManager(f),S=no.lt(f,this.serializer,I,s.referenceDelegate);return new up(i,S,m,I).recalculateAndSaveOverlaysForDocumentKeys(new da(t,qe.oe),u).next()})})}}function hh(r){r.createObjectStore("targetDocuments",{keyPath:hE}).createIndex("documentTargetsIndex",dE,{unique:!0}),r.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",lE,{unique:!0}),r.createObjectStore("targetGlobal")}const Jo="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class gc{constructor(e,t,n,i,s,o,c,u,h,f,m=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.ui=s,this.window=o,this.document=c,this.ci=h,this.li=f,this.hi=m,this.Qr=null,this.Kr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Pi=null,this.inForeground=!1,this.Ii=null,this.Ti=null,this.Ei=Number.NEGATIVE_INFINITY,this.di=I=>Promise.resolve(),!gc.D())throw new V(P.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new PT(this,i),this.Ai=t+"main",this.serializer=new Zf(u),this.Ri=new Mt(this.Ai,this.hi,new BT(this.serializer)),this.$r=new mT,this.Ur=new wT(this.referenceDelegate,this.serializer),this.remoteDocumentCache=cp(this.serializer),this.Gr=new pT,this.window&&this.window.localStorage?this.Vi=this.window.localStorage:(this.Vi=null,f===!1&&pe("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.mi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new V(P.FAILED_PRECONDITION,Jo);return this.fi(),this.gi(),this.pi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Ur.getHighestSequenceNumber(e))}).then(e=>{this.Qr=new qe(e,this.ci)}).then(()=>{this.Kr=!0}).catch(e=>(this.Ri&&this.Ri.close(),Promise.reject(e)))}yi(e){return this.di=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ri.L(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.ui.enqueueAndForget(async()=>{this.started&&await this.mi()}))}mi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>es(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.wi(e).next(t=>{t||(this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)))})}).next(()=>this.Si(e)).next(t=>this.isPrimary&&!t?this.bi(e).next(()=>!1):!!t&&this.Di(e).next(()=>!0))).catch(e=>{if(Kt(e))return C("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return C("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.ui.enqueueRetryable(()=>this.di(e)),this.isPrimary=e})}wi(e){return xr(e).get("owner").next(t=>A.resolve(this.vi(t)))}Ci(e){return es(e).delete(this.clientId)}async Fi(){if(this.isPrimary&&!this.Mi(this.Ei,18e5)){this.Ei=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const n=Ee(t,"clientMetadata");return n.U().next(i=>{const s=this.xi(i,18e5),o=i.filter(c=>s.indexOf(c)===-1);return A.forEach(o,c=>n.delete(c.clientId)).next(()=>o)})}).catch(()=>[]);if(this.Vi)for(const t of e)this.Vi.removeItem(this.Oi(t.clientId))}}pi(){this.Ti=this.ui.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.mi().then(()=>this.Fi()).then(()=>this.pi()))}vi(e){return!!e&&e.ownerId===this.clientId}Si(e){return this.li?A.resolve(!0):xr(e).get("owner").next(t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)){if(this.vi(t)&&this.networkEnabled)return!0;if(!this.vi(t)){if(!t.allowTabSynchronization)throw new V(P.FAILED_PRECONDITION,Jo);return!1}}return!(!this.networkEnabled||!this.inForeground)||es(e).U().next(n=>this.xi(n,5e3).find(i=>{if(this.clientId!==i.clientId){const s=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,c=this.networkEnabled===i.networkEnabled;if(s||o&&c)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&C("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.Kr=!1,this.Li(),this.Ti&&(this.Ti.cancel(),this.Ti=null),this.Bi(),this.ki(),await this.Ri.runTransaction("shutdown","readwrite",["owner","clientMetadata"],e=>{const t=new da(e,qe.oe);return this.bi(t).next(()=>this.Ci(t))}),this.Ri.close(),this.qi()}xi(e,t){return e.filter(n=>this.Mi(n.updateTimeMs,t)&&!this.Ni(n.clientId))}Qi(){return this.runTransaction("getActiveClients","readonly",e=>es(e).U().next(t=>this.xi(t,18e5).map(n=>n.clientId)))}get started(){return this.Kr}getGlobalsCache(){return this.$r}getMutationQueue(e,t){return no.lt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new TT(e,this.serializer.ct.databaseId)}getDocumentOverlayCache(e){return to.lt(this.serializer,e)}getBundleCache(){return this.Gr}runTransaction(e,t,n){C("IndexedDbPersistence","Starting transaction:",e);const i=t==="readonly"?"readonly":"readwrite",s=function(u){return u===17?wE:u===16?TE:u===15?nc:u===14?lf:u===13?uf:u===12?EE:u===11?cf:void M()}(this.hi);let o;return this.Ri.runTransaction(e,i,s,c=>(o=new da(c,this.Qr?this.Qr.next():qe.oe),t==="readwrite-primary"?this.wi(o).next(u=>!!u||this.Si(o)).next(u=>{if(!u)throw pe(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)),new V(P.FAILED_PRECONDITION,nf);return n(o)}).next(u=>this.Di(o).next(()=>u)):this.Ki(o).next(()=>n(o)))).then(c=>(o.raiseOnCommittedEvent(),c))}Ki(e){return xr(e).get("owner").next(t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)&&!this.vi(t)&&!(this.li||this.allowTabSynchronization&&t.allowTabSynchronization))throw new V(P.FAILED_PRECONDITION,Jo)})}Di(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return xr(e).put("owner",t)}static D(){return Mt.D()}bi(e){const t=xr(e);return t.get("owner").next(n=>this.vi(n)?(C("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):A.resolve())}Mi(e,t){const n=Date.now();return!(e<n-t)&&(!(e>n)||(pe(`Detected an update time that is in the future: ${e} > ${n}`),!1))}fi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ii=()=>{this.ui.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.mi()))},this.document.addEventListener("visibilitychange",this.Ii),this.inForeground=this.document.visibilityState==="visible")}Bi(){this.Ii&&(this.document.removeEventListener("visibilitychange",this.Ii),this.Ii=null)}gi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Pi=()=>{this.Li();const t=/(?:Version|Mobile)\/1[456]/;xh()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.ui.enterRestrictedMode(!0),this.ui.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Pi))}ki(){this.Pi&&(this.window.removeEventListener("pagehide",this.Pi),this.Pi=null)}Ni(e){var t;try{const n=((t=this.Vi)===null||t===void 0?void 0:t.getItem(this.Oi(e)))!==null;return C("IndexedDbPersistence",`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return pe("IndexedDbPersistence","Failed to get zombied client id.",n),!1}}Li(){if(this.Vi)try{this.Vi.setItem(this.Oi(this.clientId),String(Date.now()))}catch(e){pe("Failed to set zombie client id.",e)}}qi(){if(this.Vi)try{this.Vi.removeItem(this.Oi(this.clientId))}catch{}}Oi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function xr(r){return Ee(r,"owner")}function es(r){return Ee(r,"clientMetadata")}function hp(r,e){let t=r.projectId;return r.isDefaultDatabase||(t+="."+r.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _c{constructor(e,t,n,i){this.targetId=e,this.fromCache=t,this.$i=n,this.Ui=i}static Wi(e,t){let n=$(),i=$();for(const s of t.docChanges)switch(s.type){case 0:n=n.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new _c(e,t.fromCache,n,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qT{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dp{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return xh()?8:sf(ve())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,n,i){const s={result:null};return this.Yi(e,t).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.Zi(e,t,i,n).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new qT;return this.Xi(e,t,o).next(c=>{if(s.result=c,this.zi)return this.es(e,t,o,c.size)})}).next(()=>s.result)}es(e,t,n,i){return n.documentReadCount<this.ji?(Vn()<=H.DEBUG&&C("QueryEngine","SDK will not create cache indexes for query:",Nn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),A.resolve()):(Vn()<=H.DEBUG&&C("QueryEngine","Query:",Nn(t),"scans",n.documentReadCount,"local documents and returns",i,"documents as results."),n.documentReadCount>this.Hi*i?(Vn()<=H.DEBUG&&C("QueryEngine","The SDK decides to create cache indexes for query:",Nn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,$e(t))):A.resolve())}Yi(e,t){if(Ml(t))return A.resolve(null);let n=$e(t);return this.indexManager.getIndexType(e,n).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=As(t,null,"F"),n=$e(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(s=>{const o=$(...s);return this.Ji.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,n).next(u=>{const h=this.ts(t,c);return this.ns(t,h,o,u.readTime)?this.Yi(e,As(t,null,"F")):this.rs(e,h,t,u)}))})))}Zi(e,t,n,i){return Ml(t)||i.isEqual(B.min())?A.resolve(null):this.Ji.getDocuments(e,n).next(s=>{const o=this.ts(t,s);return this.ns(t,o,n,i)?A.resolve(null):(Vn()<=H.DEBUG&&C("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Nn(t)),this.rs(e,o,t,ef(i,-1)).next(c=>c))})}ts(e,t){let n=new ne(Sf(e));return t.forEach((i,s)=>{vi(e,s)&&(n=n.add(s))}),n}ns(e,t,n,i){if(e.limit===null)return!1;if(n.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Xi(e,t,n){return Vn()<=H.DEBUG&&C("QueryEngine","Using full collection scan to execute query:",Nn(t)),this.Ji.getDocumentsMatchingQuery(e,t,We.min(),n)}rs(e,t,n,i){return this.Ji.getDocumentsMatchingQuery(e,n,i).next(s=>(t.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jT{constructor(e,t,n,i){this.persistence=e,this.ss=t,this.serializer=i,this.os=new ie(z),this._s=new $t(s=>mn(s),Ii),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(n)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new up(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function fp(r,e,t,n){return new jT(r,e,t,n)}async function pp(r,e){const t=F(r);return await t.persistence.runTransaction("Handle user change","readonly",n=>{let i;return t.mutationQueue.getAllMutationBatches(n).next(s=>(i=s,t.ls(e),t.mutationQueue.getAllMutationBatches(n))).next(s=>{const o=[],c=[];let u=$();for(const h of i){o.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of s){c.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(n,u).next(h=>({hs:h,removedBatchIds:o,addedBatchIds:c}))})})}function GT(r,e){const t=F(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const i=e.batch.keys(),s=t.cs.newChangeBuffer({trackRemovals:!0});return function(c,u,h,f){const m=h.batch,I=m.keys();let S=A.resolve();return I.forEach(D=>{S=S.next(()=>f.getEntry(u,D)).next(O=>{const N=h.docVersions.get(D);U(N!==null),O.version.compareTo(N)<0&&(m.applyToRemoteDocument(O,h),O.isValidDocument()&&(O.setReadTime(h.commitVersion),f.addEntry(O)))})}),S.next(()=>c.mutationQueue.removeMutationBatch(u,m))}(t,n,e,s).next(()=>s.apply(n)).next(()=>t.mutationQueue.performConsistencyCheck(n)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(n,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(c){let u=$();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(u=u.add(c.batch.mutations[h].key));return u}(e))).next(()=>t.localDocuments.getDocuments(n,i))})}function mp(r){const e=F(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function zT(r,e){const t=F(r),n=e.snapshotVersion;let i=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=t.cs.newChangeBuffer({trackRemovals:!0});i=t.os;const c=[];e.targetChanges.forEach((f,m)=>{const I=i.get(m);if(!I)return;c.push(t.Ur.removeMatchingKeys(s,f.removedDocuments,m).next(()=>t.Ur.addMatchingKeys(s,f.addedDocuments,m)));let S=I.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(m)!==null?S=S.withResumeToken(ge.EMPTY_BYTE_STRING,B.min()).withLastLimboFreeSnapshotVersion(B.min()):f.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(f.resumeToken,n)),i=i.insert(m,S),function(O,N,K){return O.resumeToken.approximateByteSize()===0||N.snapshotVersion.toMicroseconds()-O.snapshotVersion.toMicroseconds()>=3e8?!0:K.addedDocuments.size+K.modifiedDocuments.size+K.removedDocuments.size>0}(I,S,f)&&c.push(t.Ur.updateTargetData(s,S))});let u=Ke(),h=$();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,f))}),c.push(KT(s,o,e.documentUpdates).next(f=>{u=f.Ps,h=f.Is})),!n.isEqual(B.min())){const f=t.Ur.getLastRemoteSnapshotVersion(s).next(m=>t.Ur.setTargetsMetadata(s,s.currentSequenceNumber,n));c.push(f)}return A.waitFor(c).next(()=>o.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,u,h)).next(()=>u)}).then(s=>(t.os=i,s))}function KT(r,e,t){let n=$(),i=$();return t.forEach(s=>n=n.add(s)),e.getEntries(r,n).next(s=>{let o=Ke();return t.forEach((c,u)=>{const h=s.get(c);u.isFoundDocument()!==h.isFoundDocument()&&(i=i.add(c)),u.isNoDocument()&&u.version.isEqual(B.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):C("LocalStore","Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)}),{Ps:o,Is:i}})}function $T(r,e){const t=F(r);return t.persistence.runTransaction("Get next mutation batch","readonly",n=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e)))}function Ds(r,e){const t=F(r);return t.persistence.runTransaction("Allocate target","readwrite",n=>{let i;return t.Ur.getTargetData(n,e).next(s=>s?(i=s,A.resolve(i)):t.Ur.allocateTargetId(n).next(o=>(i=new pt(e,o,"TargetPurposeListen",n.currentSequenceNumber),t.Ur.addTargetData(n,i).next(()=>i))))}).then(n=>{const i=t.os.get(n.targetId);return(i===null||n.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.os=t.os.insert(n.targetId,n),t._s.set(e,n.targetId)),n})}async function Yn(r,e,t){const n=F(r),i=n.os.get(e),s=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",s,o=>n.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!Kt(o))throw o;C("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}n.os=n.os.remove(e),n._s.delete(i.target)}function Vs(r,e,t){const n=F(r);let i=B.min(),s=$();return n.persistence.runTransaction("Execute query","readwrite",o=>function(u,h,f){const m=F(u),I=m._s.get(f);return I!==void 0?A.resolve(m.os.get(I)):m.Ur.getTargetData(h,f)}(n,o,$e(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,n.Ur.getMatchingKeysForTargetId(o,c.targetId).next(u=>{s=u})}).next(()=>n.ss.getDocumentsMatchingQuery(o,e,t?i:B.min(),t?s:$())).next(c=>(yp(n,Rf(e),c),{documents:c,Ts:s})))}function gp(r,e){const t=F(r),n=F(t.Ur),i=t.os.get(e);return i?Promise.resolve(i.target):t.persistence.runTransaction("Get target data","readonly",s=>n.ot(s,e).next(o=>o?o.target:null))}function _p(r,e){const t=F(r),n=t.us.get(e)||B.min();return t.persistence.runTransaction("Get new document changes","readonly",i=>t.cs.getAllFromCollectionGroup(i,e,ef(n,-1),Number.MAX_SAFE_INTEGER)).then(i=>(yp(t,e,i),i))}function yp(r,e,t){let n=r.us.get(e)||B.min();t.forEach((i,s)=>{s.readTime.compareTo(n)>0&&(n=s.readTime)}),r.us.set(e,n)}function dh(r,e){return`firestore_clients_${r}_${e}`}function fh(r,e,t){let n=`firestore_mutations_${r}_${t}`;return e.isAuthenticated()&&(n+=`_${e.uid}`),n}function Yo(r,e){return`firestore_targets_${r}_${e}`}class Ns{constructor(e,t,n,i){this.user=e,this.batchId=t,this.state=n,this.error=i}static Rs(e,t,n){const i=JSON.parse(n);let s,o=typeof i=="object"&&["pending","acknowledged","rejected"].indexOf(i.state)!==-1&&(i.error===void 0||typeof i.error=="object");return o&&i.error&&(o=typeof i.error.message=="string"&&typeof i.error.code=="string",o&&(s=new V(i.error.code,i.error.message))),o?new Ns(e,t,i.state,s):(pe("SharedClientState",`Failed to parse mutation state for ID '${t}': ${n}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Qr{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static Rs(e,t){const n=JSON.parse(t);let i,s=typeof n=="object"&&["not-current","current","rejected"].indexOf(n.state)!==-1&&(n.error===void 0||typeof n.error=="object");return s&&n.error&&(s=typeof n.error.message=="string"&&typeof n.error.code=="string",s&&(i=new V(n.error.code,n.error.message))),s?new Qr(e,n.state,i):(pe("SharedClientState",`Failed to parse target state for ID '${e}': ${t}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class ks{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static Rs(e,t){const n=JSON.parse(t);let i=typeof n=="object"&&n.activeTargetIds instanceof Array,s=oc();for(let o=0;i&&o<n.activeTargetIds.length;++o)i=of(n.activeTargetIds[o]),s=s.add(n.activeTargetIds[o]);return i?new ks(e,s):(pe("SharedClientState",`Failed to parse client data for instance '${e}': ${t}`),null)}}class yc{constructor(e,t){this.clientId=e,this.onlineState=t}static Rs(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new yc(t.clientId,t.onlineState):(pe("SharedClientState",`Failed to parse online state: ${e}`),null)}}class Sa{constructor(){this.activeTargetIds=oc()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Xo{constructor(e,t,n,i,s){this.window=e,this.ui=t,this.persistenceKey=n,this.ps=i,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.ys=this.ws.bind(this),this.Ss=new ie(z),this.started=!1,this.bs=[];const o=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.Ds=dh(this.persistenceKey,this.ps),this.vs=function(u){return`firestore_sequence_number_${u}`}(this.persistenceKey),this.Ss=this.Ss.insert(this.ps,new Sa),this.Cs=new RegExp(`^firestore_clients_${o}_([^_]*)$`),this.Fs=new RegExp(`^firestore_mutations_${o}_(\\d+)(?:_(.*))?$`),this.Ms=new RegExp(`^firestore_targets_${o}_(\\d+)$`),this.xs=function(u){return`firestore_online_state_${u}`}(this.persistenceKey),this.Os=function(u){return`firestore_bundle_loaded_v2_${u}`}(this.persistenceKey),this.window.addEventListener("storage",this.ys)}static D(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.Qi();for(const n of e){if(n===this.ps)continue;const i=this.getItem(dh(this.persistenceKey,n));if(i){const s=ks.Rs(n,i);s&&(this.Ss=this.Ss.insert(s.clientId,s))}}this.Ns();const t=this.storage.getItem(this.xs);if(t){const n=this.Ls(t);n&&this.Bs(n)}for(const n of this.bs)this.ws(n);this.bs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.vs,JSON.stringify(e))}getAllActiveQueryTargets(){return this.ks(this.Ss)}isActiveQueryTarget(e){let t=!1;return this.Ss.forEach((n,i)=>{i.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.qs(e,"pending")}updateMutationState(e,t,n){this.qs(e,t,n),this.Qs(e)}addLocalQueryTarget(e,t=!0){let n="not-current";if(this.isActiveQueryTarget(e)){const i=this.storage.getItem(Yo(this.persistenceKey,e));if(i){const s=Qr.Rs(e,i);s&&(n=s.state)}}return t&&this.Ks.fs(e),this.Ns(),n}removeLocalQueryTarget(e){this.Ks.gs(e),this.Ns()}isLocalQueryTarget(e){return this.Ks.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(Yo(this.persistenceKey,e))}updateQueryState(e,t,n){this.$s(e,t,n)}handleUserChange(e,t,n){t.forEach(i=>{this.Qs(i)}),this.currentUser=e,n.forEach(i=>{this.addPendingMutation(i)})}setOnlineState(e){this.Us(e)}notifyBundleLoaded(e){this.Ws(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.ys),this.removeItem(this.Ds),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return C("SharedClientState","READ",e,t),t}setItem(e,t){C("SharedClientState","SET",e,t),this.storage.setItem(e,t)}removeItem(e){C("SharedClientState","REMOVE",e),this.storage.removeItem(e)}ws(e){const t=e;if(t.storageArea===this.storage){if(C("SharedClientState","EVENT",t.key,t.newValue),t.key===this.Ds)return void pe("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.ui.enqueueRetryable(async()=>{if(this.started){if(t.key!==null){if(this.Cs.test(t.key)){if(t.newValue==null){const n=this.Gs(t.key);return this.zs(n,null)}{const n=this.js(t.key,t.newValue);if(n)return this.zs(n.clientId,n)}}else if(this.Fs.test(t.key)){if(t.newValue!==null){const n=this.Hs(t.key,t.newValue);if(n)return this.Js(n)}}else if(this.Ms.test(t.key)){if(t.newValue!==null){const n=this.Ys(t.key,t.newValue);if(n)return this.Zs(n)}}else if(t.key===this.xs){if(t.newValue!==null){const n=this.Ls(t.newValue);if(n)return this.Bs(n)}}else if(t.key===this.vs){const n=function(s){let o=qe.oe;if(s!=null)try{const c=JSON.parse(s);U(typeof c=="number"),o=c}catch(c){pe("SharedClientState","Failed to read sequence number from WebStorage",c)}return o}(t.newValue);n!==qe.oe&&this.sequenceNumberHandler(n)}else if(t.key===this.Os){const n=this.Xs(t.newValue);await Promise.all(n.map(i=>this.syncEngine.eo(i)))}}}else this.bs.push(t)})}}get Ks(){return this.Ss.get(this.ps)}Ns(){this.setItem(this.Ds,this.Ks.Vs())}qs(e,t,n){const i=new Ns(this.currentUser,e,t,n),s=fh(this.persistenceKey,this.currentUser,e);this.setItem(s,i.Vs())}Qs(e){const t=fh(this.persistenceKey,this.currentUser,e);this.removeItem(t)}Us(e){const t={clientId:this.ps,onlineState:e};this.storage.setItem(this.xs,JSON.stringify(t))}$s(e,t,n){const i=Yo(this.persistenceKey,e),s=new Qr(e,t,n);this.setItem(i,s.Vs())}Ws(e){const t=JSON.stringify(Array.from(e));this.setItem(this.Os,t)}Gs(e){const t=this.Cs.exec(e);return t?t[1]:null}js(e,t){const n=this.Gs(e);return ks.Rs(n,t)}Hs(e,t){const n=this.Fs.exec(e),i=Number(n[1]),s=n[2]!==void 0?n[2]:null;return Ns.Rs(new Ve(s),i,t)}Ys(e,t){const n=this.Ms.exec(e),i=Number(n[1]);return Qr.Rs(i,t)}Ls(e){return yc.Rs(e)}Xs(e){return JSON.parse(e)}async Js(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.no(e.batchId,e.state,e.error);C("SharedClientState",`Ignoring mutation for non-active user ${e.user.uid}`)}Zs(e){return this.syncEngine.ro(e.targetId,e.state,e.error)}zs(e,t){const n=t?this.Ss.insert(e,t):this.Ss.remove(e),i=this.ks(this.Ss),s=this.ks(n),o=[],c=[];return s.forEach(u=>{i.has(u)||o.push(u)}),i.forEach(u=>{s.has(u)||c.push(u)}),this.syncEngine.io(o,c).then(()=>{this.Ss=n})}Bs(e){this.Ss.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}ks(e){let t=oc();return e.forEach((n,i)=>{t=t.unionWith(i.activeTargetIds)}),t}}class Ip{constructor(){this.so=new Sa,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,n){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new Sa,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WT{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ph{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){C("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){C("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ts=null;function Zo(){return ts===null?ts=function(){return 268435456+Math.round(2147483648*Math.random())}():ts++,"0x"+ts.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HT={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QT{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const De="WebChannelConnection";class JT extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const n=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Do=n+"://"+t.host,this.vo=`projects/${i}/databases/${s}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Fo(){return!1}Mo(t,n,i,s,o){const c=Zo(),u=this.xo(t,n.toUriEncodedString());C("RestConnection",`Sending RPC '${t}' ${c}:`,u,i);const h={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(h,s,o),this.No(t,u,h,i).then(f=>(C("RestConnection",`Received RPC '${t}' ${c}: `,f),f),f=>{throw ri("RestConnection",`RPC '${t}' ${c} failed with error: `,f,"url: ",u,"request:",i),f})}Lo(t,n,i,s,o,c){return this.Mo(t,n,i,s,o)}Oo(t,n,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+cr}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((s,o)=>t[o]=s),i&&i.headers.forEach((s,o)=>t[o]=s)}xo(t,n){const i=HT[t];return`${this.Do}/v1/${n}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,n,i){const s=Zo();return new Promise((o,c)=>{const u=new Wd;u.setWithCredentials(!0),u.listenOnce(Hd.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case os.NO_ERROR:const f=u.getResponseJson();C(De,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(f)),o(f);break;case os.TIMEOUT:C(De,`RPC '${e}' ${s} timed out`),c(new V(P.DEADLINE_EXCEEDED,"Request time out"));break;case os.HTTP_ERROR:const m=u.getStatus();if(C(De,`RPC '${e}' ${s} failed with status:`,m,"response text:",u.getResponseText()),m>0){let I=u.getResponseJson();Array.isArray(I)&&(I=I[0]);const S=I==null?void 0:I.error;if(S&&S.status&&S.message){const D=function(N){const K=N.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(K)>=0?K:P.UNKNOWN}(S.status);c(new V(D,S.message))}else c(new V(P.UNKNOWN,"Server responded with status "+u.getStatus()))}else c(new V(P.UNAVAILABLE,"Connection failed."));break;default:M()}}finally{C(De,`RPC '${e}' ${s} completed.`)}});const h=JSON.stringify(i);C(De,`RPC '${e}' ${s} sending request:`,i),u.send(t,"POST",h,n,15)})}Bo(e,t,n){const i=Zo(),s=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Yd(),c=Jd(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Oo(u.initMessageHeaders,t,n),u.encodeInitMessageHeaders=!0;const f=s.join("");C(De,`Creating RPC '${e}' stream ${i}: ${f}`,u);const m=o.createWebChannel(f,u);let I=!1,S=!1;const D=new QT({Io:N=>{S?C(De,`Not sending because RPC '${e}' stream ${i} is closed:`,N):(I||(C(De,`Opening RPC '${e}' stream ${i} transport.`),m.open(),I=!0),C(De,`RPC '${e}' stream ${i} sending:`,N),m.send(N))},To:()=>m.close()}),O=(N,K,G)=>{N.listen(K,q=>{try{G(q)}catch(J){setTimeout(()=>{throw J},0)}})};return O(m,Ur.EventType.OPEN,()=>{S||(C(De,`RPC '${e}' stream ${i} transport opened.`),D.yo())}),O(m,Ur.EventType.CLOSE,()=>{S||(S=!0,C(De,`RPC '${e}' stream ${i} transport closed`),D.So())}),O(m,Ur.EventType.ERROR,N=>{S||(S=!0,ri(De,`RPC '${e}' stream ${i} transport errored:`,N),D.So(new V(P.UNAVAILABLE,"The operation could not be completed")))}),O(m,Ur.EventType.MESSAGE,N=>{var K;if(!S){const G=N.data[0];U(!!G);const q=G,J=q.error||((K=q[0])===null||K===void 0?void 0:K.error);if(J){C(De,`RPC '${e}' stream ${i} received error:`,J);const ee=J.status;let W=function(y){const E=_e[y];if(E!==void 0)return Uf(E)}(ee),v=J.message;W===void 0&&(W=P.INTERNAL,v="Unknown error status: "+ee+" with message "+J.message),S=!0,D.So(new V(W,v)),m.close()}else C(De,`RPC '${e}' stream ${i} received:`,G),D.bo(G)}}),O(c,Qd.STAT_EVENT,N=>{N.stat===la.PROXY?C(De,`RPC '${e}' stream ${i} detected buffering proxy`):N.stat===la.NOPROXY&&C(De,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{D.wo()},0),D}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vp(){return typeof window<"u"?window:null}function fs(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function io(r){return new rT(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ep{constructor(e,t,n=1e3,i=1.5,s=6e4){this.ui=e,this.timerId=t,this.ko=n,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),n=Math.max(0,Date.now()-this.Uo),i=Math.max(0,t-n);i>0&&C("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tp{constructor(e,t,n,i,s,o,c,u){this.ui=e,this.Ho=n,this.Jo=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Ep(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(pe(t.toString()),pe("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,i])=>{this.Yo===t&&this.P_(n,i)},n=>{e(()=>{const i=new V(P.UNKNOWN,"Fetching auth token failed: "+n.message);return this.I_(i)})})}P_(e,t){const n=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{n(()=>this.listener.Eo())}),this.stream.Ro(()=>{n(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(i=>{n(()=>this.I_(i))}),this.stream.onMessage(i=>{n(()=>++this.e_==1?this.E_(i):this.onNext(i))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return C("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(C("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class YT extends Tp{constructor(e,t,n,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,i,o),this.serializer=s}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=oT(this.serializer,e),n=function(s){if(!("targetChange"in s))return B.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?B.min():o.readTime?Fe(o.readTime):B.min()}(e);return this.listener.d_(t,n)}A_(e){const t={};t.database=Ea(this.serializer),t.addTarget=function(s,o){let c;const u=o.target;if(c=Ts(u)?{documents:Wf(s,u)}:{query:Hf(s,u)._t},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=jf(s,o.resumeToken);const h=Ia(s,o.expectedCount);h!==null&&(c.expectedCount=h)}else if(o.snapshotVersion.compareTo(B.min())>0){c.readTime=Jn(s,o.snapshotVersion.toTimestamp());const h=Ia(s,o.expectedCount);h!==null&&(c.expectedCount=h)}return c}(this.serializer,e);const n=cT(this.serializer,e);n&&(t.labels=n),this.a_(t)}R_(e){const t={};t.database=Ea(this.serializer),t.removeTarget=e,this.a_(t)}}class XT extends Tp{constructor(e,t,n,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,i,o),this.serializer=s}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return U(!!e.streamToken),this.lastStreamToken=e.streamToken,U(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){U(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=aT(e.writeResults,e.commitTime),n=Fe(e.commitTime);return this.listener.g_(n,t)}p_(){const e={};e.database=Ea(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(n=>Ss(this.serializer,n))};this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZT extends class{}{constructor(e,t,n,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new V(P.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,n,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Mo(e,va(t,n),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new V(P.UNKNOWN,s.toString())})}Lo(e,t,n,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.Lo(e,va(t,n),i,o,c,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new V(P.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class ew{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(pe(t),this.D_=!1):C("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tw{constructor(e,t,n,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=s,this.k_._o(o=>{n.enqueueAndForget(async()=>{Tn(this)&&(C("RemoteStore","Restarting streams for network reachability change."),await async function(u){const h=F(u);h.L_.add(4),await Ai(h),h.q_.set("Unknown"),h.L_.delete(4),await so(h)}(this))})}),this.q_=new ew(n,i)}}async function so(r){if(Tn(r))for(const e of r.B_)await e(!0)}async function Ai(r){for(const e of r.B_)await e(!1)}function oo(r,e){const t=F(r);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),Ec(t)?vc(t):hr(t).r_()&&Ic(t,e))}function Xn(r,e){const t=F(r),n=hr(t);t.N_.delete(e),n.r_()&&wp(t,e),t.N_.size===0&&(n.r_()?n.o_():Tn(t)&&t.q_.set("Unknown"))}function Ic(r,e){if(r.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(B.min())>0){const t=r.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}hr(r).A_(e)}function wp(r,e){r.Q_.xe(e),hr(r).R_(e)}function vc(r){r.Q_=new ZE({getRemoteKeysForTarget:e=>r.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>r.N_.get(e)||null,tt:()=>r.datastore.serializer.databaseId}),hr(r).start(),r.q_.v_()}function Ec(r){return Tn(r)&&!hr(r).n_()&&r.N_.size>0}function Tn(r){return F(r).L_.size===0}function Ap(r){r.Q_=void 0}async function nw(r){r.q_.set("Online")}async function rw(r){r.N_.forEach((e,t)=>{Ic(r,e)})}async function iw(r,e){Ap(r),Ec(r)?(r.q_.M_(e),vc(r)):r.q_.set("Unknown")}async function sw(r,e,t){if(r.q_.set("Online"),e instanceof qf&&e.state===2&&e.cause)try{await async function(i,s){const o=s.cause;for(const c of s.targetIds)i.N_.has(c)&&(await i.remoteSyncer.rejectListen(c,o),i.N_.delete(c),i.Q_.removeTarget(c))}(r,e)}catch(n){C("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),n),await Os(r,n)}else if(e instanceof ds?r.Q_.Ke(e):e instanceof Bf?r.Q_.He(e):r.Q_.We(e),!t.isEqual(B.min()))try{const n=await mp(r.localStore);t.compareTo(n)>=0&&await function(s,o){const c=s.Q_.rt(o);return c.targetChanges.forEach((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=s.N_.get(h);f&&s.N_.set(h,f.withResumeToken(u.resumeToken,o))}}),c.targetMismatches.forEach((u,h)=>{const f=s.N_.get(u);if(!f)return;s.N_.set(u,f.withResumeToken(ge.EMPTY_BYTE_STRING,f.snapshotVersion)),wp(s,u);const m=new pt(f.target,u,h,f.sequenceNumber);Ic(s,m)}),s.remoteSyncer.applyRemoteEvent(c)}(r,t)}catch(n){C("RemoteStore","Failed to raise snapshot:",n),await Os(r,n)}}async function Os(r,e,t){if(!Kt(e))throw e;r.L_.add(1),await Ai(r),r.q_.set("Offline"),t||(t=()=>mp(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{C("RemoteStore","Retrying IndexedDB access"),await t(),r.L_.delete(1),await so(r)})}function Rp(r,e){return e().catch(t=>Os(r,t,e))}async function lr(r){const e=F(r),t=jt(e);let n=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;ow(e);)try{const i=await $T(e.localStore,n);if(i===null){e.O_.length===0&&t.o_();break}n=i.batchId,aw(e,i)}catch(i){await Os(e,i)}Sp(e)&&bp(e)}function ow(r){return Tn(r)&&r.O_.length<10}function aw(r,e){r.O_.push(e);const t=jt(r);t.r_()&&t.V_&&t.m_(e.mutations)}function Sp(r){return Tn(r)&&!jt(r).n_()&&r.O_.length>0}function bp(r){jt(r).start()}async function cw(r){jt(r).p_()}async function uw(r){const e=jt(r);for(const t of r.O_)e.m_(t.mutations)}async function lw(r,e,t){const n=r.O_.shift(),i=uc.from(n,e,t);await Rp(r,()=>r.remoteSyncer.applySuccessfulWrite(i)),await lr(r)}async function hw(r,e){e&&jt(r).V_&&await async function(n,i){if(function(o){return JE(o)&&o!==P.ABORTED}(i.code)){const s=n.O_.shift();jt(n).s_(),await Rp(n,()=>n.remoteSyncer.rejectFailedWrite(s.batchId,i)),await lr(n)}}(r,e),Sp(r)&&bp(r)}async function mh(r,e){const t=F(r);t.asyncQueue.verifyOperationInProgress(),C("RemoteStore","RemoteStore received new credentials");const n=Tn(t);t.L_.add(3),await Ai(t),n&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await so(t)}async function ba(r,e){const t=F(r);e?(t.L_.delete(2),await so(t)):e||(t.L_.add(2),await Ai(t),t.q_.set("Unknown"))}function hr(r){return r.K_||(r.K_=function(t,n,i){const s=F(t);return s.w_(),new YT(n,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(r.datastore,r.asyncQueue,{Eo:nw.bind(null,r),Ro:rw.bind(null,r),mo:iw.bind(null,r),d_:sw.bind(null,r)}),r.B_.push(async e=>{e?(r.K_.s_(),Ec(r)?vc(r):r.q_.set("Unknown")):(await r.K_.stop(),Ap(r))})),r.K_}function jt(r){return r.U_||(r.U_=function(t,n,i){const s=F(t);return s.w_(),new XT(n,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(r.datastore,r.asyncQueue,{Eo:()=>Promise.resolve(),Ro:cw.bind(null,r),mo:hw.bind(null,r),f_:uw.bind(null,r),g_:lw.bind(null,r)}),r.B_.push(async e=>{e?(r.U_.s_(),await lr(r)):(await r.U_.stop(),r.O_.length>0&&(C("RemoteStore",`Stopping write stream with ${r.O_.length} pending writes`),r.O_=[]))})),r.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tc{constructor(e,t,n,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=i,this.removalCallback=s,this.deferred=new He,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,i,s){const o=Date.now()+n,c=new Tc(e,t,o,i,s);return c.start(n),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ri(r,e){if(pe("AsyncQueue",`${e}: ${r}`),Kt(r))return new V(P.UNAVAILABLE,`${e}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn{constructor(e){this.comparator=e?(t,n)=>e(t,n)||L.comparator(t.key,n.key):(t,n)=>L.comparator(t.key,n.key),this.keyedMap=Br(),this.sortedSet=new ie(this.comparator)}static emptySet(e){return new qn(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof qn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=n.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new qn;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gh{constructor(){this.W_=new ie(L.comparator)}track(e){const t=e.doc.key,n=this.W_.get(t);n?e.type!==0&&n.type===3?this.W_=this.W_.insert(t,e):e.type===3&&n.type!==1?this.W_=this.W_.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.W_=this.W_.remove(t):e.type===1&&n.type===2?this.W_=this.W_.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):M():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal((t,n)=>{e.push(n)}),e}}class Zn{constructor(e,t,n,i,s,o,c,u,h){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,n,i,s){const o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new Zn(e,t,qn.emptySet(t),o,n,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Xs(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==n[i].type||!t[i].doc.isEqual(n[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dw{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class fw{constructor(){this.queries=_h(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,n){const i=F(t),s=i.queries;i.queries=_h(),s.forEach((o,c)=>{for(const u of c.j_)u.onError(n)})})(this,new V(P.ABORTED,"Firestore shutting down"))}}function _h(){return new $t(r=>Af(r),Xs)}async function Pp(r,e){const t=F(r);let n=3;const i=e.query;let s=t.queries.get(i);s?!s.H_()&&e.J_()&&(n=2):(s=new dw,n=e.J_()?0:1);try{switch(n){case 0:s.z_=await t.onListen(i,!0);break;case 1:s.z_=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){const c=Ri(o,`Initialization of query '${Nn(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.j_.push(e),e.Z_(t.onlineState),s.z_&&e.X_(s.z_)&&wc(t)}async function Cp(r,e){const t=F(r),n=e.query;let i=3;const s=t.queries.get(n);if(s){const o=s.j_.indexOf(e);o>=0&&(s.j_.splice(o,1),s.j_.length===0?i=e.J_()?0:1:!s.H_()&&e.J_()&&(i=2))}switch(i){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function pw(r,e){const t=F(r);let n=!1;for(const i of e){const s=i.query,o=t.queries.get(s);if(o){for(const c of o.j_)c.X_(i)&&(n=!0);o.z_=i}}n&&wc(t)}function mw(r,e,t){const n=F(r),i=n.queries.get(e);if(i)for(const s of i.j_)s.onError(t);n.queries.delete(e)}function wc(r){r.Y_.forEach(e=>{e.next()})}var Pa,yh;(yh=Pa||(Pa={})).ea="default",yh.Cache="cache";class Dp{constructor(e,t,n){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=n||{}}X_(e){if(!this.options.includeMetadataChanges){const n=[];for(const i of e.docChanges)i.type!==3&&n.push(i);e=new Zn(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const n=t!=="Offline";return(!this.options._a||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=Zn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==Pa.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vp{constructor(e){this.key=e}}class Np{constructor(e){this.key=e}}class kp{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=$(),this.mutatedKeys=$(),this.Aa=Sf(e),this.Ra=new qn(this.Aa)}get Va(){return this.Ta}ma(e,t){const n=t?t.fa:new gh,i=t?t.Ra:this.Ra;let s=t?t.mutatedKeys:this.mutatedKeys,o=i,c=!1;const u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,h=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((f,m)=>{const I=i.get(f),S=vi(this.query,m)?m:null,D=!!I&&this.mutatedKeys.has(I.key),O=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let N=!1;I&&S?I.data.isEqual(S.data)?D!==O&&(n.track({type:3,doc:S}),N=!0):this.ga(I,S)||(n.track({type:2,doc:S}),N=!0,(u&&this.Aa(S,u)>0||h&&this.Aa(S,h)<0)&&(c=!0)):!I&&S?(n.track({type:0,doc:S}),N=!0):I&&!S&&(n.track({type:1,doc:I}),N=!0,(u||h)&&(c=!0)),N&&(S?(o=o.add(S),s=O?s.add(f):s.delete(f)):(o=o.delete(f),s=s.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),s=s.delete(f.key),n.track({type:1,doc:f})}return{Ra:o,fa:n,ns:c,mutatedKeys:s}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,i){const s=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((f,m)=>function(S,D){const O=N=>{switch(N){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M()}};return O(S)-O(D)}(f.type,m.type)||this.Aa(f.doc,m.doc)),this.pa(n),i=i!=null&&i;const c=t&&!i?this.ya():[],u=this.da.size===0&&this.current&&!i?1:0,h=u!==this.Ea;return this.Ea=u,o.length!==0||h?{snapshot:new Zn(this.query,e.Ra,s,o,e.mutatedKeys,u===0,h,!1,!!n&&n.resumeToken.approximateByteSize()>0),wa:c}:{wa:c}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new gh,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(t=>this.Ta=this.Ta.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ta=this.Ta.delete(t)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=$(),this.Ra.forEach(n=>{this.Sa(n.key)&&(this.da=this.da.add(n.key))});const t=[];return e.forEach(n=>{this.da.has(n)||t.push(new Np(n))}),this.da.forEach(n=>{e.has(n)||t.push(new Vp(n))}),t}ba(e){this.Ta=e.Ts,this.da=$();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return Zn.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class gw{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class _w{constructor(e){this.key=e,this.va=!1}}class yw{constructor(e,t,n,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new $t(c=>Af(c),Xs),this.Ma=new Map,this.xa=new Set,this.Oa=new ie(L.comparator),this.Na=new Map,this.La=new mc,this.Ba={},this.ka=new Map,this.qa=yn.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function Iw(r,e,t=!0){const n=ao(r);let i;const s=n.Fa.get(e);return s?(n.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Da()):i=await Op(n,e,t,!0),i}async function vw(r,e){const t=ao(r);await Op(t,e,!0,!1)}async function Op(r,e,t,n){const i=await Ds(r.localStore,$e(e)),s=i.targetId,o=r.sharedClientState.addLocalQueryTarget(s,t);let c;return n&&(c=await Ac(r,e,s,o==="current",i.resumeToken)),r.isPrimaryClient&&t&&oo(r.remoteStore,i),c}async function Ac(r,e,t,n,i){r.Ka=(m,I,S)=>async function(O,N,K,G){let q=N.view.ma(K);q.ns&&(q=await Vs(O.localStore,N.query,!1).then(({documents:v})=>N.view.ma(v,q)));const J=G&&G.targetChanges.get(N.targetId),ee=G&&G.targetMismatches.get(N.targetId)!=null,W=N.view.applyChanges(q,O.isPrimaryClient,J,ee);return Ca(O,N.targetId,W.wa),W.snapshot}(r,m,I,S);const s=await Vs(r.localStore,e,!0),o=new kp(e,s.Ts),c=o.ma(s.documents),u=wi.createSynthesizedTargetChangeForCurrentChange(t,n&&r.onlineState!=="Offline",i),h=o.applyChanges(c,r.isPrimaryClient,u);Ca(r,t,h.wa);const f=new gw(e,t,o);return r.Fa.set(e,f),r.Ma.has(t)?r.Ma.get(t).push(e):r.Ma.set(t,[e]),h.snapshot}async function Ew(r,e,t){const n=F(r),i=n.Fa.get(e),s=n.Ma.get(i.targetId);if(s.length>1)return n.Ma.set(i.targetId,s.filter(o=>!Xs(o,e))),void n.Fa.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(i.targetId),n.sharedClientState.isActiveQueryTarget(i.targetId)||await Yn(n.localStore,i.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(i.targetId),t&&Xn(n.remoteStore,i.targetId),er(n,i.targetId)}).catch(zt)):(er(n,i.targetId),await Yn(n.localStore,i.targetId,!0))}async function Tw(r,e){const t=F(r),n=t.Fa.get(e),i=t.Ma.get(n.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),Xn(t.remoteStore,n.targetId))}async function ww(r,e,t){const n=Pc(r);try{const i=await function(o,c){const u=F(o),h=le.now(),f=c.reduce((S,D)=>S.add(D.key),$());let m,I;return u.persistence.runTransaction("Locally write mutations","readwrite",S=>{let D=Ke(),O=$();return u.cs.getEntries(S,f).next(N=>{D=N,D.forEach((K,G)=>{G.isValidDocument()||(O=O.add(K))})}).next(()=>u.localDocuments.getOverlayedDocuments(S,D)).next(N=>{m=N;const K=[];for(const G of c){const q=HE(G,m.get(G.key).overlayedDocument);q!=null&&K.push(new wt(G.key,q,mf(q.value.mapValue),Ie.exists(!0)))}return u.mutationQueue.addMutationBatch(S,h,K,c)}).next(N=>{I=N;const K=N.applyToLocalDocumentSet(m,O);return u.documentOverlayCache.saveOverlays(S,N.batchId,K)})}).then(()=>({batchId:I.batchId,changes:Pf(m)}))}(n.localStore,e);n.sharedClientState.addPendingMutation(i.batchId),function(o,c,u){let h=o.Ba[o.currentUser.toKey()];h||(h=new ie(z)),h=h.insert(c,u),o.Ba[o.currentUser.toKey()]=h}(n,i.batchId,t),await Wt(n,i.changes),await lr(n.remoteStore)}catch(i){const s=Ri(i,"Failed to persist write");t.reject(s)}}async function xp(r,e){const t=F(r);try{const n=await zT(t.localStore,e);e.targetChanges.forEach((i,s)=>{const o=t.Na.get(s);o&&(U(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.va=!0:i.modifiedDocuments.size>0?U(o.va):i.removedDocuments.size>0&&(U(o.va),o.va=!1))}),await Wt(t,n,e)}catch(n){await zt(n)}}function Ih(r,e,t){const n=F(r);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const i=[];n.Fa.forEach((s,o)=>{const c=o.view.Z_(e);c.snapshot&&i.push(c.snapshot)}),function(o,c){const u=F(o);u.onlineState=c;let h=!1;u.queries.forEach((f,m)=>{for(const I of m.j_)I.Z_(c)&&(h=!0)}),h&&wc(u)}(n.eventManager,e),i.length&&n.Ca.d_(i),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function Aw(r,e,t){const n=F(r);n.sharedClientState.updateQueryState(e,"rejected",t);const i=n.Na.get(e),s=i&&i.key;if(s){let o=new ie(L.comparator);o=o.insert(s,de.newNoDocument(s,B.min()));const c=$().add(s),u=new Ti(B.min(),new Map,new ie(z),o,c);await xp(n,u),n.Oa=n.Oa.remove(s),n.Na.delete(e),bc(n)}else await Yn(n.localStore,e,!1).then(()=>er(n,e,t)).catch(zt)}async function Rw(r,e){const t=F(r),n=e.batch.batchId;try{const i=await GT(t.localStore,e);Sc(t,n,null),Rc(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await Wt(t,i)}catch(i){await zt(i)}}async function Sw(r,e,t){const n=F(r);try{const i=await function(o,c){const u=F(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return u.mutationQueue.lookupMutationBatch(h,c).next(m=>(U(m!==null),f=m.keys(),u.mutationQueue.removeMutationBatch(h,m))).next(()=>u.mutationQueue.performConsistencyCheck(h)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>u.localDocuments.getDocuments(h,f))})}(n.localStore,e);Sc(n,e,t),Rc(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await Wt(n,i)}catch(i){await zt(i)}}function Rc(r,e){(r.ka.get(e)||[]).forEach(t=>{t.resolve()}),r.ka.delete(e)}function Sc(r,e,t){const n=F(r);let i=n.Ba[n.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),n.Ba[n.currentUser.toKey()]=i}}function er(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(const n of r.Ma.get(e))r.Fa.delete(n),t&&r.Ca.$a(n,t);r.Ma.delete(e),r.isPrimaryClient&&r.La.gr(e).forEach(n=>{r.La.containsKey(n)||Lp(r,n)})}function Lp(r,e){r.xa.delete(e.path.canonicalString());const t=r.Oa.get(e);t!==null&&(Xn(r.remoteStore,t),r.Oa=r.Oa.remove(e),r.Na.delete(t),bc(r))}function Ca(r,e,t){for(const n of t)n instanceof Vp?(r.La.addReference(n.key,e),bw(r,n)):n instanceof Np?(C("SyncEngine","Document no longer in limbo: "+n.key),r.La.removeReference(n.key,e),r.La.containsKey(n.key)||Lp(r,n.key)):M()}function bw(r,e){const t=e.key,n=t.path.canonicalString();r.Oa.get(t)||r.xa.has(n)||(C("SyncEngine","New document in limbo: "+t),r.xa.add(n),bc(r))}function bc(r){for(;r.xa.size>0&&r.Oa.size<r.maxConcurrentLimboResolutions;){const e=r.xa.values().next().value;r.xa.delete(e);const t=new L(Z.fromString(e)),n=r.qa.next();r.Na.set(n,new _w(t)),r.Oa=r.Oa.insert(t,n),oo(r.remoteStore,new pt($e(Ys(t.path)),n,"TargetPurposeLimboResolution",qe.oe))}}async function Wt(r,e,t){const n=F(r),i=[],s=[],o=[];n.Fa.isEmpty()||(n.Fa.forEach((c,u)=>{o.push(n.Ka(u,e,t).then(h=>{var f;if((h||t)&&n.isPrimaryClient){const m=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;n.sharedClientState.updateQueryState(u.targetId,m?"current":"not-current")}if(h){i.push(h);const m=_c.Wi(u.targetId,h);s.push(m)}}))}),await Promise.all(o),n.Ca.d_(i),await async function(u,h){const f=F(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>A.forEach(h,I=>A.forEach(I.$i,S=>f.persistence.referenceDelegate.addReference(m,I.targetId,S)).next(()=>A.forEach(I.Ui,S=>f.persistence.referenceDelegate.removeReference(m,I.targetId,S)))))}catch(m){if(!Kt(m))throw m;C("LocalStore","Failed to update sequence numbers: "+m)}for(const m of h){const I=m.targetId;if(!m.fromCache){const S=f.os.get(I),D=S.snapshotVersion,O=S.withLastLimboFreeSnapshotVersion(D);f.os=f.os.insert(I,O)}}}(n.localStore,s))}async function Pw(r,e){const t=F(r);if(!t.currentUser.isEqual(e)){C("SyncEngine","User change. New user:",e.toKey());const n=await pp(t.localStore,e);t.currentUser=e,function(s,o){s.ka.forEach(c=>{c.forEach(u=>{u.reject(new V(P.CANCELLED,o))})}),s.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await Wt(t,n.hs)}}function Cw(r,e){const t=F(r),n=t.Na.get(e);if(n&&n.va)return $().add(n.key);{let i=$();const s=t.Ma.get(e);if(!s)return i;for(const o of s){const c=t.Fa.get(o);i=i.unionWith(c.view.Va)}return i}}async function Dw(r,e){const t=F(r),n=await Vs(t.localStore,e.query,!0),i=e.view.ba(n);return t.isPrimaryClient&&Ca(t,e.targetId,i.wa),i}async function Vw(r,e){const t=F(r);return _p(t.localStore,e).then(n=>Wt(t,n))}async function Nw(r,e,t,n){const i=F(r),s=await function(c,u){const h=F(c),f=F(h.mutationQueue);return h.persistence.runTransaction("Lookup mutation documents","readonly",m=>f.Mn(m,u).next(I=>I?h.localDocuments.getDocuments(m,I):A.resolve(null)))}(i.localStore,e);s!==null?(t==="pending"?await lr(i.remoteStore):t==="acknowledged"||t==="rejected"?(Sc(i,e,n||null),Rc(i,e),function(c,u){F(F(c).mutationQueue).On(u)}(i.localStore,e)):M(),await Wt(i,s)):C("SyncEngine","Cannot apply mutation batch with id: "+e)}async function kw(r,e){const t=F(r);if(ao(t),Pc(t),e===!0&&t.Qa!==!0){const n=t.sharedClientState.getAllActiveQueryTargets(),i=await vh(t,n.toArray());t.Qa=!0,await ba(t.remoteStore,!0);for(const s of i)oo(t.remoteStore,s)}else if(e===!1&&t.Qa!==!1){const n=[];let i=Promise.resolve();t.Ma.forEach((s,o)=>{t.sharedClientState.isLocalQueryTarget(o)?n.push(o):i=i.then(()=>(er(t,o),Yn(t.localStore,o,!0))),Xn(t.remoteStore,o)}),await i,await vh(t,n),function(o){const c=F(o);c.Na.forEach((u,h)=>{Xn(c.remoteStore,h)}),c.La.pr(),c.Na=new Map,c.Oa=new ie(L.comparator)}(t),t.Qa=!1,await ba(t.remoteStore,!1)}}async function vh(r,e,t){const n=F(r),i=[],s=[];for(const o of e){let c;const u=n.Ma.get(o);if(u&&u.length!==0){c=await Ds(n.localStore,$e(u[0]));for(const h of u){const f=n.Fa.get(h),m=await Dw(n,f);m.snapshot&&s.push(m.snapshot)}}else{const h=await gp(n.localStore,o);c=await Ds(n.localStore,h),await Ac(n,Mp(h),o,!1,c.resumeToken)}i.push(c)}return n.Ca.d_(s),i}function Mp(r){return wf(r.path,r.collectionGroup,r.orderBy,r.filters,r.limit,"F",r.startAt,r.endAt)}function Ow(r){return function(t){return F(F(t).persistence).Qi()}(F(r).localStore)}async function xw(r,e,t,n){const i=F(r);if(i.Qa)return void C("SyncEngine","Ignoring unexpected query state notification.");const s=i.Ma.get(e);if(s&&s.length>0)switch(t){case"current":case"not-current":{const o=await _p(i.localStore,Rf(s[0])),c=Ti.createSynthesizedRemoteEventForCurrentChange(e,t==="current",ge.EMPTY_BYTE_STRING);await Wt(i,o,c);break}case"rejected":await Yn(i.localStore,e,!0),er(i,e,n);break;default:M()}}async function Lw(r,e,t){const n=ao(r);if(n.Qa){for(const i of e){if(n.Ma.has(i)&&n.sharedClientState.isActiveQueryTarget(i)){C("SyncEngine","Adding an already active target "+i);continue}const s=await gp(n.localStore,i),o=await Ds(n.localStore,s);await Ac(n,Mp(s),o.targetId,!1,o.resumeToken),oo(n.remoteStore,o)}for(const i of t)n.Ma.has(i)&&await Yn(n.localStore,i,!1).then(()=>{Xn(n.remoteStore,i),er(n,i)}).catch(zt)}}function ao(r){const e=F(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=xp.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Cw.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Aw.bind(null,e),e.Ca.d_=pw.bind(null,e.eventManager),e.Ca.$a=mw.bind(null,e.eventManager),e}function Pc(r){const e=F(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Rw.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Sw.bind(null,e),e}class di{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=io(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return fp(this.persistence,new dp,e.initialUser,this.serializer)}Ga(e){return new lp(ro.Zr,this.serializer)}Wa(e){return new Ip}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}di.provider={build:()=>new di};class Fp extends di{constructor(e,t,n){super(),this.Ja=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Ja.initialize(this,e),await Pc(this.Ja.syncEngine),await lr(this.Ja.remoteStore),await this.persistence.yi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}za(e){return fp(this.persistence,new dp,e.initialUser,this.serializer)}ja(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new RT(n,e.asyncQueue,t)}Ha(e,t){const n=new iE(t,this.persistence);return new rE(e.asyncQueue,n)}Ga(e){const t=hp(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?Be.withCacheSize(this.cacheSizeBytes):Be.DEFAULT;return new gc(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,vp(),fs(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Wa(e){return new Ip}}class Mw extends Fp{constructor(e,t){super(e,t,!1),this.Ja=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.Ja.syncEngine;this.sharedClientState instanceof Xo&&(this.sharedClientState.syncEngine={no:Nw.bind(null,t),ro:xw.bind(null,t),io:Lw.bind(null,t),Qi:Ow.bind(null,t),eo:Vw.bind(null,t)},await this.sharedClientState.start()),await this.persistence.yi(async n=>{await kw(this.Ja.syncEngine,n),this.gcScheduler&&(n&&!this.gcScheduler.started?this.gcScheduler.start():n||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(n&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():n||this.indexBackfillerScheduler.stop())})}Wa(e){const t=vp();if(!Xo.D(t))throw new V(P.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=hp(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new Xo(t,e.asyncQueue,n,e.clientId,e.initialUser)}}class fi{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Ih(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=Pw.bind(null,this.syncEngine),await ba(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new fw}()}createDatastore(e){const t=io(e.databaseInfo.databaseId),n=function(s){return new JT(s)}(e.databaseInfo);return function(s,o,c,u){return new ZT(s,o,c,u)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return function(n,i,s,o,c){return new tw(n,i,s,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Ih(this.syncEngine,t,0),function(){return ph.D()?new ph:new WT}())}createSyncEngine(e,t){return function(i,s,o,c,u,h,f){const m=new yw(i,s,o,c,u,h);return f&&(m.Qa=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const s=F(i);C("RemoteStore","RemoteStore shutting down."),s.L_.add(5),await Ai(s),s.k_.shutdown(),s.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}fi.provider={build:()=>new fi};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Up{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):pe("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fw{constructor(e,t,n,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=i,this.user=Ve.UNAUTHENTICATED,this.clientId=Xd.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(n,async o=>{C("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(n,o=>(C("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new He;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=Ri(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function ea(r,e){r.asyncQueue.verifyOperationInProgress(),C("FirestoreClient","Initializing OfflineComponentProvider");const t=r.configuration;await e.initialize(t);let n=t.initialUser;r.setCredentialChangeListener(async i=>{n.isEqual(i)||(await pp(e.localStore,i),n=i)}),e.persistence.setDatabaseDeletedListener(()=>r.terminate()),r._offlineComponents=e}async function Eh(r,e){r.asyncQueue.verifyOperationInProgress();const t=await Bp(r);C("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener(n=>mh(e.remoteStore,n)),r.setAppCheckTokenChangeListener((n,i)=>mh(e.remoteStore,i)),r._onlineComponents=e}async function Bp(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){C("FirestoreClient","Using user provided OfflineComponentProvider");try{await ea(r,r._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===P.FAILED_PRECONDITION||i.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;ri("Error using user provided cache. Falling back to memory cache: "+t),await ea(r,new di)}}else C("FirestoreClient","Using default OfflineComponentProvider"),await ea(r,new di);return r._offlineComponents}async function qp(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(C("FirestoreClient","Using user provided OnlineComponentProvider"),await Eh(r,r._uninitializedComponentsProvider._online)):(C("FirestoreClient","Using default OnlineComponentProvider"),await Eh(r,new fi))),r._onlineComponents}function jp(r){return Bp(r).then(e=>e.localStore)}function Uw(r){return qp(r).then(e=>e.syncEngine)}async function Gp(r){const e=await qp(r),t=e.eventManager;return t.onListen=Iw.bind(null,e.syncEngine),t.onUnlisten=Ew.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=vw.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Tw.bind(null,e.syncEngine),t}function Bw(r,e){const t=new He;return r.asyncQueue.enqueueAndForget(async()=>async function(i,s,o){try{const c=await function(h,f){const m=F(h);return m.persistence.runTransaction("read document","readonly",I=>m.localDocuments.getDocument(I,f))}(i,s);c.isFoundDocument()?o.resolve(c):c.isNoDocument()?o.resolve(null):o.reject(new V(P.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(c){const u=Ri(c,`Failed to get document '${s} from cache`);o.reject(u)}}(await jp(r),e,t)),t.promise}function qw(r,e,t={}){const n=new He;return r.asyncQueue.enqueueAndForget(async()=>function(s,o,c,u,h){const f=new Up({next:I=>{f.Za(),o.enqueueAndForget(()=>Cp(s,m));const S=I.docs.has(c);!S&&I.fromCache?h.reject(new V(P.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&I.fromCache&&u&&u.source==="server"?h.reject(new V(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(I)},error:I=>h.reject(I)}),m=new Dp(Ys(c.path),f,{includeMetadataChanges:!0,_a:!0});return Pp(s,m)}(await Gp(r),r.asyncQueue,e,t,n)),n.promise}function jw(r,e){const t=new He;return r.asyncQueue.enqueueAndForget(async()=>async function(i,s,o){try{const c=await Vs(i,s,!0),u=new kp(s,c.Ts),h=u.ma(c.documents),f=u.applyChanges(h,!1);o.resolve(f.snapshot)}catch(c){const u=Ri(c,`Failed to execute query '${s} against cache`);o.reject(u)}}(await jp(r),e,t)),t.promise}function Gw(r,e,t={}){const n=new He;return r.asyncQueue.enqueueAndForget(async()=>function(s,o,c,u,h){const f=new Up({next:I=>{f.Za(),o.enqueueAndForget(()=>Cp(s,m)),I.fromCache&&u.source==="server"?h.reject(new V(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(I)},error:I=>h.reject(I)}),m=new Dp(c,f,{includeMetadataChanges:!0,_a:!0});return Pp(s,m)}(await Gp(r),r.asyncQueue,e,t,n)),n.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zp(r){const e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Th=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kp(r,e,t){if(!t)throw new V(P.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function zw(r,e,t,n){if(e===!0&&n===!0)throw new V(P.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function wh(r){if(!L.isDocumentKey(r))throw new V(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function Ah(r){if(L.isDocumentKey(r))throw new V(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function co(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=function(n){return n.constructor?n.constructor.name:null}(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":M()}function Ue(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new V(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=co(r);throw new V(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}function Kw(r,e){if(e<=0)throw new V(P.INVALID_ARGUMENT,`Function ${r}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rh{constructor(e){var t,n;if(e.host===void 0){if(e.ssl!==void 0)throw new V(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new V(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}zw("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=zp((n=e.experimentalLongPollingOptions)!==null&&n!==void 0?n:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(n,i){return n.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Cc{constructor(e,t,n,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Rh({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new V(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Rh(e),e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new Wv;switch(n.type){case"firstParty":return new Jv(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new V(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const n=Th.get(t);n&&(C("ComponentProvider","Removing Datastore"),Th.delete(t),n.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new nt(this.firestore,e,this._query)}}class ke{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ft(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ke(this.firestore,e,this._key)}}class Ft extends nt{constructor(e,t,n){super(e,t,Ys(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ke(this.firestore,null,new L(e))}withConverter(e){return new Ft(this.firestore,e,this._path)}}function mA(r,e,...t){if(r=j(r),Kp("collection","path",e),r instanceof Cc){const n=Z.fromString(e,...t);return Ah(n),new Ft(r,null,n)}{if(!(r instanceof ke||r instanceof Ft))throw new V(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(Z.fromString(e,...t));return Ah(n),new Ft(r.firestore,null,n)}}function $w(r,e,...t){if(r=j(r),arguments.length===1&&(e=Xd.newId()),Kp("doc","path",e),r instanceof Cc){const n=Z.fromString(e,...t);return wh(n),new ke(r,null,new L(n))}{if(!(r instanceof ke||r instanceof Ft))throw new V(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(Z.fromString(e,...t));return wh(n),new ke(r.firestore,r instanceof Ft?r.converter:null,new L(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sh{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Ep(this,"async_queue_retry"),this.Vu=()=>{const n=fs();n&&C("AsyncQueue","Visibility state changed to "+n.visibilityState),this.t_.jo()},this.mu=e;const t=fs();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=fs();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new He;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Kt(e))throw e;C("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(n=>{this.Eu=n,this.du=!1;const i=function(o){let c=o.message||"";return o.stack&&(c=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),c}(n);throw pe("INTERNAL UNHANDLED ERROR: ",i),n}).then(n=>(this.du=!1,n))));return this.mu=t,t}enqueueAfterDelay(e,t,n){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const i=Tc.createAndSchedule(this,e,t,n,s=>this.yu(s));return this.Tu.push(i),i}fu(){this.Eu&&M()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,n)=>t.targetTimeMs-n.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}class rt extends Cc{constructor(e,t,n,i){super(e,t,n,i),this.type="firestore",this._queue=new Sh,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Sh(e),this._firestoreClient=void 0,await e}}}function gA(r,e,t){t||(t="(default)");const n=ka(r,"firestore");if(n.isInitialized(t)){const i=n.getImmediate({identifier:t}),s=n.getOptions(t);if(Jr(s,e))return i;throw new V(P.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new V(P.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new V(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return n.initialize({options:e,instanceIdentifier:t})}function dr(r){if(r._terminated)throw new V(P.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||Ww(r),r._firestoreClient}function Ww(r){var e,t,n;const i=r._freezeSettings(),s=function(c,u,h,f){return new RE(c,u,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,zp(f.experimentalLongPollingOptions),f.useFetchStreams)}(r._databaseId,((e=r._app)===null||e===void 0?void 0:e.options.appId)||"",r._persistenceKey,i);r._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((n=i.localCache)===null||n===void 0)&&n._onlineComponentProvider)&&(r._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),r._firestoreClient=new Fw(r._authCredentials,r._appCheckCredentials,r._queue,s,r._componentsProvider&&function(c){const u=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(u),_online:u}}(r._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(e){this._byteString=e}static fromBase64String(e){try{return new tr(ge.fromBase64String(e))}catch(t){throw new V(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new tr(ge.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Si{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new V(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ue(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uo{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dc{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new V(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new V(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return z(this._lat,e._lat)||z(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vc{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(n,i){if(n.length!==i.length)return!1;for(let s=0;s<n.length;++s)if(n[s]!==i[s])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hw=/^__.*__$/;class Qw{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new wt(e,this.data,this.fieldMask,t,this.fieldTransforms):new ur(e,this.data,t,this.fieldTransforms)}}class $p{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new wt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Wp(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M()}}class Nc{constructor(e,t,n,i,s,o){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=i,s===void 0&&this.vu(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new Nc(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const n=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:n,xu:!1});return i.Ou(e),i}Nu(e){var t;const n=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:n,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return xs(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(Wp(this.Cu)&&Hw.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class Jw{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||io(e)}Qu(e,t,n,i=!1){return new Nc({Cu:e,methodName:t,qu:n,path:ue.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function fr(r){const e=r._freezeSettings(),t=io(r._databaseId);return new Jw(r._databaseId,!!e.ignoreUndefinedProperties,t)}function kc(r,e,t,n,i,s={}){const o=r.Qu(s.merge||s.mergeFields?2:0,e,t,i);xc("Data must be an object, but it was:",o,n);const c=Yp(n,o);let u,h;if(s.merge)u=new je(o.fieldMask),h=o.fieldTransforms;else if(s.mergeFields){const f=[];for(const m of s.mergeFields){const I=Da(e,m,t);if(!o.contains(I))throw new V(P.INVALID_ARGUMENT,`Field '${I}' is specified in your field mask but missing from your input data.`);Zp(f,I)||f.push(I)}u=new je(f),h=o.fieldTransforms.filter(m=>u.covers(m.field))}else u=null,h=o.fieldTransforms;return new Qw(new Ne(c),u,h)}class lo extends uo{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof lo}}class Oc extends uo{_toFieldTransform(e){return new xf(e.path,new Wn)}isEqual(e){return e instanceof Oc}}function Hp(r,e,t,n){const i=r.Qu(1,e,t);xc("Data must be an object, but it was:",i,n);const s=[],o=Ne.empty();vn(n,(u,h)=>{const f=Lc(e,u,t);h=j(h);const m=i.Nu(f);if(h instanceof lo)s.push(f);else{const I=bi(h,m);I!=null&&(s.push(f),o.set(f,I))}});const c=new je(s);return new $p(o,c,i.fieldTransforms)}function Qp(r,e,t,n,i,s){const o=r.Qu(1,e,t),c=[Da(e,n,t)],u=[i];if(s.length%2!=0)throw new V(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let I=0;I<s.length;I+=2)c.push(Da(e,s[I])),u.push(s[I+1]);const h=[],f=Ne.empty();for(let I=c.length-1;I>=0;--I)if(!Zp(h,c[I])){const S=c[I];let D=u[I];D=j(D);const O=o.Nu(S);if(D instanceof lo)h.push(S);else{const N=bi(D,O);N!=null&&(h.push(S),f.set(S,N))}}const m=new je(h);return new $p(f,m,o.fieldTransforms)}function Jp(r,e,t,n=!1){return bi(t,r.Qu(n?4:3,e))}function bi(r,e){if(Xp(r=j(r)))return xc("Unsupported field value:",e,r),Yp(r,e);if(r instanceof uo)return function(n,i){if(!Wp(i.Cu))throw i.Bu(`${n._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${n._methodName}() is not currently supported inside arrays`);const s=n._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(n,i){const s=[];let o=0;for(const c of n){let u=bi(c,i.Lu(o));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),o++}return{arrayValue:{values:s}}}(r,e)}return function(n,i){if((n=j(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return jE(i.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const s=le.fromDate(n);return{timestampValue:Jn(i.serializer,s)}}if(n instanceof le){const s=new le(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:Jn(i.serializer,s)}}if(n instanceof Dc)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof tr)return{bytesValue:jf(i.serializer,n._byteString)};if(n instanceof ke){const s=i.databaseId,o=n.firestore._databaseId;if(!o.isEqual(s))throw i.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:dc(n.firestore._databaseId||i.databaseId,n._key.path)}}if(n instanceof Vc)return function(o,c){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(u=>{if(typeof u!="number")throw c.Bu("VectorValues must only contain numeric values.");return ac(c.serializer,u)})}}}}}}(n,i);throw i.Bu(`Unsupported field value: ${co(n)}`)}(r,e)}function Yp(r,e){const t={};return hf(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):vn(r,(n,i)=>{const s=bi(i,e.Mu(n));s!=null&&(t[n]=s)}),{mapValue:{fields:t}}}function Xp(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof le||r instanceof Dc||r instanceof tr||r instanceof ke||r instanceof uo||r instanceof Vc)}function xc(r,e,t){if(!Xp(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){const n=co(t);throw n==="an object"?e.Bu(r+" a custom object"):e.Bu(r+" "+n)}}function Da(r,e,t){if((e=j(e))instanceof Si)return e._internalPath;if(typeof e=="string")return Lc(r,e);throw xs("Field path arguments must be of type string or ",r,!1,void 0,t)}const Yw=new RegExp("[~\\*/\\[\\]]");function Lc(r,e,t){if(e.search(Yw)>=0)throw xs(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new Si(...e.split("."))._internalPath}catch{throw xs(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function xs(r,e,t,n,i){const s=n&&!n.isEmpty(),o=i!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(s||o)&&(u+=" (found",s&&(u+=` in field ${n}`),o&&(u+=` in document ${i}`),u+=")"),new V(P.INVALID_ARGUMENT,c+r+u)}function Zp(r,e){return r.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mc{constructor(e,t,n,i,s){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new ke(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Xw(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(ho("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Xw extends Mc{data(){return super.data()}}function ho(r,e){return typeof e=="string"?Lc(r,e):e instanceof Si?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zw(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new V(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Fc{}class fo extends Fc{}function _A(r,e,...t){let n=[];e instanceof Fc&&n.push(e),n=n.concat(t),function(s){const o=s.filter(u=>u instanceof Uc).length,c=s.filter(u=>u instanceof po).length;if(o>1||o>0&&c>0)throw new V(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n);for(const i of n)r=i._apply(r);return r}class po extends fo{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new po(e,t,n)}_apply(e){const t=this._parse(e);return em(e._query,t),new nt(e.firestore,e.converter,ya(e._query,t))}_parse(e){const t=fr(e.firestore);return function(s,o,c,u,h,f,m){let I;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new V(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Ph(m,f);const S=[];for(const D of m)S.push(bh(u,s,D));I={arrayValue:{values:S}}}else I=bh(u,s,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Ph(m,f),I=Jp(c,o,m,f==="in"||f==="not-in");return Q.create(h,f,I)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function yA(r,e,t){const n=e,i=ho("where",r);return po._create(i,n,t)}class Uc extends Fc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Uc(e,t)}_parse(e){const t=this._queryConstraints.map(n=>n._parse(e)).filter(n=>n.getFilters().length>0);return t.length===1?t[0]:te.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let o=i;const c=s.getFlattenedFilters();for(const u of c)em(o,u),o=ya(o,u)}(e._query,t),new nt(e.firestore,e.converter,ya(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Bc extends fo{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Bc(e,t)}_apply(e){const t=function(i,s,o){if(i.startAt!==null)throw new V(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new V(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new li(s,o)}(e._query,this._field,this._direction);return new nt(e.firestore,e.converter,function(i,s){const o=i.explicitOrderBy.concat([s]);return new En(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}}function IA(r,e="asc"){const t=e,n=ho("orderBy",r);return Bc._create(n,t)}class qc extends fo{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new qc(e,t,n)}_apply(e){return new nt(e.firestore,e.converter,As(e._query,this._limit,this._limitType))}}function vA(r){return Kw("limit",r),qc._create("limit",r,"F")}class jc extends fo{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new jc(e,t,n)}_apply(e){const t=eA(e,this.type,this._docOrFields,this._inclusive);return new nt(e.firestore,e.converter,function(i,s){return new En(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,s,i.endAt)}(e._query,t))}}function EA(...r){return jc._create("startAfter",r,!1)}function eA(r,e,t,n){if(t[0]=j(t[0]),t[0]instanceof Mc)return function(s,o,c,u,h){if(!u)throw new V(P.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const f=[];for(const m of Bn(s))if(m.field.isKeyField())f.push(pn(o,u.key));else{const I=u.data.field(m.field);if(Qs(I))throw new V(P.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+m.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(I===null){const S=m.field.canonicalString();throw new V(P.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${S}' (used as the orderBy) does not exist.`)}f.push(I)}return new qt(f,h)}(r._query,r.firestore._databaseId,e,t[0]._document,n);{const i=fr(r.firestore);return function(o,c,u,h,f,m){const I=o.explicitOrderBy;if(f.length>I.length)throw new V(P.INVALID_ARGUMENT,`Too many arguments provided to ${h}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const S=[];for(let D=0;D<f.length;D++){const O=f[D];if(I[D].field.isKeyField()){if(typeof O!="string")throw new V(P.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${h}(), but got a ${typeof O}`);if(!sc(o)&&O.indexOf("/")!==-1)throw new V(P.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${h}() must be a plain document ID, but '${O}' contains a slash.`);const N=o.path.child(Z.fromString(O));if(!L.isDocumentKey(N))throw new V(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${h}() must result in a valid document path, but '${N}' is not because it contains an odd number of segments.`);const K=new L(N);S.push(pn(c,K))}else{const N=Jp(u,h,O);S.push(N)}}return new qt(S,m)}(r._query,r.firestore._databaseId,i,e,t,n)}}function bh(r,e,t){if(typeof(t=j(t))=="string"){if(t==="")throw new V(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!sc(e)&&t.indexOf("/")!==-1)throw new V(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const n=e.path.child(Z.fromString(t));if(!L.isDocumentKey(n))throw new V(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return pn(r,new L(n))}if(t instanceof ke)return pn(r,t._key);throw new V(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${co(t)}.`)}function Ph(r,e){if(!Array.isArray(r)||r.length===0)throw new V(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function em(r,e){const t=function(i,s){for(const o of i)for(const c of o.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(r.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new V(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new V(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class tA{convertValue(e,t="none"){switch(fn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ce(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Ut(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw M()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return vn(e,(i,s)=>{n[i]=this.convertValue(s,t)}),n}convertVectorValue(e){var t,n,i;const s=(i=(n=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||n===void 0?void 0:n.values)===null||i===void 0?void 0:i.map(o=>ce(o.doubleValue));return new Vc(s)}convertGeoPoint(e){return new Dc(ce(e.latitude),ce(e.longitude))}convertArray(e,t){return(e.values||[]).map(n=>this.convertValue(n,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=rc(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(ai(e));default:return null}}convertTimestamp(e){const t=It(e);return new le(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=Z.fromString(e);U(Xf(n));const i=new dn(n.get(1),n.get(3)),s=new L(n.popFirst(5));return i.isEqual(t)||pe(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gc(r,e,t){let n;return n=r?t&&(t.merge||t.mergeFields)?r.toFirestore(e,t):r.toFirestore(e):e,n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class zc extends Mc{constructor(e,t,n,i,s,o){super(e,t,n,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ps(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(ho("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}}class ps extends zc{data(e={}){return super.data(e)}}class tm{constructor(e,t,n,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Ln(i.hasPendingWrites,i.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new ps(this._firestore,this._userDataWriter,n.key,n,new Ln(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new V(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(c=>{const u=new ps(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Ln(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{const u=new ps(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Ln(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let h=-1,f=-1;return c.type!==0&&(h=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:nA(c.type),doc:u,oldIndex:h,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function nA(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TA(r){r=Ue(r,ke);const e=Ue(r.firestore,rt);return qw(dr(e),r._key).then(t=>rA(e,r,t))}class mo extends tA{constructor(e){super(),this.firestore=e}convertBytes(e){return new tr(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ke(this.firestore,null,t)}}function wA(r){r=Ue(r,ke);const e=Ue(r.firestore,rt),t=dr(e),n=new mo(e);return Bw(t,r._key).then(i=>new zc(e,n,r._key,i,new Ln(i!==null&&i.hasLocalMutations,!0),r.converter))}function AA(r){r=Ue(r,nt);const e=Ue(r.firestore,rt),t=dr(e),n=new mo(e);return Zw(r._query),Gw(t,r._query).then(i=>new tm(e,n,r,i))}function RA(r){r=Ue(r,nt);const e=Ue(r.firestore,rt),t=dr(e),n=new mo(e);return jw(t,r._query).then(i=>new tm(e,n,r,i))}function SA(r,e,t){r=Ue(r,ke);const n=Ue(r.firestore,rt),i=Gc(r.converter,e,t);return Pi(n,[kc(fr(n),"setDoc",r._key,i,r.converter!==null,t).toMutation(r._key,Ie.none())])}function bA(r,e,t,...n){r=Ue(r,ke);const i=Ue(r.firestore,rt),s=fr(i);let o;return o=typeof(e=j(e))=="string"||e instanceof Si?Qp(s,"updateDoc",r._key,e,t,n):Hp(s,"updateDoc",r._key,e),Pi(i,[o.toMutation(r._key,Ie.exists(!0))])}function PA(r){return Pi(Ue(r.firestore,rt),[new Ei(r._key,Ie.none())])}function CA(r,e){const t=Ue(r.firestore,rt),n=$w(r),i=Gc(r.converter,e);return Pi(t,[kc(fr(r.firestore),"addDoc",n._key,i,r.converter!==null,{}).toMutation(n._key,Ie.exists(!1))]).then(()=>n)}function Pi(r,e){return function(n,i){const s=new He;return n.asyncQueue.enqueueAndForget(async()=>ww(await Uw(n),i,s)),s.promise}(dr(r),e)}function rA(r,e,t){const n=t.docs.get(e._key),i=new mo(r);return new zc(r,i,e._key,n,new Ln(t.hasPendingWrites,t.fromCache),e.converter)}class iA{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=aA(),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function DA(r){return new iA(r)}class sA{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=fi.provider,this._offlineComponentProvider={build:t=>new Fp(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}class oA{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=fi.provider,this._offlineComponentProvider={build:t=>new Mw(t,e==null?void 0:e.cacheSizeBytes)}}}function aA(r){return new sA(void 0)}function VA(){return new oA}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cA{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=fr(e)}set(e,t,n){this._verifyNotCommitted();const i=ta(e,this._firestore),s=Gc(i.converter,t,n),o=kc(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,n);return this._mutations.push(o.toMutation(i._key,Ie.none())),this}update(e,t,n,...i){this._verifyNotCommitted();const s=ta(e,this._firestore);let o;return o=typeof(t=j(t))=="string"||t instanceof Si?Qp(this._dataReader,"WriteBatch.update",s._key,t,n,i):Hp(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(o.toMutation(s._key,Ie.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=ta(e,this._firestore);return this._mutations=this._mutations.concat(new Ei(t._key,Ie.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new V(P.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function ta(r,e){if((r=j(r)).firestore!==e)throw new V(P.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return r}function NA(){return new Oc("serverTimestamp")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kA(r){return dr(r=Ue(r,rt)),new cA(r,e=>Pi(r,e))}(function(e,t=!0){(function(i){cr=i})(rr),jn(new ln("firestore",(n,{instanceIdentifier:i,options:s})=>{const o=n.getProvider("app").getImmediate(),c=new rt(new Hv(n.getProvider("auth-internal")),new Xv(n.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new V(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new dn(h.options.projectId,f)}(o,i),o);return s=Object.assign({useFetchStreams:t},s),c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),xt(El,"4.7.3",e),xt(El,"4.7.3","esm2017")})();var uA="firebase",lA="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */xt(uA,lA,"app");export{RA as A,kA as B,hA as C,ct as G,gA as a,VA as b,TA as c,$w as d,Ny as e,Vy as f,zv as g,HI as h,i_ as i,nI as j,NA as k,wA as l,AA as m,mA as n,Zy as o,DA as p,_A as q,IA as r,SA as s,bA as t,qy as u,CA as v,yA as w,PA as x,vA as y,EA as z};

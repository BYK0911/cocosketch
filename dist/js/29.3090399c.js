"use strict";(self["webpackChunksketch"]=self["webpackChunksketch"]||[]).push([[29],{5477:function(t,e,s){function a(t){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}function i(t,e){if("object"!=a(t)||!t)return t;var s=t[Symbol.toPrimitive];if(void 0!==s){var i=s.call(t,e||"default");if("object"!=a(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}function n(t){var e=i(t,"string");return"symbol"==a(e)?e:String(e)}function h(t,e,s){return e=n(e),e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}s.d(e,{A:function(){return S}});s(4114);class o{constructor(t,e){h(this,"x",void 0),h(this,"y",void 0),this.x=t,this.y=e}matrix(t,e,s,a,i,n){const h=this.x,o=this.y;return this.x=t*h+e*o+s,this.y=a*h+i*o+n,this}translate(t,e){return this.x+=t,this.y+=e,this}move(t,e){return this.translate(t,e)}rotate(t){const e=Math.cos(t),s=Math.sin(t);return this.matrix(e,-s,0,s,e,0),this}scale(t,e){return this.x*=t,this.y*=e,this}skewX(t){t=t/180*Math.PI;const e=Math.tan(t);return this.matrix(1,e,0,0,1,0)}skewY(t){t=t/180*Math.PI;const e=Math.tan(t);return this.matrix(1,0,0,e,1,0)}norm(){return Math.sqrt(this.x*this.x+this.y*this.y)}normalVector(){const t=this.norm();return 0===t?this:new o(this.y/t,-this.x/t)}unit(){const t=this.norm();return 0===t?this:new o(this.x/t,this.y/t)}angle(t=1,e=0){const s=this.norm(),a=Math.sqrt(t*t+e*e);if(s*a===0)return 0;const i=this.dot(t,e),n=Math.max(-1,Math.min(1,i/s/a));return Math.acos(n)}dot(t,e){return this.x*t+this.y*e}cross(t,e){return this.x*e-this.y*t}flip(t,e,s,a){const{x:i,y:n}=this,[h,o]=[i-t,n-e],[r,c]=[s-t,a-e];if(0!==r||0!==c){const s=r*r+c*c;this.x=(h*(r*r-c*c)+2*o*r*c)/s+t,this.y=(o*(c*c-r*r)+2*h*r*c)/s+e}return this}}let r,c,l,d;function u(t){t.on("touchstart",(t=>{const e=t;2===e.touches.length&&(r=e.touches[0].pageX,l=e.touches[0].pageY,c=e.touches[1].pageX,d=e.touches[1].pageY)})),t.on("touchmove",(e=>{const s=e;if(2===s.touches.length){const e=s.touches[0].pageX,a=s.touches[0].pageY,i=s.touches[1].pageX,n=s.touches[1].pageY,h=new o(c-r,d-l),u=new o(i-e,n-a),y=h.angle(u.x,u.y),g=h.cross(u.x,u.y)>0?y:-y,f=u.norm()/h.norm(),p=t.getRelativeCoord((r+c)/2,(l+d)/2);t.rotation+=g,t.scale*=f,p.rotate(t.rotation).scale(t.scale,t.scale);const m=new o((e+i)/2,(a+n)/2).move(-p.x,-p.y);t.x=m.x,t.y=m.y,r=e,c=i,l=a,d=n}}))}class y{}class g extends y{constructor(t){super(),h(this,"type","Path"),h(this,"color","#000"),h(this,"size",1),h(this,"data",[]),Object.assign(this,t)}getData(){return{type:this.type,size:this.size,color:this.color,data:this.data}}}class f extends g{constructor(...t){super(...t),h(this,"type","Pen")}draw(t){const{size:e,color:s,data:a}=this;if(2===a.length)t.beginPath(),t.arc(a[0],a[1],e/2,0,2*Math.PI),t.closePath(),t.fillStyle=s,t.fill();else{t.beginPath(),t.moveTo(a[0],a[1]);for(let e=2;e<a.length;e+=2)t.lineTo(a[e],a[e+1]);t.strokeStyle=s,t.lineWidth=e,t.lineCap="round",t.lineJoin="round",t.stroke(),t.closePath()}}}class p extends g{constructor(...t){super(...t),h(this,"type","Eraser")}draw(t){const{size:e,data:s}=this;if(!(s.length<4)){t.globalCompositeOperation="destination-out",t.beginPath(),t.moveTo(s[0],s[1]);for(let e=2;e<s.length;e+=2)t.lineTo(s[e],s[e+1]);t.strokeStyle="#000",t.lineWidth=e,t.lineCap="round",t.lineJoin="round",t.stroke(),t.closePath()}}}let m=null,v=!1;const x=45;function w(t){t.on("touchstart",(e=>{const s=e;if(1===s.touches.length){m="pen"===t.state.mode?new f({size:t.state.pen.size,color:t.state.pen.color}):new p({size:t.state.eraser.size});const e=t.getRelativeCoord(s.touches[0].pageX,s.touches[0].pageY-x);m.data.push(e.x,e.y)}})),t.on("touchmove",(e=>{const s=e;if(1===s.touches.length&&m){const e=t.getRelativeCoord(s.touches[0].pageX,s.touches[0].pageY-x);m.data.push(e.x,e.y),v||(t.activePath=m,v=!0)}})),t.on("touchend",(()=>{v&&t.add(m),v=!1,t.activePath=m=null}))}function b(t,e,s){const a=(t,e)=>t[0]==e[0]&&t[1]==e[1]&&t[2]==e[2]&&t[3]==e[3],i=t.data,n=t.width,h=t.height,o=new Set,r=[[e,s]],c=4*(s*n+e),l=[i[c],i[c+1],i[c+2],i[c+3]],d=(t,e)=>{const s=`${t},${e}`;if(o.has(s))return;o.add(s);const h=4*(e*n+t);a(l,[i[h],i[h+1],i[h+2],i[h+3]])&&r.push([t,e])};let u=0;while(u<r.length){const[t,e]=r[u];e>0&&d(t,e-1),t>0&&d(t-1,e),t<n-1&&d(t+1,e),e<h-1&&d(t,e+1),u++}return r}const C=document.createElement("canvas"),k=C.getContext("2d");function P(t){k.fillStyle=t,k.fillRect(0,0,1,1);const e=k.getImageData(0,0,1,1).data;return{r:e[0],g:e[1],b:e[2],a:e[3]}}class M extends y{constructor(t,e,s,a){super(),h(this,"type","Rasterized"),h(this,"x",0),h(this,"y",0),h(this,"color","#fff"),h(this,"graph",void 0),h(this,"rasterized",null),this.graph=t,this.x=e,this.y=s,this.color=a}getData(){return{type:this.type,x:this.x,y:this.y,color:this.color}}draw(t){if(!this.rasterized){const{graph:t,color:e,x:s,y:a}=this,{r:i,g:n,b:h,a:o}=P(e),r=t.ctx2.getImageData(0,0,t.width,t.height),c=b(r,s,a);let l=c[0][0],d=c[0][1],u=l,y=d;c.forEach((([t,e])=>{t<l&&(l=t),e<d&&(d=e),t>u&&(u=t),e>y&&(y=e)}));const g=document.createElement("canvas"),f=Math.floor(u-l)+1,p=Math.floor(y-d)+1;g.width=f,g.height=p;const m=g.getContext("2d"),v=m.createImageData(f,p);c.forEach((([t,e])=>{const s=4*(t-l+(e-d)*f);v.data[s]=i,v.data[s+1]=n,v.data[s+2]=h,v.data[s+3]=o})),m.putImageData(v,0,0);const x=t.getRelativeCoord(l,d),w=Math.round(f/t.scale),C=Math.round(p/t.scale);this.rasterized={x:x.x,y:x.y,width:w,height:C,rotation:-t.rotation,canvas:g}}const{x:e,y:s,width:a,height:i,rotation:n,canvas:h}=this.rasterized;t.translate(e,s),t.rotate(n),t.drawImage(h,0,0,a,i)}}let z,I;function E(t){t.on("drop",(e=>{const s=e;z=Math.floor(s.x),I=Math.floor(s.y-t.canvas.offsetTop);const a=new M(t,z,I,t.state.pen.color);t.add(a)}))}function R(t){const e=e=>{t.emit("touchstart",e)},s=e=>{e.preventDefault(),t.emit("touchmove",e)},a=e=>{t.emit("touchend",e)};t.canvas.addEventListener("touchstart",e),t.canvas.addEventListener("touchmove",s),t.canvas.addEventListener("touchend",a),w(t),u(t),E(t)}class S{constructor(){h(this,"canvas",document.createElement("canvas")),h(this,"canvas2",document.createElement("canvas")),h(this,"canvas3",document.createElement("canvas")),h(this,"ctx",this.canvas.getContext("2d")),h(this,"ctx2",this.canvas2.getContext("2d")),h(this,"ctx3",this.canvas3.getContext("2d")),h(this,"x",0),h(this,"y",0),h(this,"width",200),h(this,"height",200),h(this,"scale",1),h(this,"rotation",0),h(this,"backgroundColor","#fff"),h(this,"layers",[]),h(this,"index",-1),h(this,"handlers",{}),h(this,"activePath",null),h(this,"animationId",null),h(this,"state",{mode:"pen",pen:{size:1,color:"#000"},eraser:{size:1}}),this.canvas.style.background="#fff",R(this)}mount(t){t.appendChild(this.canvas);const e=t.offsetWidth,s=t.offsetHeight;this.resize(e,s)}createLayer(t,e){return"Pen"===t?new f(e):"Eraser"===t?new p(e):new M(this,e.x,e.y,e.color)}load(t){const{x:e,y:s,scale:a,rotation:i,width:n,height:h,layers:o,backgroundColor:r}=t;this.resize(n,h),this.x=e,this.y=s,this.rotation=i,this.scale=a,this.layers=o.map((({type:t,...e})=>this.createLayer(t,e))),this.backgroundColor=r,this.index=this.layers.length-1,this.flush()}getData(){const{x:t,y:e,scale:s,rotation:a,width:i,height:n,layers:h,backgroundColor:o}=this;return{x:t,y:e,scale:s,rotation:a,width:i,height:n,backgroundColor:o,layers:h.map((t=>t.getData()))}}resize(t,e){this.width=t,this.height=e,this.canvas.width=this.canvas2.width=this.canvas3.width=t,this.canvas.height=this.canvas2.height=this.canvas3.height=e,this.canvas.style.width=this.canvas2.style.width=this.canvas3.style.width=t+"px",this.canvas.style.height=this.canvas2.style.height=this.canvas3.style.height=e+"px",this.flush()}resetViewport(){this.x=this.y=this.rotation=0,this.scale=1}render(){this.animationId&&window.cancelAnimationFrame(this.animationId),this.drawFrame(),this.animationId=window.requestAnimationFrame((()=>this.render()))}flush(){const{x:t,y:e,ctx2:s,scale:a,rotation:i}=this,n=this.layers.slice(0,this.index+1);s.clearRect(0,0,this.width,this.height),s.save(),s.translate(t,e),s.scale(a,a),s.rotate(i),this.emit("beforeRender",s),n.forEach((t=>{s.save(),t.draw(s),s.restore()})),s.restore()}drawFrame(){const{x:t,y:e,scale:s,width:a,height:i,rotation:n,backgroundColor:h,ctx:o,ctx3:r}=this;r.clearRect(0,0,a,i),r.drawImage(this.canvas2,0,0,a,i),this.activePath&&(r.save(),r.translate(t,e),r.scale(s,s),r.rotate(n),this.activePath.draw(r),r.restore()),o.clearRect(0,0,a,i),o.fillStyle=h,o.fillRect(0,0,a,i),o.drawImage(this.canvas3,0,0,a,i)}getRelativeCoord(t,e){return new o(t,e).translate(-this.x,-this.y).scale(1/this.scale,1/this.scale).rotate(-this.rotation)}on(t,e){this.handlers[t]||(this.handlers[t]=[]);const s=this.handlers[t];s.push(e)}off(t,e){if(!this.handlers[t])return;if(!e)return void(this.handlers[t]=[]);const s=this.handlers[t],a=s.indexOf(e);a>-1&&s.splice(a,1)}emit(t,...e){const s=this.handlers[t];s&&0!==s.length&&s.forEach((t=>t(...e)))}undo(){-1!==this.index&&(this.index--,this.flush())}redo(){this.index!==this.layers.length-1&&(this.index++,this.flush())}add(t){this.layers=[...this.layers.slice(0,this.index+1),t],this.index=this.layers.length-1,this.flush(),document.body.appendChild(this.canvas2)}clear(){this.layers=[],this.index=-1,this.activePath=null,this.flush()}setMode(t){this.state.mode=t}distroy(){this.animationId&&window.cancelAnimationFrame(this.animationId)}}},3913:function(t,e,s){s.d(e,{A:function(){return y}});var a=s(6768),i=s(4232),n=s(1387);const h={class:"header-bar"},o={class:"prepend"},r={style:{"{ 'text-align'":"alignment }"}},c={class:"append"};var l=(0,a.pM)({__name:"HeaderBar",props:{title:{default:""},alignment:{default:"left"},showBack:{type:Boolean,default:!1}},setup(t){(0,n.rd)();return(t,e)=>((0,a.uX)(),(0,a.CE)("div",h,[(0,a.Lk)("span",o,[(0,a.RG)(t.$slots,"prepend")]),(0,a.RG)(t.$slots,"default",{},(()=>[(0,a.Lk)("span",r,(0,i.v_)(t.title),1)])),(0,a.Lk)("span",c,[(0,a.RG)(t.$slots,"append")])]))}}),d=s(1241);const u=(0,d.A)(l,[["__scopeId","data-v-1b2d6d4e"]]);var y=u}}]);
//# sourceMappingURL=29.3090399c.js.map
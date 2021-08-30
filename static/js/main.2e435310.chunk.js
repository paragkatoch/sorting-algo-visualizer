(this["webpackJsonpsorting-algo-visualizer"]=this["webpackJsonpsorting-algo-visualizer"]||[]).push([[0],[,,,,,,,,,,,,,function(t,e,n){},,function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){"use strict";n.r(e);var c=n(0),a=n.n(c),r=n(7),i=n.n(r),u=(n(13),n(2)),o=n(3),s=n(8),j=n(1),f=a.a.createContext(),b={boxShadow:"0 0 4px 0px #565656",filter:"none"},O=function(t,e,n){return t/(100*Math.ceil(e/3))*(.7*n)},l=function(t,e){return.5*e/t},d=function(t,e,n){var c=l(e,n),a=20;return c>25?(c<40?a=12:c<80&&(a=16),Object(j.jsx)("p",{style:{fontSize:"".concat(a,"px")},children:t})):null},h=function(t){switch(t){case-1:return"#A31C1C";case 1:return"#1CA321";case 2:return"#1C21A3";default:return"#1C62A3"}},p=function(t){for(var e=[],n=(t>5?t+2:t+3)*t,c=1;c<=n;c++)e.push([Math.floor(10+Math.random()*(100*Math.ceil(t/3)-10)),0]);return e},v={Bubble:{pause:!0},Selection:{pause:!0},Insertion:{pause:!0},Merge:{pause:!0},Quick:{pause:!1}},g=a.a.memo((function(t){var e=t.name,n=t.value,a=t.min,r=void 0===a?1:a,i=t.max,u=void 0===i?10:i,o=Object(c.useContext)(f).dispatch;return Object(j.jsx)(j.Fragment,{children:Object(j.jsx)("input",{className:e,type:"range",min:r,max:u,value:n,onInput:function(t){var e=t.target,n=e.className,c=e.value,a=Math.abs(Number(c));o({type:n,data:a})}})})})),x=["title"];function y(){var t=Object(c.useContext)(f),e=[{name:"size",title:"Array size",value:t.size},{name:"speed",title:"Sorting speed",value:-1*t.speed,min:-10,max:-1}];return Object(j.jsx)(m,{types:e})}var m=a.a.memo((function(t){var e=t.types;return Object(j.jsx)(j.Fragment,{children:e.map((function(t){var e=t.title,n=Object(s.a)(t,x);return Object(j.jsxs)("section",{className:"slider_".concat(n.name),children:[Object(j.jsx)("p",{children:e}),Object(j.jsx)(g,Object(o.a)({},n))]},n.name)}))})})),S=(n(15),n.p+"static/media/downArrow.cf7bd89e.svg");function C(t){var e=t.deadState,n=Object(c.useContext)(f),a=n.algoType,r=n.running,i=n.dispatch,u=Object(c.useRef)(),o=Object(c.useRef)(),s=a?"".concat(a," Sort"):"Type of algorithm";return Object(j.jsx)(w,{ref:{containerRef:u,optionRef:o},deadState:e,handleClick:function(){r||setTimeout((function(){o.current.classList.toggle("algoDropDown_container_interaction")}),100)},current:s,running:r,handleChange:function(t){o.current.className="algoDropDown_options",u.current.classList.toggle("algoDropDown_interaction"),setTimeout((function(){u.current.classList.toggle("algoDropDown_interaction")}),100),i({type:"algoType",data:t.target.id})}})}var w=a.a.forwardRef((function(t,e){var n=e.containerRef,c=e.optionRef,a=Object.keys(v).map((function(e,n){return Object(j.jsxs)("li",{children:[Object(j.jsx)("button",{id:e,onClick:t.handleChange,children:"".concat(e," Sort")}),n<Object.keys(v).length-1&&Object(j.jsx)("hr",{})]},n)}));return Object(j.jsxs)("section",{ref:n,className:"algoDropDown_container algoDropDown_interaction",children:[Object(j.jsxs)("button",{style:t.deadState,className:"algoDropDown_button button-style button-action",onClick:t.handleClick,children:[Object(j.jsx)("p",{children:t.current}),Object(j.jsx)("img",{src:S,alt:"Down Arrow"})]}),!t.running&&Object(j.jsx)("div",{className:"algoDropDown_options",id:"options",ref:c,children:Object(j.jsx)("ul",{className:"options",children:a})})]})})),E=(n(16),n.p+"static/media/menuOpen.db3319ac.svg"),N=n.p+"static/media/menuClose.cba5efdd.svg";function k(){var t=Object(c.useState)({}),e=Object(u.a)(t,2),n=e[0],a=e[1],r=Object(c.useContext)(f),i=r.running,o=r.dispatch,s=Object(c.useRef)();Object(c.useEffect)((function(){var t=Object.keys(n).length;i&&!t?a(b):!i&&t&&a({})}),[i]);return Object(j.jsx)(z,{handleClick:function(t){o({type:"reset"})},handleVisibility:function(){s.current.classList.toggle("sidebar_container_action")},ref:s,deadState:n})}var z=a.a.forwardRef((function(t,e){var n=t.handleClick,c=t.handleVisibility,a=t.deadState;return Object(j.jsxs)("section",{className:"Sidebar",children:[Object(j.jsx)("button",{id:"show",className:"visibility_button",onClick:c,children:Object(j.jsx)("img",{src:E,alt:"open"})}),Object(j.jsx)("div",{ref:e,className:"sidebar_container",children:Object(j.jsxs)("section",{className:"sidebar_main",children:[Object(j.jsx)("button",{style:a,className:"newArray button-style button-action",onClick:n,children:Object(j.jsx)("p",{children:"New Array"})}),Object(j.jsx)(C,{deadState:a}),Object(j.jsx)(y,{}),Object(j.jsx)("button",{className:"visibility_button",onClick:c,children:Object(j.jsx)("img",{src:N,alt:"close"})})]})})]})}));n(17);function I(){var t=Object(c.useState)(b),e=Object(u.a)(t,2),n=e[0],a=e[1],r=Object(c.useContext)(f),i=r.algoType,o=r.running,s=r.dispatch,O=Object(c.useRef)(),l=Object(c.useState)(!1),d=Object(u.a)(l,2),h=d[0],p=d[1],g=Object.keys(n).length;Object(c.useEffect)((function(){i||g?i&&g&&a({}):a(b)}),[i]),Object(c.useEffect)((function(){h&&!g?a(b):!h&&g&&i&&a({})}),[h]),Object(c.useEffect)((function(){O.current&&(O.current.innerText=o?"stop":"start")}),[o]);return Object(j.jsx)(J,{buttonStyle:n,handleChange:function(){h||("stop"===O.current.innerText&&(p(!0),setTimeout((function(){p(!1)}),[500])),"stop"===O.current.innerText?v[i].pause?s({type:O.current.innerText}):alert("Stopping functionality for ".concat(i," Sort is under construction.\nAlthough the sorting is paused right now \ud83d\ude0b.")):"start"===O.current.innerText&&s({type:O.current.innerText}))},ref:O})}var J=a.a.forwardRef((function(t,e){var n=t.buttonStyle,c=t.handleChange;return Object(j.jsxs)("header",{className:"MainHeader",children:[Object(j.jsx)("div",{className:"app_name",children:Object(j.jsx)("h1",{children:"Sorting Algorithm Visualizer"})}),Object(j.jsx)("div",{className:"divider"}),Object(j.jsx)("div",{className:"start_container",children:Object(j.jsx)("button",{style:n,className:"start button-style button-action",onClick:c,children:Object(j.jsx)("p",{ref:e,children:"start"})})})]})}));function T(t){var e=Object(c.useState)(-1),n=Object(u.a)(e,2),a=n[0],r=n[1],i=Object(c.useState)(-1),s=Object(u.a)(i,2),b=s[0],O=s[1],l=Object(c.useState)(!1),d=Object(u.a)(l,2),h=d[0],p=d[1],v=Object(c.useState)({I:-1,J:-1}),g=Object(u.a)(v,2),x=g[0],y=g[1],m=Object(c.useState)(!0),S=Object(u.a)(m,2)[1],C=Object(c.useContext)(f),w=C.array,E=C.running,N=C.speed,k=C.dispatch,z=w.length;function I(t,e){k({type:"array",data:t}),e&&S((function(t){return!t}))}function J(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],c=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],a=w;n?(a[t][1]=e,a[t+1][1]=e):a[t][1]=e,I(a,c)}function T(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4*Math.pow(N,2);setTimeout((function(){E&&t()}),e)}return Object(c.useEffect)((function(){h&&(r(-1),O(-1),p(!1),y({I:-1,J:-1}))}),[w]),Object(c.useEffect)((function(){if(h&&E)r(-100);else if(E)r(-1===a?0:function(t){return t});else if(a>-1){p(!0),y({I:a,J:b>-1?b:0})}}),[E]),Object(c.useEffect)((function(){-100===a?r(x.I):E&&(a>=z-1?(k({type:"stop"}),r(-1),O(-1)):T(h?function(){O(-100),p(!1)}:function(){O(0)}))}),[a]),Object(c.useEffect)((function(){-100===b?O(x.J):E&&a>=0&&(b>=z-a-1?(1===b?J(b-1,2,!0,!1):J(b,2,!1,!1),r((function(t){return t+1}))):(J(b,1),T((function(){w[b][0]>w[b+1][0]?(J(b,-1),T((function(){!function(t){var e=w,n=e[t][0];e[t][0]=e[t+1][0],e[t+1][0]=n,I(e,!0)}(b),T((function(){J(b,1),T((function(){J(b,0,!1,!1),O((function(t){return t+1}))}))}))}))):(J(b,0,!1,!1),T((function(){O((function(t){return t+1}))})))}))))}),[b]),Object(j.jsx)(t.childComponent,Object(o.a)({},t.childProps))}var _=n(4);function D(t){var e=Object(c.useState)(-2),n=Object(u.a)(e,2),a=n[0],r=n[1],i=Object(c.useState)(-2),s=Object(u.a)(i,2),b=s[0],O=s[1],l=Object(c.useState)(null),d=Object(u.a)(l,2),h=d[0],p=d[1],v=Object(c.useState)(!1),g=Object(u.a)(v,2),x=g[0],y=g[1],m=Object(c.useState)({I:-2,J:-2}),S=Object(u.a)(m,2),C=S[0],w=S[1],E=Object(c.useState)(!1),N=Object(u.a)(E,2),k=N[0],z=N[1],I=Object(c.useState)(!0),J=Object(u.a)(I,2)[1],T=Object(c.useContext)(f),D=T.array,M=T.running,A=T.speed,R=T.dispatch,P=D.length;function L(){r(-2),O(-2),p(null),w({I:-2,J:-2}),y(!1),z(!1)}function W(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4*Math.pow(A,2);setTimeout((function(){M&&t()}),e)}function H(t,e){var n,c=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],a=D,r=Object(_.a)(t);try{for(r.s();!(n=r.n()).done;){var i=n.value;a[i][1]=e}}catch(u){r.e(u)}finally{r.f()}B(a,c)}function B(t,e){R({type:"array",data:t}),e&&J((function(t){return!t}))}return Object(c.useEffect)((function(){M||L()}),[D]),Object(c.useEffect)((function(){M&&!x?(z(!0),r(1)):!M&&k?(w({I:a,J:b}),y(!0)):M&&x&&r(-10)}),[M]),Object(c.useEffect)((function(){M&&-2!==a&&(-10===a?r(C.I):a<P?W((function(){x?(C.J!==b&&w({I:a,J:b}),O(-10)):(p(D[a]),H([a],1),O(a-1))})):(!function(t,e){for(var n=D,c=t;c<e;c++)n[c][1]=2;B(n,!1)}(0,P),R({type:"stop"}),L()))}),[a]),Object(c.useEffect)((function(){M&&-2!==b&&W((function(){-10===b?(y(!1),O(C.J)):b>=0&&D[b][0]>h[0]?(H([b+1],-1),W((function(){!function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=D;n[t+1]=n[t],n[t]=h,B(n,e)}(b),O((function(t){return t-1}))}))):(r((function(t){return t+1})),H([b+1],0))}))}),[b]),Object(j.jsx)(t.childComponent,Object(o.a)({},t.childProps))}function M(t){var e=Object(c.useContext)(f),n=e.array,a=e.running,r=e.speed,i=e.dispatch,s=n.length,b=Object(c.useState)(!0),O=Object(u.a)(b,2)[1],l=Object(c.useState)(!1),d=Object(u.a)(l,2),h=d[0],p=d[1],v=Object(c.useState)(!1),g=Object(u.a)(v,2),x=g[0],y=g[1],m=Object(c.useState)(!1),S=Object(u.a)(m,2),C=S[0],w=S[1],E=Object(c.useState)(),N=Object(u.a)(E,2),k=N[0],z=N[1],I=Object(c.useState)(),J=Object(u.a)(I,2),T=J[0],_=J[1],D=Object(c.useState)(),M=Object(u.a)(D,2),A=M[0],R=M[1],P=Object(c.useState)(!1),L=Object(u.a)(P,2),W=L[0],H=L[1],B=Object(c.useState)(!1),F=Object(u.a)(B,2),V=F[0],Q=F[1],G=Object(c.useState)(),q=Object(u.a)(G,2),K=q[0],U=q[1],X=Object(c.useState)(-1),Y=Object(u.a)(X,2),Z=Y[0],$=Y[1],tt=Object(c.useState)(-1),et=Object(u.a)(tt,2),nt=et[0],ct=et[1];function at(){R(new Array(n.length).fill(1)),$(-1),ct(-1),w(!1),H(!1),y(!1),p(!1)}function rt(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4*Math.pow(r,2);setTimeout((function(){a?t():w({I:Z,J:nt})}),e)}function it(t,e){for(var c=n,a=c[e],r=e;r>t;r--)c[r]=c[r-1];return c[t]=a,c}function ut(t,e,c){for(var a=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],r=n,i=t;i<e;i++)r[i][1]=c;ot(r,a)}function ot(t,e){i({type:"array",data:t}),e&&O((function(t){return!t}))}return Object(c.useEffect)((function(){a||at()}),[n]),Object(c.useEffect)((function(){a&&!h?(y(!0),z(1),_(2)):!a&&x?(H(!1),p(!0)):a&&h&&(H(!1),p(!1))}),[a]),Object(c.useEffect)((function(){a&&!h&&(0===k?T===s?(at(),i({type:"stop"})):rt((function(){_((function(t){return t+2})),z(2)})):rt((function(){A[k-1]===A[k]||T===s?($(T-(A[k]+A[k-1])),ct(T-A[k]),H(!0)):(_((function(t){return t+1})),z((function(t){return t+1})))})))}),[k,h]),Object(c.useEffect)((function(){W&&(C?($(C.I),ct(C.J),w(!1)):(U(Z),ut(Z,T,1)),rt((function(){Q((function(t){return!t}))})))}),[W]),Object(c.useEffect)((function(){W&&a?rt((function(){if(Z<nt&&nt<T)n[Z][0]<=n[nt][0]?($((function(t){return t+1})),Q((function(t){return!t}))):(-1!==n[Z][1]&&ut(K,T,-1),rt((function(){i({type:"array",data:it(Z,nt)}),ct((function(t){return t+1})),$((function(t){return t+1})),Q((function(t){return!t}))})));else if(Z===nt||nt===T){if(1===k&&T===s)return ut(0,T,2),z((function(t){return t-1}));ut(K,T,0),rt((function(){R(function(){var t=A;return t[k-1]+=t[k],t.splice(k,1),t}()),H(!1),z((function(t){return t-1}))}))}})):-1!==Z&&-1!==nt&&h&&w({I:Z,J:nt})}),[V]),Object(j.jsx)(t.childComponent,Object(o.a)({},t.childProps))}function A(t){var e=Object(c.useContext)(f),n=e.array,a=e.running,r=e.speed,i=e.dispatch,s=n.length,b=Object(c.useState)(!0),O=Object(u.a)(b,2)[1],l=Object(c.useState)(!1),d=Object(u.a)(l,2),h=d[0],p=(d[1],Object(c.useState)(!1)),v=Object(u.a)(p,2),g=v[0],x=v[1],y=Object(c.useState)(),m=Object(u.a)(y,2),S=m[0],C=m[1],w=Object(c.useState)(!1),E=Object(u.a)(w,2),N=E[0],k=E[1],z=Object(c.useState)(),I=Object(u.a)(z,2),J=I[0],T=I[1],D=Object(c.useState)(),M=Object(u.a)(D,2),A=M[0],R=M[1],P=Object(c.useState)(-1),L=Object(u.a)(P,2),W=L[0],H=L[1],B=Object(c.useState)(-1),F=Object(u.a)(B,2),V=F[0],Q=F[1];function G(t,e){var c=n,a=c[t];return c[t]=c[e],c[e]=a,c}function q(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4*Math.pow(r,2);setTimeout((function(){a&&t()}),e)}function K(t,e){var c,a=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=n,i=Object(_.a)(t);try{for(i.s();!(c=i.n()).done;){var u=c.value;r[u][1]=e}}catch(o){i.e(o)}finally{i.f()}U(r,a)}function U(t,e){i({type:"array",data:t}),e&&O((function(t){return!t}))}return Object(c.useEffect)((function(){a&&!h&&(T([[-1,1]]),R([[0,s]]),C(1),k(!0))}),[a]),Object(c.useEffect)((function(){if(a){var t=J,e=A,n=W+1;if(-10===n)if(0===t[S-1][1])t[S-1][1]=1,e.pop(),e.push([t[S-1][0]+1,e[S-2][1]]),T(t),R(e),k(!0);else{if(1===S)return void i({type:"stop"});t.pop(),e.pop(),T(t),R(e),C((function(t){return t-1})),x((function(t){return!t}))}else t[S-1][1],e.push([e[S-1][0],n]),t.push([n,0]),T(t),R(e),C((function(t){return t+1})),k(!0)}}),[g]),Object(c.useEffect)((function(){if(N){var t=A[S-1];t[1]-t[0]<2?(t[0]<s&&K([t[0]],2),H(-11),x((function(t){return!t})),k(!1)):q((function(){K([t[1]-1],1,!0),q((function(){H(t[0]-1),Q(t[0]),k(!1)}))}))}}),[N]),Object(c.useEffect)((function(){if(a&&!h){var t=A[S-1][1]-1;V<t?(K([W+1,V],1,!0),q((function(){n[V][0]<n[t][0]?(W+1!==V&&K([W+1,V],-1,!0),q((function(){i({type:"array",data:G(W+1,V)}),q((function(){K([W+1,V],1,!0),q((function(){K([W+1,V],0),H((function(t){return t+1})),Q((function(t){return t+1}))}))}))}))):(K([W+1,V],0),Q((function(t){return t+1})))}))):(K([t],2),i({type:"array",data:G(W+1,t)}),x((function(t){return!t})))}}),[V]),Object(j.jsx)(t.childComponent,Object(o.a)({},t.childProps))}function R(t){var e=Object(c.useState)(-1),n=Object(u.a)(e,2),a=n[0],r=n[1],i=Object(c.useState)(-1),s=Object(u.a)(i,2),b=s[0],O=s[1],l=Object(c.useState)(!1),d=Object(u.a)(l,2),h=d[0],p=d[1],v=Object(c.useState)({I:-1,J:-1}),g=Object(u.a)(v,2),x=g[0],y=g[1],m=Object(c.useState)(!1),S=Object(u.a)(m,2),C=S[0],w=S[1],E=Object(c.useState)(!0),N=Object(u.a)(E,2)[1],k=Object(c.useContext)(f),z=k.array,I=k.running,J=k.speed,T=k.dispatch,D=z.length;function M(){r(-1),O(-1),y({I:-1,J:-1}),p(!1),w(!1)}function A(t,e){var n=z,c=n[t][0];return n[t][0]=n[e][0],n[e][0]=c,n}function R(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4*Math.pow(J,2);setTimeout((function(){I&&t()}),e)}function P(t,e){var n,c=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],a=z,r=Object(_.a)(t);try{for(r.s();!(n=r.n()).done;){var i=n.value;a[i][1]=e}}catch(u){r.e(u)}finally{r.f()}L(a,c)}function L(t,e){T({type:"array",data:t}),e&&N((function(t){return!t}))}return Object(c.useEffect)((function(){!I&&C&&M()}),[z]),Object(c.useEffect)((function(){I&&!h?(w(!0),r(0)):!I&&C?(p(!0),y({I:a,J:b})):I&&h&&r(-10)}),[I]),Object(c.useEffect)((function(){I&&-1!==a&&(-10===a?r(x.I):a<D-1?R((function(){h?(x.J!==b&&y({I:a,J:b}),O(-10)):(P([a],1,!1),O(a+1))})):(P([a],2),T({type:"stop"}),M()))}),[a]),Object(c.useEffect)((function(){I&&-1!==b&&(-10===b?(p(!1),O(x.J)):R(b<D?function(){P([b],1),R((function(){z[b][0]<z[a][0]?(P([a,b],-1),R((function(){T({type:"array",data:A(a,b)}),P([a],1),P([b],0),R((function(){O((function(t){return t+1}))}))}))):(P([b],0),O((function(t){return t+1})))}))}:function(){P([a],2),r((function(t){return t+1}))}))}),[b]),Object(j.jsx)(t.childComponent,Object(o.a)({},t.childProps))}function P(t){var e=Object(c.useContext)(f),n=e.array,a=e.algoType,r=e.dispatch,i=Object(c.useState)(),s=Object(u.a)(i,2),b=s[0],O=s[1];switch(Object(c.useEffect)((function(){b!==a&&(!function(){for(var t=n,e=0;e<t.length;e++)t[e][1]=0;r({type:"array",data:t})}(),O(a))}),[a]),b){case"Merge":return Object(j.jsx)(M,Object(o.a)({},t));case"Quick":return Object(j.jsx)(A,Object(o.a)({},t));case"Bubble":return Object(j.jsx)(T,Object(o.a)({},t));case"Selection":return Object(j.jsx)(R,Object(o.a)({},t));case"Insertion":return Object(j.jsx)(D,Object(o.a)({},t));default:return Object(j.jsx)(t.childComponent,Object(o.a)({},t.childProps))}}function L(t){var e=t.gridSize,n=Object(c.useContext)(f),a={childProps:{array:n.array,gridSize:e,size:n.size},childComponent:W};return Object(j.jsx)(P,Object(o.a)({},a))}function W(t){var e=t.array,n=t.gridSize,c=t.size;return Object(j.jsx)(j.Fragment,{children:e.map((function(t,e,a){return Object(j.jsx)("div",{className:"bar",id:"".concat(t[0]," ").concat(n.clientHeight," ").concat(c),style:{height:"".concat(O(t[0],c,n.clientHeight),"px"),width:"".concat(l(a.length,n.clientWidth),"px"),backgroundColor:"".concat(h(t[1])),margin:"".concat((r=a.length,i=n.clientWidth,Math.min(.24*i/r,20)),"px")},children:d(t[0],a.length,n.clientWidth)},e);var r,i}))})}n(18);function H(){var t=Object(c.useState)(),e=Object(u.a)(t,2),n=e[0],a=e[1],r=Object(c.useContext)(f),i=r.newArray,o=r.size,s=r.dispatch,b=Object(c.useRef)();Object(c.useEffect)((function(){i&&(s({type:"array",data:p(o)}),s({type:"reset"}))}),[i,o,s]),Object(c.useEffect)((function(){return window.addEventListener("resize",O),O(),function(){window.removeEventListener("resize",O)}}),[]);var O=function(){var t=b.current,e=t.clientWidth,n=t.clientHeight;a({clientWidth:e,clientHeight:n})};return Object(j.jsx)(B,{gridSize:n,ref:b})}var B=a.a.forwardRef((function(t,e){var n=t.gridSize;return Object(j.jsx)("div",{className:"Grid",children:Object(j.jsxs)("div",{ref:e,className:"grid_container",children:[Object(j.jsx)("div",{className:"ruler"}),Object(j.jsx)("div",{className:"arrayBars",children:Object(j.jsx)(L,{gridSize:n})})]})})}));n(19);function F(){var t=Object(c.useState)(!0),e=Object(u.a)(t,2),n=e[0],a=e[1],r=Object(c.useState)(""),i=Object(u.a)(r,2),o=i[0],s=i[1],b=Object(c.useState)(2),O=Object(u.a)(b,2),l=O[0],d=O[1],h=Object(c.useState)(8),p=Object(u.a)(h,2),v=p[0],g=p[1],x=Object(c.useState)(!1),y=Object(u.a)(x,2),m=y[0],S=y[1],C=Object(c.useState)([]),w=Object(u.a)(C,2),E=w[0],N=w[1];return Object(j.jsx)("div",{className:"App",children:Object(j.jsxs)(f.Provider,{value:{newArray:n,size:l,speed:v,running:m,algoType:o,dispatch:function(t){var e=t.type,c=t.data;switch(e){case"reset":m||a((function(t){return!t}));break;case"algoType":m||s(c);break;case"size":m||(a(!0),d(c));break;case"speed":g(c);break;case"start":""!==o&&S(!0);break;case"stop":""!==o&&S(!1);break;case"array":(m||n)&&N(c);break;default:console.log("What are you doing?")}},array:E},children:[Object(j.jsx)(I,{}),Object(j.jsxs)("main",{className:"Main",children:[Object(j.jsx)(H,{}),Object(j.jsx)(k,{})]})]})})}i.a.render(Object(j.jsx)(a.a.StrictMode,{children:Object(j.jsx)(F,{})}),document.getElementById("root"))}],[[20,1,2]]]);
//# sourceMappingURL=main.2e435310.chunk.js.map
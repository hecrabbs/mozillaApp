(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{30:function(e,t,a){e.exports=a.p+"static/media/JuxtaPollsLogo512.a3184c3d.png"},35:function(e,t,a){e.exports=a(49)},40:function(e,t,a){},41:function(e,t,a){e.exports=a.p+"static/media/GothicA1-Regular.e742f688.ttf"},44:function(e,t,a){},49:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(16),c=a.n(r),u=(a(40),a(41),a(17)),s=a(31),o=a(5),i=(a(42),a(34)),m=a(26),d=a(10),E=a(33),b=a(9),p=a(6),f=a(15),_=a(25),h=a(12);function v(e){var t="".concat("https://newsapi.org/v2/everything?sortBy=relevancy&q=").concat(e).concat("&apiKey=bbdaee4b911644a796017954f3f1362a");if(e)return fetch(t).then((function(e){return e.json()}))}var g=function(e){var t={width:150};return l.a.createElement("div",{className:"newsResults"},e.results&&e.results.map((function(e){return l.a.createElement(h.a,{key:e.url},l.a.createElement(h.a.Body,null,l.a.createElement(h.a.Img,{variant:"top",style:t,src:e.urlToImage}),l.a.createElement(h.a.Title,null,l.a.createElement(h.a.Link,{href:e.url,target:"_blank"},e.title)),l.a.createElement(h.a.Text,null,e.description)))})))};a(44);var C=function(){var e=Object(n.useState)(!1),t=Object(o.a)(e,2),r=t[0],c=t[1],h=Object(n.useState)({}),C=Object(o.a)(h,2),j=C[0],y=C[1],O=Object(n.useState)([]),A=Object(o.a)(O,2),S=A[0],T=A[1],N=Object(n.useState)([]),w=Object(o.a)(N,2),L=w[0],x=w[1],k=Object(n.useState)([]),I=Object(o.a)(k,2),K=I[0],V=I[1],D=Object(n.useState)([]),H=Object(o.a)(D,2),G=H[0],J=H[1],P=Object(n.useState)(!1),R=Object(o.a)(P,2),U=R[0],z=R[1],B=Object(n.useState)([]),M=Object(o.a)(B,2),F=M[0],X=M[1],$=Object(n.useState)(!1),Z=Object(o.a)($,2),W=Z[0],q=Z[1],Q=Object(n.useState)([]),Y=Object(o.a)(Q,2),ee=Y[0],te=Y[1],ae=Object(n.useState)([]),ne=Object(o.a)(ae,2),le=ne[0],re=ne[1],ce=Object(n.useState)([]),ue=Object(o.a)(ce,2),se=ue[0],oe=ue[1],ie=Object(n.useState)([]),me=Object(o.a)(ie,2),de=me[0],Ee=me[1],be=Object(n.useState)([]),pe=Object(o.a)(be,2),fe=pe[0],_e=pe[1],he=Object(n.useState)(!1),ve=Object(o.a)(he,2),ge=ve[0],Ce=ve[1],je=Object(n.useState)([]),ye=Object(o.a)(je,2),Oe=ye[0],Ae=ye[1];function Se(e,t){var a="https://api.open.fec.gov/v1/names/candidates/?q=".concat(e,"&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp");fetch(a).then((function(e){return e.json()})).then((function(e){n(e)})).catch((function(e){console.log(e)}));var n=function(e){var a=e.results;if(0===a.length)throw Error("Invalid Entry");!function(e,t){var a=e.map((function(e){return function(e){return"https://api.open.fec.gov/v1/candidate/".concat(e,"/?sort_nulls_last=false&sort_null_only=false&per_page=20&page=1&sort=name&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp&sort_hide_null=false")}(e)}));Promise.all(a.map((function(e){return fetch(e).then((function(e){return e.json()}))}))).then((function(e){n(e)}));var n=function(a){var n=a.map((function(e){return e.results[0].active_through})).indexOf(2020),l=e[n];!function(e,t){var a="https://api.open.fec.gov/v1/candidate/".concat(e,"/?sort_nulls_last=false&sort_null_only=false&per_page=20&page=1&sort=name&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp&sort_hide_null=false");fetch(a).then((function(e){return e.json()})).then((function(e){1===t?y(e.results[0]):2===t&&te(e.results[0])}))}(l,t),function(e,t){var a="https://api.open.fec.gov/v1/candidate/".concat(e,"/totals/?sort=-cycle&sort_nulls_last=true&sort_null_only=false&per_page=20&cycle=2020&election_full=false&page=1&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp");fetch(a).then((function(e){return e.json()})).then((function(e){1===t?T(e.results[0]):2===t&&re(e.results[0])}))}(l,t),function(e,t){var a="https://api.open.fec.gov/v1/candidate/".concat(e,"/committees/?sort=-last_file_date&sort_hide_null=false&committee_type=P&sort_nulls_last=false&per_page=20&sort_null_only=false&cycle=2020&page=1&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp");fetch(a).then((function(e){return e.json()})).then((function(e){n(e)}));var n=function(e){1===t?x(e.results[0]):2===t&&oe(e.results[0]);var a=e.results[0].committee_id;!function(e,t){var a="https://api.open.fec.gov/v1/schedules/schedule_a/?is_individual=false&sort_hide_null=false&sort_null_only=false&sort=-contribution_receipt_amount&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp&committee_id=".concat(e,"&per_page=10");fetch(a).then((function(e){return e.json()})).then((function(e){1===t?V(e.results):2===t&&Ee(e.results)}))}(a,t),function(e,t){var a="https://api.open.fec.gov/v1/schedules/schedule_a/?is_individual=true&sort_hide_null=false&sort_null_only=false&sort=-contribution_receipt_amount&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp&committee_id=".concat(e,"&per_page=10");fetch(a).then((function(e){return e.json()})).then((function(e){1===t?(J(e.results),z(!0)):2===t&&(_e(e.results),Ce(!0))}))}(a,t)}}(l,t)}}(a.map((function(e){return e.id})),t)}}function Te(){var e=Object(n.useState)({}),t=Object(o.a)(e,2),a=t[0],r=t[1],i=function(e){return r(Object(s.a)({},a,Object(u.a)({},e.currentTarget.name,e.currentTarget.value)))};return l.a.createElement(d.a,{onSubmit:function(e){e.preventDefault(),""!==e.currentTarget.firstCandidateName.value&&(z(!1),Se(e.currentTarget.firstCandidateName.value,1),v(e.currentTarget.firstCandidateName.value).then((function(e){X(e.articles)})),c(!0)),""!==e.currentTarget.secondCandidateName.value&&(Ce(!1),Se(e.currentTarget.secondCandidateName.value,2),v(e.currentTarget.secondCandidateName.value).then((function(e){Ae(e.articles)})),q(!0))}},l.a.createElement(d.a.Row,null,l.a.createElement(p.a,{xs:6,sm:6,md:6},l.a.createElement(d.a.Group,{controlId:"firstCandidate",className:"Form"},l.a.createElement(d.a.Control,{type:"text",name:"firstCandidateName",placeholder:"First Candidate Name",onChange:i}))),l.a.createElement(p.a,{xs:6,sm:6,md:6},l.a.createElement(d.a.Group,{controlId:"secondCandidate",className:"Form"},l.a.createElement(d.a.Control,{type:"text",name:"secondCandidateName",placeholder:"Second Candidate Name",onChange:i})))),l.a.createElement(d.a.Row,null,l.a.createElement(p.a,null,l.a.createElement(E.a,{type:"submit",className:"Button",block:!0},"Submit"))))}function Ne(e){return r?U?l.a.createElement("div",{className:"Content"},l.a.createElement("b",null,j.party_full)," ",l.a.createElement("br",null)," ",l.a.createElement("br",null),l.a.createElement("b",null,"Candidate ID: "),j.candidate_id," ",l.a.createElement("br",null),l.a.createElement("b",null,"Active Through:")," ",j.active_through," ",l.a.createElement("br",null),l.a.createElement("b",null,"Address:")," ",j.address_street_1," ",l.a.createElement("br",null),l.a.createElement("b",null,"City:")," ",j.address_city," ",l.a.createElement("br",null),l.a.createElement("b",null,"State:")," ",j.address_state," ",l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("b",null,"Date:")," ",S.coverage_start_date,"---",S.coverage_end_date,l.a.createElement("br",null),l.a.createElement("b",null,"Disbursements:")," $",S.disbursements," ",l.a.createElement("br",null),l.a.createElement("b",null,"Receipts:")," $",S.receipts," ",l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("b",null,"Presidential Committee:")," ",L.name," ",l.a.createElement("br",null)," ",l.a.createElement("br",null),l.a.createElement("b",null,"Top Contributions:")," ",l.a.createElement("br",null)," ",l.a.createElement("br",null),K.map((function(e){return l.a.createElement("li",{key:e.sub_id},e.contributor_name,": $",e.contribution_receipt_amount,l.a.createElement("br",null),e.contributor_occupation)}))," ",l.a.createElement("br",null)," ",l.a.createElement("br",null),l.a.createElement("b",null,"Top Individual Contributions:")," ",l.a.createElement("br",null)," ",l.a.createElement("br",null),G.map((function(e){return l.a.createElement("li",{key:e.sub_id},e.contributor_name,": $",e.contribution_receipt_amount,l.a.createElement("br",null),e.contributor_occupation)}))," ",l.a.createElement("br",null)," ",l.a.createElement("br",null),l.a.createElement("b",null,"News:")," ",l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement(g,{results:F})):l.a.createElement("div",null,"LOADING..."):l.a.createElement("div",{className:"Content",style:{textAlign:"center"}},"Search For a Candidate Above.")}function we(e){return W?ge?l.a.createElement("div",{className:"Content"},l.a.createElement("b",null,ee.party_full)," ",l.a.createElement("br",null)," ",l.a.createElement("br",null),l.a.createElement("b",null,"Candidate ID: "),ee.candidate_id," ",l.a.createElement("br",null),l.a.createElement("b",null,"Active Through:")," ",ee.active_through," ",l.a.createElement("br",null),l.a.createElement("b",null,"Address:")," ",ee.address_street_1," ",l.a.createElement("br",null),l.a.createElement("b",null,"City:")," ",ee.address_city," ",l.a.createElement("br",null),l.a.createElement("b",null,"State:")," ",ee.address_state," ",l.a.createElement("br",null)," ",l.a.createElement("br",null),l.a.createElement("b",null,"Date:")," ",le.coverage_start_date,"---",le.coverage_end_date,l.a.createElement("br",null),l.a.createElement("b",null,"Disbursements:")," $",le.disbursements," ",l.a.createElement("br",null),l.a.createElement("b",null,"Receipts:")," $",le.receipts," ",l.a.createElement("br",null)," ",l.a.createElement("br",null),l.a.createElement("b",null,"Presidential Committee:")," ",se.name," ",l.a.createElement("br",null)," ",l.a.createElement("br",null),l.a.createElement("b",null,"Top Contributions:")," ",l.a.createElement("br",null)," ",l.a.createElement("br",null),de.map((function(e){return l.a.createElement("li",{key:e.sub_id},e.contributor_name,": $",e.contribution_receipt_amount,l.a.createElement("br",null),e.contributor_occupation)}))," ",l.a.createElement("br",null)," ",l.a.createElement("br",null),l.a.createElement("b",null,"Top Individual Contributions:")," ",l.a.createElement("br",null)," ",l.a.createElement("br",null),fe.map((function(e){return l.a.createElement("li",{key:e.sub_id},e.contributor_name,": $",e.contribution_receipt_amount,l.a.createElement("br",null),e.contributor_occupation)})),l.a.createElement("br",null)," ",l.a.createElement("br",null),l.a.createElement("b",null,"News:")," ",l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement(g,{results:Oe})):l.a.createElement("div",null,"LOADING..."):l.a.createElement("div",{className:"Content",style:{textAlign:"center"}},"Search For a Candidate Above.")}return l.a.createElement("div",{className:"App"},l.a.createElement(_.BrowserView,null,l.a.createElement(f.a,{fluid:!0,className:"Header"},l.a.createElement(b.a,null,l.a.createElement(p.a,{sm:12,md:6,className:"CenterVertically"},l.a.createElement(b.a,null,l.a.createElement("img",{alt:"Logo",src:a(30),width:"50",height:"50"})," "," ",l.a.createElement("strong",{className:"Title"},l.a.createElement("span",{style:{color:"blue"}},"JUXTA"),l.a.createElement("span",{style:{color:"red"}},"POLLS"))),l.a.createElement(b.a,null,l.a.createElement("span",null,"QUICKLY SEARCH AND COMPARE ",l.a.createElement("b",null,l.a.createElement("i",null,"THE FACTS"))," BETWEEN POLITICAL CANDIDATES"))),l.a.createElement(p.a,{sm:12,md:{size:5,offset:1}},l.a.createElement(Te,null)))),l.a.createElement(f.a,{fluid:!0},l.a.createElement(b.a,null,l.a.createElement(p.a,{md:6,xs:6,className:"verticalLineRight"},l.a.createElement("h3",{className:"BrowserTabs"},U?j.name:"First Candidate:"),l.a.createElement(Ne,null)),l.a.createElement(p.a,{md:6,xs:6,className:"verticalLineLeft"},l.a.createElement("h3",{className:"BrowserTabs"},ge?ee.name:"Second Candidate:"),l.a.createElement(we,null))))),l.a.createElement(_.MobileView,null,l.a.createElement(f.a,{fluid:!0,className:"Header"},l.a.createElement(b.a,null,l.a.createElement(p.a,{sm:12,md:6,className:"CenterVertically"},l.a.createElement(b.a,null,l.a.createElement("img",{alt:"Logo",src:a(30),width:"50",height:"50"})," "," ",l.a.createElement("strong",{className:"Title"},l.a.createElement("span",{style:{color:"blue"}},"JUXTA"),l.a.createElement("span",{style:{color:"red"}},"POLLS"))),l.a.createElement(b.a,null,l.a.createElement("span",null,"QUICKLY SEARCH AND COMPARE ",l.a.createElement("b",null,l.a.createElement("i",null,"THE FACTS"))," BETWEEN POLITICAL CANDIDATES"))),l.a.createElement(p.a,{sm:12,md:{size:5,offset:1}},l.a.createElement(Te,null)))),l.a.createElement(f.a,{fluid:!0},l.a.createElement(b.a,null,l.a.createElement(p.a,{sm:12,md:{size:6,offset:3}},l.a.createElement(i.a,{defaultActiveKey:"firstCandidate",className:"StickyTabs"},l.a.createElement(m.a,{eventKey:"firstCandidate",title:U?l.a.createElement("b",null,j.name):"First Candidate"},l.a.createElement(Ne,null)),l.a.createElement(m.a,{eventKey:"secondCandidate",title:ge?l.a.createElement("b",null,ee.name):"Second Candidate"},l.a.createElement(we,null)))),l.a.createElement(p.a,{sm:"12",md:3})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[35,1,2]]]);
//# sourceMappingURL=main.c04a79a5.chunk.js.map
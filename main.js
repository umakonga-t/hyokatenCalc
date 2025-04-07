let categories={},selectedItems=[],currentBigCategory="継承",currentMiddleCategory=null,skillPt=0;function loadCSVData(){fetch("data.csv").then(e=>e.text()).then(parseCSV).catch(e=>console.error("CSV読み込み失敗:",e))}function parseCSV(e){e.trim().split("\n").forEach(e=>{let[t,n,a,l,o,i,s]=e.split(",").map(e=>e.trim());categories[l]??={},categories[l][o]??={},[i,s].forEach(e=>{e&&(categories[l][o][e]??=[],categories[l][o][e].push({name:t,points:n,iconColor:a}))})}),generateCategoryTabs()}function setActiveTab(e,t){let n=e.parentElement;n.querySelectorAll(`.${t}.active`).forEach(e=>e.classList.remove("active")),e.classList.add("active")}function sortCategories(e,t=null,n=!1){return t?e.filter(e=>t.includes(e)).sort((e,n)=>t.indexOf(e)-t.indexOf(n)):n?[...e].reverse():e.sort()}function generateCategoryTabs(){let e=document.getElementById("category-tabs-container");e.innerHTML="",["継承","ノーマル","レア","本体進化","シナリオ進化"].forEach(t=>{if(!categories[t])return;let n=document.createElement("div");n.className="tab"+(t===currentBigCategory?" active":""),n.textContent=t,n.onclick=()=>{setActiveTab(n,"tab"),currentBigCategory=t,showMiddleCategories(t)},e.appendChild(n)}),showMiddleCategories(currentBigCategory)}function showMiddleCategories(e){let t=document.getElementById("sub-category-tabs-container"),n=document.getElementById("small-category-tabs-container"),a=document.getElementById("items-container");t.innerHTML=n.innerHTML=a.innerHTML="";let l=Object.keys(categories[e]);"ノーマル"===e||"レア"===e?l=sortCategories(l,["SPRINT","MILE","CLASSIC","LONG","オレンジ","緑","青","赤","紫",]):"継承"===e||"本体進化"===e?l.sort():"シナリオ進化"===e&&l.reverse(),l.forEach((n,a)=>{let l=document.createElement("div");l.className="sub-tab"+(0===a?" active":""),l.textContent=n,l.onclick=()=>{setActiveTab(l,"sub-tab"),currentMiddleCategory=n,showSmallCategories(e,n)},t.appendChild(l)}),l[0]&&(currentMiddleCategory=l[0],showSmallCategories(e,l[0]))}function showSmallCategories(e,t){let n=document.getElementById("small-category-tabs-container"),a=document.getElementById("items-container");n.innerHTML=a.innerHTML="";let l=Object.keys(categories[e][t]);"ノーマル"===e||"レア"===e?l=sortCategories(l,["ステータスup","共","短","マ","中","長","逃","先","差","追","芝","ダ",]):("継承"===e||"本体進化"===e)&&l.sort(),l.forEach((a,l)=>{let o=document.createElement("div");o.className="small-category-tab"+(0===l?" active":""),o.textContent=a,o.onclick=()=>{setActiveTab(o,"small-category-tab"),displayItems(e,t,a)},n.appendChild(o)}),l[0]&&displayItems(e,t,l[0])}function displayItems(e,t,n){let a=document.getElementById("items-container"),l=categories[e]?.[t]?.[n]||[];a.innerHTML=l.map((e,t)=>`<button class="item-button" data-index="${t}">${e.name} (${e.points})</button>`).join(""),a.querySelectorAll(".item-button").forEach(n=>{let a=n.dataset.index;n.onclick=()=>addItemToSelected({...l[a],bigCategory:e,middleCategory:t})})}function addItemToSelected(e){selectedItems.push(e),updateSelectedItems()}function updateSelectedItems(){let e=document.getElementById("selected-items-container"),t={橙:"#f3b05b",緑:"#91d533",青:"blue",赤:"red",紫:"purple"};e.innerHTML="<h6></h6>",selectedItems.forEach((n,a)=>{let l=document.createElement("div");l.className="selected-item",l.setAttribute("data-category",n.bigCategory);let o=t[n.iconColor]||"#f3b05b";l.innerHTML=`<span style="color:${o}; font-size:1.2em;">■</span> ${n.name} (${n.points})`,l.onclick=()=>removeItemFromSelected(a),e.appendChild(l)}),skillPt=selectedItems.reduce((e,t)=>e+parseInt(t.points,10),0),document.getElementById("skill-points").textContent=`${skillPt}pt`,inputChangeTotalPt()}function removeItemFromSelected(e){selectedItems.splice(e,1),updateSelectedItems()}window.onload=()=>loadCSVData(),document.getElementById("reset-button").onclick=()=>{selectedItems=[],updateSelectedItems()};let koyuPt=510;function calcKoyuPt(){let e=Number(document.querySelector('input[name="star"]:checked')?.value||1),t=Number(document.querySelector('input[name="level"]:checked')?.value||1);koyuPt=e*t,koyu_pt.innerText=`${koyuPt}pt`,inputChangeTotalPt()}document.querySelectorAll('input[name="star"], input[name="level"]').forEach(e=>{e.addEventListener("change",calcKoyuPt)}),window.addEventListener("load",calcKoyuPt);const statusPoints={spdPt:0,stmPt:0,powPt:0,gutPt:0,wizPt:0},statusElements=[{id:"spd",label:"spd_pt",key:"spdPt"},{id:"sta",label:"sta_pt",key:"stmPt"},{id:"pow",label:"pow_pt",key:"powPt"},{id:"gut",label:"gut_pt",key:"gutPt"},{id:"wiz",label:"wiz_pt",key:"wizPt"},];function calcStatusPtMain(e){let t=inputCheckStas(e),n=0;return 0===t?0:Math.round((n=t<=1200?culcStasPt(t):culcStasPtOver1200(t))/10)}statusElements.forEach(({id:e,label:t,key:n})=>{let a=document.getElementById(e),l=document.getElementById(t);a.addEventListener("input",()=>{let e=Number(a.value),t=calcStatusPtMain(e);statusPoints[n]=t,l.innerText=`${t}pt`,inputChangeTotalPt()})}),window.addEventListener("load",()=>{statusElements.forEach(({id:e})=>{let t=new Event("input");document.getElementById(e).dispatchEvent(t)})});const maxStas=2e3;function inputCheckStas(e){return e<0?0:e>2e3?2e3:e}function culcStasPt(e){let t=0,n=0,a=[5,8,10,13,16,18,21,24,26,28,29,30,31,33,34,35,39,41,42,43,52,55,66,68,68,];for(let l=1;l<=e;l++)l<=49?t=0:l<=99?t=1:l%50==0&&t++,n+=a[t];return n}function culcStasPtOver1200(e){let t=0,n=38413,a=[79,80,81,83,84,85,86,88,89,90,92,93,94,96,97,98,100,101,102,103,105,106,107,109,110,111,113,114,115,117,118,119,121,122,123,124,126,127,128,130,131,132,134,135,136,138,139,140,141,143,144,145,147,148,149,151,152,153,155,156,157,159,160,161,162,164,165,166,168,169,170,172,173,174,176,177,178,179,181,182,182,];for(let l=1201;l<=e;l++)l<=1209?t=0:l<=1219?t=1:l%10==0&&t++,n+=a[t];return n}document.addEventListener("DOMContentLoaded",()=>{let e=document.querySelectorAll("#stas_box input[type='number']"),t=document.getElementById("stas_error");function n(){let n=!1;e.forEach(e=>{let t=Number(e.value);""===t||t>=0&&t<=2e3?e.setCustomValidity(""):t>2e3?(e.value=2e3,e.setCustomValidity("invalid"),n=!0):(e.setCustomValidity("invalid"),n=!0)}),t.style.display=n?"block":"none"}e.forEach(e=>{e.addEventListener("input",n)}),n()});const totalPointsContainerBottom=document.getElementById("totalPointsContainerBottom"),remainPointsContainer=document.getElementById("remainPointsContainer"),rankTable=[[299,"G"],[599,"G+"],[899,"F"],[1299,"F+"],[1799,"E"],[2299,"E+"],[2899,"D"],[3499,"D+"],[4899,"C"],[6499,"C+"],[8199,"B"],[9999,"B+"],[12099,"A"],[14499,"A+"],[15899,"S"],[17499,"S+"],[19199,"SS"],[19599,"SS+"],[19999,"UG"],[20399,"UG1"],[20799,"UG2"],[21199,"UG3"],[21599,"UG4"],[22099,"UG5"],[22499,"UG6"],[22999,"UG7"],[23399,"UG8"],[23899,"UG9"],[24299,"UF"],[24799,"UF1"],[25299,"UF2"],[25799,"UF3"],[26299,"UF4"],[26799,"UF5"],[27299,"UF6"],[27799,"UF7"],[28299,"UF8"],[28799,"UF9"],[29399,"UE"],[29899,"UE1"],[30399,"UE2"],[30999,"UE3"],[31499,"UE4"],[32099,"UE5"],[32699,"UE6"],[33199,"UE7"],[33799,"UE8"],[34399,"UE9"],[34999,"UD"],[35599,"UD1"],[36199,"UD2"],[36799,"UD3"],[37499,"UD4"],[38099,"UD5"],[38699,"UD6"],[39399,"UD7"],[39999,"UD8"],[40699,"UD9"],[41299,"UC"],[41999,"UC1"],[42699,"UC2"],[43399,"UC3"],[43999,"UC4"],[44699,"UC5"],[45399,"UC6"],[46199,"UC7"],[46899,"UC8"],[47599,"UC9"],[48299,"UB"],[48999,"UB1"],[49799,"UB2"],[50499,"UB3"],[51299,"UB4"],[51999,"UB5"],[52799,"UB6"],[53599,"UB7"],[54399,"UB8"],[55199,"UB9"],[55899,"UA"],[56699,"UA1"],[57499,"UA2"],[58399,"UA3"],[59199,"UA4"],[59999,"UA5"],[60799,"UA6"],[61699,"UA7"],[62499,"UA8"],[63399,"UA9"],[64199,"US"],[65099,"US1"],[65999,"US2"],[66799,"US3"],[67699,"US4"],[68599,"US5"],[69499,"US6"],[70399,"US7"],[71399,"US8"],];function calcRank(e){for(let[t,n]of rankTable)if(e<=t)return n;return"US9"}function inputChangeTotalPt(){let e=Object.values(statusPoints).reduce((e,t)=>e+t,0)+skillPt+koyuPt,t=calcRank(e),n=29399-e;totalPointsContainerBottom&&remainPointsContainer?(totalPointsContainerBottom.textContent=`${t} : ${e}`,remainPointsContainer.textContent=n>=0?`UE上限まで残り : ${n}`:`UE上限OVER : ${-n}`):console.warn("評価点表示用の要素が見つかりませんでした")}
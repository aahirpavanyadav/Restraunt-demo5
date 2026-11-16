/* ===== EDIT THESE ===== */
const CONFIG={phone:"+910000000000",whatsapp:"910000000000",address:"Your street address, Your city, PIN",
hours:[["Mon–Fri","8:00 am – 10:00 pm"],["Sat–Sun","8:00 am – 11:00 pm"]]};
const MENU=[
{c:"Tiffins",n:"Masala Dosa",d:"Crisp dosa with spiced potato, chutney and sambar.",p:80,v:1,e:"🥞"},
{c:"Tiffins",n:"Idli Vada",d:"Two idlis and a vada with sambar and chutneys.",p:60,v:1,e:"⚪"},
{c:"Starters",n:"Chicken 65",d:"Spicy fried chicken with curry leaves.",p:180,v:0,e:"🍗"},
{c:"Starters",n:"Paneer Tikka",d:"Marinated paneer grilled with onions.",p:170,v:1,e:"🧀"},
{c:"Meals",n:"Veg Thali",d:"Rice, roti, two curries, dal, curd and sweet.",p:140,v:1,e:"🍛"},
{c:"Meals",n:"South Indian Meals",d:"Rice with sambar, rasam, poriyal, curd and papad.",p:130,v:1,e:"🍽️"},
{c:"Biryani",n:"Chicken Dum Biryani",d:"Slow-cooked basmati with spiced chicken and raita.",p:220,v:0,e:"🍚"},
{c:"Biryani",n:"Veg Biryani",d:"Fragrant rice with vegetables and whole spices.",p:170,v:1,e:"🥘"},
{c:"Curries",n:"Dal Tadka",d:"Yellow lentils tempered with garlic and cumin.",p:120,v:1,e:"🥣"},
{c:"Curries",n:"Butter Chicken",d:"Tomato-cream gravy with tender chicken.",p:210,v:0,e:"🍲"},
{c:"Snacks",n:"Samosa (2 pcs)",d:"Crisp pastry with spiced potato and peas.",p:40,v:1,e:"🔺"},
{c:"Drinks & Sweets",n:"Masala Chai",d:"Milk tea with ginger and cardamom.",p:20,v:1,e:"☕"},
{c:"Drinks & Sweets",n:"Gulab Jamun (2 pcs)",d:"Soft milk dumplings in sugar syrup.",p:50,v:1,e:"🟤"}];
const SPECIALS=[{n:"Special of the day",d:"Add today’s dish here."},{n:"Thali of the day",d:"Add today’s thali here."}];
const GALLERY=[["🍛","Traditional thali"],["🍚","Biryani in the pot"],["🔥","Tandoor and kitchen"],["🪑","Dining room"],["👨‍👩‍👧","Family table"],["🥞","Fresh dosa"],["🍲","Curry of the day"],["🥘","Plated and ready"]];
const REVIEWS=[]; /* [{name:"Anita",text:"..."}] */
/* ====================== */
const $=s=>document.querySelector(s);
const rupee=n=>"₹"+n;
const waURL=t=>"https://wa.me/"+CONFIG.whatsapp+"?text="+encodeURIComponent(t);
// theme
const root=document.documentElement;
function setTheme(t){root.dataset.theme=t;try{localStorage.setItem("theme",t)}catch(e){}}
let saved=null;try{saved=localStorage.getItem("theme")}catch(e){}
root.dataset.theme=saved||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light");
$("#theme").onclick=()=>setTheme(root.dataset.theme==="dark"?"light":"dark");
// nav
const mb=$("#mb"),links=$("#links");
mb.onclick=()=>{const o=links.classList.toggle("open");mb.setAttribute("aria-expanded",o)};
links.addEventListener("click",e=>{if(e.target.closest("a"))links.classList.remove("open")});
// menu
const cats=["All",...new Set(MENU.map(m=>m.c))];let cur="All";
function drawMenu(){
$("#tabs").innerHTML=cats.map(c=>`<button class="tab" aria-pressed="${c===cur}" data-c="${c}">${c}</button>`).join("");
$("#dishes").innerHTML=MENU.filter(m=>cur==="All"||m.c===cur).map(m=>`<article class="dish"><div class="pic" role="img" aria-label="${m.n}">${m.e}</div><div class="row"><h3><span class="${m.v?"veg":"nonveg"}" title="${m.v?"Vegetarian":"Non-vegetarian"}"></span>${m.n}</h3><span class="price">${rupee(m.p)}</span></div><p>${m.d}</p></article>`).join("");}
$("#tabs").onclick=e=>{const b=e.target.closest(".tab");if(b){cur=b.dataset.c;drawMenu()}};
drawMenu();
$("#specials").innerHTML=SPECIALS.map(s=>`<li><strong>${s.n}</strong><small>${s.d}</small></li>`).join("");
// gallery
$("#gal").innerHTML=GALLERY.map((g,i)=>`<button data-i="${i}" aria-label="Open: ${g[1]}">${g[0]}<span>${g[1]}</span></button>`).join("");
const lb=$("#lb");
$("#gal").onclick=e=>{const b=e.target.closest("button");if(!b)return;const g=GALLERY[b.dataset.i];$("#lbi").textContent=g[0];$("#lbt").textContent=g[1];lb.showModal()};
lb.addEventListener("click",e=>{if(e.target===lb)lb.close()});
// reviews
$("#reviews").innerHTML=REVIEWS.map(r=>`<blockquote><p>${r.text}</p><footer style="background:none;padding:0;color:inherit">– ${r.name}</footer></blockquote>`).join("");
// contact
const hrs=CONFIG.hours.map(h=>`<li><span>${h[0]}</span><span>${h[1]}</span></li>`).join("");
$("#hours").innerHTML=hrs;$("#fh").innerHTML=hrs;
$("#addr").textContent=CONFIG.address;$("#fa").textContent=CONFIG.address;
$("#call").href="tel:"+CONFIG.phone;$("#fc").href="tel:"+CONFIG.phone;$("#fc").textContent=CONFIG.phone;
$("#dir").href="https://www.google.com/maps/dir/?api=1&destination="+encodeURIComponent(CONFIG.address);
document.querySelectorAll("[data-wa]").forEach(a=>{a.href=waURL("Hello Desi Roots, I would like to place an order enquiry.");a.target="_blank";a.rel="noopener"});
$("#enq").onsubmit=e=>{e.preventDefault();window.open(waURL("Hello Desi Roots, I am "+$("#n").value+". I would like to order: "+$("#o").value),"_blank","noopener")};
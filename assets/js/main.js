(function(){

const K_PRAYER="prayerMode";
const K_FOCUS="focusMode";
const K_MENU="menuOpen";

function safeGet(k){
try{return localStorage.getItem(k);}catch(e){return null;}
}

function safeSet(k,v){
try{localStorage.setItem(k,v);}catch(e){}
}

/* ================= EXIT BUTTONS ================= */

function initExitButtons(){

const focusExit=document.createElement("button");
focusExit.className="focus-exit";
focusExit.textContent="Exit Focus";

focusExit.addEventListener("click",function(){
setFocus(false);
});

const prayerExit=document.createElement("button");
prayerExit.className="prayer-exit";
prayerExit.textContent="Exit Prayer";

prayerExit.addEventListener("click",function(){
setPrayer(false);
});

document.body.appendChild(focusExit);
document.body.appendChild(prayerExit);

}

/* ================= PRAYER MODE ================= */

function setPrayer(on){

if(on)document.body.classList.remove("focus");

document.body.classList.toggle("prayer",on);

safeSet(K_PRAYER,on?"on":"off");

document.querySelectorAll("[data-prayer]").forEach(b=>{
b.setAttribute("aria-pressed",on?"true":"false");
});

}

/* ================= FOCUS MODE ================= */

function setFocus(on){

if(on)document.body.classList.remove("prayer");

document.body.classList.toggle("focus",on);

safeSet(K_FOCUS,on?"on":"off");

document.querySelectorAll("[data-focus]").forEach(b=>{
b.setAttribute("aria-pressed",on?"true":"false");
});

}

/* ================= MOBILE MENU ================= */

function initMenu(){

const btn=document.querySelector("[data-menu-btn]");
const menu=document.querySelector("[data-menu]");

if(!btn||!menu)return;

function openMenu(){
menu.classList.add("open");
btn.classList.add("open");
btn.setAttribute("aria-expanded","true");
safeSet(K_MENU,"on");
}

function closeMenu(){
menu.classList.remove("open");
btn.classList.remove("open");
btn.setAttribute("aria-expanded","false");
safeSet(K_MENU,"off");
}

btn.addEventListener("click",function(){

const open=menu.classList.contains("open");

open?closeMenu():openMenu();

});

document.addEventListener("keydown",function(e){

if(e.key==="Escape"){
closeMenu();
setFocus(false);
setPrayer(false);
}

});

document.addEventListener("click",function(e){

const inside=menu.contains(e.target)||btn.contains(e.target);

if(!inside)closeMenu();

});

menu.addEventListener("click",function(e){

if(e.target.tagName==="A")closeMenu();

});

if(safeGet(K_MENU)==="on")openMenu();

}

/* ================= PRAYER + FOCUS BUTTONS ================= */

function initModes(){

setPrayer(safeGet(K_PRAYER)==="on");
setFocus(safeGet(K_FOCUS)==="on");

const prayerButtons=document.querySelectorAll("[data-prayer],[data-prayer-cta]");
const focusButtons=document.querySelectorAll("[data-focus]");

prayerButtons.forEach(b=>{
b.addEventListener("click",()=>{
setPrayer(!document.body.classList.contains("prayer"));
});
});

focusButtons.forEach(b=>{
b.addEventListener("click",()=>{
setFocus(!document.body.classList.contains("focus"));
});
});

}

/* ================= MAILTO FORM ================= */

function initMailtoForm(){

const form=document.querySelector("[data-mailto]");
if(!form)return;

form.addEventListener("submit",function(e){

e.preventDefault();

const data=new FormData(form);

const name=String(data.get("name")||"").trim();
const reply=String(data.get("reply")||"").trim();
const subject=String(data.get("subject")||"").trim();
const message=String(data.get("message")||"").trim();

const lines=[
"Name: "+name,
"Reply email: "+reply,
"",
message
];

const body=encodeURIComponent(lines.join("\n"));
const subj=encodeURIComponent(subject||"Website message");

window.location.href=
"mailto:brad.hobbs13@icloud.com?subject="+subj+"&body="+body;

});

}

/* ================= PAGE LOAD ================= */

document.addEventListener("DOMContentLoaded",function(){

const headerContainer=document.getElementById("site-header");

if(headerContainer){

fetch("/about-me/partials/header.html")
.then(res=>res.text())
.then(html=>{

headerContainer.innerHTML=html;

initModes();
initMenu();

});

}

/* important for mobile */

initExitButtons();

initMailtoForm();

});

})();
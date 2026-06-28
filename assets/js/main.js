/*=========================================================
BRAD HOBBS
Official Website
Main JavaScript
Version 4.0
=========================================================*/

document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {

const header = document.querySelector(".site-header");

const menuToggle = document.querySelector(".menu-toggle");

const navMenu = document.querySelector(".nav-menu");

const reveals = document.querySelectorAll(".reveal");

const backTop = document.querySelector(".back-top");

/*=========================================================
HEADER
=========================================================*/

const updateHeader = () => {

if(window.scrollY > 50){

header.classList.add("scrolled");

}else{

header.classList.remove("scrolled");

}

};

/*=========================================================
BACK TO TOP
=========================================================*/

const updateBackTop = () => {

if(!backTop) return;

if(window.scrollY > 500){

backTop.classList.add("show");

}else{

backTop.classList.remove("show");

}

};

/*=========================================================
SCROLL REVEAL
=========================================================*/

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("active");

}

});

},{
threshold:0.15,
rootMargin:"0px 0px -60px 0px"
});

reveals.forEach(item=>observer.observe(item));

/*=========================================================
MOBILE MENU
=========================================================*/

if(menuToggle && navMenu){

menuToggle.addEventListener("click",()=>{

menuToggle.classList.toggle("active");

navMenu.classList.toggle("active");

const expanded = menuToggle.getAttribute("aria-expanded")==="true";

menuToggle.setAttribute("aria-expanded",!expanded);

});

document.querySelectorAll(".nav-menu a").forEach(link=>{

link.addEventListener("click",()=>{

menuToggle.classList.remove("active");

navMenu.classList.remove("active");

menuToggle.setAttribute("aria-expanded","false");

});

});

}

/*=========================================================
SMOOTH SCROLL
=========================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",(e)=>{

const target=document.querySelector(anchor.getAttribute("href"));

if(target){

e.preventDefault();

target.scrollIntoView({

behavior:"smooth",

block:"start"

});

}

});

});

/*=========================================================
INITIALIZE
=========================================================*/

updateHeader();

updateBackTop();

window.addEventListener("scroll",()=>{

updateHeader();

updateBackTop();

});

});

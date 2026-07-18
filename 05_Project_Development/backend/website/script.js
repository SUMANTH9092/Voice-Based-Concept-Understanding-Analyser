window.addEventListener("scroll",()=>{

const nav=document.querySelector(".custom-navbar");

if(window.scrollY>40){

nav.classList.add("nav-scrolled");

}

else{

nav.classList.remove("nav-scrolled");

}

});
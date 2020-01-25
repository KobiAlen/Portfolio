const cvbtn=document.getElementById("cvnav");
const aboutbtn=document.getElementById("aboutnav");
const projectsbtn=document.getElementById("projectsnav");
const contactbtn=document.getElementById("contactnav");

cvbtn.addEventListener('click',() => {
    var elem=document.getElementsByClassName("cvimg")[0];
    //name.scrollIntoView({behavior:"smooth",block:'start'});
    var topofelm=window.pageYOffset+elem.getBoundingClientRect().top-100;
    window.scroll({top:topofelm,behavior:'smooth'});
    console.log("Jumped to CV section");
});

aboutbtn.addEventListener('click',() => {
    var elem=document.getElementsByClassName("aboutme")[0];
    //name.scrollIntoView({behavior:"smooth",block:'start'});
    var topofelm=window.pageYOffset+elem.getBoundingClientRect().top-100;
    window.scroll({top:topofelm,behavior:'smooth'});
    console.log("Jumped to about me section");
});

projectsbtn.addEventListener('click',() => {
    var elem=document.getElementsByClassName("projects")[0];
    //name.scrollIntoView({behavior:"smooth",block:'start'});
    var topofelm=window.pageYOffset+elem.getBoundingClientRect().top-100;
    window.scroll({top:topofelm,behavior:'smooth'});
    console.log("Jumped to projects section");
});

contactbtn.addEventListener('click',() => {
    var elem=document.getElementsByClassName("contact")[0];
    //name.scrollIntoView({behavior:"smooth",block:'start'});
    var topofelm=window.pageYOffset+elem.getBoundingClientRect().top-100;
    window.scroll({top:topofelm,behavior:'smooth'});
    console.log("Jumped to contact section");
});

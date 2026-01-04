const questionContainer = document.querySelector(".click-event"); 
const buttons = document.querySelectorAll("button");
const response = document.querySelector("p");

const mousemove = document.querySelector(".mousemove");


questionContainer.style.borderRadius = "50px";

window.addEventListener("mousemove", (e) => {
    mousemove.style.left = e.pageX + "px";
    mousemove.style.top = e.pageY + "px";
});

const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
    if (window.scrollY > 120) {
        nav.style.top = "0";   
    } else {
        nav.style.top = "-50px"; 
    }   
});

const inputName = document.querySelector('input[type="text"]');
const select = document.querySelector("select");
const form = document.querySelector("form");


let pseudo = "";
let language = "";
inputName.addEventListener("input", (e) => {
    pseudo = e.target.value;
});
select.addEventListener("input", (e) => {
    language = e.target.value;
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    
if (CGV.checked) {
    document.querySelector("form > div").innerHTML = `<h3>Pseudo : ${pseudo}</h3>
    <h4> Langage préfèré : ${language}</h4>`;
} else {
    alert("Veuillez accepter les CGV");
}
});

// Effet de zoom sur tous les boutons au survol
buttons.forEach(button => {
    button.addEventListener("mouseover", () => {
        button.classList.add("hover-effect");
    });
    
    button.addEventListener("mouseout", () => {
        button.classList.remove("hover-effect");
    });
});

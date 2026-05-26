let toggle = document.getElementById("darkMode")
let icon = document.querySelector(".icon")
let menu = document.getElementById("menuToggle")
let nav = document.getElementById("navLinks")


toggle.addEventListener("change", () => {

document.body.classList.toggle("dark")

if(document.body.classList.contains("dark")){
icon.textContent="🌙"
}else{
icon.textContent="☀️"
}

})


menu.addEventListener("click", () => {

nav.classList.toggle("active")

})
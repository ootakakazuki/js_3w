

let showMenu = () => {
    var nav_list = document.getElementById("nav-list")
    nav_list.classList.toggle("vis")
    var nav_list2 = document.getElementById("fa-xmark")
    nav_list2.classList.toggle("vis2") 
    var nav_list3 = document.getElementById("fa-bars")
    nav_list3.classList.toggle("vis3")     
}

let showMenu2 = () => {
    var nav_list = document.getElementById("nav-list")
    nav_list.classList.toggle("vis")
    var nav_list2 = document.getElementById("fa-bars")
    nav_list2.classList.toggle("vis3") 
    var nav_list3 = document.getElementById("fa-xmark")
    nav_list3.classList.toggle("vis2") 
}


let fa_bars = document.getElementById("fa-bars")
fa_bars.addEventListener("click", showMenu)

let fa_xmark = document.getElementById("fa-xmark")
fa_xmark.addEventListener("click", showMenu2)


let aaa = document.getElementById("aaa")

let acd = document.getElementById("acd")


let acd_toggle = () => {
    acd.classList.toggle("vis-acd-li");
}

let acd_btn_id = document.getElementById("acd-btn-id")

acd_btn_id.addEventListener('click', acd_toggle)




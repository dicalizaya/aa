function menuHamburguesa() {

    const btn = document.getElementById("menu-btn");
    const nav = document.querySelector(".navbar nav");

    if (!btn || !nav) return;

    btn.addEventListener("click", () => {

        nav.classList.toggle("active");

    });

}
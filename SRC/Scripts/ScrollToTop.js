// Afficher ou masquer le bouton en fonction du scroll
window.onscroll = function() {
    const backToTopButton = document.getElementById("backToTop");
    if (document.documentElement.scrollTop > 100) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};
// Fonction pour faire défiler vers le haut
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
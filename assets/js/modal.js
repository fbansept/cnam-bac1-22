function evenementBouton() {
  const maModale = document.getElementById("modale");
  maModale.style.display = "block";
}

function evenementFermer() {
  const maModale = document.getElementById("modale");
  maModale.style.display = "none";
}

const monBoutonFermer = document.getElementById("bouton-fermer");

monBoutonFermer.addEventListener("click", evenementFermer);

const monBouton = document.getElementById("bouton");

monBouton.addEventListener("click", evenementBouton);

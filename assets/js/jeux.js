const canvas = document.getElementById("canvas-jeux");

const ctx = canvas.getContext("2d");

setInterval(raffraichir, 17); //42 pour 24fps , 17 pour 60fps

const carre = {
  positionHorizontal: 0, //position de départ horizontal du carré
  positionVertical: 0, //position de départ vertical du carré
  vitesseHorizontal: 4, //vitesse horizontale du carré
  vitesseVertical: 3, //vitesse vertical du carré
};

function raffraichir() {
  carre.positionHorizontal += carre.vitesseHorizontal;
  carre.positionVertical += carre.vitesseVertical;

  //on change le couleur de remplisage pour du blanc
  ctx.fillStyle = "rgb(255, 255, 255)";
  //on dessine un carré blanc qui prend toute la surface
  ctx.fillRect(0, 0, 500, 500);

  //on change le couleur de remplisage pour du rouge
  ctx.fillStyle = "rgb(200, 0, 0)";
  //on dessine un carré rouge
  ctx.fillRect(carre.positionHorizontal, carre.positionVertical, 50, 50);

  //si le carré arrive à droite ou à gauche on inverse la vitesse horizontale
  if (carre.positionHorizontal >= 450 || carre.positionHorizontal <= 0) {
    carre.vitesseHorizontal *= -1;
    //carre.vitesseHorizontal = carre.vitesseHorizontal * -1
  }

  //si le carré arrive en haut ou en bas on inverse la vitesse verticale
  if (carre.positionVertical >= 450 || carre.positionVertical <= 0) {
    carre.vitesseVertical *= -1;
  }
}

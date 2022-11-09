const canvas = document.getElementById("canvas-jeux");

const imageFlappy = new Image();
imageFlappy.src = "assets/images/flappy.png";

const imageTuyauHaut = new Image();
imageTuyauHaut.src = "assets/images/tuyaux-haut.png";

const imageTuyauBas = new Image();
imageTuyauBas.src = "assets/images/tuyaux-bas.png";

const ctx = canvas.getContext("2d");

setInterval(raffraichir, 17); //42 pour 24fps , 17 pour 60fps

let score = 0;
let perdu = false;

const positionHorizontaleFlappy = 100;
const largeurFlappy = 50;
const hauteurFlappy = 50;
const largeurTuyaux = 137;
const largeurEcran = 1000;
const hauteurEcran = 500;

const flappy = {
  positionVerticale: 100,
  vitesseVerticale: 0,
};

const listeTuyaux = [
  {
    positionHorizontal: largeurEcran,
    hauteur: Math.random() * 300 + 100,
  },
  {
    positionHorizontal: largeurEcran + 333,
    hauteur: Math.random() * 300 + 100,
  },
  {
    positionHorizontal: largeurEcran + 666,
    hauteur: Math.random() * 300 + 100,
  },
];

addEventListener("keyup", evenementClavier);

function evenementClavier(e) {
  if (e.code == "Space") {
    flappy.vitesseVerticale = -3;
  }

  if (e.code == "Enter" && perdu) {
    flappy.positionVerticale = 100;
    flappy.vitesseVerticale = 0;
    listeTuyaux[0].positionHorizontal = largeurEcran;
    listeTuyaux[1].positionHorizontal = largeurEcran + 333;
    listeTuyaux[2].positionHorizontal = largeurEcran + 666;
    score = 0;
    perdu = false;
  }
}

function raffraichir() {
  //on change la couleur de remplisage pour du blanc
  ctx.fillStyle = "rgb(255, 255, 255)";
  //on dessine un carré blanc qui prend toute la surface
  ctx.fillRect(0, 0, largeurEcran, hauteurEcran);

  if (!perdu) {
    score++;
    flappy.vitesseVerticale += 0.1;
    flappy.positionVerticale += flappy.vitesseVerticale;

    //on parcours les tuyaux de listeTuyaux
    for (let i = 0; i < listeTuyaux.length; i++) {
      //on affecte à la variable tuyau chaque tuyau de listeTuyau
      const tuyau = listeTuyaux[i];

      tuyau.positionHorizontal -= 3;

      //lorsque le tuyaux dépasse la gauche l'ecran
      if (tuyau.positionHorizontal < -largeurTuyaux) {
        tuyau.positionHorizontal = largeurEcran;
        tuyau.hauteur = Math.random() * 300 + 100; //nombre entre 100 et 300
      }

      //si flappy se trouve dans le tuyau
      if (
        positionHorizontaleFlappy + largeurFlappy > tuyau.positionHorizontal &&
        positionHorizontaleFlappy < tuyau.positionHorizontal + largeurTuyaux &&
        flappy.positionVerticale < tuyau.hauteur
      ) {
        perdu = true;
      }
    }
  }

  //si flappy touche le haut
  //alors sa vitesseVerticale devient 0
  if (flappy.positionVerticale <= 0) {
    flappy.vitesseVerticale = 0;
    flappy.positionVerticale = 1;
  }

  if (flappy.positionVerticale >= hauteurEcran - hauteurFlappy) {
    perdu = true;
  }

  //on change la couleur de remplisage pour du rouge
  //ctx.fillStyle = "rgb(200, 0, 0)";
  //on dessine flappy
  //   ctx.fillRect(
  //     positionHorizontaleFlappy,
  //     flappy.positionVerticale,
  //     largeurFlappy,
  //     hauteurFlappy
  //   );

  ctx.drawImage(
    imageFlappy,
    positionHorizontaleFlappy,
    flappy.positionVerticale
  );

  //on dessine les tuyaux
  for (let i = 0; i < listeTuyaux.length; i++) {
    const tuyau = listeTuyaux[i];

    // ctx.fillStyle = "rgb(0, 200, 0)";
    // ctx.fillRect(tuyau.positionHorizontal, 0, largeurTuyaux, tuyau.hauteur);

    ctx.drawImage(
      imageTuyauHaut,
      tuyau.positionHorizontal,
      tuyau.hauteur - imageTuyauHaut.height
    );
  }

  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.font = "24px Verdana";
  ctx.fillText("points : " + score, largeurEcran - 200, 30);

  if (perdu) {
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "100px Verdana";
    ctx.fillText("Perdu", 300, hauteurEcran / 2);
  }
}

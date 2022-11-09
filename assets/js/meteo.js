//on ajoute l'évenement sur le bouton prévision
//pour changer l'icone et afficher/masquer les prévisions
let previsionVisible = false;

const boutonPrevision = document.getElementById("bouton-prevision");

boutonPrevision.addEventListener("click", evenementBoutonPrevision);

function evenementBoutonPrevision() {
  const icone = document.querySelector("#bouton-prevision>i");
  const prevision = document.querySelector("#prevision");
  //const prevision = document.getElementById("prevision");

  if (previsionVisible) {
    icone.classList.remove("fa-caret-left");
    icone.classList.add("fa-caret-right");
    previsionVisible = false;
    prevision.classList.remove("ouverte");
  } else {
    icone.classList.remove("fa-caret-right");
    icone.classList.add("fa-caret-left");
    previsionVisible = true;
    prevision.classList.add("ouverte");
  }
}

//AJAX (Asynchronous JAvascript XML)
fetch("https://prevision-meteo.ch/services/json/belfort")
  .then((resultat) => resultat.json())
  .then((meteo) => {
    const nomVille = meteo.city_info.name;
    const condition = meteo.current_condition.condition;
    const icone = meteo.current_condition.icon_big;
    const temperature = meteo.current_condition.tmp;

    const villeMeteo = document.getElementById("ville");
    // const conditionMeteo = document.getElementById("condition");
    const iconeMeteo = document.getElementById("iconeMeteo");
    const temperatureMeteo = document.getElementById("temperature");

    villeMeteo.innerHTML = nomVille;
    //conditionMeteo.innerHTML = condition;
    iconeMeteo.src = icone;
    temperatureMeteo.innerHTML = temperature + "°C";

    const lendemainIcone = document.querySelector("#lendemain>img");
    const surlendemainIcone = document.querySelector("#sur-lendemain>img");
    const lendemainTemperatureMin = document.querySelector(
      "#lendemain>#temperature-min"
    );
    const lendemainTemperatureMax = document.querySelector(
      "#lendemain>#temperature-max"
    );
    const surlendemainTemperatureMin = document.querySelector(
      "#sur-lendemain>#temperature-min"
    );
    const surlendemainTemperatureMax = document.querySelector(
      "#sur-lendemain>#temperature-max"
    );

    lendemainIcone.src = meteo.fcst_day_1.icon;
    surlendemainIcone.src = meteo.fcst_day_2.icon;
    lendemainTemperatureMin.innerHTML = meteo.fcst_day_1.tmin;
    lendemainTemperatureMax.innerHTML = meteo.fcst_day_1.tmax;
    surlendemainTemperatureMin.innerHTML = meteo.fcst_day_2.tmin;
    surlendemainTemperatureMax.innerHTML = meteo.fcst_day_2.tmax;
  });

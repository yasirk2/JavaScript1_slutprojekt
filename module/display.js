let resultDiv = document.querySelector("#resultDiv");

function displayInfo(movieList) {
  resultDiv.innerHTML = "";

  for (let i = 0; i < 10; i++) {
    let imgEl = document.createElement("img");

    if (movieList[i].poster_path == null) {
      imgEl.src = "./images/handsome.svg";
    } else {
      imgEl.src = `https://image.tmdb.org/t/p/w300/${movieList[i].poster_path}`;
    }

    let titleH3 = document.createElement("h3");
    titleH3.innerText = movieList[i].title;
    titleH3.style.textAlign = "center";

    let releaseDateH5 = document.createElement("h5");
    releaseDateH5.innerText = movieList[i].release_date;

    let box = document.createElement("div");

    box.classList.add("boxStyle");

    box.append(imgEl, titleH3, releaseDateH5);

    slideBoxes(box);

    resultDiv.append(box);

  }
}

function displayInfoSearch(movieList) {
  resultDiv.innerHTML = "";

  for (let i = 0; i < movieList.length; i++) {
    let imgEl = document.createElement("img");
    if (movieList[i].poster_path == null) {
      imgEl.src = "./images/handsome.svg";
    } else {
      imgEl.src = `https://image.tmdb.org/t/p/w300/${movieList[i].poster_path}`;
    }

    let titleH3 = document.createElement("h3");
    titleH3.innerText = movieList[i].title;
    titleH3.style.textAlign = "center";

    let releaseDateH5 = document.createElement("h5");
    releaseDateH5.innerText = movieList[i].release_date;

    let descriptionP = document.createElement("p");
    descriptionP.innerText = movieList[i].overview;

    let box = document.createElement("div");
    box.classList.add("boxStyle");

    box.append(imgEl, titleH3, releaseDateH5, descriptionP);

    slideBoxes(box);
    resultDiv.append(box);
  }
}

function displayActor(actorInfo) {
  resultDiv.innerHTML = "";
  for (let i = 0; i < actorInfo.length; i++) {
    let imgEl = document.createElement("img");

    if (actorInfo[i].profile_path == null) {
      imgEl.src = "./images/handsome.svg";
    } else {
      imgEl.src = `https://image.tmdb.org/t/p/w500/${actorInfo[i].profile_path}`;
    }

    let actorNameH3 = document.createElement("h3");
    actorNameH3.innerText = actorInfo[i].name;

    let knownForDepartmentH4 = document.createElement("h4");
    knownForDepartmentH4.innerText = "department: " + actorInfo[i].known_for_department;

    let participatedInDiv = document.createElement("div");
    for (let j = 0; j < actorInfo[i].known_for.length; j++) {

      let participatedIn = document.createElement("p");

      if (actorInfo[i].known_for[j] == undefined) {
        participatedIn.innerText = "known for: NaN";
      } else if (actorInfo[i].known_for[j].title == undefined) {
        participatedIn.innerText = actorInfo[i].known_for[j].media_type + ": " + actorInfo[i].known_for[j].name;
      }
      else {
        participatedIn.innerText = actorInfo[i].known_for[j].media_type + ": " + actorInfo[i].known_for[j].title;
      }
      participatedInDiv.append(participatedIn);
    }

    let box = document.createElement("div");

    box.classList.add("boxStyle");
    box.append(imgEl, actorNameH3, knownForDepartmentH4, participatedInDiv);
    slideBoxes(box);
    resultDiv.append(box);
  }
}

function displayCategoryError(category, textInputSearch) {
  resultDiv.innerHTML = "";

  let errorH1El = document.createElement("h1");

  if (!textInputSearch.trim()) {
    errorH1El.innerText = "please enter a name";
  } else {
    errorH1El.innerText = category + textInputSearch + " not found";
  }

  errorH1El.style.textAlign = "center";

  resultDiv.append(errorH1El);
}

function displayFetchError() {
  resultDiv.innerHTML = "";
  let errorH1El = document.createElement("h1");
  errorH1El.innerText = "Something went wrong with the network or database, Please try again later";

  errorH1El.style.textAlign = "center";

  resultDiv.append(errorH1El);
}

function slideBoxes(box) {
  const slide = {
    targets: box,
    translateX: [-2000, 0],
    easing: "linear"
  }
  anime(slide);
}

export { displayInfo, displayInfoSearch, displayActor, displayCategoryError, displayFetchError }
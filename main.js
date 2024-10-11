import { displayActor, displayCategoryError, displayInfo, displayInfoSearch } from "./module/display.js";
import { fetchTmdb } from "./module/fetchApi.js";

const mainForm = document.querySelector("#mainForm");

const searchForm = document.querySelector("#searchForm");

mainForm.addEventListener("click", async event => {
  event.preventDefault();

  let popularMovies = await fetchTmdb(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=`);
  let topRatedMovies = await fetchTmdb(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=`);

  if (event.target.id == "searchPopularBtn" && popularMovies != undefined) {
    displayInfo(popularMovies);
  }
  else if (event.target.id == "searchTopRatedBtn" && topRatedMovies != undefined) {
    displayInfo(topRatedMovies);
  }
});

searchForm.addEventListener("submit", async event => {
  event.preventDefault();

  let rbMovies = document.querySelector("#rbMovies").checked;
  let rbName = document.querySelector("#rbName").checked;
  let textInputSearch = document.querySelector("#textInputSearch").value;

  let movieName = await fetchTmdb(`https://api.themoviedb.org/3/search/movie?query=${textInputSearch}&include_adult=false&language=en-US&page=1&api_key=`);

  let actorName = await fetchTmdb(`https://api.themoviedb.org/3/search/person?query=${textInputSearch}&include_adult=false&language=en-US&page=1&api_key=`);

  if (rbMovies === true) {

    if (movieName === "not found") {
      displayCategoryError("Movie ", textInputSearch);
    } else if (movieName.length > !undefined) {
      displayInfoSearch(movieName);
    }
    searchForm.reset();
  }
  
  else if (rbName === true) {

    if (actorName === "not found") {
      displayCategoryError("Actor ", textInputSearch);
    } else if (actorName.length > !undefined) {
      displayActor(actorName);
    }
    searchForm.reset();

  } else {
    alert("please select name och movies");
  };
});



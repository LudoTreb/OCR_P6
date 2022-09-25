let url_score = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7";
let url_genre_Action = "http://localhost:8000/api/v1/titles/?genre=Action&page_size=7";
let url_genre_Romance = "http://localhost:8000/api/v1/titles/?genre=Romance&page_size=7";
let url_genre_Comedy = "http://localhost:8000/api/v1/titles/?genre=Comedy&page_size=7";

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("mainButton");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = getMoviesID;

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Modal content function 
async function getModal(url) {
  fetch(url)
  .then(function(res){
    if (res.ok){
      return res.json();
    }
  })

  .then(function(json){
    let modalContent = json;
    let image = document.querySelector("#modalImgUrl");
    image.src = modalContent.image_url;
    document.getElementById("modalTitle").innerHTML = modalContent.title;
    document.getElementById("modalDetails").innerHTML = `${modalContent["imdb_score"]}/10 -- ${modalContent["date_published"].slice(0,4)} -- ${modalContent["duration"] + " min"}`;
    document.getElementById("modalStoryLine").innerHTML = `RESUME : <br/>${modalContent["long_description"]}`;
    document.getElementById("modalCast").innerHTML = `ACTEURS : <br/> ${modalContent["actors"].join(", ")}`;
    document.getElementById("modalDirector").innerHTML = `REALISATEUR : <br/> ${modalContent["directors"].join(", ")}`;
    document.getElementById("modalGenre").innerHTML = `GENRE : <br/>${modalContent["genres"].join(", ")}`;
    document.getElementById("modalCountryOfOrigin").innerHTML = `PAYS D'ORIGINE : <br/>${modalContent["countries"].join(", ")}`;
    document.getElementById("modalBoxOffice").innerHTML = `BOX OFFICE : <br/>${modalContent["worldwide_gross_income"]}`;
    document.getElementById("myModal").style.display = "block";

  });
}

// Get the id of movies
function getMoviesID(){
  var elt = this;
  let movie_id = elt.getAttribute("data-id");
  let urldetail = "http://localhost:8000/api/v1/titles/" + movie_id;
  getModal(urldetail); 
}

// Function to get movie's info for carousel 
async function getMovies(url, id_caroussel){
  fetch(url)
  .then(function(res){
    if (res.ok){
      return res.json();
    }
  })

  .then(function(value){
    document.getElementById(id_caroussel);

    value.results.forEach(movie => {
      let img = document.createElement("img");
      let carousel = document.getElementById(id_caroussel);
      img.src = movie.image_url;
      let linkApi = document.createElement("button");
      linkApi.setAttribute("data-id", movie.id);
      linkApi.setAttribute("class", "cover");
      linkApi.onclick = getMoviesID;
      linkApi.appendChild(img); 
      carousel.appendChild(linkApi);
    });
  })

  .catch(function(err){
    // Une erreur est survenue
  });
}

// Function to get the main movie's info for home 
async function getMainMovies(url, id_title, id_description, id_imgUrl){
  fetch(url)
  .then(function(res){
    if (res.ok){
      return res.json();
    }
  })

  .then(function(json){
    let mainMovie = json.results[0];
    document.getElementById(id_title).innerHTML = mainMovie.title;
    document.getElementById(id_imgUrl).style.backgroundImage = "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1) )," + " " + `url(${mainMovie.image_url})`;
    document.getElementById("mainButton").setAttribute("data-id", mainMovie.id);  
    let urlComplet = mainMovie.url;
    return fetch(urlComplet);
  })

  .then(function(res){
    if (res.ok){
      return res.json();
    }
  })

  .then(function(value){
    let mainMovieDescription = value.long_description;
    document.getElementById(id_description).innerHTML = mainMovieDescription;
  })

  .catch(function(err){
    // Une erreur est survenue
  });
}

getMainMovies(url_score, "title", "resume", "home");
getMovies(url_score, "caroussel_01");
getMovies(url_genre_Action, "caroussel_02");
getMovies(url_genre_Romance, "caroussel_03");
getMovies(url_genre_Comedy, "caroussel_04");

// Variables Button for carousel 
let scroll_left = document.getElementsByClassName("scroll_left");
let scroll_right = document.getElementsByClassName("scroll_right");
let parentScroll_1 = document.getElementById("element_caroussel_01");
let parentScroll_2 = document.getElementById("element_caroussel_02");
let parentScroll_3 = document.getElementById("element_caroussel_03");
let parentScroll_4 = document.getElementById("element_caroussel_04");

// Button function for scroll left
for (let elt of scroll_left){
  if (elt.parentNode == parentScroll_1) {
    elt.addEventListener("click", function(event) {
      const conent = document.querySelector('#caroussel_01');
      conent.scrollLeft -= 250;
      event.preventDefault();
    });
  }

  if (elt.parentNode == parentScroll_2) {
    elt.addEventListener("click", function(event) {
      const conent = document.querySelector('#caroussel_02');
      conent.scrollLeft -= 250;
      event.preventDefault();
    });
  }

  if (elt.parentNode == parentScroll_3) {
    elt.addEventListener("click", function(event) {
      const conent = document.querySelector('#caroussel_03');
      conent.scrollLeft -= 250;
      event.preventDefault();
    });
  }

  if (elt.parentNode == parentScroll_4) {
    elt.addEventListener("click", function(event) {
      const conent = document.querySelector('#caroussel_04');
      conent.scrollLeft -= 250;
      event.preventDefault();
    });
  }
}

// Button function for scroll right
for (let elt of scroll_right){
  if (elt.parentNode == parentScroll_1) {
    elt.addEventListener("click", function(event) {
      const conent = document.querySelector('#caroussel_01');
      conent.scrollLeft += 250;
      event.preventDefault();
    });
  }

  if (elt.parentNode == parentScroll_2) { 
    elt.addEventListener("click", function(event) {
      const conent = document.querySelector('#caroussel_02');
      conent.scrollLeft += 250;
      event.preventDefault();
    });
  }

  if (elt.parentNode == parentScroll_3) { 
    elt.addEventListener("click", function(event) {
      const conent = document.querySelector('#caroussel_03');
      conent.scrollLeft += 250;
      event.preventDefault();
    });
  }

  if (elt.parentNode == parentScroll_4) { 
    elt.addEventListener("click", function(event) {
      const conent = document.querySelector('#caroussel_04');
      conent.scrollLeft += 250;
      event.preventDefault();
    });
  }
}
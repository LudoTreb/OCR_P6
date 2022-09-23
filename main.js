let url_score = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
let url_genre_Action = "http://localhost:8000/api/v1/titles/?genre=Action";
let url_genre_Romance = "http://localhost:8000/api/v1/titles/?genre=Romance";
let url_genre_Comedy = "http://localhost:8000/api/v1/titles/?genre=Comedy";

// Class Modal
class Modal {
  constructor(imgUrl, title, rate, releaseDate, runTime, storyLine, cast, director, genre, countryOfOrigin, boxOffice) {
    this.image_url = imgUrl;
    this.title = title;
    this.rate = rate;
    this.releaseDate = releaseDate;
    this.runTime = runTime;
    this.storyLine = storyLine;
    this.cast = cast;
    this.director = director;
    this.genre = genre;
    this.countryOfOrigin = countryOfOrigin;
    this.boxOffice = boxOffice;
  }
}

let movieTest = new Modal("https://m.media-amazon.com/images/M/MV5BNjA5Y2ZhYzctNDc1Yy00OGViLWI3NGUtOTYwZmE3NDFiYmIxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_UY268_CR72,0,182,268_AL_.jpg", "Iron Man", 7.9, 2008, "2h06", "Tony Stark. Genius, billionaire, playboy, philanthropist. Son of legendary inventor and weapons contractor Howard Stark. When Tony Stark is assigned to give a weapons presentation to an Iraqi unit led by Lt. Col. James Rhodes, he's given a ride on enemy lines. That ride ends badly when Stark's Humvee that he's riding in is attacked by enemy combatants.", "Robert Downey Jr", "Jon Favreau", "Action", "USA", "$100.000",)

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("mainButton");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
}

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

// Modal content
let eltImgUrl = document.getElementById("modalImgUrl");
eltImgUrl.style.backgroundImage = `${movieTest.imgUrl}`;

let eltTitle = document.getElementById("modalTitle");
eltTitle.innerText = `${movieTest.title}`;

let eltDetails = document.getElementById("modalDetails");
eltDetails.innerText = `${movieTest.rate}/10 - ${movieTest.releaseDate} - ${movieTest.runTime}`;

let eltStoryLine = document.getElementById("modalStoryLine");
eltStoryLine.innerText = `Résumé
${movieTest.storyLine}`;

let eltCast = document.getElementById("modalCast");
eltCast.innerText = `Acteurs
${movieTest.cast}`;

let eltDirector = document.getElementById("modalDirector");
eltDirector.innerText = `Réalisateur : ${movieTest.director}`;

let eltGenre = document.getElementById("modalGenre");
eltGenre.innerText = `Genre : ${movieTest.genre}`;

let eltCountryOfOrigin = document.getElementById("modalCountryOfOrigin");
eltCountryOfOrigin.innerText = `Pays d'origine : ${movieTest.countryOfOrigin}`;

let eltBoxOffice = document.getElementById("modalBoxOffice");
eltBoxOffice.innerText = `Box Office : ${movieTest.boxOffice}`;


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
    
    // test pour l'ajout de l'image
    /* let img = document.createElement("img");
    let modalImg = document.getElementById("modalImgUrl");
    img.src = modalContent.image_url;
    modalImg.appendChild(img); */
    
    /* document.querySelector("#modalImgUrl").innerHTML = modalContent.image_url; */
    
    let image = document.querySelector("#modalImgUrl");
    image.src = modalContent.image_url;
    document.getElementById("modalTitle").innerHTML = modalContent.title;
    document.getElementById("modalDetails").innerHTML = `${modalContent["imdb_score"]}/10 - ${modalContent["date_published"].slice(0,4)} - ${modalContent["duration"] + " min"}`;
    document.getElementById("modalStoryLine").innerHTML = `RESUME : <br/>${modalContent["long_description"]}`;
    document.getElementById("modalCast").innerHTML = `ACTEURS : <br/> ${modalContent["actors"].join(", ")}`;
    document.getElementById("modalDirector").innerHTML = `REALISATEUR : <br/> ${modalContent["directors"].join(", ")}`;
    document.getElementById("modalGenre").innerHTML = `GENRE : <br/>${modalContent["genres"].join(", ")}`;
    document.getElementById("modalCountryOfOrigin").innerHTML = `PAYS D'ORIGINE : <br/>${modalContent["countries"].join(", ")}`;
    document.getElementById("modalBoxOffice").innerHTML = `BOX OFFICE : <br/>${modalContent["worldwide_gross_income"]}`;
    console.log(document.getElementById("modalDetails").innerHTML);

    document.getElementById("myModal").style.display = "block";

  });

}


function getMoviesID(){
  var elt = this;
  /* console.log(elt); */
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
      /*  "0": {
          "id": 9,
          "url": "http://localhost:8000/api/v1/titles/9",
          "imdb_url": "https://www.imdb.com/title/tt0000009/",
          "title": "Miss Jerry",
          "year": 1894,
          "imdb_score": "6.0",
          "votes": 154,
          "image_url": "https://m.media-amazon.com/images/M/MV5BNjA5Y2ZhYzctNDc1Yy00OGViLWI3NGUtOTYwZmE3NDFiYmIxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_UY268_CR72,0,182,268_AL_.jpg",
          "directors": [
            "Alexander Black"
          ],
          "actors": [
            "Blanche Bayliss",
            "Chauncey Depew",
            "William Courtenay"
          ],
          "writers": [
            "Alexander Black"
          ],
          "genres": [
            "Romance"
          ]
        }
      }*/
      
    }
  })
  .then(function(value){

    document.getElementById(id_caroussel);

    value.results.slice(-10).forEach(movie => {
      // console.log(movie);

      let img = document.createElement("img");
      let carousel = document.getElementById(id_caroussel);
      img.src = movie.image_url;


      // creation de l'url api pour le recupérer avec le modal
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



// Button for carousel
const leftBtn_01 = document.getElementById('scroll_left_01');

leftBtn_01.addEventListener("click", function(event) {
  console.log("dectection scroll left");
  let conent = document.querySelector('#caroussel_01');
  console.log(conent.scrollLeft);
  conent.scrollLeft -= 250;
  console.log(conent.scrollLeft);
  event.preventDefault();
});

const rightBtn_01 = document.getElementById('scroll_right_01');

rightBtn_01.addEventListener("click", function(event) {
  const conent = document.querySelector('#caroussel_01');
  conent.scrollLeft += 250;
  event.preventDefault();
});

const leftBtn_02 = document.getElementById('scroll_left_02');

leftBtn_02.addEventListener("click", function(event) {
  console.log("dectection scroll left");
  let conent = document.querySelector('#caroussel_02');
  console.log(conent.scrollLeft);
  conent.scrollLeft -= 250;
  console.log(conent.scrollLeft);
  event.preventDefault();
});

const rightBtn_02 = document.getElementById('scroll_right_02');

rightBtn_02.addEventListener("click", function(event) {
  const conent = document.querySelector('#caroussel_02');
  conent.scrollLeft += 250;
  event.preventDefault();
});

const leftBtn_03 = document.getElementById('scroll_left_03');

leftBtn_03.addEventListener("click", function(event) {
  console.log("dectection scroll left");
  let conent = document.querySelector('#caroussel_03');
  console.log(conent.scrollLeft);
  conent.scrollLeft -= 250;
  console.log(conent.scrollLeft);
  event.preventDefault();
});

const rightBtn_03 = document.getElementById('scroll_right_03');

rightBtn_03.addEventListener("click", function(event) {
  const conent = document.querySelector('#caroussel_03');
  conent.scrollLeft += 250;
  event.preventDefault();
});

const leftBtn_04 = document.getElementById('scroll_left_04');

leftBtn_04.addEventListener("click", function(event) {
  console.log("dectection scroll left");
  let conent = document.querySelector('#caroussel_04');
  console.log(conent.scrollLeft);
  conent.scrollLeft -= 250;
  console.log(conent.scrollLeft);
  event.preventDefault();
});

const rightBtn_04 = document.getElementById('scroll_right_04');

rightBtn_04.addEventListener("click", function(event) {
  const conent = document.querySelector('#caroussel_04');
  conent.scrollLeft += 250;
  event.preventDefault();
});

rightBtn_04.addEventListener("click", function(event) {
  const conent = document.querySelector('#caroussel_04');
  conent.scrollLeft += 250;
  event.preventDefault();
});


// bouton pour le modal 






// document
//  .getElementById("scroll_left")
//  .addEventListener("click", scrollLeft(url_score))

//  let img = document.createElement("img");
//  img.src = ;
//  let src = document.getElementById("caroussel");
//  src.appendChild(img);

// for (let i = 0; i < 8; i++) {
//   var image = document.createElement("img");
//   image.src = data.results[i].image_url;
//   image.className = "caroussel";
//   //image.classList.add("class_image");
//   //image.setAttribute('class', 'class_image');
//   section1.appendChild(image);
// }

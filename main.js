// Class Modal
class Modal {
  constructor(title, rate, releaseDate, runTime, storyLine, cast, director, genre, countryOfOrigin, boxOffice) {
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

let movieTest = new Modal("Iron Man", 7.9, 2008, "2h06", "Tony Stark. Genius, billionaire, playboy, philanthropist. Son of legendary inventor and weapons contractor Howard Stark. When Tony Stark is assigned to give a weapons presentation to an Iraqi unit led by Lt. Col. James Rhodes, he's given a ride on enemy lines. That ride ends badly when Stark's Humvee that he's riding in is attacked by enemy combatants.", "Robert Downey Jr", "Jon Favreau", "Action", "USA", "$100.000",)

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







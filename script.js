// Card data
const cardsArray = [
  {
    name: "meme1",
    img: "./images/aayein.jpg",
    aud: "./audio/aayein-baigan.mp3",
  },
  {
    name: "meme1",
    img: "./images/baingan.jpg",
    aud: "./audio/aayein-baigan.mp3",
  },
  {
    name: "meme2",
    img: "./images/grip.jpg",
    aud: "./audio/are-vedya.mp3",
  },
  {
    name: "meme2",
    img: "./images/sachin.jpg",
    aud: "./audio/are-vedya.mp3",
  },
  {
    name: "meme3",
    img: "./images/bolsakta.jpg",
    aud: "./audio/audio3.mp3",
  },
  {
    name: "meme3",
    img: "./images/bhaiii.jpg",
    aud: "./audio/audio3.mp3",
  },
  {
    name: "meme4",
    img: "./images/sajna.jpg",
    aud: "./audio/haule-haule.mp3",
  },
  {
    name: "meme4",
    img: "./images/haule.jpg",
    aud: "./audio/haule-haule.mp3",
  },
  {
    name: "meme5",
    img: "./images/lalbutton.jpg",
    aud: "./audio/button.mp3",
  },
  {
    name: "meme5",
    img: "./images/nahidabanatha.jpg",
    aud: "./audio/button.mp3",
  },
  {
    name: "meme6",
    img: "./images/naamkya.jpg",
    aud: "./audio/bhupendra.mp3",
  },
  {
    name: "meme6",
    img: "./images/bhupjogi.jpg",
    aud: "./audio/bhupendra.mp3",
  },
  {
    name: "meme7",
    img: "./images/image13.jpg",
    aud: "./audio/audio13.mp3",
  },
  {
    name: "meme7",
    img: "./images/image14.jpg",
    aud: "./audio/audio13.mp3",
  },
  {
    name: "meme8",
    img: "./images/image15.jpg",
    aud: "./audio/thala.mp3",
  },
  {
    name: "meme8",
    img: "./images/image16.jpg",
    aud: "./audio/thala.mp3",
  },
  {
    name: "meme9",
    img: "./images/image17.jpg",
    aud: "./audio/audio17.mp3",
  },
  {
    name: "meme9",
    img: "./images/image18.jpg",
    aud: "./audio/audio17.mp3",
  },
  {
    name: "meme10",
    img: "./images/image19.jpg",
    aud: "./audio/audio19.mp3",
  },
  {
    name: "meme10",
    img: "./images/image20.jpg",
    aud: "./audio/audio19.mp3",
  },
  {
    name: "meme11",
    img: "./images/image21.jpg",
    aud: "./audio/audio21.mp3",
  },
  {
    name: "meme11",
    img: "./images/image22.jpg",
    aud: "./audio/audio21.mp3",
  },
  {
    name: "meme12",
    img: "./images/image23.jpg",
    aud: "./audio/audio23.mp3",
  },
  {
    name: "meme12",
    img: "./images/image24.jpg",
    aud: "./audio/audio23.mp3",
  },
];
// Audio
const audioElements = {};
const playAudio = (name) => {
  const audio = audioElements[name];
  if (audio) {
    audio.currentTime = 0; // Reset audio to the beginning
    audio.play();
  }
};
const initializeAudioElements = () => {
  cardsArray.forEach((item) => {
    if (item.aud) {
      const audio = new Audio(item.aud);
      audioElements[item.name] = audio;
    }
  });
};
// let chipi = new Audio("./audio/chipi-chipi.mp3");
function playSuccessSound() {
  // alert("Success sound played");

  const successSound = new Audio("./audio/chipi-chipi.mp3");
  successSound.play();
}

initializeAudioElements();
// GAME
let totalPairs = cardsArray.length / 2;
const game = document.getElementById("game");
const grid = document.createElement("section");
grid.classList.add("grid");
let matchedPairs = 0;
let allPairsMatched = false;
// game.addEventListener("click", secCount);
game.appendChild(grid);
// DOUBLE ARRAY
let gameGrid = cardsArray;
// FOR RANDOMIZING THE CARDS EVERY TIME WE REFRESH THE PAGE
gameGrid.sort(() => 0.5 - Math.random());
// CREATE CARDS
gameGrid.slice(0, 24).forEach((item) => {
  const card = document.createElement("div");
  card.classList.add(`card`, `${item.name}`);
  card.dataset.name = item.name;
  const front = document.createElement("div");
  front.classList.add("front");
  const back = document.createElement("div");
  back.classList.add("back");
  back.style.backgroundImage = `url(${item.img})`;
  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

//Confetti function
//
// ATTEMPTS COUNT
let attemptCount = 0;
let attempts = document.querySelector(".count");
attempts.innerText = attemptCount;
// TIME COUNT
var sec = 0;
var timeInSec;
let min = 0;
function secCount() {
  sec = sec + 1;
  document.querySelector(".sec-count").innerText = Math.floor(sec % 60);
  timeInSec = setTimeout(secCount, 1000);
  min = Math.floor(sec / 60);
  document.querySelector(".min-count").innerText = min;

  if (matchedPairs === totalPairs * 2) {
    clearTimeout(timeInSec);
    // triggerConfetti();
    // chipi.play();
    playSuccessSound();
    alert("Congrats You Won !!\nLet the celebrations begin.... ");
    // const congo = document.getElementByClass("grid");
    // congo.style.filter = "blur(100px)";
  }
}
var timeStarted = false;
// secCount();
// RESET ALL

let reset = document.querySelector(".reset");
reset.addEventListener("click", () => {
  let confirmReset = confirm("Whole game will start again. continue to reset?");
  if (confirmReset === true) {
    // const successSound = document.getElementById("successSound");
    // successSound.pause(); // Stop the success sound
    // successSound.currentTime = 0; // Reset the success sound to the beginning
    window.location.reload();
  }
});
// VARIABLES FOR THE GAME
let firstGuess = "";
let secondGuess = "";
let previousTarget = null;
let count = 0;
let delay = 1200;
// FUNCTIONS FOR THE GAME
const match = () => {
  var selected = document.querySelectorAll(".selected");
  selected.forEach((card) => {
    card.classList.add("match");
    matchedPairs++;
    const name = card.dataset.name;
    playAudio(name);
    if (matchedPairs == totalPairs) {
      allPairsMatched = true;
      // playSuccessSound();
    }
  });
};
const resetGuesses = () => {
  firstGuess = "";
  secondGuess = "";
  count = 0;
  var selected = document.querySelectorAll(".selected");
  // chipi.stop();
  selected.forEach((card) => {
    card.classList.remove("selected");
  });
};
// GAME LOGICS
grid.addEventListener("click", function (event) {
  !timeStarted && secCount();
  timeStarted = true;
  let clicked = event.target;
  attemptCount++;
  attempts.innerText = attemptCount;
  if (
    clicked.nodeName === "SECTION" ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains("selected")
  ) {
    return;
  }
  if (count < 2) {
    count++;
    if (count === 1) {
      // Assign first guess
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    } else {
      // Assign second guess
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    }
    // If both guesses are not empty...
    //     if (firstGuess !== "" && secondGuess !== "") {
    //       // and the first guess matches the second match...
    //       if (firstGuess === secondGuess) {
    //         // run the match function
    //         // match();
    //         // resetGuesses();
    //         setTimeout(match, delay);
    //         setTimeout(resetGuesses, delay);
    //         var matched = document.querySelectorAll(`.${firstGuess}`);
    //         matched.forEach((node) =>
    //           node.addEventListener("click", function (e) {
    //             e.stopPropagation();
    //           })
    //         );
    //       } else {
    //         setTimeout(resetGuesses, delay);
    //       }
    //     }
    //   }
    //   // Set previous target to clicked
    //   previousTarget = clicked;
    // });

    if (firstGuess !== "" && secondGuess !== "") {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
        setTimeout(resetGuesses, delay);
        var matched = document.querySelectorAll(`.${firstGuess}`);
        matched.forEach((node) =>
          node.addEventListener("click", function (e) {
            e.stopPropagation();
          })
        );
      } else {
        setTimeout(resetGuesses, delay);
      }
    }
    // Set previous target to clicked
    previousTarget = clicked;
  }
});

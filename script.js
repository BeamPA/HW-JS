const options = {
    rabbit:"eat vegetable, can run fast, have long ears",
    frog:"eat insects, live in the pond,hop",
    giraffe:"eat leaves, have a long neck",
    horse:"have a mane, live in barn, you can ride",
    cat:"pet, have nine lives",
    hippopotamus:"big and gray, four legs",
    spider:"small, eight legs, spin a web",
    bird:"can sing and fly, lay eggs",
    squirrel:"can climb trees, small and brown, tail",
    dog:"have four legs and tail, can bark",
    elephant:"big, long nose,big ears",
    snake:"no legs, two-pronged tongue",
    octopus:"live in the sea, eight legs",
    shark:"live in the sea, sharp teeth, dangerous",
    cow:"live in the farm, eat grass, Moo-moo~",
    kangaroo:"short front legs,strong back legs, long powerful tail",
    koala:"eat leaves of eucalyptus, gray fur",
    ladybug:"six legs, can fly, red and black spots",
    caterpillar:"will turn into a butterfly",
    sheep:"used for wool, baaaaa~~~",
    zebra:"look like a horse, black and white strips",
    duck:"swim on a pond, it's a bird"
};

const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const word = document.getElementById("word");
const words = Object.keys(options);
let randomWord = "",
    randomHint = "";
let winCount = 0,
    lossCount = 0;

//Generate random value
const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

//Block all the buttons
const blocker = () => {
  let lettersButtons = document.querySelectorAll(".letters");
  stopGame();
};

startBtn.addEventListener("click", () => {
    controls.classList.add("hide");
  init();
});


const stopGame = () => {
    controls.classList.remove("hide");
};

document.write("<h3>✨Word Guessing🛸</h3>");

//Generate Word Function
const generateWord = () => {
    letterContainer.classList.remove("hide");
    userInpSection.innerText = "";
    randomWord = words[generateRandomValue(words)];
    randomHint = options[randomWord];

    hintRef.innerHTML = `<div id="wordHint">
    <span>♦ Hint❓: </span>${randomHint}</div>`;
    
    let displayItem = "";
    randomWord.split("").forEach((value) => {
    displayItem += '<span class="inputSpace">_ </span>';
    });

  //Display each element as span
    userInpSection.innerHTML = displayItem;
    userInpSection.innerHTML += `<div id='chanceCount'>❤️: ${lossCount}</div>`;
};

//Initial Function
const init = () => {
    winCount = 0;
    lossCount = 3;
    randomWord = "";
    word.innerText = "";
    randomHint = "";
    userInpSection.innerHTML = "";
    letterContainer.classList.add("hide");
    letterContainer.innerHTML = "";
    generateWord();
    
  //For creating letter buttons
  for (let i = 97; i < 123; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    button.innerText = String.fromCharCode(i);

    //Character button onclick
    button.addEventListener("click", () => {
      let charArray = randomWord.toLowerCase().split("");
      let inputSpace = document.getElementsByClassName("inputSpace");

    //If array contains clicked value replace the matched Dash with Letter
    if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          if (char === button.innerText) {
            button.classList.add("correct");
            inputSpace[index].innerText = char;
            winCount += 1;
    
            if (winCount == charArray.length) {
                alert("You Won");
                startBtn.innerText = "Restart";
                blocker();
            }
          }
        });
      } else {
        //lose count
        button.classList.add("incorrect");
        lossCount -= 1;
        document.getElementById(
            "chanceCount"
        ).innerText = `❤️: ${lossCount}`;

        if (lossCount == 0) {
            alert("Game Over")
            word.innerHTML = `The word was: <span>${randomWord}</span>`;
            blocker();
        }
      }
    });

    //Append generated buttons to the letters
    letterContainer.appendChild(button);
  }
};

window.onload = () => {
  init();
};
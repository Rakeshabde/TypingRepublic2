// define the time limit
let TIME_LIMIT = 30;

// define quotes to be used
let quotes_array = [
  "Some cricketers rise to the top constitutes hours of. If his orthodoxy is compact and aesthetically pleasing.",
  "Push yourself, because no one else is going to do it for you.",
  "Failure is the condiment that gives success its flavor.",
  "Wake up with determination. Go to bed with satisfaction.",
  "It's going to be hard, but hard does not mean impossible.",
  "Learning never exhausts the mind.",
  "The only way to do great work is to love what you do."
];

// selecting required elements
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let neterror_text = document.querySelector(".curr_neterrors")
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let neterror_group = document.querySelector(".neterrors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

let neterrors = 0;
let olderror = 0;

restart_btn.addEventListener('click',restartbtn);

function restartbtn() {
  finishGame();
  resetValues();
  focusevent();
}

function updateQuote() {
  let randomQuote = Math.floor(Math.random()*quotes_array.length);
  quote_text.textContent = null;
  current_quote = quotes_array[randomQuote];

  // separate each character and make an element 
  // out of each of them to individually style them
  current_quote.split('').forEach(char => {
    const charSpan = document.createElement('span')
    charSpan.innerText = char
    quote_text.appendChild(charSpan)
  })

  // roll over to the first quote
  if (quoteNo < quotes_array.length - 1)
    quoteNo++;
  else
    quoteNo = 0;
}

var prevneterrors = 0;




var focusevent = function () {
  input_area.addEventListener('keypress', once);
  input_area.removeEventListener('focus', focusevent);

  resetValues();
  updateQuote();
}

var once = function () {
  input_area.addEventListener('input', processCurrentText)
  input_area.removeEventListener('keypress', once);
  startGame();
}



input_area.addEventListener('focus', focusevent);



function processCurrentText() {

  // get current input text and split it
  curr_input = input_area.value;
  curr_input_array = curr_input.split('');

  // increment total characters typed
  characterTyped++;

  errors = 0;

  quoteSpanArray = quote_text.querySelectorAll('span');
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index]

    // characters not currently typed
    if (typedChar == null) {
      char.classList.remove('correct_char');
      char.classList.remove('incorrect_char');

      // correct characters
    } else if (typedChar === char.innerText) {
      char.classList.add('correct_char');
      char.classList.remove('incorrect_char');
      // incorrect characters
    } else {
      char.classList.add('incorrect_char');
      char.classList.remove('correct_char');
    }

    errors = document.getElementsByClassName('incorrect_char').length;


    if (errors > olderror) {
      neterrors++;
    }
    olderror = errors;


    // console.log("Errors : " + errors);
    // console.log("Net errors : " + neterrors);

    cpm = Math.round(((characterTyped / timeElapsed) * 60));
    wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));

    // update cpm and wpm text
    cpm_text.textContent = cpm;
    wpm_text.textContent = wpm;
    neterror_text.textContent = neterrors;

    // display the cpm and wpm
    cpm_group.style.display = "block";
    wpm_group.style.display = "block";



    var x = document.getElementsByClassName('correct_char');
    // console.log(x[0].innerHTML)
    // for (var i = 0; i < x.length; i++) {
    //   console.log(x.item(i).innerHTML);
    // }

    /* var y = document.getElementsByClassName('incorrect_char').length;
     console.log("Total correct chars : " + x);
     console.log("Total incorrect chars : " + y); 
 
     // console.log("Net errors : " + neterrors);
 
     // x.innerhtml.forEach(element => {
     //   console.log(element)
     // });
   */

  });

  // display the number of errors
  error_text.textContent = total_errors + errors;

  // update accuracy text
  let correctCharacters = (characterTyped - (total_errors + errors));
  let accuracyVal = ((correctCharacters / characterTyped) * 100);
  accuracy_text.textContent = Math.round(accuracyVal);

  // if current text is completely typed
  // irrespective of errors
  if (curr_input.length == current_quote.length) {
    updateQuote();

    // update total errors
    total_errors += errors;

    // clear the input area
    input_area.value = "";
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    // decrease the current time left
    timeLeft--;

    // increase the time elapsed
    timeElapsed++;

    // update the timer text
    timer_text.textContent = timeLeft + "s";
  }
  else {
    // finish the game
    finishGame();
  }
}

function finishGame() {
  // stop the timer
  clearInterval(timer);

  // disable the input area
  input_area.disabled = true;

  // show finishing text
  // quote_text.textContent = "Click on restart to again take test.";

  // display restart button
  restart_btn.style.display = "block";

  // calculate cpm and wpm
  cpm = Math.round(((characterTyped / timeElapsed) * 60));
  wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));

  // update cpm and wpm text
  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;

  // display the cpm and wpm
  cpm_group.style.display = "block";
  wpm_group.style.display = "block";
}


function startGame() {

  // clear old and start a new timer
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function resetValues() {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  neterrors = 0;
  accuracy = 0;
  characterTyped = 0;
  quoteNo = 0;
  input_area.disabled = false;

  input_area.value = "";
  quote_text.textContent = 'Click on the area below to start the test.';
  accuracy_text.textContent = 100;
  timer_text.textContent = timeLeft + 's';
  neterror_text.textContent = 0;
  error_text.textContent = 0;
  cpm_text.textContent = "";
  wpm_text.textContent = "";

  // restart_btn.style.display = "none";
  // cpm_group.style.display = "none";
  // wpm_group.style.display = "none";
}

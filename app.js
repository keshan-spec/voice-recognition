try {
  var SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
} catch (e) {
  console.error(e);
  $(".no-browser-support").show();
  $(".app").hide();
}
var instructions = $("#instructions");
var speech_text = document.getElementById("text-feild");

/*-----------------------------
      Voice Recognition 
------------------------------*/

// If false, the recording will stop after a few seconds of silence.
// When true, the silence period is longer (about 15 seconds),
// allowing us to keep recording even when the user pauses.
recognition.continuous = true;

// This block is called every time the Speech APi captures a line.
recognition.onresult = function(event) {
  // event is a SpeechRecognitionEvent object.
  // It holds all the lines we have captured so far.
  // We only need the current one.
  var current = event.resultIndex;

  // Get a transcript of what was said.
  var transcript = event.results[current][0].transcript;
  speech_text.value = transcript;
  readOutLoud(transcript);
};

recognition.onstart = function() {
  instructions.text(
    "Voice recognition activated. Try speaking into the microphone."
  );
};

recognition.onspeechend = function() {
  instructions.text(
    "You were quiet for a while so voice recognition turned itself off."
  );
};

recognition.onerror = function(event) {
  if (event.error == "no-speech") {
    instructions.text("No speech was detected. Try again.");
  }
};

/*-----------------------------
      App buttons and input 
------------------------------*/
var button = document.getElementById("start-record-btn");
var icon = document.getElementById("icon");

function ToggleButton() {
  if (button.title == "Start Recording") {
    recognition.start();
    // icon.classList.replace("fa-microphone", "fa-microphone-slash");
    button.innerHTML =
      'Stop Recording <i class="fa fa-microphone-slash" id="icon" aria-hidden="true"></i>';
    button.title = "Stop";
  } else if (button.title == "Stop") {
    recognition.stop();
    instructions.text("");
    // icon.classList.replace("fa-microphone-slash", "fa-microphone");
    button.innerHTML =
      'Start Recording <i class="fa fa-microphone" id="icon" aria-hidden="true"></i>';
    button.title = "Start Recording";
  }
}

/*
text to speech
*/
function readOutLoud(message) {
  var speech = new SpeechSynthesisUtterance();
  if (message == "how are you") {
    message = "i'm fine. thanks for asking";
  }
  // Set the text and voice attributes.
  speech.text = message;
  speech.volume = 10;
  speech.rate = 0.7;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}

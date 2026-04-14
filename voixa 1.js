const original = document.getElementById("original");
const translated = document.getElementById("translated");

let finalText = "";

function startVoice(){

  const lang = document.getElementById("inputLang").value;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = lang;
  recognition.start();

  recognition.onresult = function(e){
    finalText = e.results[0][0].transcript;
    original.innerText = "Original: " + finalText;

    translate(finalText);
  };
}

function translate(text){

  const target = document.getElementById("targetLang").value;

  fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=en|${target}`)
    .then(res => res.json())
    .then(data => {
      translated.innerText = "Translated: " + data.responseData.translatedText;
    });
}

function speak(){
  const msg = new SpeechSynthesisUtterance(translated.innerText);
  speechSynthesis.speak(msg);
}

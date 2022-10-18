const readBtn = document.getElementById("readstory");

const story = document.getElementById("storyread");

const text = story.textContent;

//test

var speechUtteranceChunker = function (utt, settings, callback) {
    settings = settings || {};
    var newUtt;
    utt.rate= .5;
    
    var txt = (settings && settings.offset !== undefined ? utt.text.substring(settings.offset) : utt.text);
    if (utt.voice && utt.voice.voiceURI === 'native') { // Not part of the spec
        newUtt = utt;
        newUtt.text = txt;
        newUtt.rate=.5;
        newUtt.addEventListener('end', function () {
            if (speechUtteranceChunker.cancel) {
                speechUtteranceChunker.cancel = false;
            }
            if (callback !== undefined) {
                callback();
            }
        });
    }
    else {
        var chunkLength = (settings && settings.chunkLength) || 160;
        var pattRegex = new RegExp('^[\\s\\S]{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[.!?,]{1}|^[\\s\\S]{1,' + chunkLength + '}$|^[\\s\\S]{1,' + chunkLength + '} ');
        var chunkArr = txt.match(pattRegex);

        if (chunkArr[0] === undefined || chunkArr[0].length <= 2) {
            //call once all text has been spoken...
            if (callback !== undefined) {
                callback();
            }
            return;
        }
        var chunk = chunkArr[0];
        newUtt = new SpeechSynthesisUtterance(chunk);
        var x;
        for (x in utt) {
            if (utt.hasOwnProperty(x) && x !== 'text') {
                newUtt[x] = utt[x];
            }
        }
        newUtt.addEventListener('end', function () {
            if (speechUtteranceChunker.cancel) {
                speechUtteranceChunker.cancel = false;
                return;
            }
            settings.offset = settings.offset || 0;
            settings.offset += chunk.length - 1;
            speechUtteranceChunker(utt, settings, callback);
        });
    }

    if (settings.modifier) {
        settings.modifier(newUtt);
    }
    console.log(newUtt); //IMPORTANT!! Do not remove: Logging the object out fixes some onend firing issues.
    //placing the speak invocation inside a callback fixes ordering and onend issues.
    setTimeout(function () {
        speechSynthesis.speak(newUtt);
    }, 0);
};





//test end 
readBtn.addEventListener("click", () => {
    
     window.speechSynthesis.cancel();
    
    //init speech synth
const message = new SpeechSynthesisUtterance();

    message.text=text;
//test
var voiceArr = speechSynthesis.getVoices();
message.voice = voiceArr[5];

     message.rate = 0.5;
speechUtteranceChunker(message, {
    chunkLength: 150
}, function () {
    //some code to execute when done
    console.log('done');
});
    
document.getElementById("gettext").innerHTML=text;
    
  //  setTextMessage(text);
//    speakText();
    
    //add active effect
   // story.classList.add("active");
    //setTimeout(() => story.classList.remove("active"), 800);
  });

//init speech synth
//const message = new SpeechSynthesisUtterance();

//test
//var voiceArr = speechSynthesis.getVoices();
//message.voice = voiceArr[2];

//speechUtteranceChunker(message, {
//    chunkLength: 120
//}, function () {
    //some code to execute when done
//    console.log('done');
//});

//set text
//function setTextMessage(text) {
//  message.text = text;
//}

//speak text
//function speakText() {
//  speechSynthesis.speak(message);
//}


/* const main = document.querySelector("main");
const voiceSelect = document.getElementById("voice");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [
  {
    image: "./images/bear.jpg",
    text: "bear",
  },
  {
    image: "./images/bee.jpg",
    text: "bee",
  },
  {
    image: "./images/bird.jpg",
    text: "bird",
  },
  {
    image: "./images/butterfly.jpg",
    text: "butterfly",
  },
  {
    image: "./images/cat.jpg",
    text: "cat",
  },
  {
    image: "./images/duck.jpg",
    text: "duck",
  },
  {
    image: "./images/elephant.jpg",
    text: "elephant",
  },
  {
    image: "./images/horse.jpg",
    text: "horse",
  },
  {
    image: "./images/kangroo.jpg",
    text: "kangroo",
  },
  {
    image: "./images/sqirrel.jpg",
    text: "sqirrel",
  },
  {
    image: "./images/ram.jpg",
    text: "ram",
  },
  {
    image: "./images/tiger.jpg",
    text: "tiger",
  },
];

data.forEach(createBox);

//create box
function createBox(item) {
  const box = document.createElement("div");
  const { image, text } = item;
  box.classList.add("box");
  box.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="info">${text}</p>
    `;
  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();
    //add active effect
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 800);
  });
  main.appendChild(box);
}
//init speech synth
const message = new SpeechSynthesisUtterance();

//set text
function setTextMessage(text) {
  message.text = text;
}

//speak text
function speakText() {
  speechSynthesis.speak(message);
}

//store voice
let voices = [];
function getVoice() {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voiceSelect.appendChild(option);
  });
}
//voice change
speechSynthesis.addEventListener("voiceschanged", getVoice);
getVoice();


//toggle text box
toggleBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.toggle("show")
);
//close btn
//toggle text box
closeBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.remove("show")
);
//set voice
function setVoice(e) {
    message.voice = voices.find((voice) => voice.name === e.target.value);
  }
//change voice
voiceSelect.addEventListener("change", setVoice);
//read text btn
readBtn.addEventListener("click", () => {
  setTextMessage(textarea.value);
  speakText();
});
*/
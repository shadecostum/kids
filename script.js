const main = document.querySelector("main");
//const voiceSelect = document.getElementById("voice");
//const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
//const toggleBtn = document.getElementById("toggle");
//const closeBtn = document.getElementById("close");

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


const message = new SpeechSynthesisUtterance();

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
      
      window.speechSynthesis.cancel();
      var voiceArr = speechSynthesis.getVoices();
message.voice = voiceArr[1];
      message.rate=.7;
    setTextMessage(text);
    speakText();
    //add active effect
    //box.classList.add("active");
    //setTimeout(() => box.classList.remove("active"), 800);
  });
  main.appendChild(box);
}
//init speech synth
//const message = new SpeechSynthesisUtterance();

var voiceArr = speechSynthesis.getVoices();
message.voice = voiceArr[5];

//set text
function setTextMessage(text) {
  message.text = text;
}

//speak text
function speakText() {
  speechSynthesis.speak(message);
}

//store voice
/*let voices = [];
function getVoice() {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voiceSelect.appendChild(option);
  });
}

speechSynthesis.addEventListener("voiceschanged", getVoice);
getVoice();



toggleBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.toggle("show")
);

closeBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.remove("show")
);
function setVoice(e) {
    message.voice = voices.find((voice) => voice.name === e.target.value);
  }

voiceSelect.addEventListener("change", setVoice);
*/
readBtn.addEventListener("click", () => {
  setTextMessage(textarea.value);
  speakText();
});

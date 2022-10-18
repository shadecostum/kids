const startBtn = document.getElementById("startbtn");
const stopBtn = document.getElementById("stopbtn");

const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const synth = window.speechSynthesis;

startBtn.addEventListener("click", () => {
   window.speechSynthesis.cancel();
    recognition.start();
});



let utter = new SpeechSynthesisUtterance();
utter.onend = () => {
    recognition.start();
};


recognition.onresult = (e) => {
    
const transcript = e.results[e.results.length - 1][0].transcript.trim();

    document.getElementById("gettext").innerHTML+="/n"+transcript;
    if (transcript === "hello" )
        /*|| transcript === "hello what is your name" || transcript === "what is your name" || transcript === "name" || transcript === "hi" || transcript === "hi what is your name")*/
    {
        
        recognition.stop();
        
        utter.text = "Hi, My name is kitti. What is your name ?";
        synth.speak(utter);
    }
    
};


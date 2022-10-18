const startBtn = document.querySelector("#start-btn");
const stopBtn = document.querySelector("#stop-btn");
const recognition = new webkitSpeechRecognition();

recognition.continuous = true;
recognition.lang = "en-IN";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const synth = window.speechSynthesis;
//synth.lang = 'en-IN';

var voices = speechSynthesis.getVoices();

startBtn.addEventListener("click", () => {
	recognition.start();
});

stopBtn.addEventListener("click", () => {
	recognition.stop();
});

//let utter = new SpeechSynthesisUtterance("Hi, How are you?");
let utter = new SpeechSynthesisUtterance();
utter.lang = "hi-IN";
//utter.rate = 1.5;

utter.onend= () =>{
	recognition.start();
};

const trigger = [
//0 Greetings
["hi", "hey", "hello", "howdy"],
//1 Hows
["how are you", "how are things"],
//2 Whats
["what is going on", "what is up"],
//3 Feeling Good
["happy", "good", "well", "fantastic", "cool"],
//4 Feeling Bad
["bad", "bored", "tired", "sad"],
//5 Story
["in which class are you"],
//6 Poem
["tell me a poem"],
//7
["thanks", "thank you"],
//8 Byes
["bye", "good bye", "goodbye"],
//9
["what is your name"],
//10
["nice to meet you"],
//11
["what can you do"],
//12
["what is my name"]
];



const alternative=["Sorry I did not hear that, can you try again","I'm listening","Can you say that again?"];

function compare(trigger, input) {
	if (input.includes(trigger)) {
		return 1;
	}
	else {
		return 0;
	}
}

function getReply(triggerArray, replyArray, text) {
	let item;
	for (let x = 0; x < triggerArray.length; x++) {
   		for (let y = 0; y < replyArray.length; y++) {
   			if (compare(triggerArray[x][y], text)) {
       			items = replyArray[x];
       			item = items[Math.floor(Math.random()*items.length)];
   			}
  		}
	}
	//synth.utter(item);
	return item;
}

function refineTranscript(rawTranscript) {
	let transcript = rawTranscript.toLowerCase().replace(/[^\w\s\d]/gi, "");
	transcript = transcript
    .replace(/ a /g, " ")
    .replace(/i feel /g, "")
	.replace(/i am /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "");

	return transcript;
}

let userName = "";

recognition.onresult = (e) => {
	const rawTranscript= e.results[e.results.length-1][0].transcript.trim();
	console.log(rawTranscript);
	const newTranscript = refineTranscript(rawTranscript);

	var reply=[
	//0 
	[`Hello, What's your name?`, `Hi, What's your name?`, `Hey, What's your name?`, `Hi there, What's your name?`], 

	//1
	[
		`Fine... how are you ${userName}?`,
		`Pretty well, how are you ${userName}?`,
		`Fantastic, how are you ${userName}?`
	  ],

	//2
	[
		`Nothing much`,
		`Exciting things!`
	  ],

	//3
	[`Glad to hear it`],

	//4
	[`Why?`, `Cheer up buddy`],

	//5 Stories
	[`i am in 5th standard , and you`,
	 `in 5th standard now what about you`
	],

	//6 Poem
	[`Okay here you go ${userName}, this poem is called: Baa Baa Black Sheep. Baa, baa, black sheep, Have you any wool? Yes, sir, yes, sir, Three bags full; One for the master, And one for the dame, And one for the little boy Who lives down the lane.`,
	 `Okay here you go ${userName}, this poem is called: Twinkle Twinkle Little Star. Twinkle twinkle little star How I wonder what you are? Up above the world so high Like a diamond in the sky Twinkle, twinkle, little star How I wonder what you are?`,
	],

	//7 Welcomes
	[`You're welcome`, `No problem`, `No Worries`],

	//8
	[`Goodbye ${userName}`, `See you later ${userName}`],

	//9
	['I am your Interactive Bot.'],

	//10
	[`Nice to meet you too ${userName}`],

	//11
	[`I can read you stories, poems and talk to you ${userName}.`],
	
	//12
	[`Your name is ${userName}.`]
	];

	/*if (transcript === "hello") {
		recognition.stop();
		utter.text = "Hi, How are you?";
		synth.speak(utter);
	}
	else if(transcript === "goodbye") {
		recognition.stop();
		utter.text = "Bye! Hope to see you again!";
		synth.speak(utter);
	}*/

	recognition.stop();
	if (rawTranscript.includes("my name is")) {
        
         window.speechSynthesis.cancel();
		var name = rawTranscript.split("my name is");
		userName = name[1];
		utter.text = `Hello ${userName} That is a beautiful name!`;
		synth.speak(utter);
	}

	else if (newTranscript.includes("bye") || newTranscript.includes("goodbye")) {
        
         window.speechSynthesis.cancel();
		recognition.continuous = false;
		//speechSynthesis.stop();
		product = getReply(trigger, reply, newTranscript);
		utter.text = product;
		synth.speak(utter);
	}

	else if(getReply(trigger, reply, rawTranscript)) {
        
         window.speechSynthesis.cancel();
    	product = getReply(trigger, reply, rawTranscript);
		utter.text = product;
		synth.speak(utter);
  	}

	else if(getReply(trigger, reply, newTranscript)) {
        
         window.speechSynthesis.cancel();
    	product = getReply(trigger, reply, newTranscript);
		utter.text = product;
		synth.speak(utter);
  	}

  	else{
         window.speechSynthesis.cancel();
    	product = alternative[Math.floor(Math.random() * alternative.length)];
		utter.text = product;
		synth.speak(utter);
  	}
	
	//recognition.start();
}
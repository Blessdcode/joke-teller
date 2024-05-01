/** @format */

const button = document.getElementById("button");
const audioElement = document.getElementById("audio");
const textEl = document.getElementById("text");

// Disable/Enable Button
function toggleButton() {
	button.disabled = !button.disabled;
}

// VoiceRSS Speech Function
function tellMe(joke) {
	const jokeString = joke.trim().replace(/ /g, "%20");
	// VoiceRSS Speech Parameters
	VoiceRSS.speech({
		key: "6a357d68579c474593737831e3f1fc22",
		src: jokeString,
		hl: "en-gb",
		r: 0,
		c: "mp3",
		f: "44khz_16bit_stereo",
		ssml: false,
	});
}

// Get jokes from Joke API
async function getJokes() {
	let joke = "";
	// const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist';
	const apiUrl = "https://v2.jokeapi.dev/joke/Programming,Dark?type=single";
	// const apiUrl = "https://api.adviceslip.com/advice";
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		if (data.setup) {
			// joke = `${data.setup} ... ${data.delivery}`;
			joke = `${data.setup} ... ${data.punchline}`;
		} else {
			joke = data.joke;
		}
		tellMe(joke);
		toggleButton();
		// textEl.textContent = joke;
	} catch (error) {
		// Catch Error Here
		console.log(error);
	}
}

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);

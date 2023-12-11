import { process } from "/env";
import { Configuration, OpenAIApi } from "openai";

const setupTextarea = document.getElementById("setup-textarea");
const setupInputContainer = document.getElementById("setup-input-container");
const movieBossText = document.getElementById("movie-boss-text");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

document.getElementById("send-btn").addEventListener("click", () => {
  // if (setupTextarea.value) {
  setupInputContainer.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`;
  movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`;
  // }
  fetchBotReply();
});

/*async function fetchBotReply(model, prompt, outline="", maxTokens=10, temperature=1) {
  try {
    const response = await openai.createCompletion({
      model: model,
      prompt: `${prompt}
      ###
      outline: ${outline}
      message:
      `,
      maxTokens: maxTokens,
      temperature: temperature,
    });
    console.log(response.data.choices[0].text.trim());
  } catch (err) {
    console.log(err);
  }
  //movieBossText.innerText = response.data.choices[0].text.trim()
}*/

function fetchBotReply() {
  fetch("https://api.openai.com/v1/engines/davinci/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      prompt: "Sound enthusiastic in five words or less.",
      max_tokens: 5,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      movieBossText.innerText = data.choices[0].text.trim();
      setupInputContainer.innerHTML = `<textarea id="setup-textarea" placeholder="Enter your setup here..."></textarea>`;
    });
}

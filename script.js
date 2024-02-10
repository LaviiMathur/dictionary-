// const sound = document.getElementById("sound");

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.querySelector(".result");
const dark_mode = document.querySelector(".dark_mode");
const modeBtn = document.querySelector(".material-symbols-outlined");
const inpWord = document.getElementById("inpWord");
inpWord.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    search.click();
  }
});

const search = document.getElementById("search");

search.addEventListener("click", () => {
  const word = inpWord.value;

  console.log(`${url}${word}`);
  fetch(`${url}${word}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.length > 0) {
        result.innerHTML = `<div class="word">
                <h2>${data[0].word}</h2>
                
                <button onclick="playSound()">
                    <span class="material-symbols-outlined">volume_up</span>
                </button>
            </div>
            <div class="details">
              
                    <p class="partOfSpeech">${
                      data[0].meanings[0].partOfSpeech
                    }</p>
                    <p class="definition">${
                      data[0].meanings[0].definitions[0].definition
                    }</p>
                    <p class="example">"${
                      data[0].meanings[0].definitions[0].example || ""
                    }"</p>
                    <p class="partOfSpeech">${
                      data[0]?.meanings[1]?.partOfSpeech || ""
                    }</p>
                    <p class="definition">${
                      data[0]?.meanings[1]?.definitions[0]?.definition || ""
                    }</p>
                    <p class="example">"${
                      data[0]?.meanings[1]?.definitions[0]?.example || ""
                    }"</p>
               
            </div>`;

        console.log(data[0].phonetics[0].audio);

        sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
      } else {
        result.innerHTML = `<h2 class="error">Couldn't Find The Word</h2>`;
      }
    });
});
function playSound() {
  const sound = document.getElementById("sound");
  sound.play();
}
dark_mode.addEventListener("click", () => {
  const styleSheet = document.getElementById("toggleStyleSheet");
  if (modeBtn.innerText == "light_mode") {
    modeBtn.innerText = "dark_mode";
    styleSheet.href = "style.css";
  } else {
    modeBtn.innerText = "light_mode";
    styleSheet.href = "darkmode.css";
  }
});
window.onload = function () {
  inpWord.focus();
};

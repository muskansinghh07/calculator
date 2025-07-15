const searchBtn = document.getElementById("searchBtn");
const wordInput = document.getElementById("wordInput");
const result = document.getElementById("result");
const errorMsg = document.getElementById("errorMsg");

const wordEl = document.getElementById("word");
const phoneticEl = document.getElementById("phonetic");
const audioEl = document.getElementById("audio");
const definitionEl = document.getElementById("definition");
const exampleEl = document.getElementById("example");
const synonymsEl = document.getElementById("synonyms");

searchBtn.addEventListener("click", () => {
  const word = wordInput.value.trim();
  if (word === "") return;

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(res => res.json())
    .then(data => {
      if (data.title === "No Definitions Found") {
        result.classList.add("hidden");
        errorMsg.textContent = `No definition found for "${word}"`;
        errorMsg.classList.remove("hidden");
        return;
      }

      errorMsg.classList.add("hidden");
      result.classList.remove("hidden");

      const entry = data[0];
      const meaning = entry.meanings[0];
      const def = meaning.definitions[0];

      wordEl.textContent = entry.word;
      phoneticEl.textContent = entry.phonetics[0]?.text || '';
      audioEl.src = entry.phonetics[0]?.audio || '';
      definitionEl.textContent = def.definition || 'Not available';
      exampleEl.textContent = def.example || 'Not available';
      synonymsEl.textContent = def.synonyms?.join(", ") || 'Not available';
    })
    .catch(err => {
      console.error(err);
      result.classList.add("hidden");
      errorMsg.textContent = "Failed to fetch word. Try again!";
      errorMsg.classList.remove("hidden");
    });
});

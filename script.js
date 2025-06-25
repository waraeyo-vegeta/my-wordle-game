let solution = "";
let attempts = [];
const maxAttempts = 6;

async function loadWords() {
  const res = await fetch("words.json");
  const arr = await res.json();
  solution = arr[Math.floor(Math.random() * arr.length)];
  console.log("今日の単語:", solution);
}
function init() {
  loadWords();
  document.getElementById("submitBtn").addEventListener("click", submitGuess);
}
function submitGuess() {
  const inputEl = document.getElementById("guessInput");
  const guess = inputEl.value.toUpperCase();
  if (guess.length !== 5) return alert("5文字の単語を入力してね");
  attempts.push(guess);
  renderBoard();
  if (guess === solution) {
    setTimeout(()=> alert("正解！🎉"), 100);
  } else if (attempts.length >= maxAttempts) {
    setTimeout(()=> alert(`残念！正解は ${solution}`), 100);
  }
  inputEl.value = "";
}
function renderBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  attempts.forEach(guess => {
    for (let i = 0; i < 5; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      const letter = guess[i];
      cell.textContent = letter;
      if (letter === solution[i]) cell.classList.add("correct");
      else if (solution.includes(letter)) cell.classList.add("present");
      else cell.classList.add("absent");
      board.appendChild(cell);
    }
  });
}
window.addEventListener("DOMContentLoaded", init);

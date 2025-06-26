let solution = "";
let solutionHint = "";
let solutionJP = "";

async function loadWords() {
  const res = await fetch("words.json");
  const arr = await res.json();
  const selected = arr[Math.floor(Math.random() * arr.length)];
  solution = selected.word;
  solutionHint = selected.hint;
  solutionJP = selected.jp;
  console.log("正解:", solution);
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


function showHint() {
  document.getElementById("hintArea").textContent = "Hint: " + solutionHint;
  document.getElementById("jpArea").textContent = "日本語: " + solutionJP;
}

function playSound() {
  const utterance = new SpeechSynthesisUtterance(solution);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}

function init() {
  loadWords();
  document.getElementById("submitBtn").addEventListener("click", submitGuess);
  document.getElementById("hintBtn").addEventListener("click", showHint);
  document.getElementById("soundBtn").addEventListener("click", playSound);
}

// ページが読み込まれたら init を呼ぶ
document.addEventListener("DOMContentLoaded", init);

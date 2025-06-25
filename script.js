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

function init() {
  loadWords();
  document.getElementById("submitBtn").addEventListener("click", submitGuess);
  document.getElementById("hintBtn").addEventListener("click", showHint);
  document.getElementById("soundBtn").addEventListener("click", playSound);
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

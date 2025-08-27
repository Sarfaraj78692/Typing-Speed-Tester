const quotes = [
  "The quick brown fox jumps over the lazy dog",
  "Typing fast requires practice and patience",
  "JavaScript makes web pages more interactive",
  "Web development is fun and creative",
  "Stay consistent and you will succeed",
  "Hard work beats talent when talent doesn’t work hard",
  "Dream big and dare to fail",
  "The harder you work for something the greater you will feel when you achieve it",
  "Little things make big days",
  "It always seems impossible until it’s done",
  "Learn from yesterday, live for today, hope for tomorrow",
  "The purpose of our lives is to be happy",
  "Life is what happens when you’re busy making other plans",
  "Time is money, so don’t waste it",
  "Don’t count the days, make the days count",
  "The secret of getting ahead is getting started",
  "Typing is not about speed alone, but accuracy too"
];

let startTime, timerInterval;
let quoteText = "";
const quoteElement = document.getElementById("quote");
const inputElement = document.getElementById("input");
const timeElement = document.getElementById("time");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");

function startTest() {
  // Pick random quote
  quoteText = quotes[Math.floor(Math.random() * quotes.length)];
  quoteElement.textContent = quoteText;

  inputElement.value = "";
  inputElement.disabled = false;
  inputElement.focus();

  timeElement.textContent = "0";
  wpmElement.textContent = "0";
  accuracyElement.textContent = "0";

  startTime = new Date();
  clearInterval(timerInterval);
  timerInterval = setInterval(updateStats, 1000);
}

function updateStats() {
  const elapsedTime = Math.floor((new Date() - startTime) / 1000);
  timeElement.textContent = elapsedTime;

  const typedText = inputElement.value.trim();
  const wordsTyped = typedText.split(/\s+/).filter(word => word.length > 0).length;

  const wpm = elapsedTime > 0 ? Math.round((wordsTyped / elapsedTime) * 60) : 0;
  wpmElement.textContent = wpm;

  let correctChars = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === quoteText[i]) {
      correctChars++;
    }
  }
  const accuracy = typedText.length > 0 ? Math.round((correctChars / typedText.length) * 100) : 0;
  accuracyElement.textContent = accuracy;

  // ✅ Stop when finished typing correctly
  if (typedText === quoteText) {
    clearInterval(timerInterval);
    inputElement.disabled = true;

    setTimeout(() => {
      resetTest();
      startTest();
    }, 3000);
  }
}

function resetTest() {
  clearInterval(timerInterval);
  inputElement.value = "";
  inputElement.disabled = true;
  quoteElement.textContent = "";
  timeElement.textContent = "0";
  wpmElement.textContent = "0";
  accuracyElement.textContent = "0";
}

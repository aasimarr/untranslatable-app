let words = [];
let currentIndex = 0;

// Fetch the words from the JSON file
fetch('words.json')
  .then(response => response.json())
  .then(data => {
    words = data;
    displayWord(getWordOfTheDay());
  })
  .catch(error => console.error('Error loading words:', error));
function displayWord(wordObj) {
  document.getElementById('word').textContent = wordObj.word;
  document.getElementById('language').textContent = wordObj.language;
  document.getElementById('pronunciation').textContent = wordObj.pronunciation;
  document.getElementById('definition').textContent = wordObj.definition;
  document.getElementById('example').textContent = wordObj.example;
}
function getWordOfTheDay() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
  currentIndex = dayOfYear % words.length;
  return words[currentIndex];
}
document.getElementById('prevBtn').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + words.length) % words.length;
  displayWord(words[currentIndex]);
});

document.getElementById('nextBtn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % words.length;
  displayWord(words[currentIndex]);
});
document.getElementById('shareBtn').addEventListener('click', () => {
  const wordObj = words[currentIndex];
  const shareText = `Untranslatable Word "${wordObj.word}" (${wordObj.language}): ${wordObj.definition}`;
  if (navigator.share) {
    navigator.share({
      title: 'Untranslatable Word',
      text: shareText,
      url: window.location.href
    }).then(() => {
      console.log('Word shared successfully');
    }).catch(err => {
      console.error('Error sharing:', err);
    });
  } else {
    // Fallback
    alert('Sharing not supported in this browser. Please copy the word manually.');
  }
});

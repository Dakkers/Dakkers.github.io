const ALL_KEYS = [
  'C',
  'C#/Db',
  'D',
  'D#/Eb',
  'E',
  'F',
  'F#/Gb',
  'G',
  'Gb/A#',
  'A',
  'A#/Bb',
  'B'
];

const remainingKeys = ALL_KEYS.slice();

// -- Helpers :)

function _shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function updateLetterText (text) {
  const keyTextElem = document.getElementById('letter');
  keyTextElem.innerText = text;
}

function updateListContent () {
  const remainingListElem = document.getElementById('list-1');
  const playedListElem = document.getElementById('list-2');

  remainingListElem.innerHTML = '';
  playedListElem.innerHTML = '';

  for (const key of ALL_KEYS) {
    const newLiElem = document.createElement('li');
    newLiElem.innerText = key;

    const listToUse = (
      remainingKeys.includes(key)
        ? remainingListElem
        : playedListElem
    );

    listToUse.appendChild(newLiElem);
  }
}

// -- Buttons / Inputs

function next () {
  remainingKeys.shift();
  if (remainingKeys.length === 0) {
    updateLetterText('---');
  } else {
    updateLetterText(remainingKeys[0]);
  }
  updateListContent();
}

function restart () {
  remainingKeys.length = 0;
  remainingKeys.push(...ALL_KEYS.slice());
  _shuffleArray(remainingKeys);
}

function onKeyDown (event) {
  if ([13, 32].include(event.keyCode)) {
    next();
  }
}

(function init () {
  restart();
  updateLetterText(remainingKeys[0]);
  updateListContent();

  document.addEventListener('keydown', onKeyDown);
})();

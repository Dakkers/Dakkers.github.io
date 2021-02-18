---
layout: page
title: Keys
tagline: Random key picker
permalink: /keys.html
ref: keys
order: 3
---

<div>
  <p>
    Welcome to this dinky tool! It goes through all 12 keys at random; I use it to practice scales, chord types, etc. without developing muscle memory of moving around the circle of 5ths. You can hit Space/Enter to go to the next key, Esc/R to restart. Alternatively if your MIDI keyboard is plugged in when accessing this page, the lowest A on the keyboard will go to the next key and the highest C will restart.
  </p>

  <button onclick="next()">Next</button>
  <button onclick="restart()">Reset</button>

  <h1 id="letter"></h1>

  <p>Remaining:</p>
  <ul id='list-1'></ul>

  <p>Played:</p>
  <ul id='list-2'></ul>
</div>

<script>
const ALL_KEYS = [
  'C',
  'C#/Db',
  'D',
  'D#/Eb',
  'E',
  'F',
  'F#/Gb',
  'G',
  'G#/Ab',
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

// -- MIDI

function onMIDISuccess(midiAccess) {
  const inputs = midiAccess.inputs;
  const outputs = midiAccess.outputs;

  for (const input of midiAccess.inputs.values()) {
    input.onmidimessage = getMIDIMessage;
  }
}

function onMIDIFailure() {
  window.alert('Could not access your MIDI devices.');
}

function getMIDIMessage(message) {
  const command = message.data[0];
  const note = message.data[1];
  const velocity = (message.data.length > 2) ? message.data[2] : 0; // a velocity value might not be included with a noteOff command

  switch (command) {
    case 144: // noteOn
      if (velocity > 0) {
        noteOn(note);
      }
      break;
    case 176: // MIDI Control #0
      restart();
      break;
    default:
      break
  }
}

function noteOn (note) {
  if (note === 21) {
    next();
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

  updateLetterText(remainingKeys[0]);
  updateListContent();
}

function onKeyDown (event) {
  if ([13, 32].includes(event.keyCode)) {
    next();
  } else if ([27, 82].includes(event.keyCode)) {
    restart();
  }
}

(function init () {
  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  restart();


  document.addEventListener('keydown', onKeyDown);
})();
</script>

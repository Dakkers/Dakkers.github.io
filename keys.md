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
    Welcome to this dinky tool! It goes through all 12 keys at random; I use it to practice scales, chord types, etc. without developing muscle memory of moving around the circle of 5ths. You can hit Space/Enter to go to the next key, Esc/R to restart.
  </p>

  <p>
    Alternatively if your MIDI keyboard is plugged in when accessing this page, the lowest A on the keyboard will go to the next key and the highest C will restart.
  </p>

  <p>
    Lastly, if you use Chrome, the computer will speak to you so you don't have to look at the computer screen to see what key it is. :)
  </p>

  <button onclick="next()">Next</button>
  <button onclick="restart()">Restart</button>

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
const keysPlayed = [];
let _hasStarted = false;

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

  for (const key of keysPlayed) {
    const newLiElem = document.createElement('li');
    newLiElem.innerText = key;
    playedListElem.appendChild(newLiElem);
  }

  for (const key of remainingKeys) {
    const newLiElem = document.createElement('li');
    newLiElem.innerText = key;
    remainingListElem.appendChild(newLiElem);
  }
}

function _handleCurrentKey () {
  updateLetterText(remainingKeys[0]);
  speak(remainingKeys[0]);
}

// -- TTS

function speak (key) {
  let contentToSpeak = key;
  if (key.includes('#')) {
    const [, keyFlat] = key.split('/');
    contentToSpeak = keyFlat.replace('b', ' flat');
  }
  if (contentToSpeak.startsWith('A')) {
    contentToSpeak = contentToSpeak.replace('A', 'Eh');
  }

  if (
    !!window.speechSynthesis &&
    !!window.speechSynthesis.speak
  ) {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(contentToSpeak));
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
    default:
      break
  }
}

function noteOn (note) {
  if (note === 21) {
    next();
  } else if (note === 108) {
    restart();
  }
}

// -- Buttons / Inputs

function _resetKeys () {
  remainingKeys.length = 0;
  remainingKeys.push(...ALL_KEYS.slice());
  _shuffleArray(remainingKeys);

  keysPlayed.length = 0;

  updateListContent();
}

function next () {
  if (!_hasStarted) {
    _handleCurrentKey();
    _hasStarted = true;
  } else if (remainingKeys.length === 0) {
    updateLetterText('---');
  } else {
    const key = remainingKeys.shift();
    keysPlayed.push(key);
    _handleCurrentKey();
  }
  updateListContent();
}

function restart () {
  _hasStarted = false;
  _resetKeys();
  updateLetterText('---');
  updateListContent();
}

function onKeystrokeDown (event) {
  if ([13, 32].includes(event.keyCode)) {
    next();
  } else if ([27, 82].includes(event.keyCode)) {
    restart();
  }
}

(function init () {
  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  _resetKeys();
  updateLetterText('---');

  document.addEventListener('keydown', onKeystrokeDown);
})();
</script>

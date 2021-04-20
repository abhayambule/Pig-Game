'use strict';

// selecting elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const rolldice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newgame = document.querySelector('.btn--new');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let game = true;

// initialising the value
score0EL.textContent = 0;
score1EL.textContent = 0;
current0EL.textContent = 0;
current1EL.textContent = 0;
diceEL.classList.add('hidden');
//switch player function
let switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};
//click on rolldice

rolldice.addEventListener('click', function () {
  if (game) {
    diceEL.classList.remove('hidden');
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEL.src = `dice-${dice}.png`;

    //adding to current score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

// click on hold
hold.addEventListener('click', function () {
  if (game) {
    // add to score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      game = false;
      diceEL.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

// new Game
newgame.addEventListener('click', function () {
  diceEL.classList.add('hidden');
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  scores = [0, 0];
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  activePlayer = 0;
  currentScore = 0;
  game = true;
});

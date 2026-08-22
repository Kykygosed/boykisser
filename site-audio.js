// ==========================================================
// Boykisser Airlines — Sons de la page d'accueil
//   - site-audio.mp3 : joué dès l'arrivée sur le site, en boucle,
//     et relancé automatiquement s'il s'arrête pour une raison
//     quelconque.
//   - meow.mp3 : joué toutes les 10 secondes.
//
// Les navigateurs bloquent la lecture automatique avec du son tant
// que l'utilisateur n'a pas interagi avec la page : on tente de
// lancer le son immédiatement, et si c'est refusé, un petit bouton
// apparaît + le premier clic/touche sur la page démarre les sons.
// ==========================================================

const siteAudio = document.getElementById('site-audio');
const meowAudio = document.getElementById('meow-audio');
const unlockBtn = document.getElementById('sound-unlock');

let soundsStarted = false;

function startSounds(){
  if (soundsStarted) return;
  soundsStarted = true;

  playSiteAudio();
  setInterval(playMeow, 10000);

  unlockBtn.classList.add('hidden');
}

function playSiteAudio(){
  const p = siteAudio.play();
  if (p && p.catch) {
    p.catch(() => {
      // Lecture auto refusée par le navigateur : on attend une interaction
      soundsStarted = false;
      unlockBtn.classList.remove('hidden');
    });
  }
}

function playMeow(){
  // On relance le son depuis le début à chaque fois
  meowAudio.currentTime = 0;
  meowAudio.play().catch(() => {});
}

// Si le son principal s'arrête pour une raison quelconque, on le relance
siteAudio.addEventListener('pause', () => {
  if (soundsStarted) siteAudio.play().catch(() => {});
});
siteAudio.addEventListener('ended', () => {
  siteAudio.currentTime = 0;
  siteAudio.play().catch(() => {});
});

// Tentative de lecture automatique dès le chargement de la page
window.addEventListener('DOMContentLoaded', startSounds);

// Filet de sécurité : première interaction utilisateur = lancement du son
['click', 'keydown', 'touchstart'].forEach(evt => {
  document.addEventListener(evt, startSounds, { once: true });
});

unlockBtn.addEventListener('click', startSounds);

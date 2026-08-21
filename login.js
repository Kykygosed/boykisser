const form = document.getElementById('login-form');
const msg = document.getElementById('form-msg');
const submitBtn = document.getElementById('submit-btn');

function showMsg(text, type){
  msg.textContent = text;
  msg.className = 'form-msg show ' + type;
}

auth.onAuthStateChanged(user => {
  if (user) window.location.href = 'dashboard.html';
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  msg.className = 'form-msg';

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    showMsg('Merci de remplir tous les champs.', 'error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Connexion…';

  try {
    await auth.signInWithEmailAndPassword(email, password);
    window.location.href = 'dashboard.html';
  } catch (err) {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Se connecter';

    let text = "Une erreur est survenue. Réessaie.";
    if (['auth/wrong-password','auth/user-not-found','auth/invalid-credential'].includes(err.code)) {
      text = "Adresse e-mail ou mot de passe incorrect.";
    } else if (err.code === 'auth/invalid-email') {
      text = "Adresse e-mail invalide.";
    } else if (err.code === 'auth/too-many-requests') {
      text = "Trop de tentatives. Réessaie plus tard.";
    }
    showMsg(text, 'error');
  }
});

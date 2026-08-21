const form = document.getElementById('register-form');
const msg = document.getElementById('form-msg');
const submitBtn = document.getElementById('submit-btn');

function showMsg(text, type){
  msg.textContent = text;
  msg.className = 'form-msg show ' + type;
}

// Si déjà connecté, direction le tableau de bord
auth.onAuthStateChanged(user => {
  if (user) window.location.href = 'dashboard.html';
});

function ageDepuisDate(dateStr){
  const dob = new Date(dateStr);
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
  return age;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  msg.className = 'form-msg';

  const prenom = document.getElementById('prenom').value.trim();
  const nom = document.getElementById('nom').value.trim();
  const dob = document.getElementById('dob').value;
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const password2 = document.getElementById('password2').value;

  if (!prenom || !nom || !dob || !email || !password) {
    showMsg('Merci de remplir tous les champs.', 'error');
    return;
  }
  if (password.length < 6) {
    showMsg('Le mot de passe doit contenir au moins 6 caractères.', 'error');
    return;
  }
  if (password !== password2) {
    showMsg('Les mots de passe ne correspondent pas.', 'error');
    return;
  }
  const dobDate = new Date(dob);
  if (isNaN(dobDate.getTime()) || dobDate > new Date()) {
    showMsg('Date de naissance invalide.', 'error');
    return;
  }
  if (ageDepuisDate(dob) < 13) {
    showMsg('Tu dois avoir au moins 13 ans pour créer un compte.', 'error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Création en cours…';

  try {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    const uid = cred.user.uid;

    await db.collection('users').doc(uid).set({
      nom,
      prenom,
      dateNaissance: dob,
      email,
      role: 'pilot',
      activeFlightId: null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    showMsg('Compte créé, bienvenue à bord ! Redirection…', 'ok');
    setTimeout(() => window.location.href = 'dashboard.html', 900);

  } catch (err) {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Créer mon compte';

    let text = "Une erreur est survenue. Réessaie.";
    if (err.code === 'auth/email-already-in-use') text = "Cette adresse e-mail est déjà utilisée.";
    else if (err.code === 'auth/invalid-email') text = "Adresse e-mail invalide.";
    else if (err.code === 'auth/weak-password') text = "Mot de passe trop faible (6 caractères minimum).";
    showMsg(text, 'error');
  }
});

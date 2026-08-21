const loadingEl = document.getElementById('loading');
const gateLogin = document.getElementById('gate-login');
const gateDenied = document.getElementById('gate-denied');
const adminContent = document.getElementById('admin-content');

document.getElementById('logout-btn').addEventListener('click', () => {
  auth.signOut().then(() => window.location.href = 'index.html');
});

auth.onAuthStateChanged(async (user) => {
  loadingEl.classList.remove('hidden');
  [gateLogin, gateDenied, adminContent].forEach(el => el.classList.add('hidden'));

  if (!user) {
    loadingEl.classList.add('hidden');
    gateLogin.classList.remove('hidden');
    return;
  }

  document.getElementById('user-email').textContent = user.email;

  const userSnap = await db.collection('users').doc(user.uid).get();
  const role = userSnap.exists ? userSnap.data().role : null;

  loadingEl.classList.add('hidden');

  if (role !== 'admin') {
    gateDenied.classList.remove('hidden');
    return;
  }

  adminContent.classList.remove('hidden');
  initAdmin();
});

let initialized = false;
function initAdmin(){
  if (initialized) return;
  initialized = true;

  loadFlightsTable();

  document.getElementById('flight-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = document.getElementById('form-msg');
    const btn = document.getElementById('submit-btn');
    msg.className = 'form-msg';

    const callsign = val('callsign').toUpperCase();
    const depart = val('depart').toUpperCase();
    const arrivee = val('arrivee').toUpperCase();
    const avion = val('avion');
    const passagers = parseInt(val('passagers'), 10);
    const distance = val('distance') ? parseFloat(val('distance')) : null;
    const description = val('description');

    const departLat = val('departLat') ? parseFloat(val('departLat')) : null;
    const departLng = val('departLng') ? parseFloat(val('departLng')) : null;
    const arriveeLat = val('arriveeLat') ? parseFloat(val('arriveeLat')) : null;
    const arriveeLng = val('arriveeLng') ? parseFloat(val('arriveeLng')) : null;

    if (!callsign || !depart || !arrivee || !avion || isNaN(passagers)) {
      msg.textContent = 'Merci de remplir tous les champs obligatoires.';
      msg.className = 'form-msg show error';
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Publication…';

    try {
      await db.collection('flights').add({
        callsign, depart, arrivee, avion, passagers, distance, description,
        departLat, departLng, arriveeLat, arriveeLng,
        actif: true,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      msg.textContent = 'Route publiée avec succès.';
      msg.className = 'form-msg show ok';
      document.getElementById('flight-form').reset();
      loadFlightsTable();
    } catch (err) {
      console.error(err);
      msg.textContent = "Erreur lors de la publication.";
      msg.className = 'form-msg show error';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Publier la route';
    }
  });
}

function val(id){ return document.getElementById(id).value.trim(); }

async function loadFlightsTable(){
  const tbody = document.getElementById('flights-table-body');
  tbody.innerHTML = '<tr><td colspan="6">Chargement…</td></tr>';

  const snap = await db.collection('flights').orderBy('createdAt', 'desc').get();

  if (snap.empty) {
    tbody.innerHTML = '<tr><td colspan="6">Aucune route publiée.</td></tr>';
    return;
  }

  tbody.innerHTML = '';
  snap.forEach(doc => {
    const f = doc.data();
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="callsign">${escapeHtml(f.callsign)}</span></td>
      <td>${escapeHtml(f.depart)} → ${escapeHtml(f.arrivee)}</td>
      <td>${escapeHtml(f.avion)}</td>
      <td>${escapeHtml(String(f.passagers))}</td>
      <td>${f.actif ? '<span class="badge badge--ok">Active</span>' : '<span class="badge badge--muted">Désactivée</span>'}</td>
      <td style="display:flex;gap:6px;">
        <button class="del-btn toggle-btn" data-id="${doc.id}" data-actif="${f.actif}">${f.actif ? 'Désactiver' : 'Activer'}</button>
        <button class="del-btn delete-btn" data-id="${doc.id}">Suppr.</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      await db.collection('flights').doc(btn.dataset.id).update({ actif: btn.dataset.actif !== 'true' });
      loadFlightsTable();
    });
  });
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('Supprimer définitivement cette route ?')) return;
      await db.collection('flights').doc(btn.dataset.id).delete();
      loadFlightsTable();
    });
  });
}

function escapeHtml(str){
  return String(str)
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

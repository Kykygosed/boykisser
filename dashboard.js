let currentUser = null;
let currentUserData = null;
let leafletMap = null;

const loadingEl = document.getElementById('loading');
const contentEl = document.getElementById('dashboard-content');
const activeRouteBlock = document.getElementById('active-route-block');
const flightsBlock = document.getElementById('flights-block');
const flightsGrid = document.getElementById('flights-grid');
const noFlights = document.getElementById('no-flights');

document.getElementById('logout-btn').addEventListener('click', () => {
  auth.signOut().then(() => window.location.href = 'index.html');
});

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = 'login.html';
    return;
  }
  currentUser = user;
  document.getElementById('user-email').textContent = user.email;
  await loadDashboard();
});

async function loadDashboard(){
  loadingEl.classList.remove('hidden');
  contentEl.classList.add('hidden');

  const userSnap = await db.collection('users').doc(currentUser.uid).get();
  if (!userSnap.exists) {
    // Dossier pilote introuvable -> on le recrée a minima pour éviter un blocage
    await db.collection('users').doc(currentUser.uid).set({
      nom: '', prenom: '', email: currentUser.email, role: 'pilot',
      activeFlightId: null, createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  }
  currentUserData = (await db.collection('users').doc(currentUser.uid).get()).data();

  document.getElementById('pilot-name').textContent =
    (currentUserData.prenom || '') + ' ' + (currentUserData.nom || '') || currentUser.email;
  document.getElementById('pilot-id').textContent =
    'ID PILOTE · ' + currentUser.uid.slice(0, 8).toUpperCase();

  if (currentUserData.activeFlightId) {
    await renderActiveRoute();
  } else {
    await renderAvailableFlights();
  }

  loadingEl.classList.add('hidden');
  contentEl.classList.remove('hidden');
}

/* ============ ROUTE ACTIVE ============ */
async function renderActiveRoute(){
  flightsBlock.classList.add('hidden');
  noFlights.classList.add('hidden');
  activeRouteBlock.classList.remove('hidden');

  const liveSnap = await db.collection('liveFlights').doc(currentUser.uid).get();

  if (!liveSnap.exists) {
    // Incohérence : on nettoie et on repasse en liste de vols
    await db.collection('users').doc(currentUser.uid).update({ activeFlightId: null });
    currentUserData.activeFlightId = null;
    activeRouteBlock.classList.add('hidden');
    await renderAvailableFlights();
    return;
  }

  const f = liveSnap.data();

  activeRouteBlock.innerHTML = `
    <div class="card active-route">
      <div class="active-route__strip">
        <div><strong style="font-family:var(--font-mono);letter-spacing:1px;">${escapeHtml(f.callsign)}</strong></div>
        <span class="tag">ROUTE EN COURS</span>
      </div>
      <div class="active-route__body">
        <div class="route-line">
          <div class="apt">${escapeHtml(f.depart)}<small>Départ</small></div>
          <div class="path"></div>
          <div class="apt">${escapeHtml(f.arrivee)}<small>Arrivée</small></div>
        </div>
        <div class="route-meta">
          <div><span>Appareil</span><strong>${escapeHtml(f.avion)}</strong></div>
          <div><span>Passagers</span><strong>${escapeHtml(String(f.passagers))}</strong></div>
          <div><span>Callsign</span><strong>${escapeHtml(f.callsign)}</strong></div>
          <div><span>Démarrée</span><strong>${formatDate(f.startedAt)}</strong></div>
        </div>
        <div class="map-box" id="map">
          <div class="map-note">📍 Suivi de position en temps réel — bientôt disponible</div>
        </div>
        <div style="margin-top:22px;display:flex;gap:12px;flex-wrap:wrap;">
          <button id="finish-route-btn" class="btn btn--dark">Terminer la route</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('finish-route-btn').addEventListener('click', finishRoute);

  initMap(f);
}

function initMap(f){
  const mapEl = document.getElementById('map');
  if (!mapEl) return;

  const hasCoords = typeof f.departLat === 'number' && typeof f.departLng === 'number';
  const center = hasCoords ? [f.departLat, f.departLng] : [20, 0];
  const zoom = hasCoords ? 5 : 2;

  leafletMap = L.map(mapEl, { zoomControl: true, attributionControl: true }).setView(center, zoom);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(leafletMap);

  const planeIcon = L.divIcon({
    html: '✈️',
    className: 'plane-icon',
    iconSize: [28, 28]
  });

  if (hasCoords) {
    L.marker([f.departLat, f.departLng], { title: f.depart }).addTo(leafletMap)
      .bindPopup(`Départ — ${f.depart}`);
    L.marker([f.departLat, f.departLng], { icon: planeIcon }).addTo(leafletMap)
      .bindPopup(`${f.callsign} — position en attente du suivi en direct`);
  }
  if (typeof f.arriveeLat === 'number' && typeof f.arriveeLng === 'number') {
    L.marker([f.arriveeLat, f.arriveeLng], { title: f.arrivee }).addTo(leafletMap)
      .bindPopup(`Arrivée — ${f.arrivee}`);
    if (hasCoords) {
      L.polyline([[f.departLat, f.departLng], [f.arriveeLat, f.arriveeLng]], {
        color: '#B3182F', weight: 2, dashArray: '6 8'
      }).addTo(leafletMap);
      leafletMap.fitBounds([[f.departLat, f.departLng], [f.arriveeLat, f.arriveeLng]], { padding: [30, 30] });
    }
  }
}

async function finishRoute(){
  if (!confirm('Confirmer la fin de cette route ?')) return;

  const btn = document.getElementById('finish-route-btn');
  btn.disabled = true;
  btn.textContent = 'Enregistrement…';

  const liveSnap = await db.collection('liveFlights').doc(currentUser.uid).get();
  const f = liveSnap.data();

  await db.collection('flightLog').add({
    uid: currentUser.uid,
    pilotNom: (currentUserData.prenom || '') + ' ' + (currentUserData.nom || ''),
    flightId: f.flightId,
    callsign: f.callsign,
    depart: f.depart,
    arrivee: f.arrivee,
    avion: f.avion,
    startedAt: f.startedAt,
    endedAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  await db.collection('liveFlights').doc(currentUser.uid).delete();
  await db.collection('users').doc(currentUser.uid).update({ activeFlightId: null });

  currentUserData.activeFlightId = null;
  activeRouteBlock.classList.add('hidden');
  activeRouteBlock.innerHTML = '';
  await renderAvailableFlights();
}

/* ============ LISTE DES VOLS DISPONIBLES ============ */
async function renderAvailableFlights(){
  activeRouteBlock.classList.add('hidden');
  activeRouteBlock.innerHTML = '';

  const snap = await db.collection('flights').where('actif', '==', true).get();

  if (snap.empty) {
    flightsBlock.classList.add('hidden');
    noFlights.classList.remove('hidden');
    return;
  }

  noFlights.classList.add('hidden');
  flightsBlock.classList.remove('hidden');
  flightsGrid.innerHTML = '';

  snap.forEach(doc => {
    const f = doc.data();
    const card = document.createElement('div');
    card.className = 'flight-card';
    card.innerHTML = `
      <div class="flight-card__top">
        <span>${escapeHtml(f.callsign)}</span>
        <span>${escapeHtml(f.avion)}</span>
      </div>
      <div class="flight-card__body">
        <div class="route-line">
          <div class="apt">${escapeHtml(f.depart)}<small>Départ</small></div>
          <div class="path"></div>
          <div class="apt">${escapeHtml(f.arrivee)}<small>Arrivée</small></div>
        </div>
        <div class="route-meta">
          <div><span>Passagers</span><strong>${escapeHtml(String(f.passagers))}</strong></div>
          <div><span>Distance</span><strong>${f.distance ? escapeHtml(String(f.distance)) + ' nm' : '—'}</strong></div>
        </div>
        ${f.description ? `<p style="color:var(--ink-soft);font-size:13.5px;margin:0 0 14px;">${escapeHtml(f.description)}</p>` : ''}
        <button class="btn btn--gold start-btn" data-id="${doc.id}">Démarrer cette route</button>
      </div>
    `;
    flightsGrid.appendChild(card);
  });

  document.querySelectorAll('.start-btn').forEach(btn => {
    btn.addEventListener('click', () => startRoute(btn.dataset.id, btn));
  });
}

async function startRoute(flightId, btn){
  btn.disabled = true;
  btn.textContent = 'Démarrage…';

  try {
    // Re-vérification côté client de l'absence de route active (double sécurité)
    const freshUser = await db.collection('users').doc(currentUser.uid).get();
    if (freshUser.data().activeFlightId) {
      alert("Tu as déjà une route en cours.");
      await loadDashboard();
      return;
    }

    const flightSnap = await db.collection('flights').doc(flightId).get();
    if (!flightSnap.exists) {
      alert("Cette route n'existe plus.");
      await renderAvailableFlights();
      return;
    }
    const f = flightSnap.data();

    await db.collection('liveFlights').doc(currentUser.uid).set({
      flightId,
      callsign: f.callsign,
      depart: f.depart,
      arrivee: f.arrivee,
      avion: f.avion,
      passagers: f.passagers,
      departLat: f.departLat ?? null,
      departLng: f.departLng ?? null,
      arriveeLat: f.arriveeLat ?? null,
      arriveeLng: f.arriveeLng ?? null,
      pilotUid: currentUser.uid,
      pilotNom: (currentUserData.prenom || '') + ' ' + (currentUserData.nom || ''),
      startedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    await db.collection('users').doc(currentUser.uid).update({ activeFlightId: flightId });
    currentUserData.activeFlightId = flightId;

    await renderActiveRoute();
  } catch (err) {
    console.error(err);
    alert("Impossible de démarrer la route. Réessaie.");
    btn.disabled = false;
    btn.textContent = 'Démarrer cette route';
  }
}

/* ============ utilitaires ============ */
function escapeHtml(str){
  return String(str)
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}
function formatDate(ts){
  if (!ts || !ts.toDate) return '—';
  const d = ts.toDate();
  return d.toLocaleDateString('fr-FR') + ' ' + d.toLocaleTimeString('fr-FR', {hour:'2-digit', minute:'2-digit'});
}

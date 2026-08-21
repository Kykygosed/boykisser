// ==========================================================
// Boykisser Airlines — Initialisation Firebase (partagée)
// ==========================================================
const firebaseConfig = {
  apiKey: "AIzaSyBPq6Wfxzq02MfK69BFxHm9_FUjDGTmAcw",
  authDomain: "kykychat-24c7f.firebaseapp.com",
  databaseURL: "https://kykychat-24c7f-default-rtdb.firebaseio.com",
  projectId: "kykychat-24c7f",
  storageBucket: "kykychat-24c7f.firebasestorage.app",
  messagingSenderId: "342562811927",
  appId: "1:342562811927:web:0fed1e1f511c4fddcfec52"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Collections Firestore utilisées dans tout le site :
//  - users/{uid}            -> { nom, prenom, dateNaissance, email, role, activeFlightId, createdAt }
//  - flights/{flightId}     -> { callsign, depart, arrivee, avion, passagers, distance, description, actif, createdAt }
//  - liveFlights/{uid}      -> { flightId, callsign, depart, arrivee, avion, passagers, pilotNom, lat, lng, startedAt }
//  - flightLog/{autoId}     -> { uid, pilotNom, flightId, callsign, depart, arrivee, startedAt, endedAt }

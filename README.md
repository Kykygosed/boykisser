# Boykisser Airlines — Site de la compagnie virtuelle (MSFS)

Site statique HTML/CSS/JS connecté à Firebase (Auth + Firestore).

## Structure

```
index.html        Page d'accueil
register.html      Inscription ("Devenir pilote")
login.html         Connexion
dashboard.html      Espace pilote (démarrer/terminer une route, carte)
admin.html          Panneau d'administration (publier les routes)
css/style.css        Style du site
js/firebase-init.js  Config Firebase partagée
js/register.js, login.js, dashboard.js, admin.js
assets/logo.png       Ton logo
```

Aucune installation nécessaire : ouvre `index.html` dans un navigateur,
ou héberge le dossier tel quel (Firebase Hosting, Netlify, Vercel, GitHub Pages…).

## 1. Activer l'authentification par e-mail/mot de passe

Dans la [console Firebase](https://console.firebase.google.com/) → projet `kykychat-24c7f` :

1. **Authentication** → **Sign-in method** → activer **E-mail/Mot de passe**.

## 2. Créer les collections Firestore

Rien à créer manuellement : les collections `users`, `flights`, `liveFlights` et
`flightLog` sont créées automatiquement dès la première utilisation.

## 3. Règles de sécurité Firestore (important)

Va dans **Firestore Database** → **Règles**, et remplace par :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isSignedIn() {
      return request.auth != null;
    }
    function isOwner(uid) {
      return isSignedIn() && request.auth.uid == uid;
    }
    function isAdmin() {
      return isSignedIn() &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Dossier pilote : chacun lit/écrit le sien, l'admin peut tout lire
    match /users/{uid} {
      allow read: if isOwner(uid) || isAdmin();
      allow create: if isOwner(uid);
      allow update: if isOwner(uid) || isAdmin();
      allow delete: if false;
    }

    // Routes publiées par la compagnie : lecture publique, écriture admin uniquement
    match /flights/{flightId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Route en cours par pilote : le pilote gère la sienne, l'admin peut tout voir
    match /liveFlights/{uid} {
      allow read: if isOwner(uid) || isAdmin();
      allow write: if isOwner(uid) || isAdmin();
    }

    // Historique des vols terminés
    match /flightLog/{logId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn() && request.resource.data.uid == request.auth.uid;
      allow update, delete: if isAdmin();
    }
  }
}
```

## 4. Créer un compte administrateur

1. Va sur `register.html` et crée un compte normal (par ex. avec ton propre e-mail).
2. Dans la console Firebase → **Firestore Database** → collection `users` →
   ouvre le document correspondant à ton compte (cherche par e-mail).
3. Change le champ `role` de `"pilot"` à `"admin"`.
4. Reconnecte-toi puis ouvre `admin.html` : tu peux maintenant publier des routes.

`admin.html` n'est pas listé dans le menu du site — partage le lien uniquement
avec les membres de la compagnie qui doivent gérer les routes.

## 5. Publier une route

Sur `admin.html`, remplie le formulaire : callsign, aéroports (codes ICAO),
appareil, nombre de passagers, distance (optionnel), description (optionnel),
et éventuellement les coordonnées GPS des aéroports pour affichage sur la carte.
La route apparaît immédiatement dans le tableau de bord de tous les pilotes.

## 6. Suivi de position en temps réel (à venir)

Le tableau de bord pilote affiche déjà une carte (Leaflet/OpenStreetMap) avec
les aéroports de départ/arrivée si tu renseignes leurs coordonnées dans
`admin.html`. Pour brancher la position réelle de l'avion (ex. via une app
companion connectée à SimConnect), il suffira de mettre à jour en direct les
champs `lat`/`lng` du document `liveFlights/{uid}` dans Firestore — le site
ira automatiquement les lire pour repositionner l'icône avion sur la carte
(logique à ajouter dans `js/dashboard.js`, fonction `initMap`).

## Notes

- Une seule route active par pilote à la fois (vérifié côté client + à sécuriser
  davantage côté règles Firestore si besoin de garanties strictes).
- "Terminer la route" archive le vol dans `flightLog` et libère le pilote pour
  une nouvelle route.
- Le design ("carte d'embarquement") est entièrement dans `css/style.css`,
  libre à toi de l'ajuster (couleurs `--maroon-700`, `--gold`, etc.).

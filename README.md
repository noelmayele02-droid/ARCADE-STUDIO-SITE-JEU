# 🕹️ Arcade Studio

Site web avec page d'accueil (présentation de l'équipe), création de compte /
connexion (Firebase Authentication), et 6 mini-jeux jouables directement dans
le navigateur.

## 📁 Structure du projet

```
gamesite/
├── index.html          → page d'accueil (à propos + équipe)
├── login.html           → connexion
├── signup.html          → création de compte
├── games.html            → sélection des jeux
├── css/
│   └── style.css        → toute la charte graphique
├── js/
│   ├── firebase-config.js  → À REMPLIR avec tes clés Firebase
│   └── auth.js             → logique de connexion/déconnexion partagée
├── images/
│   └── team/             → dépose ici les photos de l'équipe
└── games/
    ├── flappy_rainbow_cat.html
    ├── cosmo_cat_invaders.html
    ├── croa_boules_arcenciel.html
    ├── duel_arcenciel.html
    ├── chasse_au_tresor.html
    ├── cours_toujours.html
    ├── saute_nuages.html
    ├── snake_arcenciel.html
    ├── 2048_arcenciel.html
    ├── simon_arcenciel.html
    └── tape_chat.html
```

## 1. Configurer Firebase (comptes utilisateurs)

1. Va sur [console.firebase.google.com](https://console.firebase.google.com)
   et crée un nouveau projet (gratuit).
2. Dans le menu de gauche : **Authentication** → onglet **Sign-in method**
   → active **E-mail/Mot de passe**.
3. Toujours dans la console : **Paramètres du projet** (icône ⚙️) →
   **Général** → tout en bas, clique **Ajouter une application** → **Web**.
4. Donne un nom à l'app, puis Firebase t'affiche un objet de configuration
   qui ressemble à ça :
   ```js
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "mon-projet.firebaseapp.com",
     projectId: "mon-projet",
     storageBucket: "mon-projet.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef"
   };
   ```
5. Ouvre `js/firebase-config.js` dans ce projet et remplace les valeurs
   `"REMPLACE_MOI"` par les tiennes.
6. Dans la console Firebase, va dans **Authentication → Settings →
   Authorized domains** et ajoute le domaine où tu vas héberger le site
   (ex : `tonpseudo.github.io`), sinon les connexions seront refusées.

C'est tout — pas besoin de base de données en plus, Firebase Authentication
gère déjà les comptes, mots de passe (hashés côté serveur) et la
réinitialisation de mot de passe par e-mail.

## 2. Ajouter les photos de l'équipe

1. Dépose tes photos dans `images/team/` (ex : `images/team/alex.jpg`).
2. Dans `index.html`, repère chaque bloc `.avatar` et remplace le texte
   (ex : `M1`) par une balise image :
   ```html
   <div class="avatar">
     <img src="images/team/alex.jpg" alt="Alex">
   </div>
   ```
3. Mets à jour les noms, rôles et bios juste en dessous.

## 3. Tester en local

Comme le site utilise plusieurs fichiers (CSS/JS séparés), ouvre-le via un
petit serveur local plutôt qu'en double-cliquant sur le fichier :

```bash
cd gamesite
python3 -m http.server 8080
```

Puis va sur `http://localhost:8080` dans ton navigateur.

## 4. Déployer sur GitHub Pages

1. Crée un nouveau dépôt sur GitHub (ex : `arcade-studio`).
2. Pousse le contenu de ce dossier `gamesite/` à la racine du dépôt :
   ```bash
   git init
   git add .
   git commit -m "Premier envoi du site Arcade Studio"
   git branch -M main
   git remote add origin https://github.com/TON_PSEUDO/arcade-studio.git
   git push -u origin main
   ```
3. Sur GitHub, va dans **Settings → Pages**.
4. Dans **Source**, choisis la branche `main` et le dossier `/ (root)`.
5. Après une minute ou deux, ton site sera en ligne à l'adresse
   `https://TON_PSEUDO.github.io/arcade-studio/`.
6. N'oublie pas d'ajouter cette adresse dans les **Authorized domains**
   de Firebase (étape 1.6) sinon la connexion ne marchera pas une fois
   en ligne.

## Notes

- Les jeux fonctionnent de manière totalement autonome (pas besoin de
  connexion pour y jouer) — les comptes servent pour l'instant à
  personnaliser l'accueil et pourront servir plus tard à sauvegarder des
  scores si tu veux ajouter ça.
- Pour sauvegarder des scores par utilisateur, l'étape suivante serait
  d'activer **Firestore** (base de données) dans la console Firebase —
  fais-moi signe si tu veux que je l'ajoute.

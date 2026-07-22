// =========================================================
// AUTH.JS — logique partagée sur toutes les pages
// Nécessite firebase-app-compat.js + firebase-auth-compat.js
// + firebase-config.js chargés AVANT ce fichier.
// =========================================================

const auth = firebase.auth();

// Éléments optionnels présents sur certaines pages (nav)
function renderNavAuthState(user){
  const slot = document.getElementById('navAuthSlot');
  if(!slot) return;

  if(user){
    const name = user.displayName || user.email.split('@')[0];
    slot.innerHTML = `
      <div class="userBadge">
        <span class="dotOn"></span>
        <span>${escapeHtml(name)}</span>
      </div>
      <button class="btn btn-ghost" id="logoutBtn" style="padding:8px 16px;font-size:13px;">Déconnexion</button>
    `;
    const btn = document.getElementById('logoutBtn');
    if(btn){
      btn.addEventListener('click', ()=>{
        auth.signOut().then(()=>{ window.location.href = 'index.html'; });
      });
    }
  } else {
    slot.innerHTML = `
      <a class="link" href="login.html">Connexion</a>
      <a class="btn btn-primary" style="padding:9px 18px;font-size:13.5px;" href="signup.html">Créer un compte</a>
    `;
  }
}

function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Observe l'état de connexion sur toutes les pages qui chargent ce script
auth.onAuthStateChanged((user)=>{
  renderNavAuthState(user);
  document.dispatchEvent(new CustomEvent('authStateReady', { detail:{ user } }));
});

// Petit utilitaire pour protéger une page (ex: games.html si tu veux
// forcer la connexion). Décommente l'appel dans la page concernée.
function requireLogin(redirectTo){
  auth.onAuthStateChanged((user)=>{
    if(!user){
      window.location.href = redirectTo || 'login.html';
    }
  });
}

// Toggle menu mobile (utilisé par toutes les pages)
document.addEventListener('DOMContentLoaded', ()=>{
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if(toggle && menu){
    toggle.addEventListener('click', ()=> menu.classList.toggle('open'));
  }
});

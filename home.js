// 📍 Highlight active nav
const path = window.location.pathname;
const navMap = {
  "main.html": "nav-home",
  "search.html": "nav-search",
  "chat.html": "nav-chat",
  "profile.html": "nav-profile",
  "history.html": "nav-history",
};
Object.entries(navMap).forEach(([page, id]) => {
  if (path.includes(page)) {
    document.getElementById(id)?.classList.add("active");
  }
});

function toggleMoreCards() {
  const extraCards = document.querySelectorAll('.card.extra');
  extraCards.forEach(card => card.classList.toggle('hidden'));
}
  // Dark mode toggle
  document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

  

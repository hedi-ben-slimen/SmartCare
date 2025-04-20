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

    // Calendar generation
    function generateCalendar() {
      const calendar = document.getElementById('calendar');
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const today = date.getDate();

      const monthName = date.toLocaleString('default', { month: 'long' });
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      let html = `<div class='calendar-header'>${monthName} ${year}</div><div class='calendar-grid'>`;
      for (let i = 0; i < firstDay; i++) {
        html += `<div class='calendar-day empty'></div>`;
      }
      for (let day = 1; day <= daysInMonth; day++) {
        const activeClass = day === today ? 'today' : '';
        html += `<div class='calendar-day ${activeClass}'>${day}</div>`;
      }
      html += '</div>';
      calendar.innerHTML = html;
    }

    generateCalendar();



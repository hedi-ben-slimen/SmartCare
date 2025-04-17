document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-form');

    if (form && window.location.pathname.includes("register.html")) {
        form.addEventListener('submit', function (e) {
            const email = form.querySelector('[name="email"]').value.trim();
            const password = form.querySelector('#password').value.trim();
            const confirmPassword = form.querySelector('#confirm-password').value.trim();

            if (password !== confirmPassword) {
                e.preventDefault();
                alert("❗ Passwords do not match!");
                return;
            }

            // ✅ Let the form submit normally if everything is OK
        });
    }
});
document.getElementById("nav-search").addEventListener("click", (e) => {
    e.preventDefault();
    const input = document.querySelector(".search-bar");
    if (input) {
      input.focus();
      input.classList.add("search-focused");
  
      // Optional animation
      input.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
  
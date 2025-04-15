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

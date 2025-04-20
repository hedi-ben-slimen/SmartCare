
document.addEventListener('DOMContentLoaded', function() {
  // Form data object
  const formData = {
    name: "Flen Ben Falten",
    specialization: "Generalist",
    email: "flenbenflen@gmail.com",
    password: "*************"
  };

  const loginForm = document.getElementById('loginForm');
  const nameInput = document.getElementById('name');
  const specializationInput = document.getElementById('specialization');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.getElementById('togglePassword');
  const passwordToggleIcon = document.getElementById('passwordToggleIcon');
  const googleLoginBtn = document.getElementById('googleLogin');
  
  // Initialize input fields with formData values
  nameInput.value = formData.name;
  specializationInput.value = formData.specialization;
  emailInput.value = formData.email;
  
  // Add class to inputs with values
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    if (input.value) {
      input.parentNode.classList.add('active');
    }
    
   
    input.addEventListener('focus', function() {
      this.parentNode.classList.add('active');
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentNode.classList.remove('active');
      }
    });
    
    // Update formData on input change
    input.addEventListener('input', function() {
      formData[this.name] = this.value;
    });
  });
  
  // Handle password visibility toggle
  let passwordVisible = false;
  

  const createEyeIcon = (visible) => {
    return visible 
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>` 
      : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
  };
  

  passwordToggleIcon.outerHTML = createEyeIcon(passwordVisible);
  
  togglePasswordBtn.addEventListener('click', function() {
    passwordVisible = !passwordVisible;
    passwordInput.type = passwordVisible ? 'text' : 'password';
    this.innerHTML = createEyeIcon(passwordVisible);
    this.setAttribute('aria-label', passwordVisible ? 'Hide password' : 'Show password');
  });
  
  // Handle form submission
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Login form submitted:', formData);
    // Here you would typically send the data to a server
    alert('Form submitted! Check console for details.');
  });
  
  // Handle Google login
  googleLoginBtn.addEventListener('click', function() {
    console.log('Google login clicked');
    // Implement Google login 
    alert('Google login clicked! This would typically redirect to Google authentication.');
  });
});

document.addEventListener('DOMContentLoaded', () => {
    const profileName = document.getElementById('profile-name');
    const profileImg = document.getElementById('profile-img');
    const upload = document.getElementById('upload');
    const form = document.getElementById('profile-form');
  
    const storedName = localStorage.getItem('smartcare-user-name');
    if (storedName) profileName.textContent = storedName;
  
    // Load profile image if saved
    const savedPhoto = localStorage.getItem('smartcare-user-photo');
    if (savedPhoto) profileImg.src = savedPhoto;
  
    // Upload logic
    upload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          profileImg.src = reader.result;
          localStorage.setItem('smartcare-user-photo', reader.result);
        };
        reader.readAsDataURL(file);
      }
    });
  
    // Save profile info to DB
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const gender = document.getElementById('gender').value;
      const blood = document.getElementById('blood').value;
      const age = document.getElementById('age').value;
      const weight = document.getElementById('weight').value;
  
      try {
        const res = await fetch('/api/profile/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: storedName,
            gender,
            blood,
            age,
            weight
          })
        });
  
        const data = await res.json();
        alert('✅ Info saved successfully!');
        console.log('Updated:', data);
      } catch (err) {
        console.error('❌ Failed to update profile', err);
      }
    });
  });
  
  
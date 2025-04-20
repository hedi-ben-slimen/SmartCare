document.addEventListener('DOMContentLoaded', () => {
  const chatBox = document.getElementById('chat-box');
  const input = document.getElementById('userInput');

  // Initial prompt
  appendMessage('bot', "💬 What symptoms are you experiencing?");

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  });

  window.sendMessage = function () {
    const userText = input.value.trim();
    if (!userText) return;

    appendMessage('user', userText);
    input.value = '';

    const reply = getDoctorSuggestion(userText);
    setTimeout(() => {
      appendMessage('bot', reply);
    }, 500);
  };

  function appendMessage(sender, text) {
    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function getDoctorSuggestion(input) {
    const text = input.toLowerCase();

    // Greetings or help
    if (text.includes('hello') || text.includes('hi')) {
      return "👋 Hi! I'm here to help you find the right doctor. What symptoms are you experiencing?";
    }
    if (text.includes('help') || text.includes('assist') || text.includes('support')) {
      return "🆘 No problem! Just describe your symptoms and I'll guide you to the right specialist.";
    }

    // Symptoms
    if (text.includes('chest') || text.includes('fatigue') || text.includes('heart')) {
      return "🫀 You may need to consult a **cardiologist**.";
    }
    if (text.includes('skin') || text.includes('rash') || text.includes('acne')) {
      return "🧴 You may need to see a **dermatologist**.";
    }
    if (text.includes('eyes') || text.includes('vision') || text.includes('blurry')) {
      return "👁️ You may want to visit an **ophthalmologist**.";
    }
    if (text.includes('ear') || text.includes('throat') || text.includes('nose') || text.includes('sinus')) {
      return "👂 An **ENT specialist (Otolaryngologist)** is recommended.";
    }
    if (text.includes('tooth') || text.includes('teeth') || text.includes('gum')) {
      return "🦷 You should see a **dentist**.";
    }
    if (text.includes('child') || text.includes('baby') || text.includes('kid')) {
      return "👶 You should consult a **pediatrician**.";
    }
    if (text.includes('stress') || text.includes('mental') || text.includes('depression')) {
      return "🧠 Consider speaking with a **psychiatrist**.";
    }
    if (text.includes('stomach') || text.includes('digestion') || text.includes('abdominal')) {
      return "🍽️ You might need a **gastroenterologist**.";
    }
    if (text.includes('female') || text.includes('pregnancy') || text.includes('women')) {
      return "🤰 A **gynecologist** can help with women’s health.";
    }
    if (text.includes('pain') || text.includes('bones') || text.includes('joint') || text.includes('fracture')) {
      return "🦴 An **orthopedist** might be the right choice.";
    }
    if (text.includes('lungs') || text.includes('breath') || text.includes('asthma')) {
      return "🌬️ You may want to see a **pulmonologist** for respiratory issues.";
    }
    if (text.includes('urine') || text.includes('kidney') || text.includes('prostate')) {
      return "🚻 A **urologist** is the right specialist for urinary concerns.";
    }
    if (text.includes('hormone') || text.includes('thyroid') || text.includes('diabetes')) {
      return "🧬 An **endocrinologist** can help with hormone-related issues.";
    }
    if (text.includes('infection') || text.includes('fever') || text.includes('virus') || text.includes('bacteria')) {
      return "🧪 An **infectious disease specialist** would be appropriate.";
    }
    if (text.includes('immune') || text.includes('allergy') || text.includes('reaction')) {
      return "🌿 An **allergist/immunologist** is recommended for these symptoms.";
    }
    if (text.includes('cancer') || text.includes('tumor') || text.includes('oncology')) {
      return "🎗️ An **oncologist** is the right doctor for cancer-related concerns.";
    }
    if (text.includes('muscle') || text.includes('inflammation') || text.includes('arthritis')) {
      return "🧩 A **rheumatologist** can help with these autoimmune/muscle/joint issues.";
    }
    if (text.includes('brain') || text.includes('nervous') || text.includes('neuro')) {
      return "🧠 A **neurologist** is the specialist for brain and nerve-related issues.";
    }
    if (text.includes('surgery') || text.includes('operation')) {
      return "🔪 A **surgeon** would be needed for operations or surgical advice.";
    }

    return "❓ I'm not sure which doctor you need. Could you describe your symptoms more clearly?";
  }
});

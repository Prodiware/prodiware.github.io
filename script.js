// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// Welcome Message
document.addEventListener('DOMContentLoaded', () => {
  const welcomeMessage = document.createElement('div');
  welcomeMessage.id = 'welcome-message';
  welcomeMessage.style.position = 'fixed';
  welcomeMessage.style.bottom = '20px';
  welcomeMessage.style.right = '20px';
  welcomeMessage.style.background = '#333';
  welcomeMessage.style.color = '#fff';
  welcomeMessage.style.padding = '10px 20px';
  welcomeMessage.style.borderRadius = '5px';
  welcomeMessage.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
  welcomeMessage.textContent = 'Welcome to Prodiware!';
  document.body.appendChild(welcomeMessage);

  // Hide the message after 5 seconds
  setTimeout(() => {
    welcomeMessage.style.display = 'none';
  }, 5000);
});

// Theme Toggle (Light/Dark Mode)
const footer = document.querySelector('footer');
const themeToggleButton = document.createElement('button');
themeToggleButton.textContent = 'Toggle Theme';
themeToggleButton.style.marginTop = '10px';
footer.appendChild(themeToggleButton);

themeToggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});

// CSS for Dark Theme
const darkThemeStyle = document.createElement('style');
darkThemeStyle.textContent = `
  .dark-theme {
    background: #121212;
    color: #e0e0e0;
  }
  .dark-theme header {
    background: #1f1f1f;
  }
  .dark-theme footer {
    background: #1f1f1f;
  }
  .dark-theme nav ul li a {
    color: #e0e0e0;
  }
`;
document.head.appendChild(darkThemeStyle);

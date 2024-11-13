// Get the container element
let container = document.getElementById('container');

// Predefined login values for testing
const predefinedCredentials = [
  { username: "Viekhyat", password: "password1", redirectUrl: "/home_user/home.html" },
  { username: "Arpita", password: "password2", redirectUrl: "/home_user/home.html" }
];

// Function to toggle between sign up and sign in
const toggle = () => {
  container.classList.toggle('sign-in');
  container.classList.toggle('sign-up');
};

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("login-button").addEventListener("click", signIn);
});

// Add sign-in class to the container after 200ms
setTimeout(() => {
  container.classList.add('sign-in');
}, 200);

// Function to handle sign up
function signUp() {
  const username = document.getElementById('signup-username').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  fetch('http://127.0.0.1:8083/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  })
  .then(response => response.json())
  .then(data => handleSignupResponse(data))
  .catch(error => {
    console.error('Signup error:', error);
    alert("An error occurred during signup. Please try again.");
  });
}

// Function to handle sign in
async function signIn() {
  const username = document.getElementById("signin-username").value;
  const password = document.getElementById("signin-password").value;

  // Check against predefined credentials first
  const predefinedUser = predefinedCredentials.find(
    user => user.username === username && user.password === password
  );

  if (predefinedUser) {
    // Successful login with predefined credentials
    window.location.href = predefinedUser.redirectUrl; // Redirect to predefined URL
    return; // Stop here to prevent additional alert
  }

  // If not matched, proceed with API call
  try {
    const response = await fetch("http://127.0.0.1:8083/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    if (result.success) {
      window.location.href = result.redirectUrl;
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred during login. Please try again.");
  }
}

const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", authenticateWithTwitter);

function authenticateWithTwitter() {
  fetch("/auth/twitter")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        window.location.href = data.redirectUrl;
      } else {
        alert("Error authenticating with Twitter. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error during authentication:", error);
      alert("Error authenticating with Twitter. Please try again.");
    });
}
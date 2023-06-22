async function verifyUserActions(user) {
  const userActions = document.getElementById("user-actions");
  const accessStatus = document.getElementById("access-status");

  try {
    const response = await fetch("/userActions/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });

    if (response.ok) {
      const result = await response.json();

      if (result.verified) {
        userActions.textContent = "User actions verified!";
        accessStatus.textContent = "Access granted!";
      } else {
        userActions.textContent = "User actions not verified.";
        accessStatus.textContent = "Access denied.";
      }
    } else {
      userActions.textContent = "Error verifying user actions.";
      accessStatus.textContent = "Access denied.";
    }
  } catch (error) {
    console.error("Error:", error);
    userActions.textContent = "Error verifying user actions.";
    accessStatus.textContent = "Access denied.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("login-button");

  loginButton.addEventListener("click", async () => {
    const user = await authenticateWithTwitter();
    if (user) {
      verifyUserActions(user);
    }
  });
});
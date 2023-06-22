document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("login-button");
  const userActions = document.getElementById("user-actions");
  const nftDropInfo = document.getElementById("nft-drop-info");
  const accessStatus = document.getElementById("access-status");

  loginButton.addEventListener("click", async () => {
    try {
      const response = await authenticateWithTwitter();
      if (response.success) {
        const userActionVerification = await verifyUserActions(response.userId);
        if (userActionVerification.success) {
          const nftDropAccess = await checkNftDropAccess(response.userId);
          if (nftDropAccess.success) {
            accessStatus.textContent = "Access granted!";
            const nftDistribution = await distributeNft(response.userId);
            if (nftDistribution.success) {
              accessStatus.textContent = "NFT successfully distributed!";
            } else {
              accessStatus.textContent = "Error distributing NFT.";
            }
          } else {
            accessStatus.textContent = "Access denied.";
          }
        } else {
          accessStatus.textContent = "User actions not completed.";
        }
      } else {
        accessStatus.textContent = "Authentication failed.";
      }
    } catch (error) {
      console.error("Error:", error);
      accessStatus.textContent = "An error occurred.";
    }
  });
});
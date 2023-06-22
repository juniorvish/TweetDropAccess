async function checkNftDropAccess() {
  const response = await fetch('/nftDrop/checkAccess', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const data = await response.json();
    if (data.accessGranted) {
      document.getElementById('access-status').innerText = 'Access granted!';
    } else {
      document.getElementById('access-status').innerText = 'Access denied. Complete the required actions.';
    }
  } else {
    console.error('Error checking NFT drop access:', response.statusText);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  checkNftDropAccess();
});
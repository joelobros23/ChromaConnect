/* Content for assets/js/auth.js */

function logout() {
  fetch('api/logout.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Redirect to index.html upon successful logout
      window.location.href = 'index.html';
    } else {
      alert('Logout failed: ' + data.message);
    }
  })
  .catch(error => {
    console.error('Error during logout:', error);
    alert('An error occurred during logout.');
  });
}
// assets/js/profile.js

document.addEventListener('DOMContentLoaded', () => {
    const profileUserId = new URLSearchParams(window.location.search).get('id');
    const addFriendButton = document.getElementById('addFriendButton');
    const acceptFriendButton = document.getElementById('acceptFriendButton');
    const rejectFriendButton = document.getElementById('rejectFriendButton');

    if (addFriendButton) {
        addFriendButton.addEventListener('click', () => {
            sendFriendRequest(profileUserId);
        });
    }

    if (acceptFriendButton) {
        acceptFriendButton.addEventListener('click', () => {
            acceptFriendRequest(profileUserId);
        });
    }

    if (rejectFriendButton) {
        rejectFriendButton.addEventListener('click', () => {
            rejectFriendRequest(profileUserId);
        });
    }

    async function sendFriendRequest(profileUserId) {
        try {
            const response = await fetch('api/add_friend.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ friend_id: profileUserId })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                // Optionally, update the UI to reflect the sent request
                addFriendButton.style.display = 'none'; // Hide add button
            } else {
                alert(data.error || 'Failed to send friend request.');
            }
        } catch (error) {
            console.error('Error sending friend request:', error);
            alert('Error sending friend request.');
        }
    }

    async function acceptFriendRequest(profileUserId) {
        try {
            const response = await fetch('api/accept_friend.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ friend_id: profileUserId })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                // Optionally, update the UI to reflect the accepted request
                acceptFriendButton.style.display = 'none';
                rejectFriendButton.style.display = 'none';
            } else {
                alert(data.error || 'Failed to accept friend request.');
            }
        } catch (error) {
            console.error('Error accepting friend request:', error);
            alert('Error accepting friend request.');
        }
    }

    async function rejectFriendRequest(profileUserId) {
        try {
            const response = await fetch('api/reject_friend.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ friend_id: profileUserId })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                // Optionally, update the UI to reflect the rejected request
                acceptFriendButton.style.display = 'none';
                rejectFriendButton.style.display = 'none';
            } else {
                alert(data.error || 'Failed to reject friend request.');
            }
        } catch (error) {
            console.error('Error rejecting friend request:', error);
            alert('Error rejecting friend request.');
        }
    }
});
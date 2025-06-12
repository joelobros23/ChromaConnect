# Project Plan: ChromaConnect

**Description:** A social networking platform focused on visual art enthusiasts, allowing users to share, critique, and connect based on their artistic tastes and creations.


## Development Goals

- [ ] Design and implement the database schema (database.sql) for users, posts, comments, likes, and friendships.
- [ ] Set up the database connection (api/config.php).
- [ ] Implement user registration (register.html, api/register.php, assets/js/auth.js) including validation and password hashing.
- [ ] Implement user login (index.html, api/login.php, assets/js/auth.js) with session management.
- [ ] Implement user logout (api/logout.php, assets/js/auth.js).
- [ ] Create the main feed page (home.html) to display posts.
- [ ] Implement post creation functionality (api/create_post.php, assets/js/main.js) with image uploading.
- [ ] Implement post retrieval (api/get_posts.php, assets/js/main.js) to display posts on the home page.
- [ ] Design and implement user profiles (profile.html, api/get_user_profile.php, assets/js/profile.js) showing user information and posts.
- [ ] Implement profile editing functionality (edit_profile.html, api/update_profile.php, assets/js/profile.js) to update profile information including profile picture and bio.
- [ ] Implement a friend request system (api/add_friend.php, api/accept_friend.php, api/reject_friend.php, assets/js/profile.js).
- [ ] Implement displaying a user's friends list (friends.html, api/get_friends.php).
- [ ] Develop a user search feature (search.html, api/search_users.php, assets/js/search.js) to find other users.
- [ ] Implement the ability to like and unlike posts (api/like_post.php, api/unlike_post.php, assets/js/main.js).
- [ ] Implement a commenting system for posts (api/add_comment.php, api/get_comments.php, assets/js/main.js).
- [ ] Style the website using Tailwind CSS (assets/css/style.css).
- [ ] Ensure all PHP files are secure and prevent SQL injection and XSS attacks.
- [ ] Implement error handling and user feedback throughout the application.

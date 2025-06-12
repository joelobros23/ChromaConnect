document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');

    if (postForm) {
        postForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const image = document.getElementById('image').files[0];
            const caption = document.getElementById('caption').value;

            if (!image) {
                alert('Please select an image.');
                return;
            }

            const formData = new FormData();
            formData.append('image', image);
            formData.append('caption', caption);

            try {
                const response = await fetch('api/create_post.php', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Post created successfully!');
                    postForm.reset();
                    // Optionally, refresh the posts feed
                    loadPosts(); // Assuming you have a function to load posts. if not reload page. location.reload() can be used instead.
                } else {
                    alert(data.message || 'Failed to create post.');
                }
            } catch (error) {
                console.error('Error creating post:', error);
                alert('An error occurred while creating the post.');
            }
        });
    }

    // Function to load posts (example - adjust to your actual implementation)
    function loadPosts() {
        fetch('api/get_posts.php')
            .then(response => response.json())
            .then(data => {
                const postsContainer = document.getElementById('postsContainer'); // Assuming you have a container with this ID
                if(postsContainer){
                    postsContainer.innerHTML = ''; // Clear existing posts

                    data.forEach(post => {
                        const postElement = document.createElement('div');
                        postElement.classList.add('post'); // Add a class for styling

                        // Create elements for post content
                        const imageElement = document.createElement('img');
                        imageElement.src = post.image_path;
                        imageElement.alt = "Post Image";
                        imageElement.style.maxWidth = '100%';

                        const captionElement = document.createElement('p');
                        captionElement.textContent = post.caption;

                        const authorElement = document.createElement('p');
                        authorElement.textContent = `Posted by: ${post.username}`;

                        const dateElement = document.createElement('p');
                        dateElement.textContent = `Created at: ${post.created_at}`;

                        const likeButton = document.createElement('button');
                        likeButton.textContent = post.is_liked ? 'Unlike' : 'Like';
                        likeButton.classList.add('like-button');
                        likeButton.dataset.postId = post.id;
                        likeButton.addEventListener('click', handleLikeClick);

                        // Comment Section
                        const commentSection = document.createElement('div');
                        commentSection.classList.add('comment-section');

                        const commentForm = document.createElement('form');
                        commentForm.classList.add('comment-form');
                        commentForm.dataset.postId = post.id;

                        const commentInput = document.createElement('input');
                        commentInput.type = 'text';
                        commentInput.placeholder = 'Add a comment...';
                        commentInput.classList.add('comment-input');

                        const commentButton = document.createElement('button');
                        commentButton.textContent = 'Post Comment';
                        commentButton.classList.add('comment-button');

                        commentForm.appendChild(commentInput);
                        commentForm.appendChild(commentButton);

                        commentForm.addEventListener('submit', handleCommentSubmit);

                        commentSection.appendChild(commentForm);

                         // Container for displaying comments
                        const commentsContainer = document.createElement('div');
                        commentsContainer.classList.add('comments-container');
                        commentSection.appendChild(commentsContainer);

                        loadComments(post.id, commentsContainer);

                        const hrElement = document.createElement('hr');

                        // Append elements to the post element
                        postElement.appendChild(imageElement);
                        postElement.appendChild(captionElement);
                        postElement.appendChild(authorElement);
                        postElement.appendChild(dateElement);
                        postElement.appendChild(likeButton);
                        postElement.appendChild(commentSection);
                        postElement.appendChild(hrElement);


                        postsContainer.appendChild(postElement);
                    });
                }

            })
            .catch(error => console.error('Error loading posts:', error));
    }

    async function handleLikeClick(event) {
        const postId = event.target.dataset.postId;
        const isLiked = event.target.textContent === 'Unlike';
    
        try {
            let url = isLiked ? 'api/unlike_post.php' : 'api/like_post.php';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ post_id: postId })
            });
    
            const data = await response.json();
    
            if (response.ok) {
                // Optimistically update the button text
                event.target.textContent = isLiked ? 'Like' : 'Unlike';
                // Optionally, refresh the posts feed or just update the like count.
                loadPosts();
            } else {
                alert(data.message || 'Failed to update like status.');
            }
        } catch (error) {
            console.error('Error updating like status:', error);
            alert('An error occurred while updating like status.');
        }
    }

    async function handleCommentSubmit(event) {
        event.preventDefault();
        const postId = event.target.dataset.postId;
        const commentInput = event.target.querySelector('.comment-input');
        const commentText = commentInput.value.trim();

        if (!commentText) {
            alert('Please enter a comment.');
            return;
        }

        try {
            const response = await fetch('api/add_comment.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    post_id: postId,
                    comment_text: commentText
                })
            });

            const data = await response.json();

            if (response.ok) {
                commentInput.value = ''; // Clear the input
                const commentsContainer = event.target.closest('.comment-section').querySelector('.comments-container');
                loadComments(postId, commentsContainer); // Reload comments
            } else {
                alert(data.message || 'Failed to add comment.');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            alert('An error occurred while adding the comment.');
        }
    }

    async function loadComments(postId, commentsContainer) {
        try {
            const response = await fetch(`api/get_comments.php?post_id=${postId}`);
            const data = await response.json();

            if (response.ok) {
                commentsContainer.innerHTML = ''; // Clear existing comments
                data.forEach(comment => {
                    const commentElement = document.createElement('div');
                    commentElement.classList.add('comment');
                    commentElement.innerHTML = `<strong>${comment.username}:</strong> ${comment.comment_text}`;
                    commentsContainer.appendChild(commentElement);
                });
            } else {
                console.error('Failed to load comments:', data.message);
                commentsContainer.textContent = 'Failed to load comments.';
            }
        } catch (error) {
            console.error('Error loading comments:', error);
            commentsContainer.textContent = 'Error loading comments.';
        }
    }

    loadPosts(); // Call load posts on page load
});
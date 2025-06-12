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

                        const hrElement = document.createElement('hr');

                        // Append elements to the post element
                        postElement.appendChild(imageElement);
                        postElement.appendChild(captionElement);
                        postElement.appendChild(authorElement);
                        postElement.appendChild(dateElement);
                        postElement.appendChild(likeButton);
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


    loadPosts(); // Call load posts on page load
});
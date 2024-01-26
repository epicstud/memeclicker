function spawnMeme() {
            const memeImages = [
                'meme1.png',
                'meme2.gif',
                'meme3.png',
                // Add more meme images as needed
            ];

            const cookie = document.getElementById('cookie');
            const cookiePosition = cookie.getBoundingClientRect();

            const meme = document.createElement('img');
            meme.src = memeImages[Math.floor(Math.random() * memeImages.length)];
            meme.classList.add('meme');

            // Set random position around the cookie image
            meme.style.top = cookiePosition.top + Math.random() * 50 + 'px'; // Adjust the range as needed
            meme.style.left = cookiePosition.left + Math.random() * 50 + 'px'; // Adjust the range as needed

            // Append meme to the body
            document.body.appendChild(meme);

            // Make the meme disappear after a delay (e.g., 3 seconds)
            setTimeout(() => {
                meme.remove();
            }, 3000);
        }

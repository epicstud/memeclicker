 function spawnMeme() {
            const memeImages = [
                'meme1.png',
                'meme2.gif', // Make sure the path is correct
                'meme3.png',
                // Add more meme images as needed
            ];

            const meme = document.createElement('img');
            meme.src = memeImages[Math.floor(Math.random() * memeImages.length)];
            meme.classList.add('meme');

            // Set random position around the cookie image
            const cookiePosition = document.getElementById('cookie').getBoundingClientRect();
            meme.style.top = cookiePosition.top + Math.random() * 50 + 'px'; // Adjust the range as needed
            meme.style.left = cookiePosition.left + Math.random() * 50 + 'px'; // Adjust the range as needed

            // Set random directions for floating
            meme.style.setProperty('--randomX', Math.random() > 0.5 ? 1 : -1);
            meme.style.setProperty('--randomY', Math.random() > 0.5 ? 1 : -1);

            // Append meme to the body
            document.body.appendChild(meme);

            // Make the meme disappear after a longer delay (e.g., 5 seconds)
            setTimeout(() => {
                meme.remove();
            }, 5000);
        }

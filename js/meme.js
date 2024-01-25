
    function spawnMeme() {
        const memeImages = [
            'meme1.png',
            'meme2.gif',
            'meme3.png',
            // Add more meme images as needed
        ];

        const meme = document.createElement('img');
        meme.src = memeImages[Math.floor(Math.random() * memeImages.length)];
        meme.classList.add('meme');

        // Set random position on the left side of the screen with a bit of downward offset
        meme.style.top = Math.random() * window.innerHeight + 20 + 'px'; // Adjust the offset as needed
        meme.style.left = Math.random() * 50 + 'px';

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

    // Adjust the initial position of the cookie image to the left side of the screen
    document.getElementById('cookie').style.left = '1px'; // Adjust the offset as needed

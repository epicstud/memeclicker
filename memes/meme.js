function spawnMeme() {
            const memeImages = [
                'memes/meme1.png',
                'memes/meme2.gif',
                'memes/meme3.png',
                'memes/meme4.png',
                'memes/meme5.gif',
                'memes/meme6.gif',
                
                // Add more meme images as needed
            ];

            const cookie = document.getElementById('cookie');
            const cookiePosition = cookie.getBoundingClientRect();

            const meme = document.createElement('img');
            meme.src = memeImages[Math.floor(Math.random() * memeImages.length)];
            meme.classList.add('meme');

            // Use the spacing variable to control the distance between memes
            const spacing = 200; // Adjust the spacing as needed
            meme.style.top = cookiePosition.top + Math.random() * spacing + 'px';
            meme.style.left = cookiePosition.left + Math.random() * spacing + 'px';

            // Append meme to the body
            document.body.appendChild(meme);

            // Make the meme disappear after a delay (e.g., 3 seconds)
            setTimeout(() => {
                meme.remove();
            }, 3000);
        }

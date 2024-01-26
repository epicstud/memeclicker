        function spawnMeme() {
            const memeData = [
                        { src: 'memes/meme1.png', chance: 100 }, // 50% chance
                        { src: 'memes/meme2.gif', chance: 2 }, // 25% chance
                        { src: 'memes/meme3.png', chance: 100 }, // 10% chance
                        { src: 'memes/meme4.png', chance: 3 },
                        { src: 'memes/meme5.gif', chance: 70 },
                        { src: 'memes/meme6.gif', chance: 40 },
                // Add more meme data with chances as needed
            ];

            const cookie = document.getElementById('cookie');
            const cookiePosition = cookie.getBoundingClientRect();

            const selectedMeme = getRandomMeme(memeData);
            
            // Check if the meme should be displayed based on the chance
            if (Math.random() * 200 <= selectedMeme.chance) {
                const meme = document.createElement('img');
                meme.src = selectedMeme.src;
                meme.classList.add('meme');

                // Use the spacing variable to control the distance between memes
                const spacing = 100; // Adjust the spacing as needed
                meme.style.top = cookiePosition.top + Math.random() * spacing + 'px';
                meme.style.left = cookiePosition.left + Math.random() * spacing + 'px';

                // Append meme to the body
                document.body.appendChild(meme);

                // Make the meme disappear after a delay (e.g., 3 seconds)
                setTimeout(() => {
                    meme.remove();
                }, 3000);
            }
        }

        function getRandomMeme(memeData) {
            // Randomly select a meme from the memeData array
            return memeData[Math.floor(Math.random() * memeData.length)];
        }

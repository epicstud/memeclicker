function spawnMeme() {
            const memeData = [
                { src: 'memes/meme1.png', rarity: 'Common' },
                { src: 'memes/meme2.png', rarity: 'Uncommon' },
                { src: 'memes/meme3.png', rarity: 'Rare' },
                { src: 'memes/meme4.png', rarity: 'Rare' },
                 { src: 'memes/meme5.png', rarity: 'Rare' },
            
                // Add more meme data with rarities as needed
            ];

            const cookie = document.getElementById('cookie');
            const cookiePosition = cookie.getBoundingClientRect();

            const selectedMeme = getRandomMeme(memeData);
            const meme = document.createElement('img');
            meme.src = selectedMeme.src;
            meme.classList.add('meme');

            // Use the spacing variable to control the distance between memes
            const spacing = 100; // Adjust the spacing as needed
            meme.style.top = cookiePosition.top + Math.random() * spacing + 'px';
            meme.style.left = cookiePosition.left + Math.random() * spacing + 'px';

            // Append meme to the body
            document.body.appendChild(meme);

            // Display rarity information (you can customize how you want to display this information)
            console.log(`Spawned meme with rarity: ${selectedMeme.rarity}`);

            // Make the meme disappear after a delay (e.g., 3 seconds)
            setTimeout(() => {
                meme.remove();
            }, 3000);
        }

        function getRandomMeme(memeData) {
            // Randomly select a meme from the memeData array
            return memeData[Math.floor(Math.random() * memeData.length)];
        }

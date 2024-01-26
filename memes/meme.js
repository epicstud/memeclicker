<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Random Memes Cookie</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
        #cookie {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            cursor: pointer;
        }
        .meme {
            position: absolute;
            width: 50px; /* Adjust the size as needed */
            height: 50px;
            animation: floatAndFade 3s linear;
            pointer-events: none;
        }

        @keyframes floatAndFade {
            0% {
                transform: translate(0, 0);
                opacity: 1;
            }
            50% {
                transform: translate(25px, -25px);
                opacity: 0.8;
            }
            100% {
                transform: translate(50px, -50px);
                opacity: 0;
            }
        }
    </style>
</head>
<body>
    <div id="cookie" onclick="spawnMeme()">
        <img src="cookie.png" alt="Cookie" width="100" height="100">
    </div>

    <script>
        function spawnMeme() {
            const memeData = [
                        { src: 'memes/meme1.png', chance: 70 }, // 50% chance
                        { src: 'memes/meme2.gif', chance: 2 }, // 25% chance
                        { src: 'memes/meme3.png', chance: 70 }, // 10% chance
                        { src: 'memes/meme4.png', chance: 3 },
                        { src: 'memes/meme5.gif', chance: 70 },
                        { src: 'memes/meme6.gif', chance: 50 },
                // Add more meme data with chances as needed
            ];

            const cookie = document.getElementById('cookie');
            const cookiePosition = cookie.getBoundingClientRect();

            const selectedMeme = getRandomMeme(memeData);
            
            // Check if the meme should be displayed based on the chance
            if (Math.random() * 100 <= selectedMeme.chance) {
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
    </script>
</body>
</html>

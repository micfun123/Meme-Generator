document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('image');
    const topTextInput = document.getElementById('text_top');
    const bottomTextInput = document.getElementById('text_bottem');
    const form = document.querySelector('form');
    const randomButton = document.querySelector('button[type="menu"]');
    const memeContainer = document.getElementById('meme_container');

    // Create canvas for meme
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;
    memeContainer.appendChild(canvas);

    let imageList = []; 

    
    const fetchImageList = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/images');
            if (!response.ok) {
                throw new Error('Failed to fetch images');
            }
            imageList = await response.json();
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    
    const loadImage = (src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            drawText();
        };
    };

    
    const drawText = () => {
        const topText = topTextInput.value.toUpperCase();
        const bottomText = bottomTextInput.value.toUpperCase();

        ctx.font = '30px Impact';
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.textAlign = 'center';

    
        ctx.fillText(topText, canvas.width / 2, 50);
        ctx.strokeText(topText, canvas.width / 2, 50);

    
        ctx.fillText(bottomText, canvas.width / 2, canvas.height - 30);
        ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 30);
    };

    
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                loadImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    topTextInput.addEventListener('input', drawText);
    bottomTextInput.addEventListener('input', drawText);

    
    randomButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (imageList.length === 0) {
            alert('No images found. Make sure the templates folder contains images.');
            return;
        }

        const randomImage = imageList[Math.floor(Math.random() * imageList.length)];
        const randomSrc = `http://localhost:3000/templates/${randomImage}`;
        loadImage(randomSrc);
    });


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Meme generated! (Download functionality can be added here.)');
    });

    fetchImageList();
});

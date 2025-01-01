document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('image');
    const topTextInput = document.getElementById('text_top');
    const bottomTextInput = document.getElementById('text_bottem');
    const form = document.querySelector('form');
    const randomButton = document.querySelector('button[type="menu"]');
    const memeContainer = document.getElementById('meme_container');
    const downloadButton = document.getElementById('download');

    // Create canvas for meme
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;
    memeContainer.appendChild(canvas);

    
    let currentImage = null;

    const loadImage = (src) => {
        console.log('Loading image from:', src); 
        const img = new Image();
        img.src = src;
        img.onload = () => {
            currentImage = img;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            drawText(); 
        };
    };

    const drawText = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (currentImage) {
            ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
        }

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
        fetch('/api/images')
            .then(res => res.json())
            .then(images => {
                if (images.length === 0) {
                    alert('No images found. Make sure the templates folder contains images.');
                } else {
                    const randomImage = images[Math.floor(Math.random() * images.length)];
                    loadImage(`/templates/${randomImage}`);
                }
            })
            .catch(error => console.error('Error fetching images:', error));
    });

    downloadButton.addEventListener('click', () => {
        const url = canvas.toDataURL();
        const a = document.createElement('a');
        a.href = url;
        a.download = 'meme.png';
        a.click();
    });

});

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.static(path.join(__dirname)));


const templatesFolder = path.join(__dirname, 'templates');


app.use('/templates', express.static(templatesFolder));


app.get('/api/images', (req, res) => {
    fs.readdir(templatesFolder, (err, files) => {
        if (err) {
            console.error('Error reading templates folder:', err);
            res.status(500).send('Error reading templates folder.');
            return;
        }

        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        res.json(imageFiles);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Folder pentru salvare
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configurare multer
const storage = multer.diskStorage({
    destination: function (_, __, cb) {
        cb(null, uploadDir);
    },
    filename: function (_, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

app.post('/upload_audio', upload.single('file'), (req, res) => {
    try {
        const jsonData = JSON.parse(req.body.data); // { session_id: ... }
        const file = req.file;

        console.log('📥 Received audio upload:');
        console.log('🆔 Session ID:', jsonData.session_id);
        console.log('🎵 File:', file.originalname);

        res.json({ status: 'success', session: jsonData.session_id, file: file.originalname });
    } catch (err) {
        console.error('❌ Error handling upload:', err);
        res.status(500).json({ error: 'Upload failed' });
    }
});
app.get('/get_questions_suggestions', (req, res) => {
    const { session_id, cv, job_description } = req.query;

    if (!session_id || !cv || !job_description) {
        return res.status(400).json({ error: 'Missing required query parameters.' });
    }

    // 🔁 Simulăm funcția `dialog_reconstruction(session_id)`
    const reconstructed_dialog = `Reconstructed dialog for session ${session_id}`;

    // 🔁 Simulăm `generate_questions_chat_gpt(...)`
    const questions = [
        "Tell me about a time you optimized a data pipeline.",
        "What is the difference between SQL and PL/pgSQL?",
        "How would you use Python with PostgreSQL in ETL?"
    ];

    console.log('📥 GET /get_questions_suggestions');
    console.log('🆔 session_id:', session_id);
    console.log('📄 CV:', cv.slice(0, 100) + '...');
    console.log('📄 Job Description:', job_description.slice(0, 100) + '...');

    res.json({
        questions,
        reconstructed_dialog,
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});

app.use('/uploads', express.static(uploadDir));

app.get('/', (req, res) => {
    const files = fs.readdirSync(uploadDir);
    const listItems = files
        .map(file => {
            const fileUrl = `/uploads/${file}`;
            return `<li>
        <strong>${file}</strong><br/>
        <audio controls src="${fileUrl}"></audio>
      </li>`;
        })
        .join('');

    res.send(`
    <html>
      <head><title>Uploaded Audio Files</title></head>
      <body>
        <h1>Uploaded Audio Files</h1>
        <ul>${listItems}</ul>
      </body>
    </html>
  `);
});

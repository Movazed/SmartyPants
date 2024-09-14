const express = require('express');
const next = require('next');
const { exec } = require('child_process');
const cors = require('cors');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3001;

app.prepare().then(() => {
  const server = express();

  server.use(cors());
  server.use(express.json());

  // API route to run the Python script
  server.post('/api/start-face-detection', (req, res) => {
    const pythonScriptPath = 'D:\\Projects\\workspace\\SmartyPants\\smarty_pants\\src\\pages\\scripts\\face_detection.py';

    exec(`python ${pythonScriptPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Execution error: ${error.message}`);
        return res.status(500).json({ error: 'Failed to run face detection script' });
      }

      try {
        const result = JSON.parse(stdout);
        res.status(200).json(result);
      } catch (parseError) {
        console.error(`Failed to parse JSON output: ${parseError.message}`);
        res.status(500).json({ error: 'Failed to parse script output', details: stdout });
      }
    });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});

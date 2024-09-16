import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

// Path to the status file
const statusFilePath = path.join(process.cwd(), 'src/pages/scripts/face_detection_status.json');

// Initialize status file if it does not exist
if (!fs.existsSync(statusFilePath)) {
  fs.writeFileSync(statusFilePath, JSON.stringify({ faceDetected: false }));
}

// Track the python process globally
let pythonProcess = null;

// API endpoint handler
export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Return the current face detection status from the status file
    try {
      const status = JSON.parse(fs.readFileSync(statusFilePath, 'utf8'));
      res.status(200).json({ faceDetected: status.faceDetected });
    } catch (error) {
      console.error('Error reading status file:', error);
      res.status(500).json({ error: 'Error reading status file' });
    }
  } else if (req.method === 'POST') {
    const { action } = req.body;  // Get the action from the request body

    if (action === 'start') {
      // Check if the Python process is already running
      if (pythonProcess !== null && !pythonProcess.killed) {
        res.status(400).json({ message: 'Face detection is already running' });
        return;
      }

      // Path to the Python script
      const pythonScriptPath = 'D:/Projects/workspace/SmartyPants/smarty_pants/src/pages/scripts/face_detection.py';

      // Start the face detection script
      pythonProcess = spawn('python', [pythonScriptPath]);

      pythonProcess.stderr.on('data', (data) => {
        // Log any errors from the Python script
        console.error(`stderr: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        // Log when the Python script exits
        console.log(`Python script exited with code ${code}`);
        pythonProcess = null;  // Reset the process reference when it exits
      });

      res.status(200).json({ message: 'Face detection started' });

    } else if (action === 'stop') {
      try {
        // Send a request to stop the face detection via the Python Flask server
        await axios.post('http://localhost:5000/api/face-detection', {
          action: 'stop'
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        // Kill the Python process if it is still running
        if (pythonProcess !== null && !pythonProcess.killed) {
          pythonProcess.kill();
          pythonProcess = null;
        }

        res.status(200).json({ message: 'Face detection stopped' });
      } catch (error) {
        console.error('Error stopping face detection:', error);
        res.status(500).json({ error: 'Failed to stop face detection' });
      }
    } else {
      res.status(400).json({ error: 'Invalid action' });  // Return error if action is invalid
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });  // Return error for unsupported HTTP methods
  }
}

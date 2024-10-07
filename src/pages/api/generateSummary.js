import { exec } from 'child_process';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { youtubeLink } = req.body;

    // Basic validation for the YouTube link
    if (!youtubeLink || !/^https:\/\/(www\.)?youtube\.com\/watch\?v=/.test(youtubeLink)) {
      return res.status(400).json({ error: 'A valid YouTube link is required' });
    }

    // Absolute path to the Python script
    const scriptPath = 'C:\\Projects\\workspace\\SmartyPants\\smarty_pants\\src\\pages\\scripts\\generate_summary.py';
    console.log(`Python script path: ${scriptPath}`);

    try {
      // Execute the Python script using Promises for better error handling
      const summary = await new Promise((resolve, reject) => {
        exec(`python ${scriptPath} ${youtubeLink}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${stderr}`);
            reject(new Error(`Script execution failed: ${stderr}`));
          } else {
            resolve(stdout.trim());
          }
        });
      });

      // Return the output from the Python script
      res.status(200).json({ summary });

    } catch (err) {
      console.error(`Error occurred: ${err.message}`);
      res.status(500).json({ error: 'Failed to generate summary' });
    }
  } else if (req.method === 'GET') {
    res.status(200).json({ message: 'Send a POST request with a YouTube link to generate a summary.' });
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}

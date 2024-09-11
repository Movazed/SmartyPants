// import { exec } from 'child_process';
// import path from 'path';

// export default function handler(req, res) {
//   const scriptPath = path.join(process.cwd(), 'src', 'pages', 'scripts', 'face_detection.py');

//   exec(`python3 ${scriptPath}`, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Error executing Python script: ${error}`);
//       return res.status(500).json({ status: 'error', message: 'Failed to run face detection.' });
//     }

//     if (stderr) {
//       console.error(`Python stderr: ${stderr}`);
//       return res.status(500).json({ status: 'error', message: 'Python error.' });
//     }

//     // Parse the Python script output
//     const output = JSON.parse(stdout.trim());
//     res.status(200).json(output);
//   });
// }

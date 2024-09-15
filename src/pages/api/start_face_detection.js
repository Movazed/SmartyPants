import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Log the start of script execution
      console.log('Starting face detection script execution...');

      // Adjust the path to your Python script
      const scriptPath = 'D:\\Projects\\workspace\\SmartyPants\\smarty_pants\\src\\pages\\scripts\\face_detection.py';
      console.log(`Executing script at path: ${scriptPath}`);

      const { stdout, stderr } = await execPromise(`python "${scriptPath}"`);

      // Log the stdout and stderr
      console.log('Script stdout:', stdout);
      console.error('Script stderr:', stderr);

      if (stderr) {
        // Log detailed error information and send the response
        console.error('Error executing script:', stderr);
        return res.status(500).json({ status: 'error', message: stderr });
      }

      // Ensure the stdout is valid JSON
      let result;
      try {
        result = JSON.parse(stdout);
      } catch (jsonError) {
        // Log JSON parse error
        console.error('Error parsing JSON from stdout:', jsonError);
        return res.status(500).json({ status: 'error', message: 'Invalid JSON from script' });
      }

      return res.status(200).json(result);
    } catch (error) {
      // Log detailed error information
      console.error('Error in API handler:', error);
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

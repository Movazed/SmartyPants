import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Adjust the path to your Python script
    const { stdout, stderr } = await execPromise('python D:\\Projects\\workspace\\SmartyPants\\smarty_pants\\src\\pages\\scripts\\face_detection.py');

    if (stderr) {
      console.error('Error executing script:', stderr);
      return res.status(500).json({ status: 'error', message: stderr });
    }

    const result = JSON.parse(stdout);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in API handler:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}

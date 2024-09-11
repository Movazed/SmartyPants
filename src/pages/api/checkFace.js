import { exec } from "child_process";
import path from "path";

export default function handler(req, res) {
  // Define the path to your Python script
  const scriptPath = path.join(process.cwd(), "src", "pages", "scripts", "face_detection.py");

  // Execute the Python script with a timeout to prevent hanging
  exec(`python ${scriptPath}`, { timeout: 35000 }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Execution error: ${error.message}`);
      if (error.signal) {
        console.error(`Process was killed with signal: ${error.signal}`);
      }
      res.status(500).json({ status: "error", message: "Failed to run face detection." });
      return;
    }

    if (stderr) {
      console.error(`Python script error: ${stderr}`);
      res.status(500).json({ status: "error", message: "Python script error." });
      return;
    }

    console.log(`Python script output: ${stdout}`);

    try {
      const output = JSON.parse(stdout);
      if (output.status === "no_face") {
        console.log("No face detected.");
        res.status(200).json({ status: "no_face" });
      } else if (output.status === "face_detected") {
        console.log("Face detected.");
        res.status(200).json({ status: "face_detected" });
      } else {
        console.error(`Unexpected status in Python output: ${output.status}`);
        res.status(500).json({ status: "error", message: "Unexpected status in Python output." });
      }
    } catch (e) {
      console.error(`Failed to parse Python output: ${e.message}`);
      res.status(500).json({ status: "error", message: "Failed to parse output." });
    }
  });
}

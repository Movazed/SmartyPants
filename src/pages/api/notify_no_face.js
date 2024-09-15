// pages/api/notify_no_face.js
export default function handler(req, res) {
    if (req.method === 'POST') {
        // Respond to the request when no face is detected
        res.status(200).json({ status: 'no_face_detected', message: 'No face detected for 5 seconds.' });
    } else {
        // Only allow POST requests
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

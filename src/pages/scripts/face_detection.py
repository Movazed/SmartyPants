import cv2
from retinaface import RetinaFace
import time
import json
import requests

def detect_faces(frame):
    """Detect faces in a frame and return the result."""
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    faces = RetinaFace.detect_faces(frame_rgb, threshold=0.9)  # Higher threshold for more confidence
    return faces

def detect_face_in_camera():
    """Detect faces using the default camera."""
    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        print("Error: Could not open video capture.")
        return json.dumps({"status": "error", "message": "Could not open video capture."})
    
    frame_size = (640, 360)
    last_face_time = time.time()
    face_detected = False
    timeout = 30  # Timeout in seconds

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: Couldn't read frame.")
            break
        
        frame_resized = cv2.resize(frame, frame_size)
        faces = detect_faces(frame_resized)

        if faces:
            face_detected = True
            last_face_time = time.time()  # Reset the timer when a face is detected
        else:
            face_detected = False

        # Check if 5 seconds have passed since the last face was detected
        if time.time() - last_face_time > 5:
            print("No face detected for 5 seconds, stopping...")
            # Notify the front-end
            try:
                requests.post('http://localhost:5000/notify_no_face')  # Sends a signal to your server/backend
            except requests.RequestException as e:
                print(f"Error notifying server: {e}")
            break
        
        # Timeout check
        if time.time() - last_face_time > timeout:
            print("Operation timed out.")
            break

    cap.release()
    return json.dumps({"status": "face_detected" if face_detected else "no_face"})

if __name__ == "__main__":
    result = detect_face_in_camera()
    print(result)

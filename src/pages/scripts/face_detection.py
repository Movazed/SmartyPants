import cv2
import mediapipe as mp
import threading
import queue
import time
import json
import requests
from flask import Flask, request
import sys  # Import sys for system exit

# Path to the status file where the face detection status will be stored
STATUS_FILE_PATH = 'D:/Projects/workspace/SmartyPants/smarty_pants/src/pages/scripts/face_detection_status.json'
SERVER_URL = 'http://localhost:3001/api/face-detection'

app = Flask(__name__)
stop_event = threading.Event()
server_thread = None

def notify_server(status):
    try:
        response = requests.post(SERVER_URL, json={"action": status})
        response.raise_for_status()
        print(f"Server notified: {status}")
    except requests.RequestException as e:
        print(f"Error notifying server: {e}")

class FaceDetectionWorker(threading.Thread):
    def __init__(self, frame_queue, result_queue):
        super().__init__()
        self.frame_queue = frame_queue
        self.result_queue = result_queue
        self.mp_face_detection = mp.solutions.face_detection.FaceDetection(min_detection_confidence=0.9)
    
    def run(self):
        while not stop_event.is_set():
            try:
                frame = self.frame_queue.get(timeout=1)
                frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                results = self.mp_face_detection.process(frame_rgb)
                faces = {}
                if results.detections:
                    for i, detection in enumerate(results.detections):
                        bboxC = detection.location_data.relative_bounding_box
                        h, w, _ = frame.shape
                        x1 = int(bboxC.xmin * w)
                        y1 = int(bboxC.ymin * h)
                        x2 = int(x1 + bboxC.width * w)
                        y2 = int(y1 + bboxC.height * h)
                        faces[i] = {'facial_area': (x1, y1, x2, y2)}
                self.result_queue.put(faces)
            except queue.Empty:
                continue

def write_status_to_file(status):
    with open(STATUS_FILE_PATH, 'w') as file:
        json.dump({"faceDetected": status}, file)

def detect_face_in_camera():
    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        print("Error: Could not open video capture.")
        write_status_to_file(False)
        return
    
    print("Starting camera. Press 'q' to quit.")
    
    frame_size = (640, 360)
    frame_queue = queue.Queue(maxsize=10)
    result_queue = queue.Queue()
    
    face_detection_worker = FaceDetectionWorker(frame_queue, result_queue)
    face_detection_worker.start()
    
    last_face_time = time.time()
    face_detected = False
    
    try:
        while not stop_event.is_set():
            ret, frame = cap.read()
            if not ret:
                print("Error: Couldn't read frame.")
                break
            
            frame_resized = cv2.resize(frame, frame_size)
            
            try:
                frame_queue.put_nowait(frame_resized)
            except queue.Full:
                pass
            
            faces = result_queue.get() if not result_queue.empty() else {}
            
            if faces:
                if not face_detected:
                    write_status_to_file(True)
                    face_detected = True
                last_face_time = time.time()
                for key, face in faces.items():
                    facial_area = face['facial_area']
                    x1, y1, x2, y2 = facial_area
                    cv2.rectangle(frame_resized, (x1, y1), (x2, y2), (0, 255, 0), 3)
            else:
                if face_detected:
                    write_status_to_file(False)
                face_detected = False
            
            if face_detected and time.time() - last_face_time > 5:
                notification_thread = threading.Thread(target=notify_server, args=("no_face_detected",))
                notification_thread.start()
                notification_thread.join()
                write_status_to_file(False)
                break
            
            cv2.imshow('High-Accuracy Face Detection', frame_resized)
            
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

    except KeyboardInterrupt:
        print("Interrupted by user.")
    
    finally:
        stop_event.set()
        face_detection_worker.join(timeout=5)
        cap.release()
        cv2.destroyAllWindows()
        write_status_to_file(False)

@app.route('/api/face-detection', methods=['POST'])
def handle_post_request():
    data = request.get_json()
    if data and data.get('action') == 'stop':
        print("Received stop request. Closing camera feed.")
        stop_event.set()  # Set the stop event to halt the face detection loop
        return {'status': 'stopping'}, 200
    return {'status': 'unknown action'}, 400

def start_flask_server():
    global server_thread
    if server_thread and server_thread.is_alive():
        print("Flask server is already running.")
        return
    server_thread = threading.Thread(target=lambda: app.run(port=5000, debug=False, use_reloader=False))
    server_thread.start()

def exit_and_stop():
    """
    Exits the application, sends a stop request to the Flask API, 
    and ensures the face detection process is stopped cleanly.
    """
    # Send stop request to Flask API
    try:
        response = requests.post(SERVER_URL, json={"action": "stop"})
        response.raise_for_status()
        print("Stop request sent successfully.")
    except requests.RequestException as e:
        print(f"Failed to send stop request: {e}")
    
    # Set the stop event to ensure the detection process halts
    stop_event.set()

    # Exit the Python application
    print("Exiting the application.")
    sys.exit(0)

if __name__ == "__main__":
    start_flask_server()
    try:
        detect_face_in_camera()
    finally:
        if server_thread:
            # Ensure Flask server is stopped properly
            stop_event.set()
            server_thread.join()

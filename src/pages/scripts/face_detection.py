import cv2
import mediapipe as mp
import threading
import queue
import time
import requests
import json

class FaceDetectionWorker(threading.Thread):
    def __init__(self, frame_queue, result_queue, stop_event):
        super().__init__()
        self.frame_queue = frame_queue
        self.result_queue = result_queue
        self.stop_event = stop_event
        self.mp_face_detection = mp.solutions.face_detection.FaceDetection(min_detection_confidence=0.9)
    
    def run(self):
        while not self.stop_event.is_set():
            try:
                frame = self.frame_queue.get(timeout=1)
                # Convert frame to RGB format
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

def notify_server(message):
    try:
        response = requests.post('http://localhost:3000/api/notify_no_face', json={"status": message}, timeout=5)
        response.raise_for_status()
        print('Server response:', response.json())
    except requests.RequestException as e:
        print(f"Error notifying server: {e}")

def detect_face_in_camera():
    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        print("Error: Could not open video capture.")
        return json.dumps({"status": "error", "message": "Could not open video capture."})
    
    print("Starting camera. Press 'q' to quit.")
    
    frame_size = (640, 360)
    frame_queue = queue.Queue(maxsize=10)
    result_queue = queue.Queue()
    stop_event = threading.Event()
    
    face_detection_worker = FaceDetectionWorker(frame_queue, result_queue, stop_event)
    face_detection_worker.start()
    
    last_face_time = time.time()
    
    try:
        while True:
            # Capture frame-by-frame from the camera
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
                print("Face Detected")
                last_face_time = time.time()
                for key, face in faces.items():
                    facial_area = face['facial_area']
                    x1, y1, x2, y2 = facial_area
                    cv2.rectangle(frame_resized, (x1, y1), (x2, y2), (0, 255, 0), 3)
            else:
                print("No Face Detected")
            
            if time.time() - last_face_time > 5:
                print("No face detected for 5 seconds, notifying server...")
                # Run notification in a separate thread
                notification_thread = threading.Thread(target=notify_server, args=("no_face_detected",))
                notification_thread.start()
                # Wait for the notification to finish
                notification_thread.join()
                break
            
            cv2.imshow('High-Accuracy Face Detection', frame_resized)
            
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

    except KeyboardInterrupt:
        print("Interrupted by user.")
    
    finally:
        stop_event.set()
        face_detection_worker.join()
        cap.release()
        cv2.destroyAllWindows()
        return json.dumps({"status": "face_detected" if faces else "no_face"})

if __name__ == "__main__":
    result = detect_face_in_camera()
    print(result)

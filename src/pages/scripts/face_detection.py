import cv2
from retinaface import RetinaFace
import threading
import queue
import time
import json

def detect_faces(frame, result_queue):
    """Detect faces in a frame and put results into the queue."""
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    faces = RetinaFace.detect_faces(frame_rgb, threshold=0.9)  # Higher threshold for more confidence
    result_queue.put(faces)

def detect_face_in_camera():
    """Detect faces using the default camera."""
    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        print("Error: Could not open video capture.")
        return
    
    frame_size = (640, 360)
    result_queue = queue.Queue()

    last_face_time = time.time()
    face_detected = False
    timeout = 30  # Timeout in seconds

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: Couldn't read frame.")
            break
        
        frame_resized = cv2.resize(frame, frame_size)
        detection_thread = threading.Thread(target=detect_faces, args=(frame_resized, result_queue))
        detection_thread.start()
        detection_thread.join()

        faces = result_queue.get() if not result_queue.empty() else {}

        if faces:
            face_detected = True
            last_face_time = time.time()  # Reset the timer when a face is detected
            for key, face in faces.items():
                facial_area = face['facial_area']
                x1, y1, x2, y2 = facial_area
                cv2.rectangle(frame_resized, (x1, y1), (x2, y2), (0, 255, 0), 3)  # Thicker rectangle for visualization
        else:
            face_detected = False

        # Check if 5 seconds have passed since the last face was detected
        if time.time() - last_face_time > 5:
            print("No face detected for 5 seconds, stopping...")
            break
        
        # Timeout check
        if time.time() - last_face_time > timeout:
            print("Operation timed out.")
            break
        
        cv2.imshow('High-Accuracy Face Detection', frame_resized)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

    # Output JSON
    output = {"status": "face_detected" if face_detected else "no_face"}
    print(json.dumps(output))  # Print JSON to stdout

if __name__ == "__main__":
    detect_face_in_camera()

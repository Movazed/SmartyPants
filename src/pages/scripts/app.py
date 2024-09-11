# from flask import Flask, jsonify, request
# import subprocess
# import json
# import os

# app = Flask(__name__)

# @app.route('/api/faceDetection', methods=['GET'])
# def face_detection():
#     script_path = os.path.join(os.getcwd(), 'face_detection.py')

#     try:
#         # Run the Python script
#         result = subprocess.run(['python', script_path], capture_output=True, text=True, check=True)

#         # Parse the script's output
#         output = json.loads(result.stdout.strip())

#         return jsonify(output)
#     except subprocess.CalledProcessError as e:
#         return jsonify({'status': 'error', 'message': 'Failed to run face detection.', 'details': str(e)}), 500
#     except json.JSONDecodeError as e:
#         return jsonify({'status': 'error', 'message': 'Failed to parse face detection results.', 'details': str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)

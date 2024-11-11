import cv2
import dlib
import numpy as np

# Load pre-trained face detector and facial landmark predictor
detector = dlib.get_frontal_face_detector()
predictor_path = 'api/shape_predictor_68_face_landmarks.dat'
try:
    predictor = dlib.shape_predictor(predictor_path)  # Check if file exists
except RuntimeError as e:
    print("Error loading predictor. Ensure the path is correct:", e)
    raise

def eye_aspect_ratio(eye):
    # Calculate the Euclidean distances between the two sets of vertical eye landmarks
    A = np.linalg.norm(eye[1] - eye[5])
    B = np.linalg.norm(eye[2] - eye[4])
    # Calculate the Euclidean distance between the horizontal eye landmarks
    C = np.linalg.norm(eye[0] - eye[3]) 
    return (A + B) / (2 * C)

def detect_drowsiness(image_path):
    # Load the image and convert it to grayscale
    image = cv2.imread(image_path)
    if image is None:
        return "Image not loaded. Check the image path."
    
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Detect faces in the image
    faces = detector(gray)
    if len(faces) == 0:
        return "No face detected."
    
    for face in faces:
        landmarks = predictor(gray, face)
        
        # Get the coordinates of the left and right eyes
        left_eye = np.array([(landmarks.part(i).x, landmarks.part(i).y) for i in range(36, 42)])
        right_eye = np.array([(landmarks.part(i).x, landmarks.part(i).y) for i in range(42, 48)])

        # Calculate the eye aspect ratio for both eyes
        left_EAR = eye_aspect_ratio(left_eye)
        right_EAR = eye_aspect_ratio(right_eye)
        ear = (left_EAR + right_EAR) / 2.0
        
        # Threshold for drowsiness detection
        threshold = 0.25  # Adjusted threshold
        if ear < threshold:
            return "Drowsy"  # Eyes are closed, user is likely drowsy
        else:
            return "Awake"  # Eyes are open, user is awake
    
    return "No face detected"

# Example usage
print(detect_drowsiness("path_to_your_image.jpg"))

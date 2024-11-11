from django.shortcuts import render
import base64
import cv2
import numpy as np
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from io import BytesIO
import json
from .drowsiness_detector import detect_drowsiness
# Create your views here.

@csrf_exempt
def detect_drowsiness_api(request):
    if request.method == 'POST':
        try:
            # Get base64 image from request
            data = json.loads(request.body)
            image_data = data.get('image')
            
            if not image_data:
                return JsonResponse({"error": "No image provided"}, status=400)
            
            # Decode the base64 image
            image_data = image_data.split(",")[1]
            img_bytes = base64.b64decode(image_data)
            img_array = np.frombuffer(img_bytes, dtype=np.uint8)
            image = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

            # Save the image temporarily for processing
            cv2.imwrite('temp_image.jpg', image)
            
            # Run drowsiness detection
            result = detect_drowsiness('temp_image.jpg')
            return JsonResponse({"status": result})
        
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid method"}, status=405)

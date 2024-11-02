import cv2

# Initialize the background subtractor
back_sub = cv2.createBackgroundSubtractorMOG2()

def process_frame(frame):
    # Convert frame to grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    # Apply background subtraction
    fg_mask = back_sub.apply(gray)
    
    # Apply thresholding to remove shadows/noise
    _, thresh = cv2.threshold(fg_mask, 200, 255, cv2.THRESH_BINARY)
    
    # Find contours
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Filter contours based on area (tune this threshold as needed)
    for contour in contours:
        if cv2.contourArea(contour) > 100:  # Min area to detect as a person
            # Get bounding box for the contour
            x, y, w, h = cv2.boundingRect(contour)
            centroid = (int(x + w / 2), int(y + h / 2))
            
            # Draw the bounding box on the frame
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)  # Green box
            
            # Optionally, draw the centroid
            cv2.circle(frame, centroid, 5, (0, 0, 255), -1)  # Red dot for centroid
            
            # Print or log the position of the detected person
            print(f"Detected person at position: {centroid}")

    # Display the processed frame with bounding boxes
    cv2.imshow('Processed Frame', frame)
    
    # Wait for a key press and exit if 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        return False
    
    return True

# Example function to process a video file
def process_video(video_path):
    cap = cv2.VideoCapture(video_path)
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        if not process_frame(frame):
            break
    cap.release()
    cv2.destroyAllWindows()

# To use this function, call process_video with the path to your video file or camera stream
# process_video('path_to_your_video.mp4')


video_path = 'TestVideos/TestVideo.mp4'
process_video(video_path)
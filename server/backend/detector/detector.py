from box import *
import capture
import cv2
from tracker import *
import yt_dlp


min_contour_area = 10000

def getMask(frame1, frame2):
    diff = cv2.absdiff(frame1, frame2)
    gray = cv2.cvtColor(diff, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5, 5), 0)
    _, thresh = cv2.threshold(blur, 20, 255, cv2.THRESH_BINARY)
    dilated = cv2.dilate(thresh, None, iterations=3)
    return dilated


def analyzeCapture(cap: cv2.VideoCapture, exitPosition: Position):
    # Create tracker object
    tracker = EuclideanDistTracker(exitPosition, 0, 0, 50)
    _, background = cap.read()
    currentFrame: int = 0
    while True:
        ret, frame = cap.read()
        currentFrame += 1
        if not ret:
            break
        height, width, _ = frame.shape
        tracker.setDimensions(height, width)
        roi = frame

        mask = getMask(background, roi)

        contours, _ = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        detections = []
        for cnt in contours:
            # Calculate area and remove small elements
            area = cv2.contourArea(cnt)
            if area > min_contour_area:
                rect: Rect = Rect(cv2.boundingRect(cnt))
                detections.append(rect)
        # 2. Object Tracking
        boxes: list[Box] = tracker.update(detections, currentFrame)
        for box in boxes:
            cv2.putText(roi, str(box.id), (box.rect.x, box.rect.y - 15), cv2.FONT_HERSHEY_PLAIN, 2, (255, 0, 0), 2)
            cv2.rectangle(roi, (box.rect.x, box.rect.y), ((box.rect.x + box.rect.w), (box.rect.y + box.rect.h)), (0, 255, 0), 3)
        cv2.putText(roi, tracker.getCounter().__str__(), (50, 50), cv2.FONT_HERSHEY_PLAIN, 2, (255, 0, 0), 2)
        cv2.line(roi, (width//2, 0), (width//2, height), (0, 0, 255), 2)
        cv2.imshow("Frame", frame)
        cv2.imshow("Mask", mask)

        key = cv2.waitKey(30)
        if key == 27:
            break
    cap.release()
    cv2.destroyAllWindows()


def main():
    print("\n\nRunning detect\n\n\n")
    cap = capture.captureFromFilepath("backend/detector/demovideos/test1.mp4")
    analyzeCapture(cap, Position.LEFT)
    print("done")

main()
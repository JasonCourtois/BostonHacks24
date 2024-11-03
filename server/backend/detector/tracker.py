from box import *
import math
import position
from rectangle import *


minFramesExisting = 20
minDistBetweenEqualRectangles = 50

class EuclideanDistTracker:
    def __init__(self, exitPosition: Position, frameWidth: int, frameHeight: int, linePercentage: int):
        # Store the center positions of the objects
        self.previous_boxes: list[Box] = []
        # Keep the co1unt of the IDs
        # each time a new object id detected, the count will increase by one
        self.id_count: int = 0
        self.frameWidth = frameWidth
        self.frameHeight = frameHeight
        self.exitPosition = exitPosition
        self.is_horizontal: bool = (exitPosition == Position.LEFT or exitPosition == Position.RIGHT)
        self.counter = 0
        self.linePercentage = linePercentage

    def setDimensions(self, height: int, width: int):
        self.frameWidth = width
        self.frameHeight = height


    def getRectPosition(self, rect: Rect) -> Position:
        if self.is_horizontal:
            return position.getHorizontalPosition(rect.center_x, self.frameWidth, self.linePercentage)
        else:
            return position.getVerticalPosition(rect.center_x, self.frameHeight, self.linePercentage)


    def update(self, rects : list[Rect], currentFrame: int) -> list[Box]:
        # Objects boxes with ids and position
        returnBoxes: list[Box] = []

        # Get center point of new object
        for rect in rects:
            # Find out if that object was detected already
            same_object_detected = False
            for prev_box in self.previous_boxes:
                # Distance from the center of this object to every object in the center_points
                dist = math.hypot(rect.center_x - prev_box.rect.center_x, rect.center_y - prev_box.rect.center_y)

                # If object is distance is less than 25, this object is the same as that other object
                if dist < minDistBetweenEqualRectangles:
                    # A previously existing object moved
                    prev_box.rect = rect
                    prev_box.last_frame_existed = currentFrame
                    new_pos = self.getRectPosition(rect)
                    
                    if new_pos != prev_box.position:
                        prev_box.position = new_pos
                        if new_pos == self.exitPosition:
                            # INCREASE COUNTER
                            self.counter -= 1
                        else:
                            # DECREASE COUNTER
                            self.counter += 1
                    # print(self.previous_boxes)
                    returnBoxes.append(prev_box)
                    same_object_detected = True
                    break

            # New object is detected we assign the ID to that object
            if same_object_detected is False:
                new_pos = self.getRectPosition(rect)
                new_box: Box = Box(rect, self.id_count, new_pos)
                new_box.last_frame_existed = currentFrame
                self.previous_boxes.append(new_box)
                returnBoxes.append(new_box)
                self.id_count += 1

        # Update dictionary with IDs not used removed
        self.previous_boxes = [box for box in self.previous_boxes if box.last_frame_existed >= currentFrame - minFramesExisting]
        return returnBoxes
    

    def getCounter(self):
        return self.counter

    
class Rect():
    def __init__(self, rectTuple):
        self.x = rectTuple[0]
        self.y = rectTuple[1]
        self.w = rectTuple[2]
        self.h = rectTuple[3]
        self.center_x = (self.x + (self.x + self.w)) / 2
        self.center_y = (self.y + (self.y + self.h)) / 2


    def __repr__(self):
        return f"x: {self.x}, y: {self.y}, w: {self.w}, h: {self.h}"
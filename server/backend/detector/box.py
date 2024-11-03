from rectangle import Rect
from position import Position


class Box():
    def __init__(self, rect: Rect, id: int, position: Position):
        self.rect: Rect = rect
        self.id: int = id
        self.position: Position = position
        self.last_frame_existed: int = 0
    
    def __repr__(self):
        return f"[{self.rect}], id: {self.id}, position: {self.position}, frames: {self.last_frame_existed}"
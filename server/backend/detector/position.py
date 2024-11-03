from enum import Enum


class Position(Enum):
    LEFT = 0
    RIGHT = 1
    TOP = 2
    BOTTOM = 3


def getHorizontalPosition(xInFrame: int, widthOfFrame: int, percentageFromLeft: int) -> Position:
    percent: int = (percentageFromLeft % 100) / 100 
    if xInFrame < widthOfFrame * percent:
        return Position.LEFT
    else:
        return Position.RIGHT


def getVerticalPosition(yInFrame: int, heightOfFrame: int, percentageFromTop: int) -> Position:
    percent: int = (percentageFromTop % 100) / 100
    if yInFrame < heightOfFrame * percent:
        return Position.TOP
    else:
        return Position.BOTTOM
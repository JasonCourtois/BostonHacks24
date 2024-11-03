import cv2;
import yt_dlp


def captureYTUrl(url: str) -> cv2.VideoCapture:
    with yt_dlp.YoutubeDL({'format': 'best', 'quiet': True }) as ydl:
        info_dict = ydl.extract_info(url, download = False)
        stream_url = info_dict.get('url')
    return cv2.VideoCapture(stream_url)


def captureFromFilepath(path: str) -> cv2.VideoCapture:
    return cv2.VideoCapture(path)
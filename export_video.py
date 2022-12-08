import cv2
import os
def save_video(path_to_read, path_to_write):
    cap = cv2.VideoCapture(path_to_read)
    count = 1
    while (cap.isOpened()):
        # Capture frame-by-frame
        ret, frame = cap.read()
        if ret == True:
            cv2.imwrite(os.path.join(path_to_write, str(count)+'.jpg'), frame)
            count += 1
        else:
            break
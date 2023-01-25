import cv2
import os
from werkzeug.utils import secure_filename

def upload_file(app, file):
    if file.filename == '':
        return 404
    else:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_VIDEO_FOLDER'], filename))
        return 200

def get_frames(path_to_read):
    image_dict = dict()
    cap = cv2.VideoCapture(path_to_read)
    image_size = None
    count = 1
    while (cap.isOpened()):
        # Capture frame-by-frame
        ret, frame = cap.read()
        if ret == True:
            image_dict[count] = frame
            image_size = frame.shape[:2]
            count += 1
        else:
            break
    return image_dict, image_size

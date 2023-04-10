import cv2
import os
from werkzeug.utils import secure_filename
import ffmpeg
from pathlib import Path


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


def get_single_frame(video_cap, frame_number):
    #cap = cv2.VideoCapture(path_to_read)

    video_cap.set(cv2.CAP_PROP_POS_FRAMES, frame_number)
    ret, frame = video_cap.read()
    image_size = frame.shape[:2]
    if ret:
        return frame, image_size
    else:
        return -1
    
def get_frame_count(path_to_read):
    # cap = cv2.VideoCapture(path_to_read)
    # total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    # print("Total number of frames", total_frames)

    # if total_frames is not None:
    #     return total_frames
    # else:
    #     return -1
    
    # cap = cv2.VideoCapture(path_to_read)
    
    # count = 0
    # while (cap.isOpened()):
    #     # Capture frame-by-frame
    #     ret, frame = cap.read()
    #     if ret == True:
    #         # image_dict[count] = frame
    #         # image_size = frame.shape[:2]
    #         count += 1
    #     else:
    #         break
    # print(count)
    # return count-1

    path = Path.cwd()

    print("Read path", path.absolute().joinpath(path_to_read))

    probe = ffmpeg.probe(path_to_read)
    video_info = next((stream for stream in probe['streams'] if stream['codec_type'] == 'video'), None)

    print("INFO:", video_info)
    print("Total frames:", video_info['nb_frames'])
    return int(video_info['nb_frames'])-1

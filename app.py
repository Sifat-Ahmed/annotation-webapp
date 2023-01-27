## first importing the necessary files
import cv2
from flask import Flask, render_template, flash, request, redirect, url_for, send_file, session
from werkzeug.utils import secure_filename
import os
from export_video import *
from Utils.utils import *

VIDEO_FOLDER = 'static/UPLOADS/videos'
IMAGE_FOLDER = 'static/UPLOADS/images'
## creating an app reference for flask

clean_dirs(VIDEO_FOLDER)
clean_dirs(IMAGE_FOLDER)

app = Flask(__name__)
app.config['UPLOAD_VIDEO_FOLDER'] = VIDEO_FOLDER
app.config['UPLOAD_IMAGE_FOLDER'] = IMAGE_FOLDER
count = 0
image_height, image_width, jump_to_frame = 0, 0, 1
image_dict, image_size = None, None
data_dict = dict()


@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
def upload():
    global image_dict, image_size, image_height, image_width, jump_to_frame
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' in request.files:
            print('File uploaded', request.files['file'])
            status = upload_file(app, request.files['file'])
            if status == 200:
                image_dict, image_size = get_frames(
                    os.path.join(app.config['UPLOAD_VIDEO_FOLDER'], request.files['file'].filename))

                session['num_frames'] = data_dict['num_frames'] = len(image_dict)
                session['filename'] = data_dict['filename'] = request.files['file'].filename
                session['image_height'] = data_dict['image_height'] = image_height = image_size[0]
                session['image_width'] = data_dict['image_width'] = image_width = image_size[1]
                session['frame_no'] = data_dict['frame_no'] = 1

                image = image_dict[data_dict['frame_no']]
                cv2.imwrite(os.path.join(app.config['UPLOAD_IMAGE_FOLDER'], str(data_dict['frame_no']) + '.jpg'), image)
                session['image_path'] = data_dict['image_path'] = os.path.join(app.config['UPLOAD_IMAGE_FOLDER'],
                                                                               str(data_dict['frame_no']) + '.jpg')

                print(data_dict)
                return render_template('index.html', data=data_dict)


            elif status == 404:
                pass

        elif 'frameNoSubmit' in request.form:
            jump_to_frame = request.form.get("frameNo")
            session['frame_no'] = data_dict['frame_no'] = int(jump_to_frame)

            image = image_dict[data_dict['frame_no']]
            data_dict['filename'] = session['filename']
            data_dict['image_height'] = session['image_height']
            data_dict['image_width'] = session['image_width']
            data_dict['num_frames'] = session['num_frames']

            image = cv2.resize(image, (data_dict['image_width'], data_dict['image_height']))

            cv2.imwrite(os.path.join(app.config['UPLOAD_IMAGE_FOLDER'], str(data_dict['frame_no']) + '.jpg'), image)
            session['image_path'] = data_dict['image_path'] = os.path.join(app.config['UPLOAD_IMAGE_FOLDER'],
                                                                           str(data_dict['frame_no']) + '.jpg')

            return render_template('index.html', data=data_dict)

        elif "sizeSubmit" in request.form:
            #image_height = request.form.get('heightInput')
            image_width = request.form.get('widthInput')
            print('New entered width is', image_width)
            estimated_height = (int(image_width) / session['image_width']) * session['image_height']
            estimated_height = int(estimated_height)
            data_dict['image_height'] = session['image_height'] = estimated_height
            data_dict['image_width'] = session['image_width'] = int(image_width)


            data_dict['filename'] = session['filename']
            image = image_dict[session['frame_no']]
            #session['image_height'] = data_dict['image_height'] = int(image_height)
            #session['image_width'] = data_dict['image_width'] = int(image_width)

            image = cv2.resize(image, (int(image_width), int(estimated_height)))

            data_dict['frame_no'] = session['frame_no']
            data_dict['num_frames'] = session['num_frames']

            cv2.imwrite(os.path.join(app.config['UPLOAD_IMAGE_FOLDER'], str(data_dict['frame_no']) + '.jpg'), image)
            data_dict['image_path'] = os.path.join(app.config['UPLOAD_IMAGE_FOLDER'],
                                                   str(data_dict['frame_no']) + '.jpg')

            return render_template('index.html', data=data_dict)

    return render_template('index.html', data=None)


@app.route('/annotate/<file>', methods=['POST'])
def show(file):
    global count
    image = dict()
    image['id'] = int(file)
    image['total_frame'] = count
    image['name'] = str(file) + '.jpg'
    return render_template('index.html', image=image)


if __name__ == '__main__':
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'
    app.run(debug=True, port=5555)

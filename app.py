## first importing the necessary files
from flask import Flask, render_template, flash, request, redirect, url_for, send_file
from werkzeug.utils import secure_filename
import os
from export_video import *


VIDEO_FOLDER = 'static/UPLOADS/videos'
IMAGE_FOLDER = 'static/UPLOADS/images'
## creating an app reference for flask
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
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' in request.files:
            print('File uploaded', request.files['file'])
            status = upload_file(app, request.files['file'])
            if status == 200:
                image_dict, image_size = get_frames(os.path.join(app.config['UPLOAD_VIDEO_FOLDER'], request.files['file'].filename))

                data_dict['image_height'] = image_size[1]
                data_dict['image_width'] = image_size[0]
                data_dict['frame_no'] = 1

                image = image_dict[data_dict['frame_no']]
                cv2.imwrite(os.path.join(app.config['UPLOAD_IMAGE_FOLDER'], str(data_dict['frame_no']) + '.jpg'), image)
                data_dict['image_path'] = os.path.join(app.config['UPLOAD_IMAGE_FOLDER'], str(data_dict['frame_no']) + '.jpg')

                print(data_dict)
                return render_template('sidebar.html', data=data_dict)


            elif status == 404:
                pass

        elif 'frameNoSubmit' in request.form:
            jump_to_frame = request.form.get("frameNo")
            data_dict['frame_no'] = jump_to_frame

        elif "sizeSubmit" in request.form:
            image_height = request.form.get('heightInput')
            image_width = request.form.get('widthInput')
            data_dict['image_height'] = image_height
            data_dict['image_width'] = image_width


        # file = request.files['file']
        # # If the user does not select a file, the browser submits an
        # # empty file without a filename.
        # if file.filename == '':
        #     flash('No selected file')
        #     return redirect(request.url)
        # if file:
        #     filename = secure_filename(file.filename)
        #     file.save(os.path.join(app.config['UPLOAD_VIDEO_FOLDER'], filename))
        #     global count
        #     count = save_video(os.path.join(app.config['UPLOAD_VIDEO_FOLDER'], filename), app.config['UPLOAD_IMAGE_FOLDER'])
        #     image = dict()
        #     image['id'] = 1
        #     image['total_frame'] = count
        #     image['name'] = str(image['id']) + '.jpg'
        #     return render_template('index.html', image=image)
            #return send_file(os.path.join(app.config['UPLOAD_FOLDER'], filename),  mimetype='image/png')
            #return redirect(url_for('show', image=image), code=307)
            #return redirect(request.url)

    #image_path = r'static/UPLOADS/images/image.jpg'
    return render_template('sidebar.html', data = None)

@app.route('/annotate/<file>', methods=['POST'])
def show(file):
    global count
    image = dict()
    image['id'] = int(file)
    image['total_frame'] = count
    image['name'] = str(file)+'.jpg'
    return render_template('index.html', image=image)

if __name__ == '__main__':
    app.run(debug=True, port=5555)


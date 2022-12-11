## first importing the necessary files
from flask import Flask, render_template, flash, request, redirect, url_for, send_file
from werkzeug.utils import secure_filename
import os
from export_video import save_video


VIDEO_FOLDER = 'static/UPLOADS/videos'
IMAGE_FOLDER = 'static/UPLOADS/images'
## creating an app reference for flask
app = Flask(__name__)
app.config['UPLOAD_VIDEO_FOLDER'] = VIDEO_FOLDER
app.config['UPLOAD_IMAGE_FOLDER'] = IMAGE_FOLDER
count = 0


@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file:
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_VIDEO_FOLDER'], filename))
            global count
            count = save_video(os.path.join(app.config['UPLOAD_VIDEO_FOLDER'], filename), app.config['UPLOAD_IMAGE_FOLDER'])
            image = dict()
            image['id'] = 1
            image['total_frame'] = count
            image['name'] = str(image['id']) + '.jpg'
            return render_template('index.html', image=image)
            #return send_file(os.path.join(app.config['UPLOAD_FOLDER'], filename),  mimetype='image/png')
            #return redirect(url_for('show', image=image), code=307)
            #return redirect(request.url)
    return render_template('upload.html')

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


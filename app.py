## first importing the necessary files
from flask import Flask, render_template, flash, request, redirect, url_for, send_file
from werkzeug.utils import secure_filename
import os, cv2
UPLOAD_FOLDER = 'static/UPLOADS'
## creating an app reference for flask
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

## now adding a route to the application
@app.route('/')
def index_page():
    return render_template('index.html', my_name='Testing')

@app.route('/upload', methods=['GET', 'POST'])
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
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            image = dict()
            image['id'] = 1
            image['name'] = filename
            return render_template('view.html', image=image)
            #return send_file(os.path.join(app.config['UPLOAD_FOLDER'], filename),  mimetype='image/png')
            #return redirect(url_for('show', file='1'), code=307)
            #return redirect(request.url)
    return render_template('upload.html')

@app.route('/show/<file>', methods=['POST'])
def show(file):
    image = dict()
    image['id'] = int(file)
    image['name'] =  str(file)+'.jpg'
    return render_template('view.html', image=image)




if __name__ == '__main__':
    app.run(debug=True, port=5555)


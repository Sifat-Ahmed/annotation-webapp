## first importing the necessary files
from flask import Flask, render_template
## creating an app reference for flask
app = Flask(__name__)


## now adding a route to the application
@app.route('/')
def index_page():
    return render_template('index.html', my_name='Testing')


if __name__ == '__main__':
    app.run(debug=True, port=5555)


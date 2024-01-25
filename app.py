from flask import Flask, render_template, request
from datetime import datetime

# set FLASK_APP=app
# set FLASK_ENV=development
# flask run
app = Flask(__name__)

@app.route("/")
@app.route("/hello/<id>")
def model(id = None):
    if id and id.isnumeric():
        return render_template(
            "model.html",
            id=int(id),
            date=datetime.now()
        )
    else:
        return render_template(
            "model.html",
            id=1234,
            date=datetime.now()
        )
@app.route("/upload", methods=["GET","POST"])
def uploadPage():
    if request.method == 'GET':
        return render_template('uploadobj.html')
    if request.method == 'POST':
        return render_template('uploadobj.html')
    
if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
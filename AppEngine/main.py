import numpy as np
import flask
app = flask.Flask(__name__, template_folder='')
@app.route('/', methods=['GET', 'POST'])
def main():
    if flask.request.method == 'GET':
        return(flask.render_template('index.html'))
    if flask.request.method == 'POST':
        import random
        foo = ['Informational','BOGO','Discount']
        x = random.choice(foo)
        proper = x.replace("'", "")        
        return flask.render_template('index.html', result=proper)
if __name__ == '__main__':
    app.run()
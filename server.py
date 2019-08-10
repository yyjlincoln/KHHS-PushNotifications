import flask
from flask import Flask, jsonify
from flask_cors import CORS

app=Flask(__name__)
CORS(app)

notification=iter([{
    'type':'text',
    'text':'Hello',
    'duration':5
},{
    'type':'text',
    'text':'Hello2{{type}}',
    'duration':20
}])

def r(code,**kw):
    kw['code']=code
    return jsonify(kw)

@app.route('/fetchNow')
def sendNotification():
    try:
        return r(0,notifications=next(notification))
    except StopIteration:
        return r(0,notification=[])

app.run(host="0.0.0.0",port="80")
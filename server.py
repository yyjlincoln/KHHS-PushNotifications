import flask
from flask import Flask, jsonify
from flask_cors import CORS

app=Flask(__name__)
CORS(app)

notification=[]

def r(code,**kw):
    kw['code']=code
    return jsonify(kw)

@app.route('/getNotification')
def sendNotification():
    return r(0,notifications=notification)

app.run(host="0.0.0.0",port="80")
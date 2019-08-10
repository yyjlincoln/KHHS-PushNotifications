import flask
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

notification = iter([{
    'type': 'text',
    'text': 'Hello',
    'duration': 1
}, {
    'type': 'rawhtml',
    'html': '''<b>{{time}}Test<script>alert('1')</script></b>''',
    'duration': 200
}, {
    'type': 'text',
    'text': 'Hello2',
    'duration': 10
}])


def r(code, **kw):
    kw['code'] = code
    return jsonify(kw)


@app.route('/fetchNow')
def sendNotification():
    try:
        return r(0, notifications={
            'type': 'rawhtml',
            'html': '''<b>RAw</b>''',
            'duration': 10
        })
    except StopIteration:
        return r(0, notification=[])


app.run(host="0.0.0.0", port="80")

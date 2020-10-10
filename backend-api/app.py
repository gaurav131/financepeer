from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from flask_cors import CORS
import json
import hashlib
from database import User, UserData
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os


engine = create_engine('sqlite:///data.db')
DbSession = sessionmaker(bind=engine)
app = Flask(__name__)
jwt = JWTManager(app)
CORS(app)
app.config['JWT_SECRET_KEY'] = os.environ['secretKey']


@app.route('/login/', methods=["get", 'post'])
def login():
    data = json.loads(request.data)
    db = DbSession()
    user = db.query(User).filter_by(email=data['email'], password=hashlib.sha256(data['password'].encode()).hexdigest()).first()
    if user:
        token = create_access_token(identity=data['email'])
        return jsonify({'token': token, "action": "successful"})
    return jsonify({'action': "failed"})


@app.route('/signup/', methods=['get', 'post'])
def signup():
    data = json.loads(request.data)
    try:
        user = User(name=data['name'], email=data['email'], password=hashlib.sha256(data['password'].encode()).hexdigest())
        db = DbSession()
        db.add(user)
        db.commit()
        db.close()
        return jsonify({'action': 'successful'})
    except:
        return jsonify({'action': 'failed'})


@app.route('/addData/', methods=['get', 'post'])
@jwt_required
def addData():
    data = json.loads(request.data)
    db = DbSession()
    try:
        user = db.query(User).filter_by(email=data['email']).first()
        for i in data['data']:
            entry = db.query(UserData).filter_by(id=i['id']).first()
            if entry:
                entry.userId = i['userId']
                entry.title = i['title']
                entry.body = i['body']
                db.add(entry)
            else:
                entry = UserData(id=i['id'], userId=i['userId'], title=i['title'],
                                 body=i['body'], email=data['email'], user=user)
                db.add(entry)
        db.commit()
        db.close()
    except:
        db.close()
        return jsonify({'action': 'failed'})
    return jsonify({'action': 'successful'})


@app.route("/getData/", methods=['post'])
@jwt_required
def getData():
    print('running this')
    data = json.loads(request.data)
    try:
        db = DbSession()
        data = db.query(UserData).filter_by(email=data['email']).all()
        db.close()
    except:
        db.close()
        return jsonify(data=[])
    print('running this')
    return jsonify(data=[i.serialize for i in data])


if __name__ == '__main__':
    app.run()

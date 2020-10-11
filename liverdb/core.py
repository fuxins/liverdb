from flask_pymongo import PyMongo

from liverdb import app

mongo = PyMongo(app)

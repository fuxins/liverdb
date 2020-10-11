from flask import Flask
from flask_restful import Api

app = Flask(__name__)

api = Api(app)

app.config.from_object('liverdb.settings')

app.url_map.strict_slashes = False

import liverdb.core
import liverdb.controllers
import liverdb.ajax

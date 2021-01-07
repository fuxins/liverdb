import flask_restful

import re
from liverdb import app, api
from liverdb.core import mongo

from flask_restful import Resource, fields, marshal_with, reqparse, marshal

project={
    "species":fields.String,
    "title":fields.String,
    "journal":fields.String,
    "year":fields.String,
    "condition":fields.String
}
project_list={
    "project_list":fields.Nested(project),
    "project_count":fields.Integer
}
class GetProject(Resource):
    @marshal_with(project_list)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("species")
        args = parser.parse_args()
        condition = {}
        if args["species"]:
            condition['species'] = args["species"]
        print(condition)
        project_list = mongo.db.projects.find(condition)
        project_count = mongo.db.projects.find(condition).count()

        return {"project_list":list(project_list),"project_count":project_count}

api.add_resource(GetProject,"/api/project")
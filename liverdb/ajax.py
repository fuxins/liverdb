import flask_restful

import re
from liverdb import app, api
from liverdb.core import mongo

from flask_restful import Resource, fields, marshal_with, reqparse, marshal

project={
    "PMID":fields.String,
    "Title":fields.String,
    "Journal":fields.String,
    "Year":fields.String,
    "Protocol":fields.String,
    "Accession":fields.String,
    "Species":fields.String,
    "Stage":fields.String,
    "Source":fields.String,
    "gene_count":fields.String,
    "cell_count":fields.String,
    "Description":fields.String
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
        parser.add_argument("PMID")
        args = parser.parse_args()
        condition = {}
        if args["species"] != "All":
            condition['Species'] = args["species"]
        if args['PMID']:
            condition['PMID']=args['PMID']
        print(condition)
        project_list = mongo.db.dataset.find(condition)
        project_count = mongo.db.dataset.find(condition).count()

        return {"project_list":list(project_list),"project_count":project_count}

api.add_resource(GetProject,"/api/project")
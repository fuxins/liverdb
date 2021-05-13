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
        if args['species']:
            if args["species"] != "All":
                condition['Species'] = args["species"]
        if args['PMID']:
            condition['PMID']=int(args['PMID'])
        print(condition)
        project_list = mongo.db.BrowseData.find(condition)
        project_count = mongo.db.BrowseData.find(condition).count()

        return {"project_list":list(project_list),"project_count":project_count}

api.add_resource(GetProject,"/api/project")


#dataset
project2={
    "Accession":fields.String,
    "Species":fields.String,
    "Stage":fields.String,
    "Condition":fields.String,
    "CellType":fields.String,
    "gene":fields.String,
    "avg_logFC":fields.String,
    "p_val":fields.String,
    "p_val_adj":fields.String,
    "Platform":fields.String,
}
project2_list={
    "project2_list":fields.Nested(project2),
    "project2_count":fields.Integer
}


class GetProject2(Resource):
    @marshal_with(project2_list)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("condition")
        parser.add_argument("species")
        parser.add_argument("stage")
        parser.add_argument("celltype")
        parser.add_argument('page', type=int, default=1)
        args = parser.parse_args()
        page = args['page']
        per_page = 15
        record_skip = (page - 1) * per_page
        limit = {'$limit': per_page}
        skip = {'$skip': record_skip}
        condition = {}
        print("args")
        print(args)
        #print(args['Condition'])
        #print(args['CellType'])
        if args['page']:
            page = args['page']
        if  args['condition']:
                    condition['Condition'] = args["condition"]
                    condition['Species'] = args["species"]
                    condition['Stage'] = args["stage"]
        if  args['celltype']:
                condition['CellType'] = args["celltype"]
                condition['Species'] = args["species"]
                condition['Stage'] = args["stage"]
        print(condition)
        project2_list = mongo.db.DataSet.find(condition).skip(record_skip).limit(per_page)
        project2_count = mongo.db.DataSet.find(condition).count()
        print(project2_count)
        return {"project2_list":list(project2_list),"project2_count":project2_count}

api.add_resource(GetProject2,"/api/project2")

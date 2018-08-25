import falcon
import os
import mimetypes
from wsgiref import simple_server
from controller import *
from falcon.http_status import HTTPStatus
from controllers.ratings import Ratings
from controllers.user import UserDetails
WEBSITE_BASE_URL = '0.0.0.0'
WEBSITE_BASE_PORT = 8888
# from project.component import *




class HandleCORS(object):
    def process_request(self, req, resp):
        resp.set_header('Access-Control-Allow-Origin', '*')
        resp.set_header('Access-Control-Allow-Methods', '*')
        resp.set_header('Access-Control-Allow-Headers', '*')
        resp.set_header('Access-Control-Max-Age', 1728000)  # 20 days
        if req.method == 'OPTIONS':
            raise HTTPStatus(falcon.HTTP_200, body='\n')

apps = falcon.API(middleware=[HandleCORS()])
apps.add_route("/repositories/", Repositories())
apps.add_route("/files/", Files())
apps.add_route('/ratings', Ratings())
apps.add_route('/users', UserDetails())


if __name__ == "__main__":
    def static(req, res, static_dir='static', index_file='index.html'):
        path = static_dir + req.path
        if req.path == '/':
            path += index_file
        if os.path.isfile(path):
            res.content_type = mimetypes.guess_type(path)[0]
            res.status = falcon.HTTP_200
            res.stream = open(path)
        else:
            res.status = falcon.HTTP_404

    apps.add_sink(static)

    host = WEBSITE_BASE_URL
    port = WEBSITE_BASE_PORT
    httpd = simple_server.make_server(host, port, apps)
    print("Serving on %s:%s" % (host, port))
    httpd.serve_forever()
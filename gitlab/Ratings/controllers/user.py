import json
import falcon
from libs.queries import get_users


class UserDetails(object):

    def on_get(req, resp):
        try:
            body = json.loads(req.stream.read().decode('utf-8'))
            repo_id = body.get('repo_id')
            details = get_users(repo_id)

            resp.status = falcon.HTTP_201
            status = True
            dump_dict = {'status': status,
                         'message': "successfully get the user details",
                         'data': details}

            resp.body = json.dumps(dump_dict)

        except Exception as e:
            raise e

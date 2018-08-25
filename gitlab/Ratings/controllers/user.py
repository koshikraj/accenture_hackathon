import json
import falcon
from libs.queries import get_users


class UserDetails(object):

    def on_get(self, req, resp):
        try:
            body = req.params
            repo_id = body.get('repo_id')
            details = get_users(repo_id)

            resp.status = falcon.HTTP_201
            status = True
            dump_dict = {'status': status,
                         'message': "successfully get the user details",
                         'data': details}

            resp.body = json.dumps(dump_dict)

        except Exception as e:
            print("Exception", e)
            pass

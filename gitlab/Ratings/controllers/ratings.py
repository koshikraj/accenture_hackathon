import json
import falcon
from libs.queries import save_ratings


class Ratings(object):
    """
            Update the user ratings,
    """

    def on_put(self, req, resp):
        try:
            body = json.loads(req.stream.read().decode('utf-8'))
            rating = body.get('rating')
            repo_id = body.get('repo_id')
            user_id = body.get('user_id')

            if save_ratings(rating, repo_id, user_id):
                resp.status = falcon.HTTP_201
                status = True
                dump_dict = {'status': status,
                             'message': "successfully saved the ratings"}
                resp.body = json.dumps(dump_dict)

            else:
                resp.status = falcon.HTTP_203
                status = False
                dump_dict = {'status': status,
                             'message': "Couldnt save the ratings"}
                resp.body = json.dumps(dump_dict)

        except Exception as e:
            print(e)
            pass
